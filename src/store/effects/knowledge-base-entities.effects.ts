import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { liveQuery } from 'dexie';
import { KBEntry, LocalStorageService } from 'lib';
import { from, fromEventPattern, iif, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import { createEntity, createEntitySuccess, deleteEntity, deleteEntitySuccess, loadAllEntitiesSuccess, updateEntity, updateEntityFailure, updateEntitySuccess } from 'store/actions/kb-entry-entity.actions';

@Injectable()
export class KnowledgeBaseEntitiesEffects {

	private actions$: Actions = inject(Actions);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	loadKBEntries$ = createEffect(

		() => fromEventPattern<KBEntry[]>(

			// this function (first parameter) is called when the fromEventPattern() observable is subscribed to.
			// note: the observable returned by Dexie's liveQuery() is not an rxjs Observable
			// hence we use fromEventPattern to convert the Dexie Observable to an rxjs Observable.
			(handler) => liveQuery(() => this.localStorage.kbEntries.list()).subscribe(handler),

			// this function (second parameter) is called when the fromEventPattern() observable is unsubscribed from
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map(kbEntries => loadAllEntitiesSuccess({ kbEntries }))
		)

	);

	createKBEntry$ = createEffect(

		() => this.actions$.pipe(

			ofType(createEntity),
			map(param => param.kbEntry),
			switchMap(kbEntry => this.localStorage.kbEntries.create(kbEntry)),
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
			switchMap(({ id, kbEntry }) => from(this.localStorage.kbEntries.update(id, kbEntry)).pipe(
				switchMap(count => iif(
					() => count === 1,
					from(this.localStorage.kbEntries.getEntity(id)).pipe(
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
			switchMap(id => this.localStorage.kbEntries.moveToTrash(id)),
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
