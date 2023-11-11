import { Injectable, inject } from '@angular/core';
import { OVERLAY_ID, WOverlayService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BookmarkEditContainerComponent } from 'modules/bookmark/containers/bookmark-edit-container/bookmark-edit-container.component';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import * as bmActions from 'store/actions/bookmark.actions';
import { createEntitySuccess, deleteEntitySuccess, updateEntitySuccess } from 'store/actions/core-entity.actions';
import { selBookmarkOverlayId } from 'store/selectors/bookmark-ui.selectors';

@Injectable()
export class BookmarkUIEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private overlayService: WOverlayService = inject(WOverlayService);

	openAddBookmarkDialog$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.openAddBookmarkDialog, bmActions.openEditBookmarkDialog),
			map(() => this.overlayService.open(
				BookmarkEditContainerComponent,
				{
					cleanupFn: () => this.store.dispatch(bmActions.closeEditBookmarkDialog())
				}
			)),
			map(id => bmActions.openAddBookmarkDialogSuccess({ id }))

		)

	);

	closeEditBookmarkDialog$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.closeEditBookmarkDialog, updateEntitySuccess, createEntitySuccess, deleteEntitySuccess),
			withLatestFrom(this.store.select(selBookmarkOverlayId)),
			map(([, id]) => id),
			filter((id): id is OVERLAY_ID => id !== null),
			tap(id => this.overlayService.close(id)),
			map(() => bmActions.closeEditBookmarkDialogSuccess())

		)

	);

}
