// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const orgSubdomain = 'dev-79853240';

export const environment = {
  production: false,
  adminGroup: 'HR Admins',
  oktaApiUrl: `https://${orgSubdomain}.okta.com/api/v1`,
  manageableGroups: [
    'HR Admins',
    'Sales',
    'High-Risk Apps'
  ],
  signIn: {
    clientId: `0oa5vxzeqdmLiexPg5d6`,
    issuer: `https://${orgSubdomain}.okta.com`,
    redirectUri: 'http://localhost:8080/login/callback',
    logo: 'assets/drumking_logo.png',
    scopes: [
      'openid',
      'profile',
      'email',
      'groups',
      'okta.users.manage',
      'okta.users.manage.self',
      'okta.users.read',
      'okta.users.read.self',
      'okta.groups.manage',
      'okta.roles.manage',
      'okta.roles.read'
    ]
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
