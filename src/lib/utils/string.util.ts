export function maskOrHighlight(sentence: string, word: string, askWord: boolean, useWordBoundary: boolean = false): string {

	const maskedWord = askWord ? `<mark>${word}</mark>` : '***';
	const maskedIngWord = askWord ? `<mark>${word.slice(0, -1)}ing</mark>` : '***ing';

	// .: Matches any single character except newline.
	// *: Matches 0 or more of the preceding element.
	// +: Matches 1 or more of the preceding element.
	// ?: Matches 0 or 1 of the preceding element.
	// ^: Matches the beginning of a line or string.
	// $: Matches the end of a line or string.
	// []: Denotes a character class.
	// (): Denotes a capturing group.
	// {}: Denotes a quantifier for the preceding element.
	// |: Denotes an alternation (logical OR).
	// \: Used to escape special characters.
	//
	// wihtout escaping e.g. '$5.00' would not be replaced correctly
	const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

	let regex;
	if (useWordBoundary) {

		// Using word boundary (\\b):
		// if word is 'space' then 'spaceship' -> 'spaceship'
		regex = new RegExp(`\\b${escapedWord}\\b|\\b${escapedWord.slice(0, -1)}ing\\b`, 'gi');

	} else {

		// Not using word boundary:
		// if word is 'space' then 'spaceship' -> '***ship'
		regex = new RegExp(`${escapedWord}|${escapedWord.slice(0, -1)}ing`, 'gi');

	}
	return sentence.replace(regex, (match) => {
		return match.toLowerCase().endsWith('ing') ? maskedIngWord : maskedWord;
	});

}

export function standardizeQuotes(inputText: string): string {

	// /^abc/ matches “abc” only if it appears at the beginning of the string.
	const cleanedStart = inputText.replace(/^['"‘’“”‘’]/, '');

	// /xyz$/ matches “xyz” only if it appears at the end of the string.
	const cleanedEnd = cleanedStart.replace(/['"‘’“”‘’]$/, '');

	// Wrap the cleaned text in standard double quotes
	const standardizedText = `“${cleanedEnd}”`;

	return standardizedText;

}
