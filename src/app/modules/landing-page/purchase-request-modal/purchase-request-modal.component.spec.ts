import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestModalComponent } from './purchase-request-modal.component';

describe('PurchaseRequestModalComponent', () => {
  let component: PurchaseRequestModalComponent;
  let fixture: ComponentFixture<PurchaseRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseRequestModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
