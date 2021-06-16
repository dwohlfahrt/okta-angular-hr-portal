import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from './material.module';
import { Routes, RouterModule, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { URLInterceptor } from './interceptors/url.interceptor';

import { environment } from '../environments/environment';

import {
  OKTA_CONFIG,
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthService,
} from '@okta/okta-angular';

import appConfig from './app.config';

const oktaConfig = Object.assign({
  onAuthRequired: (oktaAuth: OktaAuthService, injector: any) => {
    const router = injector.get(Router);
    // Redirect the user to your custom login page
    router.navigate(['/login']);
  }
}, appConfig.oidc);

import { OktaGroupGuard } from './guards/okta-group.guard';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component';
import { AdminComponent } from './admin/admin.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AdminManageMembersComponent } from './admin-manage-members/admin-manage-members.component';
import { AdminManageUsersComponent } from './admin-manage-users/admin-manage-users.component';
import { UserModalComponent } from './user-modal/user-modal.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login/callback',
    component: OktaCallbackComponent,
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ OktaAuthGuard ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ OktaAuthGuard, OktaGroupGuard ],
    data: {groups: environment.adminGroup}
  },
  {
    path: 'admin/manage/groups/:groupName',
    component: AdminManageMembersComponent,
    canActivate: [ OktaAuthGuard, OktaGroupGuard ],
    data: {groups: environment.adminGroup}
  },
  {
    path: 'admin/manage/users',
    component: AdminManageUsersComponent,
    canActivate: [ OktaAuthGuard, OktaGroupGuard ],
    data: {groups: environment.adminGroup}
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    ProtectedComponent,
    AdminComponent,
    AdminManageMembersComponent,
    AdminManageUsersComponent,
    UserModalComponent
  ],
  imports: [
    FlexLayoutModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    OktaAuthModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DragDropModule,
    ClipboardModule
  ],
  providers: [
    { 
      provide: OKTA_CONFIG,
      useValue: oktaConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: URLInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    OktaGroupGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
