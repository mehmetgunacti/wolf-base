import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppEntityType } from '@constants';
import { SyncService } from '@libServices';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SYNC_SERVICE } from 'services';
import { entityActions } from '@actions';
import * as selectors from '@selectors';

function useSelector(entityType: AppEntityType) {

	switch (entityType) {

		case AppEntityType.bookmark: return selectors.selBookmark_RemoteDeleted;
		case AppEntityType.note: return selectors.selNote_RemoteDeleted;
		case AppEntityType.noteContent: return selectors.selNoteContent_RemoteDeleted;
		case AppEntityType.project: return selectors.selProject_RemoteDeleted;
		case AppEntityType.quizEntry: return selectors.selQuizEntry_RemoteDeleted;
		case AppEntityType.quote: return selectors.selQuote_RemoteDeleted;
		case AppEntityType.task: return selectors.selTask_RemoteDeleted;
		case AppEntityType.word: return selectors.selWord_RemoteDeleted;

	}

}

@Injectable()
export class EntitySyncRemoteDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.syncRemoteDeleted),
			switchMap(({ entityType }) => {

				const selector = useSelector(entityType);
				return of(entityType).pipe(withLatestFrom(this.store.select(selector)));

			}),
			switchMap(([ entityType, items ]) =>

				this.syncService.downloadDeleted(entityType, items).pipe(

					map(item => entityActions.unloadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
