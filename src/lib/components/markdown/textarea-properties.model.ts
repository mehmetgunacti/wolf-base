export interface TextareaProperties {

	value: string;
	selectionStart: number;
	selectionEnd: number;

}

export const textareaProps = (value: string):TextareaProperties => ({
	value,
	selectionStart: value.length,
	selectionEnd: value.length
});
