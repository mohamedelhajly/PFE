import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtiViewComponent } from './dti-view.component';

describe('DtiViewComponent', () => {
  let component: DtiViewComponent;
  let fixture: ComponentFixture<DtiViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtiViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DtiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
