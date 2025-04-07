import { DefinitionLanguage, DefinitionType } from '@constants/word.constant';
import { Word } from '@models/word.model';

// this array should be commented when environment/isDemo is false
export const demoDataWords: Word[] = [];

// export const demoDataWords: Word[] = [
//
// 	{
// 		"id": "000075fe-07fb-4a9b-a623-66993803edde",
// 		"name": "agile",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "16e3a2ef-4907-488f-a5bb-f5b9a70d2912",
// 				"languages": [
// 					{
// 						"name": "quick, nimble",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The old greyhounds were far too slow to catch the agile young vixens."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0056865c-22b8-4163-8344-b39bb7695073",
// 		"name": "mawkish",
// 		"dictionary": null,
// 		"pronunciation": "/ˈmɔːkɪʃ/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "42a62088-9aea-4392-af5c-9cbc4a0ad50c",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "iğrenç, tiksindirici",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "having a faint sickly flavour",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "kitschig",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"The mawkish smell of warm beer."
// 				]
// 			},
// 			{
// 				"id": "c1e95988-6e05-4576-a925-e2fb86cc35cc",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "aşırı içli",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "overly sentimental in an exaggerated or false way",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "rührselig",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"The mawkishness of yesterday's television story lines was displayed as normal living situations."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0093494f-a390-40b3-bdef-279c26fe336d",
// 		"name": "submissive",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7619afb6-b0b7-47a9-b1aa-4ed5ac5397a7",
// 				"languages": [
// 					{
// 						"name": "easily yielding to authority",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Submissive men tend to become henpecked husbands, giving the rest of the gender bearers a bad reputation."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "009ce104-a7f3-44f1-b194-cac86e95caab",
// 		"name": "condone",
// 		"dictionary": null,
// 		"pronunciation": "/kənˈdəʊn/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "22df024a-ada0-4a6a-a5db-fca94cf10b7e",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "göz yummak, affetmek",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "to pardon, deliberately overlook",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "verzeihen",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"Fred felt so guilty for condoning his buddy's mistreatment of his wife."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "00a5733b-fa4b-4ee5-9303-ff8bc853eced",
// 		"name": "vilify",
// 		"dictionary": null,
// 		"pronunciation": "/ˈvɪlɪfʌɪ/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b7c4e0ed-571e-4a6c-9fa4-c1cc24489678",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "iftira etmek, kötülemek",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "verleumden",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "defame",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The article truly vilified the whole team, blaming all of them for the brutal post-game fight ."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "00cf161e-adb4-49e3-aa79-db617b507cf2",
// 		"name": "anonymous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4b7336a7-42c9-46d4-a275-5dbef58afe06",
// 				"languages": [
// 					{
// 						"name": "being unknown, unrecognized",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Mary received a love poem from a somewhat anonymous admirer, her romantically minded hubby."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "011f66f5-9246-42cd-893c-bd8c598a237f",
// 		"name": "innovative",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ceca30f5-5eb8-4237-9d8c-cea55e5b4bfd",
// 				"languages": [
// 					{
// 						"name": "(of a product, idea, etc.) featuring new methods; advanced and original",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Young minds come up with many and unique innovative strategies to get work done in fun and easy ways."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "01262cd2-2bb5-4a9d-8d39-b0a285165520",
// 		"name": "paradigm",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "dea0bef6-2a7c-40f6-9c4d-fa4cbd8c0e90",
// 				"languages": [
// 					{
// 						"name": "an example that is a perfect pattern or model",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Using computers as primary teaching tools is certainly a paradigm shift for our teachers."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "01827985-09bc-48f3-b809-ce64a32714d6",
// 		"name": "acumen",
// 		"dictionary": null,
// 		"pronunciation": "/ˈakjʊmən/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f000ecb4-0ef6-4d32-9aba-d4db1a4f0a1e",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "ability to make good judgements and quick decisions",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Scharfsinn",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "sezgi",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Because of her linguistic acumen, Lois the Loquacious was able to create in minutes manners of expression that took other students many hours."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "01a1bed1-bc6a-475d-b0f7-d35e749d7b2d",
// 		"name": "semaphore",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e7e24bd4-116e-4495-bdb8-f4c5bead803f",
// 				"languages": [
// 					{
// 						"name": "a visual signal",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The deaf and hard of hearing tend to communicate with clearly visible semaphores."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "021775e3-0a05-453d-a53c-2a384d96c755",
// 		"name": "culpable",
// 		"dictionary": null,
// 		"pronunciation": "/ˈkʌlpəbl/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ce1e222d-ee7d-4769-a549-1422fe0732c6",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "guilty, punishable",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "schuldig",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "suçlu, kusurlu",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The driver was found to be just as culpable as the shooter; thus, they both will be locked up for quite some time."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "023d53ec-e7a8-4509-a954-271db0aa4e4f",
// 		"name": "nonchalant",
// 		"dictionary": null,
// 		"pronunciation": "/ˈnɒnʃəl(ə)nt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0640e791-f72a-4a69-afcb-388e6b805fcd",
// 				"languages": [
// 					{
// 						"name": "kaltblütig; lässig; gelassen",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "heyecansız, soğukkanlı",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "having a lack of concern",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"I was shocked at how nonchalant Jennifer handled the news of her expulsion.",
// 					"She gave a nonchalant shrug."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0246dff0-4646-4a53-b5b9-d614f49c8b1a",
// 		"name": "pejorative",
// 		"dictionary": null,
// 		"pronunciation": "/pɪˈdʒɒrətɪv/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a333f579-d918-4afb-9a83-30af58cafee8",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "aşağılayıcı",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "abwertend",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "derogatory, vilifying, disrespectful",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Mitch's pejorative comments to his wife were seen as proof positive that he no longer cared nor even respected her.",
// 					"Permissiveness is used almost universally as a pejorative term."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "027df5f6-a84b-498b-a92a-611a1e14dca2",
// 		"name": "corrosive",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ba7ea448-6970-45ba-9f71-dfffbf705da4",
// 				"languages": [
// 					{
// 						"name": "having the tendency to erode or eat away",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Acid and metals seldom go together because of the corrosive character of the former."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "02a520f0-ef84-43c9-bd35-11c71ce7dcab",
// 		"name": "dissent",
// 		"dictionary": null,
// 		"pronunciation": "/dɪˈsɛnt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bc8d25aa-2520-45c1-9303-a1dd0b69da55",
// 				"languages": [
// 					{
// 						"name": "to disagree",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"I must dissent, gentlemen; this simply cannot be."
// 				]
// 			},
// 			{
// 				"id": "7703630f-b6d2-4c68-8f6d-c41c5f552a99",
// 				"languages": [
// 					{
// 						"name": "the act of disagreeing",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"After the dissent was registered, everyone knew it was going to be a long night."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "02d11d47-6a9d-4b90-92e1-14899d7a7b2d",
// 		"name": "reciprocate",
// 		"dictionary": null,
// 		"pronunciation": "/rɪˈsɪprəkeɪt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f8bc489c-58ea-4eae-b4d0-55705be08910",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "sich revanchieren",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "return a favor",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "iyiliğe karşılık vermek",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The Bonner's were so cordial to us we felt the need to reciprocate their invitation."
// 				]
// 			},
// 			{
// 				"id": "054801fd-bd98-4b57-b5b5-0165a8b84b23",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "(of a part of a machine) move backwards and forwards in a straight line",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"When you're shooting most semi-automatic handguns, the slide reciprocates as part of the firing cycle"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "02edaebb-9c60-4198-827e-a6815e3c968d",
// 		"name": "thwart",
// 		"contexts": [],
// 		"dictionary": null,
// 		"pronunciation": "/θwɔːt/",
// 		"definitions": [
// 			{
// 				"id": "62829022-113c-47f8-88dc-3c08dc610814",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "engel olmak, önlemek",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "vereiteln, verhindern",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "prevent someone from achieving their goal",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Someone built this wall with broken bottles set in the top to thwart the intrusion of outsiders.",
// 					"Despite their efforts to thwart her progress, she still managed to succeed in her presentation.",
// 					"The police were able to thwart the bank robbery before any money was stolen."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "031c7122-d91b-419b-9f47-a42da3879e22",
// 		"name": "commensurate",
// 		"dictionary": null,
// 		"pronunciation": "/kəˈmɛnʃ(ə)rət,kəˈmɛnsjʊrət/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8b927ca7-5e61-4de7-8334-b25a0615edbd",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "orantılı, eşit",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "gleich groß, in proportion",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "corresponding in size, amount or degree",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Usually starting salaries are commensurate with a person's age and experience."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0393a280-971b-4d46-8ec0-c3ce02c42e56",
// 		"name": "inextricable",
// 		"dictionary": null,
// 		"pronunciation": "/ɪnˈɛkstrɪkəbl/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "90395161-e583-4f68-8eda-b11738105f69",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "unentwirrbar, unlösbar",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "içinden çıkılmaz",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "hopelessly tangled or entangled",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"\"Understanding is an inextricable component of true wisdom,\" taught Professor Sage."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "03a1d7d9-05f9-4c87-863d-035bd95cb0d4",
// 		"name": "incarnate",
// 		"dictionary": null,
// 		"pronunciation": "/ɪnˈkɑːnət,ɪnˈkɑːneɪt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "197d6889-7ee0-42a6-ae7b-8d04eb48afca",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "in Menschengestallt, verkörpert",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "insan şekline girmiş",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "(especially of a deity or spirit) embodied in human form",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"That beast was fury and death incarnate, clawing and biting at anything that moved."
// 				]
// 			},
// 			{
// 				"id": "3bcf5959-5967-4f71-afc1-9078e672e045",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "embody or represent (a deity or spirit) in human form",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The idea that God incarnates himself in man"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "03b9cb87-8d6b-4f1f-a0da-34db31a18336",
// 		"name": "capitulate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8167d59c-f958-459e-9309-c67ef9355259",
// 				"languages": [
// 					{
// 						"name": "to surrender",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The enemy country capitulated in full after the second bomb fell on another city."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "03ef4a2e-9e8b-452e-8ac6-edf29a604489",
// 		"name": "impertinent",
// 		"dictionary": null,
// 		"pronunciation": "/ɪmˈpəːtɪnənt/",
// 		"contexts": [
// 			"When someone says or does something irrelevant in a way that is intrusive, it can be seen as rude or disrespectful. So, while \"impertinent\" originally meant \"irrelevant,\" its connotation expanded to include a sense of rudeness or inappropriate behavior, which is how it is most commonly understood today."
// 		],
// 		"definitions": [
// 			{
// 				"id": "f6d83bf6-f259-4857-95e2-cd811ca360fd",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "frech, unverschämt",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "saygısız, terbiyesiz, küstah, münasebetsiz",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "not showing proper respect; rude, insolent",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Most of your comments were dismissed because they were at best impertinent and at worst, unfounded and wrong.",
// 					"The impertinent child had a smart answer for everything."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "042183e1-1540-4f34-864d-91cdcd99ca0e",
// 		"name": "affable",
// 		"dictionary": null,
// 		"pronunciation": "/ˈafəbl/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e338fbaf-5f6a-4048-93da-af6bf0e7390d",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "nazik, hoş",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "freundlich",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "friendly, amiable",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Everyone likes to be around Jorge because he is so affable and kind-hearted."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "04261d0d-9ef5-46da-b07a-13f9a52edc1e",
// 		"name": "meliorism",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a665ef37-3c49-44c5-a4af-522fc4bdf380",
// 				"languages": [
// 					{
// 						"name": "a theory that holds that the world can be improved with well-directed human action; character",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"So he becomes the eloquent apostle of meliorism, proclaiming his gospel without abatement."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "045779db-6e57-4ee3-8bec-28244ec4416b",
// 		"name": "discrepancy",
// 		"dictionary": null,
// 		"pronunciation": "/dɪˈskrɛpnsi/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "31bcce20-dcf3-44fe-9bb7-448b76a6a630",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "difference, inconsistency",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Unstimmigkeit",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "çelişki, uyuşmazlık, tutarsızlık",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The discrepancy in the cost figures caused the principals to fear the upcoming audit.",
// 					"The discrepancy of the calculations of my bill by the hotel and myself was a matter of concern.",
// 					"Top critic score is 63%. Total critics score is 79%. Why such a discrepancy, and is that common?"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "049bed5b-48a3-48ec-808b-bb20e2c73165",
// 		"name": "exalt",
// 		"dictionary": null,
// 		"pronunciation": "/ɪɡˈzɔːlt,ɛɡˈzɔːlt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ca0b03d2-01ca-4340-9054-1ac017e182b9",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "yüceltmek, övmek",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "verherrlichen",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "to glorify, praise",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Our youth should be taught to exalt important things in life: the elderly, civil conduct, and moral laws."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "049e54b1-30b9-4bd3-94c1-cff1a11c8d01",
// 		"name": "credulity",
// 		"dictionary": null,
// 		"pronunciation": "/krɪˈdjuːlɪti/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6888edcf-4a34-400c-b045-65abc1c1a05d",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "Leichtgläubigkeit",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "saflık, her şeye inanma",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "gullibility, readiness to believe",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Ted's credulity made him and his all-too naive cousin really easy victims."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "04b2b1ad-247c-4fb1-8837-1d46f3207f83",
// 		"name": "mitigate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "54657981-cd93-4db3-bcfe-ecfdf60dcacf",
// 				"languages": [
// 					{
// 						"name": "to make less violent, alleviate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"In an attempt to mitigate the squabble between the brothers, their father took blame for most of the problem."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0566627b-24de-452d-830f-3a05ca1cc70b",
// 		"name": "profligate",
// 		"dictionary": null,
// 		"pronunciation": "/ˈprɒflɪɡət/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6ff9f604-ec39-477e-b587-96708934e377",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "verschwenderisch",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "savurgan",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "wasteful, dissolute, extravagant",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The profligate shopper went to every store in the mall, buying many things she didn't need and couldn't afford."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0576cd28-1171-435e-a621-b8d65987f1ce",
// 		"name": "bashful",
// 		"dictionary": null,
// 		"pronunciation": "/ˈbaʃf(ʊ)l/",
// 		"contexts": [
// 			"Has its roots in Middle English \"basseful,\" which is derived from \"bassen,\" meaning \"to be abashed or embarrassed.\" The root of this is the Old Norse word \"bæsk\" or \"besk,\" which means \"to blush.\""
// 		],
// 		"definitions": [
// 			{
// 				"id": "58017653-e7d1-4788-9e09-af90736f1982",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "shy, excessively timid",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "utangaç, çekingen",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "verschämt",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"Jerry was so bashful, he didn't even answer the beautiful girl when she asked him to go to the prom with her!",
// 					"Everything you need to know but have been too bashful to ask."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "05b198bb-e666-4384-8093-c6aac2721de5",
// 		"name": "prescient",
// 		"dictionary": null,
// 		"pronunciation": "/ˈprɛsɪənt/",
// 		"contexts": [
// 			"The spice melange enhances Paul’s physical and mental capabilities, granting him prescient visions and heightened senses."
// 		],
// 		"definitions": [
// 			{
// 				"id": "12beabf8-2f6c-4b06-b66b-cb5db03d90c9",
// 				"languages": [
// 					{
// 						"name": "to have foreknowledge of events",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "geleceği gören",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "vorherwissend",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Maggie was quite prescient, seeing the future as though it were the past."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "05d9bc5f-6bae-4485-9abc-e0e34a1ff30e",
// 		"name": "pulchritude",
// 		"dictionary": null,
// 		"pronunciation": "/ˈpʌlkrɪtjuːd/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "696d6964-9760-4161-9763-3e947630ca2c",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "physical beauty",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "güzellik, zarafet",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "Schönheit, Pracht",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"In today's world, women possessing the greatest degree of pulchritude are called supermodels.",
// 					"the irresistible pulchritude of her friend"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "05f0a52d-b49d-40c2-88ed-599c861a67b9",
// 		"name": "capacious",
// 		"dictionary": null,
// 		"pronunciation": "/kəˈpeɪʃəs/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "95195fa2-3de7-4def-997d-16b350f956ca",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "very spacious, roomy",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "geniş",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "geräumig",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"The work room has finally been expanded; it's now capacious enough for our guests."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "061a00d9-e18a-40b1-ba1e-9f5b9c57fa39",
// 		"name": "fallacious",
// 		"dictionary": null,
// 		"pronunciation": "/fəˈleɪʃəs/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c0df0ddc-b541-42e8-8c87-e43431076e46",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "false, deceptive, misleading",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "yanıltıcı, aldatıcı",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "falsch, irreführend",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"Captain Ken took the witness's statement as a fallacious bunch of lies designed to get his friend off the hook."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "063f560c-80e2-4b1c-a8d5-818f9f1f5fa9",
// 		"name": "contrite",
// 		"dictionary": null,
// 		"pronunciation": "/ˈkɒntrʌɪt,kənˈtrʌɪt/",
// 		"contexts": [
// 			"From \"Surviving Confession (2019)\": \"Now listen to me closely Charlotte, you have been playing this little game far too long and I'm getting sick of it. You come here all contrite, on your knees pleading for forgiveness only to turn around, drop to your knees and service Rupert Finnegan.\""
// 		],
// 		"definitions": [
// 			{
// 				"id": "1fec05ac-bbd8-4a34-a86d-cbffad52ffaf",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "regretful, penitent, remorseful",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "pişman",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "reuvoll",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"Bobby's contrite heart caused him to finally see the damage he'd caused to his teammates."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "06b6a61d-e488-4f19-b4b0-27b7b5627a87",
// 		"name": "corpulence",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ecbf6fb9-dd53-4c58-8afd-a62173e8cf5e",
// 				"languages": [
// 					{
// 						"name": "extreme fatness",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Because the chefs in our group were so skilled, corpulence became a real concern."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "06b99f8a-ebf6-4107-992d-b1de50d39374",
// 		"name": "alleviate",
// 		"dictionary": null,
// 		"pronunciation": "/əˈliːvɪeɪt/",
// 		"contexts": [
// 			"While both words involve reducing severity, “alleviate” focuses on providing relief from immediate discomfort, while “mitigate” deals with broader risk management and prevention.",
// 			"Alleviate is about providing relief or reducing the severity of an existing issue, while mitigate focuses on minimizing risks or preventing negative outcomes before they occur."
// 		],
// 		"definitions": [
// 			{
// 				"id": "13507d07-4ebd-477b-bdca-9fc542421732",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "to relieve, make more bearable",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "erleichtern, mildern, lindern",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "hafifletmek, dindirmek",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"This information will alleviate the fears of the soldiers, but only for a while.",
// 					"The doctor couldn't prevent her pain, only alleviate it.",
// 					"If someone has a headache, taking pain relievers can alleviate their discomfort."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "079b3b78-fd91-4b08-8647-cd34fc9b87df",
// 		"name": "concomitant",
// 		"dictionary": null,
// 		"pronunciation": "/kənˈkɒmɪt(ə)nt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "95fba6be-e874-413c-933c-e2bfacc64389",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "accompanying in a subordinate fashion",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "eşlik eden, beraberindeki",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "begleitend",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"Jealousy, with its concomitant ill will, will never have a proper place in a true friendship.",
// 					"She loved travel, with all its concomitant worries."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "07d5afc4-01d0-4e54-b00e-ac7bed0d3707",
// 		"name": "anomaly",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7ee8978c-8168-4b8f-85f3-70219edea478",
// 				"languages": [
// 					{
// 						"name": "something that does not fit into the normal order",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"Such a spatial anomaly could account for these so-called ripples in time !\" said Mr. Spock to his noble and heroic captain."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "07e46c8f-02c1-4d5f-91d1-1c2f7fc91296",
// 		"name": "torrid",
// 		"dictionary": null,
// 		"pronunciation": "/ˈtɒrɪd/",
// 		"contexts": [
// 			"Torrid can mean \"emotionally charged and passionate,\" like a torrid romance in a soap opera. But if you're listening to a torrid band, you're simply hearing musicians that have a lot of energy. Torrid is an adjective that can literally describe something extremely hot — like a torrid afternoon in the desert."
// 		],
// 		"definitions": [
// 			{
// 				"id": "83c7edc7-173b-4760-ab39-30950c824a71",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "very hot and dry (weather)",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "glutheiß",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "aşırı sıcak",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The desert was known for its torrid heat, making it nearly unbearable during the day."
// 				]
// 			},
// 			{
// 				"id": "76e9851a-be51-412f-8ea4-7ed74c69ff89",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "intense or passionate (romance)",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "leidenschaftlich",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "ateşli, ihtiraslı",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Their torrid romance became the talk of the town, full of fiery emotions and intense passion."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "088b577a-accd-4a37-884c-c69ada526e41",
// 		"name": "reclusive",
// 		"dictionary": null,
// 		"pronunciation": "/rɪˈkluːsɪv/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "30e3287d-f30d-43ad-801e-cb2fa2c0f038",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "living apart from society, living in seclusion",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "einsam, vereinsamt, zurückgezogen",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "Topluluktan kaçan, yalnız yaşayan",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The reclusive clan moved back into the deep woods, away from every human being."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "089967f5-f2a5-4d58-b9ea-1c4b75acd46c",
// 		"name": "innocuous",
// 		"dictionary": null,
// 		"pronunciation": "/ɪˈnɒkjʊəs/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6a65fad4-b0d2-4a5a-8877-737f74d3c258",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "harmless, inoffensive",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "harmlos, unschädlich",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "tehlikesiz, zararsız",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Most domestic spider bites are completely innocuous, harming only creatures as tiny as their would-be prey.",
// 					"It was an innocuous question."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "08a37f9c-fc1d-4083-987c-f896007379d2",
// 		"name": "heterogeneous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9ab86a05-fe31-4328-ba0f-3a565e6f1794",
// 				"languages": [
// 					{
// 						"name": "varied, diverse in character",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Because we were placed in heterogeneous groupings, variety was all we knew from day one."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "08ce8787-501c-48c9-8bc3-cb9941390890",
// 		"name": "presage",
// 		"dictionary": null,
// 		"pronunciation": "/ˈprɛsɪdʒ/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "fe81bdde-6de0-4198-b020-f8db64fb0be6",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "alâmet, kehanet",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "an omen",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Ahnung, Vorzeichen, Vorbote",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"The sight of the dreaded albatross was the presage most disdained by old seamen.",
// 					"The heavy clouds above the moorland were a presage to snow."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "08d51376-2054-408e-9536-1aa404fb0762",
// 		"name": "deride",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "33d2b152-f018-4964-b723-5bf632256198",
// 				"languages": [
// 					{
// 						"name": "to laugh at mockingly, scorn",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The 6th graders proved to be bullies, and derided the 3rd and 4th graders."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "08fc8f9c-82d3-4066-9e7e-f54cec83f29a",
// 		"name": "fetter",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "13cd8326-d99a-4761-ad76-2669494db7a4",
// 				"languages": [
// 					{
// 						"name": "to chain, restrain",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Everyone should ensure that their yard dogs are either fenced or fettered to a tree."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "093bdc6a-554e-42da-95ff-0784e03dc4ee",
// 		"name": "reprehensible",
// 		"dictionary": null,
// 		"pronunciation": "/ˌrɛprɪˈhɛnsɪbl/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "18ae7647-2cda-4c96-9cf5-674122713ea8",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "azarı hak eden, kınanması gereken",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "deserving of blame or strong criticism",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "tadelnswert",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"The killer's reprehensible conduct was found by the jury to be worthy of a life sentence."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "09648b32-85cf-4c3b-b944-f7f46730e5e1",
// 		"name": "paragon",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "303d5ac5-7c97-4c84-bd33-b3c22e9de09a",
// 				"languages": [
// 					{
// 						"name": "a model of excellence or perfection",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Hercules is a paragon of the traditional hero type - powerful, brave, and good."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "09979bdc-6c0b-4be3-bf49-e2e3e56f163b",
// 		"name": "magnanimous",
// 		"dictionary": null,
// 		"pronunciation": "/maɡˈnanɪməs/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ee3978eb-6270-4a58-a55b-5048148bfd9d",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "unselfishly forgiving, generous (towards a rival or less powerful), noble",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "cömert, bağışlayıcı",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "großmütig, sich in Großzügigkeit erweisend",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"The nurse's magnanimous spirit caused her to offer one of her own kidney's to her suffering patient.",
// 					"She should be magnanimous in victory"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "099f0338-bf31-4068-b569-c989488ef3a6",
// 		"name": "mercurial",
// 		"dictionary": null,
// 		"pronunciation": "/məːˈkjʊərɪəl/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "66cfa239-5b38-4058-8c4a-76120c2c5cf3",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "dakikası dakikasına uymayan, değişken",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "someone with unpredictable mood changes",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "unbeständig, nicht gleichbleibend, instabil",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"Sally was so mercurial before her test results came, no one knew what to say to her.",
// 					"\"His mercurial temperament\": Ein unbeständiger Charakter ist jemand, dessen Absichten und Meinungen häufig wechseln."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "09f27f99-0ca0-43ba-aefc-7a702ab8fe90",
// 		"name": "garish",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "91582292-98d3-41dc-908a-33223f3000d5",
// 				"languages": [
// 					{
// 						"name": "gaudy, in bad taste",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Bob must be color blind; because, that's the only thing that could possibly explain the garish decorations in his living room."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "09f438fa-03ff-4958-8506-48de4aa7fdc5",
// 		"name": "innuendo",
// 		"dictionary": null,
// 		"pronunciation": "/ˌɪnjʊˈɛndəʊ/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "df21c2e2-b0e6-49bf-9946-a4f2690ab332",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "ima, üstü kapalı söz",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "Anspielung, Andeutung",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "an insinuation",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"During the debate, the politician made several innuendos about plight of those on Medicare and Medicaid."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0a06fc3e-1fa8-488d-92d8-2d9c27040799",
// 		"name": "latent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "47a80ffa-ca8e-4e9b-8227-4ddde885c21e",
// 				"languages": [
// 					{
// 						"name": "hidden, but capable of being exposed",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The insidious germ lay latent in its host, waiting for some other sickness to strike first and make its victim vulnerable."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0ac5cc2d-323b-4455-9bf2-f3e5eb32f9e1",
// 		"name": "intrepid",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e646d0b6-6fbf-40c1-a7cf-d0bbfde02687",
// 				"languages": [
// 					{
// 						"name": "brave in the face of danger",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The intrepid soldier said he was just doing his job when he braved the bullets and flame throwers to save his comrades."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0b0ed9e9-f3a9-4039-bee9-6ba342c86ffd",
// 		"name": "anecdote",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1b59b37c-e50a-4346-b63a-a1d019842af7",
// 				"languages": [
// 					{
// 						"name": "a short, humorous account",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Billy's quaint Southern anecdote had his sophisticated hostess rolling on the floor, breathless and teary-eyed."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0b61ab5c-65e2-447c-9883-810173ec446d",
// 		"name": "audacious",
// 		"dictionary": null,
// 		"pronunciation": "/ɔːˈdeɪʃəs/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "11c26683-bc42-4176-9b3d-1bcca29eb1a0",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "excessively bold",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "cesur, yürekli",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "kühn",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"An audacious freshman actually challenged the upperclassmen to a match of wits.",
// 					"A series of audacious takeovers"
// 				]
// 			},
// 			{
// 				"id": "a6d54d91-792e-4873-a2da-5498ac271471",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "showing an impudent lack of respect, arrogant",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "küstah",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "verwegen",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"He made an audacious remark"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0b6dce4c-c93f-4ecc-b40f-a77b41f1f4bd",
// 		"name": "enervate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "147b547d-2fba-4d75-8608-77f4ba608e76",
// 				"languages": [
// 					{
// 						"name": "to weaken, exhaust",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The marathoners, languishing in the heat, were completely enervated after the tenth mile."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0b7c38e6-c0ac-435f-b897-4234e6dcc9ab",
// 		"name": "vacillate",
// 		"dictionary": null,
// 		"pronunciation": "/ˈvasɪleɪt,ˈvasɪlət/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "03c1d113-fa36-4192-a0e7-2f6f5f16fd23",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "bocalamak, tereddüd etmek",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "schwanken, zögern",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "to fluctuate, hesitate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"When the stakes went up, some of the players lost their aggressiveness and started to vacillate.",
// 					"I vacillated between teaching and journalism"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0bcd19be-d6d0-474c-8967-8dda7355d9c2",
// 		"name": "pragmatic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bf9fa5ff-369c-4d9f-8c49-fdd26c3e9343",
// 				"languages": [
// 					{
// 						"name": "practical",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Nancy's suggestion proved to be one of the most pragmatic to be discussed all day."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0c35e05e-0f72-419b-9341-8aef70eea793",
// 		"name": "divulge",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e0707dbf-5669-4150-aa7b-9d3741b02fbd",
// 				"languages": [
// 					{
// 						"name": "to reveal something secret",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Under pressure, the frightened captive started to divulge all he knew."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0c54e77b-c826-4e33-a2e2-e47b268c3ec9",
// 		"name": "frugal",
// 		"dictionary": null,
// 		"pronunciation": "/ˈfruːɡl/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "09bab332-5edf-4e95-a89a-0af9c0c19d5f",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "thrifty, economical",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "idareli",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "sparsam",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"Though I'm not quite as frugal as I should be, I'm certainly not a spendthrift."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0c578c83-6075-4c27-8ff1-a851be17f259",
// 		"name": "coagulate",
// 		"dictionary": null,
// 		"pronunciation": "/kəʊˈaɡjʊleɪt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "da211087-8744-4141-b359-e901d1517129",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "to thicken, clot",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "pıhtılaşmak, koyulaşmak",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "gerinnen",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"The blood finally began to coagulate, after a full hour of intense pressure."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0c66f682-cdcb-4cd4-abc0-fff8655bbd71",
// 		"name": "antiseptic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "23baad2c-5765-4906-bd02-b13d94227dc3",
// 				"languages": [
// 					{
// 						"name": "clean, sterile",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The antiseptic gauze kept Bob's wound clean and germ-free until the doctor could see him."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0ca3b185-a7d3-486b-8fb8-12e79ede1713",
// 		"name": "divisive",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "cf2027df-3a4b-4011-b6b0-423282d5189f",
// 				"languages": [
// 					{
// 						"name": "causing dissent, discord",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Theo was disciplined because his comments were deemed divisive by his employers."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0cbff0f1-9884-498d-9707-a70844457a01",
// 		"name": "lethargy",
// 		"contexts": [],
// 		"dictionary": null,
// 		"pronunciation": "/ˈlɛθədʒi/",
// 		"definitions": [
// 			{
// 				"id": "fc9abbea-ddfd-4adf-b8db-6f67b861f410",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "drowsiness, listlessness, sluggishness, lack of energy",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Gleichgültigkeit; Müdigkeit",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "uyuklama, uyuşukluk",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"There was an air of lethargy about him"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0ce5ba19-9b3e-4745-9aec-8d3a17159762",
// 		"name": "compliment",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9d512b78-a974-4f3b-a370-0806c6c0fa6b",
// 				"languages": [
// 					{
// 						"name": "an expression of esteem or approval",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"I always compliment young people when they put forth good effort, despite the outcome."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0e68c3e7-a9a1-4fbc-ae0a-4b69bcffc18a",
// 		"name": "rife",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5980131c-d7ae-43bc-8e1d-c9c8d95872a8",
// 				"languages": [
// 					{
// 						"name": "(especially of something undesirable) of common occurrence; widespread",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Crime is rife in the slum areas of our cities."
// 				]
// 			},
// 			{
// 				"id": "3b675179-5be3-4423-a72d-7764c0540e13",
// 				"languages": [
// 					{
// 						"name": "abundant, plentiful, or numerous",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Rife with excuses, the teenagers came completely unprepared for their final exam."
// 				]
// 			},
// 			{
// 				"id": "23ac5ef0-2ba4-4882-9e8d-6629ad359861",
// 				"languages": [
// 					{
// 						"name": "current in speech or report",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Rumors are rife that the government is in financial difficulty."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0ec1781a-0e08-4fe3-a4fe-4b7d2c3f2caa",
// 		"name": "aegis",
// 		"dictionary": null,
// 		"pronunciation": "/ˈiːdʒɪs/",
// 		"contexts": [
// 			"The modern concept of doing something \"under someone's aegis\" means doing something under the protection of a powerful, knowledgeable, or benevolent source."
// 		],
// 		"definitions": [
// 			{
// 				"id": "cd996e1d-3634-4556-94e3-b22aa9907154",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "shelter, protection; sponsorship",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "kalkan, siper, koruma",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "Ägide; Schutz; Förderung",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"\"the negotiations were conducted under the aegis of the UN\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0edab4a2-4098-45f9-b2de-6ce02805f34c",
// 		"name": "pabulum",
// 		"dictionary": null,
// 		"pronunciation": "/ˈpabjʊləm/",
// 		"contexts": [
// 			"Pabulum refers to worthless, empty ideas. Pabulum is a big load of hooey. Pabulum is one of many words for ideas that are worthless, dumb, silly, and especially empty. If someone is talking and talking but not saying a whole lot, they're spewing pabulum."
// 		],
// 		"definitions": [
// 			{
// 				"id": "197d5565-9e15-4e6d-bbe1-ce68324c8da3",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "nonsense, worthless, empty ideas",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "değersiz fikir",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "Schund, wertloses Zeug",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"It's coming from already-certified researchers out there working every day in the fields discovering that the pabulum is garbage."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0f6417d8-acc9-4d0c-b2f1-d68a10ab7351",
// 		"name": "callous",
// 		"dictionary": null,
// 		"pronunciation": "/ˈkaləs/",
// 		"contexts": [
// 			"Picard: \"The dilemma exists. We have to discuss the options. And please talk freely.\"\n\nWorf: \"There are no options. The Prime Directive is not a matter of degrees. It is an absolute.\"\n\nPulaski: \"I have a problem with that rigidity. It seems callous and even cowardly.\""
// 		],
// 		"definitions": [
// 			{
// 				"id": "da865ed0-4e46-41c7-93f7-94bcdba00f59",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "harsh, cold, unfeeling",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "duygusuz, şefkatsiz",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "verhärtet",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"Callous treatment of prisoners is not something that our government condones.",
// 					"His callous comments about the murder made me shiver."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0f67a271-cf51-4f00-8e9d-87293744cecb",
// 		"name": "cerebral",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "233c5acf-b4bc-44a3-8d27-d620047f054d",
// 				"languages": [
// 					{
// 						"name": "related to the intellect",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The library's shelves are stacked with cerebral selections on philosophy, religion, etc."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0fab6c15-75d4-415c-baef-bcee3c962436",
// 		"name": "contrived",
// 		"contexts": [],
// 		"dictionary": null,
// 		"pronunciation": "/kənˈtrʌɪvd/",
// 		"definitions": [
// 			{
// 				"id": "937c3c69-c4c1-4b82-be97-66ce38363612",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "uydurma, yapay",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "geplant, durchdacht; künstlich",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "deliberately created",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"In this example the JS factory function modifies DOM directly. It shouldn't do that but since this is a contrived example it's ok."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "0fe2d683-98a4-4e15-bbd5-f024b4726373",
// 		"name": "ambivalent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5951e626-15f4-452c-9a05-221b7b5c038b",
// 				"languages": [
// 					{
// 						"name": "having opposing feelings",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"My feelings for my X are truly ambivalent; love and hate in tandem dominate my heart."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1064ff1f-b367-4c17-a545-5855baeac2a1",
// 		"name": "obdurate",
// 		"dictionary": null,
// 		"pronunciation": "/ˈɒbdjʊrət/",
// 		"contexts": [
// 			"Unyielding to persuasion or stubbornly insensitive to change."
// 		],
// 		"definitions": [
// 			{
// 				"id": "ef25eb01-2800-4be3-bcbb-75d078226b24",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "dik kafalı, inatçı",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "dickköpfig, stur",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "pigheaded",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The young men were as obdurate as the long bearded men of the sea when it came to changing their ways.",
// 					"I argued this point with him, but he was obdurate."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "10c1b257-520c-4627-beb7-82f6eec4c18c",
// 		"name": "insatiable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "71adf54b-b580-4871-aaff-ff7dfc9f75f3",
// 				"languages": [
// 					{
// 						"name": "incapable of being satisfied",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"My appetite for fresh fish is truly insatiable; I can eat it every day of my life."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "110e16a0-9f1c-4522-a60e-14241ffbe4b8",
// 		"name": "rescind",
// 		"dictionary": null,
// 		"pronunciation": "/rɪˈsɪnd/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3825a08a-3f46-4533-b728-317df96d4e8e",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "to take back, annul, revoke, repeal",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "yürürlükten kaldırmak, feshetmek",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "zurücknehmen",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"After second thought, the principal decided to rescind her permission to have a school- wide party."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1218737a-a46d-4df3-9d6d-e408feeeed0d",
// 		"name": "paradox",
// 		"dictionary": null,
// 		"pronunciation": "/ˈparədɒks/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1ab4d3c5-9493-4cb5-b039-a0d90a0b7a69",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "self-contradictory, false, untrue statement",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Widerspruch",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "çelişki",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The notion time travel presents a multitude of paradoxes that are just beginning to be understood."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1233a5dd-45ad-40a1-a2ab-5d60b23b8b87",
// 		"name": "nefarious",
// 		"dictionary": null,
// 		"pronunciation": "/nɪˈfɛːrɪəs/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "404415ff-6ae3-45a0-b41f-a9b72a3c8044",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "kötü, alçak, hain",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "ruchlos, schändlich, böse",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "evil; wicked; vile",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The nefarious pirates arrived on the shores of the town with crossbones waving."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "12891149-4714-4a7b-93a4-065482aa1839",
// 		"name": "niggle",
// 		"dictionary": null,
// 		"pronunciation": "/ˈnɪɡl/",
// 		"contexts": [
// 			"\"You are niggling, in fact your are nitpicking\""
// 		],
// 		"definitions": [
// 			{
// 				"id": "52fbf003-585e-45c8-9e23-d38621fca21a",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "to be obsessed with trivialities",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "gereksiz ayrıntılarla uğraşmak",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "herumtüfteln, trödeln, ",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"\"Doreen wanted to discuss matters that niggled at her mind\""
// 				]
// 			},
// 			{
// 				"id": "f453ef86-fcdc-4315-aa13-dfff0f359d9a",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "a trivial criticism, discomfort, or annoyance",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"It is an excellent book except for my few niggles."
// 				]
// 			},
// 			{
// 				"id": "048db873-898c-4015-9ec7-3382e3f23093",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "nag, criticize",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "meckern",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "kusur bulmak, eleştirmek",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Despite the team's overall success, the manager continued to niggle about minor mistakes, never fully satisfied with their performance."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1298022c-700f-4297-b08b-8d24c738515b",
// 		"name": "compunction",
// 		"dictionary": null,
// 		"pronunciation": "/kəmˈpʌŋ(k)ʃn/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "189fd918-7e5a-4da5-aadb-41fefb604668",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "Gewissensbisse, Bedenken",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "vicdan azabı",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "uneasiness of conscience",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Kerry felt great compunction for the insensitivity he showed to his young employee.",
// 					"They used their tanks without compunction."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "12a986f4-f10c-4bc7-8db3-436dd13d93f8",
// 		"name": "cobbler",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3a4b16e9-e43d-494b-92e9-ef7af93d008a",
// 				"languages": [
// 					{
// 						"name": "a person who makes or repairs shoes",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Most cobblers make shoes out of the finest materials possible."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "12cccdef-a691-4cbe-b878-dc49bcae3b9a",
// 		"name": "aerial",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8466f932-3ac1-4c95-8ad8-4ae9076b8fb0",
// 				"languages": [
// 					{
// 						"name": "somehow related to the air",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"We watched as the F-15 fighters conducted ultra sophisticated aerial acrobatics."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "12e3b53b-5551-4632-9eda-1eaf802bd217",
// 		"name": "imperious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7f699536-55bb-4623-87b3-9b0b97797493",
// 				"languages": [
// 					{
// 						"name": "commanding, domineering",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"A trademark outfit is vital to sending out the right signals of imperious power as real-life dictators understand all too well."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "13a9c9a3-1734-48d6-8766-a626e2a63ba0",
// 		"name": "abnegation",
// 		"dictionary": null,
// 		"pronunciation": "/ˌabnɪˈɡeɪʃn/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bd3ecd81-f463-43c4-b600-a4c5a378e89d",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "denial of comfort to oneself, renunciation (Verzicht)",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "fedakârlık",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "Verleugnung (refusal to accept)",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"The zealot slept only on the floor, took only cold showers, and followed religiously many other practices of abnegation and self denial.",
// 					"They regarded nakedness as part of the abnegation necessary to achieve true enlightenment."
// 				]
// 			},
// 			{
// 				"id": "e24d4d6e-8580-4e12-b03d-a644bb871425",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "act of rejecting or refusing",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "red etme",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "Verweigerung",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"This abnegation of customer care really annoys me."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "13c78b47-8941-479c-9e7c-6579905aaeef",
// 		"name": "calibrate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0bf605af-064c-4176-8e2e-7c5334defcef",
// 				"languages": [
// 					{
// 						"name": "to set, standardize",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"I attempted to calibrate my car's computer timing system, but failed."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "13e61aa9-77be-4128-8535-2693417bbf97",
// 		"name": "expedient",
// 		"dictionary": null,
// 		"pronunciation": "/ɪkˈspiːdɪənt,ɛkˈspiːdɪənt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "402de51e-56cc-479e-a21c-b9f20c90d168",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "avantajlı, çıkarlara uygun",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "nützlich",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "advisable, advantageous, beneficial",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Though I can exempt myself from the chores that the other workers have to do, it wouldn't be expedient; for, they need to feel that I am one of them."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "14337360-f5b8-40c6-b051-4f36d3097a8f",
// 		"name": "variegated",
// 		"dictionary": null,
// 		"pronunciation": "/ˈvɛːrɪɪɡeɪtɪd,ˈvɛːrɪɡeɪtɪd/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2931c9f4-2051-41d1-a112-579480932eb6",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "diversified, distinctly marked",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "bunt",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "rengârenk, değişik",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The variegated patterns on the python make it one of the most beautiful creatures in nature."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "145c7b65-cea1-4321-b890-6c30f188c71e",
// 		"name": "concise",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2530bf34-da8d-45a2-850d-552da2430f20",
// 				"languages": [
// 					{
// 						"name": "brief and direct in expression",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Rules should be pronounced in concise statements of protocol, with nothing left to assume."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "148191e2-34b4-4e48-94cc-308b095553a3",
// 		"name": "nostrum",
// 		"dictionary": null,
// 		"pronunciation": "/ˈnɒstrəm/",
// 		"contexts": [
// 			"Nostrum refers to a cure-all, a drug, or a medicine that is ineffectual. Before drugs were regulated by the government, there were many nostrums sold to the public. “Snake oil” is one of the most well-known."
// 		],
// 		"definitions": [
// 			{
// 				"id": "a8bb31a6-82b7-41ee-b99d-771e6a1c6b5d",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "a usually questionable remedy or scheme",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "dertlere çare olacağı öne sürülen yenilik",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"A charlatan who sells nostrums."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "148bfc07-9147-41b8-906d-c66e9cc4c73a",
// 		"name": "exhort",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "933d28e3-ccbc-432e-91ff-c0f4c802ab66",
// 				"languages": [
// 					{
// 						"name": "to urge, prod, spur",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Parents usually exhort their children to perform their very best in everything, especially academics."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "14decfea-df0b-4ffd-bb84-2e9b1d44fcdf",
// 		"name": "rapprochement",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "52e9f6cd-bce9-4364-bff2-fa1cd49a53bc",
// 				"languages": [
// 					{
// 						"name": "the (re)establishment of good relations or harmony",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"there were signs of a growing rapprochement between the two countries\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1563a878-e3a4-4e81-a091-c4b256fef7b0",
// 		"name": "ideation",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "edf88b01-8b9f-43b7-ac6b-5dcab94a458e",
// 				"languages": [
// 					{
// 						"name": "the formation of ideas or concepts",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The conceptual logic has made the mistake of making ideation a stage in thought prior to judgment."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1564c0a5-fe5d-4c11-b4e7-d600761e3e4f",
// 		"name": "hiatus",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b3bceadc-8711-4a12-b4cc-76260d86d4d3",
// 				"languages": [
// 					{
// 						"name": "a break or gap in duration or continuity",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Benjamin's hiatus lasted so long everyone concluded that he wasn't planning to ever return."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "15676c38-4e87-4c58-bb78-4d0e2600ee90",
// 		"name": "vicarious",
// 		"dictionary": null,
// 		"pronunciation": "/vʌɪˈkɛːrɪəs,vɪˈkɛːrɪəs/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1c3f202f-dc5e-47f5-82bc-342b41a9ddf4",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "experienced indirectly through someone else's experience",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "dolaylı olarak duyulan veya deneyimlenen",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "nachempfunden",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"Readers have discovered that they can travel to exotic lands vicariously through the fascinating characters they read about.",
// 					"This catalogue brings vicarious pleasure in luxury living.",
// 					"I could glean vicarious pleasure from the struggles of my imaginary film friends."
// 				]
// 			},
// 			{
// 				"id": "427a46bc-65f6-4a04-b388-d878a11f8542",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "vekaleten yapılan",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "substituted, delegated",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "stellvertretend; repräsentativ",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"The phrase “vicarious atonement (reparation for a wrong or injury)” refers to the concept of someone else taking on the consequences or punishment for another person’s actions. \"Jesus Christ’s sacrifice on the cross was a vicarious atonement for humanity’s sins\". Essentially, it means that one person’s actions or suffering can serve as a substitute for another’s, especially in matters of redemption or forgiveness.",
// 					"Vicarious punishment occurs when one person suffers consequences on behalf of another.",
// 					"A vicarious sacrifice involves someone else taking on the burden or consequences for someone’s actions."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "156f759d-9f30-4e84-8803-c30155c21714",
// 		"name": "ecstatic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0f3cd8bf-d0f9-4490-aebb-bcccf2277a6a",
// 				"languages": [
// 					{
// 						"name": "intensely and overpoweringly happy",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"I was ecstatic when the news came about the graduation of my eldest son, Dr. Raymond L. Johnson!"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "15f4be66-28f1-4cb3-8674-9e14979910cf",
// 		"name": "iridescent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f7318d6e-5a4e-432d-9c32-518f60355ce8",
// 				"languages": [
// 					{
// 						"name": "showing rainbow colors",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"There was an eerie iridescent glow coming from the site of the UFO crash."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "16084a39-aafe-4c45-9125-0c5d89d22392",
// 		"name": "torpid",
// 		"dictionary": null,
// 		"pronunciation": "/ˈtɔːpɪd/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6d8f34b8-07c1-49f3-acc4-baabf31debd3",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "lacking energy and motion, lethargic, dormant",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "uyku halinde, ağır, uyuşuk",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "träge, schlafsüchtig",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"The torpid kid just sat on his soft sofa and ate chips and watched television all day."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "168dc017-cd3c-4686-8323-eeb903568b94",
// 		"name": "dilatory",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "aa0f5c99-826c-4505-b069-bb6eab49e59a",
// 				"languages": [
// 					{
// 						"name": "tending to delay, causing delay",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Wise parents learn dilatory tactics to avoid giving unrehearsed answers to teens."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "16948cff-158d-477c-b006-9b566bef7f0b",
// 		"name": "sacrosanct",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "20c64886-1d9f-4f79-b3ce-0317a1591410",
// 				"languages": [
// 					{
// 						"name": "holy, something that should not be criticized",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"There is no doubt, in American culture the Bible is the most sacrosanct of all volumes."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "16967959-8e23-4cf1-8c80-41f71dc32778",
// 		"name": "forlorn",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "514dd455-cfd2-4293-9a0d-cbffa8186984",
// 				"languages": [
// 					{
// 						"name": "lonely, abandoned, hopeless",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Jennifer seemed so forlorn, when Aliza, her best friend, moved to Alabama."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "169efe26-01ae-4bf5-84c8-ffb7d52469d4",
// 		"name": "eleemosynary",
// 		"dictionary": null,
// 		"pronunciation": "/ˌɛlɪiːˈmɒsɪnəri,ˌɛlɪiːˈmɒzɪnəri/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0df4deab-d0b6-4b28-b753-8c370b19e97f",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "involving charity; dependent upon charitable donations",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Dear Aunt Jennie, as I view it, you are not running an eleemosynary institution here?"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "16b75d62-7664-49a2-bfa7-56d3dd0eb11f",
// 		"name": "colloquial",
// 		"dictionary": null,
// 		"pronunciation": "/kəˈləʊkwɪəl/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e7615b3d-e029-42c6-b60d-f8814ac932d2",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "umgangssprachlich",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "informal (conversation)",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "günlük konuşma dilinde",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"I ain't got none is a colloquial expression that means I don't have any."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "16fdcba8-ff5c-45b9-971b-f166b8d5c5b3",
// 		"name": "codex",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e5516e3c-7cc9-408a-b34b-a1828bf0e605",
// 				"languages": [
// 					{
// 						"name": "the earliest form of book, replacing the scrolls and wax tablets of earlier times",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The codex worked a revolution in human communication, and the human understanding of the text was never the same."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "17112ce0-6319-4028-a716-c36bd2505355",
// 		"name": "bias",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c293a62e-49f5-4be5-8e30-ebae27a94e0f",
// 				"languages": [
// 					{
// 						"name": "a tendency, inclination, prejudice",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The judge's bias against drunk drivers caused him to step aside and allow one of his colleagues to preside in the matter."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1750b423-3d13-4741-bdf0-c3feb209adee",
// 		"name": "acquiesce",
// 		"dictionary": null,
// 		"pronunciation": "/ˌakwɪˈɛs/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5be413f4-9b6b-4814-b11c-887bd3c7fb6b",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "agree/accept without question; submit, yield, give in;",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "kabul etmek, razı olmak, karşı çıkmamak",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "sich fügen; einwilligen",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"Though Mr. Cold wanted to stay inside and work in his office, he acquiesced to his wife's demands to \"Come on out and eat it while it's hot!\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "179aa661-8a81-4d28-9f67-91bdb8c21b06",
// 		"name": "pervasive",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a56ddc47-3d1b-49de-bbe6-043b09704eec",
// 				"languages": [
// 					{
// 						"name": "having the tendency to spread throughout",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The airborne plague became pervasive throughout the countryside, once the winds changed."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "17e92153-67ca-47cd-9441-96788ad57c46",
// 		"name": "increment",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "50a0784f-c1b7-4b5d-ac9e-5a31f10e55c8",
// 				"languages": [
// 					{
// 						"name": "an enlargement; the process of increasing",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The flood waters grew in increments, increasing with each successive dam burst."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "17ebea7d-df84-442a-9be0-81830ace8983",
// 		"name": "repulse",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e8e4dd93-2750-40cb-9a02-df0b2f29693d",
// 				"languages": [
// 					{
// 						"name": "to disgust",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Audiences were repulsed by the film's brutality"
// 				]
// 			},
// 			{
// 				"id": "0823c274-4f36-4be9-a099-5580009eabec",
// 				"languages": [
// 					{
// 						"name": "to push back",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The wall of water was slowly but surely repulsed by the shifting winds."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "17f0239c-203f-498a-bd0a-ff3d256d667c",
// 		"name": "discomfit",
// 		"dictionary": null,
// 		"pronunciation": "/dɪˈskʌmfɪt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9a1d949f-5265-4951-80d2-ce318e93061e",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "frustrieren, verunsichern, verwirren",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "thwart, baffle, confuse, perplex",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "kırmak, pes ettirmek",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The interrogators attempted to discomfit their prisoners so that information could be gained."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1868427a-4d16-4de0-9114-b30a4c941dd0",
// 		"name": "foster",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "08631992-8183-49df-a0ac-367c05493580",
// 				"languages": [
// 					{
// 						"name": "to stimulate, promote, encourage",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Good manners will always foster positive interactions, even between those who disagree."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "18718feb-f4db-42a4-8b83-39f9ebed3d27",
// 		"name": "resolute",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "846b5e17-8acb-4166-8d7a-94b54fa4ab37",
// 				"languages": [
// 					{
// 						"name": "firm, determined",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Jim was totally resolute in his decision not to allow extended vacations, even under the pressure of old friendships and rain checks."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "188a4f1f-1222-4906-b7cb-b71efa30ad80",
// 		"name": "chide",
// 		"dictionary": null,
// 		"pronunciation": "/tʃʌɪd/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "906427e1-3ca2-4cdb-a6a0-a463b5979593",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "azarlamak, söylenmek",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "to voice disapproval, scold or rebuke",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "tadeln, rügen",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"Candice chided her twins for keeping their room is such disarray."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "18f5efd7-20f9-4a04-b2a7-b1a4aa73532d",
// 		"name": "berate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "df359755-d7e9-4e8e-8eaf-3963608c5fcf",
// 				"languages": [
// 					{
// 						"name": "to scold vehemently",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The aggravated policeman berated the ill-tempered driver for using profane language in front of a youngster.."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1965a983-9c5e-43e6-9be1-dec05afa1fcb",
// 		"name": "goad",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "398a481c-0d69-4787-905e-7e763d912b0c",
// 				"languages": [
// 					{
// 						"name": "to urge, spur, incite to action",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Calvin's friend, Roger, constantly tries to goad him into skipping school with him."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "19eba2ed-08b1-4567-8c42-367782cb7e35",
// 		"name": "distend",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ebbde09e-6e98-43d1-992d-fc1f475613f5",
// 				"languages": [
// 					{
// 						"name": "to swell out",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The malnourished children's stomachs begin to distend when their hunger approaches starvation."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1a36c7da-5d6a-4f16-a4f9-634b57fe94b1",
// 		"name": "eugenics",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "eafda053-c134-4082-a1ac-dc6cbb1d033f",
// 				"languages": [
// 					{
// 						"name": "the study of ways in which to improve the human race through genetic breeding",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Watch a montage of his many references, from SS uniforms, to the Third Reich, to eugenics."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1a9677f0-693d-46b2-968b-337915de9eeb",
// 		"name": "tyro",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d55c8de6-c9f4-41ba-9f98-76004500d7dd",
// 				"languages": [
// 					{
// 						"name": "a beginner; one who understands the basics but lacks any experience",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"But this highly dangerous work had better not be attempted by the tyro."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1b2db772-0894-4378-82bc-2c40fab92deb",
// 		"name": "cordial",
// 		"dictionary": null,
// 		"pronunciation": "/ˈkɔːdɪəl/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "715c93cc-3227-4cae-b657-7709ea1e8605",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "warm, affectionate",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "samimi, candan",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "herzlich",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"Her cordial invitation was received eagerly, and it was responded to the same."
// 				]
// 			},
// 			{
// 				"id": "31eba295-4031-44bb-bf10-1455ed5078d4",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "canlandırıcı ilaç, likör",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "alcoholic liquor, medicinal drink",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Trunk; Sirup",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"Wine cups and fruit cordials."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1b5af10c-61d7-43eb-9abd-563f6f74800b",
// 		"name": "lurid",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "532190b1-baac-4876-af01-cccffaeb604f",
// 				"languages": [
// 					{
// 						"name": "ghastly, sensational",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The murder mystery was replete with twists, turns, and the lurid details that Gosa had become famous for."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1badcbb7-cc36-47bd-9c86-620d57ca4ebc",
// 		"name": "kudos",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bdb65716-2544-45ac-ba9e-b55bfe4a81c6",
// 				"languages": [
// 					{
// 						"name": "praise for an achievement",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"After that incredible performance, the reviewers gave cheerful kudos to the new singer."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1bea9f58-7baf-4f6e-b163-08d7ee151cd4",
// 		"name": "fervent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "541c7aad-44bc-4af8-8840-c916c260af6c",
// 				"languages": [
// 					{
// 						"name": "ardent, passionate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Martha's love for Quinton was fervent like the summer sun; there was no cooling it."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1bf51e56-f734-4f0a-af49-3b893ade5485",
// 		"name": "prosaic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6e822b1d-ce5b-406a-99d4-db35d07435bb",
// 				"languages": [
// 					{
// 						"name": "plain, lacking liveliness",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The plot of the play was rather prosaic, having characters that sat around and slept for hours, and didn't bother to even dream."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1c0d904f-6d3e-4227-bff6-fe28614fe3b8",
// 		"name": "obsolete",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "62091dd7-e998-43c2-9c66-89f43a0f7a55",
// 				"languages": [
// 					{
// 						"name": "no longer used, out of date",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The type writer has become an obsolete business tool."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1c5090b0-b8bc-47b1-a4d5-b410bdaf76e4",
// 		"name": "appal",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0b049cad-f94d-41ef-9e11-4ac8425f7f44",
// 				"languages": [
// 					{
// 						"name": "inspiring shock, horror, disgust",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The jury thought the defendant's account was cold-hearted; thus, they were deeply appalled and found him guilty as charged."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1c755c1d-0738-4c41-8e51-f29b779ca263",
// 		"name": "subjugate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1865018f-8507-43cc-8927-9e1d9ce62879",
// 				"languages": [
// 					{
// 						"name": "to bring under control, subdue",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The conquering general had no desire to kill the inhabitants of his new realm; he wanted more than anything else to subjugate them and use them as a labor force."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1ca17a75-8672-46c7-b9a2-0ccaf86caef2",
// 		"name": "indignation",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c1f571d0-57ac-4371-a920-6291e71cc4dc",
// 				"languages": [
// 					{
// 						"name": "anger sparked by something unjust or unfair",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"I resigned from my father's fraternity because of my indignation at its hazing practices."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1cee67c9-9fdc-4def-aa05-283d1219935c",
// 		"name": "nuance",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8892b0a3-88be-4989-8e3d-ee0b5094d36a",
// 				"languages": [
// 					{
// 						"name": "a slight variation in meaning, tone, or expression",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"There was but a nuance of difference between the shade I wanted and the shade they had in stock."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1e117062-e6f8-4687-b8af-c6458ce7c655",
// 		"name": "incendiary",
// 		"dictionary": null,
// 		"pronunciation": "/ɪnˈsɛndɪəri/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "91ac2d94-843f-4f8f-b67b-e21aec7591fd",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "a person who agitates",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Aufreizer",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "kışkırtıcı kimse",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Darell's gossipy habits earned him the reputation as an incendiary."
// 				]
// 			},
// 			{
// 				"id": "2f8c6676-c319-415a-9439-fcbd03836e10",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "inflammatory, causing combustion",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "yangın çıkaran",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "anstiftend",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"Gasoline is the most incendiary liquid on the market."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1e3bdb1d-95b8-49ae-b5c0-4e957be71c55",
// 		"name": "debacle",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6513b09c-a973-422a-9564-6f03475e1aa2",
// 				"languages": [
// 					{
// 						"name": "a disastrous failure, disruption",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"After his latest debacle, wonder boy has taken a much less conspicuous posture."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1e46af21-a965-4820-8495-ed842ecda39e",
// 		"name": "paramount",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "88f3044e-0f9a-4ba8-a6f9-ade6835a5e7c",
// 				"languages": [
// 					{
// 						"name": "greatest in importance, rank, character",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The paramount issue here is not his condition; it's the condition of his vast estate."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1e74de68-38da-4554-a3db-25cf35b3033f",
// 		"name": "palette",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7434cd8d-8c3b-4a74-938a-65a936c5f9ec",
// 				"languages": [
// 					{
// 						"name": "a range of colors or qualities",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The multi-national palette of the quilt was seen as the greatest gesture of peace, soothing even the most ardent of attendees."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1e7c1941-e8ee-49a6-b0f5-d1a09ac3a755",
// 		"name": "bane",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "83310caa-61f8-457c-b163-3ff1a40bce42",
// 				"languages": [
// 					{
// 						"name": "a burden",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"That moron seated behind me has been the absolute bane of my existence since grade school."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1ea09034-ade8-42a4-a790-b8f870e2d797",
// 		"name": "maelstrom",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e038bc43-b79f-48f1-a531-d93bca445d15",
// 				"languages": [
// 					{
// 						"name": "a destructive whirlpool which rapidly sucks in objects",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"During the most violent storms in the Arctic Ocean, enormous maelstroms are formed that could pull any ship to the depths of destruction."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1ea854fa-2972-4da7-9fc7-cee5dc0d0043",
// 		"name": "salutation",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ee84a28c-16b4-4f24-89c5-3cc5a054582a",
// 				"languages": [
// 					{
// 						"name": "a greeting",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Joseph's salutation was so warm and heart-felt; we knew instantly that we were really welcomed there."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1f11cbc0-d047-44c8-b7c0-d8de5e0d82c6",
// 		"name": "quaint",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "763ed5cb-f123-47d1-9dc7-74418e9fd3c7",
// 				"languages": [
// 					{
// 						"name": "charmingly old-fashioned",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"During our vacation in the mountains, we chanced to stay at a quaint little bed and breakfast."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1f428e7a-fe22-454b-a0da-83d715492a2e",
// 		"name": "stoic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7f2e9885-84bd-49dd-95d9-0a2e4cac81b0",
// 				"languages": [
// 					{
// 						"name": "unaffected by passion or feeling",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The best judges around tend to be stoic in their manner and in the ultimate decisions that they render."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "1f84e34c-19eb-42a2-aaa0-69816faf00f1",
// 		"name": "encore",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8e822eb8-c131-4338-a48e-c74ed8cfd0a6",
// 				"languages": [
// 					{
// 						"name": "a repeat performance at the audiences' insistence.",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"Encore! Encore!\" the crazed fans screamed, over and over again."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "206b80d1-9c96-49e1-a972-9df6f7012640",
// 		"name": "repudiate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6890a0ab-1ed9-407d-a681-eef2e448fa33",
// 				"languages": [
// 					{
// 						"name": "to reject, refuse to accept",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The career criminal made a plea to the judge; but, it was repudiated with the words that touted justice and in the name of community safety."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2084dc56-c24e-4601-b0a8-d59844a1f912",
// 		"name": "colossus",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6fd2c06d-bf19-4b40-b568-ab99ce948c78",
// 				"languages": [
// 					{
// 						"name": "a gigantic statue or thing",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"In ancient Corinth a colossus of Athena stood tall, testifying of a time long ago."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "208fbb4e-02cd-4549-8f0e-3862624b544b",
// 		"name": "abase",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f425f741-ac07-4cfc-899d-68a6b214cd21",
// 				"languages": [
// 					{
// 						"name": "to humiliate, to degrade",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Though Brutus, a twice-held-back bully, tried his best to verbally abase Travis and the kids he played with, nothing he said seemed to matter to any of them.",
// 					"The mother-in-law would demean her, as a way to abase the young wife in the son's eyes."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "20b8e25a-1037-44dd-b566-043f95f4d6fd",
// 		"name": "rubric",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4b44ecaa-1338-4e6a-bb9b-1ad56b502296",
// 				"languages": [
// 					{
// 						"name": "a class, concept or category; a decorative title or first letter of a book printed or underlined in red",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"But for some center-right media outlets, this probably fit into the \"too good to check\" rubric."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "214cf896-69ed-4ded-b37e-e1a1314361c3",
// 		"name": "dour",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4fbb5694-94ab-423e-a43e-d9107fc9afce",
// 				"languages": [
// 					{
// 						"name": "stern, joyless",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The counselor was a dour fellow indeed, finding nothing whatsoever to laugh about or to even smile about."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "218b0a17-0aef-449c-8916-53fd6fda19d9",
// 		"name": "trope",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "caffff2c-ea87-4215-894f-01afcc6b6668",
// 				"languages": [
// 					{
// 						"name": "A figure of speech using words in nonliteral ways, such as a metaphor.",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Whether someone else assumes he said it, or merely uses it as a rhetorical trope, is not evidence."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "21a871ac-ba6e-4e03-8fa5-68fb3bbb4af3",
// 		"name": "calumny",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8b07ba91-0dbd-4c14-8fe9-00ace6e6a5ac",
// 				"languages": [
// 					{
// 						"name": "an attempt to spoil someone else's reputation by spreading lies",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Calumny is a close-to-perfect synonym for the word of slander."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "21bb8669-cd49-41dd-a4dc-db844c7e5232",
// 		"name": "arbiter",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "476554bc-6b03-42b0-933d-d2ff7a90ae5c",
// 				"languages": [
// 					{
// 						"name": "one who can resolve a dispute or make a decision",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The wise arbiter granted the east side of the island to its original owners, and the balance he gave to the newcomers."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "22015456-9dc5-4840-aeaa-98fe2bf5c231",
// 		"name": "brazen",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ea9b6781-b3c8-4269-a533-3c70ccf17b13",
// 				"languages": [
// 					{
// 						"name": "excessively bold, brash",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The invaders brazen attack took the fort by surprise; no one survived."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "223787c3-e579-47ea-b976-351ed6f9b6f6",
// 		"name": "maverick",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3d2a2d1a-2c31-4b75-a376-c53a94e38614",
// 				"languages": [
// 					{
// 						"name": "an independent, nonconformist person",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The suspense writer didn't think of himself as a maverick; he was just writing what he thought was usual stuff."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "22c38a91-18e4-4c9b-90d4-7cff8dbe95ca",
// 		"name": "intractable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "21eb08f5-7d04-49df-9b88-084f70b172a2",
// 				"languages": [
// 					{
// 						"name": "difficult to manipulate, unmanageable",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The conduct of testosterone-driven athletes is intractable, especially after a big win."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "22e601e8-e2dd-40be-a663-bb02a723cd3e",
// 		"name": "sophomoric",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d83f508f-d63f-43dc-8087-cf2d3fe6155f",
// 				"languages": [
// 					{
// 						"name": "immature, uninformed",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The freshmen thought the pledging requisites were sophomoric, and therefore chose not to pledge."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2367e6b9-a01e-4896-a40b-df72a44e6520",
// 		"name": "figurative",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ffc10b63-a217-4991-818c-aae5dae5026c",
// 				"languages": [
// 					{
// 						"name": "symbolic",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Using figurative language, Alice compared the storm to an angry man wielding burning daggers."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2381f4f0-b9c8-4d10-b551-ffd7ca74fc2d",
// 		"name": "catalyze",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "71cbec3c-9c11-4845-ac3f-bd6d6b1b9596",
// 				"languages": [
// 					{
// 						"name": "to charge, inspire",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The king's speech catalyzed his warriors and prepared them to face a deadly foe."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "23d1c869-93f0-4db4-b63f-f08807352dfe",
// 		"name": "philanthropic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "55572d29-3ab0-4fc5-8610-686b4e1bef01",
// 				"languages": [
// 					{
// 						"name": "charitable, giving",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The Tycoon's philanthropic gesture fed thousands and housed tens of thousands."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "23e722a3-d3c3-447a-a209-3813fafc8b2f",
// 		"name": "accretion",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5b258e7d-4870-45d8-a6ec-a21a70e5e235",
// 				"languages": [
// 					{
// 						"name": "slow growth in size or amount",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Giant stalactites are formed in the roofs of caves and caverns by the accretion of dripping mineral-laden water."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2432da7b-62ad-4682-91d2-6fd8bf3644d2",
// 		"name": "arcane",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1218fcf1-7825-4487-ba9d-d941b9b3fcf5",
// 				"languages": [
// 					{
// 						"name": "obscure, secret, known only by a few",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The professor of ancient writings suggested that the tablet was arcane but somewhat decipherable."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "245a9e4a-bf81-4aff-be06-0e8e5a86d95f",
// 		"name": "commodious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "69c91f40-4d33-458b-bf15-3a406776e979",
// 				"languages": [
// 					{
// 						"name": "roomy",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The hotel rooms at the Horizon were both commodious and lavishly decorated."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "24dba237-19ed-4049-bbd2-baa5b254e402",
// 		"name": "discursive",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f1fb4930-b003-4914-9cdc-f20923bd83a9",
// 				"languages": [
// 					{
// 						"name": "rambling, lacking order",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Bob's speech became discursive after the hecklers started to yell their disapproval."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "25807b2b-69e9-4d30-86a4-422369f53672",
// 		"name": "quagmire",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "737f7e4b-d933-49a2-a949-7aa95bf3737e",
// 				"languages": [
// 					{
// 						"name": "a difficult situation",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Playing video games when you should be studying is one of the easiest ways to put yourself in an academic quagmire."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2584e85f-46f9-4897-b353-50d49ab6dd9d",
// 		"name": "mimetic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0fd647d2-f80b-4f0a-8e27-eef19507a2d5",
// 				"languages": [
// 					{
// 						"name": "imitative; in art or literature, imitative of the natural world",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"\"mimetic patterns in butterflies\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "25885eee-d5f0-4917-985e-31d759c657d3",
// 		"name": "noxious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8b02cdba-73b1-474e-aa89-504eaa01f09f",
// 				"languages": [
// 					{
// 						"name": "harmful, unwholesome",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The noxious fumes simply overwhelmed the investigators as well as all others within a two-block radius."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "25a2668d-6410-49d5-80d1-b8eef6f58429",
// 		"name": "analgesic",
// 		"dictionary": null,
// 		"pronunciation": "/ˌanlˈdʒiːzɪk/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8e167658-fc3c-4bc1-bfa6-47c0a7e8b329",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "something that reduces pain",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The injured athlete cried for his analgesic, saying, \"The pain is unbearable. Stop it! Stop it!\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "25b3d46d-bd86-4c28-96c5-330be7d06519",
// 		"name": "genial",
// 		"dictionary": null,
// 		"pronunciation": "/ˈdʒiːnɪəl/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "344bded3-1687-4e36-b331-6bed2d6d854d",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "friendly, affable",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "angenehm; freundlich",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "güler yüzlü, neşeli, hayat dolu",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Genial conduct is one of the sure signals of dignified intelligence."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2605563d-9f54-4e95-b6e3-7908c06ea4d6",
// 		"name": "promulgate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c4541044-29ad-4937-b8cb-77276d22711d",
// 				"languages": [
// 					{
// 						"name": "to proclaim, make known",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"To promulgate the notion of ethnic superiority with not a shred of objective evidence is an act of idiocy."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "26b47a0b-8eed-4f42-a7ac-6543e504dd8d",
// 		"name": "confidant",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "636242c1-e6a0-47d7-a550-a4e817227ae2",
// 				"languages": [
// 					{
// 						"name": "a person entrusted with secrets",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"A spouse should be a person's best and dearest confidant, knowing and sharing in their deepest secrets."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "275e18f6-d9b8-4217-9340-3dbf196257cc",
// 		"name": "concord",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d3f232f3-bf43-4d6b-af41-93e67c90aabf",
// 				"languages": [
// 					{
// 						"name": "harmonious agreement",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"After numerous sessions with the counselor, the embattled couple finally enjoyed the concord that wedded bliss can bring."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "27ac0d69-a019-4478-95a2-b88ea4a2891d",
// 		"name": "superfluous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ae83fd39-7e1a-4b74-beea-e951e71302cb",
// 				"languages": [
// 					{
// 						"name": "exceeding what is necessary",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"After everyone has gotten their agreed-upon portion, everything else can be considered superfluous and given to those in need."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "27c12421-e40d-4a95-b44d-9ea872d7154b",
// 		"name": "ignominious",
// 		"dictionary": null,
// 		"pronunciation": "/ˌɪɡnə(ʊ)ˈmɪnɪəs/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "26752e99-b14b-4959-91d2-1db0e6144106",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "entehrend",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "humiliating, disgracing",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "rezil, aşağılayıcı",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"What they did to that baby was the most ignominious act I'd ever heard of or even imagined."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "280a58b5-80fa-461e-8e50-596e54d0a557",
// 		"name": "wily",
// 		"dictionary": null,
// 		"pronunciation": "/ˈwʌɪli/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7563e9de-a72d-46b9-acbe-58d943bcdeae",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "kurnaz",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "crafty, sly, cunning, tricky, deceptive",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "verschlagend",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"In nature, once an animal escapes an attacker's first assault, it becomes much more wily and cunning."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2840213f-7555-43fa-ab7c-d1ba742e3281",
// 		"name": "grandiloquence",
// 		"dictionary": null,
// 		"pronunciation": "/gran-ˈdi-lə-kwən(t)s/",
// 		"contexts": [
// 			"It’s typically used to impress others with elaborate and grandiose language.\n",
// 			"Political Speech: “My fellow citizens, we stand on the precipice of a new dawn, where the radiant beams of prosperity shall illuminate our path to an unparalleled epoch of greatness.”",
// 			"Formal Address: “Esteemed colleagues, it is with profound reverence and unbounded enthusiasm that I present to you this groundbreaking revelation, a testament to our collective ingenuity and unwavering dedication.”",
// 			"These examples showcase how grandiloquence can be used to create an impression of importance or sophistication, often at the expense of clarity or simplicity."
// 		],
// 		"definitions": [
// 			{
// 				"id": "1f614600-e418-4fbd-bda6-39460603a1b6",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "fancy or impressive style of speech or writing",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Prahlerei",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "görkemli konuşma",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Grandiloquence is not a very good substitute for imparting real, thoughtful ideas."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "28aee5d4-3875-4692-a70b-d1d062cc9f2d",
// 		"name": "effrontery",
// 		"dictionary": null,
// 		"pronunciation": "/ɪˈfrʌnt(ə)ri/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d3fbe2ba-cdcb-4f06-889a-89e4328c1a95",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "Frechheit",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "impudence, nerve, insolence",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "küstahlık, arsızlık",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The brash teen had the effrontery to yell back at her parents, when she knew full well that she was in the wrong."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "28ce37fb-722a-428d-8c4d-a3108c3d7652",
// 		"name": "entail",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9d7c90ec-0585-47c9-b84a-3f6f25672a9c",
// 				"languages": [
// 					{
// 						"name": "to include as a necessary step",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Genuine success entails many elements, the least of which is not solid conviction."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2918700a-c2e4-4937-9cf5-46478087a97e",
// 		"name": "modulate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "344dcafd-1feb-4b62-b9de-e1fdc8ab47a6",
// 				"languages": [
// 					{
// 						"name": "to pass from one state to another, especially in music",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The technicians are attempting to modulate the frequencies of the incoming signals."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "291c3e78-c2b2-4b18-a842-714734862f7c",
// 		"name": "preponderance",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0c446c02-397e-4918-9b4a-c7a5ddf5d202",
// 				"languages": [
// 					{
// 						"name": "superiority in importance or quantity",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The preponderance of evidence pointed conclusively to the accused."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "29fd1074-51a8-471b-a7db-f9b021125677",
// 		"name": "amalgamate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "fb323ab9-5635-4eea-ac73-d2de687eee95",
// 				"languages": [
// 					{
// 						"name": "to bring together, unite",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Because of her great charisma, the mayoral candidate was able to amalgamate all of the city officials into a formidable campaign committee."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2a2e4cca-a7e1-42cc-af38-a4975deb71f2",
// 		"name": "disclose",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4f95e40b-8642-43b6-87be-f831ece5ff6b",
// 				"languages": [
// 					{
// 						"name": "to reveal, make public",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The CEO was required to disclose all documents related to their latest European purchase."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2a6326b3-d4cf-4627-a1b6-a8472bf030a7",
// 		"name": "diminutive",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d72d2487-5f9b-4f40-855a-d157bc6e683e",
// 				"languages": [
// 					{
// 						"name": "small or miniature",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The bullies, big and ill-tempered, picked on the diminutive children all the time."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2a7f462c-9efa-46da-bb70-6572a7fa0132",
// 		"name": "arable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "662cc6e3-067d-4185-850b-2eec40792f57",
// 				"languages": [
// 					{
// 						"name": "suitable for growing crops",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"American farmers seek out arable land with the same way gusto that the early prospectors sought out gold mines."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2b20ff36-6f6c-478d-ab4c-b90aeba9a250",
// 		"name": "hypocrisy",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1844d7ec-e945-4bf3-a779-9739f595000e",
// 				"languages": [
// 					{
// 						"name": "pretending to believe what one does not",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"It's very difficult for men given to truth to tolerate the hypocrisy that liars engage in daily."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2b63e5fb-a5b6-4e09-a3dc-d0d235fa83ee",
// 		"name": "wallow",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e1454159-6d59-4a79-964e-dd7b9c4f1cab",
// 				"languages": [
// 					{
// 						"name": "to roll oneself indolently; to become or remain helpless",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"After wallowing in self-pity all weekend, Charles got up, washed his face, and marched out to meet life, planning to conquer whatever got in his way."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2b8f2204-fef2-44e1-9e9b-b171ee59a980",
// 		"name": "captivate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7a3d32a2-c36c-44fb-96f5-26cf2d4d1de3",
// 				"languages": [
// 					{
// 						"name": "to get the attention of, hold",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The Fourth of July display captivated the children with its colorful bursts."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2ba14d67-b199-45e8-8a96-04c54f470a65",
// 		"name": "contusion",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9ed46f0a-895b-4795-9957-8a7dc5581145",
// 				"languages": [
// 					{
// 						"name": "bruise, injury",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Due to his motorcycle accident, Charles had contusions all over his body."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2ba44697-ffa0-40e5-80f0-0ea9204b5147",
// 		"name": "punctilious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "63f8ba3c-0859-4e77-b21b-478153a5d0e3",
// 				"languages": [
// 					{
// 						"name": "eager to follow rules or conventions",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"There's nothing worse than an IRS agent who's punctilious by nature and choice."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2bc33f96-2539-416d-af32-0a1e686ca78c",
// 		"name": "dearth",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "39866c87-40d2-43ee-ad50-2095dbf21431",
// 				"languages": [
// 					{
// 						"name": "a lack, scarcity",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Because of the dearth of arable land in the valley, mostly farmers chose to relocate."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2c01a08d-e1ba-4844-aabe-80ec410b8e85",
// 		"name": "hoodlum",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "763aa508-d5a3-4bff-90cd-b058d1b903fa",
// 				"languages": [
// 					{
// 						"name": "a person who engages in crime and violence; a hooligan or gangster.",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"they were the 'professional' gangsters of New York, hoodlums and racketeers\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2c4fc415-f701-4767-a4d8-2e002c215574",
// 		"name": "laconic",
// 		"dictionary": null,
// 		"pronunciation": "/ləˈkɒnɪk/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bfcabde3-3ea3-4524-9cb0-fa9e3f2ea16e",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "(of a person, speech, or style of writing) using very few words",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "özlü, kısa ve öz",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "knapp",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"His laconic reply suggested a lack of interest in the topic"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2c583a7b-907f-4f2f-9aa8-4c6532ec0095",
// 		"name": "forestall",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "698f2294-1d13-439f-9154-c28db25a9476",
// 				"languages": [
// 					{
// 						"name": "to prevent, thwart, delay",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The governor forestalled the execution in deference to a family member's request."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2ca0432e-2205-4a15-89ca-9a35f4462531",
// 		"name": "embezzle",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a13981b0-2a47-4a6d-ba8d-5be08849edf9",
// 				"languages": [
// 					{
// 						"name": "to steal money by falsifying records",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The crooked bank executive was sentenced to 20 years in prison for embezzling millions of dollars."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2d7ecb65-7b9f-448d-af3d-bc82a73b4203",
// 		"name": "antediluvian",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7ed608e4-62de-49a1-a0b9-e77d48589f62",
// 				"languages": [
// 					{
// 						"name": "ridiculously old-fashioned",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"they maintain antediluvian sex-role stereotypes"
// 				]
// 			},
// 			{
// 				"id": "485c289f-680b-4580-9e7b-2a52b1f58e83",
// 				"languages": [
// 					{
// 						"name": "ancient; before Noah's flood",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The antediluvian society of Babel vanished without a trace thanks to the incredible force and pressure of the great flood!"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2d8a0230-9606-4152-8cf4-0b10ad236793",
// 		"name": "ethnocentric",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "30ce1789-e95d-4d64-adbb-e5b77765978f",
// 				"languages": [
// 					{
// 						"name": "believing in the supremacy of one's race or ethnic group",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The most intense patriots are often ethnocentric and chauvinistic."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2dcd7f10-fb09-47ae-b0dc-13ac42fe4b33",
// 		"name": "idolatrous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "013ce75b-e484-465a-9bf5-4629a325696c",
// 				"languages": [
// 					{
// 						"name": "excessively worshipping one object or person",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The undying devotion that modern day kids have for rock stars and athletes is nothing shy of idolatrous."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2e524626-2cd6-46a0-ba32-ab16073a733b",
// 		"name": "facade",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9ba5754d-9136-48be-859a-f40fa03ec03d",
// 				"languages": [
// 					{
// 						"name": "the wall of a building",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Because the sun strikes the east facade of the building, we get to see it rise every morning."
// 				]
// 			},
// 			{
// 				"id": "e29f1351-dc62-4075-b226-ef2024c5d948",
// 				"languages": [
// 					{
// 						"name": "a deceptive appearance or attitude",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Julian's facade fooled all of his associates, except, of course, those who knew the real him."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2e6c9a58-099f-4361-9277-be2b8738e458",
// 		"name": "chronological",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8e15a146-0bec-4cc4-9bdb-86d6702d54c7",
// 				"languages": [
// 					{
// 						"name": "arranged in order of time",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Drawing timelines is the best way to place events in chronological order."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2eefa54e-9f62-401e-a8f2-b4176015c02f",
// 		"name": "amicable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5850123f-a544-40ff-8d81-afdd5b511b84",
// 				"languages": [
// 					{
// 						"name": "friendly",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Connie wanted an amiable separation; but, her violent boyfriend, Brutus, refused to be amicable."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2f3c9ba0-c3b7-4492-803d-189dbefca22e",
// 		"name": "espouse",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bb4478f4-eb1d-42c3-8310-f46a26dc20dd",
// 				"languages": [
// 					{
// 						"name": "to take up as a cause, support",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Constantly, we should all espouse the virtues of honesty and integrity to our children."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2f813cab-fd48-450e-a40d-c16bf5df428a",
// 		"name": "expunge",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "dd598b0e-2399-4499-9330-0b4f9331845e",
// 				"languages": [
// 					{
// 						"name": "to obliterate, eradicate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Theodore is attempting to have his teenage record expunged on the grounds that he was only a minor when his misdeeds were done."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2faa49e9-ad91-4069-a55a-8236540e1a0b",
// 		"name": "fastidious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6d084131-a344-4cd3-8460-837d75436db9",
// 				"languages": [
// 					{
// 						"name": "meticulous, demanding, having high and often unattainable standards",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Because the boss is so fastidious, he never gives a satisfactory evaluation of anyone."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "2fd94459-5306-4d31-9ebe-0d24061ba264",
// 		"name": "forage",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d43a66a4-35c7-4ddb-a687-c4a2b8505307",
// 				"languages": [
// 					{
// 						"name": "to graze, rummage for food",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The birds forage for aquatic invertebrates, insects, and seeds"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "308e401d-d843-4031-b1b6-a1cf953b4ce1",
// 		"name": "obfuscate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "371f6c9a-1378-4e3d-aa16-e18355d972b9",
// 				"languages": [
// 					{
// 						"name": "to render incomprehensible",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The coding mechanism obfuscated the program, rendering it undecipherable."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "30c153e6-491d-43b1-9c20-366b8088ce69",
// 		"name": "accessible",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ac479504-b0b5-45cf-8e56-29be90527ff9",
// 				"languages": [
// 					{
// 						"name": "obtainable, reachable",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"After studying from Vocabulary Power with Connotative Precision and getting a great score on his SAT, Kayden realized that his greatest academic goal was then accessible."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "30d5dc2b-dc98-4a0d-bf19-99e38f64bd83",
// 		"name": "circuitous",
// 		"dictionary": null,
// 		"pronunciation": "/sə(ː)ˈkjuːɪtəs/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "07a80715-0751-4f5b-bc69-e6fabb13d544",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "roundabout, indirect",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "dolaylı, dolambaçlı",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "weitschweifig, weitläufig",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"The politician gave very confusing and circuitous answers to every question."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3141b582-c898-449c-a555-48a17548d142",
// 		"name": "chastise",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6b8e29a4-328b-44d2-bdb8-17379868c393",
// 				"languages": [
// 					{
// 						"name": "to criticize severely",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"After a severe chastisement by her parents Sue decided to never lie to anyone else ever again."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "31729b75-573f-40fb-85a8-cfdfa3fa943c",
// 		"name": "paean",
// 		"dictionary": null,
// 		"pronunciation": "/ˈpiːən/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2d7e2926-6c84-4bce-9d6e-c4391727ad85",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "an intensely joyous hymn; a jubilant outburst",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Shockingly, this paean to the good old days did not prevail."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "32a520ef-d622-4324-bb17-692aaf4604ea",
// 		"name": "recapitulate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "27257b91-517e-4a46-861a-294a9e5cf97c",
// 				"languages": [
// 					{
// 						"name": "to sum up, repeat",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The speaker began to recapitulate his main points, warning that they all must be remembered and acted upon."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "32edd695-016c-489e-aa2e-0944cff9115e",
// 		"name": "encumber",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "fd70c40c-eb6d-4eb7-8914-fc6fbbeb1a2d",
// 				"languages": [
// 					{
// 						"name": "to weigh down, burden",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Trying not to encumber my parents further, I chose not to tell them about my lost job."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "33048efb-fc3b-4e33-b116-03b0ba60c933",
// 		"name": "consummate",
// 		"dictionary": null,
// 		"pronunciation": "/ˈkɒns(j)ʊmeɪt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a5c370ee-3af3-4474-b41f-71db6e720b4d",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "make (a marriage or relationship) complete by having sexual intercourse",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "erreichen, vollenden",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "tamamlamak, tamamına erdirmek",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The happy couple planned to consummate their relationship on the Isle of Manville Rey."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3341efa6-5796-493e-8ad7-68a4e1086799",
// 		"name": "fraught",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2a8ae25e-94ac-47e4-9cac-2c11b9693562",
// 				"languages": [
// 					{
// 						"name": "(usually used with \"with\") filled or accompanied with",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The Forest of Highlands is fraught with dangers - some seen, others unseen."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "33732079-1958-460e-b730-a6a47ee73127",
// 		"name": "malevolent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4ff87d95-5ebc-4bae-8d31-8047a2d7ee64",
// 				"languages": [
// 					{
// 						"name": "wanting harm to befall others",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The malevolent old man sat in his room all day, writing dirty letters to young girls."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "337dcbe8-94ab-43ad-aece-966727ed782a",
// 		"name": "ossify",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8c7f7efc-0fd7-4484-bc92-e94c5acfda52",
// 				"languages": [
// 					{
// 						"name": "to become bone; to become rigidly conventional; to mold into a conventional pattern",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"She only wrote two novels, but they establish her as the chronicler of an ossified generation unable to move forward in life."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3403d45e-0465-46c5-b1c1-2380fd53656e",
// 		"name": "sophistry",
// 		"contexts": [
// 			"LaForge: \"What if they asked for help?\"\nData: \"Yes. Sarjenka's transmission could be viewed as a call for help.\"\nPicard: \"Sophistry.\""
// 		],
// 		"dictionary": null,
// 		"pronunciation": "/ˈsɒfɪstri/",
// 		"definitions": [
// 			{
// 				"id": "03dd0213-4deb-47f0-b069-f6e2356c2ff9",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "fallacy, error in reasoning",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "safsata",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "Sophisterei, Spitzfindigkeit, Trugschluß",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"Trying to argue that I had benefited in any way from the disaster was pure sophistry."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "340db314-de1d-43d9-a440-ea2448cb2d87",
// 		"name": "elucidate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "88bb22ab-77eb-42ad-b8b1-ec96236fa40b",
// 				"languages": [
// 					{
// 						"name": "to clarify, explain",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Professor Jazz decided to elucidate further when he noted the blank expressions on his students' faces."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3483d5c6-bccd-46fc-ac36-3780c877c43d",
// 		"name": "carouse",
// 		"dictionary": null,
// 		"pronunciation": "/kəˈraʊz/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "063522a9-9be4-4470-bd7d-58b933fb17d6",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "to party; drink alcohol and enjoy oneself with others in a noisy, lively way",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The Navy seamen caroused all night after arriving at their first port of call."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "34fa5d5b-ad8f-4e27-b342-234aceee73d4",
// 		"name": "aversion",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "41f02051-6b8f-41a1-93dc-968436584546",
// 				"languages": [
// 					{
// 						"name": "a particular dislike for something",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Being a product of the South, I have a natural aversion to anything that's anti-sports!"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "35d52ef0-1634-4c8d-aa0e-38a658fa04ed",
// 		"name": "ruminate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ca50b27c-08ad-4bca-85e8-ed147a9f8d5b",
// 				"languages": [
// 					{
// 						"name": "to contemplate, reflect",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"While ruminating on the day's activities, it occurred to me that not everyone was present."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "362a4102-0957-4e86-8c1e-69d45fed645f",
// 		"name": "commendation",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c6298f5e-3dd2-4ed8-bacb-1e091597ce89",
// 				"languages": [
// 					{
// 						"name": "a notice of approval or recognition",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Jason received commendations from his squad leader for an uncommon act of bravery."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3678ffbc-6978-40cf-b810-ae1af0f9a191",
// 		"name": "exonerate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "fa36c28e-ced1-4add-9055-a20cd8610e2a",
// 				"languages": [
// 					{
// 						"name": "to free from guilt or blame, exculpate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"As the false witness finally broke down and started to tell the truth, Jake knew he would ultimately be exonerated."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "36cf481f-9593-40f9-bb9c-c5fb3edd53bc",
// 		"name": "speculative",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5eec80b7-99da-41b2-90d5-3a22b41641ad",
// 				"languages": [
// 					{
// 						"name": "not based in fact",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Gladly, Theresa was convinced to go at least part way with that speculative venture; thus, today, she is part way rich."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "37576de7-5913-4544-8ea8-40e69af4bd95",
// 		"name": "consecrate",
// 		"dictionary": null,
// 		"pronunciation": "/ˈkɒnsɪkreɪt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d9aaff12-360b-46ee-a1a6-b073ef112101",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "make or declare (something, typically a church) sacred",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The present Holy Trinity church was consecrated in 1845."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "37d652c1-c943-42f1-af92-2dda4a626da7",
// 		"name": "docile",
// 		"dictionary": null,
// 		"pronunciation": "/ˈdəʊsʌɪl/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e43969fe-cb70-4bf6-8387-3cce0e716201",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "easily taught or trained",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Some sharks are docile; others are very aggressive."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "37ec019d-8548-4b29-93c7-d64a5e865c50",
// 		"name": "auspicious",
// 		"dictionary": null,
// 		"pronunciation": "/ɔːˈspɪʃəs/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "852c2917-0bf6-428c-8822-63381f7727a0",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "favorable, being a sign of future success",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "hayırlı, uğurlu",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "günstig, glückverheißend",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"The most auspicious time is just before dawn; so, that's when we should try again.",
// 					"It was not the most auspicious moment to hold an election."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "38127253-4861-4015-9a89-163573faf532",
// 		"name": "dogmatic",
// 		"dictionary": null,
// 		"pronunciation": "/dɒɡˈmatɪk/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6663da3d-bf37-48c4-973a-d49c2e493cf3",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "opinionated, aggressively and arrogantly sure about unproved principles",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "starr, an einem Dogma festhaltend",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "kesin; kestirip atan",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Because of his personal connections with the group, he was very dogmatic about their innocence."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3857fcfe-a29a-478c-9a3a-6fabbe4defc2",
// 		"name": "succubus",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a2f26a4f-a585-4455-9c9e-8202d0b42e34",
// 				"languages": [
// 					{
// 						"name": "a female demon who is supposed to have sexual intercourse with sleeping men; a demon of fiend; a prostitute",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"You know he told me once that he had been attacked by a succubus"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "38615f4e-2d03-4967-ba34-34035034c7b0",
// 		"name": "inane",
// 		"dictionary": null,
// 		"pronunciation": "/ɪˈneɪn/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0960b38c-2d34-4bda-93b2-f0c56e9b4ffe",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "silly and meaningless",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "dumm; sinnlos",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "anlamsız, boş, saçma",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The comic's jokes were completely inane, appealing more to twelve year olds than adults."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "39cb65ad-1954-4faa-acc8-850fbaf42807",
// 		"name": "abjure",
// 		"dictionary": null,
// 		"pronunciation": "/əbˈdʒʊə,əbˈdʒɔː/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "aca5aaf2-4209-49c8-89c2-d5b86ddf7c3f",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "to reject, renounce upon oath",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "sich lossagen von",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "tövbe etmek, vazgeçtigine dair yemin etmek",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"To prove his honesty, the President abjured the evil policies of his wicked predecessor.",
// 					"The woman made it clear that she would abjure his proposal because they were on their first date."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "39e0bc86-9fc2-4797-a9eb-23a6efd84fe3",
// 		"name": "venerate",
// 		"dictionary": null,
// 		"pronunciation": "/ˈvɛnəreɪt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2009baea-1fd6-4ea9-ab8f-9b3cf280a0e2",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "esteem, respect, revere",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "hürmet etmek, saygı göstermek",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "verehren",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"The children were taught to venerate their leader from the crib up.",
// 					"Philip of Beverley was venerated as a saint"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "39f185f3-23a7-4920-bb15-4067bde0a11c",
// 		"name": "dissuade",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f1d59d5f-dff9-4f5f-af2f-f6351a1cffde",
// 				"languages": [
// 					{
// 						"name": "to persuade someone not to do something",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Gloria tried to dissuade him from going out in such bad weather; but, he went anyway."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3a8372e3-361e-4d7d-95a3-e2daa82515e4",
// 		"name": "apocryphal",
// 		"dictionary": null,
// 		"pronunciation": "/əˈpɒkrɪfl/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "46017308-e95a-4af9-8f80-4bce66df708b",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "probably fictitious; doubtful; not genuine",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "fraglich; unecht",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "doğruluğu şüpheli, sahte; uydurma",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "pertaining to the Apocrypha (Old Testament books not included in the Bible)",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Some of the tales of monsters and demons may easily be true; albeit, many of them are apocryphal at best.",
// 					"There is an apocryphal story about a disgraced rock star who ended up in bankruptcy court."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3a8dcdab-bed3-44e8-857c-1ec8520237cf",
// 		"name": "audible",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "215bbb37-6238-4998-a9e0-411380e96c92",
// 				"languages": [
// 					{
// 						"name": "able to be heard",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The cries from the dungeon were barely audible; thus, they were heard only during the hush of the night."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3aa43d97-0d55-4e67-99d9-2f7a594de6aa",
// 		"name": "emend",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b81bed37-3fe1-4450-938d-339e1e6ad39f",
// 				"languages": [
// 					{
// 						"name": "to correct or revise a written text",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Many times, editors will emend the words of a script to make it have a broader appeal."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3acc0acc-6f02-4083-8f5e-f4876c06622f",
// 		"name": "winsome",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f70268e0-c398-4cbf-bc95-121d948c2cd0",
// 				"languages": [
// 					{
// 						"name": "charming, pleasing",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The winsome host charmed his guests with his wit, his smile, and his tacit glances."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3b620b98-b0b3-4eac-a705-28b1c67ce144",
// 		"name": "docent",
// 		"dictionary": null,
// 		"pronunciation": "/ˈdəʊs(ə)nt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c2ca6778-2b53-4972-992e-eafcbb395ce9",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "a member of the teaching staff immediately below professorial rank",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Doctor Norbert Hanold, docent of archology, really found in the relief nothing noteworthy for his science."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3b6c494f-e763-41f4-93ec-5c54d49b2f0a",
// 		"name": "affinity",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "96197f4a-d936-4406-b3fe-f6c49391c951",
// 				"languages": [
// 					{
// 						"name": "a spontaneous feeling of closeness",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Jerry didn't know why, but he felt an incredible affinity toward Karen, his new friend."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3bed0361-dd74-46a7-a817-9bc215005ad3",
// 		"name": "revel",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7db2d1fe-7c72-4cd2-8952-cbbee543abcc",
// 				"languages": [
// 					{
// 						"name": "to enjoy intensely",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The plan was to pass the final, catch a flight, land safely, then revel till early dawn."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3c30b693-519b-48b1-95e6-1ae2c940f003",
// 		"name": "quandary",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6436b957-8ed3-44aa-b0d4-2940630e8e81",
// 				"languages": [
// 					{
// 						"name": "a perplexing, bad situation",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"When my car stopped cold in the middle of a thunder storm, I knew I was in a quandary."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3c469bd9-735b-4a7e-b02c-75916294e3de",
// 		"name": "meticulous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bcfac91a-d00a-4571-b78e-7978bd788d14",
// 				"languages": [
// 					{
// 						"name": "extremely careful with details",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The surgeon was very meticulous about the care of the patient's wound."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3c756ed6-9a59-4c8a-b1c2-d5354260a916",
// 		"name": "adroit",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2cae705f-9964-408c-994e-b1852903ba7b",
// 				"languages": [
// 					{
// 						"name": "skillful, dexterous",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The adroit card shark could deal easily from the bottom of the deck with no one noticing, not even when they expected what was happening."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3cb34359-8c33-4502-8bad-4eacd0c04c9b",
// 		"name": "infusion",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8d3a0bf0-59d2-49d2-9021-2dd42f546c7a",
// 				"languages": [
// 					{
// 						"name": "an injection of one substance into another",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The economy needs a major and rapid infusion of flowing, spendable cash."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3cdf4df9-6436-41f7-83ce-b0254be6825e",
// 		"name": "arrogate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "38f8fd22-1a40-4131-9da1-464a89388b29",
// 				"languages": [
// 					{
// 						"name": "to take without justification",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"With his stiff chin raised, the self righteous monarch arrogated the right to determine what the truth should be in his kingdom."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3d5253c5-6a0c-425e-bffc-eaaf114e657c",
// 		"name": "benign",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "990353e7-429c-4b20-a77b-d209377f7a82",
// 				"languages": [
// 					{
// 						"name": "favorable, not threatening, mild",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"When the doctor said, \"It's benign, Mr. Jackson,\" I almost cried aloud."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3db4c4c1-f5f8-4ad6-8ebc-8f3f3800e62e",
// 		"name": "disparage",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [
// 			"Harrison Ford says Red Hulk acting in 'Captain America 4' required 'not caring' and 'being an idiot for money, which I've done before. I don't mean to disparage it'"
// 		],
// 		"definitions": [
// 			{
// 				"id": "192cf227-30c7-4f13-9dfd-75465661d2b9",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "speak ill of, depreciate, belittle",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "aşağılamak",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "verunglimpfen; herabsetzen",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"Usually, insecure people try to disparage the efforts of others.",
// 					"He never missed an opportunity to disparage his competitors."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3db68943-fa28-4a27-8445-10dc24489dfe",
// 		"name": "dulcet",
// 		"dictionary": null,
// 		"pronunciation": "/ˈdʌlsɪt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9e16be47-df38-465a-9f12-8ac376f31bc4",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "melodious, sweet, pleasant; soothing",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "einschmeichelnd, wohlklingend, angenehm",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "kulağa hoş gelen, tatlı",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"There one listened to the full, swelling chords of the organ; here to the soft, dulcet, silvery notes of the violin."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3e061c07-1ea8-4d84-95ea-892f52279aff",
// 		"name": "condolence",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a74e6a7a-9227-46ca-97b6-1982fd670d61",
// 				"languages": [
// 					{
// 						"name": "an expression of sympathy in sorrow",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Brad offered his condolences to his best friend on the loss of his great-grandmother."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3e1106be-1375-4173-a0fc-3f5c4350a03c",
// 		"name": "pithy",
// 		"dictionary": null,
// 		"pronunciation": "/ˈpɪθi/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1535bc39-8827-4663-acac-222da817bc22",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "concisely meaningful",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "wesentlich, knapp",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "kısa ve öz",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"I love quotes and proverbs, especially the pithy varieties that say so much in so few words."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3e1e9274-e708-4612-9fc2-5c0c9f57d755",
// 		"name": "complacency",
// 		"dictionary": null,
// 		"pronunciation": "/kəmˈpleɪsnsi/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "21837d05-a0c8-46bf-ae3b-1298e0be755d",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "state of being pleased with oneself",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Unbekümmertheit, Sorglosigkeit",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "halinden memnun olma",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Due to his chronic complacency, Aaron just sat there, knowing his test was coming, and prepared not at all."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3e3007bf-14d8-43ab-ac97-ad6fd9175fe5",
// 		"name": "morose",
// 		"dictionary": null,
// 		"pronunciation": "/mɒˈrəʊs/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9c2309e2-e8ff-4c0d-a533-a335dae1ce27",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "mürrisch; finster",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "somurtkan, asık suratlı",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "sad, gloomy, irritable, bitter",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Jasper's morose disposition made him very unpleasant to ever be around."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3e53deee-53be-4476-b0f4-fa27b440e716",
// 		"name": "heinous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4bf68465-9ba5-4df5-8d20-52b3c7e071b1",
// 				"languages": [
// 					{
// 						"name": "shockingly wicked, repugnant",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The killings were of such a heinous nature details were withheld from the public."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3e7e69fc-6c92-446a-995e-6901bd4c3f78",
// 		"name": "deplore",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "234939fc-c606-4dc1-a4e0-33ef9cb36bfd",
// 				"languages": [
// 					{
// 						"name": "to feel or express sorrow, disapproval",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Nelson deplored the terrible working conditions at his old job."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3ecea19e-3659-449b-afa2-e06db5a6be8e",
// 		"name": "morass",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c1af0cf9-bb75-45fa-b7fb-c0e18fe7669a",
// 				"languages": [
// 					{
// 						"name": "a wet swampy bog; figuratively, something that traps and confuses",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Wading through the morass at a turtle's pace, the hikers took many hours to reach the town."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3f2c0291-2293-422d-91b1-eace2d31acb8",
// 		"name": "erudite",
// 		"dictionary": null,
// 		"pronunciation": "/ˈɛr(j)ʊdʌɪt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "431bd910-2c34-457a-b620-cf6a6c5ac0d6",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "educated, learned",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "gelehrt, wissend",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "bilgili",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"My physics teacher is such an erudite scholar that she has calculated, in her head, the distance from each planet relative to the Earth."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3f37ac41-bc8c-497d-b197-b43ac681ee52",
// 		"name": "Großmut",
// 		"contexts": [],
// 		"dictionary": null,
// 		"pronunciation": "/ˈɡroːsmuːt,Gróßmut/",
// 		"definitions": [
// 			{
// 				"id": "09e806f5-8e7b-49f2-b29c-7619ec668821",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "edle, sich in Großzügigkeit, Toleranz erweisende Gesinnung",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "generosity, greatheartedness, unselfishness, willingness to give",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "yüce gönüllülük, cömertlik",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Großmut gegen den Besiegten zeigen"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3f39f38e-fe82-4fe0-950f-bebf073c9f56",
// 		"name": "ineffable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1544b00a-0659-4860-95c6-0e0925b46866",
// 				"languages": [
// 					{
// 						"name": "unspeakable, not able to be expressed in words",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The scene of the Nile Valley in spring left me speechless; it was truly ineffable."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3f83ed64-4272-4a28-8894-6ea9cf44c7d0",
// 		"name": "tenable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9e31dc0f-e36b-434d-b0a3-00b42f91ef26",
// 				"languages": [
// 					{
// 						"name": "able to be defended or maintained",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"I'm seeking a relationship that can be tenable even over great distances."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3fd92813-445d-4a7a-b500-e6cbb1618e17",
// 		"name": "transmute",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2d76bb58-da71-4c51-8ed1-3f21ddd74bf7",
// 				"languages": [
// 					{
// 						"name": "to change or alter in form",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Metamorphosis is a transmutation from one form of a creature to another."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "3fe90c46-d3bb-426e-ad8e-adf92c94c8da",
// 		"name": "pungent",
// 		"dictionary": null,
// 		"pronunciation": "/ˈpʌn(d)ʒ(ə)nt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a35f23ab-09b0-487a-b21d-edeb4f641073",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "spicy, having a pointed, sharp quality (often describing smells)",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "scharf; beißend",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "sivri, sert, dokunaklı, acı",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The pungent odor of bleach pervaded the hallways, blocking them, as it were, with its chemical barricade."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "403ef514-73a3-4f92-9534-867b3e2888e0",
// 		"name": "ephemeral",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "113215c3-6bfe-4f20-a2d8-1797e654f057",
// 				"languages": [
// 					{
// 						"name": "short-lived, fleeting",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Physical beauty is ephemeral at best; it lasts only as long as your youth."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4074bb47-2408-4840-a2ac-c9a9ebafbbf7",
// 		"name": "forum",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8d88b56c-bc3e-4eb0-974d-a738848f0338",
// 				"languages": [
// 					{
// 						"name": "a medium for lecture or discussion",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Television provides the perfect forum for political candidates to be witnessed thinking on their feet and handling difficult questions."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "40cc88ef-feaa-46a1-8b93-cce2b1a6e5d4",
// 		"name": "epitome",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b89838ae-5c6a-4856-8445-58309723b3a1",
// 				"languages": [
// 					{
// 						"name": "a perfect example, embodiment",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The running back for Miami was the epitome of athleticism, being fast, agile, and strong."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "40eb600a-06d8-4717-85b3-f914437c3785",
// 		"name": "sui generis",
// 		"dictionary": null,
// 		"pronunciation": "/ˌs(j)uːʌɪ ˈdʒɛn(ə)rɪs,ˌs(j)uːiː ˈdʒɛn(ə)rɪs/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9e177929-60f0-48fd-9478-089e53741c72",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "unique, of its own kind",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "einzigartig",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "nevi cinsine münhasır (mahsus)",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Anything sui generis is its own thing; there's nothing else like it. \"the sui generis nature of animals\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "416dff5b-75d2-4469-9038-00022414ce10",
// 		"name": "strenuous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5cea6b81-a95d-407c-9714-df71029ba1d1",
// 				"languages": [
// 					{
// 						"name": "requiring tremendous energy or stamina",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Seemingly, weight lifters must do strenuous exercises every time they work out."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "418d8430-e857-4f23-bb9a-5c05fdab53e4",
// 		"name": "archaic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d8ba3e58-c027-4028-87c4-4e7f174925d4",
// 				"languages": [
// 					{
// 						"name": "of or relating to an earlier period in time, outdated",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Because of the micro-chip, machines like the typewriter will soon be archaic."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "41a66fe2-258a-434b-bf8c-6ce66b19738b",
// 		"name": "mundane",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ffaf9639-7e7b-4612-8218-7e8660d2b2b2",
// 				"languages": [
// 					{
// 						"name": "concerned with the world rather than with heaven, commonplace",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The mundane concerns of the uninspired oftentimes seem very trivial to those who visit the muses often."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "425c2f02-0da1-4802-9241-70416ccb7638",
// 		"name": "asylum",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c689cac4-2153-4de0-8c62-fa407572e4e0",
// 				"languages": [
// 					{
// 						"name": "a place of refuge, a sanctuary",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The deep woods are my personal asylum when silliness surrounds me and threatens to stay."
// 				]
// 			},
// 			{
// 				"id": "b82c8267-5a1e-4d61-97c9-dbcbd7ee4064",
// 				"languages": [
// 					{
// 						"name": "institution for the insane.",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"All rapists and most murderers should be placed in asylums then diagnosed and cured."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4277de5e-90b3-48f4-bb20-779668e97d16",
// 		"name": "penitent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "10cbde0f-6e9b-47c6-a335-f52696b29c26",
// 				"languages": [
// 					{
// 						"name": "remorseful, regretful",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Marvin the Murderer didn't seem the least bit penitent for his crimes; in fact, he smiled when they were mentioned."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "42916f13-7eae-4ba4-a884-7026ae20edd3",
// 		"name": "propitious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c4445b36-0a75-4d81-ad22-5d94f87084de",
// 				"languages": [
// 					{
// 						"name": "favorable",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"As the propitious moment arrived at last, the signal was given, and the race began."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "42d58435-b393-435e-8c0b-86c471573597",
// 		"name": "vex",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ec25b361-6313-4811-98d4-7339acb3cfb4",
// 				"languages": [
// 					{
// 						"name": "to confuse or annoy",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"About fifteen minutes after nightfall, the mosquitoes begin to vex every warm-blooded creature in the woods."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "43427f4c-6408-44e3-a76b-6ae975d9d3bf",
// 		"name": "obstreperous",
// 		"dictionary": null,
// 		"pronunciation": "/əbˈstrɛp(ə)rəs/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ca71920b-a204-4ae5-a99e-8965e964c246",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "noisy, undisciplined; wild",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "überlaut; widerspenstig",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "gürültücü, yaygaracı, yaramaz",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The obstreperous class frustrated the rookie teacher such that she simply walked out."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "439b0926-0ab4-470d-bd68-1048066ae086",
// 		"name": "tedious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "05b33a22-09c4-44a9-89d1-d921883d4bbc",
// 				"languages": [
// 					{
// 						"name": "dull, boring",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Licking and stamping envelopes for five hours is the most tedious job I can imagine."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "43b0c7d9-61f5-4636-b50f-2fbcc60df239",
// 		"name": "allege",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0b00dae7-9164-45e4-9cf8-d41cfa662e20",
// 				"languages": [
// 					{
// 						"name": "to assert, usually without proof",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The detective alleged that Carl was the perpetrator; however, after the investigation turned up no evidence, Carl was set free."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "43c0ac3f-4dcf-46a3-9df8-3534faeb81b5",
// 		"name": "cloying",
// 		"dictionary": null,
// 		"pronunciation": "/ˈklɔɪɪŋ/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "02fe721f-786d-4b4a-ad3b-a1e62c6c4153",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "excessively sweet, or sentimental (to a sickening degree)",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "süßlich, kitschig",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "tiksindirici",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Excessive praise of anyone can become cloying, making the recipient nauseous."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "43e573cb-4859-4951-965e-404915b72f78",
// 		"name": "pyrrhic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c8718ec6-a0eb-4190-aea6-0092c55b6b48",
// 				"languages": [
// 					{
// 						"name": "used to describe a victory achieved at too great a cost",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"His lawyers would in all likelihood have told him that a successful insanity defense was at best a pyrrhic victory."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "44af9804-343c-45c5-acac-3150e2168821",
// 		"name": "counteract",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "df98726b-c14e-4417-a607-a3ba0c2b502e",
// 				"languages": [
// 					{
// 						"name": "to neutralize, make ineffective",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Anti-venom was given to the snakebite victim to counteract the rattler's poison."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "45109e41-b470-4fc3-8b7a-1128d93b24da",
// 		"name": "oblivious",
// 		"dictionary": null,
// 		"pronunciation": "/əˈblɪvɪəs/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "afd1294b-6242-4e1a-90cb-a4f0363d1363",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "not aware of or concerned about what is happening around one",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "außer acht gelassen",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "habersiz, ilgisiz",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The naive travelers were oblivious to the tactics of the big city slickers.",
// 					"She became absorbed, oblivious to the passage of time"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "45ee959e-b0e4-4e61-8218-dfa83e8b84b1",
// 		"name": "euphoric",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bdbb392b-445d-4dfe-8485-0fd6d9cad008",
// 				"languages": [
// 					{
// 						"name": "elated, uplifted",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Young lovers tend to become euphoric about the object of their desire, not seeing any flaws in them that may be obvious to others."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4642c5f4-a148-415f-b8d4-4271968a204f",
// 		"name": "collusion",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "97e64b9c-ad6a-4917-a8e6-c40de89e840e",
// 				"languages": [
// 					{
// 						"name": "secret agreement, conspiracy",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Some gamblers work in collusion to cheat naive players out of their hard earned cash."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "46696ecc-d312-428a-98a2-39ad2909ec4f",
// 		"name": "censure",
// 		"dictionary": null,
// 		"pronunciation": "/ˈsɛnʃə/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ee66122d-c551-4995-aa65-91b98a6efb69",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "harsh criticism",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Tadel, Kritik",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "eleştiri, tenkit",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The censure from the officer really shook the unlicensed teen driver."
// 				]
// 			},
// 			{
// 				"id": "6b7dceec-065d-43a6-9578-983ca7898917",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "to rebuke formally",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The teacher received a sharp censure for threatening to strike one of his students."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4751249a-185e-4023-8034-27dd5e330080",
// 		"name": "convivial",
// 		"dictionary": null,
// 		"pronunciation": "/kənˈvɪvɪəl/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5a1ad718-49a6-4c48-aa64-661007f48c0d",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "sociable, friendly; festive",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "gesellig",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "ziyafetle ilgili, şenlik",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The convivial atmosphere at the family reunion was so great that even the food had a festive taste."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4792e43d-9ea9-43ea-b020-39f72d097da5",
// 		"name": "insinuate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1b90addc-760c-41ce-8cbe-cd9ef9c71051",
// 				"languages": [
// 					{
// 						"name": "to suggest indirectly or subtly",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"\"I didn't mean to insinuate that you weren't welcome,\" insisted the embarrassed host."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "47d99ce6-696d-49c2-8c9b-47dfd2315244",
// 		"name": "pellucid",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "41efe1ef-ccff-4fb0-8d2a-d6f319a719bd",
// 				"languages": [
// 					{
// 						"name": "easily intelligible, clear",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The mountain streams were so pellucid the brown and orange stones on the bottom could be seen with ease."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "481fc024-d042-401d-ab31-6298fbc7f314",
// 		"name": "denigrate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "13e03543-bdb6-4dad-b3ee-766688f87f2d",
// 				"languages": [
// 					{
// 						"name": "to belittle, diminish the opinion of",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The essay denigrated all of the people who'd gone ahead of the current group."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "48700296-8676-47c5-92dc-c5f2aacb0285",
// 		"name": "inure",
// 		"dictionary": null,
// 		"pronunciation": "/ɪˈnjʊə,ɪˈnjɔː/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "dd0d154e-ce45-4d65-8dbb-e9e902830928",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "gewöhnen, abhärten",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "to become accustomed or acclimated",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "alıştırmak",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"After a life time of living in the squalor of extreme poverty, Jason and his sister became inured to it, and later saw it as normal and even proper."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "48941dbf-02b0-4935-a8ea-68b302c1f638",
// 		"name": "onus",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ff098bd0-e79c-474f-b12d-807cf0d47705",
// 				"languages": [
// 					{
// 						"name": "a burden; a task taking a great deal of effort to complete",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"the onus is on you to show that you have suffered loss\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "48ae41af-7448-446e-b9b3-f2dcfb9d89bf",
// 		"name": "petulance",
// 		"dictionary": null,
// 		"pronunciation": "/ˈpɛtjʊləns/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a0337f00-f1e0-4d00-bdda-e2ab0711a935",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "rudeness, irritability",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Gereiztheit",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "huysuzluk, aksilik, çabuk kızma, alınganlık",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Such petulance demonstrated by anyone suggests a lack of respect for age and position."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "48b0ba79-4b3f-496e-b461-97aad7c8ad9f",
// 		"name": "cleave",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "cf8d9b28-839e-4f8e-8351-982c1d1380e0",
// 				"languages": [
// 					{
// 						"name": "to divide into parts",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Mr. Jones cleaved the wood blocks into kindling in no time at all."
// 				]
// 			},
// 			{
// 				"id": "ccf55bef-9996-4485-ba47-390079b46d82",
// 				"languages": [
// 					{
// 						"name": "to stick together firmly",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Every married couple must learn to cleave to one another through thick and thin."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "490bf50c-9209-43d7-981e-d3e777d3bebe",
// 		"name": "flaccid",
// 		"dictionary": null,
// 		"pronunciation": "/ˈflasɪd,ˈflaksɪd/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e729c06d-205d-4b79-b821-69e4cfde2bf4",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "limp, not firm or strong",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "schlaff, kraftlos",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "gevşek, sarkık, yumuşak",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Over cooking noodles makes them flaccid and mushy like mashed potatoes."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4912eef4-2ec6-42e6-812e-174911a9398b",
// 		"name": "adverse",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "76c54041-be15-42cf-8ea5-9c1878bea3b8",
// 				"languages": [
// 					{
// 						"name": "antagonistic, unfavorable, dangerous",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Because of adverse conditions, the novice hikers decided to give up trying to climb the mountain."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4952e1a8-9a87-4e9c-9c3b-223aaf4536e5",
// 		"name": "uxorious",
// 		"dictionary": null,
// 		"pronunciation": "/ʌkˈsɔːrɪəs/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a154e11c-342d-4715-ae76-ca5799bc01c9",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "excessively submissive to or fond of one's wife",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "sich seiner Frau widmend",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "karısına çok düşkün",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"\"he had always impressed me as home-loving and uxorious\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4a689265-8a16-4f80-bc6a-4ad27b0983a0",
// 		"name": "screed",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "afeb1240-65ab-4700-a11c-cffab9363d99",
// 				"languages": [
// 					{
// 						"name": "a long and monotonous speech or letter",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"her criticism appeared in the form of screeds in a local film magazine\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4a96e32c-e74b-4db6-a278-457607f2cd65",
// 		"name": "inveterate",
// 		"dictionary": null,
// 		"pronunciation": "/ɪnˈvɛt(ə)rət/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "757edb62-7410-471d-b9c7-f76481622c40",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "deeply rooted, firmly established",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "unüberwindbar, eingefleischt",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "yerleşmiş, kökleşmiş",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"After four years of serious college work, I'd become an inveterate studier and thinker."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4abf6b6d-b588-4930-bd61-3d94186345ab",
// 		"name": "artifact",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4a34aae9-2508-45e3-ad6f-b73d3a8fbb3d",
// 				"languages": [
// 					{
// 						"name": "a remaining piece from an extinct culture or place",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Archaeologists crave artifacts the way paleontologists crave the bones of dinosaurs."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4ae491ed-c677-4c17-a0bb-b083b89f4206",
// 		"name": "hardy",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ed58d28f-806a-4194-afb0-58b161c39c35",
// 				"languages": [
// 					{
// 						"name": "robust, capable of surviving through adverse conditions",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Oaks are very hardy trees, able to survive the harshest winter."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4ae7b402-b332-4676-b7a9-588fa0af7314",
// 		"name": "faux pas",
// 		"dictionary": null,
// 		"pronunciation": "fəʊ'pɑː",
// 		"contexts": [
// 			"David Muir’s seeming vanity was unfortunately on full display while covering the deadly Los Angeles wildfires on Wednesday. The “World News Tonight” anchor had a tone-deaf on-air fashion faux pas when he accidentally revealed to the camera that he had clothespins cinching the back of his official-looking flame-retardant jacket for a better fit while broadcasting live during the catastrophe."
// 		],
// 		"definitions": [
// 			{
// 				"id": "24f7175a-5f76-4c47-aaf2-5e42f2eb9bbc",
// 				"languages": [
// 					{
// 						"name": "Fehler, Missgeschick; Taktlosigkeit (Franz.)",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "gaf, hata",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "embarrassing social blunder",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The “World News Tonight” anchor had a tone-deaf on-air fashion faux pas."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4b366c2b-59c7-42f2-9538-b598b139d430",
// 		"name": "larceny",
// 		"dictionary": null,
// 		"pronunciation": "/ˈlɑːsɪni/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "482c32d1-4317-47c8-96da-8373181d24bd",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "theft of personal property",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Diebstahl (Gericht)",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "hırsızlık",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"After years of victimizing senior citizens with acts of petty larceny, Slick Willie was finally nabbed."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4b3c2aa9-559e-4619-9d0c-ce09348ef199",
// 		"name": "dissonance",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "020bb951-aa1b-44a1-8eb8-95ec6970e4cd",
// 				"languages": [
// 					{
// 						"name": "lack of harmony or consistency",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"There was a remarkable dissonance between what Jasper said and what Jasper did."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4b957f42-5727-4b17-a06d-51f0eeeee537",
// 		"name": "innate",
// 		"dictionary": null,
// 		"pronunciation": "/ɪˈneɪt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e7ecb03d-8cfc-4f5a-b2f0-0500f22c71cd",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "inborn, native, inherent",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "angeboren; natürlich",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "doğuştan, doğal",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Quinton had great innate ability to both compose and play beautiful music."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4ba47362-9adf-46e0-bd05-6358f449ff43",
// 		"name": "abrogate",
// 		"dictionary": null,
// 		"pronunciation": "/ˈabrəɡeɪt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8cdde488-5695-4a5d-abca-2063e5154dcd",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "officially annul or abolish; terminate, put an end to, usually by authority",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "aufheben, annullieren; außer Kraft setzen",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "yürürlükten kaldırmak, iptal etmek, feshetmek",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The Constitution assures that the United States government cannot abrogate our rights."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4bdab344-d143-4456-9bd4-74eb8e579980",
// 		"name": "guile",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "92674325-4710-483d-bb9f-4c8da27f6b42",
// 				"languages": [
// 					{
// 						"name": "deceitfulness, cunning, sly behavior",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Professional con men use guile as easily as others use a straw to drink soda."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4be5b6ce-2d01-44ed-ad23-9873c453a59b",
// 		"name": "elaborate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4f6a7260-11fc-4a5c-9a95-0d26b32d6586",
// 				"languages": [
// 					{
// 						"name": "complex, detailed, intricate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Pyramids are designed with very elaborate pathways, designed to trap would-be robbers."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4c2d578b-c7e8-477f-b3e1-9455032ea0a1",
// 		"name": "congregation",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b95a15de-8f23-4c56-87de-96a24dfd08ac",
// 				"languages": [
// 					{
// 						"name": "a gathering of people, especially for religious services",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The pastor told his congregation to read I Corinthians chapter 13 for that week's bible study."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4c95d1c8-cdeb-4686-bfda-03757b9f8c80",
// 		"name": "wizened",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3e1177d8-28ee-446c-b1b6-165d3cae722f",
// 				"languages": [
// 					{
// 						"name": "dry, shrunken, wrinkled",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The wizened matriarch rose from her throne, and spoke with the raspy voice of years, saying, \"My children, love each other always.\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4caaa7fc-0d4c-4ffd-89b2-d886fe698143",
// 		"name": "consonant",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5882e386-9775-4912-aeb4-0788e3fc63ce",
// 				"languages": [
// 					{
// 						"name": "in harmony",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The musicians' tunes were consonant and extraordinarily beautiful."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4cdf97ea-581d-45c7-963f-9d50012fa664",
// 		"name": "compensate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1a343be5-154b-44a5-8758-93bedf7b87cf",
// 				"languages": [
// 					{
// 						"name": "to make an appropriate payment for something",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Because they were to be compensated every two weeks for their labor, the Bordon's arranged their financial affairs accordingly."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4d000978-208b-41cf-b5cd-cc8586435d05",
// 		"name": "pinnacle",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "86e5105d-0d83-4c3b-927c-9ad46dc0b74c",
// 				"languages": [
// 					{
// 						"name": "the highest point",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"When an athlete is at the pinnacle of his career, his skill asInt is simply off the charts."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4d005396-404d-423c-92ad-3ccbb8c01f21",
// 		"name": "benighted",
// 		"dictionary": null,
// 		"pronunciation": "/bɪˈnʌɪtɪd/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "40f64c05-5904-4b41-9554-f0c87b236be9",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "inexperienced, naive; intellectually or morally ignorant; unenlightened",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "cahil, bilgisiz",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "unbedarft, unwissend; obskur",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"\"they saw themselves as bringers of culture to poor benighted peoples\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4d460284-ce93-4785-a2cf-c5eabee9627c",
// 		"name": "divine",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "36f629f6-a3b0-46ce-bb95-d7d2f4c5c018",
// 				"languages": [
// 					{
// 						"name": "godly, exceedingly wonderful",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Our plight was of such that only divine intervention was going to make a difference."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4d4e2a4d-bf69-49ec-b311-02551ca81d1f",
// 		"name": "atypical",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8a5fd0ce-351d-46b1-a92d-956338ff8cce",
// 				"languages": [
// 					{
// 						"name": "not typical, unusual",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Using sewing scissors to cut the lawn is the most atypical thing I've ever seen."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4d538c20-b06e-47d3-8e07-e6e247a7f2ab",
// 		"name": "dialect",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "42aed95f-91fc-4a0f-9743-3e5b56e2e251",
// 				"languages": [
// 					{
// 						"name": "a variation of a language",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The southerners were given away, as their dialect announced they weren't from Maine."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4db83d5e-0c28-45dd-b07a-917b89447879",
// 		"name": "facile",
// 		"dictionary": null,
// 		"pronunciation": "/ˈfasʌɪl/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b097f4af-8682-4813-927b-f9a9fba8dbfa",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "easily achieved; effortless",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Come on, Johnny, cleaning your room is a facile chore at best."
// 				]
// 			},
// 			{
// 				"id": "05189411-7e71-455e-b4c1-4960202d9f90",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "superficial, ignoring the true complexities of an issue",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The prince's words came across as facile and contrived; thus, his father knew he was lying."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4dca8b07-ea28-4df7-8ff9-cb17100eaf1d",
// 		"name": "agnostic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "47d1f92f-928b-419f-b4fd-4f07ff4dc378",
// 				"languages": [
// 					{
// 						"name": "doubting the existence of God.",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Joey's parents are very religious, but he is agnostic, searching for greater proof."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4e09725d-cb68-43fa-ae60-362455ca7eb2",
// 		"name": "sublime",
// 		"dictionary": null,
// 		"pronunciation": "/səˈblʌɪm/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7e357e46-bd25-4baf-906c-b71d08e73f00",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "lofty, grand, exalted",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "gelobt; wunderbar, außerordentlich",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "görkemli, olağanüstü",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The show went from the sublime to the ridiculous when the incredible singer gave way to a not-so-incredible boys' rap band."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4e0b3ca7-1c1c-4e05-aa36-6c0004428da1",
// 		"name": "obsequious",
// 		"dictionary": null,
// 		"pronunciation": "/əbˈsiːkwɪəs/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "60c9b999-ec1d-4492-a654-51b81c09a03a",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "submissive",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "unterwürfig",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "boyun eğen, yaltakçı",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The imprisoned women were strangely obsequious to their captors, suggesting some type of mind control."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4e15b823-5037-4eaf-82e8-f4b8abf4a434",
// 		"name": "exacerbate",
// 		"dictionary": null,
// 		"pronunciation": "/ɪɡˈzasəbeɪt,ɛɡˈzasəbeɪt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f8c35f9a-ab62-4ba4-9b8f-b0600f1fc664",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "make a problem, bad situation, or negative feeling worse",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "reizen, verärgern",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "sinirlendirmek, şiddetlendirmek",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Mrs. Johnston exacerbated her problem by lying about what she'd done.",
// 					"If someone has a cold and they go out in the rain without an umbrella, they might exacerbate their condition, making their cold even worse",
// 					"The new policy only served to exacerbate the existing issues within the company."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4e545b69-fd40-4f54-bffa-0635b75f243d",
// 		"name": "libertarian",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "401bd353-7e43-41d1-8268-0a11ff24937d",
// 				"languages": [
// 					{
// 						"name": "advocating principles of liberty and free will",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The libertarian candidate spoke of free will and the volition of each individual."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4e67e8b2-2f95-430c-a828-bbb18ccbc2da",
// 		"name": "bedizen",
// 		"dictionary": null,
// 		"pronunciation": "/bɪˈdʌɪz(ə)n,bɪˈdɪz(ə)n/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3b026c6a-5dd4-4600-b02b-58bfeea9da1c",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "to dress in a gaudy fashion",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "billig bis lächerlich kleiden oder verzieren",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "allayıp pullamak",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"\"a uniform bedizened with resplendent medals\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4eac5232-d2a2-4f41-98bf-f276e9cd503d",
// 		"name": "despondent",
// 		"dictionary": null,
// 		"pronunciation": "/dɪˈspɒnd(ə)nt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1f72ebb3-2785-4c22-a835-eb8eea48c8ea",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "feeling depressed, discouraged, hopeless",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "niedergeschlagen, bedrückt, verzweifelt",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "umutsuz, morali bozuk",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Geraldine became completely despondent when the news of the accident came."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4f518e3c-b52b-47be-85dd-0014de133a29",
// 		"name": "truncate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8eac2183-e985-4ad4-b3b9-3be401ff7559",
// 				"languages": [
// 					{
// 						"name": "to shorten by cutting off",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Craig tried so hard to get his brother to truncate his long, boring speech, but to no avail."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4f70c538-b0eb-47d2-9946-5a2c5c244b18",
// 		"name": "amenable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "34b81e17-8349-4beb-beee-5128d07303fe",
// 				"languages": [
// 					{
// 						"name": "willing, compliant",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"My teacher was amenable to the idea that his best students should be honored at the assembly."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4f823c94-0168-4624-8c14-b53f80ec4735",
// 		"name": "ostensible",
// 		"dictionary": null,
// 		"pronunciation": "/ɒˈstɛnsɪbl/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b5cf87ec-395d-48c8-9308-9f5b8ecfe1cd",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "appearing as such, seemingly",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "scheinbar",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "görünürdeki, görünen",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Ostensibly, those who refused to follow directions the first time were sent home."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4f9e9b21-29e0-43ba-822d-f1902493c20b",
// 		"name": "iterate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4606434c-d90f-4fc4-806b-c4dd997c50af",
// 				"languages": [
// 					{
// 						"name": "to say or do again repeatedly",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"\"the bird's call is a monotonously iterated single note\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4fb87f27-f4b6-4a3e-9900-3c9c7e1de1de",
// 		"name": "clamor",
// 		"dictionary": null,
// 		"pronunciation": "/ˈklamə/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f2d97bd9-8336-4d06-86f8-4edfec46b011",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "loud noise, especially that of people shouting",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Geschrei; Lärm; Aufruhr",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "gürültü, patırtı, yaygara, feryat",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Every night our upstairs neighbors made such a clamor that the police would have to be called."
// 				]
// 			},
// 			{
// 				"id": "73b95720-f855-48f6-b05a-b2c48af2ef3d",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "to loudly insist; demand loudly",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "schreien; toben",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "gürültü etmek, yaygara koparmak",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Jesse has been clamoring for a new car all summer long."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "4fd63461-064a-40ae-8123-739f6eb2aed4",
// 		"name": "aggregate",
// 		"dictionary": null,
// 		"pronunciation": "/ˈaɡrɪɡət/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5c530045-98b1-487f-afdc-d26b4adcbd28",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "a whole or total, combination; conjunction; group; mixture",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Gesamtheit",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "toplam",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The three branches of the U.S. Government form an aggregate that's much more powerful than any of its individual parts."
// 				]
// 			},
// 			{
// 				"id": "df8d8b99-cb11-4238-99c2-b388e05dd26c",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "to gather into a mass, accumulate; bring together",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "vereinigen; ansammeln",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "toplamak, birleştirmek",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"To make any possible rebellion attempt fruitless, the wicked dictator decided to disaggregate as many people from their community support groups as he possibly could."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "502696e5-8dd0-44d6-9190-d3d165c8e26b",
// 		"name": "metamorphosis",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "28795be8-9941-4f60-95b6-f7c7269a2779",
// 				"languages": [
// 					{
// 						"name": "the change of form, shape, substance",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The metamorphosis that the main character went through is proof positive that sinners can become saints."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "50bf24ce-9ccb-4e79-a9a9-d1ce3ab57225",
// 		"name": "despot",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "52867910-7a8c-48de-813a-182e0137d3ec",
// 				"languages": [
// 					{
// 						"name": "one who has total power and rules brutally",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The despot used threats of death and torture to control his citizenry."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5126b550-e879-49be-9c89-b1707c364d62",
// 		"name": "attribute",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "51670f0d-a6f3-416b-9bee-07675bf1bfae",
// 				"languages": [
// 					{
// 						"name": "to credit, assign",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"He attributes the bulk of his success to his wife's constant pep talks."
// 				]
// 			},
// 			{
// 				"id": "87e92952-501c-41c6-9020-06871f63c464",
// 				"languages": [
// 					{
// 						"name": "a facet or trait",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"One attribute that all toddlers have is an insatiable curiosity about everything."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5142ea4e-ec4e-42cf-9e8b-ebf6dc585ca5",
// 		"name": "vacuous",
// 		"dictionary": null,
// 		"pronunciation": "/ˈvakjʊəs/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4ed7c706-f75b-4fab-b3e1-c0082fd8613c",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "empty, lacking meaning; stupid",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "leer",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "boş, anlamsız",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"After being asked several hard questions in a row, and missing them all, Cloe seemed vacuous to those watching."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "51a2db27-d447-47cf-8cef-7456e5818d16",
// 		"name": "derivative",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3018ad1f-d437-45d0-9764-d518878516cf",
// 				"languages": [
// 					{
// 						"name": "taken directly from a source, unoriginal",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"\"His scowling countenance is a derivative of his paternal lineage,\" claimed his mom."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5240eda4-d699-466e-99c7-5597208f3303",
// 		"name": "reconcile",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "832f6aa7-2c48-40f5-a103-f1dbba91eea9",
// 				"languages": [
// 					{
// 						"name": "to return to harmony",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The couple wanted to be reconciled, but didn't know how to work through their problems."
// 				]
// 			},
// 			{
// 				"id": "f141152c-157f-4e3f-92dc-bdc4f7f216ed",
// 				"languages": [
// 					{
// 						"name": "to make consistent with existing ideas",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Several accountants were called in to reconcile the expenditures with the cash on hand."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5246e4b3-0215-4194-880d-83e2a2e421ea",
// 		"name": "exasperate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "42f87367-56e7-4564-876e-884f01876143",
// 				"languages": [
// 					{
// 						"name": "to irritate, irk",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Thomas's constant jabbering started to exasperate all of his classmates, provoking some of them to actually threaten his physical safety."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5273ba95-2261-41c3-9a4f-5ef36c928ce6",
// 		"name": "toady",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "62ca1fc4-577f-4a8f-b2f0-85fedc8f575f",
// 				"languages": [
// 					{
// 						"name": "one who flatters in the hope of gaining favors",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Being a toady is the easiest way in the world to become hated by all."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "52c7e71d-13cb-4183-ab44-3f0b64c19c2a",
// 		"name": "blemish",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1b13b7ab-265c-43dd-9d72-edf09651a0fa",
// 				"languages": [
// 					{
// 						"name": "an imperfection, flaw",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Because of a single blemish on my driving record, my rates are being doubled."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5318bad7-882f-47c2-93b8-286953781e30",
// 		"name": "complement",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "29e21d0e-10b1-4803-8394-509f3c28ac14",
// 				"languages": [
// 					{
// 						"name": "to complete, make perfect or whole",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"That picturesque cover page really complements the contents of your book, Henry."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "53734110-1c30-43ed-be98-c80f359827ce",
// 		"name": "staid",
// 		"dictionary": null,
// 		"pronunciation": "/steɪd/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "10db0115-34d1-4997-90e8-9fb5faf59294",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "sedate, serious, self-restrained",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "ernst",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "ağırbaşlı, ciddi",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The staid manner of the new boss infused the heretofore footloose and fancy free company with a dose of seriousness that it sorely needed."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "53eb7b22-3515-445e-9a44-5793ee9c7c96",
// 		"name": "boon",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3470861b-95c2-4646-b7e2-2fbbc94c2903",
// 				"languages": [
// 					{
// 						"name": "a gift or blessing",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The bad weather has erased the boon in business that the income tax refunds fueled."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "541e227c-4a38-4f9a-a5b8-28e42eaae5da",
// 		"name": "abridge",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4b910f86-75d0-419e-ba8d-c2730dec0d7b",
// 				"languages": [
// 					{
// 						"name": "to cut down, shorten",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The publisher thought the new compendium was much too long and abridged it."
// 				]
// 			},
// 			{
// 				"id": "827c8b52-ccfd-4343-858b-586908a2dbbe",
// 				"languages": [
// 					{
// 						"name": "shortened",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"War and Peace is such an epic tale, even the abridged version is long and detailed."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "543683d4-3112-4df9-8c84-5dda96a87699",
// 		"name": "relish",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e976dff4-a530-4af6-b65b-24a133cf7136",
// 				"languages": [
// 					{
// 						"name": "to enjoy",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Seeing the chocolate covered Strawberries that he relished so, Bob almost cried."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "54f3d9e4-9cba-4240-ba8a-392d49577047",
// 		"name": "salient",
// 		"dictionary": null,
// 		"pronunciation": "/ˈseɪlɪənt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e2b18167-b825-4668-ab19-966d209814be",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "significant, conspicuous",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "hervorspringend; vorspringend, -tretend",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "çarpıcı, belirgin, dikkat çekici, atlayan, sıçrayan",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The most salient topic broached by any speaker was the topic of early childhood learning."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5551ec12-9b31-4568-942c-32b098da7633",
// 		"name": "prudence",
// 		"dictionary": null,
// 		"pronunciation": "/ˈpruːdns/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5dba5454-ef4f-43bd-8290-a697f03fb617",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "caution, intelligence, discretion",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Besonnenheit; Klugheit; Vorsicht",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "ihtiyat, sağgörü, sağduyu, akıl",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Prudence would dictate that one should get to know on a personal basis those with whom one shares secrets."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "555474a5-c25d-4afc-bf85-5a8de8b02d62",
// 		"name": "convention",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "15d09a3e-c608-4946-b1d3-2c623ef946bf",
// 				"languages": [
// 					{
// 						"name": "an assembly of people",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The convention will be in town this weekend, taking up all of the hotel space."
// 				]
// 			},
// 			{
// 				"id": "06ef7ad8-1c54-4c03-a66a-85b163b6b9f9",
// 				"languages": [
// 					{
// 						"name": "a rule, custom",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The washing of feet is a convention of ancient Eastern culture."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "55649900-85f1-4cca-9f73-26d69597c488",
// 		"name": "choreography",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b150024a-f152-47e9-9049-fabfdb71e038",
// 				"languages": [
// 					{
// 						"name": "the arrangement of dances",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The choreography was superb; only the dancers with sublime skill were allowed to perform it."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "55d98c76-6761-4d73-82e5-fc00ebb70d5a",
// 		"name": "incorrigible",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "baa6dd34-4d7a-4ef0-b1ed-e5afdddbfc1f",
// 				"languages": [
// 					{
// 						"name": "incapable of correction, delinquent",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"When young people are allowed to break laws with impunity, they will certainly become incorrigible."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5603d517-9af7-40c3-a9c9-0e03bc09575f",
// 		"name": "sycophant",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0daef1db-c449-4852-9c7d-4554f7829b05",
// 				"languages": [
// 					{
// 						"name": "one who flatters for self-gain",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Most in-the-know bosses recognize sycophants a mile away, and give them cursory attention at best."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "56544981-b104-4171-8666-292453003019",
// 		"name": "diligent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e022f181-7e55-4ac4-903e-f9316480a954",
// 				"languages": [
// 					{
// 						"name": "showing care in doing one's work",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The diligent researcher checked and re-checked the data, ensuring it was valid."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "56772818-a701-4bba-a00b-5370e1eea5fa",
// 		"name": "diffident",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "eb15a0c3-b6e4-47a3-999a-8aef49765707",
// 				"languages": [
// 					{
// 						"name": "shy, quiet, modest",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The diffident young man did not speak during introductions, for his constant fear of seeming too audacious."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5684fd31-8704-411c-8317-d85b60aa11e8",
// 		"name": "tumescence",
// 		"dictionary": null,
// 		"pronunciation": "/tjuːˈmɛsnt,tjʊˈmɛsnt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "48de1b2f-753a-42eb-9dd5-e076b6d365c3",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "swollen or becoming swollen, especially as a response to sexual arousal",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"It is not only the man who is supplied with erectile tissue which in the process of tumescence becomes congested and swollen."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "569e0b34-d852-47de-a087-b0af5d420ef5",
// 		"name": "palliate",
// 		"dictionary": null,
// 		"pronunciation": "/ˈpalɪeɪt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "166f9690-c4a9-432d-af59-9f86dd5d7f00",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "make (a disease or its symptoms) less severe without removing the cause, ameliorate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Attempting to palliate the pain, Dr. Melcott increased the morphine dosage."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "56a7b6d5-dc5a-4226-ab25-eb6adce63417",
// 		"name": "refurbish",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f9bd09a9-4854-416a-8374-36786cf95627",
// 				"languages": [
// 					{
// 						"name": "to restore, clean up",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"For Mother's Day, we decided to refurbish her favorite rocking chair."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "57605d89-9bd0-43e0-84c0-86e0e4ffc0d8",
// 		"name": "forsake",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4bbb5604-36c5-4498-8cee-4425334fa70c",
// 				"languages": [
// 					{
// 						"name": "to give up, renounce",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"I have decided to forsake all of my vices, especially the tobacco and alcohol."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "57962713-ae36-428f-923b-dd551627e672",
// 		"name": "blight",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "263a648d-d5e1-45b8-8249-0b24949c7906",
// 				"languages": [
// 					{
// 						"name": "a plague, disease",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The potato blight destroyed the livelihood of many families in Ireland."
// 				]
// 			},
// 			{
// 				"id": "e8046a87-a29d-4f1c-b7bf-a8ffe6c246bc",
// 				"languages": [
// 					{
// 						"name": "a scar or mark of discoloration",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"His attitude was an ugly blight upon his daughter's wedding day."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "57b5e3f1-0fb0-4f90-aaba-c5b4f14c411a",
// 		"name": "aquatic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "eae9a074-5526-44c4-b023-bbe40cf95db0",
// 				"languages": [
// 					{
// 						"name": "relating to water",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"A marine biologist studies aquatic creatures and reports findings to the curious minded."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "57f260da-ab64-4656-93de-d6156092d879",
// 		"name": "reprove",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "84619f9d-52f1-4b22-9a12-164e2483a73b",
// 				"languages": [
// 					{
// 						"name": "to scold, rebuke",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The Bible reproves every evil act that men do, warning them to stop before it's too late."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5807a5c0-8b79-4cdf-8b44-a2239aa85e57",
// 		"name": "multifarious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3b9090a0-35d6-4c13-8d42-a07280118e5e",
// 				"languages": [
// 					{
// 						"name": "having great diversity or variety",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The reason I love Swiss army knives is because of their multifarious, do-everything design."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "583c9b05-eab9-4bba-9f48-e23a4999f11b",
// 		"name": "accord",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f07e0af1-fbaf-4894-81ea-487d7d4d9ef9",
// 				"languages": [
// 					{
// 						"name": "an agreement",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"After months of negotiating, the former enemies struck an accord that benefited them both."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "58478d70-a91d-40f4-802c-6c20bf041777",
// 		"name": "disperse",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "67f64722-70c9-4e18-9ab7-9c97ef5d97e1",
// 				"languages": [
// 					{
// 						"name": "to scatter, cause to scatter",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"It was our mission to disperse the rowdy crowd before violence could escalate."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "587d6be8-1562-4b3e-a98b-bc983c77bcc0",
// 		"name": "crescendo",
// 		"dictionary": null,
// 		"pronunciation": "/krɪˈʃɛndəʊ/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3a20b395-c1d7-4ae9-8e99-d46ecd71c12d",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "a steady increase in intensity or volume",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The crescendo of the bass drum started to sound like the heartbeat of an angry giant."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "588ed357-995f-4d10-9158-c78977bbcd0c",
// 		"name": "inquisitor",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "efc0410b-8b45-4d8b-8e1e-190c5d98c4dd",
// 				"languages": [
// 					{
// 						"name": "one who inquires, especially in a hostile manner",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The inquisitor was instructed to ask convoluted questions in order to confuse the citizens and get them to confess to crimes they'd not committed."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "59813f3e-3a49-4a0e-af7f-50c2e25482b1",
// 		"name": "inoculate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "386f59b0-abbe-44f8-9efc-2c6c2a0dc95a",
// 				"languages": [
// 					{
// 						"name": "to vaccinate against a disease.",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"In order to increase immunity against malaria, the travelers to the South American jungles were inoculated two weeks before their trip."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "59ef15f3-95f8-4310-a8d0-cb496fb06f6b",
// 		"name": "inarticulate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6585c9b2-f961-4e4d-857f-a1de9316bfae",
// 				"languages": [
// 					{
// 						"name": "incapable of expressing oneself clearly through speech",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Because the inventor was so inarticulate, she just used pictures and spokespeople to make her pitch."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "59f4f02d-e04f-49b8-92e6-6e63c15e1e89",
// 		"name": "virtuoso",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "99450a92-ccfa-4c83-9101-dac8b3775d67",
// 				"languages": [
// 					{
// 						"name": "one who excels in an art; a highly skilled musical performer",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Maestro Bland is a true virtuoso, playing with unique skill every instrument in the orchestra."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "59f9857b-b28e-480b-8b81-980db8f68af1",
// 		"name": "wanton",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "737b09dc-5cb9-4c06-b0e1-0885e8ee0944",
// 				"languages": [
// 					{
// 						"name": "undisciplined, lewd, lustful",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Geraldine's wanton manner often made her minister cringe with distress."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5a3306ab-a586-44e4-a2e9-ffc3ee76310b",
// 		"name": "plaudits",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6d77a8a7-f9f1-4ca1-8261-407b6703486e",
// 				"languages": [
// 					{
// 						"name": "enthusiastic approval, applause",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The plaudits given to the performance were an indication of the audience's approval."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5a4dedeb-7790-4022-a745-1bf3a6e646d5",
// 		"name": "harrowing",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "184843f7-5729-4262-b144-beaa652785a5",
// 				"languages": [
// 					{
// 						"name": "greatly distressing, vexing",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Going through that bank robbery was a harrowing experience that I shall never forget."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5a9b4c6e-9add-4ca2-9492-4b22e28a0ef8",
// 		"name": "circumscribed",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b5858b61-9bd6-40f3-8f97-cb90f04e8a87",
// 				"languages": [
// 					{
// 						"name": "marked off, bounded",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The circumscribed area of the football field was drawn with stripes and yardage numbers."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5b11dcfe-48c4-4ecb-821a-206fd7a07709",
// 		"name": "debauch",
// 		"dictionary": null,
// 		"pronunciation": "/dɪˈbɔːtʃ/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7c487be3-c4c9-4b12-be59-019463a3e440",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "to corrupt by means of sensual pleasures",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "verderben; verführen",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "baştan çıkarmak",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Massages and hot tubs are key ingredients necessary to debauch most weekends."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5b29bb99-6fa9-4332-86a6-4d1de2864725",
// 		"name": "adamant",
// 		"dictionary": null,
// 		"pronunciation": "/ˈadəm(ə)nt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4bdbc5a2-66be-4dea-8bd2-f9c6d0039f60",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "impervious, immovable, unyielding",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "unnachgiebig, steinhart",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "sert, hoşgörüsüz",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Though public pressure was intense, and the across-the-isle foes relentless, Obama remained adamant about his latest proposal."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5b5b7c2f-fa0c-46cb-b267-2ef47d263a18",
// 		"name": "nepenthe",
// 		"dictionary": null,
// 		"pronunciation": "/nɪˈpɛnθiːz/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "77f01778-fa14-4aa5-a0cc-ba8346e1af13",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "a drug or anything else that helps a person forget pain and sorrow",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Written references to what Homer called nepenthe, the \"potent destroyer of grief,\" date to the ninth century BC."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5b5d9493-c38b-4556-9ae1-e45619f0b100",
// 		"name": "temerity",
// 		"dictionary": null,
// 		"pronunciation": "/tɪˈmɛrɪti/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "255d792d-340e-465e-b3e3-01607c5677b6",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "audacity, recklessness",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Kühnheit; Stirn (haben)",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "cüret, küstahlık, korkusuzluk",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The soldier's temerity was lauded by his comrades, but it was chided by his superiors."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5b96574a-9e95-4246-9e38-d25cd4f4d31f",
// 		"name": "deter",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4d99bf9b-9c78-49a5-ba37-41be03e89040",
// 				"languages": [
// 					{
// 						"name": "to discourage, prevent from doing",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Nothing can deter an attacking lion once its victim has been chosen."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5ba0ad06-2a39-477a-b531-76feb7935750",
// 		"name": "yoke",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "dc4ae6c9-a8b2-466c-8b4d-44cdcfcc966b",
// 				"languages": [
// 					{
// 						"name": "to join, link",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The oxen were yoked together because the field was almost petrified from lack of rain."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5ba8c2b8-ee0d-452c-a638-f166eaef46a5",
// 		"name": "fidelity",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b2894cfb-957d-48de-be60-c63e659fff12",
// 				"languages": [
// 					{
// 						"name": "loyalty, devotion",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The soldier's fidelity to his band was rewarded with a Medal of Distinction."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5bc318f2-2d01-492a-b923-1f766b3c638f",
// 		"name": "excoriate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "208fa2b6-c819-4281-9e28-5635337989af",
// 				"languages": [
// 					{
// 						"name": "to abrade; to wear the skin off",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"\"the discharge is acrid and excoriates the skin of the nose\""
// 				]
// 			},
// 			{
// 				"id": "b9498bdd-4490-4d1e-a719-d2b5901ecbfc",
// 				"languages": [
// 					{
// 						"name": "criticize (someone) severely; to denounce scathingly",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"\"he excoriated the government for censorship\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5c2f56b7-cede-4ecf-b297-f6b2dda1a4ac",
// 		"name": "vociferous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "734d1901-0697-4737-b7c8-662f89152485",
// 				"languages": [
// 					{
// 						"name": "loud, boisterous",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The ring-3 master was so vociferous that he didn't need his megaphone to be powered."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5c73ff7c-fe43-42d4-ad3e-625a482baf04",
// 		"name": "odious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "56f7d387-3340-4592-951e-ebbe358c7459",
// 				"languages": [
// 					{
// 						"name": "instilling hatred or intense displeasure",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The convict's words to the jury were odious from beginning to end."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5c9a1926-1ed4-4a69-98ee-04e91ff28d0e",
// 		"name": "ingenious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "95735969-4a71-4de0-bf57-b5d777b27189",
// 				"languages": [
// 					{
// 						"name": "clever, resourceful",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The general was the most ingenious of all the battle leaders, figuring out his enemy's tactics and thwarting them on every turn."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5cfb0499-d6a8-426a-8077-2e01aba6020e",
// 		"name": "capricious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e12b7db6-5399-424f-8846-35b81e3f2186",
// 				"languages": [
// 					{
// 						"name": "subject to whim, fickle",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Impatient people often make capricious decisions under the least pressure."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5d181edd-a1e8-418a-91e2-32f1683a1bfb",
// 		"name": "anathema",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4ccd3a0c-5e8a-4cb8-aad8-51200639bb42",
// 				"languages": [
// 					{
// 						"name": "something cursed, a detestable person",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"I never want to see that murderer. He is anathema to me -- cursed forever, he is!\" exclaimed the unforgiving widow."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5d5272d1-acc4-4b28-9614-fbbd91f62272",
// 		"name": "abscond",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f11cc21f-c994-4d8b-b478-10f6f909be1f",
// 				"languages": [
// 					{
// 						"name": "to sneak away and hide",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"In the confusion, James Bond absconded into the night with the top secret codes."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5d5f7d5e-5bf3-457a-8237-7f34d2c63585",
// 		"name": "enamor",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0f165bea-cfed-4420-ae76-3082e88b75a9",
// 				"languages": [
// 					{
// 						"name": "to fill with love, to fascinate (usually used with \"of\" or \"with\")",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The husband-hunting women sought to enamor the eligible bachelors with their smiles and seductive movement."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5d6137dd-c7fe-49e4-a1e2-49533f473c3c",
// 		"name": "deft",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "40f6019c-330a-40fd-8d47-bcec12331cf7",
// 				"languages": [
// 					{
// 						"name": "skillful, capable",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Milton's deft attempt at humor was a sensational surprise; no one knew about his wit."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5d629f62-84b6-4836-be8e-85065517189d",
// 		"name": "abstruse",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "536126bf-43d1-440e-a14a-49af3c193d08",
// 				"languages": [
// 					{
// 						"name": "hard to comprehend",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Everyone else in the classroom understood geometry and algebra with ease, but poor John found the entire subject most abstruse."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5d9de742-2ced-4fa2-8ab7-7998764703f0",
// 		"name": "elegy",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "57c97a83-19dd-4bdc-a9d5-178b5b36cb84",
// 				"languages": [
// 					{
// 						"name": "a speech given in honor of a dead person",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The widow Morgan chose to read her husband's elegy herself, feeling the message was too personal for anyone else to red."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5db5c035-42be-481b-b1f8-7334f2d87170",
// 		"name": "scathing",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "32b89b21-4530-4ec4-be74-71f3865a56e3",
// 				"languages": [
// 					{
// 						"name": "sharp, critical, hurtful",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The reporter gave a scathing rundown of every wicked thing the mob boss had done."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5e17bf2f-7e5c-4a39-8c99-1b7e72d17238",
// 		"name": "nebulous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d1caa695-5969-4911-ae53-7a78a5c4d981",
// 				"languages": [
// 					{
// 						"name": "vaguely defined, cloudy",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"I found the teacher's explanation of the events very nebulous, as they were filled with imprecise allusions and hints."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5e3d2eb4-bdfc-4ae2-8a61-87e13a9ffc50",
// 		"name": "ascetic",
// 		"dictionary": null,
// 		"pronunciation": "/əˈsɛtɪk/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4deb8cd2-cea6-4b92-b0b7-f8216b7777a8",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "practicing restraint as a means of self-discipline, usually religious",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "dünya nimetlerinden elini eteğini çekmiş kimse",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Serious Christians live ascetic lifestyles, denying themselves all of the sinful pleasures that abound in our land."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5e63397b-6e24-4ebb-9106-b7dd563051e3",
// 		"name": "vehement",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "68577a3b-259d-4f28-8afe-330e7784d612",
// 				"languages": [
// 					{
// 						"name": "strongly emotional; intense or passionate; marked by great energy or exertion",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"\"I vehemently oppose any and all changes at this point!\" shouted Mayor Todd."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5e93d67f-9627-46cb-92c8-c6bf60815287",
// 		"name": "enthrall",
// 		"dictionary": null,
// 		"pronunciation": "/ɪnˈθrɔːl,ɛnˈθrɔːl/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2bc85b49-b9da-4e00-b9fd-d38ac5ebffc2",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "captivate, fascinate; to charm",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "bezaubern",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "büyülemek",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Enthralled with her beauty, the young man didn't notice her ill temper."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5e94b9e7-da9c-446e-8ef1-95d597c92dc0",
// 		"name": "vivacious",
// 		"dictionary": null,
// 		"pronunciation": "/vɪˈveɪʃəs,vʌɪˈveɪʃəs/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "67020abf-3ea8-4378-85c5-c045cced9a7a",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "lively, sprightly",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The vivacious cheerleaders shouted and bounced about during the whole game."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5e957f59-ff82-411b-bdc1-5fc780231825",
// 		"name": "bard",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "776a03ba-2a74-4337-aa77-792ab6ce4ee6",
// 				"languages": [
// 					{
// 						"name": "a poet, or a singer",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"William Shakespeare is often hailed the greatest bard of all time."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5e9b0b55-db61-4b17-91a9-ac07d8e0c1af",
// 		"name": "punitive",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b88d6317-beaf-4fb9-b104-833a08814d0a",
// 				"languages": [
// 					{
// 						"name": "involving punishment",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"When speeders are caught speeding through school zones, punitive measures are and should be guaranteed."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5ec76378-4424-4fb8-afa8-8b200e9f3a43",
// 		"name": "termagant",
// 		"dictionary": null,
// 		"pronunciation": "/ˈtəːməɡ(ə)nt/",
// 		"contexts": [
// 			"In the Middle Ages, Termagant or Tervagant was the name of a god that some European Christians believed Muslims worshipped."
// 		],
// 		"definitions": [
// 			{
// 				"id": "0954771c-9b73-4320-9c58-0750772e1dc5",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "a quarrelsome woman, a shrew, a nag",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "an imaginary deity or god",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The child must not be suffered to grow up into a termagant"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5fb32f83-0553-4a4d-a4aa-744fa915da71",
// 		"name": "rash",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e44ba6c0-5902-4392-ae53-e98558ae0c2c",
// 				"languages": [
// 					{
// 						"name": "hasty, incautious",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Don't be so rash in your judgment, Jonas; he may not be as bad as you think."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5fb95a3a-3422-4274-80c1-e2ca1aedec3e",
// 		"name": "veneer",
// 		"dictionary": null,
// 		"pronunciation": "/vɪˈnɪə/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a013c585-d102-409d-83d6-6f8ff37aa492",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "a superficial or deceptively attractive appearance, facade",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "dünne Schicht eines Materials die als Deckschicht benutzt",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "kaplama tahtası, gösteriş",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Beneath that veneer of politeness and manners, beats a heart that is willing to kill."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5fbaf0a4-6eb3-4709-a5c0-17b63c241afe",
// 		"name": "ad nauseam",
// 		"dictionary": null,
// 		"pronunciation": "/ˌad ˈnɔːzɪəm/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4ca6aebe-ba82-46dc-9a9a-133592c28347",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "bıktıracak derecede",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "bis zum Überdruß",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "without end, to a disgusting extent",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Gentleman thought we had talked ad nauseam about cattle and subsidies.",
// 					"I have been bored ad nauseam by his speeches.",
// 					"They have heard the arguments ad nauseam here today.",
// 					"I cannot pretend that all the arguments have not been rehearsed ad nauseam—and quite rightly."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5fc6da3d-2707-4e18-9fe0-98fee2aaac7c",
// 		"name": "dubious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "79d396e2-9230-4218-b19c-638866a8fc1e",
// 				"languages": [
// 					{
// 						"name": "doubtful, of uncertain quality",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"I heard his story; however, I remain somewhat dubious as to its truth."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "5ff7a005-773d-4ca5-845c-d8f8fd37859e",
// 		"name": "anachronistic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "fa9832ed-7aef-4e1f-b626-abc25f452f9f",
// 				"languages": [
// 					{
// 						"name": "out of its proper time",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Dinosaurs in downtown West Palm Beach would certainly constitute a monumental anachronistic event."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6046bd4a-5174-40ea-9e19-eb3f2ac315c0",
// 		"name": "raucous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3b54f349-4d35-4793-9354-1ffbf6319141",
// 				"languages": [
// 					{
// 						"name": "loud, boisterous",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Maria's raucous friends were over again last night, laughing, cursing, and singing their naughty songs."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6069b944-3708-4fc5-8fa0-9416bd7ff403",
// 		"name": "lassitude",
// 		"dictionary": null,
// 		"pronunciation": "/ˈlasɪtjuːd/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9f873cf3-7588-4166-8ee2-d47a8f245ade",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "weariness, exhaustion, a state of lethargy, listlessness",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Müdigkeit, Erschöpfung",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "bitkinlik, halsizlik",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"\"she was overcome by lassitude and retired to bed\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "60951aa1-fc3b-4042-8411-b133e3ededce",
// 		"name": "perusal",
// 		"dictionary": null,
// 		"pronunciation": "/pəˈruːzl/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ce6fb2a6-0189-43c8-9db3-acc728e4aa98",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "a careful examination, review",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"After careful perusal of the layouts, we saw where the leaks had to be coming from."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "610cf201-8993-415d-adbd-75e06dde1b3c",
// 		"name": "bilk",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "52aa5188-de49-4f68-b859-722e335f4b09",
// 				"languages": [
// 					{
// 						"name": "cheat, defraud",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The salesman bilked several of his prospects out of thousands of dollars in down payments."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6129aad3-f830-4697-ab90-df9ca1beb569",
// 		"name": "curtail",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5b8e69e6-40e5-4a97-badd-ed9e6b3208a2",
// 				"languages": [
// 					{
// 						"name": "to lessen, reduce",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Since breaking his leg at the tournament, Bill has had to curtail his riding classes."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6138d319-bc0b-4d03-a5e2-c523c482ff54",
// 		"name": "remiss",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "03cc53ce-a471-4a28-bd89-a0dbeb4667e8",
// 				"languages": [
// 					{
// 						"name": "negligent, failing to take care",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"\"It would be remiss of me not to mention our visitors,\" said Headmaster Belford."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "61f3d3a9-f123-43d8-b17c-2590174519a0",
// 		"name": "appropriate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8a4f9786-6304-48a0-bf56-ac9920c153fc",
// 				"languages": [
// 					{
// 						"name": "to take and make use of",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Uncle Sam appropriated the fissionable material without delay or explanation."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6290c1a4-1505-4d79-9767-058fc7650af0",
// 		"name": "weal",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "aa8686f9-170c-4947-ac01-737a4fa4e64c",
// 				"languages": [
// 					{
// 						"name": "prosperity, well-being; the general good",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Prepare yourselves to assume the high stations you must fill - for weal or for wo will depend upon the fitness you acquire."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "62953451-4e4c-48d5-bfc8-fd8cf925e372",
// 		"name": "maxim",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "39555ff1-66f8-4236-a48e-b0741ee119a4",
// 				"languages": [
// 					{
// 						"name": "a common saying expressing a principle of conduct",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The chief maxim of the day is this: Do unto others as you would have them do unto you."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "62b28343-e238-4fc1-8f7d-a46249f64585",
// 		"name": "antiquated",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f906fa95-ef90-44dd-b231-0474672183e5",
// 				"languages": [
// 					{
// 						"name": "old, out of date",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Calculators have quickly become antiquated tools, just like the typewriter that my parents used."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "62bae0a9-b647-49f6-9d31-2dc6ed327c0b",
// 		"name": "defunct",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3633ce12-6632-4098-93b8-37a65cea2f2b",
// 				"languages": [
// 					{
// 						"name": "no longer used or existing",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The divorced man spoke of his defunct marriage with the most baleful sigh."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6306ecc9-b302-4b09-9e06-3c4b819ecf6c",
// 		"name": "benevolent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e09832be-2e07-403a-a23b-81217a434d9e",
// 				"languages": [
// 					{
// 						"name": "marked by goodness or doing good",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"All public servants should be commended for their benevolent acts for the community."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6344df29-480c-41fb-9d61-90d2e53addff",
// 		"name": "allocate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1405dcd9-3e8d-4275-82e4-25a475727ed5",
// 				"languages": [
// 					{
// 						"name": "to distribute, set aside",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The president allocated 25 percent of the nation's budget to improve the school system."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "63e3e4e2-4248-4194-bd30-88aa10ef6164",
// 		"name": "assail",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "914ec69b-f3ad-46b0-8a9d-e6591bba1816",
// 				"languages": [
// 					{
// 						"name": "to attack",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"At dusk of the evening, the bloody battle will begin, and our unwary foes will be assailed without mercy."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "64025c0c-f601-4240-bf1e-058bb2ab9b65",
// 		"name": "polemic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ecf75526-e1d2-4367-ae5b-ea158a2fec6f",
// 				"languages": [
// 					{
// 						"name": "an aggressive argument against a specific opinion",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Alberto's polemic served to rebut his opponent and introduce a new view of reality."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "647f504c-96dd-48e4-8052-b0ce58b122c5",
// 		"name": "fortitude",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1305804d-bb34-4cd3-bb67-7128f7f598fa",
// 				"languages": [
// 					{
// 						"name": "strength, guts",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The fireman demonstrated great fortitude, entering the blazing inferno boldly."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "64a26cb9-3d12-47f2-b6fe-1956600f2609",
// 		"name": "coherent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c3e5f989-7fd2-4210-8b52-ac2924e0f37e",
// 				"languages": [
// 					{
// 						"name": "(of an argument, theory, or policy) logical and consistent, intelligible",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The victim was hardly coherent; thus, the officers had to delay their questioning."
// 				]
// 			},
// 			{
// 				"id": "b76781b7-3848-4278-ab3e-e368f1f0d18a",
// 				"languages": [
// 					{
// 						"name": "forming a unified whole.",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"\"the arts could be systematized into one coherent body of knowledge\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "64a9d800-5a7f-47ff-83f6-024019e586fc",
// 		"name": "profane",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c1a516ea-664a-4e08-9872-450738312e8e",
// 				"languages": [
// 					{
// 						"name": "lewd, indecent",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Stanley was suspended from school for three days for using profane language."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "64b92820-fb5f-445b-8e78-d459b05712f6",
// 		"name": "frenetic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c248cde3-0d73-4d9e-97ee-7625341e6642",
// 				"languages": [
// 					{
// 						"name": "frenzied, hectic, frantic",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Trying to maintain such a frenetic pace all day is what causes Jim to simply collapse at night."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "64d51a3f-72e7-4fe2-8702-a972efc7adca",
// 		"name": "clergy",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9ca49bb1-d495-4350-977d-1c4cc4b388cb",
// 				"languages": [
// 					{
// 						"name": "members of Christian holy orders",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Some members of the clergy pray in the wee hours of the morning while others sleep."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "64e84db7-3aa1-4152-8f7e-0bdca33d158e",
// 		"name": "plenitude",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "00107440-66e1-40ca-af12-6c78aab5ea04",
// 				"languages": [
// 					{
// 						"name": "an abundance",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"After the fierce rains, there was certainly a plenitude of fresh water for people and plants alike."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "65228a7c-81ef-437b-9f98-5f75561ae86d",
// 		"name": "resplendent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "aab0b51d-512b-4160-8dd0-2fa320420dc2",
// 				"languages": [
// 					{
// 						"name": "shiny, glowing",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The polished marble was exquisite and resplendent under the yellow lights."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6589ca36-e2a7-4bca-92f9-3ca5bc951bed",
// 		"name": "buffet",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5c7de3fc-e73d-404e-bb81-fb75d5ed1fb2",
// 				"languages": [
// 					{
// 						"name": "to strike with force",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The soldiers buffeted the prisoners, desperate for information."
// 				]
// 			},
// 			{
// 				"id": "e54d0898-35f9-446f-83e5-24a44eb52627",
// 				"languages": [
// 					{
// 						"name": "arrangement of food on a table",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"I love to eat buffet style; the all-you-can-eat expectation suits me to a tee."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "65b65a52-6cc5-4ff9-82d4-912dbc43b2f6",
// 		"name": "desiccated",
// 		"dictionary": null,
// 		"pronunciation": "/ˈdɛsɪkeɪtɪd/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "fd35c77f-e261-4d30-bb48-17ad51e0cea0",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "dried up, dehydrated",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The desiccated remains of the Egyptian mummies can still strike amazement into the hearts of Westerners."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "65d3f44f-5cf3-4f59-9417-7b5e4ea5a2ed",
// 		"name": "serif",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "57c446de-02bc-45c3-8fb8-19f164aac885",
// 				"languages": [
// 					{
// 						"name": "in printing, a little line used on the end of a broad stroke to form the lines of a letter",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"A very thin line or serif is apt to be lost in the background."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "660a85ae-9dc4-4333-a37f-73c2293aaaf1",
// 		"name": "extant",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1a7b4b78-42da-4e67-9d77-3e6e5e9a223a",
// 				"languages": [
// 					{
// 						"name": "existing, not destroyed or lost",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The memoirs of Julie Mayes were proven to be extant, when an old forgotten chest was opened and examined."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "66c078e8-efd1-4384-bab7-c782de234549",
// 		"name": "compound",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c8af62db-5d25-4747-a722-92ab436a1969",
// 				"languages": [
// 					{
// 						"name": "to combine parts",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The protesters compounded their offense by hurling stones at the police."
// 				]
// 			},
// 			{
// 				"id": "fc3c17e5-53d5-4ac8-aed9-3c139a1d6a2a",
// 				"languages": [
// 					{
// 						"name": "a combination of different parts",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Trying to teach compound sentences to middle school students can be a big chore."
// 				]
// 			},
// 			{
// 				"id": "dbc5f995-77a2-4741-ab6e-5003ab855dc4",
// 				"languages": [
// 					{
// 						"name": "a walled area containing a group of buildings",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The terrorists tried to break into the military compound last night; fortunately, they were thwarted."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "673ce885-8998-4409-91ad-2ec8ab3aad6d",
// 		"name": "palatable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "88b8c5d6-c884-4127-a55f-619e4d1d92e4",
// 				"languages": [
// 					{
// 						"name": "agreeable to the taste or sensibilities",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"That chocolate cake was the most palatable item on the table, even better than the pie."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "679150a0-4488-4faf-9090-a6619cbbf7a9",
// 		"name": "revere",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "530cf539-2e0c-4a28-a63e-038c0c942cbe",
// 				"languages": [
// 					{
// 						"name": "to esteem, show deference, venerate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The boys had been taught to revere the name of the founder of their school, removing theirs hats at the mention of his name."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "67aa8d7f-893f-48f3-998e-933e226c60e4",
// 		"name": "putrid",
// 		"dictionary": null,
// 		"pronunciation": "/ˈpjuːtrɪd/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a197bef0-6987-4d4a-b7f9-d5dc33fb06e3",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "rotten, foul",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "verfault; verrottet",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "çürük, leş gibi kokan, bozuk",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The putrid stench of the road kill was all over his new tires!"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "67c28f3a-7f63-44fb-98c2-8d9ef25b5e31",
// 		"name": "consumption",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d0f2a42e-a344-43bd-badc-973ca75d8def",
// 				"languages": [
// 					{
// 						"name": "the act of consuming",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Consumption of any intoxicating beverages is permitted only after duty hours."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "67e60f31-4f4b-487f-aa15-743b7dd031c5",
// 		"name": "antithesis",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "66342237-e99e-404f-bbce-aa0042414ea8",
// 				"languages": [
// 					{
// 						"name": "the absolute opposite",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Cold, hard hatred is the antithesis of warm, soft adoration."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "68185055-0eed-4c14-989b-f73048de693c",
// 		"name": "stagnate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7fb013d8-3853-414f-a93f-d0db0848d64a",
// 				"languages": [
// 					{
// 						"name": "to become or remain inactive, not develop, not flow",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"With no room to flow, the once pure waters stagnated and became a hatchery for mosquitoes and biting flies."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "681f0c72-576f-41d2-96d2-2c3b2bad1f36",
// 		"name": "cultivate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "40dc8663-a570-4e69-93a0-e65f4f8bd352",
// 				"languages": [
// 					{
// 						"name": "to nurture, improve, refine",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"A true politician learns early on to cultivate many friendships and to do many favors."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6840730a-2f5d-403e-90af-7488104a2462",
// 		"name": "contravene",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "367275c2-8ab3-48a9-86df-59c1ec11d782",
// 				"languages": [
// 					{
// 						"name": "to contradict, oppose, violate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Candice contravened her husband's instructions to the children, thus confusing them."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "68a1c4fa-e9d1-4c93-a67b-65811bd89130",
// 		"name": "effervescent",
// 		"dictionary": null,
// 		"pronunciation": "/ˌɛfəˈvɛsnt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f704ca3d-a9b2-4724-a9fc-993ad22cb38c",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "bubbly, lively",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "sprudelnd",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "köpüren, kabartan",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The effervescent spirit of the cheerleaders was truly infectious; everyone was screaming and shouting through the whole game."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "68bd2ba1-4b5b-46f4-8445-ee0e1c397148",
// 		"name": "wistful",
// 		"dictionary": null,
// 		"pronunciation": "/ˈwɪs(t)f(ʊ)l/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "af0ac319-4b01-42ef-a3fc-36f089e1b18b",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "full of yearning; dreamy with longing (especially for things past)",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "wehmütig, traurig",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "hasret çeken, özlemiş, dalgın",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"As Charlotte thought back on her last summer of fun, she became wistful, and longed for one more hour of joy."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6912fccc-6e11-46d4-95ab-ed78d892ae0c",
// 		"name": "eloquent",
// 		"dictionary": null,
// 		"pronunciation": "/ˈɛləkw(ə)nt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ff830ddb-7f7e-4a53-b701-e917e51719b5",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "expressive, articulate, moving",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "überzeugend; redegewandt; ausdrucksvoll",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "güzel konuşan, anlamlı",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"As the young woman spoke, her words were so eloquent many listeners became teary-eyed."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "691377a9-61fb-4f2c-977d-f5d784feaa0f",
// 		"name": "approbation",
// 		"dictionary": null,
// 		"pronunciation": "/ˌaprə(ʊ)ˈbeɪʃn/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "647ff4b4-b298-4f0a-b192-a72c0b7d7e6e",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "praise",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The President heaped great approbation upon the fire fighter that saved a child."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "692d88c5-58b6-472e-ba02-2c2f4b88d453",
// 		"name": "exigent",
// 		"dictionary": null,
// 		"pronunciation": "/ˈɛksɪdʒ(ə)nt,ˈɛɡzɪdʒ(ə)nt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "41d48760-ffda-4d4d-9a8a-47a6d2d0b490",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "urgent, critical",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "fordernd; dringend; zwingend",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "acil; zorlayıcı",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The situation became instantly exigent when the injured player started to spit blood."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "69567f54-8c7f-4f8a-9a6c-bead82456bcf",
// 		"name": "somnolent",
// 		"dictionary": null,
// 		"pronunciation": "/ˈsɒmnələnt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "24575cc8-4e64-4065-b2a8-d78314afbf03",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "sleepy, drowsy",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "schläfrig",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "uyku basmış",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Long tests, hot days, and somnolent students seldom make for happy teachers."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6977a7c6-b8c3-450c-bb3f-ce86b90756ff",
// 		"name": "restive",
// 		"dictionary": null,
// 		"pronunciation": "/ˈrɛstɪv/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6afab72e-6261-4575-9469-4a19b16c4b9d",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "resistant, stubborn, impatient, unable to remain still",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The youngsters became very restive, as the speaker went on and on, taking up their play time."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "697fc6ed-9b62-4b20-abde-73338f3af269",
// 		"name": "raze",
// 		"dictionary": null,
// 		"pronunciation": "/reɪz/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a68c87c0-da61-458a-802d-6e4c0c0b4565",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "completely destroy (a building, town, or other settlement)",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The demolition crew was called in to raze the condemned building before the hurricane season arrived."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6982cb95-50b6-4259-b739-d57a7bf896ae",
// 		"name": "blandish",
// 		"dictionary": null,
// 		"pronunciation": "/ˈblandɪʃ/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "be5f74ab-12fa-4e17-b698-7b94c7ebbffb",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "to coax by using flattery",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "schmeicheln",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "yağ çekmek, dil dökmek, gönlünü almak, yaltaklanmak",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Blandishing under-aged teens into taking an alcoholic drink is illegal in most states, but should be illegal in all."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "69e7d105-d60e-4ce9-ad8b-f57c097a0d06",
// 		"name": "etiology",
// 		"dictionary": null,
// 		"pronunciation": "/ˌiːtɪˈɒlədʒi/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0695e5c4-dd4b-424c-be21-11eff53a3595",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "the study of causes or origins; assignment of a cause or a cause of disease",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Erforschung der Ursachen von Krankheiten",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "hastalığın sebebini anlama bilimi",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The third volume of the fifth edition treats of the etiology and cure of crime."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6a307d68-4f9f-4541-9764-a3b713679f11",
// 		"name": "notorious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "24bd0b06-c2c2-4b35-81c3-7c70285dd20a",
// 				"languages": [
// 					{
// 						"name": "widely and unfavorably known",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The fraternity became notorious for its crazy parties and weird inductions ceremonies."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6a466012-356d-4fc0-9ead-949c2d610b8d",
// 		"name": "congeal",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "150539ef-fc35-4466-a02f-9deee8253cd0",
// 				"languages": [
// 					{
// 						"name": "to thicken into a solid",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The sauce had congealed into a thick paste, before it could be used as a topping."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6a8cb68c-af7b-4b1f-a708-409d010aa3cc",
// 		"name": "legerdemain",
// 		"dictionary": null,
// 		"pronunciation": "/ˌlɛdʒədəˈmeɪn/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "42273af2-6329-481e-8c0b-200d13623342",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "deception, slight-of-hand",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Taschenspielerei, Zaubertrick; Trickspiel",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "el çabukluğu, hokkabazlık, aldatmaca",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Marvin the Magnificent became world famous for his uncanny skill and legerdemain."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6aacdf9d-1788-4101-bae1-532d94f81f7f",
// 		"name": "hortative",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "03394290-55ca-4cc4-bd4e-27c9e5b69cab",
// 				"languages": [
// 					{
// 						"name": "giving advice; encouraging; inciting",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"An example of a hortative sentence is, \"Just try it at least once!\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6b06d2d3-23a2-4197-9676-1167157358dc",
// 		"name": "canvas",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b72544d8-8ca3-4aa0-8618-68ec5c99b294",
// 				"languages": [
// 					{
// 						"name": "a piece of cloth for an artist to paint",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"With the canvas in place, the artistic prodigy began to create a wonder."
// 				]
// 			},
// 			{
// 				"id": "095321dd-9d6c-4828-b821-4af48057cd44",
// 				"languages": [
// 					{
// 						"name": "to cover, inspect",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"We canvassed the area, looking for anyone who would buy five boxes of cookies."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6b891a78-0b5c-4da7-9a54-bc5d9f90b644",
// 		"name": "refract",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f918e667-e15e-407f-8987-c3956e887626",
// 				"languages": [
// 					{
// 						"name": "to distort, change",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The light was refracted as it passed through the prism, breaking into a full spectrum."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6b9cfbf9-8d74-4645-bb17-4f642264105b",
// 		"name": "austere",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0533ca00-8207-489e-a4c9-ee408517106d",
// 				"languages": [
// 					{
// 						"name": "very bare, bleak",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The Saharan Desert is one of the most austere habitats on the planet."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6c6d49d7-3826-42b1-8e9e-ef7b86625939",
// 		"name": "archetypal",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "388f6891-35af-4e8d-b232-dd5f3257ac30",
// 				"languages": [
// 					{
// 						"name": "the most representative or typical example of something",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The image of an aging Einstein has become the archetypal image of every genius."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6cf79c6f-afd3-4d79-948b-f7b6b546e269",
// 		"name": "propensity",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a3362dac-1ca1-48ff-be9c-d1253f0500e7",
// 				"languages": [
// 					{
// 						"name": "an inclination, preference",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Those whose trust has been abused must guard against developing a propensity to mistrust everyone."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6d36f732-13c7-407e-b155-2c9621d6a34f",
// 		"name": "cosmopolitan",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ad34a604-a31c-4ded-a288-00d4f6bce18a",
// 				"languages": [
// 					{
// 						"name": "sophisticated, worldly",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The lady I met at the banquet was a bit cosmopolitan for a country boy like me."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6dcb1b06-26c5-4e55-9e22-c11e1dd58927",
// 		"name": "cursory",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "deacfd19-0677-4029-8b6d-1a2af14eea61",
// 				"languages": [
// 					{
// 						"name": "brief, to the point of being superficial and inadequate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Giving cursory attention to important matters will, at some point, bring problems."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6e094007-1b09-465d-a096-b2b391a2c05b",
// 		"name": "protean",
// 		"dictionary": null,
// 		"pronunciation": "/ˈprəʊtɪən,prəʊˈtiːən/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ddfd7d0f-2edc-4ef4-85c2-2d47be239737",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "easily changing form; having various forms",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Proteus, den Gott des Meeres betreffend, der seine Gestalt nach seinem Willen verändern konnte, vielgestaltig",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "dönek, değişken",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Chief among Samuel's protean talents was the ability to start a fire with his mind."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6e1b76c3-3585-4d74-a60b-f35b3b77f357",
// 		"name": "unflätig",
// 		"contexts": [
// 			"Auch in Europa mischt Musk sich ein. Die EU Komission warnte Musk sogar for dessen Gespräch mit Trump dort keine Falschaussagen zu verbreiten. Doch Musk lässt sich von so etwas nicht beeindrucken. Seine Antwort - eine einzig große Unflätigkeit."
// 		],
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"definitions": [
// 			{
// 				"id": "1db98e66-0b13-41b3-8b96-b03df530caeb",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "unanständig, unangemessen, obszön",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "vulgarly, obscenely",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "terbiyesiz",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Da er nicht bigott sein wollte, war er anstößig; um seine Zuhörer zum Lachen zu bringen, erzählte er die unflätigsten Zoten."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6e3e36a8-e301-4de6-9e63-e6cb7187a2df",
// 		"name": "pertinent",
// 		"contexts": [
// 			"Originally, \"impertinent\" did mean \"irrelevant,\" but over time, its usage shifted. The term came to describe behavior that was not only irrelevant but also intrusive or inappropriate. This shift likely happened because when someone says or does something irrelevant in a way that is intrusive, it can be seen as rude or disrespectful."
// 		],
// 		"dictionary": null,
// 		"pronunciation": "/ˈpəːtɪnənt/",
// 		"definitions": [
// 			{
// 				"id": "8711b45e-735d-424a-bd5a-5620f30f19ec",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "relevant",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "yerinde, ilgili",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "zur Sache gehörig",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"She asked me a lot of very pertinent questions."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6e74b997-d3a2-4b4b-82d8-e821c6b35042",
// 		"name": "primeval",
// 		"dictionary": null,
// 		"pronunciation": "/prʌɪˈmiːvl/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "12055e7a-cf5d-4d1f-bf95-335cc9ecf3ad",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "of the earliest time in history, original, ancient",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "urzeitlich",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "ilkel, ilk çağa ait",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"His suit was the color of primeval metal, brown and gray mixed with red."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6f1eb525-45c8-4d68-9f51-3277c4f851f6",
// 		"name": "potable",
// 		"dictionary": null,
// 		"pronunciation": "/ˈpəʊtəbl/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8c4a337f-c4e8-4004-8e44-c61491f100bc",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "safe to drink; drinkable",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "trinkbar",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "içilebilir",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Creek water can be potable when spring water is scarce."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6f67bde8-1344-487c-a240-a1454abe2d91",
// 		"name": "interlocutor",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5e6483c4-7031-4161-bf63-0090411bc7a2",
// 				"languages": [
// 					{
// 						"name": "someone who participates in a dialogue or conversation",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"As one interlocutor said to another, \"Let's maintain our civility at all times during these discussions.\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "6ff22b86-6ab2-4baa-8e2f-c92ae5848aac",
// 		"name": "novice",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "31349185-762c-4d6d-a308-326b6382f9fe",
// 				"languages": [
// 					{
// 						"name": "a beginner, someone without training or experience",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"During the game, the novice players contributed just as much as the others."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7038f416-107c-408c-8146-761c910b0730",
// 		"name": "avarice",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "fa56bb89-3f00-43ae-ad51-ccf3cfd070fd",
// 				"languages": [
// 					{
// 						"name": "excessive greed",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Avarice has been the downfall of many an enterprising gentleman. Take note and hide yourself."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7091d333-04e4-41a8-a04d-5f11f5e74642",
// 		"name": "implement",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3a0ad156-3c97-4b05-af1c-c492acd50ed5",
// 				"languages": [
// 					{
// 						"name": "an instrument, utensil, tool",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The surgeon ensured that all of his implement were thoroughly sterile."
// 				]
// 			},
// 			{
// 				"id": "a7dba21f-d50e-4c4c-9b47-6918829c5dc8",
// 				"languages": [
// 					{
// 						"name": "to put into effect, to institute",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The high tech company decided to implement new security protocols."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "70adab7f-e621-405c-ac23-5c3dfaede812",
// 		"name": "decorous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5e6fde7f-7da3-4925-9e8d-aaf5dc55460d",
// 				"languages": [
// 					{
// 						"name": "socially proper, appropriate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The decorous manners of the guests made hosting the evening a task most pleasant."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "70c8846f-4c4c-4cb6-97fb-d7400793aed4",
// 		"name": "alacrity",
// 		"dictionary": null,
// 		"pronunciation": "/əˈlakrɪti/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "702d8114-4d28-4daf-9d44-b9f7e7b08084",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "eagerness, speed",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Eifer; Eilfertigkeit",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "canlılık, istek, heves",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"When Kevin's dad asked him to cut the grass, he did it with great alacrity; because, the new girl next door was standing outside watching."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7128ee23-2d2a-4086-985d-2f7003188905",
// 		"name": "servile",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6f6ba8fd-c50f-41dd-b152-197c32684ab2",
// 				"languages": [
// 					{
// 						"name": "subservient",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Because humble people have servile natures, they make incredibly faithful servants."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "714ae366-0628-4971-a94c-01740425527f",
// 		"name": "inclination",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c19e508c-84e0-4497-82c9-b962c7858727",
// 				"languages": [
// 					{
// 						"name": "a tendency, propensity",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Susan had an inclination to drop her chemistry class but fortunately changed her mind."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "714d2087-3d58-4b51-b2d3-f1922ecfc14a",
// 		"name": "effulgent",
// 		"dictionary": null,
// 		"pronunciation": "/ɪˈfʌldʒ(ə)nt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9f0f392f-8f24-47bc-a978-36e6d01e4c67",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "radiant, splendorous",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "glänzend, scheinend",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "görkemli, şaşaalı",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The monarch's new palace, made of gold and silver, was the most effulgent structure ever constructed."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7159aa4e-4bc6-4a16-bad3-405fb0abba46",
// 		"name": "schadenfreude",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f218b2eb-73bc-4c83-9602-2c8364a76699",
// 				"languages": [
// 					{
// 						"name": "guilty pleasure one experiences from the suffering of others",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"a business that thrives on Schadenfreude\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "71a1e181-6ece-44e1-a31c-0b2c5261a90d",
// 		"name": "indigent",
// 		"dictionary": null,
// 		"pronunciation": "/ˈɪndɪdʒ(ə)nt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "84fe6821-a331-4138-9c81-1b6b05d5b805",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "very poor, impoverished",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "mittellos, arm",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "fakir, muhtaç",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Many of those holding their I-will-work-for-food signs are truly indigent, having only the clothes on their backs."
// 				]
// 			},
// 			{
// 				"id": "b15dc5f7-1bdb-45ad-a0e0-94cea27f0bb3",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "poor person",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "arme Person",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "yoksul, fakir, muhtaç",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"A charity for the relief of indigents, who are artists"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "71c62b63-d3ad-485e-b46a-ccd22b7a3a7e",
// 		"name": "edict",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1c71fcee-77e6-458c-8edf-af1df36e5db7",
// 				"languages": [
// 					{
// 						"name": "an order, decree",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"When the king's edict was read, the malcontents in his kingdom began to slowly disappear until not one was left."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "71d8903b-346e-4fb5-832d-cb2ad1ca826b",
// 		"name": "animated",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "89d6c339-9e84-4ff2-ab3c-15fb34ec32ad",
// 				"languages": [
// 					{
// 						"name": "lively",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Today's animated cartoons are the most life-like ever, touching all modern situations with virtual perfection."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "71dff7ad-5eda-4455-96a8-0927a4963dcc",
// 		"name": "elude",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c7413b47-0ba5-4ad5-9803-a5519824d147",
// 				"languages": [
// 					{
// 						"name": "to evade, escape",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"To elude capture, the clever criminals waded into the river and floated with the logs."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "71e11a1d-98d9-4f76-8ab0-d9c74124d7d3",
// 		"name": "hegemony",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b5d01198-438c-4038-8c9d-8900714e269d",
// 				"languages": [
// 					{
// 						"name": "domination over others",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The seniors' hegemony over the underclassmen was a well documented reality on our campus."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "720285f3-73a2-48ff-b5a2-eac71465c7aa",
// 		"name": "dispatch",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "cbba699f-7221-4e6d-b5db-37d7043c0306",
// 				"languages": [
// 					{
// 						"name": "to send off to accomplish a duty",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The commander dispatched a lone soldier to carry the message of surrender to their opponents."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "72209ec3-43e8-4cdb-b06d-fd76d516d066",
// 		"name": "minatory",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "66e41636-e1fd-44e7-9074-0e09cd4a73ad",
// 				"languages": [
// 					{
// 						"name": "menacing, threatening",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"\"he is unlikely to be deterred by minatory finger-wagging\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7237837b-a28a-433b-8bc1-153dd028435b",
// 		"name": "vindictive",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4d016870-d5fa-4d43-8c5a-eece96cb4daa",
// 				"languages": [
// 					{
// 						"name": "vengeful",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"When the vindictive felon was finally released from prison, he immediately sought to afflict those who'd put him there."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7243dd6d-3b68-45a7-8f4f-2a6b79e1c6f7",
// 		"name": "insidious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1c546e46-0a48-47c0-b817-965a0f8164d5",
// 				"languages": [
// 					{
// 						"name": "appealing, but imperceptibly harmful, seductive",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Lisa's insidious compliments were designed to guide her victims into a false sense of security."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "72faedc3-dbee-4fac-b7df-f2ae572ceedc",
// 		"name": "repentant",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "53ed8035-3e3c-4ae6-bafe-45e5a1f9b298",
// 				"languages": [
// 					{
// 						"name": "penitent, sorry",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Not being repentant in the least, George simply threatened to slap her again."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "731c093d-adab-4a38-80bc-643e71e141bf",
// 		"name": "nascent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5c663773-799a-4888-aec0-9fe21eb25076",
// 				"languages": [
// 					{
// 						"name": "in the process of being born or coming into existence",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The nascent genius of the young students in Dr. Einstein's class was evident when some of them actually challenged some of his assumptions on relativity."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "732a6df1-309b-4d99-8204-2af7874304db",
// 		"name": "orthodox",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "27222f84-9bee-4abb-8ae4-1e0c0f7db1d2",
// 				"languages": [
// 					{
// 						"name": "conventional, conforming to established protocol",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Because of their orthodox thinking the elders wouldn't even consider any so-called new fangled ideas."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "732f33e9-9a1b-46dd-82bd-443ee19c9ba8",
// 		"name": "diffuse",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7288c637-90f1-4da0-8e72-5caa0f112876",
// 				"languages": [
// 					{
// 						"name": "to scatter, thin out, break up",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Clod diffused the tension in the house by telling one of his creative anecdotes."
// 				]
// 			},
// 			{
// 				"id": "430a1320-9bf0-4f7c-a0dd-a8a2b1832288",
// 				"languages": [
// 					{
// 						"name": "not concentrated, scattered or disorganized",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Martha tried desperately to explain her diffuse thought process, but to no avail."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "736aaa8f-3975-4176-9ec6-19a95b257c82",
// 		"name": "palindrome",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5e970283-a088-4a5e-b3e0-85de61f3b2ae",
// 				"languages": [
// 					{
// 						"name": "a word or phrase whose letters spell the same thing forward and backward",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Sir Henry Wood suggested that the method of the anagram or palindrome yielded very happy results."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "738c1cd9-dcfa-4208-a50b-ce371fbceee2",
// 		"name": "zephyr",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bc370976-2130-4b2b-b84f-e8f90f08f23b",
// 				"languages": [
// 					{
// 						"name": "a gentle breeze",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"If Zephyr favors us, we shall make port by nightfall,\" Captain Longfellow announced."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "73cd9a12-f312-4e3f-b0bf-b2762ad3798e",
// 		"name": "balk",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f03d6696-426f-4ca3-8e3e-f6e78054568f",
// 				"languages": [
// 					{
// 						"name": "to stop, block abruptly",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Because I took his comment the wrong way, I just balked at everything else he said."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7425530f-6087-4f7a-aa0d-2242bf6fcaef",
// 		"name": "harangue",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0ec8f9c4-86ef-4fa7-bb76-6cd59b3dd98b",
// 				"languages": [
// 					{
// 						"name": "a ranting speech",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Every student had heard the teacher's harangue about late homework at least two dozen times."
// 				]
// 			},
// 			{
// 				"id": "232f6cd2-5342-4b0d-be00-e5b83a6268dc",
// 				"languages": [
// 					{
// 						"name": "to give such a speech",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Mrs. Shepherd harangued her class a full fifteen minutes about their constant talk."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7431e504-d587-4163-9c86-e49324e31489",
// 		"name": "sangfroid",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b03b39c4-6903-4326-8523-86e0e610b451",
// 				"languages": [
// 					{
// 						"name": "extraordinary composure, even when in danger; coolness of mind; calmness",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"That fact alone permits Christie loyalists to greet the new negativity with a healthy degree of sangfroid."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "74572489-06ad-4933-b369-b2d16bcaed31",
// 		"name": "solipsistic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bab52c49-2cf6-4e02-a926-f293f36687b9",
// 				"languages": [
// 					{
// 						"name": "believing that oneself is all that exists",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The solipsistic attitude of some of the super rich causes them to ignore the plight of the poor, and sometimes to even blame the poor for their condition at birth."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "747935d4-5c05-48b0-b4c8-599ff5900bb2",
// 		"name": "puerile",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f5f17c1b-3bc2-4c79-9437-cbd348cd1cc4",
// 				"languages": [
// 					{
// 						"name": "juvenile, immature",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The young man was lectured by his professor for his puerile actions and told to go home and grow up."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "74cf059e-cf27-42f2-8c19-d99d4b639f12",
// 		"name": "engender",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b1aab7d0-19b9-4e16-b08a-e1b022bbba3e",
// 				"languages": [
// 					{
// 						"name": "to bring about, create, generate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Trying to engender strife among the groups of voters, the devilish candidate sabotaged one group and blamed it on the other."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "74db55f5-89bf-4b93-bc0a-340cc3e75399",
// 		"name": "conspicuous",
// 		"contexts": [
// 			"\"What if professor Young actually is John Oldman?\" \"Well, how do you make that leap?\" \"Jenkins talks about several times when Oldman conspicuously avoided having his picture taken.\""
// 		],
// 		"dictionary": null,
// 		"pronunciation": "/kənˈspɪkjʊəs/",
// 		"definitions": [
// 			{
// 				"id": "49936634-c105-45fd-86a4-49e154b53417",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "auffällig, deutlich",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "bariz, apaçık, dikkat çekici",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "noticeable, obvious, clearly visible",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"He was very thin, with a conspicuous Adam's apple."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "752e0a08-2c96-42ba-b761-cbdf62311b8c",
// 		"name": "uncanny",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bb3d50fd-9042-448a-8657-85d6366489b5",
// 				"languages": [
// 					{
// 						"name": "of supernatural character or origin",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"It's uncanny how the skilled magicians can make things seem to float without using any apparatus."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "754ef45b-02ce-4540-8e4b-b5cd840a1687",
// 		"name": "comity",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ef3d6543-c5f1-4d44-96ed-54dc8eed229a",
// 				"languages": [
// 					{
// 						"name": "courtesy, civility",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"a show of public comity in the White House\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "755b7999-c168-4fe2-885b-11ab6859f664",
// 		"name": "aberration",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "16ae5a00-c7ba-44e1-8c5b-db8af203de3e",
// 				"languages": [
// 					{
// 						"name": "something that differs from what's normal",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The doctor's ill-tempered behavior was thought to be nothing more than an aberration, that is, until it continued for a full calendar year."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "75c846b9-728f-434c-8d43-587e367ec215",
// 		"name": "banal",
// 		"dictionary": null,
// 		"pronunciation": "/bəˈnɑːl/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4c9b5a17-c39e-45f0-8d79-41b4ae774cef",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "dull, boring",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The presentations lacked originality and spark; thus, they all struck me as banal."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "75d1daa4-4bf0-4706-b6bf-fa72b4c2b1b5",
// 		"name": "accost",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f332edc7-c467-4495-9b4d-b62478d4a4a4",
// 				"languages": [
// 					{
// 						"name": "to confront verbally",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Though Alecia was normally quite verbose and aggressive, when the clumsy waiter spilled soup on her for the third time, she didn't accost him in the least."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "75db8c58-dca4-4603-8fa7-1d6c2e801e40",
// 		"name": "strident",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b0656627-1439-4fce-8ed4-ce669f7ab7b9",
// 				"languages": [
// 					{
// 						"name": "harsh, loud",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"My fourth hour teacher is the most strident person in the world, yelling at and accusing her students constantly."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "76117d4a-71dd-4d5d-b289-9bc8ed270699",
// 		"name": "iconoclast",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "41c6ad9b-360f-4d28-aed7-73bb6daa80c3",
// 				"languages": [
// 					{
// 						"name": "one who attacks commonly held beliefs or institutions",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"John protests everything that the establishment offers, in true iconoclastic style."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7653d871-4f42-4e84-b6b4-f6e573a0c3eb",
// 		"name": "apathetic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "19134b46-9667-4669-8ae3-29274dd2bb66",
// 				"languages": [
// 					{
// 						"name": "lacking concern, non-emotional",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Disinterested in academics, Kerry was totally apathetic about the causes of the rise and fall of the Roman Empire."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "767fd136-a5a9-4645-b4a8-d38d4d1eaeb5",
// 		"name": "canny",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e6f87343-4eac-4222-8fbf-de30a59fcc81",
// 				"languages": [
// 					{
// 						"name": "shrewd, careful",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The canny spy gathered all the proof he needed without ever being detected."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7762c5a7-9005-4d79-bdcf-3c67eff0137b",
// 		"name": "idiosyncratic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5590efa5-6a5d-4d51-bcf6-0a4930633d1a",
// 				"languages": [
// 					{
// 						"name": "peculiar to one person; highly individualized",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Joshua's idiosyncratic behavior identifies him as the only living descendant of Crazy John Maddox."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7765037d-9ae5-4513-8556-c2d5d5c3590e",
// 		"name": "construe",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c3aae1b6-f69a-4d28-8e60-b5eddf90572d",
// 				"languages": [
// 					{
// 						"name": "to interpret",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Paul attempted to construe the letter from John as an attempt to sway the judgment of the council."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7766e3fe-db3e-48ad-a635-87c2c8e0a968",
// 		"name": "proscribe",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bed6d091-0480-4985-b8c9-c610b965f397",
// 				"languages": [
// 					{
// 						"name": "to condemn, outlaw",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The court proscribed a sentence of not less than thirty years and not more than fifty."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "778df3ea-f93a-4ba9-af88-d1901ec02bab",
// 		"name": "regurgitate",
// 		"dictionary": null,
// 		"pronunciation": "/rɪˈɡəːdʒɪteɪt,ˌriːˈɡəːdʒɪteɪt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "93db5eea-c8c5-4aab-9e99-e4c4ae91fa4d",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "to vomit",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Sticking his fingers down his throat, Morris was trying to force himself to regurgitate."
// 				]
// 			},
// 			{
// 				"id": "7cc4ea15-4484-4ac1-b18b-5058ab73ee9a",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "repeat (information) without analysing or comprehending it",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"After studying his science chapters all night, Willie just regurgitated the information."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "778e1964-826d-47f4-8222-767e533dcdef",
// 		"name": "atrophy",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7c09a522-c8d4-4188-95ba-0c694dd120dd",
// 				"languages": [
// 					{
// 						"name": "to wither away, decay",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Any body parts deprived of blood for an extended period will surely atrophy and die."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "77e21c5d-cdc3-4664-a292-ee0ba859c939",
// 		"name": "assess",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3bf0c880-1799-40ce-a33c-2ee63b68864c",
// 				"languages": [
// 					{
// 						"name": "to evaluate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Trying to assess the work of a professional is a task best left to the experienced."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7833a425-c200-4311-b5d7-d99147712a36",
// 		"name": "atone",
// 		"dictionary": null,
// 		"pronunciation": "/əˈtəʊn/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e555ecbd-a39d-473e-b3cf-59eeb1486982",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "to repent, do penance, appease, make amends",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "büßen, versöhnen, wiedergutmachen",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "telâfi etmek, gönül almak",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"To atone for his crimes, sad and regretful jaywalker volunteered for community service."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "788c0abf-502a-40db-9d16-cb174baf972e",
// 		"name": "donnybrook",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c785264e-2ee7-4081-a14e-c39d296bc7d2",
// 				"languages": [
// 					{
// 						"name": "a tempestuous brawl",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Their chief delight is to get into a regular donnybrook fight."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "78b5958e-af71-4f7f-9af0-bff884cbad21",
// 		"name": "avenge",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "346dce6a-121a-4684-9962-2147cd04c939",
// 				"languages": [
// 					{
// 						"name": "to seek revenge",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Taking justice into your own hands is probably a notion fed by the impulse to avenge, not the impulse to do the right thing."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "79556d43-9abc-4426-8f6a-5bbc414299ca",
// 		"name": "emulate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "777aeef3-6088-4e8e-9388-c25548e3cc68",
// 				"languages": [
// 					{
// 						"name": "to imitate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Teens constantly emulate their idols, singing and dancing as much like them as their modest abilities will allow."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "797e4825-3174-4a6a-b08e-c9163449d0ba",
// 		"name": "deprecate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "15fad7fb-d129-4b34-b871-75eef6a5ef8d",
// 				"languages": [
// 					{
// 						"name": "to belittle, depreciate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Self-deprecating humor is the hallmark of the self assured."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "79b78918-39c9-4606-8c50-65a10cd9b06b",
// 		"name": "hierarchy",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c471309e-c6c8-4610-9bd4-724dc339320e",
// 				"languages": [
// 					{
// 						"name": "a system with ranked groups",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"In the American system of hierarchy and power, civil authorities are placed above military authorities, but not by much."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7a22c805-f1fa-4299-a4ec-fee8be3945ac",
// 		"name": "beguile",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d042fa5b-5bff-47cb-9a80-891a6ca55464",
// 				"languages": [
// 					{
// 						"name": "to trick, deceive",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The Devil beguiled Eve and she ate of the forbidden fruit."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7a73fc67-09ee-4b52-a2c1-7ccab9b1185a",
// 		"name": "disavow",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3d3e0fba-4ba2-440e-9cf7-22d213adedd0",
// 				"languages": [
// 					{
// 						"name": "to deny knowledge of or responsibility for",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"When spies are caught, their respective governments will disavow any knowledge of their actions."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7ac41f96-298e-4863-aeb0-0fb5a2adf9a0",
// 		"name": "fickle",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "952189dd-5df1-4cef-b442-f53db66e6da5",
// 				"languages": [
// 					{
// 						"name": "shifting in character, inconstant",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Young boy are so fickle, young girls should always be prepared for heartbreak."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7b108999-9e69-4282-a381-0058dc32cb65",
// 		"name": "appease",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "90755da6-38b0-4a9b-b6cd-78c29db432bf",
// 				"languages": [
// 					{
// 						"name": "to calm, satisfy",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Lavish gifts were prepared for the angry monarch, hoping to appease his wrath."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7b1ac5d4-6539-4a27-a846-08f53c98fffc",
// 		"name": "consolation",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c4fa03f1-6fb6-41f1-89be-c1630cf70ec7",
// 				"languages": [
// 					{
// 						"name": "an act of comforting",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Alton's attempt at consolation toward his bereaved friend was taken as an act of supreme brotherhood."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7b69223e-ec4d-4d09-9663-87fe377a8fdf",
// 		"name": "masticate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2da84e96-b857-454b-999d-3d21057431ca",
// 				"languages": [
// 					{
// 						"name": "to chew",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"She was trying to masticate these when there came a tap at the door."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7ba272b4-fa66-4604-a52b-f5d707e9a87c",
// 		"name": "ballad",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "23590da8-0101-42f5-8701-08bcaa8c615e",
// 				"languages": [
// 					{
// 						"name": "a love song",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"I wrote a ballad for the love of my life; however, the love of my life wrote one for someone else!"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7bf7bd84-38cc-4caa-9164-11bc72d98b10",
// 		"name": "discordant",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "63a503af-355e-46e2-a72a-522898a7ca64",
// 				"languages": [
// 					{
// 						"name": "not agreeing, not in harmony with",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"When the beginning band started to play, the discordant sounds flooded the room like a noisy cloud."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7c0aa762-45da-4415-8896-9b4167c73c51",
// 		"name": "intransigent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "32f44785-f1c5-4d18-84a6-81b838c7ccfe",
// 				"languages": [
// 					{
// 						"name": "refusing to compromise, often on an extreme opinion",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The intransigent young woman said she was entitled to the house, the furniture, the car, the boat, and every penny in their joint account."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7c104021-3918-41dc-a663-22722f533080",
// 		"name": "inviolable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4fcadf0b-67d4-428a-bbcc-51d34b1ca5e2",
// 				"languages": [
// 					{
// 						"name": "secure from assault",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Those in control of their tempers are usually utterly inviolable to verbal attack."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7c3d0f4b-df43-4816-8133-7504b1709075",
// 		"name": "amenity",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6935ba59-bd7d-4b62-a744-d2341003cce1",
// 				"languages": [
// 					{
// 						"name": "an item that increases comfort",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Oprah's guest house is decked with a multitude of amenities - gadgets and toys galore."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7c540fdc-1372-4220-8e2e-7e3342c91653",
// 		"name": "dissipate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bd66c769-a1f8-4393-8551-e3e722bf0893",
// 				"languages": [
// 					{
// 						"name": "to disappear, cause to disappear",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The sun finally came out, and the fog dissipated like smoke."
// 				]
// 			},
// 			{
// 				"id": "7357f0dc-c1b3-4bca-a28c-25a0f78f7371",
// 				"languages": [
// 					{
// 						"name": "to waste",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Thanks to a card game, Joe's paycheck was dissipated in less than an hour."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7c8400eb-1b06-4130-99eb-823bb4b0e8b7",
// 		"name": "equivocal",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "179fa8e2-8f53-4bfb-b49a-cd0cc1c87d67",
// 				"languages": [
// 					{
// 						"name": "ambiguous, uncertain, undecided",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Politicians usually give equivocal answers to difficult questions."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7cb302b8-9d45-4a7b-904f-042fb04ab6c6",
// 		"name": "concoct",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "59588e90-a99e-41f4-b4a8-4b8b89e42874",
// 				"languages": [
// 					{
// 						"name": "to fabricate, make up",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"She concocted the most vile potion imaginable to prank her bratty little brother."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7d487834-d635-4714-96d3-0e39980c261a",
// 		"name": "lavish",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7f13fbc2-2544-4e11-b286-2be568aadac6",
// 				"languages": [
// 					{
// 						"name": "given without limits",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Lavish praise was heaped upon the officer for his demonstration of awesome valiance."
// 				]
// 			},
// 			{
// 				"id": "6fd9515e-a4e3-47fc-a454-67bcbd9d3be1",
// 				"languages": [
// 					{
// 						"name": "to give without limits",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Lavish praise upon the worthy that all others may see the virtue and imitate it."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7e317bec-2f79-4a1f-badb-fc8a99fd836f",
// 		"name": "fusillade",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "cc5dd1d9-67f4-4daa-a00e-17f4b6a80814",
// 				"languages": [
// 					{
// 						"name": "a rapid or simultaneous discharge of many firearms or a firing squad; a rapid outburst in quick succession",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"A fusillade of shots poured out of the darkness upon the well-lighted defenders."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7e8b7137-1dd1-4c7f-b674-a22a2ea9851e",
// 		"name": "disaffected",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6b086a86-eb1f-4200-befd-50e2cb60e91e",
// 				"languages": [
// 					{
// 						"name": "rebellious, resentful of authority",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The disaffected soldier ignored his orders, slipped into the night, and left his company to battle without him."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7eaff216-fb7f-4989-8808-8a2e3fc3e8dc",
// 		"name": "etiolated",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "61183251-a7c4-4a39-8023-cb869cbe2eda",
// 				"languages": [
// 					{
// 						"name": "whitened or bleached",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"etiolated leaf segments"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7ef77131-62f3-4d32-b570-d63491a8eabd",
// 		"name": "viscous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "aacb5a41-be9a-4a26-829c-96216eda0e2e",
// 				"languages": [
// 					{
// 						"name": "not free flowing, syrupy",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Once blood chills, it can become as viscous as maple syrup."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7f5d76bd-37ae-4fbf-97d8-369dd4190a23",
// 		"name": "exult",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "be77c39b-856b-4d05-9084-7a2ad3e2ee7a",
// 				"languages": [
// 					{
// 						"name": "to rejoice",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"George exulted for hours when he finally landed that six-figure position."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7f79efd0-d3c9-4cc1-ade7-8f5b07ff5359",
// 		"name": "redoubtable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8481a92c-5caf-47ed-9f29-6f7f6c186ff0",
// 				"languages": [
// 					{
// 						"name": "formidable",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The attacking force was so redoubtable, the defending troops cowered silently."
// 				]
// 			},
// 			{
// 				"id": "1c152011-50e8-4e99-9aed-83f56cc0b3f1",
// 				"languages": [
// 					{
// 						"name": "commanding respect",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The redoubtable commander entered the barracks and everyone stood at attention."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7f7d09e4-c82f-429a-846e-d6b56b2fdf11",
// 		"name": "fathom",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "cb14656e-28c4-4e05-a9f1-5d99344a75da",
// 				"languages": [
// 					{
// 						"name": "to understand, comprehend",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"It's truly difficult to fully fathom the quantity of water that's on our beautiful Earth."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7fb92bbd-2876-44d9-bd45-15d7ae5b4704",
// 		"name": "scintilla",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "89073e66-1627-44eb-8843-32af2541b2eb",
// 				"languages": [
// 					{
// 						"name": "an iota, a small amount; a spark",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"How could anyone do all this without leaving behind a scintilla of microscopic evidence?"
// 				]
// 			},
// 			{
// 				"id": "ea32009e-fde9-4a75-b030-207056c2ab13",
// 				"languages": [
// 					{
// 						"name": "a spark",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"from figurative use of Latin scintilla \"particle of fire, spark, glittering speck, atom,\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7fd1dcf1-8254-481b-aca6-285b7ff6d9cd",
// 		"name": "accede",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5b70c712-e056-4e18-9792-aefddf41c60b",
// 				"languages": [
// 					{
// 						"name": "to agree; to yield to another's wish or opinion",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Surprisingly, the coach acceded to the players' request to miss practice to go to a party."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7fd63c36-7427-41da-86c2-57dc78784983",
// 		"name": "hootenanny",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "306868fd-424c-44db-9e5b-661f3e408869",
// 				"languages": [
// 					{
// 						"name": "\"we invited friends to a hootenanny in our backyard\"",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"We invited friends to a hootenanny in our backyard"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "7fe5ef2c-aeee-43ad-b8d2-b08b8e2de159",
// 		"name": "unbeständig",
// 		"contexts": [],
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"definitions": [
// 			{
// 				"id": "5f8f471c-b1c4-48a4-9951-076920e8eede",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "mercurial",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "instabil, nicht gleichbleibend",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "değişken, dakikası dakikasına uymayan",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Ein unbeständiger Charakter ist jemand, dessen Absichten und Meinungen häufig wechseln.",
// 					"Das Wetter kann unbeständig sein, was bedeutet, dass es sich immer wieder ändert und nicht stabil bleibt"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8016cbe8-bd77-47ec-b920-49299edb3199",
// 		"name": "mutable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "fd027604-7d11-4cb2-b5d1-cc5321931bc6",
// 				"languages": [
// 					{
// 						"name": "able to change",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The decisions of the uncertain thinker tend to be very mutable."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8034244f-4780-4d78-81c9-9cb8b00d9878",
// 		"name": "renovate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f7741aec-dc32-4e74-8dcb-2adbfa3e9621",
// 				"languages": [
// 					{
// 						"name": "restore, return to original state",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The guest house was renovated so his mother could use it during her stay."
// 				]
// 			},
// 			{
// 				"id": "581d7c7e-a316-4198-aef8-f3a3c15790ab",
// 				"languages": [
// 					{
// 						"name": "to enlarge and beautify",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"After she renovated the library, she was able the store more books, and even host formal gatherings."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "80972efa-413f-4002-8b49-3e656f245069",
// 		"name": "emancipate",
// 		"contexts": [],
// 		"dictionary": null,
// 		"pronunciation": "/ɪˈmansɪpeɪt/",
// 		"definitions": [
// 			{
// 				"id": "4eac8c33-411f-4019-9a41-4b74149570ef",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "liberate",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "befreien",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "azat etmek",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The people were emancipated from the shackles of oppression."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "80b90ee6-2392-4515-849a-be6a8d8a0434",
// 		"name": "resolve",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0dac6aef-b49f-49fa-9916-5e72a5e551c2",
// 				"languages": [
// 					{
// 						"name": "to find a solution",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"A mediator was called in to resolve the conflict that had lasted for months."
// 				]
// 			},
// 			{
// 				"id": "0791eb6d-2642-447a-8a85-5ddf04d1c9ab",
// 				"languages": [
// 					{
// 						"name": "to firmly decide",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"My friend's sickness tested my resolve to never surrender to impatience and disloyalty."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "80d76d01-8f07-4a6f-8de0-102d6e467f31",
// 		"name": "camaraderie",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bb5d4122-e394-4aec-a901-eb13552c5a5a",
// 				"languages": [
// 					{
// 						"name": "brotherhood, partnership, jovial unity",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Camaraderie among teammates is usually a result of joint suffering and survival."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "80f15f17-01bc-43eb-b911-0ae114f5f41d",
// 		"name": "pathology",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "88f9c7c3-b441-4c46-aed7-3df44927d067",
// 				"languages": [
// 					{
// 						"name": "a deviation from the normal; study of disease",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The pathology report made it clear that the tumor had definitely stopped growing, and was perhaps even shrinking."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "81163526-7ebb-49ec-b520-6e3b8d59b1ff",
// 		"name": "incubus",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d3816307-ebef-427f-9590-be80da35da94",
// 				"languages": [
// 					{
// 						"name": "a male demon who is supposed to have sexual intercourse with sleeping women; a demon of fiend; a nightmare",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Perhaps it is this incubus of interruption that drives so many men to working late at night."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "812c8f33-142b-4f09-901d-530d7320f3db",
// 		"name": "pliable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "65cb4561-c922-4240-a8b4-ce5bcde9920d",
// 				"languages": [
// 					{
// 						"name": "flexible",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The reeds of certain plants are so pliable they can be used to make very strong ropes."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "814a5bcf-7787-4083-a005-4b97b561cae3",
// 		"name": "ontogeny",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "329ac809-102c-4109-b5c1-03278d1c7ac5",
// 				"languages": [
// 					{
// 						"name": "the development of an organism from conception to adulthood",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"The ontogeny of an individual is not considered evolution; individual organisms do not evolve.\" - Douglas Futuyma"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "816f3822-509a-4e88-a5f0-627ccbb7608c",
// 		"name": "ascertain",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d766f3d8-e7a8-4c62-b5da-dce13e368df9",
// 				"languages": [
// 					{
// 						"name": "to perceive, to receive, to learn",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Thinking he could ascertain the codes to the alarm, the thief slipped silently into the bank president's office."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8194f50f-5cd9-47a7-ab0e-ccbb44d0879e",
// 		"name": "sovereign",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b760f14e-3380-4ce1-bc71-e6f7c269f447",
// 				"languages": [
// 					{
// 						"name": "having absolute authority in a certain realm",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Caesar of Rome was an absolute sovereign, ordering men to their deaths as he saw fit."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "823dcf5f-6ba3-4e18-b406-f2d1eb63c81c",
// 		"name": "ostentatious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d93079f8-1b52-409a-8c24-6ad94f9eb8fb",
// 				"languages": [
// 					{
// 						"name": "excessively showy, glitzy",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Most of the out of town guests thought the hostess's flamboyant way was too ostentatious."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "825b6cbd-bf55-4528-9b82-7580c99c191e",
// 		"name": "disdain",
// 		"dictionary": null,
// 		"pronunciation": "/dɪsˈdeɪn/",
// 		"contexts": [
// 			"Harrison Ford: \"You know I've always treated these questions with the utmost respect, and somehow, at the same time with complete disdain. I will not answer it, that stupid question. But thank you, I'm delighted to have the opportunity.\""
// 		],
// 		"definitions": [
// 			{
// 				"id": "eb8259d8-b435-4e93-ad49-b8e62c6b674d",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "consider to be unworthy of consideration",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "küçümsemek",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "verachten",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"Intolerant people tend to disdain all those who disagree with them."
// 				]
// 			},
// 			{
// 				"id": "1100bdb4-66a3-4217-989f-e960cb1438c0",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "contempt, scorn, low esteem",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "tepeden bakma; küçümseme",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "Verachtung",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"I hold all irresponsible abuses of powers in great disdain.",
// 					"Her upper lip curled in disdain."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "826d7968-78a4-4a5b-8083-a3f494352680",
// 		"name": "eminent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3d77d56a-fa8e-4038-bd0f-4b64762496b6",
// 				"languages": [
// 					{
// 						"name": "distinguished, prominent, famous",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The eminent scientist made an earth-shattering announcement at the conference."
// 				]
// 			},
// 			{
// 				"id": "203d41d1-7b27-4868-a650-ded41c564885",
// 				"languages": [
// 					{
// 						"name": "conspicuous",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The malformations of Jeff's face stood out eminently when the sunlight struck at an angle."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "82abc21d-b863-481f-a91c-398497933547",
// 		"name": "integral",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b7a591c2-937b-4370-a759-4c93c6a26975",
// 				"languages": [
// 					{
// 						"name": "necessary for completeness",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The messengers played an integral role in the success of the negotiations."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "82cf750e-3fbc-4464-9cc2-4b452d0ffe94",
// 		"name": "umbrage",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ddfbe873-5792-4e2c-858e-b7112173fa68",
// 				"languages": [
// 					{
// 						"name": "resentment, offense",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Uncontrolled opinion offering can and will result in umbrage being taken at some point."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "82f3e8a8-9ec8-4708-a6bd-635b9beadf30",
// 		"name": "debunk",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "91cda8d6-7dec-4713-83c6-8a80209785d5",
// 				"languages": [
// 					{
// 						"name": "to expose the falseness of something",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"To debunk the theory of evolution, some creationists point to the Law of Biogenesis."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "82ffefe6-8dde-4a22-ad55-4329fffc0723",
// 		"name": "felicitous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "84b70e3f-d97c-4e28-b112-45d5d8f04419",
// 				"languages": [
// 					{
// 						"name": "well suited, apt",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"His dark blue suit was very felicitous, complementing the attire of his lovely wife perfectly."
// 				]
// 			},
// 			{
// 				"id": "171cc3cc-7fc6-4970-8631-4717fa8dfce6",
// 				"languages": [
// 					{
// 						"name": "delightful, pleasing",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"A warm greeting from a long-time friend is always felicitous and welcome."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8317de66-9657-41e7-8c79-35f8bf4fa0d9",
// 		"name": "coup",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3dfb3687-17a4-46cb-9deb-af6321360314",
// 				"languages": [
// 					{
// 						"name": "a brilliant, unexpected act",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Carlos, our local chess master, performed a coup that trapped his opponent's king in twelve moves."
// 				]
// 			},
// 			{
// 				"id": "c9ad672f-cca3-45aa-a394-f34111464810",
// 				"languages": [
// 					{
// 						"name": "the overthrow of a government and assumption of authority",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The rebel's coup was entirely successful; the dictator is out of power this very night."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "83a091f0-9114-4177-9c84-ddffcda18b0b",
// 		"name": "immure",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e563201b-6061-47ca-8761-01fff40c311e",
// 				"languages": [
// 					{
// 						"name": "to enclose within walls; to entomb in a wall",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The Eastern monarch may immure himself in his harem, casting the burdens of state upon the shoulders of a grand vizier."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "83ce4de9-9f34-4950-8792-9712be1137cb",
// 		"name": "solicitous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "94910953-5a03-467e-b43b-71355ce2e66d",
// 				"languages": [
// 					{
// 						"name": "concerned, attentive",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The ailing patient really needed the solicitous attention he got from all the nurses on duty."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "84a20c3b-ce94-42d2-829f-cb2b144b94fe",
// 		"name": "enfranchise",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "00a981c2-16bc-4ae6-a600-4e13955730a4",
// 				"languages": [
// 					{
// 						"name": "to grant the vote to",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The Fifth Amendment enfranchised those who would rather not admit their guilt in a court of law."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "84f9fc6f-b733-432b-aae4-16815f09f099",
// 		"name": "assiduous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b5667120-b8bc-4358-a49a-9c3d39558ff0",
// 				"languages": [
// 					{
// 						"name": "hard-working, diligent",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The senior students labored assiduously to finish their projects before the deadline."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8510a096-88c2-4e4a-b2c2-5334ce35464d",
// 		"name": "proclivity",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ded1469a-c12f-4879-bac5-8bf9cbef10fa",
// 				"languages": [
// 					{
// 						"name": "a strong inclination toward something",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Because of human proclivity, there will always be crime and guile in the world."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "851ade41-554e-4b88-b8c6-ec435e58d10f",
// 		"name": "pusillanimous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7a6dc386-cd1b-4815-917a-167b7a674761",
// 				"languages": [
// 					{
// 						"name": "cowardly",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"But on this issue of Haredi service his pusillanimous silence has been disappointing and self-defeating."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "85cdbe85-9600-4a0b-bf01-34081416bad5",
// 		"name": "dissemble",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4a6a0bfe-55b8-46fe-82bc-6140fde15210",
// 				"languages": [
// 					{
// 						"name": "to conceal, fake",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The lying witness tried to dissemble the facts; however, the clever attorney trapped him easily."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "85e4f45b-270a-48ba-b684-e2e65e01628c",
// 		"name": "oration",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9c150dd6-994d-4943-b352-ac92c2de1dde",
// 				"languages": [
// 					{
// 						"name": "a speech delivered in a formal or ceremonious manner",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The speaker's oration was well paced and loquaciously delivered."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "86791f14-4720-42b8-ac7b-42e1786ca3be",
// 		"name": "ostracism",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "eb8436c2-7d19-427d-8e2a-7711944c4729",
// 				"languages": [
// 					{
// 						"name": "exclusion from a group",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"After Brad's ostracism from his club, he simply wandered around regretting his egregious actions."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "867b94dc-f6fd-465e-b66f-b7323ac5c95c",
// 		"name": "altercation",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c1989f71-1a0f-4d52-9358-44adac6d86cb",
// 				"languages": [
// 					{
// 						"name": "a dispute, fight",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Jack and Jill blamed everybody but themselves for the altercation they had on the hill."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "86956b5d-d438-4e24-9ac5-60d5ffe615d7",
// 		"name": "contentious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "012ecd6d-5066-491b-a58f-41bb65687d0a",
// 				"languages": [
// 					{
// 						"name": "having a tendency to quarrel or dispute",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Greg's contentious personality made him prone to get into fights with anyone and everyone."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "874372d2-f868-4aad-b51b-bf28f22cbfc6",
// 		"name": "transient",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f6f10204-dfeb-4855-8e6a-4b5202d4d84a",
// 				"languages": [
// 					{
// 						"name": "passing through briefly; moving in and out of existence",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The spirit of youth doesn't have to pass like youth itself; for, the spirit is not transient."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "878edebe-53eb-48ae-985f-f9df7c9df2e0",
// 		"name": "perfunctory",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "23b1cc60-1143-42b4-90e3-ecc3fec6f897",
// 				"languages": [
// 					{
// 						"name": "showing little interest or enthusiasm",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The newsman delivered the bad news in such a perfunctory manner, it seemed as though it was just another run of the mill event."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "87a4ddf4-2858-4a43-88e9-03d523628283",
// 		"name": "antecedent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8f0b33cd-c1db-4e79-8ffb-ffcc4b69a5d0",
// 				"languages": [
// 					{
// 						"name": "something that came before",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Many of the great traditions of Western culture had their antecedent birth in the culture of Ancient Greece."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "87cfd528-79e8-4e14-a0ef-201b6e7bb5a6",
// 		"name": "delineate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9fc851b2-da36-4496-92d2-161a87e20238",
// 				"languages": [
// 					{
// 						"name": "to describe, outline, shed light on",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Shaunt'e clearly delineated her position on the matter, almost convincing her opponent."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "87e6c7ce-0ae4-48ec-9e79-948e38e2104a",
// 		"name": "mollify",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1745852d-9904-4a9a-9379-11fb1071839c",
// 				"languages": [
// 					{
// 						"name": "to soften in temper",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Hank's apology certainly went a long way in mollifying Alfred's hostility."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8829df2b-3053-4975-8b6a-ecd016cfc95b",
// 		"name": "clairvoyant",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "fa9f3320-60c4-4dfa-920f-0348a939f844",
// 				"languages": [
// 					{
// 						"name": "able to perceive things that normal people cannot",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"My mother's incredible ability to see my true intentions was nothing short of clairvoyant."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "889a6cfe-45cc-4bbd-9055-ebcf742d93f5",
// 		"name": "lithe",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b1178ef8-0f6d-4f6c-b4be-195474cc66c5",
// 				"languages": [
// 					{
// 						"name": "graceful, flexible, supple",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The ballet dancers' lithe movements were akin to watching swans glide over the lake."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8916428b-350c-4310-be48-25b938b321ba",
// 		"name": "demagogue",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f0430651-1774-4223-b1fa-3b4c9a74693c",
// 				"languages": [
// 					{
// 						"name": "a leader who appeals to a people's prejudices",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The demagogue addressed the people with many tales of gloom and doom."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "897eae61-9b80-4f44-a711-75406b330726",
// 		"name": "audacity",
// 		"contexts": [
// 			"\"Audacity\" often has a dual connotation, either being admired for bravery and innovation or criticized for overstepping boundaries.\n\nPositive Connotation: \"Her audacity in taking the initiative to start her own business at a young age inspired many aspiring entrepreneurs.\"\n\nNegative Connotation: \"He had the audacity to interrupt the meeting and criticize his boss in front of everyone.\""
// 		],
// 		"dictionary": null,
// 		"pronunciation": "/ɔːˈdasɪti/",
// 		"definitions": [
// 			{
// 				"id": "ef003b23-c3b5-44b0-b71b-d3007fa89511",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "a willingness to take bold risks; rude or disrespectful behaviour; impudence",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Kühnheit, Dreistigkeit",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "Cüret, Cesaret",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"He had the audacity to challenge the professor's theory in front of the entire class.",
// 					"Her audacity in proposing such an innovative solution earned her both admiration and criticism.",
// 					"Positive Connotation: \"The audacity of the artist's vision led to a groundbreaking new art movement.\"\nNegative Connotation: \"It was sheer audacity for him to break the rules and expect no consequences.\"",
// 					"Positive Connotation: \"Their audacity to challenge the status quo brought about significant social change.\"\nNegative Connotation: \"She had the audacity to ask for a promotion despite her poor performance.\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8a0bfd6d-afee-4dbc-a733-2236d528fe3a",
// 		"name": "aspersion",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e2a5aa06-4018-4645-9a13-2d068ae2f3f3",
// 				"languages": [
// 					{
// 						"name": "a curse, expression of ill-will",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The rival teams constantly cast aspersions on each others' athletic prowess."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8a3727d7-126d-496f-82d9-5f75a3ac1277",
// 		"name": "sedentary",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8d6af555-391b-4a15-bf48-9bf208ae8db3",
// 				"languages": [
// 					{
// 						"name": "sitting, settled",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The sedentary job that I took three months ago has caused me to gain fifteen pounds."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8a715b32-ddc7-40dd-a0d1-d745049dfd5b",
// 		"name": "decry",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "acfd0cb6-1c70-4bc1-bc4c-2f88d877a3d6",
// 				"languages": [
// 					{
// 						"name": "to criticize openly in an effort to devalue",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"In his attempt to decry the value of the portrait, the investor pointed to its fringes."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8aa267b7-b790-4620-8563-9e8b992df01b",
// 		"name": "pert",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4c141431-85f5-4ec3-8849-2f94091f00e3",
// 				"languages": [
// 					{
// 						"name": "flippant, bold",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"I thought Betty's manner was a bit too pert, as she responded to her mother's questions."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8aa57fd4-e63c-4442-85c3-d68a3d6c81db",
// 		"name": "vicissitude",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2ac4c0d6-ede1-4c84-a859-7c24eb3e4f0a",
// 				"languages": [
// 					{
// 						"name": "event that occurs by chance and brings heart-ship or pain",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The vicissitude of the hike began to afflict him, especially when the trail wound uphill."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8ab51bd7-1acb-4c70-ba91-73b943ed2972",
// 		"name": "ennui",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "418cad21-cfd2-4fb0-b45a-114505c76d5c",
// 				"languages": [
// 					{
// 						"name": "boredom, weariness",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"I felt such ennui that I colored my bedroom brown and threw all of my flowers out of the window."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8ac22d40-d105-4b1a-ba84-f5642f202bd7",
// 		"name": "recalcitrant",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "83bf417f-4e74-4309-8af6-47ff4dcfc7e4",
// 				"languages": [
// 					{
// 						"name": "defiant, unapologetic",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The drunk driver was recalcitrant and rude to the officers; thus, he got to spend ninety days in the county stockade."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8ad3b727-e84c-4812-b67c-6b400fd6dc21",
// 		"name": "tractable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6b27342e-64bb-409a-8457-95e8ef5fb9e2",
// 				"languages": [
// 					{
// 						"name": "easily controlled",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Small children are extremely tractable when the proper motivation is used."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8b0b5cc4-0c33-49ca-bce5-c8a0b394f3e8",
// 		"name": "penchant",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "62743dc9-aafd-4a57-9193-cf75fa21ef2c",
// 				"languages": [
// 					{
// 						"name": "a tendency, partiality, preference",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Jeff's penchant for the dramatic had a perfect forum during the impending storm surge."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8b16521a-24c7-42e5-bf22-4c26f15159ae",
// 		"name": "saccharine",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "09f609f5-ad37-4bcf-85b2-1e412b7167b1",
// 				"languages": [
// 					{
// 						"name": "sickeningly sweet",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The saccharine manner of kiss-ups is enough to make anyone want to barf."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8b4b1e30-173a-40f6-bc64-429749547981",
// 		"name": "insurgent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e046b93f-4f20-4210-a2f0-96e4b3091cdc",
// 				"languages": [
// 					{
// 						"name": "one who rebels",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"An insurgent force made its way toward the capital, with ill intentions."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8b587dc9-9240-486b-8e41-110503c792e6",
// 		"name": "plausible",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a925f080-b17e-411b-abc1-99a498b68a51",
// 				"languages": [
// 					{
// 						"name": "believable, reasonable",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The detective's theory didn't seem plausible at first; but, after some musing, it was seen as the only thing that could possibly be right."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8ba4aaf4-a997-4e55-b7e1-9367ac30e525",
// 		"name": "augment",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6a91f340-1567-49a6-8761-aee7894630b0",
// 				"languages": [
// 					{
// 						"name": "to add to, expand",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"To augment his root word vocabulary, Kevin bought a Greek and Latin compendium of basic root meanings."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8ba5dccd-b1cc-44f0-a292-92bfa998f4a5",
// 		"name": "confound",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6700ef80-1eea-4ecc-9544-5cea6787c6f7",
// 				"languages": [
// 					{
// 						"name": "to frustrate, confuse",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Jack the Ripper confounded the police with his here-today, gone-today antics."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8bbaae7a-be11-4a25-9e29-83f66bc71037",
// 		"name": "serendipity",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2fcf8cbd-5d68-471a-898d-17f607675fec",
// 				"languages": [
// 					{
// 						"name": "luck, finding good things without looking for them",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Saturday was truly the day of serendipity; for, I found a large diamond ring-3 in the sand at the beach and a twenty dollar billon my way home."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8bc89211-b33a-48ec-8b7e-318af5828c60",
// 		"name": "metonymy",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bc4d363a-e6fa-4b67-9b26-363d2208531d",
// 				"languages": [
// 					{
// 						"name": "a figure of speech in which a word is substituted for a related word with which it is associated",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The principal varieties of the trope are the metonymy and the metaphor."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8bd7b623-03e0-4541-ae98-7bb4389df345",
// 		"name": "carp",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3449a494-b22b-45a1-b1e9-7ec388a1cbb9",
// 				"languages": [
// 					{
// 						"name": "to annoy, pester",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The man finally chastised his daughter after enduring her carping for hours."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8bdaa4df-505a-4c78-84e4-0047333168c5",
// 		"name": "stygian",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e901b1c9-f29a-4b8c-8a37-0b689f369ce8",
// 				"languages": [
// 					{
// 						"name": "gloomy, dark, hellish; unbreakable",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"They snapped off their torches and crouched in stygian darkness."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8bf277f4-1a97-4ede-9d2c-4ba066ac57d7",
// 		"name": "eclectic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ec291b91-a4ce-4f9e-8f7d-dd1e812829da",
// 				"languages": [
// 					{
// 						"name": "consisting of a diverse variety of elements",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The freshmen this year are so eclectic that they constantly find fascination with every new subject, and consequently change their majors to match."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8bfff514-a502-4fd7-b47e-bef66ac65bdc",
// 		"name": "penurious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a862c4ba-0f3b-41d9-86f4-302af501c2e5",
// 				"languages": [
// 					{
// 						"name": "miserly, stingy",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Estelle's penurious habits caused her and her children to walk around in worn and tattered clothes."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8c7aa56b-4d38-43d5-ba2c-38c9732760b0",
// 		"name": "impinge",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0c64e48c-c87c-4362-b2d0-6e5a4638bc76",
// 				"languages": [
// 					{
// 						"name": "to impact, affect, make an impression",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Harold's act of heroism truly impinged all who witnessed it, exhorting them to do likewise."
// 				]
// 			},
// 			{
// 				"id": "f3ac6638-7a5f-4358-809f-dca836da5d82",
// 				"languages": [
// 					{
// 						"name": "to encroach, infringe",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Pauline's need for space started to impinge on the space that clearly belonged to her co-workers."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8d86ff30-d1d0-40d4-9e65-5969ae9ed1fb",
// 		"name": "rectitude",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9b54ca00-48bb-41a4-8648-ec868597b8d6",
// 				"languages": [
// 					{
// 						"name": "uprightness, extreme morality",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"A high degree of rectitude should be a requisite for anyone serving in a public office."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8dcecdd4-ec14-41e6-bbfd-da4030690334",
// 		"name": "salve",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "635ae255-75b9-451b-8754-afbc1c238e1a",
// 				"languages": [
// 					{
// 						"name": "a soothing balm",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"As the nurse rubbed the salve in to the wound, the burning stopped immediately."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8df82858-4d18-4ddb-a8a7-487a14dfea4c",
// 		"name": "laudatory",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "cb802e09-7458-493b-b290-0688d1e99ed1",
// 				"languages": [
// 					{
// 						"name": "expressing admiration or praise",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Acts of kindness should be met with much more laudatory recognition than they are."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8e118e77-2130-4027-b5d9-16fe0a78d0d0",
// 		"name": "enmity",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "cc06ba92-f847-47e3-89c1-4aa39f76aa51",
// 				"languages": [
// 					{
// 						"name": "ill will, hatred, hostility",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The opposing parties felt such enmity for one another, they could not bear so much the mentioning of the other's name."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8e4ec45d-aefb-4686-8c04-b467be109341",
// 		"name": "fortuitous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "53ea8d76-d1e8-4f93-b3d1-286eb84dc49a",
// 				"languages": [
// 					{
// 						"name": "happening by chance, often lucky or fortunate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Finding my lost coin was truly a fortuitous event, rivaling finding that lotto ticket."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8eda600f-8b66-4be8-961d-11bc761c9e6a",
// 		"name": "reputable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "70f4ad91-f2bc-428a-8c4d-57d0696c40c5",
// 				"languages": [
// 					{
// 						"name": "of good reputation",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Only reputable individuals are considered for the jury pool."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8f3cdd8f-6974-429f-a1c7-611cde46e66f",
// 		"name": "gluttony",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "cc747b0d-14c2-4960-9dc6-24653f5cd379",
// 				"languages": [
// 					{
// 						"name": "overindulgence in food or drink",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Because of Michael's gluttony, he ended up overeating again, then throwing up all he'd eaten."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8fde23ee-8361-4eb5-9068-51b7f2248545",
// 		"name": "taciturn",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7bf2197a-1bd7-4f3a-8b69-dfd79c49983e",
// 				"languages": [
// 					{
// 						"name": "not inclined to talk; peevish",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The taciturn youngster just sat, gazing into nothingness, obviously disturbed by something."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8ff0471b-7db8-442b-a8ae-6aa26a498607",
// 		"name": "noisome",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f729957f-a7f3-4df5-9032-d7606e1d6626",
// 				"languages": [
// 					{
// 						"name": "unpleasant, offensive, especially to the sense of smell",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The noisome stench of the carcass permeated the whole building, driving the employees to the parking lot."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "8ff09e94-d84d-460e-8f4a-66c71374651f",
// 		"name": "gourmand",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bc2309f9-ebc4-496e-b767-912d695c2c6c",
// 				"languages": [
// 					{
// 						"name": "someone fond of eating and drinking",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"With my diet of chips, cookies, and fries, you'd never confuse me with a real gourmand."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "90617bc3-8bc9-4856-9abd-d9658d4f63ef",
// 		"name": "ominous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a0807f0f-0404-4055-8723-238f2f0e8208",
// 				"languages": [
// 					{
// 						"name": "foreboding or foreshadowing evil; threatening",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The rolling of thunder was an ominous sound, frightening children and adults alike."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "91139bef-302d-4490-b124-a976fe18bd66",
// 		"name": "hermeneutics",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "fdd238e9-9c87-4f4c-831b-0d323d50f424",
// 				"languages": [
// 					{
// 						"name": "the science of interpreting literature, especially religious texts",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The history of hermeneutics in all times shows that there is but one step from the literal to the allegorical."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "914146c2-658a-49d1-b7f1-860b45e70a40",
// 		"name": "defile",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4611e7bf-7a76-4341-ae15-601c0122f33d",
// 				"languages": [
// 					{
// 						"name": "to make unclean, impure",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"She defiled herself when she accepted a dare to undress in a public square."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "91ac4be0-227b-4dd6-8a04-c36e7a1c941f",
// 		"name": "vocation",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "23700426-a1ce-4355-b904-21ad9ba97fed",
// 				"languages": [
// 					{
// 						"name": "the work in which someone is employed, profession",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The vocation in life is teaching school; but, my passion is catching fish."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "91b1c417-d721-43d0-90f8-d65dcc3d6087",
// 		"name": "circumspect",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "53187915-678f-4c2c-bfbf-478caa2dd7e0",
// 				"languages": [
// 					{
// 						"name": "cautious; aware of what's around you",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Circumspect people always look at situations from all directions."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "91e8d85e-4a77-4d48-92f5-31fe82cb8b4d",
// 		"name": "concede",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "44aae13c-402f-492f-b914-b316e25c2827",
// 				"languages": [
// 					{
// 						"name": "to accept as valid",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Benjamin had to ultimately concede that the new rules were indeed necessary."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "925402d4-bf9a-4940-829b-4f7f1469969a",
// 		"name": "patent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "49d52f48-cd35-4d34-8459-25f4e8008c6a",
// 				"languages": [
// 					{
// 						"name": "readily seen or understood, clear",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"When Janette didn't even know the combination to her husband's safe, it became patently clear what the problem really was."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "92a53559-1a2c-4092-a19f-c5e9f1c33639",
// 		"name": "analogous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f094834e-6b69-41ca-b4f1-dc9b75d48035",
// 				"languages": [
// 					{
// 						"name": "similar to, so that an analogy can be drawn",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Though they are not the same shape, the structure of a rectangle is analogous angle-wise to that of a square."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "92b0f2ba-bed5-4444-9506-c30b65c22f09",
// 		"name": "indigenous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f38d09e8-7329-4b10-b2cf-64bcd40f8202",
// 				"languages": [
// 					{
// 						"name": "originating in a region",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"When invasive species come in to any area, the indigenous life forms will be threatened."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "92b93663-6c79-415b-8c77-198f4f151787",
// 		"name": "aisle",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ced199e3-ac67-4846-b909-792e044809bd",
// 				"languages": [
// 					{
// 						"name": "a passageway between rows of seats",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Once the bride got inside the auditorium, she moon-walked down the aisle to the beat of Billie Jean."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "92fb94ff-dea7-4669-b4ed-5a5046044fa4",
// 		"name": "confection",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1a852a7d-d03e-4d43-9ed3-82e2a710386c",
// 				"languages": [
// 					{
// 						"name": "a sweet, fancy food",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"Confections are my downfall,\" complained the struggling dieter."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9332a69e-56fc-4a55-af07-5b24b9187528",
// 		"name": "scintillating",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9553c98f-17c3-431e-b64d-0ca537c0c0fe",
// 				"languages": [
// 					{
// 						"name": "sparkling",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The country singer's scintillating rhinestone costume blinded everybody in the front row."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "93c6cf82-9040-472d-b8a8-d6bcf4992093",
// 		"name": "tenuous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "43d77207-dae3-4ca3-9776-94a4f9ed12c8",
// 				"languages": [
// 					{
// 						"name": "having little substance or strength",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"My employment is tenuous at best; being late is something I better avoid at all costs."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "93e7d908-20c9-4012-9db3-10238f81664d",
// 		"name": "resilient",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ab147bdc-120b-45b3-b00c-0c0cfa9c5768",
// 				"languages": [
// 					{
// 						"name": "able to recover from misfortune; able to withstand adversity",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The resilient young player healed quickly and returned to his team in no time."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "93ee4baf-2b1d-483b-9305-af3531ee060e",
// 		"name": "ecumenical",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a22daeff-f287-4d30-80dc-04a379c384dc",
// 				"languages": [
// 					{
// 						"name": "universal, of worldwide scope; related to the worldwide Catholic church",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"It is hard to celebrate the past in an ecumenical way, or even in a fair-minded one, apparently."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "941cc703-d432-4174-870b-eff140e89f3f",
// 		"name": "devious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a71ec6e9-f41d-4b61-8dd3-66d4801b250e",
// 				"languages": [
// 					{
// 						"name": "not straightforward, deceitful",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Wanting to avoid punishment, the devious teen blamed the broken cup on his sister."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "944d8473-0d9c-4c53-8971-ac663a9d71dc",
// 		"name": "annul",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3ce845c5-5412-498b-9768-eb96cedb31a3",
// 				"languages": [
// 					{
// 						"name": "to make void or invalid",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Annulling a bad law becomes an easy chore once the majority of the population recognizes it as hurtful to the innocent."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9460e72d-47ed-47aa-aad7-c8d72fba7845",
// 		"name": "attain",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e4928925-085f-4e9b-b3fd-4f12cf72bb49",
// 				"languages": [
// 					{
// 						"name": "to achieve, arrive at",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The runners work fifty hours a week to attain their competitive asInt of fitness."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "946fc374-c71e-4b49-8c40-e4ce7427d268",
// 		"name": "precipice",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1da7fbd8-2bbf-4ba3-9cfb-de7f60f7acc0",
// 				"languages": [
// 					{
// 						"name": "the face of a cliff, a steep or overhanging place",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Looking down from the icy precipice, the alpha wolf chose its prey."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9470dd93-c93f-445b-9ad0-c9106e14fb8d",
// 		"name": "tantamount",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8ac1c376-c95a-4671-9a56-c7cc96057c61",
// 				"languages": [
// 					{
// 						"name": "equivalent in value or significance",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Leaving work without permission is tantamount to quitting; for, you can never return."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "94ca24ae-e1d4-43a4-87cc-53b63a98138e",
// 		"name": "antipathy",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "cbe33e88-e005-4435-bd25-2f12198fc692",
// 				"languages": [
// 					{
// 						"name": "a strong dislike, repugnance",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"My antipathy grows for Helen each time I remember her terrible, mean-spirited words to me."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "94cbf926-e43a-4baf-a1c2-3a30c8939aad",
// 		"name": "destitute",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "53aee96e-ce11-4721-813f-d29604383d91",
// 				"languages": [
// 					{
// 						"name": "impoverished, utterly lacking",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The tornadoes destroyed many homes and left every family destitute and poor."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "952bf7dc-de86-42f7-9b93-d2251d06991f",
// 		"name": "bombilation",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4231d644-8179-4d42-9f9b-749fae41f0c4",
// 				"languages": [
// 					{
// 						"name": "a buzzing, a humming sound",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"The entire building was bombilating like a cicada.\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "95528440-2ce8-424d-a4b8-be00d0fbb1b6",
// 		"name": "constituent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7a8e2a35-c5a8-4b27-a312-308ff64c218a",
// 				"languages": [
// 					{
// 						"name": "an essential part",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The most important constituents of her homemade brew was collard juice and green onions."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "95571f4c-33d1-4b73-87fb-5400939359a9",
// 		"name": "apprehend",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "64611e4d-a4bf-4dab-9cc7-16b49b72fc3b",
// 				"languages": [
// 					{
// 						"name": "to seize, arrest",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The criminal was apprehended trying to flee from the scene of the crime."
// 				]
// 			},
// 			{
// 				"id": "70713d91-d64e-43d2-be23-00a9ad134fdb",
// 				"languages": [
// 					{
// 						"name": "to perceive, understand, grasp",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Apprehending philosophical concepts is the domain of those in pursuit of truth."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "95a10070-900e-4570-846d-05b5c9672daa",
// 		"name": "aggrieved",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f5d4aadd-4c2d-49e4-9d29-1354dd7cd76b",
// 				"languages": [
// 					{
// 						"name": "distressed, wronged, injured",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The self-important, officious foreman overworked his aggrieved employees as soon as his promotion was final."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "95b6a9a1-18d6-4853-b30a-fbcf247db783",
// 		"name": "jubilant",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "451e88be-98f4-4f08-91fd-361b03220ec1",
// 				"languages": [
// 					{
// 						"name": "extremely joyful, happy",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"At her wedding, the bride just burst into jubilant song at the thought of actually having her perfect husband."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "95cde7c0-5694-41e5-aa4a-1ec80c5419d2",
// 		"name": "abet",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6221d5c4-5155-429b-be90-1047b3022f0c",
// 				"languages": [
// 					{
// 						"name": "to aid, assist, encourage",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The spy escaped only because he had a secret friend on the inside to aid and abet his efforts."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "961d92d7-9da1-4a21-b3a2-bf034bf2e892",
// 		"name": "formidable",
// 		"contexts": [
// 			"Cooper: How about Mann?\n\nBrand: Dr. Mann? He's remarkable. He's the best of us. \nHe inspired 11 people to follow him on the loneliest journey in human history.\nScientists, explorers.\nThat's what I love. You know, out there we face great odds.\nDeath, but... ...not evil.\n\nCooper: You don't think nature can be evil?\n\nBrand: No. Formidable. Frightening. But... ...no, not evil.\n\nCooper: Hm.\n\nBrand: Is a lion evil because it rips a gazelle to shreds?"
// 		],
// 		"dictionary": null,
// 		"pronunciation": "/ˈfɔːmɪdəbl,fəˈmɪdəbl,fɔːˈmɪdəbl/",
// 		"definitions": [
// 			{
// 				"id": "9a18adf0-7a7c-4e5f-a60e-c758789f318c",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "frightening; powerful",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "gewaltig; furchterregend, bedrohlich",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "dişli, korkunç, tüyler ürpertici",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"a formidable opponent"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "966333df-ba77-40f0-9c32-f747ed6560fd",
// 		"name": "linchpin",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0ba87728-9583-4d05-b8d3-1d37bc1211fa",
// 				"languages": [
// 					{
// 						"name": "something that holds separate parts together",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The linchpin in the defense strategy was the absence of any physical evidence."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9687a5dd-2c36-4151-98a7-4df9c016d0df",
// 		"name": "assuage",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "37245d9f-3ebd-4aa0-b8e6-bc7474919561",
// 				"languages": [
// 					{
// 						"name": "to ease, pacify",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The angry beast would in no wise relent in its attack, for its rage had not been assuaged by the meager offerings."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "96ab2079-a1a4-4067-8639-f52526fabb27",
// 		"name": "unctuous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d59aeb11-861b-4021-b3b6-23862cfa7384",
// 				"languages": [
// 					{
// 						"name": "smooth or greasy in texture, appearance, manner",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The slick politician struck all of the audience members as unctuous and underhanded."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "96c86b62-d854-4206-b212-98903c1a87a1",
// 		"name": "copious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "626d74a2-6bf6-45dc-a922-9d7bd183f88c",
// 				"languages": [
// 					{
// 						"name": "profuse, abundant",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Copious amounts of fresh fruits and vegetables were loaded aboard the transfer trucks bound for Alabama."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "96dc78c4-9c15-4fde-a57e-c130f6993c23",
// 		"name": "ubiquitous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f4a24bf4-9375-4599-a35d-097a702cc4ff",
// 				"languages": [
// 					{
// 						"name": "existing everywhere, widespread",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Going through the fields, the brier bobs seemed ubiquitous, sticking us at every turn."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "96ed88fe-bac2-498b-9211-0b6df56f1e26",
// 		"name": "tranquil",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "91e67cec-87d4-4d14-a8d9-6546f253455f",
// 				"languages": [
// 					{
// 						"name": "calm",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The lazy river scene was especially tranquil; even the currents seemed to take it easy and coast."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "974415df-991f-4282-b808-e102961b5778",
// 		"name": "extol",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a3d60778-3293-4ed9-b974-1e9613ce2b40",
// 				"languages": [
// 					{
// 						"name": "to praise, revere",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Coach Val began to extol the virtues of his players, calling them the finest group of young men he'd ever had the pleasure of coaching."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "97523926-e998-47b1-802e-4bf70c2ee029",
// 		"name": "didactic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "115ef0bc-0649-4352-96e6-66dd1e2e6648",
// 				"languages": [
// 					{
// 						"name": "intended to instruct",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"She became very didactic, once the students revealed their many needs."
// 				]
// 			},
// 			{
// 				"id": "d4d572d8-5ed1-42bb-ba2a-500e8729736b",
// 				"languages": [
// 					{
// 						"name": "overly moralistic",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Few people appreciated didactic stories that preach and don't also entertain."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "97677e4d-c49b-4fab-b50e-c9e4d414dc39",
// 		"name": "equanimity",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1b5294ec-8726-46c4-9351-a98c3300729b",
// 				"languages": [
// 					{
// 						"name": "composure",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Glenn maintained his equanimity, even in the face of terrible accusations against him."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9797c11c-2a9f-4c2e-a20c-1fc0fcddd693",
// 		"name": "feral",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d006b2cf-1cbe-4a08-a597-b4ebb9b380bb",
// 				"languages": [
// 					{
// 						"name": "wild, savage",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The feral hogs in the South Eastern United States are creating major ecological problems."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "97e96dfd-2cc4-47c5-bfb6-b43b394cb352",
// 		"name": "turpitude",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a8462540-b911-4a39-9aab-6b9820451415",
// 				"languages": [
// 					{
// 						"name": "depravity, moral corruption",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"There are certain cities in the world that cater to the turpitude that's rampant in our society."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9822935e-a5eb-4dcb-9561-72068b0693cf",
// 		"name": "mores",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6772f401-9fd9-41b3-a847-8a73e5481647",
// 				"languages": [
// 					{
// 						"name": "the moral attitudes and fixed customs of a group of people.",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Social mores impact the development of a society and the expectations of those who live there in."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "988a1586-83dd-4f47-8a9a-7aab4039573b",
// 		"name": "phlegmatic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "340eeb98-6c70-4ac9-8d54-02f864ef2dc2",
// 				"languages": [
// 					{
// 						"name": "uninterested, unresponsive",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Monica became wholly phlegmatic when she found out their play wasn't going to be televised or even written about in the local paper."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "98d10eda-fc0b-4268-af9d-9d908688b69a",
// 		"name": "officious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1ec235d9-e955-42ec-a44b-e26eae953ff9",
// 				"languages": [
// 					{
// 						"name": "insisting on helping when it's neither wanted nor needed",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The new boss was much too officious, telling everybody how to do the jobs they already knew how to do."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "98f70df2-1b87-44c6-a84a-6f5e6cca2fa2",
// 		"name": "egregious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "65cddd5c-aa2e-4e50-bda7-a45f4645fd19",
// 				"languages": [
// 					{
// 						"name": "extremely bad",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Tammy's behavior was so egregious that she was thrown off the team that very hour."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "99193c0a-67a4-4aa5-9868-acb728c7074e",
// 		"name": "beseech",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "979c4cba-4a88-4e85-b5f9-1ff6ebfaf5cf",
// 				"languages": [
// 					{
// 						"name": "to beg, plead, implore",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The medical community spoke with one voice as it beseeched the country to stop smoking."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "99683bc1-636b-49e6-9f5b-89daaa83e4b8",
// 		"name": "instigate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f15aafb4-f066-47ab-a428-dd6cdbad65ce",
// 				"languages": [
// 					{
// 						"name": "to urge, goad",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Those who instigate fights are just as much to blame as those who actually engage in them."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "99e0bb88-a419-4177-9c11-c08d98346461",
// 		"name": "nominal",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "cb47b0e2-9920-42fc-a14b-df4fa0896334",
// 				"languages": [
// 					{
// 						"name": "trifling, insignificant",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Because there was only a nominal fee involved, Mr. T. Wad paid the cost for everyone."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9a47fff5-91f2-4f0c-980a-9932185571cf",
// 		"name": "knell",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5d681c0e-fabc-49a8-9a3b-125f1427b4e6",
// 				"languages": [
// 					{
// 						"name": "the solemn sound of a bell, often indicating a death",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Hearing the solemn knell of the bell told everyone that Mrs. Jennie May had been finally laid to rest."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9ab4d4e0-3053-42fa-99b0-031546b126e2",
// 		"name": "ambiguous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7d4eedbe-e1f3-4ada-8687-abeceee127a9",
// 				"languages": [
// 					{
// 						"name": "uncertain, variably interpretable",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Dr. Jones' answer to the question was much too ambiguous to satisfy his critics."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9b248596-c265-426c-83d3-4bda6e49830b",
// 		"name": "meager",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "30d38544-a1f8-4bfb-ac47-f7bb46cadb07",
// 				"languages": [
// 					{
// 						"name": "deficient in size or quality",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The meager portion of food did not satisfy Harold's enormous appetite."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9b413db8-4ac2-4edf-952e-ad1f04d97858",
// 		"name": "admonish",
// 		"dictionary": null,
// 		"pronunciation": "/ədˈmɒnɪʃ/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "cfd88ff6-c62e-4b66-94b4-e85e6200e550",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "warn or reprimand someone firmly",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "ermahnen",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "tembih etmek, azarlamak",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Joe's mother admonished him not to ruin his appetite by eating dessert before dinner."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9b45641e-ad51-4d35-b2e3-62279c1b9722",
// 		"name": "dither",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0e9549d3-fe4b-4c97-86e8-d956d3a982f5",
// 				"languages": [
// 					{
// 						"name": "to be indecisive",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The many options before him caused him to dither on his choices."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9c3e21d5-c983-41f2-8aac-200a9c990b4d",
// 		"name": "querulous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f10b71fc-fc0b-4153-8006-c7a97613aec6",
// 				"languages": [
// 					{
// 						"name": "whiny, complaining",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The passenger in the last seat is a querulous sort, complaining about the food, the service, and everything else near him."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9ccc08bd-5d72-4285-afd6-0f4656c57b36",
// 		"name": "denounce",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6f554cef-22f4-4c88-be79-7497141a24bb",
// 				"languages": [
// 					{
// 						"name": "to criticize publicly",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The executive denounced all the criticism of his company, calling it unfounded."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9d47dced-01f3-4ed9-a9db-cb8e653ed70a",
// 		"name": "accommodating",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a228e493-f5a8-4394-8107-525c9dd5deb0",
// 				"languages": [
// 					{
// 						"name": "helpful, obliging, polite",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Though the apartment was not big enough for everyone to be comfortable, the good friends were very considerate and accommodating to each other."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9d6db089-59fb-42ce-a70b-677709d9f54a",
// 		"name": "undulate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5c43b0b9-5b8d-464d-9ebc-6f640df70bb6",
// 				"languages": [
// 					{
// 						"name": "to move in waves",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"AS the waves picked up, that little skiff started to undulate like a bream cork."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9d77f3d5-513c-4d42-8508-fce3fc0c0648",
// 		"name": "wane",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7e6a2ee8-e763-4cc8-964d-bfc81a81f007",
// 				"languages": [
// 					{
// 						"name": "to decrease in size, dwindle",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"After not eating for three full days, Bert's strength began to wane."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9e26da95-2227-426e-ba1f-d964c1266c5e",
// 		"name": "abstain",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3acf2c94-c8f6-42d8-ac6f-608d82fea387",
// 				"languages": [
// 					{
// 						"name": "to freely choose not to commit an action",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Everyone demanded Angus to put on the kilt, but he did not want to, so he abstained."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9e2a421e-8102-40a8-8016-a0ade1f4a303",
// 		"name": "permeate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c08be449-c3a1-4df7-a757-57e802a10b77",
// 				"languages": [
// 					{
// 						"name": "to spread throughout, saturate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Leaven, or yeast, tends to permeate everything it touches."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9f058fc4-b219-41e8-9be3-512c140fd0fd",
// 		"name": "expurgate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0fec8955-1aa5-4d62-a1df-e08fd6bc1112",
// 				"languages": [
// 					{
// 						"name": "to remove offensive or incorrect parts, usually of a book",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The editors were required to expurgate the misinformation from the text and print and apology along with the true account."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9f0c36e6-01fe-41dc-a31b-3f28245d8f86",
// 		"name": "reservoir",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "53b8ad7c-dd51-4748-a9d5-b51372ef5615",
// 				"languages": [
// 					{
// 						"name": "reserves, large supply",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"There's a reservoir of office supplies yet unopened in the secretaries' vault."
// 				]
// 			},
// 			{
// 				"id": "bbc71e01-f82f-4609-af77-bd1f8b648b76",
// 				"languages": [
// 					{
// 						"name": "a body of stored water",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Hoover Dam creates one of the largest reservoirs of fresh water in the world."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9f8d30fb-2aeb-40f0-b42e-27721bee66af",
// 		"name": "zealous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "fcc410cb-f672-4cf7-ac69-23d1d1269b17",
// 				"languages": [
// 					{
// 						"name": "fervent, filled with eagerness in pursuit of something",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The zealous young apprentice spent the night at his desk, trying to learn everything in a day."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9fafcb2b-2878-4b4c-b55c-94a3b16a2747",
// 		"name": "content",
// 		"contexts": [
// 			"vs. \"content\" /ˈkɒntɛnt/ : (Inhalt, içerik)"
// 		],
// 		"dictionary": null,
// 		"pronunciation": "/kənˈtɛnt/",
// 		"definitions": [
// 			{
// 				"id": "a0611227-db59-4630-8b40-607f6c20ecd3",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "zufrieden",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "satisfied, pleased",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "memnun, hoşnut",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"he seemed more content, less bitter"
// 				]
// 			},
// 			{
// 				"id": "6d0ccf9d-9689-4dde-8c7b-f7f382baffe6",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "satisfy (someone)",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Nothing would content her apart from going off to Barcelona"
// 				]
// 			},
// 			{
// 				"id": "33d7d893-37bb-4dfd-ae53-cfb68d715eda",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "a state of satisfaction",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Zufriedenheit",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "memnuniyet, hoşnutluk",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The greater part of the century was a time of content"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9fe22364-f232-45d8-a900-88f55cf5d330",
// 		"name": "pillage",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "157e18d7-2399-41d3-9535-8ec09f8c6c0a",
// 				"languages": [
// 					{
// 						"name": "to seize or plunder, especially in war",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The pillage left in the wake of the Viking's raid left the village destitute of food and good."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9fe991b7-079c-4998-ac96-94449bc09b39",
// 		"name": "antagonism",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "aef09d50-aeaf-4162-ba79-41ab243c4bd5",
// 				"languages": [
// 					{
// 						"name": "hostility",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Spiderman's greatest and most bizarre nemesis, Doctor Octopus, provided such antagonism that the superhero was pushed to his limits time and again."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9ff14590-6ac5-4530-8711-2f3bae485817",
// 		"name": "diaphanous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8f7073b2-cde9-45c6-b04c-4bbe1f3c1ba3",
// 				"languages": [
// 					{
// 						"name": "light, airy, transparent",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Diaphanous garbs in summer can help anyone get an authentic all-over tan."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "9fff9e85-62e3-46b7-b2ae-1fbaaba8e719",
// 		"name": "hallowed",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c0547fcb-63c9-47cb-8acb-eaca873c007b",
// 				"languages": [
// 					{
// 						"name": "revered, consecrated",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"For lovers of rock and roll, Woodstock is considered hallowed ground."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a00202ab-4af4-47dc-ad75-c26fbece5791",
// 		"name": "gregarious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b17e5547-2ed4-4c86-a76f-f065fb6e562a",
// 				"languages": [
// 					{
// 						"name": "drawn to the company of others, sociable",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The gregarious college kids couldn't be satisfied until they found out where the weekend party would be."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a016372f-525d-4a84-a972-545bbe5d8998",
// 		"name": "paucity",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "86d6c73a-53fd-44b9-aa7e-324ae4838580",
// 				"languages": [
// 					{
// 						"name": "small in quantity",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Dwayne felt the paucity of available food meant that everyone should eat smaller portions, starting with him."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a07c8039-eeaf-4c3a-88b2-7a2cd8d5c0ee",
// 		"name": "irascible",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "70517292-5ece-4325-b323-209d4d5c92bf",
// 				"languages": [
// 					{
// 						"name": "easily angered",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The irascible Daffy Duck is one of my all time favorite cartoon characters."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a13572dd-ccba-4dda-a436-c4e64e545800",
// 		"name": "adept",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a0e042c1-1b88-413e-8c49-81b859d22df6",
// 				"languages": [
// 					{
// 						"name": "extremely skilled",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Tarzan was very adept at jumping from tree to tree just like Cheetah, his pet Chimp."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a1705363-4002-4581-835d-c3601d13721a",
// 		"name": "eschew",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3d97dd37-16ec-4e01-860f-ee250b9714b0",
// 				"languages": [
// 					{
// 						"name": "to shun, avoid",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Good men must learn to cherish the right things and eschew the wrong."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a1d4b8d1-2ef4-49ee-93cc-d84875b80796",
// 		"name": "flout",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5de5630a-1f8c-4d8f-8e02-cb033a9ede80",
// 				"languages": [
// 					{
// 						"name": "to disregard or disobey openly",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Flouting the speed limit, the celebrating teens sped up to 100 mph."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a26de16c-cfc6-49d9-8957-15cf0aef7bc8",
// 		"name": "oscillate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "013d53fc-969f-4fe0-9018-7d501eaf156d",
// 				"languages": [
// 					{
// 						"name": "to sway from one side to the other",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Melvin's little oscillating fan hummed all night, trying its best to cool the whole room."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a2729547-bb00-4d62-b576-3791ec291f45",
// 		"name": "penultimate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c45f7da5-c11f-4adc-8695-fd214a356f50",
// 				"languages": [
// 					{
// 						"name": "next to last",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"I believe Jim's penultimate solution was better than the one he ultimately chose."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a27b068d-89c8-465f-a603-611bfdc4c105",
// 		"name": "inexorable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e356efae-61d8-41d1-85c2-436891082e72",
// 				"languages": [
// 					{
// 						"name": "incapable of being persuaded or placated",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The inexorable march of the troops, with their minds fixed on vengeance, led them headlong to their own disaster."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a298449c-9ea7-49b2-9866-d62d7d34e0b5",
// 		"name": "convoluted",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ec63fe89-8aff-4059-b0e9-ba7087d14ad6",
// 				"languages": [
// 					{
// 						"name": "intricate, complicated",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The witness's story was so convoluted that no one believed it, not even those who needed his testimony."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a2b76e00-27bc-44c6-8e50-c98e6d7cee83",
// 		"name": "solvent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "df6a004f-0309-4108-b8a0-6989eeb112cc",
// 				"languages": [
// 					{
// 						"name": "substances that dissolve other substances",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The scientist knew once she added the solvent, the reaction would spontaneously occur."
// 				]
// 			},
// 			{
// 				"id": "ed07ddda-50cb-41c4-862e-d32f92fe44f4",
// 				"languages": [
// 					{
// 						"name": "able to pay debts",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"After a sales breakthrough, the shop owner became solvent enough to catch up on all of his debts."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a4254c79-1d60-43f6-b586-85655a42304a",
// 		"name": "largess",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c8f68a4b-d314-4671-9a3b-714515d485ea",
// 				"languages": [
// 					{
// 						"name": "great and lavish generosity in the giving of gifts",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"On rare occasions, super rich people demonstrate laudable largess in the buying of homes for the poor and building free hospitals for the indigent."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a44ab504-c231-489b-8fa3-2397ece7ac87",
// 		"name": "bourgeois",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4f27dc91-162c-449b-82e1-a18f18477de2",
// 				"languages": [
// 					{
// 						"name": "an upper middle-class person, a successful capitalist",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The bourgeois clients of Hampton Province would not wear off-the-rack items."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a458bc90-4cc6-4af7-9d6f-9901160fdc4a",
// 		"name": "account",
// 		"contexts": [
// 			"\"on account of\": \"The concert was canceled on account of (due to, because of) bad weather.\""
// 		],
// 		"dictionary": null,
// 		"pronunciation": "/əˈkaʊnt/",
// 		"definitions": [
// 			{
// 				"id": "920ff186-583c-43be-a3f2-639326c3861e",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "a story with a point",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The old man shared an account of his childhood during the war, emphasizing the importance of resilience and community.",
// 					"An account can be serious, informative, or even dramatic, depending on the context. The key is that it conveys a particular incident or experience."
// 				]
// 			},
// 			{
// 				"id": "e12dad63-4c20-4ee0-b376-bd1ec577df2d",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "To explain or justify the cause of something, give a report",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "eine Erklärung oder Rechenschaft ablegen",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "hesap vermek, açıklamak",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"She couldn't account for (give a satisfactory explanation) the loss."
// 				]
// 			},
// 			{
// 				"id": "61571003-22c6-4b2b-a641-5f8a3dee9673",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "considering or analyzing all relevant aspects",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "hesaba katmak",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "berücksichtigen",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"Let’s account for all the factors.",
// 					"We need to account for every variable in the equation."
// 				]
// 			},
// 			{
// 				"id": "44fc00af-3b5b-4ad1-9eea-e989d5f63d42",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "to bring about (cause) the capture, death, or destruction of something",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "der Grund für etwas sein",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "birşeyin sebebi olmak",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"For instance, “Enemy fighters accounted for two of the bombers.” This means the enemy fighters were responsible for the destruction of those two bombers."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a48dcafd-ac70-4afb-b78f-6de8973b8c3c",
// 		"name": "clemency",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d8bc8c08-70cb-4caa-9913-4cdd633f6ded",
// 				"languages": [
// 					{
// 						"name": "mercy",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"After his fifth speeding ticket in a year, Mark could only beg the judge for clemency."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a49be569-e11a-4078-a1ff-55e49423a17f",
// 		"name": "googol",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "938db845-0551-444a-9fc6-04e878f25c17",
// 				"languages": [
// 					{
// 						"name": "ten to the 100th power",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"A googol is larger than the number of elementary particles in the universe, which amount to only 10 to the 80th power."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a49fd195-a425-4857-b3dc-a8eb77a0ac50",
// 		"name": "munificence",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2d551488-6acd-4b52-a68b-1d50b76e664d",
// 				"languages": [
// 					{
// 						"name": "generosity in giving",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The extent of the billionaire's munificence astounded even those who knew him well."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a4e06deb-fa28-49eb-af5d-0bf7e9cb9183",
// 		"name": "irreverence",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c213a6df-8024-411b-95f4-f6e7d2d1b4b7",
// 				"languages": [
// 					{
// 						"name": "disrespect",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The irreverence shown by the rap singers was such an insult to effectual worshipers."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a50849af-83a4-40aa-a5a8-eba9e9a86e62",
// 		"name": "haughty",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "457e4575-b462-47f2-b9b1-b589f246b904",
// 				"languages": [
// 					{
// 						"name": "disdainfully proud",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The haughty rich kids constantly flaunted their brand name garbs and their sports cars."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a54a9107-ce68-4324-a05d-5c5bbc0bb31e",
// 		"name": "illicit",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "da6a52e1-7104-4a52-91fc-73becae5dfcb",
// 				"languages": [
// 					{
// 						"name": "forbidden, not permitted",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The pipes and other paraphernalia found in that house were deemed illicit by the investigating officers."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a579f67c-552d-4648-aa7b-aad032aa2d78",
// 		"name": "florid",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "98357519-e2f6-4706-9918-9d857a92e7b1",
// 				"languages": [
// 					{
// 						"name": "flowery, ornate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The mansion was replete with thick columns and florid gardens galore."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a5d3799c-4a0d-4053-b9f1-17b99d92b136",
// 		"name": "inundate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6ff54186-42ea-4c83-b0db-ea1c2a300a89",
// 				"languages": [
// 					{
// 						"name": "to flood with abundance",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"\"I'm completely inundated with house work!\" complained the new bride."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a5f6581b-6b07-4d92-89f7-dcc0f79b2d0f",
// 		"name": "imperative",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "95ea63da-4783-4a0a-8e9c-0022109a8fa1",
// 				"languages": [
// 					{
// 						"name": "necessary, pressing",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"It is absolutely imperative that you take the pills according to the directions on the bottle."
// 				]
// 			},
// 			{
// 				"id": "b4b477c7-797f-4a13-9dd7-fa9f283db3a4",
// 				"languages": [
// 					{
// 						"name": "a rule, command, or order",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The commander issued an imperative that every soldier must be present and accounted for by eighteen hundred hours."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a606754a-b4a6-4a33-98f1-922d2c106988",
// 		"name": "mandate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "af8265cd-f4f6-45d0-a733-e152eacf2fb5",
// 				"languages": [
// 					{
// 						"name": "an authoritative command",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"In the New Testament, Jesus mandated that the penitent would receive mercy and grace."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a62268bc-3b65-49d1-a616-46420d2e1eb0",
// 		"name": "indefatigable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c23bb675-ed81-4afe-b1bf-0c555af43c74",
// 				"languages": [
// 					{
// 						"name": "incapable of defeat, failure, decay",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Even after jogging the uphill route, the indefatigable runner kept on going to the finish line."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a6719b3d-0d58-43e2-8514-906af8d05e01",
// 		"name": "flabbergasted",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c7aeb418-0526-4b97-8e30-acf13317713b",
// 				"languages": [
// 					{
// 						"name": "astounded",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"When Jethro proposed to Elaine, everyone was completely flabbergasted, saying they thought it would never happen."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a696afa2-ae14-4dc1-889d-0d94d14ffac0",
// 		"name": "perplex",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "61e126f6-1caa-46c4-95cb-eba840d5c74d",
// 				"languages": [
// 					{
// 						"name": "to confuse",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"A good military leader will always attempt to perplex his foes with some strategy."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a6c45f77-bf43-467a-810a-40002518fd42",
// 		"name": "reprobate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6220cb66-45da-43e8-9a9c-7c61de30c383",
// 				"languages": [
// 					{
// 						"name": "evil, unprincipled",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The reprobate murderer sat in his cell, thinking of revenge against his self-assigned enemies."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a6caba10-96a3-4ba0-b4cd-70f035d4af1b",
// 		"name": "respite",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b1e138af-4503-407d-9724-afea6c37f3b4",
// 				"languages": [
// 					{
// 						"name": "a break, rest",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The pause in the storm offered a brief but desperately needed respite."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a6d50ce5-eb96-4c9b-a69f-aa460e84064a",
// 		"name": "compress",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "669d8790-6d29-43c8-a4ec-c75e681df43c",
// 				"languages": [
// 					{
// 						"name": "to apply pressure, squeeze together.",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The nurse compressed the area of the wound, trying to stop the bleeding."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a71320dc-5072-44d4-a5dc-d24f461ac9b4",
// 		"name": "complicit",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "321bbe49-32c3-489e-be97-f1f54c1ea325",
// 				"languages": [
// 					{
// 						"name": "being an accomplice in a wrongful act",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"By keeping the theft secret, Madison became complicit in it, and was thus charged."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a745782c-cce0-4518-84c3-ae3130e3e0b5",
// 		"name": "chronicle",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e10b42c6-af63-4459-937b-5493e4c23fa2",
// 				"languages": [
// 					{
// 						"name": "a written history",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The chronicle of the Vietnam War is available with graphic footage."
// 				]
// 			},
// 			{
// 				"id": "3aa332f2-c7cf-4f1e-91f4-0110e3393481",
// 				"languages": [
// 					{
// 						"name": "to write a detailed history",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Attempting to chronicle an average month in his classroom is a daunting chore."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a818ecea-fdd8-4856-899c-d7ecc0762fe9",
// 		"name": "circumlocution",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c314bd74-d2f0-4ba3-9a91-501bc9451eaf",
// 				"languages": [
// 					{
// 						"name": "indirect and wordy language",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The debate team used circumlocution as a strategy to address the illogical aspects of their argument."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a874c46a-7281-4532-bca8-4165410e3ac0",
// 		"name": "forbearance",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d9b687b7-5f2e-45dc-8b2c-a664efe05f59",
// 				"languages": [
// 					{
// 						"name": "patience, restraint, toleration",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The officer showed great forbearance in listening to the rants of the outraged driver."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a8b0aafc-a548-43c3-99fe-2d7c4cffc22b",
// 		"name": "rail",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b024c530-e3fe-480b-a127-ed9de9b3d380",
// 				"languages": [
// 					{
// 						"name": "to scold, protest",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The tenured teachers began to rail against the lack of a cost of living increase."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a8dc7a0e-5065-401a-b3a4-13eee851d7fd",
// 		"name": "codicil",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9acb3462-618f-4005-b7dc-e04ac294557a",
// 				"languages": [
// 					{
// 						"name": "an appendix, esp. to a will",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"He wrote a letter to Morrissey suggesting a second codicil and pitching himself as the man to do it."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a91218b9-8109-4c9d-81f7-8b8eac396d13",
// 		"name": "rancor",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "aea83d5b-2cf7-460b-a0f0-adb6704e23a0",
// 				"languages": [
// 					{
// 						"name": "deep, bitter resentment",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"When the will was read, the jilted spouse was brimming with rancor when her late husband's estate was left to some woman he called Jessie Bell."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a974b0d3-4ed3-4bdf-b25a-fcb3fbdc5299",
// 		"name": "acrimony",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "daafa45f-f4bc-486c-9596-064b9abf77b5",
// 				"languages": [
// 					{
// 						"name": "bitterness, discord",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Acrimony enveloped the friendship of Lisdanay and Terri after they both fell for Alvin."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a984ce77-de26-4e84-aecc-124ee3168006",
// 		"name": "mendacious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "708598f7-6d43-41a9-bd9b-b62f12e44d19",
// 				"languages": [
// 					{
// 						"name": "having a lying, false character",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The mendacious reputation of Snake MacFarady caused everyone to turn down his offer to go into business with him and his brother."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a9939aa6-ff10-4238-8a0e-cdbf0ac2ea98",
// 		"name": "cadence",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "17843151-0475-4f23-b64f-513aa40d42bd",
// 				"languages": [
// 					{
// 						"name": "a rhythm, progression of sound",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The throbbing cadence that the soldiers marched made them seem even more fierce."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a9b16935-cb5b-4f2e-a554-2a3f0f1f85c1",
// 		"name": "adumbrate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "343e1132-0944-4c41-bafc-351e38183526",
// 				"languages": [
// 					{
// 						"name": "to sketch out in a vague way",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The coach adumbrated his game plan; none of the players were ready for its unorthodox twists and turns."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a9c4fcf6-4b66-4f74-9470-34d36f969752",
// 		"name": "conformist",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9ca76171-7518-4b49-81a9-ef42d30e17cc",
// 				"languages": [
// 					{
// 						"name": "one who behaves the same as others",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Because of their conformist mentality, the small country chose not to go to war with the invaders."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a9c8f40c-ea91-4e5e-9198-3d4f712ef87f",
// 		"name": "trenchant",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9d1d3b0c-5424-45b1-8a39-d18361382f19",
// 				"languages": [
// 					{
// 						"name": "effective, articulate, clear-cut",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The how-to directions that came with my speed bike were not trenchant and proved very difficult to follow."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "a9e30a70-50bb-4162-b2a6-2662850c67dd",
// 		"name": "panacea",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "67149b35-3e99-497a-9af4-f53fda6d41e0",
// 				"languages": [
// 					{
// 						"name": "a remedy for all ills or difficulties, a cure-all",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"There are no panaceas in the real world; however, an apple a day might be the closest."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "aa7f6c57-dc8c-4d96-80d7-0f21f1055954",
// 		"name": "esoteric",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a40a2272-6e1e-4f8a-8aec-830d8df34b9c",
// 				"languages": [
// 					{
// 						"name": "understood by only a select few",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Even the most gifted students can't fully fathom the esoteric nature of existence itself."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "aa835af8-ecb7-458f-8f3d-8f474e2112d8",
// 		"name": "leitmotif",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d4cf132f-6009-458b-95ff-4f3e2b78f5a3",
// 				"languages": [
// 					{
// 						"name": "(music) a repeating theme associated with a particular character (in Wagnerian opera); a dominant an recurring theme",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"there are two leitmotifs in his score marking the heroine and her Fairy Godmother\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "aaa6d9b3-0b73-41ae-8ea1-ab58d6791764",
// 		"name": "appraise",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f570aebc-a863-4346-8914-22b04f2da084",
// 				"languages": [
// 					{
// 						"name": "to assess worth or value",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"A real estate assessor will be here to appraise this house around 3:00 pm."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "aab8e913-8cf5-44f7-913f-17915ad0ddb4",
// 		"name": "propriety",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "fabbe05c-355b-4ebb-95c0-e3ee394a72b3",
// 				"languages": [
// 					{
// 						"name": "the quality or state of being proper, decent",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Observing the dictates of social propriety, Evelyn allowed her guest to be seated first."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ab846ac3-6c9c-45c3-9cdc-b77dd7054060",
// 		"name": "terrestrial",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "aab2f8bd-7984-4dea-8795-1356d86d85f4",
// 				"languages": [
// 					{
// 						"name": "relating to the land",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Because hippopotami are only semi-terrestrial, they must be semi-aquatic also."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ac9c3df6-705b-462d-8777-4f1e98850967",
// 		"name": "conciliatory",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7ac847ed-d433-4180-8617-5b02de83f0f8",
// 				"languages": [
// 					{
// 						"name": "friendly, agreeable",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Buying flowers for his angry bride was a wise and conciliatory gesture on Paul's part."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "acd07324-061b-4a86-9071-96956cfa1c0d",
// 		"name": "procure",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f4b05212-d352-45c5-872e-1e9cdb842ea9",
// 				"languages": [
// 					{
// 						"name": "to obtain, acquire",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Trying to procure sustenance, the hungry man reluctantly stole from total strangers."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "acff0c17-9a68-457a-a35c-f8d5c6b4f22e",
// 		"name": "restitution",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c35d032b-fd68-475d-ac22-07ae380b55a8",
// 				"languages": [
// 					{
// 						"name": "restoration to the rightful owner",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The police ensured that the theft victims received full restitution of their possessions."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ad31eb13-4134-4ca7-a88c-ad84ec445f1f",
// 		"name": "impute",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "afd72562-4338-49a7-b182-8cd73a7ac8e3",
// 				"languages": [
// 					{
// 						"name": "to ascribe, blame",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The conference winning coach chose to impute to his played the total credit for their victories."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ad54dc66-06cc-4e52-9024-19732d99b558",
// 		"name": "indolent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bf7034c4-74f6-4eef-910d-b8553884a41e",
// 				"languages": [
// 					{
// 						"name": "lazy",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Offering indolent people a real job is a total waste of time."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ad87907e-39c1-43a6-8143-7ed1e596b426",
// 		"name": "boisterous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6ddf75fa-ab02-4597-a657-19a4debcc05c",
// 				"languages": [
// 					{
// 						"name": "loud and full of energy",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The cheerleaders were incredibly boisterous during the pep rally last night."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "adbfc194-397c-4aea-bd74-f9c4f5a160fa",
// 		"name": "precocious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "459b494f-e013-4282-a660-3cfdfa172574",
// 				"languages": [
// 					{
// 						"name": "advanced, developing ahead of time",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Polly Ann was the most precocious child in the class, many times beating her teacher to the answers."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "adc43328-d06a-44a0-bb9e-52fd82f15936",
// 		"name": "lucid",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "06beecb0-b5d8-42cb-b5d6-ff405ab79bfb",
// 				"languages": [
// 					{
// 						"name": "clear, easily understandable",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Dr. Bringham's explanation was so lucid, even the freshmen med students were able to grasp it and all of its subtleties."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "aea71bf7-91ee-44e7-a41a-829ed01dc71b",
// 		"name": "pertinacious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c06e80d4-4d1c-4d41-9ccf-e59b79e2129b",
// 				"languages": [
// 					{
// 						"name": "stubbornly persistent",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The twins had a pertinacious spirit that drove them to stick to their guns no matter what."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "af2a74e3-cee9-4bdb-b1b8-f9d60c5bcadb",
// 		"name": "consensus",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "239ac289-1e85-42ed-9b9c-55c39f550875",
// 				"languages": [
// 					{
// 						"name": "an agreement of opinion",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The committee was able to reach a consensus on what the spending priorities should be."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "af79a732-b19e-45ad-9e3f-0df3948d8ad1",
// 		"name": "hedonist",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8fc21085-a16a-4f4b-bd13-990df4ee8487",
// 				"languages": [
// 					{
// 						"name": "one who believes pleasure should be the primary pursuit of humans",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Because he was such a hedonist, Brandon spent his every waking hour searching for something that felt good, tasted good, or sounded good."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "af8b9dd0-0957-438c-ae1e-5b6d9b4a837a",
// 		"name": "pathos",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "cd4192c6-9bcc-4e3d-8192-0b4d9e5a3cf1",
// 				"languages": [
// 					{
// 						"name": "an emotion of sympathy",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Even the perpetrators showed sincere pathos for the stricken family."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "afa0f5ad-7cdf-4d03-a9f6-3696d71babfa",
// 		"name": "affluent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "890e91da-79d7-4c70-b93e-3763b60668d8",
// 				"languages": [
// 					{
// 						"name": "rich, wealthy",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Mrs. Gregory was affluent, owning a huge house, a yacht, and a small Pacific island."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b019d98c-8950-4d23-bb71-05afd3fb75d4",
// 		"name": "aesthetic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4c8f668f-69fd-4788-a5cb-2f91e460dfdf",
// 				"languages": [
// 					{
// 						"name": "artistic, related to one's sense of beauty",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"We hired Susan, an interior decorator, because she had a wonderful sense of aesthetics."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b029472d-2845-4cd0-9c6a-5c03bf72238c",
// 		"name": "sanctimonious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1f74daab-496f-4997-a3cc-21419b81e5be",
// 				"languages": [
// 					{
// 						"name": "giving a hypocritical appearance of piety",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Sanctimonious preachers cause so many to disbelieve the genuine message of God."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b0999331-23af-4412-a126-a566fb3c6c17",
// 		"name": "battery",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b7b2a4f4-6d63-43ca-bf56-1e7dbd04011f",
// 				"languages": [
// 					{
// 						"name": "a device that supplies power",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Battery powered cars will be all the rage somewhere in the future."
// 				]
// 			},
// 			{
// 				"id": "855a43f9-bc4f-4f16-b61f-5dba3a1fb7eb",
// 				"languages": [
// 					{
// 						"name": "assault, beating",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Assault and battery is a felony, not just a misdemeanor."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b1189272-65cf-4791-a6b4-14b133c2a9b1",
// 		"name": "coronation",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5896cfd3-d98f-48b2-8347-73e646ad5139",
// 				"languages": [
// 					{
// 						"name": "the act of crowning",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The queen's coronation ball was the hardest ticket in town."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b1423404-7d4b-41d3-aee6-ee145dcbdaf4",
// 		"name": "temperance",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "23089e13-7125-417d-8e00-dad0b2d0e9ff",
// 				"languages": [
// 					{
// 						"name": "moderation in action or thought",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Those who meditate tend to develop great temperance, remaining calm in the most distressing of circumstances."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b1965ee5-9e8f-4ead-a95d-7688fbd356be",
// 		"name": "ascribe",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8e12b617-92fa-494d-8aca-87e5d44f07a7",
// 				"languages": [
// 					{
// 						"name": "to assign, credit, attribute to",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"True wisdom has been ascribed to those who seek goodness, truth, and virtue above all else."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b1ae0580-696e-48cb-a100-369780f5361c",
// 		"name": "abate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "39750894-aa71-478e-b116-fe98398c66b0",
// 				"languages": [
// 					{
// 						"name": "to reduce or to lessen",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The rain poured down like a broken dike for a long while; then, as the clouds began to move on, it slowly abated."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b1fac22d-415c-43e3-a8f8-563b17e0e200",
// 		"name": "stingy",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "083a9992-c40c-48ea-9bc4-a445ccb0ec2d",
// 				"languages": [
// 					{
// 						"name": "not generous, not inclined to spend or give",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The stingy man would only pay the teenager fifty cents for cutting his two-acre lawn."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b246ef58-8d0d-4bc3-a53f-91fd84ab4265",
// 		"name": "encomium",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "82df26e8-75c8-423a-b632-a94bd79ae3cd",
// 				"languages": [
// 					{
// 						"name": "a eulogy or formal expression of praise, a panegyric, warm praise",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"I think he stopped earning that encomium in about the summer of 2000."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b26b0b57-4662-4186-8297-0cb158211c61",
// 		"name": "dirge",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "56de1bfb-b28d-44f7-8e27-0dd2817b5c44",
// 				"languages": [
// 					{
// 						"name": "a mournful song, especially for a funeral",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The singer sang a dirge as the casket was carried slowly to its place of rest."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b328f5dc-bcc8-45a8-af82-285981742e1c",
// 		"name": "nomadic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "50601363-d83f-4f49-99f4-eb2d9dc9f04a",
// 				"languages": [
// 					{
// 						"name": "wandering from place to place",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The nomadic tribesmen move so often, it's impossible to know their whereabouts at all times."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b343c69e-61ba-4000-a756-c1f62af9cfcb",
// 		"name": "clandestine",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "87535f61-f3c7-4d4d-ad86-1208a8993490",
// 				"languages": [
// 					{
// 						"name": "secret",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"A clandestine rendezvous was planned by the two secret agents."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b35be3cc-86ee-4ba1-8288-af957cc37b0a",
// 		"name": "empathy",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c0b541da-bc1d-423b-b74b-e74a764819fd",
// 				"languages": [
// 					{
// 						"name": "sensitivity to another's feelings as if they were one's own",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"I have great empathy for everyone who has to go through what I've faced."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b365efc1-4320-45a4-a0a6-e2afecc3394b",
// 		"name": "manifest",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "64c49c67-c275-4833-a131-ddf9e0788c7c",
// 				"languages": [
// 					{
// 						"name": "easily understandable, obvious",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The poet's meaning is clearly manifest when you consider his other writings."
// 				]
// 			},
// 			{
// 				"id": "5c350dd8-04ef-4597-8b47-99e9e738ae53",
// 				"languages": [
// 					{
// 						"name": "to show plainly",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The strategy was to manifest deep hurt in the eyes of the jury."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b3be001c-f24d-4aa4-8d68-0c9bca6f55b7",
// 		"name": "duress",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "352ae96f-95fc-45f5-bd3e-1b810c01244a",
// 				"languages": [
// 					{
// 						"name": "hardship, threat",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The lawyer was able to convince the jury that his client only committed the offense because of the extreme duress he was under - thanks to the victim."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b3fc24f2-1ef5-4806-a86f-7ea46b37441b",
// 		"name": "vituperate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "07ff72f7-0a7e-4adf-8d62-69559fa97102",
// 				"languages": [
// 					{
// 						"name": "to berate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The embarrassed coach began to vituperate his seniors for allowing themselves to be beaten by the girls' team."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b44ea5f6-9525-449d-ac79-6674ebe0b0e2",
// 		"name": "inhibit",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2e4912a9-8dd5-45a4-85b3-1953de9a0007",
// 				"languages": [
// 					{
// 						"name": "to prevent, restrain, stop",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"An innutritious diet will at some point inhibit a person's good health."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b4aeec12-af5f-4cbe-b9c9-175891ff2910",
// 		"name": "obstinate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2058f134-c520-4764-b158-186778c19f2b",
// 				"languages": [
// 					{
// 						"name": "not yielding easily, very stubborn",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Even after hours of enhanced interrogation, the spies remained obstinate and closed mouthed."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b527bfee-bba0-4229-b5ad-10f768f7107d",
// 		"name": "predilection",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4294e37a-ea1e-4297-b0b6-486301ff3547",
// 				"languages": [
// 					{
// 						"name": "a preference or inclination for something",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Due to Claud's predilection for sea food, his choice of evening fare was always predictable."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b5a31f03-597b-4a40-a400-c678abdf7c5c",
// 		"name": "covert",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "451bdcad-82ed-477c-9dfd-a72347e6f063",
// 				"languages": [
// 					{
// 						"name": "secretly engaged in",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The CIA's covert operations in the Middle East are as invisible as clean air."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b5a40433-cf6d-4a7d-bc21-95f93d45e349",
// 		"name": "epistolary",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "46f47284-a43f-4377-8279-abf3edb8f458",
// 				"languages": [
// 					{
// 						"name": "relating to or contained in letters",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"One of the chief epistolary writings of Paul is the book of Romans."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b5c25e8b-1079-4b39-8b79-7019e4cd9ad8",
// 		"name": "arbitration",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2f3a63f9-5ec1-4daa-bf82-311238b81239",
// 				"languages": [
// 					{
// 						"name": "the process or act of resolving a dispute",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The plaintiffs sought immediate arbitration when a judge gave them a hint of an unfavorable ruling."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b5e159ac-5f03-46d4-ad3b-88270a712410",
// 		"name": "cajole",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d9443dbe-123c-4ba4-9fbf-bcfd36895d1b",
// 				"languages": [
// 					{
// 						"name": "to urge, coax",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Frank tried to cajole his buddy to skip school with him on his birthday."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b6277cfd-4dc7-4ad9-9a60-f6cbc895d1af",
// 		"name": "igneous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7fe15ad3-f93b-4599-83f7-d1c966b2fdfa",
// 				"languages": [
// 					{
// 						"name": "relating to fire; formed from a molten state; related to such rock",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Some occurs as crystals in igneous rocks, and some in vein deposits."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b62afa0b-c935-46fc-b753-dde4e6e4ce67",
// 		"name": "aspire",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "255b4aba-56a4-48c2-be2c-c91e8eb8339d",
// 				"languages": [
// 					{
// 						"name": "to long for or to aim toward",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The adolescent writer aspires to write and publish the great American novel someday."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b6362380-a1c4-49e8-aad4-9218d67ac78b",
// 		"name": "incisive",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "57513c75-48f4-4873-b7a9-ce28d045cff2",
// 				"languages": [
// 					{
// 						"name": "clear, sharp, direct",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Plato's incisive questions caused both debaters to get straight to the point they needed to make."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b645396e-84d3-44d3-924c-074736934932",
// 		"name": "dogma",
// 		"contexts": [
// 			"The principles are often considered authoritative and not to be disputed or doubted."
// 		],
// 		"dictionary": null,
// 		"pronunciation": "/ˈdɒɡmə/",
// 		"definitions": [
// 			{
// 				"id": "7bd6e535-b975-42d3-b600-e051235d1128",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "a set of principles or religious or ideological beliefs that are accepted by a group without question",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Glaubenssatz",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "sınanmadan kabul edilen, olduğu gibi benimsenen ve bir öğretinin dayanağı yapılan fikir",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The dogma of the Catholic Church includes doctrines such as the Trinity and the Immaculate Conception."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b6cf57f3-3791-40ca-9072-3a151e06a36b",
// 		"name": "usurp",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9d6e8ebf-eada-4424-ad11-0140f93506b3",
// 				"languages": [
// 					{
// 						"name": "to seize by force, take possession of without right",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The young prince dreamed of usurping his father's position and sitting comfortably on his throne."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b7894847-78d1-43cb-95d8-9c4475a6bb06",
// 		"name": "irrevocable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e1fa36df-0458-488c-a2e6-62061cc8eb09",
// 				"languages": [
// 					{
// 						"name": "incapable of being taken back",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The Bill of Rights establishes Americans' irrevocable rights under the Constitution."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b7e5c8cb-04f2-46fb-83f8-6c03a6b7ad22",
// 		"name": "collateral",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "695bec0f-694a-4266-8f04-4d086919b304",
// 				"languages": [
// 					{
// 						"name": "secondary",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"During every military conflict, wise leaders always attempt to minimize the collateral damage."
// 				]
// 			},
// 			{
// 				"id": "bf1c6040-1e70-409f-bbca-89187fb1665a",
// 				"languages": [
// 					{
// 						"name": "security for a debt",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Jack had to leave the title to his car collateral for the $2500 loan."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b86bf0fb-1a04-4c1c-a9bf-fecedd270853",
// 		"name": "litigant",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5ed8fd94-0690-45c8-9ecb-46db4a21af20",
// 				"languages": [
// 					{
// 						"name": "someone engaged in a lawsuit",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The litigant's lawyer warned her that she could loose everything if her witness didn't show."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b89ec320-9be3-4b27-b23e-06cd82349a7a",
// 		"name": "impudent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "edd91b41-24c8-4c72-8431-78927c990a2c",
// 				"languages": [
// 					{
// 						"name": "casually rude, insolent, impertinent",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"It never ceases to amaze me how today's young people can be so impudent to their elders."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b8dc169a-57c1-430a-9207-32bbd31f867d",
// 		"name": "preclude",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "141a2185-a92e-4123-9588-fab10456f0f4",
// 				"languages": [
// 					{
// 						"name": "to prevent",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Concern for the welfare of others should preclude a person from ever even considering taking advantage of anyone."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b936ff88-9f18-4a2d-a078-ce803afcb3be",
// 		"name": "amorphous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f9ec6fe3-dcd0-43ff-97eb-549d63edeb29",
// 				"languages": [
// 					{
// 						"name": "without a fixed or definitive shape or type",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The amorphous nature of gases causes them to be the unparalleled paragons of shape- shifters."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b98b4144-7e11-4af9-8e62-3af7a052bac7",
// 		"name": "vapid",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "13e8030a-a597-4ed8-a3a7-452788c6a13a",
// 				"languages": [
// 					{
// 						"name": "lacking liveliness, dull",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The latest rendition of Star Battles is reported to be vapid, lacking any real intrigue."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b9b84665-d480-4a72-a9ff-30d01e094b3a",
// 		"name": "trepidation",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ce19f289-8c96-41bf-a290-b870e7da459f",
// 				"languages": [
// 					{
// 						"name": "fear, apprehension",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Nolan's trepidations surged when he saw that wall of water approaching the beach."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b9c7c569-ea05-4c9d-83df-412385734023",
// 		"name": "deface",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "08f8be3c-470e-499b-8010-d388e0c68377",
// 				"languages": [
// 					{
// 						"name": "to ruin or injure something's appearance",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The boys threw eggs and sprayed shaving cream to deface their teacher's car."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b9c968ef-a12e-4e87-895c-fc8326c239b4",
// 		"name": "inchoate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c517a6cd-d4d7-415b-9cf7-8c24b8e60975",
// 				"languages": [
// 					{
// 						"name": "unformed or formless, in a beginning stage",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The inchoate form of an embryo causes some to mistakenly conclude that it's not a viable being at all."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "b9e48f88-fa62-422e-899c-a4a766a0aeb2",
// 		"name": "disabuse",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c1b3bc0d-8c6d-4748-bcb4-a0ac8ec7e38e",
// 				"languages": [
// 					{
// 						"name": "to correct someone; to clarify a misconception",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"\"he quickly disabused me of my fanciful notions\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ba53eadb-4088-4126-8a2c-eeb33072dea3",
// 		"name": "iniquity",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "70a3e1d0-6080-4241-b294-40ad05340162",
// 				"languages": [
// 					{
// 						"name": "wickedness or sin",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"Your iniquity,\" said the preacher to the unrepentant sinner, \"will not be forgiven.\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ba65c594-f241-49a1-b589-795cd87c6d1f",
// 		"name": "furtive",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3251d503-ff4d-4115-b850-e9d88bf85e6a",
// 				"languages": [
// 					{
// 						"name": "secretive, sly",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Janine saw the furtive smile her boyfriend gave to the waitress; thus, she spent the balance of her evening with a good book and a cup of hot cocoa."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ba6a2b84-304a-4645-93e8-f10fc2e679a1",
// 		"name": "disparate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "526cc045-945e-4964-aa49-a16fb00abea0",
// 				"languages": [
// 					{
// 						"name": "sharply differing, containing sharply contrasting elements",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Because of the presence of disparate elements, it was difficult to identify the substance with certainty."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ba861244-1ce4-4e73-b35b-1d4fe29e5225",
// 		"name": "incessant",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "16c52991-4a03-426c-b4aa-0e5203b66f59",
// 				"languages": [
// 					{
// 						"name": "unending",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The baby's incessant crying drove the young mother to the brink of a nervous breakdown."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "bb4cdab6-8924-4da0-9ea4-e1f126452c4c",
// 		"name": "portent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1660420f-a430-4a01-bcb2-78dee13146ee",
// 				"languages": [
// 					{
// 						"name": "an omen",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The witch's words were an ominous portent of tragedies to come for the great king."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "bb7d0334-4e1f-4730-85be-2a1531972993",
// 		"name": "emaciated",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "66b1e35d-655f-427b-bc72-a8a140d617b8",
// 				"languages": [
// 					{
// 						"name": "very thin, enfeebled looking",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The gaunt guitar player is the perfect example of an emaciated man."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "bc3313dc-ef57-4254-8149-9ec355460a5c",
// 		"name": "infamy",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5914b628-6f5e-47e5-9472-58bb004e44db",
// 				"languages": [
// 					{
// 						"name": "notoriety, extreme ill repute",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The infamy of the Jesse and Frank James gang lives to this very day."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "bcc64742-5904-4122-b8e0-b69683a18ac1",
// 		"name": "adorn",
// 		"dictionary": null,
// 		"pronunciation": "/əˈdɔːn/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a2e42772-6b8d-4d25-94c2-b9d1030f5798",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "to decorate",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "schmücken",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "süslemek",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"We adorned the tree with many colorful ornaments: ribbons, bows, and bells."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "bced10bd-8a70-4ddf-9c77-b8732f27a6cd",
// 		"name": "impeccable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f2809fc8-a419-446a-b7a0-6027875e8a1e",
// 				"languages": [
// 					{
// 						"name": "exemplary, flawless",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"His driving record is impeccable, having no marks for moving violations or even parking tickets."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "bced2dcc-fddf-41ef-9e6b-6bff2b654081",
// 		"name": "parody",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "159547f7-e904-49bb-9d8a-1da41daf34d6",
// 				"languages": [
// 					{
// 						"name": "a satirical imitation",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Saturday Night Live is one of the most noted television shows to ever use parody as its chief means of humor."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "bd7449d7-e6ba-41f2-a3e5-0e5018c9ef99",
// 		"name": "seminal",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3e1d3f03-aae4-4fc6-9750-a43b386a25c9",
// 				"languages": [
// 					{
// 						"name": "original, important, creating a field",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The dawning of the age of serious quartz research is seminal; for, it has heretofore only been postulated."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "bd8059ca-711b-4c59-8abb-376cc8f82649",
// 		"name": "consign",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ac61fe2d-d14c-4b0c-831f-68427c5086b7",
// 				"languages": [
// 					{
// 						"name": "to give something over to another's care",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Billy consigned all of his baseball cards to the Sports Authority Trading Center."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "be1abf25-79b0-4efc-bb91-46c367199c20",
// 		"name": "pernicious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7bfaa272-96f0-4e9e-b4c0-9c87f8e52187",
// 				"languages": [
// 					{
// 						"name": "extremely destructive or harmful",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The pernicious intent of the invaders was made very evident when they drew their swords."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "be3c0569-48df-4c58-bf84-57a4864ee21f",
// 		"name": "nom de guerre",
// 		"contexts": [],
// 		"dictionary": null,
// 		"pronunciation": "/ˌnɒm də ˈɡɛː/",
// 		"definitions": [
// 			{
// 				"id": "2bd2ae17-0d05-4c1a-8035-a380dcf2582b",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "an assumed name under which a person engages in combat or some other activity or enterprise",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Kampfnamen",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "takma ad",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Some gave themselves fierce noms de guerre like ‘Rambo’"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "be4465fd-aff1-4522-8f61-d9019a569770",
// 		"name": "verdant",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c536d0cd-accd-4304-975a-bb49e577cacd",
// 				"languages": [
// 					{
// 						"name": "green in tint or color",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"During late spring, the vales and glens of Westhighland are lush and verdant."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "be644ec0-469d-46ee-ab8f-02b1415c2ace",
// 		"name": "annex",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "241c582d-46d2-4849-8d3f-f162c70572b3",
// 				"languages": [
// 					{
// 						"name": "to incorporate a space",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"After lengthy debate and compromise, the United States annexed Alaska, making it our largest state."
// 				]
// 			},
// 			{
// 				"id": "6b7aa738-727f-4174-a406-bad65d4fb5dd",
// 				"languages": [
// 					{
// 						"name": "a space attached to a larger space",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"They have learned to do their studying in a little annex attached to their bedroom."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "be854b51-226b-46ab-9a96-a233238cc3ff",
// 		"name": "inept",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d787c402-b04f-4886-9364-243e557b9e42",
// 				"languages": [
// 					{
// 						"name": "unsuitable or incapable, not qualified",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Carlos demonstrated that he was indeed an inept singer, hitting sour note after sour note in his solo."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "bee18709-53d7-4a29-afb9-d594cae803f4",
// 		"name": "alias",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7743b074-193a-4909-88b4-65a20705a2f0",
// 				"languages": [
// 					{
// 						"name": "a false name or identity",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Samuel tried to sneak into a frat party, using an alias and a fake asInt."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "befa0e3a-2193-48df-a69d-7e222fb93578",
// 		"name": "turgid",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3ae074ff-57b4-40eb-bac8-5243a77f04ca",
// 				"languages": [
// 					{
// 						"name": "swollen, excessively embellished in style or language",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Some young writers attempt to be impressive by using turgid language where none is required."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "bf0e6db3-1d7e-434c-b88e-388e3073b12f",
// 		"name": "profuse",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4a080b0c-313e-4de6-a19a-63e839e1ca2b",
// 				"languages": [
// 					{
// 						"name": "plentiful, abundant",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"After the ten-mile run in the 90 degree heat, the track team was dripping with profuse sweat."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "bf1feeb5-c107-4119-8030-1232fe42c3cf",
// 		"name": "listlessness",
// 		"contexts": [],
// 		"dictionary": null,
// 		"pronunciation": "/ˈlɪstləsnəs/",
// 		"definitions": [
// 			{
// 				"id": "88384229-85e0-4cc7-b4ed-f41a397d7244",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "Lustlosigkeit, Desinteresse",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "ilgisizlik, umursamazlık",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "boredom, weakness, lethargy, exhaustion",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"There was a listlessness in the way he walked, as if he saw no reason for taking one step further"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "bf6e6509-3932-4e6a-a3c2-34d9ef9746b3",
// 		"name": "vigilant",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4cbe7de0-cb1d-4e1a-83ab-b182778ddc9e",
// 				"languages": [
// 					{
// 						"name": "watchful, alert",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The vigilant watchman was on full alert, and saw the invaders as they stepped upon the king's shore."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "bfefe4be-e7c8-40c9-a1a0-8110db739a89",
// 		"name": "convene",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "54a1d03e-96fc-4e87-b4d0-4bd97fe768b3",
// 				"languages": [
// 					{
// 						"name": "to call together",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The council convened to discuss all of the requests for increased funding."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c005bc10-0936-4b15-aead-56944d7c64ad",
// 		"name": "deferential",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "fc3e7397-e0ff-469e-8319-2ea19e7474a5",
// 				"languages": [
// 					{
// 						"name": "showing respect for another's authority",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The captain chose to be deferential, in light of the general's unexpected presence."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c01a8a8e-dcd4-421b-a05e-cfc0cfde8924",
// 		"name": "agriculture",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7bef4655-b62f-437a-b82e-f27e2f0ef6c9",
// 				"languages": [
// 					{
// 						"name": "farming",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"It was a huge step in the progress of civilization when tribesmen turned to agriculture and started to grow their own food."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c07b7ece-7952-42b5-9a37-7a5098a5f273",
// 		"name": "excursion",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b61dd0ef-0d45-4b98-ba3a-e2012bcb5d03",
// 				"languages": [
// 					{
// 						"name": "a trip or outing",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Our class is going on a brief excursion to the John Prince Park, as a reward for the test scores that were much better than expected."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c08b660d-78e4-40ac-b23b-0acf691b6122",
// 		"name": "elated",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ff7bcd52-65e3-40d8-995b-2c525054cbb4",
// 				"languages": [
// 					{
// 						"name": "overjoyed, thrilled",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Marvin was totally elated to find out that his project won first place."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c0d1a94b-b69d-46ab-87e7-42ac4a2609ba",
// 		"name": "malleable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "dcd36d85-e089-4fb7-a456-83dcde52f37e",
// 				"languages": [
// 					{
// 						"name": "capable of being shaped or transformed",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Because young minds are so malleable, even the worst delinquent can be rehabilitated."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c143ab26-ec82-4b55-acd8-de1978c98aff",
// 		"name": "virago",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "387eb973-0ce3-4ed7-8bca-892a018cdcc6",
// 				"languages": [
// 					{
// 						"name": "a shrew, a manly woman; a warrior",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"You stay right where you are, Teddy dearie,\" the virago commanded."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c1704b7a-720c-4db8-93d1-80096a3ddb53",
// 		"name": "implicit",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5a4c25ee-a3b7-4eaa-99f7-a13644a43bf4",
// 				"languages": [
// 					{
// 						"name": "understood but not outwardly obvious; implied",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"There was an implicit message behind Mr. Brookson's well crafted words: get busy, or get out!"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c18b4824-2ba9-4106-872e-042173aa8018",
// 		"name": "hackneyed",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "dd128188-6db7-4e4f-94cb-7ffc103ad56d",
// 				"languages": [
// 					{
// 						"name": "unoriginal, trite",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"After twenty-five straight encores of the new song, though it was beautiful, it became ever so hackneyed."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c1ca53f9-bd95-4acb-9b16-1908c6e59a52",
// 		"name": "sanguine",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e626a8d1-043b-4291-82c9-128677e35642",
// 				"languages": [
// 					{
// 						"name": "optimistic, cheery",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Though I'm not sanguine about the possibility of overnight guests, the thought is not altogether repulsive."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c1e22d36-36f9-4ee4-8a53-3e23532971e9",
// 		"name": "aloof",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b5d0bb19-8d6e-49c1-86e8-bc9adedfd7ef",
// 				"languages": [
// 					{
// 						"name": "reserved, distant",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The brilliant scientist seemed so aloof, when he was preoccupied with astronomical equations."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c20f488b-27ac-4db2-b9cf-f008e2b96fb3",
// 		"name": "pacify",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c0f11fb5-4797-4754-b1dd-619a1e05c98f",
// 				"languages": [
// 					{
// 						"name": "soothing",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Trying to pacify both sides, the mediator proposed many compromises."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c256d68d-8925-4109-aad6-78ebf0879a73",
// 		"name": "amiable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c0bce401-d63d-481e-ac19-ab1ab7bc478e",
// 				"languages": [
// 					{
// 						"name": "friendly",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"An amiable chap, Herbert Billingsworth got along smashingly with everyone he met."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c25bfb1e-7f75-4e06-9c69-399b22e62171",
// 		"name": "ruse",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "23ecf536-af52-4b90-b206-b98b420f8b0e",
// 				"languages": [
// 					{
// 						"name": "a trick",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Clint and Junior used a clever ruse to outwit the grizzly man and his little brother."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c271daa0-8bb5-42dc-9a21-372a491ca8d6",
// 		"name": "quixotic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4836c2e2-3540-459f-aea0-650054e1ab4b",
// 				"languages": [
// 					{
// 						"name": "idealistic, impractical",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The quixotic cartoon fan wrote many letters to Bugs Bunny, asking him about his friend, Daffy Duck."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c2c5b3b8-5cde-4f1c-b0ee-cc6b8012a529",
// 		"name": "fractious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1343f297-3f7e-43c1-a520-d7e24abd1f20",
// 				"languages": [
// 					{
// 						"name": "troublesome or irritable",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The fractious behavior of the fans caused the next game to be cancelled and moved to another venue."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c2da61b9-3098-4829-be14-103af4fd16a5",
// 		"name": "discretion",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2c1849f2-20f7-4094-9d65-03ee8997e2d1",
// 				"languages": [
// 					{
// 						"name": "the quality of being reserved in speech or action; good judgment",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"I will leave it to your discretion as to whether or not to invite the new girl; she seems a bit suspect."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c2df45c3-88ac-4b49-b236-f7b7f8194485",
// 		"name": "neophyte",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a304ad89-5d5a-4131-8d3e-e53d8f31cbd6",
// 				"languages": [
// 					{
// 						"name": "someone who is young or inexperienced",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Though Joel was a neophyte, he handled the emergency with the comportment of a veteran."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c302da81-8721-4ba4-bd9c-5506b0adc544",
// 		"name": "cumulative",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a58da15d-0c2e-4634-bc2b-4d8e4c57e431",
// 				"languages": [
// 					{
// 						"name": "increasing, building upon itself",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The cumulative effect of days upon days of heavy rains was a river that raged beyond its borders."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c32f73c2-de7c-4953-ac7d-f6de39c39d9b",
// 		"name": "surmise",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "94b0aa79-4016-4a04-a360-e5114aded9e2",
// 				"languages": [
// 					{
// 						"name": "to infer with little evidence",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"After hearing Harold's not-so-convincing reasons for being absent, and glancing at his overall work record, I was able to surmise that his absences were indeed habitual."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c3428981-4668-422f-8ca4-a1805761c093",
// 		"name": "cavort",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2e1bb400-c0cc-4d54-a9eb-5a33a9784d00",
// 				"languages": [
// 					{
// 						"name": "to leap about, behave boisterously",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The couple, after several glasses of wedding cheer, cavorted about like silly children."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c3437fe1-ae5a-4549-b6c3-dd49d535361a",
// 		"name": "defamatory",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ccf43fd1-f5a1-4890-ac2c-5d6d48546400",
// 				"languages": [
// 					{
// 						"name": "harmful toward another's reputation",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The defamatory remarks made by the officer were deemed slanderous by all who heard."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c3884509-baf0-46ca-8511-d5d0f2c275c4",
// 		"name": "bring about",
// 		"contexts": [],
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"definitions": [
// 			{
// 				"id": "8a71cdc7-0b69-4d76-8fda-46ecdf199820",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "cause something to happen",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"She brought about a revolution in psychoanalysis.",
// 					"(Nautical) \"He brought the ship about (cause a ship to head in a different direction) in a stylish tack (zigzag course of a ship sailing against the wind)\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c39979d8-90ea-4a49-8922-14b7a99ff359",
// 		"name": "stupefy",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b0225d9f-f575-49db-a1ac-fef76cfda268",
// 				"languages": [
// 					{
// 						"name": "to astonish, make insensible",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Ronica's incredible talents tend to stupefy all who see her, rendering them speechless."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c3c34ba6-c2dc-4cb1-a077-6e2a0f74b41a",
// 		"name": "aggrandize",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3ba94f0d-e861-40b5-ae47-56d85480a504",
// 				"languages": [
// 					{
// 						"name": "to increase or make greater",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Joseph always mentioned the nicknames of his famous friends as a way to aggrandize his personal standing and reputation."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c3e7c7f6-6615-48a5-9ea4-f2cdf20b989f",
// 		"name": "contemporaneous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "798dbef4-1319-4fea-a20c-721d985cfdd5",
// 				"languages": [
// 					{
// 						"name": "existing during the same time",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The Age of Discovery and The Age of Reason existed contemporaneously, each supporting the other."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c404315f-ee0a-4f34-b550-69af4a264fb6",
// 		"name": "indomitable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "30370e52-7f41-4d5f-a014-0bd84edae808",
// 				"languages": [
// 					{
// 						"name": "not capable of being conquered",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The Miami Heat was truly an indomitable team during the 2010 - 2011 season!"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c41436b0-b9f7-4da7-9eb6-1cb4fffeaadf",
// 		"name": "grandiose",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ffeec221-02cf-4712-ab26-0d1cbb608c22",
// 				"languages": [
// 					{
// 						"name": "on a magnificent or exaggerated scale",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The computer company is planning a grandiose celebration replete with lasers and every manner of dazzling device."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c44b8f54-b0e5-4515-8032-bba2118e65b3",
// 		"name": "privation",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "575f98c5-a0ae-49ce-9140-c190196b756a",
// 				"languages": [
// 					{
// 						"name": "lacking basic necessities",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Losing his job added tremendously to his family's privation and pain."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c4ae9c24-00ae-4db1-b45f-b65119e6d3f6",
// 		"name": "coalesce",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2466ba85-ed84-4dab-84ae-ce15af060c77",
// 				"languages": [
// 					{
// 						"name": "to fuse into a whole",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"After several months of therapy, the images in Tom's vision began to coalesce once again on his conscious mind."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c4c89244-b03a-4b0f-8960-3ce419f32f9f",
// 		"name": "tangential",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7e8f2225-180e-4eb6-8e2b-6982d2d999dd",
// 				"languages": [
// 					{
// 						"name": "incidental, peripheral, divergent",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Trying to avoid the direct answers that would expose him, the clever defendant became ever more tangential in his responses."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c5710beb-7196-49d1-a961-2f2c6c8407b7",
// 		"name": "expiate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "818f2577-9acb-44bd-90a7-e4727bc5b4f2",
// 				"languages": [
// 					{
// 						"name": "to make amends for, atone",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"In an attempt to expiate my crime, I offered to wash Mrs. Jones's car every week for a year."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c589cee9-a8c4-4319-b5b7-a4986466417d",
// 		"name": "immutable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c607aee9-7427-44df-98ec-5aa9c1e92502",
// 				"languages": [
// 					{
// 						"name": "not changeable",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The laws of physics are immutable and constant, never able to be changed or altered in the least."
// 				]
// 			},
// 			{
// 				"id": "7deef1a5-928e-4e17-8c3b-6449e480d0c8",
// 				"languages": [
// 					{
// 						"name": "stoic, not susceptible to suffering",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The Eastern philosophies espouse truths that empower one to become immutable."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c5c5db7b-b7da-4f6e-85ef-a0c3bf126ee3",
// 		"name": "delegate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7fd8bdb7-3fdf-4fb0-9d34-b59736720aeb",
// 				"languages": [
// 					{
// 						"name": "to hand over responsibility for something",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The principal delegated the task of finding a new teacher to the department chairman."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c5dd8f40-965e-49cb-8af7-01c9cdc1168c",
// 		"name": "modicum",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9ed696bc-a6aa-4cf6-8488-a64d931d2a6c",
// 				"languages": [
// 					{
// 						"name": "a small amount of something",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Just a modicum of patience will keep a person out of many jams."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c6252b08-78e8-4f83-9edb-37a2604e30b5",
// 		"name": "stolid",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0b701446-249c-4da6-a8f1-dab5d4f8c2ae",
// 				"languages": [
// 					{
// 						"name": "expressing little sensibility, unemotional",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The convicted men stood there, stolid and resigned to his fate."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c653fde6-154a-4745-99a5-0dbd148d76d3",
// 		"name": "trice",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f091f601-2bfe-46c1-869c-95c0c60d705c",
// 				"languages": [
// 					{
// 						"name": "an instant, a short period of time",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"So, in a trice, a third appeared, and met with exactly the same fate."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c672e0d6-d3d8-478d-90f2-6f165a0f8710",
// 		"name": "prurient",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "13d96ade-9a7b-4069-9039-d2ff46f0e9a3",
// 				"languages": [
// 					{
// 						"name": "eliciting or possessing an extraordinary interest in sex",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Thanks to the internet, many adolescents have prurient interests that would flabbergast their parents."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c6745d02-3a6f-404c-a237-02728ae5dff2",
// 		"name": "hypothetical",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "861c639a-044d-419e-8234-6c4840abb2af",
// 				"languages": [
// 					{
// 						"name": "supposed or assumed true, but unproven",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Many times, the hypothetical enters the realm of the real when understanding matures."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c684004d-d873-455e-acdc-16b9919a7cc9",
// 		"name": "whimsical",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bdd2fca3-e16b-4787-bde2-5a23a5e54cab",
// 				"languages": [
// 					{
// 						"name": "fanciful, full of whims",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The whimsical little Annie liked to pretend that she was a beautiful princess, waiting to be rescued from the clutches of the black knight."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c6d87c10-a2ff-423e-9ae8-aed908f50893",
// 		"name": "dispel",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d4568b50-e4dc-48e6-862c-5937678b742b",
// 				"languages": [
// 					{
// 						"name": "to drive away, scatter",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"It's hard to dispel the notions that become a part of you in childhood."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c75e81b5-7629-456f-8171-0b72dc04b671",
// 		"name": "ethereal",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3fd57a53-2216-418c-b66d-660f1f0dcf9f",
// 				"languages": [
// 					{
// 						"name": "heavenly, exceptionally delicate or refined",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The maiden's elegant attire and other-worldly expression struck everyone as somewhat ethereal."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c767e36f-7bce-4dec-b21e-60d4bc6df878",
// 		"name": "renunciation",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b0179465-6da8-4ee7-ba3f-1cdb1a50bd77",
// 				"languages": [
// 					{
// 						"name": "a rejection",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Maximillian's renunciation of his own government left many to wonder about his true allegiance."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c7b7cf9e-d6fb-4894-a629-3522f16b8677",
// 		"name": "gratuitous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d92469a6-b4c6-44d7-8493-280f8adc4ae6",
// 				"languages": [
// 					{
// 						"name": "uncalled for, unwarranted",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Thanks to the gratuitous gestures of total strangers, we were able to collect all that we needed."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c7d7db8d-2a29-497e-a30e-494736a6c997",
// 		"name": "conurbation",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0e2a6371-139c-474b-9d8d-6a4fd30ba875",
// 				"languages": [
// 					{
// 						"name": "a metropolitan area, a region that is predominantly urban",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"the major conurbations of London and Birmingham\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c82d97a7-7d3d-418f-82f0-19e102c05432",
// 		"name": "incumbent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a9366b9b-9c6f-43c3-b2a0-8a6fa5f4f866",
// 				"languages": [
// 					{
// 						"name": "one who holds an office",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"During war time, an incumbent candidate always has an edge on anyone else running."
// 				]
// 			},
// 			{
// 				"id": "63576e21-6a64-42b4-9f62-4457feac088e",
// 				"languages": [
// 					{
// 						"name": "obligatory",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"It's morally incumbent upon all who are financially able to help those who are not!"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c89585b3-fe85-4cd8-ac10-c96019dad265",
// 		"name": "burnish",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c9dd0401-76a3-4333-acdd-9e9eecddeb40",
// 				"languages": [
// 					{
// 						"name": "to polish, shine",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Good swordsmen burnish their blades after every bloody use."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c8b1d0da-4fdf-4abc-a357-76cb45154270",
// 		"name": "tirade",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1fc648fa-3785-442a-bc51-fdac4e7effc0",
// 				"languages": [
// 					{
// 						"name": "a long speech marked by harsh or biting language",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Listening to the boss's tirade about tardiness, every wise employee started to report an hour early every day."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c8e48b68-1559-409b-81ba-d7fe688a8f4a",
// 		"name": "abort",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "018d50b8-77fb-4ad6-9cf8-43cbb7763e13",
// 				"languages": [
// 					{
// 						"name": "to give up on a half-finished project or effort",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"After they ran out of food, the men, attempting to jog around the country, had to abort their task and go home."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c8f11839-9810-418b-b109-d69cfd8ffe1d",
// 		"name": "languid",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "37f41dd8-0399-45a7-b4ff-a626fbcee37c",
// 				"languages": [
// 					{
// 						"name": "sluggish from fatigue or weakness",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Brandon's bout with the flu left him languid and pale."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c8f1cf61-6f0d-4809-814f-e70d4e008e79",
// 		"name": "intimation",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a1c608ca-1482-40bd-8b13-6fd3e0721b06",
// 				"languages": [
// 					{
// 						"name": "an indirect suggestion",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The coach's intimation was that his team would rally and defeat their arch enemy in the end."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c959af4a-a5fe-4020-8d80-4a9945d1d6ca",
// 		"name": "negligent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "60999b2a-e549-42e6-a563-162f920b2e2e",
// 				"languages": [
// 					{
// 						"name": "habitually careless, neglectful",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"At some point, negligent behavior leads to disappointment, if not total ruin."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c9759064-53c8-4a28-a393-40639e17f6d0",
// 		"name": "abject",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c864a155-3979-4cc9-a75c-8fea1f62b760",
// 				"languages": [
// 					{
// 						"name": "wretched, pitiful",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"After losing all her money, Martha fell into abject poverty, having nothing left of value."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c97ad2f0-5f51-4cd5-bc72-89b2003c3834",
// 		"name": "renown",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "232de308-bffe-4eef-a42e-f1cada103204",
// 				"languages": [
// 					{
// 						"name": "honor, acclaim",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Einstein gained even greater renown when the A-Bomb actually worked as forecasted."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c99e6fda-3a9e-4230-adf0-db9f925abdbd",
// 		"name": "caustic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "56f56642-17d3-40a8-9834-1cbce3bb09fc",
// 				"languages": [
// 					{
// 						"name": "bitter, biting, acidic",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The defendant's caustic threats to the jury really sealed his fate."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "c9fe63dd-8b3f-4c6e-9347-577046fea16d",
// 		"name": "limpid",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "06496290-bca9-408e-bb10-22b42ee9807e",
// 				"languages": [
// 					{
// 						"name": "clear, transparent",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The so-called zero-fat skim milk was so limpid, you could see straight through it."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ca082d83-3289-4217-9b19-808bef640a22",
// 		"name": "affront",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2f1ae0a9-c49a-4de1-9cda-178b7ffc93ea",
// 				"languages": [
// 					{
// 						"name": "an insult",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Albert was very touchy, and took any slight word as a major affront to his supposed honor and dignity."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ca40b522-7d75-4ffd-97f9-170e5cccab4c",
// 		"name": "bequeath",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "04489b31-8233-479e-bd96-edb71d13abe7",
// 				"languages": [
// 					{
// 						"name": "to pass on in a will, give or donate legally",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Matthew's father bequeathed all of his incredible wealth to him and his little brother."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "cb1f9d2f-c06e-47b9-a623-a9eba3359be0",
// 		"name": "compliant",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "382558ac-785a-4182-9483-761515af9c24",
// 				"languages": [
// 					{
// 						"name": "ready to adapt oneself to another's wishes",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"New employees feel this overwhelming need to be compliant with every request made of them, even if it's nonsensical."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "cb3114fa-8cb9-4f6f-99f2-ad64aeaebf6a",
// 		"name": "quotidian",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f651d5c2-8f93-40ee-8564-6ee4483600ec",
// 				"languages": [
// 					{
// 						"name": "daily",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Intent on tending to his quotidian chores, Mr. Simon focuses on nothing else."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "cb645109-adab-4312-b1db-4b68812cf14a",
// 		"name": "evince",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "677c1f72-50c5-45d2-b964-675cd84f6be0",
// 				"languages": [
// 					{
// 						"name": "to show, reveal",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The lecturer's endless address evinced his life-long passion for his subject."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "cb820d49-5ee8-4ca4-b93c-e265dbc76ef9",
// 		"name": "candor",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2a5239f0-a0e3-4864-9d0f-8c6f920a8172",
// 				"languages": [
// 					{
// 						"name": "honesty, frankness",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Brenda's candor was a shock to all who heard her speak so freely of theretofore never broached subjects."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "cbe41fe3-8d55-4eb8-8635-eb7f2f07244f",
// 		"name": "impecunious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a92f1630-6184-4d27-a5f6-76e049d369a4",
// 				"languages": [
// 					{
// 						"name": "desperately poor",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"All of the impecunious children sat on the sides of the streets of their impoverished village, searching for but finding no kindness from the passersby."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "cbe5c478-1424-4821-a6ba-eb487c0bd73f",
// 		"name": "contempt",
// 		"dictionary": null,
// 		"pronunciation": "/kənˈtɛm(p)t/",
// 		"contexts": [
// 			"The fact that Q is both omnipotent and deeply interested in Picard is one of the ways that Picard's character is deepened and complicated. Q appears to have contempt for Picard and by implication for humanity itself, but as always with Q things are more than they appear."
// 		],
// 		"definitions": [
// 			{
// 				"id": "2a28b9a0-7398-4202-a4d7-e2515b632a15",
// 				"languages": [
// 					{
// 						"name": "the feeling that someone or something is worthless",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Geringschätzung",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "küçümseme, hor görme",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Pam stared at the girl with total contempt."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "cc073ddd-3261-40fe-9219-f5d8640a6a8f",
// 		"name": "exegesis",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "404101e4-00a9-4575-844a-a67b763410b5",
// 				"languages": [
// 					{
// 						"name": "a critical analysis, an explanation, or interpretation of a passage, phrase, or word",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"the task of biblical exegesis\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "cc48b32d-0338-49ad-ba83-6d093bd35ff1",
// 		"name": "repose",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "26637a97-d446-4e19-8609-fd2c62091231",
// 				"languages": [
// 					{
// 						"name": "to rest, lie down",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The weary traveler stopped in the shade and reposed himself on the ground, leaning against an apple tree."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "cc493040-ec03-4e1e-936f-619c0440e1e2",
// 		"name": "ardor",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4d280d8f-80c3-4520-a102-f992fd63297c",
// 				"languages": [
// 					{
// 						"name": "extreme vigor, energy, enthusiasm",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The ground troops conveyed their intense ardor for battle, as they scraped their swords against the stone pillars."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "cc8682d9-6090-4315-b613-420ed61bac5b",
// 		"name": "sinuous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f0cb912b-e2b1-45ed-ac1d-56cc2af07005",
// 				"languages": [
// 					{
// 						"name": "lithe, serpentine",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"With the sinuous movements of her entire body, the nimble dancer moved like a quiet twisting stream flowing to the ocean."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "cdbe1095-7619-4d64-98d1-a856190affa9",
// 		"name": "perspicacity",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d9b1d58c-d10c-4834-aa19-deaded5593aa",
// 				"languages": [
// 					{
// 						"name": "shrewdness, perceptiveness",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Because of Will's perspicacity, he figured out the problem before it had a chance to grow."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "cddc3488-7c23-4f79-9bb4-022a45ca8d98",
// 		"name": "relegate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "aa045c2c-cd21-4a97-9e49-b4bfe8872f04",
// 				"languages": [
// 					{
// 						"name": "to assign to the proper place",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The experts from the Bureau were quickly relegated to the evidence room."
// 				]
// 			},
// 			{
// 				"id": "2662adb5-1a01-4137-bbed-7695eebbe97e",
// 				"languages": [
// 					{
// 						"name": "to assign to an inferior place",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"After her last debacle, Miriam was relegated to the laundry room to help wash and iron uniforms."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "cdfe6389-b994-47db-9dc4-fa88b1204a73",
// 		"name": "impetuous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2c5bb8da-5508-48c3-b9be-8c677be5a5d3",
// 				"languages": [
// 					{
// 						"name": "rash; hastily done",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Harriet's hasty words were the product of her impetuous nature."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ce102c20-b9e6-48e4-8445-04ecee9a7a68",
// 		"name": "anarchist",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3fcaaa86-e681-49b5-a3bc-a41b89341289",
// 				"languages": [
// 					{
// 						"name": "one who opposes and wants to eliminate all forms of government and law",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"True to the nature of every anarchist, Boris challenged the existence of every kind of government on the planet."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ce935e2b-e703-4448-8eec-83f9998ed966",
// 		"name": "injunction",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ea0a3969-3e01-4848-a556-10cc1890b4f0",
// 				"languages": [
// 					{
// 						"name": "an order of official warning",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Judge Hill issued a temporary injunction to freeze the assets of the criminal suspect until a complete investigation could be conducted."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "cf280e64-6546-4599-ba9f-166ff46fc5ba",
// 		"name": "pittance",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b431111a-d208-4289-800a-a0a9a33e3ceb",
// 				"languages": [
// 					{
// 						"name": "a very small amount, especially relating to money",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The only jobs available to the uneducated pay only a pittance, nothing near what it takes to support a family."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "cf8bb24f-6aae-4ec9-89b4-7e5164f480b9",
// 		"name": "medley",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8649ebd6-e9ce-4d4c-8129-13b40afb9d66",
// 				"languages": [
// 					{
// 						"name": "a mixture of differing things",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"I don't want to hear the 'Man Was Not Meant to Meddle' medley.\" - Tony Stark (Age of Ultron) on whether or not he should develop artificial intelligence."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "cfc6dda6-0521-4c1a-a654-1f4af7c9924f",
// 		"name": "perfidious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "61f79153-cd62-48b3-8b42-e0e431d8e2e9",
// 				"languages": [
// 					{
// 						"name": "disloyal, unfaithful",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Even after he got married, it was hard for the swinging bachelor to give up his perfidious ways."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d0134672-726d-4fa2-9933-0e34a0efcee4",
// 		"name": "spurious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "97af7143-f599-45a5-b26b-2003cfa00a32",
// 				"languages": [
// 					{
// 						"name": "false but designed to seem plausible",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The researcher's evidence was contrived and spurious, seeming to solve genuine problems, but failing during the different-laboratory re-testing stage."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d040bd7a-9834-4fcf-8767-28a7c84a0581",
// 		"name": "laceration",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7ada5d3d-9053-46a7-b282-4519f82dcebf",
// 				"languages": [
// 					{
// 						"name": "a cut, tear",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The accident left everyone with bruises and lacerations from head to foot."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d052fcf6-fc7f-44e9-987d-05b56c69eb8d",
// 		"name": "acute",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "06f89dee-f0c1-49d2-aae8-768072cb16df",
// 				"languages": [
// 					{
// 						"name": "sharp, severe",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Adam could not walk because the pain in his left foot was so acute."
// 				]
// 			},
// 			{
// 				"id": "1644fb97-760d-4fc9-aa97-de8b2853c524",
// 				"languages": [
// 					{
// 						"name": "having keen insight",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Because she was so acute, Lorraine quickly discerned the magician's saw-the- woman-in-half magic trick."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d0c0035c-99ae-49a3-83fa-aa8a2bd0e92e",
// 		"name": "garrulous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ec6602d1-5f1c-4337-9cf7-20fd2e54a16d",
// 				"languages": [
// 					{
// 						"name": "talkative, wordy",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The garrulous gals chatted and gabbed all through the movie, to the great irritation of those who also paid to see and hear it."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d1a54043-4d40-4ae8-8cb0-1094e7ae68b8",
// 		"name": "desecrate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4aa808f9-bc85-445f-b3dc-e05440f7a531",
// 				"languages": [
// 					{
// 						"name": "to violate the sacredness of a thing or place",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The pagan's desecrated the temple by challenging the priests to duals and fist fights."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d1bf37f3-e7e6-42aa-abf5-9c2a90235dea",
// 		"name": "disseminate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "254b5d89-beed-4407-afcf-0217837e1317",
// 				"languages": [
// 					{
// 						"name": "to spread widely",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The teacher gave the papers to the student to disseminate to her classmates."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d1c9e6de-5f9f-49e9-b7cf-91e4e6c0c13f",
// 		"name": "transgress",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "dfac9b5a-b623-4369-9641-9a669ddbed17",
// 				"languages": [
// 					{
// 						"name": "to violate, go over a limit",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"\"Sinners are those who transgress God's laws of righteousness!\" proclaimed the fiery preacher."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d2012461-90eb-4ce0-9709-b04254f74428",
// 		"name": "abdicate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e6fd982b-2ad8-4513-bba8-46e832c5158d",
// 				"languages": [
// 					{
// 						"name": "to give up a position, usually one of great power or authority",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"When King John realized that his enemies would ultimately win, he abdicated his throne and hid himself away."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d2316482-2510-43a4-954a-8b761ecaf345",
// 		"name": "artisan",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9ee88b90-7e4f-4e20-8cf8-edc5fa2f1d42",
// 				"languages": [
// 					{
// 						"name": "a craftsman",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The artisans of ancient Greece fashioned chests and cabinets fit for the king's palace."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d25a9622-b7a2-47fc-a3c0-6d6468859bb4",
// 		"name": "parsimony",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5e282043-303d-46bd-9f8b-551983b70254",
// 				"languages": [
// 					{
// 						"name": "frugality, stinginess",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The old miser's parsimony caused him to choose to eat cat food instead of steak."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d28a846e-3cc5-483b-a885-fa8f9fb467f1",
// 		"name": "connive",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ef1b2b78-cce4-4bad-bbe5-b7dc205ba005",
// 				"languages": [
// 					{
// 						"name": "to plot, scheme",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Josephine connived her way into the heart of the boss, intent on wielding influence."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d2b1098d-484c-46c3-a776-7c96f040331e",
// 		"name": "travesty",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "abcab518-b172-4d1a-96f9-c7e1448722f0",
// 				"languages": [
// 					{
// 						"name": "a grossly inferior imitation",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"That verdict was nothing short of a travesty of justice!\" screamed the defense attorney."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d2bf109d-a24e-473c-bb76-42909b2fbefa",
// 		"name": "deliberate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "eef8f879-2eea-4cb0-910f-ea2c265b1088",
// 				"languages": [
// 					{
// 						"name": "intentional, reflecting careful consideration",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Though Martha made a deliberate attempt to calm the situation, tempers yet burned."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d3316669-8735-4699-838f-cfab4cf26cfa",
// 		"name": "disrepute",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "05c84eb2-33ad-401a-bc46-532896862aca",
// 				"languages": [
// 					{
// 						"name": "a state of being held in low regard",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Bad behavior, even if it's just intermittent, will cause one to fall into disrepute."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d356b620-ed79-440d-a305-bc5657c5b4cd",
// 		"name": "due to",
// 		"contexts": [],
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"definitions": [
// 			{
// 				"id": "72020d5d-4160-4b31-8a30-c291c6189d2a",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "because of",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"More young men are joining the navy and air force than the army and marines due to PTSD and mistreatment."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d39c6563-4bcf-4011-afa4-769c9868e623",
// 		"name": "atavism",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ea734718-5295-4edc-b116-37ec7f9e662f",
// 				"languages": [
// 					{
// 						"name": "reversion to an earlier type; throwback.",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"I used the word 'atavism' to mean a reversion to the primitive."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d3a82613-969d-44c4-96d9-a02df6effbab",
// 		"name": "comprehensive",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5ad90af8-10e2-4672-a367-56c5b9d2796f",
// 				"languages": [
// 					{
// 						"name": "including everything",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"My accountant did a comprehensive assessment of my finances and found that my spending had to be curtailed."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d3e01123-fd28-4d07-9621-0ec3886dfa14",
// 		"name": "disheartened",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e2d209f4-28b7-4399-beb8-708b8de7201b",
// 				"languages": [
// 					{
// 						"name": "feeling a loss of spirit or morale",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The team became sorely disheartened when the other team scored five runs in a row."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d3efd819-b8d3-4abc-bf7e-f172b19e4659",
// 		"name": "moderate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c180b46f-11ad-455e-ad16-a67814de474d",
// 				"languages": [
// 					{
// 						"name": "not extreme",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The damage was deemed moderate by the adjustor, giving the owners much less than they expected."
// 				]
// 			},
// 			{
// 				"id": "9852039e-8603-452c-bd89-d080411bedac",
// 				"languages": [
// 					{
// 						"name": "one who expresses moderate opinions",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"I consider myself a moderate, especially when it comes to social help networks."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d3f40a1e-3f60-4dc9-be82-74538425186d",
// 		"name": "amorous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "dec0a824-77e6-42aa-9e36-b45bf4ecccd7",
// 				"languages": [
// 					{
// 						"name": "showing love, particularly affectionate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Ray saw Pam wearing her slinky red dress; his amorous heart began to palpitate out of control."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d42dbc93-a08e-4f87-9f90-5b2ad7c67c5c",
// 		"name": "immerse",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8932cb15-077d-4922-8eab-50566797f06e",
// 				"languages": [
// 					{
// 						"name": "to absorb, deeply involve, engross",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"To master a foreign tongue, one must immerse oneself in it for an extended period of time."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d44a071e-f85c-478d-8494-e5a4cd33bb28",
// 		"name": "onerous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c08648dd-46fe-4d0a-a855-21851be1351c",
// 				"languages": [
// 					{
// 						"name": "burdensome",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Having to clean the stables alone is an onerous chore that no one wants to do."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d4e136ff-2f05-477a-89dc-2d280b169762",
// 		"name": "hapless",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8e0e7efb-41e2-48fd-9938-cbc22aed3f7e",
// 				"languages": [
// 					{
// 						"name": "unlucky",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The hapless Red Raiders lost every one of their games this year by an embarrassing margin."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d4feb89b-bcf6-4f13-a583-fc8b2610d537",
// 		"name": "sensuous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0ce5aadb-edc0-41c4-93e3-404e2423048d",
// 				"languages": [
// 					{
// 						"name": "involving sensory gratification",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"For Bobby and Jean, holding hands turned out to be more of a sensuous experience than either of them had thought."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d608c98b-4c6c-4795-873f-2c6913707cb9",
// 		"name": "efface",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "664ae430-f536-4724-87d3-86b59d0861c9",
// 				"languages": [
// 					{
// 						"name": "to wipe out, obliterate, rub away",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Because the letter was offensive to all who read it, every word of it was effaced."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d6208357-815a-4db1-8c68-8509235a5ba0",
// 		"name": "etymology",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d21f9704-51c2-488d-b108-be67fc61574b",
// 				"languages": [
// 					{
// 						"name": "the history of words, their origin and development",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"From my study of the etymology of terms, I now know that the word \"Herculean\" derives from the Greek myth of Hercules, the son of Zeus."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d6c52b85-dd38-4aaf-ab6d-08a6304a8636",
// 		"name": "induce",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "29fe00f5-66de-48f6-9c73-f0db7c4c81aa",
// 				"languages": [
// 					{
// 						"name": "to bring about, stimulate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The doctor said, \"Don't induce vomiting; just drink plenty of water.\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d6e5daa3-83ba-42f0-9b34-5175ff26ecf7",
// 		"name": "conduit",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "66884804-443d-4ecd-95cc-140a31f82d83",
// 				"languages": [
// 					{
// 						"name": "a pipe or channel through which something passes",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The water flowed through the conduit into the nearby canal."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d70e9006-9b39-4211-b0ad-b0f65fb98d88",
// 		"name": "serene",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5630117f-e713-47f9-82c0-7d69892929e0",
// 				"languages": [
// 					{
// 						"name": "calm, untroubled",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The late night beach is one of the most serene places on the planet, especially when the seas are calm."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d77c9311-23f6-40a7-92b8-98dfbdfd1b3e",
// 		"name": "handsel",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d92ce841-c530-4259-ad1e-e461891b1e31",
// 				"languages": [
// 					{
// 						"name": "a gift given to wish one good luck for a new year or a new business; the first money received by a new business",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"She gave little handsels to her houseguests on New Year's Day"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d78b41bb-a975-46e8-83e9-c4617b844cc5",
// 		"name": "lethargic",
// 		"dictionary": null,
// 		"pronunciation": "/lɪˈθɑːdʒɪk/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "71ac5bad-cfb3-4c48-bc28-fbc4ab2357f9",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "in a state of sluggishness or apathy",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "träge, stumpf; schlafsüchtig",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "uyku halinde, uyuşuk",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The summer sun in Florida will make even the zestiest exerciser fell lethargic and tired."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d8057809-051d-49c4-bf3c-cbb5b645e5fa",
// 		"name": "exorbitant",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "55b7a7ba-fb6f-4e11-b369-9ab1d4c2179b",
// 				"languages": [
// 					{
// 						"name": "excessive",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"It's never good to criticize anyone exorbitantly, even if they did something for which they should be ashamed."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d82e6fe7-019d-45a2-83dd-074ee7e01805",
// 		"name": "myriad",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3fd7f4de-0860-430a-aade-89b6c645a8dc",
// 				"languages": [
// 					{
// 						"name": "consisting of a very great number",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"There are myriad things to do on an ocean cruise, unless, of course you are a land lover."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d8377b59-d691-4efc-9213-f572fdcbae9a",
// 		"name": "combustion",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6972acdc-3d4b-431b-b96d-58992507ee26",
// 				"languages": [
// 					{
// 						"name": "the act or process of burning",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Combustion engines must have fuel that will ignite and burn with the least spark."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d8501136-d95b-4fc2-81aa-01139a6457ad",
// 		"name": "brusque",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bfc5d9d6-a380-460e-b4c3-9d3f0db2efec",
// 				"languages": [
// 					{
// 						"name": "short, abrupt, dismissive",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The bushman's brusque manners offended the hostess to no end."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d86a9d05-9905-455f-b312-120f3bb9c6e2",
// 		"name": "fabricate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9a3eab7f-d432-4984-a06d-b82f15eb169c",
// 				"languages": [
// 					{
// 						"name": "to make up, invent",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"I don't know why Elvin felt the need to fabricate some wild story; the truth would have served just as well."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d88834e8-4a77-4feb-9873-4e56eff49307",
// 		"name": "obtuse",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2b02ac80-703a-4dbb-9fe9-283c7fee1430",
// 				"languages": [
// 					{
// 						"name": "lacking quickness of sensibility or intellect",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The obtuse ball players thought nothing of exchanging insults with the opposing team."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d8ab7f13-bccc-4647-9993-cbdb912da153",
// 		"name": "luminous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "cd51d3a8-333c-4473-8b29-9121e56aae18",
// 				"languages": [
// 					{
// 						"name": "brightly shining",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The light from the luminous object made night seem just like day."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d927585c-aa86-4cbf-bda1-86ce130b6ac9",
// 		"name": "manifold",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "64bdca8a-2a34-4965-982c-d15c707e2e83",
// 				"languages": [
// 					{
// 						"name": "diverse, varied",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"I have manifold reasons for not going; I just mentioned to you the most obvious ones."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d93ecd87-3f71-424a-b4f2-116491b18fc3",
// 		"name": "sobriety",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "34f14fd2-9bd0-4227-85ac-2274ba112b78",
// 				"languages": [
// 					{
// 						"name": "sedate, calm",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Failing his at-the-scene sobriety test, poor Nicholas spent yet another night in jail."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d96b19de-3fb3-4a5d-b327-e03acfb030c8",
// 		"name": "tortuous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a93c3857-4831-44d0-9f52-40f9aa77ed02",
// 				"languages": [
// 					{
// 						"name": "winding",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The tortuous streets help to keep the speeders under 50 mph, which is a good thing."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d99f08c4-166b-43eb-9500-5adcd00e3da8",
// 		"name": "presumptuous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6896f5ac-871e-4661-b97e-e9c188de561a",
// 				"languages": [
// 					{
// 						"name": "disrespectfully bold",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Clyde, being the presumptuous lad that he was, went to pick up his prom date and found her already gone with someone else."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d9b256f0-36fc-43e4-96c0-c4bb73b7b552",
// 		"name": "scrupulous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4e04554d-7a4b-4205-aec6-802cd80d9139",
// 				"languages": [
// 					{
// 						"name": "painstaking, careful in conduct or manner",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Because Karen was so scrupulous, she refused to take the thousand dollars that she found and turned in the police that they in turn returned to her."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d9ccd264-259a-4762-a795-c4718cc53eed",
// 		"name": "poignant",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ae2e1a43-7a54-4590-a203-010af5765161",
// 				"languages": [
// 					{
// 						"name": "deeply affecting, moving",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The message of that movie was quite poignant, causing the audience to think and re- think their own values."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "d9e025b7-cb53-4662-a20c-11b90cd66a17",
// 		"name": "tome",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "85504817-4f8a-486d-b787-3d305374537e",
// 				"languages": [
// 					{
// 						"name": "a large and heavy book; an important book or work of scholarship",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"And when you've completed your tome, hopefully it will show up on the bestseller table at the Strand."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "da2af06c-7158-4e3b-85ee-c4501416e0d9",
// 		"name": "incipient",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ea25e670-597d-440e-9753-cd6245891992",
// 				"languages": [
// 					{
// 						"name": "beginning to exist or appear",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"\"he could feel incipient anger building up\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "da899691-d130-4da1-bc59-1758eb05f026",
// 		"name": "quell",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7be7f52c-5d87-4332-9061-0dc6b3007c5f",
// 				"languages": [
// 					{
// 						"name": "to control or diffuse a potentially explosive situation",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"To quell the violence in the streets, the National Guard had to be called in."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "da8de71a-0cc2-4fc0-a7b3-f28beb4d4412",
// 		"name": "nocturnal",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "fb70ad3a-ef24-454f-9f35-641b99d99d81",
// 				"languages": [
// 					{
// 						"name": "relating to or occurring during the night",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Because bats are nocturnal creatures, they live for the moon."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "daa530c1-ee20-48d3-b0bc-fc586fabddec",
// 		"name": "requisition",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2b2640da-184e-4ed0-a7f1-f2e178fb0757",
// 				"languages": [
// 					{
// 						"name": "a demand for goods, usually made by an authority",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The requisition came in on time; however, several items were listed as back-ordered."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "db0d8844-d6f5-4f64-acab-f48b7d0e7b45",
// 		"name": "demean",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9f30f331-c6f0-42b0-8f8c-6a3a03e32c25",
// 				"languages": [
// 					{
// 						"name": "to lower the status or stature of something",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The coach refused to demean his players by blaming them for the lost."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "db0ec82c-df56-4ee9-bea1-1283e225ace7",
// 		"name": "pugnacious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "769c89c0-2faf-4539-9bbf-f22d2d232abc",
// 				"languages": [
// 					{
// 						"name": "quarrelsome, combative",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Pit bulls are infamous for their pugnacious dispositions, fighting anything at any time."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "db153d7d-0a6e-4fd5-9022-fa1eb509b557",
// 		"name": "numismatics",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8d445534-7088-4965-8f2a-7d0bac4896d3",
// 				"languages": [
// 					{
// 						"name": "the study or collection of coins or currency",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Take my case; I was seventeen when I began to take an interest in numismatics and started collecting coins."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "db7d6239-0eae-41d8-b427-f9678f6224a8",
// 		"name": "vestige",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a3b1e0d1-b03f-4118-b70f-74e75fcd4710",
// 				"languages": [
// 					{
// 						"name": "a mark or trace of something lost or vanished",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The annihilation was absolute, leaving not a vestige of that ancient civilization."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "dbba5cbf-d0f7-4951-a2b6-31ce70ecd7a6",
// 		"name": "defer",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "92a052bb-6b70-49e9-b930-f36664ae3d20",
// 				"languages": [
// 					{
// 						"name": "to postpone something; to yield to another's wisdom",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Due to a bout with strep throat, the opera singer chose to defer all of his engagements."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "dbdff1c0-7271-4124-84c0-23e61193eba4",
// 		"name": "detail",
// 		"contexts": [],
// 		"dictionary": null,
// 		"pronunciation": "/ˈdiːteɪl/",
// 		"definitions": [
// 			{
// 				"id": "dd41177e-5030-4903-b042-7a77209067dc",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "a specific group of people assigned to a particular task or duty",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The president's security detail"
// 				]
// 			},
// 			{
// 				"id": "ca740576-68d3-4099-9e49-c00867ebf3e6",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "abkommandieren",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "özel göreve vermek",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "send on a mission",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The ships were detailed to keep watch"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "dc04b813-350b-4d4f-b312-52e90f910005",
// 		"name": "anguish",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9f0b053d-d6ba-4aeb-9fac-85bb756f67d8",
// 				"languages": [
// 					{
// 						"name": "extreme sadness, torment",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Beatrice went through awful anguish when she was first confronted with the truth of her condition."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "dc136bbb-77ba-4c80-a0b3-cfbb9100b587",
// 		"name": "homunculus",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8fa6ddb6-a450-46dd-be47-8592703547db",
// 				"languages": [
// 					{
// 						"name": "an artificially made dwarf, supposedly produced in a flask by an alchemist; a tiny human believed by early biologists to live in a sperm cell",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"This alchemist is said to have created an homunculus which became so troublesome that it had to be incarcerated."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "dc3c5ab0-507c-4510-a2e8-e1652cbb891a",
// 		"name": "juxtapose",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1764e1e3-044e-480d-b08c-852d6546548d",
// 				"languages": [
// 					{
// 						"name": "to place two things beside each other for the sake of implicit comparison",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The clever detective saw the subtle difference after juxtaposing the two photographs."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "dc67ec1f-2871-4931-8682-466ad3bc6f33",
// 		"name": "cherish",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1a6f0fd6-1e54-4438-bc2a-28987c6f9b83",
// 				"languages": [
// 					{
// 						"name": "to feel or show deep affection toward something",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"I cherish those things that are dear to me and that will never leave me."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "dc68f17a-6735-4479-8eea-cab31d0a8ef9",
// 		"name": "constrain",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0d53a643-bdfc-4062-88ca-8095363c140c",
// 				"languages": [
// 					{
// 						"name": "to forcibly restrict",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"I'm constrained by my belief in peace to simply walk away from an opportunity to battle."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "dc6bf18c-99dd-41b4-97bd-2512589e8c9a",
// 		"name": "dynamic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ca758651-a600-42d3-8570-0e19d9f9aaa6",
// 				"languages": [
// 					{
// 						"name": "actively changing; powerful",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Learning, according to educators, is a dynamic process that must be seen and understood in that light."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "dc90ae30-5881-4f74-b45f-85e22ee63894",
// 		"name": "interject",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a731c2fa-51ef-4652-be83-fcba40c1c16b",
// 				"languages": [
// 					{
// 						"name": "to insert between other things",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Please allow me to interject one other idea before our final conclusion is reached."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "dc9b063a-19e7-4f68-827b-ddc3125903eb",
// 		"name": "plethora",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9758bc70-6099-495c-8461-7cdadd66f311",
// 				"languages": [
// 					{
// 						"name": "an abundance, excess",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"There are a plethora of reasons why we should all tell the truth; all of them, however, eluded me that day."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "dd8cc551-682a-4808-83df-19afc8ba4575",
// 		"name": "acerbic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "86e3b274-9f02-4980-bbaf-5f20b9910564",
// 				"languages": [
// 					{
// 						"name": "biting, bitter in tone or taste",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Jack became intensely acerbic and began to cruelly and vindictively make fun of all his buddies."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ddb0d30f-ad25-413d-906b-d58b1f424c3f",
// 		"name": "debase",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c3dcf570-e6d2-4175-8801-5d78a18b6281",
// 				"languages": [
// 					{
// 						"name": "to lower the quality or esteem of something",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"To bolster his profits, the Cookie King chose to debase the quality of his ingredients, thereby lowering his costs."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ddd07370-2565-4533-80ab-d00581a767cc",
// 		"name": "judicious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1166325e-c5f2-49a1-a347-b9b2ee8bf75d",
// 				"languages": [
// 					{
// 						"name": "having or exercising sound judgment",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Spending your grocery money on a quick trip to the casino is not very judicious at all."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "de0e309a-64df-4bbb-a27e-4de0f89d8193",
// 		"name": "acclaim",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2ed722d3-42bd-4a4e-8856-0b0750a65fa1",
// 				"languages": [
// 					{
// 						"name": "high praise",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Greg's excellent short story won great acclaim from the literary community."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "de297c02-87c4-453a-917f-04fe55032f82",
// 		"name": "efficacious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6133fdca-b3d4-4232-9767-af0310351a65",
// 				"languages": [
// 					{
// 						"name": "effective",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The compound proved to be quite efficacious; every patient recovered almost instantly."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "debce48c-d424-4e3e-84f0-ae597145bb17",
// 		"name": "timorous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "35c610b4-1cbd-48dc-818f-78e41565be65",
// 				"languages": [
// 					{
// 						"name": "timid, fearful",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Marcus, being the timorous lad that he is, imagined himself asking Linda out, but never found the boldness to actually do it."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "df05bfe9-9ff3-44f7-89ce-182192269812",
// 		"name": "elicit",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c8f86d5b-ce28-47a0-be2b-c30fa15950fd",
// 				"languages": [
// 					{
// 						"name": "to bring forth, draw out, evoke",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Pearson's melancholy tale was designed to elicit sympathy from all who heard it."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "df0e7ac2-342b-492e-bd15-771fb8a2124c",
// 		"name": "conflagration",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a6a07977-bd03-4a10-a5e0-88a96c4daf91",
// 				"languages": [
// 					{
// 						"name": "great fire",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The great conflagration consumed the entire city of San Francisco in 1850."
// 				]
// 			},
// 			{
// 				"id": "9d03f114-c804-4218-977a-348737865186",
// 				"languages": [
// 					{
// 						"name": "conflict, war",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The treaty is the latest attempt to resolve the ten-year conflagration."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "df1a033b-8ef4-49b9-9076-5b9310680bc4",
// 		"name": "adhere",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2f091ada-63a2-4a3c-8630-282f9f391904",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "stick to, cling to",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "yapışmak",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "haften",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"We adhered to our plan; for, desperation had set in, robbing us of our waywardness.",
// 					"Paint won't adhere well to a greasy surface"
// 				]
// 			},
// 			{
// 				"id": "1e513c47-33c4-4afb-ab50-a279c8e9a2d9",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "be devoted to (an idea, group, etc.)",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "sich (einer Meinung, Gruppe) anschliessen",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "katılmak",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"Henry adhered to the dictates of his religion without any question or shade of doubt.",
// 					"Mike does not adhere to any organized religion."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "df334158-0d95-489f-ae21-c2e644cd995c",
// 		"name": "culmination",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "28320763-e2a5-4849-8e0f-45b22ca9a343",
// 				"languages": [
// 					{
// 						"name": "the climax toward which something progresses",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The culmination of all our efforts, we hope, will be the installing of a person we can all respect and admire."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "df3355ff-1b3f-45c2-afd6-7b169fa3a956",
// 		"name": "reprieve",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "dbdbf699-fbf0-4e53-a16a-7b0d4ffc84d9",
// 				"languages": [
// 					{
// 						"name": "a temporary delay of punishment",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The governor granted a reprieve to the convict, citing an incident that happened during his incarceration."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "df3ba01e-c766-4738-85d8-a0937b593b05",
// 		"name": "pretense",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "543ff6ec-1b14-41ee-9697-de5a44232bf4",
// 				"languages": [
// 					{
// 						"name": "an appearance or action intended to deceive",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"His anguish over her death was but a pretense, a ruse to suggest his own innocence."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "df8da932-926f-4176-9e49-9446f2ca0924",
// 		"name": "buttress",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "aa743026-3e92-4dc0-9a5a-9319fffb9403",
// 				"languages": [
// 					{
// 						"name": "to support, hold up",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The column was reinforced so that it could buttress the roof of the building."
// 				]
// 			},
// 			{
// 				"id": "ffbe3178-7efa-4192-9a7e-9e15fd4651fa",
// 				"languages": [
// 					{
// 						"name": "something that offers support",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"A solid granite buttress supports the entire structure with no help needed."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e016fef8-f4bb-427d-8f0d-afab5f110fee",
// 		"name": "cognizant",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "cd2a237a-a5cb-4d59-a7d2-bcdf6e0bbc10",
// 				"languages": [
// 					{
// 						"name": "aware, mindful",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Being fully cognizant of all the rules, the misguided teen still slipped out of his room after midnight."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e0200cfb-1ac5-440d-b259-5e714b984b3c",
// 		"name": "invective",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c9bf8260-8a00-4260-8e4b-6741fbfa8323",
// 				"languages": [
// 					{
// 						"name": "an angry verbal attack",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The officer's use of invectives against an insolent, very drunk driver earned him a reprimand."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e0a9287a-355c-41ee-8d12-8b90429d8e96",
// 		"name": "coerce",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e72ea2b7-0e8e-484b-bcb2-ea1366592e70",
// 				"languages": [
// 					{
// 						"name": "to make somebody do something by force or threat",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The defense team charged the prosecutors with trying to coerce witnesses into lying."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e10b20af-baf8-4cd4-b5bb-3e5bfbca3068",
// 		"name": "confluence",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "854caf1a-c2b9-4b9c-b569-62131160d8e7",
// 				"languages": [
// 					{
// 						"name": "a gathering together",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"A confluence of all three rivers met to form the incredible ocean of water that you see."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e1307172-a956-4e6f-b493-9cd2a615c9d6",
// 		"name": "chaos",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bc1c63e4-1dc7-4c83-84d7-a9ab6a1be57f",
// 				"languages": [
// 					{
// 						"name": "absolute disorder",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"When the announcement was made, utter chaos broke out in the hallways."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e14531eb-77b4-4794-acf7-752572212b19",
// 		"name": "crepuscular",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9b3e393e-2f46-4b74-83ea-28ea99accfce",
// 				"languages": [
// 					{
// 						"name": "of or like twilight, dim; active during twilight (zoological)",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"It is blended twilight of intellect and sensation; it is the crepuscular of thought."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e18667cb-2bdc-454b-8688-559d38d3a7db",
// 		"name": "martinet",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b5325fbd-5613-4f8c-a5db-f7c32348dbcf",
// 				"languages": [
// 					{
// 						"name": "an officer who is a strict military disciplinarian; one who is a stickler for rigid adherence to rules",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Schiano, the former coach at Rutgers, brought a reputation with him as a harsh disciplinarian and a martinet."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e20be906-0859-4fd7-85b0-7ec5d2b046f3",
// 		"name": "embellish",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7e169c9f-f6bf-4ce7-84ff-f92903f0612c",
// 				"languages": [
// 					{
// 						"name": "to decorate, adorn",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The last chore on Christmas Eve is to embellish the spruce pines with ribbons and bows."
// 				]
// 			},
// 			{
// 				"id": "b1a71183-01a5-448c-b16c-aa282e1ecb69",
// 				"languages": [
// 					{
// 						"name": "to add details to, enhance",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The talented speaker embellished his argument with quaint expressions that suggested he was just a regular guy running for office."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e2238677-45ea-45c5-ae41-f62ab311e84b",
// 		"name": "implacable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "54bfea59-7b6e-4f71-a56a-c2365f9a08b7",
// 				"languages": [
// 					{
// 						"name": "incapable of being appeased or mitigated",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The combatants were so betaken by their bloodlust, each was altogether implacable."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e26d8b23-7451-4424-8725-5018e8aa3a57",
// 		"name": "impregnable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "854bd85d-1a55-41d9-b5b8-5260835278aa",
// 				"languages": [
// 					{
// 						"name": "resistant to capture or penetration",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Fort Lang was thought to be impregnable, until an enemy tank bulldozed through its stone gate."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e2851e4d-4417-4b8e-b66e-49788e76e400",
// 		"name": "truculent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e6e79a78-fa25-47fd-92e5-97dfe1d304fc",
// 				"languages": [
// 					{
// 						"name": "ready to fight, cruel",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Boxing, more-so than most other sports, is a test of truculent prowess."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e2853ab3-34bd-42f7-98b0-2f87a27d3fe1",
// 		"name": "sagacity",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8a39597d-80f2-49de-9e9e-846c4eae406e",
// 				"languages": [
// 					{
// 						"name": "shrewdness, soundness of perspective",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"With the sagacity of Holmes himself, the junior detective read the clues and solved the crime."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e28aa8eb-0597-4aa8-9c07-e963311f88e4",
// 		"name": "venerable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b3356768-2baf-4410-a8eb-19caa41fdd3c",
// 				"languages": [
// 					{
// 						"name": "deserving of respect because of age or achievement",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The professor emeritus was a venerable scholar; everyone listened to his every word."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e2bc1864-f89f-4b45-9fce-a8be05e6adfb",
// 		"name": "equipoise",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "742bfc78-deca-4e62-b663-b585e4d05bd8",
// 				"languages": [
// 					{
// 						"name": "equal in weight or relationship; equilibrium; a counterbalance",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The balance or equipoise of parts in the human body is of two sorts, viz."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e3331a5c-5544-43c6-b553-a8d8827eeab1",
// 		"name": "anthology",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "180e6a79-4490-497a-ab95-febbd5002307",
// 				"languages": [
// 					{
// 						"name": "a selected collection of writings, songs, et",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The new anthology of Smokey Robinson songs is now available at a store near you!"
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e335f25b-ca73-46e4-b6fc-2388be3d4253",
// 		"name": "trite",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "73589088-078c-481a-a5b3-09f91b69898c",
// 				"languages": [
// 					{
// 						"name": "not original, overused",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Every knock-knock joke should be banned from use and considered trite by all serious comedians."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e35d85ca-82c3-4397-afc1-fb3a813af66f",
// 		"name": "desolate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b539d756-6f58-4b2a-b6c2-18fe26fcd2e4",
// 				"languages": [
// 					{
// 						"name": "deserted, dreary, lifeless",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The desert, especially at night, seems to be the most desolate place on earth."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e3621c4e-9d40-418e-8423-1f380968fbf0",
// 		"name": "insular",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "78e5604e-7868-4286-ab3e-1957d53d2608",
// 				"languages": [
// 					{
// 						"name": "separated and narrow-minded; tight-knit, closed off",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Sometimes, insular communities adopt habits of mind that blind them to the concepts embraced by society at large."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e3645350-4628-45b5-9d1b-df62729098ad",
// 		"name": "daunting",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0175ac1a-3044-4d61-9306-db8ccb269d4a",
// 				"languages": [
// 					{
// 						"name": "intimidating, causing one to lose courage",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"After a month, Kevin found cutting his grass and his sick neighbor's a daunting task."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e37c334f-09d5-49d0-874a-cf506cfadf92",
// 		"name": "discern",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f4f9e12d-8b91-45eb-af51-fe3a9a848112",
// 				"languages": [
// 					{
// 						"name": "to perceive, detect",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"It is extremely difficult to discern subtle messages when they are contained in foreign tongues."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e3f2da01-2fe5-45c4-b885-aae314637054",
// 		"name": "circumvent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8c8f6b33-653f-481c-b3a5-abe44d7150a4",
// 				"languages": [
// 					{
// 						"name": "to go around an established route or authority",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"To circumvent the teacher's no-talk rule, the students pretended to clear their throats constantly."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e421733c-f447-48e1-9cf7-4aad780d7164",
// 		"name": "abide",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "232762c6-70b3-49d6-afed-9ef15b0f2cad",
// 				"languages": [
// 					{
// 						"name": "to put up with",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Normally, Chuck would never abide such conduct; but, decided to this time because of the strain the girls have been under recently."
// 				]
// 			},
// 			{
// 				"id": "524e848f-763c-4bba-99e2-bb0cf11281d0",
// 				"languages": [
// 					{
// 						"name": "to remain",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Despite the beating they've taken from the weather throughout the ages, the grandest of all the mountain chains, the mighty Rockies, yet abide."
// 				]
// 			},
// 			{
// 				"id": "f86d881f-255c-4588-be55-4cf93016437c",
// 				"languages": [
// 					{
// 						"name": "accept or act in accordance with (a rule, decision, or recommendation)",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The one thing that distinguishes 'Law Abiding Citizen' from similar films in the genre is that it's not afraid to have a deeply troubled, possibly even psychotic, character at its core."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e48cb78a-7f57-42bd-a15f-ba98a9629264",
// 		"name": "meritorious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "44320bc2-c009-4768-b3f1-45b18bae012d",
// 				"languages": [
// 					{
// 						"name": "worthy of esteem or reward",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Bernice's meritorious gesture was hailed by all as the perfect peace-making move."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e4db1ec9-ba40-467c-8a28-b4ed4e711531",
// 		"name": "lenient",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ddc3db3e-263b-4876-a0d7-1e497a73c5a7",
// 				"languages": [
// 					{
// 						"name": "demonstrating tolerance or gentleness",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Judge merciless chose not to be lenient in the least with the ten-time offender."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e5152328-3135-4121-b780-492a24e954ae",
// 		"name": "empirical",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7dbc5eb5-ffbb-4df1-a444-6197e31cfa15",
// 				"languages": [
// 					{
// 						"name": "based on observation or experience",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The scientist gathered empirical data to prove that his predictions weren't baseless."
// 				]
// 			},
// 			{
// 				"id": "3ca10910-7783-434e-a994-cd484e7224fd",
// 				"languages": [
// 					{
// 						"name": "capable of being proved or disproved by experiment",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Every word Einstein spoke was considered empirical; for the experimental proof was on the table."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e51b4c59-3a23-4c3b-abcb-4f82792d972e",
// 		"name": "mollycoddle",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4a001a76-5163-44ee-8d84-4e35c399d777",
// 				"languages": [
// 					{
// 						"name": "to overindulge or pamper",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"\"I found school very difficult, and realized I'd been mollycoddled at home\""
// 				]
// 			},
// 			{
// 				"id": "8c60f7f0-6ccf-4ca9-bef1-4edde54bb9ed",
// 				"languages": [
// 					{
// 						"name": "an effeminate boy",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"baseball is a game for red-blooded men and mollycoddles better stay out of it\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e56b2a4a-f08a-4de8-a86d-721e4ee042f0",
// 		"name": "conundrum",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "120df1b6-603b-4a98-ac2e-389b96319d95",
// 				"languages": [
// 					{
// 						"name": "puzzle, problem",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The thunderstorm and the deadline in tandem created a conundrum for the hikers."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e58cc2e1-f913-40dc-81fc-f48f15901c83",
// 		"name": "arboreal",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "005a0460-70e6-4a86-bb96-1f5552bb55fd",
// 				"languages": [
// 					{
// 						"name": "of or relating to trees",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Arboreal creatures live in the trees of every country on Earth."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e59606c7-1c51-44db-9271-a04ed7478174",
// 		"name": "reproach",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3a1c8a3d-df97-4479-adab-b805b41964ab",
// 				"languages": [
// 					{
// 						"name": "to scold, disapprove",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The teacher was reproached by her principal for showing improper movies to her class."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e5aec41a-f620-472e-8405-e6b5a7792721",
// 		"name": "revoke",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "98879af4-4372-4f9c-b05f-e1d6aae86cde",
// 				"languages": [
// 					{
// 						"name": "to take back",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"After the food fight in the cafeteria, the headmaster decided to revoke all off-campus privileges."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e5cbe04e-09e8-4a50-a45f-fd25f5c11645",
// 		"name": "extraneous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0863ed4d-7b3c-461d-8d23-aaaddd6f2650",
// 				"languages": [
// 					{
// 						"name": "irrelevant, extra, not necessary",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"\"Remove all extraneous paraphernalia from your desk tops, please,\" Mr. Goss instructed."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e630ea1b-762c-4773-b85d-1e5e9f1da57f",
// 		"name": "nugatory",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a72ea223-4818-49c4-bb19-b770fb275fa2",
// 				"languages": [
// 					{
// 						"name": "of little importance; ineffective; dull",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"\"a nugatory and pointless observation\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e72af9cf-1b1a-40fb-a058-d23feeb6e699",
// 		"name": "utilitarian",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "882189ab-5666-4a4a-94f1-252ed7f97c31",
// 				"languages": [
// 					{
// 						"name": "relating to or aiming at usefulness",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"We were told to buy only utilitarian items, nothing that was pretty but has no practical use."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e735613c-e617-4379-803e-fa329dd87802",
// 		"name": "curt",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9735af09-58ca-46b5-8dfe-71792d3f6a2d",
// 				"languages": [
// 					{
// 						"name": "abruptly and rudely short",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Edgar's curt reply to Sharon's question made me believe there was trouble in paradise."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e73b9ff6-b246-4cb6-9ad3-d3ed52a5fa74",
// 		"name": "licentious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "65e56a2c-2bd6-462a-9989-fbf8094e60f9",
// 				"languages": [
// 					{
// 						"name": "displaying a lack of moral or legal restraints",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The licentious woman said, \"Hello, Sugar Pumpkin. Has your little wifey left yet?\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e7e15e7b-af3c-42be-ae8a-4f67ed518e48",
// 		"name": "swarthy",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d87312ea-977f-4351-b47b-5a464852c8d8",
// 				"languages": [
// 					{
// 						"name": "of dark color or complexion",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"A swarthy gentlemen stood up and gestured toward a photo of an African gentleman, and said, \"For my father's sake, I'll not resign; but, some things must change.\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e7e49a20-471c-4d62-8e94-dbf1b125eaf4",
// 		"name": "mettle",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c3d44eae-f16c-4842-a488-5b7a6dc34c35",
// 				"languages": [
// 					{
// 						"name": "courage; quality of temperament",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Perhaps unsurprisingly, his mettle in polar extremes far outstrips his writing ability."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e84c0cc9-9bdf-4321-9894-e02f7f158c40",
// 		"name": "opulent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "464eaa64-763b-4a9c-bbfa-ea8369c668bd",
// 				"languages": [
// 					{
// 						"name": "characterized by rich abundance verging on ostentation",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The mansion was decorated with the most opulent furnishings I've ever seen."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e8a5060c-e8c0-4d5a-8c91-5da8209e1aec",
// 		"name": "cunning",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2e1f674a-bdc9-4b20-b527-c0abd4e5cc75",
// 				"languages": [
// 					{
// 						"name": "sly, clever at being deceitful",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Every cat burglar must be as cunning and as quiet as his name suggests."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e8e64a82-be2a-416c-b6fd-6635346b6280",
// 		"name": "interminable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8c4d3391-566a-4a61-835d-17f593e47bd9",
// 				"languages": [
// 					{
// 						"name": "without possibility of end",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The questioning mind of men has been an attribute that has aided in their technical evolution and therefore must remain interminable."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e900632a-612e-4963-ae4d-d4eb79760c07",
// 		"name": "evanescent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0d7c01a6-ee06-4ebc-8ae0-20b0277bda53",
// 				"languages": [
// 					{
// 						"name": "fleeting, momentary",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"All life on this Earth is most evanescent, appearing like a vapor then vanishing away."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e94fcab1-97f4-4e0c-bc2e-089f5635c5ca",
// 		"name": "accentuate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "cca068ed-68c7-4d0b-a0ca-36b330dea19a",
// 				"languages": [
// 					{
// 						"name": "to stress, highlight",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Motivational speakers all agree that success in life means accentuating the positives while learning from then dismissing the negatives."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e963554e-4f20-4371-b30b-046dd6937e47",
// 		"name": "compelling",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0bce41f6-21d0-49c5-b26a-85384145a3a9",
// 				"languages": [
// 					{
// 						"name": "forceful, demanding attention",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"His description of that lush vale was so compelling, I had to see it, at least once."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e964cf8e-492b-42a5-be17-43b2ce50324b",
// 		"name": "malediction",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c196f268-082b-4ff0-9c1e-8357a9c8c331",
// 				"languages": [
// 					{
// 						"name": "a curse",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The witch looked to her master then turned and spoke her malediction upon all the citizens of the town that had sentenced her to burn."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e9b92fab-6c6f-4430-aad6-d81c71408648",
// 		"name": "surreptitious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "41c77ae5-f9f4-40cf-9f97-2fc0285d5481",
// 				"languages": [
// 					{
// 						"name": "stealthy",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The thief crept surreptitiously toward the back door, intending on slipping in while others were preoccupied with pleasures."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e9d2cf2e-6309-40bd-a1d9-14efecd033b3",
// 		"name": "maudlin",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "25ff83ac-f8b1-4298-ad13-7d134b53b158",
// 				"languages": [
// 					{
// 						"name": "weakly sentimental",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The maudlin themes of all the romance comedies are entirely predictable from the boy meets girl, to the boy looses girl, to the boy gets girl back elements."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "e9e8998b-8087-49fc-82c5-0bb482ee540e",
// 		"name": "prescribe",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1e3b2b10-a2eb-486e-85dd-988a50b606b1",
// 				"languages": [
// 					{
// 						"name": "to lay down a rule",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The doctor prescribed several pills, multicolored and expensive."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ea6a2cb3-4762-4621-a6ce-0fab04d6556b",
// 		"name": "tremulous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "1bba86e5-3e73-43cb-bff0-5396624e57bf",
// 				"languages": [
// 					{
// 						"name": "fearful",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Seeing the creature that wasn't supposed to even exist made everyone tremulous and uncertain."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ead7a25e-2107-47c4-9783-dd0defaa1bd3",
// 		"name": "enigmatic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "52f67e7a-27a6-43d6-9d14-b5c272065eba",
// 				"languages": [
// 					{
// 						"name": "mystifying, cryptic",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The inscriptions of the monolith were so enigmatic, our best linguists couldn't decipher them."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "eaf5ce8b-0fb3-499f-a10c-1702f6d9c12b",
// 		"name": "cognitive",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5b779490-c42c-41c0-a3a8-727fc4aec6cb",
// 				"languages": [
// 					{
// 						"name": "relative to thinking or reasoning, concerning thought",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"\"I almost pity the cognitive dissonance at play here,\" he says."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "eb2d66c1-594c-4c1a-843c-d98523786fb7",
// 		"name": "pariah",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5bf245c9-12e9-4e21-8510-8409450926db",
// 				"languages": [
// 					{
// 						"name": "an outcast, a repulsive person",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"After her expulsion from the Ladies' Club International, Shelia became somewhat of a pariah, finding no other club that would take her."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "eb55b201-e0bc-4225-9d89-f21b8e3b1894",
// 		"name": "ebullient",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "af33e996-eb47-4e4d-835e-d6e33a6f706e",
// 				"languages": [
// 					{
// 						"name": "extremely lively, enthusiastic",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Because Ken was so ebullient in his manner, his party turned out to be the most fun of them all."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ec1e51ce-fc94-43d7-a9c9-78ed37e5e305",
// 		"name": "insolent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "851bcb95-4362-4559-b302-14787295bc27",
// 				"languages": [
// 					{
// 						"name": "rude, arrogant, overbearing",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The kind of insolent behavior the boss's son showed demonstrates a lack of parental involvement and oversight in the young man's life."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ec3791d0-cef1-40f6-973f-77dc6c1a6cd9",
// 		"name": "oblique",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3caa5dc9-c44c-480e-988e-b0ad41d3a015",
// 				"languages": [
// 					{
// 						"name": "diverging from a straight line or course, not straightforward",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The river's course was oblique, twisting and turning all the way to the ocean."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ec7051cd-4278-480e-96cc-34769bbdeb4f",
// 		"name": "execrable",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7199ccfd-91b0-4747-abd3-52679db4f9dc",
// 				"languages": [
// 					{
// 						"name": "loathsome, detestable",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The criminal's act was utterly execrable, offending even the other hardened inmates."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ec859cd0-f546-464e-b104-5b0c1c764266",
// 		"name": "refute",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "cd83190c-de3e-4502-a0d9-cc95afef4aef",
// 				"languages": [
// 					{
// 						"name": "to prove wrong",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Martin was set to refute every argument, but heard nothing with which he disagreed."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ec88f4f0-3c24-4397-9576-a2b3ec96f790",
// 		"name": "fetid",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ab1a00d9-ddc6-48f8-8c74-749676574d1a",
// 				"languages": [
// 					{
// 						"name": "having a foul odor",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The fetid stench of week-old meat saturated the butcher, and exposed him to all."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ec9d9f7b-b30f-446a-98b2-82758b0d4778",
// 		"name": "arid",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "58e62259-8205-4a25-8b67-c08ffd356e71",
// 				"languages": [
// 					{
// 						"name": "excessively dry",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The great deserts are the most arid places on our whole planet, allowing cactus only to thrive and the occasional scorpion."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ed05404d-4301-4bd0-af5b-740283d03464",
// 		"name": "accolade",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "55ae94b2-8923-47c4-be72-67d921cef255",
// 				"languages": [
// 					{
// 						"name": "high praise, special distinction",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Everyone offered accolades to Samson after he defeated his enemies in battle."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ed1f93ec-507f-473c-b577-5be072d8807a",
// 		"name": "trade-last",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7b28ddb3-f284-42a6-9421-4453f597f5e0",
// 				"languages": [
// 					{
// 						"name": "a compliment from a third person that is relayed to the person complimented in exchange for a similarly relayed compliment.",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"Hey! I heard Peggy thinks you're cute... btw, that's a trade-last, so now you have to tell me next time someone says something good about me.\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ee1b5a5f-22e4-4877-a05d-176a8662e1f6",
// 		"name": "duplicity",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "57446051-2531-4519-b198-346c87a49155",
// 				"languages": [
// 					{
// 						"name": "crafty dishonesty",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Super spies must deal in duplicity in all of their contacts, lest they be found out and dealt with."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ee683076-680a-4bb6-b588-092280cd51e0",
// 		"name": "astute",
// 		"dictionary": null,
// 		"pronunciation": "/əˈstjuːt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "40661690-00fd-48ec-a6f1-0714cfb6bd5b",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "akıllı, cin gibi, kurnaz",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "very clever, crafty",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "scharfsinnig",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"My most astute pupil wrote an absolutely splendid explanation that logically addressed 99% of the questions posed by the panel."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ee6dd831-7860-43ad-8d98-114534c1fe3c",
// 		"name": "upbraid",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "79f8f49d-85c8-410c-91cc-357de285a0bf",
// 				"languages": [
// 					{
// 						"name": "to criticize or scold severely",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The parents started to upbraid the mischievous teens for skipping school and going to the mall."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ee7585f2-1a2f-49da-8fbb-7a15ada2db62",
// 		"name": "cognoscente",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "636e4b44-ca89-4cb0-8150-8d3f946ec2f3",
// 				"languages": [
// 					{
// 						"name": "a connoisseur; one with refined tastes, esp. in the fine arts; one \"in the know\"",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The saying is also inextricably linked to actress Uma Thurman, the cognoscente of cinematic revenge."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ee80d038-c1c2-4383-8211-6c8438f29a9c",
// 		"name": "pedagogue",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4c7c8ea6-eee8-476f-a03b-3e69fce3471c",
// 				"languages": [
// 					{
// 						"name": "a teacher or schoolmaster, especially one who is pedantic",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"This flattered the pedagogue which is inherent in all of us."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ee9db918-6370-4cfa-8176-0fbd12d193ff",
// 		"name": "behemoth",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bbc37739-c6cf-48eb-b9d3-eb2964c4c866",
// 				"languages": [
// 					{
// 						"name": "large creature; something of tremendous power or size",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The behemoths were rolled into place using two tractors and an earthmover."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "eea21fb2-da42-48f6-a7fc-a1c75d3f4d86",
// 		"name": "derelict",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "550c0492-e4de-4aa3-b563-1643381289cf",
// 				"languages": [
// 					{
// 						"name": "abandoned, run-down",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The derelict ship just drifted in the harbor, waiting to be boarded by the curious."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ef7bce27-4a52-4b38-a588-8319e5af62b3",
// 		"name": "rhapsodize",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5e97bfdb-435c-4233-ad48-3309cffcd5a8",
// 				"languages": [
// 					{
// 						"name": "to engage in excessive enthusiasm",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"My mother often rhapsodizes in her oldies-but-goodies songfest every weekend."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ef8dd49b-3a64-47fc-af78-da5fda825b11",
// 		"name": "vindicate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2af20a26-763f-4ad3-8261-cdc5cef59ecd",
// 				"languages": [
// 					{
// 						"name": "to avenge; to free from allegation; to set free",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"After new evidence was introduced, the accused man was found innocent of all charges, vindicated from any possibility of punishment."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ef9bf453-b8ae-46db-b636-d9091c7952bb",
// 		"name": "partisan",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "247fae60-6cc6-43cc-ab1c-01f1a129d08f",
// 				"languages": [
// 					{
// 						"name": "a follower, adherent",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"During national emergencies, there's no time or place for partisan politics; everyone must follow the designated leader's plan."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "efbfdd80-cb75-40c7-9686-028b1117f844",
// 		"name": "potentate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ddd3b3b0-da11-47ab-b9f7-f5c088d8eebc",
// 				"languages": [
// 					{
// 						"name": "one who has great power, a ruler",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Nebuchadnezzar was one of the greatest potentates the world has ever known."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "efd1b7fd-cf1f-4833-aa41-ca5e93512755",
// 		"name": "dormant",
// 		"dictionary": null,
// 		"pronunciation": "/ˈdɔːm(ə)nt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "369db150-d234-48a6-9f07-91d1782ec64c",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "asleep or temporarily inactive",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "schlafend, untätig",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "uyuyan, hareketsiz",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"The medication caused the virus to become dormant; thus, it could no longer be transmitted to others."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f0bd79f6-7563-48fe-918d-15fd4daeeb0b",
// 		"name": "vitriolic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2931d0db-5d6e-498a-9286-6ac6e5e2af96",
// 				"languages": [
// 					{
// 						"name": "having a caustic quality",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"When angered, Thelma Lou would spew out vitriolic characterizations of everybody she knew."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f0ea8ca2-fc02-498b-9ec9-35d932953e90",
// 		"name": "extricate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "909ee344-02c9-47fa-bf54-99d8b1c9a576",
// 				"languages": [
// 					{
// 						"name": "to disentangle",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"After the evidence was carefully examined, it became clear that the accused would be extricated and set free."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f1236aa3-3336-4d1d-b5e8-30ad009f2587",
// 		"name": "ribald",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d5c1dfb1-3ce7-4fc1-b243-bdf6a13733bc",
// 				"languages": [
// 					{
// 						"name": "coarsely, crudely humorous",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Ribald humor is not allowed to be expressed in the presence of minors or the elderly."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f1850921-c072-4df3-ae11-8f89903408f5",
// 		"name": "depravity",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b688d88c-821f-405c-87ff-a43bac1f4488",
// 				"languages": [
// 					{
// 						"name": "wickedness",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The assassin's depravity made him willing to slay even the faces of the innocent."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f19e82df-eb23-4baa-9665-f2ce994ee461",
// 		"name": "congenial",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "80d12186-828b-4557-9d7c-ff2b7d92ce99",
// 				"languages": [
// 					{
// 						"name": "pleasantly agreeable",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"His congenial smile bespoke his kind heart, so everyone loved him."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f1c96ca2-880f-4096-977a-845090685e21",
// 		"name": "satiate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0cde9026-70eb-4a67-9d41-b1a5a2eb5695",
// 				"languages": [
// 					{
// 						"name": "to satisfy excessively",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Larry became satiated with sugars after eating a full dozen of cream-filled donuts."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f1dcc4f7-9bec-4aa0-adfd-fc0e04f8b79b",
// 		"name": "surfeit",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8ef65052-8de7-4aea-91e2-cf92a0d7f61b",
// 				"languages": [
// 					{
// 						"name": "an overabundant supply or indulgence",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Having a surfeit of nutritious food makes it obligatory to feed the starving children."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f1e57a0a-65e6-42fc-8746-90a6c3f3460d",
// 		"name": "platitude",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ad3b9473-41be-451f-88bc-f0afdd123ea4",
// 				"languages": [
// 					{
// 						"name": "an uninspired remark, cliche",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Sometimes, platitudes are used when nothing original can be thought of to say."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f20e3126-20ca-4af4-b000-46872411fc9f",
// 		"name": "placate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d6041543-c80d-436e-9c9c-d61ee6c5641c",
// 				"languages": [
// 					{
// 						"name": "to ease the anger of, soothe",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"To placate the angry fans, the organization decided to offer free tickets to the next game."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f2b3aabb-5884-4863-86e0-7b94236689f4",
// 		"name": "aphasia",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "015913bc-5dc3-467c-94d2-edb0c2d9de10",
// 				"languages": [
// 					{
// 						"name": "loss of the ability to speak or understand spoken or written language",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Still, she suffered from aphasia, finding it difficult to speak, read and write."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f2d0f1fc-ea01-441c-b2f9-80769e5dd3a7",
// 		"name": "prepossessing",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0d9cd723-5264-49c3-ae93-4d868e27a1d9",
// 				"languages": [
// 					{
// 						"name": "preoccupying the mind to the exclusion of all else",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Job's prepossessing thoughts were of Gloria only - morning, noon, and night."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f2d9bb9a-d0d3-4ec1-872f-3b335078f437",
// 		"name": "fecund",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "db26e64c-aeb8-496b-b6e4-6ef22301efb2",
// 				"languages": [
// 					{
// 						"name": "fruitful, fertile",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The exotic prince insisted that all of his would-be brides be both beautiful and fecund."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f331d3d7-6fb8-4b33-baf1-085bbea8aca6",
// 		"name": "abhor",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "90400a7e-c22b-427c-b3e9-c07839dfc731",
// 				"languages": [
// 					{
// 						"name": "to hate, detest",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Because he wound up tripping himself constantly when he tried to play touch football, Ray began to abhor his favorite sport."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f352358a-c7a6-4566-94ce-34b513f24415",
// 		"name": "frivolous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "599fa551-9653-4417-adcd-438bd343bd19",
// 				"languages": [
// 					{
// 						"name": "of little importance, trifling",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Being preoccupied with frivolous things is a great way to use up your mental energy."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f374aed6-b40a-469e-8408-39feebb5a040",
// 		"name": "oeuvre",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "17ba16e9-2872-40a8-8ef3-77f879a4ea83",
// 				"languages": [
// 					{
// 						"name": "the entire body of work by an artist; a work of art",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"\"the complete oeuvre of Mozart\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f3e97491-bec8-449f-90ca-62d85b27d816",
// 		"name": "congruity",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "388e02cc-684e-45ab-9a70-b6fdc2a710af",
// 				"languages": [
// 					{
// 						"name": "the quality of being in agreement",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The talks produced a perfect congruity of opinions among the diplomats."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f3f95585-93f3-4b09-b513-152d2f43b2e9",
// 		"name": "arbitrary",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2aff2cb4-4928-44b0-950b-e149977a947b",
// 				"languages": [
// 					{
// 						"name": "based on random factors",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The man's decision was totally arbitrary, being predicated on nothing."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f439a1fd-bb87-4841-99b8-6acf6ec98b51",
// 		"name": "exiguous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "32914321-67cf-420b-89ad-c89208d3408d",
// 				"languages": [
// 					{
// 						"name": "scanty, meager, small, slender",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"She arrived punctually at eight o'clock next Sunday, carrying an exiguous green linen bag, which contained her dresses."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f47fcdf4-4e84-4f26-ae01-0bccfb256f50",
// 		"name": "scurrilous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d163019a-154c-43c8-b3d1-0ee449a74a0d",
// 				"languages": [
// 					{
// 						"name": "vulgar, coarse",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The scurrilous language of the truck drivers greatly offended the young waitress."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f49fb5a8-9c54-4518-90d7-9815c0eb6b2e",
// 		"name": "replete",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4522e4e8-c7cf-4803-a1a9-5664f5d6aae1",
// 				"languages": [
// 					{
// 						"name": "full, abundant",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The student's final paper was replete with spelling errors, punctuation errors, and confusing phrases."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f4e10ef1-ce1a-4732-bba2-c50c0ba860a8",
// 		"name": "abduct",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "4607b3a7-cfa1-4035-af98-723df7794ee7",
// 				"languages": [
// 					{
// 						"name": "to kidnap, take by force",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"During their holy festival, the king's ancient enemies abducted the beautiful Princess Kristiana from her castle chamber."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f4f4c989-aac7-4156-a4e2-478fca2012ce",
// 		"name": "tacit",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "317145f3-36b2-47dd-b076-3a6716f9993c",
// 				"languages": [
// 					{
// 						"name": "expressed without words",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Without a word ever being spoken, Wade tacitly communed with LeBron, and tossed the perfect lob for a monster slam dunk."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f512e39e-53c8-43a7-be9f-a00e4616ee25",
// 		"name": "insipid",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "6e62283d-1fc0-493e-89c8-8f4536d2ee50",
// 				"languages": [
// 					{
// 						"name": "dull, boring",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The show was terribly insipid from beginning to end; those who didn't fall asleep, left early."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f5525de3-ad64-4227-bca9-353f4b2cf6d1",
// 		"name": "rancid",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ea60b027-357c-405a-9891-04658e0f0f0a",
// 				"languages": [
// 					{
// 						"name": "having a terrible taste or smell",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The meat in the box was terribly rancid; its odor was all over the house."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f56641b5-1a01-4635-9150-6e913a39d65d",
// 		"name": "obscure",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "bf68251f-d192-48c9-8a97-e7a327ddb5ee",
// 				"languages": [
// 					{
// 						"name": "unclear, partially hidden",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Thought the markings were obscure, our linguists were able to decode most of them."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f6121b92-b347-46e9-ad86-6440cb466c8f",
// 		"name": "fatuous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f14ea79e-398f-4854-ade9-c86ce011c6d0",
// 				"languages": [
// 					{
// 						"name": "silly, foolish",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Carl considers himself a serious writer; however, he pens some of the most infantile, fatuous tales I've ever heard."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f62e6ff6-4ed8-457d-a36e-1a3a75fa3694",
// 		"name": "altruistic",
// 		"contexts": [
// 			" A senior banking executive, Simon O'Reilly, gets a hold of the news and hires Jim to work for them, to develop a system that will predict financial markets.\n\nJim is altruistic - he wants to predict market collapses so that regular people can react in time."
// 		],
// 		"dictionary": null,
// 		"pronunciation": "/ˌaltrʊˈɪstɪk/",
// 		"definitions": [
// 			{
// 				"id": "9fa9dfc2-e96b-4fc8-9a46-5881c017e911",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "unselfish, showing a disinterested and selfless concern for the well-being of others",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "uneigennützig",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "başkalarını düşünen",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"It was an entirely altruistic act."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f69df23a-a856-416a-b114-d554acaa8e84",
// 		"name": "bombastic",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3892f158-a0e4-4383-b11d-ba99e30bb722",
// 				"languages": [
// 					{
// 						"name": "excessively confident, pompous",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The entertainer's bombastic comments caused the audience to boo and hiss."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f6a41b4b-384c-40d7-a67d-9546971c0dc0",
// 		"name": "impervious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "2cbecf42-f2de-4f69-9a8e-d3b818c391ca",
// 				"languages": [
// 					{
// 						"name": "impenetrable, incapable of being affected",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The new armor is impervious to any and all attacks by modern weaponry."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f6a5905f-76ca-41d7-844d-d2048ade01cd",
// 		"name": "flagrant",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "72fef9f2-adf6-46b7-8782-ef81d8ab0096",
// 				"languages": [
// 					{
// 						"name": "offensive, egregious",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The referee hit the player with a flagrant foul for going to the head with his elbow."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f6bc257e-0e29-493b-8a35-b609f48c525c",
// 		"name": "placid",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "026f6de7-bca8-4579-951f-abdcf931c134",
// 				"languages": [
// 					{
// 						"name": "calm, peaceful",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The placid lake surface looked like a sheet of emerald glass, glistening in the sunlight."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f6c85a4b-b21d-410a-a29f-dd2ce0c052a2",
// 		"name": "remedial",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "919cfd2f-45fe-4ffe-a5ed-8b72b2db571c",
// 				"languages": [
// 					{
// 						"name": "intended to repair gaps in students' basic knowledge",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Because he scored so low on his assessment, Nolan was placed in a remedial class."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f6ce8685-c257-47f1-96e0-861ceb04fdbe",
// 		"name": "demarcation",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ec2d8c32-a398-4c42-9ff1-448b4eb6acd7",
// 				"languages": [
// 					{
// 						"name": "the marking of boundaries or categories",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Lying is one moral demarcation that I will not cross."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f6f5ca8e-6bd3-44a7-84d0-93ef492f231a",
// 		"name": "anesthesia",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f7012146-9289-41d2-82a9-7b2227abd260",
// 				"languages": [
// 					{
// 						"name": "a substance that causes loss of sensation",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"When the pain became unbearable, the nurse administered a stronger anesthesia to the operating site."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f7590fbc-ccd6-488b-904c-54c8d4e4eed0",
// 		"name": "dada",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "91b67286-8bf1-4ed4-a513-7ac20cd44c24",
// 				"languages": [
// 					{
// 						"name": "an absurdist movement in art and literature of the early 20th century. Also dadaism",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Dadaism shocked many and stimulated the viewer to reading the artists statement(often politcal) in their work."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f781b9f0-11fe-4f7e-aec2-148a145c2b01",
// 		"name": "foil",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "fa31d316-f8c5-4509-acfd-63318f08a017",
// 				"languages": [
// 					{
// 						"name": "to thwart, frustrate, defeat",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Inspector Goodfellow foiled the thief's attempt to rob his fifth bank in as many months."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f80b613c-5241-41f5-957d-ae07c5a1de43",
// 		"name": "demure",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "095f35f4-e367-45b9-83cc-829fc956357f",
// 				"languages": [
// 					{
// 						"name": "quiet, modest, reserved",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"She remained demure, even in the face of monumental temptations to join the fun."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f8324ce9-73ba-46f6-a73c-705b7901ccbc",
// 		"name": "ornate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "883a2657-1485-46e0-b7c6-23d71bed0db6",
// 				"languages": [
// 					{
// 						"name": "highly elaborate, excessively decorated",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The Yuletide decorations were truly ornate, from the tree to the windows to the sidewalks."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f8502912-f289-452e-b328-08f281f687f2",
// 		"name": "absolution",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e063e879-bdbc-4f13-804d-0596ad9de88b",
// 				"languages": [
// 					{
// 						"name": "freedom from blame, guilt, sin",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Once all the real facts were in, the prudent jury granted Mr. Clydette complete and total absolution, rendering a verdict of not guilty."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f881867b-4a85-4a09-ac2b-015fd156ce34",
// 		"name": "skittish",
// 		"contexts": [
// 			"How One Woman Stole 3% of Vietnam’s GDP: \"Ironically, some analysts think that the arrest backfired and made foreign investment skittish right at the time when Vietnam was poised to be the next global manufacturing hub.\""
// 		],
// 		"dictionary": null,
// 		"pronunciation": "/ˈskɪtɪʃ/",
// 		"definitions": [
// 			{
// 				"id": "e4c72590-1d93-4c8e-84c4-815f4e5ab84a",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "nervous, easily scared (horse)",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "scheu, bockig (Pferd)",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "ürkek (at)",
// 						"language": DefinitionLanguage.tr
// 					}
// 				],
// 				"samples": [
// 					"A skittish chestnut mare."
// 				]
// 			},
// 			{
// 				"id": "0f2e23bd-bd6c-46ef-b156-8cd197c2fe0b",
// 				"type": DefinitionType.adjective,
// 				"languages": [
// 					{
// 						"name": "moody, not serious and likely to change their beliefs or opinions often",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "huysuz, yaramaz",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "launisch",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"Marilyn was like a child, playful and skittish one moment, sulky and withdrawn the next. She showed a whimsical or capricious demeanor, much like the unpredictable behavior of a playful child."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f88e32ff-0a23-4e62-874a-111f60bb0e02",
// 		"name": "emollient",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "65222c6d-c962-4848-b10b-a8dd00c47d5a",
// 				"languages": [
// 					{
// 						"name": "soothing",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"\"This emollient will make your skin as smooth as a baby's bottom,\" the manager said."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f89932ba-0abc-460b-bf6c-2d32333d49c6",
// 		"name": "emote",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "828721b5-7e18-496c-b0d7-d4af2022aff8",
// 				"languages": [
// 					{
// 						"name": "to express emotion",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Seeing the inspiring scene for the tenth time, everyone began to emote as they'd done the first time."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f8da824d-9ee8-4b57-a0ff-17b6dc9e73b2",
// 		"name": "cacophony",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9ec6a378-1e26-4a63-ab79-14de9972e2dd",
// 				"languages": [
// 					{
// 						"name": "tremendous noise, disharmonious sound",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The amateur orchestra created a deafening cacophony during their warm-ups."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f90092ab-d603-488a-910d-1a16ead7d060",
// 		"name": "veracity",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "cc8911c4-0f85-47c0-a765-554e95e13ed5",
// 				"languages": [
// 					{
// 						"name": "truthfulness, accuracy",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Doubting the veracity of the victim's claim, the insurance adjuster interviewed the officer again who wrote up the incident."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f9514e70-d81b-4585-b852-d51e33fcc354",
// 		"name": "succinct",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b9065966-2b19-49cf-ac4a-58666b6dc43b",
// 				"languages": [
// 					{
// 						"name": "marked by compact precision",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The mayor's succinct speech was a bit hard to hear; for she spoke of tax increases and layoffs."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f963d718-bf12-4d50-82da-4904531780d9",
// 		"name": "caucus",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3b47d54a-3371-42e7-b6de-5dcdb31d13a1",
// 				"languages": [
// 					{
// 						"name": "a meeting usually held by people working toward the same goal",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The union representatives are having a caucus with the team owners about retirement compensation for players."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f976eb87-7c4a-45e6-a550-cd7627f040d4",
// 		"name": "criteria",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "83106aca-b8a3-499d-9238-cb2bb7f1cfa3",
// 				"languages": [
// 					{
// 						"name": "standards by which something is judged",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Seldom do entering freshman meet the criteria set for leadership on the council."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f9d922c5-00e9-4266-98cf-7a06a3e88323",
// 		"name": "rapport",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b760333a-9cad-4fe8-a5cd-4edb9cdf6079",
// 				"languages": [
// 					{
// 						"name": "mutual understanding and harmony",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"It's a difficult task to develop a rapport with someone who's naturally introverted."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f9ee0f78-da00-48ad-a260-eea6891dcdde",
// 		"name": "propagate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "35413fcf-343c-4af0-8e8e-c3551a2b665c",
// 				"languages": [
// 					{
// 						"name": "to multiply, spread out",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Insects have learned to propagate their species in the most dire of survival circumstances."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "f9faef23-7d6a-4c2c-a1cb-52f17fe6efc0",
// 		"name": "prowess",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "94139e09-4c3b-40b4-aff2-0cca8bf89e8d",
// 				"languages": [
// 					{
// 						"name": "extraordinary ability",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The knight displayed his fight prowess by defeating the emerald-eyed dragon of Coal Mountain."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fa08c0af-adf7-437d-9d11-11310fee55bf",
// 		"name": "cogent",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "262db506-8fa0-4fba-a125-bf84b99ca097",
// 				"languages": [
// 					{
// 						"name": "intellectually convincing",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Kimberly's position was expressed so cogently, I was forced to agree with her."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fa26c884-ba50-4ada-9898-fd29873f8058",
// 		"name": "nonplussed",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a431d2e7-df76-4a1b-8e86-eabe66cbc1d0",
// 				"languages": [
// 					{
// 						"name": "confused, bewildered; speechless",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"After reading many letters and statements, Gean was nonplussed by it all and had to take a breath."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fa523092-d07e-48d8-a185-80b584e103b8",
// 		"name": "nocuous",
// 		"contexts": [],
// 		"dictionary": null,
// 		"pronunciation": "/ˈnɒkjʊəs/",
// 		"definitions": [
// 			{
// 				"id": "2a996a94-8588-49bf-9bf8-6faa269e46d5",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "zararlı, zehirli",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "giftig; schädlich",
// 						"language": DefinitionLanguage.de
// 					},
// 					{
// 						"name": "harmful, poisonous",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"Hand washing is one of the easiest ways to help prevent the spread of nocuous germs."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fa61cba1-8ee0-4066-8c9e-455dfba5592b",
// 		"name": "cupidity",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "9c3161aa-be80-4830-b0b8-46030ce96f56",
// 				"languages": [
// 					{
// 						"name": "greed, strong desire",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"His cupidity made him enter the lotto, using every cent of his grocery money."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fb433ad9-8020-4166-b096-f111c4aec42d",
// 		"name": "exculpate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "c8d46380-45ec-4e51-aac0-2f578f3a0a54",
// 				"languages": [
// 					{
// 						"name": "to free from guilt or blame, exonerate",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"In today's legal environment, one must have a good lawyer if one is to be exculpated from the least charge."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fb738600-3dcb-4c97-b21e-bcf45a682bbb",
// 		"name": "surrogate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ec924589-896d-4ade-bf84-0426f7a180e7",
// 				"languages": [
// 					{
// 						"name": "one acting in place of another",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Brenda, a surrogate, carried the child to term for its biological mother, Lucy."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fba51623-571f-4483-ae12-886a2f374117",
// 		"name": "advocate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "92033ed0-c1f0-478d-9d27-60261a3ca873",
// 				"languages": [
// 					{
// 						"name": "to argue in favor of",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Alvin advocated turning left at the stop sign, even though everyone else thought they should turn right."
// 				]
// 			},
// 			{
// 				"id": "e818ef76-5eeb-4fcc-b90a-784ac279985a",
// 				"languages": [
// 					{
// 						"name": "a person who argues in favor",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"In addition to wanting to turn left at every stop sign, Alvin was an advocate of eating hamburgers at every meal as a wonderful way to support the U.S. cattle industry."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fbb728c1-ae28-4762-8a07-d47e6c7f1d29",
// 		"name": "rebuke",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "dfc48688-6100-41ed-aad7-c55fe34c6961",
// 				"languages": [
// 					{
// 						"name": "to scold, criticize",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Mr. Thomas rebuked his son sharply for missing his curfew for the second time this week."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fbdd179e-e2d0-4afb-be73-70c26f79e9e0",
// 		"name": "mingy",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "018ca58c-8df5-4adf-b2c8-29f9146181f3",
// 				"languages": [
// 					{
// 						"name": "mean and stingy; undesirably small.",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"\"you've been too mingy with the sunscreen\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fbf3a072-e547-461e-950c-c159d967062d",
// 		"name": "probity",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "e57f10cb-5005-4ac3-88f5-3cfb92dda3af",
// 				"languages": [
// 					{
// 						"name": "virtue, integrity",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Helen's probity was in question when it appeared that she had lied to the investigators."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fc07f253-ab1d-440a-a7bc-9e68f7bf769e",
// 		"name": "excavate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0d8bd5ce-c1e7-4945-83c4-2ea7e17e0a3c",
// 				"languages": [
// 					{
// 						"name": "to dig out of the ground and remove",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The treasures of Solomon's mines were never excavated; for, they could never be located."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fc3a248c-58f9-4251-9d7a-68d9a231be59",
// 		"name": "nondescript",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "3cf82a08-ed1b-4fa4-b76c-a0f22640277a",
// 				"languages": [
// 					{
// 						"name": "lacking a distinctive character",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Undercover detectives are pros at coming across as nondescript observers and passersby."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fc431078-803b-4a67-8e05-ebc31dfd7c01",
// 		"name": "disgruntled",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d14d9ec1-d01c-455b-8b98-347fac8abc80",
// 				"languages": [
// 					{
// 						"name": "upset, not content",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Jackie became totally disgruntled when her fiance forgot the anniversary of their first date."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fcf7cffb-d884-4e65-9a7a-ef0543d5bb7d",
// 		"name": "allay",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f50e8723-7d88-4123-9ca9-4e27b64b9be4",
// 				"languages": [
// 					{
// 						"name": "to soothe, ease , put to rest",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The police chief gave a fiery speech to try to allay the fears of his officers when they learned of the escape of the city's worst nemesis ever."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fd34ccdc-1bd9-4c40-9055-73c2f500fe56",
// 		"name": "nurture",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "b3de200a-8935-4a7f-85a8-07987af666d6",
// 				"languages": [
// 					{
// 						"name": "to assist the development of",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The nurture of a loving mother has no substitute."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fd638a61-7d89-45f2-99d6-7252fe58a8a5",
// 		"name": "pallid",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ec5c6001-743d-4632-9a78-72558d85ef1d",
// 				"languages": [
// 					{
// 						"name": "lacking color",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The decorations were unique, but the bland color choices were a bit pallid for my taste."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fd764f3e-de61-480d-a6f2-7aec0117e0a8",
// 		"name": "retract",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "ccdac306-fef4-4721-90d5-300c20c02615",
// 				"languages": [
// 					{
// 						"name": "withdraw",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"The newspaper decided to retract its entire statement about one of the candidates when a portion of it proved to be false."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fda340c0-203a-470a-b8ee-3cc32a119522",
// 		"name": "calamity",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "f40fcbb0-dea0-4858-8db4-813066d8263a",
// 				"languages": [
// 					{
// 						"name": "an event with disastrous consequences",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Hurricane Francis created a calamity that is still impacting thousands and thousands."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fdd11819-5bbb-4d83-8fc7-40f286a56bc6",
// 		"name": "grievous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "11e2683e-f05f-4b64-ae79-ebed13eb53ce",
// 				"languages": [
// 					{
// 						"name": "injurious, hurtful; serious or grave in nature",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Dr. Green committed a grievous error in his calculations, and announced that the sun was going to explode in 2010."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fdd12118-2c9b-4f5e-b5c8-0f8059988046",
// 		"name": "nadir",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "91bb8bc7-5eb4-49c7-8243-46b32fe793c5",
// 				"languages": [
// 					{
// 						"name": "the lowest point of something",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The nadir of my existence came when my one and only love found someone else."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fe3c2217-4de6-492a-8c53-9a0903655e11",
// 		"name": "inimical",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "18f0cf39-858e-4825-8ce7-ef2e4ce42c1d",
// 				"languages": [
// 					{
// 						"name": "hostile, enemy-like",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The inimical undertones of those at the peace talks suggested that peace was still a distant reality."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fe3c72c8-1d36-4ed7-99c6-5ff625a7704d",
// 		"name": "liability",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0be9913b-14ee-4602-8aeb-e86db3320d18",
// 				"languages": [
// 					{
// 						"name": "legal responsibility",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The court determined that the driver of the truck had the liability for the blown tires."
// 				]
// 			},
// 			{
// 				"id": "8a2431a1-9393-43bf-aea9-a5a80966c9d0",
// 				"languages": [
// 					{
// 						"name": "a handicap, burden",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Having unconcerned and undedicated players on any team would be a liability."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fec36f8d-ec4b-4386-acd7-1d9cfac280df",
// 		"name": "bereft",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "872c2223-1386-47fd-8f58-7de643e8ca47",
// 				"languages": [
// 					{
// 						"name": "devoid of, without",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"An entire village was bereft of food and medical supplies after the tsunami."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fece2ea7-c703-4d06-8fa5-4a11c539509b",
// 		"name": "anxiety",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "fb066376-2af1-4374-96cc-ebe4f1454e1c",
// 				"languages": [
// 					{
// 						"name": "intense uneasiness",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Because final test scores would be posted at 5:05 pm, every student's anxiety asInt peaked around 5:04."
// 				]
// 			},
// 			{
// 				"id": "84bcfc55-38b4-41f8-88b8-25378e1a03f9",
// 				"languages": [
// 					{
// 						"name": "strong desire or concern to do something or for something to happen",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The housekeeper's eager anxiety to please."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "fed96b75-ad36-4bed-a199-dde80eb5a8ff",
// 		"name": "deleterious",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "0e955e0c-712f-4b2e-b2cf-fdf639036188",
// 				"languages": [
// 					{
// 						"name": "harmful",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The deleterious effects of going without food for many days can be seen many years after the fact."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ff05c476-56bb-4c48-910a-995efd7a2f12",
// 		"name": "beguine",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "7e909c0f-898f-4a8b-a03b-e2d140dd6285",
// 				"languages": [
// 					{
// 						"name": "a popular dance of Caribbean origin, similar to the foxtrot",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"The beguine is a dance and music form, similar to a slow rumba. It was popular in the 1930s, coming from the islands of Guadeloupe and Martinique, where in local Creole Beke or Begue means a White person, and Beguine is the female form."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ff0fb26b-6cd4-4e63-a147-bb54dd61e304",
// 		"name": "niggardly",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "cb1610b0-44c4-48f2-b30d-1e7cbf9633d4",
// 				"languages": [
// 					{
// 						"name": "stingy, esp. when called upon to help others",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"\"he accused the Government of being unbelievably niggardly\""
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ff18ebcf-4116-4561-82ea-fabf588f95e4",
// 		"name": "ameliorate",
// 		"dictionary": null,
// 		"pronunciation": "/əˈmiːlɪəreɪt/",
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "8f35d488-9b23-4a95-9391-efd4816937f0",
// 				"type": DefinitionType.verb,
// 				"languages": [
// 					{
// 						"name": "improve, make (something bad or unsatisfactory) better",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"samples": [
// 					"The tension and mistrust in the air was ameliorated when the CEO announced that the bonus was going to be divided evenly."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ff1b847d-05da-43e0-bf30-5835d52d051e",
// 		"name": "soluble",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a417267e-6535-4456-902a-17a5092c767d",
// 				"languages": [
// 					{
// 						"name": "able to dissolve",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"Salt is a very soluble substance, disappearing in water with just the slightest agitation."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ff868fbf-b9ad-4542-96ee-d5d6c827bbad",
// 		"name": "corroborate",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "d35f005c-99ff-4a4b-be84-e3881b3b0924",
// 				"languages": [
// 					{
// 						"name": "to support with evidence",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.verb,
// 				"samples": [
// 					"Several witnesses corroborated his story; so the detective released him."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ff8b83ca-4d3e-45d2-bfd9-ca210c9a23e8",
// 		"name": "sisyphean",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "babd14f3-aac1-4057-91b5-81d23d122b74",
// 				"languages": [
// 					{
// 						"name": "requiring an endless and toilsome effort; continual and ineffective",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"With healthcare, jobs, economy, and two wars looming large and staring the country down, it will be sisyphean task for anybody to win over the public."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ffba0a40-b777-438d-8750-468e1ac0e1ae",
// 		"name": "adulation",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "5e35dd5d-68b4-46f4-84be-07900d8af516",
// 				"languages": [
// 					{
// 						"name": "extreme praise",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.noun,
// 				"samples": [
// 					"Though the play was excellent, Martin didn't think it deserved the overwhelming adulation it received from its writers."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ffc12876-c63e-415e-973a-a2515c715401",
// 		"name": "ingenuous",
// 		"dictionary": null,
// 		"pronunciation": null,
// 		"contexts": [],
// 		"definitions": [
// 			{
// 				"id": "a683e31b-1b73-45e1-ac62-cb902b40ec6d",
// 				"languages": [
// 					{
// 						"name": "not devious; innocent and candid",
// 						"language": DefinitionLanguage.en
// 					}
// 				],
// 				"type": DefinitionType.adjective,
// 				"samples": [
// 					"The young man's plea was so heart wrenching that his ingenuous character could not be denied."
// 				]
// 			}
// 		]
// 	},
// 	{
// 		"id": "ffed28a3-ac17-4219-848d-dada207e0050",
// 		"name": "perfidy",
// 		"contexts": [
// 			"After Musk lent his name to the venture, invested significant time, tens of millions of dollars in seed capital, and recruited top AI scientists for OpenAI, Inc., Musk and the non-profit's namesake objective were betrayed by Altman and his accomplices. The perfidy and deceit are of Shakespearean proportions."
// 		],
// 		"dictionary": null,
// 		"pronunciation": "/ˈpəːfɪdi/",
// 		"definitions": [
// 			{
// 				"id": "38a691c3-a7e6-48d1-9ad8-3664040d9e2a",
// 				"type": DefinitionType.noun,
// 				"languages": [
// 					{
// 						"name": "hainlik, sadakâtsizlik, vefasızlık",
// 						"language": DefinitionLanguage.tr
// 					},
// 					{
// 						"name": "deceitful and untrustworthy",
// 						"language": DefinitionLanguage.en
// 					},
// 					{
// 						"name": "Tücke, Verrat",
// 						"language": DefinitionLanguage.de
// 					}
// 				],
// 				"samples": [
// 					"In the context of war, perfidy is a form of deception in which one side promises to act in good faith with the intention of breaking that promise once the unsuspecting enemy is exposed."
// 				]
// 			}
// 		]
// 	}
//
// ];
