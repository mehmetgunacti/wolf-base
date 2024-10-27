import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortalComponent } from '@libComponents';
import { PopularBookmarksContainerComponent, QuoteContainerComponent } from 'containers';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-home-page',
	standalone: true,
	imports: [ PopularBookmarksContainerComponent, PortalComponent, QuoteContainerComponent ],
	templateUrl: './home-page.component.html',
	host: {
		'class': 'page'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {



}
