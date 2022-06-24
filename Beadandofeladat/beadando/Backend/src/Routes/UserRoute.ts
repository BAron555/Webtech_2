import {Router} from "express";
import { DataSource } from "typeorm";
import {UserController} from "../controller/UserController";

export function getUserRoute(dataSource:DataSource){
    const router = Router();
    const userService = new UserController(dataSource);

   router.get('/get-all-users',userService.getAllUsers);
   router.get('/login',userService.login);
   router.post('/create-user',userService.createUser);
   router.delete('/delete-user/:id',userService.deleteUserById);
   router.patch('/update-user',userService.updateUser);
   router.post('/get-by-id',userService.getUserById);
   router.patch('/replenishment',userService.replenishment);
   router.post('/create-rent',userService.createRent);
   router.post('/end-rent',userService.endRent);
    return router;
}
