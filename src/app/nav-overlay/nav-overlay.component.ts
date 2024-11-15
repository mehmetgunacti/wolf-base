import { coreActions } from '@actions/core.actions';
import { Component, inject } from '@angular/core';
import { BaseComponent } from '@libComponents/base.component';
import { Store } from '@ngrx/store';

@Component({
	standalone: true,
	selector: 'app-nav-overlay',
	template: '',
	host: {
		'(click)': 'onClick()',
		'class': 'fixed block top-0 right-0 h-100dvh left-0 backdrop-blur bg-overlay z-nav-overlay transition-all duration-500'
	}
})
export class NavOverlayComponent extends BaseComponent {

	private store: Store = inject(Store);

	onClick(): void {

		this.store.dispatch(coreActions.hideSidebar());

	}

}
