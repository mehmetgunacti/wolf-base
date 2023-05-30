import { Component, EventEmitter, Input, Output } from '@angular/core';
import { THEME } from 'lib/constants';

@Component({
	selector: 'app-theme-switcher',
	templateUrl: './theme-switcher.component.html'
})
export class ThemeSwitcherComponent {

	@Input() theme: THEME | null | undefined;

	@Output() themeChange = new EventEmitter<THEME>();

	setTheme(): void {

		if (this.theme === 'dark')
			this.themeChange.emit('light');
		else
			this.themeChange.emit('dark');

	}

}
