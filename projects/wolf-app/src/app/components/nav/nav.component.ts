import { Component, inject } from '@angular/core';
import { MenuItem, TAG_PINNED, TAG_POPULAR } from '@lib';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { switchTheme } from 'store/actions/core-ui.actions';
import { selBookmarkMenuBadge } from 'store/selectors/bookmark-selectors/bookmark-ui.selectors';
import { selCloudNumberOfAvailableTasks } from 'store/selectors/cloud.selectors';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent {

	private store: Store = inject(Store);

	cloudNumbers$: Observable<number> = this.store.select(selCloudNumberOfAvailableTasks);
	menuItems$: Observable<MenuItem[]>;

	constructor() {

		this.menuItems$ = this.store.select(selBookmarkMenuBadge).pipe(

			map(([total, filtered]) => {

				const items: MenuItem[] = [
					{
						url: ['/'],
						label: 'Home',
						icon: 'home'
					},
					{
						url: ['/bookmarks'],
						queryParams: { tags: TAG_POPULAR },
						label: 'Bookmarks',
						icon: 'bookmarks',
						badge: filtered === 0 ? `${total}` : filtered < total ? `${filtered} / ${total}` : `${total}`
					},
					{
						url: ['/notes'],
						queryParams: { tags: TAG_PINNED },
						label: 'Notes',
						icon: 'note_stack'
					}

				];
				return items;

			})

		);

	}

	onSwitchTheme(): void {

		this.store.dispatch(switchTheme());

	}

}
