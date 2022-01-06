import { Injectable } from "@nestjs/common";
import _ from "lodash";
import { Config } from "src/common/interfaces/config.interface";
import { TableInterface } from "src/common/interfaces/table.interface";
import { TableRepository } from "src/common/repositories/table.repository";
import { UserRepository } from "src/common/schemas/user.entity";
@Injectable()
export class AdminGatewayService {
  constructor(
    private readonly config: Config,
    // private readonly userRepository: UserRepository,
    // private readonly dogRepository: TableRepository
  ) {}
  async create(data: TableInterface): Promise<any> {
    // await this.dogRepository.createOne({ name: "some specific dog name" });
    // return this.userRepository.create(data);
  }
  async delete(id: string, data: TableInterface): Promise<any> {}
  async update(id: string, data: TableInterface): Promise<any> {}
  async get(): Promise<any> {
    return { Id: 123, name: "boilerplate" };
  }
}
