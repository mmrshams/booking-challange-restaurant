import { HttpModule, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CommonModule } from "src/common/common.module";
import { Config } from "src/common/interfaces/config.interface";
import { DynamicModuleInterface } from "src/common/interfaces/dynamic-module.interface";
import { ReservationSettingRepository } from "src/common/repositories/reservationSetting.repository copy";
import { TableRepository } from "../common/repositories/table.repository";
import { MongodbModule } from "../mongodb/mongodb.module";
import { InventoryController } from "./inventory.controller";
import { InventoryService } from "./inventory.service";

const controllers = [InventoryController];
const services = [InventoryService, ReservationSettingRepository, TableRepository];


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
          MongodbModule.register(config.INVENTORY_MONGODB_URI),
          CommonModule.register(),
          // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ],
        controllers: [...controllers],
        providers: [...services],
      },
      options: {
        host: config.INVENTORY_URI,
      },
    };
  }
}
