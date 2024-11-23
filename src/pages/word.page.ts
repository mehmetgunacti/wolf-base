import { Component } from '@angular/core';
import { WordContainer } from '@containers/word/word.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	standalone: true,
	imports: [ WordContainer ],
	selector: 'word-page',
	template: `<app-word-container/>`,
	host: { 'class': 'page' }
})
export class WordPage extends BaseComponent { }
