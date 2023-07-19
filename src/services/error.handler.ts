import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastConfiguration, errorNotification } from 'lib';
import { CoreActions } from 'store/actions';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

	constructor(private injector: Injector) { }

	handleError(error: Error) {

		console.error(error);
		const store = this.injector.get(Store);
		store.dispatch(CoreActions.Notification.showNotification(this.getToastConfiguration(error)));
		if (error instanceof HttpErrorResponse) {

			if (error.error.code === 'LockedException')
				store.dispatch(CoreActions.Navigation.navigate({ url: '/change-password', skipLocationChange: true }));

			if (error.error.code === 'InvalidJWTTokenException') {

				localStorage.removeItem('token');
				store.dispatch(CoreActions.Navigation.navigate({ url: '/login' }));

			}

		}

	}

	private getToastConfiguration = (error: Error): ToastConfiguration => {

		if (error instanceof HttpErrorResponse)
			switch (error.status) {

				case 0: return {

					...errorNotification,
					summary: 'Communication Error',
					detail: `Backend is unreachable`

				};

				case 500: return {

					...errorNotification,
					summary: 'System Failure',
					detail: `Server-side error`

				};

				case 401: return {

					...errorNotification,
					summary: 'Authorization Error',
					detail: `${error.error.message}`

				};

				case 400: return {

					...errorNotification,
					summary: `${(error.error[0] || error.error).code}`,
					detail: `${(error.error[0] || error.error).message}`

				};

			}

		const summary = `Client Error`;
		let detail = `
			<div class="grid mt-3">
				<div class="col-3 xl:col-1">Message</div>
				<div class="col-9 xl:col-11"><i>${error?.message}</i></div>
		`;

		if (error instanceof HttpErrorResponse)
			detail += `
				<div class="col-3 xl:col-1">Status</div>
				<div class="col-9 xl:col-11"><i>${error?.statusText} (${error?.status})</i></div>
			`

		detail += `
			</div>
		`;
		return { ...errorNotification, summary, detail };

	}

}
