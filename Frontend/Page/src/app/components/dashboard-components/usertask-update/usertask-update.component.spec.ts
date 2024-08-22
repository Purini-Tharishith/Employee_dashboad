import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertaskUpdateComponent } from './usertask-update.component';

describe('UsertaskUpdateComponent', () => {
  let component: UsertaskUpdateComponent;
  let fixture: ComponentFixture<UsertaskUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsertaskUpdateComponent]
    });
    fixture = TestBed.createComponent(UsertaskUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
