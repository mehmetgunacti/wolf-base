import { Component, inject } from '@angular/core';
import { CloudTask } from '@lib';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { toggleSidebar } from 'store/actions/core-ui.actions';
import { selCloudAvailableTasks } from 'store/selectors/cloud.selectors';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	private store: Store = inject(Store);

	cloudTasks$: Observable<CloudTask[]> = this.store.select(selCloudAvailableTasks);

	toggleNav(): void {

		this.store.dispatch(toggleSidebar());

	}

}
