import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TAG_PINNED, TAG_POPULAR } from '@constants';
import { CloudTask, MenuItem } from '@models';
import { Store } from '@ngrx/store';
import { selBookmarkMenuBadge, selCloudAvailableTasks } from '@selectors';
import { GlyphDirective } from 'lib/components/glyph/glyph.directive';
import { map, Observable, of } from 'rxjs';

@Component({
	selector: 'app-nav',
	standalone: true,
	imports: [ RouterLink, RouterLinkActive, GlyphDirective, AsyncPipe ],
	templateUrl: './nav.component.html',
	styleUrl: './nav.component.scss'
})
export class NavComponent {

	private store: Store = inject(Store);

	cloudTasks$: Observable<CloudTask[]> = this.store.select(selCloudAvailableTasks);
	menuItems$: Observable<MenuItem[]>;
	bottomMenuItems$: Observable<MenuItem[]>;

	constructor() {

		this.menuItems$ = this.store.select(selBookmarkMenuBadge).pipe(

			map(([ total, filtered ]) => {

				const items: MenuItem[] = [
					{
						url: [ '/' ],
						label: 'Home',
						icon: 'home',
						routerLinkActiveOptions: { exact: true }
					},
					{
						url: [ '/bookmarks' ],
						queryParams: { tags: TAG_POPULAR },
						label: 'Bookmarks',
						icon: 'bookmarks',
						badge: filtered === 0 ? `${total}` : filtered < total ? `${filtered} / ${total}` : `${total}`,
						routerLinkActiveOptions: { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
					},
					{
						url: [ '/notes' ],
						queryParams: { tags: TAG_PINNED },
						label: 'Notes',
						icon: 'note_stack',
						routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
					},
					{
						url: [ '/projects' ],
						label: 'Projects',
						icon: 'task_alt',
						routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
					},
					{
						url: [ '/words' ],
						label: 'Words',
						icon: 'dictionary',
						routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
					},
					{
						url: [ '/learning' ],
						label: 'Learning',
						icon: 'school',
						routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
					},

				];
				return items;

			})

		);

		this.bottomMenuItems$ = of([

			{
				url: [ '/settings' ],
				queryParams: { tags: TAG_POPULAR },
				label: 'Settings',
				icon: 'settings',
				routerLinkActiveOptions: { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
			},
			{
				url: [ '/database' ],
				queryParams: { tags: TAG_POPULAR },
				label: 'Database',
				icon: 'database',
				routerLinkActiveOptions: { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
			},
			{
				url: [ '/logs' ],
				queryParams: { tags: TAG_POPULAR },
				label: 'View Logs',
				icon: 'history',
				routerLinkActiveOptions: { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
			},

		]);

	}

	onRouterLinkActive(isActive: boolean, linkElement: HTMLAnchorElement) {

		linkElement.setAttribute('tabindex', isActive ? '-1' : '0');

	}

}
