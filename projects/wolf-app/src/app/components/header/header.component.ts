import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { toggleSidebar } from 'store/actions/core-ui.actions';
import { selCloudNumberOfAvailableTasks } from 'store/selectors/cloud.selectors';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	private store: Store = inject(Store);

	cloudNumbers$: Observable<number> = this.store.select(selCloudNumberOfAvailableTasks);

	toggleNav(): void {

		this.store.dispatch(toggleSidebar());

	}

}
