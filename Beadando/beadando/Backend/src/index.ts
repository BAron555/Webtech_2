import * as express from "express"
import { AppDataSource } from "./data-source"
import * as cors from "cors";
import { DataSource } from "typeorm";
import {getUserRoute} from "./Routes/UserRoute";
import {getBillRoute} from "./Routes/BillRoute";
import {getMachineRoute} from "./Routes/MachineRouter";

AppDataSource.initialize().then(async (dataSource:DataSource) => {

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/api/user',getUserRoute(dataSource));
    app.use('/api/bill',getBillRoute(dataSource));
    app.use('/api/machine',getMachineRoute(dataSource));

    const port = process.env.port || 3000;
    app.listen(port,()=>{
        console.log('Server is listening on port:',port);
    });


}).catch(error => console.log(error))