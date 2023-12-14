import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { KBEntry, KBEntryNode, UUID } from 'lib';
import { Observable, tap } from 'rxjs';
import { createEntity, deleteEntity, updateEntity } from 'store/actions/kb-entry-entity.actions';
import { selKBEntryNodeRootNodesArray, selKBEntrySelectedEntry } from 'store/selectors/knowledge-base-entities.selectors';

@Component({
	selector: 'app-kb-entry-form-container',
	templateUrl: './kb-entry-form-container.component.html',
	styleUrls: ['./kb-entry-form-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBEntryFormContainerComponent {

	private store: Store = inject(Store);

	entry$: Observable<KBEntry | null>;
	kbParents$: Observable<KBEntryNode[]>;

	constructor() {

		this.entry$ = this.store.select(selKBEntrySelectedEntry);
		this.kbParents$ = this.store.select(selKBEntryNodeRootNodesArray).pipe(tap(a => console.log(a)));

	}

	onCreate(kbEntry: Partial<KBEntry>): void {

		this.store.dispatch(createEntity({ kbEntry }));

	}

	onUpdate(id: UUID, kbEntry: Partial<KBEntry>) {

		this.store.dispatch(updateEntity({ id, kbEntry }));

	}

	onDelete(id: UUID): void {

		this.store.dispatch(deleteEntity({ id }));

	}

}
