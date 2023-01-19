import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as actions from 'store';

@Component({
	selector: 'app-bookmark-one-page',
	templateUrl: './bookmark-one-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkOnePageComponent implements OnInit, OnDestroy {

	subscription = new Subscription();

	constructor(
		private route: ActivatedRoute,
		private store: Store
	) { }

	ngOnInit(): void {

		this.subscription.add(

			this.route.params.subscribe(params => console.log(params))

		);

	}

	ngOnDestroy(): void {

		this.subscription.unsubscribe();

	}

}
