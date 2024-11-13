import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlyphDirective } from '@directives';
import { BaseComponent } from '@libComponents';
import { Note } from '@models';
import { HideEnumPipe, TimePastPipe } from '@pipes';

@Component({
	standalone: true,
	imports: [ RouterLink, HideEnumPipe, DatePipe, GlyphDirective, TimePastPipe ],
	selector: 'app-note',
	templateUrl: './note.component.html',
	host: { 'class': 'flex flex-col gap-2' }
})
export class NoteComponent extends BaseComponent {

	note = input.required<Note>();
	parents = input<Note[]>([]);
	children = input<Note[]>([]);

}
