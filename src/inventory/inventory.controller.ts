import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User } from "@sentry/node";
import { ReservationSettingInterface } from "src/common/interfaces/restaurantSetting.interface";
import { TableInterface } from "src/common/interfaces/table.interface";
import { InventoryService } from "./inventory.service";

@ApiTags("Inventory")
@Controller("inventory/v1")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post("/table")
  async createTable(@Body() body: TableInterface): Promise<User | null> {
    const result = await this.inventoryService.createTable(body);
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

  @Post("/reservationSetting")
  async createReservationSetting(@Body() body: ReservationSettingInterface): Promise<User | null> {
    const result = await this.inventoryService.createReservationSetting(body);
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

  @Get("/")
  async get(): Promise<User | null> {
    const result = await this.inventoryService.getTable();
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
