import { WordFormComponent } from './components/word-form/word-form.component';
import { WordComponent } from './components/word/word.component';
import { WordContainerComponent } from './containers/word-container/word-container.component';
import { WordEditFormContainerComponent } from './containers/word-edit-form-container/word-edit-form-container.component';
import { WordNewFormContainerComponent } from './containers/word-new-form-container/word-new-form-container.component';
import { WordsContainerComponent } from './containers/words-container/words-container.component';
import { WordEditFormPageComponent } from './pages/word-edit-form-page/word-form-edit-page.component';
import { WordNewFormPageComponent } from './pages/word-new-form-page/word-new-form-page.component';
import { WordPageComponent } from './pages/word-page/word-page.component';
import { WordsPageComponent } from './pages/words-page/words-page.component';

export const components = [

	// components
	WordComponent,
	WordFormComponent,

	// containers
	WordContainerComponent,
	WordNewFormContainerComponent,
	WordEditFormContainerComponent,
	WordsContainerComponent,

	// pages
	WordPageComponent,
	WordsPageComponent,
	WordEditFormPageComponent,
	WordNewFormPageComponent

];
