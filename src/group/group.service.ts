import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Group } from './group.entity';

@Injectable()
export class GroupService {
    createGroup = async data => {
        let isGroupExist = await Group.findOne({
            name: data.name
        });
        if(isGroupExist) {
            return {isSuccess: false, message: 'Istnieje już taka grupa!'}
        }
        let isTagGroupExist = await Group.findOne({
            tag: data.groupTag,
        })
        if(data.groupTag.length > 6 || isTagGroupExist) {
            return {isSuccess: false, message: 'Tag już istnieje lub ma więcej niż 6 znaków!'}
        }
        if(data.description.length > 300) {
            return {isSuccess:false, message: 'Opis nie może być dłuższy niż 300 znaków!'}
        }
        const newGroup = new Group();
        newGroup.name = data.name;
        newGroup.description = data.description;
        newGroup.tag = data.groupTag;
        await newGroup.save();
        console.log(data);
        const user = await User.findOne({id: data.userID});
        console.log(data.userID);
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
            id: id.userID
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
