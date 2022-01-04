import { DynamicModule } from "@nestjs/common";
import { MicroserviceOptions } from "@nestjs/microservices";

export interface ServiceOptions {
  host: string;
}

export interface DynamicModuleInterface {
  moduleInstance: DynamicModule;
  options: MicroserviceOptions | ServiceOptions | null;
}
