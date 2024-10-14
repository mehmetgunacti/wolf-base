import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalRepositoryService } from '@libServices';
import { filter, map, switchMap } from 'rxjs/operators';
import { LOCAL_REPOSITORY_SERVICE } from 'services';
import { noteActions } from '@actions';

@Injectable()
export class NoteContentLoadEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

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
