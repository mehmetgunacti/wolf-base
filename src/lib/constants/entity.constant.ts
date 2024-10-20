export enum AppEntityType {

	bookmark	= 'bookmark',
	note		= 'note',
	noteContent	= 'noteContent',
	project		= 'project',
	quizEntry	= 'quizEntry',
	quote		= 'quote',
	task		= 'task',
	word		= 'word'

}

export class AppEntity {

	constructor(
		public name: string,
		public plural: string, // value of 'plural' is used as database table name
		public label: string,
		public labelPlural: string
	) { }

	toString(): string { return this.plural }

	// get table()			: string { return this.plural; }
	// get table_sync()	: string { return this.plural + '_sync'; }
	// get table_remote()	: string { return this.plural + '_remote'; }
	// get table_trash()	: string { return this.plural + '_trash'; }

}

export class BookmarkEntity extends AppEntity {

	get table_clicks() : string { return this.plural + '_clicks'; }

}

export class AppEntities {

	static [AppEntityType.bookmark]	=	new BookmarkEntity(	'bookmark',		'bookmarks',		'Bookmark',		'Bookmarks');
	static [AppEntityType.note] 			=	new AppEntity(		'note',			'notes',			'Note',			'Notes');
	static [AppEntityType.noteContent]		=	new AppEntity(		'note_content',	'note_content',		'Note Content',	'Note Content');
	static [AppEntityType.project]			=	new AppEntity(		'project',		'projects',			'Project',		'Projects');
	static [AppEntityType.quizEntry]		= 	new AppEntity(		'quiz_entry',		'quiz_entries',		'Quiz Entry',	'Quiz Entries');
	static [AppEntityType.quote]			= 	new AppEntity(		'quote',			'quotes',			'Quote',			'Quotes');
	static [AppEntityType.task]				= 	new AppEntity(		'task',			'tasks',			'Task',			'Tasks');
	static [AppEntityType.word]				= 	new AppEntity(		'word',			'words',			'Word',			'Words');
//	static [AppEntityType.log]				= 	new AppEntity(		'log',			'logs', 			'Log', 			'Logs');

}
