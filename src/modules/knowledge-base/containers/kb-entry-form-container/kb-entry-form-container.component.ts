import { AfterContentInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { KBEntry, UUID } from 'lib';
import { Observable, Subject, combineLatest, filter, map } from 'rxjs';
import { createKBEntry, deleteKBEntry, updateKBEntry } from 'store/actions/knowledge-base.actions';
import { selKBEntriesArray } from 'store/selectors/knowledge-base-entities.selectors';
import { distinctTagsArray } from 'store/selectors/knowledge-base-tags.selectors';

@Component({
	selector: 'app-kb-entry-form-container',
	templateUrl: './kb-entry-form-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBEntryFormContainerComponent implements AfterContentInit {

	private store: Store = inject(Store);

	tagSuggestions$!: Observable<string[]>;
	tagInput = new Subject<string>();
	kbParents$: Observable<KBEntry[]>;

	constructor() {

		this.kbParents$ = this.store.select(selKBEntriesArray);

	}

	ngAfterContentInit(): void {

		this.tagSuggestions$ = combineLatest([
			this.store.select(distinctTagsArray),
			this.tagInput
		]).pipe(

			filter(([tags, tagInput]) => !!tagInput && tags.length > 0),
			map(

				([tags, tagInput]) =>
					tags
						.filter(t => t.name.startsWith(tagInput))
						.map(t => t.name)

			)

		);

	}

	onCreate(kbEntry: Partial<KBEntry>): void {

		this.store.dispatch(createKBEntry({ kbEntry }));

	}

	onUpdate(id: UUID, kbEntry: Partial<KBEntry>) {

		this.store.dispatch(updateKBEntry({ id, kbEntry }));

	}

	onDelete(id: UUID): void {

		this.store.dispatch(deleteKBEntry({ id }));

	}

	onTagInput(val: string): void {

		this.tagInput.next(val);

	}

}
