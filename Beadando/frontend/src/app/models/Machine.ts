import {User} from "./User";

export class Machine{
  id!: number;
  identifier!: number;
  brand!: string;
  name!:string;
  type!: string;
  performance!: number;
  weight!: number;
  depositprice!: number;
  rentprice!: number;
  rentstatus!: string;
  user!: User;
}
