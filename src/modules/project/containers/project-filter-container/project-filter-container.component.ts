import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { search } from 'store/actions/project.actions';

@Component({
	selector: 'app-project-filter-container',
	templateUrl: './project-filter-container.component.html',
	styleUrls: ['./project-filter-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectFilterContainerComponent {

	term$: Observable<string | null>;

	@Output() search: EventEmitter<string> = new EventEmitter();

	private store: Store = inject(Store);

	constructor() {

		this.term$ = of(''); // this.store.select(selProject_search);

	}

	onSearch(term: string): void {

		this.store.dispatch(search({ term }));

	}

}
