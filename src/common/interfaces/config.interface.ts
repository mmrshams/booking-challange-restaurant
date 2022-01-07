import * as joi from "joiful";

export class Config {
  constructor(data: Partial<Config>) {
    Object.assign(this, data);
  }

  @(joi.string().required())
  readonly INVENTORY_MONGODB_URI!: string;

  @(joi.string().required())
  readonly RESERVATION_MONGODB_URI!: string;

  @(joi.string().required())
  readonly INVENTORY_URI!: string;

  @(joi.string().required())
  readonly RESERVATION_URI!: string;

  @(joi.string().required())
  readonly HTTP_INVENTORY_URI!: string;

  @(joi.string().required())
  readonly HTTP_RESERVATION_URI!: string;

  @(joi.string().required())
  readonly ADMIN_GATEWAY_URI!: string;

  @(joi.string().required())
  readonly SERVICE_MODE!: string;

  @joi.string()
  readonly SERVICE_NAME!: string;
}
