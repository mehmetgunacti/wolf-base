import { Component, EventEmitter, Input, Output } from '@angular/core';
import { THEME_DARK, THEME_LIGHT, ThemeInfo } from 'blueprints/constant';

@Component({
	selector: 'app-theme-switcher',
	templateUrl: './theme-switcher.component.html'
})
export class ThemeSwitcherComponent {

	@Input() theme: ThemeInfo | null | undefined;

	@Output() newTheme = new EventEmitter<ThemeInfo>();


	setDarkTheme(): void {

		this.newTheme.emit(THEME_DARK);

	}

	setLightTheme(): void {

		this.newTheme.emit(THEME_LIGHT);

	}

}
