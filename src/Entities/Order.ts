import { Column, Entity, Generated, OneToMany } from "typeorm";
import { OrderLine } from "./OrderLine";
import { SuperClass } from './SuperClass';

@Entity()
export class Order extends SuperClass {
    @Column()
    firstName: string
    @Column()
    lastName: string
    @Column()
    mobNum: string
    @Column()
    city: string
    @Column()
    address: string
    @Column()
    @Generated('uuid')
    orderNum: string
    @Column({ default: false })
    completed: boolean
    @OneToMany(() => OrderLine, (OrderLine) => OrderLine.order)
    orderLine: OrderLine[]
}