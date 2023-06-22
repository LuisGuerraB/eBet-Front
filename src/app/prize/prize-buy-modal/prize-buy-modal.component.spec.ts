import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeBuyModalComponent } from './prize-buy-modal.component';

describe('PrizeBuyModalComponentComponent', () => {
  let component: PrizeBuyModalComponent;
  let fixture: ComponentFixture<PrizeBuyModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PrizeBuyModalComponent]
    });
    fixture = TestBed.createComponent(PrizeBuyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
