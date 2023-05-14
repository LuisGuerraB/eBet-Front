import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleBetComponent } from './simple-bet.component';

describe('SimpleBetComponent', () => {
  let component: SimpleBetComponent;
  let fixture: ComponentFixture<SimpleBetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [SimpleBetComponent]
});
    fixture = TestBed.createComponent(SimpleBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
