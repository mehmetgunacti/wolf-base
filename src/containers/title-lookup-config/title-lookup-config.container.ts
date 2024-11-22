import { settingsActions } from '@actions/settings.actions';
import { Component, inject } from '@angular/core';
import { TitleLookupConfigForm } from '@forms/title-lookup-config-form/title-lookup-config.form';
import { BaseComponent } from '@libComponents/base.component';
import { Store } from '@ngrx/store';
import { selCore_titleLookupUrl } from '@selectors/core/core-configuration.selectors';

@Component({
	standalone: true,
	imports: [ TitleLookupConfigForm ],
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
