export enum Progress {

	START = 'START',
	LEVEL_ONE = 'LEVEL_ONE',
	LEVEL_TWO = 'LEVEL_TWO',
	LEVEL_THREE = 'LEVEL_THREE',
	LEVEL_FOUR = 'LEVEL_FOUR',
	LEVEL_FIVE = 'LEVEL_FIVE',
	FINISHED = 'FINISHED:'

}

export function next(p: Progress): Progress {

	switch (p) {

		case Progress.START: return Progress.LEVEL_ONE;
		case Progress.LEVEL_ONE: return Progress.LEVEL_TWO;
		case Progress.LEVEL_TWO: return Progress.LEVEL_THREE;
		case Progress.LEVEL_THREE: return Progress.LEVEL_FOUR;
		case Progress.LEVEL_FOUR: return Progress.LEVEL_FIVE;
		case Progress.LEVEL_FIVE: return Progress.FINISHED;

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

	};
	throw Error('unknown Progress');

}

export const NUMBER_OF_CHOICES = 5; // total choices - 1
