import { Language, Options } from 'types/globalTypes';
import { OpenAPI } from '../types/v3Types';

const tables = require('./tables');
const statics = require('./statics');
const utils = require('./utils');

//*****************************************************************************************************************
/**
 * Swagger-autogen-typescript Options
 *
 * @summary this is the optional arguments list in int eh below interface
 * @implements interface Options {
 *   openApi?: OpenAPI;
 *   language?: Language; // default is en-US
 *   disableLogs?: boolean;
 *   disableWarnings?: boolean;
 *   autoHeaders?: boolean;
 *   autoQuery?: boolean;
 *   autoBody?: boolean;
 *   autoResponse?: boolean;
 * }
 */
//*****************************************************************************************************************

let defaultOptions: Options = {
  openApi: '3.0.0',
  language: 'en-US',
  disableLogs: false,
  disableWarnings: false,
  autoHeaders: true,
  autoQuery: true,
  autoBody: true,
  autoResponse: true,
};

export const updateOptions = (newOptions: Options) => {
  defaultOptions = { ...defaultOptions, ...newOptions };
  return defaultOptions;
};

export const getOptions = () => {
  return defaultOptions;
};
