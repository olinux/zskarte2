import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomImagesComponent} from './custom-images.component';

describe('CustomImagesComponent', () => {
  let component: CustomImagesComponent;
  let fixture: ComponentFixture<CustomImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
