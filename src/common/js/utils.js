export function padLeftZero(str) {
  return (`00${str}`).substr(str.length);
}

export function formatDate(date, _fmt) {
  let fmt = _fmt;
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = `${o[k]}`;
      fmt = fmt.replace(RegExp.$1, padLeftZero(str));
    }
  }
  return fmt;
}

export function urlParse (input) {
  const url = input ? input : window.location.href;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&#]+/g;
  let arr = url.match(reg);
  // ['?id=1', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      const str = item.slice(1);
      const idx = str.indexOf('=');
      const key = decodeURIComponent(str.slice(0, idx));
      const val = decodeURIComponent(str.slice(idx + 1));
      obj[key] = val;
    });
  }
  return obj;
}

export const getEnvVar = key => {
  return import.meta.env[key] || ''
}
