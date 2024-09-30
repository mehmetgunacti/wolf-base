export interface ToastConfiguration { // visit primeng documenation for more

	severity: 'success' | 'info' | 'warn' | 'error',
	summary?: string,
	detail?: string
	life?: number, // 3000	Number of time in milliseconds to wait before closing the message.
	sticky?: boolean, // false	Whether the message should be automatically closed based on life property or kept visible.
	closable?: boolean, // true	When enabled, displays a close icon to hide a message manually.
	glyph?: string, // google icons: material-symbols-outlined

	// non-primeng related
	id?: number

}

export const successNotification: ToastConfiguration = {

	severity: 'success'

}

export const errorNotification: ToastConfiguration = {

	severity: 'error',
	sticky: true,
	closable: true

}
