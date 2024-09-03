import { inject, Injectable } from '@angular/core';
import { AppEntities, AppEntityType, Bookmark, isEntityOfType, TAG_NEW } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concat, of, timer } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ClipboardService } from 'services';
import * as bmActions from 'store/actions/bookmark.actions';
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from 'store/actions/core-notification.actions';
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

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.createSuccess),
			filter(isEntityOfType(AppEntityType.bookmark)),
			map(({ entityType }) => showNotification({ severity: 'success', detail: `${AppEntities[entityType].label} created` }))

		)

	);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.createSuccess),
			filter(isEntityOfType(AppEntityType.bookmark)),
			map(({ entity, entityType }) => navigate({ url: [`/${AppEntities[entityType].plural}`], queryParams: { id: entity.id } }))

		)

	);

}
