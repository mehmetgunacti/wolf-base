import { THEME_LIGHT, ThemeInfo } from 'lib';

interface ThemeUI {

	info: ThemeInfo;
	scriptElement?: any

}

export interface UIState {

	theme: ThemeUI,
	sidebarVisible: boolean,
	bigScreen: boolean

}

export const initialUIState: UIState = {

	theme: {
		info: THEME_LIGHT // localStorage.getItem('theme') === THEME_LIGHT.name ? THEME_LIGHT : THEME_DARK
	},
	sidebarVisible: true,
	bigScreen: true

};
