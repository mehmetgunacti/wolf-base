import { Component, inject } from '@angular/core';
import { opacityTrigger } from '@animations/opacity.animation';
import { ModuleReportComponent } from '@components/module-report/module-report.component';
import { GlyphDirective } from '@directives/glyph.directive';
import { AlertComponent } from '@libComponents/alert/alert.component';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';
import { Store } from '@ngrx/store';
import { FormatBytesPipe } from '@pipes/format-bytes.pipe';

@Component({
	imports: [ GlyphDirective, PortalComponent, GlyphDirective, FormatBytesPipe, ModuleReportComponent, AlertComponent ],
	selector: 'app-database-entities-container',
	templateUrl: './database-entities.container.html',
	animations: [ opacityTrigger ],
	host: { 'class': 'grid gap-2' }
})
export class DatabaseEntitiesContainer extends BaseComponent {

	private store: Store = inject(Store);


}
