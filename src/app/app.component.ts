import { Component, WritableSignal, signal } from '@angular/core';
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

	constructor() {

		// to tweak splashscreen animation & duration:
		// delay(), splashscreen-component.scss and splash-screen.animation.ts
		of(false)
			.pipe(delay(environment.splash)) // splash screen visible for n ms
			.subscribe(() => this.splashVisible.set(false));

	}

}
