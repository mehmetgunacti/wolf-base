import { Component, WritableSignal, computed, inject, signal } from '@angular/core';
import { environment } from 'environments/environment';
import { delay, of } from 'rxjs';
import { splashTrigger } from './components/splash-screen/splash-screen.animation';
import { sidebarTrigger } from 'lib/animations/sidebar.animation';
import { Store } from '@ngrx/store';
import { selCore_sidebarState } from 'store/selectors/core/core-ui.selectors';
import { fadeInFadeOutTrigger, opacityTrigger, SidebarState } from '@lib';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [splashTrigger, sidebarTrigger, opacityTrigger]
})
export class AppComponent {

	splashVisible: WritableSignal<boolean> = signal(true);
	sidebarState = inject(Store).selectSignal(selCore_sidebarState);
	sidebarOpen = computed(() => this.sidebarState() === SidebarState.FULL);

	constructor() {

		// to tweak splashscreen animation & duration:
		// delay(), splashscreen-component.scss and splash-screen.animation.ts
		of(false)
			.pipe(delay(environment.splash)) // splash screen visible for n ms
			.subscribe(() => this.splashVisible.set(false));

	}

}
