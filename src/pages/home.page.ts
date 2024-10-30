import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as container from '@containers';
import { PortalComponent } from '@libComponents';

@Component({
	selector: 'home-page',
	standalone: true,
	imports: [
		PortalComponent,
		container.PopularBookmarksContainerComponent,
		container.QuoteContainerComponent,
		container.PinnedNotesContainerComponent
	],
	template: `
		<w-portal>
			<div class="flex items-center">
				<img src="logo.svg" style="height: 2rem;">
			</div>
		</w-portal>
		<app-quotes-container/>
		<app-pinned-notes-container/>
		<app-popular-bookmarks-container/>
	`,
	host: { 'class': 'page' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage { }
