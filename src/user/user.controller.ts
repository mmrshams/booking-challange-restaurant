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
import { UserService } from "./user.service";

@ApiTags("User")
@Controller("users/v1")
export class UserController {
  constructor(private readonly userService: UserService) {}

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
