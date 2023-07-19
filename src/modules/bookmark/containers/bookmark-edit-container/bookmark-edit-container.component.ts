import { AfterContentInit, ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bookmark, UUID } from 'lib';
import { Observable, Subject, combineLatest, filter, map } from 'rxjs';
import { createBookmark, deleteBookmark, updateBookmark } from 'store/actions/bookmark.actions';
import { selectedBookmark } from 'store/selectors/bookmark-entities.selectors';
import { distinctTagsArray } from 'store/selectors/bookmark-tags.selectors';

@Component({
	selector: 'app-bookmark-edit-container',
	templateUrl: './bookmark-edit-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkEditContainerComponent implements OnInit, AfterContentInit {

	private store: Store = inject(Store);

	bookmark$: Observable<Bookmark | null | undefined>;
	tagSuggestions$!: Observable<string[]>;
	tagInput = new Subject<string>();

	constructor() {

		this.bookmark$ = this.store.select(selectedBookmark);

	}

	ngOnInit(): void { }

	ngAfterContentInit(): void {

		this.tagSuggestions$ = combineLatest([
			this.store.select(distinctTagsArray),
			this.tagInput
		]).pipe(

			filter(([tags, tagInput]) => !!tagInput && tags.length > 0),
			map(

				([tags, tagInput]) =>
					tags
						.filter(t => t.name.startsWith(tagInput))
						.map(t => t.name)

			)

		);

	}

	onCreate(bookmark: Partial<Bookmark>): void {

		this.store.dispatch(createBookmark({ bookmark }));

	}

	onUpdate(id: UUID, bookmark: Partial<Bookmark>) {

		this.store.dispatch(updateBookmark({ id, bookmark }));

	}

	onDelete(id: UUID): void {

		this.store.dispatch(deleteBookmark({ id }));

	}

	close(): void { }

	onTagInput(val: string): void {

		this.tagInput.next(val);

	}

}
