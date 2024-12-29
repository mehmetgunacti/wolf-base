import { Component, input } from '@angular/core';
import { BaseComponent } from '@libComponents/base.component';
import { MarkdownViewerComponent } from '@libComponents/markdown/markdown-viewer.component';
import { Note, NoteContent } from '@models/note.model';
import { HideEnumPipe } from '@pipes/hide-enum.pipe';

@Component({
	imports: [ MarkdownViewerComponent, HideEnumPipe ],
	selector: 'app-note-content',
	templateUrl: './note-content.component.html',
	host: {
		'class': 'comp block p-4'
	}
})
export class NoteContentComponent extends BaseComponent {

	note = input.required<Note | null>();
	content = input.required<NoteContent | null>();

}
