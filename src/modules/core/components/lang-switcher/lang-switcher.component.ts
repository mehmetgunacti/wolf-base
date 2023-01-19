import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LANG } from 'blueprints';

@Component({
	selector: 'app-lang-switcher',
	templateUrl: './lang-switcher.component.html'
})
export class LangSwitcherComponent {

	@Input() lang: LANG | null | undefined;

	@Output() newLang = new EventEmitter<LANG>();


	setEn(): void {

		this.newLang.emit('en');

	}

	setTr(): void {

		this.newLang.emit('tr');

	}

}
