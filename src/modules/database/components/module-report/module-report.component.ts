import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormatBytesPipe, ModuleReport, Table } from '@lib';

@Component({
	selector: 'app-module-report',
	standalone: true,
	imports: [FormatBytesPipe],
	templateUrl: './module-report.component.html',
	styleUrls: ['./module-report.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleReportComponent {

	report = input.required<ModuleReport>();

	clear = output<Table>();

	onClear(name: Table): void {

		if (confirm(`Empty table ${name}?`))
			this.clear.emit(name);

	}

}
