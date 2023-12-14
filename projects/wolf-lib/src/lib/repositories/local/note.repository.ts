import { UUID } from 'lib/constants';
import { Note } from 'lib/models';
import { EntityLocalRepository } from './entity.repository';

export interface NotesLocalRepository extends EntityLocalRepository<Note> {

	toggleTag(id: UUID, name: string): Promise<void>;

}
