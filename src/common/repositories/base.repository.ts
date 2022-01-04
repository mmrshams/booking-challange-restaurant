import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import {
  BulkWriteOperation,
  BulkWriteOpResultObject,
  ClientSession,
  Db,
  FilterQuery,
  FindOneAndUpdateOption,
  IndexSpecification,
  MatchKeysAndValues,
  MongoClient,
  OptionalId,
  TransactionOptions,
  UpdateQuery,
} from "mongodb";

import { MongodbAdapter } from "./mongodb.adapter";

@Injectable()
export abstract class BaseRepository<T>
  extends MongodbAdapter
  implements OnModuleInit {
  protected abstract readonly collection: string;

  constructor(
    @Inject("MONGODB_CONNECTION_PROVIDER")
    protected readonly _client: MongoClient,
    @Inject("MONGODB_PROVIDER")
    protected readonly _db: Db
  ) {
    super(_db);
  }

  onModuleInit() {
    this._createIndexes();
  }

  abstract indexes(): Array<IndexSpecification>;

  /**
   * Check indices of the current collection
   *
   * @private
   */
  private async _createIndexes() {
    const indexes = this.indexes();
    const collection = this._db.collection<T>(this.collection);
    for (const index of indexes) {
      try {
        await collection.indexExists(index.name!);
      } catch {
        await collection.createIndexes([index]);
      }
    }
  }

  async executeTransaction(
    callback: (db: Db, session: ClientSession) => void,
    options?: TransactionOptions
  ): Promise<boolean> {
    const session = this._client.startSession();
    try {
      await session.withTransaction(async () => {
        await callback(this._db, session);
      }, options);
    } catch (e) {
      return false;
    } finally {
      await session.endSession();
    }
    return true;
  }

  async search(
    limit: number,
    filters: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): Promise<Array<T>> {
    const searchQuery: FilterQuery<T> = {
      $or: Object.entries(filters).map(([key, value]) => {
        return { [key]: { $regex: value, $options: "i" } };
      }),
    } as FilterQuery<T>;
    return this._db
      .collection<T>(this.collection)
      .find(searchQuery, { projection })
      .limit(limit)
      .toArray();
  }

  async aggregate(
    pipes: Array<Record<string, unknown>>
  ): Promise<Array<unknown>> {
    return this._db.collection(this.collection).aggregate(pipes).toArray();
  }

  async count(filters: FilterQuery<T>): Promise<number> {
    return this._db.collection<T>(this.collection).countDocuments(filters);
  }

  async findAll(
    skip: number,
    limit: number,
    filters: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): Promise<Array<T>> {
    return this._db
      .collection<T>(this.collection)
      .find(filters, { projection })
      .skip(skip)
      .limit(limit)
      .toArray();
  }

  async findOne(
    filters: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): Promise<T | null> {
    return this._db
      .collection<T>(this.collection)
      .findOne(filters, { projection });
  }

  async createOne(data: T): Promise<boolean> {
    const { insertedCount } = await this._db
      .collection<T>(this.collection)
      .insertOne(data as OptionalId<T>);
    return insertedCount > 0;
  }

  async bulkInsert(data: Array<T>): Promise<boolean> {
    const bulkOp = this._db
      .collection<T>(this.collection)
      .initializeUnorderedBulkOp();

    data.forEach((segment) => {
      bulkOp.insert(segment as Object);
    });
    const { nInserted } = await bulkOp.execute();
    return nInserted > 0;
  }

  async updateSubDocument<U>(
    filters: FilterQuery<T>,
    documentKey: string,
    data: Partial<U>
  ): Promise<boolean> {
    const documentFields: MatchKeysAndValues<T> = {};
    for (const [key, value] of Object.entries(data)) {
      (documentFields as Record<string, unknown>)[
        `${documentKey}.$.${key}`
      ] = value;
    }
    const { modifiedCount } = await this._db
      .collection<T>(this.collection)
      .updateOne(filters, {
        $set: { ...documentFields, updatedAt: new Date() },
      });
    return modifiedCount > 0;
  }

  async updateOne(filters: FilterQuery<T>, data: Partial<T>): Promise<boolean> {
    const { modifiedCount } = await this._db
      .collection<T>(this.collection)
      .updateOne(filters, { $set: { ...data, updatedAt: new Date() } });
    return modifiedCount > 0;
  }

  async modifyOne(filters: FilterQuery<T>, data: Partial<T>): Promise<T> {
    const { value } = await this._db
      .collection<T>(this.collection)
      .findOneAndUpdate(
        filters,
        { $set: { ...data, updatedAt: new Date() } },
        {}
      );
    return value as T;
  }

  async bulkUpdate(filters: FilterQuery<T>, data: Array<T>): Promise<boolean> {
    const bulkOp = this._db
      .collection<T>(this.collection)
      .initializeUnorderedBulkOp();

    data.forEach((segment) => {
      bulkOp
        .find(filters)
        .update({ $set: { ...segment, updatedAt: new Date() } });
    });
    const { nModified, nUpserted } = await bulkOp.execute();
    return nModified > 0 || nUpserted > 0;
  }

  async deleteOne(filters: FilterQuery<T>): Promise<boolean> {
    const { deletedCount } = await this._db
      .collection<T>(this.collection)
      .deleteOne(filters);
    return deletedCount! > 0;
  }

  async bulkDelete(filters: FilterQuery<T>): Promise<boolean> {
    const bulkOp = this._db
      .collection<T>(this.collection)
      .initializeUnorderedBulkOp();

    bulkOp.find(filters).remove();
    const { nRemoved } = await bulkOp.execute();
    return nRemoved > 0;
  }

  async bulkWrite(
    query: Array<BulkWriteOperation<T>>
  ): Promise<BulkWriteOpResultObject> {
    return this._db.collection<T>(this.collection).bulkWrite(query);
  }

  async findOneAndUpdate(
    query: FilterQuery<T>,
    data: Partial<T> | UpdateQuery<T>,
    options?: FindOneAndUpdateOption<any>
  ): Promise<T> {
    return this._db
      .collection<T>(this.collection)
      .findOneAndUpdate(query, data, {
        ...options,
        returnOriginal: false,
      }) as Promise<any>;
  }
}
