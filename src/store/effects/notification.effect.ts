import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastConfiguration } from 'blueprints';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { showNotification } from 'store/actions/notification.action';

@Injectable()
export class NotificationEffects {

	constructor(
		private actions$: Actions,
		private toastr: ToastrService
	) { }

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(showNotification),
			tap((info: ToastConfiguration) => {

				const {
					title,
					message,
					disableTimeOut,
					positionClass,
					enableHtml,
					closeButton,
					tapToDismiss,
					toastType
				} = info;
				this.toastr.show(
					message,
					title,
					{
						disableTimeOut,
						positionClass,
						enableHtml,
						closeButton,
						tapToDismiss,
					},
					toastType
				);

			})

		),
		{ dispatch: false }

	);

}
