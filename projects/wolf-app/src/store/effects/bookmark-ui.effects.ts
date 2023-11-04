import { Injectable, inject } from '@angular/core';
import { Entity, OVERLAY_ID, TAG_NEW, WOverlayService, WolfEntity } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BookmarkEditContainerComponent } from 'modules/bookmark/containers/bookmark-edit-container/bookmark-edit-container.component';
import { concat, of, timer } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ClipboardService } from 'services/clipboard.service';
import { closeEditBookmarkDialog, closeEditBookmarkDialogSuccess, openAddBookmarkDialog, openAddBookmarkDialogSuccess, openEditBookmarkDialog } from 'store/actions/bookmark-ui.actions';
import { fromClipboard, fromClipboardFailure } from 'store/actions/bookmark.actions';
import { createEntity, createEntitySuccess, deleteEntitySuccess, updateEntitySuccess } from 'store/actions/core-entity.actions';
import { selBookmarkOverlayId } from 'store/selectors/bookmark-ui.selectors';

// note: timer value (600) has to be ~ as in _shake.scss
const fromClipboardFailure$ = concat(

	of(fromClipboardFailure({ shaking: true })),
	timer(600).pipe(map(() => fromClipboardFailure({ shaking: false })))

);

@Injectable()
export class BookmarkUIEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private overlayService: WOverlayService = inject(WOverlayService);
	private clipboardService: ClipboardService = inject(ClipboardService);

	openAddBookmarkDialog$ = createEffect(

		() => this.actions$.pipe(

			ofType(openAddBookmarkDialog, openEditBookmarkDialog),
			map(() => this.overlayService.open(
				BookmarkEditContainerComponent,
				{
					cleanupFn: () => this.store.dispatch(closeEditBookmarkDialog())
				}
			)),
			map(id => openAddBookmarkDialogSuccess({ id }))

		)

	);

	closeEditBookmarkDialog$ = createEffect(

		() => this.actions$.pipe(

			ofType(closeEditBookmarkDialog, updateEntitySuccess, createEntitySuccess, deleteEntitySuccess),
			withLatestFrom(this.store.select(selBookmarkOverlayId)),
			map(([, id]) => id),
			filter((id): id is OVERLAY_ID => id !== null),
			tap(id => this.overlayService.close(id)),
			map(() => closeEditBookmarkDialogSuccess())

		)

	);

	fromClipboard$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromClipboard),
			switchMap(() => this.clipboardService.fromClipboard()),
			switchMap((url: URL | null) => {

				if (url === null)
					return fromClipboardFailure$;
				return of(createEntity({
					entity: WolfEntity.bookmarks,
					data: {
						urls: [url.toString()],
						title: url.hostname,
						name: url.hostname,
						tags: [TAG_NEW]
					} as unknown as Entity
				}));

			})

		)

	);

}
