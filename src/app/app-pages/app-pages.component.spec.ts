import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPagesComponent } from './app-pages.component';

describe('AppPagesComponent', () => {
  let component: AppPagesComponent;
  let fixture: ComponentFixture<AppPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppPagesComponent]
    });
    fixture = TestBed.createComponent(AppPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
