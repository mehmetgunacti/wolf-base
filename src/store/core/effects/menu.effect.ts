import { Injectable, inject } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { Bookmark, LocalStorageService } from 'lib';
import { map } from 'rxjs';
import { setTotalBookmarksCount } from '../actions';

@Injectable()
export class MenuEffects {

	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	totalBookmarksCount$ = createEffect(

		() => this.localStorage.bookmarks.list$().pipe(

			map((bookmarks: Bookmark[]) => setTotalBookmarksCount({ count: bookmarks.length }))

		)

	);

}
