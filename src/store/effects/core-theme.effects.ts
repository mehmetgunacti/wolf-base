import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { selCoreTheme } from 'store/selectors/core-ui.selectors';

@Injectable()
export class CoreThemeEffects {

	private store: Store = inject(Store);
	private document: Document = inject(DOCUMENT);

	setTheme$ = createEffect(

		() => this.store.select(selCoreTheme).pipe(

			// replace 'theme-' class from <body>
			tap(theme => {

				const list: string[] = [theme];
				this.document.body.classList.forEach(v => {

					if (!v.startsWith('theme-'))
						list.push(v);

				});
				this.document.body.className = list.join(' ');

			})


		),
		{ dispatch: false }

	);

}
