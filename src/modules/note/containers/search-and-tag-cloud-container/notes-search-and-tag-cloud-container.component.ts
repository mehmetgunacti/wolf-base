import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TAG_PINNED, Tag, slideUpDownTrigger } from 'lib';
import { Observable, Subscription, debounceTime, distinctUntilChanged, filter, map, take } from 'rxjs';
import { clickTag, emptySelectedTags, search } from 'store/actions/note.actions';
import { selCore_pinnedNotes } from 'store/selectors/core-configuration.selectors';
import { distinctTagsArray, relatedTags, selNote_queryParams } from 'store/selectors/note-selectors/note-tags.selectors';

@Component({
	selector: 'app-notes-search-and-tag-cloud-container',
	templateUrl: './notes-search-and-tag-cloud-container.component.html',
	styleUrls: ['./notes-search-and-tag-cloud-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [slideUpDownTrigger]
})
export class NotesSearchAndTagCloudContainerComponent implements OnDestroy {

	TAG_PINNED = TAG_PINNED;

	tags$: Observable<Tag[]>;
	selectedTags$: Observable<string[]>;
	relatedTags$: Observable<string[]>;
	pinned$: Observable<string[]>;


	@HostBinding('class.open')
	cloudVisible = false;

	searchControl: FormControl;
	subscription: Subscription;

	constructor(private store: Store) {

		this.tags$ = store.select(distinctTagsArray);
		this.relatedTags$ = store.select(relatedTags);
		this.pinned$ = this.store.select(selCore_pinnedNotes).pipe(map(tags => [TAG_PINNED, ...tags]));

		const queryParams$ = store.select(selNote_queryParams);
		this.selectedTags$ = queryParams$.pipe(map(q => q.tags));

		this.searchControl = new FormControl();
		queryParams$.pipe(
			map(q => q.search),
			filter(term => !!term),
			take(1) // only one value on page load
		).subscribe(term => this.searchControl.setValue(term ?? ''));

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
