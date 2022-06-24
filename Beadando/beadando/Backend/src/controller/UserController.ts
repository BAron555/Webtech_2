import { DataSource, getRepository, Repository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import {UserUpdateValidator, UserValidator} from "../Validators/UserValidator";
import {validate} from "class-validator";
import {Bill} from "../entity/Bill";
import {Machine} from "../entity/Machine";

export class UserController {
    private repository: Repository<User>;
    private machineRepositry: Repository<Machine>;
    private billRepository: Repository<Bill>;
    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(User);
        this.machineRepositry = dataSource.getRepository(Machine);
        this.billRepository = dataSource.getRepository(Bill);
    }
   
    createUser = async (req: Request,res:Response) =>{
        const body = req.body;
        const userV = new UserValidator();

        userV.companynumber = body.companynumber;
        userV.companyName = body.companyname;
        userV.balance = body.balance;
        userV.password = body.password;
        userV.taxnumber = body.taxnumber;
        userV.headquarters = body.headquarters;
        userV.delegatename = body.delegatename;

        try{
            validate(userV).then(async errors => {
                if(errors.length > 0){
                    console.log(errors);
                    console.log("Nem megfelelő bemenet");
                }else{
                    const saveBill = await this.billRepository.save({
                        date : new Date(),
                        amount : body.balance-15000,
                        transactionname : "registration_cost",
                    })
                    console.log("Ez a forma",new Date());
                    const user = await this.repository.save({
                        companyname : body.companyname,
                        companynumber : body.companynumber,
                        balance : body.balance,
                        password: body.password,
                        taxnumber : body.taxnumber,
                        headquarters : body.headquarters,
                        delegatename : body.delegatename,
                        bills : [saveBill]
                    });
                    res.json(user);
                }
            })
        }catch (error){
            console.log(error);
        }
    }

    getAllUsers = async (req: Request,res:Response) =>{
        try {
            const users = await this.repository.createQueryBuilder("user")
                .leftJoinAndSelect("user.bills","bills")
                .leftJoinAndSelect("user.machines","machines")
                .getMany();
            res.json(users);
        }catch (err){
            console.log(err);
        }
    }

    deleteUserById = async (req: Request,res:Response) =>{
        const userId = req.params.id;
        if(!userId){
            console.log("Hibas input!");
            return res.json({message: "Hibas Input"});
        }

        const userExists = await this.repository.findOneBy({id: userId});
        if(!userExists){
            console.log("Nem letezik az user");
            return res.json({message: "Nem letezik a user"});
        }

        try{
            const deleteUser = await this.repository.delete(userExists);
            console.log("Törölt user: ",deleteUser);
            return res.json({message: "A törlés sikeres"});
        }catch (err){
            console.log(err);
            return res.json({message:"A torles sikertelen"});
        }
    }

    updateUser = async (req: Request,res:Response) =>{
        const body = req.body;
        const userV = new UserUpdateValidator();

        userV.id = body.id;
        userV.companyName = body.companyName;
        userV.balance = body.balance;
        userV.taxnumber = body.taxnumber;
        userV.companynumber = body.companynumber;
        userV.delegatename = body.delegatename;
        userV.headquarters = body.headquarters;

        try{
            validate(userV).then(async errors=>{
                if(errors.length > 0){
                    console.log(errors);
                    res.json({message: "Nem jó bemenet"});
                }else {
                    const user = await this.repository.createQueryBuilder()
                        .update(User)
                        .set({
                            companyname: body.companyName,
                            balance : body.balance,
                            taxnumber : body.taxnumber,
                            companynumber : body.companynumber,
                            delegatename : body.delegatename,
                            headquarters : body.headquarters
                        })
                        .where("id = :id", {id:body.id})
                        .execute();
                    res.json(user)
                }
            });
        }catch (error){
            res.json(error);
        }
    }

    login =  async (req: Request,res:Response) => {
        console.log(req.query.delegatename);
        try{
            const user = await this.repository.findOneBy({delegatename:req.query.delegatename, password: req.query.password});
            //console.log(user);
            res.json(user);
        }catch (err){
            res.json(err);
            return console.log(err,"Not found",404);
        }
    }

    getUserById = async (req: Request,res:Response) =>{
        try {
            const user = await this.repository.createQueryBuilder("user")
                .where("user.id = :id", {id: req.body.id})
                .leftJoinAndSelect("user.bills","bills")
                .getOne();
            console.log(user);
            res.json(user);
        } catch (error) {
            return console.log(error,"Not found",404);
        }
    }


    endRent =  async (req: Request,res:Response) => {
        const body = req.body;
        const user = await this.repository.findOneBy({id:body.userId});
        const machine = await this.machineRepositry.findOneBy({id:body.machineId});
        let fee;
        if(body.broke === "igen"){
             fee = (machine.rentprice*body.days) + machine.depositprice;
        }else
        {
            fee = machine.rentprice*body.days;

        }
        try{
          const b =  await this.machineRepositry.createQueryBuilder()
                .update()
                .set({
                    users: null,
                    rentstatus : "false"
                })
                .where("id= :id",{id:body.machineId})
                .execute();
            console.log(b);
                const a =  await this.billRepository.save({
                transactionname : "kölcsönzés",
                date: new Date(body.date),
                amount: fee,
                users : user,
            });
                console.log(a);
           const u =  await this.repository.createQueryBuilder()
                .update()
                .set({
                    balance : user.balance-fee
                })
                .where("id=:id",{id:user.id})
                .execute();
           console.log(u)
            res.json({message:"sikeres kölcsönzés"});

        }catch (err){
            console.log(err);
            res.json(err);
        }
    }

    replenishment = async (req: Request,res:Response) => {
        const body = req.body;
        const isValidNumber = body.balance;
        const findUser = await this.repository.findOneBy({id:body.id});

        if (typeof isValidNumber == 'number') {
        }else {
            console.log("Hibas input");
            return res.json({message: "Hibas input"});
        }
        try {
            const bill = await this.billRepository.save({
                transactionname: "Egyenlegfeltöltés",
                date: new Date(),
                amount: body.balance,
                users : findUser
            });

            const user = await this.repository.createQueryBuilder()
                .update(User)
                .set({
                    companyname: findUser.companyname,
                    balance : body.balance+findUser.balance,
                    taxnumber : findUser.taxnumber,
                    companynumber : findUser.companynumber,
                    delegatename : findUser.delegatename,
                    headquarters : findUser.headquarters
                })
                .where("id = :id", {id:findUser.id})
                .execute();
            res.json(user);
        }catch (err){
            console.log(err);
            res.json(err);
        }
    }

    createRent = async (req: Request,res:Response) => {
        const findUser = await this.repository.findOneBy({id:req.body.userId});
        const findMachine = await this.machineRepositry.findOneBy({id:req.body.machineId});

        console.log(req.body);
        try{
           const c= await this.machineRepositry.createQueryBuilder("machine")
                .update(Machine)
                .set({
                    rentstatus : "true",
                    users : findUser
                })
                .where("machine.id = :id", {id:findMachine.id})
                .execute();

            res.json(findUser);
        }catch (err){
            console.log(err);
            res.json(err);
        }
    }
}
