import { Body, Controller, Inject, Post } from '@nestjs/common';
import { NewGroupDto } from './dto/new-group.dto';
import { GroupService } from './group.service';
import {JoinGroupDto} from './dto/join-group.dto';

@Controller('group')
export class GroupController {
    constructor(
        @Inject(GroupService) private groupService: GroupService,
    ) {}
    @Post('/create')
    createGroup(
        @Body() newGroupData: NewGroupDto,
    ): Promise<any> {
        return this.groupService.createGroup(newGroupData);
    }
    @Post('/join')
    joinGroup(
        @Body() joinGroupData: JoinGroupDto,
    ): Promise<any> {
        return this.groupService.joinGroup(joinGroupData);
    }
    @Post('/exit')
    exitGroup(
        @Body() userID: string,
    ): Promise<any> {
        return this.groupService.exitGroup(userID);
    }
}
