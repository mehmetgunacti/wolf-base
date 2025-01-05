import { bookmarkActions } from '@actions/bookmark.actions';
import { AsyncPipe } from '@angular/common';
import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { slideUpDownTrigger } from '@animations/slide-in-out.animation';
import { TAG_POPULAR } from '@constants/bookmark.constant';
import { GlyphName } from '@constants/glyphs.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { SearchBoxComponent } from '@libComponents/search-box/search-box.component';
import { SelectedTagsComponent } from '@libComponents/selected-tags/selected-tags.component';
import { TagCloudComponent } from '@libComponents/tag-cloud/tag-cloud.component';
import { Tag } from '@models/tag.model';
import { Store } from '@ngrx/store';
import { selBM_distinctTagsArray, selBM_QueryParams, selBM_relatedTags } from '@selectors/bookmark/bookmark-tags.selectors';
import { selBookmark_tagsVisible } from '@selectors/bookmark/bookmark-ui.selectors';
import { selCore_popularBookmarks } from '@selectors/core/core-configuration.selectors';
import { debounceTime, distinctUntilChanged, map, Observable, Subscription } from 'rxjs';

@Component({
	imports: [ GlyphDirective, TagCloudComponent, AsyncPipe, SelectedTagsComponent, ReactiveFormsModule, SearchBoxComponent ],
	selector: 'app-bookmarks-search-and-tag-cloud-container',
	templateUrl: './bookmarks-search-and-tag-cloud.container.html',
	animations: [ slideUpDownTrigger ],
	host: {
		'class': 'flex flex-col gap-1 md:gap-2'
	}
})
export class BookmarksSearchAndTagCloudContainer extends BaseComponent implements OnDestroy {

	TAG_POPULAR = TAG_POPULAR;

	private store = inject(Store);

	tags$: Observable<Tag[]>;
	selectedTags$: Observable<string[]>;
	relatedTags$: Observable<string[]>;
	popularTags$: Observable<string[]>;

	cloudVisible = signal(false);
	tagsVisible = this.store.selectSignal(selBookmark_tagsVisible);

	tagsBtnGlyph = computed<GlyphName>(() => this.tagsVisible() ? 'tag' : 'tag_close');
	tagsBtnLabel = computed<string>(() => this.tagsVisible() ? 'Hide Tags' : 'Show Tags');

	searchControl: FormControl;
	subscription: Subscription;


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

	onSearch(term: string): void {

		this.store.dispatch(bookmarkActions.search({ term }));

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

	toggleTags(): void {

		this.store.dispatch(bookmarkActions.toggleTagVisibility());

	}

}
