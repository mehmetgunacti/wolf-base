import { Component, inject } from '@angular/core';
import { SidebarState } from '@lib';
import { Store } from '@ngrx/store';
import { setSidebarState } from 'store/actions/core-ui.actions';
import { selCore_isBigScreen } from 'store/selectors/core/core-ui.selectors';

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
		this.store.dispatch(setSidebarState({ sidebarState: SidebarState.HIDDEN }));

	}

}
