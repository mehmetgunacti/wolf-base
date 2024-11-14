import { Component } from '@angular/core';
import { NoteContainer } from "@containers";
import { BaseComponent } from '@libComponents';

@Component({
	standalone: true,
	imports: [ NoteContainer ],
	selector: 'note-page',
	template: `<app-note-container/>`,
	host: { 'class': 'page' }
})
export class NotePage extends BaseComponent { }
