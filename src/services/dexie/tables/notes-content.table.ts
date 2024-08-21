import { LocalRepositoryNames, Note, NoteContent, SyncData, UUID, AppEntityType } from '@lib';
import { NoteContentLocalRepository } from 'lib/repositories/local';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityLocalRepositoryImpl } from './entity.table';

export class DexieNoteContentRepositoryImpl extends EntityLocalRepositoryImpl<NoteContent> implements NoteContentLocalRepository {

	constructor(db: WolfBaseDB) {
		super(db, AppEntityType.noteContent);
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
		await this.db.transaction('rw', [
			LocalRepositoryNames.notes,
			LocalRepositoryNames.notes_sync
		], async () => {

			const id = noteContent.id;
			await this.db.notes.where({ id }).modify({ modified: new Date().toISOString() } as Note);
			await this.db.notes_sync.where({ id }).modify({ updated: true } as SyncData);

		});
		return noteContent;

	}

	override async update(id: UUID, item: Partial<NoteContent>): Promise<number> {

		const count = await super.update(id, item);

		// update Note 'modified' field
		if (count === 1) {

			await this.db.transaction('rw', [
				LocalRepositoryNames.notes,
				LocalRepositoryNames.notes_sync
			], async () => {

				await this.db.notes.where({ id }).modify({ modified: new Date().toISOString() } as Note);
				await this.db.notes_sync.where({ id }).modify({ updated: true } as SyncData);

			});

		}
		return count;

	}

}
