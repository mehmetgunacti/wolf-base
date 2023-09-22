import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { KBEntry } from 'lib';
import { EMPTY, Observable, expand, of, skip, toArray } from 'rxjs';
import { selKBEntrySelectedEntry } from 'store/selectors/knowledge-base-entities.selectors';

@Component({
	selector: 'app-kb-entry-container',
	templateUrl: './kb-entry-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBEntryContainerComponent {

	private store: Store = inject(Store);

	kbEntry$: Observable<KBEntry | null>;
	kbParents$: Observable<KBEntry[]>;

	constructor() {

		this.kbEntry$ = this.store.select(selKBEntrySelectedEntry);
		this.kbParents$ = this.kbEntry$.pipe(

			expand(kbEntry => kbEntry?.parent ? of(kbEntry.parent) : EMPTY),
			skip(1),
			toArray()

		);

	}

}