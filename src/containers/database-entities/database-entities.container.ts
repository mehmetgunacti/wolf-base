import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { opacityTrigger } from '@animations/opacity.animation';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { Store } from '@ngrx/store';
import { selDatabase_selectedEntity } from '@selectors/database/database.selectors';

@Component({
	imports: [ JsonPipe, GlyphDirective, RouterLink ],
	selector: 'app-database-entities-container',
	templateUrl: './database-entities.container.html',
	animations: [ opacityTrigger ],
	host: { 'class': 'comp p-4' }
})
export class DatabaseEntitiesContainer extends BaseComponent {

	private store: Store = inject(Store);

	entity = this.store.selectSignal(selDatabase_selectedEntity);

}
