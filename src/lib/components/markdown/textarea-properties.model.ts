export interface EditorProperties {

	content: string;
	sIndex: number;
	eIndex: number;

}

export const textareaProps = (content: string): EditorProperties => ({
	content,
	sIndex: content.length,
	eIndex: content.length
});

export const extractProps = ({ value, selectionStart, selectionEnd }: HTMLTextAreaElement): EditorProperties => ({

	content: value,
	sIndex: selectionStart,
	eIndex: selectionEnd

})
