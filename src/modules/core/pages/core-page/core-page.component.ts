import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Observable, Subscription, map } from 'rxjs';
import { navigate } from 'store/actions/core-navigation.actions';
import { setSidebarVisible, switchTheme } from 'store/actions/core-ui.actions';
import { menuBookmarkBadge } from 'store/selectors/bookmark-ui.selectors';
import { selCloudMenuBadgeNumbers } from 'store/selectors/cloud-ui.selectors';
import { selCoreIsSidebarVisible, selCoreIsThemeDark } from 'store/selectors/core-configuration.selectors';
import { selCoreIsBigScreen } from 'store/selectors/core-ui.selectors';
import { buildInfo } from 'version';
import * as navItems from '../../navigation-menu-items';

const formatBadge_Bookmark = ([total, filtered]: [number, number]) => filtered < total ? `${filtered}/${total}` : total > 0 ? `${total}` : '';

@Component({
	selector: 'app-core-page',
	templateUrl: './core-page.component.html'
})
export class CorePageComponent implements OnDestroy {

	PrimeIcons = PrimeIcons;

	navMenuItems$: Observable<MenuItem[]>;
	cloudNumbers$: Observable<number[]>;
	isThemeDark$: Observable<boolean>;

	subscriptions = new Subscription();

	@HostBinding('class.bigScreen')
	bigScreen = true;

	@HostBinding('class.navCollapsed')
	navCollapsed = true;

	builtTime = buildInfo.builtTime;
	builtVersion = buildInfo.version;
	builtNumber = buildInfo.builtNumber;

	constructor(
		private store: Store
	) {

		this.subscriptions.add(

			this.store.select(selCoreIsBigScreen).subscribe(
				result => this.bigScreen = result
			)

		);

		this.subscriptions.add(

			store.select(selCoreIsSidebarVisible).subscribe(
				visible => this.navCollapsed = !visible
			)

		);

		this.cloudNumbers$ = this.store.select(selCloudMenuBadgeNumbers);
		this.navMenuItems$ = this.store.select(menuBookmarkBadge).pipe(

			map(bookmarkNumbers => {

				const menuItems: MenuItem[] = [
					navItems.miHome,
					navItems.miBookmarks(formatBadge_Bookmark(bookmarkNumbers)),
					navItems.miKnowledgeBase
				];
				if (this.bigScreen)
					return menuItems;

				return menuItems.map(
					item => ({
						...item,
						command: () => this.store.dispatch(setSidebarVisible({ visible: false }))
					})
				);

			})

		);
		this.isThemeDark$ = store.select(selCoreIsThemeDark);

	}

	ngOnDestroy(): void {

		this.subscriptions.unsubscribe();

	}

	toggleNav(): void {

		// navCollapsed is always the opposite of 'visible', no negation needed
		this.store.dispatch(setSidebarVisible({ visible: this.navCollapsed }));

	}

	onSwitchTheme(): void {

		this.store.dispatch(switchTheme());

	}

	navTo(url: string): void {

		this.store.dispatch(navigate({ url }));
		if (!this.bigScreen)
			this.store.dispatch(setSidebarVisible({ visible: false }));

	}

}
