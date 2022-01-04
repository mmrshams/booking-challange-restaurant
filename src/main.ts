import {
  ClassSerializerInterceptor,
  DynamicModule,
  ValidationPipe,
} from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ServiceOptions } from "src/common/interfaces/dynamic-module.interface";

import { CommonModule } from "./common/common.module";
import { ServiceMode } from "./common/enums/service-mode.enum";
import { Config } from "./common/interfaces/config.interface";
import { MainModule } from "./main.module";

const modules: { [key: string]: any } = {
  [ServiceMode.USER]: [MainModule],
  [ServiceMode.ALL]: [MainModule],
  // add more service like  ORDER
};

async function bootstrap() {
  const commonApp = await NestFactory.create(CommonModule.register());
  const config = commonApp.get<Config>("Config");

  for (const module of modules[config.SERVICE_MODE]) {
    const { moduleInstance, options } = module.register(config);
    if ((options as ServiceOptions).host) {
      const app = await NestFactory.create(moduleInstance);
      app.enableShutdownHooks();
      app.enableCors();
      app.useGlobalPipes(new ValidationPipe());
      // add config to authGUARD
      const reflector = app.get(Reflector);
      app.listen((options as ServiceOptions).host.split(":")[1]);
      const config = new DocumentBuilder()
        .setTitle((moduleInstance as DynamicModule).module.name)
        .build();
      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup("swagger", app, document);
      continue;
    }
    const app = await NestFactory.createMicroservice(moduleInstance, options);
    app.enableShutdownHooks();
    app.listen(() => {});
  }
}
bootstrap();
