import { coreActions } from '@actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { errorNotification, ToastConfiguration } from '@libComponents';
import { Store } from '@ngrx/store';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

	constructor(private injector: Injector) { }

	handleError(error: Error) {

		console.error(error);
		const store = this.injector.get(Store);
		store.dispatch(coreActions.showNotification(this.getToastConfiguration(error)));

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

				case 400: return {

					...errorNotification,
					summary: `${(error.error?.[ 0 ] || error.error)?.code}`,
					detail: `${(error.error?.[ 0 ] || error.error)?.message}`

				};

				case 401: return {

					...errorNotification,
					summary: 'Authorization Error',
					detail: `${error.error?.message}`

				};

				case 404: return {

					...errorNotification,
					summary: 'Not Found',
					detail: `${error.status}`,
					sticky: false

				};

			}

		let message = (error?.message ?? '&laquo;no further detail&raquo;');
		if (message.length > 150)
			message = message.substring(0, 200) + '...';
		const summary = `Client Error`;
		let detail = `
			<div>
				<div><i>${message}</i></div>
		`;

		if (error instanceof HttpErrorResponse)
			detail += `
				<div>Status</div>
				<div><i>${error?.statusText} (${error?.status})</i></div>
			`;

		detail += `
			</div>
		`;
		return { ...errorNotification, summary, detail };

	};

}
