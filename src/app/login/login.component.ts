import { Component, OnInit } from '@angular/core';
import * as OktaSignIn from '@okta/okta-signin-widget';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signIn: any;
  constructor() {
    this.signIn = new OktaSignIn({
      baseUrl: environment.signIn.issuer,
      clientId: environment.signIn.clientId,
      redirectUri: environment.signIn.redirectUri,
      logo: environment.signIn.logo,
      authParams: {
        pkce: true,
        responseMode: 'query',
        issuer: environment.signIn.issuer,
        display: 'page',
        scopes: environment.signIn.scopes,
      },
    });
  }

  ngOnInit() {
    this.signIn.renderEl(
      { el: '#sign-in-widget' },
      () => {
      },
      (err) => {
        throw err;
      },
    );
  }

}
