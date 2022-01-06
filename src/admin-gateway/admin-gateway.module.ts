import { HttpModule, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CommonModule } from "src/common/common.module";
import { Config } from "src/common/interfaces/config.interface";
import { DynamicModuleInterface } from "src/common/interfaces/dynamic-module.interface";
import { AdminGatewayController } from "./admin-gateway.controller";
import { AdminGatewayService } from "./admin-gateway.service";

const controllers = [AdminGatewayController];
const services = [AdminGatewayService];

@Module({})
export class AdminGatewayModule {
  static register(config: Config): DynamicModuleInterface {
    return {
      moduleInstance: {
        module: AdminGatewayModule,
        imports: [
          HttpModule,
          JwtModule.register({ secret: "token" }),
          CommonModule.register(),
        ],
        controllers: [...controllers],
        providers: [...services],
      },
      options: {
        host: config.ADMIN_GATEWAY_URI,
      },
    };
  }
}
