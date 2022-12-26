import fs from 'fs';
import { platform } from 'process';
import { Files, OpenApiObject, Options } from 'types/globalTypes';
import { V2DocumentData } from 'types/v2Types';
import { V3DocumentData } from 'types/v3Types';
import * as statics from './constaints/statics';
import { DEFAULT_OPTIONS } from './constaints/statics';
import * as swaggerTags from './functions/commentParseUtil';
import * as utils from './functions/generalUtil';
import * as handleData from './functions/handle-data';
import * as handleFiles from './functions/handle-files';
import * as logger from './functions/logger'
import './src/prototype-functions';

const symbols = platform === 'win32' ? { success: '', failed: '' } : { success: '✔', failed: '✖' };

export async function generateSwaggerV2 (files: Files, options?: Options, data: V2DocumentData) {
  const combinedOptions: Options = { ...DEFAULT_OPTIONS, ...options };
  handleFiles.setOptions(combinedOptions);
  handleData.setOptions(combinedOptions);
  swaggerTags.setLanguage(combinedOptions.language);
  // swaggerTags.setOpenAPI(combinedOptions.openApi);
  swaggerTags.setDisableLogs(combinedOptions.disableLogs ?? false); 
  if (files) {
    return await init(files, data, combinedOptions);
  }
}

export default async function generateSwaggerV3 (files: Files, options?: Options, data: V3DocumentData) {
  const combinedOptions: Options = { ...DEFAULT_OPTIONS, ...options };
  handleFiles.setOptions(combinedOptions);
  handleData.setOptions(combinedOptions);
  swaggerTags.setLanguage(combinedOptions.language);
  swaggerTags.setOpenAPI(combinedOptions.openApi ?? '3.0.0');
  swaggerTags.setDisableLogs(combinedOptions.disableLogs ?? false);
  if (files) {
    return await init(files, data, combinedOptions);
  }
}

const outputResults = (outputFile: string, dataJSON: OpenApiObject, options: Options) => {
  try {
    fs.writeFileSync(outputFile, JSON.stringify(dataJSON, null, 2));
    if (!options.disableLogs) {
      logger.log('Swagger-autogen:', '\x1b[32m', 'Success ' + symbols.success, '\x1b[0m');
    }
    return { success: true, data: dataJSON };
} catch (err) {
  if (!options.disableLogs) {
    logger.log('Swagger-autogen:', '\x1b[31m', 'Failed ' + symbols.failed, '\x1b[0m');
  }
  return { success: false, data: null };
}
}

  //*****************************************************************************************************************
  // validate files exist
  //*****************************************************************************************************************

const addressEndpoints = (files: Files, options: Options, data?: OpenApiObject) => {
  try {
  if (!files.outputFile) throw logger.error("\nError: 'outputFile' was not specified.");
  if (!files.endpointsFiles) throw logger.error("\nError: 'endpointsFiles' was not specified.");

  
  if (platform === 'win32') {
    // TODO: Implement relative path for Windows
  } else if (files.outputFile.split(new RegExp('^/')).length == 1 && process && process.argv[1]) {
    let basePath = process.argv[1].split('/').slice(0, -1).join('/');
    files.outputFile = await handleFiles.resolvePathFile(files.outputFile, basePath);
  }

  let allFiles: string[] = [];

  /* Reading the files from the directory and storing it in an array. */
  for (let i = 0; i < files.endpointsFiles.length; ++i) {
    let file = files.endpointsFiles[i];
    const legacyFilePath = file;

    //! remove this
    if (platform === 'win32') {
      // TODO: Implement relative path for Windows
    } else if (file.split(new RegExp('^/')).length == 1 && process && process.argv[1]) {
      let basePath = process.argv[1].split('/').slice(0, -1).join('/');
      file = await handleFiles.resolvePathFile(file, basePath);
    }

    if (file.includes('*')) {
      const patternPath = await utils.resolvePatternPath(file);
      if (patternPath) {
        for (let idxFile = 0; idxFile < patternPath.length; ++idxFile) {
          let file = patternPath[idxFile];
          let extension = await utils.getExtension(file);

          if (!fs.existsSync(file + extension)) {
            throw logger.error("[swagger-autogen-typescript]: Error! File not found: '" + file + "'");
          } else {
            patternPath[idxFile] = file + extension;
          }
        }
        allFiles = [...allFiles, ...patternPath];
      }
    } else {
      let extension = await utils.getExtension(file);
      if (!fs.existsSync(file + extension)) {
        file = legacyFilePath; // To legacy cases. Will be deprecated in the future
        if (!fs.existsSync(file + extension)) {
          throw logger.error("[swagger-autogen-typescript]: Error! File not found: '" + file + "'");
        }
      }
      allFiles = [...allFiles, file + extension];
    }
  }
  /* Reading all the files in the folder and then creating a single object out of it. */
  for (let file = 0; file < allFiles.length; file++) {
    const filePath = allFiles[file];
    const resp = fs.existsSync(filePath);
    if (!resp) {
      console.error('[swagger-autogen-typescript]: Error! Endpoint file not found => ' + "'" + filePath + "'");
      if (!options.disableLogs) {
        logger.log('Swagger-autogen:', '\x1b[31m', 'Failed ' + symbols.failed, '\x1b[0m');
      }
      return false;
    }

    let relativePath = filePath.split('/');
    if (relativePath.length > 1) {
      relativePath.pop();
      relativePath = relativePath.join('/');
    } else {
      relativePath = null;
    }

    let obj = await handleFiles.readEndpointFile(filePath, '', relativePath, []);
    if (obj === false) {
      if (!options.disableLogs) {
        logger.log('Swagger-autogen:', '\x1b[31m', 'Failed ' + symbols.failed, '\x1b[0m');
      }
      return false;
    }
    GLOBAL_OBJECT.paths = { ...GLOBAL_OBJECT.paths, ...obj };
  }
} catch (error) {
  logger.error(`[swagger-autogen-typescript]: ${{error: 'Error', Message: error}}`)
}
}

const prepV2Swagger = () => {
  // setting up definitions
  let containXML = false;
    if (JSON.stringify(objDoc).includes('application/xml')) {
      // REFACTOR: improve this
      containXML = true;
    }
    Object.keys(objDoc.definitions).forEach((definition) => {
      if (containXML) {
        GLOBAL_OBJECT.definitions[definition] = {
          ...swaggerTags.formatDefinitions(objDoc.definitions[definition], {}, containXML),
          xml: { name: definition },
        };
      } else {
        GLOBAL_OBJECT.definitions[definition] = {
          ...swaggerTags.formatDefinitions(objDoc.definitions[definition], {}, containXML),
        };
      }
    });

    if (GLOBAL_OBJECT['@definitions']) {
      if (!GLOBAL_OBJECT.definitions) {
        GLOBAL_OBJECT.definitions = {};
      }
      GLOBAL_OBJECT.definitions = { ...objDoc.definitions, ...objDoc['@definitions'] };
      delete GLOBAL_OBJECT['@definitions'];
    }
};

const prepV3Swagger = () => {};


/**
 * TODO List
 * 1. separate V2 and V3
 * 2. address necessary file handling
 * 3. validate output file handling
 * 4. remove unnecessary code and object manipulation
 * 5. create a global object
 */
const init = async (files: Files, openApiObject: OpenApiObject, options: Options) => {
  
  try {
    addressEndpoints(files, options, openApiObject)

    // decide if we are using openApi 2 or 3
    if (openApiObject.openapi) {
      prepV3Swagger();
    } else {
      prepV2Swagger();
    }

    // !! this is attempting to set a template for the default values
    const objDoc = { ...statics.TEMPLATE, ...openApiObject, paths: {} };

    

    // TODO: this is stupid
    // Removing all null attributes
    for (let key in objDoc) {
      if (objDoc[key] === null) {
        delete objDoc[key];
      }
    }

    if (!openApiObject.info.version) {
      openApiObject.info.version = statics.TEMPLATE.info.version;
    }
    if (!openApiObject.info.title) {
      openApiObject.info.title = statics.TEMPLATE.info.title;
    }
    if (!openApiObject.info.description) {
      openApiObject.info.description = statics.TEMPLATE.info.description;
    }

    
    

    /** Forcing convertion to OpenAPI 3.x */
    if (objDoc.openapi) {
      if (!objDoc.servers || objDoc.servers.length == 0) {
        if (objDoc.host) {
          if (openApiObject.basePath) {
            objDoc.host += objDoc.basePath;
          }
          if (objDoc.host.slice(0, 4).toLowerCase() != 'http') {
            if (objDoc.schemes && objDoc.schemes.length > 0) {
              objDoc.schemes.forEach((scheme) => {
                objDoc.servers.push({
                  url: scheme + '://' + objDoc.host,
                });
              });
            } else {
              objDoc.host = 'http://' + objDoc.host;
              objDoc.servers = [
                {
                  url: objDoc.host,
                },
              ];
            }
          }

          delete objDoc.host;
        } else {
          delete objDoc.servers;
        }
      } else {
        delete objDoc.host;
      }

      if (objDoc.components && objDoc.components.schemas) {
        Object.keys(objDoc.components.schemas).forEach((schema) => {
          if (constainXML) {
            objDoc.components.schemas[schema] = {
              ...swaggerTags.formatDefinitions(objDoc.components.schemas[schema], {}, constainXML),
              xml: { name: schema },
            };
          } else {
            objDoc.components.schemas[schema] = {
              ...swaggerTags.formatDefinitions(objDoc.components.schemas[schema], {}, constainXML),
            };
          }
        });
      }

      if (objDoc.components && objDoc.components['@schemas']) {
        if (!objDoc.components) {
          objDoc.components = {};
        }
        if (!objDoc.components.schemas) {
          objDoc.components.schemas = {};
        }
        objDoc.components.schemas = { ...objDoc.components.schemas, ...objDoc.components['@schemas'] };
        delete objDoc.components['@schemas'];
      }

      if (objDoc.components && objDoc.components.examples) {
        Object.keys(objDoc.components.examples).forEach((example) => {
          if (!objDoc.components.examples[example].value) {
            let auxExample = { ...objDoc.components.examples[example] };
            delete objDoc.components.examples[example];
            objDoc.components.examples[example] = {
              value: auxExample,
            };
          }
        });
      }

      if (objDoc.definitions && Object.keys(objDoc.definitions).length > 0) {
        if (!objDoc.components) {
          objDoc.components = {};
        }
        if (!objDoc.components.schemas) {
          objDoc.components.schemas = {};
        }

        objDoc.components.schemas = {
          ...objDoc.components.schemas,
          ...objDoc.definitions,
        };

        delete objDoc.definitions;
      }

      if (objDoc.securityDefinitions && Object.keys(objDoc.securityDefinitions).length > 0) {
        if (!objDoc.components) {
          objDoc.components = {};
        }
        if (!objDoc.components.securitySchemes) {
          objDoc.components.securitySchemes = {};
        }

        objDoc.components.securitySchemes = {
          ...objDoc.components.securitySchemes,
          ...objDoc.securityDefinitions,
        };

        delete objDoc.securityDefinitions;
      }

      if (objDoc.basePath) {
        delete objDoc.basePath;
      }
      if (objDoc.schemes) {
        delete objDoc.schemes;
      }
      if (objDoc.consumes) {
        delete objDoc.consumes;
      }
      if (objDoc.produces) {
        delete objDoc.produces;
      }
      if (objDoc.definitions) {
        delete objDoc.definitions;
      }
    }

    /** Removing unused parameters */
    if (objDoc.components && Object.keys(objDoc.components).length == 0) {
      delete objDoc.components;
    }
    if (objDoc.servers && Object.keys(objDoc.servers).length == 0) {
      delete objDoc.servers;
    }
    if (objDoc.tags && objDoc.tags.length == 0) {
      delete objDoc.tags;
    }
    if (objDoc.consumes && objDoc.consumes.length == 0) {
      delete objDoc.consumes;
    }
    if (objDoc.produces && objDoc.produces.length == 0) {
      delete objDoc.produces;
    }
    if (objDoc.definitions && Object.keys(objDoc.definitions).length == 0) {
      delete objDoc.definitions;
    }

    const dataJSON = JSON.stringify(objDoc, null, 2);
    outputResults(files.outputFile,objDoc, options)
    
};
