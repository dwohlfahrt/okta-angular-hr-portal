import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


import { User } from '../shared/models/user.model';
import { Group } from '../shared/models/group.model';
import { UserService } from '../shared/services/user.service';
import { GroupService } from '../shared/services/group.service';

import { getCurrentUser } from '../shared/utils';
import { environment } from '../../environments/environment';

import { Observable, zip } from 'rxjs';

@Component({
  selector: 'app-admin-manage-members',
  templateUrl: './admin-manage-members.component.html',
  styleUrls: ['./admin-manage-members.component.scss']
})
export class AdminManageMembersComponent implements OnInit {
  groupName: string;
  users: Array<any>;
  members: Array<User>;
  group: Group;
  currentUser: any;
  ready: boolean;

  constructor(
    private userService: UserService, 
    private groupService: GroupService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.groupName = this.route.snapshot.paramMap.get('groupName');
    this.currentUser = getCurrentUser();
    // get all users of admin group
    const responses = zip(
      this.groupService.getByName(this.groupName),
      this.userService.list(),
      this.groupService.getMembers(this.groupName),
    );
    responses.subscribe(([groups, users, members]) => {
      this.group = groups[0];
      this.members = members;
      this.users = users.filter(user => {
        return !this.members.find(m => (m.profile.email === user.profile.email));
      });
      this.ready = true;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    let user = JSON.parse(JSON.stringify(event.previousContainer.data[event.previousIndex]));
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);

    let req: Observable<any>;
    if (event.previousContainer.id === 'inGroup') {
      req = this.groupService.removeUser(user.id, this.group.id);
    } else {
      req = this.groupService.addUser(user.id, this.group.id);
    }

    req.subscribe(
      resp => {},
      err => {
        console.error(err);
        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          event.currentIndex,
          event.previousIndex
        );
      }
    );
  }
}
