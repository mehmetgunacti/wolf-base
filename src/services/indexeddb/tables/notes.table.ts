import { UUID } from 'lib/constants/common.constant';
import { Note, NoteContent } from 'lib/models/note.model';
import { NotesLocalRepository } from 'lib/repositories/local';
import { v4 as uuidv4 } from 'uuid';
import { EntityLocalRepositoryImpl } from './entity.table';
import { IndexedDb } from '@libServices';
import { AppEntities, DbStore, LogCategory } from '@constants';
import { SyncData } from '@models';
import { toggleArrayItem } from '@utils';

export class NotesLocalRepositoryImpl extends EntityLocalRepositoryImpl<Note> implements NotesLocalRepository {

	constructor(db: IndexedDb) {
		super(db, AppEntities.note);
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
			const note = await tx.read<Note>(this.appEntity.table, id);
			if (note) {

				await tx.add(this.appEntity.table_trash, note);
				await tx.delete(this.appEntity.table, id);

			}
			await tx.modify<SyncData>(this.appEntity.table_sync, id, { deleted: true } as SyncData);

			// delete NoteContent from note_content table
			const noteContent = await tx.read<NoteContent>(AppEntities.noteContent.table, id);
			if (noteContent) {

				await tx.add(AppEntities.noteContent.table_trash, noteContent);
				await tx.delete(AppEntities.noteContent.table, id);

			}
			await tx.modify(AppEntities.noteContent.table_sync, id, { deleted: true } as SyncData);

			const children = (await tx.readAll<Note>(this.appEntity.table)).filter(e => e.parentId === id);
			for (const child of children) {

				const note = await tx.read<Note>(this.appEntity.table, child.id);
				if (note)
					await tx.modify<Note>(this.appEntity.table, child.id, { parentId: null } as Note);

				const syncData = await tx.read<SyncData>(this.appEntity.table_sync, child.id);
				if (syncData)
					await tx.modify<SyncData>(this.appEntity.table_sync, child.id, { updated: true } as SyncData);

			}

			// add log
			await tx.add(DbStore.logs, {

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
