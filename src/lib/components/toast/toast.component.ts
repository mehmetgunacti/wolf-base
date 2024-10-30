import { Component, computed, effect, input, output } from '@angular/core';
import { BaseComponent } from '../base.component';
import { ToastConfiguration } from './toast.util';

@Component({
	standalone: true,
	selector: 'w-toast',
	templateUrl: './toast.component.html',
	styleUrls: [ './toast.component.scss' ],
	host: {
		'[tabindex]': '0',
		'[class]': 'severity()'
	}
})
export class ToastComponent extends BaseComponent {

	// Input
	conf = input.required<ToastConfiguration>();

	// Output
	close = output<number>();

	severity = computed<string>(() => this.conf().severity);
	protected glyph = computed<string>(() => {

		switch (this.severity()) {

			case 'success': return 'task_alt';
			case 'info': return 'campaign';
			case 'warn': return 'warning';
			case 'error': return 'error';
			default: return 'help';

		}

	});

	constructor() {

		super();
		effect(() => {

			if (!this.conf().sticky && this.conf().life) // life > 0
				setTimeout(() => this.onClose(), this.conf().life);

		});

	}

	onClose(): void {

		const id = this.conf().id;
		if (id)
			this.close.emit(id);

	}

}
