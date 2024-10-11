import { ChangeDetectionStrategy, Component, computed, effect, input, output } from '@angular/core';

@Component({
	standalone: true,
	selector: 'w-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
	host: {
		'[class]': 'severity()'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {

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
