"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/index.ts
function isObject(obj) {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}
function isEmptyObject(obj) {
  return typeof obj === "object" && obj !== null && !Object.keys(obj).length;
}
function stripEmptyObjects(obj) {
  const cleanObj = obj;
  if (!isObject(obj) && !Array.isArray(cleanObj)) {
    return cleanObj;
  } else if (obj === null) {
    return void 0;
  }
  if (!Array.isArray(cleanObj)) {
    Object.keys(cleanObj).forEach((key) => {
      let value = cleanObj[key];
      if (typeof value === "object" && value !== null) {
        value = stripEmptyObjects(value);
        if (isEmptyObject(value)) {
          delete cleanObj[key];
        } else {
          cleanObj[key] = value;
        }
      } else if (value === null) {
      }
    });
    return cleanObj;
  }
  cleanObj.forEach((o, idx) => {
    let value = o;
    if (typeof value === "object" && value !== null) {
      value = stripEmptyObjects(value);
      if (isEmptyObject(value)) {
        delete cleanObj[idx];
      } else {
        cleanObj[idx] = value;
      }
    } else if (value === null) {
      delete cleanObj[idx];
    }
  });
  return cleanObj.filter((el) => el !== void 0);
}
function removeUndefinedObjects(obj) {
  if (obj === void 0) {
    return void 0;
  }
  let withoutUndefined = JSON.parse(JSON.stringify(obj));
  withoutUndefined = stripEmptyObjects(withoutUndefined);
  if (isEmptyObject(withoutUndefined))
    return void 0;
  return withoutUndefined;
}


exports.default = removeUndefinedObjects;

module.exports = exports.default//# sourceMappingURL=index.js.map