import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { environment } from 'environments/environment';
import { Bookmark, BookmarksFirestoreCollection, Entity, Firestore, LocalStorageService, RemoteCollection, UUID, WolfBaseTableName, firestoreFactory } from 'lib';
import { IDBase } from 'lib/models/id-base.model';
import { Observable, filter, map, switchMap } from 'rxjs';
import { SyncService } from 'services/sync.service';

@Component({
	selector: 'app-database-page',
	templateUrl: './database-page.component.html'
})
export class DatabasePageComponent {

	tableNames: { label: string, value?: string, disabled?: boolean }[];
	fcTableName = new FormControl();
	content$: Observable<{ key: string, value: string }[]>;
	numberOfItems$: Observable<number>;

	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);
	private syncService: SyncService = inject(SyncService);

	private firestore: Firestore = firestoreFactory();


	constructor() {

		this.tableNames = [
			{ label: 'Select...', disabled: true },
			...Object.entries(WolfBaseTableName).map(([value, label]) => ({ label, value }))
		]
		this.content$ = this.fcTableName.valueChanges.pipe(

			switchMap((tablename: WolfBaseTableName) => this.localStorage.dump(tablename)),
			map(dump => Array.from(dump, ([key, value]) => ({ key, value })))

		);
		// this.content$ = dump$.pipe(

		// 	map(dump => JSON.stringify(dump, null, '\t'))

		// );
		this.numberOfItems$ = this.content$.pipe(

			map(dump => Object.keys(dump).length)

		);

	}

	onSave(): void {

	}

}