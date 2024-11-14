import { Component } from '@angular/core';
import { NoteEditFormContainer } from '@containers';
import { BaseComponent } from '@libComponents';

@Component({
	standalone: true,
	imports: [ NoteEditFormContainer ],
	selector: 'note-edit-form-page',
	template: `<app-note-edit-form-container/>`,
	host: { 'class': 'page' }
})
export class NoteEditFormPage extends BaseComponent { }
