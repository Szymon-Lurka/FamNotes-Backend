import { Group } from "src/group/group.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Note extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title:string;
    @Column({
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;
    @Column()
    content: string;
    @Column()
    author: string;
    @ManyToOne(type => Group, entity => entity.notes)
    @JoinColumn()
    group: Group;
}