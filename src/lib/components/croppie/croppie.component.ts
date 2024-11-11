import {
	Component,
	computed,
	ElementRef,
	forwardRef,
	output,
	signal,
	viewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlyphDirective } from '@directives';
import { BaseComponent } from '../base.component';

@Component({
	standalone: true,
	imports: [ GlyphDirective ],
	selector: 'w-croppie',
	templateUrl: './croppie.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CroppieComponent),
			multi: true
		}
	],
	host: {
		'(window:mouseup)': 'onMouseUp()',
		'class': 'relative flex flex-col items-center p-2'
	}
})
export class CroppieComponent extends BaseComponent implements ControlValueAccessor {

	// ViewChild
	canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
	fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

	// Output
	imageChanged = output<string | null>();

	private isDragging = false;
	private lastX = 0;
	private lastY = 0;
	private offsetX = 0;
	private offsetY = 0;

	// Model
	protected disabled = signal<boolean>(false);

	//////////// boilerplate
	private onChange: any = () => { };
	private onTouched: any = () => { };
	registerOnChange(fn: any): void { this.onChange = fn; }
	registerOnTouched(fn: any): void { this.onTouched = fn; }
	writeValue(value: string): void { this.base64Image = value; }
	setDisabledState(isDisabled: boolean): void { this.disabled.set(isDisabled); }
	////////////

	protected onInput(): void {

		this.imageChanged.emit(this.base64Image);
		this.onChange(this.base64Image);
		this.onTouched();

	}

	private ctx = computed(() =>
		this.canvasRef().nativeElement.getContext('2d')
	);

	protected image: HTMLImageElement | null = null;
	protected imageLoaded = signal<boolean>(false);
	protected zoom = 1;
	protected base64Image: string | null = null;

	protected onFileSelected(event: Event) {

		const file = (event.target as HTMLInputElement).files?.[ 0 ];
		if (file) {

			const reader = new FileReader();
			reader.onload = (e) => {

				this.image = new Image();
				this.image.onload = () => {

					this.offsetX = 0;
					this.offsetY = 0;
					this.zoom = 1;
					this.drawImage();
					this.imageLoaded.set(true);

				};
				this.image.src = e.target?.result as string;

			};
			reader.readAsDataURL(file);

		}

	}

	protected unloadImage() {

		const canvasContext = this.ctx();
		if (canvasContext) {

			this.image = null;
			this.zoom = 1;
			this.base64Image = null;
			this.offsetX = 0;
			this.offsetY = 0;
			canvasContext.clearRect(

				0,
				0,
				this.canvasRef().nativeElement.width,
				this.canvasRef().nativeElement.height

			);

		}
		this.onInput();
		// Reset the file input so that reloading same image works
		this.fileInput().nativeElement.value = '';
		this.imageLoaded.set(false);

	}

	protected onZoomChange(event: Event) {

		this.zoom = parseFloat((event.target as HTMLInputElement).value);
		this.drawImage();

	}

	protected startDrag(event: MouseEvent | TouchEvent) {

		event.preventDefault();

		if (this.image) {

			this.isDragging = true;
			if (event instanceof MouseEvent) {

				this.lastX = event.offsetX;
				this.lastY = event.offsetY;

			} else if (event instanceof TouchEvent && event.touches.length > 0) {

				this.lastX = event.touches[ 0 ].clientX;
				this.lastY = event.touches[ 0 ].clientY;

			}

		} else {

			event.preventDefault();
			this.fileInput().nativeElement.click();

		}

	}

	protected drag(event: MouseEvent | TouchEvent) {

		event.preventDefault();

		if (this.isDragging && this.image) {

			let x = 0;
			let y = 0;

			if (event instanceof MouseEvent) {
				x = event.offsetX;
				y = event.offsetY;
			} else if (event instanceof TouchEvent && event.touches.length > 0) {
				x = event.touches[ 0 ].clientX;
				y = event.touches[ 0 ].clientY;
			}

			const deltaX = x - this.lastX;
			const deltaY = y - this.lastY;
			this.offsetX += deltaX;
			this.offsetY += deltaY;
			this.lastX = x;
			this.lastY = y;
			this.drawImage();

		}

	}

	protected endDrag() {

		this.isDragging = false;

	}

	protected onMouseUp() {

		this.endDrag();

	}

	protected onKeyDown(event: KeyboardEvent) {

		if (this.image) {

			const moveDistance = 5; // pixels to move per key press
			switch (event.key) {
				case 'ArrowUp':
					this.offsetY -= moveDistance;
					break;
				case 'ArrowDown':
					this.offsetY += moveDistance;
					break;
				case 'ArrowLeft':
					this.offsetX -= moveDistance;
					break;
				case 'ArrowRight':
					this.offsetX += moveDistance;
					break;
				default:
					return; // Exit the function for other keys
			}
			event.preventDefault(); // Prevent scrolling the page
			this.drawImage();

		} else {

			event.preventDefault();
			this.fileInput().nativeElement.click();

		}

	}

	private drawImage() {

		if (!this.image) return;

		const canvasContext = this.ctx();
		if (canvasContext) {
			const canvas = this.canvasRef().nativeElement;
			canvasContext.clearRect(0, 0, canvas.width, canvas.height);
			canvasContext.save();
			canvasContext.beginPath();
			canvasContext.arc(
				canvas.width / 2,
				canvas.height / 2,
				canvas.width / 2,
				0,
				Math.PI * 2
			);
			canvasContext.clip();

			const scaledWidth = this.image.width * this.zoom;
			const scaledHeight = this.image.height * this.zoom;
			const x = (canvas.width - scaledWidth) / 2 + this.offsetX;
			const y = (canvas.height - scaledHeight) / 2 + this.offsetY;

			canvasContext.drawImage(
				this.image,
				x,
				y,
				scaledWidth,
				scaledHeight
			);
			canvasContext.restore();

			const tempCanvas = document.createElement('canvas');
			tempCanvas.width = canvas.width;
			tempCanvas.height = canvas.height;
			const tempCtx = tempCanvas.getContext('2d')!;

			tempCtx.beginPath();
			tempCtx.arc(
				tempCanvas.width / 2,
				tempCanvas.height / 2,
				tempCanvas.width / 2,
				0,
				Math.PI * 2
			);
			tempCtx.clip();

			tempCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height);

			this.base64Image = tempCanvas.toDataURL('image/png');
			this.onInput();

		}

	}

}
