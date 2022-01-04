import { Injectable } from "@nestjs/common";
import _ from "lodash";
import { Config } from "src/common/interfaces/config.interface";
import { UserInterface } from "src/common/interfaces/user.interface";
import { DogRepository } from "src/common/repositories/dog.repository";
import { UserRepository } from "src/common/schemas/user.entity";
@Injectable()
export class UserService {
  constructor(
    private readonly config: Config,
    private readonly userRepository: UserRepository,
    private readonly dogRepository: DogRepository
  ) {}
  async create(data: UserInterface): Promise<any> {
    await this.dogRepository.createOne({ name: "some specific dog name" });
    return this.userRepository.create(data);
  }
  async delete(id: string, data: UserInterface): Promise<any> {}
  async update(id: string, data: UserInterface): Promise<any> {}
  async get(): Promise<any> {
    return { Id: 123, name: "boilerplate" };
  }
}
