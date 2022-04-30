import axios from 'axios';
import store from 'store';
import { toggleRequestStatus } from 'store/global.slice';
import { Message } from 'common/js/popup';
import { reqUrlWhiteList, CODE_OK, LOGIN_MESSAGE } from './config';
import {
  getToken,
  setToken,
  getRefreshToken,
  saveUserInfo,
  userStatus,
  removeToken,
} from '../common/js/cache';
import { getLoginUrl, getUser, refreshToken } from 'api/login';

const { VITE_API_URL, } = import.meta.env;

// 是否正在刷新token 或 获取登录地址
let isRefreshing = false;
// 请求队列
let reqQueue = [];

const request = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 60 * 60 * 1000,
  headers: {
    post: { 'Content-Type': 'application/json; charset=UTF-8', },
  },
});

request.interceptors.request.use(async (config) => {
  const { url, } = config;
  if (reqUrlWhiteList.includes(url)) {
    return config;
  }
  
  const { status, state, code, } = userStatus();
  if (status === 'needLogin') {
    if (!isRefreshing) {
      isRefreshing = true;
      const url = await getLoginUrl();
      window.location.href = url;
      isRefreshing = false;
      throw new axios.Cancel(LOGIN_MESSAGE);
    } else {
      return new Promise(() => {});
    }
  } if (status === 'getUser') {
    if (!isRefreshing) {
      isRefreshing = true;
      const res = await getUser(state, code);
      isRefreshing = false;
      if (res) {
        const { code, data, } = res;
        if (code === CODE_OK) {
          const { access_token, refresh_token, } = data;
          saveUserInfo(access_token, refresh_token, data);
        } else if (code === 401) { // state or code invalid
          const url = await getLoginUrl();
          window.location.href = url;
          throw new axios.Cancel(LOGIN_MESSAGE);
        }
      }
    } else {
      return new Promise(() => {});
    }
  }
  const token = getToken();
  const rToken = getRefreshToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    store.dispatch('global/toggleRequestStatus', true);
  } else if (rToken) {
    try {
      if (!isRefreshing) {
        isRefreshing = true;
        const { data, } = await refreshToken(rToken);
        isRefreshing = false;
        const accessToken = data.access_token;
        setToken(accessToken);
        config.headers.Authorization = `Bearer ${accessToken}`;
        store.dispatch('global/toggleRequestStatus', true);
        reqQueue.forEach(c => c(accessToken));
        reqQueue = [];
      } else {
        return new Promise((resolve) => {
          reqQueue.push((accessToken) => {
            config.headers.Authorization = `Bearer ${accessToken}`;
            resolve(config);
          });
        });
      }
    } catch (error) {
      throw new axios.Cancel('重新获取认证信息失败!');
    }
  }
  return config;
}, error => Promise.reject(error));

request.interceptors.response.use(async (response) => {
  store.dispatch('global/toggleRequestStatus', false);
  if (response.status === 200) {
    const res = response.data;
    const { code, message, } = res;
    if (code && code !== 1) {
      Message.error(message || 'Error');
    }
    return res;
  }
  return response;
}, async (error) => {
  // codes outside 2xx
  store.dispatch('global/toggleRequestStatus', false);
  const { response, } = error;
  if (response) {
    const { data, status, statusText, } = response;
    if (status && status === 401) {
      removeToken();
      const rToken = getRefreshToken();
      if (rToken) {
        try {
          const { data: { access_token, }, } = await refreshToken(rToken);
          setToken(access_token);
          window.location.reload();
        } catch (error) {
          throw new axios.Cancel('重新获取认证信息失败!');
        }
      } else {
        Message.error(LOGIN_MESSAGE);
        const url = await getLoginUrl();
        window.location.href = url;
      }
    } else if (data) {
      const { message, } = data;
      Message.error(message || 'Error');
    } else if (statusText) {
      Message.error(statusText || 'Error');
    }
  } else {
    Message.error(error.message);
  }
  return Promise.reject(error.message);
});

export default request;
