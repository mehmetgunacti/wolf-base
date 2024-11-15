import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { Store } from '@ngrx/store';
import { TimePastPipe } from '@pipes/time-past.pipe';
import { selLogs_allEntries } from '@selectors/log/logs.selectors';

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
