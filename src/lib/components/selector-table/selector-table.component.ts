import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Signal, WritableSignal, computed, signal } from '@angular/core';
import { createArray } from 'lib/utils';

@Component({
	selector: 'w-selector-table',
	templateUrl: 'selector-table.component.html',
	styleUrl: 'selector-table.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorTableComponent {

	_rows: WritableSignal<number> = signal(3);
	_cols: WritableSignal<number> = signal(4);

	_rowsArray: Signal<number[]> = computed(() => createArray(this._rows()));
	_colsArray: Signal<number[]> = computed(() => createArray(this._cols()));

	@Input() set rows(val: number) {
		this._rows.set(val);
	};
	@Input() set cols(val: number) {
		this._cols.set(val);
	};

	@Output() result: EventEmitter<string> = new EventEmitter<string>();

	onCreateTable(col: number, row: number): void {

		const newLine = '\n';

		let output = newLine + '|';

		// first line
		for (let c = 0; c < col; ++c)
			output += '  |';
		output += newLine + '|';

		// separator line
		for (let c = 0; c < col; ++c)
			output += ' - |';
		output += newLine;

		// rows & columns
		for (let r = 0; r < row; ++r) {

			output += '|';
			for (let c = 0; c < col; ++c)
				output += '  |';
			output += newLine;

		}
		this.result.emit(output + newLine);

	}

}
