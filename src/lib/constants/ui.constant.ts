export type LANG = 'en' | 'tr';
export const DEFAULT_LANG: LANG = 'en';

const PRIMENG_THEME_DARK = 'mdc-dark-indigo'; // dark
const PRIMENG_THEME_LIGHT = 'mdc-light-indigo'; // light
export const DARK_THEME = 'theme-dark'; // see '_extensions.scss' -> class '.logo'

export interface ThemeInfo {

	name: 'theme-light' | 'theme-dark';
	primeNg: string;
	isDark: boolean;

}

export const THEME_DARK: ThemeInfo = {

	name: 'theme-dark',
	primeNg: PRIMENG_THEME_DARK,
	isDark: true

};

export const THEME_LIGHT: ThemeInfo = {

	name: 'theme-light',
	primeNg: PRIMENG_THEME_LIGHT,
	isDark: false

};

export const DEFAULT_THEME: ThemeInfo = THEME_LIGHT;