import * as joi from "joiful";

export class Config {
  constructor(data: Partial<Config>) {
    Object.assign(this, data);
  }

  @(joi.string().required())
  readonly USER_MONGODB_URI!: string;

  @(joi.string().required())
  readonly DOG_MONGODB_URI!: string;

  @(joi.string().required())
  readonly USER_URI!: string;

  @(joi.string().required())
  readonly SERVICE_MODE!: string;

  @joi.string()
  readonly SERVICE_NAME!: string;
}
