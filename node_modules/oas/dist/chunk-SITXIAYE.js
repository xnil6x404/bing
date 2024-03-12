// src/lib/find-schema-definition.ts
import jsonpointer from "jsonpointer";
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
  const current = jsonpointer.get(definition, $ref);
  if (current === void 0) {
    throw new Error(`Could not find a definition for ${origRef}.`);
  }
  return current;
}

// src/utils.ts
var supportedMethods = /* @__PURE__ */ new Set(["get", "put", "post", "delete", "options", "head", "patch", "trace"]);

export {
  findSchemaDefinition,
  supportedMethods
};
//# sourceMappingURL=chunk-SITXIAYE.js.map