import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageMembersComponent } from './admin-manage-members.component';

describe('AdminManageMembersComponent', () => {
  let component: AdminManageMembersComponent;
  let fixture: ComponentFixture<AdminManageMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
