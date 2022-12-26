//*****************************************************************************************************************
// final export of types
//*****************************************************************************************************************

import { V2DocumentData } from './v2Types';
import { V3DocumentData } from './v3Types';

export type Language =
  | 'pt-BR' // Portuguese (Brazil)
  | 'en-US' // English (by default)
  | 'zh-CN' // Chinese (Simplified)
  | 'ko' // Korean
  | 'fr' // French
  | null;

export interface Files {
  outputFile: string;
  endpointsFiles?: string[];
}

export type OpenAPI = '3.0.0' | '2.0.0';

/** @resource [RFC 7231](https://www.rfc-editor.org/rfc/rfc7231#section-6) */
export type HttpResponseCodes =
  | '100'
  | '101'
  | '200'
  | '201'
  | '202'
  | '203'
  | '204'
  | '205'
  | '206'
  | '300'
  | '301'
  | '302'
  | '303'
  | '304'
  | '305'
  | '307'
  | '400'
  | '401'
  | '402'
  | '403'
  | '404'
  | '405'
  | '406'
  | '407'
  | '408'
  | '409'
  | '410'
  | '411'
  | '412'
  | '413'
  | '414'
  | '415'
  | '416'
  | '417'
  | '426'
  | '500'
  | '501'
  | '502'
  | '503'
  | '504'
  | '505';

export interface Options {
  openApi?: OpenAPI;
  language?: Language; // default is en-US
  disableLogs?: boolean;
  disableWarnings?: boolean;
  autoHeaders?: boolean;
  autoQuery?: boolean;
  autoBody?: boolean;
  autoResponse?: boolean;
}

export type OpenApiObject = V3DocumentData | V2DocumentData;
