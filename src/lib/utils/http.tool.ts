enum HTTP_METHOD {

	GET = 'GET',
	POST = 'POST',
	PATCH = 'PATCH',
	PUT = 'PUT',
	DELETE = 'DELETE'

}

export class HttpError extends Error {

	constructor(
		public url: string,
		public status: number,
		public statusText: string,
		public error?: any
	) {
		super();
	}

}

export class HTTP {

	static async http<HTTPRESP, RETVAL>(
		request: RequestInfo,
		responseHandler?: (resp: HTTPRESP) => RETVAL
	): Promise<RETVAL> {

		const response: Response = await fetch(request);
		if (!response.ok)
			throw new HttpError(request.toString(), response.status, response.statusText);

		const httpResponse: HTTPRESP = await response.json() as HTTPRESP;
		if (responseHandler)
			return responseHandler(httpResponse);

		// return new Promise(resolve => resolve(httpResponse)) as unknown as Promise<RETVAL>;
		return httpResponse as unknown as Promise<RETVAL>;

	}

	static async get<HTTPRESP, RETVAL>(
		path: string,
		responseHandler?: (resp: HTTPRESP) => RETVAL,
		args: RequestInit = { method: HTTP_METHOD.GET }
	): Promise<RETVAL> {

		return await HTTP.http<HTTPRESP, RETVAL>(new Request(path, args), responseHandler);

	}

	static async getString<RETVAL>(
		path: string,
		responseHandler?: (resp: string) => RETVAL
	): Promise<RETVAL> {

		const response: Response = await fetch(new Request(path, { method: HTTP_METHOD.GET }));
		if (!response.ok)
			throw new Error(response.statusText);

		const httpResponse: string = await response.text();
		if (responseHandler)
			return responseHandler(httpResponse);

		return httpResponse as unknown as Promise<RETVAL>;

	}

	static async post<HTTPRESP, BODY, RETVAL>(
		path: string,
		body: BODY,
		responseHandler?: (resp: HTTPRESP) => RETVAL,
		args: RequestInit = { method: HTTP_METHOD.POST, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
	): Promise<RETVAL> {

		return await HTTP.http<HTTPRESP, RETVAL>(new Request(path, args), responseHandler);

	}

	static async put<HTTPRESP, BODY, RETVAL>(
		path: string,
		body: BODY,
		responseHandler?: (resp: HTTPRESP) => RETVAL,
		args: RequestInit = { method: HTTP_METHOD.PUT, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
	): Promise<RETVAL> {

		return await HTTP.http<HTTPRESP, RETVAL>(new Request(path, args), responseHandler);

	}

	static async patch<HTTPRESP, BODY, RETVAL>(
		path: string,
		body: BODY,
		responseHandler?: (resp: HTTPRESP) => RETVAL,
		args: RequestInit = { method: HTTP_METHOD.PATCH, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
	): Promise<RETVAL> {

		return await HTTP.http<HTTPRESP, RETVAL>(new Request(path, args), responseHandler);

	}

	static async delete<HTTPRESP, RETVAL>(
		path: string,
		responseHandler?: (resp: HTTPRESP) => RETVAL,
		args: RequestInit = { method: HTTP_METHOD.DELETE }
	): Promise<RETVAL> {

		return await HTTP.http<HTTPRESP, RETVAL>(new Request(path, args), responseHandler);

	}

}
