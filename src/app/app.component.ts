import { Component, HostBinding, WritableSignal, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { delay, of } from 'rxjs';
import { selCoreIsSidebarVisible } from 'store/selectors/core-ui.selectors';
import { splashTrigger } from './components/splash-screen/splash-screen.animation';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [splashTrigger]
})
export class AppComponent {

	splashVisible: WritableSignal<boolean> = signal(true);

	private store: Store = inject(Store);

	@HostBinding('class.navVisible')
	navVisible = true;

	constructor() {

		this.store
			.select(selCoreIsSidebarVisible)
			.pipe(takeUntilDestroyed())
			.subscribe(visible => this.navVisible = visible);

		// to tweak splashscreen animation & duration:
		// delay(), splashscreen-component.scss and splash-screen.animation.ts
		of(false)
			.pipe(delay(1400)) // splash screen visible for n ms
			.subscribe(() => this.splashVisible.set(false));

	}

}
