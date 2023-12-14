import { LocalRepositoryNames, SyncData, WolfEntity, toggleArrayItem } from '@lib';
import { UUID } from 'lib/constants/common.constant';
import { Note } from 'lib/models/note.model';
import { NotesLocalRepository } from 'lib/repositories/local';
import { v4 as uuidv4 } from 'uuid';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityLocalRepositoryImpl } from './entity.table';

export class DexieNotesRepositoryImpl extends EntityLocalRepositoryImpl<Note> implements NotesLocalRepository {

	constructor(db: WolfBaseDB) {
		super(db, WolfEntity.note);
	}

	protected override newItemFromPartial(item: Partial<Note>): Note {

		const id: UUID = uuidv4();
		return this.newInstance(id, item);

	}

	protected override newInstance(id: UUID, item: Partial<Note>): Note {

		const instance: Note = {

			id,
			name: '',
			content: '',
			tags: []

		};
		return { ...instance, ...item, id } as Note;

	}

	async toggleTag(id: UUID, name: string): Promise<void> {

		await this.db.transaction('rw', [
			LocalRepositoryNames.notes,
			LocalRepositoryNames.notes_sync
		], async () => {

			// update notes table
			const count = await this.db.notes.where({ id }).modify((note: Note): void => {

				note.tags = toggleArrayItem(note.tags, name);

			});

			// update syncData
			if (count > 0)
				await this.db.notes_sync.where('id').equals(id).modify({ updated: true } as Partial<SyncData>);

		});

	}

}
