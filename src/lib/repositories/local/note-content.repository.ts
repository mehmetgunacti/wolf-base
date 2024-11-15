import { NoteContent } from '@models/note.model';
import { EntityLocalRepository } from './entity.repository';

export interface NoteContentLocalRepository extends EntityLocalRepository<NoteContent> { }
