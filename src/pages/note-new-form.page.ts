import { Component } from '@angular/core';
import { NoteContainer } from "@containers";
import { BaseComponent } from '@libComponents';

@Component({
	standalone: true,
	imports: [ NoteContainer ],
	selector: 'note-new-form-page',
	template: `<app-note-container/>`,
	host: { 'class': 'page' }
})
export class NoteNewFormPage extends BaseComponent { }
