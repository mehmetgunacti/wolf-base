import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { KBEntry } from 'lib';
import { Observable } from 'rxjs';
import { selKBEntryRootEntryArray } from 'store/selectors/knowledge-base-entities.selectors';

@Component({
	selector: 'app-kb-entry-list-container',
	templateUrl: './kb-entry-list-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBEntryListContainerComponent {

	private store: Store = inject(Store);

	kbEntries$: Observable<KBEntry[]>;

	constructor() {

		this.kbEntries$ = this.store.select(selKBEntryRootEntryArray);

	}

}