import { bookmarkActions } from '@actions/bookmark.actions';
import { coreActions } from '@actions/core.actions';
import { entityActions } from '@actions/entity.actions';
import { inject, Injectable } from '@angular/core';
import { TAG_NEW } from '@constants/bookmark.constant';
import { AppEntities, AppEntityType } from '@constants/entity.constant';
import { Bookmark } from '@models/bookmark.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClipboardService } from '@services/clipboard.service';
import { isEntityOfType } from '@utils/helper.tool';
import { concat, of, timer } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

// note: timer value (600) has to be ~ as in lib/components/_shake.scss
const fromClipboardFailure$ = concat(

	of(bookmarkActions.fromClipboardFailure({ shaking: true })),
	timer(600).pipe(map(() => bookmarkActions.fromClipboardFailure({ shaking: false })))

);

@Injectable()
export class BookmarkEntityCreateEffects {

	private actions$: Actions = inject(Actions);
	private clipboardService: ClipboardService = inject(ClipboardService);

	fromClipboard$ = createEffect(

		() => this.actions$.pipe(

			ofType(bookmarkActions.fromClipboard),
			switchMap(() => this.clipboardService.fromClipboard()),
			switchMap((url: URL | null) => {

				if (url === null)
					return fromClipboardFailure$;
				const bookmark: Partial<Bookmark> = {

					urls: [ url.toString() ],
					title: url.hostname,
					name: url.hostname,
					tags: [ TAG_NEW ]

				};
				return of(entityActions.create({ entityType: AppEntityType.bookmark, entity: bookmark }));

			})

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.createSuccess),
			filter(isEntityOfType(AppEntityType.bookmark)),
			map(({ entityType }) => coreActions.showNotification({ severity: 'success', detail: `${AppEntities[ entityType ].label} created` }))

		)

	);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.createSuccess),
			filter(isEntityOfType(AppEntityType.bookmark)),
			map(({ entity, entityType }) => coreActions.navigate({ url: [ `/${AppEntities[ entityType ].plural}` ], queryParams: { id: entity.id } }))

		)

	);

}
