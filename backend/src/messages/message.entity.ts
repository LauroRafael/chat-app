import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    de: number;

    @Column()
    para: number;

    @Column()
    texto: string;

    @CreateDateColumn()
    createdAt: Date;
}
