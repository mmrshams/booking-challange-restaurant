import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, FilterQuery, Model } from "mongoose";
const { ObjectId } = require("mongodb");
import { TableInterface } from "../interfaces/table.interface";

/** 
 * NOTE:
   * this is just a sample of using mongoose , 
   * and we do not use this entity and pattern !!
   */
export class Setting { }
export class chargeInterface {
  @Prop({})
  from!: Date;

  @Prop({})
  to!: Date;

  @Prop({ default: false })
  isMain?: boolean;

  @Prop({})
  area?: number;
}

@Schema({ minimize: false, versionKey: false })
export class User extends Document {
  @Prop({})
  name!: string;

  @Prop({ unique: true, index: true })
  phoneNumber!: string;

  @Prop({})
  email?: string;

  @Prop({})
  area!: string;

  @Prop({})
  city!: string;

  @Prop({})
  address!: string;

  @Prop({})
  status!: string;

  @Prop({})
  type!: string;

  @Prop({ default: {} })
  setting?: Setting;

  @Prop({ default: [] })
  chargeList!: Array<chargeInterface>;

  @Prop({})
  chargedAt!: Date;

  @Prop({})
  expiredAt!: Date;

  @Prop({})
  createdAt!: Date;

  @Prop({})
  updatedAt!: Date;
}

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly UserDao: Model<User>
  ) { }

  async findAll(
    skip: number,
    limit: number,
    filters: FilterQuery<File>
  ): Promise<any> {
    const pipeline: Array<Record<string, unknown>> = [
      { $match: filters },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ];
    const list = await this.UserDao.aggregate(pipeline).exec();
    const countPipeline = [];
    countPipeline.push(
      { $match: filters },
      {
        $count: "total",
      }
    );
    const total = await this.UserDao.aggregate(countPipeline).exec();
    list.map((item: any) => (item.id = item._id));
    return { list, total: total[0] ? total[0].total : 0 } as any;
  }

  async findOneWithId(id: string): Promise<User> {
    const [user] = await this.UserDao.find({
      _id: ObjectId(id),
      status: { $ne: "DELETED" },
    }).exec();
    return user as User;
  }

  async create(user: Partial<User>): Promise<User> {
    const userEntity = new this.UserDao({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return userEntity.save();
  }

  async update(id: string, user: Partial<TableInterface>): Promise<User | null> {
    return this.UserDao.findByIdAndUpdate(
      id,
      { $set: { ...((user as unknown) as User), updatedAt: new Date() } },
      { new: true }
    );
  }

  async charge(id: string, data: Partial<User>): Promise<User | null> {
    return this.UserDao.findByIdAndUpdate(
      id,
      { $set: { ...data, updatedAt: new Date() } },
      { new: true }
    );
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set("toJSON", {
  transform: function (
    doc: any,
    ret: { id: any; _id: any; __v: any },
    options: any
  ) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
