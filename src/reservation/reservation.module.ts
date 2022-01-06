import { HttpModule, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { CommonModule } from "src/common/common.module";
import { Config } from "src/common/interfaces/config.interface";
import { DynamicModuleInterface } from "src/common/interfaces/dynamic-module.interface";
import { DogRepository } from "../common/repositories/dog.repository";
import { User, UserRepository, UserSchema } from "../common/schemas/user.entity";
import { MongodbModule } from "../mongodb/mongodb.module";
import { ReservationController } from "./reservation.controller";
import { ReservationService } from "./reservation.service";

const controllers = [ReservationController];
const services = [ReservationService, UserRepository, DogRepository];


@Module({})
export class ReservationModule {
  static register(config: Config): DynamicModuleInterface {
    return {
      moduleInstance: {
        module: ReservationModule,
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
