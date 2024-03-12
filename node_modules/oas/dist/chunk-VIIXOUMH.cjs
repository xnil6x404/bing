"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/lib/find-schema-definition.ts
var _jsonpointer = require('jsonpointer'); var _jsonpointer2 = _interopRequireDefault(_jsonpointer);
function findSchemaDefinition($ref, definition = {}) {
  const origRef = $ref;
  $ref = $ref.trim();
  if ($ref === "") {
    return false;
  }
  if ($ref.startsWith("#")) {
    $ref = decodeURIComponent($ref.substring(1));
  } else {
    throw new Error(`Could not find a definition for ${origRef}.`);
  }
  const current = _jsonpointer2.default.get(definition, $ref);
  if (current === void 0) {
    throw new Error(`Could not find a definition for ${origRef}.`);
  }
  return current;
}

// src/utils.ts
var supportedMethods = /* @__PURE__ */ new Set(["get", "put", "post", "delete", "options", "head", "patch", "trace"]);




exports.findSchemaDefinition = findSchemaDefinition; exports.supportedMethods = supportedMethods;
//# sourceMappingURL=chunk-VIIXOUMH.cjs.map