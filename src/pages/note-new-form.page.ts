import { Component } from '@angular/core';
import { NoteNewFormContainer } from '@containers/note-new-form-container/note-new-form.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	standalone: true,
	imports: [ NoteNewFormContainer ],
	selector: 'note-new-form-page',
	template: `<app-note-new-form-container/>`,
	host: { 'class': 'page' }
})
export class NoteNewFormPage extends BaseComponent { }
