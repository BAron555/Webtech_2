import {Between, DataSource, Repository} from "typeorm";
import {User} from "../entity/User";
import {Bill} from "../entity/Bill";
import {Request, Response} from "express";
import {BillValidator} from "../Validators/BillValidator";
import {IsDateString, validate} from "class-validator";

export class BillController{
    private repository: Repository<Bill>;
    private userRepository: Repository<User>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(Bill);
        this.userRepository = dataSource.getRepository(User);
    }


    createBill = async (req: Request, res: Response) => {
        const body = req.body;
        const billV = new BillValidator();

        billV.transactionname = body.transactionname;
        billV.amount = body.amount;

        try{
            validate(billV).then(async errors =>{
                if(errors.length > 0){
                    console.log(errors);
                    console.log("Nem megfelelő bemenet");
                }else{
                    const user = await this.userRepository.findOneBy({id: body.userId});
                    const bill = await this.repository.save({
                        transactionname: body.transactionname,
                        date: new Date(),
                        amount: body.amount,
                        users : user
                    });
                    res.json(bill);
                }
            })
        }catch (err){
            console.log(err);
            res.json(err);
        }
    };

    filterDates = async (req: Request,res:Response) =>{
        const body = req.body;
        console.log(body);
        const user = await this.userRepository.findOneBy({id: body.id});
        try {
            const startDate = new Date(body.start);
            const endDate = new Date(body.end);
            const filteredbills = await this.repository
                .createQueryBuilder('bill')
                .getMany();

            const result = filteredbills.filter(b => new Date(b.date) > startDate && new Date(b.date) < endDate)
           return res.json(result);
        } catch (err) {
            console.error(err);
        }
    }



}