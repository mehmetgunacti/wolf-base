import { coreActions } from '@actions/core.actions';
import { entityActions } from '@actions/entity.actions';
import { examActions } from '@actions/exam.actions';
import { inject, Injectable } from '@angular/core';
import { AppEntities, AppEntityType } from '@constants/entity.constant';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { selTestSuite_selected } from '@selectors/test-suite/test-suite-ui.selectors';
import { selTestSuite_UIState } from '@selectors/test-suite/test-suite.selectors';
import { isEntityOfType } from '@utils/helper.tool';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class ExamUpdateEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.updateSuccess),
			filter(isEntityOfType(AppEntityType.exam)),
			map(({ entityType }) => coreActions.showNotification({ severity: 'success', detail: `${AppEntities[ entityType ].label} updated` }))

		)

	);

	editSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.updateSuccess),
			filter(isEntityOfType(AppEntityType.exam)),
			map(() => examActions.editSuccess())

		)

	);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.updateSuccess),
			filter(isEntityOfType(AppEntityType.exam)),
			concatLatestFrom(() => this.store.select(selTestSuite_selected)),
			map(([, testSuite]) => coreActions.navigate({ url: [ `/test-suites`, testSuite?.id ?? '' ] }))

		)

	);

}
