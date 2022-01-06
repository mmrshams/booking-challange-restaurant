import { IndexSpecification } from "mongodb";
import { TableInterface } from "../interfaces/table.interface";
import { BaseRepository } from "./base.repository";

export class TableRepository extends BaseRepository<TableInterface> {
  protected readonly collection: string = `${
    TableInterface.name.toLowerCase().split("interface")[0]
  }s`;

  indexes(): Array<IndexSpecification> {
    return [
      {
        key: { uuid: 1 },
        name: "uuid",
        unique: true,
        background: true,
      },
    ];
  }
}
