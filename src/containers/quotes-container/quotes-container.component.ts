import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { QuoteComponent } from '@components';
import { UUID } from '@constants';
import { GlyphDirective } from '@libComponents';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-quotes-container',
	standalone: true,
	imports: [ QuoteComponent, GlyphDirective ],
	templateUrl: './quotes-container.component.html',
	host: {
		'class': 'flex flex-col gap-1 md:gap-2 @container'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteContainerComponent {

	private store: Store = inject(Store);

	onClick(id: UUID): void {

		// this.store.dispatch(bookmarkActions.click({ id }));

	}

}
