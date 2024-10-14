import { UUID } from '@constants';
import { Note } from '@models';
import { EntityLocalRepository } from './entity.repository';

export interface NotesLocalRepository extends EntityLocalRepository<Note> {

	toggleTag(id: UUID, name: string): Promise<void>;

}
