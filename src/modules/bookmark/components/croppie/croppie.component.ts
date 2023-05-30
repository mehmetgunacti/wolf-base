import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CroppieOptions } from 'croppie';
import { environment } from 'environments/environment';
import { Observable, Subscription, combineLatest, timer } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { ScriptLoaderService } from 'services';
import { CroppieWrapper, createCroppieWrapper } from './croppie.model';

const croppieOptions: CroppieOptions = {
	viewport: {
		width: 110,
		height: 110,
		type: 'circle'
	},
	boundary: {
		width: 120,
		height: 120
	},
	enforceBoundary: false
};

@Component({
	selector: 'app-croppie',
	templateUrl: './croppie.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CroppieComponent implements OnDestroy, AfterViewInit {

	@ViewChild('croppieDiv') croppieDiv!: ElementRef<HTMLDivElement>;
	@ViewChild('fileinput') fileInput!: ElementRef;

	@Input() wControl = new FormControl();
	@Input() toBind = '';

	croppieWrapper: CroppieWrapper;
	subscriptions = new Subscription();

	imageLoaded$: Observable<boolean>;
	initialized$: Observable<boolean>;

	constructor(
		@Inject(DOCUMENT) private readonly document: Document,
		private scriptLoader: ScriptLoaderService
	) {

		this.croppieWrapper = createCroppieWrapper();
		this.imageLoaded$ = this.croppieWrapper.imageLoaded$;
		this.initialized$ = this.croppieWrapper.initialized$;

	}

	ngAfterViewInit(): void {

		this.subscriptions.add(

			combineLatest([

				this.scriptLoader.appendScript2Body(environment.croppie.scriptUrl), // Observable<void>
				this.scriptLoader.appendLink2Head(environment.croppie.styleUrl), // Observable<void>
				timer(600)

			]).subscribe({

				complete: () => {
					if (this.document.defaultView?.Croppie) {
						const el: HTMLElement = this.croppieDiv.nativeElement;
						const croppie: Croppie = new this.document.defaultView.Croppie(el, croppieOptions);
						this.croppieWrapper.init(croppie, el);
						this.croppieWrapper.bind(this.wControl.value);
					} else
						throw new Error('Croppie not available in windows scope');
				},
				error: (err) => console.error(err)

			})

		);

		this.subscriptions.add(

			this.croppieWrapper.result$
				.pipe(
					distinctUntilChanged()
				)
				.subscribe(base64 => {

					this.wControl.setValue(base64);
					this.wControl.markAsTouched();
					this.wControl.markAsDirty();

				})

		);

	}

	unbindCroppie(): void {

		this.croppieWrapper.unbind();
		// the change event doesn't fire when the user
		// selects same image again
		// this resets the readonly 'files' object (of type FilesList)
		this.fileInput.nativeElement.value = '';

	}

	ngOnDestroy(): void {

		this.subscriptions.unsubscribe();
		this.croppieWrapper.destroy();

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
			this.croppieWrapper.bind(fileData);
		};

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