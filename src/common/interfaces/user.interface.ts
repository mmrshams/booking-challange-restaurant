import { UserType } from "../enums/user-status.enum";
import { UserStatus } from "../enums/user-type.enum";

export class UserInterface {
  name!: string;

  phoneNumber!: string;

  password?: string;

  email?: string;

  area!: string;

  city!: string;

  address!: string;

  status?: UserStatus;

  type?: UserType;

  chargedAt?: Date;

  expiredAt?: Date;
}
