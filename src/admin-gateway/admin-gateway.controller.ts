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
import { UserInterface } from "src/common/interfaces/user.interface";
import { AdminGatewayService } from "./admin-gateway.service";

@ApiTags("AdminGateway")
@Controller("admin-gateway/v1")
export class AdminGatewayController {
  constructor(private readonly userService: AdminGatewayService) {}

  @Post("/")
  async create(@Body() body: UserInterface): Promise<User | null> {
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
