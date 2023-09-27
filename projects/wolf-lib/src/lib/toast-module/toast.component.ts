import { Component, ElementRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ToastConfiguration } from './toast.util';
import { WolfIcons } from 'lib/constants';

@Component({
	selector: 'app-toast',
	templateUrl: './toast.component.html'
})
export class ToastComponent implements OnInit {

	private elementRef: ElementRef = inject(ElementRef);

	@Input() conf!: ToastConfiguration;
	iconClass!: string;

	@Output() close = new EventEmitter<number>();

	ngOnInit(): void {

		this.elementRef.nativeElement.classList.add(this.conf.severity);
		this.iconClass = this.getIconClass(this.conf);
		if (!this.conf.sticky && this.conf.life) // life > 0
			setTimeout(() => this.onClose(), this.conf.life);

	}

	onClose(): void {

		this.close.emit(this.conf.id);

	}

	private getIconClass(data: ToastConfiguration): string {

		switch (data.severity) {
			case 'success': return WolfIcons.CHECK_CIRCLE;
			case 'info': return WolfIcons.MEGAPHONE;
			case 'warn': return WolfIcons.EXCLAMATION_CIRCLE;
			case 'error': return WolfIcons.EXCLAMATION_TRIANGLE;
		}

	}

}
