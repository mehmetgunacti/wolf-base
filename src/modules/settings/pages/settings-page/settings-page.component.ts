import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { environment } from 'environments/environment';
import { Bookmark, FirestoreTool, LocalStorageService, RemoteCollection, UUID, WolfBaseTableName } from 'lib';
import { IDBase } from 'lib/models/id-base.model';
import { Observable, map, switchMap } from 'rxjs';
import { BookmarksFirestoreCollection } from 'lib';
import { SyncService } from 'services/sync.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
	selector: 'app-settings-page',
	templateUrl: './settings-page.component.html'
})
export class SettingsPageComponent {

	tableNames: { label: string, value: string }[];
	fcTableName = new FormControl();
	content$: Observable<string>;
	numberOfItems$: Observable<number>;

	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);
	private syncService: SyncService = inject(SyncService);

	private firestore: FirestoreTool = new FirestoreTool(
		{

			apiKey: environment.firebase.apiKey,
			baseURL: environment.firebase.baseURL,
			projectId: environment.firebase.projectId
		
		}
	);
	

	constructor() {

		this.tableNames = Object.entries(WolfBaseTableName).map(([value, label]) => ({ label, value }));
		const dump$ = this.fcTableName.valueChanges.pipe(

			switchMap(tablename => this.localStorage.dump<IDBase | string>(tablename))

		);
		this.content$ = dump$.pipe(

			map(dump => JSON.stringify(dump, null, '\t'))

		);
		this.numberOfItems$ = dump$.pipe(

			map(dump => Object.keys(dump).length)

		);

	}

	async increase(): Promise<void> {

		const remote: BookmarksFirestoreCollection = new BookmarksFirestoreCollection(this.firestore);
		// remote.create(this.getBookmark());
		// const id: UUID = uuidv4();
		console.log(new Date().toISOString());
		const clicks: number = await this.firestore.increase(RemoteCollection.bookmarks, 'clicks', "24c2de96-21b3-42dc-9658-b3aa86081893", 5);

		console.log(await remote.get("24c2de96-21b3-42dc-9658-b3aa86081893"));

		this.syncService.trigger();

	}

	getBookmark(): Bookmark {

		return {
			"id": "24c2de96-21b3-42dc-9658-b3aa86081893",
			"name": "medium.com",
			"title": "Get rid of Firestore",
			"created": new Date().toISOString(),
			"tags": [
				"angular",
				"firebase"
			],
			"image": "",
			"clicks": 0,
			"urls": [
				"https://medium.com/@ashu1461/how-to-get-rid-of-huge-firestore-bundle-size-ed52a9dcd64b"
			]
		};

	}

}