import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

import { environment} from '../environments/environment';
import { userBelongsToGroup, getAccessToken, getIdToken, getCurrentUser } from './shared/utils';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'okta-demo-angular';
  isAuthenticated: boolean = false;
  hasAdminGroup: boolean = false;
  claims: any;

  accessToken = '';
  idToken = '';

  constructor(public oktaAuth: OktaAuthService) {
    this.oktaAuth.$authenticationState.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (this.isAuthenticated) {
      this.claims = await this.oktaAuth.getUser();
      this.hasAdminGroup = userBelongsToGroup(this.claims, environment.adminGroup);
      this.accessToken = getAccessToken();
      this.idToken = getIdToken();
    }
  }

  logout() {
    this.oktaAuth.logout('/');
  }
}
