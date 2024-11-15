import { bookmarkActions } from '@actions/bookmark.actions';
import { entityActions } from '@actions/entity.actions';
import { Injectable, inject } from '@angular/core';
import { AppEntityType } from '@constants/entity.constant';
import { LocalRepositoryService } from '@libServices/local-repository.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from '@services/repository.service';
import { from } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable()
export class BookmarkLoadEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	// todo : remove?
	loadOneClickAfterLoadOne$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.loadOne),
			filter(({ entityType }) => entityType === AppEntityType.bookmark),
			map(({ id }) => bookmarkActions.loadOneClick({ id }))

		)

	);

	// loadAll$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(entityActions.loadAll),
	// 		switchMap(() =>

	// 			Promise.all([

	// 				this.localRepository.bookmarks.listClicks()

	// 			])

	// 		),
	// 		map(([clicks]) => bookmarkActions.loadAllClicksSuccess({ clicks }))

	// 	)

	// );

	// loadAllClicks$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(bookmarkActions.loadAllClicks),
	// 		switchMap(() =>

	// 			from(this.localRepository.bookmarks.listClicks()).pipe(
	// 				map(clicks => bookmarkActions.loadAllClicksSuccess({ clicks }))
	// 			)

	// 		)

	// 	)

	// );

	loadOneClick$ = createEffect(

		() => this.actions$.pipe(

			ofType(bookmarkActions.loadOneClick),
			switchMap(({ id }) =>

				from(this.localRepository.bookmarks.getClick(id)).pipe(
					map(click => bookmarkActions.loadOneClickSuccess({ id, click }))
				)

			)

		)

	);

}
