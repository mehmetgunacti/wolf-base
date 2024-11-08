import { Component, input, output } from '@angular/core';
import { Table } from '@constants';
import { GlyphDirective } from '@directives';
import { BaseComponent } from '@libComponents';
import { ModuleReport } from '@models';
import { FormatBytesPipe } from '@pipes';

@Component({
	standalone: true,
	imports: [ FormatBytesPipe, GlyphDirective ],
	selector: 'app-module-report',
	templateUrl: './module-report.component.html',
	host: { 'class': 'grid' }
})
export class ModuleReportComponent extends BaseComponent {

	report = input.required<ModuleReport>();

	clear = output<Table>();

	onClear(name: Table): void {

		if (confirm(`Empty table ${name}?`))
			this.clear.emit(name);

	}

}
