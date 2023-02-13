import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import * as fromActions from '../actions';
import { IBookmarksTable, LocalStorageService } from 'lib';

@Injectable()
export class TagsEffects {

	constructor(
		private actions$: Actions,
		private localStorage: LocalStorageService
	) { }

	tasksLoadAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.bookmarksLoadAll),
			switchMap(() => this.localStorage.bookmarks.tags()),
			map(tags => fromActions.tagsLoadAllSuccess({ tags }))

		)

	);

}
