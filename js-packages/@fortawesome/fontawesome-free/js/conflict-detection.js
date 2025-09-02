/*!
 * Font Awesome Free 7.0.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2025 Fonticons, Inc.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
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
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  var _WINDOW = {};
  var _DOCUMENT = {};
  try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
  } catch (e) {} // eslint-disable-line no-empty

  var _ref = _WINDOW.navigator || {},
    _ref$userAgent = _ref.userAgent,
    userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;
  var WINDOW = _WINDOW;
  var DOCUMENT = _DOCUMENT;
  var IS_BROWSER = !!WINDOW.document;
  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

  var functions = [];
  var _listener = function listener() {
    DOCUMENT.removeEventListener('DOMContentLoaded', _listener);
    loaded = 1;
    functions.map(function (fn) {
      return fn();
    });
  };
  var loaded = false;
  if (IS_DOM) {
    loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
    if (!loaded) DOCUMENT.addEventListener('DOMContentLoaded', _listener);
  }
  function domready (fn) {
    if (!IS_DOM) return;
    loaded ? setTimeout(fn, 0) : functions.push(fn);
  }

  function report (_ref) {
    var nodesTested = _ref.nodesTested,
      nodesFound = _ref.nodesFound;
    var timedOutTests = {};
    for (var key in nodesFound) {
      if (!(nodesTested.conflict[key] || nodesTested.noConflict[key])) {
        timedOutTests[key] = nodesFound[key];
      }
    }
    var conflictsCount = Object.keys(nodesTested.conflict).length;
    if (conflictsCount > 0) {
      console.info("%cConflict".concat(conflictsCount > 1 ? 's' : '', " found:"), 'color: darkred; font-size: large');
      var data = {};
      for (var _key in nodesTested.conflict) {
        var item = nodesTested.conflict[_key];
        data[_key] = {
          'tagName': item.tagName,
          'src/href': item.src || item.href || 'n/a',
          'innerText excerpt': item.innerText && item.innerText !== '' ? item.innerText.slice(0, 200) + '...' : '(empty)'
        };
      }
      console.table(data);
    }
    var noConflictsCount = Object.keys(nodesTested.noConflict).length;
    if (noConflictsCount > 0) {
      console.info("%cNo conflict".concat(noConflictsCount > 1 ? 's' : '', " found with ").concat(noConflictsCount === 1 ? 'this' : 'these', ":"), 'color: green; font-size: large');
      var _data = {};
      for (var _key2 in nodesTested.noConflict) {
        var _item = nodesTested.noConflict[_key2];
        _data[_key2] = {
          'tagName': _item.tagName,
          'src/href': _item.src || _item.href || 'n/a',
          'innerText excerpt': _item.innerText && _item.innerText !== '' ? _item.innerText.slice(0, 200) + '...' : '(empty)'
        };
      }
      console.table(_data);
    }
    var timeOutCount = Object.keys(timedOutTests).length;
    if (timeOutCount > 0) {
      console.info("%cLeftovers--we timed out before collecting test results for ".concat(timeOutCount === 1 ? 'this' : 'these', ":"), 'color: blue; font-size: large');
      var _data2 = {};
      for (var _key3 in timedOutTests) {
        var _item2 = timedOutTests[_key3];
        _data2[_key3] = {
          'tagName': _item2.tagName,
          'src/href': _item2.src || _item2.href || 'n/a',
          'innerText excerpt': _item2.innerText && _item2.innerText !== '' ? _item2.innerText.slice(0, 200) + '...' : '(empty)'
        };
      }
      console.table(_data2);
    }
  }

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var md5 = createCommonjsModule(function (module) {
    (function ($) {

      /**
       * Add integers, wrapping at 2^32.
       * This uses 16-bit operations internally to work around bugs in interpreters.
       *
       * @param {number} x First integer
       * @param {number} y Second integer
       * @returns {number} Sum
       */
      function safeAdd(x, y) {
        var lsw = (x & 0xffff) + (y & 0xffff);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return msw << 16 | lsw & 0xffff;
      }

      /**
       * Bitwise rotate a 32-bit number to the left.
       *
       * @param {number} num 32-bit number
       * @param {number} cnt Rotation count
       * @returns {number} Rotated number
       */
      function bitRotateLeft(num, cnt) {
        return num << cnt | num >>> 32 - cnt;
      }

      /**
       * Basic operation the algorithm uses.
       *
       * @param {number} q q
       * @param {number} a a
       * @param {number} b b
       * @param {number} x x
       * @param {number} s s
       * @param {number} t t
       * @returns {number} Result
       */
      function md5cmn(q, a, b, x, s, t) {
        return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
      }
      /**
       * Basic operation the algorithm uses.
       *
       * @param {number} a a
       * @param {number} b b
       * @param {number} c c
       * @param {number} d d
       * @param {number} x x
       * @param {number} s s
       * @param {number} t t
       * @returns {number} Result
       */
      function md5ff(a, b, c, d, x, s, t) {
        return md5cmn(b & c | ~b & d, a, b, x, s, t);
      }
      /**
       * Basic operation the algorithm uses.
       *
       * @param {number} a a
       * @param {number} b b
       * @param {number} c c
       * @param {number} d d
       * @param {number} x x
       * @param {number} s s
       * @param {number} t t
       * @returns {number} Result
       */
      function md5gg(a, b, c, d, x, s, t) {
        return md5cmn(b & d | c & ~d, a, b, x, s, t);
      }
      /**
       * Basic operation the algorithm uses.
       *
       * @param {number} a a
       * @param {number} b b
       * @param {number} c c
       * @param {number} d d
       * @param {number} x x
       * @param {number} s s
       * @param {number} t t
       * @returns {number} Result
       */
      function md5hh(a, b, c, d, x, s, t) {
        return md5cmn(b ^ c ^ d, a, b, x, s, t);
      }
      /**
       * Basic operation the algorithm uses.
       *
       * @param {number} a a
       * @param {number} b b
       * @param {number} c c
       * @param {number} d d
       * @param {number} x x
       * @param {number} s s
       * @param {number} t t
       * @returns {number} Result
       */
      function md5ii(a, b, c, d, x, s, t) {
        return md5cmn(c ^ (b | ~d), a, b, x, s, t);
      }

      /**
       * Calculate the MD5 of an array of little-endian words, and a bit length.
       *
       * @param {Array} x Array of little-endian words
       * @param {number} len Bit length
       * @returns {Array<number>} MD5 Array
       */
      function binlMD5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << len % 32;
        x[(len + 64 >>> 9 << 4) + 14] = len;
        var i;
        var olda;
        var oldb;
        var oldc;
        var oldd;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for (i = 0; i < x.length; i += 16) {
          olda = a;
          oldb = b;
          oldc = c;
          oldd = d;
          a = md5ff(a, b, c, d, x[i], 7, -680876936);
          d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
          c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
          b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
          a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
          d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
          c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
          b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
          a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
          d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
          c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
          b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
          a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
          d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
          c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
          b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
          a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
          d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
          c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
          b = md5gg(b, c, d, a, x[i], 20, -373897302);
          a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
          d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
          c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
          b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
          a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
          d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
          c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
          b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
          a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
          d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
          c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
          b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
          a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
          d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
          c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
          b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
          a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
          d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
          c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
          b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
          a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
          d = md5hh(d, a, b, c, x[i], 11, -358537222);
          c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
          b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
          a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
          d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
          c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
          b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
          a = md5ii(a, b, c, d, x[i], 6, -198630844);
          d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
          c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
          b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
          a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
          d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
          c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
          b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
          a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
          d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
          c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
          b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
          a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
          d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
          c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
          b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
          a = safeAdd(a, olda);
          b = safeAdd(b, oldb);
          c = safeAdd(c, oldc);
          d = safeAdd(d, oldd);
        }
        return [a, b, c, d];
      }

      /**
       * Convert an array of little-endian words to a string
       *
       * @param {Array<number>} input MD5 Array
       * @returns {string} MD5 string
       */
      function binl2rstr(input) {
        var i;
        var output = '';
        var length32 = input.length * 32;
        for (i = 0; i < length32; i += 8) {
          output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);
        }
        return output;
      }

      /**
       * Convert a raw string to an array of little-endian words
       * Characters >255 have their high-byte silently ignored.
       *
       * @param {string} input Raw input string
       * @returns {Array<number>} Array of little-endian words
       */
      function rstr2binl(input) {
        var i;
        var output = [];
        output[(input.length >> 2) - 1] = undefined;
        for (i = 0; i < output.length; i += 1) {
          output[i] = 0;
        }
        var length8 = input.length * 8;
        for (i = 0; i < length8; i += 8) {
          output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
        }
        return output;
      }

      /**
       * Calculate the MD5 of a raw string
       *
       * @param {string} s Input string
       * @returns {string} Raw MD5 string
       */
      function rstrMD5(s) {
        return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
      }

      /**
       * Calculates the HMAC-MD5 of a key and some data (raw strings)
       *
       * @param {string} key HMAC key
       * @param {string} data Raw input string
       * @returns {string} Raw MD5 string
       */
      function rstrHMACMD5(key, data) {
        var i;
        var bkey = rstr2binl(key);
        var ipad = [];
        var opad = [];
        var hash;
        ipad[15] = opad[15] = undefined;
        if (bkey.length > 16) {
          bkey = binlMD5(bkey, key.length * 8);
        }
        for (i = 0; i < 16; i += 1) {
          ipad[i] = bkey[i] ^ 0x36363636;
          opad[i] = bkey[i] ^ 0x5c5c5c5c;
        }
        hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
      }

      /**
       * Convert a raw string to a hex string
       *
       * @param {string} input Raw input string
       * @returns {string} Hex encoded string
       */
      function rstr2hex(input) {
        var hexTab = '0123456789abcdef';
        var output = '';
        var x;
        var i;
        for (i = 0; i < input.length; i += 1) {
          x = input.charCodeAt(i);
          output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);
        }
        return output;
      }

      /**
       * Encode a string as UTF-8
       *
       * @param {string} input Input string
       * @returns {string} UTF8 string
       */
      function str2rstrUTF8(input) {
        return unescape(encodeURIComponent(input));
      }

      /**
       * Encodes input string as raw MD5 string
       *
       * @param {string} s Input string
       * @returns {string} Raw MD5 string
       */
      function rawMD5(s) {
        return rstrMD5(str2rstrUTF8(s));
      }
      /**
       * Encodes input string as Hex encoded string
       *
       * @param {string} s Input string
       * @returns {string} Hex encoded string
       */
      function hexMD5(s) {
        return rstr2hex(rawMD5(s));
      }
      /**
       * Calculates the raw HMAC-MD5 for the given key and data
       *
       * @param {string} k HMAC key
       * @param {string} d Input string
       * @returns {string} Raw MD5 string
       */
      function rawHMACMD5(k, d) {
        return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
      }
      /**
       * Calculates the Hex encoded HMAC-MD5 for the given key and data
       *
       * @param {string} k HMAC key
       * @param {string} d Input string
       * @returns {string} Raw MD5 string
       */
      function hexHMACMD5(k, d) {
        return rstr2hex(rawHMACMD5(k, d));
      }

      /**
       * Calculates MD5 value for a given string.
       * If a key is provided, calculates the HMAC-MD5 value.
       * Returns a Hex encoded string unless the raw argument is given.
       *
       * @param {string} string Input string
       * @param {string} [key] HMAC key
       * @param {boolean} [raw] Raw output switch
       * @returns {string} MD5 output
       */
      function md5(string, key, raw) {
        if (!key) {
          if (!raw) {
            return hexMD5(string);
          }
          return rawMD5(string);
        }
        if (!raw) {
          return hexHMACMD5(key, string);
        }
        return rawHMACMD5(key, string);
      }
      if (module.exports) {
        module.exports = md5;
      } else {
        $.md5 = md5;
      }
    })(commonjsGlobal);
  });

  function md5ForNode(node) {
    if (null === node || 'object' !== _typeof(node)) return undefined;
    if (node.src) {
      return md5(node.src);
    } else if (node.href) {
      return md5(node.href);
    } else if (node.innerText && '' !== node.innerText) {
      return md5(node.innerText);
    } else {
      return undefined;
    }
  }

  var diagScriptId = 'fa-kits-diag';
  var nodeUnderTestId = 'fa-kits-node-under-test';
  var md5Attr = 'data-md5';
  var detectionIgnoreAttr = 'data-fa-detection-ignore';
  var timeoutAttr = 'data-fa-detection-timeout';
  var resultsCollectionMaxWaitAttr = 'data-fa-detection-results-collection-max-wait';
  var silenceErrors = function silenceErrors(e) {
    e.preventDefault();
    e.stopPropagation();
  };
  function pollUntil(_ref) {
    var _ref$fn = _ref.fn,
      fn = _ref$fn === void 0 ? function () {
        return true;
      } : _ref$fn,
      _ref$initialDuration = _ref.initialDuration,
      initialDuration = _ref$initialDuration === void 0 ? 1 : _ref$initialDuration,
      _ref$maxDuration = _ref.maxDuration,
      maxDuration = _ref$maxDuration === void 0 ? WINDOW.FontAwesomeDetection.timeout : _ref$maxDuration,
      _ref$showProgress = _ref.showProgress,
      showProgress = _ref$showProgress === void 0 ? false : _ref$showProgress,
      progressIndicator = _ref.progressIndicator;
    return new Promise(function (resolve, reject) {
      function poll(duration, cumulativeDuration) {
        setTimeout(function () {
          var result = fn();
          if (showProgress) {
            console.info(progressIndicator);
          }
          if (result) {
            resolve(result);
          } else {
            var nextDuration = 250;
            var nextCumulativeDuration = nextDuration + cumulativeDuration;
            if (nextCumulativeDuration <= maxDuration) {
              poll(nextDuration, nextCumulativeDuration);
            } else {
              reject('timeout'); // eslint-disable-line prefer-promise-reject-errors
            }
          }
        }, duration);
      }
      poll(initialDuration, 0);
    });
  }
  function detectWebfontConflicts() {
    var linkTags = Array.from(DOCUMENT.getElementsByTagName('link')).filter(function (t) {
      return !t.hasAttribute(detectionIgnoreAttr);
    });
    var styleTags = Array.from(DOCUMENT.getElementsByTagName('style')).filter(function (t) {
      if (t.hasAttribute(detectionIgnoreAttr)) {
        return false;
      }

      // If the browser has loaded the FA5 CSS, let's not test that <style> element.
      // Its enough that we'll be testing for traces of the corresponding JS being loaded, and testing
      // this <style> would only produce a false negative anyway.
      if (WINDOW.FontAwesomeConfig && t.innerText.match(new RegExp("svg:not\\(:root\\)\\.".concat(WINDOW.FontAwesomeConfig.replacementClass)))) {
        return false;
      }
      return true;
    });
    function runDiag(scriptOrLinkTag, md5) {
      var diagFrame = DOCUMENT.createElement('iframe');
      // Using "visibility: hidden; position: absolute" instead of "display: none;" because
      // Firefox will not return the expected results for getComputedStyle if our iframe has display: none.
      diagFrame.setAttribute('style', 'visibility: hidden; position: absolute; height: 0; width: 0;');
      var testIconId = 'fa-test-icon-' + md5;
      var iTag = DOCUMENT.createElement('i');
      iTag.setAttribute('class', 'fa fa-coffee');
      iTag.setAttribute('id', testIconId);
      var diagScript = DOCUMENT.createElement('script');
      diagScript.setAttribute('id', diagScriptId);

      // WARNING: this function will be toString()'d and assigned to innerText of the diag script
      // element that we'll be putting into a diagnostic iframe.
      // That means that this code won't compile until after the outer script has run and injected
      // this code into the iframe. There are some compile time errors that might occur there.
      // For example, using single line (double-slash) comments like this one inside that function
      // will probably cause it to choke. Chrome will show an error like this:
      // Uncaught SyntaxError: Unexpected end of input
      var diagScriptFun = function diagScriptFun(nodeUnderTestId, testIconId, md5, parentOrigin) {
        parent.FontAwesomeDetection.__pollUntil({
          fn: function fn() {
            var iEl = document.getElementById(testIconId);
            var computedStyle = window.getComputedStyle(iEl);
            var fontFamily = computedStyle.getPropertyValue('font-family');
            if (!!fontFamily.match(/FontAwesome/) || !!fontFamily.match(/Font Awesome [56]/)) {
              return true;
            } else {
              return false;
            }
          }
        }).then(function () {
          var node = document.getElementById(nodeUnderTestId);
          parent.postMessage({
            type: 'fontawesome-conflict',
            technology: 'webfont',
            href: node.href,
            innerText: node.innerText,
            tagName: node.tagName,
            md5: md5
          }, parentOrigin);
        }).catch(function (e) {
          var node = document.getElementById(nodeUnderTestId);
          if (e === 'timeout') {
            parent.postMessage({
              type: 'no-conflict',
              technology: 'webfont',
              href: node.src,
              innerText: node.innerText,
              tagName: node.tagName,
              md5: md5
            }, parentOrigin);
          } else {
            console.error(e);
          }
        });
      };
      var parentOrigin = WINDOW.location.origin === 'file://' ? '*' : WINDOW.location.origin;
      diagScript.innerText = "(".concat(diagScriptFun.toString(), ")('").concat(nodeUnderTestId, "', '").concat(testIconId || 'foo', "', '").concat(md5, "', '").concat(parentOrigin, "');");
      diagFrame.onload = function () {
        diagFrame.contentWindow.addEventListener('error', silenceErrors, true);
        diagFrame.contentDocument.head.appendChild(diagScript);
        diagFrame.contentDocument.head.appendChild(scriptOrLinkTag);
        diagFrame.contentDocument.body.appendChild(iTag);
      };
      domready(function () {
        return DOCUMENT.body.appendChild(diagFrame);
      });
    }
    var cssByMD5 = {};
    for (var i = 0; i < linkTags.length; i++) {
      var linkUnderTest = DOCUMENT.createElement('link');
      linkUnderTest.setAttribute('id', nodeUnderTestId);
      linkUnderTest.setAttribute('href', linkTags[i].href);
      linkUnderTest.setAttribute('rel', linkTags[i].rel);
      var md5ForLink = md5ForNode(linkTags[i]);
      linkUnderTest.setAttribute(md5Attr, md5ForLink);
      cssByMD5[md5ForLink] = linkTags[i];
      runDiag(linkUnderTest, md5ForLink);
    }
    for (var _i = 0; _i < styleTags.length; _i++) {
      var styleUnderTest = DOCUMENT.createElement('style');
      styleUnderTest.setAttribute('id', nodeUnderTestId);
      var md5ForStyle = md5ForNode(styleTags[_i]);
      styleUnderTest.setAttribute(md5Attr, md5ForStyle);
      styleUnderTest.innerText = styleTags[_i].innerText;
      cssByMD5[md5ForStyle] = styleTags[_i];
      runDiag(styleUnderTest, md5ForStyle);
    }
    return cssByMD5;
  }
  function detectSvgConflicts(currentScript) {
    var scripts = Array.from(DOCUMENT.scripts).filter(function (t) {
      return !t.hasAttribute(detectionIgnoreAttr) && t !== currentScript;
    });
    var scriptsByMD5 = {};
    var _loop = function _loop() {
      var diagFrame = DOCUMENT.createElement('iframe');
      diagFrame.setAttribute('style', 'display:none;');
      var scriptUnderTest = DOCUMENT.createElement('script');
      scriptUnderTest.setAttribute('id', nodeUnderTestId);
      var md5ForScript = md5ForNode(scripts[scriptIdx]);
      scriptUnderTest.setAttribute(md5Attr, md5ForScript);
      scriptsByMD5[md5ForScript] = scripts[scriptIdx];
      if (scripts[scriptIdx].src !== '') {
        scriptUnderTest.src = scripts[scriptIdx].src;
      }
      if (scripts[scriptIdx].innerText !== '') {
        scriptUnderTest.innerText = scripts[scriptIdx].innerText;
      }
      scriptUnderTest.async = true;
      var diagScript = DOCUMENT.createElement('script');
      diagScript.setAttribute('id', diagScriptId);
      var parentOrigin = WINDOW.location.origin === 'file://' ? '*' : WINDOW.location.origin;
      var diagScriptFun = function diagScriptFun(nodeUnderTestId, md5, parentOrigin) {
        parent.FontAwesomeDetection.__pollUntil({
          fn: function fn() {
            return !!window.FontAwesomeConfig || !!window.FontAwesomeKitConfig;
          }
        }).then(function () {
          var scriptNode = document.getElementById(nodeUnderTestId);
          parent.postMessage({
            type: 'fontawesome-conflict',
            technology: 'js',
            src: scriptNode.src,
            innerText: scriptNode.innerText,
            tagName: scriptNode.tagName,
            md5: md5
          }, parentOrigin);
        }).catch(function (e) {
          var scriptNode = document.getElementById(nodeUnderTestId);
          if (e === 'timeout') {
            parent.postMessage({
              type: 'no-conflict',
              src: scriptNode.src,
              innerText: scriptNode.innerText,
              tagName: scriptNode.tagName,
              md5: md5
            }, parentOrigin);
          } else {
            console.error(e);
          }
        });
      };
      diagScript.innerText = "(".concat(diagScriptFun.toString(), ")('").concat(nodeUnderTestId, "', '").concat(md5ForScript, "', '").concat(parentOrigin, "');");
      diagFrame.onload = function () {
        diagFrame.contentWindow.addEventListener('error', silenceErrors, true);
        diagFrame.contentDocument.head.appendChild(diagScript);
        diagFrame.contentDocument.head.appendChild(scriptUnderTest);
      };
      domready(function () {
        return DOCUMENT.body.appendChild(diagFrame);
      });
    };
    for (var scriptIdx = 0; scriptIdx < scripts.length; scriptIdx++) {
      _loop();
    }
    return scriptsByMD5;
  }
  function setDoneResults(_ref2) {
    var nodesTested = _ref2.nodesTested,
      nodesFound = _ref2.nodesFound;
    WINDOW.FontAwesomeDetection = WINDOW.FontAwesomeDetection || {};
    WINDOW.FontAwesomeDetection.nodesTested = nodesTested;
    WINDOW.FontAwesomeDetection.nodesFound = nodesFound;
    WINDOW.FontAwesomeDetection.detectionDone = true;
  }
  function conflictDetection() {
    var report$$1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
    var nodesTested = {
      conflict: {},
      noConflict: {}
    };
    WINDOW.onmessage = function (e) {
      if (WINDOW.location.origin === 'file://' || e.origin === WINDOW.location.origin) {
        if (e && e.data) {
          if (e.data.type === 'fontawesome-conflict') {
            nodesTested.conflict[e.data.md5] = e.data;
          } else if (e.data.type === 'no-conflict') {
            nodesTested.noConflict[e.data.md5] = e.data;
          }
        }
      }
    };
    var scriptsToTest = detectSvgConflicts(DOCUMENT.currentScript);
    var cssToTest = detectWebfontConflicts();
    var nodesFound = _objectSpread2(_objectSpread2({}, scriptsToTest), cssToTest);
    var testCount = Object.keys(scriptsToTest).length + Object.keys(cssToTest).length;

    // The resultsCollectionMaxWait allows for the time between when the tests running under
    // child iframes call postMessage with their results, and when the parent window
    // receives and handles those events with window.onmessage.
    // Making it configurable allows us to test the scenario where this timeout is exceeded.
    // Naming it something very different from "timeout" is to help avoid the potential ambiguity between
    // these two timeout-related settings.
    var masterTimeout = WINDOW.FontAwesomeDetection.timeout + WINDOW.FontAwesomeDetection.resultsCollectionMaxWait;
    console.group('Font Awesome Detector');
    if (testCount === 0) {
      console.info('%cAll Good!', 'color: green; font-size: large');
      console.info("We didn't find anything that needs testing for conflicts. Ergo, no conflicts.");
    } else {
      console.info("Testing ".concat(testCount, " possible conflicts."));
      console.info("We'll wait about ".concat(Math.round(WINDOW.FontAwesomeDetection.timeout / 10) / 100, " seconds while testing these and\n") + "then up to another ".concat(Math.round(WINDOW.FontAwesomeDetection.resultsCollectionMaxWait / 10) / 100, " to allow the browser time\n") + "to accumulate the results. But we'll probably be outta here way before then.\n\n");
      console.info("You can adjust those durations by assigning values to these attributes on the <script> element that loads this detection:");
      console.info("\t%c".concat(timeoutAttr, "%c: milliseconds to wait for each test before deciding whether it's a conflict."), 'font-weight: bold;', 'font-size: normal;');
      console.info("\t%c".concat(resultsCollectionMaxWaitAttr, "%c: milliseconds to wait for the browser to accumulate test results before giving up."), 'font-weight: bold;', 'font-size: normal;');
      pollUntil({
        // Give this overall timer a little extra cushion
        maxDuration: masterTimeout,
        showProgress: true,
        progressIndicator: 'waiting...',
        fn: function fn() {
          return Object.keys(nodesTested.conflict).length + Object.keys(nodesTested.noConflict).length >= testCount;
        }
      }).then(function () {
        console.info('DONE!');
        setDoneResults({
          nodesTested: nodesTested,
          nodesFound: nodesFound
        });
        report$$1({
          nodesTested: nodesTested,
          nodesFound: nodesFound
        });
        console.groupEnd();
      }).catch(function (e) {
        if (e === 'timeout') {
          console.info("TIME OUT! We waited until we got tired. Here's what we found:");
          setDoneResults({
            nodesTested: nodesTested,
            nodesFound: nodesFound
          });
          report$$1({
            nodesTested: nodesTested,
            nodesFound: nodesFound
          });
        } else {
          console.info('Whoops! We hit an error:', e);
          console.info("Here's what we'd found up until that error:");
          setDoneResults({
            nodesTested: nodesTested,
            nodesFound: nodesFound
          });
          report$$1({
            nodesTested: nodesTested,
            nodesFound: nodesFound
          });
        }
        console.groupEnd();
      });
    }
  }

  // Allow clients to access, and in some cases, override some properties
  var initialConfig = WINDOW.FontAwesomeDetection || {};

  // These can be overridden
  var _default = {
    report: report,
    timeout: +(DOCUMENT.currentScript.getAttribute(timeoutAttr) || '2000'),
    resultsCollectionMaxWait: +(DOCUMENT.currentScript.getAttribute(resultsCollectionMaxWaitAttr) || '5000')
  };
  var _config = _objectSpread2(_objectSpread2(_objectSpread2({}, _default), initialConfig), {}, {
    // These cannot be overridden
    __pollUntil: pollUntil,
    md5ForNode: md5ForNode,
    detectionDone: false,
    nodesTested: null,
    nodesFound: null
  });
  WINDOW.FontAwesomeDetection = _config;

  var _so;
  var z = {
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
      },
      slab: {
        "fa-regular": "regular",
        faslr: "regular"
      },
      "slab-press": {
        "fa-regular": "regular",
        faslpr: "regular"
      },
      thumbprint: {
        "fa-light": "light",
        fatl: "light"
      },
      whiteboard: {
        "fa-semibold": "semibold",
        fawsb: "semibold"
      },
      notdog: {
        "fa-solid": "solid",
        fans: "solid"
      },
      "notdog-duo": {
        "fa-solid": "solid",
        fands: "solid"
      },
      etch: {
        "fa-solid": "solid",
        faes: "solid"
      },
      jelly: {
        "fa-regular": "regular",
        fajr: "regular"
      },
      "jelly-fill": {
        "fa-regular": "regular",
        fajfr: "regular"
      },
      "jelly-duo": {
        "fa-regular": "regular",
        fajdr: "regular"
      },
      chisel: {
        "fa-regular": "regular",
        facr: "regular"
      }
    };
  var a = "classic",
    o = "duotone",
    d = "sharp",
    t = "sharp-duotone",
    i = "chisel",
    n = "etch",
    h = "jelly",
    s = "jelly-duo",
    f = "jelly-fill",
    g = "notdog",
    l = "notdog-duo",
    u = "slab",
    p = "slab-press",
    e = "thumbprint",
    w = "whiteboard",
    m = "Classic",
    y = "Duotone",
    x = "Sharp",
    c = "Sharp Duotone",
    I = "Chisel",
    b = "Etch",
    F = "Jelly",
    v = "Jelly Duo",
    S = "Jelly Fill",
    A = "Notdog",
    P = "Notdog Duo",
    j = "Slab",
    B = "Slab Press",
    N = "Thumbprint",
    k = "Whiteboard",
    so = (_so = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_so, a, m), o, y), d, x), t, c), i, I), n, b), h, F), s, v), f, S), g, A), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_so, l, P), u, j), p, B), e, N), w, k));
  var io = {
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
      },
      slab: {
        400: "faslr"
      },
      "slab-press": {
        400: "faslpr"
      },
      whiteboard: {
        600: "fawsb"
      },
      thumbprint: {
        300: "fatl"
      },
      notdog: {
        900: "fans"
      },
      "notdog-duo": {
        900: "fands"
      },
      etch: {
        900: "faes"
      },
      chisel: {
        400: "facr"
      },
      jelly: {
        400: "fajr"
      },
      "jelly-fill": {
        400: "fajfr"
      },
      "jelly-duo": {
        400: "fajdr"
      }
    };
  var Ro = {
      chisel: {
        regular: "facr"
      },
      classic: {
        brands: "fab",
        light: "fal",
        regular: "far",
        solid: "fas",
        thin: "fat"
      },
      duotone: {
        light: "fadl",
        regular: "fadr",
        solid: "fad",
        thin: "fadt"
      },
      etch: {
        solid: "faes"
      },
      jelly: {
        regular: "fajr"
      },
      "jelly-duo": {
        regular: "fajdr"
      },
      "jelly-fill": {
        regular: "fajfr"
      },
      notdog: {
        solid: "fans"
      },
      "notdog-duo": {
        solid: "fands"
      },
      sharp: {
        light: "fasl",
        regular: "fasr",
        solid: "fass",
        thin: "fast"
      },
      "sharp-duotone": {
        light: "fasdl",
        regular: "fasdr",
        solid: "fasds",
        thin: "fasdt"
      },
      slab: {
        regular: "faslr"
      },
      "slab-press": {
        regular: "faslpr"
      },
      thumbprint: {
        light: "fatl"
      },
      whiteboard: {
        semibold: "fawsb"
      }
    };
  var Oo = {
      kit: {
        fak: "kit",
        "fa-kit": "kit"
      },
      "kit-duotone": {
        fakd: "kit-duotone",
        "fa-kit-duotone": "kit-duotone"
      }
    },
    Go = ["kit"];
  var D = "kit",
    r = "kit-duotone",
    T = "Kit",
    C = "Kit Duotone",
    qo = _defineProperty(_defineProperty({}, D, T), r, C);
  var Xo = {
    kit: {
      "fa-kit": "fak"
    },
    "kit-duotone": {
      "fa-kit-duotone": "fakd"
    }
  };
  var et = {
      kit: {
        fak: "fa-kit"
      },
      "kit-duotone": {
        fakd: "fa-kit-duotone"
      }
    };
  var dt = {
      kit: {
        kit: "fak"
      },
      "kit-duotone": {
        "kit-duotone": "fakd"
      }
    };

  var _fl;
  var l$1 = {
      GROUP: "duotone-group",
      SWAP_OPACITY: "swap-opacity",
      PRIMARY: "primary",
      SECONDARY: "secondary"
    };
  var f$1 = "classic",
    a$1 = "duotone",
    n$1 = "sharp",
    t$1 = "sharp-duotone",
    h$1 = "chisel",
    g$1 = "etch",
    u$1 = "jelly",
    s$1 = "jelly-duo",
    p$1 = "jelly-fill",
    y$1 = "notdog",
    e$1 = "notdog-duo",
    m$1 = "slab",
    c$1 = "slab-press",
    r$1 = "thumbprint",
    w$1 = "whiteboard",
    x$1 = "Classic",
    I$1 = "Duotone",
    b$1 = "Sharp",
    F$1 = "Sharp Duotone",
    v$1 = "Chisel",
    S$1 = "Etch",
    A$1 = "Jelly",
    j$1 = "Jelly Duo",
    P$1 = "Jelly Fill",
    B$1 = "Notdog",
    k$1 = "Notdog Duo",
    N$1 = "Slab",
    D$1 = "Slab Press",
    C$1 = "Thumbprint",
    T$1 = "Whiteboard",
    fl = (_fl = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_fl, f$1, x$1), a$1, I$1), n$1, b$1), t$1, F$1), h$1, v$1), g$1, S$1), u$1, A$1), s$1, j$1), p$1, P$1), y$1, B$1), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_fl, e$1, k$1), m$1, N$1), c$1, D$1), r$1, C$1), w$1, T$1));
  var L = "kit",
    d$1 = "kit-duotone",
    R$1 = "Kit",
    W$1 = "Kit Duotone",
    lo$1 = _defineProperty(_defineProperty({}, L, R$1), d$1, W$1);
  var zo$1 = {
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
      },
      slab: {
        "fa-regular": "faslr"
      },
      "slab-press": {
        "fa-regular": "faslpr"
      },
      whiteboard: {
        "fa-semibold": "fawsb"
      },
      thumbprint: {
        "fa-light": "fatl"
      },
      notdog: {
        "fa-solid": "fans"
      },
      "notdog-duo": {
        "fa-solid": "fands"
      },
      etch: {
        "fa-solid": "faes"
      },
      jelly: {
        "fa-regular": "fajr"
      },
      "jelly-fill": {
        "fa-regular": "fajfr"
      },
      "jelly-duo": {
        "fa-regular": "fajdr"
      },
      chisel: {
        "fa-regular": "facr"
      }
    },
    J$1 = {
      classic: ["fas", "far", "fal", "fat", "fad"],
      duotone: ["fadr", "fadl", "fadt"],
      sharp: ["fass", "fasr", "fasl", "fast"],
      "sharp-duotone": ["fasds", "fasdr", "fasdl", "fasdt"],
      slab: ["faslr"],
      "slab-press": ["faslpr"],
      whiteboard: ["fawsb"],
      thumbprint: ["fatl"],
      notdog: ["fans"],
      "notdog-duo": ["fands"],
      etch: ["faes"],
      jelly: ["fajr"],
      "jelly-fill": ["fajfr"],
      "jelly-duo": ["fajdr"],
      chisel: ["facr"]
    },
    Go$1 = {
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
      },
      slab: {
        faslr: "fa-regular"
      },
      "slab-press": {
        faslpr: "fa-regular"
      },
      whiteboard: {
        fawsb: "fa-semibold"
      },
      thumbprint: {
        fatl: "fa-light"
      },
      notdog: {
        fans: "fa-solid"
      },
      "notdog-duo": {
        fands: "fa-solid"
      },
      etch: {
        faes: "fa-solid"
      },
      jelly: {
        fajr: "fa-regular"
      },
      "jelly-fill": {
        fajfr: "fa-regular"
      },
      "jelly-duo": {
        fajdr: "fa-regular"
      },
      chisel: {
        facr: "fa-regular"
      }
    },
    _$1 = ["solid", "regular", "light", "thin", "duotone", "brands", "semibold"],
    K$1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    M$1 = K$1.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
    O$1 = ["aw", "fw", "pull-left", "pull-right"],
    Ho$1 = [].concat(_toConsumableArray(Object.keys(J$1)), _$1, O$1, ["2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "inverse", "layers", "layers-bottom-left", "layers-bottom-right", "layers-counter", "layers-text", "layers-top-left", "layers-top-right", "li", "pull-end", "pull-start", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", "width-auto", "width-fixed", l$1.GROUP, l$1.SWAP_OPACITY, l$1.PRIMARY, l$1.SECONDARY]).concat(K$1.map(function (o) {
      return "".concat(o, "x");
    })).concat(M$1.map(function (o) {
      return "w-".concat(o);
    }));

  var PRODUCTION = function () {
    try {
      return process.env.NODE_ENV === 'production';
    } catch (e$$1) {
      return false;
    }
  }();
  function familyProxy(obj) {
    // Defaults to the classic family if family is not available
    return new Proxy(obj, {
      get: function get(target, prop) {
        return prop in target ? target[prop] : target[a];
      }
    });
  }
  var _PREFIX_TO_STYLE = _objectSpread2({}, z);

  // We changed FACSSClassesToStyleId in the icons repo to be canonical and as such, "classic" family does not have any
  // duotone styles.  But we do still need duotone in _PREFIX_TO_STYLE below, so we are manually adding
  // {'fa-duotone': 'duotone'}
  _PREFIX_TO_STYLE[a] = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, {
    'fa-duotone': 'duotone'
  }), z[a]), Oo['kit']), Oo['kit-duotone']);
  var PREFIX_TO_STYLE = familyProxy(_PREFIX_TO_STYLE);
  var _STYLE_TO_PREFIX = _objectSpread2({}, Ro);

  // We changed FAStyleIdToShortPrefixId in the icons repo to be canonical and as such, "classic" family does not have any
  // duotone styles.  But we do still need duotone in _STYLE_TO_PREFIX below, so we are manually adding {duotone: 'fad'}
  _STYLE_TO_PREFIX[a] = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, {
    duotone: 'fad'
  }), _STYLE_TO_PREFIX[a]), dt['kit']), dt['kit-duotone']);
  var STYLE_TO_PREFIX = familyProxy(_STYLE_TO_PREFIX);
  var _PREFIX_TO_LONG_STYLE = _objectSpread2({}, Go$1);
  _PREFIX_TO_LONG_STYLE[a] = _objectSpread2(_objectSpread2({}, _PREFIX_TO_LONG_STYLE[a]), et['kit']);
  var PREFIX_TO_LONG_STYLE = familyProxy(_PREFIX_TO_LONG_STYLE);
  var _LONG_STYLE_TO_PREFIX = _objectSpread2({}, zo$1);
  _LONG_STYLE_TO_PREFIX[a] = _objectSpread2(_objectSpread2({}, _LONG_STYLE_TO_PREFIX[a]), Xo['kit']);
  var LONG_STYLE_TO_PREFIX = familyProxy(_LONG_STYLE_TO_PREFIX);
  var _FONT_WEIGHT_TO_PREFIX = _objectSpread2({}, io);
  var FONT_WEIGHT_TO_PREFIX = familyProxy(_FONT_WEIGHT_TO_PREFIX);
  var RESERVED_CLASSES = [].concat(_toConsumableArray(Go), _toConsumableArray(Ho$1));

  function bunker(fn) {
    try {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      fn.apply(void 0, args);
    } catch (e) {
      if (!PRODUCTION) {
        throw e;
      }
    }
  }

  bunker(function () {
    if (IS_BROWSER && IS_DOM) {
      conflictDetection(window.FontAwesomeDetection.report);
    }
  });

})));
