import { bookmarkActions, coreActions, entityActions } from '@actions';
import { AsyncPipe } from '@angular/common';
import { AfterContentInit, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AppEntityType, UUID } from '@constants';
import { GlyphDirective } from '@directives';
import { BookmarkForm } from '@forms';
import { BaseComponent, ToastConfiguration } from '@libComponents';
import { Bookmark } from '@models';
import { Store } from '@ngrx/store';
import { selBM_distinctTagsArray, selBookmark_editId, selCore_titleLookupUrl } from '@selectors';
import { Observable, Subject, combineLatest, map } from 'rxjs';

@Component({
	standalone: true,
	imports: [ GlyphDirective, BookmarkForm, AsyncPipe ],
	selector: 'app-bookmark-edit-container',
	templateUrl: './bookmark-edit.container.html',
	host: { 'class': 'component' },
})
export class BookmarkEditContainer extends BaseComponent implements OnInit, OnDestroy, AfterContentInit {

	private store: Store = inject(Store);

	bookmark$: Observable<Bookmark | null | undefined>;
	tagSuggestions$!: Observable<string[]>;
	titleLookup$: Observable<string | null>;
	tagInput = new Subject<string | null>();

	constructor() {

		super();
		this.bookmark$ = this.store.select(selBookmark_editId);
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
			this.store.select(selBM_distinctTagsArray),
			this.tagInput
		]).pipe(

			map(([ tags, tagInput ]) => {

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

		this.store.dispatch(coreActions.showNotification(toast));

	}

}
