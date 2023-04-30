import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { BasicTable, LocalStorageService, WolfBaseTableName } from 'lib';
import { IDBase } from 'lib/models/id-base.model';
import { Observable, map, switchMap } from 'rxjs';

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

	constructor() {

		this.tableNames = Object.entries(WolfBaseTableName).map(([value, label]) => ({ label, value }));
		const dump$ = this.fcTableName.valueChanges.pipe(

			switchMap(
				async name => {

					const table: BasicTable = this.localStorage.getTable(name);
					const dump: Record<string, IDBase | string> = await table.dump();
					return dump;

				}
			)

		);
		this.content$ = dump$.pipe(

			map(dump => JSON.stringify(dump, null, '\t'))

		);
		this.numberOfItems$ = dump$.pipe(

			map(dump => Object.keys(dump).length)

		);

	}

}