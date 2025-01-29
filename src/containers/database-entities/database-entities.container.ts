import { databaseActions } from '@actions/database.actions';
import { JsonPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { opacityTrigger } from '@animations/opacity.animation';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { MarkdownViewerComponent } from '@libComponents/markdown/markdown-viewer.component';
import { Store } from '@ngrx/store';
import { selDatabase_selectedEntity, selDatabase_selectedStore } from '@selectors/database/database.selectors';

@Component({
	imports: [ JsonPipe, GlyphDirective, RouterLink, MarkdownViewerComponent ],
	selector: 'app-database-entities-container',
	templateUrl: './database-entities.container.html',
	animations: [ opacityTrigger ],
	host: { 'class': 'comp p-4' }
})
export class DatabaseEntitiesContainer extends BaseComponent {

	private store: Store = inject(Store);

	storeName = this.store.selectSignal(selDatabase_selectedStore);
	entity = this.store.selectSignal(selDatabase_selectedEntity);
	entityName = computed(() => {

		const e: any = this.entity();
		return !!e ? !!Object.hasOwn(e, 'name') ? e[ 'name' ] : null : null;

	});

	onDelete(): void {

		if (confirm(`Object will be deleted. Continue?`)) {

			const name = this.storeName();
			const id = this.entity()?.id;
			if (name && id)
				this.store.dispatch(databaseActions.deleteFromStore({ name, id }));

		}

	}

}
