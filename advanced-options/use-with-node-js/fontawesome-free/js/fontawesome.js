/*!
 * Font Awesome Free 5.1.0 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */
!function() {
    "use strict";
    var t = function() {}, e = {}, n = {}, r = null, a = {
        mark: t,
        measure: t
    };
    try {
        "undefined" != typeof window && (e = window), "undefined" != typeof document && (n = document), 
        "undefined" != typeof MutationObserver && (r = MutationObserver), "undefined" != typeof performance && (a = performance);
    } catch (t) {}
    var i = (e.navigator || {}).userAgent, o = void 0 === i ? "" : i, m = e, d = n, s = r, l = a, f = !!m.document, c = !!d.documentElement && !!d.head && "function" == typeof d.addEventListener && "function" == typeof d.createElement, k = ~o.indexOf("MSIE") || ~o.indexOf("Trident/"), u = "___FONT_AWESOME___", C = 16, g = "svg-inline--fa", M = "data-fa-i2svg", h = "data-fa-pseudo-element", p = "data-prefix", v = "data-icon", b = "fontawesome-i2svg", y = [ "HTML", "HEAD", "STYLE", "SCRIPT" ], w = function() {
        try {
            return !1;
        } catch (t) {
            return !1;
        }
    }(), x = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], A = x.concat([ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]), N = [ "class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask" ], z = [ "xs", "sm", "lg", "fw", "ul", "li", "border", "pull-left", "pull-right", "spin", "pulse", "rotate-90", "rotate-180", "rotate-270", "flip-horizontal", "flip-vertical", "stack", "stack-1x", "stack-2x", "inverse", "layers", "layers-text", "layers-counter" ].concat(x.map(function(t) {
        return t + "x";
    })).concat(A.map(function(t) {
        return "w-" + t;
    })), S = function(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }, L = function() {
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
    }(), E = Object.assign || function(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
        }
        return t;
    }, O = function(t, e) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return function(t, e) {
            var n = [], r = !0, a = !1, i = void 0;
            try {
                for (var o, s = t[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), 
                !e || n.length !== e); r = !0) ;
            } catch (t) {
                a = !0, i = t;
            } finally {
                try {
                    !r && s.return && s.return();
                } finally {
                    if (a) throw i;
                }
            }
            return n;
        }(t, e);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }, P = function(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
            return n;
        }
        return Array.from(t);
    }, T = m.FontAwesomeConfig || {};
    if (d && "function" == typeof d.querySelector) {
        [ [ "data-family-prefix", "familyPrefix" ], [ "data-replacement-class", "replacementClass" ], [ "data-auto-replace-svg", "autoReplaceSvg" ], [ "data-auto-add-css", "autoAddCss" ], [ "data-auto-a11y", "autoA11y" ], [ "data-search-pseudo-elements", "searchPseudoElements" ], [ "data-observe-mutations", "observeMutations" ], [ "data-keep-original-source", "keepOriginalSource" ], [ "data-measure-performance", "measurePerformance" ], [ "data-show-missing-icons", "showMissingIcons" ] ].forEach(function(t) {
            var e, n = O(t, 2), r = n[0], a = n[1], i = "" === (e = function(t) {
                var e = d.querySelector("script[" + t + "]");
                if (e) return e.getAttribute(t);
            }(r)) || "false" !== e && ("true" === e || e);
            null != i && (T[a] = i);
        });
    }
    var j = E({
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
    }, T);
    j.autoReplaceSvg || (j.observeMutations = !1);
    var R = E({}, j);
    m.FontAwesomeConfig = R;
    var I = m || {};
    I[u] || (I[u] = {}), I[u].styles || (I[u].styles = {}), I[u].hooks || (I[u].hooks = {}), 
    I[u].shims || (I[u].shims = []);
    var H = I[u], D = [], X = !1;
    c && ((X = (d.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(d.readyState)) || d.addEventListener("DOMContentLoaded", function t() {
        d.removeEventListener("DOMContentLoaded", t), X = 1, D.map(function(t) {
            return t();
        });
    }));
    var B = function(t) {
        c && (X ? setTimeout(t, 0) : D.push(t));
    }, F = C, _ = {
        size: 16,
        x: 0,
        y: 0,
        rotate: 0,
        flipX: !1,
        flipY: !1
    };
    function Y(t) {
        if (t && c) {
            var e = d.createElement("style");
            e.setAttribute("type", "text/css"), e.innerHTML = t;
            for (var n = d.head.childNodes, r = null, a = n.length - 1; -1 < a; a--) {
                var i = n[a], o = (i.tagName || "").toUpperCase();
                -1 < [ "STYLE", "LINK" ].indexOf(o) && (r = i);
            }
            return d.head.insertBefore(e, r), t;
        }
    }
    var W = 0;
    function q() {
        return ++W;
    }
    function U(t) {
        for (var e = [], n = (t || []).length >>> 0; n--; ) e[n] = t[n];
        return e;
    }
    function V(t) {
        return t.classList ? U(t.classList) : (t.getAttribute("class") || "").split(" ").filter(function(t) {
            return t;
        });
    }
    function K(t, e) {
        var n, r = e.split("-"), a = r[0], i = r.slice(1).join("-");
        return a !== t || "" === i || (n = i, ~z.indexOf(n)) ? null : i;
    }
    function G(t) {
        return ("" + t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function J(n) {
        return Object.keys(n || {}).reduce(function(t, e) {
            return t + (e + ": ") + n[e] + ";";
        }, "");
    }
    function Q(t) {
        return t.size !== _.size || t.x !== _.x || t.y !== _.y || t.rotate !== _.rotate || t.flipX || t.flipY;
    }
    function Z(t) {
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
    var $ = {
        x: 0,
        y: 0,
        width: "100%",
        height: "100%"
    }, tt = function(t) {
        var e = t.children, n = t.attributes, r = t.main, a = t.mask, i = t.transform, o = r.width, s = r.icon, l = a.width, f = a.icon, c = Z({
            transform: i,
            containerWidth: l,
            iconWidth: o
        }), u = {
            tag: "rect",
            attributes: E({}, $, {
                fill: "white"
            })
        }, m = {
            tag: "g",
            attributes: E({}, c.inner),
            children: [ {
                tag: "path",
                attributes: E({}, s.attributes, c.path, {
                    fill: "black"
                })
            } ]
        }, d = {
            tag: "g",
            attributes: E({}, c.outer),
            children: [ m ]
        }, g = "mask-" + q(), h = "clip-" + q(), p = {
            tag: "defs",
            children: [ {
                tag: "clipPath",
                attributes: {
                    id: h
                },
                children: [ f ]
            }, {
                tag: "mask",
                attributes: E({}, $, {
                    id: g,
                    maskUnits: "userSpaceOnUse",
                    maskContentUnits: "userSpaceOnUse"
                }),
                children: [ u, d ]
            } ]
        };
        return e.push(p, {
            tag: "rect",
            attributes: E({
                fill: "currentColor",
                "clip-path": "url(#" + h + ")",
                mask: "url(#" + g + ")"
            }, $)
        }), {
            children: e,
            attributes: n
        };
    }, et = function(t) {
        var e = t.children, n = t.attributes, r = t.main, a = t.transform, i = J(t.styles);
        if (0 < i.length && (n.style = i), Q(a)) {
            var o = Z({
                transform: a,
                containerWidth: r.width,
                iconWidth: r.width
            });
            e.push({
                tag: "g",
                attributes: E({}, o.outer),
                children: [ {
                    tag: "g",
                    attributes: E({}, o.inner),
                    children: [ {
                        tag: r.icon.tag,
                        children: r.icon.children,
                        attributes: E({}, r.icon.attributes, o.path)
                    } ]
                } ]
            });
        } else e.push(r.icon);
        return {
            children: e,
            attributes: n
        };
    }, nt = function(t) {
        var e = t.children, n = t.main, r = t.mask, a = t.attributes, i = t.styles, o = t.transform;
        if (Q(o) && n.found && !r.found) {
            var s = n.width / n.height / 2, l = .5;
            a.style = J(E({}, i, {
                "transform-origin": s + o.x / 16 + "em " + (l + o.y / 16) + "em"
            }));
        }
        return [ {
            tag: "svg",
            attributes: a,
            children: e
        } ];
    }, rt = function(t) {
        var e = t.prefix, n = t.iconName, r = t.children, a = t.attributes, i = t.symbol, o = !0 === i ? e + "-" + R.familyPrefix + "-" + n : i;
        return [ {
            tag: "svg",
            attributes: {
                style: "display: none;"
            },
            children: [ {
                tag: "symbol",
                attributes: E({}, a, {
                    id: o
                }),
                children: r
            } ]
        } ];
    };
    function at(t) {
        var e = t.icons, n = e.main, r = e.mask, a = t.prefix, i = t.iconName, o = t.transform, s = t.symbol, l = t.title, f = t.extra, c = t.watchable, u = void 0 !== c && c, m = r.found ? r : n, d = m.width, g = m.height, h = "fa-w-" + Math.ceil(d / g * 16), p = [ R.replacementClass, i ? R.familyPrefix + "-" + i : "", h ].filter(function(t) {
            return -1 === f.classes.indexOf(t);
        }).concat(f.classes).join(" "), v = {
            children: [],
            attributes: E({}, f.attributes, {
                "data-prefix": a,
                "data-icon": i,
                class: p,
                role: "img",
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 " + d + " " + g
            })
        };
        u && (v.attributes[M] = ""), l && v.children.push({
            tag: "title",
            attributes: {
                id: v.attributes["aria-labelledby"] || "title-" + q()
            },
            children: [ l ]
        });
        var b = E({}, v, {
            prefix: a,
            iconName: i,
            main: n,
            mask: r,
            transform: o,
            symbol: s,
            styles: f.styles
        }), y = r.found && n.found ? tt(b) : et(b), w = y.children, x = y.attributes;
        return b.children = w, b.attributes = x, s ? rt(b) : nt(b);
    }
    function it(t) {
        var e = t.content, n = t.width, r = t.height, a = t.transform, i = t.title, o = t.extra, s = t.watchable, l = void 0 !== s && s, f = E({}, o.attributes, i ? {
            title: i
        } : {}, {
            class: o.classes.join(" ")
        });
        l && (f[M] = "");
        var c, u, m, d, g, h, p, v, b, y = E({}, o.styles);
        Q(a) && (y.transform = (u = (c = {
            transform: a,
            startCentered: !0,
            width: n,
            height: r
        }).transform, m = c.width, d = void 0 === m ? C : m, g = c.height, h = void 0 === g ? C : g, 
        p = c.startCentered, b = "", b += (v = void 0 !== p && p) && k ? "translate(" + (u.x / F - d / 2) + "em, " + (u.y / F - h / 2) + "em) " : v ? "translate(calc(-50% + " + u.x / F + "em), calc(-50% + " + u.y / F + "em)) " : "translate(" + u.x / F + "em, " + u.y / F + "em) ", 
        b += "scale(" + u.size / F * (u.flipX ? -1 : 1) + ", " + u.size / F * (u.flipY ? -1 : 1) + ") ", 
        b += "rotate(" + u.rotate + "deg) "), y["-webkit-transform"] = y.transform);
        var w = J(y);
        0 < w.length && (f.style = w);
        var x = [];
        return x.push({
            tag: "span",
            attributes: f,
            children: [ e ]
        }), i && x.push({
            tag: "span",
            attributes: {
                class: "sr-only"
            },
            children: [ i ]
        }), x;
    }
    var ot = function() {}, st = R.measurePerformance && l && l.mark && l.measure ? l : {
        mark: ot,
        measure: ot
    }, lt = 'FA "5.1.0"', ft = function(t) {
        st.mark(lt + " " + t + " ends"), st.measure(lt + " " + t, lt + " " + t + " begins", lt + " " + t + " ends");
    }, ct = {
        begin: function(t) {
            return st.mark(lt + " " + t + " begins"), function() {
                return ft(t);
            };
        },
        end: ft
    }, ut = function(t, e, n, r) {
        var a, i, o, s, l, f = Object.keys(t), c = f.length, u = void 0 !== r ? (s = e, 
        l = r, function(t, e, n, r) {
            return s.call(l, t, e, n, r);
        }) : e;
        for (void 0 === n ? (a = 1, o = t[f[0]]) : (a = 0, o = n); a < c; a++) o = u(o, t[i = f[a]], i, t);
        return o;
    }, mt = H.styles, dt = H.shims, gt = {}, ht = {}, pt = {}, vt = function() {
        var t = function(r) {
            return ut(mt, function(t, e, n) {
                return t[n] = ut(e, r, {}), t;
            }, {});
        };
        gt = t(function(t, e, n) {
            return t[e[3]] = n, t;
        }), ht = t(function(e, t, n) {
            var r = t[2];
            return e[n] = n, r.forEach(function(t) {
                e[t] = n;
            }), e;
        });
        var i = "far" in mt;
        pt = ut(dt, function(t, e) {
            var n = e[0], r = e[1], a = e[2];
            return "far" !== r || i || (r = "fas"), t[n] = {
                prefix: r,
                iconName: a
            }, t;
        }, {});
    };
    function bt(t, e) {
        return gt[t][e];
    }
    vt();
    var yt = H.styles, wt = function() {
        return {
            prefix: null,
            iconName: null,
            rest: []
        };
    };
    function xt(t) {
        return t.reduce(function(t, e) {
            var n = K(R.familyPrefix, e);
            if (yt[e]) t.prefix = e; else if (n) {
                var r = "fa" === t.prefix ? pt[n] || {
                    prefix: null,
                    iconName: null
                } : {};
                t.iconName = r.iconName || n, t.prefix = r.prefix || t.prefix;
            } else e !== R.replacementClass && 0 !== e.indexOf("fa-w-") && t.rest.push(e);
            return t;
        }, wt());
    }
    function kt(t, e, n) {
        if (t && t[e] && t[e][n]) return {
            prefix: e,
            iconName: n,
            icon: t[e][n]
        };
    }
    function Ct(t) {
        var n, e = t.tag, r = t.attributes, a = void 0 === r ? {} : r, i = t.children, o = void 0 === i ? [] : i;
        return "string" == typeof t ? G(t) : "<" + e + " " + (n = a, Object.keys(n || {}).reduce(function(t, e) {
            return t + (e + '="') + G(n[e]) + '" ';
        }, "").trim()) + ">" + o.map(Ct).join("") + "</" + e + ">";
    }
    var Mt = function() {};
    function At(t) {
        return "string" == typeof (t.getAttribute ? t.getAttribute(M) : null);
    }
    var Nt = {
        replace: function(t) {
            var e = t[0], n = t[1].map(function(t) {
                return Ct(t);
            }).join("\n");
            if (e.parentNode && e.outerHTML) e.outerHTML = n + (R.keepOriginalSource && "svg" !== e.tagName.toLowerCase() ? "\x3c!-- " + e.outerHTML + " --\x3e" : ""); else if (e.parentNode) {
                var r = document.createElement("span");
                e.parentNode.replaceChild(r, e), r.outerHTML = n;
            }
        },
        nest: function(t) {
            var e = t[0], n = t[1];
            if (~V(e).indexOf(R.replacementClass)) return Nt.replace(t);
            var r = new RegExp(R.familyPrefix + "-.*");
            delete n[0].attributes.style;
            var a = n[0].attributes.class.split(" ").reduce(function(t, e) {
                return e === R.replacementClass || e.match(r) ? t.toSvg.push(e) : t.toNode.push(e), 
                t;
            }, {
                toNode: [],
                toSvg: []
            });
            n[0].attributes.class = a.toSvg.join(" ");
            var i = n.map(function(t) {
                return Ct(t);
            }).join("\n");
            e.setAttribute("class", a.toNode.join(" ")), e.setAttribute(M, ""), e.innerHTML = i;
        }
    };
    function zt(n, t) {
        var r = "function" == typeof t ? t : Mt;
        0 === n.length ? r() : (m.requestAnimationFrame || function(t) {
            return t();
        })(function() {
            var t = !0 === R.autoReplaceSvg ? Nt.replace : Nt[R.autoReplaceSvg] || Nt.replace, e = ct.begin("mutate");
            n.map(t), e(), r();
        });
    }
    var St = !1;
    var Lt = null;
    function Et(t) {
        if (s && R.observeMutations) {
            var a = t.treeCallback, i = t.nodeCallback, o = t.pseudoElementsCallback, e = t.observeMutationsRoot, n = void 0 === e ? d.body : e;
            Lt = new s(function(t) {
                St || U(t).forEach(function(t) {
                    if ("childList" === t.type && 0 < t.addedNodes.length && !At(t.addedNodes[0]) && (R.searchPseudoElements && o(t.target), 
                    a(t.target)), "attributes" === t.type && t.target.parentNode && R.searchPseudoElements && o(t.target.parentNode), 
                    "attributes" === t.type && At(t.target) && ~N.indexOf(t.attributeName)) if ("class" === t.attributeName) {
                        var e = xt(V(t.target)), n = e.prefix, r = e.iconName;
                        n && t.target.setAttribute("data-prefix", n), r && t.target.setAttribute("data-icon", r);
                    } else i(t.target);
                });
            }), c && Lt.observe(n, {
                childList: !0,
                attributes: !0,
                characterData: !0,
                subtree: !0
            });
        }
    }
    var Ot = function(t) {
        var e = t.getAttribute("style"), n = [];
        return e && (n = e.split(";").reduce(function(t, e) {
            var n = e.split(":"), r = n[0], a = n.slice(1);
            return r && 0 < a.length && (t[r] = a.join(":").trim()), t;
        }, {})), n;
    };
    function Pt(t) {
        for (var e = "", n = 0; n < t.length; n++) {
            e += ("000" + t.charCodeAt(n).toString(16)).slice(-4);
        }
        return e;
    }
    var Tt = function(t) {
        var e, n, r = t.getAttribute("data-prefix"), a = t.getAttribute("data-icon"), i = void 0 !== t.innerText ? t.innerText.trim() : "", o = xt(V(t));
        return r && a && (o.prefix = r, o.iconName = a), o.prefix && 1 < i.length ? o.iconName = (e = o.prefix, 
        n = t.innerText, ht[e][n]) : o.prefix && 1 === i.length && (o.iconName = bt(o.prefix, Pt(t.innerText))), 
        o;
    }, jt = function(t) {
        var e = {
            size: 16,
            x: 0,
            y: 0,
            flipX: !1,
            flipY: !1,
            rotate: 0
        };
        return t ? t.toLowerCase().split(" ").reduce(function(t, e) {
            var n = e.toLowerCase().split("-"), r = n[0], a = n.slice(1).join("-");
            if (r && "h" === a) return t.flipX = !0, t;
            if (r && "v" === a) return t.flipY = !0, t;
            if (a = parseFloat(a), isNaN(a)) return t;
            switch (r) {
              case "grow":
                t.size = t.size + a;
                break;

              case "shrink":
                t.size = t.size - a;
                break;

              case "left":
                t.x = t.x - a;
                break;

              case "right":
                t.x = t.x + a;
                break;

              case "up":
                t.y = t.y - a;
                break;

              case "down":
                t.y = t.y + a;
                break;

              case "rotate":
                t.rotate = t.rotate + a;
            }
            return t;
        }, e) : e;
    }, Rt = function(t) {
        return jt(t.getAttribute("data-fa-transform"));
    }, It = function(t) {
        var e = t.getAttribute("data-fa-symbol");
        return null !== e && ("" === e || e);
    }, Ht = function(t) {
        var e = U(t.attributes).reduce(function(t, e) {
            return "class" !== t.name && "style" !== t.name && (t[e.name] = e.value), t;
        }, {}), n = t.getAttribute("title");
        return R.autoA11y && (n ? e["aria-labelledby"] = R.replacementClass + "-title-" + q() : e["aria-hidden"] = "true"), 
        e;
    }, Dt = function(t) {
        var e = t.getAttribute("data-fa-mask");
        return e ? xt(e.split(" ").map(function(t) {
            return t.trim();
        })) : wt();
    }, Xt = {
        iconName: null,
        title: null,
        prefix: null,
        transform: _,
        symbol: !1,
        mask: null,
        extra: {
            classes: [],
            styles: {},
            attributes: {}
        }
    };
    function Bt(t) {
        this.name = "MissingIcon", this.message = t || "Icon unavailable", this.stack = new Error().stack;
    }
    (Bt.prototype = Object.create(Error.prototype)).constructor = Bt;
    var Ft = {
        fill: "currentColor"
    }, _t = {
        attributeType: "XML",
        repeatCount: "indefinite",
        dur: "2s"
    }, Yt = {
        tag: "path",
        attributes: E({}, Ft, {
            d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
        })
    }, Wt = E({}, _t, {
        attributeName: "opacity"
    }), qt = {
        tag: "g",
        children: [ Yt, {
            tag: "circle",
            attributes: E({}, Ft, {
                cx: "256",
                cy: "364",
                r: "28"
            }),
            children: [ {
                tag: "animate",
                attributes: E({}, _t, {
                    attributeName: "r",
                    values: "28;14;28;28;14;28;"
                })
            }, {
                tag: "animate",
                attributes: E({}, Wt, {
                    values: "1;0;1;1;0;1;"
                })
            } ]
        }, {
            tag: "path",
            attributes: E({}, Ft, {
                opacity: "1",
                d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
            }),
            children: [ {
                tag: "animate",
                attributes: E({}, Wt, {
                    values: "1;0;0;0;0;1;"
                })
            } ]
        }, {
            tag: "path",
            attributes: E({}, Ft, {
                opacity: "0",
                d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
            }),
            children: [ {
                tag: "animate",
                attributes: E({}, Wt, {
                    values: "0;0;1;1;0;0;"
                })
            } ]
        } ]
    }, Ut = H.styles, Vt = "fa-layers-text", Kt = /Font Awesome 5 (Solid|Regular|Light|Brands|Free|Pro)/, Gt = {
        Solid: "fas",
        Regular: "far",
        Light: "fal",
        Brands: "fab"
    }, Jt = {
        900: "fas",
        400: "far",
        300: "fal"
    };
    function Qt(t, e) {
        var n = {
            found: !1,
            width: 512,
            height: 512,
            icon: qt
        };
        if (t && e && Ut[e] && Ut[e][t]) {
            var r = Ut[e][t];
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
        } else if (t && e && !R.showMissingIcons) throw new Bt("Icon is missing for prefix " + e + " with icon name " + t);
        return n;
    }
    function Zt(t) {
        var e, n, r, a, i, o, s, l, f, c, u, m, d, g, h, p, v, b, y, w = (n = Tt(e = t), 
        r = n.iconName, a = n.prefix, i = n.rest, o = Ot(e), s = Rt(e), l = It(e), f = Ht(e), 
        c = Dt(e), {
            iconName: r,
            title: e.getAttribute("title"),
            prefix: a,
            transform: s,
            symbol: l,
            mask: c,
            extra: {
                classes: i,
                styles: o,
                attributes: f
            }
        });
        return ~w.extra.classes.indexOf(Vt) ? function(t, e) {
            var n = e.title, r = e.transform, a = e.extra, i = null, o = null;
            if (k) {
                var s = parseInt(getComputedStyle(t).fontSize, 10), l = t.getBoundingClientRect();
                i = l.width / s, o = l.height / s;
            }
            return R.autoA11y && !n && (a.attributes["aria-hidden"] = "true"), [ t, it({
                content: t.innerHTML,
                width: i,
                height: o,
                transform: r,
                title: n,
                extra: a,
                watchable: !0
            }) ];
        }(t, w) : (u = t, d = (m = w).iconName, g = m.title, h = m.prefix, p = m.transform, 
        v = m.symbol, b = m.mask, y = m.extra, [ u, at({
            icons: {
                main: Qt(d, h),
                mask: Qt(b.iconName, b.prefix)
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
    function $t(t) {
        if (c) {
            var e = ct.begin("searchPseudoElements");
            St = !0, function() {
                U(t.querySelectorAll("*")).filter(function(t) {
                    return !(t.parentNode === document.head || ~y.indexOf(t.tagName.toUpperCase()) || t.getAttribute(h) || t.parentNode && "svg" === t.parentNode.tagName);
                }).forEach(function(u) {
                    [ ":before", ":after" ].forEach(function(e) {
                        var t = U(u.children).filter(function(t) {
                            return t.getAttribute(h) === e;
                        })[0], n = m.getComputedStyle(u, e), r = n.getPropertyValue("font-family").match(Kt), a = n.getPropertyValue("font-weight");
                        if (t && !r) u.removeChild(t); else if (r) {
                            var i = n.getPropertyValue("content"), o = ~[ "Light", "Regular", "Solid" ].indexOf(r[1]) ? Gt[r[1]] : Jt[a], s = bt(o, Pt(3 === i.length ? i.substr(1, 1) : i));
                            if (!t || t.getAttribute(p) !== o || t.getAttribute(v) !== s) {
                                t && u.removeChild(t);
                                var l = Xt.extra;
                                l.attributes[h] = e;
                                var f = at(E({}, Xt, {
                                    icons: {
                                        main: Qt(s, o),
                                        mask: wt()
                                    },
                                    prefix: o,
                                    iconName: s,
                                    extra: l,
                                    watchable: !0
                                })), c = d.createElement("svg");
                                ":before" === e ? u.insertBefore(c, u.firstChild) : u.appendChild(c), c.outerHTML = f.map(function(t) {
                                    return Ct(t);
                                }).join("\n");
                            }
                        }
                    });
                });
            }(), St = !1, e();
        }
    }
    function te(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
        if (c) {
            var n = d.documentElement.classList, r = function(t) {
                return n.add(b + "-" + t);
            }, a = function(t) {
                return n.remove(b + "-" + t);
            }, i = Object.keys(Ut), o = [ "." + Vt + ":not([" + M + "])" ].concat(i.map(function(t) {
                return "." + t + ":not([" + M + "])";
            })).join(", ");
            if (0 !== o.length) {
                var s = U(t.querySelectorAll(o));
                if (0 < s.length) {
                    r("pending"), a("complete");
                    var l = ct.begin("onTree"), f = s.reduce(function(t, e) {
                        try {
                            var n = Zt(e);
                            n && t.push(n);
                        } catch (t) {
                            w || t instanceof Bt && console.error(t);
                        }
                        return t;
                    }, []);
                    l(), zt(f, function() {
                        r("active"), r("complete"), a("pending"), "function" == typeof e && e();
                    });
                }
            }
        }
    }
    function ee(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null, n = Zt(t);
        n && zt([ n ], e);
    }
    var ne = function() {
        var t = g, e = R.familyPrefix, n = R.replacementClass, r = 'svg:not(:root).svg-inline--fa {\n  overflow: visible; }\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -.125em; }\n  .svg-inline--fa.fa-lg {\n    vertical-align: -.225em; }\n  .svg-inline--fa.fa-w-1 {\n    width: 0.0625em; }\n  .svg-inline--fa.fa-w-2 {\n    width: 0.125em; }\n  .svg-inline--fa.fa-w-3 {\n    width: 0.1875em; }\n  .svg-inline--fa.fa-w-4 {\n    width: 0.25em; }\n  .svg-inline--fa.fa-w-5 {\n    width: 0.3125em; }\n  .svg-inline--fa.fa-w-6 {\n    width: 0.375em; }\n  .svg-inline--fa.fa-w-7 {\n    width: 0.4375em; }\n  .svg-inline--fa.fa-w-8 {\n    width: 0.5em; }\n  .svg-inline--fa.fa-w-9 {\n    width: 0.5625em; }\n  .svg-inline--fa.fa-w-10 {\n    width: 0.625em; }\n  .svg-inline--fa.fa-w-11 {\n    width: 0.6875em; }\n  .svg-inline--fa.fa-w-12 {\n    width: 0.75em; }\n  .svg-inline--fa.fa-w-13 {\n    width: 0.8125em; }\n  .svg-inline--fa.fa-w-14 {\n    width: 0.875em; }\n  .svg-inline--fa.fa-w-15 {\n    width: 0.9375em; }\n  .svg-inline--fa.fa-w-16 {\n    width: 1em; }\n  .svg-inline--fa.fa-w-17 {\n    width: 1.0625em; }\n  .svg-inline--fa.fa-w-18 {\n    width: 1.125em; }\n  .svg-inline--fa.fa-w-19 {\n    width: 1.1875em; }\n  .svg-inline--fa.fa-w-20 {\n    width: 1.25em; }\n  .svg-inline--fa.fa-pull-left {\n    margin-right: .3em;\n    width: auto; }\n  .svg-inline--fa.fa-pull-right {\n    margin-left: .3em;\n    width: auto; }\n  .svg-inline--fa.fa-border {\n    height: 1.5em; }\n  .svg-inline--fa.fa-li {\n    width: 2em; }\n  .svg-inline--fa.fa-fw {\n    width: 1.25em; }\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -.125em;\n  width: 1em; }\n  .fa-layers svg.svg-inline--fa {\n    -webkit-transform-origin: center center;\n            transform-origin: center center; }\n\n.fa-layers-text, .fa-layers-counter {\n  display: inline-block;\n  position: absolute;\n  text-align: center; }\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center; }\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: .25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right; }\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right; }\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left; }\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right; }\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top left;\n          transform-origin: top left; }\n\n.fa-lg {\n  font-size: 1.33333em;\n  line-height: 0.75em;\n  vertical-align: -.0667em; }\n\n.fa-xs {\n  font-size: .75em; }\n\n.fa-sm {\n  font-size: .875em; }\n\n.fa-1x {\n  font-size: 1em; }\n\n.fa-2x {\n  font-size: 2em; }\n\n.fa-3x {\n  font-size: 3em; }\n\n.fa-4x {\n  font-size: 4em; }\n\n.fa-5x {\n  font-size: 5em; }\n\n.fa-6x {\n  font-size: 6em; }\n\n.fa-7x {\n  font-size: 7em; }\n\n.fa-8x {\n  font-size: 8em; }\n\n.fa-9x {\n  font-size: 9em; }\n\n.fa-10x {\n  font-size: 10em; }\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em; }\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0; }\n  .fa-ul > li {\n    position: relative; }\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit; }\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: .1em;\n  padding: .2em .25em .15em; }\n\n.fa-pull-left {\n  float: left; }\n\n.fa-pull-right {\n  float: right; }\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: .3em; }\n\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: .3em; }\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear; }\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8); }\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n.fa-rotate-90 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg); }\n\n.fa-rotate-180 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg); }\n\n.fa-rotate-270 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg); }\n\n.fa-flip-horizontal {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1); }\n\n.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1); }\n\n.fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1); }\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  -webkit-filter: none;\n          filter: none; }\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2em; }\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1em; }\n\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2em; }\n\n.fa-inverse {\n  color: #fff; }\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto; }\n';
        if ("fa" !== e || n !== t) {
            var a = new RegExp("\\.fa\\-", "g"), i = new RegExp("\\." + t, "g");
            r = r.replace(a, "." + e + "-").replace(i, "." + n);
        }
        return r;
    };
    function re(t) {
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
    function ae() {
        R.autoAddCss && !fe && (Y(ne()), fe = !0);
    }
    function ie(e, t) {
        return Object.defineProperty(e, "abstract", {
            get: t
        }), Object.defineProperty(e, "html", {
            get: function() {
                return e.abstract.map(function(t) {
                    return Ct(t);
                });
            }
        }), Object.defineProperty(e, "node", {
            get: function() {
                if (c) {
                    var t = d.createElement("div");
                    return t.innerHTML = e.html, t.children;
                }
            }
        }), e;
    }
    function oe(t) {
        var e = t.prefix, n = void 0 === e ? "fa" : e, r = t.iconName;
        if (r) return kt(le.definitions, n, r) || kt(H.styles, n, r);
    }
    var se, le = new (function() {
        function t() {
            S(this, t), this.definitions = {};
        }
        return L(t, [ {
            key: "add",
            value: function() {
                for (var e = this, t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                var a = n.reduce(this._pullDefinitions, {});
                Object.keys(a).forEach(function(t) {
                    e.definitions[t] = E({}, e.definitions[t] || {}, a[t]), function t(e, r) {
                        var n = Object.keys(r).reduce(function(t, e) {
                            var n = r[e];
                            return n.icon ? t[n.iconName] = n.icon : t[e] = n, t;
                        }, {});
                        "function" == typeof H.hooks.addPack ? H.hooks.addPack(e, n) : H.styles[e] = E({}, H.styles[e] || {}, n), 
                        "fas" === e && t("fa", r);
                    }(t, a[t]);
                });
            }
        }, {
            key: "reset",
            value: function() {
                this.definitions = {};
            }
        }, {
            key: "_pullDefinitions",
            value: function(i, t) {
                var o = t.prefix && t.iconName && t.icon ? {
                    0: t
                } : t;
                return Object.keys(o).map(function(t) {
                    var e = o[t], n = e.prefix, r = e.iconName, a = e.icon;
                    i[n] || (i[n] = {}), i[n][r] = a;
                }), i;
            }
        } ]), t;
    }())(), fe = !1, ce = {
        i2svg: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            if (c) {
                ae();
                var e = t.node, n = void 0 === e ? d : e, r = t.callback, a = void 0 === r ? function() {} : r;
                R.searchPseudoElements && $t(n), te(n, a);
            }
        },
        css: ne,
        insertCss: function() {
            fe || (Y(ne()), fe = !0);
        },
        watch: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, e = t.autoReplaceSvgRoot, n = t.observeMutationsRoot;
            !1 === R.autoReplaceSvg && (R.autoReplaceSvg = !0), R.observeMutations = !0, B(function() {
                de({
                    autoReplaceSvgRoot: e
                }), Et({
                    treeCallback: te,
                    nodeCallback: ee,
                    pseudoElementsCallback: $t,
                    observeMutationsRoot: n
                });
            });
        }
    }, ue = (se = function(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, n = e.transform, r = void 0 === n ? _ : n, a = e.symbol, i = void 0 !== a && a, o = e.mask, s = void 0 === o ? null : o, l = e.title, f = void 0 === l ? null : l, c = e.classes, u = void 0 === c ? [] : c, m = e.attributes, d = void 0 === m ? {} : m, g = e.styles, h = void 0 === g ? {} : g;
        if (t) {
            var p = t.prefix, v = t.iconName, b = t.icon;
            return ie(E({
                type: "icon"
            }, t), function() {
                return ae(), R.autoA11y && (f ? d["aria-labelledby"] = R.replacementClass + "-title-" + q() : d["aria-hidden"] = "true"), 
                at({
                    icons: {
                        main: re(b),
                        mask: s ? re(s.icon) : {
                            found: !1,
                            width: null,
                            height: null,
                            icon: {}
                        }
                    },
                    prefix: p,
                    iconName: v,
                    transform: E({}, _, r),
                    symbol: i,
                    title: f,
                    extra: {
                        attributes: d,
                        styles: h,
                        classes: u
                    }
                });
            });
        }
    }, function(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, n = (t || {}).icon ? t : oe(t || {}), r = e.mask;
        return r && (r = (r || {}).icon ? r : oe(r || {})), se(n, E({}, e, {
            mask: r
        }));
    }), me = {
        noAuto: function() {
            R.autoReplaceSvg = !1, R.observeMutations = !1, Lt && Lt.disconnect();
        },
        config: R,
        dom: ce,
        library: le,
        parse: {
            transform: function(t) {
                return jt(t);
            }
        },
        findIconDefinition: oe,
        icon: ue,
        text: function(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, n = e.transform, r = void 0 === n ? _ : n, a = e.title, i = void 0 === a ? null : a, o = e.classes, s = void 0 === o ? [] : o, l = e.attributes, f = void 0 === l ? {} : l, c = e.styles, u = void 0 === c ? {} : c;
            return ie({
                type: "text",
                content: t
            }, function() {
                return ae(), it({
                    content: t,
                    transform: E({}, _, r),
                    title: i,
                    extra: {
                        attributes: f,
                        styles: u,
                        classes: [ R.familyPrefix + "-layers-text" ].concat(P(s))
                    }
                });
            });
        },
        counter: function(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, n = e.title, r = void 0 === n ? null : n, a = e.classes, i = void 0 === a ? [] : a, o = e.attributes, s = void 0 === o ? {} : o, l = e.styles, f = void 0 === l ? {} : l;
            return ie({
                type: "counter",
                content: t
            }, function() {
                return ae(), function(t) {
                    var e = t.content, n = t.title, r = t.extra, a = E({}, r.attributes, n ? {
                        title: n
                    } : {}, {
                        class: r.classes.join(" ")
                    }), i = J(r.styles);
                    0 < i.length && (a.style = i);
                    var o = [];
                    return o.push({
                        tag: "span",
                        attributes: a,
                        children: [ e ]
                    }), n && o.push({
                        tag: "span",
                        attributes: {
                            class: "sr-only"
                        },
                        children: [ n ]
                    }), o;
                }({
                    content: t.toString(),
                    title: r,
                    extra: {
                        attributes: s,
                        styles: f,
                        classes: [ R.familyPrefix + "-layers-counter" ].concat(P(i))
                    }
                });
            });
        },
        layer: function(t) {
            return ie({
                type: "layer"
            }, function() {
                ae();
                var e = [];
                return t(function(t) {
                    Array.isArray(t) ? t.map(function(t) {
                        e = e.concat(t.abstract);
                    }) : e = e.concat(t.abstract);
                }), [ {
                    tag: "span",
                    attributes: {
                        class: R.familyPrefix + "-layers"
                    },
                    children: e
                } ];
            });
        },
        toHtml: Ct
    }, de = function() {
        var t = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).autoReplaceSvgRoot, e = void 0 === t ? d : t;
        0 < Object.keys(H.styles).length && c && R.autoReplaceSvg && me.dom.i2svg({
            node: e
        });
    };
    !function(t) {
        try {
            t();
        } catch (t) {
            if (!w) throw t;
        }
    }(function() {
        f && (m.FontAwesome || (m.FontAwesome = me), B(function() {
            de(), Et({
                treeCallback: te,
                nodeCallback: ee,
                pseudoElementsCallback: $t
            });
        })), H.hooks = E({}, H.hooks, {
            addPack: function(t, e) {
                H.styles[t] = E({}, H.styles[t] || {}, e), vt(), de();
            },
            addShims: function(t) {
                var e;
                (e = H.shims).push.apply(e, P(t)), vt(), de();
            }
        });
    });
}();