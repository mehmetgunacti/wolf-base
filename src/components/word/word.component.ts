import { Component, input, output } from '@angular/core';
import { LanguagesComponent } from '@components/languages.component';
import { UUID } from '@constants/common.constant';
import { BaseComponent } from '@libComponents/base.component';
import { SwitchComponent } from '@libComponents/switch/switch.component';
import { Definition, Word } from '@models/word.model';
import { DefinitionTypePipe } from '@pipes/definition-type.pipe';

@Component({
	imports: [ LanguagesComponent, SwitchComponent, DefinitionTypePipe ],
	selector: 'app-word',
	templateUrl: './word.component.html',
	host: {
		'class': 'flex flex-col'
	}
})
export class WordComponent extends BaseComponent {

	// INPUT
	word = input.required<Word>();
	scheduledIds = input<UUID[]>([]);
	schedulable = input<boolean>(true);

	// OUTPUT
	schedule = output<Definition>();
	cancelSchedule = output<Definition>();

	onSchedule(definition: Definition, checked: boolean): void {

		if (checked)
			this.schedule.emit(definition);
		else
			this.cancelSchedule.emit(definition);

	}

}
