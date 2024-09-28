import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { switchMap } from 'rxjs/operators';
import { coreActions } from 'store/actions';
import { selCore_sidebarState } from 'store/selectors/core/core-ui.selectors';

@Injectable()
export class CoreSaveEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	saveSidebarState$ = createEffect(

		() => this.actions$.pipe(

			ofType(
				coreActions.setBigScreen,
				coreActions.setNextSidebarState,
				coreActions.hideSidebar
			),
			concatLatestFrom(() => this.store.select(selCore_sidebarState)),
			switchMap(([, state]) => this.localRepository.configuration.setSidebarState(state))

		), { dispatch: false }

	);

}
