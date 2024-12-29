import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { Note } from '@models/note.model';
import { HideEnumPipe } from '@pipes/hide-enum.pipe';
import { TimePastPipe } from '@pipes/time-past.pipe';

@Component({
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
