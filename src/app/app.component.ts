import { coreActions } from '@actions/core.actions';
import { Component, computed, inject, signal } from '@angular/core';
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
	animations: [ sidebarTrigger, mainTrigger ],
})
export class AppComponent extends BaseComponent {

	private store = inject(Store);

	protected splashVisible = signal(true);
	protected sidebarState = inject(Store).selectSignal(selCore_sidebarState);
	protected sidebarOpen = computed(() => this.sidebarState() === SidebarState.FULL);
	protected progressVisible = this.store.selectSignal(selCore_progressVisible);

	constructor() {

		super();
		// to tweak splashscreen animation & duration:
		// delay(), splashscreen-component.scss and splash-screen.animation.ts
		of(false)
			.pipe(delay(environment.splash)) // splash screen visible for n ms
			.subscribe(() => this.splashVisible.set(false));

	}

	onCloseNavOverlay(): void {

		this.store.dispatch(coreActions.hideSidebar());

	}

}
