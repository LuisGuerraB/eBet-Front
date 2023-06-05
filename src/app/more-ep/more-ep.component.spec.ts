import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreEpComponent } from './more-ep.component';

describe('MoreEpComponent', () => {
  let component: MoreEpComponent;
  let fixture: ComponentFixture<MoreEpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MoreEpComponent]
    });
    fixture = TestBed.createComponent(MoreEpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
