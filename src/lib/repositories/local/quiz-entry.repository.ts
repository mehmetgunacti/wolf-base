import { QuizEntry } from '@models/quiz.model';
import { EntityLocalRepository } from './entity.repository';

export interface QuizEntriesLocalRepository extends EntityLocalRepository<QuizEntry> {

	putEntry(entry: QuizEntry): Promise<void>;

}
