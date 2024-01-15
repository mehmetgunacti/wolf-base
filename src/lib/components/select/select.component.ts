import { ArrayDataSource } from '@angular/cdk/collections';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, ViewChild, WritableSignal, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UUID } from 'lib/constants';
import { HasParentId, TreeNode } from 'lib/models';
import { NULL, TreeItem, toTreeItems } from './select.util';
import { CdkMenuTrigger } from '@angular/cdk/menu';

@Component({
	selector: 'w-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements AfterViewInit {

	@ViewChild(CdkMenuTrigger) trigger!: CdkMenuTrigger;
	@ViewChild('select') select!: ElementRef<HTMLSelectElement>;


	@Input() name: string = '';
	@Input() control!: FormControl<UUID | null>;
	@Input() nodes: HasParentId[] = [];

	popupWidth: WritableSignal<number> = signal(200);

	@HostListener('window:resize', ['$event'])
	onResize() {

		this.popupWidth.set(this.select.nativeElement.offsetWidth);

	}

	ngAfterViewInit(): void {

		this.popupWidth.set(this.select.nativeElement.offsetWidth);

	}

	selectItem(item: HasParentId): void {

		this.control.setValue(item.id === NULL ? null : item.id);
		this.trigger.close();

	}

	onKeydown(id: UUID): void {

		console.log(id);

	}

}
