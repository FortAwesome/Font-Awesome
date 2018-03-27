/*!
 * Font Awesome Free 5.0.9 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */
!function() {
    "use strict";
    var t = function() {}, e = {}, n = {}, r = null, i = {
        mark: t,
        measure: t
    };
    try {
        "undefined" != typeof window && (e = window), "undefined" != typeof document && (n = document), 
        "undefined" != typeof MutationObserver && (r = MutationObserver), "undefined" != typeof performance && (i = performance);
    } catch (t) {}
    var a = (e.navigator || {}).userAgent, o = void 0 === a ? "" : a, s = e, c = n, f = r, l = i, u = !!s.document, m = !!c.documentElement && !!c.head && "function" == typeof c.addEventListener && "function" == typeof c.createElement, k = ~o.indexOf("MSIE") || ~o.indexOf("Trident/"), d = "___FONT_AWESOME___", z = 16, g = "svg-inline--fa", C = "data-fa-i2svg", h = "data-fa-pseudo-element", p = "fontawesome-i2svg", v = function() {
        try {
            return !1;
        } catch (t) {
            return !1;
        }
    }(), b = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], y = b.concat([ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]), w = [ "class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask" ], x = [ "xs", "sm", "lg", "fw", "ul", "li", "border", "pull-left", "pull-right", "spin", "pulse", "rotate-90", "rotate-180", "rotate-270", "flip-horizontal", "flip-vertical", "stack", "stack-1x", "stack-2x", "inverse", "layers", "layers-text", "layers-counter" ].concat(b.map(function(t) {
        return t + "x";
    })).concat(y.map(function(t) {
        return "w-" + t;
    })), N = function(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }, M = function() {
        function r(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                Object.defineProperty(t, r.key, r);
            }
        }
        return function(t, e, n) {
            return e && r(t.prototype, e), n && r(t, n), t;
        };
    }(), A = Object.assign || function(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
        }
        return t;
    }, O = function(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
            return n;
        }
        return Array.from(t);
    }, L = s.FontAwesomeConfig || {}, E = Object.keys(L), j = A({
        familyPrefix: "fa",
        replacementClass: g,
        autoReplaceSvg: !0,
        autoAddCss: !0,
        autoA11y: !0,
        searchPseudoElements: !1,
        observeMutations: !0,
        keepOriginalSource: !0,
        measurePerformance: !1,
        showMissingIcons: !0
    }, L);
    j.autoReplaceSvg || (j.observeMutations = !1);
    var S = A({}, j);
    function P(e) {
        var t = (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}).asNewDefault, n = void 0 !== t && t, r = Object.keys(S), i = n ? function(t) {
            return ~r.indexOf(t) && !~E.indexOf(t);
        } : function(t) {
            return ~r.indexOf(t);
        };
        Object.keys(e).forEach(function(t) {
            i(t) && (S[t] = e[t]);
        });
    }
    s.FontAwesomeConfig = S;
    var T = s || {};
    T[d] || (T[d] = {}), T[d].styles || (T[d].styles = {}), T[d].hooks || (T[d].hooks = {}), 
    T[d].shims || (T[d].shims = []);
    var I = T[d], B = [], D = !1;
    m && ((D = (c.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(c.readyState)) || c.addEventListener("DOMContentLoaded", function t() {
        c.removeEventListener("DOMContentLoaded", t), D = 1, B.map(function(t) {
            return t();
        });
    }));
    var X = function(t) {
        m && (D ? setTimeout(t, 0) : B.push(t));
    }, R = z, H = {
        size: 16,
        x: 0,
        y: 0,
        rotate: 0,
        flipX: !1,
        flipY: !1
    };
    function F(t) {
        if (t && m) {
            var e = c.createElement("style");
            e.setAttribute("type", "text/css"), e.innerHTML = t;
            for (var n = c.head.childNodes, r = null, i = n.length - 1; -1 < i; i--) {
                var a = n[i], o = (a.tagName || "").toUpperCase();
                -1 < [ "STYLE", "LINK" ].indexOf(o) && (r = a);
            }
            return c.head.insertBefore(e, r), t;
        }
    }
    var _ = 0;
    function W() {
        return ++_;
    }
    function Y(t) {
        for (var e = [], n = (t || []).length >>> 0; n--; ) e[n] = t[n];
        return e;
    }
    function U(t) {
        return t.classList ? Y(t.classList) : (t.getAttribute("class") || "").split(" ").filter(function(t) {
            return t;
        });
    }
    function V(t, e) {
        var n, r = e.split("-"), i = r[0], a = r.slice(1).join("-");
        return i !== t || "" === a || (n = a, ~x.indexOf(n)) ? null : a;
    }
    function q(t) {
        return ("" + t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function K(n) {
        return Object.keys(n || {}).reduce(function(t, e) {
            return t + (e + ": ") + n[e] + ";";
        }, "");
    }
    function G(t) {
        return t.size !== H.size || t.x !== H.x || t.y !== H.y || t.rotate !== H.rotate || t.flipX || t.flipY;
    }
    function J(t) {
        var e = t.transform, n = t.containerWidth, r = t.iconWidth;
        return {
            outer: {
                transform: "translate(" + n / 2 + " 256)"
            },
            inner: {
                transform: "translate(" + 32 * e.x + ", " + 32 * e.y + ") " + " " + ("scale(" + e.size / 16 * (e.flipX ? -1 : 1) + ", " + e.size / 16 * (e.flipY ? -1 : 1) + ") ") + " " + ("rotate(" + e.rotate + " 0 0)")
            },
            path: {
                transform: "translate(" + r / 2 * -1 + " -256)"
            }
        };
    }
    var Q = {
        x: 0,
        y: 0,
        width: "100%",
        height: "100%"
    }, Z = function(t) {
        var e = t.children, n = t.attributes, r = t.main, i = t.mask, a = t.transform, o = r.width, s = r.icon, f = i.width, l = i.icon, c = J({
            transform: a,
            containerWidth: f,
            iconWidth: o
        }), u = {
            tag: "rect",
            attributes: A({}, Q, {
                fill: "white"
            })
        }, m = {
            tag: "g",
            attributes: A({}, c.inner),
            children: [ {
                tag: "path",
                attributes: A({}, s.attributes, c.path, {
                    fill: "black"
                })
            } ]
        }, d = {
            tag: "g",
            attributes: A({}, c.outer),
            children: [ m ]
        }, g = "mask-" + W(), h = "clip-" + W(), p = {
            tag: "defs",
            children: [ {
                tag: "clipPath",
                attributes: {
                    id: h
                },
                children: [ l ]
            }, {
                tag: "mask",
                attributes: A({}, Q, {
                    id: g,
                    maskUnits: "userSpaceOnUse",
                    maskContentUnits: "userSpaceOnUse"
                }),
                children: [ u, d ]
            } ]
        };
        return e.push(p, {
            tag: "rect",
            attributes: A({
                fill: "currentColor",
                "clip-path": "url(#" + h + ")",
                mask: "url(#" + g + ")"
            }, Q)
        }), {
            children: e,
            attributes: n
        };
    }, $ = function(t) {
        var e = t.children, n = t.attributes, r = t.main, i = t.transform, a = K(t.styles);
        if (0 < a.length && (n.style = a), G(i)) {
            var o = J({
                transform: i,
                containerWidth: r.width,
                iconWidth: r.width
            });
            e.push({
                tag: "g",
                attributes: A({}, o.outer),
                children: [ {
                    tag: "g",
                    attributes: A({}, o.inner),
                    children: [ {
                        tag: r.icon.tag,
                        children: r.icon.children,
                        attributes: A({}, r.icon.attributes, o.path)
                    } ]
                } ]
            });
        } else e.push(r.icon);
        return {
            children: e,
            attributes: n
        };
    }, tt = function(t) {
        var e = t.children, n = t.main, r = t.mask, i = t.attributes, a = t.styles, o = t.transform;
        if (G(o) && n.found && !r.found) {
            var s = n.width / n.height / 2, f = .5;
            i.style = K(A({}, a, {
                "transform-origin": s + o.x / 16 + "em " + (f + o.y / 16) + "em"
            }));
        }
        return [ {
            tag: "svg",
            attributes: i,
            children: e
        } ];
    }, et = function(t) {
        var e = t.prefix, n = t.iconName, r = t.children, i = t.attributes, a = t.symbol, o = !0 === a ? e + "-" + S.familyPrefix + "-" + n : a;
        return [ {
            tag: "svg",
            attributes: {
                style: "display: none;"
            },
            children: [ {
                tag: "symbol",
                attributes: A({}, i, {
                    id: o
                }),
                children: r
            } ]
        } ];
    };
    function nt(t) {
        var e = t.icons, n = e.main, r = e.mask, i = t.prefix, a = t.iconName, o = t.transform, s = t.symbol, f = t.title, l = t.extra, c = t.watchable, u = void 0 !== c && c, m = r.found ? r : n, d = m.width, g = m.height, h = "fa-w-" + Math.ceil(d / g * 16), p = [ S.replacementClass, a ? S.familyPrefix + "-" + a : "", h ].concat(l.classes).join(" "), v = {
            children: [],
            attributes: A({}, l.attributes, {
                "data-prefix": i,
                "data-icon": a,
                class: p,
                role: "img",
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 " + d + " " + g
            })
        };
        u && (v.attributes[C] = ""), f && v.children.push({
            tag: "title",
            attributes: {
                id: v.attributes["aria-labelledby"] || "title-" + W()
            },
            children: [ f ]
        });
        var b = A({}, v, {
            prefix: i,
            iconName: a,
            main: n,
            mask: r,
            transform: o,
            symbol: s,
            styles: l.styles
        }), y = r.found && n.found ? Z(b) : $(b), w = y.children, x = y.attributes;
        return b.children = w, b.attributes = x, s ? et(b) : tt(b);
    }
    function rt(t) {
        var e = t.content, n = t.width, r = t.height, i = t.transform, a = t.title, o = t.extra, s = t.watchable, f = void 0 !== s && s, l = A({}, o.attributes, a ? {
            title: a
        } : {}, {
            class: o.classes.join(" ")
        });
        f && (l[C] = "");
        var c, u, m, d, g, h, p, v, b, y = A({}, o.styles);
        G(i) && (y.transform = (u = (c = {
            transform: i,
            startCentered: !0,
            width: n,
            height: r
        }).transform, m = c.width, d = void 0 === m ? z : m, g = c.height, h = void 0 === g ? z : g, 
        p = c.startCentered, b = "", b += (v = void 0 !== p && p) && k ? "translate(" + (u.x / R - d / 2) + "em, " + (u.y / R - h / 2) + "em) " : v ? "translate(calc(-50% + " + u.x / R + "em), calc(-50% + " + u.y / R + "em)) " : "translate(" + u.x / R + "em, " + u.y / R + "em) ", 
        b += "scale(" + u.size / R * (u.flipX ? -1 : 1) + ", " + u.size / R * (u.flipY ? -1 : 1) + ") ", 
        b += "rotate(" + u.rotate + "deg) "), y["-webkit-transform"] = y.transform);
        var w = K(y);
        0 < w.length && (l.style = w);
        var x = [];
        return x.push({
            tag: "span",
            attributes: l,
            children: [ e ]
        }), a && x.push({
            tag: "span",
            attributes: {
                class: "sr-only"
            },
            children: [ a ]
        }), x;
    }
    var it = function() {}, at = S.measurePerformance && l && l.mark && l.measure ? l : {
        mark: it,
        measure: it
    }, ot = 'FA "5.0.9"', st = function(t) {
        at.mark(ot + " " + t + " ends"), at.measure(ot + " " + t, ot + " " + t + " begins", ot + " " + t + " ends");
    }, ft = {
        begin: function(t) {
            return at.mark(ot + " " + t + " begins"), function() {
                return st(t);
            };
        },
        end: st
    }, lt = function(t, e, n, r) {
        var i, a, o, s, f, l = Object.keys(t), c = l.length, u = void 0 !== r ? (s = e, 
        f = r, function(t, e, n, r) {
            return s.call(f, t, e, n, r);
        }) : e;
        for (void 0 === n ? (i = 1, o = t[l[0]]) : (i = 0, o = n); i < c; i++) o = u(o, t[a = l[i]], a, t);
        return o;
    }, ct = I.styles, ut = I.shims, mt = {}, dt = {}, gt = {}, ht = function() {
        var t = function(r) {
            return lt(ct, function(t, e, n) {
                return t[n] = lt(e, r, {}), t;
            }, {});
        };
        mt = t(function(t, e, n) {
            return t[e[3]] = n, t;
        }), dt = t(function(e, t, n) {
            var r = t[2];
            return e[n] = n, r.forEach(function(t) {
                e[t] = n;
            }), e;
        });
        var a = "far" in ct;
        gt = lt(ut, function(t, e) {
            var n = e[0], r = e[1], i = e[2];
            return "far" !== r || a || (r = "fas"), t[n] = {
                prefix: r,
                iconName: i
            }, t;
        }, {});
    };
    ht();
    var pt = I.styles, vt = function() {
        return {
            prefix: null,
            iconName: null,
            rest: []
        };
    };
    function bt(t) {
        return t.reduce(function(t, e) {
            var n = V(S.familyPrefix, e);
            if (pt[e]) t.prefix = e; else if (n) {
                var r = "fa" === t.prefix ? gt[n] || {
                    prefix: null,
                    iconName: null
                } : {};
                t.iconName = r.iconName || n, t.prefix = r.prefix || t.prefix;
            } else e !== S.replacementClass && 0 !== e.indexOf("fa-w-") && t.rest.push(e);
            return t;
        }, vt());
    }
    function yt(t, e, n) {
        if (t && t[e] && t[e][n]) return {
            prefix: e,
            iconName: n,
            icon: t[e][n]
        };
    }
    function wt(t) {
        var n, e = t.tag, r = t.attributes, i = void 0 === r ? {} : r, a = t.children, o = void 0 === a ? [] : a;
        return "string" == typeof t ? q(t) : "<" + e + " " + (n = i, Object.keys(n || {}).reduce(function(t, e) {
            return t + (e + '="') + q(n[e]) + '" ';
        }, "").trim()) + ">" + o.map(wt).join("") + "</" + e + ">";
    }
    var xt = function() {};
    function kt(t) {
        return "string" == typeof (t.getAttribute ? t.getAttribute(C) : null);
    }
    var zt = {
        replace: function(t) {
            var e = t[0], n = t[1].map(function(t) {
                return wt(t);
            }).join("\n");
            if (e.parentNode && e.outerHTML) e.outerHTML = n + (S.keepOriginalSource && "svg" !== e.tagName.toLowerCase() ? "\x3c!-- " + e.outerHTML + " --\x3e" : ""); else if (e.parentNode) {
                var r = document.createElement("span");
                e.parentNode.replaceChild(r, e), r.outerHTML = n;
            }
        },
        nest: function(t) {
            var e = t[0], n = t[1];
            if (~U(e).indexOf(S.replacementClass)) return zt.replace(t);
            var r = new RegExp(S.familyPrefix + "-.*");
            delete n[0].attributes.style;
            var i = n[0].attributes.class.split(" ").reduce(function(t, e) {
                return e === S.replacementClass || e.match(r) ? t.toSvg.push(e) : t.toNode.push(e), 
                t;
            }, {
                toNode: [],
                toSvg: []
            });
            n[0].attributes.class = i.toSvg.join(" ");
            var a = n.map(function(t) {
                return wt(t);
            }).join("\n");
            e.setAttribute("class", i.toNode.join(" ")), e.setAttribute(C, ""), e.innerHTML = a;
        }
    };
    function Ct(n, t) {
        var r = "function" == typeof t ? t : xt;
        0 === n.length ? r() : (s.requestAnimationFrame || function(t) {
            return t();
        })(function() {
            var t = !0 === S.autoReplaceSvg ? zt.replace : zt[S.autoReplaceSvg] || zt.replace, e = ft.begin("mutate");
            n.map(t), e(), r();
        });
    }
    var Nt = !1;
    var Mt = null;
    var At = function(t) {
        var e = t.getAttribute("style"), n = [];
        return e && (n = e.split(";").reduce(function(t, e) {
            var n = e.split(":"), r = n[0], i = n.slice(1);
            return r && 0 < i.length && (t[r] = i.join(":").trim()), t;
        }, {})), n;
    };
    var Ot = function(t) {
        var e, n, r, i, a = t.getAttribute("data-prefix"), o = t.getAttribute("data-icon"), s = void 0 !== t.innerText ? t.innerText.trim() : "", f = bt(U(t));
        return a && o && (f.prefix = a, f.iconName = o), f.prefix && 1 < s.length ? f.iconName = (r = f.prefix, 
        i = t.innerText, dt[r][i]) : f.prefix && 1 === s.length && (f.iconName = (e = f.prefix, 
        n = function(t) {
            for (var e = "", n = 0; n < t.length; n++) e += ("000" + t.charCodeAt(n).toString(16)).slice(-4);
            return e;
        }(t.innerText), mt[e][n])), f;
    }, Lt = function(t) {
        var e = {
            size: 16,
            x: 0,
            y: 0,
            flipX: !1,
            flipY: !1,
            rotate: 0
        };
        return t ? t.toLowerCase().split(" ").reduce(function(t, e) {
            var n = e.toLowerCase().split("-"), r = n[0], i = n.slice(1).join("-");
            if (r && "h" === i) return t.flipX = !0, t;
            if (r && "v" === i) return t.flipY = !0, t;
            if (i = parseFloat(i), isNaN(i)) return t;
            switch (r) {
              case "grow":
                t.size = t.size + i;
                break;

              case "shrink":
                t.size = t.size - i;
                break;

              case "left":
                t.x = t.x - i;
                break;

              case "right":
                t.x = t.x + i;
                break;

              case "up":
                t.y = t.y - i;
                break;

              case "down":
                t.y = t.y + i;
                break;

              case "rotate":
                t.rotate = t.rotate + i;
            }
            return t;
        }, e) : e;
    }, Et = function(t) {
        return Lt(t.getAttribute("data-fa-transform"));
    }, jt = function(t) {
        var e = t.getAttribute("data-fa-symbol");
        return null !== e && ("" === e || e);
    }, St = function(t) {
        var e = Y(t.attributes).reduce(function(t, e) {
            return "class" !== t.name && "style" !== t.name && (t[e.name] = e.value), t;
        }, {}), n = t.getAttribute("title");
        return S.autoA11y && (n ? e["aria-labelledby"] = S.replacementClass + "-title-" + W() : e["aria-hidden"] = "true"), 
        e;
    }, Pt = function(t) {
        var e = t.getAttribute("data-fa-mask");
        return e ? bt(e.split(" ").map(function(t) {
            return t.trim();
        })) : vt();
    };
    function Tt(t) {
        this.name = "MissingIcon", this.message = t || "Icon unavailable", this.stack = new Error().stack;
    }
    (Tt.prototype = Object.create(Error.prototype)).constructor = Tt;
    var It = {
        fill: "currentColor"
    }, Bt = {
        attributeType: "XML",
        repeatCount: "indefinite",
        dur: "2s"
    }, Dt = {
        tag: "path",
        attributes: A({}, It, {
            d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
        })
    }, Xt = A({}, Bt, {
        attributeName: "opacity"
    }), Rt = {
        tag: "g",
        children: [ Dt, {
            tag: "circle",
            attributes: A({}, It, {
                cx: "256",
                cy: "364",
                r: "28"
            }),
            children: [ {
                tag: "animate",
                attributes: A({}, Bt, {
                    attributeName: "r",
                    values: "28;14;28;28;14;28;"
                })
            }, {
                tag: "animate",
                attributes: A({}, Xt, {
                    values: "1;0;1;1;0;1;"
                })
            } ]
        }, {
            tag: "path",
            attributes: A({}, It, {
                opacity: "1",
                d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
            }),
            children: [ {
                tag: "animate",
                attributes: A({}, Xt, {
                    values: "1;0;0;0;0;1;"
                })
            } ]
        }, {
            tag: "path",
            attributes: A({}, It, {
                opacity: "0",
                d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
            }),
            children: [ {
                tag: "animate",
                attributes: A({}, Xt, {
                    values: "0;0;1;1;0;0;"
                })
            } ]
        } ]
    }, Ht = I.styles, Ft = "fa-layers-text", _t = /Font Awesome 5 (Solid|Regular|Light|Brands)/, Wt = {
        Solid: "fas",
        Regular: "far",
        Light: "fal",
        Brands: "fab"
    };
    function Yt(t, e) {
        var n = {
            found: !1,
            width: 512,
            height: 512,
            icon: Rt
        };
        if (t && e && Ht[e] && Ht[e][t]) {
            var r = Ht[e][t];
            n = {
                found: !0,
                width: r[0],
                height: r[1],
                icon: {
                    tag: "path",
                    attributes: {
                        fill: "currentColor",
                        d: r.slice(4)[0]
                    }
                }
            };
        } else if (t && e && !S.showMissingIcons) throw new Tt("Icon is missing for prefix " + e + " with icon name " + t);
        return n;
    }
    function Ut(t) {
        var e, n, r, i, a, o, s, f, l, c, u, m, d, g, h, p, v, b, y, w = (n = Ot(e = t), 
        r = n.iconName, i = n.prefix, a = n.rest, o = At(e), s = Et(e), f = jt(e), l = St(e), 
        c = Pt(e), {
            iconName: r,
            title: e.getAttribute("title"),
            prefix: i,
            transform: s,
            symbol: f,
            mask: c,
            extra: {
                classes: a,
                styles: o,
                attributes: l
            }
        });
        return ~w.extra.classes.indexOf(Ft) ? function(t, e) {
            var n = e.title, r = e.transform, i = e.extra, a = null, o = null;
            if (k) {
                var s = parseInt(getComputedStyle(t).fontSize, 10), f = t.getBoundingClientRect();
                a = f.width / s, o = f.height / s;
            }
            return S.autoA11y && !n && (i.attributes["aria-hidden"] = "true"), [ t, rt({
                content: t.innerHTML,
                width: a,
                height: o,
                transform: r,
                title: n,
                extra: i,
                watchable: !0
            }) ];
        }(t, w) : (u = t, d = (m = w).iconName, g = m.title, h = m.prefix, p = m.transform, 
        v = m.symbol, b = m.mask, y = m.extra, [ u, nt({
            icons: {
                main: Yt(d, h),
                mask: Yt(b.iconName, b.prefix)
            },
            prefix: h,
            iconName: d,
            transform: p,
            symbol: v,
            mask: b,
            title: g,
            extra: y,
            watchable: !0
        }) ]);
    }
    function Vt(t) {
        "function" == typeof t.remove ? t.remove() : t && t.parentNode && t.parentNode.removeChild(t);
    }
    function qt(t) {
        if (m) {
            var e = ft.begin("searchPseudoElements");
            Nt = !0, function() {
                Y(t.querySelectorAll("*")).forEach(function(o) {
                    [ ":before", ":after" ].forEach(function(e) {
                        var t = s.getComputedStyle(o, e), n = t.getPropertyValue("font-family").match(_t), r = Y(o.children).filter(function(t) {
                            return t.getAttribute(h) === e;
                        })[0];
                        if (r && (r.nextSibling && -1 < r.nextSibling.textContent.indexOf(h) && Vt(r.nextSibling), 
                        Vt(r), r = null), n && !r) {
                            var i = t.getPropertyValue("content"), a = c.createElement("i");
                            a.setAttribute("class", "" + Wt[n[1]]), a.setAttribute(h, e), a.innerText = 3 === i.length ? i.substr(1, 1) : i, 
                            ":before" === e ? o.insertBefore(a, o.firstChild) : o.appendChild(a);
                        }
                    });
                });
            }(), Nt = !1, e();
        }
    }
    function Kt(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
        if (m) {
            var n = c.documentElement.classList, r = function(t) {
                return n.add(p + "-" + t);
            }, i = function(t) {
                return n.remove(p + "-" + t);
            }, a = Object.keys(Ht), o = [ "." + Ft + ":not([" + C + "])" ].concat(a.map(function(t) {
                return "." + t + ":not([" + C + "])";
            })).join(", ");
            if (0 !== o.length) {
                var s = Y(t.querySelectorAll(o));
                if (0 < s.length) {
                    r("pending"), i("complete");
                    var f = ft.begin("onTree"), l = s.reduce(function(t, e) {
                        try {
                            var n = Ut(e);
                            n && t.push(n);
                        } catch (t) {
                            v || t instanceof Tt && console.error(t);
                        }
                        return t;
                    }, []);
                    f(), Ct(l, function() {
                        r("active"), r("complete"), i("pending"), "function" == typeof e && e();
                    });
                }
            }
        }
    }
    function Gt(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null, n = Ut(t);
        n && Ct([ n ], e);
    }
    var Jt = function() {
        var t = g, e = S.familyPrefix, n = S.replacementClass, r = 'svg:not(:root).svg-inline--fa {\n  overflow: visible; }\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -.125em; }\n  .svg-inline--fa.fa-lg {\n    vertical-align: -.225em; }\n  .svg-inline--fa.fa-w-1 {\n    width: 0.0625em; }\n  .svg-inline--fa.fa-w-2 {\n    width: 0.125em; }\n  .svg-inline--fa.fa-w-3 {\n    width: 0.1875em; }\n  .svg-inline--fa.fa-w-4 {\n    width: 0.25em; }\n  .svg-inline--fa.fa-w-5 {\n    width: 0.3125em; }\n  .svg-inline--fa.fa-w-6 {\n    width: 0.375em; }\n  .svg-inline--fa.fa-w-7 {\n    width: 0.4375em; }\n  .svg-inline--fa.fa-w-8 {\n    width: 0.5em; }\n  .svg-inline--fa.fa-w-9 {\n    width: 0.5625em; }\n  .svg-inline--fa.fa-w-10 {\n    width: 0.625em; }\n  .svg-inline--fa.fa-w-11 {\n    width: 0.6875em; }\n  .svg-inline--fa.fa-w-12 {\n    width: 0.75em; }\n  .svg-inline--fa.fa-w-13 {\n    width: 0.8125em; }\n  .svg-inline--fa.fa-w-14 {\n    width: 0.875em; }\n  .svg-inline--fa.fa-w-15 {\n    width: 0.9375em; }\n  .svg-inline--fa.fa-w-16 {\n    width: 1em; }\n  .svg-inline--fa.fa-w-17 {\n    width: 1.0625em; }\n  .svg-inline--fa.fa-w-18 {\n    width: 1.125em; }\n  .svg-inline--fa.fa-w-19 {\n    width: 1.1875em; }\n  .svg-inline--fa.fa-w-20 {\n    width: 1.25em; }\n  .svg-inline--fa.fa-pull-left {\n    margin-right: .3em;\n    width: auto; }\n  .svg-inline--fa.fa-pull-right {\n    margin-left: .3em;\n    width: auto; }\n  .svg-inline--fa.fa-border {\n    height: 1.5em; }\n  .svg-inline--fa.fa-li {\n    width: 2em; }\n  .svg-inline--fa.fa-fw {\n    width: 1.25em; }\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -.125em;\n  width: 1em; }\n  .fa-layers svg.svg-inline--fa {\n    -webkit-transform-origin: center center;\n            transform-origin: center center; }\n\n.fa-layers-text, .fa-layers-counter {\n  display: inline-block;\n  position: absolute;\n  text-align: center; }\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center; }\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: .25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right; }\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right; }\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left; }\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right; }\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top left;\n          transform-origin: top left; }\n\n.fa-lg {\n  font-size: 1.33333em;\n  line-height: 0.75em;\n  vertical-align: -.0667em; }\n\n.fa-xs {\n  font-size: .75em; }\n\n.fa-sm {\n  font-size: .875em; }\n\n.fa-1x {\n  font-size: 1em; }\n\n.fa-2x {\n  font-size: 2em; }\n\n.fa-3x {\n  font-size: 3em; }\n\n.fa-4x {\n  font-size: 4em; }\n\n.fa-5x {\n  font-size: 5em; }\n\n.fa-6x {\n  font-size: 6em; }\n\n.fa-7x {\n  font-size: 7em; }\n\n.fa-8x {\n  font-size: 8em; }\n\n.fa-9x {\n  font-size: 9em; }\n\n.fa-10x {\n  font-size: 10em; }\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em; }\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0; }\n  .fa-ul > li {\n    position: relative; }\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit; }\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: .1em;\n  padding: .2em .25em .15em; }\n\n.fa-pull-left {\n  float: left; }\n\n.fa-pull-right {\n  float: right; }\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: .3em; }\n\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: .3em; }\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear; }\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8); }\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n.fa-rotate-90 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg); }\n\n.fa-rotate-180 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg); }\n\n.fa-rotate-270 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg); }\n\n.fa-flip-horizontal {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1); }\n\n.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1); }\n\n.fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1); }\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  -webkit-filter: none;\n          filter: none; }\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2em; }\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1em; }\n\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2em; }\n\n.fa-inverse {\n  color: #fff; }\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto; }\n';
        if ("fa" !== e || n !== t) {
            var i = new RegExp("\\.fa\\-", "g"), a = new RegExp("\\." + t, "g");
            r = r.replace(i, "." + e + "-").replace(a, "." + n);
        }
        return r;
    };
    var Qt = function() {
        function t() {
            N(this, t), this.definitions = {};
        }
        return M(t, [ {
            key: "add",
            value: function() {
                for (var e = this, t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                var i = n.reduce(this._pullDefinitions, {});
                Object.keys(i).forEach(function(t) {
                    e.definitions[t] = A({}, e.definitions[t] || {}, i[t]), function t(e, r) {
                        var n = Object.keys(r).reduce(function(t, e) {
                            var n = r[e];
                            return n.icon ? t[n.iconName] = n.icon : t[e] = n, t;
                        }, {});
                        "function" == typeof I.hooks.addPack ? I.hooks.addPack(e, n) : I.styles[e] = A({}, I.styles[e] || {}, n), 
                        "fas" === e && t("fa", r);
                    }(t, i[t]);
                });
            }
        }, {
            key: "reset",
            value: function() {
                this.definitions = {};
            }
        }, {
            key: "_pullDefinitions",
            value: function(a, t) {
                var o = t.prefix && t.iconName && t.icon ? {
                    0: t
                } : t;
                return Object.keys(o).map(function(t) {
                    var e = o[t], n = e.prefix, r = e.iconName, i = e.icon;
                    a[n] || (a[n] = {}), a[n][r] = i;
                }), a;
            }
        } ]), t;
    }();
    function Zt(t) {
        return {
            found: !0,
            width: t[0],
            height: t[1],
            icon: {
                tag: "path",
                attributes: {
                    fill: "currentColor",
                    d: t.slice(4)[0]
                }
            }
        };
    }
    var $t = !1;
    function te() {
        S.autoAddCss && ($t || F(Jt()), $t = !0);
    }
    function ee(e, t) {
        return Object.defineProperty(e, "abstract", {
            get: t
        }), Object.defineProperty(e, "html", {
            get: function() {
                return e.abstract.map(function(t) {
                    return wt(t);
                });
            }
        }), Object.defineProperty(e, "node", {
            get: function() {
                if (m) {
                    var t = c.createElement("div");
                    return t.innerHTML = e.html, t.children;
                }
            }
        }), e;
    }
    function ne(t) {
        var e = t.prefix, n = void 0 === e ? "fa" : e, r = t.iconName;
        if (r) return yt(ie.definitions, n, r) || yt(I.styles, n, r);
    }
    var re, ie = new Qt(), ae = (re = function(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, n = e.transform, r = void 0 === n ? H : n, i = e.symbol, a = void 0 !== i && i, o = e.mask, s = void 0 === o ? null : o, f = e.title, l = void 0 === f ? null : f, c = e.classes, u = void 0 === c ? [] : c, m = e.attributes, d = void 0 === m ? {} : m, g = e.styles, h = void 0 === g ? {} : g;
        if (t) {
            var p = t.prefix, v = t.iconName, b = t.icon;
            return ee(A({
                type: "icon"
            }, t), function() {
                return te(), S.autoA11y && (l ? d["aria-labelledby"] = S.replacementClass + "-title-" + W() : d["aria-hidden"] = "true"), 
                nt({
                    icons: {
                        main: Zt(b),
                        mask: s ? Zt(s.icon) : {
                            found: !1,
                            width: null,
                            height: null,
                            icon: {}
                        }
                    },
                    prefix: p,
                    iconName: v,
                    transform: A({}, H, r),
                    symbol: a,
                    title: l,
                    extra: {
                        attributes: d,
                        styles: h,
                        classes: u
                    }
                });
            });
        }
    }, function(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, n = (t || {}).icon ? t : ne(t || {}), r = e.mask;
        return r && (r = (r || {}).icon ? r : ne(r || {})), re(n, A({}, e, {
            mask: r
        }));
    }), oe = {
        noAuto: function() {
            var t;
            P({
                autoReplaceSvg: t = !1,
                observeMutations: t
            }), Mt && Mt.disconnect();
        },
        dom: {
            i2svg: function() {
                var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                if (m) {
                    te();
                    var e = t.node, n = void 0 === e ? c : e, r = t.callback, i = void 0 === r ? function() {} : r;
                    S.searchPseudoElements && qt(n), Kt(n, i);
                }
            },
            css: Jt,
            insertCss: function() {
                F(Jt());
            }
        },
        library: ie,
        parse: {
            transform: function(t) {
                return Lt(t);
            }
        },
        findIconDefinition: ne,
        icon: ae,
        text: function(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, n = e.transform, r = void 0 === n ? H : n, i = e.title, a = void 0 === i ? null : i, o = e.classes, s = void 0 === o ? [] : o, f = e.attributes, l = void 0 === f ? {} : f, c = e.styles, u = void 0 === c ? {} : c;
            return ee({
                type: "text",
                content: t
            }, function() {
                return te(), rt({
                    content: t,
                    transform: A({}, H, r),
                    title: a,
                    extra: {
                        attributes: l,
                        styles: u,
                        classes: [ S.familyPrefix + "-layers-text" ].concat(O(s))
                    }
                });
            });
        },
        layer: function(t) {
            return ee({
                type: "layer"
            }, function() {
                te();
                var e = [];
                return t(function(t) {
                    Array.isArray(t) ? t.map(function(t) {
                        e = e.concat(t.abstract);
                    }) : e = e.concat(t.abstract);
                }), [ {
                    tag: "span",
                    attributes: {
                        class: S.familyPrefix + "-layers"
                    },
                    children: e
                } ];
            });
        }
    }, se = function() {
        m && S.autoReplaceSvg && oe.dom.i2svg({
            node: c
        });
    };
    Object.defineProperty(oe, "config", {
        get: function() {
            return S;
        },
        set: function(t) {
            P(t);
        }
    }), function(t) {
        try {
            t();
        } catch (t) {
            if (!v) throw t;
        }
    }(function() {
        u && (s.FontAwesome || (s.FontAwesome = oe), X(function() {
            0 < Object.keys(I.styles).length && se(), S.observeMutations && "function" == typeof MutationObserver && function(t) {
                if (f) {
                    var i = t.treeCallback, a = t.nodeCallback, o = t.pseudoElementsCallback;
                    Mt = new f(function(t) {
                        Nt || Y(t).forEach(function(t) {
                            if ("childList" === t.type && 0 < t.addedNodes.length && !kt(t.addedNodes[0]) && (S.searchPseudoElements && o(t.target), 
                            i(t.target)), "attributes" === t.type && t.target.parentNode && S.searchPseudoElements && o(t.target.parentNode), 
                            "attributes" === t.type && kt(t.target) && ~w.indexOf(t.attributeName)) if ("class" === t.attributeName) {
                                var e = bt(U(t.target)), n = e.prefix, r = e.iconName;
                                n && t.target.setAttribute("data-prefix", n), r && t.target.setAttribute("data-icon", r);
                            } else a(t.target);
                        });
                    }), m && Mt.observe(c.getElementsByTagName("body")[0], {
                        childList: !0,
                        attributes: !0,
                        characterData: !0,
                        subtree: !0
                    });
                }
            }({
                treeCallback: Kt,
                nodeCallback: Gt,
                pseudoElementsCallback: qt
            });
        })), I.hooks = A({}, I.hooks, {
            addPack: function(t, e) {
                I.styles[t] = A({}, I.styles[t] || {}, e), ht(), se();
            },
            addShims: function(t) {
                var e;
                (e = I.shims).push.apply(e, O(t)), ht(), se();
            }
        });
    });
}();