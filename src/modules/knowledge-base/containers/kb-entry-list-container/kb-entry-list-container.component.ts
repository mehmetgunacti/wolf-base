import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { selKBEntryRootEntryArray } from 'store/selectors/knowledge-base-entities.selectors';

@Component({
	selector: 'app-kb-entry-list-container',
	templateUrl: './kb-entry-list-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBEntryListContainerComponent {

	private store: Store = inject(Store);

	menuItems$: Observable<MenuItem[]>;

	constructor() {

		this.menuItems$ = this.store.select(selKBEntryRootEntryArray).pipe(

			map(entries => entries.map(n => ({ label: n.name, icon: PrimeIcons.ANGLE_RIGHT, routerLink: ['/kb', n.id] })))

		);

	}

}