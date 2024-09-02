import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppEntityType, UUID, Word } from 'lib';
import { Observable } from 'rxjs';
import { update } from 'store/actions/entity.actions';
import { selSelectedEntity } from 'store/selectors/word-selectors/word-entity.selectors';

@Component({
	selector: 'app-word-edit-form-container',
	templateUrl: './word-edit-form-container.component.html',
	styleUrls: ['./word-edit-form-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordEditFormContainerComponent {

	private store: Store = inject(Store);

	word$: Observable<Word | null | undefined>;

	constructor() {

		this.word$ = this.store.select(selSelectedEntity);

	}

	onUpdate(id: UUID, word: Partial<Word>) {

		this.store.dispatch(update({ entityType: AppEntityType.word, id, entity: word }));

	}

}
