import { DEFAULT_CONF_VALUES, Theme } from 'lib/constants';

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
