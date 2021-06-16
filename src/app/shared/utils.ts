export function userBelongsToGroup(user: any, group: string): boolean {
  console.log('user', user);
  if (user && user.groups && user.groups.length) {
    return user.groups.includes(group);
  }

  return false;
}

export function getCurrentUser() {
  let user = {};
  let tokenStorage = localStorage.getItem('okta-token-storage') as any;
  if (tokenStorage) {
    tokenStorage = JSON.parse(tokenStorage);
    console.log('tokenStorage', tokenStorage);
    if (tokenStorage && tokenStorage.idToken && tokenStorage.idToken.claims) {
      user = tokenStorage.idToken.claims;
    }
  }

  return user;
}

export function getIdToken() {
  let tokenStorage = localStorage.getItem('okta-token-storage') as any;
  if (tokenStorage) {
    tokenStorage = JSON.parse(tokenStorage);
    if (tokenStorage) {
      return tokenStorage.idToken.value;
    }
  }

  return null;
}

export function getAccessToken() {
  let tokenStorage = localStorage.getItem('okta-token-storage') as any;
  if (tokenStorage) {
    tokenStorage = JSON.parse(tokenStorage);
    if (tokenStorage && tokenStorage.accessToken && tokenStorage.accessToken.value) {
      return tokenStorage.accessToken.value
    }
  }

  return null;
}

