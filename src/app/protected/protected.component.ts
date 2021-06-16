import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {
  userName: string = '';
  claims: any;
  ready: boolean = false;

  constructor(public oktaAuth: OktaAuthService) { }

  async ngOnInit() {
    this.claims = await this.oktaAuth.getUser();
    this.ready = true;
    console.log('this.claims', this.claims);
  }

}
