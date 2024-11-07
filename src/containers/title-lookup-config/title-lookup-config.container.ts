import { Component, inject } from '@angular/core';
import { TitleLookupConfigFormComponent } from '@forms';
import { BaseComponent } from '@libComponents';
import { Store } from '@ngrx/store';
import { selCore_titleLookupUrl } from '@selectors';
import { settingsActions } from 'store/actions';

@Component({
	standalone: true,
	imports: [ TitleLookupConfigFormComponent ],
	selector: 'app-title-lookup-config-container',
	templateUrl: './title-lookup-config.container.html',
	host: { 'class': 'comp p-4' }
})
export class TitleLookupConfigContainer extends BaseComponent {

	private store: Store = inject(Store);

	protected url = this.store.selectSignal(selCore_titleLookupUrl);

	onSave(url: string): void {

		this.store.dispatch(settingsActions.saveTitleLookup({ url }));

	}

}
