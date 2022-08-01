import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Product } from "./Product";
import { SuperClass } from './SuperClass';
@Entity()
export class Category extends SuperClass {
    @Column()
    name: string
    @OneToMany(() => Product, (product) => product.category)
    products: Product[]
}