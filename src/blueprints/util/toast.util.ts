export interface ToastConfiguration {

	title?: string,
	message?: string,
	disableTimeOut?: boolean,
	positionClass?: 'toast-top-right' | 'toast-top-full-width',
	enableHtml?: boolean,
	closeButton?: boolean,
	tapToDismiss?: boolean,
	toastType?: 'toast-error' | 'toast-success'

}

export const successNotification: ToastConfiguration = {

	disableTimeOut: false,
	positionClass: 'toast-top-right',
	enableHtml: true,
	closeButton: false,
	tapToDismiss: true,
	toastType: 'toast-success'

}

export const errorNotification: ToastConfiguration = {

	disableTimeOut: true,
	positionClass: 'toast-top-right',
	enableHtml: true,
	closeButton: false,
	tapToDismiss: true,
	toastType: 'toast-error'

}

export const errorDevNotification: ToastConfiguration = {

	disableTimeOut: true,
	positionClass: 'toast-top-full-width',
	enableHtml: true,
	closeButton: true,
	tapToDismiss: false,
	toastType: 'toast-error'

}
