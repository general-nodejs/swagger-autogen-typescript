//*****************************************************************************************************************
// OpenApi 3.0.0 types
//*****************************************************************************************************************

import { HttpResponseCodes } from './globalTypes';

export type OpenAPI = '3.0.0';

export type Contact = {
  /** The identifying name of the contact person/organization. */
  name?: string;
  /** The URL pointing to the contact information. MUST be in the format of a URL. */
  url?: string;
  /** The email address of the contact person/organization. MUST be in the format of an email address. */
  email?: string;
};

export type License = {
  /** REQUIRED. The license name used for the API. */
  name: string;
  /** A URL to the license used for the API. MUST be in the format of a URL. */
  url?: string;
};

export type ServerVariableObject = {
  /**
   * An enumeration of string values to be used if the substitution options are from a limited set. the array SHOULD NOT
   * be empty.
   */
  enum: string[];
  /**
   * REQUIRED. The default value to use for substitution, which SHALL be sent if an alternate value is not supplied.
   * Note this behavior is different than the Schema Object's treatment of default values, because in those cases
   * parameter values are optional. If the enum is defined, the value SHOULD exist in the enum's values.
   */
  default: string;
  /**
   * An optional description for the server variable. CommonMark syntax MAY be used for rich text representation.
   *
   * @resource [CommonMark](https://spec.commonmark.org/)
   */
  description: string;
};

export type Server = {
  /**
   * REQUIRED. A URL to the target host. This URL supports Server Variables and MAY be relative, to indicate that the
   * host location is relative to the location where the OpenAPI document is being served. Variable substitutions will
   * be made when a variable is named in {brackets}.
   */
  url: string;
  /**
   * An optional string describing the host designated by the URL. CommonMark syntax MAY be used for rich text
   * representation.
   *
   * @resource [CommonMark](https://spec.commonmark.org/)
   */
  description: string;
  /** A map between a variable name and its value. The value is used for substitution in the server's URL template. */
  variable: { [key: string]: ServerVariableObject };
};

export type Info = {
  /**
   * REQUIRED. The version of the OpenAPI document (which is distinct from the OpenAPI Specification version or the API
   * implementation version).
   *
   * @default '1.0.0'
   */
  version: string;
  /** REQUIRED. The title of the API. */
  title: string;
  /**
   * A short description of the API. CommonMark syntax MAY be used for rich text representation.
   *
   * @default ''
   * @resource [CommonMark](https://spec.commonmark.org/)
   */
  description?: string;
  /** A URL to the Terms of Service for the API. MUST be in the format of a URL. */
  termsOfService?: string;
  /** The license information for the exposed API. */
  license?: License;
  /** The contact information for the exposed API. */
  contact?: Contact;
};

export type ExternalDocumentation = {
  /**
   * A short description of the target documentation. CommonMark syntax MAY be used for rich text representation.
   *
   * @resource [CommonMark](https://spec.commonmark.org/)
   */
  description?: string;
  /** REQUIRED. The URL for the target documentation. Value MUST be in the format of a URL. */
  url: string;
};

/**
 * This object cannot be extended with additional properties and any properties added SHALL be ignored.
 *
 * @example
 *   {
 *     "$ref": "#/components/schemas/Pet"
 *   }
 */
export type ReferenceObject = {
  /** REQUIRED. The reference string. */
  $ref: string;
};

export type InField = 'query' | 'header' | 'path' | 'cookie';

export type Style = 'matrix' | 'label' | 'form' | 'simple' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject';

export type Type = 'null' | 'boolean' | 'object' | 'array' | 'number' | 'string' | 'integer';

/**
 * @example
 *   {
 *     "name": "pet",
 *     "description": "Pets operations"
 *   }
 */
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

export type ExampleObject = {
  [key: string]: {
    /** Short description for the example. */
    summary?: string;
    /**
     * Long description for the example. CommonMark syntax MAY be used for rich text representation.
     *
     * @resource [CommonMark](https://spec.commonmark.org/)
     */
    description?: string;
    /**
     * Embedded literal example. The value field and externalValue field are mutually exclusive. To represent examples
     * of media types that cannot naturally represented in JSON or YAML, use a string value to contain the example,
     * escaping where necessary.
     */
    value?: any;
    /**
     * A URL that points to the literal example. This provides the capability to reference examples that cannot easily
     * be included in JSON or YAML documents. The value field and externalValue field are mutually exclusive.
     */
    externalValue?: string;
  };
};

/**
 * Primitives have an optional modifier property: format. OAS uses several known formats to define in fine detail the
 * data type being used. However, to support documentation needs, the format property is an open string-valued property,
 * and can have any value. Formats such as "email", "uuid", and so on, MAY be used even though undefined by this
 * specification. Types that are not accompanied by a format property follow the type definition in the JSON Schema.
 * Tools that do not recognize a specific format MAY default back to the type alone, as if the format is not specified.
 *
 * @resource [Data Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#data-types)
 */
export type Formats = 'int32' | 'int64' | 'float' | 'double' | 'byte' | 'binary' | 'date' | 'date-time' | 'password';

/**
 * The discriminator object is legal only when using one of the composite keywords oneOf, anyOf, allOf.
 *
 * @resource [Discriminator Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#discriminator-object)
 */
export type DiscriminatorObject = {
  propertyName: string;
  mapping?: { [key: string]: string };
};

/**
 * A metadata object that allows for more fine-tuned XML model definitions.
 *
 * When using arrays, XML element names are not inferred (for singular/plural forms) and the name property SHOULD be
 * used to add that information. See examples for expected behavior.
 *
 * @resource [XML Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#xml-object)
 */
export type XmlObject = {
  /**
   * Replaces the name of the element/attribute used for the described schema property. When defined within items, it
   * will affect the name of the individual XML elements within the list. When defined alongside type being array
   * (outside the items), it will affect the wrapping element and only if wrapped is true. If wrapped is false, it will
   * be ignored.
   */
  name?: string;
  /** The URI of the namespace definition. Value MUST be in the form of an absolute URI. */
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

/** All traits that are affected by the location MUST be applicable to a location of header */
export type HeaderObject = {
  /** MUST NOT be specified, it is given in the corresponding headers map. */
  name?: string;
  /** MUST NOT be specified, it is implicitly in header. */
  in?: InField;
  /**
   * A brief description of the parameter. This could contain examples of use. CommonMark syntax MAY be used for rich
   * text representation.
   *
   * @resource [CommonMark](https://spec.commonmark.org/)
   */
  description?: string;
  /**
   * Determines whether this parameter is mandatory. If the parameter location is "path", this property is REQUIRED and
   * its value MUST be true. Otherwise, the property MAY be included and its default value is false.
   */
  required: boolean;
  /** Specifies that a parameter is deprecated and SHOULD be transitioned out of usage. Default value is false. */
  deprecated?: boolean;
  /**
   * Sets the ability to pass empty-valued parameters. This is valid only for query parameters and allows sending a
   * parameter with an empty value. Default value is false. If style is used, and if behavior is n/a (cannot be
   * serialized), the value of allowEmptyValue SHALL be ignored. Use of this property is NOT RECOMMENDED, as it is
   * likely to be removed in a later revision.
   */
  allowEmptyValue?: boolean;
  /**
   * Describes how the parameter value will be serialized depending on the type of the parameter value. Default values
   * (based on value of in): for query - form; for path - simple; for header - simple; for cookie - form.
   *
   * @resource [style chart](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#style-values)
   */
  style?: Style;
  /**
   * When this is true, parameter values of type array or object generate separate parameters for each value of the
   * array or key-value pair of the map. For other types of parameters this property has no effect. When style is form,
   * the default value is true. For all other styles, the default value is false.
   */
  explode?: boolean;
  /**
   * Determines whether the parameter value SHOULD allow reserved characters, as defined by RFC3986 :/?#[]@!$&'()*+,;=
   * to be included without percent-encoding. This property only applies to parameters with an in value of query. The
   * default value is false.
   *
   * @resource [RFC3986](https://tools.ietf.org/html/rfc3986#section-2.2)
   */
  allowReserved?: boolean;
  /** The schema defining the type used for the parameter. */
  schema: Schema | ReferenceObject;
  /**
   * Example of the parameter's potential value. The example SHOULD match the specified schema and encoding properties
   * if present. The example field is mutually exclusive of the examples field. Furthermore, if referencing a schema
   * that contains an example, the example value SHALL override the example provided by the schema. To represent
   * examples of media types that cannot naturally be represented in JSON or YAML, a string value can contain the
   * example with escaping where necessary.
   */
  example: any;
  /**
   * Examples of the parameter's potential value. Each example SHOULD contain a value in the correct format as specified
   * in the parameter encoding. The examples field is mutually exclusive of the example field. Furthermore, if
   * referencing a schema that contains an example, the examples value SHALL override the example provided by the
   * schema.
   */
  examples: ExampleObject | { [key: string]: ReferenceObject };
};

/**
 * The Schema Object allows the definition of input and output data types. These types can be objects, but also
 * primitives and arrays. This object is an extended subset of the JSON Schema Specification Wright Draft 00.
 *
 * For more information about the properties, see JSON Schema Core and JSON Schema Validation. Unless stated otherwise,
 * the property definitions follow the JSON Schema.
 *
 * @resource [JSON Schema Validation](https://datatracker.ietf.org/doc/html/draft-wright-json-schema-00#section-4.4)
 * @resource [Swagger Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schema-object)
 */
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
   * Inline or referenced schema MUST be of a Schema Object and not a standard JSON Schema.
   *
   * This keyword's value MUST be an array. This array MUST have at least one element.
   *
   * Elements of the array MUST be objects. Each object MUST be a Schema Object.
   *
   * An instance validates successfully against this keyword if it validates successfully against all schemas defined by
   * this keyword's value.
   */
  oneOf?: Schema[];
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
  anyOf?: Schema[];
  /**
   * Inline or referenced schema MUST be of a Schema Object and not a standard JSON Schema.
   *
   * This keyword's value MUST be an object. This object MUST be a valid JSON Schema.
   *
   * An instance is valid against this keyword if it fails to validate successfully against the schema defined by this
   * keyword.
   */
  not?: Schema;
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
  /**
   * CommonMark syntax MAY be used for rich text representation.
   *
   * @resource [CommonMark](https://spec.commonmark.org/)
   */
  description?: string;
  format?: Formats;
  /**
   * The default value represents what would be assumed by the consumer of the input as the value of the schema if one
   * is not provided. Unlike JSON Schema, the value MUST conform to the defined type for the Schema Object defined at
   * the same level. For example, if type is string, then default can be "foo" but cannot be 1.
   */
  default: Schema;
  /**
   * A true value adds "null" to the allowed type specified by the type keyword, only if type is explicitly defined
   * within the same Schema Object. Other Schema Object constraints retain their defined behavior, and therefore may
   * disallow the use of null as a value. A false value leaves the specified or default type unmodified. The default
   * value is false.
   */
  nullable?: boolean;
  /**
   * Adds support for polymorphism. The discriminator is an object name that is used to differentiate between other
   * schemas which may satisfy the payload description. See Composition and Inheritance for more details.
   */
  discriminator?: DiscriminatorObject;
  /**
   * Relevant only for Schema "properties" definitions. Declares the property as "read only". This means that it MAY be
   * sent as part of a response but SHOULD NOT be sent as part of the request. If the property is marked as readOnly
   * being true and is in the required list, the required will take effect on the response only. A property MUST NOT be
   * marked as both readOnly and writeOnly being true. Default value is false.
   */
  readOnly?: boolean;
  /**
   * Relevant only for Schema "properties" definitions. Declares the property as "write only". Therefore, it MAY be sent
   * as part of a request but SHOULD NOT be sent as part of the response. If the property is marked as writeOnly being
   * true and is in the required list, the required will take effect on the request only. A property MUST NOT be marked
   * as both readOnly and writeOnly being true. Default value is false.
   */
  writeOnly?: boolean;
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
  /** Specifies that a schema is deprecated and SHOULD be transitioned out of usage. Default value is false. */
  deprecated?: boolean;
};

/**
 * @example
 *   const example = {
 *     encoding: {
 *       historyMetadata: {
 *         // require XML Content-Type in utf-8 encoding
 *         contentType: 'application/xml; charset=utf-8',
 *       },
 *       profileImage: {
 *         // only accept png/jpeg
 *         contentType: 'image/png, image/jpeg',
 *         headers: {
 *           'X-Rate-Limit-Limit': {
 *             description: 'The number of allowed requests in the current period',
 *             schema: {
 *               type: 'integer',
 *             },
 *           },
 *         },
 *       },
 *     },
 *   };
 */
export type EncodingObject = {
  /**
   * The Content-Type for encoding a specific property. Default value depends on the property type: for string with
   * format being binary – application/octet-stream; for other primitive types – text/plain; for object -
   * application/json; for array – the default is defined based on the inner type. The value can be a specific media
   * type (e.g. application/json), a wildcard media type (e.g. image/*), or a comma-separated list of the two types.
   */
  contentType?: string;
  /**
   * A map allowing additional information to be provided as headers, for example Content-Disposition. Content-Type is
   * described separately and SHALL be ignored in this section. This property SHALL be ignored if the request body media
   * type is not a multipart.
   */
  headers?: { [key: string]: HeaderObject } | { [key: string]: ReferenceObject };
  /**
   * Describes how a specific property value will be serialized depending on its type. See Parameter Object for details
   * on the style property. The behavior follows the same values as query parameters, including default values. This
   * property SHALL be ignored if the request body media type is not application/x-www-form-urlencoded.
   */
  style?: string;
  /**
   * When this is true, property values of type array or object generate separate parameters for each value of the
   * array, or key-value-pair of the map. For other types of properties this property has no effect. When style is form,
   * the default value is true. For all other styles, the default value is false. This property SHALL be ignored if the
   * request body media type is not application/x-www-form-urlencoded.
   */
  explode?: boolean;
  /**
   * Determines whether the parameter value SHOULD allow reserved characters, as defined by RFC3986 :/?#[]@!$&'()*+,;=
   * to be included without percent-encoding. The default value is false. This property SHALL be ignored if the request
   * body media type is not application/x-www-form-urlencoded.
   */
  allowReserved?: boolean;
};

export type MediaTypeObject = {
  schema: Schema | ReferenceObject;
  example: any;
  examples: ExampleObject | { [key: string]: ReferenceObject };
  encoding: EncodingObject;
};

export type ParameterObject = {
  /**
   * REQUIRED. The name of the parameter. Parameter names are case sensitive. If in is "path", the name field MUST
   * correspond to a template expression occurring within the path field in the Paths Object. See Path Templating for
   * further information. If in is "header" and the name field is "Accept", "Content-Type" or "Authorization", the
   * parameter definition SHALL be ignored. For all other cases, the name corresponds to the parameter name used by the
   * in property.
   */
  name: string;
  /** REQUIRED. The location of the parameter. Possible values are "query", "header", "path" or "cookie". */
  in: InField;
  /**
   * A brief description of the parameter. This could contain examples of use. CommonMark syntax MAY be used for rich
   * text representation.
   *
   * @resource [CommonMark](https://spec.commonmark.org/)
   */
  description?: string;
  /**
   * Determines whether this parameter is mandatory. If the parameter location is "path", this property is REQUIRED and
   * its value MUST be true. Otherwise, the property MAY be included and its default value is false.
   */
  required: boolean;
  /** Specifies that a parameter is deprecated and SHOULD be transitioned out of usage. Default value is false. */
  deprecated?: boolean;
  /**
   * Sets the ability to pass empty-valued parameters. This is valid only for query parameters and allows sending a
   * parameter with an empty value. Default value is false. If style is used, and if behavior is n/a (cannot be
   * serialized), the value of allowEmptyValue SHALL be ignored. Use of this property is NOT RECOMMENDED, as it is
   * likely to be removed in a later revision.
   */
  allowEmptyValue?: boolean;
  /**
   * Describes how the parameter value will be serialized depending on the type of the parameter value. Default values
   * (based on value of in): for query - form; for path - simple; for header - simple; for cookie - form.
   *
   * @resource [style chart](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#style-values)
   */
  style?: Style;
  /**
   * When this is true, parameter values of type array or object generate separate parameters for each value of the
   * array or key-value pair of the map. For other types of parameters this property has no effect. When style is form,
   * the default value is true. For all other styles, the default value is false.
   */
  explode?: boolean;
  /**
   * Determines whether the parameter value SHOULD allow reserved characters, as defined by RFC3986 :/?#[]@!$&'()*+,;=
   * to be included without percent-encoding. This property only applies to parameters with an in value of query. The
   * default value is false.
   *
   * @resource [RFC3986](https://tools.ietf.org/html/rfc3986#section-2.2)
   */
  allowReserved?: boolean;
  /** The schema defining the type used for the parameter. */
  schema: Schema | ReferenceObject;
  /**
   * Example of the parameter's potential value. The example SHOULD match the specified schema and encoding properties
   * if present. The example field is mutually exclusive of the examples field. Furthermore, if referencing a schema
   * that contains an example, the example value SHALL override the example provided by the schema. To represent
   * examples of media types that cannot naturally be represented in JSON or YAML, a string value can contain the
   * example with escaping where necessary.
   */
  example: any;
  /**
   * Examples of the parameter's potential value. Each example SHOULD contain a value in the correct format as specified
   * in the parameter encoding. The examples field is mutually exclusive of the example field. Furthermore, if
   * referencing a schema that contains an example, the examples value SHALL override the example provided by the
   * schema.
   */
  examples: ExampleObject | { [key: string]: ReferenceObject };
  content: { [key: string]: MediaTypeObject };
};

export type RequestBody = {
  /**
   * A brief description of the request body. This could contain examples of use. CommonMark syntax MAY be used for rich
   * text representation.
   *
   * @resource [CommonMark](https://spec.commonmark.org/)
   */
  description?: string;
  /**
   * REQUIRED. The content of the request body. The key is a media type or media type range and the value describes it.
   * For requests that match multiple keys, only the most specific key is applicable. e.g. text/plain overrides text/*
   *
   * @example
   *   const example = {
   *     content: {
   *       'application/json': {
   *         schema: {
   *           $ref: '#/components/schemas/User',
   *         },
   *         examples: {
   *           user: {
   *             summary: 'User Example',
   *             externalValue: 'http://foo.bar/examples/user-example.json',
   *           },
   *         },
   *       },
   *     },
   *   };
   */
  content: { [key: string]: MediaTypeObject };
  /** Determines if the request body is required in the request. Defaults to false. */
  required?: boolean;
};

export type LinkObject = {
  /**
   * A relative or absolute URI reference to an OAS operation. This field is mutually exclusive of the operationId
   * field, and MUST point to an Operation Object. Relative operationRef values MAY be used to locate an existing
   * Operation Object in the OpenAPI definition.
   */
  operationRef?: string;
  /**
   * The name of an existing, resolvable OAS operation, as defined with a unique operationId. This field is mutually
   * exclusive of the operationRef field.
   */
  operationId?: string;
  /**
   * A map representing parameters to pass to an operation as specified with operationId or identified via operationRef.
   * The key is the parameter name to be used, whereas the value can be a constant or an expression to be evaluated and
   * passed to the linked operation. The parameter name can be qualified using the parameter location [{in}.]{name} for
   * operations that use the same parameter name in different locations (e.g. path.id).
   *
   * @resource [runtime expressions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#runtime-expressions)
   */
  parameters?: { [key: string]: any };
  /** A literal value or {expression} to use as a request body when calling the target operation. */
  requestBody?: any;
  /** A description of the link. CommonMark syntax MAY be used for rich text representation. */
  description?: string;
  /** A server object to be used by the target operation. */
  server?: Server;
};

/**
 * Describes a single response from an API Operation, including design-time, static links to operations based on the
 * response.
 */
export type ResponseObject = {
  description: string;
  headers?: { [key: string]: HeaderObject } | { [key: string]: ReferenceObject };
  content?: { [key: string]: MediaTypeObject };
  links?: { [key: string]: LinkObject } | { [key: string]: ReferenceObject };
};

export type Expressions =
  | '$url'
  | '$method'
  | '$request.path.eventType'
  | '$request.query.queryUrl'
  | '$request.header.content-Type'
  | '$request.body#/failedUrl'
  | '$request.body#/successUrls/2'
  | '$response.header.Location';

export type ResponsesObject = {
  [key in HttpResponseCodes | 'default']: ResponseObject | ReferenceObject;
};

/**
 * Each name MUST correspond to a security scheme which is declared in the Security Schemes under the Components Object.
 * If the security scheme is of type "oauth2" or "openIdConnect", then the value is a list of scope names required for
 * the execution, and the list MAY be empty if authorization does not require a specified scope. For other security
 * scheme types, the array MUST be empty.
 *
 * @resource [examples](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#security-requirement-object-examples)
 */
export type SecurityRequirementObject = {
  [key: string]: string[];
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
   * A verbose explanation of the operation behavior. CommonMark syntax MAY be used for rich text representation.
   *
   * @resource [CommonMark](https://spec.commonmark.org/)
   */
  description?: string;
  /** Additional external documentation for this operation. */
  externalDocs?: ExternalDocumentation;
  /**
   * Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The
   * operationId value is case-sensitive. Tools and libraries MAY use the operationId to uniquely identify an operation,
   * therefore, it is RECOMMENDED to follow common programming naming conventions.
   */
  operationId?: string;
  /**
   * A list of parameters that are applicable for this operation. If a parameter is already defined at the Path Item,
   * the new definition will override it but can never remove it. The list MUST NOT include duplicated parameters. A
   * unique parameter is defined by a combination of a name and location. The list can use the Reference Object to link
   * to parameters that are defined at the OpenAPI Object's components/parameters.
   */
  parameters?: ParameterObject[] | ReferenceObject[];
  /**
   * The request body applicable for this operation. The requestBody is only supported in HTTP methods where the HTTP
   * 1.1 specification RFC7231 has explicitly defined semantics for request bodies. In other cases where the HTTP spec
   * is vague, requestBody SHALL be ignored by consumers.
   */
  requestBody?: RequestBody | ReferenceObject;
  /** REQUIRED. The list of possible responses as they are returned from executing this operation. */
  responses: ResponsesObject;
  /**
   * A map of possible out-of band callbacks related to the parent operation. The key is a unique identifier for the
   * Callback Object. Each value in the map is a Callback Object that describes a request that may be initiated by the
   * API provider and the expected responses.
   *
   * Key can use expressions in its pattern
   *
   * @type {Expressions}
   * @resource [expression example](https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.0/callback-example.yaml)
   */
  callbacks?: { [key: string]: PathItemObject } | { [key: string]: ReferenceObject };
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
  security?: SecurityRequirementObject[];
  /**
   * An alternative server array to service this operation. If an alternative server object is specified at the Path
   * Item Object or Root level, it will be overridden by this value.
   */
  servers?: Server[];
};

export type PathItemObject = {
  /**
   * Allows for an external definition of this path item. The referenced structure MUST be in the format of a Path Item
   * Object. In case a Path Item Object field appears both in the defined object and the referenced object, the behavior
   * is undefined.
   */
  $ref?: string;
  /** An optional, string summary, intended to apply to all operations in this path. */
  summary?: string;
  /**
   * An optional, string description, intended to apply to all operations in this path. CommonMark syntax MAY be used
   * for rich text representation.
   */
  description?: string;
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
  /** A definition of a TRACE operation on this path. */
  trace?: OperationObject;
  /** An alternative server array to service all operations in this path. */
  servers?: Server[];
  /**
   * A list of parameters that are applicable for all the operations described under this path. These parameters can be
   * overridden at the operation level, but cannot be removed there. The list MUST NOT include duplicated parameters. A
   * unique parameter is defined by a combination of a name and location. The list can use the Reference Object to link
   * to parameters that are defined at the OpenAPI Object's components/parameters.
   */
  parameters?: ParameterObject[] | ReferenceObject[];
};

/**
 * Holds the relative paths to the individual endpoints and their operations. The path is appended to the URL from the
 * Server Object in order to construct the full URL. The Paths MAY be empty, due to ACL constraints.
 *
 * @resource [paths object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#paths-object)
 */
export type Paths = {
  /**
   * A relative path to an individual endpoint. The field name MUST begin with a forward slash (/). The path is appended
   * (no relative URL resolution) to the expanded URL from the Server Object's url field in order to construct the full
   * URL. Path templating is allowed. When matching URLs, concrete (non-templated) paths would be matched before their
   * templated counterparts. Templated paths with the same hierarchy but different templated names MUST NOT exist as
   * they are identical. In case of ambiguous matching, it's up to the tooling to decide which one to use.
   */
  [key: string]: PathItemObject;
};

/** @resource [OAuth Flow Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#fixed-fields-25) */
export type OAuthFlowObject = {
  /** REQUIRED. The authorization URL to be used for this flow. This MUST be in the form of a URL. */
  authorizationUrl?: string;
  /** REQUIRED. The token URL to be used for this flow. This MUST be in the form of a URL. */
  tokenUrl?: string;
  /** The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. */
  refreshUrl?: string;
  /**
   * REQUIRED. The available scopes for the OAuth2 security scheme. A map between the scope name and a short description
   * for it. The map MAY be empty.
   */
  scopes?: { [key: string]: string };
};

export type OauthFlowsObject = {
  /** Configuration for the OAuth Implicit flow */
  implicit: OAuthFlowObject;
  /** Configuration for the OAuth Resource Owner Password flow */
  password: OAuthFlowObject;
  /** Configuration for the OAuth Client Credentials flow. Previously called application in OpenAPI 2.0. */
  clientCredentials: OAuthFlowObject;
  /** Configuration for the OAuth Authorization Code flow. Previously called accessCode in OpenAPI 2.0. */
  authorizationCode: OAuthFlowObject;
};

export type SecuritySchemaTypes = 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';

/** @resource [Security Scheme Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#security-scheme-object) */
export type SecuritySchemaObject = {
  /** REQUIRED. The type of the security scheme. Valid values are "apiKey", "http", "oauth2", "openIdConnect". */
  type: SecuritySchemaTypes;
  /** A short description for security scheme. CommonMark syntax MAY be used for rich text representation. */
  description?: string;
  /** REQUIRED. The name of the header, query or cookie parameter to be used. */
  name?: string;
  /** REQUIRED. The location of the API key. Valid values are "query", "header" or "cookie". */
  in?: 'query' | 'header' | 'cookie';
  /**
   * REQUIRED. The name of the HTTP Authorization scheme to be used in the Authorization header as defined in RFC7235.
   * The values used SHOULD be registered in the IANA Authentication Scheme registry.
   */
  scheme?: string;
  /**
   * A hint to the client to identify how the bearer token is formatted. Bearer tokens are usually generated by an
   * authorization server, so this information is primarily for documentation purposes.
   */
  bearerFormat?: string;
  /** REQUIRED. An object containing configuration information for the flow types supported. */
  flows?: OauthFlowsObject;
  /** REQUIRED. OpenId Connect URL to discover OAuth2 configuration values. This MUST be in the form of a URL. */
  openIdConnectUrl?: string;
};

export type ComponentsObject = {
  schemas?: { [key: string]: Schema } | { [key: string]: ReferenceObject };
  responses?: { [key: string]: ResponseObject } | { [key: string]: ReferenceObject };
  parameter?: { [key: string]: ParameterObject } | { [key: string]: ReferenceObject };
  examples?: { [key: string]: ExampleObject } | { [key: string]: ReferenceObject };
  requestBody?: { [key: string]: RequestBody } | { [key: string]: ReferenceObject };
  headers?: { [key: string]: HeaderObject } | { [key: string]: ReferenceObject };
  securitySchemas?: { [key: string]: SecuritySchemaObject } | { [key: string]: ReferenceObject };
  links?: { [key: string]: LinkObject } | { [key: string]: ReferenceObject };
  callbacks?: { [key: string]: PathItemObject } | { [key: string]: ReferenceObject };
};

export interface V3DocumentData {
  openapi: OpenAPI;
  /**
   * The object provides metadata about the API. The metadata MAY be used by the clients if needed, and MAY be presented
   * in editing or documentation generation tools for convenience.
   *
   * @resource [Swagger Info Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#infoObject)
   */
  info: Info;
  /**
   * An array of Server Objects, which provide connectivity information to a target server. If the servers property is
   * not provided, or is an empty array, the default value would be a Server Object with a url value of /.
   */
  servers?: Server[];
  /** REQUIRED. The available paths and operations for the API. */
  paths: Paths;
  /** An element to hold various schemas for the specification. */
  components?: ComponentsObject; // by default: empty object (OpenAPI 3.x)
  /**
   * A declaration of which security mechanisms can be used across the API. The list of values includes alternative
   * security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to
   * authorize a request. Individual operations can override this definition. To make security optional, an empty
   * security requirement ({}) can be included in the array.
   */
  security?: SecurityRequirementObject[]; // by default: empty object
  /**
   * A list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on
   * their order by the parsing tools. Not all tags that are used by the Operation Object must be declared. The tags
   * that are not declared MAY be organized randomly or based on the tools' logic. Each tag name in the list MUST be
   * unique.
   */
  tags?: Tags[];
  /** Additional external documentation. */
  externalDocs?: ExternalDocumentation;
}
