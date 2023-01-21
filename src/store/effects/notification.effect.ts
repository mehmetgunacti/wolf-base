import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastConfiguration } from 'lib';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs/operators';
import { showNotification } from 'store/actions/notification.action';

@Injectable()
export class NotificationEffects {

	constructor(
		private actions$: Actions,
		private messageService: MessageService
	) { }

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(showNotification),
			tap((toast: ToastConfiguration) => this.messageService.add(toast))

		),
		{ dispatch: false }

	);

}
