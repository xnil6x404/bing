// src/analyzer/util.ts
import { JSONPath } from "jsonpath-plus";
function query(queries, definition) {
  const results = queries.map((q) => JSONPath({ path: q, json: definition, resultType: "all" })).filter((res) => res.length ? res : false).reduce((prev, next) => prev.concat(next), []);
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

export {
  query,
  refizePointer
};
//# sourceMappingURL=chunk-CKC36IL7.js.map