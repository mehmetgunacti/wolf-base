import { AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { hideSidebar } from 'store/actions/core-ui.actions';
import { selCoreIsBigScreen, selCoreIsSidebarVisible } from 'store/selectors/core-ui.selectors';

@Directive({
	selector: '[nav-overlay]'
})
export class NavOverlayDirective implements AfterViewInit, OnDestroy {

	private store: Store = inject(Store);
	private el: ElementRef = inject(ElementRef);
	private renderer: Renderer2 = inject(Renderer2);
	private subscription: Subscription = new Subscription();

	private overlay: HTMLElement | null = null;

	ngAfterViewInit(): void {

		this.subscription = combineLatest([

			this.store.select(selCoreIsBigScreen),
			this.store.select(selCoreIsSidebarVisible)

		]).subscribe(([big, visible]) => {

			if (big) {

				if (this.overlay !== null)
					this.removeOverlay();

			} else {

				if (this.overlay === null)
					this.overlay = this.createOverlay();

				this.overlay.style.display = visible ? 'block' : 'none';

			}

		});

	}

	ngOnDestroy(): void {

		this.subscription.unsubscribe();

	}

	private createOverlay(): HTMLElement {

		// <section>
		const parent: HTMLElement = this.el.nativeElement;

		// create overlay <div>
		const overlay = this.renderer.createElement('div');
		this.renderer.addClass(overlay, 'overlay');
		this.renderer.listen(overlay, 'click', () => this.store.dispatch(hideSidebar()));

		// insert as first child
		const firstChild: ChildNode | null = parent.firstElementChild;
		if (firstChild === null)
			this.renderer.appendChild(parent, overlay);
		else
			this.renderer.insertBefore(parent, overlay, firstChild);

		return overlay;

	}

	private removeOverlay(): void {

		const overlay = this.el.nativeElement.querySelector('.overlay');
		if (overlay)
			this.renderer.removeChild(this.el.nativeElement, overlay);
		this.overlay = null;

	}

}
