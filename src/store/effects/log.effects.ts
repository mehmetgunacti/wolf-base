import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { LocalStorageService, LogMessage, ToastConfiguration } from 'lib';
import { switchMap } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';

const convertToast = (toast: ToastConfiguration): LogMessage => {

	const { summary, detail } = toast;
	return { date: new Date().toISOString(), message: summary ? `[${summary}]: ${detail ?? ''}` : `${detail ?? ''}` };

}

@Injectable()
export class LogEffects {

	private actions$: Actions = inject(Actions);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	saveNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(showNotification),
			switchMap(conf => this.localStorage.logs.add(convertToast(conf)))

		),
		{ dispatch: false }

	);

}
