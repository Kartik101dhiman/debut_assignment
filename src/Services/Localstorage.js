const LocalStorageService = (function () {
  function _setToken(token) {
    localStorage.setItem("access_token", JSON.stringify(token));
  }

  function _getAccessToken() {
    let token = localStorage.getItem("access_token");
    return token;
  }

  function _clearToken() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  function _logout() {
    localStorage.clear();
  }

  return {
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    clearToken: _clearToken,
    logout: _logout,
  };
})();
export default LocalStorageService;
