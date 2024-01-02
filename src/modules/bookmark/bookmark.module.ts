import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'modules/shared/shared.module';
import { BookmarkRoutingModule } from './bookmark-routing.module';
import * as fromConfig from './bookmark.config';
import { CardModule, CroppieModule } from '@lib';

@NgModule({
	declarations: [...fromConfig.components],
	imports: [
		CommonModule,
		BookmarkRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		CroppieModule,
		CardModule
	]
})
export class BookmarkModule { }
