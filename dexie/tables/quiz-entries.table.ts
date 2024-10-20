import { AppEntities, Progress, UUID } from '@constants';
import { QuizEntry } from '@models';
import { QuizEntryLocalRepository } from '@repositories';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityLocalRepositoryImpl } from './entity.table';

export class DexieQuizEntriesRepositoryImpl extends EntityLocalRepositoryImpl<QuizEntry> implements QuizEntryLocalRepository {

	constructor(db: WolfBaseDB) {
		super(db, AppEntities.quizEntry);
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
			level: Progress.START,
			next: new Date().getTime(),
			question: 'term'

		};
		return { ...instance, ...item, id } as QuizEntry;

	}

	async putEntry(entry: QuizEntry): Promise<void> {

		await this.db.table(this.appEntity.table).put(entry);

	}

}
