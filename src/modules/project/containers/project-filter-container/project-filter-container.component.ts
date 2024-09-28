import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { projectActions } from 'store/actions';
import { selProject_search } from 'store/selectors/project/project-ui.selectors';

@Component({
	selector: 'app-project-filter-container',
	templateUrl: './project-filter-container.component.html',
	styleUrls: ['./project-filter-container.component.scss'],
	host: { 'class': 'box dark p transition-bg shadow' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectFilterContainerComponent {

	term$: Observable<string | null>;

	@Output() search: EventEmitter<string> = new EventEmitter();

	private store: Store = inject(Store);

	constructor() {

		this.term$ = this.store.select(selProject_search);

	}

	onSearch(term: string): void {

		this.store.dispatch(projectActions.search({ term }));

	}

}
