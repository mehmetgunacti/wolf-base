import { LANG, ThemeInfo, THEME_DARK, THEME_LIGHT } from 'blueprints';

interface ThemeUI {

	info: ThemeInfo;
	scriptElement?: any

}

export interface UIState {

	theme: ThemeUI,
	lang: LANG,
	translations: any

}

export const initialUIState: UIState = {

	theme: {
		info: localStorage.getItem('theme') === THEME_LIGHT.name ? THEME_LIGHT : THEME_DARK
	},
	lang: 'en',
	translations: {}

};
