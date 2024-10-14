import { QuizEntry } from '@models';
import { EntityLocalRepository } from './entity.repository';

export interface QuizEntryLocalRepository extends EntityLocalRepository<QuizEntry> {

	putEntry(entry: QuizEntry): Promise<void>;

}
