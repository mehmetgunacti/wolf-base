import { Session } from '@models/test-suite.model';

// this array should be commented when environment/isDemo is false
export const demoDataSessions: Session[] = [];

// export const demoDataSessions: Session[] = [
//
// 	{
// 		"id": "3200a1bb-1f30-47d8-a33c-ccf75ee314da",
// 		"name": "Chapter 01",
// 		"exam": {
// 			"id": "8bf8dd2f-5cbc-4a57-9830-0fe873b055c6",
// 			"name": "Chapter 01"
// 		},
// 		"answers": {
// 			"f35dd363-c47e-4bbe-8748-a9793f229de1": {
// 				"id": "f35dd363-c47e-4bbe-8748-a9793f229de1",
// 				"choices": [
// 					true,
// 					true,
// 					false,
// 					false,
// 					false,
// 					false
// 				],
// 				"time": 2786,
// 				"note": null
// 			},
// 			"c4156730-0af7-4d95-9cc7-e1c11a3abc06": {
// 				"id": "c4156730-0af7-4d95-9cc7-e1c11a3abc06",
// 				"choices": [
// 					false,
// 					false,
// 					true,
// 					false,
// 					true,
// 					false,
// 					true,
// 					false
// 				],
// 				"time": 3022,
// 				"note": null
// 			},
// 			"b1c00b06-d568-4bfb-9e6b-64873c7f5165": {
// 				"id": "b1c00b06-d568-4bfb-9e6b-64873c7f5165",
// 				"choices": [
// 					false,
// 					true,
// 					true,
// 					false,
// 					false
// 				],
// 				"time": 1922,
// 				"note": null
// 			},
// 			"7053067d-3134-4033-ba99-a0dde2867032": {
// 				"id": "7053067d-3134-4033-ba99-a0dde2867032",
// 				"choices": [
// 					false,
// 					false,
// 					false,
// 					false,
// 					true,
// 					true
// 				],
// 				"time": 2343,
// 				"note": null
// 			}
// 		},
// 		"start": "2025-03-04T00:12:44.154Z",
// 		"end": "2025-03-04T00:12:54.228Z"
// 	},
// 	{
// 		"id": "33cd4f5b-c06d-41af-aa37-f281bdadf828",
// 		"name": "Chapter 01",
// 		"exam": {
// 			"id": "8bf8dd2f-5cbc-4a57-9830-0fe873b055c6",
// 			"name": "Chapter 01"
// 		},
// 		"answers": {
// 			"f35dd363-c47e-4bbe-8748-a9793f229de1": {
// 				"id": "f35dd363-c47e-4bbe-8748-a9793f229de1",
// 				"choices": [
// 					false,
// 					false,
// 					false,
// 					true,
// 					true,
// 					false
// 				],
// 				"time": 2483,
// 				"note": null
// 			},
// 			"c4156730-0af7-4d95-9cc7-e1c11a3abc06": {
// 				"id": "c4156730-0af7-4d95-9cc7-e1c11a3abc06",
// 				"choices": [
// 					true,
// 					true,
// 					false,
// 					false,
// 					false,
// 					false,
// 					false,
// 					false
// 				],
// 				"time": 2064,
// 				"note": null
// 			},
// 			"b1c00b06-d568-4bfb-9e6b-64873c7f5165": {
// 				"id": "b1c00b06-d568-4bfb-9e6b-64873c7f5165",
// 				"choices": [
// 					false,
// 					true,
// 					true,
// 					false,
// 					true
// 				],
// 				"time": 3729,
// 				"note": null
// 			},
// 			"7053067d-3134-4033-ba99-a0dde2867032": {
// 				"id": "7053067d-3134-4033-ba99-a0dde2867032",
// 				"choices": [
// 					false,
// 					true,
// 					true,
// 					true,
// 					false,
// 					false
// 				],
// 				"time": 3390,
// 				"note": null
// 			}
// 		},
// 		"start": "2025-03-04T00:12:27.632Z",
// 		"end": "2025-03-04T00:12:39.298Z"
// 	},
// 	{
// 		"id": "4fa6c57c-0fe4-4d9f-8814-85b616d6cc51",
// 		"name": "Chapter 02",
// 		"exam": {
// 			"id": "c0f52baf-4221-4b78-a572-339b7f27d29b",
// 			"name": "Chapter 02"
// 		},
// 		"answers": {
// 			"74dfdf1d-fa49-4699-83ee-6c0521dca669": {
// 				"id": "74dfdf1d-fa49-4699-83ee-6c0521dca669",
// 				"choices": [
// 					true,
// 					true,
// 					false,
// 					false,
// 					false,
// 					true
// 				],
// 				"time": 2855,
// 				"note": null
// 			},
// 			"1bd11de0-ed08-4f8c-82d2-8aac326c8d44": {
// 				"id": "1bd11de0-ed08-4f8c-82d2-8aac326c8d44",
// 				"choices": [
// 					false,
// 					true,
// 					true,
// 					false,
// 					false
// 				],
// 				"time": 1859,
// 				"note": null
// 			},
// 			"24335d24-947f-454a-b10a-f772c7e665f2": {
// 				"id": "24335d24-947f-454a-b10a-f772c7e665f2",
// 				"choices": [
// 					false,
// 					false,
// 					false,
// 					false,
// 					true,
// 					true,
// 					false,
// 					false
// 				],
// 				"time": 2510,
// 				"note": null
// 			}
// 		},
// 		"start": "2025-03-04T00:13:02.902Z",
// 		"end": "2025-03-04T00:13:10.126Z"
// 	},
// 	{
// 		"id": "d065df4d-fa83-49fd-abf4-f453e90ff48d",
// 		"name": "Chapter 02",
// 		"exam": {
// 			"id": "c0f52baf-4221-4b78-a572-339b7f27d29b",
// 			"name": "Chapter 02"
// 		},
// 		"answers": {
// 			"74dfdf1d-fa49-4699-83ee-6c0521dca669": {
// 				"id": "74dfdf1d-fa49-4699-83ee-6c0521dca669",
// 				"choices": [
// 					true,
// 					true,
// 					false,
// 					false,
// 					false,
// 					false
// 				],
// 				"time": 2226,
// 				"note": null
// 			},
// 			"1bd11de0-ed08-4f8c-82d2-8aac326c8d44": {
// 				"id": "1bd11de0-ed08-4f8c-82d2-8aac326c8d44",
// 				"choices": [
// 					false,
// 					true,
// 					true,
// 					false,
// 					false
// 				],
// 				"time": 1737,
// 				"note": null
// 			},
// 			"24335d24-947f-454a-b10a-f772c7e665f2": {
// 				"id": "24335d24-947f-454a-b10a-f772c7e665f2",
// 				"choices": [
// 					false,
// 					false,
// 					false,
// 					true,
// 					true,
// 					false,
// 					false,
// 					false
// 				],
// 				"time": 2014,
// 				"note": null
// 			}
// 		},
// 		"start": "2025-03-04T00:13:14.166Z",
// 		"end": "2025-03-04T00:13:20.143Z"
// 	},
// 	{
// 		"id": "f393fa63-4c42-47d9-94ea-eb6f7ea0bafb",
// 		"name": "Chapter 02",
// 		"exam": {
// 			"id": "c0f52baf-4221-4b78-a572-339b7f27d29b",
// 			"name": "Chapter 02"
// 		},
// 		"answers": {
// 			"74dfdf1d-fa49-4699-83ee-6c0521dca669": {
// 				"id": "74dfdf1d-fa49-4699-83ee-6c0521dca669",
// 				"choices": [
// 					true,
// 					true,
// 					false,
// 					false,
// 					false,
// 					false
// 				],
// 				"time": 2275,
// 				"note": null
// 			},
// 			"1bd11de0-ed08-4f8c-82d2-8aac326c8d44": {
// 				"id": "1bd11de0-ed08-4f8c-82d2-8aac326c8d44",
// 				"choices": [
// 					false,
// 					false,
// 					true,
// 					false,
// 					false
// 				],
// 				"time": 2744,
// 				"note": null
// 			},
// 			"24335d24-947f-454a-b10a-f772c7e665f2": {
// 				"id": "24335d24-947f-454a-b10a-f772c7e665f2",
// 				"choices": [
// 					false,
// 					false,
// 					true,
// 					false,
// 					false,
// 					false,
// 					false,
// 					false
// 				],
// 				"time": 2080,
// 				"note": null
// 			}
// 		},
// 		"start": "2025-03-04T00:13:32.872Z",
// 		"end": "2025-03-04T00:13:39.971Z"
// 	}
//
// ];
