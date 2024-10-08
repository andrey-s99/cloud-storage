import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;
}
