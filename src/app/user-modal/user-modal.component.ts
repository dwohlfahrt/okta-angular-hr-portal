import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
  userForm: FormGroup;
  action:string;
  localUser:any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.action = this.data.delete ? 'Delete' : this.data.user ? 'Update' : 'Create';
    this.localUser = this.action === 'Update' ? {...this.data.user} : { profile: {}};

    this.userForm = this.fb.group({
      firstName: [this.localUser.profile.firstName, Validators.required],
      lastName: [this.localUser.profile.lastName, Validators.required],
      email: [this.localUser.profile.email, Validators.required],
      mobilePhone: [this.localUser.profile.mobilePhone, Validators.required],
      title: this.localUser.profile.title
    });
  }

  onClickActionButton(returnValue) {
    this.dialogRef.close(returnValue);
  }
}