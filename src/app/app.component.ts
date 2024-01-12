import { Component, HostBinding, WritableSignal, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fadeOutTrigger } from '@lib';
import { Store } from '@ngrx/store';
import { delay, of } from 'rxjs';
import { selCoreIsSidebarVisible } from 'store/selectors/core-ui.selectors';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [fadeOutTrigger]
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
		// delay(), splashscreen-component.scss and fade-out.animation.ts
		// even cubic-bezier function if used (!)
		of(false)
			.pipe(delay(1400))
			.subscribe(() => this.splashVisible.set(false));

	}

}
