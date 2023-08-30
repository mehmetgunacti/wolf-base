import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { BookmarksCollection, ClicksCollection, FirestoreConfig, MockBookmarksFirestoreCollection, MockClicksFirestoreCollection, RemoteStorageService, bookmarksCollectionFactory, clicksCollectionFactory } from "lib";
import { showNotification } from "store/actions/core-notification.actions";
import { selCoreFirestoreConfig } from "store/selectors/core-configuration.selectors";
import { Firestore, firestoreFactory } from "./firestore";

export class RemoteStorageServiceProxy implements RemoteStorageService, ProxyHandler<RemoteStorageService> {

	bookmarks!: BookmarksCollection;
	clicks!: ClicksCollection;

	private store: Store = inject(Store);
	private firestore: Firestore;
	private config: FirestoreConfig | null;

	constructor() {

		this.firestore = firestoreFactory();
		this.config = null;

		this.store.select(selCoreFirestoreConfig).subscribe(
			config => {

				if (config)
					this.init(config);
				else
					this.mock();

			}
		);

	}

	// ProxyHandler
	get(target: any, prop: string): any {

		if (['bookmarks', 'clicks'].includes(prop) && !this.config)
			this.store.dispatch(showNotification({ severity: 'info', detail: 'Firestore configuration missing' }));

		return target[prop];

	}

	private mock(): void {

		this.config = null;
		this.bookmarks = new MockBookmarksFirestoreCollection();
		this.clicks = new MockClicksFirestoreCollection();

	}

	private init(firestoreConfig: FirestoreConfig): void {

		this.config = firestoreConfig;
		this.bookmarks = bookmarksCollectionFactory(this.firestore, firestoreConfig);
		this.clicks = clicksCollectionFactory(this.firestore, firestoreConfig)

	}

}