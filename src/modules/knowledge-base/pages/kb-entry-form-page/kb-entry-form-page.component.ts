import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-kb-entry-form-page',
	templateUrl: './kb-entry-form-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBEntryFormPageComponent {

	private store: Store = inject(Store);

	constructor() { }

	ngOnInit(): void {

	}

}
