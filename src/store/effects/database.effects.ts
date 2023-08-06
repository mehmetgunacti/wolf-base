import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { LocalStorageService } from 'lib';
import { BackupDatabase } from 'lib/utils/database.util';
import { switchMap } from 'rxjs/operators';
import { backupDatabase } from 'store/actions/database.actions';

@Injectable()
export class DatabaseEffects {

	private actions$: Actions = inject(Actions);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	generateZip$ = createEffect(

		() => this.actions$.pipe(

			ofType(backupDatabase),
			switchMap(() => new BackupDatabase(this.localStorage).execute())

		),
		{ dispatch: false }

	);

}
