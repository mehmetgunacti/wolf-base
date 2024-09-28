import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'environments/environment';
import { selCore_isBigScreen } from 'store/selectors/core/core-ui.selectors';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
	isProd = environment.production;
	bigScreen = inject(Store).selectSignal(selCore_isBigScreen);
}
