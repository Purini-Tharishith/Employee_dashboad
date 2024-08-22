import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSidenavComponent } from './manager-sidenav.component';

describe('ManagerSidenavComponent', () => {
  let component: ManagerSidenavComponent;
  let fixture: ComponentFixture<ManagerSidenavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerSidenavComponent]
    });
    fixture = TestBed.createComponent(ManagerSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
