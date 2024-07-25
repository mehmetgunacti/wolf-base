import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Project } from 'lib';
import { Observable, map } from 'rxjs';
import { selProject_filtered } from 'store/selectors/project-selectors/project-entities.selectors';

@Component({
	selector: 'app-projects-container',
	templateUrl: './projects-container.component.html',
	styleUrls: ['./projects-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsContainerComponent {

	private store: Store = inject(Store);

	projects$: Observable<Project[]>;

	constructor() {

		this.projects$ = this.store.select(selProject_filtered).pipe(
			map(projects => projects.sort((a, b) => a.name.localeCompare(b.name)))
		);

	}


}
