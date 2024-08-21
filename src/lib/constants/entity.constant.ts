export class EntityName {

	constructor(
		public name: string,
		public plural: string,
		public label: string,
		public labelPlural: string
	) { }

	toString(): string {

		return this.plural;

	}

}

export class WolfEntity {

	static bookmark = new EntityName('bookmark', 'bookmarks', 'Bookmark', 'Bookmarks');
	static note = new EntityName('note', 'notes', 'Note', 'Notes');
	static note_content = new EntityName('note_content', 'note_content', 'Note Content', 'Note Content');
	static project = new EntityName('project', 'projects', 'Project', 'Projects');
	static quizEntry = new EntityName('quiz_entry', 'quiz_entries', 'Quiz Entry', 'Quiz Entries');
	static quote = new EntityName('quote', 'quotes', 'Quote', 'Quotes');
	static task = new EntityName('task', 'tasks', 'Task', 'Tasks');
	static word = new EntityName('word', 'words', 'Word', 'Words');

}
