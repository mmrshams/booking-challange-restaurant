import { Injectable } from "@nestjs/common";
import _ from "lodash";
import { Config } from "src/common/interfaces/config.interface";
import { ReservationSettingInterface } from "src/common/interfaces/restaurantSetting.interface";
import { TableInterface } from "src/common/interfaces/table.interface";
import { ReservationSettingRepository } from "src/common/repositories/reservationSetting.repository copy";
import { TableRepository } from "src/common/repositories/table.repository";
import * as uuid from "uuid";
@Injectable()
export class InventoryService {
  constructor(
    /** 
     * NOTE:
     * injected configs
     */
    private readonly config: Config,
    private readonly reservationSettingRepository: ReservationSettingRepository,
    private readonly tableRepository: TableRepository
  ) { }

  async createReservationSetting(data: ReservationSettingInterface): Promise<any> {
    return this.reservationSettingRepository.createOne({ ...data, uuid: uuid.v4() });

  }

  async createTable(data: TableInterface): Promise<any> {
    return this.tableRepository.createOne({ ...data, uuid: uuid.v4() });
  }

  async getTable(): Promise<any> {
    /** 
     * NOTE:
     * pagination and limit per request is completely supported
     * just need to add on controller and ...
     */
    const list = await this.tableRepository.findAll(0, 100, {})
    return {
      list, total: list.length
    };
  }
}
