import { Signal, WritableSignal, computed, signal } from '@angular/core';
import { formatBytes } from 'lib/utils';
import { TextareaProperties } from './textarea-properties.model';

const EMPTY_PROPS: TextareaProperties = {
	value: '',
	selectionStart: 0,
	selectionEnd: 0
}

export class UndoCache {

	// signals
	stack: WritableSignal<TextareaProperties[]> = signal([EMPTY_PROPS]);
	idx: WritableSignal<number> = signal(0);

	// computed values
	canUndo: Signal<boolean> = computed(() => this.idx() > 0);
	canRedo: Signal<boolean> = computed(() => this.idx() < this.stack().length - 1);
	props: Signal<TextareaProperties> = computed(() => this.stack()[this.idx()]);
	size: Signal<number> = computed(() => this.props().value.length);

	memSize = computed(() => `${formatBytes(this.stack().reduce((t, a) => t + a.value.length, 0))}`);
	discSize = computed(() => `${formatBytes(this.size())}`);

	initialize(content: string): void {

		this.stack.set([{
			value: content,
			selectionStart: content.length,
			selectionEnd: content.length
		}]);

	}

	saveState(props: TextareaProperties): void {

		if (props.value === this.props().value)
			return;

		const { value, selectionStart, selectionEnd } = props;
		const arr = [...this.stack().slice(0, this.idx() + 1)]; // clears redo-cache (right-side of index)
		this.incIdx();
		arr[this.idx()] = { value, selectionStart, selectionEnd };
		this.stack.set(arr);

	}

	undo(): void {

		if (this.canUndo())
			this.decIdx();

	}

	redo(): void {

		if (this.canRedo())
			this.incIdx();

	}

	private incIdx(): void {

		if (this.idx() < this.stack().length)
			this.idx.update(idx => ++idx);

	}

	private decIdx(): void {

		if (this.idx() > 0)
			this.idx.update(idx => --idx);

	}

}
