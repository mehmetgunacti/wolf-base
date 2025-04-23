import { UUID } from '@constants/common.constant';
import { DbStore } from '@constants/database.constant';
import { AppEntities } from '@constants/entity.constant';
import { IndexedDb } from '@libServices/indexeddb.service';
import { Note, NoteContent } from '@models/note.model';
import { SyncData } from '@models/sync.model';
import { NoteContentLocalRepository } from '@repositories/local/note-content.repository';
import { EntityLocalRepositoryImpl } from './entity.table';

export class NoteContentLocalRepositoryImpl extends EntityLocalRepositoryImpl<NoteContent> implements NoteContentLocalRepository {

	constructor(db: IndexedDb) {
		super(
			db,
			DbStore.note_content,
			DbStore.note_content_sync,
			DbStore.note_content_remote,
			DbStore.note_content_trash,
			AppEntities.noteContent.label
		);
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

	override async list(params?: { orderBy?: string; reverse?: boolean; limit?: number; filterFn?: (t: NoteContent) => boolean; } | undefined): Promise<NoteContent[]> {

		const notes: Note[] = await this.db.readAll<Note>(DbStore.notes);
		const noteNames: Record<UUID, string> = notes.reduce((p, c) => { p[ c.id ] = c.name; return p; }, {} as Record<UUID, string>);
		const list: UUID[] = await this.db.readAllKeys(DbStore.note_content);
		return list.map(id => ({ id, name: noteNames[ id ], content: 'dummy' }));

	}

	override async create(item: Partial<NoteContent>): Promise<NoteContent> {

		const noteContent = await super.create(item);

		// update Note 'modified' field
		await this.db.transaction('readwrite', [
			DbStore.notes,
			DbStore.notes_sync
		], async tx => {

			const id = noteContent.id;
			await tx.modify<Note>(DbStore.notes, id, { modified: new Date().toISOString() } as Note);
			await tx.modify<SyncData>(DbStore.notes_sync, id, { updated: true } as SyncData);

		});
		return noteContent;

	}

	override async update(id: UUID, item: Partial<NoteContent>): Promise<number> {

		const count = await super.update(id, item);

		// update Note 'modified' field
		if (count === 1) {

			await this.db.transaction('readwrite', [
				DbStore.notes,
				DbStore.notes_sync
			], async tx => {

				await tx.modify<Note>(DbStore.notes, id, { modified: new Date().toISOString() } as Note);
				await tx.modify<SyncData>(DbStore.notes_sync, id, { updated: true } as SyncData);

			});

		}
		return count;

	}

}
