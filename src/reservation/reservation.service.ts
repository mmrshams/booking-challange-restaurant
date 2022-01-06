import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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
    /** 
   * NOTE (TODO):
   * in this part we query to check another reservation exists or not and 
   * in further steps we can add queue collection and add reservation to queue
   * if the this time has been reserved !
   * for this step its not implemented
   * we only throw some error
   */
  const { tableId, bookedTime}= data
    const currentReservation = await this.reservationRepository.findOne({ tableId, bookedTime });
    if (currentReservation)
    throw new HttpException(
      {
        status: HttpStatus.NOT_ACCEPTABLE,
        error: "This time has been reserved!",
      },
      HttpStatus.NOT_FOUND
    );

    const refUuid = uuid.v4();
    await this.reservationRepository.createOne({
      ...data,
      uuid: refUuid,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return this.reservationRepository.findOne({ uuid: refUuid });
  }
  async get(id: string): Promise<any> {
    const reservation = await this.reservationRepository.findOne({ uuid: id });
    return reservation
  }
}
