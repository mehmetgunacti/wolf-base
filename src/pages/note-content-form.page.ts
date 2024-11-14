import { Component } from '@angular/core';
import { NoteContentFormContainer } from "@containers";
import { BaseComponent } from '@libComponents';

@Component({
	standalone: true,
	imports: [ NoteContentFormContainer ],
	selector: 'note-content-form-page',
	template: `<app-note-content-form-container/>`,
	host: { 'class': 'page' }
})
export class NoteContentFormPage extends BaseComponent { }
