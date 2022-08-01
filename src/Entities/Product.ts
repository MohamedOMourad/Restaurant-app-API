import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Category } from "./Category";
import { OrderLine } from "./OrderLine";
import { SuperClass } from './SuperClass';
@Entity()
export class Product extends SuperClass {
    @Column()
    name: string
    @Column()
    description: string
    @Column()
    price: number
    @Column({default:false})
    popular: boolean
    @ManyToOne(() => Category, (category) => category.products, { nullable: false })
    category: Category
    @OneToMany(() => OrderLine, (orderLine) => orderLine.product)
    orderLine: OrderLine[]
}