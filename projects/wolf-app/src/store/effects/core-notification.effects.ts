import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastConfiguration } from '@lib';
import { tap } from 'rxjs/operators';
import { ToastService } from 'services';
import { showNotification } from 'store/actions/core-notification.actions';

@Injectable()
export class CoreNotificationEffects {

	private actions$: Actions = inject(Actions);
	private toastService: ToastService = inject(ToastService);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(showNotification),
			tap((toast: ToastConfiguration) => this.toastService.show(toast))

		),
		{ dispatch: false }

	);

}
