import { Component, computed, input } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
	standalone: true,
	selector: 'w-alert',
	templateUrl: './alert.component.html',
	styleUrls: [ './alert.component.scss' ],
	host: {
		'[class]': 'severity()'
	}
})
export class AlertComponent extends BaseComponent {

	glyph = input<string>();
	severity = input<'success' | 'info' | 'warn' | 'error'>();
	protected glyphClass = computed(() => {

		if (this.glyph())
			return this.glyph();

		switch (this.severity()) {

			case 'success': return 'task_alt';
			case 'info': return 'campaign';
			case 'warn': return 'warning';
			case 'error': return 'error';
			default: return 'help';

		}

	});

}
