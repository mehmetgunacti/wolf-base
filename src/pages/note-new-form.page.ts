import { Component } from '@angular/core';
import { NoteNewFormContainer } from "@containers";
import { BaseComponent } from '@libComponents';

@Component({
	standalone: true,
	imports: [ NoteNewFormContainer ],
	selector: 'note-new-form-page',
	template: `<app-note-new-form-container/>`,
	host: { 'class': 'page' }
})
export class NoteNewFormPage extends BaseComponent { }
