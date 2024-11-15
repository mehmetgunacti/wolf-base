import { ArrayDataSource } from '@angular/cdk/collections';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CdkTree, CdkTreeModule } from '@angular/cdk/tree';
import { AfterViewInit, Component, Renderer2, computed, inject, input, output, viewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GlyphDirective } from '@directives/glyph.directive';
import { HasParentId } from '@models/entity.model';
import { BaseComponent } from '../base.component';
import { ROOT_ID, TreeItem, toTreeItems } from './select.util';

// flatten for key events
const flattenTree = (item: TreeItem): TreeItem[] => {

	const flattenedChildren = item.children.flatMap(flattenTree);
	return [ item, ...flattenedChildren ];

};

@Component({
	standalone: true,
	imports: [ ReactiveFormsModule, CdkTreeModule, CdkMenuModule, GlyphDirective ],
	selector: 'w-options',
	templateUrl: './options.component.html'
})
export class OptionsComponent extends BaseComponent implements AfterViewInit {

	// Input
	nodes = input.required<HasParentId[]>();

	// Output
	selected = output<HasParentId | null>();

	protected dataSource = computed(() => {

		// sort incoming array
		let sorted = this.nodes().sort((a, b) => a.name.localeCompare(b.name));

		// add ROOT element
		sorted = [ this.ROOT, ...sorted ];

		// convert to dictionary
		const dictionary = toTreeItems(sorted);
		const treeItems: TreeItem[] = Object.values(dictionary).filter(item => item.parent === null);
		const ds = new ArrayDataSource<TreeItem>(treeItems);
		return ds;

	});
	protected childrenAccessor = (dataNode: TreeItem) => dataNode.children ?? [];
	protected hasChild = (_: number, node: TreeItem) => !!node.children && node.children.length > 0;
	protected tree = viewChild.required(CdkTree);

	private renderer: Renderer2 = inject(Renderer2);
	private ROOT: HasParentId = { id: ROOT_ID, name: 'Root', parentId: null };

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

		}

	}

	setFocus(id: string): void {

		// 2nd parameter must be true, or else content disappears
		const element: HTMLButtonElement = this.renderer.selectRootElement(`#mi_${this.componentId}_${id}`, true);
		setTimeout(() => element.focus(), 20);

	}

}
