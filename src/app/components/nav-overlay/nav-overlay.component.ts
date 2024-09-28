import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { coreUIActions } from 'store/actions';

@Component({
	selector: 'app-nav-overlay',
	template: '',
	host: {
		'(click)': 'onClick()'
	},
	styleUrls: ['./nav-overlay.component.scss']
})
export class NavOverlayComponent {

	private store: Store = inject(Store);

	onClick(): void {

		this.store.dispatch(coreUIActions.hideSidebar());

	}

}
