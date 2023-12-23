import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import * as contentActions from 'store/actions/note-content.actions';
import * as noteActions from 'store/actions/note.actions';

@Injectable()
export class NoteContentLoadEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	loadAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(contentActions.loadAll),
			switchMap(() =>

				Promise.all([

					this.localRepository.noteContent.listIds(),
					this.localRepository.noteContent.listSyncData(),
					this.localRepository.noteContent.listRemoteMetadata()

				])

			),
			map(([ids, syncData, remoteMetadata]) => contentActions.loadAllSuccess({ ids, syncData, remoteMetadata }))

		)

	);

	loadOne$ = createEffect(

		() => this.actions$.pipe(

			ofType(contentActions.loadOne),
			switchMap(({ id }) =>

				Promise.all([

					Promise.resolve(id),
					this.localRepository.noteContent.listIds(),
					this.localRepository.noteContent.getSyncData(id),
					this.localRepository.noteContent.getRemoteMetadata(id)

				])
			),
			map(([id, ids, syncData, remoteMetadata]) => contentActions.loadOneSuccess({ id, contentAvailable: ids.includes(id), syncData, remoteMetadata }))

		)

	);

	loadOneSyncData$ = createEffect(

		() => this.actions$.pipe(

			ofType(contentActions.loadOneSyncData),
			switchMap(({ id }) =>

				from(this.localRepository.noteContent.getSyncData(id)).pipe(

					map(syncData => contentActions.loadOneSyncDataSuccess({ syncData }))

				)

			)

		)

	);

	loadAllRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(contentActions.loadAllRemoteMetadata),
			switchMap(() => this.localRepository.noteContent.listRemoteMetadata()),
			map(remoteMetadata => contentActions.loadAllRemoteMetadataSuccess({ remoteMetadata }))

		)

	);

	loadNoteContent$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.setSelectedId),
			map(param => param.id),
			filter((id): id is string => !!id),
			switchMap(id => this.localRepository.noteContent.getEntity(id)),
			map(content => contentActions.loadOneContentSuccess({ content }))

		)

	);

}
