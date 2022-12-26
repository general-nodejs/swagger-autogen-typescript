import { Options } from '../types/v3Types';

export const TEMPLATE = {
  swagger: null,
  openapi: null,
  info: {
    version: '1.0.0',
    title: 'REST API',
    description: '',
  },
  host: 'localhost:3000',
  servers: [],
  basePath: '/',
  tags: [],
  schemes: ['http'],
  securityDefinitions: undefined,
  consumes: [],
  produces: [],
  paths: {},
  definitions: {},
  components: {},
};

export const SWAGGER_TAG = '#swagger';
export const STRING_BREAKER = '__¬!@#$¬__'; // for line break and return without text changes
export const STRING_QUOTE = '__¬¬¬¬__QUOTE__¬¬¬¬__';
export const METHODS = ['get', 'head', 'post', 'put', 'delete', 'patch', 'options'];
export const RESERVED_FUNCTIONS = ['if', 'for', 'while', 'forEach'];
export const QUOTES = ['"', "'", '`'];
