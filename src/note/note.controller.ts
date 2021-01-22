import { Body, Controller, Delete, Inject, Post } from '@nestjs/common';
import { AddNoteDto } from './dto/add-note.dto';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
    constructor(
        @Inject(NoteService) private noteService: NoteService,
    ){}

    @Post('/add')
    addNote(
        @Body() noteInfo: AddNoteDto,
    ): Promise<any> {
        return this.noteService.addNote(noteInfo)
    }
    @Post('/get')
    findNotes(
        @Body() groupId: string,
    ): Promise<any> {
        return this.noteService.findNotes(groupId);
    }
    @Delete('/delete')
    deleteNote(
        @Body() noteId: string,
    ): Promise<any> {
        return this.noteService.deleteNote(noteId);
    }
}
