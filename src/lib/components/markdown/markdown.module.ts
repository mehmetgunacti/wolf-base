import { DialogModule } from '@angular/cdk/dialog';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SanitizeHtmlModule, TimePastModule } from '@pipes';
import { GlyphComponent } from '../glyph/glyph.component';
import { ModalComponent } from '../modal/modal.component';
import { OverlayContainerModule } from '../overlay-container';
import { SelectorTableModule } from '../selector-table/selector-table.module';
import { MarkdownEditorComponent } from './markdown-editor.component';
import { MarkdownToHtmlPipe } from './markdown-to-html.pipe';
import { MarkdownViewerComponent } from './markdown-viewer.component';

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
		OverlayContainerModule,
		TimePastModule,
		ModalComponent,
		GlyphComponent
	],
	exports: [
		MarkdownEditorComponent,
		MarkdownViewerComponent,
		MarkdownToHtmlPipe
	]

})
export class MarkdownModule { }
