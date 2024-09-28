import { AfterContentInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppEntityType, Bookmark, ToastConfiguration, UUID } from 'lib';
import { Observable, Subject, combineLatest, map } from 'rxjs';
import { bookmarkActions, coreNotificationActions, entityActions } from 'store/actions';
import { distinctTagsArray } from 'store/selectors/bookmark/bookmark-tags.selectors';
import { selBookmarkEditId } from 'store/selectors/bookmark/bookmark-ui.selectors';
import { selCore_titleLookupUrl } from 'store/selectors/core/core-configuration.selectors';

@Component({
	selector: 'app-bookmark-edit-container',
	templateUrl: './bookmark-edit-container.component.html',
	styleUrls: ['./bookmark-edit-container.component.scss'],
	host: { 'class': 'component' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkEditContainerComponent implements OnInit, OnDestroy, AfterContentInit {

	private store: Store = inject(Store);

	bookmark$: Observable<Bookmark | null | undefined>;
	tagSuggestions$!: Observable<string[]>;
	titleLookup$: Observable<string | null>;
	tagInput = new Subject<string | null>();

	constructor() {

		this.bookmark$ = this.store.select(selBookmarkEditId);
		this.titleLookup$ = this.store.select(selCore_titleLookupUrl);

	}

	ngOnInit(): void {
		console.log('in BookmarkEditContainer ngOnInit');
	}

	ngOnDestroy(): void {
		console.log('in BookmarkEditContainer ngOnDestroy');
	}

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

		this.store.dispatch(entityActions.create({ entityType: AppEntityType.bookmark, entity: bookmark }));

	}

	onUpdate(id: UUID, bookmark: Partial<Bookmark>) {

		this.store.dispatch(entityActions.update({ entityType: AppEntityType.bookmark, id, entity: bookmark }));

	}

	onRemove(id: UUID): void {

		this.store.dispatch(entityActions.moveToTrash({ entityType: AppEntityType.bookmark, id }));

	}

	onClose(): void {

		this.store.dispatch(bookmarkActions.closeEditBookmarkDialog());

	}

	onTagInput(val: string | null): void {

		this.tagInput.next(val);

	}

	onTitleLookup(toast: ToastConfiguration): void {

		this.store.dispatch(coreNotificationActions.showNotification(toast));

	}

}
