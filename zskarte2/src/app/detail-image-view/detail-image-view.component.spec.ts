import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailImageViewComponent} from './detail-image-view.component';

describe('DetailImageViewComponent', () => {
  let component: DetailImageViewComponent;
  let fixture: ComponentFixture<DetailImageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailImageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailImageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
