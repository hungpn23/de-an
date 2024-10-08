import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  brand: string;

  @Column()
  price: number;

  @Column()
  salePrice: number;

  @Column()
  totalStock: number;

  @Column()
  averageReview: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
