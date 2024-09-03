import { AfterContentInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest, map } from 'rxjs';
import { savePopularBookmarksConfig } from 'store/actions/settings.actions';
import { distinctTagsArray } from 'store/selectors/bookmark/bookmark-tags.selectors';
import { selCore_popularBookmarks } from 'store/selectors/core/core-configuration.selectors';

@Component({
	selector: 'app-popular-bookmarks-form-container',
	templateUrl: './popular-bookmarks-form-container.component.html',
	styleUrls: ['./popular-bookmarks-form-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopularBookmarksFormContainerComponent implements AfterContentInit {

	private store: Store = inject(Store);

	tags$: Observable<string[] | null>;
	tagSuggestions$!: Observable<string[]>;
	tagInput = new Subject<string | null>();

	constructor() {

		this.tags$ = this.store.select(selCore_popularBookmarks);

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

		this.store.dispatch(savePopularBookmarksConfig({ tags }));

	}

	onTagInput(val: string | null): void {

		this.tagInput.next(val);

	}

}
