import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import {User} from "./User";
import {IsDateString} from "class-validator";

@Entity()
export class Bill {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    transactionname: string;

    @Column({nullable: true,type: 'datetime'})
    date: Date;

    @Column()
    amount: number;

    @ManyToOne(() => User, user => user.bills, {
        eager: true,
        cascade: true,
         onDelete: "CASCADE"
    })
    users: User;
}
