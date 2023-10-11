import { AfterContentInit, ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bookmark, ToastConfiguration, UUID } from 'lib';
import { Observable, Subject, combineLatest, filter, map } from 'rxjs';
import { closeEditBookmarkDialog } from 'store/actions/bookmark-ui.actions';
import { createBookmark, deleteBookmark, updateBookmark } from 'store/actions/bookmark.actions';
import { showNotification } from 'store/actions/core-notification.actions';
import { selBookmark } from 'store/selectors/bookmark-entities.selectors';
import { distinctTagsArray } from 'store/selectors/bookmark-tags.selectors';
import { selCoreTitleLookupUrl } from 'store/selectors/core-configuration.selectors';

@Component({
	selector: 'app-bookmark-edit-container',
	templateUrl: './bookmark-edit-container.component.html',
	styleUrls: ['./bookmark-edit-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkEditContainerComponent implements OnInit, AfterContentInit {

	private store: Store = inject(Store);

	bookmark$: Observable<Bookmark | null | undefined>;
	tagSuggestions$!: Observable<string[]>;
	titleLookup$: Observable<string | null>;
	tagInput = new Subject<string>();

	constructor() {

		this.bookmark$ = this.store.select(selBookmark);
		this.titleLookup$ = this.store.select(selCoreTitleLookupUrl);

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

	onClose(): void {

		this.store.dispatch(closeEditBookmarkDialog());

	}

	onTagInput(val: string): void {

		this.tagInput.next(val);

	}

	onTitleLookup(toast: ToastConfiguration): void {

		this.store.dispatch(showNotification(toast));

	}

}
