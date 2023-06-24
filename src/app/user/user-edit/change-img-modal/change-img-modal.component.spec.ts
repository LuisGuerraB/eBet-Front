import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeImgModalComponent } from './change-img-modal.component';

describe('ChangeImgModalComponent', () => {
  let component: ChangeImgModalComponent;
  let fixture: ComponentFixture<ChangeImgModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChangeImgModalComponent]
    });
    fixture = TestBed.createComponent(ChangeImgModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
