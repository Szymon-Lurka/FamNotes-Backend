import { Group } from "src/group/group.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 255,
    })
    login:string;

    @Column()
    pwdHash: string;

    @Column({
        nullable:true,
        default:null,
    })
    currentTokenId: string | null;
    @ManyToOne(type => Group, entity => entity.users)
    group: Group;
}