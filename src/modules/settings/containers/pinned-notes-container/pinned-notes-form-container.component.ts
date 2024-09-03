import { AfterContentInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest, map } from 'rxjs';
import { savePinnedNotesConfig } from 'store/actions/settings.actions';
import { selCore_pinnedNotes } from 'store/selectors/core/core-configuration.selectors';
import { distinctTagsArray } from 'store/selectors/note/note-tags.selectors';

@Component({
	selector: 'app-pinned-notes-form-container',
	templateUrl: './pinned-notes-form-container.component.html',
	styleUrls: ['./pinned-notes-form-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinnedNotesFormContainerComponent implements AfterContentInit {

	private store: Store = inject(Store);

	tags$: Observable<string[] | null>;
	tagSuggestions$!: Observable<string[]>;
	tagInput = new Subject<string | null>();

	constructor() {

		this.tags$ = this.store.select(selCore_pinnedNotes);

	}

	ngAfterContentInit(): void {

		this.tagSuggestions$ = combineLatest([
			this.store.select(distinctTagsArray),
			this.tagInput
		]).pipe(

			map(([tags, tagInput]) => {

				if (!!tagInput)
					return tags.filter(t => t.name.startsWith(tagInput)).map(t => t.name);
				return [];

			})

		);

	}

	onSave(tags: string[]): void {

		this.store.dispatch(savePinnedNotesConfig({ tags }));

	}

	onTagInput(val: string | null): void {

		this.tagInput.next(val);

	}

}
