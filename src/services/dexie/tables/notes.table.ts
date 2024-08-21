import { AppEntities, AppEntityType, LocalRepositoryNames, LogCategory, SyncData, capitalize, toggleArrayItem } from '@lib';
import { UUID } from 'lib/constants/common.constant';
import { Note } from 'lib/models/note.model';
import { NotesLocalRepository } from 'lib/repositories/local';
import { v4 as uuidv4 } from 'uuid';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityLocalRepositoryImpl } from './entity.table';

export class DexieNotesRepositoryImpl extends EntityLocalRepositoryImpl<Note> implements NotesLocalRepository {

	constructor(db: WolfBaseDB) {
		super(db, AppEntityType.note);
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
			const note = await this.db.notes.get(id);
			if (note) {

				await this.db.notes_trash.add(note);
				await this.db.notes.delete(id);

			}
			await this.db.notes_sync.where({ id }).modify({ deleted: true } as SyncData);

			// delete NoteContent from note_content table
			const noteContent = await this.db.note_content.get(id);
			if (noteContent) {

				await this.db.note_content_trash.add(noteContent);
				await this.db.note_content.delete(id);

			}
			await this.db.note_content_sync.where({ id }).modify({ deleted: true } as SyncData);

			const children = await this.db.notes.where({ parentId: id }).toArray();
			for (const child of children) {

				await this.db.notes.where({ id: child.id }).modify({ parentId: null } as Note);
				await this.db.notes_sync.where({ id: child.id }).modify({ updated: true } as SyncData);

			}

			// add log
			await this.db.logs.add({

				category: LogCategory.entity_deleted,
				date: new Date().toISOString(),
				message: `"${capitalize(AppEntities[this.entity].name)}" moved to trash`,
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
			const count = await this.db.notes.where({ id }).modify((note: Note): void => {

				note.tags = toggleArrayItem(note.tags, name);

			});

			// update syncData
			if (count > 0)
				await this.db.notes_sync.where('id').equals(id).modify({ updated: true } as Partial<SyncData>);

		});

	}

}
