import { logActions } from '@actions/logs.actions';
import { Component, computed, inject } from '@angular/core';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { Store } from '@ngrx/store';
import { TimePastPipe } from '@pipes/time-past.pipe';
import { selLogs_allEntries } from '@selectors/log/logs.selectors';
import { PortalComponent } from "../../lib/components/portal.component";

@Component({
	standalone: true,
	imports: [ GlyphDirective, TimePastPipe, PortalComponent ],
	selector: 'app-logs-container',
	templateUrl: './logs.container.html',
	host: { 'class': 'comp p-4' }
})
export class LogsContainer extends BaseComponent {

	private store = inject(Store);
	private logs = inject(Store).selectSignal(selLogs_allEntries);
	protected sorted = computed(() => [ ...this.logs() ].sort((a, b) => a.date.localeCompare(b.date)));

	constructor() {

		super();
		this.load();

	}

	load(): void {

		this.store.dispatch(logActions.refresh());

	}

}
