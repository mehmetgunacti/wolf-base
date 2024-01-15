import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './select.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OptionsComponent } from './options.component';

@NgModule({

	declarations: [SelectComponent, OptionsComponent],
	imports: [CommonModule, ReactiveFormsModule, CdkTreeModule, CdkMenuModule],
	exports: [SelectComponent]

})
export class SelectModule { }
