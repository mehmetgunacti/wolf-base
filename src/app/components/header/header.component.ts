import { Component, inject, Signal } from '@angular/core';
import { CloudTask } from '@lib';
import { Store } from '@ngrx/store';
import { coreUIActions } from 'store/actions';
import { selCloudAvailableTasks } from 'store/selectors/cloud/cloud.selectors';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	private store: Store = inject(Store);

	cloudTasks: Signal<CloudTask[]> = this.store.selectSignal(selCloudAvailableTasks);

	toggleNav(): void {

		this.store.dispatch(coreUIActions.setNextSidebarState());

	}

}
