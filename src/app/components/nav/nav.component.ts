import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CloudTask, MenuItem, TAG_PINNED, TAG_POPULAR, Theme, getNextTheme } from '@lib';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { setTheme } from 'store/actions/core-ui.actions';
import { selBookmarkMenuBadge } from 'store/selectors/bookmark-selectors/bookmark-ui.selectors';
import { selCloudAvailableTasks } from 'store/selectors/cloud.selectors';
import { selCore_theme } from 'store/selectors/core-ui.selectors';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
	// encapsulation: ViewEncapsulation.None
})
export class NavComponent {

	private store: Store = inject(Store);

	cloudTasks$: Observable<CloudTask[]> = this.store.select(selCloudAvailableTasks);
	menuItems$: Observable<MenuItem[]>;

	constructor() {

		this.menuItems$ = this.store.select(selBookmarkMenuBadge).pipe(

			map(([total, filtered]) => {

				const items: MenuItem[] = [
					{
						url: ['/'],
						label: 'Home',
						icon: 'home',
						routerLinkActiveOptions: { exact: true }
					},
					{
						url: ['/bookmarks'],
						queryParams: { tags: TAG_POPULAR },
						label: 'Bookmarks',
						icon: 'bookmarks',
						badge: filtered === 0 ? `${total}` : filtered < total ? `${filtered} / ${total}` : `${total}`,
						routerLinkActiveOptions: { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
					},
					{
						url: ['/notes'],
						queryParams: { tags: TAG_PINNED },
						label: 'Notes',
						icon: 'note_stack',
						routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
					}

				];
				return items;

			})

		);

	}

	onSwitchTheme(): void {

		this.store.select(selCore_theme)
			.pipe(
				take(1)
			).subscribe(
				(theme: Theme) => this.store.dispatch(setTheme({ theme: getNextTheme(theme) }))
			);

	}

}
