import { createAction, props } from '@ngrx/store';
import { ToastConfiguration } from 'blueprints';

export const showNotification = createAction(
	'[Notification] Show Notification',
	props<ToastConfiguration>()
);
