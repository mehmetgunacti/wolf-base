import { ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { EditFormImpl, KB_ENTRY_FORM } from './kb-entry-form';

@Component({
	selector: 'app-kb-entry-form',
	templateUrl: './kb-entry-form.component.html',
	providers: [{ provide: KB_ENTRY_FORM, useClass: EditFormImpl }],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBEntryFormComponent implements OnInit, OnChanges, OnDestroy {

	constructor() { }

	ngOnChanges(changes: SimpleChanges): void {

	}

	ngOnDestroy(): void {

	}

	ngOnInit(): void {

	}

}
