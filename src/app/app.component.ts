import { Component, computed, inject, signal } from '@angular/core';
import { SidebarState } from '@constants';
import { Store } from '@ngrx/store';
import { selCore_sidebarState } from '@selectors';
import { delay, of } from 'rxjs';
import { environment } from '../environments/environment';
import { appImports } from './app.config';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: appImports,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {

	splashVisible = signal(true);
	sidebarState = inject(Store).selectSignal(selCore_sidebarState);
	sidebarOpen = computed(() => this.sidebarState() === SidebarState.FULL);
	sidebarBigFull = computed(() => this.sidebarState() === SidebarState.BIG_FULL);
	sidebarBigHalf = computed(() => this.sidebarState() === SidebarState.BIG_HALF);

	constructor() {

		// to tweak splashscreen animation & duration:
		// delay(), splashscreen-component.scss and splash-screen.animation.ts
		of(false)
			.pipe(delay(environment.splash)) // splash screen visible for n ms
			.subscribe(() => this.splashVisible.set(false));

	}

}
