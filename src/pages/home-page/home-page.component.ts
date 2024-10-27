import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortalComponent } from '@libComponents';
import { PopularBookmarksContainerComponent, QuoteContainerComponent } from 'containers';
import { environment } from 'environments/environment';
import { PinnedNotesContainerComponent } from "../../containers/pinned-notes-container/pinned-notes-container.component";

@Component({
	selector: 'app-home-page',
	standalone: true,
	imports: [PopularBookmarksContainerComponent, PortalComponent, QuoteContainerComponent, PinnedNotesContainerComponent],
	templateUrl: './home-page.component.html',
	host: {
		'class': 'page'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {



}
