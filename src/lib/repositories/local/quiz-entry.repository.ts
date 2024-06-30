import { QuizEntry } from 'lib/models';
import { EntityLocalRepository } from './entity.repository';

export interface QuizEntryLocalRepository extends EntityLocalRepository<QuizEntry> { }
