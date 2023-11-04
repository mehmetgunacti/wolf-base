import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { LocalRepositoryService, TAG_POPULAR } from '@lib';
import { tap } from 'rxjs/operators';
import { togglePopular } from 'store/actions/kb-entry-tag.actions';

@Injectable()
export class KnowledgeBaseTagsEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_STORAGE_SERVICE);

	kbEntryTogglePopularTag$ = createEffect(

		() => this.actions$.pipe(

			ofType(togglePopular),
			tap(({ id }) => this.localRepository.kbEntries.toggleTag(id, TAG_POPULAR))

		),
		{ dispatch: false }

	);

}
