import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Entity, EntityName, FirestoreConfig, WolfEntity } from '@lib';
import { Store } from "@ngrx/store";
import { BookmarksRemoteRepository, EntityRemoteRepository } from 'lib/repositories/remote';
import { RemoteRepositoryService } from 'lib/services/remote-repository.service';
import { FirestoreAPIClient, FirestoreAPIClientImpl } from "lib/utils/firestore-rest-client/firestore-api.tool";
import { VoidBookmarksCollection } from "services/mock-services/remotestorage/collections/bookmarks.collection";
import { selCoreFirestoreConfig } from "store/selectors/core-configuration.selectors";
import { BookmarksFirestoreCollectionImpl } from "./collections";
import { NotesRemoteRepository } from 'lib/repositories/remote/note-remote.repository';
import { NotesFirestoreCollectionImpl } from './collections/notes.collection';
import { VoidNotesCollection } from 'services/mock-services/remotestorage/collections/notes.collection';

export class FirestoreRemoteRepositoryServiceImpl implements RemoteRepositoryService {

	public bookmarks!: BookmarksRemoteRepository;
	public notes!: NotesRemoteRepository;

	private store: Store = inject(Store);
	private http: HttpClient = inject(HttpClient);
	private firestore: FirestoreAPIClient = new FirestoreAPIClientImpl(this.http);

	constructor() {

		// initialize with mock collections
		this.init();

		// update when config available
		this.store.select(selCoreFirestoreConfig).subscribe(config => {

			this.init(config);

		});

	}

	getRepository(entity: EntityName): EntityRemoteRepository<Entity> {

		switch (entity.name) {

			case WolfEntity.bookmark.name: return this.bookmarks;
			case WolfEntity.note.name: return this.notes;

		}
		throw Error('Unknown entity');

	}

	private init(config: FirestoreConfig | null = null): void {

		if (config) {

			this.bookmarks = new BookmarksFirestoreCollectionImpl(this.firestore, config);
			this.notes = new NotesFirestoreCollectionImpl(this.firestore, config);

		} else {

			this.bookmarks = new VoidBookmarksCollection();
			this.notes = new VoidNotesCollection();

		}

	}

}
