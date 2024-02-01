import { EditorProperties, extractProps } from './textarea-properties.model';

const CR = '\r';
const NL = '\n';
const SPACE = ' ';
const TAB_T = '\t';
const TAB = '\t'; // tab-size : 4; <-- css of textarea
const INDENT = SPACE.repeat(2);
export const TASK_EMPTY = '- [ ] ';
export const TASK_COMPL = '- [x] ';

function isSelection({ sIndex, eIndex }: EditorProperties): boolean {

	return sIndex !== eIndex;

}

function isSelectionMultiLine({ content, sIndex, eIndex }: EditorProperties): boolean {

	return content.substring(sIndex, eIndex).indexOf(NL) > -1;

}

export function lineStartsWith(props: EditorProperties, prefixes: string[]): string {

	const { content } = props;
	const line = content.substring(startIndexOfCurrentLine(props));
	for (const pre of prefixes)
		if (line.startsWith(pre))
			return line.substring(pre.length, line.indexOf(NL));
	return '';

}

export function currentLine(props: EditorProperties): string {

	const { content } = props;
	const line = content.substring(startIndexOfCurrentLine(props));
	const lineEnd = line.indexOf(NL);
	return line.substring(0, lineEnd < 0 ? line.length : lineEnd);

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

function extractLineStartIndexes(props: EditorProperties): number[] {

	const { content, eIndex } = props;
	const firstIdx = startIndexOfCurrentLine(props);
	const piece = content.substring(firstIdx, eIndex);
	const list = [firstIdx];
	let idx = -1;
	while (++idx < piece.length)
		if (piece.charAt(idx) === NL)
			list.unshift(idx + firstIdx + 1);
	return list;

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

function insertCharsAt(props: EditorProperties, c: string, idx?: number): EditorProperties {

	const { content, sIndex, eIndex } = props;
	const insertAt: number = idx ?? sIndex;
	return {

		content: content.substring(0, insertAt) + c + content.substring(insertAt),
		sIndex: sIndex + c.length,
		eIndex: eIndex + c.length

	};

}

function removeCharsAt(props: EditorProperties, c: string, idx?: number): EditorProperties {

	const { content, sIndex, eIndex } = props;
	const removeAt: number = idx ?? sIndex;

	let startPiece = content.substring(0, removeAt);
	if (startPiece.endsWith(c))
		startPiece = content.substring(0, removeAt - c.length);
	else
		return props;

	const result = startPiece + content.substring(removeAt);
	return {

		content: result,
		sIndex: sIndex - c.length,
		eIndex: eIndex - c.length

	};

}

export function removeCurrentLine(props: EditorProperties): EditorProperties {

	const { content } = props;
	const lineIdx = startIndexOfCurrentLine(props);
	const first = content.substring(0, lineIdx);
	const rest = content.substring(lineIdx);
	const nextNL = rest.indexOf(NL);
	const result = first + (nextNL < 0 ? '' : rest.substring(nextNL));
	return {
		...props,
		content: result
	}

}

function startIndexOfCurrentLine({ content, sIndex }: EditorProperties): number {

	const c = content.substring(0, sIndex);
	const idx = c.lastIndexOf(NL) + 1;
	return idx;

}

function endIndexOfCurrentLine({ content, eIndex }: EditorProperties): number {

	let idx = content.indexOf(NL, eIndex);
	if (idx < 0)
		idx = content.length;
	return idx;

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
	const idxLineEnd = endIndexOfCurrentLine(props);

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

function wrap({ content, sIndex, eIndex }: EditorProperties, pre: string, post?: string): EditorProperties {

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

		content: textStart + pre + textMiddle + (post ?? pre) + textEnd,
		sIndex: sIndex + pre.length,
		eIndex: eIndex + pre.length

	};

}

function shiftSelectionRight(props: EditorProperties, c: string): EditorProperties {

	const { content, sIndex, eIndex } = props;

	let tmp = content;
	const indexes = extractLineStartIndexes(props);
	indexes.forEach(idx => {

		tmp = tmp.substring(0, idx) + c + tmp.substring(idx);

	});
	return {
		content: tmp,
		sIndex: sIndex + c.length,
		eIndex: eIndex + indexes.length * c.length
	}

}

function shiftSelectionLeft(props: EditorProperties, c: string): EditorProperties {

	const { content, sIndex, eIndex } = props;

	let tmp = content;
	const indexes = extractLineStartIndexes(props);
	indexes.forEach(idx => {

		const c1 = tmp.substring(idx);
		if (c1.startsWith(c))
			tmp = tmp.substring(0, idx) + c1.substring(c.length);

	});
	const shift = content.length - tmp.length;
	return {
		content: tmp,
		sIndex: sIndex - (content.substring(indexes[indexes.length - 1]).startsWith(c) ? c.length : 0),
		eIndex: eIndex - shift
	}

}

function shiftLineRight(props: EditorProperties, c: string): EditorProperties {

	const { content, sIndex, eIndex } = props;

	const startIdx = startIndexOfCurrentLine(props);
	const firstPiece = content.substring(0, startIdx);
	const rest = content.substring(startIdx);
	const result: EditorProperties = {

		content: firstPiece + INDENT + rest,
		sIndex: sIndex + INDENT.length,
		eIndex: eIndex + INDENT.length

	};
	return result;

}

function shiftLineLeft(props: EditorProperties, c: string): EditorProperties {

	const { content, sIndex, eIndex } = props;

	const startIdx = startIndexOfCurrentLine(props);
	const firstPiece = content.substring(0, startIdx);
	const rest = content.substring(startIdx);
	const result: EditorProperties = {

		content: firstPiece + INDENT + rest,
		sIndex: sIndex + INDENT.length,
		eIndex: eIndex + INDENT.length

	};
	return result;

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

	tab(element: HTMLTextAreaElement): EditorProperties {

		const props: EditorProperties = extractProps(element);

		if (isSelectionMultiLine(props))
			return shiftSelectionRight(props, TAB);

		return insertCharsAt(props, TAB);

	}

	shiftTab(element: HTMLTextAreaElement): EditorProperties {

		const props: EditorProperties = extractProps(element);
		if (isSelectionMultiLine(props))
			return shiftSelectionLeft(props, TAB);

		return removeCharsAt(props, TAB);

	}

	increaseIndent(element: HTMLTextAreaElement): EditorProperties {

		const props: EditorProperties = extractProps(element);

		if (isSelectionMultiLine(props))
			return shiftSelectionRight(props, INDENT);

		return shiftLineRight(props, INDENT);

	}

	decreaseIndent(element: HTMLTextAreaElement): EditorProperties {

		const props: EditorProperties = extractProps(element);
		if (isSelectionMultiLine(props))
			return shiftSelectionLeft(props, INDENT);

		return removeCharsAt(props, INDENT);

	}

	addEmptyTask(element: HTMLTextAreaElement): EditorProperties {

		const s = NL + TASK_EMPTY;
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
		return wrap(extractProps(element), first, second);

	}

	addImage(element: HTMLTextAreaElement, base64: string): EditorProperties {

		console.log('addImage');

		const first = `\n![base64-image](${base64})\n`;
		return insert(extractProps(element), first);

	}

	addBlockquote(element: HTMLTextAreaElement, type?: 'warning' | 'note' | 'tip' | 'important' | 'caution'): EditorProperties {

		//
		// > [!type]	<-- with type
		// >
		//

		//
		// >			<-- without type
		//

		const first = type ? `\n\n> [!${type}]\n> ` : `\n\n> `;
		const second = '\n\n';
		return wrap(extractProps(element), first, second);

	}

}
