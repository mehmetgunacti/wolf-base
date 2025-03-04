import { Progress } from '@constants/quiz.constant';
import { QuizEntry } from '@models/quiz.model';

// this array should be commented when environment/isDemo is false
export const demoDataQuizEntries: QuizEntry[] = [];

// export const demoDataQuizEntries: QuizEntry[] = [
//
// 	{
// 		"id": "00107440-66e1-40ca-af12-6c78aab5ea04",
// 		"name": "an abundance",
// 		"level": Progress.START,
// 		"next": 1739219566647,
// 		"question": "term"
// 	},
// 	{
// 		"id": "005a0460-70e6-4a86-bb96-1f5552bb55fd",
// 		"name": "of or relating to trees",
// 		"level": Progress.START,
// 		"next": 1749366183922,
// 		"question": "term"
// 	},
// 	{
// 		"id": "00a981c2-16bc-4ae6-a600-4e13955730a4",
// 		"name": "to grant the vote to",
// 		"level": Progress.START,
// 		"next": 1737010983922,
// 		"question": "term"
// 	},
// 	{
// 		"id": "012ecd6d-5066-491b-a58f-41bb65687d0a",
// 		"name": "having a tendency to quarrel or dispute",
// 		"level": Progress.START,
// 		"next": 1737183783922,
// 		"question": "term"
// 	},
// 	{
// 		"id": "013ce75b-e484-465a-9bf5-4629a325696c",
// 		"name": "excessively worshipping one object or person",
// 		"level": Progress.START,
// 		"next": 1739102671786,
// 		"question": "definition"
// 	},
// 	{
// 		"id": "013d53fc-969f-4fe0-9018-7d501eaf156d",
// 		"name": "to sway from one side to the other",
// 		"level": Progress.START,
// 		"next": 1740553383922,
// 		"question": "term"
// 	},
// 	{
// 		"id": "015913bc-5dc3-467c-94d2-edb0c2d9de10",
// 		"name": "loss of the ability to speak or understand spoken or written language",
// 		"level": Progress.START,
// 		"next": 1750921383922,
// 		"question": "term"
// 	},
// 	{
// 		"id": "0175ac1a-3044-4d61-9306-db8ccb269d4a",
// 		"name": "intimidating, causing one to lose courage",
// 		"level": Progress.START,
// 		"next": 1749020583922,
// 		"question": "term"
// 	},
// 	{
// 		"id": "018ca58c-8df5-4adf-b2c8-29f9146181f3",
// 		"name": "mean and stingy; undesirably small.",
// 		"level": Progress.START,
// 		"next": 1752303783922,
// 		"question": "term"
// 	},
// 	{
// 		"id": "018d50b8-77fb-4ad6-9cf8-43cbb7763e13",
// 		"name": "to give up on a half-finished project or effort",
// 		"level": Progress.START,
// 		"next": 1745391783922,
// 		"question": "term"
// 	},
// 	{
// 		"id": "020bb951-aa1b-44a1-8eb8-95ec6970e4cd",
// 		"name": "lack of harmony or consistency",
// 		"level": Progress.START,
// 		"next": 1736412804965,
// 		"question": "term"
// 	},
// 	{
// 		"id": "026f6de7-bca8-4579-951f-abdcf931c134",
// 		"name": "calm, peaceful",
// 		"level": Progress.START,
// 		"next": 1751526183922,
// 		"question": "term"
// 	},
// 	{
// 		"id": "cd2a237a-a5cb-4d59-a7d2-bcdf6e0bbc10",
// 		"name": "aware, mindful",
// 		"level": Progress.START,
// 		"next": 1748502183922,
// 		"question": "term"
// 	},
// 	{
// 		"id": "cd4192c6-9bcc-4e3d-8192-0b4d9e5a3cf1",
// 		"name": "an emotion of sympathy",
// 		"level": Progress.START,
// 		"next": 1742108583922,
// 		"question": "term"
// 	},
// 	{
// 		"id": "cd51d3a8-333c-4473-8b29-9121e56aae18",
// 		"name": "brightly shining",
// 		"level": Progress.START,
// 		"next": 1747292583922,
// 		"question": "term"
// 	},
// 	{
// 		"id": "cd83190c-de3e-4502-a0d9-cc95afef4aef",
// 		"name": "to prove wrong",
// 		"level": Progress.START,
// 		"next": 1750230183922,
// 		"question": "term"
// 	},
// 	{
// 		"id": "cd996e1d-3634-4556-94e3-b22aa9907154",
// 		"name": "protection or sponsorship",
// 		"level": Progress.START,
// 		"next": 1735848023661,
// 		"question": "definition"
// 	},
// 	{
// 		"id": "ce19f289-8c96-41bf-a290-b870e7da459f",
// 		"name": "fear, apprehension",
// 		"level": Progress.START,
// 		"next": 1743231783922,
// 		"question": "term"
// 	},
// 	{
// 		"id": "ce1e222d-ee7d-4769-a549-1422fe0732c6",
// 		"name": "deserving blame",
// 		"level": Progress.START,
// 		"next": 1739378177080,
// 		"question": "definition"
// 	},
// 	{
// 		"id": "ce6fb2a6-0189-43c8-9db3-acc728e4aa98",
// 		"name": "a careful examination, review",
// 		"level": Progress.START,
// 		"next": 1739016968431,
// 		"question": "term"
// 	},
// 	{
// 		"id": "ceca30f5-5eb8-4237-9d8c-cea55e5b4bfd",
// 		"name": "(of a product, idea, etc.) featuring new methods; advanced and original",
// 		"level": Progress.START,
// 		"next": 1739374780727,
// 		"question": "definition"
// 	},
// 	{
// 		"id": "ced199e3-ac67-4846-b909-792e044809bd",
// 		"name": "a passageway between rows of seats",
// 		"level": Progress.START,
// 		"next": 1738652583922,
// 		"question": "term"
// 	},
//
// ];
