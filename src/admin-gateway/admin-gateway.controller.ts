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
import { TableInterface } from "src/common/interfaces/table.interface";
import { AdminGatewayService } from "./admin-gateway.service";

@ApiTags("AdminGateway")
@Controller("admin-gateway/v1")
export class AdminGatewayController {
  constructor(private readonly userService: AdminGatewayService) {}

  @Post("/")
  async create(@Body() body: TableInterface): Promise<User | null> {
    const result = await this.userService.create(body);
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
    const result = await this.userService.get();
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
