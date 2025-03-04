export type Table = string;

export enum AppEntityType {

	bookmark	= 'bookmark',
	exam		= 'exam',
	note		= 'note',
	noteContent	= 'noteContent',
	project		= 'project',
	quizEntry	= 'quizEntry',
	quote		= 'quote',
	session		= 'session',
	task		= 'task',
	testSuite	= 'testSuite',
	word		= 'word'

}

// todo : redesign - refactor, use simple js objects - interface
// separate plural -> database table name, remote collection name, etc
export class AppEntity {

	constructor(
		public name: string,
		public plural: string, // value of 'plural' is used as database table name
		public label: string,
		public labelPlural: string
	) { }

	toString(): string { return this.plural }

}

export class BookmarkEntity extends AppEntity {

	get table_clicks() : string { return this.plural + '_clicks'; }

}

export class AppEntities {

	static [AppEntityType.bookmark]	=	new BookmarkEntity(	'bookmark',		'bookmarks',		'Bookmark',		'Bookmarks');
	static [AppEntityType.exam] 			=	new AppEntity(		'exam',			'exams',			'Exam',			'Exams');
	static [AppEntityType.note] 			=	new AppEntity(		'note',			'notes',			'Note',			'Notes');
	static [AppEntityType.noteContent]		=	new AppEntity(		'note_content',	'note_content',		'Note Content',	'Note Content');
	static [AppEntityType.project]			=	new AppEntity(		'project',		'projects',			'Project',		'Projects');
	static [AppEntityType.quizEntry]		= 	new AppEntity(		'quiz_entry',		'quiz_entries',		'Quiz Entry',	'Quiz Entries');
	static [AppEntityType.quote]			= 	new AppEntity(		'quote',			'quotes',			'Quote',			'Quotes');
	static [AppEntityType.session]			= 	new AppEntity(		'session',		'sessions',			'Session',		'Sessions');
	static [AppEntityType.task]				= 	new AppEntity(		'task',			'tasks',			'Task',			'Tasks');
	static [AppEntityType.testSuite]		= 	new AppEntity(		'test_suite',		'test_suites',		'Test Suite',	'Test Suites');
	static [AppEntityType.word]				= 	new AppEntity(		'word',			'words',			'Word',			'Words');

}
