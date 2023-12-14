import { NoteFormComponent } from './components/note-form/note-form.component';
import { NoteComponent } from './components/note/note.component';
import { NoteEditContainerComponent } from './containers/note-edit-container/note-edit-container.component';
import { NotesContainerComponent } from './containers/notes-container/notes-container.component';
import { NotesSearchAndTagCloudContainerComponent } from './containers/search-and-tag-cloud-container/notes-search-and-tag-cloud-container.component';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';

export const components = [

	// components
	NoteComponent,
	NoteFormComponent,

	// containers
	NoteEditContainerComponent,
	NotesContainerComponent,
	NotesSearchAndTagCloudContainerComponent,

	// pages
	NotesPageComponent

];
