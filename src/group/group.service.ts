import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Group } from './group.entity';

@Injectable()
export class GroupService {
    createGroup = async data => {
        const newGroup = new Group();
        newGroup.name = data.name;
        newGroup.description = data.description;
        newGroup.tag = data.groupTag;
        await newGroup.save();
        const user = await User.findOne({id: data.userID});
        user.group = newGroup;
        user.save();
        return {
            isSuccess: true,
            id: newGroup.id,
            groupTag: newGroup.tag,
            description: newGroup.description,
            name: newGroup.name,
            login: user.login,
        }
    }
    findUser = async id => {
        const user = await User.findOne({id});
        return user;
    }
    exitGroup = async id => {
        const user = await User.findOne({
            id
        });
        user.group = null;
        user.save();
        return user;
    }
    joinGroup = async data => {
        const group = await Group.findOne({tag:data.groupTag});
        if (!group) return {isSuccess:false, message:`Nie znaleziono grupy o tagu ${data.groupTag}`};
        const user = await User.findOne({id: data.userID});
        user.group = group;
        user.save();
        return {isSuccess: true, message:`Dołączono do grupy!`, group};
    }
}
