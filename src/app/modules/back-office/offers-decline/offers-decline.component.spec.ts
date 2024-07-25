import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersDeclineComponent } from './offers-decline.component';

describe('OffersDeclineComponent', () => {
  let component: OffersDeclineComponent;
  let fixture: ComponentFixture<OffersDeclineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffersDeclineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffersDeclineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
