import { Component, OnDestroy, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LocalTableNames } from 'lib';
import { Observable, Subscription, startWith, tap } from 'rxjs';
import { backupDatabase, loadValues, search } from 'store/actions/database.actions';
import { selDatabaseSelectedContent } from 'store/selectors/database.selectors';

@Component({
	selector: 'app-database-page',
	templateUrl: './database-page.component.html'
})
export class DatabasePageComponent implements OnDestroy {

	tableNames: { label: string, value?: string, disabled?: boolean }[];
	fcTableName = new FormControl();
	fcSearch = new FormControl('');
	content$: Observable<string[]>;

	subscriptions: Subscription = new Subscription();

	private store: Store = inject(Store);

	constructor() {

		this.tableNames = [
			{ label: 'Select...', disabled: true },
			...Object.entries(LocalTableNames).map(([value, label]) => ({ label, value }))
		];

		this.subscriptions.add(

			this.fcTableName.valueChanges.pipe(

				tap(tablename => this.store.dispatch(loadValues({ tablename })))

			).subscribe()

		);

		this.subscriptions.add(

			this.fcSearch.valueChanges.pipe(

				startWith(null),
				tap(searchValue => this.store.dispatch(search({ value: searchValue })))

			).subscribe()

		);

		this.content$ = this.store.select(selDatabaseSelectedContent);

	}

	ngOnDestroy(): void {

		this.subscriptions.unsubscribe();

	}

	onBackupDatabase(): void {

		this.store.dispatch(backupDatabase());

	}

}