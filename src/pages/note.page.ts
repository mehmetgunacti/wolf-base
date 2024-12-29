import { Component } from '@angular/core';
import { NoteContainer } from '@containers/note/note.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	imports: [ NoteContainer ],
	selector: 'note-page',
	template: `<app-note-container/>`,
	host: { 'class': 'page' }
})
export class NotePage extends BaseComponent { }
