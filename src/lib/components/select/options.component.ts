import { ArrayDataSource } from '@angular/cdk/collections';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CdkTreeModule, NestedTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Renderer2, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HasParentId } from '@models';
import { ROOT_ID, TreeItem, toTreeItems } from './select.util';


// flatten for key events
const flattenTree = (item: TreeItem): TreeItem[] => {

	const flattenedChildren = item.children.flatMap(flattenTree);
	return [ item, ...flattenedChildren ];

};

@Component({
	selector: 'w-options',
	standalone: true,
	imports: [ ReactiveFormsModule, CdkTreeModule, CdkMenuModule ],
	templateUrl: './options.component.html',
	styleUrls: [ './options.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsComponent implements AfterViewInit {

	ROOT: HasParentId = { id: ROOT_ID, name: 'Root', parentId: null };

	private flattenedItems!: TreeItem[];
	treeItems: TreeItem[] = [];
	treeControl: NestedTreeControl<TreeItem> = new NestedTreeControl(node => node.children);
	dataSource: ArrayDataSource<TreeItem> = new ArrayDataSource([]);
	hasChild = (_: number, node: TreeItem) => !!node.children && node.children.length > 0;

	@Input() set nodes(entities: HasParentId[]) {

		// sort incoming array
		let sorted = entities.sort((a, b) => a.name.localeCompare(b.name));

		// add ROOT element
		sorted = [ this.ROOT, ...sorted ];

		// convert to dictionary
		const dictionary = toTreeItems(sorted);

		// used by Angular CDK Tree
		this.treeItems = Object.values(dictionary).filter(item => item.parent === null);
		this.dataSource = new ArrayDataSource(this.treeItems);

		this.flattenedItems = this.treeItems.flatMap(flattenTree);

	};

	@Output() selected: EventEmitter<HasParentId | null> = new EventEmitter();

	private renderer: Renderer2 = inject(Renderer2);

	ngAfterViewInit(): void {

		this.setFocus(ROOT_ID);

	}

	selectItem(item: HasParentId | null): void {

		this.selected.emit(item);

	}

	onKeydown(event: KeyboardEvent, item: TreeItem): void {

		if (hasModifierKey(event)) // ctrl, shift etc.
			return;

		switch (event.key) {

			case "Escape": // just close the popup
				this.selectItem(null);
				break;

			case "Enter":
				event.preventDefault();
				this.selectItem(item.value);
				break;

			case "ArrowDown":

				event.preventDefault();
				const nextFocusable = this.getNextFocusable(item);
				this.setFocus(nextFocusable.value.id);
				break;

			case "ArrowUp":

				event.preventDefault();
				const prevFocusable = this.getPrevFocusable(item);
				this.setFocus(prevFocusable.value.id);
				break;

			case "ArrowLeft":

				event.preventDefault();
				if (item.children.length > 0)
					this.treeControl.collapse(item);
				break;

			case "ArrowRight":

				event.preventDefault();
				if (item.children.length > 0)
					this.treeControl.expand(item);
				break;

		}

	}

	private getNextFocusable(current: TreeItem): TreeItem {

		const maxIdx = this.flattenedItems.length - 1;
		if (maxIdx === 0) // list only has Root?
			return current;

		const curIdx = this.flattenedItems.findIndex(item => item.value.id === current.value.id);
		let nextIdx = curIdx;
		do {

			nextIdx = nextIdx === maxIdx ? 0 : ++nextIdx;

		} while (!this.isAllParentsExpanded(nextIdx));

		return this.flattenedItems[ nextIdx ];

	}

	private getPrevFocusable(current: TreeItem): TreeItem {

		const maxIdx = this.flattenedItems.length - 1;
		if (maxIdx === 0) // list only has Root?
			return current;

		const curIdx = this.flattenedItems.findIndex(item => item.value.id === current.value.id);
		let prevIdx = curIdx;
		do {

			prevIdx = prevIdx === 0 ? maxIdx : --prevIdx;

		} while (!this.isAllParentsExpanded(prevIdx));

		return this.flattenedItems[ prevIdx ];

	}

	private isAllParentsExpanded(idx: number): boolean {

		const currItem = this.flattenedItems[ idx ];
		const parent = currItem.parent;
		if (parent === null)
			return true;

		const parentIdx = this.flattenedItems.findIndex(item => item.value.id === parent.value.id);
		if (parentIdx === -1) // should never happen, but still
			throw new Error(`Parent ID ${parent.value.id} ['${parent.value.name}'] of ID ${currItem.value.id} ['${currItem.value.name}'] could not be found`);

		if (this.treeControl.isExpanded(this.flattenedItems[ parentIdx ]))
			return this.isAllParentsExpanded(parentIdx);
		return false;

	}

	setFocus(id: string): void {

		// 2nd parameter must be true, or else content disappears
		const element: HTMLButtonElement = this.renderer.selectRootElement(`#mi_${id}`, true);
		setTimeout(() => element.focus(), 20);

	}

}
