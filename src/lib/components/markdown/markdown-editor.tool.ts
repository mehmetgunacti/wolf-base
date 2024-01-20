const NL = '\n';
const TAB = ' '.repeat(4); // 4 spaces instead of '\t'

export interface TextareaProperties {

	value: string;
	selectionStart: number;
	selectionEnd: number;

}

export function tab(props: TextareaProperties): TextareaProperties {

	const { value, selectionStart, selectionEnd } = props;

	// Selection is multi-line?
	if (value.substring(selectionStart, selectionEnd).indexOf(NL) > -1) {

		// shift all selected lines
		const lastPiece = value.substring(selectionEnd);
		const startIdx = startIndexOfCurrentLine(value, selectionStart);
		const selection = value.substring(startIdx, selectionEnd);
		const newSelection = TAB + selection.replaceAll(NL, NL + TAB);
		const shift = newSelection.length - selection.length;

		const result = value.substring(0, startIdx) + newSelection + lastPiece;

		return {

			value: result,
			selectionStart: selectionStart,
			selectionEnd: selectionEnd + shift

		};

	}

	// Insert TAB at the cursor's position
	const result = value.substring(0, selectionStart) + TAB + value.substring(selectionStart);

	return {

		value: result,
		selectionStart: selectionStart + TAB.length,
		selectionEnd: selectionEnd + TAB.length

	};

}

function hasTabAfterNewlines(s: string): boolean {

	let lines = s.split(NL);
	for (let i = 0; i < lines.length; i++)
		if (lines[i].endsWith(NL) && !lines[i + 1]?.startsWith(TAB))
			return false;
	return true;

}

export function shiftTab(props: TextareaProperties): TextareaProperties {

	const { value, selectionStart, selectionEnd } = props;

	// Selection is multi-line?
	if (value.substring(selectionStart, selectionEnd).indexOf(NL) > -1) {

		// shift all selected lines
		const lastPiece = value.substring(selectionEnd);
		const startIdx = startIndexOfCurrentLine(value, selectionStart);

		const piece = value.substring(startIdx, selectionEnd);

		if (piece.startsWith(TAB) && hasTabAfterNewlines(piece)) {

			const newPiece = piece.substring(TAB.length).replaceAll(NL + TAB, NL);
			const result = value.substring(0, startIdx) + newPiece + lastPiece;
			const shift = piece.length - newPiece.length;

			return {

				value: result,
				selectionStart: selectionStart,
				selectionEnd: selectionEnd - shift

			};

		} else
			return props;

	}

	let startPiece = value.substring(0, selectionStart);
	if (startPiece.endsWith(TAB))
		startPiece = value.substring(0, selectionStart - TAB.length);
	else
		return props;

	// remove TAB at the cursor's position
	const result = startPiece + value.substring(startPiece.length + TAB.length);

	return {

		value: result,
		selectionStart: selectionStart - TAB.length,
		selectionEnd: selectionEnd - TAB.length

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
	output += newLine;

	return insert(props, output);

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

	const s = '_';
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

	const { value, selectionStart, selectionEnd } = props;
	const INDENT = '  ';

	const startIdx = startIndexOfCurrentLine(value, selectionStart);
	const result = value.substring(0, startIdx) + INDENT + value.substring(startIdx);

	return {

		value: result,
		selectionStart: selectionStart + INDENT.length,
		selectionEnd: selectionEnd + INDENT.length

	};

}

export function addDecreaseIndent(props: TextareaProperties): TextareaProperties {

	const { value, selectionStart, selectionEnd } = props;
	const INDENT = '  ';
	const SPACE = ' ';

	let shift = 0;
	let startIdx = startIndexOfCurrentLine(value, selectionStart);
	const startPiece = value.substring(0, startIdx);

	let endPiece = value.substring(startIdx);
	if (endPiece.startsWith(INDENT)) {

		endPiece = value.substring(startIdx + INDENT.length);
		shift = INDENT.length;

	} else if (endPiece.startsWith(SPACE)) {

		endPiece = value.substring(startIdx + SPACE.length);
		shift = SPACE.length;

	}

	const result = startPiece + endPiece;
	return {

		value: result,
		selectionStart: selectionStart - shift,
		selectionEnd: selectionEnd - shift

	};

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
