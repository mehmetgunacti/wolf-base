import { QuizProgress, Progress, WolfEntity } from '@lib';
import { UUID } from 'lib/constants/common.constant';
import { QuizEntryLocalRepository } from 'lib/repositories/local/quiz-entry.repository';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityLocalRepositoryImpl } from './entity.table';

export class DexieQuizEntriesRepositoryImpl extends EntityLocalRepositoryImpl<QuizProgress> implements QuizEntryLocalRepository {

	constructor(db: WolfBaseDB) {
		super(db, WolfEntity.quizEntry);
	}

	protected override newItemFromPartial(item: Partial<QuizProgress>): QuizProgress {

		if (item.id && item.name)
			return this.newInstance(item.id, item);
		throw Error('QuizEntry `id` and/or `name` fields not set');

	}

	protected override newInstance(id: UUID, item: Partial<QuizProgress>): QuizProgress {

		const instance: QuizProgress = {

			id,
			name: '',
			level: Progress.START,
			next: new Date().getTime()

		};
		return { ...instance, ...item, id } as QuizProgress;

	}

}
