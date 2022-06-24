import {IsDate, IsDateString, IsNumber, IsString} from "class-validator";

export class BillValidator {

    @IsString()
    transactionname: string;

    @IsNumber()
    amount:number;

}
