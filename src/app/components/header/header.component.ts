import { Component, inject } from '@angular/core';
import { CloudTask, getNextSidebarState } from '@lib';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, take } from 'rxjs';
import { setSidebarState } from 'store/actions/core-ui.actions';
import { selCloudAvailableTasks } from 'store/selectors/cloud/cloud.selectors';
import { selCore_isBigScreen, selCore_sidebarState } from 'store/selectors/core/core-ui.selectors';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	private store: Store = inject(Store);

	cloudTasks$: Observable<CloudTask[]> = this.store.select(selCloudAvailableTasks);

	toggleNav(): void {

		combineLatest([
			this.store.select(selCore_sidebarState),
			this.store.select(selCore_isBigScreen)
		])
			.pipe(
				take(1)
			).subscribe(

				([state, isBigScreen]) =>
					this.store.dispatch(
						setSidebarState({ sidebarState: getNextSidebarState(state, isBigScreen) })
					)

			);

	}

}
