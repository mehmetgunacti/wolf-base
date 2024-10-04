import { Component, OnInit, WritableSignal, computed, inject, signal } from '@angular/core';
import { environment } from 'environments/environment';
import { delay, of } from 'rxjs';
import { splashTrigger } from './components/splash-screen/splash-screen.animation';
import { sidebarTrigger } from 'lib/animations/sidebar.animation';
import { Store } from '@ngrx/store';
import { selCore_sidebarState } from 'store/selectors/core/core-ui.selectors';
import { fadeInFadeOutTrigger, opacityTrigger, SidebarState } from '@lib';
import { Meta } from '@angular/platform-browser';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [splashTrigger, sidebarTrigger, opacityTrigger]
})
export class AppComponent implements OnInit {

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

	ngOnInit(): void {

		// disable caching in dev
		// if (!environment.production) {

		// 	this.meta.addTags([
		// 		{ httpEquiv: 'Cache-Control', content: 'no-cache, no-store, must-revalidate' },
		// 		{ httpEquiv: 'Pragma', content: 'no-cache' },
		// 		{ httpEquiv: 'Expires', content: '0' }
		// 	]);

		// }

	}

}
