import { Component } from '@angular/core';
import { WordEditFormContainer } from '@containers/word-edit-form.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	standalone: true,
	imports: [ WordEditFormContainer ],
	selector: 'words-page',
	template: `<app-word-edit-form-container/>`,
	host: { 'class': 'page' }
})
export class WordEditFormPage extends BaseComponent { }
