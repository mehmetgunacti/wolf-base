import { coreActions } from '@actions/core.actions';
import { Injectable, inject } from '@angular/core';
import { ToastService } from '@libComponents/toast/toast.service';
import { ToastConfiguration } from '@libComponents/toast/toast.util';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

@Injectable()
export class CoreNotificationEffects {

	private actions$: Actions = inject(Actions);
	private toastService: ToastService = inject(ToastService);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreActions.showNotification),
			tap((toast: ToastConfiguration) => this.toastService.show(toast))

		),
		{ dispatch: false }

	);

}
