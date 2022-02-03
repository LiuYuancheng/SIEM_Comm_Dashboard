import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphSiemComponent } from './graph-siem.component';

describe('GraphSiemComponent', () => {
  let component: GraphSiemComponent;
  let fixture: ComponentFixture<GraphSiemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphSiemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphSiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
