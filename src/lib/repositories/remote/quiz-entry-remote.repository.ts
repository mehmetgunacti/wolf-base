import { QuizEntry } from '@models/quiz.model';
import { EntityRemoteRepository } from './entity-remote.repository';

export interface QuizEntriesRemoteRepository extends EntityRemoteRepository<QuizEntry> { }
