import { Component, input, output } from '@angular/core';
import { LanguagesComponent } from '@components/languages.component';
import { UUID } from '@constants';
import { BaseComponent, SwitchComponent } from '@libComponents';
import { Definition, Word } from '@models';
import { DefinitionTypePipe } from '@pipes';

@Component({
	standalone: true,
	imports: [ LanguagesComponent, SwitchComponent, DefinitionTypePipe ],
	selector: 'app-word',
	templateUrl: './word.component.html',
	host: {
		'class': 'flex flex-col text-content prose'
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
