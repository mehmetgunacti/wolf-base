import { Note } from '@models/note.model';
import { EntityRemoteRepository } from './entity-remote.repository';

export interface NotesRemoteRepository extends EntityRemoteRepository<Note> { }
