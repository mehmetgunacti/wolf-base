import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './select.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OptionsComponent } from './options.component';
import { SelectTreeComponent } from './select-tree.component';

@NgModule({

	declarations: [
		SelectComponent,
		SelectTreeComponent,
		OptionsComponent
	],
	imports: [CommonModule, ReactiveFormsModule, CdkTreeModule, CdkMenuModule],
	exports: [
		SelectComponent,
		SelectTreeComponent
	]

})
export class SelectModule { }
