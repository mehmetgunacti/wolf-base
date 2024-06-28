import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Entity, EntityName, FirestoreConfig, WolfEntity } from '@lib';
import { Store } from "@ngrx/store";
import { BookmarksRemoteRepository, EntityRemoteRepository, NoteContentRemoteRepository } from 'lib/repositories/remote';
import { NotesRemoteRepository } from 'lib/repositories/remote/note-remote.repository';
import { WordsRemoteRepository } from 'lib/repositories/remote/word-remote.repository';
import { RemoteRepositoryService } from 'lib/services/remote-repository.service';
import { FirestoreAPIClient, FirestoreAPIClientImpl } from "lib/utils/firestore-rest-client/firestore-api.tool";
import { VoidBookmarksCollection } from "services/mock-services/remotestorage/collections/bookmarks.collection";
import { VoidNoteContentCollection } from 'services/mock-services/remotestorage/collections/note-content.collection';
import { VoidNotesCollection } from 'services/mock-services/remotestorage/collections/notes.collection';
import { VoidWordsCollection } from 'services/mock-services/remotestorage/collections/words.collection';
import { selCore_firestoreConfig } from "store/selectors/core-configuration.selectors";
import { BookmarksFirestoreCollectionImpl, WordsFirestoreCollectionImpl } from "./collections";
import { NoteContentContentFirestoreCollectionImpl } from './collections/note-content.collection';
import { NotesFirestoreCollectionImpl } from './collections/notes.collection';

export class FirestoreRemoteRepositoryServiceImpl implements RemoteRepositoryService {

	public bookmarks!: BookmarksRemoteRepository;
	public notes!: NotesRemoteRepository;
	public noteContent!: NoteContentRemoteRepository;
	public words!: WordsRemoteRepository;

	private store: Store = inject(Store);
	private http: HttpClient = inject(HttpClient);
	private firestore: FirestoreAPIClient = new FirestoreAPIClientImpl(this.http);

	constructor() {

		// initialize with mock collections
		this.init();

		// update when config available
		this.store.select(selCore_firestoreConfig).subscribe(config => {

			this.init(config);

		});

	}

	getRepository(entity: EntityName): EntityRemoteRepository<Entity> {

		switch (entity.name) {

			case WolfEntity.bookmark.name: return this.bookmarks;
			case WolfEntity.note.name: return this.notes;
			case WolfEntity.note_content.name: return this.noteContent;
			case WolfEntity.word.name: return this.words;

		}
		throw Error('Unknown entity');

	}

	private init(config: FirestoreConfig | null = null): void {

		if (config) {

			this.bookmarks = new BookmarksFirestoreCollectionImpl(this.firestore, config);
			this.notes = new NotesFirestoreCollectionImpl(this.firestore, config);
			this.noteContent = new NoteContentContentFirestoreCollectionImpl(this.firestore, config);
			this.words = new WordsFirestoreCollectionImpl(this.firestore, config);

		} else {

			this.bookmarks = new VoidBookmarksCollection();
			this.notes = new VoidNotesCollection();
			this.noteContent = new VoidNoteContentCollection();
			this.words = new VoidWordsCollection();

		}

	}

}
