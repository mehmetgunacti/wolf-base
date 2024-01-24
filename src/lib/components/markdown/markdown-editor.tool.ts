import { Signal, WritableSignal, computed, signal } from '@angular/core';
import { formatBytes } from 'lib/utils';

const NL = '\n';
const TAB = ' '.repeat(4); // 4 spaces instead of '\t'

export interface TextareaProperties {

	value: string;
	selectionStart: number;
	selectionEnd: number;

}

export function tab(props: TextareaProperties, tabString: string = TAB): TextareaProperties {

	const { value, selectionStart, selectionEnd } = props;

	// Selection is multi-line?
	if (value.substring(selectionStart, selectionEnd).indexOf(NL) > -1) {

		// shift all selected lines
		const lastPiece = value.substring(selectionEnd);
		const startIdx = startIndexOfCurrentLine(value, selectionStart);
		const selection = value.substring(startIdx, selectionEnd);
		const newSelection = tabString + selection.replaceAll(NL, NL + tabString);
		const shift = newSelection.length - selection.length;

		const result = value.substring(0, startIdx) + newSelection + lastPiece;

		return {

			value: result,
			selectionStart: startIdx,
			selectionEnd: selectionEnd + shift

		};

	}

	// Insert TAB at the cursor's position
	const result = value.substring(0, selectionStart) + tabString + value.substring(selectionStart);

	return {

		value: result,
		selectionStart: selectionStart + tabString.length,
		selectionEnd: selectionEnd + tabString.length

	};

}

function hasTabAfterNewlines(s: string): boolean {

	let lines = s.split(NL);
	for (let i = 0; i < lines.length; i++)
		if (lines[i].endsWith(NL) && !lines[i + 1]?.startsWith(TAB))
			return false;
	return true;

}

export function shiftTab(props: TextareaProperties, tabString: string = TAB): TextareaProperties {

	const { value, selectionStart, selectionEnd } = props;

	// Selection is multi-line?
	if (value.substring(selectionStart, selectionEnd).indexOf(NL) > -1) {

		// shift all selected lines
		const lastPiece = value.substring(selectionEnd);
		const startIdx = startIndexOfCurrentLine(value, selectionStart);

		const piece = value.substring(startIdx, selectionEnd);

		if (piece.startsWith(tabString) && hasTabAfterNewlines(piece)) {

			const newPiece = piece.substring(tabString.length).replaceAll(NL + tabString, NL);
			const result = value.substring(0, startIdx) + newPiece + lastPiece;
			const shift = piece.length - newPiece.length;

			return {

				value: result,
				selectionStart: startIdx,
				selectionEnd: selectionEnd - shift

			};

		} else
			return props;

	}

	let startPiece = value.substring(0, selectionStart);
	if (startPiece.endsWith(tabString))
		startPiece = value.substring(0, selectionStart - tabString.length);
	else
		return props;

	// remove TAB at the cursor's position
	const result = startPiece + value.substring(startPiece.length + tabString.length);

	return {

		value: result,
		selectionStart: selectionStart - tabString.length,
		selectionEnd: selectionEnd - tabString.length

	};

}

export function addEmptyTask(props: TextareaProperties): TextareaProperties {

	const s = '\n- [ ] ';
	return insert(props, s);

}

export function addToc(props: TextareaProperties): TextareaProperties {

	const s = '\n\n${toc}\n\n';
	return insert(props, s);

}

export function addTable(props: TextareaProperties, [col, row]: [number, number]): TextareaProperties {

	const newLine = NL;
	const { value, selectionStart, selectionEnd } = props;

	let output = newLine + newLine + '|';

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

	const firstPiece = value.substring(0, selectionStart);
	const lastPiece = value.substring(selectionStart)

	const result = firstPiece + output + (lastPiece.startsWith(newLine) ? '' : newLine) + lastPiece;
	const cursor = props.selectionStart + 4; // set the cursor at center of 1st cell of header row
	return {

		value: result,
		selectionStart: cursor,
		selectionEnd: cursor

	};

}


function addClass(props: TextareaProperties, s: string): TextareaProperties {

	/*

		lorem ipsum
		lor<selectionStart>em ip<cursor>sum
		lorem ipsum
		lorem i<selectionEnd>psum
		lorem ipsum

		↓↓↓↓↓↓ becomes ↓↓↓↓↓↓↓↓

		lorem ipsum
		\n
		\n
		lor<selectionStart>em ip<cursor>sum
		lorem ipsum
		lorem i<selectionEnd>psum
		\n
		\n
		lorem ipsum

	*/

	const { value, selectionStart, selectionEnd } = props;

	const idxLineStart = startIndexOfCurrentLine(value, selectionStart);
	const idxLineEnd = endIndexOfCurrentLine(value, selectionEnd);

	const textStart = value.substring(0, idxLineStart);
	const textMiddle = value.substring(idxLineStart, idxLineEnd);
	const textEnd = value.substring(idxLineEnd);

	if (textMiddle.endsWith(s))
		return props;

	const result = textStart + NL + textMiddle + s + NL + textEnd;
	return {

		value: result,
		selectionStart: selectionStart + 1, // 1 NL added
		selectionEnd: selectionEnd + 1 // 1 NL added

	};

}

export function addAlignCenter(props: TextareaProperties): TextareaProperties {

	return addClass(props, '{.text-align-center}');

}

export function addAlignRight(props: TextareaProperties): TextareaProperties {

	return addClass(props, '{.text-align-right}');

}

export function addAlignJustify(props: TextareaProperties): TextareaProperties {

	return addClass(props, '{.text-align-justify}');

}

export function addHeading(props: TextareaProperties, heading: string): TextareaProperties {

	//
	// ${heading}
	//
	const first = `\n\n${heading} `;
	const second = '\n\n';

	const { value, selectionStart, selectionEnd } = props;

	// Selection is multi-line?
	if (selectionStart !== selectionEnd) {

		const firstPiece = value.substring(0, selectionStart);
		const middlePiece = value.substring(selectionStart, selectionEnd);
		const lastPiece = value.substring(selectionEnd);

		const result = firstPiece + first + middlePiece + second + lastPiece;

		return {

			value: result,
			selectionStart: selectionStart + first.length,
			selectionEnd: selectionEnd + first.length

		};

	}
	return insert(props, first, second);

}

export function addBold(props: TextareaProperties): TextareaProperties {

	const s = '**';
	return wrap(props, s);

}

export function addItalic(props: TextareaProperties): TextareaProperties {

	const s = '*';
	return wrap(props, s);

}

export function addStrikethrough(props: TextareaProperties): TextareaProperties {

	const s = '~~';
	return wrap(props, s);

}

export function addSub(props: TextareaProperties): TextareaProperties {

	const CHAR = '~';
	return wrapEachWord(props, CHAR);

}

export function addSup(props: TextareaProperties): TextareaProperties {

	const CHAR = '^';
	return wrapEachWord(props, CHAR);

}

export function addListBulleted(props: TextareaProperties): TextareaProperties {

	const s = '\n\n+ a\n+ b\n  - c\n    * d\n\n';
	return insert(props, s);

}

export function addListNumbered(props: TextareaProperties): TextareaProperties {

	const s = '\n\n1. a\n1. b\n1. c\n  1. d\n\n';
	return insert(props, s);

}

export function addHighlight(props: TextareaProperties): TextareaProperties {

	const s = '==';
	return wrap(props, s);

}

export function addInlineCode(props: TextareaProperties): TextareaProperties {

	const s = '`';
	return wrap(props, s);

}

export function addCodeBlock(props: TextareaProperties, lang: string = ''): TextareaProperties {

	//
	// ```lang
	//
	// ```
	//

	const first = '\n\n```' + lang + '\n';
	const second = '\n```\n\n';
	return insert(props, first, second);

}

export function addIncreaseIndent(props: TextareaProperties): TextareaProperties {

	return tab(props, '  ');

}

export function addDecreaseIndent(props: TextareaProperties): TextareaProperties {

	return shiftTab(props, '  ');

}

export function addImage(props: TextareaProperties, base64: string): TextareaProperties {

	return {

		...props,
		value: `\n![base64-image](${base64})\n`

	}

}

export function addBlockquote(props: TextareaProperties, type?: 'warning' | 'note' | 'tip' | 'important' | 'caution'): TextareaProperties {

	if (type) {

		//
		// > [!type]
		// >
		//

		const first = `\n\n> [!${type}]\n> `;
		const second = '\n\n';
		return insert(props, first, second);

	}

	//
	// >
	//

	const first = `\n\n> `;
	const second = '\n\n';
	return insert(props, first, second);

}

function wrap(props: TextareaProperties, text: string): TextareaProperties {

	/*

	lore<selelectionStart>m ip<selectionEnd>sum

	↓↓↓↓↓ becomes ↓↓↓↓↓

	lore${text}<selelectionStart>m ip<selectionEnd>${text}sum

	*/

	const { value, selectionStart, selectionEnd } = props;

	const textStart = value.substring(0, selectionStart);
	const textMiddle = value.substring(selectionStart, selectionEnd);
	const textEnd = value.substring(selectionEnd);

	const selection = selectionStart + text.length;
	return {

		value: textStart + text + textMiddle + text + textEnd,
		selectionStart: selection,
		selectionEnd: selection

	};

}

function insert(props: TextareaProperties, first: string, second: string = ''): TextareaProperties {

	/*

	lorem ip<cursor>sum

	↓↓↓↓↓ becomes ↓↓↓↓↓

	lorem ip${first}<cursor>${second}sum

	*/

	const { value, selectionStart, selectionEnd } = props;

	const textStart = value.substring(0, selectionStart);
	const textEnd = value.substring(selectionEnd);

	const selStart = selectionStart + first.length;
	return {

		value: textStart + first + second + textEnd,
		selectionStart: selStart,
		selectionEnd: selStart

	};

}

function startIndexOfCurrentLine(value: string, selectionStart: number): number {

	const c = value.substring(0, selectionStart);
	const idx = c.lastIndexOf('\n') + 1;
	return idx;

}

function endIndexOfCurrentLine(value: string, selectionEnd: number): number {

	let idxLineEnd = value.indexOf('\n', selectionEnd);
	if (idxLineEnd === -1)
		idxLineEnd = value.length;

	return idxLineEnd;

}

function wrapEachWord(props: TextareaProperties, CHAR: string): TextareaProperties {

	/*

	lore<selelectionStart>m ip<selectionEnd>sum

	↓↓↓↓↓ becomes ↓↓↓↓↓

	lore^<selelectionStart>m^ ^ip<selectionEnd>^sum

	*/

	const { value, selectionStart, selectionEnd } = props;

	if (selectionStart === selectionEnd)
		return props;

	const textStart = value.substring(0, selectionStart);
	const textMiddle = value.substring(selectionStart, selectionEnd);
	const textEnd = value.substring(selectionEnd);

	const newTextMiddle = textMiddle.split(' ').map(s => s.trim() === '' ? s : CHAR + s + CHAR).join(' ');

	const lengthOld = textMiddle.length;
	const lengthNew = newTextMiddle.length;

	let startShifts = 0;
	let endShifts = 0;

	if (lengthOld !== lengthNew) { // no change?

		startShifts = newTextMiddle.startsWith(CHAR) ? 1 : 0;
		endShifts = lengthNew - lengthOld - 1;

	}

	return {

		value: textStart + newTextMiddle + textEnd,
		selectionStart: selectionStart + startShifts,
		selectionEnd: selectionEnd + endShifts

	};

}

export class History {

	stack: WritableSignal<string[]> = signal(['']);
	idx: WritableSignal<number> = signal(0);

	canUndo: Signal<boolean> = computed(() => this.idx() > 0);
	canRedo: Signal<boolean> = computed(() => this.idx() < this.stack().length - 1);
	content: Signal<string> = computed(() => this.stack()[this.idx()]);
	size: Signal<number> = computed(() => this.content().length);
	sizeFormatted = computed(() => `${formatBytes(this.size())} / ${formatBytes(this.stack().reduce((t, a) => t + a.length, 0))} (${this.stack().length})`);

	saveState(content: string = '', replaceCurrent: boolean = false): void {

		if (content === this.content())
			return;

		const arr = [...this.stack().slice(0, this.idx() + 1)]; // clears redo-cache (right-side of index)
		if (!replaceCurrent) // mainly for replacing initial empty string (after content is loaded from IndexedDb)
			this.incIdx();
		arr[this.idx()] = content;
		this.stack.set(arr);
		// console.log(this.idx(), this.stack());

	}

	undo(): void {

		if (this.canUndo())
			this.decIdx();
		// console.log(this.idx(), this.stack());


	}

	redo(): void {

		if (this.canRedo())
			this.incIdx();
		// console.log(this.idx(), this.stack());

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

/*
export class History {

	stack: string[] = [''];
	idx: number = 0;

	canUndo: WritableSignal<boolean> = signal(false);
	canRedo: WritableSignal<boolean> = signal(false);

	saveState(content: string = ''): void {

		this.stack[this.idx] = content;
		this.incIdx();
		this.stack.length = this.idx;
		this.canUndo.set(true);
		this.canRedo.set(false);

		console.log(this.idx, this.stack);

	}

	undo(): string | null {

		this.decIdx();
		if (this.idx === 0) {
			this.canUndo.set(false);
			return null;
		}
		this.canRedo.set(true);
		return this.stack[this.idx];

	}

	redo(): string | null {

		this.incIdx();
		if (this.idx === this.stack.length) {
			this.canRedo.set(false);
			return null;
		}
		this.canUndo.set(true);
		return this.stack[this.idx];

	}

	private incIdx(): void {

		if (this.idx < this.stack.length)
			this.idx += 1;

	}

	private decIdx(): void {

		if (this.idx > 0)
			this.idx -= 1;

	}

}


*/
