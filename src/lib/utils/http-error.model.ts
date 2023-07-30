export class HttpError extends Error {

	constructor(
		private url: string,
		private status: number,
		private statusText: string,
		private error?: any
	) {
		super();
	}

}