import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { MongoClient } from "mongodb";

@Global()
@Module({})
export class MongodbModule {
  static register(uri: string): DynamicModule {
    const mongoConnectionFactory: Provider = {
      provide: "MONGODB_CONNECTION_PROVIDER",
      useFactory: async () =>
        new Promise((resolve, reject) => {
          MongoClient.connect(
            uri,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (error, client) => {
              if (error) {
                reject(error);
              } else {
                resolve(client);
              }
            }
          );
        }),
    };
    const mongoFactory: Provider = {
      provide: "MONGODB_PROVIDER",
      inject: ["MONGODB_CONNECTION_PROVIDER"],
      useFactory: async (connection: MongoClient) => connection.db(),
    };

    return {
      module: MongodbModule,
      providers: [mongoConnectionFactory, mongoFactory],
      exports: [mongoConnectionFactory, mongoFactory],
    };
  }
}
