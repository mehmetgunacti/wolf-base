import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PopularBookmarksContainerComponent } from "../../containers/popular-bookmarks-container/popular-bookmarks-container.component";

@Component({
	selector: 'app-home-page',
	standalone: true,
	imports: [PopularBookmarksContainerComponent],
	templateUrl: './home-page.component.html',
	styleUrl: './home-page.component.scss',
	host: {
		'class': 'page'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {

}
