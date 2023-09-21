// import { Injectable, inject } from "@angular/core";
// import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
// import { Store } from "@ngrx/store";
// import { UUID } from "lib";
// import { Observable } from "rxjs";

// @Injectable({ providedIn: 'root' })
// export class HeroResolver implements Resolve<void> {

//     private store: Store = inject(Store);

//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {

//         const id: UUID | null = route.paramMap.get('id');
//         return this.store.dispatch(selectKBEntry({ id }));

//     }

// }