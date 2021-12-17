!function () {
    "use strict";
    var r, e = {
        968: function (r, e, t) {
            var n = t(755), o = t.n(n);

            function u(r, e) {
                var t = Object.keys(r);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(r);
                    e && (n = n.filter((function (e) {
                        return Object.getOwnPropertyDescriptor(r, e).enumerable
                    }))), t.push.apply(t, n)
                }
                return t
            }

            function c(r, e, t) {
                return e in r ? Object.defineProperty(r, e, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : r[e] = t, r
            }

            var i = function (r) {
                for (var e = 1; e < arguments.length; e++) {
                    var t = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? u(Object(t), !0).forEach((function (e) {
                        c(r, e, t[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(t)) : u(Object(t)).forEach((function (e) {
                        Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(t, e))
                    }))
                }
                return r
            }({name: "Danila", age: 32}, {language: "JavaScript", framework: "Pug"});
            o()(".block").html("Jquery работает"), console.log(i)
        }
    }, t = {};

    function n(r) {
        var o = t[r];
        if (void 0 !== o) return o.exports;
        var u = t[r] = {exports: {}};
        return e[r].call(u.exports, u, u.exports, n), u.exports
    }

    n.m = e, r = [], n.O = function (e, t, o, u) {
        if (!t) {
            var c = 1 / 0;
            for (l = 0; l < r.length; l++) {
                t = r[l][0], o = r[l][1], u = r[l][2];
                for (var i = !0, a = 0; a < t.length; a++) (!1 & u || c >= u) && Object.keys(n.O).every((function (r) {
                    return n.O[r](t[a])
                })) ? t.splice(a--, 1) : (i = !1, u < c && (c = u));
                if (i) {
                    r.splice(l--, 1);
                    var f = o();
                    void 0 !== f && (e = f)
                }
            }
            return e
        }
        u = u || 0;
        for (var l = r.length; l > 0 && r[l - 1][2] > u; l--) r[l] = r[l - 1];
        r[l] = [t, o, u]
    }, n.n = function (r) {
        var e = r && r.__esModule ? function () {
            return r.default
        } : function () {
            return r
        };
        return n.d(e, {a: e}), e
    }, n.d = function (r, e) {
        for (var t in e) n.o(e, t) && !n.o(r, t) && Object.defineProperty(r, t, {enumerable: !0, get: e[t]})
    }, n.o = function (r, e) {
        return Object.prototype.hasOwnProperty.call(r, e)
    }, function () {
        var r = {787: 0};
        n.O.j = function (e) {
            return 0 === r[e]
        };
        var e = function (e, t) {
            var o, u, c = t[0], i = t[1], a = t[2], f = 0;
            if (c.some((function (e) {
                return 0 !== r[e]
            }))) {
                for (o in i) n.o(i, o) && (n.m[o] = i[o]);
                if (a) var l = a(n)
            }
            for (e && e(t); f < c.length; f++) u = c[f], n.o(r, u) && r[u] && r[u][0](), r[c[f]] = 0;
            return n.O(l)
        }, t = self.webpackChunkmetalab_task2 = self.webpackChunkmetalab_task2 || [];
        t.forEach(e.bind(null, 0)), t.push = e.bind(null, t.push.bind(t))
    }();
    var o = n.O(void 0, [755], (function () {
        return n(968)
    }));
    o = n.O(o)
}();
//# sourceMappingURL=scripts.58b8cc16b314e1eb609b.js.map