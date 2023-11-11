import { AfterContentInit, ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bookmark, ToastConfiguration, UUID, WolfEntity } from 'lib';
import { Observable, Subject, combineLatest, map } from 'rxjs';
import { closeEditBookmarkDialog } from 'store/actions/bookmark.actions';
import { createEntity, deleteEntity, updateEntity } from 'store/actions/core-entity.actions';
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
	tagInput = new Subject<string | null>();

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

			map(([tags, tagInput]) => {

				if (!!tagInput)
					return tags.filter(t => t.name.startsWith(tagInput)).map(t => t.name);
				return [];

			})

		);

	}

	onCreate(bookmark: Partial<Bookmark>): void {

		//this.store.dispatch(createBookmark({ bookmark }));
		this.store.dispatch(createEntity({ entity: WolfEntity.bookmarks, data: bookmark }));

	}

	onUpdate(id: UUID, data: Partial<Bookmark>) {

		this.store.dispatch(updateEntity({ id, data, entity: WolfEntity.bookmarks }));

	}

	onDelete(id: UUID): void {

		this.store.dispatch(deleteEntity({ entity: WolfEntity.bookmarks, id }));

	}

	onClose(): void {

		this.store.dispatch(closeEditBookmarkDialog());

	}

	onTagInput(val: string | null): void {

		this.tagInput.next(val);

	}

	onTitleLookup(toast: ToastConfiguration): void {

		this.store.dispatch(showNotification(toast));

	}

}
