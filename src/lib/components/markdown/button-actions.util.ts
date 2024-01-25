import { EditorProperties, extractProps } from './textarea-properties.model';

const CR = '\r';
const NL = '\n';
const SPACE = ' ';
const TAB_T = '\t';
const TAB = SPACE.repeat(4); // 4 spaces instead of '\t'
const EMPTY = '';

function isSelection({ sIndex, eIndex }: EditorProperties): boolean {

	return sIndex !== eIndex;

}

function startIndexOfCurrentLine({ content, sIndex }: EditorProperties): number {

	const c = content.substring(0, sIndex);
	const idx = c.lastIndexOf('\n') + 1;
	return idx;

}

function hasTabAfterNewlines(s: string): boolean {

	let lines = s.split(NL);
	for (let i = 0; i < lines.length; i++)
		if (lines[i].endsWith(NL) && !lines[i + 1]?.startsWith(TAB))
			return false;
	return true;

}

// function isPrevChar({ content, sIndex }: TextareaProperties, ...chars: string[]): boolean {

// 	return chars.includes(content.charAt(sIndex - 1));

// }

// function isNextChar({ content, eIndex }: TextareaProperties, ...chars: string[]): boolean {

// 	return chars.includes(content.charAt(eIndex + 1));

// }

// function isStart({ sIndex }: TextareaProperties): boolean {

// 	return sIndex === 0;

// }

function isEnd(element: HTMLTextAreaElement): boolean {

	const { value, selectionEnd } = element;
	return selectionEnd === value.length;

}

function findPrevIdx({ content, sIndex }: EditorProperties, ...chars: string[]): number {

	const piece = content.substring(0, sIndex);
	return Math.max(...chars.map(c => piece.lastIndexOf(c)));

}

function findNextIdx({ content, eIndex }: EditorProperties, ...chars: string[]): number {

	const piece = content.substring(eIndex);
	const idx = Math.min(...chars.map(
		c => {
			const idx = piece.indexOf(c);
			return idx < 0 ? piece.length : idx
		})
	);
	return content.substring(0, eIndex).length + idx;

}

function findWordIndexes(props: EditorProperties): [number, number] {

	return [
		findPrevIdx(props, SPACE, TAB_T, NL, CR) + 1,
		findNextIdx(props, SPACE, TAB_T, NL, CR)
	];

}

function insert(props: EditorProperties, first: string, second: string = ''): EditorProperties {

	/*

	lorem ip<cursor>sum

	↓↓↓↓↓ becomes ↓↓↓↓↓

	lorem ip${first}<cursor>${second}sum

	*/

	const { content, sIndex, eIndex } = props;

	const textStart = content.substring(0, sIndex);
	const textEnd = content.substring(eIndex);

	const selStart = sIndex + first.length;
	return {

		content: textStart + first + second + textEnd,
		sIndex: selStart,
		eIndex: selStart

	};

}

function endIndexOfCurrentLine(value: string, selectionEnd: number): number {

	let idxLineEnd = value.indexOf('\n', selectionEnd);
	if (idxLineEnd === -1)
		idxLineEnd = value.length;

	return idxLineEnd;

}

function wrapEachWord(props: EditorProperties, CHAR: string): EditorProperties {

	/*

	lore<selelectionStart>m ip<selectionEnd>sum

	↓↓↓↓↓ becomes ↓↓↓↓↓

	lore^<selelectionStart>m^ ^ip<selectionEnd>^sum

	*/

	const { content, sIndex, eIndex } = props;

	if (sIndex === eIndex)
		return props;

	const textStart = content.substring(0, sIndex);
	const textMiddle = content.substring(sIndex, eIndex);
	const textEnd = content.substring(eIndex);

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

		content: textStart + newTextMiddle + textEnd,
		sIndex: sIndex + startShifts,
		eIndex: eIndex + endShifts

	};

}

function addClass(props: EditorProperties, s: string): EditorProperties {

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

	const { content, sIndex, eIndex } = props;

	const idxLineStart = startIndexOfCurrentLine(props);
	const idxLineEnd = endIndexOfCurrentLine(content, eIndex);

	const textStart = content.substring(0, idxLineStart);
	const textMiddle = content.substring(idxLineStart, idxLineEnd);
	const textEnd = content.substring(idxLineEnd);

	if (textMiddle.endsWith(s))
		return props;

	const result = textStart + NL + textMiddle + s + NL + textEnd;
	return {

		content: result,
		sIndex: sIndex + 1, // 1 NL added
		eIndex: eIndex + 1 // 1 NL added

	};

}

function wrap({ content, sIndex, eIndex }: EditorProperties, text: string): EditorProperties {

	/*

	lore<selelectionStart>m ip<selectionEnd>sum

	↓↓↓↓↓ becomes ↓↓↓↓↓

	lore${text}<selelectionStart>m ip<selectionEnd>${text}sum

	*/

	const props: EditorProperties = { content, sIndex, eIndex };
	if (!isSelection(props)) {

		const [startIdx, endIdx] = findWordIndexes(props);
		sIndex = startIdx;
		eIndex = endIdx;

	}

	const textStart = content.substring(0, sIndex);
	const textMiddle = content.substring(sIndex, eIndex);
	const textEnd = content.substring(eIndex);

	return {

		content: textStart + text + textMiddle + text + textEnd,
		sIndex: sIndex + text.length,
		eIndex: eIndex + text.length

	};

}

export class ButtonActions {

	addBold(element: HTMLTextAreaElement): EditorProperties {

		const s = '**';
		return wrap(extractProps(element), s);

	}

	addItalic(element: HTMLTextAreaElement): EditorProperties {

		const s = '*';
		return wrap(extractProps(element), s);

	}

	addStrikethrough(element: HTMLTextAreaElement): EditorProperties {

		const s = '~~';
		return wrap(extractProps(element), s);

	}

	tab(element: HTMLTextAreaElement, tabString: string = TAB): EditorProperties {

		const props: EditorProperties = extractProps(element);
		const { content, sIndex, eIndex } = props;

		// Selection is multi-line?
		if (content.substring(sIndex, eIndex).indexOf(NL) > -1) {

			// shift all selected lines
			const lastPiece = content.substring(eIndex);
			const startIdx = startIndexOfCurrentLine(props);
			const selection = content.substring(startIdx, eIndex);
			const newSelection = tabString + selection.replaceAll(NL, NL + tabString);
			const shift = newSelection.length - selection.length;

			const result = content.substring(0, startIdx) + newSelection + lastPiece;

			return {

				content: result,
				sIndex: startIdx,
				eIndex: eIndex + shift

			};

		}

		// Insert TAB at the cursor's position
		const result = content.substring(0, sIndex) + tabString + content.substring(sIndex);

		return {

			content: result,
			sIndex: sIndex + tabString.length,
			eIndex: eIndex + tabString.length

		};

	}

	shiftTab(element: HTMLTextAreaElement, tabString: string = TAB): EditorProperties {

		const props: EditorProperties = extractProps(element);
		const { content, sIndex, eIndex } = props;

		// Selection is multi-line?
		if (content.substring(sIndex, eIndex).indexOf(NL) > -1) {

			// shift all selected lines
			const lastPiece = content.substring(eIndex);
			const startIdx = startIndexOfCurrentLine(props);

			const piece = content.substring(startIdx, eIndex);

			if (piece.startsWith(tabString) && hasTabAfterNewlines(piece)) {

				const newPiece = piece.substring(tabString.length).replaceAll(NL + tabString, NL);
				const result = content.substring(0, startIdx) + newPiece + lastPiece;
				const shift = piece.length - newPiece.length;

				return {

					content: result,
					sIndex: startIdx,
					eIndex: eIndex - shift

				};

			} else
				return props;

		}

		let startPiece = content.substring(0, sIndex);
		if (startPiece.endsWith(tabString))
			startPiece = content.substring(0, sIndex - tabString.length);
		else
			return props;

		// remove TAB at the cursor's position
		const result = startPiece + content.substring(startPiece.length + tabString.length);

		return {

			content: result,
			sIndex: sIndex - tabString.length,
			eIndex: eIndex - tabString.length

		};

	}

	addEmptyTask(element: HTMLTextAreaElement): EditorProperties {

		const s = '\n- [ ] ';
		return insert(extractProps(element), s);

	}

	addToc(element: HTMLTextAreaElement): EditorProperties {

		const s = '\n\n${toc}\n\n';
		return insert(extractProps(element), s);

	}

	addTable(element: HTMLTextAreaElement, [col, row]: [number, number]): EditorProperties {

		const newLine = NL;
		const { content, sIndex, eIndex } = extractProps(element);

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

		const firstPiece = content.substring(0, sIndex);
		const lastPiece = content.substring(sIndex)

		const result = firstPiece + output + (lastPiece.startsWith(newLine) ? '' : newLine) + lastPiece;
		const cursor = sIndex + 4; // set the cursor at center of 1st cell of header row
		return {

			content: result,
			sIndex: cursor,
			eIndex: cursor

		};

	}

	addAlignCenter(element: HTMLTextAreaElement): EditorProperties {

		return addClass(extractProps(element), '{.text-align-center}');

	}

	addAlignRight(element: HTMLTextAreaElement): EditorProperties {

		return addClass(extractProps(element), '{.text-align-right}');

	}

	addAlignJustify(element: HTMLTextAreaElement): EditorProperties {

		return addClass(extractProps(element), '{.text-align-justify}');

	}

	addHeading(element: HTMLTextAreaElement, heading: string): EditorProperties {

		//
		// ${heading}
		//
		const first = `\n\n${heading} `;
		const second = '\n\n';

		const props: EditorProperties = extractProps(element);
		const { content, sIndex, eIndex } = props;

		if (isSelection(props)) {

			const firstPiece = content.substring(0, sIndex);
			const middlePiece = content.substring(sIndex, eIndex);
			const lastPiece = content.substring(eIndex);

			const result = firstPiece + first + middlePiece + second + lastPiece;

			return {

				content: result,
				sIndex: sIndex + first.length,
				eIndex: eIndex + first.length

			};

		}
		return insert(props, first, second);

	}

	addSub(element: HTMLTextAreaElement): EditorProperties {

		const CHAR = '~';
		return wrapEachWord(extractProps(element), CHAR);

	}

	addSup(element: HTMLTextAreaElement): EditorProperties {

		const CHAR = '^';
		return wrapEachWord(extractProps(element), CHAR);

	}

	addListBulleted(element: HTMLTextAreaElement): EditorProperties {

		const s = '\n\n+ a\n+ b\n  - c\n    * d\n\n';
		return insert(extractProps(element), s);

	}

	addListNumbered(element: HTMLTextAreaElement): EditorProperties {

		const s = '\n\n1. a\n1. b\n1. c\n  1. d\n\n';
		return insert(extractProps(element), s);

	}

	addHighlight(element: HTMLTextAreaElement): EditorProperties {

		const s = '==';
		return wrap(extractProps(element), s);

	}

	addInlineCode(element: HTMLTextAreaElement): EditorProperties {

		const s = '`';
		return wrap(extractProps(element), s);

	}

	addCodeBlock(element: HTMLTextAreaElement, lang: string = ''): EditorProperties {

		//
		// ```lang
		//
		// ```
		//

		const first = '\n\n```' + lang + '\n';
		const second = '\n```\n\n';
		return insert(extractProps(element), first, second);

	}

	addIncreaseIndent(element: HTMLTextAreaElement): EditorProperties {

		return this.tab(element, '  ');

	}

	addDecreaseIndent(element: HTMLTextAreaElement): EditorProperties {

		return this.shiftTab(element, '  ');

	}

	addImage(element: HTMLTextAreaElement, base64: string): EditorProperties {

		return {

			...extractProps(element),
			content: `\n![base64-image](${base64})\n`

		}

	}

	addBlockquote(element: HTMLTextAreaElement, type?: 'warning' | 'note' | 'tip' | 'important' | 'caution'): EditorProperties {

		if (type) {

			//
			// > [!type]
			// >
			//

			const first = `\n\n> [!${type}]\n> `;
			const second = '\n\n';
			return insert(extractProps(element), first, second);

		}

		//
		// >
		//

		const first = `\n\n> `;
		const second = '\n\n';
		return insert(extractProps(element), first, second);

	}

}
