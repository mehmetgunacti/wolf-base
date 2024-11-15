import { Component } from '@angular/core';
import { NoteEditFormContainer } from '@containers/note-edit-form-container/note-edit-form-container.component';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	standalone: true,
	imports: [ NoteEditFormContainer ],
	selector: 'note-edit-form-page',
	template: `<app-note-edit-form-container/>`,
	host: { 'class': 'page' }
})
export class NoteEditFormPage extends BaseComponent { }
