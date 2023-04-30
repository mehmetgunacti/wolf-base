export type LANG = 'en' | 'tr';
export type THEME = 'dark' | 'light';

const PRIMENG_THEME_DARK = 'mdc-dark-indigo'; // dark
const PRIMENG_THEME_LIGHT = 'mdc-light-indigo'; // light
export const DARK_THEME = 'dark'; // see '_extensions.scss' -> class '.logo'

export interface ThemeInfo {

	name: 'light' | 'dark';
	primeNg: string;
	isDark: boolean;

}

export const THEME_DARK: ThemeInfo = {

	name: 'dark',
	primeNg: PRIMENG_THEME_DARK,
	isDark: true

};

export const THEME_LIGHT: ThemeInfo = {

	name: 'light',
	primeNg: PRIMENG_THEME_LIGHT,
	isDark: false

};

export const DEFAULT_THEME: ThemeInfo = THEME_LIGHT;
