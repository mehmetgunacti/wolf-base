import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { LocalRepositoryService } from '@lib';
import { BackupDatabase } from 'lib/utils/database.util';
import { map, switchMap } from 'rxjs/operators';
import { backupDatabase, loadValues, loadValuesSuccess } from 'store/actions/database.actions';

@Injectable()
export class DatabaseEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	generateZip$ = createEffect(

		() => this.actions$.pipe(

			ofType(backupDatabase),
			switchMap(() => new BackupDatabase(this.localRepository).execute())

		),
		{ dispatch: false }

	);

	selectValues$ = createEffect(

		() => this.actions$.pipe(

			ofType(loadValues),
			switchMap(({ tablename }) => this.localRepository.dump(tablename)),
			map(dump => Object.values(dump)),
			map(selectedValues => loadValuesSuccess({ selectedValues }))

		)

	);

}
