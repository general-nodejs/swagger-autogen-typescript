import fs from 'fs';
import glob from 'glob';

export async function fileOrDirectoryExist(path: fs.PathLike) {
  try {
    if (fs.lstatSync(path).isDirectory()) {
      return { isDirectory: true, isFile: false };
    }
    await fs.promises.access(path);
    return { isDirectory: false, isFile: true };
  } catch (error) {
    return { isDirectory: false, isFile: false };
  }
}

export async function getExtension(fileName: string) {
  try {
    let extensions = ['.js', '.ts', '.jsx', '.tsx', '.mjs', '.cjs'];
    let data = fileName.split('.').slice(-1)[0].toLowerCase();
    if (extensions.includes(data)) {
      return '';
    }

    for (let idx = 0; idx < extensions.length; ++idx) {
      if (fs.existsSync(fileName + extensions[idx])) {
        return extensions[idx];
      }
    }
    return '';
  } catch (err) {
    return '';
  }
}

export function getFileContent(pathFile: fs.PathOrFileDescriptor) {
  return new Promise((resolve) => {
    fs.readFile(pathFile, 'utf8', function (err, data) {
      if (err) {
        return resolve(null);
      }
      return resolve(data);
    });
  });
}

export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function stackSymbolRecognizer(data, startSymbol, endSymbol, ignoreString = true) {
  return new Promise((resolve) => {
    if (!data) {
      return resolve(data);
    }

    const origData = data;
    try {
      let stack = 1;
      let ignore = false;
      let strSymbol = null;
      data = data
        .split('')
        .filter((c, idx) => {
          if (ignoreString && (c == "'" || c == '"' || c == '`') && !strSymbol) {
            strSymbol = c;
            ignore = true;
          } else if (ignoreString && strSymbol == c && data[idx - 1] != '\\') {
            strSymbol = null;
            ignore = false;
          }
          if (stack <= 0) return false;
          if (c == startSymbol && !ignore) stack += 1;
          if (c == endSymbol && !ignore) stack -= 1;
          return true;
        })
        .join('');
      return resolve(data);
    } catch (err) {
      return resolve(origData);
    }
  });
}

export function stack0SymbolRecognizer(data, startSymbol, endSymbol, keepSymbol = false) {
  return new Promise((resolve) => {
    try {
      let stack = 0;
      let rec = 0;
      let strVect = [];

      if (!endSymbol && startSymbol === '[') {
        endSymbol = ']';
      } else if (!endSymbol && startSymbol === '{') {
        endSymbol = '}';
      } else if (!endSymbol && startSymbol === '(') {
        endSymbol = ')';
      }

      for (let idx = 0; idx < data.length; ++idx) {
        let c = data[idx];

        if (rec == 0 && c == startSymbol) rec = 1;
        if (c == startSymbol && rec == 1) stack += 1;
        if (c == endSymbol && rec == 1) stack -= 1;
        if (stack == 0 && rec == 1) rec = 2;

        if (rec == 1) strVect.push(c);

        if ((idx === data.length - 1 && rec == 1) || (idx === data.length - 1 && rec == 0)) return resolve(null);

        if (idx === data.length - 1) {
          strVect = strVect.join('');
          if (keepSymbol) {
            return resolve(startSymbol + strVect.slice(1) + endSymbol);
          }
          return resolve(strVect.slice(1));
        }
      }
    } catch (err) {
      if (keepSymbol) {
        return resolve(startSymbol + endSymbol);
      }
      return resolve('');
    }
  });
}

export function resolvePatternPath(path: string) {
  return glob.__promisify__(path);
}

export function getFirstPosition(param, data) {
  if (data && param) {
    let position = data.split(param).shift();
    if (position.length == data.length) {
      return null;
    }
    return position.length;
  }
  return null;
}

export function removeRegex(data) {
  if (!data || data.length == 0) {
    return data;
  }

  let strToReturn = '';
  let stackComment1 = 0; // For type  //
  let stackComment2 = 0; // For type  /* */

  let buffer = ''; // For type   /* */

  // Won't remove comments in strings
  let isStr1 = 0; // "
  let isStr2 = 0; // '
  let isStr3 = 0; // `
  try {
    for (let idx = 0; idx < data.length; ++idx) {
      let c = data[idx];

      // If in comments or regex, ignore strings
      if (stackComment1 == 0 && stackComment2 == 0) {
        // Type '
        if (c == "'" && (data[idx - 1] != '\\' || (data[idx - 1] == '\\' && data[idx - 2] == '\\')) && isStr1 == 1) {
          isStr1 = 2;
        } else if (
          c == "'" &&
          (data[idx - 1] != '\\' || (data[idx - 1] == '\\' && data[idx - 2] == '\\')) &&
          isStr1 == 0 &&
          isStr2 == 0 &&
          isStr3 == 0
        ) {
          isStr1 = 1;
        }

        // Type  "
        else if (
          c == '"' &&
          (data[idx - 1] != '\\' || (data[idx - 1] == '\\' && data[idx - 2] == '\\')) &&
          isStr2 == 1
        ) {
          isStr2 = 2;
        } else if (
          c == '"' &&
          (data[idx - 1] != '\\' || (data[idx - 1] == '\\' && data[idx - 2] == '\\')) &&
          isStr1 == 0 &&
          isStr2 == 0 &&
          isStr3 == 0
        ) {
          isStr2 = 1;
        }

        // Type  `
        else if (
          c == '`' &&
          (data[idx - 1] != '\\' || (data[idx - 1] == '\\' && data[idx - 2] == '\\')) &&
          isStr3 == 1
        ) {
          isStr3 = 2;
        } else if (
          c == '`' &&
          (data[idx - 1] != '\\' || (data[idx - 1] == '\\' && data[idx - 2] == '\\')) &&
          isStr1 == 0 &&
          isStr2 == 0 &&
          isStr3 == 0
        ) {
          isStr3 = 1;
        }
      }

      // Type //
      if (
        c == '/' &&
        data[idx + 1] == '/' &&
        data[idx - 1] != '\\' &&
        data[idx - 1] != ':' &&
        stackComment1 == 0 &&
        stackComment2 == 0
      ) {
        // REFACTOR: improve this. Avoiding cases such as: ... http://... be handled as a comment
        stackComment1 = 1;
      } else if (c == '\n' && stackComment1 == 1) {
        stackComment1 = 2;
      }

      // Type  /* */
      else if (
        c == '/' &&
        data[idx + 1] == '*' &&
        data[idx - 1] != '\\' &&
        stackComment1 == 0 &&
        stackComment2 == 0 &&
        isStr1 == 0 &&
        isStr2 == 0 &&
        isStr3 == 0
      ) {
        stackComment2 = 1;
      } else if (
        c == '/' &&
        data[idx - 1] == '*' &&
        stackComment2 == 1 &&
        isStr1 == 0 &&
        isStr2 == 0 &&
        isStr3 == 0 &&
        buffer != '/*'
      ) {
        stackComment2 = 2;
      }

      /** REGEX START */
      if (
        c == '/' &&
        data[idx - 1] != '\\' &&
        data[idx + 1] != '/' &&
        isStr1 == 0 &&
        isStr2 == 0 &&
        isStr3 == 0 &&
        stackComment1 == 0 &&
        stackComment2 == 0
      ) {
        // Checking if it is valid regex
        let lidx = idx + 1;
        let lstr = '';
        let regexStackParenthesis = 0;
        let regexStackSquareBracket = 0;

        while (lidx < data.length) {
          let lc = data[lidx];

          if (lc == '(') {
            regexStackParenthesis += 1;
          } else if (lc == ')') {
            regexStackParenthesis -= 1;
          } else if (lc == '[') {
            regexStackSquareBracket += 1;
          } else if (lc == ']') {
            regexStackSquareBracket -= 1;
          }

          lstr += lc;
          lidx += 1;

          if (data[lidx] == '/' && data[idx - 1] != '\\' && regexStackParenthesis < 1 && regexStackSquareBracket < 1) {
            if (regexStackParenthesis < 0) {
              regexStackParenthesis = 0;
            }
            if (regexStackSquareBracket < 0) {
              regexStackSquareBracket = 0;
            }
            break;
          }
        }

        try {
          if (''.split(new RegExp(lstr)).length > -1) {
            // Valid regex
            data = replaceRange(data, idx, lidx + 1, ' ');
            c = data[idx];
          }
        } catch (err) {
          // Invalid regex
        }
      }
      /* REGEX END */

      strToReturn += c;

      if (stackComment1 == 2) {
        stackComment1 = 0;
      }

      if (stackComment2 == 2) {
        stackComment2 = 0;
      }

      if (isStr1 == 2) isStr1 = 0;
      if (isStr2 == 2) isStr2 = 0;
      if (isStr3 == 2) isStr3 = 0;

      if (idx == data.length - 1) {
        return strToReturn;
      }
    }
  } catch (err) {
    return strToReturn;
  }
}

/**
 * It removes regexes from the string, then it looks for the first quote character, then it looks for the next quote
 * character, then it returns the string between the two quote characters
 *
 * @param data - The string to parse
 * @param [keepQuote=false] - If true, the quote will be kept. Default is `false`
 * @returns The string that is being returned is the string that is being passed in.
 */
export function popString(data, keepQuote = false) {
  if (!data) {
    return null;
  }

  try {
    data = removeRegex(data);

    let quote = null;
    let onString = false;
    let string = '';
    for (let i = 0; i < data.length; ++i) {
      let c = data[i];

      if (quote) {
        string += c;
      }

      if (onString && c == quote && data[i - 1] !== '\\') {
        if (!keepQuote) {
          return string.slice(0, -1);
        }
        return c + string;
      }

      if (!onString && /'|"|`/.test(c) && data[i - 1] !== '\\') {
        quote = c;
        onString = true;
      }
    }
    return null;
  } catch (err) {
    return null;
  }
}

/**
 * Replace the substring of str from start to end with substitute.
 *
 * @param {string} str - The string to be modified
 * @param {number} start - The index of the first character to be replaced.
 * @param {number} end - The index of the last character to include in the resulting string.
 * @param {string} substitute - The string to replace the range with.
 * @returns A string.
 */
export function replaceRange(str: string, start: number, end: number, substitute: string) {
  return str.substring(0, start) + substitute + str.substring(end);
}

// TODO decide if i want this or the proto-typed option
export function replaceAll(text: string, search: string, replacement?: string) {
  return text.split(search).join(replacement);
}
