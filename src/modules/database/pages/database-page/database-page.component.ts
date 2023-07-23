import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { LocalStorageService, WolfBaseTableName } from 'lib';
import { Observable, map, switchMap } from 'rxjs';

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

	constructor() {

		this.tableNames = [
			{ label: 'Select...', disabled: true },
			...Object.entries(WolfBaseTableName).map(([value, label]) => ({ label, value }))
		]
		this.content$ = this.fcTableName.valueChanges.pipe(

			switchMap((tablename: WolfBaseTableName) => this.localStorage.dump(tablename)),
			map(dump => Array.from(dump, ([key, value]) => ({ key, value })))

		);
		this.numberOfItems$ = this.content$.pipe(

			map(dump => Object.keys(dump).length)

		);

	}

}