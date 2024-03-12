"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/analyzer/util.ts
var _jsonpathplus = require('jsonpath-plus');
function query(queries, definition) {
  const results = queries.map((q) => _jsonpathplus.JSONPath.call(void 0, { path: q, json: definition, resultType: "all" })).filter((res) => res.length ? res : false).reduce((prev, next) => prev.concat(next), []);
  results.sort((a, b) => {
    if (a.pointer < b.pointer) {
      return -1;
    } else if (a.pointer > b.pointer) {
      return 1;
    }
    return 0;
  });
  return results;
}
function refizePointer(pointer) {
  return `#${pointer}`;
}




exports.query = query; exports.refizePointer = refizePointer;
//# sourceMappingURL=chunk-W6GBV2JT.cjs.map