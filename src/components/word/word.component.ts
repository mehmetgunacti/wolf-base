import { Component, input, output } from '@angular/core';
import { LanguagesComponent } from '@components';
import { UUID } from '@constants';
import { BaseComponent, SwitchComponent } from '@libComponents';
import { Definition, Word } from '@models';
import { DefinitionTypePipe } from '@pipes';

@Component({
	standalone: true,
	imports: [ LanguagesComponent, SwitchComponent, DefinitionTypePipe ],
	selector: 'app-word',
	templateUrl: './word.component.html'
})
export class WordComponent extends BaseComponent {

	word = input.required<Word>();
	scheduledIds = input<UUID[]>([]);
	schedulable = input<boolean>(true);

	schedule = output<Definition>();
	cancelSchedule = output<Definition>();

	onSchedule(definition: Definition, checked: boolean): void {

		if (checked)
			this.schedule.emit(definition);
		else
			this.cancelSchedule.emit(definition);

	}

}
