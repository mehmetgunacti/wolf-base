import { Component, HostBinding, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { hideSidebar } from 'store/actions/core-ui.actions';
import { selCoreIsSidebarVisible } from 'store/selectors/core-ui.selectors';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	private store: Store = inject(Store);

	@HostBinding('class.navVisible')
	navVisible = true;

	constructor() {

		this.store.select(selCoreIsSidebarVisible).pipe(takeUntilDestroyed()).subscribe(visible => this.navVisible = visible);

	}

	hideSidebar(): void {

		this.store.dispatch(hideSidebar());

	}

}
