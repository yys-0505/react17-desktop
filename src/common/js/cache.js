const TOKEN_KEY = '__token__';
const REFRESH_TOKEN_KEY = '__refresh_token__';
const AUTH_TOKEN_KEY = '__auth_token';
const USER_INFO_KEY = '__user_info__';
const AUTH_TOKEN_BEGIN_TIME_KEY = '__auth_token_begin_time__';
const TOKEN_EXPIRE_MINUTE = 10;
const REFRESH_TOKEN_EXPIRE_MINUTE = 600;
const AUTH_TOKEN_EXPIRE_MINUTE = 30;

function setCookie(name, value, iMinute) {
  const oDate = new Date();
  oDate.setMinutes(oDate.getMinutes() + iMinute);
  document.cookie = `${name}=${value}; expires= ${oDate.toUTCString()}; path=/`;
}

function getCookie(name) {
  const arr = document.cookie.split('; ');
  let arr2;
  for (let i = 0, len = arr.length; i < len; i++) {
    arr2 = arr[i].split('=');
    if (arr2[0] === name) {
      return arr2[1];
    }
  }
  return '';
}

// eslint-disable-next-line no-unused-vars
function removeCookie(name) {
  setCookie(name, '', -1);
}

export const setToken = (token) => setCookie(TOKEN_KEY, token, TOKEN_EXPIRE_MINUTE);

export const getToken = () => getCookie(TOKEN_KEY);

export const setRefreshToken = (token) => {
  setCookie(REFRESH_TOKEN_KEY, token, REFRESH_TOKEN_EXPIRE_MINUTE);
};
export const getRefreshToken = () => getCookie(REFRESH_TOKEN_KEY);

export const removeToken = () => removeCookie(TOKEN_KEY);

export const removeRefreshToken = () => removeCookie(REFRESH_TOKEN_KEY);

export const setUserLocal = (user) => {
  sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
  return user;
};

export const getUserLocal = () => {
  const user = sessionStorage.getItem(USER_INFO_KEY);
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const removeUser = () => sessionStorage.removeItem(USER_INFO_KEY);

export const removeLoginData = () => {
  removeUser();
  removeToken();
  removeRefreshToken();
};

export const userStatus = () => {
  const token = getToken();
  const refreshToken = getRefreshToken();
  const userInfo = getUserLocal();
  const hasUserInfo = userInfo && Object.keys(userInfo).length;
  const searchParams = new URLSearchParams(location.search);
  let status = '';
  let state = '';
  let code = '';
  if (!hasUserInfo || (!token && !refreshToken)) {
    status = 'needLogin';
  }
  if (searchParams) {
    state = searchParams.get('state');
    code = searchParams.get('code');
    if ((status === 'needLogin') && state && code) {
      status = 'getUser';
    }
  }
  return { status, state, code, };
};

export const saveUserInfo = (token, refreshToken, user) => {
  setToken(token);
  setRefreshToken(refreshToken);
  setUserLocal(user);
};

export const getAuthToken = () => {
  let token = getCookie(AUTH_TOKEN_KEY);
  if (!token) {
    token = sessionStorage.getItem(AUTH_TOKEN_KEY);
  }
  return token;
};

export const removeAuthToken = () => {
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  removeCookie(AUTH_TOKEN_KEY);
};

export const setAuthTokenBeginTime = () => {
  sessionStorage.setItem(AUTH_TOKEN_BEGIN_TIME_KEY, new Date());
};

export const removeAuthTokenBeginTime = () => {
  sessionStorage.removeItem(AUTH_TOKEN_BEGIN_TIME_KEY);
};

export const isAuthTokenValid = () => {
  let valid = false;
  const token = getAuthToken();
  const beginTimeStr = sessionStorage.getItem(AUTH_TOKEN_BEGIN_TIME_KEY);
  if (token) {
    if (beginTimeStr) {
      const bTime = new Date(beginTimeStr);
      const now = new Date();
      if ((now - bTime) / (1000 * 60) < AUTH_TOKEN_EXPIRE_MINUTE) {
        valid = true;
        setAuthTokenBeginTime();
      }
    } else {
      valid = true;
      setAuthTokenBeginTime();
    }
  }
  if (!valid) {
    removeAuthToken();
    removeAuthTokenBeginTime();
  }
  return { valid, token, };
};
