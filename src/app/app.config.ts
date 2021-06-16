export default {
  oidc: {
    clientId: `0oa5vxzeqdmLiexPg5d6`,
    issuer: `https://dev-79853240.okta.com`,
    redirectUri: 'http://localhost:8080/login/callback',
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
