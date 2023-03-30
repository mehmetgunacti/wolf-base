import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bookmark, LocalStorageService, Tag } from 'lib';
import * as fromStore from 'modules/bookmark/store';
import { slideUpDownTrigger } from 'modules/shared';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-bookmarks-page',
	templateUrl: './bookmarks-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [slideUpDownTrigger]
})
export class BookmarksPageComponent {

	editDialogVisible$: Observable<boolean>;
	tagsVisible$!: Observable<boolean>;
	tags$: Observable<Tag[]>;

	constructor(private store: Store, localStorage: LocalStorageService) {

		this.editDialogVisible$ = store.select(fromStore.selectorEditDialogVisible);
		this.tagsVisible$ = store.select(fromStore.selectorTagCloudVisibility);
		this.tags$ = store.select(fromStore.selectorTagsArray);

		// todo : delete later
		localStorage.bookmarks.clear();
		localStorage.bookmarks.saveAll(this.bookmarks);

	}

	toggleTagCloud(): void {

		this.store.dispatch(fromStore.tagsToggleTagCloudVisibility());

	}

	openAddDialog(): void {

		this.store.dispatch(fromStore.bookmarksAddOpenDialog());

	}

	closeAddDialog(): void {

		this.store.dispatch(fromStore.bookmarksEditCloseDialog());

	}

	bookmarks: Bookmark[] = [
		{
			"clicks": 0,
			"id": "04272ed4-73c7-40c0-862f-d422cb98a6e4",
			"image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAYAAADGWyb7AAAYQElEQVR4Xu2dCZhdRZXHf3WXt3Z3ek1nhWACsihEQYmoOIiAioK4DOiHCooogwo66gcDgiAIIiJEghJkCyBEFAcUmEGWUQEJIhBcIAhJyGaWJt2dfst9d6v5Tr37QicE6KTXkFcfnX68rlt16vxPne3WotjOitbaAvYG9gB2BaYBU4BOoDX5vKVRrQDWA2sA+bwU+CfwNPCUUirenlihxjqxWut24CDgXcAsYD9AwBvKEgF/AR4BHgQeUEp1DWUHQ93WmAROa70ncCTwwQSwoR73QNp7CLgTuF0p9Y+BPDCSdcYMcFprUXPHAp9MZtZI8uG1+pKZeDNwo1JK1O2ol1EHTmu9P3AicDww6vS8BiIauBaYq5RaMJrojRqjtNaHAKcAh48mAwbRt6jRy5RSvxtEG9v86IgDp7V+N3BaYr+2mfAx9OBdwIVKqT+OJE0jBpzWeipwLnDcSA5wBPu6DjhLKbV8JPocEeC01l8DLgDSIzGoUeyjApyulPrRcNMwrMBprfcCLgXeN9wDGWPt3wucqpT6+3DRNWzAaa2/CMwB7OEifoy3K0H9yUqpK4eDzmEBTms9F/jCcBC8HbZ5lVJKwp0hLUMKnNZ6F2DeKGY7hpQ5Q9iYpNE+o5RaMlRtDhlwWmvJJUp2QRK+9fJyDkhi+5NKKQFx0GVIgNNaHwH8EnAHTdHru4EA+LhS6o7BDnPQwGmtjwZuGSwhO9jzxyil5g9mzIMCrg7aYFjPoMDbZuAS9Xj7oEivP3zktqrNbQIucUTur9u0QUue2Lz3bovDstXAJS7/H+re46BBqzUg3uaBWxsqbAtwkgUX179eho4DDyql5K3JgMtWAVfPiAyYr9tScasyLAMGLsk9/nRbKKo/M2AOfGmguc0BAZdk+RfuwAnjAXN+kBUlMb3PQN4qDBQ4eT2/o72aGSQG2/z4vUopWdbxquU1gUtegl7yWg3V/z6kHPj6a72MfVXgkuUGstr39f7meki5PgSNyZv0XV9tGcRrASdL0V6va0SGgL/D2sR1SilZsrjF8orAJauxJNCul9HjgATmW1w99mrAybpBWQJeL6PHgbuUUltcd7pF4JLFqveMHr31nvtx4NAtLbp9JeB+ux2vMH69oX6nUupDmw/qZcAla/llk0O9jB0OzNp8r8KWgLsa+NzYoblOCXCNUurz/TmxCXDJVifZ0PeagXmdnSPKAdkl1N5/i9fmwH1VdqCMKEn1zgbKgVOUUrNrlTcH7k9jcFPhQAf2eq/3iFLqHS8DLtm+O2xr3V/vXB2h8e1V29a8ccZprU8HvjdCBNS72TYO/JdSSnY9veSEaK1lhe07t629+lMjxIGNSxzMjEuOpFg3Qp3XuxkcBzrkKI8acJ8AfjG49upPjxAH/l0pdWsNuMu01hIK1MsY44DWWjQilmWhlIFrtlLqlBpwC7TWbx9jNO9w5NRAiuPYgOU4jgFMPgto8juO40cdx9lfJWdj+VrrHXXn6JgQEAEriiJc163NLAHJ0FYDz3iT1TPHXAFuJvCEoFkvo8sBwUDAk2Lb1Xkk4Mln+V2biUEQvEWAkyOYfl4HbnRBS7x7wjA0hIiaFPVYA7Knp4e1a9dSKBTkz58S4M4CzqkDN7rA1WZUDTDP8+jq6qK7u5vFixeTSqVoaWmhra1Nfs4W4K6J4fhIQ5zkUTYe3CjaU236qqCmUB0Nrng8KkYriMxJhAq0+Q/TRtJeTQsnNUw/8nf5kSqiFBz5rSMUoiqUaTPEIZbPSR2bGMvo/YQKZck3xGK4E77Lb9kCU2vb9JmMw1Tql52t9W1UkzgAQCRSnvBCftfqy9+kHePY9fu+1r4lfJKxV1lALG1I1X715aPwreZMCNWqyilT5LlKJWD16jUsXrKUtV1dVPyQWfu9ldbWZpqbm40NlPPEBLh7KjGH9EVQCUOefm4xLxYj/EATBhoHja1l+lZZE1uOob7FipjekWPa9IkyrwmUjR+5bCh4LPjz08RiQ+0KTjrNi91lGnLjcaMAK/KIUlmKyia0NOPyLru059lj8nhSUZG0HaIsy4DW7WmeXdlNc2szU1obyUYBKXyUjqoCojIEloOHZeAuV3yefn45qwoRhUiBH5C2I3QQkU1blMpV42/bCh1rGlM2u+3STmdLMw2OQkchfQE8uPA5+jQUKi5uBnQY4lqKsBLRkFV45ZBMxib0NS0NGr/o8e79Z5JNuViOxdruDfxhwZNETg5poFiO2GVaO3vu0kmz69AoaMdaRA50RBT4lHo38MKKFSxbuYoXewo0tXXwhhlvZOpOkxmXcbE2iqaB4XcC3EJPs7dozrsfeJLzf3A5xRAsJ0VTQw4r9LF0YCQj1jIfbGJlkfML7DmxidPO/DKdkzuwnDwxDn9csIzPnvBlOiY2Y6UDbNdGxy7Z1HhUsAF0kQ06hWc3sqEUknNtZnQ2ceOPvsPEfEzKCij2FsiOa+PJRSs5e/ZPmTx9N07/6nF0OBGOX8a1jXeFjh1Cy8azHCIL7n/kab53yaU8v7pIQ/tk/A29tDSksKIKQaVkhu4IEmhC3yPnwJHvP5jPHv0RprblSLsOz6x4ka9/52Ke+OdKMs3jKZY9A5pDgB37BJUymXSaKAhJpVyCUoG9Zkzh4vPOZNrk8XhhyKqu9Vz+sxu476En6CpUiHWK6dNn8PHDD+SY97+LSU1p4jBG6ZD1a1fz3KJFbOjrpVAs09oxnslTp9ExYRINjQ1YtsKWmb4pcE8JcMsrmil9MXz7vNk88PBfaOmcwgmf/xRtbTkySmObKa3Nv6I+RJ1YfgVd8tlt18l0tjeZv1Vim0eeWM3nTz6NbEuWAw/enyMPO4CMJWrVNtKFFVOMNL2Bxa/ueYwFDz6EU+rhznlXsOfkVtNfqeDjNqS564HHOefHV7G6r5dTT/ocJ3zifaTFy/IDMi5oP4R0hpK2KVlw5S2/46ob5mO5GU4+6QSmjc/gipBZ2sxSA7aR8xgdRkR+SGs+y54zptKQtiiXPUp2jqeeW8q6cgU7lcbzA5TlktYhaRWZWSmz1g9ilGVjxQEpbTNr5htJu4pYx2gnzfq+Ivc98ld+cvVNdHUX0DFkrZijD5vFF4/9GJayWLjwSQp9G4wDks/lmLbLNCZOmkRjY6PR0WEQYDsOtrKrKvelskKA0yaGAL793e/z0GNP0dDcwUUXncuUic2IfUqpql6u2S5RnJ6u2pLIi8k7ZXPcguPm+b8/r+YrZ15MgZBjjz+MLx3zARqEDB+aUhid7dsOpQhmX3s38+ZdbwZ04xUXsf+bpxlbV9bgKVjX43P2D67l8b/+lb7ebi694EwOeccepr10GOHaQoFFObIpuzYXzbuPn1w/H6fUxW1XX8rb9twJopg0EXEc4rguYiIrQUDatbFEnYdlI/lYKbSdpxjbLO+N+deGCtrJksspY5fSFnh9vdhxSOAX2GO3nQ0/ROuJfXS16JsIZSk2eAGBcohcl1VdHueffwmP/+UJDj/0IL78maPoWb2UF5avxLJdgljT1tHJ2/bbl3zWJQoCI2SZtIPWMUoIttJotelpxgY4Y9A1XD73eq65cT5N7RPp6JxI5/gOokoZV0U4grjoeW3jYxOmxjNjr3057MAp7N7ZREoHRDjcu2A1n/zKd0iPb+fA976dow59G21WxARbo8KYSBiUtXjmhTJ3/M/9PPn4Y/jlbu64ZS4zJjUhoik2ricE5cCjf1vOORdfzaq165ncOZ6Lz/0Gb5qUpSGGRrsCOiDQKQpOigtueojLrplPC738+qff403TJ5sZrCLfSG8qmzGC6Ps+rutgVUpEYRk3myESacw0s/C5Ffzn2d/n2WVrKVQCWsY1QeCRtSKKPesY39rCfm/bl7O/fRpKudhK1udH5NwYWwXG/mvl4GsHL9Z42kJHEcuWd+PomGcXPgxBydjwdMM49pq5LztNbTeazEyOMDLtpUWCY786x5QAJ1+8VAxwslC9qOGpZ5Yx59pf0V2oEMYaHUeosIJjxUZdRjEEMXiRYs0GRcELOeyAqcw56yTssIhlZ/n9E+s59psXUcnmsFM+rW4J1ixhgqXw4yxeuo3AzlIURqZTdDTn6BzncsUlZ9Cc0lRKvUZ1KMelIH1ZDVz5iz8y79bf4ropPnDwOznl04eye0uKfFgCfLSVpcdKc/5NC7hi/t245XXcNvdcdp3cRtapenLGubOqXmHNSzXfi+qzIIg0se3ywuo1fPWMi1nyrxdJZRv4yn982qj6vK1QkbhBmnGNTcx8yz6kxAQI3qKK40DUjzEo2nbxtUufF5HLp1m1ppdlS5axbvUqokqBVMqhY/LO/POFVazpLfGegw5g+ozJpq2UBrHCafEronKVcCu7ZeBE2AQ8mXXrizEr16036sS1bVQcGtBMvkxUo9a8WNT8+r6/ctvd97P7hIj7broENypiO3nufng5J5z5Y/x8ngPeNYMPzdqdfKXETqmqa1/SitjOECqLIAppaszzhp2n0tGSY9EzL/Dft/+GVWu6cPPj8CKLOJVjTW+Zhc8uJdvYjBX5fO34Izjhw/vTHHrEYQHcBvrsDBfc/CiX3XAH9Czjzusu5K27TTIoOVpji5tvUkaJmx5DyoQhYrcCIsvFUzYr1nbxrXMvZ+EzS2lpa+c3t15cZWhyUoERAG2UD7Zo2lJIUxbi0MNNKeKKh7ZTRFaaUiUyKnHp4mVUyiWCSoV8Y55d99ydX9zxv9z34J9Z1+vRMmESn/70Rzn032aRdyCvIEeMLYIiMYZoKWNENptxEnOItShLSGGLDFcHJ1pVqptZW4thgK4SXHXrw1xx/S+Y3hHwu5t/RC72cJwGHnhsNUefci6hY3P85w7jy589glYNbVX3hVD5QhIRqeR31dFdsaqXe+9/mHvufZBUtpkAl56Ch+VqKlGFcRN34rHHnzTOwNT2HHMv/Bb77dyOissUygFBvpnv/uwe5s6/mwkNFnO++032e/NEw1xjoxWUA7DEqZGxCaBGNQVkbJs+X1NxbFZ1vci3vjOH55evpnPiJObOOZPWdHVmmVjzpSgS7ctM1LgiDGEJy6rGZKItiuWQ55euZOnSZaxf1yW+OB3tbbxxn5k0jh/PHx75C+d8/8d09fm0dk4ijGPec8DbOfWEj9LWlCEvM1mHWEpCH5k6m6aSjaoUwP6xoptrb7qNPz3xN/Lj2rEl0Isjw6i0OIRxBMpCuRn6Sh4r1xYoFYt88D0z+OHZX6GRCC9Icd8jz/ON82YbL+/zn30/Jx5zOONksL0l7HwGz6kaWfm39mMCYa0JQ43naRryNpWKxo9i3Abb2Dtx93+/4AVmz76C9Sufpy1V4dZrfsz0qZPwfE2USnHVrx/moitupOT77PPmPUgbSxLiqJhcNoNXCShWIuOpSa623NvNvnvvxReOO4aJbTlsC5aufpFTz/ghTy9eTjab5wOHHEQurXC1hAMhlkw3o26VUWmNaRs7LPOlE4/DskK0X6GnWObJvy3iuSXLiENNPp1mYnsrM2e+mcYJE+gNxVeApxYt5rwf/pQlK1azoa9A67hG3rnvTE496Th2m9SECnwyDriOzPeXOyfLQ5iyutfj57fdzQMPPQqpHBUJXlOucU4yEkhoieNE7NKEsThrrunoY4e/nUPfsw9526ISpFm0tI+vnfFdUfwc+ZGD+MSHD2G8a5PRysxkr1+2xHhkwgIFpXKZbDZLKEG6ZRtnSFzrQmgRWzalWOQo5Iabf8tjCx6i0LOWo95/MB8/6ghyuQaTQfnH4jXMueZm1hWqrrw4E2lLEwdl0qmUoVu5WSPdWXFIvCKHHfRujv7IYeTTtrHhy9f0cPnVN7Fk5RrCKCabcoi8PpxYXLJq1qZqNCwcrUjpiNZxWc49+zTa25qJ/Aor16zl74ueI9Y2URAxoa2V3abvRHPzOEqxIkq5+LFGTNSa9R4/m/dznnl2CXHo4/X1sOu0SXz1xOPZY/pOqDAg5bzsiDQTDiwMg8re4nqKTekuenihpuh5ZFzHqBJRBaLQqikci0jZOE4G183S0SJTuIRj2cRRmg0lTU9fES+s0DzOpq0pb2xMhrRxxUVwTOrIzDuxOhLbSerMxo9jfLGptoOlJCaKiCObIFBkMg5hFNHV3UvJ87AcyelYTBjfhhInKlakXYu+Pp8ez6cYRlhRYGYEoW8y65KWC0WAwoiGfBZbaTqaG8lYsXl1EmlFRVss7+rFMyhLLk88PAmC4+psE7Nh7KRFFEDWcU22p7OtBdeYIU2h5FGJ4qq77wfkHJvGvKRgIjPGYhBiZyRhgQmwS6Fm2bJ/kUmlcW1NuVigpTFHe/M4M7ZcOrPxVU9i5UwAfo+Og0O0jggCCC2X2JF5UKVbJqmxjxJYKhl41TsTGo1KtwMiLW6wSIWL71dBkUxLJuVLGAnaAZ0xz0o4YuIdsaryXBINiUqRrIydylRjrXKZTMYlMglUCx14BmDLdc3AnUweL9JoS5EWOoVgr2ziM0m/VSQ4Fhc7lnjPWB5Df0WeMR6GIvYruFZMpmqkhIv4kYV201QEN8tYCzJ2dbzyWC1TKiIn2EoyX7zLtIQ7WuP7AalM2njffqTJ2MrwsCq1EUHkESvbhDySnRIhEr4Is21LUkIijvLCTfqO0HFMyqjKTYpJeV2Djo+XRsUARuLtJYliAc5MUmF4Em2aBKx8F0rUJpnVMjgWPhYWKWyUcQgC3yedCfEqRTLpJqIoTWzLs+Ifiacqfmw152iANXGKg1SKwsikyuIgNIppw4YeWtqbTf0ojgi0hXKyJoQR704SMg3C3KBiBKXoK6xc1jAgDgKj7jzfN0Lh+zJOed9lkbIVFa9kgJFYT6XSRipjO005MsMywmuEtEqo+VSFALxQ7E8Vc0mQ25Yy7VaBeMnBc82jknIKEgmotuMHAY7tGBAFLpPgiEIz++V/SuUi6XQG194UOK21STKfBfqcGlE18mr41jIttST35t9XdX7NB63Wrmbjay3VUunVAVdlv5bzr6oeMwVM2l1Q2DS3s1HO+l02VRtk8vRGZ0ck3oiGEiaojS8Cai32r7/pOCTZm/zVZCiqOfv+lGxOVX8+JZRvJHXzfsyzm/Bk8wlUc9c2/77Gu5fVN691zIvULTVV/27McsC8SDVLF8YsiXXCtsQBs3RBdEM1W1sv2wMHxLxKTsGsZJabmerL87YH2OBRpdT+NeBkT1x9Qez2AdwmC2LrS9C3D9CEyk2WoMs9pPVNH9sHeC9t+kjsXP3k17EP3ENKKXM678a4sr6xceyjBmxxY6PcBFzfSjy28Xv5VuJEXdY3749d4La8eT8Brn5cxtgF7lWPy5C7uOsH1Iw98CTb/MoH1CSzrn4k1NgD7tWPhEqAkwvV64ewjS3wXvsQtgS8+rGHYwe4gR17mAAnx6fXDxodG+AN/KDRBLz60b6jD9zWHe2bACeX9NQP0x5d8Lb+MO0EvPrx9aMH3LYdX58ANxWoXxgx8uAN7sKIBLyvAfUrWkYWvMFd0VKjVWtdvxRp5IAbmkuRklm3F1C/hmz4wRvaa8gS8L4I1C/+G17whvbiv34qcy7wheGlfYdtfXiu2uwHXn2Jw9DL1vBebpuozF2SwHzK0NO/Q7Y4MtdJJ+DJgpX6Be6Dl7ORu8C9n8o8Arh98LTv0C0cqZS6Y1s48Ap7mgbWlNb6aOCWgdWu19qMA8copeZvK1cGBVyiNuvgbT33BwWadDdo4BLwRG3+MjkKZOuHseM8ITbt49uqHvuzaUiA6+ew3AzUvc0tC6J4j59USsnFHIMuQwZcv1BhHmCWSdfLRg4IWJ9RSi0ZKp4MKXD9PM56huUlhLYqIzJQYIcFuGT2SW5zTnKK0kDpeT3Vk4TxyUqpK4djUMMGXAKevFW4FHjfcBA/htu8FzhVKTVsezGGFbh+qlNexsr1WekxzOyhIE3eXJ+ulPrRUDT2am2MCHDJ7JNlEOcCxw33oEap/euAs5RSy0ei/xEDrt/sk9VjpwEfHIkBjkAfdwEXKqXkrcmIlREHrh+Asuj2lO34onhZd3qZUkqWdYx4GTXg+gEoexVOBI4fqkzOMHJRds3IksW5m1+oPox9brHpUQeuH4CyxetYyS6MwZuRZROMZIVu7H8X90iD1b+/MQNcf6KSG5KPTNToaN3bKtkOsV+3124CHk2gNu97TAK3GYhylMdBSRptFrDvMAT1cljeY8n2MgHsAbmHdCwBtd0BtznBydljewN7ALsC05LEdicg6vaVktyS5F0vp+nK2d3A0mSV9tPAU8mFemMZq01o+390JmbEzBeoTQAAAABJRU5ErkJggg==",
			"name": "SpaceX",
			"tags": [
				"brands",
				"cpace",
				"falcon"
			],
			"title": "It's been a long road",
			"url": "https://www.spacex.com/"
		},
		{
			"clicks": 6,
			"id": "00a2b1fd-98c1-48bb-afc7-554ebb50275f",
			"image": "data:image/png;base64,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",
			"name": "dealntech.com",
			"tags": [
				"im-bored",
				"cnews"
			],
			"title": "Mobile Phones News, Specifications, Reviews",
			"url": "https://www.dealntech.com"
		},
		{
			"clicks": 0,
			"id": "01792c3c-e300-44d6-8e0b-e051a34e1d59",
			"image": "",
			"name": "drawkit.io",
			"tags": [
				"free",
				"cresource"
			],
			"title": "Beautiful free vector illustrations",
			"url": "https://www.drawkit.io/"
		},
		// {
		// 	"clicks": 1,
		// 	"id": "018777dc-cc2f-4987-be02-c2649db29fa6",
		// 	"image": "data:image/png;base64,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",
		// 	"name": "Codementor",
		// 	"tags": [
		// 		"programming",
		// 		"cgit"
		// 	],
		// 	"title": "1011 Common Git Problems and How to Fix Them",
		// 	"url": "https://www.codementor.io/@citizen428/git-tutorial-10-common-git-problems-and-how-to-fix-them-aajv0katd"
		// },
		// {
		// 	"clicks": 0,
		// 	"id": "0235c367-5d19-4b79-bc76-2621d3be0264",
		// 	"image": "",
		// 	"name": "medium.com",
		// 	"tags": [
		// 		"nginx",
		// 		"angular",
		// 		"security"
		// 	],
		// 	"title": "Nginx configuration for Angular",
		// 	"url": "https://medium.com/faun/my-nginx-configuration-for-angular-6f748a4ff683"
		// },
		// {
		// 	"clicks": 0,
		// 	"id": "02c268f1-404d-445a-8fa5-594e97fa38d0",
		// 	"image": "",
		// 	"name": "unicorn-utterances.com",
		// 	"tags": [
		// 		"angular",
		// 		"2-be-read"
		// 	],
		// 	"title": "ngModel and formControl Implementation ControlValueAccessor",
		// 	"url": "https://unicorn-utterances.com/posts/angular-components-control-value-accessor/"
		// },
		// {
		// 	"clicks": 0,
		// 	"id": "03270396-c410-4998-b31a-c8606dae4723",
		// 	"image": "",
		// 	"name": "cssscript.com",
		// 	"tags": [
		// 		"css",
		// 		"library",
		// 		"colors"
		// 	],
		// 	"title": "TEXTColor : Reverse Text Color Based On Bg Color",
		// 	"url": "https://www.cssscript.com/reverse-text-color-background/"
		// },
		// {
		// 	"clicks": 1,
		// 	"id": "03d89650-b475-4f90-9289-d071b89e758e",
		// 	"image": "",
		// 	"name": "netbasal.com",
		// 	"tags": [
		// 		"rxjs",
		// 		"events",
		// 		"angular"
		// 	],
		// 	"title": "event emitters",
		// 	"url": "https://netbasal.com/event-emitters-in-angular-13e84ee8d28c"
		// },
		// {
		// 	"clicks": 0,
		// 	"id": "04b2e4b7-1413-4054-923d-e9af6f812370",
		// 	"image": "",
		// 	"name": "netbasal.com",
		// 	"tags": [
		// 		"2-be-read"
		// 	],
		// 	"title": "structural directives",
		// 	"url": "https://netbasal.com/leverage-structural-directives-to-create-powerful-components-in-angular-c95e3cfde789"
		// },
		// {
		// 	"clicks": 0,
		// 	"id": "04cb8ac0-f26b-46ee-af36-cf31ceba8a62",
		// 	"image": "",
		// 	"name": "dev.to",
		// 	"tags": [
		// 		"free",
		// 		"resource"
		// 	],
		// 	"title": "50+ free tools and resources to create awesome user interfaces",
		// 	"url": "https://dev.to/davidepacilio/50-free-tools-and-resources-to-create-awesome-user-interfaces-1c1b"
		// },
		// {
		// 	"clicks": 0,
		// 	"id": "055dcda5-ceb0-4bf1-a02b-fa29a3501462",
		// 	"image": "data:image/png;base64,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",
		// 	"name": "Level Up Coding",
		// 	"tags": [
		// 		"javascript",
		// 		"programming",
		// 		"lookup",
		// 		"tricks"
		// 	],
		// 	"title": "5 JavaScript Tricks That Are Good To Know",
		// 	"url": "https://levelup.gitconnected.com/5-javascript-tricks-that-are-good-to-know-78045dea6678"
		// },
		// {
		// 	"clicks": 0,
		// 	"id": "05c27ff5-bf45-4cd0-86ae-ec6fcfde6de2",
		// 	"image": "",
		// 	"name": "GitHub",
		// 	"tags": [
		// 		"angular",
		// 		"starter"
		// 	],
		// 	"title": "Angular, NgRx, Angular CLI & Angular Material Starter Project",
		// 	"url": "https://github.com/tomastrajan/angular-ngrx-material-starter"
		// },
		// {
		// 	"clicks": 0,
		// 	"id": "06761e0d-0ff4-46b7-9fad-6fa52878fc71",
		// 	"image": "",
		// 	"name": "netbasal.com",
		// 	"tags": [
		// 		"2-be-read"
		// 	],
		// 	"title": "when to unsubscribe",
		// 	"url": "https://netbasal.com/when-to-unsubscribe-in-angular-d61c6b21bad3"
		// }
	];

}
