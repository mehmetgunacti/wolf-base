import { Component, HostListener, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { hideSidebar } from 'store/actions/core-ui.actions';

@Component({
	selector: 'app-nav-overlay',
	template: '',
	styleUrls: ['./nav-overlay.component.scss']
})
export class NavOverlayComponent {

	private store: Store = inject(Store);

	@HostListener('click')
	onClick(): void {

		this.store.dispatch(hideSidebar());

	}

}
