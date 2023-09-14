import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { liveQuery } from 'dexie';
import { LocalStorageService, LogCategory, LogMessage, ToastConfiguration } from 'lib';
import { fromEventPattern } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import { clearLogs, loadLogs, loadLogsSuccess, setSelectedCategory } from 'store/actions/logs.actions';
import { selLogsSelectedCategory } from 'store/selectors/logs.selectors';

const convertToast = (toast: ToastConfiguration): LogMessage => {

	const { summary, detail } = toast;
	return {

		category: LogCategory.notification,
		date: new Date().toISOString(),
		message: `${[summary, detail].filter(e => !!e).join(' : ')}`

	};

}

@Injectable()
export class LogsEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	loadLogs$ = createEffect(

		() => this.actions$.pipe(

			ofType(loadLogs, setSelectedCategory),
			withLatestFrom(this.store.select(selLogsSelectedCategory)),
			switchMap(([, category]) => this.localStorage.logs.list({ category })),
			map(logs => loadLogsSuccess({ logs }))

		)

	);

	clearLogs$ = createEffect(

		() => this.actions$.pipe(

			ofType(clearLogs),
			switchMap(() => this.localStorage.logs.clear())

		),
		{ dispatch: false }

	);

	saveNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(showNotification),
			switchMap(conf => this.localStorage.logs.add(convertToast(conf)))

		),
		{ dispatch: false }

	);

}
