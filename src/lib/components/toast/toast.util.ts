import { GlyphName } from '@constants/glyphs.constant';

export interface ToastConfiguration {

	severity: 'success' | 'info' | 'warn' | 'error',
	summary?: string,
	detail?: string;
	life?: number, // 3000	Number of time in milliseconds to wait before closing the message.
	sticky?: boolean, // false	Whether the message should be automatically closed based on life property or kept visible.
	closable?: boolean, // true	When enabled, displays a close icon to hide a message manually.
	glyph?: GlyphName,

	id?: number;

}

export const errorNotification: ToastConfiguration = {

	severity: 'error',
	sticky: true,
	closable: true

};
