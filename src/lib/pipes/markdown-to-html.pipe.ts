import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import hljs from 'highlight.js/lib/core';
import asciidoc from 'highlight.js/lib/languages/asciidoc';
import autohotkey from 'highlight.js/lib/languages/autohotkey';
import bash from 'highlight.js/lib/languages/bash';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import css from 'highlight.js/lib/languages/css';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import gradle from 'highlight.js/lib/languages/gradle';
import http from 'highlight.js/lib/languages/http';
import ini from 'highlight.js/lib/languages/ini';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import kotlin from 'highlight.js/lib/languages/kotlin';
import markdown from 'highlight.js/lib/languages/markdown';
import powershell from 'highlight.js/lib/languages/powershell';
import properties from 'highlight.js/lib/languages/properties';
import python from 'highlight.js/lib/languages/python';
import scss from 'highlight.js/lib/languages/scss';
import sql from 'highlight.js/lib/languages/sql';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';
import { default as MarkdownIt } from 'markdown-it';

import { tasklist } from '@mdit/plugin-tasklist';
import { alert } from '@mdit/plugin-alert';
import { align } from '@mdit/plugin-align';
import { attrs } from "@mdit/plugin-attrs";
import { mark } from '@mdit/plugin-mark';
import { sub } from '@mdit/plugin-sub';
import { sup } from '@mdit/plugin-sup';
import { ins } from '@lib';

@Pipe({ name: 'markdownToHtml' })
export class MarkdownToHtmlPipe implements PipeTransform {

	private md: MarkdownIt;

	constructor() {

		hljs.registerLanguage('asciidoc', asciidoc);
		hljs.registerLanguage('autohotkey', autohotkey);
		hljs.registerLanguage('bash', bash);
		hljs.registerLanguage('c', c);
		hljs.registerLanguage('cpp', cpp);
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
			.use(attrs)
			.use(mark)
			.use(sub)
			.use(sup)
			.use(ins);

	}

	transform(content: string | null): string | null {

		if (!content)
			return null;
		return this.md.render(content);

	}

}

@NgModule({

	declarations: [MarkdownToHtmlPipe],
	imports: [CommonModule],
	exports: [MarkdownToHtmlPipe]

})
export class MarkdownModule { }
