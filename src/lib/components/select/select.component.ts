import { CdkMenuTrigger } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input, Renderer2, ViewChild, WritableSignal, inject, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UUID } from 'lib/constants';
import { HasParentId } from 'lib/models';
import { NULL } from './select.util';

@Component({
	selector: 'w-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {

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

	onSelectClicked(el: HTMLSelectElement, event: Event): void {

		event.preventDefault();
		this.popupWidth.set(el.clientWidth);

	}

	onItemSelected(item: HasParentId): void {

		this.control.setValue(item.id === NULL ? null : item.id);
		this.trigger.close();

	}

	onKeydown(id: UUID): void {

		console.log(id);

	}

}
