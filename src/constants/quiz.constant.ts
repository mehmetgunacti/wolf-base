export type QuestionType = 'term' | 'definition';

export enum Progress {

	START = 'START',
	LEVEL_ONE = 'LEVEL_ONE',
	LEVEL_TWO = 'LEVEL_TWO',
	LEVEL_THREE = 'LEVEL_THREE',
	LEVEL_FOUR = 'LEVEL_FOUR',
	LEVEL_FIVE = 'LEVEL_FIVE',
	LEVEL_SIX = 'LEVEL_SIX',
	LEVEL_SEVEN = 'LEVEL_SEVEN',
	FINISHED = 'FINISHED:'

}

export function next(p: Progress): Progress {

	switch (p) {

		case Progress.START: return Progress.LEVEL_ONE;
		case Progress.LEVEL_ONE: return Progress.LEVEL_TWO;
		case Progress.LEVEL_TWO: return Progress.LEVEL_THREE;
		case Progress.LEVEL_THREE: return Progress.LEVEL_FOUR;
		case Progress.LEVEL_FOUR: return Progress.LEVEL_FIVE;
		case Progress.LEVEL_FIVE: return Progress.LEVEL_SIX;
		case Progress.LEVEL_SIX: return Progress.LEVEL_SEVEN;
		case Progress.LEVEL_SEVEN: return Progress.FINISHED;

	};
	throw Error('unknown Progress');

}

export function increase(p: Progress): number {

	const now = new Date().getTime();
	const day = 1000 * 60 * 60 * 24;
	switch (p) {

		case Progress.START: return 0;
		case Progress.LEVEL_ONE: return now + 1 * day;
		case Progress.LEVEL_TWO: return now + 3 * day;
		case Progress.LEVEL_THREE: return now + 7 * day;
		case Progress.LEVEL_FOUR: return now + 16 * day;
		case Progress.LEVEL_FIVE: return now + 50 * day;
		case Progress.LEVEL_SIX: return now + 70 * day;
		case Progress.LEVEL_SEVEN: return now + 100 * day;

	};
	throw Error('unknown Progress');

}

export const NUMBER_OF_CHOICES = 5; // total choices - 1

export enum QuizVisibility {

	HEADER = 0,
	HINTS = 1,
	CHOICES = 2

}

export function incVisibility(current: QuizVisibility): QuizVisibility {

	switch (current) {

		case QuizVisibility.HEADER: return QuizVisibility.HINTS;
		case QuizVisibility.HINTS: return QuizVisibility.CHOICES;
		default: return QuizVisibility.HEADER;

	}

}
