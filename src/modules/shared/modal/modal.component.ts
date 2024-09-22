import { ChangeDetectionStrategy, Component, ElementRef, OnInit, output, viewChild } from '@angular/core';
import { delayDestroyTrigger } from '@lib';

@Component({
	selector: 'w-modal',
	standalone: true,
	templateUrl: './modal.component.html',
	animations: [delayDestroyTrigger],
	host: {
		'[@delayDestroy]': '',
		'class': 'd-contents',
		'(keydown)': 'onKeydownHandler($event)'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit {

	private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

	close = output<void>();

	ngOnInit(): void {

		this.dialog().nativeElement.showModal();

	}

	ngOnDestroy(): void {

		this.dialog().nativeElement.close();

	}

	onKeydownHandler(event: KeyboardEvent) {

		if (event.key === 'Escape')
			this.close.emit();

	}

	onMouseDown(event: MouseEvent): void {

		/* For detecting backdrop:
		 *  - set dialog padding and border to 0
		 *  - set dialog overflow to 'hidden'
		 *  - wrap content in <div>
		 *    - handle scrollbars inside the <div> (overflow: auto)
		 *  - check event.target === event.currentTarget
		 * event.target:
		 *   The actual element that was clicked on or interacted with.
		 * event.currentTarget:
		 *   This is the element to which the event handler is attached (<dialog>).
		*/
		const close = event.target === event.currentTarget;
		if (close)
			this.close.emit();

	}

}
