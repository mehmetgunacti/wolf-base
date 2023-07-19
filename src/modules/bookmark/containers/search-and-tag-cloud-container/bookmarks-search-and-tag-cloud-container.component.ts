import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Tag } from 'lib';
import { Observable, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { clickTag } from 'store/actions/bookmark-tags.actions';
import { distinctTagsArray, relatedTags, selectedTags } from 'store/selectors/bookmark-tags.selectors';

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

		this.tags$ = store.select(distinctTagsArray);
		this.selectedTags$ = store.select(selectedTags);
		this.relatedTags$ = store.select(relatedTags);

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

		this.store.dispatch(clickTag({ name }));

	}

	onSearchReset(): void {

		this.searchControl.reset();

	}

}