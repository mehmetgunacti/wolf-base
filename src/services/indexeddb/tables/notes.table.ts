import { UUID } from '@constants/common.constant';
import { DbStore } from '@constants/database.constant';
import { AppEntities } from '@constants/entity.constant';
import { LogCategory } from '@constants/log.constant';
import { IndexedDb } from '@libServices/indexeddb.service';
import { Note, NoteContent } from '@models/note.model';
import { SyncData } from '@models/sync.model';
import { NotesLocalRepository } from '@repositories/local/note.repository';
import { toggleArrayItem } from '@utils/array.util';
import { v4 as uuidv4 } from 'uuid';
import { EntityLocalRepositoryImpl } from './entity.table';

export class NotesLocalRepositoryImpl extends EntityLocalRepositoryImpl<Note> implements NotesLocalRepository {

	constructor(db: IndexedDb) {
		super(
			db,
			DbStore.notes,
			DbStore.notes_sync,
			DbStore.notes_remote,
			DbStore.notes_trash,
			AppEntities.note.label
		);
	}

	override async moveToTrash(id: UUID): Promise<void> {

		await this.db.transaction('readwrite', [
			DbStore.notes,
			DbStore.notes_sync,
			DbStore.notes_trash,
			DbStore.note_content,
			DbStore.note_content_sync,
			DbStore.note_content_trash,
			DbStore.logs
		], async tx => {

			// delete Note from notes table
			const note = await tx.read<Note>(this.table, id);
			if (note) {

				await tx.add(this.table_trash, note);
				await tx.delete(this.table, id);

			}
			await tx.modify<SyncData>(this.table_sync, id, { deleted: true } as SyncData);

			// delete NoteContent from note_content table
			const noteContent = await tx.read<NoteContent>(DbStore.note_content, id);
			if (noteContent) {

				await tx.add(DbStore.note_content_trash, noteContent);
				await tx.delete(DbStore.note_content, id);

			}
			await tx.modify(DbStore.note_content_sync, id, { deleted: true } as SyncData);

			const children = (await tx.readAll<Note>(this.table)).filter(e => e.parentId === id);
			for (const child of children) {

				const note = await tx.read<Note>(this.table, child.id);
				if (note)
					await tx.modify<Note>(this.table, child.id, { parentId: null } as Note);

				const syncData = await tx.read<SyncData>(this.table_sync, child.id);
				if (syncData)
					await tx.modify<SyncData>(this.table_sync, child.id, { updated: true } as SyncData);

			}

			// add log
			await tx.add(DbStore.logs, {

				category: LogCategory.entity_deleted,
				date: new Date().toISOString(),
				message: `${this.label} moved to trash`,
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
			urls: [],
			modified: new Date().toISOString()

		};
		return { ...instance, ...item, id } as Note;

	}

	async toggleTag(id: UUID, name: string): Promise<void> {

		await this.db.transaction('readwrite', [
			DbStore.notes,
			DbStore.notes_sync
		], async tx => {

			const entity = await tx.read<Note>(DbStore.notes, id);
			if (entity) {

				const updated = { ...entity, tags: toggleArrayItem(entity.tags, name) };
				await tx.put(DbStore.notes, updated);
				await tx.modify(DbStore.notes_sync, id, { updated: true } as Partial<SyncData>);

			}

		});

	}

}
