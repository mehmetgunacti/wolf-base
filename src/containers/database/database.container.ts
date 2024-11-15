import { databaseActions } from '@actions/database.actions';
import { Component, computed, inject } from '@angular/core';
import { opacityTrigger } from '@animations/opacity.animation';
import { ModuleReportComponent } from '@components/module-report/module-report.component';
import { GlyphDirective } from '@directives/glyph.directive';
import { AlertComponent } from '@libComponents/alert/alert.component';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';
import { ModuleReport } from '@models/database.model';
import { Store } from '@ngrx/store';
import { FormatBytesPipe } from '@pipes/format-bytes.pipe';
import { selDatabase_Report } from '@selectors/database/database.selectors';

@Component({
	standalone: true,
	imports: [ GlyphDirective, PortalComponent, GlyphDirective, FormatBytesPipe, ModuleReportComponent, AlertComponent ],
	selector: 'app-database-container',
	templateUrl: './database.container.html',
	animations: [ opacityTrigger ],
	host: { 'class': 'grid gap-2' }
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
