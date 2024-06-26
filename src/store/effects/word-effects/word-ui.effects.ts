import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalRepositoryService } from '@lib';
import { Actions } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';

@Injectable()
export class WordUIEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
	private router: Router = inject(Router);

}
