// src/helper/css/common.ts
var PSEUDO_GLOBAL_SELECTOR = ":-hono-global";
var isPseudoGlobalSelectorRe = new RegExp(`^${PSEUDO_GLOBAL_SELECTOR}{(.*)}$`);
var DEFAULT_STYLE_ID = "hono-css";
var SELECTOR = /* @__PURE__ */ Symbol();
var CLASS_NAME = /* @__PURE__ */ Symbol();
var STYLE_STRING = /* @__PURE__ */ Symbol();
var SELECTORS = /* @__PURE__ */ Symbol();
var EXTERNAL_CLASS_NAMES = /* @__PURE__ */ Symbol();
var CSS_ESCAPED = /* @__PURE__ */ Symbol();
var IS_CSS_ESCAPED = /* @__PURE__ */ Symbol();
var rawCssString = (value) => {
  return {
    [CSS_ESCAPED]: value
  };
};
var toHash = (str) => {
  let i = 0, out = 11;
  while (i < str.length) {
    out = 101 * out + str.charCodeAt(i++) >>> 0;
  }
  return "css-" + out;
};
var normalizeLabel = (label) => {
  return label.trim().replace(/\s+/g, "-");
};
var isValidClassName = (name) => /^-?[_a-zA-Z][_a-zA-Z0-9-]*$/.test(name);
var RESERVED_KEYFRAME_NAMES = /* @__PURE__ */ new Set([
  "default",
  "inherit",
  "initial",
  "none",
  "revert",
  "revert-layer",
  "unset"
]);
var isValidKeyframeName = (name) => isValidClassName(name) && !RESERVED_KEYFRAME_NAMES.has(name.toLowerCase());
var defaultOnInvalidSlug = (slug) => {
  console.warn(`Invalid slug: ${slug}`);
};
var cssStringReStr = [
  '"(?:(?:\\\\[\\s\\S]|[^"\\\\])*)"',
  // double quoted string
  "'(?:(?:\\\\[\\s\\S]|[^'\\\\])*)'"
  // single quoted string
].join("|");
var minifyCssRe = new RegExp(
  [
    "(" + cssStringReStr + ")",
    // $1: quoted string
    "(?:" + [
      "^\\s+",
      // head whitespace
      "\\/\\*.*?\\*\\/\\s*",
      // multi-line comment
      "\\/\\/.*\\n\\s*",
      // single-line comment
      "\\s+$"
      // tail whitespace
    ].join("|") + ")",
    "\\s*;\\s*(}|$)\\s*",
    // $2: trailing semicolon
    "\\s*([{};:,])\\s*",
    // $3: whitespace around { } : , ;
    "(\\s)\\s+"
    // $4: 2+ spaces
  ].join("|"),
  "g"
);
var minify = (css) => {
  return css.replace(minifyCssRe, (_, $1, $2, $3, $4) => $1 || $2 || $3 || $4 || "");
};
var buildStyleString = (strings, values) => {
  const selectors = [];
  const externalClassNames = [];
  const label = strings[0].match(/^\s*\/\*(.*?)\*\//)?.[1] || "";
  let styleString = "";
  for (let i = 0, len = strings.length; i < len; i++) {
    styleString += strings[i];
    let vArray = values[i];
    if (typeof vArray === "boolean" || vArray === null || vArray === void 0) {
      continue;
    }
    if (!Array.isArray(vArray)) {
      vArray = [vArray];
    }
    for (let j = 0, len2 = vArray.length; j < len2; j++) {
      let value = vArray[j];
      if (typeof value === "boolean" || value === null || value === void 0) {
        continue;
      }
      if (typeof value === "string") {
        if (/([\\"'\/])/.test(value)) {
          styleString += value.replace(/([\\"']|(?<=<)\/)/g, "\\$1");
        } else {
          styleString += value;
        }
      } else if (typeof value === "number") {
        styleString += value;
      } else if (value[CSS_ESCAPED]) {
        styleString += value[CSS_ESCAPED];
      } else if (value[CLASS_NAME].startsWith("@keyframes ")) {
        selectors.push(value);
        styleString += ` ${value[CLASS_NAME].substring(11)} `;
      } else {
        if (strings[i + 1]?.match(/^\s*{/)) {
          selectors.push(value);
          value = `.${value[CLASS_NAME]}`;
        } else {
          selectors.push(...value[SELECTORS]);
          externalClassNames.push(...value[EXTERNAL_CLASS_NAMES]);
          value = value[STYLE_STRING];
          const valueLen = value.length;
          if (valueLen > 0) {
            const lastChar = value[valueLen - 1];
            if (lastChar !== ";" && lastChar !== "}") {
              value += ";";
            }
          }
        }
        styleString += `${value || ""}`;
      }
    }
  }
  return [label, minify(styleString), selectors, externalClassNames];
};
var cssCommon = (strings, values, classNameSlug, onInvalidSlug) => {
  let [label, thisStyleString, selectors, externalClassNames] = buildStyleString(strings, values);
  const isPseudoGlobal = isPseudoGlobalSelectorRe.exec(thisStyleString);
  if (isPseudoGlobal) {
    thisStyleString = isPseudoGlobal[1];
  }
  const hash = toHash(label + thisStyleString);
  let customSlug;
  if (classNameSlug) {
    const slug = classNameSlug(hash, normalizeLabel(label), thisStyleString);
    if (slug) {
      if (isValidClassName(slug)) {
        customSlug = slug;
      } else {
        ;
        (onInvalidSlug || defaultOnInvalidSlug)(slug);
      }
    }
  }
  const selector = (isPseudoGlobal ? PSEUDO_GLOBAL_SELECTOR : "") + (customSlug || hash);
  const className = (isPseudoGlobal ? selectors.map((s) => s[CLASS_NAME]) : [selector, ...externalClassNames]).join(" ");
  return {
    [SELECTOR]: selector,
    [CLASS_NAME]: className,
    [STYLE_STRING]: thisStyleString,
    [SELECTORS]: selectors,
    [EXTERNAL_CLASS_NAMES]: externalClassNames
  };
};
var cxCommon = (args) => {
  for (let i = 0, len = args.length; i < len; i++) {
    const arg = args[i];
    if (typeof arg === "string") {
      args[i] = {
        [SELECTOR]: "",
        [CLASS_NAME]: "",
        [STYLE_STRING]: "",
        [SELECTORS]: [],
        [EXTERNAL_CLASS_NAMES]: [arg]
      };
    }
  }
  return args;
};
var keyframesCommon = (strings, values, classNameSlug, onInvalidSlug) => {
  const [label, styleString] = buildStyleString(strings, values);
  const hash = toHash(label + styleString);
  let customSlug;
  if (classNameSlug) {
    const slug = classNameSlug(hash, normalizeLabel(label), styleString);
    if (slug) {
      if (isValidKeyframeName(slug)) {
        customSlug = slug;
      } else {
        ;
        (onInvalidSlug || defaultOnInvalidSlug)(slug);
      }
    }
  }
  return {
    [SELECTOR]: "",
    [CLASS_NAME]: `@keyframes ${customSlug || hash}`,
    [STYLE_STRING]: styleString,
    [SELECTORS]: [],
    [EXTERNAL_CLASS_NAMES]: []
  };
};
var viewTransitionNameIndex = 0;
var viewTransitionCommon = ((strings, values, classNameSlug, onInvalidSlug) => {
  if (!strings) {
    strings = [`/* h-v-t ${viewTransitionNameIndex++} */`];
  }
  const content = Array.isArray(strings) ? cssCommon(strings, values, classNameSlug, onInvalidSlug) : strings;
  const transitionName = content[CLASS_NAME];
  const res = cssCommon(
    ["view-transition-name:", ""],
    // eslint-disable-line @typescript-eslint/no-explicit-any
    [transitionName],
    classNameSlug,
    onInvalidSlug
  );
  content[CLASS_NAME] = PSEUDO_GLOBAL_SELECTOR + content[CLASS_NAME];
  content[STYLE_STRING] = content[STYLE_STRING].replace(
    /(?<=::view-transition(?:[a-z-]*)\()(?=\))/g,
    transitionName
  );
  res[CLASS_NAME] = res[SELECTOR] = transitionName;
  res[SELECTORS] = [...content[SELECTORS], content];
  return res;
});
export {
  CLASS_NAME,
  DEFAULT_STYLE_ID,
  EXTERNAL_CLASS_NAMES,
  IS_CSS_ESCAPED,
  PSEUDO_GLOBAL_SELECTOR,
  SELECTOR,
  SELECTORS,
  STYLE_STRING,
  buildStyleString,
  cssCommon,
  cxCommon,
  isPseudoGlobalSelectorRe,
  keyframesCommon,
  minify,
  rawCssString,
  viewTransitionCommon
};
