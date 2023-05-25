import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchItemComponent } from './match-item.component';

describe('MatchitemComponent', () => {
  let component: MatchItemComponent;
  let fixture: ComponentFixture<MatchItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatchItemComponent]
    });
    fixture = TestBed.createComponent(MatchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
