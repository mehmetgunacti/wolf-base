import { Component } from '@angular/core';
import { BaseComponent } from '@libComponents';
import { NoteContainer } from '@containers/note/note.container';

@Component({
	standalone: true,
	imports: [ NoteContainer ],
	selector: 'note-page',
	template: `<app-note-container/>`,
	host: { 'class': 'page' }
})
export class NotePage extends BaseComponent { }
