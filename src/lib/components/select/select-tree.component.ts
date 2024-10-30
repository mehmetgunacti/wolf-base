import { hasModifierKey } from '@angular/cdk/keycodes';
import { CdkMenuModule, CdkMenuTrigger } from '@angular/cdk/menu';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, ViewChild, WritableSignal, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UUID } from '@constants';
import { HasParentId } from '@models';
import { BaseComponent } from '../base.component';
import { OptionsComponent } from './options.component';
import { ROOT_ID } from './select.util';

@Component({
	selector: 'w-select-tree',
	standalone: true,
	imports: [ ReactiveFormsModule, CdkTreeModule, CdkMenuModule, OptionsComponent, CommonModule ],
	templateUrl: './select-tree.component.html',
	styleUrls: [ './select-tree.component.scss' ],
	host: { 'class': 'input-element' }
})
export class SelectTreeComponent extends BaseComponent {

	label_id: string = 'select_tree_' + Math.random();

	@ViewChild(CdkMenuTrigger) trigger!: CdkMenuTrigger;
	@ViewChild('select') select!: ElementRef<HTMLSelectElement>;

	@Input() name: string = '';
	@Input() control!: FormControl<UUID | null>;
	@Input() nodes: HasParentId[] = [];

	popupWidth: WritableSignal<number> = signal(200);

	@HostListener('window:resize', [ '$event' ])
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
