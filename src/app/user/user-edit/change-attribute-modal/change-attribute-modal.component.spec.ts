import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAttributeModalComponent } from './change-attribute-modal.component';

describe('ChangeAttributeModalComponent', () => {
  let component: ChangeAttributeModalComponent;
  let fixture: ComponentFixture<ChangeAttributeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChangeAttributeModalComponent]
    });
    fixture = TestBed.createComponent(ChangeAttributeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
