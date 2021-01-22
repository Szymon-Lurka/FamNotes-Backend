import { Injectable } from '@nestjs/common';
import { Group } from 'src/group/group.entity';
import { Note } from './note.entity';

@Injectable()
export class NoteService {
    addNote = async noteInfo => {
        let newNote = new Note();
        newNote.title = noteInfo.title;
        newNote.content = noteInfo.content;
        newNote.author = noteInfo.author;
        console.log(noteInfo);
        let group = await Group.findOne({
            id: noteInfo.groupId
        });
        newNote.group = group;
        await newNote.save();
        let notes = await Group.findOne({
            where: {
                id:newNote.group.id,
            },
            relations: ['notes'],
        });
        console.log(notes);
        return notes.notes;
    }
    findNotes = async groupId => {
        let group = await Group.findOne({
            where: {
                id:groupId.groupId
            },
            relations: ['notes']
        });
        return group.notes;
    }
    deleteNote = async noteId => {
        console.log(noteId);
        let note = await Note.findOne({
            id:noteId.noteId
        });
        note.remove();
        return {noteId};
    }
}
