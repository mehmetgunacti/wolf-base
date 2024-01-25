import { TextareaProperties } from './textarea-properties.model';

const CR = '\r';
const NL = '\n';
const SPACE = ' ';
const TAB_T = '\t';
const TAB = SPACE.repeat(4); // 4 spaces instead of '\t'
const EMPTY = '';

function isSelection(props: TextareaProperties): boolean {

	const { selectionStart, selectionEnd } = props;
	return selectionStart !== selectionEnd;

}

function startIndexOfCurrentLine(props: TextareaProperties): number {

	const { value, selectionStart } = props;
	const c = value.substring(0, selectionStart);
	const idx = c.lastIndexOf('\n') + 1;
	return idx;

}

function isPrevChar(props: TextareaProperties, ...chars: string[]): boolean {

	const { value, selectionStart } = props;
	return chars.includes(value.charAt(selectionStart - 1));

}

function isNextChar(props: TextareaProperties, ...chars: string[]): boolean {

	const { value, selectionEnd } = props;
	return chars.includes(value.charAt(selectionEnd + 1));

}

function isStart(props: TextareaProperties): boolean {

	const { selectionStart } = props;
	return selectionStart === 0;

}

function isEnd(props: TextareaProperties): boolean {

	const { value, selectionEnd } = props;
	return selectionEnd === value.length;

}

function findPrevIdx(props: TextareaProperties, ...chars: string[]): number {

	const { value, selectionStart } = props;
	const piece = value.substring(0, selectionStart);
	return Math.max(...chars.map(c => piece.lastIndexOf(c)));

}

function findNextIdx(props: TextareaProperties, ...chars: string[]): number {

	const { value, selectionEnd } = props;
	const piece = value.substring(selectionEnd);

	const idx = Math.min(...chars.map(
		c => {
			const idx = piece.indexOf(c);
			return idx < 0 ? piece.length : idx
		})
	);
	return value.substring(0, selectionEnd).length + idx;

}

function findWordIndexes(props: TextareaProperties): [number, number] {

	return [
		findPrevIdx(props, SPACE, TAB_T, NL, CR) + 1,
		findNextIdx(props, SPACE, TAB_T, NL, CR)
	];

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

	return {

		value: textStart + text + textMiddle + text + textEnd,
		selectionStart: selectionStart + text.length,
		selectionEnd: selectionEnd + text.length

	};

}

export class ButtonActions {

	addBold({ value, selectionStart, selectionEnd }: TextareaProperties): TextareaProperties {

		const s = '**';
		const props = { value, selectionStart, selectionEnd };

		if (isSelection(props))
			return wrap(props, s);

		const [startIdx, endIdx] = findWordIndexes({ value, selectionStart, selectionEnd });
		const result: TextareaProperties = {
			value,
			selectionStart: startIdx,
			selectionEnd: endIdx
		};
		return wrap(result, s);

	}

	addItalic(props: TextareaProperties): TextareaProperties {

		const s = '*';
		return wrap(props, s);

	}

	addStrikethrough(props: TextareaProperties): TextareaProperties {

		const s = '~~';
		return wrap(props, s);

	}

	tab(props: TextareaProperties, tabString: string = TAB): TextareaProperties {

		const { value, selectionStart, selectionEnd } = props;

		// Selection is multi-line?
		if (value.substring(selectionStart, selectionEnd).indexOf(NL) > -1) {

			// shift all selected lines
			const lastPiece = value.substring(selectionEnd);
			const startIdx = startIndexOfCurrentLine(props);
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

	private hasTabAfterNewlines(s: string): boolean {

		let lines = s.split(NL);
		for (let i = 0; i < lines.length; i++)
			if (lines[i].endsWith(NL) && !lines[i + 1]?.startsWith(TAB))
				return false;
		return true;

	}

	shiftTab(props: TextareaProperties, tabString: string = TAB): TextareaProperties {

		const { value, selectionStart, selectionEnd } = props;

		// Selection is multi-line?
		if (value.substring(selectionStart, selectionEnd).indexOf(NL) > -1) {

			// shift all selected lines
			const lastPiece = value.substring(selectionEnd);
			const startIdx = startIndexOfCurrentLine(props);

			const piece = value.substring(startIdx, selectionEnd);

			if (piece.startsWith(tabString) && this.hasTabAfterNewlines(piece)) {

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

	addEmptyTask(props: TextareaProperties): TextareaProperties {

		const s = '\n- [ ] ';
		return this.insert(props, s);

	}

	addToc(props: TextareaProperties): TextareaProperties {

		const s = '\n\n${toc}\n\n';
		return this.insert(props, s);

	}

	addTable(props: TextareaProperties, [col, row]: [number, number]): TextareaProperties {

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

	private addClass(props: TextareaProperties, s: string): TextareaProperties {

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

		const idxLineStart = startIndexOfCurrentLine(props);
		const idxLineEnd = this.endIndexOfCurrentLine(value, selectionEnd);

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

	addAlignCenter(props: TextareaProperties): TextareaProperties {

		return this.addClass(props, '{.text-align-center}');

	}

	addAlignRight(props: TextareaProperties): TextareaProperties {

		return this.addClass(props, '{.text-align-right}');

	}

	addAlignJustify(props: TextareaProperties): TextareaProperties {

		return this.addClass(props, '{.text-align-justify}');

	}

	addHeading(props: TextareaProperties, heading: string): TextareaProperties {

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
		return this.insert(props, first, second);

	}

	addSub(props: TextareaProperties): TextareaProperties {

		const CHAR = '~';
		return this.wrapEachWord(props, CHAR);

	}

	addSup(props: TextareaProperties): TextareaProperties {

		const CHAR = '^';
		return this.wrapEachWord(props, CHAR);

	}

	addListBulleted(props: TextareaProperties): TextareaProperties {

		const s = '\n\n+ a\n+ b\n  - c\n    * d\n\n';
		return this.insert(props, s);

	}

	addListNumbered(props: TextareaProperties): TextareaProperties {

		const s = '\n\n1. a\n1. b\n1. c\n  1. d\n\n';
		return this.insert(props, s);

	}

	addHighlight(props: TextareaProperties): TextareaProperties {

		const s = '==';
		return wrap(props, s);

	}

	addInlineCode(props: TextareaProperties): TextareaProperties {

		const s = '`';
		return wrap(props, s);

	}

	addCodeBlock(props: TextareaProperties, lang: string = ''): TextareaProperties {

		//
		// ```lang
		//
		// ```
		//

		const first = '\n\n```' + lang + '\n';
		const second = '\n```\n\n';
		return this.insert(props, first, second);

	}

	addIncreaseIndent(props: TextareaProperties): TextareaProperties {

		return this.tab(props, '  ');

	}

	addDecreaseIndent(props: TextareaProperties): TextareaProperties {

		return this.shiftTab(props, '  ');

	}

	addImage(props: TextareaProperties, base64: string): TextareaProperties {

		return {

			...props,
			value: `\n![base64-image](${base64})\n`

		}

	}

	addBlockquote(props: TextareaProperties, type?: 'warning' | 'note' | 'tip' | 'important' | 'caution'): TextareaProperties {

		if (type) {

			//
			// > [!type]
			// >
			//

			const first = `\n\n> [!${type}]\n> `;
			const second = '\n\n';
			return this.insert(props, first, second);

		}

		//
		// >
		//

		const first = `\n\n> `;
		const second = '\n\n';
		return this.insert(props, first, second);

	}

	private insert(props: TextareaProperties, first: string, second: string = ''): TextareaProperties {

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

	private endIndexOfCurrentLine(value: string, selectionEnd: number): number {

		let idxLineEnd = value.indexOf('\n', selectionEnd);
		if (idxLineEnd === -1)
			idxLineEnd = value.length;

		return idxLineEnd;

	}

	private wrapEachWord(props: TextareaProperties, CHAR: string): TextareaProperties {

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

}
