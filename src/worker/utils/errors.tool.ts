export class ErrorDetected extends Error {

	constructor(public count: number) {
		super('Errors detected');
		this.name = 'ErrorDetected';
	}

}

export class FatalError extends Error {

	constructor(message: string) {
		super('Fatal error');
		this.name = 'FatalError';
		this.message = message;
	}

}