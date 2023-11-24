import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Tag, slideUpDownTrigger } from 'lib';
import { Observable, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { clickTag, emptySelectedTags, search } from 'store/actions/bookmark.actions';
import { distinctTagsArray, relatedTags, selectedTags } from 'store/selectors/bookmark-tags.selectors';

@Component({
	selector: 'app-bookmarks-search-and-tag-cloud-container',
	templateUrl: './bookmarks-search-and-tag-cloud-container.component.html',
	styleUrls: ['./bookmarks-search-and-tag-cloud-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [slideUpDownTrigger]
})
export class BookmarksSearchAndTagCloudContainerComponent implements OnDestroy {

	tags$: Observable<Tag[]>;
	selectedTags$: Observable<string[]>;
	relatedTags$: Observable<string[]>;

	@HostBinding('class.open')
	cloudVisible = false;

	searchControl: FormControl;
	subscription: Subscription;

	constructor(private store: Store) {

		this.tags$ = store.select(distinctTagsArray);
		this.selectedTags$ = store.select(selectedTags);
		this.relatedTags$ = store.select(relatedTags);

		this.searchControl = new FormControl();
		this.subscription = this.searchControl.valueChanges.pipe(
			debounceTime(400),
			distinctUntilChanged()
		).subscribe(term => this.store.dispatch(search({ term })));

	}

	ngOnDestroy(): void {

		this.subscription.unsubscribe();

	}

	onTagClicked(name: string): void {

		this.store.dispatch(clickTag({ name }));

	}

	onSearchReset(): void {

		this.searchControl.reset();

	}

	emptyFilter(): void {

		this.store.dispatch(emptySelectedTags());

	}

	toggleCloud(): void {

		this.cloudVisible = !this.cloudVisible;

	}

}
