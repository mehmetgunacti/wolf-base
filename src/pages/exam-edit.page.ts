import { Component } from '@angular/core';
import { ExamEditContainer } from '@containers/exam-edit/exam-edit.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	selector: 'database-page',
	imports: [ ExamEditContainer ],
	template: `<app-exam-edit-container/>`,
	host: { 'class': 'page' }
})
export class ExamEditPage extends BaseComponent { }
