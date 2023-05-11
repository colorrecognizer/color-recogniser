import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorRecogniserComponent } from './color-recogniser.component';

describe('ColorRecogniserComponent', () => {
  let component: ColorRecogniserComponent;
  let fixture: ComponentFixture<ColorRecogniserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorRecogniserComponent]
    });
    fixture = TestBed.createComponent(ColorRecogniserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
