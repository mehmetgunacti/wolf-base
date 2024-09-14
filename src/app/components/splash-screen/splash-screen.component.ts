import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-splash-screen',
	template: `
		<img src="assets/logo.svg" alt="WolfBase loading...">
	`,
	styleUrls: ['./splash-screen.component.scss'],
	host: { 'class': 'd-flex-center pos-absolute inset-0' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplashScreenComponent { }
