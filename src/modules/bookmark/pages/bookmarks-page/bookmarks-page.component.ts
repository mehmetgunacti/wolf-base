import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Tag } from 'lib';
import { selectorTagCloudVisibility, tagsToggleTagCloudVisibility } from 'modules/bookmark/store';
import { slideUpDownTrigger } from 'modules/shared';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-bookmarks-page',
	templateUrl: './bookmarks-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [slideUpDownTrigger]
})
export class BookmarksPageComponent implements OnInit {

	tagsVisible$!: Observable<boolean>;

	constructor(private store: Store) {

		this.tagsVisible$ = store.select(selectorTagCloudVisibility);

	}

	ngOnInit(): void {
	}

	toggleTagCloud(): void {

		this.store.dispatch(tagsToggleTagCloudVisibility());

	}

	public tags: Tag[] = [
		{"id": "2-be-read", count: 34 },
		{"id": "angular", count: 13 },
		{"id": "brands", count: 4 },
		{"id": "colors", count: 6 },
		{"id": "css", count: 21 },
		{"id": "events", count: 12 },
		{"id": "falcon", count: 8 },
		{"id": "free", count: 21 },
		{"id": "git", count: 1 },
		{"id": "im-bored", count: 19 },
		{"id": "javascript", count: 5 },
		{"id": "library", count: 1 },
		{"id": "lookup", count: 24 },
		{"id": "news", count: 22 },
		{"id": "nginx", count: 1 },
		{"id": "programming", count: 12 },
		{"id": "resource", count: 11 },
		{"id": "rxjs", count: 1 },
		{"id": "security", count: 56 },
		{"id": "space", count: 14 },
		{"id": "starter", count: 12 },
		{"id": "tricks", count: 25 }
	];

}
