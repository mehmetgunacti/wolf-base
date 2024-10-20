import { AppEntities, UUID } from '@constants';
import { IndexedDb } from '@libServices';
import { Note, NoteContent, SyncData } from '@models';
import { NoteContentLocalRepository } from 'lib/repositories/local';
import { EntityLocalRepositoryImpl } from './entity.table';

export class NoteContentLocalRepositoryImpl extends EntityLocalRepositoryImpl<NoteContent> implements NoteContentLocalRepository {

	constructor(db: IndexedDb) {
		super(db, AppEntities.noteContent);
	}

	protected override newItemFromPartial(item: NoteContent): NoteContent {

		return this.newInstance(item.id, item);

	}

	protected override newInstance(id: UUID, item: NoteContent): NoteContent {

		const instance: NoteContent = {

			id,
			name: '',
			content: ''

		};
		return { ...instance, ...item, id } as NoteContent;

	}

	override async create(item: Partial<NoteContent>): Promise<NoteContent> {

		const noteContent = await super.create(item);

		// update Note 'modified' field
		await this.db.transaction('readwrite', [
			AppEntities.note.table,
			AppEntities.note.table_sync
		], async tx => {

			const id = noteContent.id;
			await tx.modify<Note>(AppEntities.note.table, id, { modified: new Date().toISOString() } as Note);
			await tx.modify<SyncData>(AppEntities.note.table_sync, id, { updated: true } as SyncData);

		});
		return noteContent;

	}

	override async update(id: UUID, item: Partial<NoteContent>): Promise<number> {

		const count = await super.update(id, item);

		// update Note 'modified' field
		if (count === 1) {

			await this.db.transaction('readwrite', [
				AppEntities.note.table,
				AppEntities.note.table_sync
			], async tx => {

				await tx.modify<Note>(AppEntities.note.table, id, { modified: new Date().toISOString() } as Note);
				await tx.modify<SyncData>(AppEntities.note.table_sync, id, { updated: true } as SyncData);

			});

		}
		return count;

	}

}
