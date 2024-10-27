import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { coreActions } from 'store/actions';

@Component({
	selector: 'app-nav-overlay',
	standalone: true,
	template: '',
	host: {
		'(click)': 'onClick()',
		'class': 'fixed block top-0 right-0 h-100dvh left-0 backdrop-blur bg-overlay z-nav-overlay transition-all duration-500'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavOverlayComponent {

	private store: Store = inject(Store);

	onClick(): void {

		this.store.dispatch(coreActions.hideSidebar());

	}

}
