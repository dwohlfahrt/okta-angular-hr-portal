import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';


import { UserModalComponent } from '../user-modal/user-modal.component';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { GroupService } from '../shared/services/group.service';


@Component({
  selector: 'app-admin-manage-users',
  templateUrl: './admin-manage-users.component.html',
  styleUrls: ['./admin-manage-users.component.scss']
})
export class AdminManageUsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ready: boolean;

  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['name', 'email', 'mobilePhone', 'title', 'lastLogin', 'update', 'delete'];

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private groupService: GroupService
  ) { }

  refreshUsers() {
    this.userService.list().subscribe(users => {
      this.dataSource = new MatTableDataSource<User>(users);
      this.dataSource.paginator = this.paginator;
      this.ready = true;
    });
  }

  ngOnInit(): void {
    this.refreshUsers();
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '30%',
      data: {
        delete: true,
        message: 'Are you sure you want to delete this User?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deactivate(user.id).subscribe(resp => {
          this.userService.delete(user.id).subscribe(resp => {
            this.refreshUsers();
          });
        });
      }
    });
  }

  upsertUser(user: User) {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '30%',
      data: {
        user: user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result);
      if (result) {
        result.login = result.email;
        let operation, action;
        if (user) {
          action = "update";
          operation = this.userService.update(user.id, { profile: result })
        } else {
          action = "create";
          operation = this.userService.create({profile: result});
        }
        operation.subscribe(user => {
          this.refreshUsers();
        });
      }
    });
  }

}
