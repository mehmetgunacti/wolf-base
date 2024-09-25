import { Component, inject } from '@angular/core';
import { CloudTask, SidebarAnimation } from '@lib';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, take } from 'rxjs';
import { setSidebarAnimation } from 'store/actions/core-ui.actions';
import { selCloudAvailableTasks } from 'store/selectors/cloud/cloud.selectors';
import { selCore_isBigScreen, selCore_sidebarAnimation } from 'store/selectors/core/core-ui.selectors';

function nextAnimation(current: SidebarAnimation, isBigScreen: boolean): SidebarAnimation {

	switch (current) {

		case SidebarAnimation.TO_HIDDEN: return SidebarAnimation.TO_HALF;
		case SidebarAnimation.TO_HALF: return SidebarAnimation.TO_FULL;
		case SidebarAnimation.TO_FULL: return SidebarAnimation.TO_HIDDEN

	}

}

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
			this.store.select(selCore_sidebarAnimation),
			this.store.select(selCore_isBigScreen)
		])
			.pipe(
				take(1)
			).subscribe(

				([animation, isBigScreen]) =>
					this.store.dispatch(
						setSidebarAnimation({ animation: nextAnimation(animation, isBigScreen) })
					)

			);

	}

}
