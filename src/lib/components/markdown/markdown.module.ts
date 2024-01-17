import { DialogModule } from '@angular/cdk/dialog';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SanitizeHtmlModule } from 'lib/pipes';
import { OverlayContainerModule } from '../overlay-container';
import { SelectorTableModule } from '../selector-table/selector-table.module';
import { MarkdownEditorComponent } from './markdown-editor.component';
import { MarkdownViewerComponent } from './markdown-viewer.component';
import { MarkdownToHtmlPipe } from './markdown-to-html.pipe';

@NgModule({

	declarations: [
		MarkdownEditorComponent,
		MarkdownViewerComponent,
		MarkdownToHtmlPipe
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		CdkMenuModule,
		SelectorTableModule,
		SanitizeHtmlModule,
		DialogModule,
		OverlayContainerModule
	],
	exports: [
		MarkdownEditorComponent,
		MarkdownViewerComponent,
		MarkdownToHtmlPipe
	]

})
export class MarkdownModule { }
