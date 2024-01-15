import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Renderer2, inject } from '@angular/core';
import { UUID } from 'lib/constants';
import { HasParentId } from 'lib/models';
import { NULL, TreeItem, toTreeItems } from './select.util';
import { DOCUMENT } from '@angular/common';
import { hasModifierKey } from '@angular/cdk/keycodes';

const ROOT: HasParentId = { id: NULL, name: 'Root', parentId: null };

@Component({
	selector: 'w-options',
	templateUrl: './options.component.html',
	styleUrls: ['./options.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsComponent implements AfterViewInit {

	private flattenedItems!: TreeItem[];
	treeItems: TreeItem[] = [];
	treeControl: NestedTreeControl<TreeItem> = new NestedTreeControl(node => node.children);
	dataSource: ArrayDataSource<TreeItem> = new ArrayDataSource([]);
	hasChild = (_: number, node: TreeItem) => !!node.children && node.children.length > 0;

	@Input() set nodes(entities: HasParentId[]) {

		// sort incoming array
		const sorted = entities.sort((a, b) => a.name.localeCompare(b.name));

		// add ROOT element
		sorted.unshift(ROOT);

		// convert to dictionary
		const dictionary = toTreeItems(sorted);

		// used by Angular CDK Tree
		this.treeItems = Object.values(dictionary).filter(item => item.parent === null);
		this.dataSource = new ArrayDataSource(this.treeItems);

		// flatten for key events
		const flattenTree = (tree: TreeItem): TreeItem[] => {
			const { value, parent, children, icon } = tree;
			const flattenedChildren = children.flatMap(flattenTree);
			return [{ value, parent, icon, children: [] }, ...flattenedChildren];
		};
		this.flattenedItems = this.treeItems.flatMap(e => flattenTree(e));
		console.log(this.flattenedItems.map(e => e.value));



	};

	@Output() selected: EventEmitter<HasParentId> = new EventEmitter();

	private renderer: Renderer2 = inject(Renderer2);

	ngAfterViewInit(): void {

		this.setFocus(NULL);

	}

	selectItem(item: HasParentId): void {

		//const idxBblocks = this.flattenedItems.findIndex(e => e.value.id === 'ebcfb021-e64b-4e5c-b71b-66a543a91ffe');
		const idxBblocks = this.flattenedItems.findIndex(e => e.value.id === item.id);
		const bblock = this.flattenedItems[idxBblocks];

		console.log(this.flattenedItems[idxBblocks], this.treeControl. getDescendants(bblock));



		// // this.selected.emit(item);
		// const idx = this.flattenedItems.findIndex(e => e.value.id === item.id);
		// console.log(idx);

		// let prevIdx = idx;

		// let prev: TreeItem;
		// // do {

		// 	--prevIdx;
		// 	if (prevIdx < 0)
		// 		prevIdx = this.flattenedItems.length - 1;
		// 	prev = this.flattenedItems[prevIdx];

		// // } while (!this.treeControl.isExpanded(prev));

		// console.log(this.treeControl.isExpanded(prev));

	}

	onKeydown(event: KeyboardEvent, item: TreeItem): void {

		if (hasModifierKey(event)) // ctrl, shift etc.
			return;

		const btn: HTMLButtonElement = event.target as HTMLButtonElement;


		switch (event.key) {

			case "Enter":
				event.preventDefault();
				this.selectItem(item.value);
				break;

			case "ArrowDown":
				event.preventDefault();
				// this.setFocus('');
				console.log(this.treeItems);
				console.log(this.treeControl.getChildren(item));
				const c = this.treeControl.getChildren(item);


				// not 050f1ab9-6eed-4ccf-9e0d-f4c3a53b6dd0 sub plugins
				// yes 53294d6e-809a-4b03-8a09-0382e798e4fc asdfa

				break;

			case "ArrowUp":
				event.preventDefault();
				// this.setFocus('');
				console.log(this.treeItems);
				console.log(this.treeControl);

				break;

			// case "ArrowLeft":
			// 	this.setFocus('');
			// 	break;

			// case "ArrowRight":
			// 	this.setFocus('');
			// 	break;

		}

	}

	setFocus(id: string): void {

		// 2nd parameter must be true, or else content disappears
		const element: HTMLButtonElement = this.renderer.selectRootElement(`#mi_${id}`, true);
		setTimeout(() => element.focus(), 100);

	}

}
