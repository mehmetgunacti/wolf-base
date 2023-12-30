import { Note } from 'lib/models';
import { EntityRemoteRepository } from './entity-remote.repository';

export interface NotesRemoteRepository extends EntityRemoteRepository<Note> {
}
