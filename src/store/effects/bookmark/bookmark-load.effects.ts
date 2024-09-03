import { Injectable, inject } from '@angular/core';
import { AppEntityType, LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import * as bmActions from 'store/actions/bookmark.actions';
import * as entityActions from 'store/actions/entity.actions';

@Injectable()
export class BookmarkLoadEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	// todo : remove?
	loadOneClickAfterLoadOne$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.loadOne),
			filter(({ entityType }) => entityType === AppEntityType.bookmark),
			map(({ id }) => bmActions.loadOneClick({ id }))

		)

	);

	loadAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.loadAll),
			switchMap(() =>

				Promise.all([

					this.localRepository.bookmarks.listClicks()

				])

			),
			map(([clicks]) => bmActions.loadAllClicksSuccess({ clicks }))

		)

	);

	loadAllClicks$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadAllClicks),
			switchMap(() =>

				from(this.localRepository.bookmarks.listClicks()).pipe(
					map(clicks => bmActions.loadAllClicksSuccess({ clicks }))
				)

			)

		)

	);

	loadOneClick$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadOneClick),
			switchMap(({ id }) =>

				from(this.localRepository.bookmarks.getClick(id)).pipe(
					map(click => bmActions.loadOneClickSuccess({ id, click }))
				)

			)

		)

	);

}
