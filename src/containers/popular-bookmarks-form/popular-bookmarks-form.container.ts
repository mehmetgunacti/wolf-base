import { settingsActions } from '@actions/settings.actions';
import { AsyncPipe } from '@angular/common';
import { AfterContentInit, Component, inject } from '@angular/core';
import { TagForm } from '@forms/tag/tag.form';
import { BaseComponent } from '@libComponents/base.component';
import { Store } from '@ngrx/store';
import { selBM_distinctTagsArray } from '@selectors/bookmark/bookmark-tags.selectors';
import { selCore_popularBookmarks } from '@selectors/core/core-configuration.selectors';
import { Observable, Subject, combineLatest, map } from 'rxjs';

@Component({
	imports: [ TagForm, AsyncPipe ],
	selector: 'app-popular-bookmarks-form-container',
	templateUrl: './popular-bookmarks-form.container.html',
	host: { 'class': 'comp p-4' }
})
export class PopularBookmarksFormContainer extends BaseComponent implements AfterContentInit {

	private store: Store = inject(Store);

	protected tags$ = this.store.select(selCore_popularBookmarks);
	protected tagSuggestions$!: Observable<string[]>;
	protected tagInput = new Subject<string | null>();

	ngAfterContentInit(): void {

		this.tagSuggestions$ = combineLatest([
			this.store.select(selBM_distinctTagsArray),
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

		this.store.dispatch(settingsActions.savePopularBookmarksConfig({ tags }));

	}

	onTagInput(val: string | null): void {

		this.tagInput.next(val);

	}

}
