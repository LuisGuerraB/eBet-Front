import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetItemComponent } from './bet-item.component';

describe('CompoundBetComponent', () => {
  let component: BetItemComponent;
  let fixture: ComponentFixture<BetItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BetItemComponent]
    });
    fixture = TestBed.createComponent(BetItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
