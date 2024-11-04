import { CommonModule } from '@angular/common';
import {
	Component,
	computed,
	ElementRef,
	HostListener,
	output,
	viewChild,
} from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
	selector: 'w-croppie',
	standalone: true,
	imports: [ CommonModule ],
	templateUrl: './croppie.component.html',
	styleUrl: './croppie.component.scss',
	animations: [],
})
export class CroppieComponent extends BaseComponent {
	// ViewChild
	canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
	fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

	// Output
	imageChanged = output<string | null>();

	private ctx = computed(() =>
		this.canvasRef().nativeElement.getContext('2d')
	);

	image: HTMLImageElement | null = null;
	zoom = 1;
	base64Image: string | null = null;
	private isDragging = false;
	private lastX = 0;
	private lastY = 0;
	private offsetX = 0;
	private offsetY = 0;

	onFileSelected(event: Event) {

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
				};
				this.image.src = e.target?.result as string;
			};
			reader.readAsDataURL(file);
		}
	}

	onZoomChange(event: Event) {
		this.zoom = parseFloat((event.target as HTMLInputElement).value);
		this.drawImage();
	}

	unloadImage() {
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
		this.imageChanged.emit(null);
		// Reset the file input so that reloading same image works
		this.fileInput().nativeElement.value = '';
	}

	startDrag(event: MouseEvent) {
		if (this.image) {
			this.isDragging = true;
			this.lastX = event.offsetX;
			this.lastY = event.offsetY;
		} else {
			event.preventDefault();
			this.fileInput().nativeElement.click();
		}
	}

	drag(event: MouseEvent) {
		if (this.isDragging && this.image) {
			const deltaX = event.offsetX - this.lastX;
			const deltaY = event.offsetY - this.lastY;
			this.offsetX += deltaX;
			this.offsetY += deltaY;
			this.lastX = event.offsetX;
			this.lastY = event.offsetY;
			this.drawImage();
		}
	}

	endDrag() {
		this.isDragging = false;
	}

	@HostListener('window:mouseup')
	onMouseUp() {
		this.endDrag();
	}

	onKeyDown(event: KeyboardEvent) {
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
			this.imageChanged.emit(this.base64Image);
		}
	}
}
