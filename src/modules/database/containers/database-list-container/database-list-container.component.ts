import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ModuleReport, opacityTrigger } from '@lib';
import { Store } from '@ngrx/store';
import { databaseActions } from 'store/actions';
import * as reports from 'store/selectors/database/database.selectors';

@Component({
	selector: 'app-database-list-container',
	templateUrl: './database-list-container.component.html',
	styleUrls: ['./database-list-container.component.scss'],
	animations: [opacityTrigger],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatabaseListContainerComponent {

	private store: Store = inject(Store);

	reports = this.store.selectSignal<ModuleReport[]>(reports.selDatabase_Report);
	total = computed(() => {

		return this.reports().reduce((total, rows) => {

			return total + rows.reports.reduce((subTotal, row) => subTotal + row.size, 0);

		}, 0);

	});

	constructor() {

		this.store.dispatch(databaseActions.loadReport());

	}

	onRefresh(): void {

		this.store.dispatch(databaseActions.loadReport());

	}

	onClear(table: string): void {

		this.store.dispatch(databaseActions.emptyTable({ table }));

	}

}
