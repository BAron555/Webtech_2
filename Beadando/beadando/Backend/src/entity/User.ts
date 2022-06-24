import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from "typeorm"
import {Bill} from "./Bill";
import {Machine} from "./Machine";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    companyname: string

    @Column()
    delegatename: string

    @Column()
    password: string

    @Column()
    taxnumber: number

    @Column()
    companynumber: number

    @Column()
    headquarters: string

    @Column()
    balance: number

    @OneToMany(() => Bill, bills => bills.users ,{})
    bills: Bill[];

    @OneToMany(() => Machine, machines => machines.users, {        cascade: true,
    })
    machines: Machine[];

}
