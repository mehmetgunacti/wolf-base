import { Directive, ElementRef, inject, output } from '@angular/core';

@Directive({
	selector: '[appModal]',
	host: {
		// 'class': 'component',
		'(click)': 'onClick($event)'
	}
})
export class ModalDirective {

	private el: ElementRef<HTMLDialogElement> = inject(ElementRef);

	// modalOpen = input.required<boolean>();
	close = output<void>();

	constructor() {

		// effect(() => {

		// 	if (this.modalOpen())
		// 		this.el.nativeElement.showModal();
		// 	else
		// 		this.el.nativeElement.close();

		// });

	}

	ngOnInit(): void {

		this.el.nativeElement.showModal();

	}

	ngOnDestroy(): void {

		this.el.nativeElement.close();

	}

	onClick = (event: MouseEvent): void => {

		const target = event.target as HTMLDialogElement;
		const rect = target.getBoundingClientRect();
		const isInDialog = (
			rect.top <= event.clientY &&
			event.clientY <= rect.top + rect.height &&
			rect.left <= event.clientX &&
			event.clientX <= rect.left + rect.width
		);
		if (!isInDialog)
			this.close.emit();

	};

}
