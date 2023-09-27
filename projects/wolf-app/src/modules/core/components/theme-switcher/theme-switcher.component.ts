import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WolfIcons } from '@lib';

@Component({
	selector: 'app-theme-switcher',
	templateUrl: './theme-switcher.component.html'
})
export class ThemeSwitcherComponent {

	WolfIcons = WolfIcons;

	@Input() isDark: boolean | null | undefined;

	@Output() switchTheme = new EventEmitter<void>();

	changeTheme(): void {

		this.switchTheme.emit();

	}

}
