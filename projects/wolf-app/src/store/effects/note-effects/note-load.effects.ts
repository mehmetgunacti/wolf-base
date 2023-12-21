import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from, iif, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import * as noteActions from 'store/actions/note.actions';

@Injectable()
export class NoteLoadEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	loadOne$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.loadOne),
			switchMap(({ id }) =>

				Promise.all([

					Promise.resolve(id),
					this.localRepository.notes.getEntity(id),
					this.localRepository.notes.getSyncData(id),
					this.localRepository.notes.getRemoteMetadata(id)

				])
			),
			map(([id, note, syncData, remoteMetadata]) => noteActions.loadOneSuccess({ id, note, syncData, remoteMetadata }))

		)

	);

	loadAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.loadAll),
			switchMap(() =>

				Promise.all([

					this.localRepository.notes.list(),
					this.localRepository.notes.listSyncData(),
					this.localRepository.notes.listRemoteMetadata()

				])

			),
			map(([notes, syncData, remoteMetadata]) => noteActions.loadAllSuccess({ notes, syncData, remoteMetadata }))

		)

	);

	loadOneSyncData$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.loadOneSyncData),
			switchMap(({ id }) =>

				from(this.localRepository.notes.getSyncData(id)).pipe(

					map(syncData => noteActions.loadOneSyncDataSuccess({ syncData }))

				)

			)

		)

	);

	loadAllRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.loadAllRemoteMetadata),
			switchMap(() => this.localRepository.notes.listRemoteMetadata()),
			map(remoteMetadata => noteActions.loadAllRemoteMetadataSuccess({ remoteMetadata }))

		)

	);

	loadNoteContent$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.setSelectedId),
			map(param => param.id),
			filter((id): id is string => !!id),
			switchMap(id => this.localRepository.noteContent.getEntity(id)),
			map(content => noteActions.loadOneContentSuccess({ content }))

		)

	);

}
