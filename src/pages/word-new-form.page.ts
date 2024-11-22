import { Component } from '@angular/core';
import { WordNewFormContainer } from '@containers/word-new-form.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	standalone: true,
	imports: [ WordNewFormContainer ],
	selector: 'words-page',
	template: `<app-word-new-form-container/>`,
	host: { 'class': 'page' }
})
export class WordNewFormPage extends BaseComponent { }
