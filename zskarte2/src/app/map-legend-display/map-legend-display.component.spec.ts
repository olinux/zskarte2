import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLegendDisplayComponent } from './map-legend-display.component';

describe('MapLegendDisplayComponent', () => {
  let component: MapLegendDisplayComponent;
  let fixture: ComponentFixture<MapLegendDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapLegendDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLegendDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
