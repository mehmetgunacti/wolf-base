import { UUID } from '@constants/common.constant';
import { Note } from '@models/note.model';
import { EntityLocalRepository } from './entity.repository';

export interface NotesLocalRepository extends EntityLocalRepository<Note> {

	toggleTag(id: UUID, name: string): Promise<void>;

}
