import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Tag } from 'lib';
import { Observable, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { BookmarkActions } from 'store/actions';
import * as fromStore from 'store/bookmark';

@Component({
	selector: 'app-bookmarks-search-and-tag-cloud-container',
	templateUrl: './bookmarks-search-and-tag-cloud-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksSearchAndTagCloudContainerComponent implements OnDestroy {

	@Output() search: EventEmitter<string> = new EventEmitter();

	tags$: Observable<Tag[]>;
	selectedTags$: Observable<string[]>;
	relatedTags$: Observable<string[]>;

	searchControl: FormControl;
	subscription: Subscription;

	constructor(private store: Store) {

		this.tags$ = store.select(fromStore.distinctTagsArray);
		this.selectedTags$ = store.select(fromStore.selectedTags);
		this.relatedTags$ = store.select(fromStore.relatedTags);

		this.searchControl = new FormControl();
		this.subscription = this.searchControl.valueChanges.pipe(
			debounceTime(400),
			distinctUntilChanged()
		).subscribe(term => this.search.emit(term));

	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onTagClicked(name: string): void {

		this.store.dispatch(BookmarkActions.Tags.clickTag({ name }));

	}

	onSearchReset(): void {

		this.searchControl.reset();

	}

}