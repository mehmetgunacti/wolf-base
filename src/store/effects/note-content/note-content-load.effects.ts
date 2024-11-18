import { noteActions } from '@actions/note.actions';
import { inject, Injectable } from '@angular/core';
import { UUID } from '@constants/common.constant';
import { LocalRepositoryService } from '@libServices/local-repository.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from '@services/repository.service';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable()
export class NoteContentLoadEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	loadNoteContent$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.setSelectedId),
			map(param => param.id),
			filter((id): id is UUID => !!id),
			switchMap(id => this.localRepository.noteContent.getEntity(id)),
			map(content => noteActions.loadOneContentSuccess({ content }))

		)

	);

}
