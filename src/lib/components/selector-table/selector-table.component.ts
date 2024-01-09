import { hasModifierKey } from '@angular/cdk/keycodes';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Renderer2, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { createArray } from 'lib/utils';

function parseId(id: string): number[] {

	return id.substring(1).split('_').map(Number);

}

@Component({
	selector: 'w-selector-table',
	templateUrl: 'selector-table.component.html',
	styleUrl: 'selector-table.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorTableComponent implements AfterViewInit {

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

	private renderer: Renderer2 = inject(Renderer2);

	ngAfterViewInit(): void {

		this.setFocus(1, 1);

	}

	onClick(col: number, row: number): void {

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

	onKeydown(event: KeyboardEvent): void {

		event.preventDefault();
		if (hasModifierKey(event)) // ctrl, shift etc.
			return;

		const anchor: HTMLAnchorElement = event.target as HTMLAnchorElement;
		const [col, row] = parseId(anchor.id);

		switch (event.key) {

			case "Enter":
				this.onClick(col, row);
				break;

			case "ArrowUp":
				this.setFocus(col, row === 1 ? this._rows() : row - 1);
				break;

			case "ArrowDown":
				this.setFocus(col, row === this._rows() ? 1 : row + 1);
				break;

			case "ArrowLeft":
				this.setFocus(col === 1 ? this._cols() : col - 1, row);
				break;

			case "ArrowRight":
				this.setFocus(col === this._cols() ? 1 : col + 1, row);
				break;

		}

	}

	setFocus(col: number, row: number): void {

		const element = this.renderer.selectRootElement(`#_${col}_${row}`);
		setTimeout(() => element.focus(), 0);

	}

}
