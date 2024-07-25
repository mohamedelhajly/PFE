import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTenderModalComponent } from './save-tender-modal.component';

describe('SaveTenderModalComponent', () => {
  let component: SaveTenderModalComponent;
  let fixture: ComponentFixture<SaveTenderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveTenderModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveTenderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
