/*!
 * Font Awesome Free 6.2.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2022 Fonticons, Inc.
 */
!function() {
    "use strict";
    function e(t, n) {
        var a, e = Object.keys(t);
        return Object.getOwnPropertySymbols && (a = Object.getOwnPropertySymbols(t), n && (a = a.filter(function(n) {
            return Object.getOwnPropertyDescriptor(t, n).enumerable;
        })), e.push.apply(e, a)), e;
    }
    function k(t) {
        for (var n = 1; n < arguments.length; n++) {
            var a = null != arguments[n] ? arguments[n] : {};
            n % 2 ? e(Object(a), !0).forEach(function(n) {
                s(t, n, a[n]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : e(Object(a)).forEach(function(n) {
                Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(a, n));
            });
        }
        return t;
    }
    function i(n) {
        return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
            return typeof n;
        } : function(n) {
            return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        })(n);
    }
    function r(n, t) {
        for (var a = 0; a < t.length; a++) {
            var e = t[a];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), 
            Object.defineProperty(n, e.key, e);
        }
    }
    function s(n, t, a) {
        return t in n ? Object.defineProperty(n, t, {
            value: a,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : n[t] = a, n;
    }
    function m(n, t) {
        return function(n) {
            if (Array.isArray(n)) return n;
        }(n) || function(n, t) {
            var a = null == n ? null : "undefined" != typeof Symbol && n[Symbol.iterator] || n["@@iterator"];
            if (null != a) {
                var e, i, r = [], o = !0, s = !1;
                try {
                    for (a = a.call(n); !(o = (e = a.next()).done) && (r.push(e.value), !t || r.length !== t); o = !0);
                } catch (n) {
                    s = !0, i = n;
                } finally {
                    try {
                        o || null == a.return || a.return();
                    } finally {
                        if (s) throw i;
                    }
                }
                return r;
            }
        }(n, t) || a(n, t) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
    }
    function l(n) {
        return function(n) {
            if (Array.isArray(n)) return o(n);
        }(n) || function(n) {
            if ("undefined" != typeof Symbol && null != n[Symbol.iterator] || null != n["@@iterator"]) return Array.from(n);
        }(n) || a(n) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
    }
    function a(n, t) {
        if (n) {
            if ("string" == typeof n) return o(n, t);
            var a = Object.prototype.toString.call(n).slice(8, -1);
            return "Map" === (a = "Object" === a && n.constructor ? n.constructor.name : a) || "Set" === a ? Array.from(n) : "Arguments" === a || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a) ? o(n, t) : void 0;
        }
    }
    function o(n, t) {
        (null == t || t > n.length) && (t = n.length);
        for (var a = 0, e = new Array(t); a < t; a++) e[a] = n[a];
        return e;
    }
    function n() {}
    var t = {}, c = {}, f = null, u = {
        mark: n,
        measure: n
    };
    try {
        "undefined" != typeof window && (t = window), "undefined" != typeof document && (c = document), 
        "undefined" != typeof MutationObserver && (f = MutationObserver), "undefined" != typeof performance && (u = performance);
    } catch (n) {}
    var d = (t.navigator || {}).userAgent, b = void 0 === d ? "" : d, g = t, h = c, v = f, d = u, p = !!g.document, y = !!h.documentElement && !!h.head && "function" == typeof h.addEventListener && "function" == typeof h.createElement, w = ~b.indexOf("MSIE") || ~b.indexOf("Trident/"), t = "___FONT_AWESOME___", x = 16, A = "svg-inline--fa", O = "data-fa-i2svg", N = "data-fa-pseudo-element", P = "data-fa-pseudo-element-pending", C = "data-prefix", S = "data-icon", j = "fontawesome-i2svg", E = "async", z = [ "HTML", "HEAD", "STYLE", "SCRIPT" ], M = function() {
        try {
            return !1;
        } catch (n) {
            return !1;
        }
    }(), I = "classic", L = "sharp", Y = [ I, L ];
    function R(n) {
        return new Proxy(n, {
            get: function(n, t) {
                return t in n ? n[t] : n[I];
            }
        });
    }
    var T = R((s(c = {}, I, {
        fa: "solid",
        fas: "solid",
        "fa-solid": "solid",
        far: "regular",
        "fa-regular": "regular",
        fal: "light",
        "fa-light": "light",
        fat: "thin",
        "fa-thin": "thin",
        fad: "duotone",
        "fa-duotone": "duotone",
        fab: "brands",
        "fa-brands": "brands",
        fak: "kit",
        "fa-kit": "kit"
    }), s(c, L, {
        fa: "solid",
        fass: "solid",
        "fa-solid": "solid"
    }), c)), D = R((s(f = {}, I, {
        solid: "fas",
        regular: "far",
        light: "fal",
        thin: "fat",
        duotone: "fad",
        brands: "fab",
        kit: "fak"
    }), s(f, L, {
        solid: "fass"
    }), f)), F = R((s(u = {}, I, {
        fab: "fa-brands",
        fad: "fa-duotone",
        fak: "fa-kit",
        fal: "fa-light",
        far: "fa-regular",
        fas: "fa-solid",
        fat: "fa-thin"
    }), s(u, L, {
        fass: "fa-solid"
    }), u)), H = R((s(b = {}, I, {
        "fa-brands": "fab",
        "fa-duotone": "fad",
        "fa-kit": "fak",
        "fa-light": "fal",
        "fa-regular": "far",
        "fa-solid": "fas",
        "fa-thin": "fat"
    }), s(b, L, {
        "fa-solid": "fass"
    }), b)), W = /fa(s|r|l|t|d|b|k|ss)?[\-\ ]/, _ = "fa-layers-text", U = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i, X = R((s(c = {}, I, {
        900: "fas",
        400: "far",
        normal: "far",
        300: "fal",
        100: "fat"
    }), s(c, L, {
        900: "fass"
    }), c)), f = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], u = f.concat([ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]), B = [ "class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask" ], q = {
        GROUP: "duotone-group",
        SWAP_OPACITY: "swap-opacity",
        PRIMARY: "primary",
        SECONDARY: "secondary"
    }, b = new Set();
    Object.keys(D[I]).map(b.add.bind(b)), Object.keys(D[L]).map(b.add.bind(b));
    var V = [].concat(Y, l(b), [ "2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", q.GROUP, q.SWAP_OPACITY, q.PRIMARY, q.SECONDARY ]).concat(f.map(function(n) {
        return "".concat(n, "x");
    })).concat(u.map(function(n) {
        return "w-".concat(n);
    })), G = g.FontAwesomeConfig || {};
    h && "function" == typeof h.querySelector && [ [ "data-family-prefix", "familyPrefix" ], [ "data-css-prefix", "cssPrefix" ], [ "data-family-default", "familyDefault" ], [ "data-style-default", "styleDefault" ], [ "data-replacement-class", "replacementClass" ], [ "data-auto-replace-svg", "autoReplaceSvg" ], [ "data-auto-add-css", "autoAddCss" ], [ "data-auto-a11y", "autoA11y" ], [ "data-search-pseudo-elements", "searchPseudoElements" ], [ "data-observe-mutations", "observeMutations" ], [ "data-mutate-approach", "mutateApproach" ], [ "data-keep-original-source", "keepOriginalSource" ], [ "data-measure-performance", "measurePerformance" ], [ "data-show-missing-icons", "showMissingIcons" ] ].forEach(function(n) {
        var t = m(n, 2), n = t[0], t = t[1], n = "" === (n = function(n) {
            var t = h.querySelector("script[" + n + "]");
            if (t) return t.getAttribute(n);
        }(n)) || "false" !== n && ("true" === n || n);
        null != n && (G[t] = n);
    });
    c = {
        styleDefault: "solid",
        familyDefault: "classic",
        cssPrefix: "fa",
        replacementClass: A,
        autoReplaceSvg: !0,
        autoAddCss: !0,
        autoA11y: !0,
        searchPseudoElements: !1,
        observeMutations: !0,
        mutateApproach: "async",
        keepOriginalSource: !0,
        measurePerformance: !1,
        showMissingIcons: !0
    };
    G.familyPrefix && (G.cssPrefix = G.familyPrefix);
    var K = k(k({}, c), G);
    K.autoReplaceSvg || (K.observeMutations = !1);
    var J = {};
    Object.keys(c).forEach(function(t) {
        Object.defineProperty(J, t, {
            enumerable: !0,
            set: function(n) {
                K[t] = n, Q.forEach(function(n) {
                    return n(J);
                });
            },
            get: function() {
                return K[t];
            }
        });
    }), Object.defineProperty(J, "familyPrefix", {
        enumerable: !0,
        set: function(n) {
            K.cssPrefix = n, Q.forEach(function(n) {
                return n(J);
            });
        },
        get: function() {
            return K.cssPrefix;
        }
    }), g.FontAwesomeConfig = J;
    var Q = [];
    var Z = x, $ = {
        size: 16,
        x: 0,
        y: 0,
        rotate: 0,
        flipX: !1,
        flipY: !1
    };
    var nn = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    function tn() {
        for (var n = 12, t = ""; 0 < n--; ) t += nn[62 * Math.random() | 0];
        return t;
    }
    function an(n) {
        for (var t = [], a = (n || []).length >>> 0; a--; ) t[a] = n[a];
        return t;
    }
    function en(n) {
        return n.classList ? an(n.classList) : (n.getAttribute("class") || "").split(" ").filter(function(n) {
            return n;
        });
    }
    function rn(n) {
        return "".concat(n).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function on(a) {
        return Object.keys(a || {}).reduce(function(n, t) {
            return n + "".concat(t, ": ").concat(a[t].trim(), ";");
        }, "");
    }
    function sn(n) {
        return n.size !== $.size || n.x !== $.x || n.y !== $.y || n.rotate !== $.rotate || n.flipX || n.flipY;
    }
    function cn() {
        var n, t, a = A, e = J.cssPrefix, i = J.replacementClass, r = ':root, :host {\n  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";\n  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";\n  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";\n  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";\n  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-counter-scale, 0.25));\n          transform: scale(var(--fa-counter-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(var(--fa-li-width, 2em) * -1);\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  -webkit-animation-name: fa-beat;\n          animation-name: fa-beat;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  -webkit-animation-name: fa-bounce;\n          animation-name: fa-bounce;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  -webkit-animation-name: fa-fade;\n          animation-name: fa-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  -webkit-animation-name: fa-beat-fade;\n          animation-name: fa-beat-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  -webkit-animation-name: fa-flip;\n          animation-name: fa-flip;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  -webkit-animation-name: fa-shake;\n          animation-name: fa-shake;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 2s);\n          animation-duration: var(--fa-animation-duration, 2s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));\n          animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    -webkit-animation-delay: -1ms;\n            animation-delay: -1ms;\n    -webkit-animation-duration: 1ms;\n            animation-duration: 1ms;\n    -webkit-animation-iteration-count: 1;\n            animation-iteration-count: 1;\n    transition-delay: 0s;\n    transition-duration: 0s;\n  }\n}\n@-webkit-keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@-webkit-keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@-webkit-keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@-webkit-keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@-webkit-keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@-webkit-keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  -webkit-transform: rotate(var(--fa-rotate-angle, none));\n          transform: rotate(var(--fa-rotate-angle, none));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse,\n.fa-duotone.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}';
        return "fa" === e && i === a || (n = new RegExp("\\.".concat("fa", "\\-"), "g"), 
        t = new RegExp("\\--".concat("fa", "\\-"), "g"), a = new RegExp("\\.".concat(a), "g"), 
        r = r.replace(n, ".".concat(e, "-")).replace(t, "--".concat(e, "-")).replace(a, ".".concat(i))), 
        r;
    }
    var fn = !1;
    function ln() {
        J.autoAddCss && !fn && (function(n) {
            if (n && y) {
                var t = h.createElement("style");
                t.setAttribute("type", "text/css"), t.innerHTML = n;
                for (var a = h.head.childNodes, e = null, i = a.length - 1; -1 < i; i--) {
                    var r = a[i], o = (r.tagName || "").toUpperCase();
                    -1 < [ "STYLE", "LINK" ].indexOf(o) && (e = r);
                }
                h.head.insertBefore(t, e);
            }
        }(cn()), fn = !0);
    }
    b = {
        mixout: function() {
            return {
                dom: {
                    css: cn,
                    insertCss: ln
                }
            };
        },
        hooks: function() {
            return {
                beforeDOMElementCreation: function() {
                    ln();
                },
                beforeI2svg: function() {
                    ln();
                }
            };
        }
    }, f = g || {};
    f[t] || (f[t] = {}), f[t].styles || (f[t].styles = {}), f[t].hooks || (f[t].hooks = {}), 
    f[t].shims || (f[t].shims = []);
    function un() {
        h.removeEventListener("DOMContentLoaded", un), bn = 1, dn.map(function(n) {
            return n();
        });
    }
    var mn = f[t], dn = [], bn = !1;
    function vn(n) {
        y && (bn ? setTimeout(n, 0) : dn.push(n));
    }
    function pn(n) {
        var a, t = n.tag, e = n.attributes, i = void 0 === e ? {} : e, e = n.children, e = void 0 === e ? [] : e;
        return "string" == typeof n ? rn(n) : "<".concat(t, " ").concat((a = i, Object.keys(a || {}).reduce(function(n, t) {
            return n + "".concat(t, '="').concat(rn(a[t]), '" ');
        }, "").trim()), ">").concat(e.map(pn).join(""), "</").concat(t, ">");
    }
    function gn(n, t, a) {
        if (n && n[t] && n[t][a]) return {
            prefix: t,
            iconName: a,
            icon: n[t][a]
        };
    }
    y && ((bn = (h.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(h.readyState)) || h.addEventListener("DOMContentLoaded", un));
    function hn(n, t, a, e) {
        for (var i, r, o = Object.keys(n), s = o.length, c = void 0 !== e ? yn(t, e) : t, f = void 0 === a ? (i = 1, 
        n[o[0]]) : (i = 0, a); i < s; i++) f = c(f, n[r = o[i]], r, n);
        return f;
    }
    var yn = function(i, r) {
        return function(n, t, a, e) {
            return i.call(r, n, t, a, e);
        };
    };
    function kn(n) {
        n = function(n) {
            for (var t = [], a = 0, e = n.length; a < e; ) {
                var i, r = n.charCodeAt(a++);
                55296 <= r && r <= 56319 && a < e ? 56320 == (64512 & (i = n.charCodeAt(a++))) ? t.push(((1023 & r) << 10) + (1023 & i) + 65536) : (t.push(r), 
                a--) : t.push(r);
            }
            return t;
        }(n);
        return 1 === n.length ? n[0].toString(16) : null;
    }
    function wn(e) {
        return Object.keys(e).reduce(function(n, t) {
            var a = e[t];
            return !!a.icon ? n[a.iconName] = a.icon : n[t] = a, n;
        }, {});
    }
    function xn(n, t, a) {
        var e = (2 < arguments.length && void 0 !== a ? a : {}).skipHooks, a = void 0 !== e && e, e = wn(t);
        "function" != typeof mn.hooks.addPack || a ? mn.styles[n] = k(k({}, mn.styles[n] || {}), e) : mn.hooks.addPack(n, wn(t)), 
        "fas" === n && xn("fa", t);
    }
    var An = mn.styles, On = mn.shims, Nn = (s(u = {}, I, Object.values(F[I])), s(u, L, Object.values(F[L])), 
    u), Pn = null, Cn = {}, Sn = {}, jn = {}, En = {}, zn = {}, Mn = (s(c = {}, I, Object.keys(T[I])), 
    s(c, L, Object.keys(T[L])), c);
    function In(n, t) {
        var a = t.split("-"), t = a[0], a = a.slice(1).join("-");
        return t !== n || "" === a || ~V.indexOf(a) ? null : a;
    }
    function Ln() {
        function n(e) {
            return hn(An, function(n, t, a) {
                return n[a] = hn(t, e, {}), n;
            }, {});
        }
        Cn = n(function(t, n, a) {
            return n[3] && (t[n[3]] = a), n[2] && n[2].filter(function(n) {
                return "number" == typeof n;
            }).forEach(function(n) {
                t[n.toString(16)] = a;
            }), t;
        }), Sn = n(function(t, n, a) {
            return t[a] = a, n[2] && n[2].filter(function(n) {
                return "string" == typeof n;
            }).forEach(function(n) {
                t[n] = a;
            }), t;
        }), zn = n(function(t, n, a) {
            n = n[2];
            return t[a] = a, n.forEach(function(n) {
                t[n] = a;
            }), t;
        });
        var i = "far" in An || J.autoFetchSvg, t = hn(On, function(n, t) {
            var a = t[0], e = t[1], t = t[2];
            return "far" !== e || i || (e = "fas"), "string" == typeof a && (n.names[a] = {
                prefix: e,
                iconName: t
            }), "number" == typeof a && (n.unicodes[a.toString(16)] = {
                prefix: e,
                iconName: t
            }), n;
        }, {
            names: {},
            unicodes: {}
        });
        jn = t.names, En = t.unicodes, Pn = Fn(J.styleDefault, {
            family: J.familyDefault
        });
    }
    function Yn(n, t) {
        return (Cn[n] || {})[t];
    }
    function Rn(n, t) {
        return (zn[n] || {})[t];
    }
    function Tn(n) {
        return jn[n] || {
            prefix: null,
            iconName: null
        };
    }
    f = function(n) {
        Pn = Fn(n.styleDefault, {
            family: J.familyDefault
        });
    }, Q.push(f), Ln();
    function Dn() {
        return {
            prefix: null,
            iconName: null,
            rest: []
        };
    }
    function Fn(n, t) {
        var a = (1 < arguments.length && void 0 !== t ? t : {}).family, t = void 0 === a ? I : a, a = T[t][n], a = D[t][n] || D[t][a], n = n in mn.styles ? n : null;
        return a || n || null;
    }
    var Hn = (s(t = {}, I, Object.keys(F[I])), s(t, L, Object.keys(F[L])), t);
    function Wn(n, t) {
        var t = (1 < arguments.length && void 0 !== t ? t : {}).skipLookups, e = void 0 !== t && t, i = (s(t = {}, I, "".concat(J.cssPrefix, "-").concat(I)), 
        s(t, L, "".concat(J.cssPrefix, "-").concat(L)), t), r = null, o = I;
        (n.includes(i[I]) || n.some(function(n) {
            return Hn[I].includes(n);
        })) && (o = I), (n.includes(i[L]) || n.some(function(n) {
            return Hn[L].includes(n);
        })) && (o = L);
        t = n.reduce(function(n, t) {
            var a = In(J.cssPrefix, t);
            return An[t] ? (t = Nn[o].includes(t) ? H[o][t] : t, r = t, n.prefix = t) : -1 < Mn[o].indexOf(t) ? (r = t, 
            n.prefix = Fn(t, {
                family: o
            })) : a ? n.iconName = a : t !== J.replacementClass && t !== i[I] && t !== i[L] && n.rest.push(t), 
            !e && n.prefix && n.iconName && (a = "fa" === r ? Tn(n.iconName) : {}, t = Rn(n.prefix, n.iconName), 
            a.prefix && (r = null), n.iconName = a.iconName || t || n.iconName, n.prefix = a.prefix || n.prefix, 
            "far" !== n.prefix || An.far || !An.fas || J.autoFetchSvg || (n.prefix = "fas")), 
            n;
        }, Dn());
        return (n.includes("fa-brands") || n.includes("fab")) && (t.prefix = "fab"), (n.includes("fa-duotone") || n.includes("fad")) && (t.prefix = "fad"), 
        t.prefix || o !== L || !An.fass && !J.autoFetchSvg || (t.prefix = "fass", t.iconName = Rn(t.prefix, t.iconName) || t.iconName), 
        "fa" !== t.prefix && "fa" !== r || (t.prefix = Pn || "fas"), t;
    }
    var u = function() {
        function n() {
            !function(n, t) {
                if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function");
            }(this, n), this.definitions = {};
        }
        var t, a, e;
        return t = n, (a = [ {
            key: "add",
            value: function() {
                for (var a = this, n = arguments.length, t = new Array(n), e = 0; e < n; e++) t[e] = arguments[e];
                var i = t.reduce(this._pullDefinitions, {});
                Object.keys(i).forEach(function(n) {
                    a.definitions[n] = k(k({}, a.definitions[n] || {}), i[n]), xn(n, i[n]);
                    var t = F[I][n];
                    t && xn(t, i[n]), Ln();
                });
            }
        }, {
            key: "reset",
            value: function() {
                this.definitions = {};
            }
        }, {
            key: "_pullDefinitions",
            value: function(i, n) {
                var r = n.prefix && n.iconName && n.icon ? {
                    0: n
                } : n;
                return Object.keys(r).map(function(n) {
                    var t = r[n], a = t.prefix, n = t.iconName, e = t.icon, t = e[2];
                    i[a] || (i[a] = {}), 0 < t.length && t.forEach(function(n) {
                        "string" == typeof n && (i[a][n] = e);
                    }), i[a][n] = e;
                }), i;
            }
        } ]) && r(t.prototype, a), e && r(t, e), Object.defineProperty(t, "prototype", {
            writable: !1
        }), n;
    }(), c = [], _n = {}, Un = {}, Xn = Object.keys(Un);
    function Bn(n, t) {
        for (var a = arguments.length, e = new Array(2 < a ? a - 2 : 0), i = 2; i < a; i++) e[i - 2] = arguments[i];
        return (_n[n] || []).forEach(function(n) {
            t = n.apply(null, [ t ].concat(e));
        }), t;
    }
    function qn(n) {
        for (var t = arguments.length, a = new Array(1 < t ? t - 1 : 0), e = 1; e < t; e++) a[e - 1] = arguments[e];
        (_n[n] || []).forEach(function(n) {
            n.apply(null, a);
        });
    }
    function Vn(n) {
        var t = n, n = Array.prototype.slice.call(arguments, 1);
        return Un[t] ? Un[t].apply(null, n) : void 0;
    }
    function Gn(n) {
        "fa" === n.prefix && (n.prefix = "fas");
        var t = n.iconName, n = n.prefix || Pn;
        if (t) return t = Rn(n, t) || t, gn(Kn.definitions, n, t) || gn(mn.styles, n, t);
    }
    var Kn = new u(), Jn = {
        noAuto: function() {
            J.autoReplaceSvg = !1, J.observeMutations = !1, qn("noAuto");
        },
        config: J,
        dom: {
            i2svg: function() {
                var n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                return y ? (qn("beforeI2svg", n), Vn("pseudoElements2svg", n), Vn("i2svg", n)) : Promise.reject("Operation requires a DOM of some kind.");
            },
            watch: function() {
                var n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = n.autoReplaceSvgRoot;
                !1 === J.autoReplaceSvg && (J.autoReplaceSvg = !0), J.observeMutations = !0, vn(function() {
                    Qn({
                        autoReplaceSvgRoot: t
                    }), qn("watch", n);
                });
            }
        },
        parse: {
            icon: function(n) {
                if (null === n) return null;
                if ("object" === i(n) && n.prefix && n.iconName) return {
                    prefix: n.prefix,
                    iconName: Rn(n.prefix, n.iconName) || n.iconName
                };
                if (Array.isArray(n) && 2 === n.length) {
                    var t = 0 === n[1].indexOf("fa-") ? n[1].slice(3) : n[1], a = Fn(n[0]);
                    return {
                        prefix: a,
                        iconName: Rn(a, t) || t
                    };
                }
                if ("string" == typeof n && (-1 < n.indexOf("".concat(J.cssPrefix, "-")) || n.match(W))) {
                    t = Wn(n.split(" "), {
                        skipLookups: !0
                    });
                    return {
                        prefix: t.prefix || Pn,
                        iconName: Rn(t.prefix, t.iconName) || t.iconName
                    };
                }
                return "string" == typeof n ? {
                    prefix: Pn,
                    iconName: Rn(Pn, n) || n
                } : void 0;
            }
        },
        library: Kn,
        findIconDefinition: Gn,
        toHtml: pn
    }, Qn = function() {
        var n = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).autoReplaceSvgRoot, n = void 0 === n ? h : n;
        (0 < Object.keys(mn.styles).length || J.autoFetchSvg) && y && J.autoReplaceSvg && Jn.dom.i2svg({
            node: n
        });
    };
    function Zn(t, n) {
        return Object.defineProperty(t, "abstract", {
            get: n
        }), Object.defineProperty(t, "html", {
            get: function() {
                return t.abstract.map(pn);
            }
        }), Object.defineProperty(t, "node", {
            get: function() {
                if (y) {
                    var n = h.createElement("div");
                    return n.innerHTML = t.html, n.children;
                }
            }
        }), t;
    }
    function $n(n) {
        var t = n.icons, a = t.main, e = t.mask, i = n.prefix, r = n.iconName, o = n.transform, s = n.symbol, c = n.title, f = n.maskId, l = n.titleId, u = n.extra, m = n.watchable, d = void 0 !== m && m, b = e.found ? e : a, t = b.width, n = b.height, m = "fak" === i, b = [ J.replacementClass, r ? "".concat(J.cssPrefix, "-").concat(r) : "" ].filter(function(n) {
            return -1 === u.classes.indexOf(n);
        }).filter(function(n) {
            return "" !== n || !!n;
        }).concat(u.classes).join(" "), b = {
            children: [],
            attributes: k(k({}, u.attributes), {}, {
                "data-prefix": i,
                "data-icon": r,
                class: b,
                role: u.attributes.role || "img",
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 ".concat(t, " ").concat(n)
            })
        }, n = m && !~u.classes.indexOf("fa-fw") ? {
            width: "".concat(t / n * 16 * .0625, "em")
        } : {};
        d && (b.attributes[O] = ""), c && (b.children.push({
            tag: "title",
            attributes: {
                id: b.attributes["aria-labelledby"] || "title-".concat(l || tn())
            },
            children: [ c ]
        }), delete b.attributes.title);
        var v, p, g, h, y, n = k(k({}, b), {}, {
            prefix: i,
            iconName: r,
            main: a,
            mask: e,
            maskId: f,
            transform: o,
            symbol: s,
            styles: k(k({}, n), u.styles)
        }), e = e.found && a.found ? Vn("generateAbstractMask", n) || {
            children: [],
            attributes: {}
        } : Vn("generateAbstractIcon", n) || {
            children: [],
            attributes: {}
        }, a = e.children, e = e.attributes;
        return n.children = a, n.attributes = e, s ? (p = (v = n).prefix, g = v.iconName, 
        h = v.children, y = v.attributes, v = !0 === (v = v.symbol) ? "".concat(p, "-").concat(J.cssPrefix, "-").concat(g) : v, 
        [ {
            tag: "svg",
            attributes: {
                style: "display: none;"
            },
            children: [ {
                tag: "symbol",
                attributes: k(k({}, y), {}, {
                    id: v
                }),
                children: h
            } ]
        } ]) : (g = (p = n).children, y = p.main, v = p.mask, h = p.attributes, n = p.styles, 
        sn(p = p.transform) && y.found && !v.found && (v = y.width / y.height / 2, y = .5, 
        h.style = on(k(k({}, n), {}, {
            "transform-origin": "".concat(v + p.x / 16, "em ").concat(y + p.y / 16, "em")
        }))), [ {
            tag: "svg",
            attributes: h,
            children: g
        } ]);
    }
    function nt(n) {
        var t = n.content, a = n.width, e = n.height, i = n.transform, r = n.title, o = n.extra, s = n.watchable, c = void 0 !== s && s, n = k(k(k({}, o.attributes), r ? {
            title: r
        } : {}), {}, {
            class: o.classes.join(" ")
        });
        c && (n[O] = "");
        s = k({}, o.styles);
        sn(i) && (s.transform = (o = (c = {
            transform: i,
            startCentered: !0,
            width: a,
            height: e
        }).transform, i = c.width, e = void 0 === (a = c.height) ? x : a, c = void 0 !== (a = c.startCentered) && a, 
        a = "", a += c && w ? "translate(".concat(o.x / Z - (void 0 === i ? x : i) / 2, "em, ").concat(o.y / Z - e / 2, "em) ") : c ? "translate(calc(-50% + ".concat(o.x / Z, "em), calc(-50% + ").concat(o.y / Z, "em)) ") : "translate(".concat(o.x / Z, "em, ").concat(o.y / Z, "em) "), 
        a += "scale(".concat(o.size / Z * (o.flipX ? -1 : 1), ", ").concat(o.size / Z * (o.flipY ? -1 : 1), ") "), 
        a += "rotate(".concat(o.rotate, "deg) ")), s["-webkit-transform"] = s.transform);
        s = on(s);
        0 < s.length && (n.style = s);
        s = [];
        return s.push({
            tag: "span",
            attributes: n,
            children: [ t ]
        }), r && s.push({
            tag: "span",
            attributes: {
                class: "sr-only"
            },
            children: [ r ]
        }), s;
    }
    var tt = mn.styles;
    function at(n) {
        var t = n[0], a = n[1], n = m(n.slice(4), 1)[0];
        return {
            found: !0,
            width: t,
            height: a,
            icon: Array.isArray(n) ? {
                tag: "g",
                attributes: {
                    class: "".concat(J.cssPrefix, "-").concat(q.GROUP)
                },
                children: [ {
                    tag: "path",
                    attributes: {
                        class: "".concat(J.cssPrefix, "-").concat(q.SECONDARY),
                        fill: "currentColor",
                        d: n[0]
                    }
                }, {
                    tag: "path",
                    attributes: {
                        class: "".concat(J.cssPrefix, "-").concat(q.PRIMARY),
                        fill: "currentColor",
                        d: n[1]
                    }
                } ]
            } : {
                tag: "path",
                attributes: {
                    fill: "currentColor",
                    d: n
                }
            }
        };
    }
    var et = {
        found: !1,
        width: 512,
        height: 512
    };
    function it(i, r) {
        var o = r;
        return "fa" === r && null !== J.styleDefault && (r = Pn), new Promise(function(n, t) {
            var a, e;
            Vn("missingIconAbstract");
            if ("fa" === o && (e = Tn(i) || {}, i = e.iconName || i, r = e.prefix || r), i && r && tt[r] && tt[r][i]) return n(at(tt[r][i]));
            a = i, e = r, M || J.showMissingIcons || !a || console.error('Icon with name "'.concat(a, '" and prefix "').concat(e, '" is missing.')), 
            n(k(k({}, et), {}, {
                icon: J.showMissingIcons && i && Vn("missingIconAbstract") || {}
            }));
        });
    }
    function rt() {}
    function ot(n) {
        st.mark("".concat(ct, " ").concat(n, " ends")), st.measure("".concat(ct, " ").concat(n), "".concat(ct, " ").concat(n, " begins"), "".concat(ct, " ").concat(n, " ends"));
    }
    var st = J.measurePerformance && d && d.mark && d.measure ? d : {
        mark: rt,
        measure: rt
    }, ct = 'FA "6.2.1"', ft = {
        begin: function(n) {
            return st.mark("".concat(ct, " ").concat(n, " begins")), function() {
                return ot(n);
            };
        },
        end: ot
    }, lt = function() {};
    function ut(n) {
        return "string" == typeof (n.getAttribute ? n.getAttribute(O) : null);
    }
    function mt(n) {
        return h.createElementNS("http://www.w3.org/2000/svg", n);
    }
    function dt(n) {
        return h.createElement(n);
    }
    var bt = {
        replace: function(n) {
            var t = n[0];
            t.parentNode && (n[1].forEach(function(n) {
                t.parentNode.insertBefore(function t(a, n) {
                    var n = (1 < arguments.length && void 0 !== n ? n : {}).ceFn, e = void 0 === n ? "svg" === a.tag ? mt : dt : n;
                    if ("string" == typeof a) return h.createTextNode(a);
                    var i = e(a.tag);
                    return Object.keys(a.attributes || []).forEach(function(n) {
                        i.setAttribute(n, a.attributes[n]);
                    }), (a.children || []).forEach(function(n) {
                        i.appendChild(t(n, {
                            ceFn: e
                        }));
                    }), i;
                }(n), t);
            }), null === t.getAttribute(O) && J.keepOriginalSource ? (n = h.createComment((n = " ".concat((n = t).outerHTML, " "), 
            n = "".concat(n, "Font Awesome fontawesome.com "))), t.parentNode.replaceChild(n, t)) : t.remove());
        },
        nest: function(n) {
            var t = n[0], a = n[1];
            if (~en(t).indexOf(J.replacementClass)) return bt.replace(n);
            var e = new RegExp("".concat(J.cssPrefix, "-.*"));
            delete a[0].attributes.id, a[0].attributes.class && (n = a[0].attributes.class.split(" ").reduce(function(n, t) {
                return (t === J.replacementClass || t.match(e) ? n.toSvg : n.toNode).push(t), n;
            }, {
                toNode: [],
                toSvg: []
            }), a[0].attributes.class = n.toSvg.join(" "), 0 === n.toNode.length ? t.removeAttribute("class") : t.setAttribute("class", n.toNode.join(" ")));
            a = a.map(pn).join("\n");
            t.setAttribute(O, ""), t.innerHTML = a;
        }
    };
    function vt(n) {
        n();
    }
    function pt(a, n) {
        var e = "function" == typeof n ? n : lt;
        0 === a.length ? e() : (J.mutateApproach === E ? g.requestAnimationFrame || vt : vt)(function() {
            var n = !0 !== J.autoReplaceSvg && bt[J.autoReplaceSvg] || bt.replace, t = ft.begin("mutate");
            a.map(n), t(), e();
        });
    }
    var gt = !1;
    function ht() {
        gt = !0;
    }
    function yt() {
        gt = !1;
    }
    var kt = null;
    function wt(n) {
        var r, o, t, s;
        v && J.observeMutations && (t = n.treeCallback, r = void 0 === t ? lt : t, t = n.nodeCallback, 
        o = void 0 === t ? lt : t, t = n.pseudoElementsCallback, s = void 0 === t ? lt : t, 
        n = void 0 === (n = n.observeMutationsRoot) ? h : n, kt = new v(function(n) {
            var i;
            gt || (i = Pn, an(n).forEach(function(n) {
                var t, a, e;
                "childList" === n.type && 0 < n.addedNodes.length && !ut(n.addedNodes[0]) && (J.searchPseudoElements && s(n.target), 
                r(n.target)), "attributes" === n.type && n.target.parentNode && J.searchPseudoElements && s(n.target.parentNode), 
                "attributes" === n.type && ut(n.target) && ~B.indexOf(n.attributeName) && ("class" === n.attributeName && (a = n.target, 
                e = a.getAttribute ? a.getAttribute(C) : null, a = a.getAttribute ? a.getAttribute(S) : null, 
                e && a) ? (a = (t = Wn(en(n.target))).prefix, t = t.iconName, n.target.setAttribute(C, a || i), 
                t && n.target.setAttribute(S, t)) : (t = n.target) && t.classList && t.classList.contains && t.classList.contains(J.replacementClass) && o(n.target));
            }));
        }), y && kt.observe(n, {
            childList: !0,
            attributes: !0,
            characterData: !0,
            subtree: !0
        }));
    }
    function xt(n) {
        var t = n.getAttribute("data-prefix"), a = n.getAttribute("data-icon"), e = void 0 !== n.innerText ? n.innerText.trim() : "", i = Wn(en(n));
        return i.prefix || (i.prefix = Pn), t && a && (i.prefix = t, i.iconName = a), i.iconName && i.prefix || (i.prefix && 0 < e.length && (i.iconName = (a = i.prefix, 
        e = n.innerText, (Sn[a] || {})[e] || Yn(i.prefix, kn(n.innerText)))), !i.iconName && J.autoFetchSvg && n.firstChild && n.firstChild.nodeType === Node.TEXT_NODE && (i.iconName = n.firstChild.data)), 
        i;
    }
    function At(n, t) {
        var a = 1 < arguments.length && void 0 !== t ? t : {
            styleParser: !0
        }, e = xt(n), i = e.iconName, r = e.prefix, o = e.rest, s = (t = an((s = n).attributes).reduce(function(n, t) {
            return "class" !== n.name && "style" !== n.name && (n[t.name] = t.value), n;
        }, {}), e = s.getAttribute("title"), s = s.getAttribute("data-fa-title-id"), J.autoA11y && (e ? t["aria-labelledby"] = "".concat(J.replacementClass, "-title-").concat(s || tn()) : (t["aria-hidden"] = "true", 
        t.focusable = "false")), t), t = Bn("parseNodeAttributes", {}, n), c = a.styleParser ? (a = (c = n).getAttribute("style"), 
        c = [], c = a ? a.split(";").reduce(function(n, t) {
            var a = t.split(":"), t = a[0], a = a.slice(1);
            return t && 0 < a.length && (n[t] = a.join(":").trim()), n;
        }, {}) : c) : [];
        return k({
            iconName: i,
            title: n.getAttribute("title"),
            titleId: n.getAttribute("data-fa-title-id"),
            prefix: r,
            transform: $,
            mask: {
                iconName: null,
                prefix: null,
                rest: []
            },
            maskId: null,
            symbol: !1,
            extra: {
                classes: o,
                styles: c,
                attributes: s
            }
        }, t);
    }
    var Ot = mn.styles;
    function Nt(n) {
        var t = "nest" === J.autoReplaceSvg ? At(n, {
            styleParser: !1
        }) : At(n);
        return ~t.extra.classes.indexOf(_) ? Vn("generateLayersText", n, t) : Vn("generateSvgReplacementMutation", n, t);
    }
    var Pt = new Set();
    function Ct(n) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
        if (!y) return Promise.resolve();
        function i(n) {
            return t.add("".concat(j, "-").concat(n));
        }
        function r(n) {
            return t.remove("".concat(j, "-").concat(n));
        }
        var t = h.documentElement.classList, a = J.autoFetchSvg ? Pt : Y.map(function(n) {
            return "fa-".concat(n);
        }).concat(Object.keys(Ot));
        a.includes("fa") || a.push("fa");
        var o = [ ".".concat(_, ":not([").concat(O, "])") ].concat(a.map(function(n) {
            return ".".concat(n, ":not([").concat(O, "])");
        })).join(", ");
        if (0 === o.length) return Promise.resolve();
        a = [];
        try {
            a = an(n.querySelectorAll(o));
        } catch (n) {}
        if (!(0 < a.length)) return Promise.resolve();
        i("pending"), r("complete");
        var s = ft.begin("onTree"), c = a.reduce(function(n, t) {
            try {
                var a = Nt(t);
                a && n.push(a);
            } catch (n) {
                M || "MissingIcon" === n.name && console.error(n);
            }
            return n;
        }, []);
        return new Promise(function(t, a) {
            Promise.all(c).then(function(n) {
                pt(n, function() {
                    i("active"), i("complete"), r("pending"), "function" == typeof e && e(), s(), t();
                });
            }).catch(function(n) {
                s(), a(n);
            });
        });
    }
    function St(n) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
        Nt(n).then(function(n) {
            n && pt([ n ], t);
        });
    }
    Y.map(function(n) {
        Pt.add("fa-".concat(n));
    }), Object.keys(T[I]).map(Pt.add.bind(Pt)), Object.keys(T[L]).map(Pt.add.bind(Pt));
    function jt(n) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, a = t.transform, e = void 0 === a ? $ : a, i = void 0 !== (a = t.symbol) && a, r = void 0 === (a = t.mask) ? null : a, o = void 0 === (a = t.maskId) ? null : a, s = void 0 === (a = t.title) ? null : a, c = void 0 === (a = t.titleId) ? null : a, f = void 0 === (a = t.classes) ? [] : a, l = void 0 === (a = t.attributes) ? {} : a, u = void 0 === (a = t.styles) ? {} : a;
        if (n) {
            var m = n.prefix, d = n.iconName, b = n.icon;
            return Zn(k({
                type: "icon"
            }, n), function() {
                return qn("beforeDOMElementCreation", {
                    iconDefinition: n,
                    params: t
                }), J.autoA11y && (s ? l["aria-labelledby"] = "".concat(J.replacementClass, "-title-").concat(c || tn()) : (l["aria-hidden"] = "true", 
                l.focusable = "false")), $n({
                    icons: {
                        main: at(b),
                        mask: r ? at(r.icon) : {
                            found: !1,
                            width: null,
                            height: null,
                            icon: {}
                        }
                    },
                    prefix: m,
                    iconName: d,
                    transform: k(k({}, $), e),
                    symbol: i,
                    title: s,
                    maskId: o,
                    titleId: c,
                    extra: {
                        attributes: l,
                        styles: u,
                        classes: f
                    }
                });
            });
        }
    }
    var Pt = l(Pt), f = {
        mixout: function() {
            return {
                icon: (e = jt, function(n) {
                    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, a = (n || {}).icon ? n : Gn(n || {}), n = (n = t.mask) && ((n || {}).icon ? n : Gn(n || {}));
                    return e(a, k(k({}, t), {}, {
                        mask: n
                    }));
                })
            };
            var e;
        },
        hooks: function() {
            return {
                mutationObserverCallbacks: function(n) {
                    return n.treeCallback = Ct, n.nodeCallback = St, n;
                }
            };
        },
        provides: function(n) {
            n.i2svg = function(n) {
                var t = n.node, n = n.callback;
                return Ct(void 0 === t ? h : t, void 0 === n ? function() {} : n);
            }, n.generateSvgReplacementMutation = function(e, n) {
                var i = n.iconName, r = n.title, o = n.titleId, s = n.prefix, c = n.transform, f = n.symbol, t = n.mask, l = n.maskId, u = n.extra;
                return new Promise(function(a, n) {
                    Promise.all([ it(i, s), t.iconName ? it(t.iconName, t.prefix) : Promise.resolve({
                        found: !1,
                        width: 512,
                        height: 512,
                        icon: {}
                    }) ]).then(function(n) {
                        var t = m(n, 2), n = t[0], t = t[1];
                        a([ e, $n({
                            icons: {
                                main: n,
                                mask: t
                            },
                            prefix: s,
                            iconName: i,
                            transform: c,
                            symbol: f,
                            maskId: l,
                            title: r,
                            titleId: o,
                            extra: u,
                            watchable: !0
                        }) ]);
                    }).catch(n);
                });
            }, n.generateAbstractIcon = function(n) {
                var t, a = n.children, e = n.attributes, i = n.main, r = n.transform, n = on(n.styles);
                return 0 < n.length && (e.style = n), sn(r) && (t = Vn("generateAbstractTransformGrouping", {
                    main: i,
                    transform: r,
                    containerWidth: i.width,
                    iconWidth: i.width
                })), a.push(t || i.icon), {
                    children: a,
                    attributes: e
                };
            };
        }
    }, t = {
        mixout: function() {
            return {
                layer: function(n) {
                    var a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, t = a.classes, e = void 0 === t ? [] : t;
                    return Zn({
                        type: "layer"
                    }, function() {
                        qn("beforeDOMElementCreation", {
                            assembler: n,
                            params: a
                        });
                        var t = [];
                        return n(function(n) {
                            Array.isArray(n) ? n.map(function(n) {
                                t = t.concat(n.abstract);
                            }) : t = t.concat(n.abstract);
                        }), [ {
                            tag: "span",
                            attributes: {
                                class: [ "".concat(J.cssPrefix, "-layers") ].concat(l(e)).join(" ")
                            },
                            children: t
                        } ];
                    });
                }
            };
        }
    }, u = {
        mixout: function() {
            return {
                counter: function(i) {
                    var r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, n = r.title, o = void 0 === n ? null : n, n = r.classes, s = void 0 === n ? [] : n, n = r.attributes, c = void 0 === n ? {} : n, n = r.styles, f = void 0 === n ? {} : n;
                    return Zn({
                        type: "counter",
                        content: i
                    }, function() {
                        return qn("beforeDOMElementCreation", {
                            content: i,
                            params: r
                        }), n = {
                            content: i.toString(),
                            title: o,
                            extra: {
                                attributes: c,
                                styles: f,
                                classes: [ "".concat(J.cssPrefix, "-layers-counter") ].concat(l(s))
                            }
                        }, t = n.content, a = n.title, e = n.extra, n = k(k(k({}, e.attributes), a ? {
                            title: a
                        } : {}), {}, {
                            class: e.classes.join(" ")
                        }), 0 < (e = on(e.styles)).length && (n.style = e), (e = []).push({
                            tag: "span",
                            attributes: n,
                            children: [ t ]
                        }), a && e.push({
                            tag: "span",
                            attributes: {
                                class: "sr-only"
                            },
                            children: [ a ]
                        }), e;
                        var n, t, a, e;
                    });
                }
            };
        }
    }, d = {
        mixout: function() {
            return {
                text: function(n) {
                    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, a = t.transform, e = void 0 === a ? $ : a, a = t.title, i = void 0 === a ? null : a, a = t.classes, r = void 0 === a ? [] : a, a = t.attributes, o = void 0 === a ? {} : a, a = t.styles, s = void 0 === a ? {} : a;
                    return Zn({
                        type: "text",
                        content: n
                    }, function() {
                        return qn("beforeDOMElementCreation", {
                            content: n,
                            params: t
                        }), nt({
                            content: n,
                            transform: k(k({}, $), e),
                            title: i,
                            extra: {
                                attributes: o,
                                styles: s,
                                classes: [ "".concat(J.cssPrefix, "-layers-text") ].concat(l(r))
                            }
                        });
                    });
                }
            };
        },
        provides: function(n) {
            n.generateLayersText = function(n, t) {
                var a, e = t.title, i = t.transform, r = t.extra, o = null, s = null;
                return w && (a = parseInt(getComputedStyle(n).fontSize, 10), o = (t = n.getBoundingClientRect()).width / a, 
                s = t.height / a), J.autoA11y && !e && (r.attributes["aria-hidden"] = "true"), Promise.resolve([ n, nt({
                    content: n.innerHTML,
                    width: o,
                    height: s,
                    transform: i,
                    title: e,
                    extra: r,
                    watchable: !0
                }) ]);
            };
        }
    }, Et = new RegExp('"', "ug"), zt = [ 1105920, 1112319 ];
    function Mt(b, v) {
        var p = "".concat(P).concat(v.replace(":", "-"));
        return new Promise(function(a, n) {
            if (null !== b.getAttribute(p)) return a();
            var e, i, r, o, t, s, c, f = an(b.children).filter(function(n) {
                return n.getAttribute(N) === v;
            })[0], l = g.getComputedStyle(b, v), u = l.getPropertyValue("font-family").match(U), m = l.getPropertyValue("font-weight"), d = l.getPropertyValue("content");
            if (f && !u) return b.removeChild(f), a();
            u && "none" !== d && "" !== d ? (s = l.getPropertyValue("content"), t = ~[ "Sharp" ].indexOf(u[2]) ? L : I, 
            e = ~[ "Solid", "Regular", "Light", "Thin", "Duotone", "Brands", "Kit" ].indexOf(u[2]) ? D[t][u[2].toLowerCase()] : X[t][m], 
            d = (l = (l = (d = s).replace(Et, ""), t = 0, s = (m = l).length, c = 55296 <= (d = m.charCodeAt(t)) && d <= 56319 && t + 1 < s && 56320 <= (c = m.charCodeAt(t + 1)) && c <= 57343 ? 1024 * (d - 55296) + c - 56320 + 65536 : d, 
            d = zt[0] <= c && c <= zt[1], {
                value: kn((c = 2 === l.length && l[0] === l[1]) ? l[0] : l),
                isSecondary: d || c
            })).value, c = l.isSecondary, l = u[0].startsWith("FontAwesome"), u = Yn(e, d), 
            i = u, l && (d = En[l = d], l = Yn("fas", l), (l = d || (l ? {
                prefix: "fas",
                iconName: l
            } : null) || {
                prefix: null,
                iconName: null
            }).iconName && l.prefix && (u = l.iconName, e = l.prefix)), !u || c || f && f.getAttribute(C) === e && f.getAttribute(S) === i ? a() : (b.setAttribute(p, i), 
            f && b.removeChild(f), (o = (r = {
                iconName: null,
                title: null,
                titleId: null,
                prefix: null,
                transform: $,
                symbol: !1,
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
            }).extra).attributes[N] = v, it(u, e).then(function(n) {
                var t = $n(k(k({}, r), {}, {
                    icons: {
                        main: n,
                        mask: Dn()
                    },
                    prefix: e,
                    iconName: i,
                    extra: o,
                    watchable: !0
                })), n = h.createElement("svg");
                "::before" === v ? b.insertBefore(n, b.firstChild) : b.appendChild(n), n.outerHTML = t.map(pn).join("\n"), 
                b.removeAttribute(p), a();
            }).catch(n))) : a();
        });
    }
    function It(n) {
        return Promise.all([ Mt(n, "::before"), Mt(n, "::after") ]);
    }
    function Lt(n) {
        return !(n.parentNode === document.head || ~z.indexOf(n.tagName.toUpperCase()) || n.getAttribute(N) || n.parentNode && "svg" === n.parentNode.tagName);
    }
    function Yt(i) {
        if (y) return new Promise(function(n, t) {
            var a = an(i.querySelectorAll("*")).filter(Lt).map(It), e = ft.begin("searchPseudoElements");
            ht(), Promise.all(a).then(function() {
                e(), yt(), n();
            }).catch(function() {
                e(), yt(), t();
            });
        });
    }
    function Rt(n) {
        return n.toLowerCase().split(" ").reduce(function(n, t) {
            var a = t.toLowerCase().split("-"), t = a[0], e = a.slice(1).join("-");
            if (t && "h" === e) return n.flipX = !0, n;
            if (t && "v" === e) return n.flipY = !0, n;
            if (e = parseFloat(e), isNaN(e)) return n;
            switch (t) {
              case "grow":
                n.size = n.size + e;
                break;

              case "shrink":
                n.size = n.size - e;
                break;

              case "left":
                n.x = n.x - e;
                break;

              case "right":
                n.x = n.x + e;
                break;

              case "up":
                n.y = n.y - e;
                break;

              case "down":
                n.y = n.y + e;
                break;

              case "rotate":
                n.rotate = n.rotate + e;
            }
            return n;
        }, {
            size: 16,
            x: 0,
            y: 0,
            flipX: !1,
            flipY: !1,
            rotate: 0
        });
    }
    var Tt = !1, Dt = {
        x: 0,
        y: 0,
        width: "100%",
        height: "100%"
    };
    function Ft(n) {
        return n.attributes && (n.attributes.fill || (!(1 < arguments.length && void 0 !== arguments[1]) || arguments[1])) && (n.attributes.fill = "black"), 
        n;
    }
    var Ht;
    Ht = {
        mixoutsTo: Jn
    }.mixoutsTo, c = [ b, f, t, u, d, {
        hooks: function() {
            return {
                mutationObserverCallbacks: function(n) {
                    return n.pseudoElementsCallback = Yt, n;
                }
            };
        },
        provides: function(n) {
            n.pseudoElements2svg = function(n) {
                n = n.node;
                J.searchPseudoElements && Yt(void 0 === n ? h : n);
            };
        }
    }, {
        mixout: function() {
            return {
                dom: {
                    unwatch: function() {
                        ht(), Tt = !0;
                    }
                }
            };
        },
        hooks: function() {
            return {
                bootstrap: function() {
                    wt(Bn("mutationObserverCallbacks", {}));
                },
                noAuto: function() {
                    kt && kt.disconnect();
                },
                watch: function(n) {
                    n = n.observeMutationsRoot;
                    Tt ? yt() : wt(Bn("mutationObserverCallbacks", {
                        observeMutationsRoot: n
                    }));
                }
            };
        }
    }, {
        mixout: function() {
            return {
                parse: {
                    transform: Rt
                }
            };
        },
        hooks: function() {
            return {
                parseNodeAttributes: function(n, t) {
                    t = t.getAttribute("data-fa-transform");
                    return t && (n.transform = Rt(t)), n;
                }
            };
        },
        provides: function(n) {
            n.generateAbstractTransformGrouping = function(n) {
                var t = n.main, a = n.transform, e = n.containerWidth, i = n.iconWidth, r = {
                    transform: "translate(".concat(e / 2, " 256)")
                }, n = "translate(".concat(32 * a.x, ", ").concat(32 * a.y, ") "), e = "scale(".concat(a.size / 16 * (a.flipX ? -1 : 1), ", ").concat(a.size / 16 * (a.flipY ? -1 : 1), ") "), a = "rotate(".concat(a.rotate, " 0 0)"), i = {
                    outer: r,
                    inner: {
                        transform: "".concat(n, " ").concat(e, " ").concat(a)
                    },
                    path: {
                        transform: "translate(".concat(i / 2 * -1, " -256)")
                    }
                };
                return {
                    tag: "g",
                    attributes: k({}, i.outer),
                    children: [ {
                        tag: "g",
                        attributes: k({}, i.inner),
                        children: [ {
                            tag: t.icon.tag,
                            children: t.icon.children,
                            attributes: k(k({}, t.icon.attributes), i.path)
                        } ]
                    } ]
                };
            };
        }
    }, {
        hooks: function() {
            return {
                parseNodeAttributes: function(n, t) {
                    var a = t.getAttribute("data-fa-mask"), a = a ? Wn(a.split(" ").map(function(n) {
                        return n.trim();
                    })) : Dn();
                    return a.prefix || (a.prefix = Pn), n.mask = a, n.maskId = t.getAttribute("data-fa-mask-id"), 
                    n;
                }
            };
        },
        provides: function(n) {
            n.generateAbstractMask = function(n) {
                var t = n.children, a = n.attributes, e = n.main, i = n.mask, r = n.maskId, o = n.transform, s = e.width, c = e.icon, f = i.width, n = i.icon, o = (i = (e = {
                    transform: o,
                    containerWidth: f,
                    iconWidth: s
                }).transform, o = e.containerWidth, f = e.iconWidth, s = {
                    transform: "translate(".concat(o / 2, " 256)")
                }, e = "translate(".concat(32 * i.x, ", ").concat(32 * i.y, ") "), o = "scale(".concat(i.size / 16 * (i.flipX ? -1 : 1), ", ").concat(i.size / 16 * (i.flipY ? -1 : 1), ") "), 
                i = "rotate(".concat(i.rotate, " 0 0)"), {
                    outer: s,
                    inner: {
                        transform: "".concat(e, " ").concat(o, " ").concat(i)
                    },
                    path: {
                        transform: "translate(".concat(f / 2 * -1, " -256)")
                    }
                }), i = {
                    tag: "rect",
                    attributes: k(k({}, Dt), {}, {
                        fill: "white"
                    })
                }, f = c.children ? {
                    children: c.children.map(Ft)
                } : {}, f = {
                    tag: "g",
                    attributes: k({}, o.inner),
                    children: [ Ft(k({
                        tag: c.tag,
                        attributes: k(k({}, c.attributes), o.path)
                    }, f)) ]
                }, o = {
                    tag: "g",
                    attributes: k({}, o.outer),
                    children: [ f ]
                }, f = "mask-".concat(r || tn()), r = "clip-".concat(r || tn()), o = {
                    tag: "mask",
                    attributes: k(k({}, Dt), {}, {
                        id: f,
                        maskUnits: "userSpaceOnUse",
                        maskContentUnits: "userSpaceOnUse"
                    }),
                    children: [ i, o ]
                }, o = {
                    tag: "defs",
                    children: [ {
                        tag: "clipPath",
                        attributes: {
                            id: r
                        },
                        children: "g" === (n = n).tag ? n.children : [ n ]
                    }, o ]
                };
                return t.push(o, {
                    tag: "rect",
                    attributes: k({
                        fill: "currentColor",
                        "clip-path": "url(#".concat(r, ")"),
                        mask: "url(#".concat(f, ")")
                    }, Dt)
                }), {
                    children: t,
                    attributes: a
                };
            };
        }
    }, {
        provides: function(n) {
            var r = !1;
            g.matchMedia && (r = g.matchMedia("(prefers-reduced-motion: reduce)").matches), 
            n.missingIconAbstract = function() {
                var n = [], t = {
                    fill: "currentColor"
                }, a = {
                    attributeType: "XML",
                    repeatCount: "indefinite",
                    dur: "2s"
                };
                n.push({
                    tag: "path",
                    attributes: k(k({}, t), {}, {
                        d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
                    })
                });
                var e = k(k({}, a), {}, {
                    attributeName: "opacity"
                }), i = {
                    tag: "circle",
                    attributes: k(k({}, t), {}, {
                        cx: "256",
                        cy: "364",
                        r: "28"
                    }),
                    children: []
                };
                return r || i.children.push({
                    tag: "animate",
                    attributes: k(k({}, a), {}, {
                        attributeName: "r",
                        values: "28;14;28;28;14;28;"
                    })
                }, {
                    tag: "animate",
                    attributes: k(k({}, e), {}, {
                        values: "1;0;1;1;0;1;"
                    })
                }), n.push(i), n.push({
                    tag: "path",
                    attributes: k(k({}, t), {}, {
                        opacity: "1",
                        d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
                    }),
                    children: r ? [] : [ {
                        tag: "animate",
                        attributes: k(k({}, e), {}, {
                            values: "1;0;0;0;0;1;"
                        })
                    } ]
                }), r || n.push({
                    tag: "path",
                    attributes: k(k({}, t), {}, {
                        opacity: "0",
                        d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
                    }),
                    children: [ {
                        tag: "animate",
                        attributes: k(k({}, e), {}, {
                            values: "0;0;1;1;0;0;"
                        })
                    } ]
                }), {
                    tag: "g",
                    attributes: {
                        class: "missing"
                    },
                    children: n
                };
            };
        }
    }, {
        hooks: function() {
            return {
                parseNodeAttributes: function(n, t) {
                    t = t.getAttribute("data-fa-symbol");
                    return n.symbol = null !== t && ("" === t || t), n;
                }
            };
        }
    } ], _n = {}, Object.keys(Un).forEach(function(n) {
        -1 === Xn.indexOf(n) && delete Un[n];
    }), c.forEach(function(n) {
        var t, a = n.mixout ? n.mixout() : {};
        Object.keys(a).forEach(function(t) {
            "function" == typeof a[t] && (Ht[t] = a[t]), "object" === i(a[t]) && Object.keys(a[t]).forEach(function(n) {
                Ht[t] || (Ht[t] = {}), Ht[t][n] = a[t][n];
            });
        }), n.hooks && (t = n.hooks(), Object.keys(t).forEach(function(n) {
            _n[n] || (_n[n] = []), _n[n].push(t[n]);
        })), n.provides && n.provides(Un);
    }), function(n) {
        try {
            for (var t = arguments.length, a = new Array(1 < t ? t - 1 : 0), e = 1; e < t; e++) a[e - 1] = arguments[e];
            n.apply(void 0, a);
        } catch (n) {
            if (!M) throw n;
        }
    }(function(n) {
        p && (g.FontAwesome || (g.FontAwesome = Jn), vn(function() {
            Qn(), qn("bootstrap");
        })), mn.hooks = k(k({}, mn.hooks), {}, {
            addPack: function(n, t) {
                mn.styles[n] = k(k({}, mn.styles[n] || {}), t), Ln(), Qn();
            },
            addPacks: function(n) {
                n.forEach(function(n) {
                    var t = m(n, 2), n = t[0], t = t[1];
                    mn.styles[n] = k(k({}, mn.styles[n] || {}), t);
                }), Ln(), Qn();
            },
            addShims: function(n) {
                var t;
                (t = mn.shims).push.apply(t, l(n)), Ln(), Qn();
            }
        });
    });
}();