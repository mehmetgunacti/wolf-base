import { Component, inject } from '@angular/core';
import { SidebarAnimation } from '@lib';
import { Store } from '@ngrx/store';
import { setSidebarAnimation } from 'store/actions/core-ui.actions';

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

		console.log('overlay click');
		this.store.dispatch(setSidebarAnimation({ animation: SidebarAnimation.TO_HIDDEN }));

	}

}
