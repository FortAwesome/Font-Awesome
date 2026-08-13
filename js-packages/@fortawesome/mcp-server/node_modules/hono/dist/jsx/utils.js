// src/jsx/utils.ts
var normalizeElementKeyMap = /* @__PURE__ */ new Map([
  ["className", "class"],
  ["htmlFor", "for"],
  ["crossOrigin", "crossorigin"],
  ["httpEquiv", "http-equiv"],
  ["itemProp", "itemprop"],
  ["fetchPriority", "fetchpriority"],
  ["noModule", "nomodule"],
  ["formAction", "formaction"]
]);
var normalizeIntrinsicElementKey = (key) => normalizeElementKeyMap.get(key) || key;
var invalidAttributeNameCharRe = /[\s"'<>/=`\\\x00-\x1f\x7f-\x9f]/;
var validAttributeNameCache = /* @__PURE__ */ new Set();
var validAttributeNameCacheMax = 1024;
var invalidTagNameCharRe = /^[!?]|[\s"'<>/=`\\\x00-\x1f\x7f-\x9f]/;
var validTagNameCache = /* @__PURE__ */ new Set();
var validTagNameCacheMax = 256;
var cacheValidName = (cache, max, name) => {
  if (cache.size >= max) {
    cache.clear();
  }
  cache.add(name);
};
var isValidTagName = (name) => {
  if (validTagNameCache.has(name)) {
    return true;
  }
  if (typeof name !== "string") {
    return false;
  }
  if (name.length === 0) {
    return true;
  }
  if (invalidTagNameCharRe.test(name)) {
    return false;
  }
  cacheValidName(validTagNameCache, validTagNameCacheMax, name);
  return true;
};
var isValidAttributeName = (name) => {
  if (validAttributeNameCache.has(name)) {
    return true;
  }
  const len = name.length;
  if (len === 0) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    const c = name.charCodeAt(i);
    if (!(c >= 97 && c <= 122 || // a-z
    c >= 65 && c <= 90 || // A-Z
    c >= 48 && c <= 57 || // 0-9
    c === 45 || // -
    c === 95 || // _
    c === 46 || // .
    c === 58)) {
      if (!invalidAttributeNameCharRe.test(name)) {
        cacheValidName(validAttributeNameCache, validAttributeNameCacheMax, name);
        return true;
      } else {
        return false;
      }
    }
  }
  cacheValidName(validAttributeNameCache, validAttributeNameCacheMax, name);
  return true;
};
var styleObjectForEach = (style, fn) => {
  for (const [k, v] of Object.entries(style)) {
    const key = k[0] === "-" || !/[A-Z]/.test(k) ? k : k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
    fn(
      key,
      v == null ? null : typeof v === "number" ? !key.match(
        /^(?:a|border-im|column(?:-c|s)|flex(?:$|-[^b])|grid-(?:ar|[^a])|font-w|li|or|sca|st|ta|wido|z)|ty$/
      ) ? `${v}px` : `${v}` : v
    );
  }
};
export {
  isValidAttributeName,
  isValidTagName,
  normalizeIntrinsicElementKey,
  styleObjectForEach
};
