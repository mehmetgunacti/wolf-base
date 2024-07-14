import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';
import { Language } from '@lib';

@Component({
	selector: 'app-languages',
	template: `
		@for (lang of languages(); track $index) {

			<img class="flag" [src]="'assets/flags/' + lang.language + '.svg'">
			{{ lang.name }}

		}
	`,
	styles: `
		img.flag {

			width	: 12px;
			height	: 9px;

		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguagesComponent {

	languages: InputSignal<Language[]> = input.required();

}
