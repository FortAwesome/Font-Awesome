/*!
 * Font Awesome Free 6.2.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2022 Fonticons, Inc.
 */
var t;

t = function() {
    "use strict";
    function o(e, t) {
        var n, o = Object.keys(e);
        return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(e), t && (n = n.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), o.push.apply(o, n)), o;
    }
    function a(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? o(Object(n), !0).forEach(function(t) {
                r(e, t, n[t]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : o(Object(n)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
            });
        }
        return e;
    }
    function e(t) {
        return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t;
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        })(t);
    }
    function r(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t;
    }
    function i(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, o = new Array(e); n < e; n++) o[n] = t[n];
        return o;
    }
    var t = {}, n = {};
    try {
        "undefined" != typeof window && (t = window), "undefined" != typeof document && (n = document);
    } catch (t) {}
    function c() {
        u.removeEventListener("DOMContentLoaded", c), g = 1, p.map(function(t) {
            return t();
        });
    }
    var s = (t.navigator || {}).userAgent, f = void 0 === s ? "" : s, l = t, u = n, d = !!l.document, m = !!u.documentElement && !!u.head && "function" == typeof u.addEventListener && "function" == typeof u.createElement, p = (~f.indexOf("MSIE") || f.indexOf("Trident/"), 
    []), g = !1;
    function h(t) {
        m && (g ? setTimeout(t, 0) : p.push(t));
    }
    m && ((g = (u.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(u.readyState)) || u.addEventListener("DOMContentLoaded", c));
    var b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    var y = (function(t) {
        function u(t, e) {
            var n = (65535 & t) + (65535 & e);
            return (t >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n;
        }
        function c(t, e, n, o, r, i) {
            return u((i = u(u(e, t), u(o, i))) << r | i >>> 32 - r, n);
        }
        function d(t, e, n, o, r, i, a) {
            return c(e & n | ~e & o, t, e, r, i, a);
        }
        function m(t, e, n, o, r, i, a) {
            return c(e & o | n & ~o, t, e, r, i, a);
        }
        function p(t, e, n, o, r, i, a) {
            return c(e ^ n ^ o, t, e, r, i, a);
        }
        function g(t, e, n, o, r, i, a) {
            return c(n ^ (e | ~o), t, e, r, i, a);
        }
        function a(t, e) {
            var n, o, r, i;
            t[e >> 5] |= 128 << e % 32, t[14 + (e + 64 >>> 9 << 4)] = e;
            for (var a = 1732584193, c = -271733879, s = -1732584194, f = 271733878, l = 0; l < t.length; l += 16) a = d(n = a, o = c, r = s, i = f, t[l], 7, -680876936), 
            f = d(f, a, c, s, t[l + 1], 12, -389564586), s = d(s, f, a, c, t[l + 2], 17, 606105819), 
            c = d(c, s, f, a, t[l + 3], 22, -1044525330), a = d(a, c, s, f, t[l + 4], 7, -176418897), 
            f = d(f, a, c, s, t[l + 5], 12, 1200080426), s = d(s, f, a, c, t[l + 6], 17, -1473231341), 
            c = d(c, s, f, a, t[l + 7], 22, -45705983), a = d(a, c, s, f, t[l + 8], 7, 1770035416), 
            f = d(f, a, c, s, t[l + 9], 12, -1958414417), s = d(s, f, a, c, t[l + 10], 17, -42063), 
            c = d(c, s, f, a, t[l + 11], 22, -1990404162), a = d(a, c, s, f, t[l + 12], 7, 1804603682), 
            f = d(f, a, c, s, t[l + 13], 12, -40341101), s = d(s, f, a, c, t[l + 14], 17, -1502002290), 
            a = m(a, c = d(c, s, f, a, t[l + 15], 22, 1236535329), s, f, t[l + 1], 5, -165796510), 
            f = m(f, a, c, s, t[l + 6], 9, -1069501632), s = m(s, f, a, c, t[l + 11], 14, 643717713), 
            c = m(c, s, f, a, t[l], 20, -373897302), a = m(a, c, s, f, t[l + 5], 5, -701558691), 
            f = m(f, a, c, s, t[l + 10], 9, 38016083), s = m(s, f, a, c, t[l + 15], 14, -660478335), 
            c = m(c, s, f, a, t[l + 4], 20, -405537848), a = m(a, c, s, f, t[l + 9], 5, 568446438), 
            f = m(f, a, c, s, t[l + 14], 9, -1019803690), s = m(s, f, a, c, t[l + 3], 14, -187363961), 
            c = m(c, s, f, a, t[l + 8], 20, 1163531501), a = m(a, c, s, f, t[l + 13], 5, -1444681467), 
            f = m(f, a, c, s, t[l + 2], 9, -51403784), s = m(s, f, a, c, t[l + 7], 14, 1735328473), 
            a = p(a, c = m(c, s, f, a, t[l + 12], 20, -1926607734), s, f, t[l + 5], 4, -378558), 
            f = p(f, a, c, s, t[l + 8], 11, -2022574463), s = p(s, f, a, c, t[l + 11], 16, 1839030562), 
            c = p(c, s, f, a, t[l + 14], 23, -35309556), a = p(a, c, s, f, t[l + 1], 4, -1530992060), 
            f = p(f, a, c, s, t[l + 4], 11, 1272893353), s = p(s, f, a, c, t[l + 7], 16, -155497632), 
            c = p(c, s, f, a, t[l + 10], 23, -1094730640), a = p(a, c, s, f, t[l + 13], 4, 681279174), 
            f = p(f, a, c, s, t[l], 11, -358537222), s = p(s, f, a, c, t[l + 3], 16, -722521979), 
            c = p(c, s, f, a, t[l + 6], 23, 76029189), a = p(a, c, s, f, t[l + 9], 4, -640364487), 
            f = p(f, a, c, s, t[l + 12], 11, -421815835), s = p(s, f, a, c, t[l + 15], 16, 530742520), 
            a = g(a, c = p(c, s, f, a, t[l + 2], 23, -995338651), s, f, t[l], 6, -198630844), 
            f = g(f, a, c, s, t[l + 7], 10, 1126891415), s = g(s, f, a, c, t[l + 14], 15, -1416354905), 
            c = g(c, s, f, a, t[l + 5], 21, -57434055), a = g(a, c, s, f, t[l + 12], 6, 1700485571), 
            f = g(f, a, c, s, t[l + 3], 10, -1894986606), s = g(s, f, a, c, t[l + 10], 15, -1051523), 
            c = g(c, s, f, a, t[l + 1], 21, -2054922799), a = g(a, c, s, f, t[l + 8], 6, 1873313359), 
            f = g(f, a, c, s, t[l + 15], 10, -30611744), s = g(s, f, a, c, t[l + 6], 15, -1560198380), 
            c = g(c, s, f, a, t[l + 13], 21, 1309151649), a = g(a, c, s, f, t[l + 4], 6, -145523070), 
            f = g(f, a, c, s, t[l + 11], 10, -1120210379), s = g(s, f, a, c, t[l + 2], 15, 718787259), 
            c = g(c, s, f, a, t[l + 9], 21, -343485551), a = u(a, n), c = u(c, o), s = u(s, r), 
            f = u(f, i);
            return [ a, c, s, f ];
        }
        function s(t) {
            for (var e = "", n = 32 * t.length, o = 0; o < n; o += 8) e += String.fromCharCode(t[o >> 5] >>> o % 32 & 255);
            return e;
        }
        function f(t) {
            var e = [];
            for (e[(t.length >> 2) - 1] = void 0, o = 0; o < e.length; o += 1) e[o] = 0;
            for (var n = 8 * t.length, o = 0; o < n; o += 8) e[o >> 5] |= (255 & t.charCodeAt(o / 8)) << o % 32;
            return e;
        }
        function o(t) {
            for (var e, n = "0123456789abcdef", o = "", r = 0; r < t.length; r += 1) e = t.charCodeAt(r), 
            o += n.charAt(e >>> 4 & 15) + n.charAt(15 & e);
            return o;
        }
        function n(t) {
            return unescape(encodeURIComponent(t));
        }
        function r(t) {
            return s(a(f(t = n(t)), 8 * t.length));
        }
        function i(t, e) {
            return function(t, e) {
                var n, o = f(t), r = [], i = [];
                for (r[15] = i[15] = void 0, 16 < o.length && (o = a(o, 8 * t.length)), n = 0; n < 16; n += 1) r[n] = 909522486 ^ o[n], 
                i[n] = 1549556828 ^ o[n];
                return e = a(r.concat(f(e)), 512 + 8 * e.length), s(a(i.concat(e), 640));
            }(n(t), n(e));
        }
        function e(t, e, n) {
            return e ? n ? i(e, t) : o(i(e, t)) : n ? r(t) : o(r(t));
        }
        var l;
        l = b, t.exports ? t.exports = e : l.md5 = e;
    }(z = {
        exports: {}
    }), z.exports);
    function w(t) {
        if (null !== t && "object" === e(t)) return t.src ? y(t.src) : t.href ? y(t.href) : t.innerText && "" !== t.innerText ? y(t.innerText) : void 0;
    }
    var v = "fa-kits-diag", A = "fa-kits-node-under-test", x = "data-md5", T = "data-fa-detection-ignore", O = "data-fa-detection-timeout", D = "data-fa-detection-results-collection-max-wait", E = function(t) {
        t.preventDefault(), t.stopPropagation();
    };
    function C(t) {
        var e = t.fn, i = void 0 === e ? function() {
            return !0;
        } : e, e = t.initialDuration, n = void 0 === e ? 1 : e, e = t.maxDuration, a = void 0 === e ? l.FontAwesomeDetection.timeout : e, e = t.showProgress, c = void 0 !== e && e, s = t.progressIndicator;
        return new Promise(function(o, r) {
            !function e(t, n) {
                setTimeout(function() {
                    var t = i();
                    c && console.info(s), t ? o(t) : (t = 250 + n) <= a ? e(250, t) : r("timeout");
                }, t);
            }(n, 0);
        });
    }
    function F(e) {
        for (var i = Array.from(u.scripts).filter(function(t) {
            return !t.hasAttribute(T) && t !== e;
        }), a = {}, t = 0; t < i.length; t++) !function(t) {
            var e = u.createElement("iframe");
            e.setAttribute("style", "display:none;");
            var n = u.createElement("script");
            n.setAttribute("id", A);
            var o = w(i[t]);
            n.setAttribute(x, o), a[o] = i[t], "" !== i[t].src && (n.src = i[t].src), "" !== i[t].innerText && (n.innerText = i[t].innerText), 
            n.async = !0;
            var r = u.createElement("script");
            r.setAttribute("id", v);
            t = "file://" === l.location.origin ? "*" : l.location.origin;
            r.innerText = "(".concat(function(n, o, r) {
                parent.FontAwesomeDetection.__pollUntil({
                    fn: function() {
                        return !!window.FontAwesomeConfig || !!window.FontAwesomeKitConfig;
                    }
                }).then(function() {
                    var t = document.getElementById(n);
                    parent.postMessage({
                        type: "fontawesome-conflict",
                        technology: "js",
                        src: t.src,
                        innerText: t.innerText,
                        tagName: t.tagName,
                        md5: o
                    }, r);
                }).catch(function(t) {
                    var e = document.getElementById(n);
                    "timeout" === t ? parent.postMessage({
                        type: "no-conflict",
                        src: e.src,
                        innerText: e.innerText,
                        tagName: e.tagName,
                        md5: o
                    }, r) : console.error(t);
                });
            }.toString(), ")('").concat(A, "', '").concat(o, "', '").concat(t, "');"), e.onload = function() {
                e.contentWindow.addEventListener("error", E, !0), e.contentDocument.head.appendChild(r), 
                e.contentDocument.head.appendChild(n);
            }, h(function() {
                return u.body.appendChild(e);
            });
        }(t);
        return a;
    }
    function k(t) {
        var e = t.nodesTested, t = t.nodesFound;
        l.FontAwesomeDetection = l.FontAwesomeDetection || {}, l.FontAwesomeDetection.nodesTested = e, 
        l.FontAwesomeDetection.nodesFound = t, l.FontAwesomeDetection.detectionDone = !0;
    }
    function j(t) {
        var e = 0 < arguments.length && void 0 !== t ? t : function() {}, n = {
            conflict: {},
            noConflict: {}
        };
        l.onmessage = function(t) {
            "file://" !== l.location.origin && t.origin !== l.location.origin || t && t.data && ("fontawesome-conflict" === t.data.type ? n.conflict[t.data.md5] = t.data : "no-conflict" === t.data.type && (n.noConflict[t.data.md5] = t.data));
        };
        var o = F(u.currentScript), t = function() {
            var t = Array.from(u.getElementsByTagName("link")).filter(function(t) {
                return !t.hasAttribute(T);
            }), e = Array.from(u.getElementsByTagName("style")).filter(function(t) {
                return !t.hasAttribute(T) && (!l.FontAwesomeConfig || !t.innerText.match(new RegExp("svg:not\\(:root\\)\\.".concat(l.FontAwesomeConfig.replacementClass))));
            });
            function n(t, e) {
                var n = u.createElement("iframe");
                n.setAttribute("style", "visibility: hidden; position: absolute; height: 0; width: 0;");
                var o = "fa-test-icon-" + e, r = u.createElement("i");
                r.setAttribute("class", "fa fa-coffee"), r.setAttribute("id", o);
                var i = u.createElement("script");
                i.setAttribute("id", v);
                var a = "file://" === l.location.origin ? "*" : l.location.origin;
                i.innerText = "(".concat(function(n, e, o, r) {
                    parent.FontAwesomeDetection.__pollUntil({
                        fn: function() {
                            var t = document.getElementById(e), t = window.getComputedStyle(t).getPropertyValue("font-family");
                            return !(!t.match(/FontAwesome/) && !t.match(/Font Awesome [56]/));
                        }
                    }).then(function() {
                        var t = document.getElementById(n);
                        parent.postMessage({
                            type: "fontawesome-conflict",
                            technology: "webfont",
                            href: t.href,
                            innerText: t.innerText,
                            tagName: t.tagName,
                            md5: o
                        }, r);
                    }).catch(function(t) {
                        var e = document.getElementById(n);
                        "timeout" === t ? parent.postMessage({
                            type: "no-conflict",
                            technology: "webfont",
                            href: e.src,
                            innerText: e.innerText,
                            tagName: e.tagName,
                            md5: o
                        }, r) : console.error(t);
                    });
                }.toString(), ")('").concat(A, "', '").concat(o || "foo", "', '").concat(e, "', '").concat(a, "');"), 
                n.onload = function() {
                    n.contentWindow.addEventListener("error", E, !0), n.contentDocument.head.appendChild(i), 
                    n.contentDocument.head.appendChild(t), n.contentDocument.body.appendChild(r);
                }, h(function() {
                    return u.body.appendChild(n);
                });
            }
            for (var o = {}, r = 0; r < t.length; r++) {
                var i = u.createElement("link");
                i.setAttribute("id", A), i.setAttribute("href", t[r].href), i.setAttribute("rel", t[r].rel);
                var a = w(t[r]);
                i.setAttribute(x, a), o[a] = t[r], n(i, a);
            }
            for (var c = 0; c < e.length; c++) {
                var s = u.createElement("style");
                s.setAttribute("id", A);
                var f = w(e[c]);
                s.setAttribute(x, f), s.innerText = e[c].innerText, o[f] = e[c], n(s, f);
            }
            return o;
        }(), r = a(a({}, o), t), i = Object.keys(o).length + Object.keys(t).length, t = l.FontAwesomeDetection.timeout + l.FontAwesomeDetection.resultsCollectionMaxWait;
        console.group("Font Awesome Detector"), 0 === i ? (console.info("%cAll Good!", "color: green; font-size: large"), 
        console.info("We didn't find anything that needs testing for conflicts. Ergo, no conflicts.")) : (console.info("Testing ".concat(i, " possible conflicts.")), 
        console.info("We'll wait about ".concat(Math.round(l.FontAwesomeDetection.timeout / 10) / 100, " seconds while testing these and\n") + "then up to another ".concat(Math.round(l.FontAwesomeDetection.resultsCollectionMaxWait / 10) / 100, " to allow the browser time\n") + "to accumulate the results. But we'll probably be outta here way before then.\n\n"), 
        console.info("You can adjust those durations by assigning values to these attributes on the <script> element that loads this detection:"), 
        console.info("\t%c".concat(O, "%c: milliseconds to wait for each test before deciding whether it's a conflict."), "font-weight: bold;", "font-size: normal;"), 
        console.info("\t%c".concat(D, "%c: milliseconds to wait for the browser to accumulate test results before giving up."), "font-weight: bold;", "font-size: normal;"), 
        C({
            maxDuration: t,
            showProgress: !0,
            progressIndicator: "waiting...",
            fn: function() {
                return Object.keys(n.conflict).length + Object.keys(n.noConflict).length >= i;
            }
        }).then(function() {
            console.info("DONE!"), k({
                nodesTested: n,
                nodesFound: r
            }), e({
                nodesTested: n,
                nodesFound: r
            }), console.groupEnd();
        }).catch(function(t) {
            "timeout" === t ? console.info("TIME OUT! We waited until we got tired. Here's what we found:") : (console.info("Whoops! We hit an error:", t), 
            console.info("Here's what we'd found up until that error:")), k({
                nodesTested: n,
                nodesFound: r
            }), e({
                nodesTested: n,
                nodesFound: r
            }), console.groupEnd();
        }));
    }
    var S = l.FontAwesomeDetection || {}, N = a(a(a({}, {
        report: function(t) {
            var e, n = t.nodesTested, o = t.nodesFound, r = {};
            for (e in o) n.conflict[e] || n.noConflict[e] || (r[e] = o[e]);
            if (0 < (t = Object.keys(n.conflict).length)) {
                console.info("%cConflict".concat(1 < t ? "s" : "", " found:"), "color: darkred; font-size: large");
                var i, a = {};
                for (i in n.conflict) {
                    var c = n.conflict[i];
                    a[i] = {
                        tagName: c.tagName,
                        "src/href": c.src || c.href || "n/a",
                        "innerText excerpt": c.innerText && "" !== c.innerText ? c.innerText.slice(0, 200) + "..." : "(empty)"
                    };
                }
                console.table(a);
            }
            if (0 < (t = Object.keys(n.noConflict).length)) {
                console.info("%cNo conflict".concat(1 < t ? "s" : "", " found with ").concat(1 === t ? "this" : "these", ":"), "color: green; font-size: large");
                var s, f = {};
                for (s in n.noConflict) {
                    var l = n.noConflict[s];
                    f[s] = {
                        tagName: l.tagName,
                        "src/href": l.src || l.href || "n/a",
                        "innerText excerpt": l.innerText && "" !== l.innerText ? l.innerText.slice(0, 200) + "..." : "(empty)"
                    };
                }
                console.table(f);
            }
            if (0 < (t = Object.keys(r).length)) {
                console.info("%cLeftovers--we timed out before collecting test results for ".concat(1 === t ? "this" : "these", ":"), "color: blue; font-size: large");
                var u, d = {};
                for (u in r) {
                    var m = r[u];
                    d[u] = {
                        tagName: m.tagName,
                        "src/href": m.src || m.href || "n/a",
                        "innerText excerpt": m.innerText && "" !== m.innerText ? m.innerText.slice(0, 200) + "..." : "(empty)"
                    };
                }
                console.table(d);
            }
        },
        timeout: +(u.currentScript.getAttribute(O) || "2000"),
        resultsCollectionMaxWait: +(u.currentScript.getAttribute(D) || "5000")
    }), S), {}, {
        __pollUntil: C,
        md5ForNode: w,
        detectionDone: !1,
        nodesTested: null,
        nodesFound: null
    });
    l.FontAwesomeDetection = N;
    var P = function() {
        try {
            return "production" === process.env.NODE_ENV;
        } catch (t) {
            return !1;
        }
    }(), M = "classic", I = "sharp", W = [ M, I ];
    function B(t) {
        return new Proxy(t, {
            get: function(t, e) {
                return e in t ? t[e] : t[M];
            }
        });
    }
    B((r(L = {}, M, {
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
    }), r(L, I, {
        fa: "solid",
        fass: "solid",
        "fa-solid": "solid"
    }), L));
    var t = B((r(s = {}, M, {
        solid: "fas",
        regular: "far",
        light: "fal",
        thin: "fat",
        duotone: "fad",
        brands: "fab",
        kit: "fak"
    }), r(s, I, {
        solid: "fass"
    }), s)), S = (B((r(n = {}, M, {
        fab: "fa-brands",
        fad: "fa-duotone",
        fak: "fa-kit",
        fal: "fa-light",
        far: "fa-regular",
        fas: "fa-solid",
        fat: "fa-thin"
    }), r(n, I, {
        fass: "fa-solid"
    }), n)), B((r(f = {}, M, {
        "fa-brands": "fab",
        "fa-duotone": "fad",
        "fa-kit": "fak",
        "fa-light": "fal",
        "fa-regular": "far",
        "fa-solid": "fas",
        "fa-thin": "fat"
    }), r(f, I, {
        "fa-solid": "fass"
    }), f)), B((r(z = {}, M, {
        900: "fas",
        400: "far",
        normal: "far",
        300: "fal",
        100: "fat"
    }), r(z, I, {
        900: "fass"
    }), z)), [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]), N = S.concat([ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]), L = "duotone-group", s = "swap-opacity", n = "primary", f = "secondary", z = new Set();
    Object.keys(t[M]).map(z.add.bind(z)), Object.keys(t[I]).map(z.add.bind(z));
    [].concat(W, function(t) {
        if (Array.isArray(t)) return i(t);
    }(z = z) || function(t) {
        if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t);
    }(z) || function(t, e) {
        if (t) {
            if ("string" == typeof t) return i(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            return "Map" === (n = "Object" === n && t.constructor ? t.constructor.name : n) || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? i(t, e) : void 0;
        }
    }(z) || function() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }(), [ "2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", L, s, n, f ]).concat(S.map(function(t) {
        return "".concat(t, "x");
    })).concat(N.map(function(t) {
        return "w-".concat(t);
    }));
    !function(t) {
        try {
            for (var e = arguments.length, n = new Array(1 < e ? e - 1 : 0), o = 1; o < e; o++) n[o - 1] = arguments[o];
            t.apply(void 0, n);
        } catch (t) {
            if (!P) throw t;
        }
    }(function() {
        d && m && j(window.FontAwesomeDetection.report);
    });
}, ("object" != typeof exports || "undefined" == typeof module) && "function" == typeof define && define.amd ? define(t) : t();