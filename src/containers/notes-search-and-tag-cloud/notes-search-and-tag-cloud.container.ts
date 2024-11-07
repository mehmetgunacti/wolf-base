import { noteActions } from '@actions';
import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { slideUpDownTrigger } from '@animations';
import { TAG_PINNED } from '@constants';
import { AutofocusDirective, GlyphDirective } from '@directives';
import { BaseComponent, InputComponent, SelectedTagsComponent, TagCloudComponent } from '@libComponents';
import { Tag } from '@models';
import { Store } from '@ngrx/store';
import { selCore_pinnedNotes, selNote_distinctTagsArray, selNote_queryParams, selNote_relatedTags } from '@selectors';
import { debounceTime, distinctUntilChanged, map, Observable, Subscription } from 'rxjs';

@Component({
	standalone: true,
	imports: [ GlyphDirective, InputComponent, TagCloudComponent, AsyncPipe, SelectedTagsComponent, ReactiveFormsModule, AutofocusDirective ],
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
