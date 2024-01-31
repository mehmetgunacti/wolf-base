import { DEFAULT_CONF_VALUES, SidebarState, Theme } from 'lib/constants';

export function getNextTheme(currentTheme: Theme): Theme {

	// get Theme values as array
	const themes: Theme[] = Object.values(Theme);

	// search for incoming value
	const currentIndex: number = themes.indexOf(currentTheme);

	// if not found return the default value
	if (currentIndex === -1)
		return DEFAULT_CONF_VALUES.theme;

	// calculate next value (switch to first if last value)
	const nextIndex: number = (currentIndex + 1) % themes.length;

	// return new theme
	return themes[nextIndex] as Theme;

}

export function getNextSidebarState(currentState: SidebarState, isBigScreen: boolean): SidebarState {

	let order: SidebarState[];
	if (isBigScreen)
		order = [
			SidebarState.FULL,
			SidebarState.HALF,
			SidebarState.HIDDEN
		];
	else
		order = [
			SidebarState.FULL,
			SidebarState.HIDDEN
		];

	// get Theme values as array
	const states: SidebarState[] = order;

	// search for incoming value
	const currentIndex: number = states.indexOf(currentState);

	// if not found return the default value
	if (currentIndex === -1)
		return DEFAULT_CONF_VALUES.sidebarState;

	// calculate next value (switch to first if last value)
	const nextIndex: number = (currentIndex + 1) % states.length;

	// return new theme
	const nextState: SidebarState = states[nextIndex];
	return nextState;

}
