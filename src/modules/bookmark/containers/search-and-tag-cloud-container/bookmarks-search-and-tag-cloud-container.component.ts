import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TAG_POPULAR, Tag, slideUpDownTrigger } from 'lib';
import { Observable, Subscription, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { bookmarkActions } from 'store/actions';
import { distinctTagsArray, relatedTags, selBookmark_QueryParams } from 'store/selectors/bookmark/bookmark-tags.selectors';
import { selCore_popularBookmarks } from 'store/selectors/core/core-configuration.selectors';

@Component({
	selector: 'app-bookmarks-search-and-tag-cloud-container',
	templateUrl: './bookmarks-search-and-tag-cloud-container.component.html',
	styleUrls: ['./bookmarks-search-and-tag-cloud-container.component.scss'],
	animations: [slideUpDownTrigger],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksSearchAndTagCloudContainerComponent implements OnDestroy {

	TAG_POPULAR = TAG_POPULAR;

	tags$: Observable<Tag[]>;
	selectedTags$: Observable<string[]>;
	relatedTags$: Observable<string[]>;
	popularTags$: Observable<string[]>;

	cloudVisible = signal(false);

	searchControl: FormControl;
	subscription: Subscription;

	constructor(private store: Store) {

		this.tags$ = store.select(distinctTagsArray);
		this.selectedTags$ = store.select(selBookmark_QueryParams).pipe(map(q => q.tags));
		this.relatedTags$ = store.select(relatedTags);
		this.popularTags$ = this.store.select(selCore_popularBookmarks).pipe(map(tags => [TAG_POPULAR, ...tags]));

		this.searchControl = new FormControl();
		this.subscription = this.searchControl.valueChanges.pipe(
			debounceTime(400),
			distinctUntilChanged()
		).subscribe(term => this.store.dispatch(bookmarkActions.search({ term })));

	}

	ngOnDestroy(): void {

		this.subscription.unsubscribe();

	}

	onTagClicked(name: string): void {

		this.store.dispatch(bookmarkActions.clickTag({ name }));

	}

	onSearchReset(): void {

		this.searchControl.reset();

	}

	emptyFilter(): void {

		this.store.dispatch(bookmarkActions.emptySelectedTags());

	}

	toggleCloud(): void {

		this.cloudVisible.set(!this.cloudVisible());

	}

}
