import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-kb-entry-form-page',
	templateUrl: './kb-entry-form-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBEntryFormPageComponent {

	@Input() id: string = 'n/a';

	private store: Store = inject(Store);
	private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

	constructor() {	}

	ngOnInit(): void {
		
		console.log(this.activatedRoute.snapshot.paramMap.get('id'));
		console.log(this.id);

		this.activatedRoute.paramMap.subscribe(a => console.log('.............paramMap$', a));

	}

}
