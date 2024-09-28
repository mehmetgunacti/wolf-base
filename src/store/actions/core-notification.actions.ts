import { ToastConfiguration } from '@lib';
import { createActionGroup, props } from '@ngrx/store';

export const coreNotificationActions = createActionGroup({

	source: 'Core Notification',
	events: {

		'Show Notification' : props<ToastConfiguration>()

	}

});
