import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription, combineLatest, map } from 'rxjs';
import { setSidebarVisible, switchTheme } from 'store/actions/core-ui.actions';
import { menuBookmarkBadge } from 'store/selectors/bookmark-ui.selectors';
import { selCoreIsSidebarVisible, selCoreIsThemeDark } from 'store/selectors/core-configuration.selectors';
import { selCoreIsBigScreen } from 'store/selectors/core-ui.selectors';
import { selStatsMenuBadgeNumbers } from 'store/selectors/stats-ui.selectors';
import { buildInfo } from 'version';
import * as navItems from '../../navigation-menu-items';

const formatBadge_Bookmark = ([total, filtered]: [number, number]) => filtered < total ? `${filtered}/${total}` : `${total}`;

@Component({
	selector: 'app-core-page',
	templateUrl: './core-page.component.html'
})
export class CorePageComponent implements OnDestroy {

	navMenuItems$: Observable<MenuItem[]>;
	navButtonBadge$: Observable<string>;
	navButtonBadgeClass$: Observable<string>;
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

		const menuBadgeNumbers$: Observable<number[]> = this.store.select(selStatsMenuBadgeNumbers);
		this.navButtonBadge$ = menuBadgeNumbers$.pipe(map(([total]) => total > 0 ? '.' : ''));
		this.navButtonBadgeClass$ = menuBadgeNumbers$.pipe(map(([total, errors]) => 'navButtonBadge' + (errors ? ' red' : total ? ' orange' : '')));
		this.navMenuItems$ = combineLatest([
			this.store.select(menuBookmarkBadge),
			menuBadgeNumbers$,
		]).pipe(

			map(([bookmarkNumbers, statsNumbers]) => {

				const menuItems: MenuItem[] = [
					navItems.miHome,
					navItems.miBookmarks(formatBadge_Bookmark(bookmarkNumbers)),
					navItems.miStats(statsNumbers),
					navItems.miSettings,
					navItems.miDatabase,
					navItems.miLogs
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

}
