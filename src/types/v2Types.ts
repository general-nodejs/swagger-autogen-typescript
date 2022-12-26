//*****************************************************************************************************************
// OpenApi 2.0.0 types
//*****************************************************************************************************************

export type Contact = {
  /** The identifying name of the contact person/organization. */
  name?: string;
  /** The URL pointing to the contact information. MUST be in the format of a URL. */
  url?: string;
  /** The email address of the contact person/organization. MUST be in the format of an email address. */
  email?: string;
};

export type ReferenceObject = {
  /** REQUIRED. The reference string. */
  $ref: string;
};

export type License = {
  /** REQUIRED. The license name used for the API. */
  name: string;
  /** A URL to the license used for the API. MUST be in the format of a URL. */
  url?: string;
};

export type Info = {
  /** REQUIRED. The title of the API. */
  title: string;
  /**
   * A short description of the application. GFM syntax can be used for rich text representation.
   *
   * @resource [GFM Syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#GitHub-flavored-markdown)
   */
  description?: string;
  /** A URL to the Terms of Service for the API. MUST be in the format of a URL. */
  termsOfService?: string;
  /** The license information for the exposed API. */
  license?: License;
  /** The contact information for the exposed API. */
  contact?: Contact;
  /**
   * Required Provides the version of the application API (not to be confused with the specification version).
   *
   * @default '1.0.0'
   */
  version: string;
};

export type ExternalDocumentation = {
  /**
   * A short description of the application. GFM syntax can be used for rich text representation.
   *
   * @resource [GFM Syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#GitHub-flavored-markdown)
   */
  description?: string;
  /** REQUIRED. The URL for the target documentation. Value MUST be in the format of a URL. */
  url: string;
};

export type ItemsObject = {
  type: string;
  format: Formats;
  items: ItemsObject;
  collectionFormat: CollectionFormat;
  default: any;
  maximum: number;
  exclusiveMaximum: boolean;
  minimum: number;
  exclusiveMinimum: boolean;
  maxLength: number;
  minLength: number;
  pattern: string;
  maxItems: number;
  minItems: number;
  uniqueItems: boolean;
  enum: any[];
  multipleOf: number;
};

export type InField = 'query' | 'header' | 'path' | 'formData' | 'body';

export type CollectionFormat = 'csv' | 'ssv' | 'tsv' | 'pipes' | 'multi';
export type Type = 'null' | 'boolean' | 'object' | 'array' | 'number' | 'string' | 'integer';
export type Formats = 'int32' | 'int64' | 'float' | 'double' | 'byte' | 'binary' | 'date' | 'date-time' | 'password';

export type XmlObject = {
  /**
   * Replaces the name of the element/attribute used for the described schema property. When defined within the Items
   * Object (items), it will affect the name of the individual XML elements within the list. When defined alongside type
   * being array (outside the items), it will affect the wrapping element and only if wrapped is true. If wrapped is
   * false, it will be ignored.
   */
  name?: string;
  /** The URL of the namespace definition. Value SHOULD be in the form of a URL. */
  namespace?: string;
  /** The prefix to be used for the name. */
  prefix?: string;
  /** Declares whether the property definition translates to an attribute instead of an element. Default value is false. */
  attribute?: boolean;
  /**
   * MAY be used only for an array definition. Signifies whether the array is wrapped (for example,
   * <books><book/><book/></books>) or unwrapped (<book/><book/>). Default value is false. The definition takes effect
   * only when defined alongside type being array (outside the items).
   */
  wrapped?: boolean;
};

export type Schema = {
  title?: string;
  /**
   * The value of "multipleOf" MUST be a number, strictly greater than 0.
   *
   * A numeric instance is only valid if division by this keyword's value results in an integer.
   */
  multipleOf?: number;
  /**
   * The value of "maximum" MUST be a number, representing an upper limit for a numeric instance.
   *
   * If the instance is a number, then this keyword validates if "exclusiveMaximum" is true and instance is less than
   * the provided value, or else if the instance is less than or exactly equal to the provided value.
   */
  maximum?: number;
  /**
   * The value of "exclusiveMaximum" MUST be a boolean, representing whether the limit in "maximum" is exclusive or not.
   * An undefined value is the same as false.
   *
   * If "exclusiveMaximum" is true, then a numeric instance SHOULD NOT be equal to the value specified in "maximum". If
   * "exclusiveMaximum" is false (or not specified), then a numeric instance MAY be equal to the value of "maximum".
   */
  exclusiveMaximum?: boolean;
  /**
   * The value of "minimum" MUST be a number, representing a lower limit for a numeric instance.
   *
   * If the instance is a number, then this keyword validates if "exclusiveMinimum" is true and instance is greater than
   * the provided value, or else if the instance is greater than or exactly equal to the provided value.
   */
  minimum?: number;
  /**
   * The value of "exclusiveMinimum" MUST be a boolean, representing whether the limit in "minimum" is exclusive or not.
   * An undefined value is the same as false.
   *
   * If "exclusiveMinimum" is true, then a numeric instance SHOULD NOT be equal to the value specified in "minimum". If
   * "exclusiveMinimum" is false (or not specified), then a numeric instance MAY be equal to the value of "minimum".
   */
  exclusiveMinimum?: boolean;
  /**
   * The value of this keyword MUST be a non-negative integer. The value of this keyword MUST be an integer. This
   * integer MUST be greater than, or equal to, 0. A string instance is valid against this keyword if its length is less
   * than, or equal to, the value of this keyword. The length of a string instance is defined as the number of its
   * characters as defined by RFC 7159 [RFC7159].
   *
   * @resource [RFC 7159](https://datatracker.ietf.org/doc/html/rfc7159)
   */
  maxLength?: number;
  /**
   * A string instance is valid against this keyword if its length is greater than, or equal to, the value of this
   * keyword. The length of a string instance is defined as the number of its characters as defined by RFC 7159
   * [RFC7159]. The value of this keyword MUST be an integer. This integer MUST be greater than, or equal to, 0.
   * "minLength", if absent, may be considered as being present with integer value 0.
   *
   * @resource [RFC 7159](https://datatracker.ietf.org/doc/html/rfc7159)
   */
  minLength?: number;
  /**
   * The value of this keyword MUST be a string. This string SHOULD be a valid regular expression, according to the ECMA
   * 262 regular expression dialect.
   *
   * A string instance is considered valid if the regular expression matches the instance successfully. Recall: regular
   * expressions are not implicitly anchored.
   */
  pattern?: string;
  /**
   * The value of this keyword MUST be an integer. This integer MUST be greater than, or equal to, 0.
   *
   * An array instance is valid against "maxItems" if its size is less than, or equal to, the value of this keyword.
   */
  maxItems?: number;
  /**
   * The value of this keyword MUST be an integer. This integer MUST be greater than, or equal to, 0.
   *
   * An array instance is valid against "minItems" if its size is greater than, or equal to, the value of this keyword.
   *
   * If this keyword is not present, it may be considered present with a value of 0.
   */
  minItems?: number;
  /**
   * The value of this keyword MUST be a boolean.
   *
   * If this keyword has boolean value false, the instance validates successfully. If it has boolean value true, the
   * instance validates successfully if all of its elements are unique.
   *
   * If not present, this keyword may be considered present with boolean value false.
   */
  uniqueItems?: boolean;
  /**
   * The value of this keyword MUST be an integer. This integer MUST be greater than, or equal to, 0.
   *
   * An object instance is valid against "maxProperties" if its number of properties is less than, or equal to, the
   * value of this keyword.
   */
  maxProperties?: number;
  /**
   * The value of this keyword MUST be an integer. This integer MUST be greater than, or equal to, 0.
   *
   * An object instance is valid against "minProperties" if its number of properties is greater than, or equal to, the
   * value of this keyword.
   *
   * If this keyword is not present, it may be considered present with a value of 0.
   */
  minProperties?: number;
  /**
   * The value of this keyword MUST be an array. This array MUST have at least one element. Elements of this array MUST
   * be strings, and MUST be unique.
   *
   * An object instance is valid against this keyword if its property set contains all elements in this keyword's array
   * value.
   */
  required?: string[];
  /**
   * The value of this keyword MUST be an array. This array SHOULD have at least one element. Elements in the array
   * SHOULD be unique.
   *
   * Elements in the array MAY be of any type, including null.
   *
   * An instance validates successfully against this keyword if its value is equal to one of the elements in this
   * keyword's array value.
   */
  enum?: any[];
  /** Value MUST be a string. Multiple types via an array are not supported. */
  type?: Type;
  /**
   * Inline or referenced schema MUST be of a Schema Object and not a standard JSON Schema.
   *
   * This keyword's value MUST be an array. This array MUST have at least one element.
   *
   * Elements of the array MUST be objects. Each object MUST be a Schema Object.
   *
   * An instance validates successfully against this keyword if it validates successfully against all schemas defined by
   * this keyword's value.
   */
  allOf?: Schema[];
  /**
   * Value MUST be an object and not an array. Inline or referenced schema MUST be of a Schema Object and not a standard
   * JSON Schema. items MUST be present if the type is array.
   */
  items?: Schema;
  /** Property definitions MUST be a Schema Object and not a standard JSON Schema (inline or referenced). */
  properties?: Schema;
  /**
   * Value can be boolean or object. Inline or referenced schema MUST be of a Schema Object and not a standard JSON
   * Schema. Consistent with JSON Schema, additionalProperties defaults to true.
   */
  additionalProperties?: boolean | Schema;
  description?: string;
  format?: Formats;
  /**
   * The default value represents what would be assumed by the consumer of the input as the value of the schema if one
   * is not provided. Unlike JSON Schema, the value MUST conform to the defined type for the Schema Object defined at
   * the same level. For example, if type is string, then default can be "foo" but cannot be 1.
   */
  default: Schema;
  /**
   * Adds support for polymorphism. The discriminator is the schema property name that is used to differentiate between
   * other schema that inherit this schema. The property name used MUST be defined at this schema and it MUST be in the
   * required property list. When used, the value MUST be the name of this schema or any schema that inherits it.
   */
  discriminator?: string;
  /**
   * Relevant only for Schema "properties" definitions. Declares the property as "read only". This means that it MAY be
   * sent as part of a response but MUST NOT be sent as part of the request. Properties marked as readOnly being true
   * SHOULD NOT be in the required list of the defined schema. Default value is false.
   */
  readOnly?: boolean;
  /**
   * This MAY be used only on properties schemas. It has no effect on root schemas. Adds additional metadata to describe
   * the XML representation of this property.
   */
  xml?: XmlObject;
  /** Additional external documentation for this schema. */
  externalDocs?: ExternalDocumentation;
  /**
   * A free-form property to include an example of an instance for this schema. To represent examples that cannot be
   * naturally represented in JSON or YAML, a string value can be used to contain the example with escaping where
   * necessary.
   */
  example?: any;
};

export type ParameterObject = {
  /**
   * Required. The name of the parameter. Parameter names are case sensitive. If in is "path", the name field MUST
   * correspond to the associated path segment from the path field in the Paths Object. See Path Templating for further
   * information. For all other cases, the name corresponds to the parameter name used based on the in property.
   */
  name: string;
  /** Required. The location of the parameter. Possible values are "query", "header", "path", "formData" or "body". */
  in: InField;
  /**
   * A short description of the application. GFM syntax can be used for rich text representation.
   *
   * @resource [GFM Syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#GitHub-flavored-markdown)
   */
  description?: string;
  /**
   * Determines whether this parameter is mandatory. If the parameter location is "path", this property is REQUIRED and
   * its value MUST be true. Otherwise, the property MAY be included and its default value is false.
   */
  required: boolean;
  /** Specifies that a parameter is deprecated and SHOULD be transitioned out of usage. Default value is false. */
  deprecated?: boolean;
  /** Required. The schema defining the type used for the body parameter. only if `in` is `body` */
  schema: Schema;
  /** If `in` is anything other than `body` */
  type: string;
  format?: string;
  allowEmptyValue?: boolean;
  items?: ItemsObject;
  collectionFormat?: CollectionFormat;
  /**
   * Declares the value of the parameter that the server will use if none is provided, for example a "count" to control
   * the number of results per page might default to 100 if not supplied by the client in the request. (Note: "default"
   * has no meaning for required parameters.) See
   * https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-6.2. Unlike JSON Schema this value MUST
   * conform to the defined type for this parameter.
   */
  default?: any;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  enum?: any[];
  multipleOf?: number;
};

export type OperationObject = {
  /**
   * A list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or
   * any other qualifier.
   */
  tags?: string[];
  /** A short summary of what the operation does. */
  summary?: string;
  /**
   * A short description of the application. GFM syntax can be used for rich text representation.
   *
   * @resource [GFM Syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#GitHub-flavored-markdown)
   */
  description?: string;
  /** Additional external documentation for this operation. */
  externalDocs?: ExternalDocumentation;
  /**
   * Unique string used to identify the operation. The id MUST be unique among all operations described in the API.
   * Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is recommended to
   * follow common programming naming conventions.
   */
  operationId?: string;
  /**
   * A list of MIME types the operation can consume. This overrides the consumes definition at the Swagger Object. An
   * empty value MAY be used to clear the global definition. Value MUST be as described under Mime Types.
   */
  produces: MimeTypes[];
  /**
   * A list of MIME types the operation can produce. This overrides the produces definition at the Swagger Object. An
   * empty value MAY be used to clear the global definition. Value MUST be as described under Mime Types.
   */
  consumes: MimeTypes[];
  /**
   * A list of parameters that are applicable for this operation. If a parameter is already defined at the Path Item,
   * the new definition will override it but can never remove it. The list MUST NOT include duplicated parameters. A
   * unique parameter is defined by a combination of a name and location. The list can use the Reference Object to link
   * to parameters that are defined at the OpenAPI Object's components/parameters.
   */
  parameters?: ParameterObject[] | ReferenceObject[];
  /** REQUIRED. The list of possible responses as they are returned from executing this operation. */
  responses: ResponsesObject;
  schemes: V2Schemes[];
  /**
   * Declares this operation to be deprecated. Consumers SHOULD refrain from usage of the declared operation. Default
   * value is false.
   */
  deprecated?: boolean;
  /**
   * A declaration of which security mechanisms can be used for this operation. The list of values includes alternative
   * security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to
   * authorize a request. To make security optional, an empty security requirement ({}) can be included in the array.
   * This definition overrides any declared top-level security. To remove a top-level security declaration, an empty
   * array can be used.
   */
  security?: { [key: string]: string }[];
};

export type PathItemObject = {
  /**
   * Allows for an external definition of this path item. The referenced structure MUST be in the format of a Path Item
   * Object. In case a Path Item Object field appears both in the defined object and the referenced object, the behavior
   * is undefined.
   */
  $ref?: string;
  /** A definition of a GET operation on this path. */
  get?: OperationObject;
  /** A definition of a PUT operation on this path. */
  put?: OperationObject;
  /** A definition of a POST operation on this path. */
  post?: OperationObject;
  /** A definition of a DELETE operation on this path. */
  delete?: OperationObject;
  /** A definition of a OPTIONS operation on this path. */
  options?: OperationObject;
  /** A definition of a HEAD operation on this path. */
  head?: OperationObject;
  /** A definition of a PATCH operation on this path. */
  patch?: OperationObject;
  /**
   * A list of parameters that are applicable for all the operations described under this path. These parameters can be
   * overridden at the operation level, but cannot be removed there. The list MUST NOT include duplicated parameters. A
   * unique parameter is defined by a combination of a name and location. The list can use the Reference Object to link
   * to parameters that are defined at the OpenAPI Object's components/parameters.
   */
  parameters?: ParameterObject[] | ReferenceObject[];
};

/**
 * Holds the relative paths to the individual endpoints. The path is appended to the basePath in order to construct the
 * full URL. The Paths may be empty, due to ACL constraints.
 *
 * @resource [paths object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#pathsObject)
 */
export type Paths = {
  /**
   * A relative path to an individual endpoint. The field name MUST begin with a slash. The path is appended to the
   * basePath in order to construct the full URL. Path templating is allowed.
   */
  [key: string]: PathItemObject;
};

export type V2Schemes = 'http' | 'https' | 'ws' | 'wss';

export type MimeTypes =
  | 'text/plain; charset=utf-8'
  | 'application/json'
  | 'application/vnd.github+json'
  | 'application/vnd.github.v3+json'
  | 'application/vnd.github.v3.raw+json'
  | 'application/vnd.github.v3.text+json'
  | 'application/vnd.github.v3.html+json'
  | 'application/vnd.github.v3.full+json'
  | 'application/vnd.github.v3.diff'
  | 'application/vnd.github.v3.patch';

export type HeaderObject = {
  description?: string;
  type: Type;
  format: Formats;
  items: ItemsObject;
  collectionFormat: CollectionFormat;
  default: any;
  maximum: number;
  exclusiveMaximum: boolean;
  minimum: number;
  exclusiveMinimum: boolean;
  maxLength: number;
  minLength: number;
  pattern: string;
  maxItems: number;
  minItems: number;
  uniqueItems: boolean;
  enum: any[];
  multipleOf: number;
};

export type HeadersObject = {
  [key: string]: HeaderObject;
};

export type ResponsesObject = {
  description: string;
  schema?: Schema;
  headers?: HeadersObject;
  examples?: { [key in MimeTypes]: any };
};

export type SecuritySchemaTypes = 'apiKey' | 'basic' | 'oauth2';

export type ScopesObject = { [key: string]: string };

export type SecuritySchemeObject = {
  /** REQUIRED. The type of the security scheme. Valid values are "apiKey", "http", "oauth2", "openIdConnect". */
  type: SecuritySchemaTypes;
  /** A short description for security scheme. CommonMark syntax MAY be used for rich text representation. */
  description?: any;
  /** Required. The name of the header or query parameter to be used. */
  name?: string;
  /** Required The location of the API key. Valid values are "query" or "header". */
  in?: 'query' | 'header';
  /**
   * Required. The flow used by the OAuth2 security scheme. Valid values are "implicit", "password", "application" or
   * "accessCode".
   */
  flow?: 'implicit' | 'password' | 'application' | 'accessCode';
  /** Required. The authorization URL to be used for this flow. This SHOULD be in the form of a URL. */
  authorizationUrl?: string;
  /** Required. The token URL to be used for this flow. This SHOULD be in the form of a URL. */
  tokenUrl?: string;
  /** Required. The available scopes for the OAuth2 security scheme. */
  scopes?: ScopesObject;
};

export type Tags = {
  /** REQUIRED. The name of the tag. */
  name: string;
  /**
   * A short description for the tag. CommonMark syntax MAY be used for rich text representation.
   *
   * @resource [CommonMark](https://spec.commonmark.org/)
   */
  description?: string;
  /** Additional external documentation for this tag. */
  externalDocs?: ExternalDocumentation;
};

/** @resource [swagger object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#infoObject) */
export type V2DocumentData = {
  /**
   * Required. Specifies the Swagger Specification version being used. It can be used by the Swagger UI and other
   * clients to interpret the API listing. The value MUST be "2.0".
   */
  swagger: '2.0';
  /** Required. Provides metadata about the API. The metadata can be used by the clients if needed. */
  info: Info;
  /**
   * The host (name or ip) serving the API. This MUST be the host only and does not include the scheme nor sub-paths. It
   * MAY include a port. If the host is not included, the host serving the documentation is to be used (including the
   * port). The host does not support path templating.
   */
  host?: string;
  /**
   * The base path on which the API is served, which is relative to the host. If it is not included, the API is served
   * directly under the host. The value MUST start with a leading slash (/). The basePath does not support path
   * templating.
   */
  basePath?: string;
  schemes?: V2Schemes[];
  /**
   * A list of MIME types the APIs can consume. This is global to all APIs but can be overridden on specific API calls.
   * Value MUST be as described under Mime Types.
   */
  consumes?: MimeTypes[];
  /**
   * A list of MIME types the APIs can produce. This is global to all APIs but can be overridden on specific API calls.
   * Value MUST be as described under Mime Types.
   */
  produces?: MimeTypes[];
  paths?: Paths;
  definitions?: { [key: string]: Schema };
  '@definitions'?: { [key: string]: Schema };
  responses?: { [key: string]: ResponsesObject };
  securityDefinitions?: { [key: string]: SecuritySchemeObject };
  security?: { [key: string]: string }[];
  tags?: Tags[];
  externalDocs?: ExternalDocumentation;
};
