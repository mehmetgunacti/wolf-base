import { ChangeDetectionStrategy, Component, computed, effect, input, output } from '@angular/core';
import { ToastConfiguration } from './toast.util';

@Component({
	standalone: true,
	selector: 'w-toast',
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss'],
	host: { '[class]': 'severity()' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {

	conf = input.required<ToastConfiguration>();
	glyph = computed<string>(() => this.conf().glyph ?? this.getGlyphClass(this.conf()));
	severity = computed<string>(() => this.conf().severity);

	close = output<number>();

	constructor() {

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

	private getGlyphClass(data: ToastConfiguration): string {

		switch (data.severity) {

			case 'success': return 'task_alt';
			case 'info': return 'campaign';
			case 'warn': return 'warning';
			case 'error': return 'error';

		}

	}

}
