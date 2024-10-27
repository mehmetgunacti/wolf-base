import { AsyncPipe } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TagFormComponent } from '@components';
import { Store } from '@ngrx/store';
import { selCore_pinnedNotes, selNote_distinctTagsArray } from '@selectors';
import { Observable, Subject, combineLatest, map } from 'rxjs';
import { settingsActions } from 'store/actions';

@Component({
	standalone: true,
	imports: [ TagFormComponent, AsyncPipe ],
	selector: 'app-pinned-notes-form-container',
	templateUrl: './pinned-notes-form-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinnedNotesFormContainerComponent implements AfterContentInit {

	private store: Store = inject(Store);

	protected tags$ = this.store.select(selCore_pinnedNotes);
	protected tagSuggestions$!: Observable<string[]>;
	protected tagInput = new Subject<string | null>();

	ngAfterContentInit(): void {

		this.tagSuggestions$ = combineLatest([
			this.store.select(selNote_distinctTagsArray),
			this.tagInput
		]).pipe(

			map(([ tags, tagInput ]) => {

				if (!!tagInput)
					return tags
						.filter(t => t.name.startsWith(tagInput))
						.map(t => t.name);
				return [];

			})

		);

	}

	onSave(tags: string[]): void {

		this.store.dispatch(settingsActions.savePinnedNotesConfig({ tags }));

	}

	onTagInput(val: string | null): void {

		this.tagInput.next(val);

	}

}
