import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastUIEditorComponent } from './toastui-editor.component';

@NgModule({

	declarations: [ToastUIEditorComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [ToastUIEditorComponent]

})
export class ToastUIEditorModule { }
