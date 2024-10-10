import { CartItem } from 'src/cart/entities/cart-item.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
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

  @OneToMany(() => CartItem, (cartItem) => cartItem.product, { cascade: true })
  cartItems: CartItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
