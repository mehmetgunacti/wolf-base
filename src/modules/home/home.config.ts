import { SlowScrollDirective } from 'lib/directives/slow-scroll.directive';
import { QuoteComponent } from './components/quote/quote.component';
import { PinnedNotesContainerComponent } from './containers/pinned-notes-container/pinned-notes-container.component';
import { QuizAnswerContainerComponent } from './containers/quiz-answer-container/quiz-answer-container.component';
import { QuizContainerComponent } from './containers/quiz-container/quiz-container.component';
import { QuoteContainerComponent } from './containers/quote-container/quote-container.component';
import { HomePageComponent } from "./pages/home-page/home-page.component";

export const components = [

	HomePageComponent,
	PinnedNotesContainerComponent,
	QuoteContainerComponent,
	QuoteComponent,
	QuizContainerComponent,
	QuizAnswerContainerComponent,

	SlowScrollDirective

];
