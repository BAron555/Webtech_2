import {Router} from "express";
import { DataSource } from "typeorm";
import {BillController} from "../controller/BillController";

export function getBillRoute(dataSource:DataSource){
    const router = Router();
    const billService = new BillController(dataSource);

    router.post('/create-bill',billService.createBill);
    router.post('/get-filtered-bill',billService.filterDates);
    return router;
}