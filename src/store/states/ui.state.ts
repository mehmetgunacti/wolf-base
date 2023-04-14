import { LANG, ThemeInfo, THEME_DARK, THEME_LIGHT } from 'lib';

interface ThemeUI {

	info: ThemeInfo;
	scriptElement?: any

}

export interface UIState {

	theme: ThemeUI,
	lang: LANG,
	translations: any,
	sidebarVisible: boolean,
	bigScreen: boolean

}

export const initialUIState: UIState = {

	theme: {
		info: THEME_LIGHT // localStorage.getItem('theme') === THEME_LIGHT.name ? THEME_LIGHT : THEME_DARK
	},
	lang: 'en',
	translations: {},
	sidebarVisible: true,
	bigScreen: true

};
