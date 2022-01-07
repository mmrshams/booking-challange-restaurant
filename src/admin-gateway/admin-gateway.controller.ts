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
import { User } from "@sentry/node";
import { ReservationInterface } from "src/common/interfaces/reservations.interface";
import { ReservationSettingInterface } from "src/common/interfaces/restaurantSetting.interface";
import { TableInterface } from "src/common/interfaces/table.interface";
import { AdminGatewayService } from "./admin-gateway.service";

@ApiTags("AdminGateway")
@Controller("admin-gateway/v1")
export class AdminGatewayController {
  constructor(private readonly adminGatewayService: AdminGatewayService) {}

  @Post("/create-table")
  async createTable(@Body() body: TableInterface): Promise<User | null> {
    const result = await this.adminGatewayService.createTable(body);
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

  @Post("/create-reservation-setting")
  async createReservationSetting(@Body() body: ReservationSettingInterface): Promise<User | null> {
    const result = await this.adminGatewayService.createReservationSetting(body);
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

  @Post("/create-reservation")
  async createReservation(@Body() body: ReservationInterface): Promise<User | null> {
    const result = await this.adminGatewayService.createReservation(body);
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

  @Get("/reservation/:uuid")
  async get(@Param('uuid') uuid: string): Promise<User | null> {
    const result = await this.adminGatewayService.getReservationWithId(uuid);
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
}
