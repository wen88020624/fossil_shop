import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('product_type')
export class ProductType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 10, nullable: false })
    code!: string;
    
    @Column({ type: 'varchar', length: 255, nullable: false })
    name!: string;
}