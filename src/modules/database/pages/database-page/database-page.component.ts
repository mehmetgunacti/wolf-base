import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { LocalStorageService, WolfBaseTableName } from 'lib';
import { Observable, combineLatest, map, startWith, switchMap, tap, withLatestFrom } from 'rxjs';
import { backupDatabase } from 'store/actions/database.actions';

@Component({
	selector: 'app-database-page',
	templateUrl: './database-page.component.html'
})
export class DatabasePageComponent {

	tableNames: { label: string, value?: string, disabled?: boolean }[];
	fcTableName = new FormControl();
	fcSearch = new FormControl('');
	content$: Observable<string[]>;

	private store: Store = inject(Store);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	constructor() {

		this.tableNames = [
			{ label: 'Select...', disabled: true },
			...Object.entries(WolfBaseTableName).map(([value, label]) => ({ label, value }))
		];

		const tableValues$: Observable<string[]> = this.fcTableName.valueChanges.pipe(

			switchMap((tablename: WolfBaseTableName) => this.localStorage.dump(tablename)),
			map(dump => Array.from(dump.values()))

		);

		this.content$ = combineLatest([
			tableValues$,
			this.fcSearch.valueChanges.pipe(startWith(null))
		 ]).pipe(

			map(([values, filterValue]) => filterValue ? values.filter(v => v.toLowerCase().includes(filterValue.toLowerCase())) : values)

		);

	}

	onBackupDatabase(): void {

		this.store.dispatch(backupDatabase());

	}

}