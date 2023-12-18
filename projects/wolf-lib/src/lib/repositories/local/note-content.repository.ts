import { NoteContent } from 'lib/models';
import { EntityLocalRepository } from './entity.repository';

export interface NotesContentLocalRepository extends EntityLocalRepository<NoteContent> { }
