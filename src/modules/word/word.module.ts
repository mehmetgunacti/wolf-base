import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CroppieModule } from '@lib';
import { SharedModule } from 'modules/shared/shared.module';
import { WordRoutingModule } from './word-routing.module';
import * as fromConfig from './word.config';
import { MarkdownModule } from 'lib/components/markdown';
import { HideEnumModule } from 'lib/pipes/hide-enum.pipe';
import { SearchBoxComponent } from "../../lib/components/search-filter/search-box.component";

@NgModule({
	declarations: [...fromConfig.components],
	imports: [
		CommonModule,
		WordRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		CroppieModule,
		MarkdownModule,
		HideEnumModule,
		SearchBoxComponent
	]
})
export class WordModule { }
