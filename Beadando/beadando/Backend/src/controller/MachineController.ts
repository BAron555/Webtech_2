import {DataSource, Repository} from "typeorm";
import {User} from "../entity/User";
import {Request, Response} from "express";
import {BillValidator} from "../Validators/BillValidator";
import {Machine} from "../entity/Machine";
import {MachineValidator} from "../Validators/MachineValidator";
import {validate} from "class-validator";

export class MachineController {
    private repository: Repository<Machine>;
    private userRepository: Repository<User>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(Machine);
        this.userRepository = dataSource.getRepository(User);
    }


    createMachine = async (req: Request, res: Response) => {
        const body = req.body;
        const machineV = new MachineValidator();

        const machine = await this.repository.findOneBy({identifier:body.identifier})

        if(machine){
            return res.json({message: "Ilyen Azonosító már létezik!"});
        }

        machineV.identifier = body.identifier;
        machineV.brand = body.brand;
        machineV.name = body.name;
        machineV.type = body.type;
        machineV.performance = body.performance;
        machineV.weight = body.weight;
        machineV.depositprice = body.depositprice;
        machineV.rentprice = body.rentprice;
        machineV.rentstatus = "false";

        try {
            validate(machineV).then(async errors => {
                if (errors.length > 0) {
                    console.log(errors);
                    console.log("Nem megfelelő bemenet");
                } else {
                    console.log("itt még jo");
                    const machine = await this.repository.save({
                        identifier: body.identifier,
                        brand: body.brand,
                        name: body.name,
                        type: body.type,
                        performance: body.performance,
                        weight: body.weight,
                        depositprice: body.depositprice,
                        rentprice: body.rentprice,
                        rentstatus : "false"
                    });
                    res.json(machine);
                }
            })
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    };

    getAllMachines = async (req: Request, res: Response) => {
        try {
            const machines = await this.repository.createQueryBuilder("machines")
                .getMany();
            res.json(machines);
        } catch (error) {
            console.log(error)
        }
    }

    deleteMachineFromUser = async (req: Request, res: Response) => {
        const machine = await this.repository.findOneBy({id: req.body.machineId});
        try {
            await this.repository.createQueryBuilder("machine")
                .update(Machine)
                .set({
                    users: null
                })
                .where("machine.id = :id", {id: machine.id})
                .execute();
            res.json({message: "sikeres törlés"});
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    }

    deleteMachine = async (req: Request, res: Response) => {
        const machineId = req.params.id;
        if(!machineId){
            console.log("Hibas input!");
            return res.json({message: "Hibas Input"});
        }

        const machineExists = await this.repository.findOneBy({id: machineId});
        if(!machineExists){
            console.log("Nem letezik a gép");
            return res.json({message: "Nem letezik a gép"});
        }

        try{
            await this.repository.createQueryBuilder("machine")
                .update(Machine)
                .set({
                    users : null
                })
                .where("machine.id = :id",{id:machineId})
                .execute();
            const deleteMachine = await this.repository.delete(machineExists);
            console.log("Törölt gép: ",deleteMachine);
            return res.json({message: "A törlés sikeres"});
        }catch (err){
            console.log(err);
            return res.json({message:"A torles sikertelen"});
        }
    }

}