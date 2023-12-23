import { Entity, RemoteRepositoryService, WolfEntity } from '@lib';
import { BookmarksRemoteRepository, EntityRemoteRepository, NoteContentRemoteRepository, NotesRemoteRepository } from 'lib/repositories/remote';
import { MockBookmarksCollection } from "./collections/bookmarks.collection";
import { MockNoteContentContentCollection } from './collections/note-content.collection';
import { MockNotesCollection } from './collections/notes.collection';

export class MockRemoteRepositoryService implements RemoteRepositoryService {

	bookmarks: BookmarksRemoteRepository = new MockBookmarksCollection();
	notes: NotesRemoteRepository = new MockNotesCollection();
	noteContent: NoteContentRemoteRepository = new MockNoteContentContentCollection();

	getRepository(entity: WolfEntity): EntityRemoteRepository<Entity> {

		switch (entity) {

			case WolfEntity.bookmark: return this.bookmarks;
			case WolfEntity.note: return this.notes;
			case WolfEntity.note_content: return this.noteContent;

		}
		throw Error('Unknown entity');

	}

}
