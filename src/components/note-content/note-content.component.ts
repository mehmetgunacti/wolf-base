import { Component, InputSignal, input } from '@angular/core';
import { BaseComponent, MarkdownViewerComponent } from '@libComponents';
import { Note, NoteContent } from '@models';
import { HideEnumPipe } from '@pipes';

@Component({
	standalone: true,
	imports: [ MarkdownViewerComponent, HideEnumPipe ],
	selector: 'app-note-content',
	templateUrl: './note-content.component.html',
	host: {
		'class': 'comp block p-4'
	}
})
export class NoteContentComponent extends BaseComponent {

	note: InputSignal<Note | null> = input.required();
	content: InputSignal<NoteContent | null> = input.required();

}
