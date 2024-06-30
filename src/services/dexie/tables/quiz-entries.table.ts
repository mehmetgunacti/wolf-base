import { QuizEntry, QuizProgress, WolfEntity } from '@lib';
import { UUID } from 'lib/constants/common.constant';
import { QuizEntryLocalRepository } from 'lib/repositories/local/quiz-entry.repository';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityLocalRepositoryImpl } from './entity.table';

export class DexieQuizEntriesRepositoryImpl extends EntityLocalRepositoryImpl<QuizEntry> implements QuizEntryLocalRepository {

	constructor(db: WolfBaseDB) {
		super(db, WolfEntity.quizEntry);
	}

	protected override newItemFromPartial(item: Partial<QuizEntry>): QuizEntry {

		if (item.id && item.name)
			return this.newInstance(item.id, item);
		throw Error('QuizEntry `id` and/or `name` fields not set');

	}

	protected override newInstance(id: UUID, item: Partial<QuizEntry>): QuizEntry {

		const instance: QuizEntry = {

			id,
			name: '',
			level: QuizProgress.START,
			next: new Date().getTime()

		};
		return { ...instance, ...item, id } as QuizEntry;

	}

}
