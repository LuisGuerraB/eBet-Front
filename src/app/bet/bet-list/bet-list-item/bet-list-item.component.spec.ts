import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetListItemComponent } from './bet-list-item.component';

describe('BetListItemComponent', () => {
  let component: BetListItemComponent;
  let fixture: ComponentFixture<BetListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BetListItemComponent]
    });
    fixture = TestBed.createComponent(BetListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
