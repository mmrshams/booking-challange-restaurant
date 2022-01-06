import { IndexSpecification } from "mongodb";
import { ReservationInterface } from "../interfaces/reservations.interface";
import { BaseRepository } from "./base.repository";



/** 
 * NOTE:
   * most part of repository functionality , 
   * implemented on base repository cause they are repetitive
   */

export class ReservationRepository extends BaseRepository<ReservationInterface> {
  protected readonly collection: string = `${
    ReservationInterface.name.toLowerCase().split("interface")[0]
  }s`;

  indexes(): Array<IndexSpecification> {
    return [
      {
        key: { uuid: 1 },
        name: "uuid",
        unique: true,
        background: true,
      }
    ];
  }
}
