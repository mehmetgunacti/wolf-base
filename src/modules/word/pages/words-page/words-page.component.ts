import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LocalRepositoryService, Word } from '@lib';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { v4 as uuidv4 } from 'uuid';

@Component({
	selector: 'app-words-page',
	templateUrl: './words-page.component.html',
	styleUrls: ['./words-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsPageComponent {

	private local: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);


	async fix(): Promise<void> {

		const list: Word[] = await this.local.words.list();
		console.log(list);
		list.forEach(w => w.definitions.forEach(d => d.id = uuidv4()));

		list.forEach(async (w) => {

			await this.local.words.update(w.id, w);

		})

		console.log(list);


	}

}
