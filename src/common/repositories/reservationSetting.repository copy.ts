import { IndexSpecification } from "mongodb";
import { ReservationSettingInterface } from "../interfaces/restaurantSetting.interface";

import { BaseRepository } from "./base.repository";

export class ReservationSettingRepository extends BaseRepository<ReservationSettingInterface> {
  protected readonly collection: string = `${
    ReservationSettingInterface.name.toLowerCase().split("interface")[0]
  }s`;

  indexes(): Array<IndexSpecification> {
    return [
      {
        key: { uuid: 1 },
        name: "uuid",
        unique: true,
        background: true,
      },
    ];
  }
}
