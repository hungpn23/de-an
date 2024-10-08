import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  pincode: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  notes: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
