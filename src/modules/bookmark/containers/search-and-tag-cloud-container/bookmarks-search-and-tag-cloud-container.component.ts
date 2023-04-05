import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Tag } from 'lib';
import * as fromStore from 'modules/bookmark/store';
import { Observable, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
	selector: 'app-bookmarks-search-and-tag-cloud-container',
	templateUrl: './bookmarks-search-and-tag-cloud-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksSearchAndTagCloudContainerComponent implements OnDestroy {

	@Output() search: EventEmitter<string> = new EventEmitter();

	tags$: Observable<Tag[]>;
	selectedTags$: Observable<string[]>;
	disabledTags$: Observable<string[]>;

	searchControl: FormControl;
	subscription: Subscription;

	constructor(private store: Store) {

		this.tags$ = store.select(fromStore.tagsSelectorDistinctTagsArray);
		this.selectedTags$ = store.select(fromStore.tagsSelectorSelectedTags);
		this.disabledTags$ = store.select(fromStore.tagsSelectorDisabledTags);

		this.searchControl = new FormControl();
		this.subscription = this.searchControl.valueChanges.pipe(
			debounceTime(400),
			distinctUntilChanged()
		).subscribe(term => this.search.emit(term));

	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSearch(): void {

	}

	onTagClicked(name: string): void {

		this.store.dispatch(fromStore.clickTag({ name }));

	}

	onTagSearch(term: string): void { }

	onTagReset(): void { }

}