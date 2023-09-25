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
	parentMenuItems: MenuItem[] = [];
	childrenMenuItems: MenuItem[] = [];
	home: MenuItem = { icon: PrimeIcons.HOME, routerLink: '/kb' };

	@Input() set entry(node: KBEntryNode | null | undefined) {

		if (node) {

			this.node = node;
			this.parentMenuItems = createMenu(node?.parent ?? null);
			this.childrenMenuItems = this.node.children.map(n => ({ label: n.name, icon: PrimeIcons.ANGLE_RIGHT, routerLink: ['/kb', n.id] }));

		}

	}

	constructor() {
		console.log('compontent created : ');

	}

	ngOnInit(): void {

		// this.menuItems = createMenu(this.kbEntryNode?.parent ?? null);

	}

}