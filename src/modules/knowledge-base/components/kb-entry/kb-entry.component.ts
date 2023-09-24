import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { KBContent, KBEntryNode } from 'lib';
import { MenuItem, PrimeIcons } from 'primeng/api';

function createMenu(node: KBEntryNode | null): MenuItem[] {

	if (node === null)
		return [];

	return [
		...createMenu(node.parent ?? null),
		{
			label: node.name,
			routerLink: ['/kb', node.id]
		}
	] as MenuItem[];

}

@Component({
	selector: 'app-kb-entry',
	templateUrl: './kb-entry.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBEntryComponent implements OnInit {

	node: KBEntryNode | null = null;
	content: KBContent | null | undefined;
	menuItems: MenuItem[] = [];
	home: MenuItem = { icon: PrimeIcons.HOME, routerLink: '/kb' };

	@Input() set kbEntryNode(node: KBEntryNode | null | undefined) {

		if (node) {

			this.node = node;
			this.menuItems = createMenu(node?.parent ?? null);

		}

	}

	constructor() {
		console.log('compontent created : ');

	}

	ngOnInit(): void {

		// this.menuItems = createMenu(this.kbEntryNode?.parent ?? null);

	}

}