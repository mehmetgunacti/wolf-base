import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CloudTask, MenuItem, TAG_PINNED, TAG_POPULAR, Theme, getNextTheme } from '@lib';
import { Store } from '@ngrx/store';
import { GlyphComponent } from 'lib/components/glyph/glyph.component';
import { Observable, map, take } from 'rxjs';
import { coreActions } from 'store/actions';
import { selBookmarkMenuBadge } from 'store/selectors/bookmark/bookmark-ui.selectors';
import { selCloudAvailableTasks } from 'store/selectors/cloud/cloud.selectors';
import { selCore_theme } from 'store/selectors/core/core-ui.selectors';

@Component({
	selector: 'app-nav',
	standalone: true,
	imports: [CommonModule, RouterModule, GlyphComponent],
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
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
					},
					{
						url: ['/projects'],
						label: 'Projects',
						icon: 'task_alt',
						routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
					},
					{
						url: ['/words'],
						label: 'Words',
						icon: 'dictionary',
						routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
					},
					{
						url: ['/learning'],
						label: 'Learning',
						icon: 'school',
						routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
					},

				];
				return items;

			})

		);

	}

	onRouterLinkActive(isActive: boolean, linkElement: HTMLAnchorElement) {

		linkElement.setAttribute('tabindex', isActive ? '-1' : '0');

	}

	onSwitchTheme(): void {

		this.store.select(selCore_theme)
			.pipe(
				take(1)
			).subscribe(
				(theme: Theme) => this.store.dispatch(coreActions.setTheme({ theme: getNextTheme(theme) }))
			);

	}

}
