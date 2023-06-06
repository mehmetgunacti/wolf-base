import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { SyncService } from 'services/sync.service';
import * as fromActions from '../actions';

@Injectable()
export class SyncEffects {

	private actions$: Actions = inject(Actions);
	private syncService: SyncService = inject(SyncService);

	syncBookmarksCreated$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.syncStart),
			tap(() => this.syncService.trigger())

		),
		{ dispatch: false }

	);

}
