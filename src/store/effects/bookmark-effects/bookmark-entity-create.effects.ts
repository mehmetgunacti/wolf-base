import { Injectable, inject } from '@angular/core';
import { AppEntityType, Bookmark, TAG_NEW } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concat, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ClipboardService } from 'services';
import * as bmActions from 'store/actions/bookmark.actions';
import * as entityActions from 'store/actions/entity.actions';

// note: timer value (600) has to be ~ as in lib/components/_shake.scss
const fromClipboardFailure$ = concat(

	of(bmActions.fromClipboardFailure({ shaking: true })),
	timer(600).pipe(map(() => bmActions.fromClipboardFailure({ shaking: false })))

);

@Injectable()
export class BookmarkEntityCreateEffects {

	private actions$: Actions = inject(Actions);
	private clipboardService: ClipboardService = inject(ClipboardService);

	fromClipboard$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.fromClipboard),
			switchMap(() => this.clipboardService.fromClipboard()),
			switchMap((url: URL | null) => {

				if (url === null)
					return fromClipboardFailure$;
				const bookmark: Partial<Bookmark> = {

					urls: [url.toString()],
					title: url.hostname,
					name: url.hostname,
					tags: [TAG_NEW]

				};
				return of(entityActions.create({ entityType: AppEntityType.bookmark, entity: bookmark }));

			})

		)

	);

}
