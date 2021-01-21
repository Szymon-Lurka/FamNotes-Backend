import { forwardRef, Module } from '@nestjs/common';
import { GroupModule } from 'src/group/group.module';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

@Module({
  imports: [forwardRef(() => GroupModule)],
  controllers: [NoteController],
  providers: [NoteService],
  exports: [NoteService],
})
export class NoteModule {}
