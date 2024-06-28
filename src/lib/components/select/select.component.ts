import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UUID } from 'lib/constants';
import { NameBase } from 'lib/models';

@Component({
	selector: 'w-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {

	label_id: string = 'select_' + Math.random();

	@Input() name: string = '';
	@Input() control!: FormControl<UUID | null>;
	@Input() nodes: NameBase[] = [];

}
