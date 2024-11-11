import { bookmarkActions, coreActions, entityActions } from '@actions';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
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
	host: { 'class': 'h-full flex flex-col p-2 pt-1 md:pt-3 md:p-4' },
})
export class BookmarkEditContainer extends BaseComponent {

	private store: Store = inject(Store);

	protected bookmark = this.store.selectSignal(selBookmark_editId);
	protected titleLookup = this.store.selectSignal(selCore_titleLookupUrl);
	protected tagSuggestions$: Observable<string[]>;

	private tagInput = new Subject<string | null>();

	constructor() {

		super();
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

		this.store.dispatch(bookmarkActions.closeFormDialog());

	}

	onTagInput(val: string | null): void {

		this.tagInput.next(val);

	}

	onTitleLookup(toast: ToastConfiguration): void {

		this.store.dispatch(coreActions.showNotification(toast));

	}

}
