import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CroppieModule, OverlayContainerModule } from '@lib';
import { ModalDirective } from 'lib/directives/dialog.directive';
import { SharedModule } from 'modules/shared/shared.module';
import { BookmarkRoutingModule } from './bookmark-routing.module';
import * as fromConfig from './bookmark.config';

@NgModule({
	declarations: [...fromConfig.components],
	imports: [
		CommonModule,
		BookmarkRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		CroppieModule,
		OverlayContainerModule,
		ModalDirective
	]
})
export class BookmarkModule { }
