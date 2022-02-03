import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodedetailComponent } from './nodedetail.component';

describe('NodedetailComponent', () => {
  let component: NodedetailComponent;
  let fixture: ComponentFixture<NodedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodedetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
