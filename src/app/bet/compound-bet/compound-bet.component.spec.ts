import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundBetComponent } from './compound-bet.component';

describe('CompoundBetComponent', () => {
  let component: CompoundBetComponent;
  let fixture: ComponentFixture<CompoundBetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompoundBetComponent]
    });
    fixture = TestBed.createComponent(CompoundBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
