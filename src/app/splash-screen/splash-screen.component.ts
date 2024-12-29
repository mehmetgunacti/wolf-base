import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	selector: 'app-splash-screen',
	template: `
		<img src="logo.svg" alt="WolfBase loading..." class="w-[50vw] max-w-[500px]">
	`,
	host: {
		'class': 'flex items-center justify-center absolute inset-0 z-splash-screen bg-component-dark'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplashScreenComponent extends BaseComponent { }
