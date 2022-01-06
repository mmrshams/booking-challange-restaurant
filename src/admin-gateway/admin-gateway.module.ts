import { HttpModule, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { CommonModule } from "src/common/common.module";
import { Config } from "src/common/interfaces/config.interface";
import { DynamicModuleInterface } from "src/common/interfaces/dynamic-module.interface";
import { DogRepository } from "../common/repositories/dog.repository";
import { User, UserRepository, UserSchema } from "../common/schemas/user.entity";
import { MongodbModule } from "../mongodb/mongodb.module";
import { AdminGatewayController } from "./admin-gateway.controller";
import { AdminGatewayService } from "./admin-gateway.service";

const controllers = [AdminGatewayController];
const services = [AdminGatewayService, UserRepository, DogRepository];


@Module({})
export class AdminGatewayModule {
  static register(config: Config): DynamicModuleInterface {
    return {
      moduleInstance: {
        module: AdminGatewayModule,
        imports: [
          HttpModule,
          JwtModule.register({ secret: "token" }),
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
