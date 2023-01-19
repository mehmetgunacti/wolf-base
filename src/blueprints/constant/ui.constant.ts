const ARYA_BLUE = 'arya-blue'; // dark
const SAGA_BLUE = 'saga-blue'; // light
export const DARK_THEME = 'dark-theme';

export type LANG = 'en' | 'tr';

export interface ThemeInfo {

	name: string;
	primeNg: string;
	isDark: boolean;

}

export const THEME_DARK: ThemeInfo = {

	name: 'theme-dark',
	primeNg: ARYA_BLUE,
	isDark: true

};

export const THEME_LIGHT: ThemeInfo = {

	name: 'theme-light',
	primeNg: SAGA_BLUE,
	isDark: false

};
