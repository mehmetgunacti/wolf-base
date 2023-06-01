import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-theme-switcher',
	templateUrl: './theme-switcher.component.html'
})
export class ThemeSwitcherComponent {

	@Input() isDark: boolean | null | undefined;

	@Output() switchTheme = new EventEmitter<void>();

	changeTheme(): void {

		this.switchTheme.emit();

	}

}
