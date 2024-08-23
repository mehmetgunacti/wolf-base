import { AfterContentInit, ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppEntityType, Bookmark, ToastConfiguration, UUID } from 'lib';
import { Observable, Subject, combineLatest, map } from 'rxjs';
import { dialogFadeOutTrigger } from 'services/animation-aware-dialog.service';
import { closeEditBookmarkDialog, moveToTrash, update } from 'store/actions/bookmark.actions';
import { showNotification } from 'store/actions/core-notification.actions';
import * as entityActions from 'store/actions/entity.actions';
import { distinctTagsArray } from 'store/selectors/bookmark-selectors/bookmark-tags.selectors';
import { selBookmarkEditId } from 'store/selectors/bookmark-selectors/bookmark-ui.selectors';
import { selCore_titleLookupUrl } from 'store/selectors/core-configuration.selectors';

@Component({
	selector: 'app-bookmark-edit-container',
	templateUrl: './bookmark-edit-container.component.html',
	styleUrls: ['./bookmark-edit-container.component.scss'],
	animations: [dialogFadeOutTrigger],
	host: { '[@fadeOut]': '' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkEditContainerComponent implements OnInit, AfterContentInit {

	private store: Store = inject(Store);

	bookmark$: Observable<Bookmark | null | undefined>;
	tagSuggestions$!: Observable<string[]>;
	titleLookup$: Observable<string | null>;
	tagInput = new Subject<string | null>();

	constructor() {

		this.bookmark$ = this.store.select(selBookmarkEditId);
		this.titleLookup$ = this.store.select(selCore_titleLookupUrl);

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

		this.store.dispatch(entityActions.create({ entityType: AppEntityType.bookmark, entity: bookmark }));

	}

	onUpdate(id: UUID, bookmark: Partial<Bookmark>) {

		this.store.dispatch(update({ id, bookmark }));

	}

	onRemove(id: UUID): void {

		this.store.dispatch(moveToTrash({ id }));

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
