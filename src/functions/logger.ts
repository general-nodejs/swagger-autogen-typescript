import { getOptions } from './optionsUtil';

export const log = (function (disableLogs) {
  if (disableLogs) {
    return () => {};
  } else {
    return (...args: any) => {
      console.log(...args);
    };
  }
})(getOptions().disableLogs);

export const error = (function (disableLogs) {
  if (disableLogs) {
    return () => {};
  } else {
    return (...args: any) => {
      console.error(...args);
    };
  }
})(getOptions().disableLogs);

export const warn = (function (disableLogs) {
  if (disableLogs) {
    return () => {};
  } else {
    return (...args: any) => {
      console.warn(...args);
    };
  }
})(getOptions().disableLogs);

export const debug = (function (disableLogs) {
  if (disableLogs) {
    return () => {};
  } else {
    return (...args: any) => {
      console.debug(...args);
    };
  }
})(getOptions().disableLogs);
