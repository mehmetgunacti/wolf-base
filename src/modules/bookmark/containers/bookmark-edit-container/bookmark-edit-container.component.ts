import { AfterContentInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bookmark, UUID } from 'lib';
import { combineLatest, filter, map, Observable, Subject } from 'rxjs';
import * as fromStore from 'store/bookmark';

@Component({
	selector: 'app-bookmark-edit-container',
	templateUrl: './bookmark-edit-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkEditContainerComponent implements OnInit, AfterContentInit {

	bookmark$: Observable<Bookmark | null | undefined>;
	tagSuggestions$!: Observable<string[]>;
	tagInput = new Subject<string>();

	constructor(
		private store: Store<fromStore.BookmarkModuleState>
	) {
		this.bookmark$ = store.select(fromStore.selectedBookmark);
	}

	ngOnInit(): void { }

	ngAfterContentInit(): void {

		this.tagSuggestions$ = combineLatest([
			this.store.select(fromStore.distinctTagsArray),
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

		this.store.dispatch(fromStore.createBookmark({ bookmark: bookmark }));

	}

	onUpdate(id: UUID, bookmark: Partial<Bookmark>) {

		this.store.dispatch(fromStore.updateBookmark({ id, bookmark }));

	}

	delete(): void {

		// const id = this.bookmark?.id;
		// if (!!id)
		// 	if (
		// 		confirm(`
		// 			${this.bookmark?.title}
		// 			${this.bookmark?.url}

		// 			will be deleted. Continue?
		// 		`)
		// 	)
		// 		this.store.dispatch(fromStore.bookmarksDelete({ id }));

	}

	close(): void { }

	onTagInput(val: string): void {

		this.tagInput.next(val);

	}

}
