async function getUserInfo() {
  try {
    console.log('getUserInfo');
    if (window.location.host.indexOf('localhost') !== -1) {
      return {
        identityProvider: 'github',
        userId: '671ab56b16c54b04b393ee2f919f9b09',
        userDetails: 'Samjayyy',
        userRoles: ['authenticated', 'anonymous'],
      };
    }
    const response = await fetch('/.auth/me');
    const payload = await response.json();
    const { clientPrincipal } = payload;
    console.log(clientPrincipal);
    return clientPrincipal;
  } catch (error) {
    console.error('No profile could be found');
    return undefined;
  }
}

export { getUserInfo as default };
