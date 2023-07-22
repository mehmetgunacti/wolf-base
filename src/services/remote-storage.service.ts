import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { BookmarksCollection, ClicksCollection, Firestore, FirestoreConfig, MockBookmarksFirestoreCollection, MockClicksFirestoreCollection, RemoteStorageService, bookmarksCollectionFactory, clicksCollectionFactory, firestoreFactory } from "lib";
import { distinctUntilChanged } from "rxjs";
import { showNotification } from "store/actions/core-notification.actions";
import { firestoreConfig } from "store/selectors/core-configuration.selectors";

export class RemoteStorageServiceProxy implements RemoteStorageService, ProxyHandler<RemoteStorageService> {

	bookmarks!: BookmarksCollection;
	clicks!: ClicksCollection;

	private store: Store = inject(Store);
	private firestore: Firestore;
	private config: FirestoreConfig | null;

	constructor() {

		this.firestore = firestoreFactory();
		this.config = null;

		this.store.select(firestoreConfig).pipe(distinctUntilChanged()).subscribe(
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