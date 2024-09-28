import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatabaseReport } from '@lib';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { databaseActions } from 'store/actions';
import * as reports from 'store/selectors/database/database.selectors';

@Component({
	selector: 'app-database-list-container',
	templateUrl: './database-list-container.component.html',
	styleUrls: ['./database-list-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatabaseListContainerComponent {

	private store: Store = inject(Store);

	report$: Observable<DatabaseReport>;
	total$: Observable<number>;

	constructor() {

		this.report$ = this.store.select(reports.selDatabase_Report);
		this.total$ = this.store.select(reports.selDatabase_TotalSize);
		this.store.dispatch(databaseActions.loadReport());

	}

	onRefresh(): void {

		this.store.dispatch(databaseActions.loadReport());

	}

}
