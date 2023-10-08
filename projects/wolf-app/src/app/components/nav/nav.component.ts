import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { navigate } from 'store/actions/core-navigation.actions';
import { switchTheme } from 'store/actions/core-ui.actions';
import { selCloudMenuBadgeNumbers } from 'store/selectors/cloud-ui.selectors';
import { buildInfo } from 'version';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent {

	private store: Store = inject(Store);

	cloudNumbers$: Observable<number[]> = this.store.select(selCloudMenuBadgeNumbers);

	builtTime = buildInfo.builtTime;
	builtVersion = buildInfo.version;
	builtNumber = buildInfo.builtNumber;

	navTo(url: string): void {

		this.store.dispatch(navigate({ url }));

	}

	onSwitchTheme(): void {

		this.store.dispatch(switchTheme());

	}

}

// this.navMenuItems$ = this.store.select(menuBookmarkBadge).pipe(

// 	map(bookmarkNumbers => {

// 		const menuItems: MenuItem[] = [
// 			navItems.miHome,
// 			navItems.miBookmarks(formatBadge_Bookmark(bookmarkNumbers)),
// 			navItems.miKnowledgeBase
// 		];
// 		if (this.bigScreen)
// 			return menuItems;

// 		return menuItems.map(
// 			item => ({
// 				...item,
// 				command: () => this.store.dispatch(setSidebarVisible({ visible: false }))
// 			})
// 		);

// 	})

// );
