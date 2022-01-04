import { Inject, Injectable } from "@nestjs/common";
import { Db } from "mongodb";

@Injectable()
export abstract class MongodbAdapter {
  constructor(
    @Inject("MONGODB_PROVIDER")
    protected readonly _db: Db
  ) {}
}
