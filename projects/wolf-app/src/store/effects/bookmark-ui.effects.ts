import { Injectable, inject } from '@angular/core';
import { WOverlayService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookmarkEditContainerComponent } from 'modules/bookmark/containers/bookmark-edit-container/bookmark-edit-container.component';
import { map } from 'rxjs/operators';
import { openAddBookmarkDialog } from 'store/actions/bookmark-ui.actions';

@Injectable()
export class BookmarkUIEffects {

	private actions$: Actions = inject(Actions);
	private overlayService: WOverlayService = inject(WOverlayService);

	openAddBookmarkDialog$ = createEffect(

		() => this.actions$.pipe(

			ofType(openAddBookmarkDialog),
			map(() => this.overlayService.open(BookmarkEditContainerComponent))

		),
		{ dispatch: false }

	);

}
