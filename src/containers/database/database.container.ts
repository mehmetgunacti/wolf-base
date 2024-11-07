import { databaseActions } from '@actions';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModuleReportComponent } from '@components';
import { GlyphDirective } from '@directives';
import { BaseComponent, PortalComponent, ToastComponent } from '@libComponents';
import { ModuleReport } from '@models';
import { Store } from '@ngrx/store';
import { FormatBytesPipe } from '@pipes';
import { selDatabase_Report } from '@selectors';

@Component({
	standalone: true,
	imports: [ RouterLink, GlyphDirective, PortalComponent, GlyphDirective, ToastComponent, FormatBytesPipe, ModuleReportComponent ],
	selector: 'app-database-container',
	templateUrl: './database.container.html',
	host: { 'class': 'comp p-4' }
})
export class DatabaseContainer extends BaseComponent {

	private store: Store = inject(Store);

	reports = this.store.selectSignal<ModuleReport[]>(selDatabase_Report);
	total = computed(() => {

		return this.reports().reduce((total, rows) => {

			return total + rows.reports.reduce((subTotal, row) => subTotal + row.size, 0);

		}, 0);

	});

	constructor() {

		super();
		this.store.dispatch(databaseActions.loadReport());

	}

	onRefresh(): void {

		this.store.dispatch(databaseActions.loadReport());

	}

	onClear(table: string): void {

		this.store.dispatch(databaseActions.emptyTable({ table }));

	}

}
