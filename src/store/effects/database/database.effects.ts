import { coreActions } from '@actions/core.actions';
import { databaseActions } from '@actions/database.actions';
import { inject, Injectable } from '@angular/core';
import { DbStore } from '@constants/database.constant';
import { LocalRepositoryService } from '@libServices/local-repository.service';
import { IdBase } from '@models/id-base.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LocalDatabase } from '@services/indexeddb/indexeddb.service';
import { LOCAL_REPOSITORY_SERVICE } from '@services/repository.service';
import { BackupDatabase } from '@utils/database.util';
import { from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class DatabaseEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	generateZip$ = createEffect(

		() => this.actions$.pipe(

			ofType(databaseActions.backupDatabase),
			switchMap(
				() => new BackupDatabase(this.localRepository).execute().pipe(
					map(() => coreActions.hideProgressBar())
				)
			)

		)

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
			map(({ table }) => coreActions.showNotification({ severity: 'success', summary: `Table '${table}' emptied.` }))

		)

	);

	reloadTable$ = createEffect(

		() => this.actions$.pipe(

			ofType(databaseActions.emptyTableSuccess),
			map(() => coreActions.loadAll())

		)

	);

	readFromStore$ = createEffect(

		() => this.actions$.pipe(

			ofType(databaseActions.readFromStore),
			switchMap(({ id, name }) => {

				if (name.endsWith('_trash'))
					return LocalDatabase.getInstance().readValue<IdBase>(name, id);
				return LocalDatabase.getInstance().read(name, id);

			}),
			map(entity => databaseActions.setSelected({ entity }))

		)

	);

	deleteFromStore$ = createEffect(

		() => this.actions$.pipe(

			ofType(databaseActions.deleteFromStore),
			switchMap(({ id, name }) => LocalDatabase.getInstance().delete(name, id)),
			map(() => databaseActions.deleteFromStoreSuccess())

		)

	);

}
