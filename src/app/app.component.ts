import { Component, computed, inject, signal } from '@angular/core';
import { opacityTrigger } from '@animations/opacity.animation';
import { mainTrigger, sidebarTrigger } from '@animations/sidebar.animation';
import { SidebarState } from '@constants/sidebar.constant';
import { BaseComponent } from '@libComponents/base.component';
import { Store } from '@ngrx/store';
import { selCore_progressVisible, selCore_sidebarState } from '@selectors/core/core-ui.selectors';
import { delay, of } from 'rxjs';
import { environment } from '../environments/environment';
import { appImports } from './app.config';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: appImports,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	animations: [ sidebarTrigger, opacityTrigger, mainTrigger ],
})
export class AppComponent extends BaseComponent {

	protected splashVisible = signal(true);
	protected sidebarState = inject(Store).selectSignal(selCore_sidebarState);
	protected sidebarOpen = computed(() => this.sidebarState() === SidebarState.FULL);
	protected progressVisible = inject(Store).selectSignal(selCore_progressVisible);

	constructor() {

		super();
		// to tweak splashscreen animation & duration:
		// delay(), splashscreen-component.scss and splash-screen.animation.ts
		of(false)
			.pipe(delay(environment.splash)) // splash screen visible for n ms
			.subscribe(() => this.splashVisible.set(false));

	}

}
