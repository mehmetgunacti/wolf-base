import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { map, switchMap } from 'rxjs/operators';
import { loadAll, loadAllSuccess } from 'store/actions/core.actions';

@Injectable()
export class CoreLoadEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	loadAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(loadAll),
			switchMap(() => this.localRepository.configuration.getConfiguration()),
			map(configuration => loadAllSuccess({ configuration }))

		)

	);

}
