import { hasModifierKey } from '@angular/cdk/keycodes';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, Renderer2, Signal, ViewChild, WritableSignal, computed, inject, signal } from '@angular/core';
import { createArray } from '@utils';

function parseId(id: string): number[] {

	return id.substring(1).split('_').map(Number);

}

@Component({
	selector: 'w-selector-table',
	standalone: true,
	templateUrl: 'selector-table.component.html',
	styleUrl: 'selector-table.component.scss',
	host: { 'class': 'gap-sm'},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorTableComponent implements AfterViewInit {

	@ViewChild('display') display!: ElementRef<HTMLDivElement>;

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

	@Output() result: EventEmitter<[number, number]> = new EventEmitter<[number, number]>();

	private renderer: Renderer2 = inject(Renderer2);

	ngAfterViewInit(): void {

		this.setFocus(1, 1);

	}

	onClick(col: number, row: number): void {

		this.result.emit([col, row]);
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

		for (let i = 1; i <= this._cols(); ++i)
			for (let j = 1; j <= this._rows(); ++j) {

				const el: HTMLDivElement = this.renderer.selectRootElement(`#_${i}_${j}`);
				if (col >= i && row >= j)
					el.classList.add('focus');
				else
					el.classList.remove('focus');

			}

		const element = this.renderer.selectRootElement(`#_${col}_${row}`);
		setTimeout(() => element.focus(), 0);
		this.display.nativeElement.innerHTML = col + ' x ' + row;

	}

}
