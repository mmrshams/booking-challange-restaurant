import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Config } from "./interfaces/config.interface";
import { validate } from "./utils/class-validator.util";

const configFactory = {
  provide: "Config",
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const config: Record<string, unknown> = {};
    Object.entries(process.env).forEach(([key]) => {
      config[key] = configService.get(key);
    });
    const validatedConfig = validate<Config>(config, Config, {
      convert: true,
      noDefaults: true,
      stripUnknown: true,
    });
    return validatedConfig;
  },
};

@Module({})
export class CommonModule {
  static register(): DynamicModule {
    return {
      module: CommonModule,
      imports: [
        ConfigModule.forRoot({
          //If a variable is found in multiple files, the first one takes precedence
          envFilePath: [`env/${process.env.NODE_ENV}.env`, "env/local.env"],
        }),
      ],
      providers: [configFactory],
      exports: [configFactory],
    };
  }
}
