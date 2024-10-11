import { inject, Injectable } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { BackupDatabase } from 'lib/utils/database.util';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { coreActions, databaseActions } from 'store/actions';

@Injectable()
export class DatabaseEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	generateZip$ = createEffect(

		() => this.actions$.pipe(

			ofType(databaseActions.backupDatabase),
			switchMap(() => new BackupDatabase(this.localRepository).execute())

		),
		{ dispatch: false }

	);

	emptyTable$ = createEffect(

		() => this.actions$.pipe(

			ofType(databaseActions.emptyTable),
			switchMap(

				({ table }) => from(this.localRepository.empty(table)).pipe(
					map(() => databaseActions.emptyTableSuccess({ table }))
				)

			)

		)

	);

	showEmptySuccessNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(databaseActions.emptyTableSuccess),
			map(({table}) => coreActions.showNotification({severity: 'success', summary: `Table '${table}' emptied.`}))

		)

	);

	reloadTable$ = createEffect(

		() => this.actions$.pipe(

			ofType(databaseActions.emptyTableSuccess),
			map(() => coreActions.loadAll())

		)

	);

}
