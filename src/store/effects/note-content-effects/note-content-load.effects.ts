import { Injectable, inject } from '@angular/core';
import { AppEntityType, LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { filter, map, switchMap } from 'rxjs/operators';
import { setSelectedId } from 'store/actions/entity.actions';
import { loadOneContentSuccess } from 'store/actions/note.actions';

@Injectable()
export class NoteContentLoadEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	loadNoteContent$ = createEffect(

		() => this.actions$.pipe(

			ofType(setSelectedId),
			filter(({ entityType }) => entityType === AppEntityType.note),
			map(param => param.id),
			filter((id): id is string => !!id),
			switchMap(id => this.localRepository.noteContent.getEntity(id)),
			map(content => loadOneContentSuccess({ content }))

		)

	);

}
