import { DOCUMENT } from '@angular/common';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import { environment } from 'environments/environment';
import { delay, of } from 'rxjs';
import { splashTrigger } from './components/splash-screen/splash-screen.animation';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [splashTrigger]
})
export class AppComponent {

	splashVisible: WritableSignal<boolean> = signal(true);

	// private store: Store = inject(Store);
	private document: Document = inject(DOCUMENT);

	constructor() {

		// to tweak splashscreen animation & duration:
		// delay(), splashscreen-component.scss and splash-screen.animation.ts
		of(false)
			.pipe(delay(environment.splash)) // splash screen visible for n ms
			.subscribe(() => this.splashVisible.set(false));

		// on Windows add 'platform-windows' class to <body>
		const isMSWindows = (this.document.defaultView?.navigator as any)?.userAgentData?.platform === 'Windows';
		if (isMSWindows)
			this.document.body.classList.add('platform-windows');

	}

}
