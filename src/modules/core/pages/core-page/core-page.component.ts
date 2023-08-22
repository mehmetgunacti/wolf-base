import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription, combineLatest, map, of } from 'rxjs';
import { setSidebarVisible, switchTheme } from 'store/actions/core-ui.actions';
import { menuBookmarkBadge } from 'store/selectors/bookmark-ui.selectors';
import { isSidebarVisible, isThemeDark } from 'store/selectors/core-configuration.selectors';
import { isBigScreen } from 'store/selectors/core-ui.selectors';
import { menuSyncBadge } from 'store/selectors/sync-ui.selectors';
import { buildInfo } from 'version';
import * as navItems from '../../navigation-menu-items';

const formatBadge_Stats = (numbers: number[]): string => {

	const [total, errors] = numbers;
	if (total === 0)
		return '';

	if (errors > 0)
		return `${errors}/${total}`;

	return `${total}`;

}

const formatBadge_Bookmark = ([total, filtered]: [number, number]) => filtered < total ? `${filtered}/${total}` : `${total}`;

@Component({
	selector: 'app-core-page',
	templateUrl: './core-page.component.html'
})
export class CorePageComponent implements OnDestroy {

	navMenuItems$: Observable<MenuItem[]>;
	isThemeDark$: Observable<boolean>;
	syncableItemsCount$: Observable<number>;

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

			this.store.select(isBigScreen).subscribe(
				result => this.bigScreen = result
			)

		);

		this.subscriptions.add(

			store.select(isSidebarVisible).subscribe(
				visible => this.navCollapsed = !visible
			)

		);

		this.syncableItemsCount$ = of(5);

		this.navMenuItems$ = combineLatest([
			this.store.select(menuBookmarkBadge),
			this.store.select(menuSyncBadge),
		]).pipe(

			map(([bookmarkNumbers, syncNumbers]) => {

				const menuItems: MenuItem[] = [
					navItems.miHome,
					navItems.miBookmarks(formatBadge_Bookmark(bookmarkNumbers)),
					navItems.miDatabase,
					navItems.miStats(formatBadge_Stats(syncNumbers)),
					navItems.miSync(formatBadge_Stats(syncNumbers)),
					navItems.miSettings
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
		this.isThemeDark$ = store.select(isThemeDark);

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
