import { IndexSpecification } from "mongodb";
import { DogInterface } from "../interfaces/dog.interface";

import { BaseRepository } from "./base.repository";

export class DogRepository extends BaseRepository<DogInterface> {
  protected readonly collection: string = `${
    DogInterface.name.toLowerCase().split("interface")[0]
  }s`;

  indexes(): Array<IndexSpecification> {
    return [
      {
        key: { uuid: 1 },
        name: "name",
        unique: true,
        background: true,
      },
      {
        key: { uuid: 1 },
        name: "age",
        unique: true,
        background: true,
      },
    ];
  }
}
