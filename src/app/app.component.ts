import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { opacityTrigger, SidebarState } from '@lib';
import { Store } from '@ngrx/store';
import { environment } from 'environments/environment';
import { sidebarTrigger } from 'lib/animations/sidebar.animation';
import { delay, of } from 'rxjs';
import { selCore_sidebarState } from 'store/selectors/core/core-ui.selectors';
import { splashTrigger } from './components/splash-screen/splash-screen.animation';

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
	sidebarBigFull = computed(() => this.sidebarState() === SidebarState.BIG_FULL);
	sidebarBigHalf = computed(() => this.sidebarState() === SidebarState.BIG_HALF);

	private meta = inject(Meta);

	constructor() {

		// to tweak splashscreen animation & duration:
		// delay(), splashscreen-component.scss and splash-screen.animation.ts
		of(false)
			.pipe(delay(environment.splash)) // splash screen visible for n ms
			.subscribe(() => this.splashVisible.set(false));

	}

}
