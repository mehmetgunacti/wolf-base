import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppEntityType, Learning } from 'lib';
import { entityActions } from 'store/actions';

@Component({
	selector: 'app-learning-new-form-container',
	templateUrl: './learning-new-form-container.component.html',
	styleUrls: ['./learning-new-form-container.component.scss'],
	host: { 'class': 'd-flex-column' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LearningNewFormContainerComponent {

	private store: Store = inject(Store);

	onCreate(learning: Partial<Learning>): void {

		this.store.dispatch(entityActions.create({ entityType: AppEntityType.learning, entity: learning }));

	}

}
