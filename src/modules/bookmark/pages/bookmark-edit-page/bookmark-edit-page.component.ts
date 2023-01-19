import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ID } from 'blueprints';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as actions from 'store';

@Component({
	selector: 'app-bookmark-edit-page',
	templateUrl: './bookmark-edit-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkEditPageComponent {

	id$: Observable<ID>;

	constructor(
		private route: ActivatedRoute,
		private store: Store
	) {

		this.id$ = this.route.params.pipe(

			map(params => params['id']),
			tap(id => console.log(id))

		);

	}

}