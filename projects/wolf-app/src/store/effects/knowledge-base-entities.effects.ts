import { Injectable, inject } from '@angular/core';
import { KBEntry, LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from, iif, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import { createEntity, createEntitySuccess, deleteEntity, deleteEntitySuccess, updateEntity, updateEntityFailure, updateEntitySuccess } from 'store/actions/kb-entry-entity.actions';

@Injectable()
export class KnowledgeBaseEntitiesEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	// loadKBEntries$ = createEffect(

	// 	() => fromEventPattern<KBEntry[]>(

	// 		// this function (first parameter) is called when the fromEventPattern() observable is subscribed to.
	// 		// note: the observable returned by Dexie's liveQuery() is not an rxjs Observable
	// 		// hence we use fromEventPattern to convert the Dexie Observable to an rxjs Observable.
	// 		(handler) => liveQuery(() => this.localRepository.kbEntries.list()).subscribe(handler),

	// 		// this function (second parameter) is called when the fromEventPattern() observable is unsubscribed from
	// 		(handler, unsubscribe) => unsubscribe()

	// 	).pipe(
	// 		map(entries => loadAllEntitiesSuccess({ entries }))
	// 	)

	// );

	createKBEntry$ = createEffect(

		() => this.actions$.pipe(

			ofType(createEntity),
			map(param => param.kbEntry),
			switchMap(kbEntry => this.localRepository.kbEntries.create(kbEntry)),
			map((kbEntry: KBEntry) => createEntitySuccess({ kbEntry }))

		)

	);

	kbEntryShowCreateNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(createEntitySuccess),
			map(() => showNotification({ severity: 'success', summary: 'Knowledge Base', detail: 'Entry created' }))

		)

	);

	updateKBEntry$ = createEffect(

		() => this.actions$.pipe(

			ofType(updateEntity),
			switchMap(({ id, kbEntry }) => from(this.localRepository.kbEntries.update(id, kbEntry)).pipe(
				switchMap(count => iif(
					() => count === 1,
					from(this.localRepository.kbEntries.getEntity(id)).pipe(
						map(kbEntry => kbEntry ? updateEntitySuccess({ kbEntry }) : updateEntityFailure({ id }))
					),
					of(updateEntityFailure({ id }))
				))
			))
		)
	);

	kbEntryShowUpdateNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(updateEntitySuccess),
			map(() => showNotification({ severity: 'success', summary: 'Knowledge Base', detail: 'Entry updated' }))

		)

	);

	kbEntryDelete$ = createEffect(

		() => this.actions$.pipe(

			ofType(deleteEntity),
			map(p => p.id),
			switchMap(id => this.localRepository.kbEntries.moveToTrash(id)),
			map(() => deleteEntitySuccess())

		)

	);

	kbEntryDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(deleteEntitySuccess),
			map(() => showNotification({ severity: 'success', summary: 'Knowledge Base', detail: 'Entry deleted' }))

		)

	);

}
