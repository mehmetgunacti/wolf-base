import { databaseActions } from '@actions/database.actions';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { UUID } from '@constants/common.constant';
import { DbStore } from '@constants/database.constant';
import { BaseComponent } from '@libComponents/base.component';
import { SelectComponent } from '@libComponents/select/select.component';
import { LocalRepositoryService } from '@libServices/local-repository.service';
import { NameBase } from '@models/id-base.model';
import { Store } from '@ngrx/store';
import { LocalDatabase } from '@services/indexeddb/indexeddb.service';
import { LOCAL_REPOSITORY_SERVICE } from '@services/repository.service';
import { fc, fg } from '@utils/form.util';
import { filter } from 'rxjs';

@Component({
	imports: [ SelectComponent, ReactiveFormsModule ],
	selector: 'app-database-entities-search-container',
	template: `
		<form [formGroup]="form" class="flex flex-col md:flex-row items-center gap-2">

			<w-select label="Table" [nodes]="tables()" formControlName="name"/>
			<w-select label="Entities" [nodes]="ids()" formControlName="id"/>

		</form>
	`,
	host: {
		'class': 'comp p-2'
	}
})
export class DatabaseEntitiesSearchContainer extends BaseComponent {

	private local: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private store: Store = inject(Store);

	protected tables = signal<NameBase[]>([]);
	protected ids = signal<NameBase[]>([]);

	protected form = fg({

		name: fc<DbStore | null>(),
		id: fc<UUID | null>()

	});

	constructor() {

		super();

		// fill table names
		const tableList = [];
		for (const name in DbStore)
			tableList.push(name);
		this.tables.set(tableList.map(name => ({ id: name, name })));

		// selectbox 'tables': on change populate 'ids' selectbox
		this.form.controls.name.valueChanges.pipe(
			takeUntilDestroyed(),
			filter((name): name is DbStore => name !== null)
		).subscribe(
			async name => {

				// load ids
				const ids = await LocalDatabase.getInstance().readAllKeys(name);
				// sort ids
				ids.sort();

				// to NameBase[]
				this.ids.set(
					ids.map(id => ({ id, name: id }))
				);

			}
		);

		// selectbox 'ids': on change
		this.form.controls.id.valueChanges.pipe(

			takeUntilDestroyed(),
			filter((id): id is UUID => id !== null)

		).subscribe(id => {

			const name = this.form.controls.name.value;
			if (name)
				this.store.dispatch(databaseActions.readFromStore({ id, name }));

		});

	}

}
