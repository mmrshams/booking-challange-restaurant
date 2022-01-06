import { HttpModule, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CommonModule } from "src/common/common.module";
import { Config } from "src/common/interfaces/config.interface";
import { DynamicModuleInterface } from "src/common/interfaces/dynamic-module.interface";
import { ReservationRepository } from "src/common/repositories/reservation.repository";
import { MongodbModule } from "../mongodb/mongodb.module";
import { ReservationController } from "./reservation.controller";
import { ReservationService } from "./reservation.service";

const controllers = [ReservationController];
const services = [ReservationService, ReservationRepository];


@Module({})
export class ReservationModule {
  static register(config: Config): DynamicModuleInterface {
    return {
      moduleInstance: {
        module: ReservationModule,
        imports: [
          HttpModule,
          JwtModule.register({ secret: "token" }),
          MongodbModule.register(config.RESERVATION_MONGODB_URI),
          CommonModule.register(),
          // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ],
        controllers: [...controllers],
        providers: [...services],
      },
      options: {
        host: config.RESERVATION_URI,
      },
    };
  }
}
