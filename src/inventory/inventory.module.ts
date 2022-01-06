import { HttpModule, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { CommonModule } from "src/common/common.module";
import { Config } from "src/common/interfaces/config.interface";
import { DynamicModuleInterface } from "src/common/interfaces/dynamic-module.interface";
import { DogRepository } from "../common/repositories/dog.repository";
import { User, UserRepository, UserSchema } from "../common/schemas/user.entity";
import { MongodbModule } from "../mongodb/mongodb.module";
import { InventoryController } from "./inventory.controller";
import { InventoryService } from "./inventory.service";

const controllers = [InventoryController];
const services = [InventoryService, UserRepository, DogRepository];


@Module({})
export class InventoryModule {
  static register(config: Config): DynamicModuleInterface {
    return {
      moduleInstance: {
        module: InventoryModule,
        imports: [
          HttpModule,
          JwtModule.register({ secret: "token" }),
          /** 
           * ATTENTION:
             * It's better to don't use the pre-build ODM or ORM
             * as you see there is both pure mongodb connection and mongoose configs 
             * exits, only for show more options in the code we only use one of these patterns
             */
          MongodbModule.register(config.DOG_MONGODB_URI),
          CommonModule.register(),
          MongooseModule.forRoot(config.USER_MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            j: true,
          }),
          MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ],
        controllers: [...controllers],
        providers: [...services],
      },
      options: {
        host: config.USER_URI,
      },
    };
  }
}
