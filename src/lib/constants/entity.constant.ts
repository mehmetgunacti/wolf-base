export class EntityName {

	constructor(
		public name: string,
		public plural: string
	) { }

	toString(): string {

		return this.plural;

	}

}

export class WolfEntity {

	static bookmark = new EntityName('bookmark', 'bookmarks');
	static note = new EntityName('note', 'notes');
	static note_content = new EntityName('note_content', 'note_content');
	static project = new EntityName('project', 'projects');
	static quizEntry = new EntityName('quiz_entry', 'quiz_entries');
	static quote = new EntityName('quote', 'quotes');
	static task = new EntityName('task', 'tasks');
	static word = new EntityName('word', 'words');

}
