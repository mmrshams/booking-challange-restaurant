import { HttpService } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import _ from "lodash";
import { Config } from "src/common/interfaces/config.interface";
import { ReservationInterface } from "src/common/interfaces/reservations.interface";
import { ReservationSettingInterface } from "src/common/interfaces/restaurantSetting.interface";
import { TableInterface } from "src/common/interfaces/table.interface";

@Injectable()
export class AdminGatewayService {
  constructor(
    private readonly config: Config,
    private httpService: HttpService,
  ) { }

  /** 
    * NOTE:
    * only proxy the back-tire APIs for now
    */
  async createReservationSetting(data: ReservationSettingInterface): Promise<any> {
    const result = await this.httpService
      .post(
        this.config.HTTP_INVENTORY_URI + '/reservationSetting',
        {
          ...data
        },
        {
          timeout: 50000,
        }
      )
      .toPromise();

    return result.data;
  }
  async createReservation(data: ReservationInterface): Promise<any> {
    const result = await this.httpService
      .post(
        this.config.HTTP_RESERVATION_URI + '/',
        {
          ...data
        },
        {
          timeout: 50000,
        }
      )
      .toPromise();

    return result.data;
  }
  async createTable(data: TableInterface): Promise<any> {
    const result = await this.httpService
      .post(
        this.config.HTTP_INVENTORY_URI + '/table',
        data,
        {
          timeout: 50000,
        }
      )
      .toPromise();

    return result.data;
  }

  async getReservationWithId(uuid: string): Promise<any> {
    const result = await this.httpService
      .get(
        this.config.HTTP_RESERVATION_URI + `/${uuid}`,
      )
      .toPromise();

    return result.data;
  }
}
