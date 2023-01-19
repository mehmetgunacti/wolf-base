import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class BackendService {

	urlCache = new Set<string>();

	constructor(
		protected http: HttpClient
	) { }

	protected GET<T>(url: string, skipCache = false): Observable<T> {

		const loadFromCache = !skipCache;
		if (loadFromCache && this.urlCache.has(url))
			return EMPTY;

		return this.http.get<T>(url).pipe(

			tap(() => this.urlCache.add(url))

		);

	}

	protected POST<T>(url: string, params: any): Observable<T> {

		return this.http.post<T>(url, params);

	}

	protected PUT<T>(url: string, params: any): Observable<T> {

		return this.http.put<T>(url, params);

	}

	protected PATCH<T>(url: string, params?: any): Observable<T> {

		return this.http.patch<T>(url, params);

	}

	protected DELETE<T>(url: string): Observable<T> {

		return this.http.delete<T>(url);

	}

}
