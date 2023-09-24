import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { KBEntryNode } from 'lib';
import { Observable } from 'rxjs';
import { selKBEntrySelectedEntry } from 'store/selectors/knowledge-base-entities.selectors';

@Component({
	selector: 'app-kb-entry-container',
	templateUrl: './kb-entry-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBEntryContainerComponent {

	private store: Store = inject(Store);

	kbEntryNode$: Observable<KBEntryNode | null>;

	constructor() {

		this.kbEntryNode$ = this.store.select(selKBEntrySelectedEntry);

	}

}