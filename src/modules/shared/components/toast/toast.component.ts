import { Component, ElementRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ToastConfiguration } from 'lib';
import { PrimeIcons } from 'primeng/api';

@Component({
	selector: 'app-toast',
	templateUrl: './toast.component.html'
})
export class ToastComponent implements OnInit {

	private elementRef: ElementRef = inject(ElementRef);

	@Input() conf!: ToastConfiguration;
	iconClass!: PrimeIcons;

	@Output() close = new EventEmitter<number>();

	ngOnInit(): void {

		this.elementRef.nativeElement.classList.add(this.conf.severity);
		this.iconClass = this.getIconClass(this.conf);
		if (this.conf.life) // life > 0
			setTimeout(() => this.onClose(), this.conf.life);

	}

	onClose(): void {

		this.close.emit(this.conf.id);

	}

	private getIconClass(data: ToastConfiguration): string {

		switch (data.severity) {
			case 'success': return PrimeIcons.CHECK_CIRCLE;
			case 'info': return PrimeIcons.MEGAPHONE;
			case 'warn': return PrimeIcons.EXCLAMATION_CIRCLE;
			case 'error': return PrimeIcons.EXCLAMATION_TRIANGLE;
		}

	}

}
