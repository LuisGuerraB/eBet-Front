import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetModalComponent } from './bet-modal.component';

describe('BetmodalComponent', () => {
  let component: BetModalComponent;
  let fixture: ComponentFixture<BetModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BetModalComponent]
    });
    fixture = TestBed.createComponent(BetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
