import { ChangeDetectionStrategy, Component, ElementRef, OnInit, computed, effect, inject, input, output } from '@angular/core';
import { ToastConfiguration } from './toast.util';

@Component({
	standalone: true,
	selector: 'w-toast',
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent implements OnInit {

	private elementRef: ElementRef = inject(ElementRef);

	conf = input.required<ToastConfiguration>();
	icon = input<string | null>();
	iconClass = computed<string>(() => this.icon() ?? this.conf().icon ?? this.getIconClass(this.conf()));

	close = output<number>();

	ngOnInit(): void {

		this.elementRef.nativeElement.classList.add(this.conf().severity);

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

	private getIconClass(data: ToastConfiguration): string {

		switch (data.severity) {
			case 'success': return 'task_alt';
			case 'info': return 'campaign';
			case 'warn': return 'warning';
			case 'error': return 'error';
		}

	}

}
