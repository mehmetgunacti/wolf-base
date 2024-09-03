import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { LocalRepositoryService } from '@lib';
import { map, switchMap } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import { saveFirestoreConfig, saveFirestoreConfigSuccess, savePinnedNotesConfig, savePinnedNotesConfigSuccess, savePopularBookmarksConfig, savePopularBookmarksConfigSuccess, saveTitleLookup, saveTitleLookupSuccess } from 'store/actions/settings.actions';

@Injectable()
export class SettingsEffects {

    private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	saveFirestoreConfig$ = createEffect(

		() => this.actions$.pipe(

			ofType(saveFirestoreConfig),
			switchMap(({ config }) => this.localRepository.configuration.setFirestoreConfig(config)),
			map(() => saveFirestoreConfigSuccess())

		)

	);

    saveFirestoreConfigSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(saveFirestoreConfigSuccess),
			map(() => showNotification({ severity: 'success', summary: 'Configuration Saved', detail: 'Firestore Configuration' }))

		)

	);

	saveTitleLookupConfig$ = createEffect(

		() => this.actions$.pipe(

			ofType(saveTitleLookup),
			switchMap(({ url }) => this.localRepository.configuration.setTitleLookupUrl(url)),
			map(() => saveTitleLookupSuccess())

		)

	);

	saveTitleLookupSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(saveTitleLookupSuccess),
			map(() => showNotification({ severity: 'success', summary: 'Configuration Saved', detail: 'Title Lookup Configuration' }))

		)

	);

	savePinnedNotesConfig$ = createEffect(

		() => this.actions$.pipe(

			ofType(savePinnedNotesConfig),
			switchMap(({ tags }) => this.localRepository.configuration.setPinnedNotes(tags)),
			map(() => savePinnedNotesConfigSuccess())

		)

	);

	savePinnedNotesConfigSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(savePinnedNotesConfigSuccess),
			map(() => showNotification({ severity: 'success', summary: 'Configuration Saved', detail: 'Pinned Notes Configuration' }))

		)

	);

	savePopularBookmarksConfig$ = createEffect(

		() => this.actions$.pipe(

			ofType(savePopularBookmarksConfig),
			switchMap(({ tags }) => this.localRepository.configuration.setPopularBookmarks(tags)),
			map(() => savePopularBookmarksConfigSuccess())

		)

	);

	savePopularBookmarksConfigSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(savePopularBookmarksConfigSuccess),
			map(() => showNotification({ severity: 'success', summary: 'Configuration Saved', detail: 'Popular Bookmarks Configuration' }))

		)

	);

}
