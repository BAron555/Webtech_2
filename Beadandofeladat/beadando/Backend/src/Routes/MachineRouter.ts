import {Router} from "express";
import { DataSource } from "typeorm";
import {MachineController} from "../controller/MachineController";

export function getMachineRoute(dataSource:DataSource){
    const router = Router();
    const machineService = new MachineController(dataSource);

    router.post('/create-machine',machineService.createMachine);
    router.get('/get-all-machine',machineService.getAllMachines);
    router.delete('/delete-machine-from-user',machineService.deleteMachineFromUser);
    router.delete('/delete-by-id/:id',machineService.deleteMachine);
    return router;
}