const orgSubdomain = 'dev-79853240';

export const environment = {
  production: true,
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
    redirectUri: 'http://dwohlfahrt.github.io/okta-angular-hr-portal/login/callback',
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