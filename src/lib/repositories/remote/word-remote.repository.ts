import { Word } from 'lib/models';
import { EntityRemoteRepository } from './entity-remote.repository';

export interface WordsRemoteRepository extends EntityRemoteRepository<Word> {
}
