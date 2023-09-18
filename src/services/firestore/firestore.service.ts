import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { BookmarksCollection, FirestoreConfig, RemoteStorageService } from "lib";
import { FirestoreAPIClient, FirestoreAPIClientImpl } from "lib/utils/firestore-rest-client/firestore-api.tool";
import { MockBookmarksCollection } from "services/mock-services/remotestorage/collections/bookmarks.collection";
import { selCoreFirestoreConfig } from "store/selectors/core-configuration.selectors";
import { BookmarksFirestoreCollectionImpl } from "./collections";

export class FirestoreRemoteStorageServiceImpl implements RemoteStorageService {

	public bookmarks!: BookmarksCollection;

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

	private init(config: FirestoreConfig | null = null): void {

		if (config) {

			this.bookmarks = new BookmarksFirestoreCollectionImpl(this.firestore, config);

		} else {

			this.bookmarks = new MockBookmarksCollection();

		}

	}

}