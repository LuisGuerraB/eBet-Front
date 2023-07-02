import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchResultComponent } from './match-result.component';

describe('MatchResultComponent', () => {
  let component: MatchResultComponent;
  let fixture: ComponentFixture<MatchResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatchResultComponent]
    });
    fixture = TestBed.createComponent(MatchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
