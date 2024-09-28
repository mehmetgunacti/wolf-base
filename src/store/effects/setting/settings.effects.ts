import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { map, switchMap } from 'rxjs/operators';
import { coreNotificationActions, settingsActions } from 'store/actions';

@Injectable()
export class SettingsEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	saveFirestoreConfig$ = createEffect(

		() => this.actions$.pipe(

			ofType(settingsActions.saveFirestoreConfig),
			switchMap(({ config }) => this.localRepository.configuration.setFirestoreConfig(config)),
			map(() => settingsActions.saveFirestoreConfigSuccess())

		)

	);

	saveFirestoreConfigSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(settingsActions.saveFirestoreConfigSuccess),
			map(() => coreNotificationActions.showNotification({ severity: 'success', summary: 'Configuration Saved', detail: 'Firestore Configuration' }))

		)

	);

	saveTitleLookupConfig$ = createEffect(

		() => this.actions$.pipe(

			ofType(settingsActions.saveTitleLookup),
			switchMap(({ url }) => this.localRepository.configuration.setTitleLookupUrl(url)),
			map(() => settingsActions.saveTitleLookupSuccess())

		)

	);

	saveTitleLookupSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(settingsActions.saveTitleLookupSuccess),
			map(() => coreNotificationActions.showNotification({ severity: 'success', summary: 'Configuration Saved', detail: 'Title Lookup Configuration' }))

		)

	);

	savePinnedNotesConfig$ = createEffect(

		() => this.actions$.pipe(

			ofType(settingsActions.savePinnedNotesConfig),
			switchMap(({ tags }) => this.localRepository.configuration.setPinnedNotes(tags)),
			map(() => settingsActions.savePinnedNotesConfigSuccess())

		)

	);

	savePinnedNotesConfigSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(settingsActions.savePinnedNotesConfigSuccess),
			map(() => coreNotificationActions.showNotification({ severity: 'success', summary: 'Configuration Saved', detail: 'Pinned Notes Configuration' }))

		)

	);

	savePopularBookmarksConfig$ = createEffect(

		() => this.actions$.pipe(

			ofType(settingsActions.savePopularBookmarksConfig),
			switchMap(({ tags }) => this.localRepository.configuration.setPopularBookmarks(tags)),
			map(() => settingsActions.savePopularBookmarksConfigSuccess())

		)

	);

	savePopularBookmarksConfigSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(settingsActions.savePopularBookmarksConfigSuccess),
			map(() => coreNotificationActions.showNotification({ severity: 'success', summary: 'Configuration Saved', detail: 'Popular Bookmarks Configuration' }))

		)

	);

}
