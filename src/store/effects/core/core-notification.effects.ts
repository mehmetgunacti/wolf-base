import { Injectable, inject } from '@angular/core';
import { ToastConfiguration, ToastService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { coreNotificationActions } from 'store/actions';

@Injectable()
export class CoreNotificationEffects {

	private actions$: Actions = inject(Actions);
	private toastService: ToastService = inject(ToastService);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreNotificationActions.showNotification),
			tap((toast: ToastConfiguration) => this.toastService.show(toast))

		),
		{ dispatch: false }

	);

}
