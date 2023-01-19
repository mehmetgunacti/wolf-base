import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ErrorInfo {

	url?: string;
	method?: string;
	error: HttpErrorResponse;
	params?: any;

}

export type ErrorHandler = (info: ErrorInfo) => Observable<any>;
