import { settingsActions } from '@actions';
import { AsyncPipe } from '@angular/common';
import { AfterContentInit, Component, inject } from '@angular/core';
import { TagFormComponent } from '@forms/tag-form/tag-form.component';
import { BaseComponent } from '@libComponents';
import { Store } from '@ngrx/store';
import { selBM_distinctTagsArray, selCore_popularBookmarks } from '@selectors';
import { Observable, Subject, combineLatest, map } from 'rxjs';

@Component({
	standalone: true,
	imports: [ TagFormComponent, AsyncPipe ],
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
