import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";
import { SuperClass } from './SuperClass';
@Entity()
@Unique(["product", "order"])
export class OrderLine extends SuperClass {
    @Column()
    quantity: number
    @ManyToOne(() => Product, (product) => product.orderLine, { nullable: false })
    product: Product
    @ManyToOne(() => Order, (order) => order.orderLine, { nullable: false })
    order: Order
}