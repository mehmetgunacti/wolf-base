import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, inject, output, viewChild } from '@angular/core';
import { fadeInFadeOutTrigger, fadeInTrigger, fadeOutTrigger } from '@lib';

@Component({
	selector: 'app-modal',
	standalone: true,
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
	animations: [fadeInTrigger, fadeOutTrigger],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit {

	// @ViewChild('appDialog', { static: true }) dialog1!: ElementRef<HTMLDialogElement>;
	private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('appDialog');
	// private inputElement = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

	dialogClose = output<void>();

	ngOnInit(): void {

		this.dialog().nativeElement.showModal();
		console.log('ModalComponent ngOnInit');

	}

	ngOnDestroy(): void {

		this.dialog().nativeElement.close();
		// this.cdr.detectChanges();
		console.log('ModalComponent ngOnDestroy');

	}

	onClick(event: MouseEvent): void {

		var rect = this.dialog().nativeElement.getBoundingClientRect();
		var isInDialog = (
			rect.top <= event.clientY &&
			event.clientY <= rect.top + rect.height &&
			rect.left <= event.clientX &&
			event.clientX <= rect.left + rect.width
		);
		if (!isInDialog)
			this.dialogClose.emit();

	}

}
