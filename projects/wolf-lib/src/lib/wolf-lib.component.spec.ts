import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WolfLibComponent } from './wolf-lib.component';

describe('WolfLibComponent', () => {
  let component: WolfLibComponent;
  let fixture: ComponentFixture<WolfLibComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WolfLibComponent]
    });
    fixture = TestBed.createComponent(WolfLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
