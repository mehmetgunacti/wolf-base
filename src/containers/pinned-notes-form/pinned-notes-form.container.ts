import { settingsActions } from '@actions/settings.actions';
import { AsyncPipe } from '@angular/common';
import { AfterContentInit, Component, inject } from '@angular/core';
import { TagForm } from '@forms/tag-form/tag.form';
import { BaseComponent } from '@libComponents/base.component';
import { Store } from '@ngrx/store';
import { selCore_pinnedNotes } from '@selectors/core/core-configuration.selectors';
import { selNote_distinctTagsArray } from '@selectors/note/note-tags.selectors';
import { Observable, Subject, combineLatest, map } from 'rxjs';

@Component({
	standalone: true,
	imports: [ TagForm, AsyncPipe ],
	selector: 'app-pinned-notes-form-container',
	templateUrl: './pinned-notes-form.container.html',
	host: { 'class': 'comp p-4' }
})
export class PinnedNotesFormContainer extends BaseComponent implements AfterContentInit {

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
