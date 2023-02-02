import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-bookmarks-page',
	templateUrl: './bookmarks-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksPageComponent implements OnInit {

	constructor(private store: Store) { }

	ngOnInit(): void {
	}

}
