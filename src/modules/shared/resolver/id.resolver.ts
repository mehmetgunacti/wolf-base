import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";

export function idResolver<T>(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, store: Store, action: Action): void {

    store.dispatch(action);

}