import { Component } from '@angular/core';
import { BaseComponent } from '@libComponents';
import { NoteContentFormContainer } from '@containers/note-content-edit-container/note-content-form-container.component';

@Component({
	standalone: true,
	imports: [ NoteContentFormContainer ],
	selector: 'note-content-form-page',
	template: `<app-note-content-form-container/>`,
	host: { 'class': 'page' }
})
export class NoteContentFormPage extends BaseComponent { }
