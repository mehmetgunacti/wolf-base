import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CropType } from 'croppie';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { createCroppie, ICroppie } from './croppie.model';

@Component({
	selector: 'app-croppie',
	templateUrl: './croppie.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CroppieComponent implements OnInit, OnDestroy, AfterViewInit {

	@ViewChild('croppieDiv') croppieDiv!: ElementRef;
	@ViewChild('fileinput') fileInput!: ElementRef;

	@Input() wControl = new FormControl();
	@Input() wType: CropType = 'square';

	croppie!: ICroppie;
	bound$!: Observable<boolean>;
	subscriptions = new Subscription();
	initialized = false;

	constructor() { }

	ngOnInit(): void {

		this.croppie = createCroppie({
			viewport: {
				width: 110,
				height: 110,
				type: this.wType
			},
			boundary: {
				width: 120,
				height: 120
			},
			enforceBoundary: false
		});
		this.bound$ = this.croppie.bound$;

	}

	ngAfterViewInit(): void {

		this.croppie.init(this.croppieDiv.nativeElement);

		this.subscriptions.add(
			this.croppie.result$.pipe(
				distinctUntilChanged(),
				// tap(base64 => {
				// 	console.log('resulting croppie: makind dirty');
				// 	this.wControl.setValue(base64);
				// 	this.wControl.markAsTouched();
				// 	this.wControl.markAsDirty();
				// })
			).subscribe(base64 => {
				if (this.initialized) {
					this.wControl.setValue(base64);
					this.wControl.markAsTouched();
					this.wControl.markAsDirty();
				}
				this.initialized = true;
			})
		);
		this.croppie.bind(this.wControl.value);
		// the following is impossible to do!
		// chicken egg situation => endless loop
		// this.subscriptions.add(
		// 	this.wControl.valueChanges.subscribe(newValue => this.croppie.bind(newValue))
		// );

	}

	unbindCroppie(): void {
		this.croppie.unbind();
		// the change event doesn't fire when the user
		// selects same image again
		// this resets the readonly 'files' object (of type FilesList)
		this.fileInput.nativeElement.value = '';
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
		this.croppie.destroy();
	}

	onFileSelected(event: Event): void {
		// The FileReader object lets web applications asynchronously
		// read the contents of files (or raw data buffers) stored on
		// the user's computer, using File or Blob objects to specify
		// the file or data to read.
		//
		// File objects may be obtained from a FileList object returned
		// as a result of a user selecting files using the <input>
		// element, from a drag and drop operation's DataTransfer
		// object, or from the mozGetAsFile() API on an HTMLCanvasElement.
		const reader = new FileReader();

		// The FileReader.onload property contains an event
		// handler executed when the load event is fired,
		// when content read with readAsArrayBuffer, readAsBinaryString,
		// readAsDataURL or readAsText is available.
		reader.onload = (loadEvent) => {
			// since we're in onload, an image has been selected
			// so we can (have to) bind it to the newly created Croppie object
			const fileData = (loadEvent.target as FileReader).result as string;
			this.croppie.bind(fileData);

			// we add an 'update' event listener to the native 'div'
			// and call 'result' on croppie object data:image/png;base64.
			// div gets updated when user drags loaded image
			// this.addEventListener();
		};
		// this.wControl.setValue(r) // .substring(r.indexOf(',') + 1));

		// The readAsDataURL method is used to read the contents of the
		// specified Blob or File. When the read operation is finished,
		// the readyState becomes DONE, and the loadend is triggered.
		// At that time, the result attribute contains the data as a
		// data: URL representing the file's data as a base64 encoded
		// string.
		//
		// Note: The blob's result cannot be directly decoded as Base64
		// without first removing the Data-URL declaration preceding the
		// Base64-encoded data. To retrieve only the Base64 encoded
		// string, first remove data:* / *;base64, from the result.
		const files = (event.target as HTMLInputElement).files;
		if (files)
			reader.readAsDataURL(files[0]);
	}

}


// this.wControl.statusChanges.subscribe(() => this.setErrors());
// private error = '';
// setErrors(): void {
// 	this.error = '';
// 	const s = this.wControl.dirty &&
// 		this.wControl.invalid &&
// 		this.wControl.errors ? 'ErrorMessages.get(this.wControl.errors)' : '';
// }



// // @ANGULAR
// import { Component, ViewChild, ElementRef, forwardRef, Input, OnInit } from '@angular/core';
// import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormControl } from '@angular/forms';

// // @THIRD PARTY
// import { Croppie } from 'croppie/croppie';

// // @WOLF359
// import { ErrorMessages } from '@wolf359/forms/forms';

// @Component({
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       useExisting: forwardRef(() => CroppieComponent),
//       multi: true
//     }
//   ],
//   selector: 'app-croppie',
//   templateUrl: './croppie.component.html'
// })
// export class CroppieComponent implements ControlValueAccessor, OnInit {
//   @ViewChild('croppieElement') croppieElement: ElementRef;
//   @Input() control: FormControl;
//   croppie: Croppie;
//   croppieOutputOptions = {
//     type: 'base64',
//     size: 'viewport',
//     format: 'png',
//     quality: 1,
//     circle: true
//   };

//   private error = '';
//   private onTouchedCallback = () => { };
//   private onChangeCallback = (_: any) => { };
//   constructor() { }

//   ngOnInit(): void {
//     this.wControl.statusChanges.subscribe(() => this.setErrors());
//     this.setErrors();
//   }

//   setErrors(): void {
//     this.error =
//       this.wControl.dirty &&
//         this.wControl.invalid &&
//         this.wControl.errors ? ErrorMessages.get(this.wControl.errors) : '';
//   }

//   onFileSelected(changeEvent) {
//     this.croppieElement.nativeElement.innerHTML = '';
//     this.croppie = null;
//     const reader = new FileReader();
//     reader.onload = (loadEvent) => {
//       this.croppie = new Croppie(this.croppieElement.nativeElement, {
//         viewport: {
//           width: 110,
//           height: 110,
//           type: 'circle'
//         },
//         boundary: {
//           width: 160,
//           height: 210
//         },
//         enforceBoundary: true
//       });

//       // since we're in onload, an image has been selected
//       // so we can (have to) bind it to the newly created Croppie object
//       this.croppie.bind({
//         url: (<FileReader>loadEvent.target).result
//       }).then(
//         // in case the user doesn't drag the image (so no 'update' event occurs)
//         // we take the result right after bind
//         this.croppie
//           .result(this.croppieOutputOptions)
//           .then((result) => this.onChangeCallback(result.substring(result.indexOf(','))))
//       );

//       // we add an 'update' event listener to the native 'div'
//       // and call 'result' on croppie object
//       this.croppieElement.nativeElement.addEventListener('update',
//         (result) => this.croppie
//           .result(this.croppieOutputOptions)
//           .then((r) => this.onChangeCallback(r.substring(r.indexOf(','))))
//       );
//     };
//     reader.readAsDataURL(changeEvent.target.files[0]);
//   }

//   displayCroppie() {
//     this.croppie.result({
//       type: 'base64',
//       size: 'viewport',
//       format: 'png',
//       quality: 1,
//       circle: true
//     }).then((result) => console.log(result));
//   }

//   /********************************/
//   /* ControlValueAccessor RELATED */
//   /********************************/

//   writeValue(obj: any): void { }

//   setDisabledState?(isDisabled: boolean): void { }

//   registerOnChange(fn) {
//     this.onChangeCallback = fn;
//   }

//   registerOnTouched(fn) {
//     this.onTouchedCallback = fn;
//   }
// }
