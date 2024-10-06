import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 10 })
  product_type!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  product_name!: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  sale_price!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  buyer_name!: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  income!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  receiver_name!: string;

  @Column({ type: 'timestamp', nullable: false })
  sale_date!: Date;
}


