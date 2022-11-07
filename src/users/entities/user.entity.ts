import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Factory } from 'nestjs-seeder';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 20 })
  firstname: string;
  @Column({ length: 20 })
  lastname: string;
  @Factory((faker) => faker.lorem.words(2))
  @Column({ unique: true, nullable: false })
  email: string;
  @Factory((faker) => faker.lorem.words(2))
  @Column({ unique: true, nullable: false })
  username: string;
  @Column({ type: 'varchar', nullable: false })
  password: string;
  @Column({ type: 'varchar', nullable: false, length: 500 })
  imageUrl: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @BeforeInsert()
  async hashedPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
