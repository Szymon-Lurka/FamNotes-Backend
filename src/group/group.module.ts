import { forwardRef, Module } from '@nestjs/common';
import { NoteModule } from 'src/note/note.module';
import { UserModule } from 'src/user/user.module';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => NoteModule)],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
