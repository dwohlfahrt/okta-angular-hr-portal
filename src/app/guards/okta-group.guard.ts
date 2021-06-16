import { Injectable, Injector } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  NavigationStart
} from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

import { userBelongsToGroup } from '../shared/utils';

@Injectable()
export class OktaGroupGuard implements CanActivate, CanActivateChild {
  private route: ActivatedRouteSnapshot;
  private state: RouterStateSnapshot;

  constructor(private oktaAuth: OktaAuthService, private injector: Injector, private router: Router) { }

  /**
   * @param route
   * @param state
   */
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Track states for current route
    this.route = route;
    this.state = state;

    const user = await this.oktaAuth.getUser();
    if (userBelongsToGroup(user, route.data.groups)) {
      return true;
    } else {
      return this.router.parseUrl('/');
    }
  }

  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.canActivate(route, state);
  }

}