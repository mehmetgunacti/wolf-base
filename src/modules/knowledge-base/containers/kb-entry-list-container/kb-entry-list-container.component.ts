import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { KBEntry } from 'lib';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { selKBEntryRootNodes } from 'store/selectors/knowledge-base-entities.selectors';

function toTreeNode(entries?: KBEntry[]): TreeNode<KBEntry>[] {

	// if (entries)
	// 	return entries
	// 		.reduce(
	// 			(prev, e) => { prev.push({ key: e.id, label: e.name, children: toTreeNode(e.entries) } as TreeNode); return prev; },
	// 			[] as TreeNode<KBEntry>[]
	// 		)
	// 		.sort((a, b) => a.label! > b.label! ? 1 : -1);
	return [];

}

@Component({
	selector: 'app-kb-entry-list-container',
	templateUrl: './kb-entry-list-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBEntryListContainerComponent {

	private store: Store = inject(Store);

	kbEntries$: Observable<KBEntry[]>;

	constructor() {

		this.kbEntries$ = this.store.select(selKBEntryRootNodes);

	}

}