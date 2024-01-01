import { Injectable } from '@angular/core';

import hljs from 'highlight.js/lib/core';
import asciidoc from 'highlight.js/lib/languages/asciidoc.js';
import autohotkey from 'highlight.js/lib/languages/autohotkey.js';
import bash from 'highlight.js/lib/languages/bash.js';
import c from 'highlight.js/lib/languages/c.js';
import cpp from 'highlight.js/lib/languages/cpp.js';
import csharp from 'highlight.js/lib/languages/csharp.js';
import css from 'highlight.js/lib/languages/css.js';
import dockerfile from 'highlight.js/lib/languages/dockerfile.js';
import gradle from 'highlight.js/lib/languages/gradle.js';
import http from 'highlight.js/lib/languages/http.js';
import ini from 'highlight.js/lib/languages/ini.js';
import java from 'highlight.js/lib/languages/java.js';
import javascript from 'highlight.js/lib/languages/javascript.js';
import json from 'highlight.js/lib/languages/json.js';
import kotlin from 'highlight.js/lib/languages/kotlin.js';
import markdown from 'highlight.js/lib/languages/markdown.js';
import powershell from 'highlight.js/lib/languages/powershell.js';
import properties from 'highlight.js/lib/languages/properties.js';
import python from 'highlight.js/lib/languages/python.js';
import scss from 'highlight.js/lib/languages/scss.js';
import shell from 'highlight.js/lib/languages/shell.js';
import sql from 'highlight.js/lib/languages/sql.js';
import typescript from 'highlight.js/lib/languages/typescript.js';
import xml from 'highlight.js/lib/languages/xml.js';
import yaml from 'highlight.js/lib/languages/yaml.js';
import { default as MarkdownIt } from 'markdown-it';

import { tasklist } from '@mdit/plugin-tasklist';
import { alert } from '@mdit/plugin-alert';
import { align } from '@mdit/plugin-align';
import { mark } from '@mdit/plugin-mark';

@Injectable({ providedIn: 'root' })
export class MarkdownService {

	private md: MarkdownIt;

	constructor() {

		hljs.registerLanguage('asciidoc', asciidoc);
		hljs.registerLanguage('autohotkey', autohotkey);
		hljs.registerLanguage('bash', bash);
		hljs.registerLanguage('c', c);
		hljs.registerLanguage('cpp', cpp);
		hljs.registerLanguage('csharp', csharp);
		hljs.registerLanguage('css', css);
		hljs.registerLanguage('dockerfile', dockerfile);
		hljs.registerLanguage('gradle', gradle);
		hljs.registerLanguage('http', http);
		hljs.registerLanguage('ini', ini);
		hljs.registerLanguage('java', java);
		hljs.registerLanguage('javascript', javascript);
		hljs.registerLanguage('json', json);
		hljs.registerLanguage('kotlin', kotlin);
		hljs.registerLanguage('markdown', markdown);
		hljs.registerLanguage('powershell', powershell);
		hljs.registerLanguage('properties', properties);
		hljs.registerLanguage('python', python);
		hljs.registerLanguage('scss', scss);
		hljs.registerLanguage('shell', shell);
		hljs.registerLanguage('sql', sql);
		hljs.registerLanguage('typescript', typescript);
		hljs.registerLanguage('xml', xml);
		hljs.registerLanguage('yaml', yaml);

		const config = {

			html: true,
			breaks: true,
			linkify: true,
			typographer: true,
			highlight: function (str: string, language: string) {

				if (language && hljs.getLanguage(language)) {
					try {
						return hljs.highlight(str, { language }).value;
					} catch (e) {
						console.error(e);
						throw new Error('highlight-js related error occured!');
					}
				}
				return ''; // use external default escaping

			}

		};
		this.md = MarkdownIt(config)
			.use(tasklist, { label: true })
			.use(alert)
			.use(align)
			.use(mark);

	}

	render(content: string | null): string | null {

		if (!content)
			return null;
		return this.md.render(content);

	}

}
