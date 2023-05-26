import { DARK_THEME, ThemeInfo, THEME_DARK, THEME_LIGHT } from 'lib';
import { UIState } from 'store/core';

export function resolveTheme(name: string): ThemeInfo {

	if (THEME_LIGHT.name === name)
		return THEME_LIGHT;

	return THEME_DARK;

}

export class ThemeHandler {

	private oldTheme: ThemeInfo;

	constructor(
		private state: UIState,
		private draft: UIState
	) {

		this.oldTheme = state.theme.info;

	}

	public setNewTheme(newTheme: ThemeInfo): void {

		// handle <link> tag in <head>
		this.handleHeadLinkTag(newTheme.primeNg);

		// add/remove 'dark-theme' class to <body class=""> attribute
		this.handleBodyClass(newTheme.isDark);

		// save the new theme name to localstorage
		localStorage.setItem('theme', newTheme.name);

		// save the new theme name to store
		this.draft.theme.info = newTheme;

	}

	private handleHeadLinkTag(primeNg: string): void {

		// remove <link> tag (if available)
		const scriptElement: HTMLLinkElement = this.state.theme.scriptElement;
		if (!!scriptElement)
			document.head.removeChild(scriptElement);

		// create new <link> element
		const newElement = document.createElement('link');
		newElement.rel = 'stylesheet';
		newElement.type = 'text/css';
		newElement.href = `/assets/themes/${primeNg}/theme.css`;

		// append new <link> element to <head>
		document.head.appendChild(newElement);

		// save newly created <link> element (HTMLLinkElement)
		this.draft.theme.scriptElement = newElement;

	}

	private handleBodyClass(isDark: boolean): void {

		if (this.oldTheme.isDark) { // current: <body class="dark-theme">

			if (isDark) {

				// do nothing

			} else
				// remove 'dark-theme' class from <body> element's class attribute
				// light themes don't have a css class as a marker (like 'dark-theme')
				document.body.classList.remove(DARK_THEME);

		} else
			document.body.classList.add(DARK_THEME);

	}


}