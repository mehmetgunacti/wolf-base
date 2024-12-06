import { Component, input } from '@angular/core';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { ChoicesViewerComponent } from '@libComponents/choices/choices-viewer.component';
import { PortalComponent } from '@libComponents/portal.component';
import { Exam } from '@models/test-suite.model';
import { HideEnumPipe } from '@pipes/hide-enum.pipe';

@Component({
	standalone: true,
	imports: [ ChoicesViewerComponent, HideEnumPipe, GlyphDirective, PortalComponent ],
	selector: 'app-exam-details',
	templateUrl: './exam-details.component.html',
	host: {
		'class': 'flex flex-col gap-1 md:gap-2'
	}
})
export class ExamDetailsComponent extends BaseComponent {

	// Input
	exam = input.required<Exam>();

}
