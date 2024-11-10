import { bookmarkActions } from '@actions';
import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { slideUpDownTrigger } from '@animations';
import { TAG_POPULAR } from '@constants';
import { GlyphDirective } from '@directives';
import { BaseComponent, SelectedTagsComponent, TagCloudComponent } from '@libComponents';
import { Tag } from '@models';
import { Store } from '@ngrx/store';
import { selBM_distinctTagsArray, selBM_QueryParams, selBM_relatedTags, selCore_popularBookmarks } from '@selectors';
import { debounceTime, distinctUntilChanged, map, Observable, Subscription } from 'rxjs';

@Component({
	standalone: true,
	imports: [ GlyphDirective, TagCloudComponent, AsyncPipe, SelectedTagsComponent, ReactiveFormsModule ],
	selector: 'app-bookmarks-search-and-tag-cloud-container',
	templateUrl: './bookmarks-search-and-tag-cloud.container.html',
	animations: [ slideUpDownTrigger ],
	host: {
		'class': 'flex flex-col comp comp-dark min-h-14'
	}
})
export class BookmarksSearchAndTagCloudContainer extends BaseComponent implements OnDestroy {

	TAG_POPULAR = TAG_POPULAR;

	tags$: Observable<Tag[]>;
	selectedTags$: Observable<string[]>;
	relatedTags$: Observable<string[]>;
	popularTags$: Observable<string[]>;

	cloudVisible = signal(false);

	searchControl: FormControl;
	subscription: Subscription;

	private store = inject(Store);

	constructor() {

		super();
		this.tags$ = this.store.select(selBM_distinctTagsArray);
		this.selectedTags$ = this.store.select(selBM_QueryParams).pipe(map(q => q.tags));
		this.relatedTags$ = this.store.select(selBM_relatedTags);
		this.popularTags$ = this.store.select(selCore_popularBookmarks).pipe(map(tags => [ TAG_POPULAR, ...tags ]));

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
