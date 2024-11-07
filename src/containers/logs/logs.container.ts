import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlyphDirective } from '@directives';
import { BaseComponent } from '@libComponents';
import { Store } from '@ngrx/store';
import { TimePastPipe } from '@pipes';
import { selLogs_allEntries } from '@selectors';

@Component({
	standalone: true,
	imports: [ RouterLink, GlyphDirective, TimePastPipe ],
	selector: 'app-logs-container',
	templateUrl: './logs.container.html',
	host: { 'class': 'comp p-4' }
})
export class LogsContainer extends BaseComponent {

	private logs = inject(Store).selectSignal(selLogs_allEntries);
	protected sorted = computed(() => this.logs().sort((a, b) => a.date.localeCompare(b.date)));

}
