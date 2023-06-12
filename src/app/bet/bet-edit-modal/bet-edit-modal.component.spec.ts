import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetEditModalComponent } from './bet-edit-modal.component';

describe('BetEditModalComponent', () => {
  let component: BetEditModalComponent;
  let fixture: ComponentFixture<BetEditModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BetEditModalComponent]
    });
    fixture = TestBed.createComponent(BetEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
