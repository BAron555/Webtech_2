import {IsNumber, IsString} from "class-validator";

export class UserValidator {

    @IsString()
    companyName: string;

    @IsString()
    delegatename: string;

    @IsString()
    password: string;

    @IsNumber()
    taxnumber: number;

    @IsNumber()
    companynumber: number;

    @IsString()
    headquarters: string;

    @IsNumber()
    balance: number;

}
export class UserUpdateValidator {

    @IsNumber()
    id : number;

    @IsString()
    companyName: string;

    @IsString()
    delegatename: string;

    @IsNumber()
    taxnumber: number;

    @IsNumber()
    companynumber: number;

    @IsString()
    headquarters: string;

    @IsNumber()
    balance: number;

}
