import { createAction, props } from '@ngrx/store';
import { ToastConfiguration } from 'lib';

export const showNotification = createAction(
	'[Notification] Show Notification',
	props<ToastConfiguration>()
);
