import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { settingsActions } from 'store/actions';
import { selCore_titleLookupUrl } from 'store/selectors/core/core-configuration.selectors';

@Component({
	selector: 'app-title-lookup-config-container',
	templateUrl: './title-lookup-config-container.component.html',
	styleUrls: ['./title-lookup-config-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleLookupConfigContainerComponent {

	private store: Store = inject(Store);

	url = this.store.selectSignal(selCore_titleLookupUrl);

	onSave(url: string): void {

		this.store.dispatch(settingsActions.saveTitleLookup({ url }));

	}

}
