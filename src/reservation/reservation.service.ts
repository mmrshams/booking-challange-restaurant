import { Injectable } from "@nestjs/common";
import * as uuid from "uuid"
import _ from "lodash";
import { Config } from "src/common/interfaces/config.interface";
import { ReservationInterface } from "src/common/interfaces/reservations.interface";
import { ReservationRepository } from "src/common/repositories/reservation.repository";

@Injectable()
export class ReservationService {
  constructor(
    private readonly config: Config,
    private readonly reservationRepository: ReservationRepository,
  ) { }
  async create(data: ReservationInterface): Promise<any> {
    const refUuid = uuid.v4();
    await this.reservationRepository.createOne({
      ...data, 
      uuid:  refUuid, 
      createdAt: new Date(), 
      updatedAt: new Date()
    });
    return  this.reservationRepository.findOne({ uuid: refUuid });
  }
  async get(id: string): Promise<any> {
    const reservation = await this.reservationRepository.findOne({ uuid: id });
    return reservation
  }
}
