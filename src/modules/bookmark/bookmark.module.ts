import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'modules/shared/shared.module';
import { BookmarkRoutingModule } from './bookmark-routing.module';
import * as fromConfig from './bookmark.config';
import { OverlayContainerModule, CroppieModule } from '@lib';
import { ModalDirective } from 'lib/directives/dialog.directive';

@NgModule({
	declarations: [...fromConfig.components],
	imports: [
		CommonModule,
		BookmarkRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		CroppieModule,
		OverlayContainerModule,
		ModalDirective,
	]
})
export class BookmarkModule { }
