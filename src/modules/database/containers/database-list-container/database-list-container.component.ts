import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatabaseReport } from '@lib';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { loadReport } from 'store/actions/database.actions';
import * as reports from 'store/selectors/database.selectors';

@Component({
	selector: 'app-database-list-container',
	templateUrl: './database-list-container.component.html',
	styleUrls: ['./database-list-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatabaseListContainerComponent {

	private store: Store = inject(Store);

	report$: Observable<DatabaseReport>;

	constructor() {

		this.report$ = this.store.select(reports.selDatabaseReport);
		this.store.dispatch(loadReport());

	}

	onRefresh(): void {

		this.store.dispatch(loadReport());

	}

}
