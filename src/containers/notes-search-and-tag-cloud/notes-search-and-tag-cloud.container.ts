import { noteActions } from '@actions/note.actions';
import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { slideUpDownTrigger } from '@animations/slide-in-out.animation';
import { TAG_PINNED } from '@constants/bookmark.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { SelectedTagsComponent } from '@libComponents/selected-tags/selected-tags.component';
import { TagCloudComponent } from '@libComponents/tag-cloud/tag-cloud.component';
import { Tag } from '@models/tag.model';
import { Store } from '@ngrx/store';
import { selCore_pinnedNotes } from '@selectors/core/core-configuration.selectors';
import { selNote_distinctTagsArray, selNote_queryParams, selNote_relatedTags } from '@selectors/note/note-tags.selectors';
import { debounceTime, distinctUntilChanged, map, Observable, Subscription } from 'rxjs';

@Component({
	standalone: true,
	imports: [ GlyphDirective, TagCloudComponent, AsyncPipe, SelectedTagsComponent, ReactiveFormsModule ],
	selector: 'app-notes-search-and-tag-cloud-container',
	templateUrl: './notes-search-and-tag-cloud.container.html',
	animations: [ slideUpDownTrigger ],
	host: {
		'class': 'flex flex-col comp comp-dark min-h-14'
	}
})
export class NotesSearchAndTagCloudContainer extends BaseComponent implements OnDestroy {

	TAG_PINNED = TAG_PINNED;

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
		this.tags$ = this.store.select(selNote_distinctTagsArray);
		this.selectedTags$ = this.store.select(selNote_queryParams).pipe(map(q => q.tags));
		this.relatedTags$ = this.store.select(selNote_relatedTags);
		this.popularTags$ = this.store.select(selCore_pinnedNotes).pipe(map(tags => [ TAG_PINNED, ...tags ]));

		this.searchControl = new FormControl();
		this.subscription = this.searchControl.valueChanges.pipe(
			debounceTime(400),
			distinctUntilChanged()
		).subscribe(term => this.store.dispatch(noteActions.search({ term })));

	}

	ngOnDestroy(): void {

		this.subscription.unsubscribe();

	}

	onTagClicked(name: string): void {

		this.store.dispatch(noteActions.clickTag({ name }));

	}

	onSearchReset(): void {

		this.searchControl.reset();

	}

	emptyFilter(): void {

		this.store.dispatch(noteActions.emptySelectedTags());

	}

	toggleCloud(): void {

		this.cloudVisible.set(!this.cloudVisible());

	}

}
