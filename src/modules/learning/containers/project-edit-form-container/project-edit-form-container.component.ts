import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppEntityType, Learning, UUID } from 'lib';
import { Observable } from 'rxjs';
import { entityActions } from 'store/actions';
import { selLearning_selected } from 'store/selectors/learning/learning-ui.selectors';

@Component({
	selector: 'app-learning-edit-form-container',
	templateUrl: './learning-edit-form-container.component.html',
	styleUrls: ['./learning-edit-form-container.component.scss'],
	host: { 'class': 'd-flex-column' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LearningEditFormContainerComponent {

	private store: Store = inject(Store);

	learning$: Observable<Learning | null | undefined>;

	constructor() {

		this.learning$ = this.store.select(selLearning_selected);

	}

	onUpdate(id: UUID, learning: Partial<Learning>) {

		this.store.dispatch(entityActions.update({ entityType: AppEntityType.learning, id, entity: learning }));

	}

}
