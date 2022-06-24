import {Bill} from "./Bill";
import {Machine} from "./Machine";

export class User{
  id!: number;
  companyname!: string;
  delegatename!: string;
  password!:string;
  taxnumber!: number;
  companynumber!: number;
  headquarters!:string;
  balance!: number;
  bills!: Bill[];
  machines!: Machine[];
}
