import { Note } from "src/note/note.entity";
import { User } from "src/user/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    description:string;
    @Column()
    tag: string;
    @OneToMany (type => User, entity => entity.group)
    @JoinColumn()
    users:User[];
    @OneToMany(type => Note, entity => entity.group)
    notes:Note[];
}