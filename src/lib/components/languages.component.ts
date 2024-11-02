import { Component, input } from '@angular/core';
import { Language } from '@models';
import { BaseComponent } from './base.component';

@Component({
	standalone: true,
	selector: 'w-languages',
	template: `
		@for (lang of languages(); track $index) {

			<img class="w-[12px] h-[9px] inline-block" [src]="'flags/' + lang.language + '.svg'">
			{{ lang.name }}

		}
	`,
	host: { 'class': 'inline-block' }
})
export class LanguagesComponent extends BaseComponent {

	languages = input.required<Language[]>();

}
