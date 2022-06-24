import {IsNumber, IsString} from "class-validator";

export class MachineValidator {

    @IsNumber()
    identifier: number;

    @IsString()
    brand: string;

    @IsString()
    name: string;

    @IsString()
    type: string;

    @IsNumber()
    performance: number;

    @IsNumber()
    weight:number;

    @IsNumber()
    depositprice:number;

    @IsNumber()
    rentprice:number;

    @IsString()
    rentstatus: string;

}
