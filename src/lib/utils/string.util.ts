export function maskOrHighlight(sentence: string, word: string, askWord: boolean, useWordBoundary: boolean = false): string {

	const maskedWord = askWord ? `<mark>${word}</mark>` : '***';

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

	if (useWordBoundary) {

		// To word boundary or not to word boundary, that's the question:
		//
		// Using word boundary (\\b):
		// if word is 'space' then 'spaceship' -> 'spaceship'
		const regex = new RegExp(`\\b${escapedWord}\\b`, 'gi');
		return sentence.replace(regex, maskedWord);

	}

	// Not using word boundary:
	// if word is 'space' then 'spaceship' -> '***ship'
	const regex = new RegExp(escapedWord, 'gi');
	return sentence.replace(regex, maskedWord);

}
