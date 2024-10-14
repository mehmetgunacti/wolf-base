import { type PluginSimple } from 'markdown-it';
import { RuleInline } from 'markdown-it/lib/parser_inline.mjs';
import StateInline, { Delimiter } from 'markdown-it/lib/rules_inline/state_inline.mjs';

// ++to-ins-tag++   =>  <ins>to-ins-tag</ins>

const tokenize: RuleInline = (state, silent) => {

	const start = state.pos;
	const marker = state.src.charAt(start);

	if (silent || marker !== "+") return false;

	const scanned = state.scanDelims(state.pos, true);
	let { length } = scanned;

	if (length < 2) return false;
	let token;

	if (length % 2) {

		token = state.push("text", "", 0);
		token.content = marker;
		length -= 1;

	}

	for (let i = 0; i < length; i += 2) {

		token = state.push("text", "", 0);
		token.content = `${marker}${marker}`;

		if (scanned.can_open || scanned.can_close)
			state.delimiters.push({
				marker: 0x2b, // '+' in ASCII
				length: 0,
				// jump: i / 2,
				token: state.tokens.length - 1,
				end: -1,
				open: scanned.can_open,
				close: scanned.can_close,
			});

	}
	state.pos += scanned.length;
	return true;

};

const postProcess = (state: StateInline, delimiters: Delimiter[],): void => {

	let token;
	const loneMarkers = [];
	const max = delimiters.length;

	for (let i = 0; i < max; i++) {

		const startDelim = delimiters[i];

		if (startDelim.marker === 0x2b /* + */ && startDelim.end !== -1) {

			const endDelim = delimiters[startDelim.end];

			token = state.tokens[startDelim.token];
			token.type = "underline_open";
			token.tag = "ins";
			token.nesting = 1;
			token.markup = "++";
			token.content = "";

			token = state.tokens[endDelim.token];
			token.type = "underline_close";
			token.tag = "ins";
			token.nesting = -1;
			token.markup = "++";
			token.content = "";

			if (
				state.tokens[endDelim.token - 1].type === "text" &&
				state.tokens[endDelim.token - 1].content === "+"
			)
				loneMarkers.push(endDelim.token - 1);

		}

	}

	while (loneMarkers.length) {

		const i = loneMarkers.pop()!;
		let j = i + 1;

		while (j < state.tokens.length && state.tokens[j].type === "underline_close")
			j += 1;
		j -= 1;

		if (i !== j) {

			token = state.tokens[j];
			state.tokens[j] = state.tokens[i];
			state.tokens[i] = token;

		}

	}

};

export const ins: PluginSimple = (md) => {

	md.inline.ruler.before("emphasis", "underline", tokenize);
	md.inline.ruler2.before("emphasis", "underline", (state) => {

		const tokensMeta = state.tokens_meta || [];

		postProcess(state, state.delimiters);

		for (let curr = 0; curr < tokensMeta.length; curr++) {

			const tokenMeta = tokensMeta[curr];
			if (tokenMeta?.delimiters)
				postProcess(state, tokenMeta.delimiters);

		}
		return true;

	});

};
