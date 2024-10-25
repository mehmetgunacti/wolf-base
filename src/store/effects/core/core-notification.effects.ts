import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastConfiguration, ToastService } from '@libComponents';
import { tap } from 'rxjs/operators';
import { coreActions } from '@actions';

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
