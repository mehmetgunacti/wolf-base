import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { learningActions } from 'store/actions';
import { selLearning_search } from 'store/selectors/learning/learning-ui.selectors';

@Component({
	selector: 'app-learning-filter-container',
	templateUrl: './learning-filter-container.component.html',
	styleUrls: ['./learning-filter-container.component.scss'],
	host: { 'class': 'box dark p transition-bg shadow' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LearningFilterContainerComponent {

	term$: Observable<string | null>;

	@Output() search: EventEmitter<string> = new EventEmitter();

	private store: Store = inject(Store);

	constructor() {

		this.term$ = this.store.select(selLearning_search);

	}

	onSearch(term: string): void {

		this.store.dispatch(learningActions.search({ term }));

	}

}
