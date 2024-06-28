import { CdkMenuTrigger } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input, Renderer2, ViewChild, WritableSignal, inject, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UUID } from 'lib/constants';
import { HasParentId } from 'lib/models';
import { ROOT_ID } from './select.util';
import { hasModifierKey } from '@angular/cdk/keycodes';

@Component({
	selector: 'w-select-tree',
	templateUrl: './select-tree.component.html',
	styleUrls: ['./select-tree.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectTreeComponent {

	@ViewChild(CdkMenuTrigger) trigger!: CdkMenuTrigger;
	@ViewChild('select') select!: ElementRef<HTMLSelectElement>;

	@Input() name: string = '';
	@Input() control!: FormControl<UUID | null>;
	@Input() nodes: HasParentId[] = [];

	popupWidth: WritableSignal<number> = signal(200);

	@HostListener('window:resize', ['$event'])
	onResize() {

		this.trigger.close();

	}

	onSelectClicked(event: MouseEvent): void {

		event.preventDefault; // prevents native select options to open
		this.select.nativeElement.focus();
		this.popupWidth.set(this.select.nativeElement.clientWidth);

	}

	onItemSelected(item: HasParentId | null): void {

		if (item !== null)
			this.control.setValue(item.id === ROOT_ID ? null : item.id);

		this.trigger.close();
		this.select.nativeElement.focus();

	}

	onKeydown(event: KeyboardEvent): void {

		this.popupWidth.set(this.select.nativeElement.clientWidth);

		if (hasModifierKey(event)) // ctrl, shift etc.
			return;

		switch (event.key) {

			case "Tab": break;
			default: event.preventDefault(); // prevents native select options to open

		}

	}

}
