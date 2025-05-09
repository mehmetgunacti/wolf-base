import { Component } from '@angular/core';
import { NoteEditFormContainer } from '@containers/note-edit-form.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	imports: [ NoteEditFormContainer ],
	selector: 'note-edit-form-page',
	template: `<app-note-edit-form-container/>`,
	host: { 'class': 'page' }
})
export class NoteEditFormPage extends BaseComponent { }
