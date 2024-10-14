import { Note } from '@models';
import { EntityRemoteRepository } from './entity-remote.repository';

export interface NotesRemoteRepository extends EntityRemoteRepository<Note> {
}
