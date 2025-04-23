import { coreActions } from '@actions/core.actions';
import { entityActions } from '@actions/entity.actions';
import { inject, Injectable } from '@angular/core';
import { AppEntities, AppEntityType } from '@constants/entity.constant';
import { NoteContent } from '@models/note.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { isEntityOfType } from '@utils/helper.tool';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class NoteContentCreateEffects {

	private actions$: Actions = inject(Actions);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.createSuccess),
			filter(isEntityOfType(AppEntityType.noteContent)),
			map(({ entityType }) => coreActions.showNotification({ severity: 'success', detail: `${AppEntities[ entityType ].label} created` }))

		)

	);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.createSuccess),
			filter(isEntityOfType(AppEntityType.noteContent)),
			map(({ entity }) => coreActions.navigate({ url: [ `/notes`, entity.id ] }))

		)

	);

	loadNoteAfterContentCreated$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.createSuccess),
			filter(isEntityOfType(AppEntityType.noteContent)),
			map(({ entity }) => entityActions.loadOne({ entityType: AppEntityType.note, id: entity.id }))

		)

	);

	loadDummyNoteContent$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.createSuccess),
			filter(isEntityOfType(AppEntityType.noteContent)),
			map(({ entity }) => entityActions.loadOneSuccess({
				entityType: AppEntityType.noteContent,
				id: entity.id,
				entity: { id: entity.id, name: entity.name, content: 'dummy' } as NoteContent,
				syncData: null,
				remoteMetadata: null
			}))

		)

	);

}
