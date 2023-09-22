import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { KBEntry } from 'lib';

@Component({
	selector: 'app-kb-entry',
	templateUrl: './kb-entry.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBEntryComponent {

	@Input() kbEntry: KBEntry | null | undefined;
	@Input() parents: KBEntry[] = [];

}