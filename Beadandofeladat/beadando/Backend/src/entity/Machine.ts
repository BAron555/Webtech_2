import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import {User} from "./User";

@Entity()
export class Machine {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    identifier: number

    @Column()
    brand: string

    @Column()
    name: string

    @Column()
    type: string

    @Column()
    performance: number

    @Column()
    weight: number

    @Column()
    depositprice: number

    @Column()
    rentprice: number

    @Column()
    rentstatus: string

    @ManyToOne(() => User, user => user.machines, {

    })
    users: User;
}
