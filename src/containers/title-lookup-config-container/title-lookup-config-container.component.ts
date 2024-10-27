import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TitleLookupConfigFormComponent } from '@components';
import { Store } from '@ngrx/store';
import { selCore_titleLookupUrl } from '@selectors';
import { settingsActions } from 'store/actions';

@Component({
	standalone: true,
	imports: [ TitleLookupConfigFormComponent ],
	selector: 'app-title-lookup-config-container',
	templateUrl: './title-lookup-config-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleLookupConfigContainerComponent {

	private store: Store = inject(Store);

	protected url = this.store.selectSignal(selCore_titleLookupUrl);

	onSave(url: string): void {

		this.store.dispatch(settingsActions.saveTitleLookup({ url }));

	}

}
