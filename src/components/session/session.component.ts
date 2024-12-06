import { Component, input } from '@angular/core';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';
import { Exam } from '@models/test-suite.model';
import { HideEnumPipe } from '@pipes/hide-enum.pipe';

@Component({
	standalone: true,
	imports: [ HideEnumPipe, GlyphDirective, PortalComponent ],
	selector: 'app-session',
	templateUrl: './session.component.html',
	host: {
		'class': 'flex flex-col gap-1 md:gap-2 flex-1'
	}
})
export class SessionComponent extends BaseComponent {

	// Input
	exam = input.required<Exam>();

}
