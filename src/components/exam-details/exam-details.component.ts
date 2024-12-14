import { Component, input } from '@angular/core';
import { BaseComponent } from '@libComponents/base.component';
import { ChoicesViewerComponent } from '@libComponents/choices/choices-viewer.component';
import { Exam, Session } from '@models/test-suite.model';

@Component({
	standalone: true,
	imports: [ ChoicesViewerComponent ],
	selector: 'app-exam-details',
	templateUrl: './exam-details.component.html',
	host: {
		'class': 'flex flex-col gap-1 md:gap-2'
	}
})
export class ExamDetailsComponent extends BaseComponent {

	// Input
	exam = input.required<Exam>();
	sessions = input<Session[]>([]);

}
