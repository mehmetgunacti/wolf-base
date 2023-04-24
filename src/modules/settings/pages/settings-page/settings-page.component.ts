import { Component, Inject, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { BasicTable, LocalStorageService, WolfBaseTableName } from 'lib';
import { IDBase } from 'lib/models/id-base.model';
import { Observable, switchMap } from 'rxjs';

@Component({
	selector: 'app-settings-page',
	templateUrl: './settings-page.component.html'
})
export class SettingsPageComponent {

	tableNames: { label: string, value: string }[];
	fcTableName = new FormControl();
	content$: Observable<string>;

	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	constructor() {

		this.tableNames = Object.entries(WolfBaseTableName).map(([value, label]) => ({ label, value }));
		this.content$ = this.fcTableName.valueChanges.pipe(

			switchMap(
				async name => {

					const table: BasicTable<IDBase | string> = this.localStorage.getTable(name);
					const dump: Record<string, string | IDBase> = await table.dump();
					return JSON.stringify(dump, null, '\t');

				}
			)

		);

	}

}