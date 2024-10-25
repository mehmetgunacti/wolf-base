import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastConfiguration } from '@libComponents';
import { LogCategory } from '@constants';
import { LogMessage } from '@models';
import { LocalRepositoryService } from '@libServices';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { LOCAL_REPOSITORY_SERVICE } from 'services';
import { coreActions, logActions } from '@actions';
import * as logSelectors from '@selectors';

const convertToast = (toast: ToastConfiguration): LogMessage => {

	const { summary, detail } = toast;
	return {

		category: LogCategory.notification,
		date: new Date().toISOString(),
		message: `${[ summary, detail ].filter(e => !!e).join(' : ')}`

	};

};

@Injectable()
export class LogsEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	loadLogs$ = createEffect(

		() => this.actions$.pipe(

			// ignore action params, use params from state
			ofType(logActions.load, logActions.refresh),
			withLatestFrom(this.store.select(logSelectors.selLogs_uiState)),
			map(([ , params ]) => params),
			switchMap(({ selectedId, categories, limit }) => this.localRepository.logs.list({ entityId: selectedId, categories, limit })),
			map(logs => logActions.loadSuccess({ logs }))

		)

	);

	clearLogs$ = createEffect(

		() => this.actions$.pipe(

			ofType(logActions.clearLogs),
			switchMap(() => this.localRepository.logs.clear())

		),
		{ dispatch: false }

	);

	saveNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreActions.showNotification),
			switchMap(conf => this.localRepository.logs.add(convertToast(conf)))

		),
		{ dispatch: false }

	);

}
