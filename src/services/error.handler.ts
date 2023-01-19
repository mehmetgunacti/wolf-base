import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import { errorDevNotification, errorNotification, ToastConfiguration } from 'blueprints';
import { navigate, showNotification } from 'store';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

	constructor(private injector: Injector) { }

	handleError(error: Error) {

		console.error(error);
		const store = this.injector.get(Store);
		store.dispatch(showNotification(this.getToastConfiguration(error)));
		if (error instanceof HttpErrorResponse) {

			if (error.error.code === 'LockedException')
				store.dispatch(navigate({ url: '/change-password', skipLocationChange: true }));

			if (error.error.code === 'InvalidJWTTokenException') {

				localStorage.removeItem('token');
				store.dispatch(navigate({ url: '/login' }));

			}

		}

	}

	private getToastConfiguration = (error: Error): ToastConfiguration => {

		if (error instanceof HttpErrorResponse)
			switch (error.status) {

				case 0: return {

					...errorNotification,
					title: 'Communication Error',
					message: `Backend is unreachable`

				};

				case 500: return {

					...errorNotification,
					title: 'System Failure',
					message: `Server-side error`

				};

				case 401: return {

					...errorNotification,
					title: 'Authorization Error',
					message: `${error.error.message}`

				};

				case 400: return {

					...errorNotification,
					title: `${(error.error[0] || error.error).code}`,
					message: `${(error.error[0] || error.error).message}`

				};

			}

		const title = `Client Error`;
		let message = `
			<div class="grid mt-3">
				<div class="col-3 xl:col-1">Message</div>
				<div class="col-9 xl:col-11"><i>${error?.message}</i></div>
		`;

		if (error instanceof HttpErrorResponse)
			message += `
				<div class="col-3 xl:col-1">Status</div>
				<div class="col-9 xl:col-11"><i>${error?.statusText} (${error?.status})</i></div>
			`

		message += `
			</div>
		`;
		return { ...errorDevNotification, title, message };

	}

}
