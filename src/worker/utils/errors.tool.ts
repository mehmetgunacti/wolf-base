export class ConflictDetectedError extends Error {

	constructor(public count: number) {
		super('Conflicts detected');
		this.name = 'ConflictDetectedError';
	}

}

export class FatalError extends Error {

	constructor(message: string) {
		super('Fatal error');
		this.name = 'FatalError';
		this.message = message;
	}

}