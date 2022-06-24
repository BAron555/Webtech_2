import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import {Bill} from "./entity/Bill";
import {Machine} from "./entity/Machine";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "bajz",
    dropSchema: false,
    synchronize: true,
    logging: ['query'],
    entities: [User,Bill,Machine],
    migrations: [],
    subscribers: [],
})
