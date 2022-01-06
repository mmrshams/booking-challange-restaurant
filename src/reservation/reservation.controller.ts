import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import * as uuid from 'uuid';
import { ReservationInterface } from "src/common/interfaces/reservations.interface";
import { ReservationService } from "./reservation.service";

@ApiTags("Reservation")
@Controller("Reservation/v1")
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) { }

  @Post("/")
  async create(@Body() body: ReservationInterface): Promise<ReservationInterface | null> {
    const result = await this.reservationService.create({...body, uuid: uuid.v4()});
    if (!result)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "user with id not found!",
        },
        HttpStatus.NOT_FOUND
      );
    return result;
  }

  @Get("/:uuid")
  async get(@Param('uuid') uuid: string): Promise<ReservationInterface | null> {
    const result = await this.reservationService.get(uuid);
    if (!result)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "Reservation with id not found!",
        },
        HttpStatus.NOT_FOUND
      );
    return result;
  }
}
