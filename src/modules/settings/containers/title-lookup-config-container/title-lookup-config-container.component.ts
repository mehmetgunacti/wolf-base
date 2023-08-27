import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { saveTitleLookup } from 'store/actions/settings.actions';
import { selCoreTitleLookupUrl } from 'store/selectors/core-configuration.selectors';

@Component({
	selector: 'app-title-lookup-config-container',
	templateUrl: './title-lookup-config-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleLookupConfigContainerComponent {

	private store: Store = inject(Store);

	url$: Observable<string | null>;

	constructor() {

		this.url$ = this.store.select(selCoreTitleLookupUrl);

	}

	onSave(url: string): void {

		this.store.dispatch(saveTitleLookup({ url }));

	}

}
