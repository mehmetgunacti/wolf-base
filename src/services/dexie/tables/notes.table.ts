import { AppEntities, LocalRepositoryNames, LogCategory, SyncData, toggleArrayItem } from '@lib';
import { UUID } from 'lib/constants/common.constant';
import { Note } from 'lib/models/note.model';
import { NotesLocalRepository } from 'lib/repositories/local';
import { v4 as uuidv4 } from 'uuid';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityLocalRepositoryImpl } from './entity.table';

export class DexieNotesRepositoryImpl extends EntityLocalRepositoryImpl<Note> implements NotesLocalRepository {

	constructor(db: WolfBaseDB) {
		super(db, AppEntities.note);
	}

	override async moveToTrash(id: UUID): Promise<void> {

		await this.db.transaction('rw', [
			AppEntities.note.table,
			AppEntities.note.table_sync,
			AppEntities.note.table_trash,
			AppEntities.noteContent.table,
			AppEntities.noteContent.table_sync,
			AppEntities.noteContent.table_trash,
			LocalRepositoryNames.logs
		], async () => {

			// delete Note from notes table
			const note = await this.db.table(this.appEntity.table).get(id);
			if (note) {

				await this.db.table(this.appEntity.table_trash).add(note);
				await this.db.table(this.appEntity.table).delete(id);

			}
			await this.db.table(this.appEntity.table_sync).where({ id }).modify({ deleted: true } as SyncData);

			// delete NoteContent from note_content table
			const noteContent = await this.db.table(AppEntities.noteContent.table).get(id);
			if (noteContent) {

				await this.db.table(AppEntities.noteContent.table_trash).add(noteContent);
				await this.db.table(AppEntities.noteContent.table).delete(id);

			}
			await this.db.table(AppEntities.noteContent.table_sync).where({ id }).modify({ deleted: true } as SyncData);

			const children = await this.db.table(this.appEntity.table).where({ parentId: id }).toArray();
			for (const child of children) {

				await this.db.table(this.appEntity.table).where({ id: child.id }).modify({ parentId: null } as Note);
				await this.db.table(this.appEntity.table_sync).where({ id: child.id }).modify({ updated: true } as SyncData);

			}

			// add log
			await this.db.table(LocalRepositoryNames.logs).add({

				category: LogCategory.entity_deleted,
				date: new Date().toISOString(),
				message: `${this.appEntity.label} moved to trash`,
				entityId: id,
				entityName: note?.name ?? '[n/a]'

			});

		});

	}

	protected override newItemFromPartial(item: Partial<Note>): Note {

		const id: UUID = uuidv4();
		return this.newInstance(id, item);

	}

	protected override newInstance(id: UUID, item: Partial<Note>): Note {

		const instance: Note = {

			id,
			name: '',
			parentId: null,
			tags: [],
			modified: new Date().toISOString()

		};
		return { ...instance, ...item, id } as Note;

	}

	async toggleTag(id: UUID, name: string): Promise<void> {

		await this.db.transaction('rw', [
			AppEntities.note.table,
			AppEntities.note.table_sync
		], async () => {

			// update notes table
			const count = await this.db.table(this.appEntity.table).where({ id }).modify((note: Note): void => {

				note.tags = toggleArrayItem(note.tags, name);

			});

			// update syncData
			if (count > 0)
				await this.db.table(this.appEntity.table_sync).where('id').equals(id).modify({ updated: true } as Partial<SyncData>);

		});

	}

}
