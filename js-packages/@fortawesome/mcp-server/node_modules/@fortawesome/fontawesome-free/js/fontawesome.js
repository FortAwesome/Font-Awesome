/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */
(function () {
  'use strict';

  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: !0,
        configurable: !0
      }
    }), Object.defineProperty(t, "prototype", {
      writable: !1
    }), e && _setPrototypeOf(t, e);
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _wrapRegExp() {
    _wrapRegExp = function (e, r) {
      return new BabelRegExp(e, void 0, r);
    };
    var e = RegExp.prototype,
      r = new WeakMap();
    function BabelRegExp(e, t, p) {
      var o = RegExp(e, t);
      return r.set(o, p || r.get(e)), _setPrototypeOf(o, BabelRegExp.prototype);
    }
    function buildGroups(e, t) {
      var p = r.get(t);
      return Object.keys(p).reduce(function (r, t) {
        var o = p[t];
        if ("number" == typeof o) r[t] = e[o];else {
          for (var i = 0; void 0 === e[o[i]] && i + 1 < o.length;) i++;
          r[t] = e[o[i]];
        }
        return r;
      }, Object.create(null));
    }
    return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (r) {
      var t = e.exec.call(this, r);
      if (t) {
        t.groups = buildGroups(t, this);
        var p = t.indices;
        p && (p.groups = buildGroups(p, this));
      }
      return t;
    }, BabelRegExp.prototype[Symbol.replace] = function (t, p) {
      if ("string" == typeof p) {
        var o = r.get(this);
        return e[Symbol.replace].call(this, t, p.replace(/\$<([^>]+)>/g, function (e, r) {
          var t = o[r];
          return "$" + (Array.isArray(t) ? t.join("$") : t);
        }));
      }
      if ("function" == typeof p) {
        var i = this;
        return e[Symbol.replace].call(this, t, function () {
          var e = arguments;
          return "object" != typeof e[e.length - 1] && (e = [].slice.call(e)).push(buildGroups(e, i)), p.apply(this, e);
        });
      }
      return e[Symbol.replace].call(this, t, p);
    }, _wrapRegExp.apply(this, arguments);
  }

  const noop = () => {};
  let _WINDOW = {};
  let _DOCUMENT = {};
  let _MUTATION_OBSERVER = null;
  let _PERFORMANCE = {
    mark: noop,
    measure: noop
  };
  try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
    if (typeof MutationObserver !== 'undefined') _MUTATION_OBSERVER = MutationObserver;
    if (typeof performance !== 'undefined') _PERFORMANCE = performance;
  } catch (e) {}
  const {
    userAgent = ''
  } = _WINDOW.navigator || {};
  const WINDOW = _WINDOW;
  const DOCUMENT = _DOCUMENT;
  const MUTATION_OBSERVER = _MUTATION_OBSERVER;
  const PERFORMANCE = _PERFORMANCE;
  const IS_BROWSER = !!WINDOW.document;
  const IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
  const IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

  var p = /fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,
    g = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i;
  var S = {
      classic: {
        fa: "solid",
        fas: "solid",
        "fa-solid": "solid",
        far: "regular",
        "fa-regular": "regular",
        fal: "light",
        "fa-light": "light",
        fat: "thin",
        "fa-thin": "thin",
        fab: "brands",
        "fa-brands": "brands"
      },
      duotone: {
        fa: "solid",
        fad: "solid",
        "fa-solid": "solid",
        "fa-duotone": "solid",
        fadr: "regular",
        "fa-regular": "regular",
        fadl: "light",
        "fa-light": "light",
        fadt: "thin",
        "fa-thin": "thin"
      },
      sharp: {
        fa: "solid",
        fass: "solid",
        "fa-solid": "solid",
        fasr: "regular",
        "fa-regular": "regular",
        fasl: "light",
        "fa-light": "light",
        fast: "thin",
        "fa-thin": "thin"
      },
      "sharp-duotone": {
        fa: "solid",
        fasds: "solid",
        "fa-solid": "solid",
        fasdr: "regular",
        "fa-regular": "regular",
        fasdl: "light",
        "fa-light": "light",
        fasdt: "thin",
        "fa-thin": "thin"
      }
    },
    A = {
      GROUP: "duotone-group",
      SWAP_OPACITY: "swap-opacity",
      PRIMARY: "primary",
      SECONDARY: "secondary"
    },
    P = ["fa-classic", "fa-duotone", "fa-sharp", "fa-sharp-duotone"];
  var s = "classic",
    t = "duotone",
    r = "sharp",
    o = "sharp-duotone",
    L = [s, t, r, o];
  var G = {
      classic: {
        900: "fas",
        400: "far",
        normal: "far",
        300: "fal",
        100: "fat"
      },
      duotone: {
        900: "fad",
        400: "fadr",
        300: "fadl",
        100: "fadt"
      },
      sharp: {
        900: "fass",
        400: "fasr",
        300: "fasl",
        100: "fast"
      },
      "sharp-duotone": {
        900: "fasds",
        400: "fasdr",
        300: "fasdl",
        100: "fasdt"
      }
    };
  var lt = {
      "Font Awesome 6 Free": {
        900: "fas",
        400: "far"
      },
      "Font Awesome 6 Pro": {
        900: "fas",
        400: "far",
        normal: "far",
        300: "fal",
        100: "fat"
      },
      "Font Awesome 6 Brands": {
        400: "fab",
        normal: "fab"
      },
      "Font Awesome 6 Duotone": {
        900: "fad",
        400: "fadr",
        normal: "fadr",
        300: "fadl",
        100: "fadt"
      },
      "Font Awesome 6 Sharp": {
        900: "fass",
        400: "fasr",
        normal: "fasr",
        300: "fasl",
        100: "fast"
      },
      "Font Awesome 6 Sharp Duotone": {
        900: "fasds",
        400: "fasdr",
        normal: "fasdr",
        300: "fasdl",
        100: "fasdt"
      }
    };
  var pt = new Map([["classic", {
      defaultShortPrefixId: "fas",
      defaultStyleId: "solid",
      styleIds: ["solid", "regular", "light", "thin", "brands"],
      futureStyleIds: [],
      defaultFontWeight: 900
    }], ["sharp", {
      defaultShortPrefixId: "fass",
      defaultStyleId: "solid",
      styleIds: ["solid", "regular", "light", "thin"],
      futureStyleIds: [],
      defaultFontWeight: 900
    }], ["duotone", {
      defaultShortPrefixId: "fad",
      defaultStyleId: "solid",
      styleIds: ["solid", "regular", "light", "thin"],
      futureStyleIds: [],
      defaultFontWeight: 900
    }], ["sharp-duotone", {
      defaultShortPrefixId: "fasds",
      defaultStyleId: "solid",
      styleIds: ["solid", "regular", "light", "thin"],
      futureStyleIds: [],
      defaultFontWeight: 900
    }]]),
    xt = {
      classic: {
        solid: "fas",
        regular: "far",
        light: "fal",
        thin: "fat",
        brands: "fab"
      },
      duotone: {
        solid: "fad",
        regular: "fadr",
        light: "fadl",
        thin: "fadt"
      },
      sharp: {
        solid: "fass",
        regular: "fasr",
        light: "fasl",
        thin: "fast"
      },
      "sharp-duotone": {
        solid: "fasds",
        regular: "fasdr",
        light: "fasdl",
        thin: "fasdt"
      }
    };
  var Ft = ["fak", "fa-kit", "fakd", "fa-kit-duotone"],
    St = {
      kit: {
        fak: "kit",
        "fa-kit": "kit"
      },
      "kit-duotone": {
        fakd: "kit-duotone",
        "fa-kit-duotone": "kit-duotone"
      }
    },
    At = ["kit"];
  var Ct = {
    kit: {
      "fa-kit": "fak"
    },
    "kit-duotone": {
      "fa-kit-duotone": "fakd"
    }
  };
  var Lt = ["fak", "fakd"],
    Wt = {
      kit: {
        fak: "fa-kit"
      },
      "kit-duotone": {
        fakd: "fa-kit-duotone"
      }
    };
  var Et = {
      kit: {
        kit: "fak"
      },
      "kit-duotone": {
        "kit-duotone": "fakd"
      }
    };

  var t$1 = {
      GROUP: "duotone-group",
      SWAP_OPACITY: "swap-opacity",
      PRIMARY: "primary",
      SECONDARY: "secondary"
    },
    r$1 = ["fa-classic", "fa-duotone", "fa-sharp", "fa-sharp-duotone"];
  var bt$1 = ["fak", "fa-kit", "fakd", "fa-kit-duotone"];
  var Yt = {
      "Font Awesome Kit": {
        400: "fak",
        normal: "fak"
      },
      "Font Awesome Kit Duotone": {
        400: "fakd",
        normal: "fakd"
      }
    };
  var ua = {
      classic: {
        "fa-brands": "fab",
        "fa-duotone": "fad",
        "fa-light": "fal",
        "fa-regular": "far",
        "fa-solid": "fas",
        "fa-thin": "fat"
      },
      duotone: {
        "fa-regular": "fadr",
        "fa-light": "fadl",
        "fa-thin": "fadt"
      },
      sharp: {
        "fa-solid": "fass",
        "fa-regular": "fasr",
        "fa-light": "fasl",
        "fa-thin": "fast"
      },
      "sharp-duotone": {
        "fa-solid": "fasds",
        "fa-regular": "fasdr",
        "fa-light": "fasdl",
        "fa-thin": "fasdt"
      }
    },
    I$1 = {
      classic: ["fas", "far", "fal", "fat", "fad"],
      duotone: ["fadr", "fadl", "fadt"],
      sharp: ["fass", "fasr", "fasl", "fast"],
      "sharp-duotone": ["fasds", "fasdr", "fasdl", "fasdt"]
    },
    ga = {
      classic: {
        fab: "fa-brands",
        fad: "fa-duotone",
        fal: "fa-light",
        far: "fa-regular",
        fas: "fa-solid",
        fat: "fa-thin"
      },
      duotone: {
        fadr: "fa-regular",
        fadl: "fa-light",
        fadt: "fa-thin"
      },
      sharp: {
        fass: "fa-solid",
        fasr: "fa-regular",
        fasl: "fa-light",
        fast: "fa-thin"
      },
      "sharp-duotone": {
        fasds: "fa-solid",
        fasdr: "fa-regular",
        fasdl: "fa-light",
        fasdt: "fa-thin"
      }
    },
    x = ["fa-solid", "fa-regular", "fa-light", "fa-thin", "fa-duotone", "fa-brands"],
    Ia = ["fa", "fas", "far", "fal", "fat", "fad", "fadr", "fadl", "fadt", "fab", "fass", "fasr", "fasl", "fast", "fasds", "fasdr", "fasdl", "fasdt", ...r$1, ...x],
    m$1 = ["solid", "regular", "light", "thin", "duotone", "brands"],
    c$1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    F$1 = c$1.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
    ma = [...Object.keys(I$1), ...m$1, "2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", t$1.GROUP, t$1.SWAP_OPACITY, t$1.PRIMARY, t$1.SECONDARY].concat(c$1.map(a => "".concat(a, "x"))).concat(F$1.map(a => "w-".concat(a)));
  var wa = {
      "Font Awesome 5 Free": {
        900: "fas",
        400: "far"
      },
      "Font Awesome 5 Pro": {
        900: "fas",
        400: "far",
        normal: "far",
        300: "fal"
      },
      "Font Awesome 5 Brands": {
        400: "fab",
        normal: "fab"
      },
      "Font Awesome 5 Duotone": {
        900: "fad"
      }
    };

  const NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
  const UNITS_IN_GRID = 16;
  const DEFAULT_CSS_PREFIX = 'fa';
  const DEFAULT_REPLACEMENT_CLASS = 'svg-inline--fa';
  const DATA_FA_I2SVG = 'data-fa-i2svg';
  const DATA_FA_PSEUDO_ELEMENT = 'data-fa-pseudo-element';
  const DATA_FA_PSEUDO_ELEMENT_PENDING = 'data-fa-pseudo-element-pending';
  const DATA_PREFIX = 'data-prefix';
  const DATA_ICON = 'data-icon';
  const HTML_CLASS_I2SVG_BASE_CLASS = 'fontawesome-i2svg';
  const MUTATION_APPROACH_ASYNC = 'async';
  const TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS = ['HTML', 'HEAD', 'STYLE', 'SCRIPT'];
  const PRODUCTION = (() => {
    try {
      return "production" === 'production';
    } catch (e$$1) {
      return false;
    }
  })();
  function familyProxy(obj) {
    // Defaults to the classic family if family is not available
    return new Proxy(obj, {
      get(target, prop) {
        return prop in target ? target[prop] : target[s];
      }
    });
  }
  const _PREFIX_TO_STYLE = _objectSpread2({}, S);

  // We changed FACSSClassesToStyleId in the icons repo to be canonical and as such, "classic" family does not have any
  // duotone styles.  But we do still need duotone in _PREFIX_TO_STYLE below, so we are manually adding
  // {'fa-duotone': 'duotone'}
  _PREFIX_TO_STYLE[s] = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, {
    'fa-duotone': 'duotone'
  }), S[s]), St['kit']), St['kit-duotone']);
  const PREFIX_TO_STYLE = familyProxy(_PREFIX_TO_STYLE);
  const _STYLE_TO_PREFIX = _objectSpread2({}, xt);

  // We changed FAStyleIdToShortPrefixId in the icons repo to be canonical and as such, "classic" family does not have any
  // duotone styles.  But we do still need duotone in _STYLE_TO_PREFIX below, so we are manually adding {duotone: 'fad'}
  _STYLE_TO_PREFIX[s] = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, {
    duotone: 'fad'
  }), _STYLE_TO_PREFIX[s]), Et['kit']), Et['kit-duotone']);
  const STYLE_TO_PREFIX = familyProxy(_STYLE_TO_PREFIX);
  const _PREFIX_TO_LONG_STYLE = _objectSpread2({}, ga);
  _PREFIX_TO_LONG_STYLE[s] = _objectSpread2(_objectSpread2({}, _PREFIX_TO_LONG_STYLE[s]), Wt['kit']);
  const PREFIX_TO_LONG_STYLE = familyProxy(_PREFIX_TO_LONG_STYLE);
  const _LONG_STYLE_TO_PREFIX = _objectSpread2({}, ua);
  _LONG_STYLE_TO_PREFIX[s] = _objectSpread2(_objectSpread2({}, _LONG_STYLE_TO_PREFIX[s]), Ct['kit']);
  const LONG_STYLE_TO_PREFIX = familyProxy(_LONG_STYLE_TO_PREFIX);
  const ICON_SELECTION_SYNTAX_PATTERN = p; // eslint-disable-line no-useless-escape

  const LAYERS_TEXT_CLASSNAME = 'fa-layers-text';
  const FONT_FAMILY_PATTERN = g;
  const _FONT_WEIGHT_TO_PREFIX = _objectSpread2({}, G);
  const FONT_WEIGHT_TO_PREFIX = familyProxy(_FONT_WEIGHT_TO_PREFIX);
  const ATTRIBUTES_WATCHED_FOR_MUTATION = ['class', 'data-prefix', 'data-icon', 'data-fa-transform', 'data-fa-mask'];
  const DUOTONE_CLASSES = A;
  const RESERVED_CLASSES = [...At, ...ma];

  const initial = WINDOW.FontAwesomeConfig || {};
  function getAttrConfig(attr) {
    var element = DOCUMENT.querySelector('script[' + attr + ']');
    if (element) {
      return element.getAttribute(attr);
    }
  }
  function coerce(val) {
    // Getting an empty string will occur if the attribute is set on the HTML tag but without a value
    // We'll assume that this is an indication that it should be toggled to true
    if (val === '') return true;
    if (val === 'false') return false;
    if (val === 'true') return true;
    return val;
  }
  if (DOCUMENT && typeof DOCUMENT.querySelector === 'function') {
    const attrs = [['data-family-prefix', 'familyPrefix'], ['data-css-prefix', 'cssPrefix'], ['data-family-default', 'familyDefault'], ['data-style-default', 'styleDefault'], ['data-replacement-class', 'replacementClass'], ['data-auto-replace-svg', 'autoReplaceSvg'], ['data-auto-add-css', 'autoAddCss'], ['data-auto-a11y', 'autoA11y'], ['data-search-pseudo-elements', 'searchPseudoElements'], ['data-observe-mutations', 'observeMutations'], ['data-mutate-approach', 'mutateApproach'], ['data-keep-original-source', 'keepOriginalSource'], ['data-measure-performance', 'measurePerformance'], ['data-show-missing-icons', 'showMissingIcons']];
    attrs.forEach(_ref => {
      let [attr, key] = _ref;
      const val = coerce(getAttrConfig(attr));
      if (val !== undefined && val !== null) {
        initial[key] = val;
      }
    });
  }
  const _default = {
    styleDefault: 'solid',
    familyDefault: s,
    cssPrefix: DEFAULT_CSS_PREFIX,
    replacementClass: DEFAULT_REPLACEMENT_CLASS,
    autoReplaceSvg: true,
    autoAddCss: true,
    autoA11y: true,
    searchPseudoElements: false,
    observeMutations: true,
    mutateApproach: 'async',
    keepOriginalSource: true,
    measurePerformance: false,
    showMissingIcons: true
  };

  // familyPrefix is deprecated but we must still support it if present
  if (initial.familyPrefix) {
    initial.cssPrefix = initial.familyPrefix;
  }
  const _config = _objectSpread2(_objectSpread2({}, _default), initial);
  if (!_config.autoReplaceSvg) _config.observeMutations = false;
  const config = {};
  Object.keys(_default).forEach(key => {
    Object.defineProperty(config, key, {
      enumerable: true,
      set: function (val) {
        _config[key] = val;
        _onChangeCb.forEach(cb => cb(config));
      },
      get: function () {
        return _config[key];
      }
    });
  });

  // familyPrefix is deprecated as of 6.2.0 and should be removed in 7.0.0
  Object.defineProperty(config, 'familyPrefix', {
    enumerable: true,
    set: function (val) {
      _config.cssPrefix = val;
      _onChangeCb.forEach(cb => cb(config));
    },
    get: function () {
      return _config.cssPrefix;
    }
  });
  WINDOW.FontAwesomeConfig = config;
  const _onChangeCb = [];
  function onChange(cb) {
    _onChangeCb.push(cb);
    return () => {
      _onChangeCb.splice(_onChangeCb.indexOf(cb), 1);
    };
  }

  const d$2 = UNITS_IN_GRID;
  const meaninglessTransform = {
    size: 16,
    x: 0,
    y: 0,
    rotate: 0,
    flipX: false,
    flipY: false
  };
  function bunker(fn) {
    try {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      fn(...args);
    } catch (e) {
      if (!PRODUCTION) {
        throw e;
      }
    }
  }
  function insertCss(css) {
    if (!css || !IS_DOM) {
      return;
    }
    const style = DOCUMENT.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    const headChildren = DOCUMENT.head.childNodes;
    let beforeChild = null;
    for (let i = headChildren.length - 1; i > -1; i--) {
      const child = headChildren[i];
      const tagName = (child.tagName || '').toUpperCase();
      if (['STYLE', 'LINK'].indexOf(tagName) > -1) {
        beforeChild = child;
      }
    }
    DOCUMENT.head.insertBefore(style, beforeChild);
    return css;
  }
  const idPool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  function nextUniqueId() {
    let size = 12;
    let id = '';
    while (size-- > 0) {
      id += idPool[Math.random() * 62 | 0];
    }
    return id;
  }
  function toArray(obj) {
    const array = [];
    for (let i = (obj || []).length >>> 0; i--;) {
      array[i] = obj[i];
    }
    return array;
  }
  function classArray(node) {
    if (node.classList) {
      return toArray(node.classList);
    } else {
      return (node.getAttribute('class') || '').split(' ').filter(i => i);
    }
  }
  function htmlEscape(str) {
    return "".concat(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function joinAttributes(attributes) {
    return Object.keys(attributes || {}).reduce((acc, attributeName) => {
      return acc + "".concat(attributeName, "=\"").concat(htmlEscape(attributes[attributeName]), "\" ");
    }, '').trim();
  }
  function joinStyles(styles) {
    return Object.keys(styles || {}).reduce((acc, styleName) => {
      return acc + "".concat(styleName, ": ").concat(styles[styleName].trim(), ";");
    }, '');
  }
  function transformIsMeaningful(transform) {
    return transform.size !== meaninglessTransform.size || transform.x !== meaninglessTransform.x || transform.y !== meaninglessTransform.y || transform.rotate !== meaninglessTransform.rotate || transform.flipX || transform.flipY;
  }
  function transformForSvg(_ref) {
    let {
      transform,
      containerWidth,
      iconWidth
    } = _ref;
    const outer = {
      transform: "translate(".concat(containerWidth / 2, " 256)")
    };
    const innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
    const innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
    const innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
    const inner = {
      transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
    };
    const path = {
      transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
    };
    return {
      outer,
      inner,
      path
    };
  }
  function transformForCss(_ref2) {
    let {
      transform,
      width = UNITS_IN_GRID,
      height = UNITS_IN_GRID,
      startCentered = false
    } = _ref2;
    let val = '';
    if (startCentered && IS_IE) {
      val += "translate(".concat(transform.x / d$2 - width / 2, "em, ").concat(transform.y / d$2 - height / 2, "em) ");
    } else if (startCentered) {
      val += "translate(calc(-50% + ".concat(transform.x / d$2, "em), calc(-50% + ").concat(transform.y / d$2, "em)) ");
    } else {
      val += "translate(".concat(transform.x / d$2, "em, ").concat(transform.y / d$2, "em) ");
    }
    val += "scale(".concat(transform.size / d$2 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / d$2 * (transform.flipY ? -1 : 1), ") ");
    val += "rotate(".concat(transform.rotate, "deg) ");
    return val;
  }

  var baseStyles = ":host,:root{--fa-font-solid:normal 900 1em/1 \"Font Awesome 6 Free\";--fa-font-regular:normal 400 1em/1 \"Font Awesome 6 Free\";--fa-font-light:normal 300 1em/1 \"Font Awesome 6 Pro\";--fa-font-thin:normal 100 1em/1 \"Font Awesome 6 Pro\";--fa-font-duotone:normal 900 1em/1 \"Font Awesome 6 Duotone\";--fa-font-duotone-regular:normal 400 1em/1 \"Font Awesome 6 Duotone\";--fa-font-duotone-light:normal 300 1em/1 \"Font Awesome 6 Duotone\";--fa-font-duotone-thin:normal 100 1em/1 \"Font Awesome 6 Duotone\";--fa-font-brands:normal 400 1em/1 \"Font Awesome 6 Brands\";--fa-font-sharp-solid:normal 900 1em/1 \"Font Awesome 6 Sharp\";--fa-font-sharp-regular:normal 400 1em/1 \"Font Awesome 6 Sharp\";--fa-font-sharp-light:normal 300 1em/1 \"Font Awesome 6 Sharp\";--fa-font-sharp-thin:normal 100 1em/1 \"Font Awesome 6 Sharp\";--fa-font-sharp-duotone-solid:normal 900 1em/1 \"Font Awesome 6 Sharp Duotone\";--fa-font-sharp-duotone-regular:normal 400 1em/1 \"Font Awesome 6 Sharp Duotone\";--fa-font-sharp-duotone-light:normal 300 1em/1 \"Font Awesome 6 Sharp Duotone\";--fa-font-sharp-duotone-thin:normal 100 1em/1 \"Font Awesome 6 Sharp Duotone\"}svg:not(:host).svg-inline--fa,svg:not(:root).svg-inline--fa{overflow:visible;box-sizing:content-box}.svg-inline--fa{display:var(--fa-display,inline-block);height:1em;overflow:visible;vertical-align:-.125em}.svg-inline--fa.fa-2xs{vertical-align:.1em}.svg-inline--fa.fa-xs{vertical-align:0}.svg-inline--fa.fa-sm{vertical-align:-.0714285705em}.svg-inline--fa.fa-lg{vertical-align:-.2em}.svg-inline--fa.fa-xl{vertical-align:-.25em}.svg-inline--fa.fa-2xl{vertical-align:-.3125em}.svg-inline--fa.fa-pull-left{margin-right:var(--fa-pull-margin,.3em);width:auto}.svg-inline--fa.fa-pull-right{margin-left:var(--fa-pull-margin,.3em);width:auto}.svg-inline--fa.fa-li{width:var(--fa-li-width,2em);top:.25em}.svg-inline--fa.fa-fw{width:var(--fa-fw-width,1.25em)}.fa-layers svg.svg-inline--fa{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0}.fa-layers-counter,.fa-layers-text{display:inline-block;position:absolute;text-align:center}.fa-layers{display:inline-block;height:1em;position:relative;text-align:center;vertical-align:-.125em;width:1em}.fa-layers svg.svg-inline--fa{transform-origin:center center}.fa-layers-text{left:50%;top:50%;transform:translate(-50%,-50%);transform-origin:center center}.fa-layers-counter{background-color:var(--fa-counter-background-color,#ff253a);border-radius:var(--fa-counter-border-radius,1em);box-sizing:border-box;color:var(--fa-inverse,#fff);line-height:var(--fa-counter-line-height,1);max-width:var(--fa-counter-max-width,5em);min-width:var(--fa-counter-min-width,1.5em);overflow:hidden;padding:var(--fa-counter-padding,.25em .5em);right:var(--fa-right,0);text-overflow:ellipsis;top:var(--fa-top,0);transform:scale(var(--fa-counter-scale,.25));transform-origin:top right}.fa-layers-bottom-right{bottom:var(--fa-bottom,0);right:var(--fa-right,0);top:auto;transform:scale(var(--fa-layers-scale,.25));transform-origin:bottom right}.fa-layers-bottom-left{bottom:var(--fa-bottom,0);left:var(--fa-left,0);right:auto;top:auto;transform:scale(var(--fa-layers-scale,.25));transform-origin:bottom left}.fa-layers-top-right{top:var(--fa-top,0);right:var(--fa-right,0);transform:scale(var(--fa-layers-scale,.25));transform-origin:top right}.fa-layers-top-left{left:var(--fa-left,0);right:auto;top:var(--fa-top,0);transform:scale(var(--fa-layers-scale,.25));transform-origin:top left}.fa-1x{font-size:1em}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-6x{font-size:6em}.fa-7x{font-size:7em}.fa-8x{font-size:8em}.fa-9x{font-size:9em}.fa-10x{font-size:10em}.fa-2xs{font-size:.625em;line-height:.1em;vertical-align:.225em}.fa-xs{font-size:.75em;line-height:.0833333337em;vertical-align:.125em}.fa-sm{font-size:.875em;line-height:.0714285718em;vertical-align:.0535714295em}.fa-lg{font-size:1.25em;line-height:.05em;vertical-align:-.075em}.fa-xl{font-size:1.5em;line-height:.0416666682em;vertical-align:-.125em}.fa-2xl{font-size:2em;line-height:.03125em;vertical-align:-.1875em}.fa-fw{text-align:center;width:1.25em}.fa-ul{list-style-type:none;margin-left:var(--fa-li-margin,2.5em);padding-left:0}.fa-ul>li{position:relative}.fa-li{left:calc(-1 * var(--fa-li-width,2em));position:absolute;text-align:center;width:var(--fa-li-width,2em);line-height:inherit}.fa-border{border-color:var(--fa-border-color,#eee);border-radius:var(--fa-border-radius,.1em);border-style:var(--fa-border-style,solid);border-width:var(--fa-border-width,.08em);padding:var(--fa-border-padding,.2em .25em .15em)}.fa-pull-left{float:left;margin-right:var(--fa-pull-margin,.3em)}.fa-pull-right{float:right;margin-left:var(--fa-pull-margin,.3em)}.fa-beat{animation-name:fa-beat;animation-delay:var(--fa-animation-delay,0s);animation-direction:var(--fa-animation-direction,normal);animation-duration:var(--fa-animation-duration,1s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,ease-in-out)}.fa-bounce{animation-name:fa-bounce;animation-delay:var(--fa-animation-delay,0s);animation-direction:var(--fa-animation-direction,normal);animation-duration:var(--fa-animation-duration,1s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,cubic-bezier(.28,.84,.42,1))}.fa-fade{animation-name:fa-fade;animation-delay:var(--fa-animation-delay,0s);animation-direction:var(--fa-animation-direction,normal);animation-duration:var(--fa-animation-duration,1s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,cubic-bezier(.4,0,.6,1))}.fa-beat-fade{animation-name:fa-beat-fade;animation-delay:var(--fa-animation-delay,0s);animation-direction:var(--fa-animation-direction,normal);animation-duration:var(--fa-animation-duration,1s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,cubic-bezier(.4,0,.6,1))}.fa-flip{animation-name:fa-flip;animation-delay:var(--fa-animation-delay,0s);animation-direction:var(--fa-animation-direction,normal);animation-duration:var(--fa-animation-duration,1s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,ease-in-out)}.fa-shake{animation-name:fa-shake;animation-delay:var(--fa-animation-delay,0s);animation-direction:var(--fa-animation-direction,normal);animation-duration:var(--fa-animation-duration,1s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,linear)}.fa-spin{animation-name:fa-spin;animation-delay:var(--fa-animation-delay,0s);animation-direction:var(--fa-animation-direction,normal);animation-duration:var(--fa-animation-duration,2s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,linear)}.fa-spin-reverse{--fa-animation-direction:reverse}.fa-pulse,.fa-spin-pulse{animation-name:fa-spin;animation-direction:var(--fa-animation-direction,normal);animation-duration:var(--fa-animation-duration,1s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,steps(8))}@media (prefers-reduced-motion:reduce){.fa-beat,.fa-beat-fade,.fa-bounce,.fa-fade,.fa-flip,.fa-pulse,.fa-shake,.fa-spin,.fa-spin-pulse{animation-delay:-1ms;animation-duration:1ms;animation-iteration-count:1;transition-delay:0s;transition-duration:0s}}@keyframes fa-beat{0%,90%{transform:scale(1)}45%{transform:scale(var(--fa-beat-scale,1.25))}}@keyframes fa-bounce{0%{transform:scale(1,1) translateY(0)}10%{transform:scale(var(--fa-bounce-start-scale-x,1.1),var(--fa-bounce-start-scale-y,.9)) translateY(0)}30%{transform:scale(var(--fa-bounce-jump-scale-x,.9),var(--fa-bounce-jump-scale-y,1.1)) translateY(var(--fa-bounce-height,-.5em))}50%{transform:scale(var(--fa-bounce-land-scale-x,1.05),var(--fa-bounce-land-scale-y,.95)) translateY(0)}57%{transform:scale(1,1) translateY(var(--fa-bounce-rebound,-.125em))}64%{transform:scale(1,1) translateY(0)}100%{transform:scale(1,1) translateY(0)}}@keyframes fa-fade{50%{opacity:var(--fa-fade-opacity,.4)}}@keyframes fa-beat-fade{0%,100%{opacity:var(--fa-beat-fade-opacity,.4);transform:scale(1)}50%{opacity:1;transform:scale(var(--fa-beat-fade-scale,1.125))}}@keyframes fa-flip{50%{transform:rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),var(--fa-flip-angle,-180deg))}}@keyframes fa-shake{0%{transform:rotate(-15deg)}4%{transform:rotate(15deg)}24%,8%{transform:rotate(-18deg)}12%,28%{transform:rotate(18deg)}16%{transform:rotate(-22deg)}20%{transform:rotate(22deg)}32%{transform:rotate(-12deg)}36%{transform:rotate(12deg)}100%,40%{transform:rotate(0)}}@keyframes fa-spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.fa-rotate-90{transform:rotate(90deg)}.fa-rotate-180{transform:rotate(180deg)}.fa-rotate-270{transform:rotate(270deg)}.fa-flip-horizontal{transform:scale(-1,1)}.fa-flip-vertical{transform:scale(1,-1)}.fa-flip-both,.fa-flip-horizontal.fa-flip-vertical{transform:scale(-1,-1)}.fa-rotate-by{transform:rotate(var(--fa-rotate-angle,0))}.fa-stack{display:inline-block;vertical-align:middle;height:2em;position:relative;width:2.5em}.fa-stack-1x,.fa-stack-2x{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;z-index:var(--fa-stack-z-index,auto)}.svg-inline--fa.fa-stack-1x{height:1em;width:1.25em}.svg-inline--fa.fa-stack-2x{height:2em;width:2.5em}.fa-inverse{color:var(--fa-inverse,#fff)}.fa-sr-only,.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.fa-sr-only-focusable:not(:focus),.sr-only-focusable:not(:focus){position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.svg-inline--fa .fa-primary{fill:var(--fa-primary-color,currentColor);opacity:var(--fa-primary-opacity,1)}.svg-inline--fa .fa-secondary{fill:var(--fa-secondary-color,currentColor);opacity:var(--fa-secondary-opacity,.4)}.svg-inline--fa.fa-swap-opacity .fa-primary{opacity:var(--fa-secondary-opacity,.4)}.svg-inline--fa.fa-swap-opacity .fa-secondary{opacity:var(--fa-primary-opacity,1)}.svg-inline--fa mask .fa-primary,.svg-inline--fa mask .fa-secondary{fill:#000}";

  function css() {
    const dcp = DEFAULT_CSS_PREFIX;
    const drc = DEFAULT_REPLACEMENT_CLASS;
    const fp = config.cssPrefix;
    const rc = config.replacementClass;
    let s = baseStyles;
    if (fp !== dcp || rc !== drc) {
      const dPatt = new RegExp("\\.".concat(dcp, "\\-"), 'g');
      const customPropPatt = new RegExp("\\--".concat(dcp, "\\-"), 'g');
      const rPatt = new RegExp("\\.".concat(drc), 'g');
      s = s.replace(dPatt, ".".concat(fp, "-")).replace(customPropPatt, "--".concat(fp, "-")).replace(rPatt, ".".concat(rc));
    }
    return s;
  }
  let _cssInserted = false;
  function ensureCss() {
    if (config.autoAddCss && !_cssInserted) {
      insertCss(css());
      _cssInserted = true;
    }
  }
  var InjectCSS = {
    mixout() {
      return {
        dom: {
          css,
          insertCss: ensureCss
        }
      };
    },
    hooks() {
      return {
        beforeDOMElementCreation() {
          ensureCss();
        },
        beforeI2svg() {
          ensureCss();
        }
      };
    }
  };

  const w = WINDOW || {};
  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
  var namespace = w[NAMESPACE_IDENTIFIER];

  const functions = [];
  const listener = function () {
    DOCUMENT.removeEventListener('DOMContentLoaded', listener);
    loaded = 1;
    functions.map(fn => fn());
  };
  let loaded = false;
  if (IS_DOM) {
    loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
    if (!loaded) DOCUMENT.addEventListener('DOMContentLoaded', listener);
  }
  function domready (fn) {
    if (!IS_DOM) return;
    loaded ? setTimeout(fn, 0) : functions.push(fn);
  }

  function toHtml(abstractNodes) {
    const {
      tag,
      attributes = {},
      children = []
    } = abstractNodes;
    if (typeof abstractNodes === 'string') {
      return htmlEscape(abstractNodes);
    } else {
      return "<".concat(tag, " ").concat(joinAttributes(attributes), ">").concat(children.map(toHtml).join(''), "</").concat(tag, ">");
    }
  }

  function iconFromMapping(mapping, prefix, iconName) {
    if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
      return {
        prefix,
        iconName,
        icon: mapping[prefix][iconName]
      };
    }
  }

  /**
   * Internal helper to bind a function known to have 4 arguments
   * to a given context.
   */
  var bindInternal4 = function bindInternal4(func, thisContext) {
    return function (a, b, c, d) {
      return func.call(thisContext, a, b, c, d);
    };
  };

  /**
   * # Reduce
   *
   * A fast object `.reduce()` implementation.
   *
   * @param  {Object}   subject      The object to reduce over.
   * @param  {Function} fn           The reducer function.
   * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
   * @param  {Object}   thisContext  The context for the reducer.
   * @return {mixed}                 The final result.
   */
  var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
    var keys = Object.keys(subject),
      length = keys.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i,
      key,
      result;
    if (initialValue === undefined) {
      i = 1;
      result = subject[keys[0]];
    } else {
      i = 0;
      result = initialValue;
    }
    for (; i < length; i++) {
      key = keys[i];
      result = iterator(result, subject[key], key, subject);
    }
    return result;
  };

  /**
   * ucs2decode() and codePointAt() are both works of Mathias Bynens and licensed under MIT
   *
   * Copyright Mathias Bynens <https://mathiasbynens.be/>

   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:

   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.

   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
   * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
   * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
   * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
   * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
   * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */

  function ucs2decode(string) {
    const output = [];
    let counter = 0;
    const length = string.length;
    while (counter < length) {
      const value = string.charCodeAt(counter++);
      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        const extra = string.charCodeAt(counter++);
        if ((extra & 0xFC00) == 0xDC00) {
          // eslint-disable-line eqeqeq
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  }
  function toHex(unicode) {
    const decoded = ucs2decode(unicode);
    return decoded.length === 1 ? decoded[0].toString(16) : null;
  }
  function codePointAt(string, index) {
    const size = string.length;
    let first = string.charCodeAt(index);
    let second;
    if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
      second = string.charCodeAt(index + 1);
      if (second >= 0xDC00 && second <= 0xDFFF) {
        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
      }
    }
    return first;
  }

  function normalizeIcons(icons) {
    return Object.keys(icons).reduce((acc, iconName) => {
      const icon = icons[iconName];
      const expanded = !!icon.icon;
      if (expanded) {
        acc[icon.iconName] = icon.icon;
      } else {
        acc[iconName] = icon;
      }
      return acc;
    }, {});
  }
  function defineIcons(prefix, icons) {
    let params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const {
      skipHooks = false
    } = params;
    const normalized = normalizeIcons(icons);
    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
      namespace.hooks.addPack(prefix, normalizeIcons(icons));
    } else {
      namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), normalized);
    }

    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll ease the upgrade process for our users by automatically defining
     * this as well.
     */
    if (prefix === 'fas') {
      defineIcons('fa', icons);
    }
  }

  const duotonePathRe = [/*#__PURE__*/_wrapRegExp(/path d="([^"]+)".*path d="([^"]+)"/, {
    d1: 1,
    d2: 2
  }), /*#__PURE__*/_wrapRegExp(/path class="([^"]+)".*d="([^"]+)".*path class="([^"]+)".*d="([^"]+)"/, {
    cls1: 1,
    d1: 2,
    cls2: 3,
    d2: 4
  }), /*#__PURE__*/_wrapRegExp(/path class="([^"]+)".*d="([^"]+)"/, {
    cls1: 1,
    d1: 2
  })];

  const {
    styles,
    shims
  } = namespace;
  const FAMILY_NAMES = Object.keys(PREFIX_TO_LONG_STYLE);
  const PREFIXES_FOR_FAMILY = FAMILY_NAMES.reduce((acc, familyId) => {
    acc[familyId] = Object.keys(PREFIX_TO_LONG_STYLE[familyId]);
    return acc;
  }, {});
  let _defaultUsablePrefix = null;
  let _byUnicode = {};
  let _byLigature = {};
  let _byOldName = {};
  let _byOldUnicode = {};
  let _byAlias = {};
  function isReserved(name) {
    return ~RESERVED_CLASSES.indexOf(name);
  }
  function getIconName(cssPrefix, cls) {
    const parts = cls.split('-');
    const prefix = parts[0];
    const iconName = parts.slice(1).join('-');
    if (prefix === cssPrefix && iconName !== '' && !isReserved(iconName)) {
      return iconName;
    } else {
      return null;
    }
  }
  const build = () => {
    const lookup = reducer => {
      return reduce(styles, (o$$1, style, prefix) => {
        o$$1[prefix] = reduce(style, reducer, {});
        return o$$1;
      }, {});
    };
    _byUnicode = lookup((acc, icon, iconName) => {
      if (icon[3]) {
        acc[icon[3]] = iconName;
      }
      if (icon[2]) {
        const aliases = icon[2].filter(a$$1 => {
          return typeof a$$1 === 'number';
        });
        aliases.forEach(alias => {
          acc[alias.toString(16)] = iconName;
        });
      }
      return acc;
    });
    _byLigature = lookup((acc, icon, iconName) => {
      acc[iconName] = iconName;
      if (icon[2]) {
        const aliases = icon[2].filter(a$$1 => {
          return typeof a$$1 === 'string';
        });
        aliases.forEach(alias => {
          acc[alias] = iconName;
        });
      }
      return acc;
    });
    _byAlias = lookup((acc, icon, iconName) => {
      const aliases = icon[2];
      acc[iconName] = iconName;
      aliases.forEach(alias => {
        acc[alias] = iconName;
      });
      return acc;
    });

    // If we have a Kit, we can't determine if regular is available since we
    // could be auto-fetching it. We'll have to assume that it is available.
    const hasRegular = 'far' in styles || config.autoFetchSvg;
    const shimLookups = reduce(shims, (acc, shim) => {
      const maybeNameMaybeUnicode = shim[0];
      let prefix = shim[1];
      const iconName = shim[2];
      if (prefix === 'far' && !hasRegular) {
        prefix = 'fas';
      }
      if (typeof maybeNameMaybeUnicode === 'string') {
        acc.names[maybeNameMaybeUnicode] = {
          prefix,
          iconName
        };
      }
      if (typeof maybeNameMaybeUnicode === 'number') {
        acc.unicodes[maybeNameMaybeUnicode.toString(16)] = {
          prefix,
          iconName
        };
      }
      return acc;
    }, {
      names: {},
      unicodes: {}
    });
    _byOldName = shimLookups.names;
    _byOldUnicode = shimLookups.unicodes;
    _defaultUsablePrefix = getCanonicalPrefix(config.styleDefault, {
      family: config.familyDefault
    });
  };
  onChange(c$$1 => {
    _defaultUsablePrefix = getCanonicalPrefix(c$$1.styleDefault, {
      family: config.familyDefault
    });
  });
  build();
  function byUnicode(prefix, unicode) {
    return (_byUnicode[prefix] || {})[unicode];
  }
  function byLigature(prefix, ligature) {
    return (_byLigature[prefix] || {})[ligature];
  }
  function byAlias(prefix, alias) {
    return (_byAlias[prefix] || {})[alias];
  }
  function byOldName(name) {
    return _byOldName[name] || {
      prefix: null,
      iconName: null
    };
  }
  function byOldUnicode(unicode) {
    const oldUnicode = _byOldUnicode[unicode];
    const newUnicode = byUnicode('fas', unicode);
    return oldUnicode || (newUnicode ? {
      prefix: 'fas',
      iconName: newUnicode
    } : null) || {
      prefix: null,
      iconName: null
    };
  }
  function getDefaultUsablePrefix() {
    return _defaultUsablePrefix;
  }
  const emptyCanonicalIcon = () => {
    return {
      prefix: null,
      iconName: null,
      rest: []
    };
  };
  function getFamilyId(values) {
    let family = s;
    const famProps = FAMILY_NAMES.reduce((acc, familyId) => {
      acc[familyId] = "".concat(config.cssPrefix, "-").concat(familyId);
      return acc;
    }, {});
    L.forEach(familyId => {
      if (values.includes(famProps[familyId]) || values.some(v$$1 => PREFIXES_FOR_FAMILY[familyId].includes(v$$1))) {
        family = familyId;
      }
    });
    return family;
  }
  function getCanonicalPrefix(styleOrPrefix) {
    let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const {
      family = s
    } = params;
    const style = PREFIX_TO_STYLE[family][styleOrPrefix];

    // handles the exception of passing in only a family of 'duotone' with no style
    if (family === t && !styleOrPrefix) {
      return 'fad';
    }
    const prefix = STYLE_TO_PREFIX[family][styleOrPrefix] || STYLE_TO_PREFIX[family][style];
    const defined = styleOrPrefix in namespace.styles ? styleOrPrefix : null;
    const result = prefix || defined || null;
    return result;
  }
  function moveNonFaClassesToRest(classNames) {
    let rest = [];
    let iconName = null;
    classNames.forEach(cls => {
      const result = getIconName(config.cssPrefix, cls);
      if (result) {
        iconName = result;
      } else if (cls) {
        rest.push(cls);
      }
    });
    return {
      iconName,
      rest
    };
  }
  function sortedUniqueValues(arr) {
    return arr.sort().filter((value, index, arr) => {
      return arr.indexOf(value) === index;
    });
  }
  function getCanonicalIcon(values) {
    let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const {
      skipLookups = false
    } = params;
    let givenPrefix = null;
    const faCombinedClasses = Ia.concat(bt$1);
    const faStyleOrFamilyClasses = sortedUniqueValues(values.filter(cls => faCombinedClasses.includes(cls)));
    const nonStyleOrFamilyClasses = sortedUniqueValues(values.filter(cls => !Ia.includes(cls)));
    const faStyles = faStyleOrFamilyClasses.filter(cls => {
      givenPrefix = cls;
      return !P.includes(cls);
    });
    const [styleFromValues = null] = faStyles;
    const family = getFamilyId(faStyleOrFamilyClasses);
    const canonical = _objectSpread2(_objectSpread2({}, moveNonFaClassesToRest(nonStyleOrFamilyClasses)), {}, {
      prefix: getCanonicalPrefix(styleFromValues, {
        family
      })
    });
    return _objectSpread2(_objectSpread2(_objectSpread2({}, canonical), getDefaultCanonicalPrefix({
      values,
      family,
      styles,
      config,
      canonical,
      givenPrefix
    })), applyShimAndAlias(skipLookups, givenPrefix, canonical));
  }
  function applyShimAndAlias(skipLookups, givenPrefix, canonical) {
    let {
      prefix,
      iconName
    } = canonical;
    if (skipLookups || !prefix || !iconName) {
      return {
        prefix,
        iconName
      };
    }
    const shim = givenPrefix === 'fa' ? byOldName(iconName) : {};
    const aliasIconName = byAlias(prefix, iconName);
    iconName = shim.iconName || aliasIconName || iconName;
    prefix = shim.prefix || prefix;
    if (prefix === 'far' && !styles['far'] && styles['fas'] && !config.autoFetchSvg) {
      // Allow a fallback from the regular style to solid if regular is not available
      // but only if we aren't auto-fetching SVGs
      prefix = 'fas';
    }
    return {
      prefix,
      iconName
    };
  }
  const newCanonicalFamilies = L.filter(familyId => {
    return familyId !== s || familyId !== t;
  });
  const newCanonicalStyles = Object.keys(ga).filter(key => key !== s).map(key => Object.keys(ga[key])).flat();
  function getDefaultCanonicalPrefix(prefixOptions) {
    const {
      values,
      family,
      canonical,
      givenPrefix = '',
      styles = {},
      config: config$$1 = {}
    } = prefixOptions;
    const isDuotoneFamily = family === t;
    const valuesHasDuotone = values.includes('fa-duotone') || values.includes('fad');
    const defaultFamilyIsDuotone = config$$1.familyDefault === 'duotone';
    const canonicalPrefixIsDuotone = canonical.prefix === 'fad' || canonical.prefix === 'fa-duotone';
    if (!isDuotoneFamily && (valuesHasDuotone || defaultFamilyIsDuotone || canonicalPrefixIsDuotone)) {
      canonical.prefix = 'fad';
    }
    if (values.includes('fa-brands') || values.includes('fab')) {
      canonical.prefix = 'fab';
    }
    if (!canonical.prefix && newCanonicalFamilies.includes(family)) {
      const validPrefix = Object.keys(styles).find(key => newCanonicalStyles.includes(key));
      if (validPrefix || config$$1.autoFetchSvg) {
        const defaultPrefix = pt.get(family).defaultShortPrefixId;
        canonical.prefix = defaultPrefix;
        canonical.iconName = byAlias(canonical.prefix, canonical.iconName) || canonical.iconName;
      }
    }
    if (canonical.prefix === 'fa' || givenPrefix === 'fa') {
      // The fa prefix is not canonical. So if it has made it through until this point
      // we will shift it to the correct prefix.
      canonical.prefix = getDefaultUsablePrefix() || 'fas';
    }
    return canonical;
  }

  class Library {
    constructor() {
      this.definitions = {};
    }
    add() {
      for (var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++) {
        definitions[_key] = arguments[_key];
      }
      const additions = definitions.reduce(this._pullDefinitions, {});
      Object.keys(additions).forEach(key => {
        this.definitions[key] = _objectSpread2(_objectSpread2({}, this.definitions[key] || {}), additions[key]);
        defineIcons(key, additions[key]);

        // TODO can we stop doing this? We can't get the icons by 'fa-solid' any longer so this probably needs to change
        const longPrefix = PREFIX_TO_LONG_STYLE[s][key];
        if (longPrefix) defineIcons(longPrefix, additions[key]);
        build();
      });
    }
    reset() {
      this.definitions = {};
    }
    _pullDefinitions(additions, definition) {
      const normalized = definition.prefix && definition.iconName && definition.icon ? {
        0: definition
      } : definition;
      Object.keys(normalized).map(key => {
        const {
          prefix,
          iconName,
          icon
        } = normalized[key];
        const aliases = icon[2];
        if (!additions[prefix]) additions[prefix] = {};
        if (aliases.length > 0) {
          aliases.forEach(alias => {
            if (typeof alias === 'string') {
              additions[prefix][alias] = icon;
            }
          });
        }
        additions[prefix][iconName] = icon;
      });
      return additions;
    }
  }

  let _plugins = [];
  let _hooks = {};
  const providers = {};
  const defaultProviderKeys = Object.keys(providers);
  function registerPlugins(nextPlugins, _ref) {
    let {
      mixoutsTo: obj
    } = _ref;
    _plugins = nextPlugins;
    _hooks = {};
    Object.keys(providers).forEach(k => {
      if (defaultProviderKeys.indexOf(k) === -1) {
        delete providers[k];
      }
    });
    _plugins.forEach(plugin => {
      const mixout = plugin.mixout ? plugin.mixout() : {};
      Object.keys(mixout).forEach(tk => {
        if (typeof mixout[tk] === 'function') {
          obj[tk] = mixout[tk];
        }
        if (typeof mixout[tk] === 'object') {
          Object.keys(mixout[tk]).forEach(sk => {
            if (!obj[tk]) {
              obj[tk] = {};
            }
            obj[tk][sk] = mixout[tk][sk];
          });
        }
      });
      if (plugin.hooks) {
        const hooks = plugin.hooks();
        Object.keys(hooks).forEach(hook => {
          if (!_hooks[hook]) {
            _hooks[hook] = [];
          }
          _hooks[hook].push(hooks[hook]);
        });
      }
      if (plugin.provides) {
        plugin.provides(providers);
      }
    });
    return obj;
  }
  function chainHooks(hook, accumulator) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    const hookFns = _hooks[hook] || [];
    hookFns.forEach(hookFn => {
      accumulator = hookFn.apply(null, [accumulator, ...args]); // eslint-disable-line no-useless-call
    });
    return accumulator;
  }
  function callHooks(hook) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    const hookFns = _hooks[hook] || [];
    hookFns.forEach(hookFn => {
      hookFn.apply(null, args);
    });
    return undefined;
  }
  function callProvided() {
    const hook = arguments[0];
    const args = Array.prototype.slice.call(arguments, 1);
    return providers[hook] ? providers[hook].apply(null, args) : undefined;
  }

  function findIconDefinition(iconLookup) {
    if (iconLookup.prefix === 'fa') {
      iconLookup.prefix = 'fas';
    }
    let {
      iconName
    } = iconLookup;
    const prefix = iconLookup.prefix || getDefaultUsablePrefix();
    if (!iconName) return;
    iconName = byAlias(prefix, iconName) || iconName;
    return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);
  }
  const library = new Library();
  const noAuto = () => {
    config.autoReplaceSvg = false;
    config.observeMutations = false;
    callHooks('noAuto');
  };
  const dom = {
    i2svg: function () {
      let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (IS_DOM) {
        callHooks('beforeI2svg', params);
        callProvided('pseudoElements2svg', params);
        return callProvided('i2svg', params);
      } else {
        return Promise.reject(new Error('Operation requires a DOM of some kind.'));
      }
    },
    watch: function () {
      let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const {
        autoReplaceSvgRoot
      } = params;
      if (config.autoReplaceSvg === false) {
        config.autoReplaceSvg = true;
      }
      config.observeMutations = true;
      domready(() => {
        autoReplace({
          autoReplaceSvgRoot
        });
        callHooks('watch', params);
      });
    }
  };
  const parse = {
    icon: icon => {
      if (icon === null) {
        return null;
      }
      if (typeof icon === 'object' && icon.prefix && icon.iconName) {
        return {
          prefix: icon.prefix,
          iconName: byAlias(icon.prefix, icon.iconName) || icon.iconName
        };
      }
      if (Array.isArray(icon) && icon.length === 2) {
        const iconName = icon[1].indexOf('fa-') === 0 ? icon[1].slice(3) : icon[1];
        const prefix = getCanonicalPrefix(icon[0]);
        return {
          prefix,
          iconName: byAlias(prefix, iconName) || iconName
        };
      }
      if (typeof icon === 'string' && (icon.indexOf("".concat(config.cssPrefix, "-")) > -1 || icon.match(ICON_SELECTION_SYNTAX_PATTERN))) {
        const canonicalIcon = getCanonicalIcon(icon.split(' '), {
          skipLookups: true
        });
        return {
          prefix: canonicalIcon.prefix || getDefaultUsablePrefix(),
          iconName: byAlias(canonicalIcon.prefix, canonicalIcon.iconName) || canonicalIcon.iconName
        };
      }
      if (typeof icon === 'string') {
        const prefix = getDefaultUsablePrefix();
        return {
          prefix,
          iconName: byAlias(prefix, icon) || icon
        };
      }
    }
  };
  const api = {
    noAuto,
    config,
    dom,
    parse,
    library,
    findIconDefinition,
    toHtml
  };
  const autoReplace = function () {
    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const {
      autoReplaceSvgRoot = DOCUMENT
    } = params;
    if ((Object.keys(namespace.styles).length > 0 || config.autoFetchSvg) && IS_DOM && config.autoReplaceSvg) api.dom.i2svg({
      node: autoReplaceSvgRoot
    });
  };
  function bootstrap(plugins) {
    if (IS_BROWSER) {
      if (!WINDOW.FontAwesome) {
        WINDOW.FontAwesome = api;
      }
      domready(() => {
        autoReplace();
        callHooks('bootstrap');
      });
    }
    namespace.hooks = _objectSpread2(_objectSpread2({}, namespace.hooks), {}, {
      addPack: (prefix, icons) => {
        namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), icons);
        build();
        autoReplace();
      },
      addPacks: packs => {
        packs.forEach(_ref => {
          let [prefix, icons] = _ref;
          namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), icons);
        });
        build();
        autoReplace();
      },
      addShims: shims => {
        namespace.shims.push(...shims);
        build();
        autoReplace();
      }
    });
  }

  function domVariants(val, abstractCreator) {
    Object.defineProperty(val, 'abstract', {
      get: abstractCreator
    });
    Object.defineProperty(val, 'html', {
      get: function () {
        return val.abstract.map(a => toHtml(a));
      }
    });
    Object.defineProperty(val, 'node', {
      get: function () {
        if (!IS_DOM) return;
        const container = DOCUMENT.createElement('div');
        container.innerHTML = val.html;
        return container.children;
      }
    });
    return val;
  }

  function asIcon (_ref) {
    let {
      children,
      main,
      mask,
      attributes,
      styles,
      transform
    } = _ref;
    if (transformIsMeaningful(transform) && main.found && !mask.found) {
      const {
        width,
        height
      } = main;
      const offset = {
        x: width / height / 2,
        y: 0.5
      };
      attributes['style'] = joinStyles(_objectSpread2(_objectSpread2({}, styles), {}, {
        'transform-origin': "".concat(offset.x + transform.x / 16, "em ").concat(offset.y + transform.y / 16, "em")
      }));
    }
    return [{
      tag: 'svg',
      attributes,
      children
    }];
  }

  function asSymbol (_ref) {
    let {
      prefix,
      iconName,
      children,
      attributes,
      symbol
    } = _ref;
    const id = symbol === true ? "".concat(prefix, "-").concat(config.cssPrefix, "-").concat(iconName) : symbol;
    return [{
      tag: 'svg',
      attributes: {
        style: 'display: none;'
      },
      children: [{
        tag: 'symbol',
        attributes: _objectSpread2(_objectSpread2({}, attributes), {}, {
          id
        }),
        children
      }]
    }];
  }

  function makeInlineSvgAbstract(params) {
    const {
      icons: {
        main,
        mask
      },
      prefix,
      iconName,
      transform,
      symbol,
      title,
      maskId,
      titleId,
      extra,
      watchable = false
    } = params;
    const {
      width,
      height
    } = mask.found ? mask : main;
    const isUploadedIcon = Lt.includes(prefix);
    const attrClass = [config.replacementClass, iconName ? "".concat(config.cssPrefix, "-").concat(iconName) : ''].filter(c$$1 => extra.classes.indexOf(c$$1) === -1).filter(c$$1 => c$$1 !== '' || !!c$$1).concat(extra.classes).join(' ');
    let content = {
      children: [],
      attributes: _objectSpread2(_objectSpread2({}, extra.attributes), {}, {
        'data-prefix': prefix,
        'data-icon': iconName,
        'class': attrClass,
        'role': extra.attributes.role || 'img',
        'xmlns': 'http://www.w3.org/2000/svg',
        'viewBox': "0 0 ".concat(width, " ").concat(height)
      })
    };
    const uploadedIconWidthStyle = isUploadedIcon && !~extra.classes.indexOf('fa-fw') ? {
      width: "".concat(width / height * 16 * 0.0625, "em")
    } : {};
    if (watchable) {
      content.attributes[DATA_FA_I2SVG] = '';
    }
    if (title) {
      content.children.push({
        tag: 'title',
        attributes: {
          id: content.attributes['aria-labelledby'] || "title-".concat(titleId || nextUniqueId())
        },
        children: [title]
      });
      delete content.attributes.title;
    }
    const args = _objectSpread2(_objectSpread2({}, content), {}, {
      prefix,
      iconName,
      main,
      mask,
      maskId,
      transform,
      symbol,
      styles: _objectSpread2(_objectSpread2({}, uploadedIconWidthStyle), extra.styles)
    });
    const {
      children,
      attributes
    } = mask.found && main.found ? callProvided('generateAbstractMask', args) || {
      children: [],
      attributes: {}
    } : callProvided('generateAbstractIcon', args) || {
      children: [],
      attributes: {}
    };
    args.children = children;
    args.attributes = attributes;
    if (symbol) {
      return asSymbol(args);
    } else {
      return asIcon(args);
    }
  }
  function makeLayersTextAbstract(params) {
    const {
      content,
      width,
      height,
      transform,
      title,
      extra,
      watchable = false
    } = params;
    const attributes = _objectSpread2(_objectSpread2(_objectSpread2({}, extra.attributes), title ? {
      'title': title
    } : {}), {}, {
      'class': extra.classes.join(' ')
    });
    if (watchable) {
      attributes[DATA_FA_I2SVG] = '';
    }
    const styles = _objectSpread2({}, extra.styles);
    if (transformIsMeaningful(transform)) {
      styles['transform'] = transformForCss({
        transform,
        startCentered: true,
        width,
        height
      });
      styles['-webkit-transform'] = styles['transform'];
    }
    const styleString = joinStyles(styles);
    if (styleString.length > 0) {
      attributes['style'] = styleString;
    }
    const val = [];
    val.push({
      tag: 'span',
      attributes,
      children: [content]
    });
    if (title) {
      val.push({
        tag: 'span',
        attributes: {
          class: 'sr-only'
        },
        children: [title]
      });
    }
    return val;
  }
  function makeLayersCounterAbstract(params) {
    const {
      content,
      title,
      extra
    } = params;
    const attributes = _objectSpread2(_objectSpread2(_objectSpread2({}, extra.attributes), title ? {
      'title': title
    } : {}), {}, {
      'class': extra.classes.join(' ')
    });
    const styleString = joinStyles(extra.styles);
    if (styleString.length > 0) {
      attributes['style'] = styleString;
    }
    const val = [];
    val.push({
      tag: 'span',
      attributes,
      children: [content]
    });
    if (title) {
      val.push({
        tag: 'span',
        attributes: {
          class: 'sr-only'
        },
        children: [title]
      });
    }
    return val;
  }

  const {
    styles: styles$1
  } = namespace;
  function asFoundIcon(icon) {
    const width = icon[0];
    const height = icon[1];
    const [vectorData] = icon.slice(4);
    let element = null;
    if (Array.isArray(vectorData)) {
      element = {
        tag: 'g',
        attributes: {
          class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.GROUP)
        },
        children: [{
          tag: 'path',
          attributes: {
            class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.SECONDARY),
            fill: 'currentColor',
            d: vectorData[0]
          }
        }, {
          tag: 'path',
          attributes: {
            class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.PRIMARY),
            fill: 'currentColor',
            d: vectorData[1]
          }
        }]
      };
    } else {
      element = {
        tag: 'path',
        attributes: {
          fill: 'currentColor',
          d: vectorData
        }
      };
    }
    return {
      found: true,
      width,
      height,
      icon: element
    };
  }
  const missingIconResolutionMixin = {
    found: false,
    width: 512,
    height: 512
  };
  function maybeNotifyMissing(iconName, prefix) {
    if (!PRODUCTION && !config.showMissingIcons && iconName) {
      console.error("Icon with name \"".concat(iconName, "\" and prefix \"").concat(prefix, "\" is missing."));
    }
  }
  function findIcon(iconName, prefix) {
    let givenPrefix = prefix;
    if (prefix === 'fa' && config.styleDefault !== null) {
      prefix = getDefaultUsablePrefix();
    }
    return new Promise((resolve, reject) => {
      if (givenPrefix === 'fa') {
        const shim = byOldName(iconName) || {};
        iconName = shim.iconName || iconName;
        prefix = shim.prefix || prefix;
      }
      if (iconName && prefix && styles$1[prefix] && styles$1[prefix][iconName]) {
        const icon = styles$1[prefix][iconName];
        return resolve(asFoundIcon(icon));
      }
      maybeNotifyMissing(iconName, prefix);
      resolve(_objectSpread2(_objectSpread2({}, missingIconResolutionMixin), {}, {
        icon: config.showMissingIcons && iconName ? callProvided('missingIconAbstract') || {} : {}
      }));
    });
  }

  const noop$1 = () => {};
  const p$2 = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
    mark: noop$1,
    measure: noop$1
  };
  const preamble = "FA \"6.7.2\"";
  const begin = name => {
    p$2.mark("".concat(preamble, " ").concat(name, " begins"));
    return () => end(name);
  };
  const end = name => {
    p$2.mark("".concat(preamble, " ").concat(name, " ends"));
    p$2.measure("".concat(preamble, " ").concat(name), "".concat(preamble, " ").concat(name, " begins"), "".concat(preamble, " ").concat(name, " ends"));
  };
  var perf = {
    begin,
    end
  };

  const noop$2 = () => {};
  function isWatched(node) {
    const i2svg = node.getAttribute ? node.getAttribute(DATA_FA_I2SVG) : null;
    return typeof i2svg === 'string';
  }
  function hasPrefixAndIcon(node) {
    const prefix = node.getAttribute ? node.getAttribute(DATA_PREFIX) : null;
    const icon = node.getAttribute ? node.getAttribute(DATA_ICON) : null;
    return prefix && icon;
  }
  function hasBeenReplaced(node) {
    return node && node.classList && node.classList.contains && node.classList.contains(config.replacementClass);
  }
  function getMutator() {
    if (config.autoReplaceSvg === true) {
      return mutators.replace;
    }
    const mutator = mutators[config.autoReplaceSvg];
    return mutator || mutators.replace;
  }
  function createElementNS(tag) {
    return DOCUMENT.createElementNS('http://www.w3.org/2000/svg', tag);
  }
  function createElement(tag) {
    return DOCUMENT.createElement(tag);
  }
  function convertSVG(abstractObj) {
    let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const {
      ceFn = abstractObj.tag === 'svg' ? createElementNS : createElement
    } = params;
    if (typeof abstractObj === 'string') {
      return DOCUMENT.createTextNode(abstractObj);
    }
    const tag = ceFn(abstractObj.tag);
    Object.keys(abstractObj.attributes || []).forEach(function (key) {
      tag.setAttribute(key, abstractObj.attributes[key]);
    });
    const children = abstractObj.children || [];
    children.forEach(function (child) {
      tag.appendChild(convertSVG(child, {
        ceFn
      }));
    });
    return tag;
  }
  function nodeAsComment(node) {
    let comment = " ".concat(node.outerHTML, " ");
    /* BEGIN.ATTRIBUTION */
    comment = "".concat(comment, "Font Awesome fontawesome.com ");
    /* END.ATTRIBUTION */
    return comment;
  }
  const mutators = {
    replace: function (mutation) {
      const node = mutation[0];
      if (node.parentNode) {
        mutation[1].forEach(abstract => {
          node.parentNode.insertBefore(convertSVG(abstract), node);
        });
        if (node.getAttribute(DATA_FA_I2SVG) === null && config.keepOriginalSource) {
          let comment = DOCUMENT.createComment(nodeAsComment(node));
          node.parentNode.replaceChild(comment, node);
        } else {
          node.remove();
        }
      }
    },
    nest: function (mutation) {
      const node = mutation[0];
      const abstract = mutation[1];

      // If we already have a replaced node we do not want to continue nesting within it.
      // Short-circuit to the standard replacement
      if (~classArray(node).indexOf(config.replacementClass)) {
        return mutators.replace(mutation);
      }
      const forSvg = new RegExp("".concat(config.cssPrefix, "-.*"));
      delete abstract[0].attributes.id;
      if (abstract[0].attributes.class) {
        const splitClasses = abstract[0].attributes.class.split(' ').reduce((acc, cls) => {
          if (cls === config.replacementClass || cls.match(forSvg)) {
            acc.toSvg.push(cls);
          } else {
            acc.toNode.push(cls);
          }
          return acc;
        }, {
          toNode: [],
          toSvg: []
        });
        abstract[0].attributes.class = splitClasses.toSvg.join(' ');
        if (splitClasses.toNode.length === 0) {
          node.removeAttribute('class');
        } else {
          node.setAttribute('class', splitClasses.toNode.join(' '));
        }
      }
      const newInnerHTML = abstract.map(a => toHtml(a)).join('\n');
      node.setAttribute(DATA_FA_I2SVG, '');
      node.innerHTML = newInnerHTML;
    }
  };
  function performOperationSync(op) {
    op();
  }
  function perform(mutations, callback) {
    const callbackFunction = typeof callback === 'function' ? callback : noop$2;
    if (mutations.length === 0) {
      callbackFunction();
    } else {
      let frame = performOperationSync;
      if (config.mutateApproach === MUTATION_APPROACH_ASYNC) {
        frame = WINDOW.requestAnimationFrame || performOperationSync;
      }
      frame(() => {
        const mutator = getMutator();
        const mark = perf.begin('mutate');
        mutations.map(mutator);
        mark();
        callbackFunction();
      });
    }
  }
  let disabled = false;
  function disableObservation() {
    disabled = true;
  }
  function enableObservation() {
    disabled = false;
  }
  let mo = null;
  function observe(options) {
    if (!MUTATION_OBSERVER) {
      return;
    }
    if (!config.observeMutations) {
      return;
    }
    const {
      treeCallback = noop$2,
      nodeCallback = noop$2,
      pseudoElementsCallback = noop$2,
      observeMutationsRoot = DOCUMENT
    } = options;
    mo = new MUTATION_OBSERVER(objects => {
      if (disabled) return;
      const defaultPrefix = getDefaultUsablePrefix();
      toArray(objects).forEach(mutationRecord => {
        if (mutationRecord.type === 'childList' && mutationRecord.addedNodes.length > 0 && !isWatched(mutationRecord.addedNodes[0])) {
          if (config.searchPseudoElements) {
            pseudoElementsCallback(mutationRecord.target);
          }
          treeCallback(mutationRecord.target);
        }
        if (mutationRecord.type === 'attributes' && mutationRecord.target.parentNode && config.searchPseudoElements) {
          pseudoElementsCallback(mutationRecord.target.parentNode);
        }
        if (mutationRecord.type === 'attributes' && isWatched(mutationRecord.target) && ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(mutationRecord.attributeName)) {
          if (mutationRecord.attributeName === 'class' && hasPrefixAndIcon(mutationRecord.target)) {
            const {
              prefix,
              iconName
            } = getCanonicalIcon(classArray(mutationRecord.target));
            mutationRecord.target.setAttribute(DATA_PREFIX, prefix || defaultPrefix);
            if (iconName) mutationRecord.target.setAttribute(DATA_ICON, iconName);
          } else if (hasBeenReplaced(mutationRecord.target)) {
            nodeCallback(mutationRecord.target);
          }
        }
      });
    });
    if (!IS_DOM) return;
    mo.observe(observeMutationsRoot, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true
    });
  }
  function disconnect() {
    if (!mo) return;
    mo.disconnect();
  }

  function styleParser (node) {
    const style = node.getAttribute('style');
    let val = [];
    if (style) {
      val = style.split(';').reduce((acc, style) => {
        const styles = style.split(':');
        const prop = styles[0];
        const value = styles.slice(1);
        if (prop && value.length > 0) {
          acc[prop] = value.join(':').trim();
        }
        return acc;
      }, {});
    }
    return val;
  }

  function classParser (node) {
    const existingPrefix = node.getAttribute('data-prefix');
    const existingIconName = node.getAttribute('data-icon');
    const innerText = node.innerText !== undefined ? node.innerText.trim() : '';
    let val = getCanonicalIcon(classArray(node));
    if (!val.prefix) {
      val.prefix = getDefaultUsablePrefix();
    }
    if (existingPrefix && existingIconName) {
      val.prefix = existingPrefix;
      val.iconName = existingIconName;
    }
    if (val.iconName && val.prefix) {
      return val;
    }
    if (val.prefix && innerText.length > 0) {
      val.iconName = byLigature(val.prefix, node.innerText) || byUnicode(val.prefix, toHex(node.innerText));
    }
    if (!val.iconName && config.autoFetchSvg && node.firstChild && node.firstChild.nodeType === Node.TEXT_NODE) {
      val.iconName = node.firstChild.data;
    }
    return val;
  }

  function attributesParser (node) {
    const extraAttributes = toArray(node.attributes).reduce((acc, attr) => {
      if (acc.name !== 'class' && acc.name !== 'style') {
        acc[attr.name] = attr.value;
      }
      return acc;
    }, {});
    const title = node.getAttribute('title');
    const titleId = node.getAttribute('data-fa-title-id');
    if (config.autoA11y) {
      if (title) {
        extraAttributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
      } else {
        extraAttributes['aria-hidden'] = 'true';
        extraAttributes['focusable'] = 'false';
      }
    }
    return extraAttributes;
  }

  function blankMeta() {
    return {
      iconName: null,
      title: null,
      titleId: null,
      prefix: null,
      transform: meaninglessTransform,
      symbol: false,
      mask: {
        iconName: null,
        prefix: null,
        rest: []
      },
      maskId: null,
      extra: {
        classes: [],
        styles: {},
        attributes: {}
      }
    };
  }
  function parseMeta(node) {
    let parser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      styleParser: true
    };
    const {
      iconName,
      prefix,
      rest: extraClasses
    } = classParser(node);
    const extraAttributes = attributesParser(node);
    const pluginMeta = chainHooks('parseNodeAttributes', {}, node);
    let extraStyles = parser.styleParser ? styleParser(node) : [];
    return _objectSpread2({
      iconName,
      title: node.getAttribute('title'),
      titleId: node.getAttribute('data-fa-title-id'),
      prefix,
      transform: meaninglessTransform,
      mask: {
        iconName: null,
        prefix: null,
        rest: []
      },
      maskId: null,
      symbol: false,
      extra: {
        classes: extraClasses,
        styles: extraStyles,
        attributes: extraAttributes
      }
    }, pluginMeta);
  }

  const {
    styles: styles$2
  } = namespace;
  function generateMutation(node) {
    const nodeMeta = config.autoReplaceSvg === 'nest' ? parseMeta(node, {
      styleParser: false
    }) : parseMeta(node);
    if (~nodeMeta.extra.classes.indexOf(LAYERS_TEXT_CLASSNAME)) {
      return callProvided('generateLayersText', node, nodeMeta);
    } else {
      return callProvided('generateSvgReplacementMutation', node, nodeMeta);
    }
  }
  function getKnownPrefixes() {
    return [...Ft, ...Ia];
  }
  function onTree(root) {
    let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (!IS_DOM) return Promise.resolve();
    const htmlClassList = DOCUMENT.documentElement.classList;
    const hclAdd = suffix => htmlClassList.add("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
    const hclRemove = suffix => htmlClassList.remove("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
    const prefixes = config.autoFetchSvg ? getKnownPrefixes() : P.concat(Object.keys(styles$2));
    if (!prefixes.includes('fa')) {
      prefixes.push('fa');
    }
    const prefixesDomQuery = [".".concat(LAYERS_TEXT_CLASSNAME, ":not([").concat(DATA_FA_I2SVG, "])")].concat(prefixes.map(p$$1 => ".".concat(p$$1, ":not([").concat(DATA_FA_I2SVG, "])"))).join(', ');
    if (prefixesDomQuery.length === 0) {
      return Promise.resolve();
    }
    let candidates = [];
    try {
      candidates = toArray(root.querySelectorAll(prefixesDomQuery));
    } catch (e$$1) {
      // noop
    }
    if (candidates.length > 0) {
      hclAdd('pending');
      hclRemove('complete');
    } else {
      return Promise.resolve();
    }
    const mark = perf.begin('onTree');
    const mutations = candidates.reduce((acc, node) => {
      try {
        const mutation = generateMutation(node);
        if (mutation) {
          acc.push(mutation);
        }
      } catch (e$$1) {
        if (!PRODUCTION) {
          if (e$$1.name === 'MissingIcon') {
            console.error(e$$1);
          }
        }
      }
      return acc;
    }, []);
    return new Promise((resolve, reject) => {
      Promise.all(mutations).then(resolvedMutations => {
        perform(resolvedMutations, () => {
          hclAdd('active');
          hclAdd('complete');
          hclRemove('pending');
          if (typeof callback === 'function') callback();
          mark();
          resolve();
        });
      }).catch(e$$1 => {
        mark();
        reject(e$$1);
      });
    });
  }
  function onNode(node) {
    let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    generateMutation(node).then(mutation => {
      if (mutation) {
        perform([mutation], callback);
      }
    });
  }
  function resolveIcons(next) {
    return function (maybeIconDefinition) {
      let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});
      let {
        mask
      } = params;
      if (mask) {
        mask = (mask || {}).icon ? mask : findIconDefinition(mask || {});
      }
      return next(iconDefinition, _objectSpread2(_objectSpread2({}, params), {}, {
        mask
      }));
    };
  }
  const render = function (iconDefinition) {
    let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const {
      transform = meaninglessTransform,
      symbol = false,
      mask = null,
      maskId = null,
      title = null,
      titleId = null,
      classes = [],
      attributes = {},
      styles = {}
    } = params;
    if (!iconDefinition) return;
    const {
      prefix,
      iconName,
      icon
    } = iconDefinition;
    return domVariants(_objectSpread2({
      type: 'icon'
    }, iconDefinition), () => {
      callHooks('beforeDOMElementCreation', {
        iconDefinition,
        params
      });
      if (config.autoA11y) {
        if (title) {
          attributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
        } else {
          attributes['aria-hidden'] = 'true';
          attributes['focusable'] = 'false';
        }
      }
      return makeInlineSvgAbstract({
        icons: {
          main: asFoundIcon(icon),
          mask: mask ? asFoundIcon(mask.icon) : {
            found: false,
            width: null,
            height: null,
            icon: {}
          }
        },
        prefix,
        iconName,
        transform: _objectSpread2(_objectSpread2({}, meaninglessTransform), transform),
        symbol,
        title,
        maskId,
        titleId,
        extra: {
          attributes,
          styles,
          classes
        }
      });
    });
  };
  var ReplaceElements = {
    mixout() {
      return {
        icon: resolveIcons(render)
      };
    },
    hooks() {
      return {
        mutationObserverCallbacks(accumulator) {
          accumulator.treeCallback = onTree;
          accumulator.nodeCallback = onNode;
          return accumulator;
        }
      };
    },
    provides(providers$$1) {
      providers$$1.i2svg = function (params) {
        const {
          node = DOCUMENT,
          callback = () => {}
        } = params;
        return onTree(node, callback);
      };
      providers$$1.generateSvgReplacementMutation = function (node, nodeMeta) {
        const {
          iconName,
          title,
          titleId,
          prefix,
          transform,
          symbol,
          mask,
          maskId,
          extra
        } = nodeMeta;
        return new Promise((resolve, reject) => {
          Promise.all([findIcon(iconName, prefix), mask.iconName ? findIcon(mask.iconName, mask.prefix) : Promise.resolve({
            found: false,
            width: 512,
            height: 512,
            icon: {}
          })]).then(_ref => {
            let [main, mask] = _ref;
            resolve([node, makeInlineSvgAbstract({
              icons: {
                main,
                mask
              },
              prefix,
              iconName,
              transform,
              symbol,
              maskId,
              title,
              titleId,
              extra,
              watchable: true
            })]);
          }).catch(reject);
        });
      };
      providers$$1.generateAbstractIcon = function (_ref2) {
        let {
          children,
          attributes,
          main,
          transform,
          styles
        } = _ref2;
        const styleString = joinStyles(styles);
        if (styleString.length > 0) {
          attributes['style'] = styleString;
        }
        let nextChild;
        if (transformIsMeaningful(transform)) {
          nextChild = callProvided('generateAbstractTransformGrouping', {
            main,
            transform,
            containerWidth: main.width,
            iconWidth: main.width
          });
        }
        children.push(nextChild || main.icon);
        return {
          children,
          attributes
        };
      };
    }
  };

  var Layers = {
    mixout() {
      return {
        layer(assembler) {
          let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          const {
            classes = []
          } = params;
          return domVariants({
            type: 'layer'
          }, () => {
            callHooks('beforeDOMElementCreation', {
              assembler,
              params
            });
            let children = [];
            assembler(args => {
              Array.isArray(args) ? args.map(a => {
                children = children.concat(a.abstract);
              }) : children = children.concat(args.abstract);
            });
            return [{
              tag: 'span',
              attributes: {
                class: ["".concat(config.cssPrefix, "-layers"), ...classes].join(' ')
              },
              children
            }];
          });
        }
      };
    }
  };

  var LayersCounter = {
    mixout() {
      return {
        counter(content) {
          let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          const {
            title = null,
            classes = [],
            attributes = {},
            styles = {}
          } = params;
          return domVariants({
            type: 'counter',
            content
          }, () => {
            callHooks('beforeDOMElementCreation', {
              content,
              params
            });
            return makeLayersCounterAbstract({
              content: content.toString(),
              title,
              extra: {
                attributes,
                styles,
                classes: ["".concat(config.cssPrefix, "-layers-counter"), ...classes]
              }
            });
          });
        }
      };
    }
  };

  var LayersText = {
    mixout() {
      return {
        text(content) {
          let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          const {
            transform = meaninglessTransform,
            title = null,
            classes = [],
            attributes = {},
            styles = {}
          } = params;
          return domVariants({
            type: 'text',
            content
          }, () => {
            callHooks('beforeDOMElementCreation', {
              content,
              params
            });
            return makeLayersTextAbstract({
              content,
              transform: _objectSpread2(_objectSpread2({}, meaninglessTransform), transform),
              title,
              extra: {
                attributes,
                styles,
                classes: ["".concat(config.cssPrefix, "-layers-text"), ...classes]
              }
            });
          });
        }
      };
    },
    provides(providers$$1) {
      providers$$1.generateLayersText = function (node, nodeMeta) {
        const {
          title,
          transform,
          extra
        } = nodeMeta;
        let width = null;
        let height = null;
        if (IS_IE) {
          const computedFontSize = parseInt(getComputedStyle(node).fontSize, 10);
          const boundingClientRect = node.getBoundingClientRect();
          width = boundingClientRect.width / computedFontSize;
          height = boundingClientRect.height / computedFontSize;
        }
        if (config.autoA11y && !title) {
          extra.attributes['aria-hidden'] = 'true';
        }
        return Promise.resolve([node, makeLayersTextAbstract({
          content: node.innerHTML,
          width,
          height,
          transform,
          title,
          extra,
          watchable: true
        })]);
      };
    }
  };

  const CLEAN_CONTENT_PATTERN = new RegExp('\u{22}', 'ug');
  const SECONDARY_UNICODE_RANGE = [1105920, 1112319];
  const _FONT_FAMILY_WEIGHT_TO_PREFIX = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, {
    FontAwesome: {
      normal: 'fas',
      400: 'fas'
    }
  }), lt), wa), Yt);
  const FONT_FAMILY_WEIGHT_TO_PREFIX = Object.keys(_FONT_FAMILY_WEIGHT_TO_PREFIX).reduce((acc, key) => {
    acc[key.toLowerCase()] = _FONT_FAMILY_WEIGHT_TO_PREFIX[key];
    return acc;
  }, {});
  const FONT_FAMILY_WEIGHT_FALLBACK = Object.keys(FONT_FAMILY_WEIGHT_TO_PREFIX).reduce((acc, fontFamily) => {
    const weights = FONT_FAMILY_WEIGHT_TO_PREFIX[fontFamily];
    acc[fontFamily] = weights[900] || [...Object.entries(weights)][0][1];
    return acc;
  }, {});
  function hexValueFromContent(content) {
    const cleaned = content.replace(CLEAN_CONTENT_PATTERN, '');
    const codePoint = codePointAt(cleaned, 0);
    const isPrependTen = codePoint >= SECONDARY_UNICODE_RANGE[0] && codePoint <= SECONDARY_UNICODE_RANGE[1];
    const isDoubled = cleaned.length === 2 ? cleaned[0] === cleaned[1] : false;
    return {
      value: isDoubled ? toHex(cleaned[0]) : toHex(cleaned),
      isSecondary: isPrependTen || isDoubled
    };
  }
  function getPrefix(fontFamily, fontWeight) {
    const fontFamilySanitized = fontFamily.replace(/^['"]|['"]$/g, '').toLowerCase();
    const fontWeightInteger = parseInt(fontWeight);
    const fontWeightSanitized = isNaN(fontWeightInteger) ? 'normal' : fontWeightInteger;
    return (FONT_FAMILY_WEIGHT_TO_PREFIX[fontFamilySanitized] || {})[fontWeightSanitized] || FONT_FAMILY_WEIGHT_FALLBACK[fontFamilySanitized];
  }
  function replaceForPosition(node, position) {
    const pendingAttribute = "".concat(DATA_FA_PSEUDO_ELEMENT_PENDING).concat(position.replace(':', '-'));
    return new Promise((resolve, reject) => {
      if (node.getAttribute(pendingAttribute) !== null) {
        // This node is already being processed
        return resolve();
      }
      const children = toArray(node.children);
      const alreadyProcessedPseudoElement = children.filter(c$$1 => c$$1.getAttribute(DATA_FA_PSEUDO_ELEMENT) === position)[0];
      const styles = WINDOW.getComputedStyle(node, position);
      const fontFamily = styles.getPropertyValue('font-family');
      const fontFamilyMatch = fontFamily.match(FONT_FAMILY_PATTERN);
      const fontWeight = styles.getPropertyValue('font-weight');
      const content = styles.getPropertyValue('content');
      if (alreadyProcessedPseudoElement && !fontFamilyMatch) {
        // If we've already processed it but the current computed style does not result in a font-family,
        // that probably means that a class name that was previously present to make the icon has been
        // removed. So we now should delete the icon.
        node.removeChild(alreadyProcessedPseudoElement);
        return resolve();
      } else if (fontFamilyMatch && content !== 'none' && content !== '') {
        const content = styles.getPropertyValue('content');
        let prefix = getPrefix(fontFamily, fontWeight);
        const {
          value: hexValue,
          isSecondary
        } = hexValueFromContent(content);
        const isV4 = fontFamilyMatch[0].startsWith('FontAwesome');
        let iconName = byUnicode(prefix, hexValue);
        let iconIdentifier = iconName;
        if (isV4) {
          const iconName4 = byOldUnicode(hexValue);
          if (iconName4.iconName && iconName4.prefix) {
            iconName = iconName4.iconName;
            prefix = iconName4.prefix;
          }
        }

        // Only convert the pseudo element in this ::before/::after position into an icon if we haven't
        // already done so with the same prefix and iconName
        if (iconName && !isSecondary && (!alreadyProcessedPseudoElement || alreadyProcessedPseudoElement.getAttribute(DATA_PREFIX) !== prefix || alreadyProcessedPseudoElement.getAttribute(DATA_ICON) !== iconIdentifier)) {
          node.setAttribute(pendingAttribute, iconIdentifier);
          if (alreadyProcessedPseudoElement) {
            // Delete the old one, since we're replacing it with a new one
            node.removeChild(alreadyProcessedPseudoElement);
          }
          const meta = blankMeta();
          const {
            extra
          } = meta;
          extra.attributes[DATA_FA_PSEUDO_ELEMENT] = position;
          findIcon(iconName, prefix).then(main => {
            const abstract = makeInlineSvgAbstract(_objectSpread2(_objectSpread2({}, meta), {}, {
              icons: {
                main,
                mask: emptyCanonicalIcon()
              },
              prefix,
              iconName: iconIdentifier,
              extra,
              watchable: true
            }));
            const element = DOCUMENT.createElementNS('http://www.w3.org/2000/svg', 'svg');
            if (position === '::before') {
              node.insertBefore(element, node.firstChild);
            } else {
              node.appendChild(element);
            }
            element.outerHTML = abstract.map(a$$1 => toHtml(a$$1)).join('\n');
            node.removeAttribute(pendingAttribute);
            resolve();
          }).catch(reject);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    });
  }
  function replace(node) {
    return Promise.all([replaceForPosition(node, '::before'), replaceForPosition(node, '::after')]);
  }
  function processable(node) {
    return node.parentNode !== document.head && !~TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS.indexOf(node.tagName.toUpperCase()) && !node.getAttribute(DATA_FA_PSEUDO_ELEMENT) && (!node.parentNode || node.parentNode.tagName !== 'svg');
  }
  function searchPseudoElements(root) {
    if (!IS_DOM) return;
    return new Promise((resolve, reject) => {
      const operations = toArray(root.querySelectorAll('*')).filter(processable).map(replace);
      const end = perf.begin('searchPseudoElements');
      disableObservation();
      Promise.all(operations).then(() => {
        end();
        enableObservation();
        resolve();
      }).catch(() => {
        end();
        enableObservation();
        reject();
      });
    });
  }
  var PseudoElements = {
    hooks() {
      return {
        mutationObserverCallbacks(accumulator) {
          accumulator.pseudoElementsCallback = searchPseudoElements;
          return accumulator;
        }
      };
    },
    provides(providers) {
      providers.pseudoElements2svg = function (params) {
        const {
          node = DOCUMENT
        } = params;
        if (config.searchPseudoElements) {
          searchPseudoElements(node);
        }
      };
    }
  };

  let _unwatched = false;
  var MutationObserver$1 = {
    mixout() {
      return {
        dom: {
          unwatch() {
            disableObservation();
            _unwatched = true;
          }
        }
      };
    },
    hooks() {
      return {
        bootstrap() {
          observe(chainHooks('mutationObserverCallbacks', {}));
        },
        noAuto() {
          disconnect();
        },
        watch(params) {
          const {
            observeMutationsRoot
          } = params;
          if (_unwatched) {
            enableObservation();
          } else {
            observe(chainHooks('mutationObserverCallbacks', {
              observeMutationsRoot
            }));
          }
        }
      };
    }
  };

  const parseTransformString = transformString => {
    let transform = {
      size: 16,
      x: 0,
      y: 0,
      flipX: false,
      flipY: false,
      rotate: 0
    };
    return transformString.toLowerCase().split(' ').reduce((acc, n) => {
      const parts = n.toLowerCase().split('-');
      const first = parts[0];
      let rest = parts.slice(1).join('-');
      if (first && rest === 'h') {
        acc.flipX = true;
        return acc;
      }
      if (first && rest === 'v') {
        acc.flipY = true;
        return acc;
      }
      rest = parseFloat(rest);
      if (isNaN(rest)) {
        return acc;
      }
      switch (first) {
        case 'grow':
          acc.size = acc.size + rest;
          break;
        case 'shrink':
          acc.size = acc.size - rest;
          break;
        case 'left':
          acc.x = acc.x - rest;
          break;
        case 'right':
          acc.x = acc.x + rest;
          break;
        case 'up':
          acc.y = acc.y - rest;
          break;
        case 'down':
          acc.y = acc.y + rest;
          break;
        case 'rotate':
          acc.rotate = acc.rotate + rest;
          break;
      }
      return acc;
    }, transform);
  };
  var PowerTransforms = {
    mixout() {
      return {
        parse: {
          transform: transformString => {
            return parseTransformString(transformString);
          }
        }
      };
    },
    hooks() {
      return {
        parseNodeAttributes(accumulator, node) {
          const transformString = node.getAttribute('data-fa-transform');
          if (transformString) {
            accumulator.transform = parseTransformString(transformString);
          }
          return accumulator;
        }
      };
    },
    provides(providers) {
      providers.generateAbstractTransformGrouping = function (_ref) {
        let {
          main,
          transform,
          containerWidth,
          iconWidth
        } = _ref;
        const outer = {
          transform: "translate(".concat(containerWidth / 2, " 256)")
        };
        const innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
        const innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
        const innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
        const inner = {
          transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
        };
        const path = {
          transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
        };
        const operations = {
          outer,
          inner,
          path
        };
        return {
          tag: 'g',
          attributes: _objectSpread2({}, operations.outer),
          children: [{
            tag: 'g',
            attributes: _objectSpread2({}, operations.inner),
            children: [{
              tag: main.icon.tag,
              children: main.icon.children,
              attributes: _objectSpread2(_objectSpread2({}, main.icon.attributes), operations.path)
            }]
          }]
        };
      };
    }
  };

  const ALL_SPACE = {
    x: 0,
    y: 0,
    width: '100%',
    height: '100%'
  };
  function fillBlack(abstract) {
    let force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (abstract.attributes && (abstract.attributes.fill || force)) {
      abstract.attributes.fill = 'black';
    }
    return abstract;
  }
  function deGroup(abstract) {
    if (abstract.tag === 'g') {
      return abstract.children;
    } else {
      return [abstract];
    }
  }
  var Masks = {
    hooks() {
      return {
        parseNodeAttributes(accumulator, node) {
          const maskData = node.getAttribute('data-fa-mask');
          const mask = !maskData ? emptyCanonicalIcon() : getCanonicalIcon(maskData.split(' ').map(i => i.trim()));
          if (!mask.prefix) {
            mask.prefix = getDefaultUsablePrefix();
          }
          accumulator.mask = mask;
          accumulator.maskId = node.getAttribute('data-fa-mask-id');
          return accumulator;
        }
      };
    },
    provides(providers) {
      providers.generateAbstractMask = function (_ref) {
        let {
          children,
          attributes,
          main,
          mask,
          maskId: explicitMaskId,
          transform
        } = _ref;
        const {
          width: mainWidth,
          icon: mainPath
        } = main;
        const {
          width: maskWidth,
          icon: maskPath
        } = mask;
        const trans = transformForSvg({
          transform,
          containerWidth: maskWidth,
          iconWidth: mainWidth
        });
        const maskRect = {
          tag: 'rect',
          attributes: _objectSpread2(_objectSpread2({}, ALL_SPACE), {}, {
            fill: 'white'
          })
        };
        const maskInnerGroupChildrenMixin = mainPath.children ? {
          children: mainPath.children.map(fillBlack)
        } : {};
        const maskInnerGroup = {
          tag: 'g',
          attributes: _objectSpread2({}, trans.inner),
          children: [fillBlack(_objectSpread2({
            tag: mainPath.tag,
            attributes: _objectSpread2(_objectSpread2({}, mainPath.attributes), trans.path)
          }, maskInnerGroupChildrenMixin))]
        };
        const maskOuterGroup = {
          tag: 'g',
          attributes: _objectSpread2({}, trans.outer),
          children: [maskInnerGroup]
        };
        const maskId = "mask-".concat(explicitMaskId || nextUniqueId());
        const clipId = "clip-".concat(explicitMaskId || nextUniqueId());
        const maskTag = {
          tag: 'mask',
          attributes: _objectSpread2(_objectSpread2({}, ALL_SPACE), {}, {
            id: maskId,
            maskUnits: 'userSpaceOnUse',
            maskContentUnits: 'userSpaceOnUse'
          }),
          children: [maskRect, maskOuterGroup]
        };
        const defs = {
          tag: 'defs',
          children: [{
            tag: 'clipPath',
            attributes: {
              id: clipId
            },
            children: deGroup(maskPath)
          }, maskTag]
        };
        children.push(defs, {
          tag: 'rect',
          attributes: _objectSpread2({
            fill: 'currentColor',
            'clip-path': "url(#".concat(clipId, ")"),
            mask: "url(#".concat(maskId, ")")
          }, ALL_SPACE)
        });
        return {
          children,
          attributes
        };
      };
    }
  };

  var MissingIconIndicator = {
    provides(providers) {
      let reduceMotion = false;
      if (WINDOW.matchMedia) {
        reduceMotion = WINDOW.matchMedia('(prefers-reduced-motion: reduce)').matches;
      }
      providers.missingIconAbstract = function () {
        const gChildren = [];
        const FILL = {
          fill: 'currentColor'
        };
        const ANIMATION_BASE = {
          attributeType: 'XML',
          repeatCount: 'indefinite',
          dur: '2s'
        };

        // Ring
        gChildren.push({
          tag: 'path',
          attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
            d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'
          })
        });
        const OPACITY_ANIMATE = _objectSpread2(_objectSpread2({}, ANIMATION_BASE), {}, {
          attributeName: 'opacity'
        });
        const dot = {
          tag: 'circle',
          attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
            cx: '256',
            cy: '364',
            r: '28'
          }),
          children: []
        };
        if (!reduceMotion) {
          dot.children.push({
            tag: 'animate',
            attributes: _objectSpread2(_objectSpread2({}, ANIMATION_BASE), {}, {
              attributeName: 'r',
              values: '28;14;28;28;14;28;'
            })
          }, {
            tag: 'animate',
            attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
              values: '1;0;1;1;0;1;'
            })
          });
        }
        gChildren.push(dot);
        gChildren.push({
          tag: 'path',
          attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
            opacity: '1',
            d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z'
          }),
          children: reduceMotion ? [] : [{
            tag: 'animate',
            attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
              values: '1;0;0;0;0;1;'
            })
          }]
        });
        if (!reduceMotion) {
          // Exclamation
          gChildren.push({
            tag: 'path',
            attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
              opacity: '0',
              d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z'
            }),
            children: [{
              tag: 'animate',
              attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
                values: '0;0;1;1;0;0;'
              })
            }]
          });
        }
        return {
          tag: 'g',
          attributes: {
            'class': 'missing'
          },
          children: gChildren
        };
      };
    }
  };

  var SvgSymbols = {
    hooks() {
      return {
        parseNodeAttributes(accumulator, node) {
          const symbolData = node.getAttribute('data-fa-symbol');
          const symbol = symbolData === null ? false : symbolData === '' ? true : symbolData;
          accumulator['symbol'] = symbol;
          return accumulator;
        }
      };
    }
  };

  var plugins = [InjectCSS, ReplaceElements, Layers, LayersCounter, LayersText, PseudoElements, MutationObserver$1, PowerTransforms, Masks, MissingIconIndicator, SvgSymbols];

  registerPlugins(plugins, {
    mixoutsTo: api
  });
  bunker(bootstrap);

}());
