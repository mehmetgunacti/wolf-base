import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ScriptLoaderService } from 'modules/shared/services/script-loader.service';
import { tap } from 'rxjs/operators';
import { addHeadCSS, addHeadScript } from 'store/actions';
import { navigate } from 'store/actions/navigation.action';

@Injectable()
export class CommonEffects {

	constructor(
		private actions$: Actions,
        private scriptLoader: ScriptLoaderService
	) { }

	// addHeadScript$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(addHeadScript),
	// 		tap( param => this.scriptLoader.loadScript(param.url))

	// 	),
	// 	{ dispatch: false }

	// );

    // addHeadCSS$ = createEffect(

    //     () => this.actions$.pipe(

	// 		ofType(addHeadCSS),
	// 		tap( param => this.scriptLoader.loadCSS(param.url))

	// 	),
	// 	{ dispatch: false }

    // );

}
