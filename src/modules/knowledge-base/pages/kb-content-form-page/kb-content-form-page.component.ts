import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-kb-content-form-page',
	templateUrl: './kb-content-form-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBContentFormPageComponent implements OnInit {

	private store: Store = inject(Store);
	private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

	constructor() {	}

	ngOnInit(): void {
		
		console.log(this.activatedRoute.paramMap);

	}

}
