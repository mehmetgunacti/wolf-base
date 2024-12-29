import { Component } from '@angular/core';
import { NoteContentFormContainer } from '@containers/note-content-form/note-content-form.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	imports: [ NoteContentFormContainer ],
	selector: 'note-content-form-page',
	template: `<app-note-content-form-container/>`,
	host: { 'class': 'page' }
})
export class NoteContentFormPage extends BaseComponent { }
