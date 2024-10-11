import { QuizEntry } from 'lib/models';
import { EntityRemoteRepository } from './entity-remote.repository';

export interface QuizEntriesRemoteRepository extends EntityRemoteRepository<QuizEntry> {
}
