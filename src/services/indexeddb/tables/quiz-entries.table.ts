import { UUID } from '@constants/common.constant';
import { DbStore } from '@constants/database.constant';
import { AppEntities } from '@constants/entity.constant';
import { Progress } from '@constants/quiz.constant';
import { IndexedDb } from '@libServices/indexeddb.service';
import { QuizEntry } from '@models/quiz.model';
import { QuizEntriesLocalRepository } from '@repositories/local/quiz-entry.repository';
import { EntityLocalRepositoryImpl } from './entity.table';

export class QuizEntriesLocalRepositoryImpl extends EntityLocalRepositoryImpl<QuizEntry> implements QuizEntriesLocalRepository {

	constructor(db: IndexedDb) {
		super(
			db,
			DbStore.quiz_entries,
			DbStore.quiz_entries_sync,
			DbStore.quiz_entries_remote,
			DbStore.quiz_entries_trash,
			AppEntities.quizEntry.label
		);
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

		await this.db.put<QuizEntry>(this.table, entry);

	}

}
