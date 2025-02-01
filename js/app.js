! function(e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).barbaPrefetch = t()
}(this, function() {
	var e, t = window.requestIdleCallback || function(e) {
		var t = Date.now();
		return setTimeout(function() {
			e({
				didTimeout: !1,
				timeRemaining: function() {
					return Math.max(0, 50 - (Date.now() - t))
				}
			})
		}, 1)
	};
	return (e = n.prototype).install = function(e, t) {
		var t = void 0 === t ? {} : t,
			n = t.root,
			n = void 0 === n ? document.body : n,
			t = t.timeout,
			t = void 0 === t ? 2e3 : t;
		this.logger = new e.Logger(this.name), this.logger.info(this.version), this.barba = e, this.root = n, this.timeout = t
	}, e.init = function() {
		var n = this;
		this.barba.prefetchIgnore ? this.logger.warn("barba.prefetchIgnore is enabled") : this.barba.cacheIgnore ? this.logger.warn("barba.cacheIgnore is enabled") : (this.observer = new IntersectionObserver(function(e) {
			e.forEach(function(e) {
				var t;
				e.isIntersecting && (e = e.target, t = n.barba.dom.getHref(e), n.toPrefetch.has(t)) && (n.observer.unobserve(e), n.barba.cache.has(t) ? n.barba.cache.update(t, {
					action: "prefetch"
				}) : n.barba.cache.set(t, n.barba.request(t, n.barba.timeout, n.barba.onRequestError.bind(n.barba, "barba")).catch(function(e) {
					n.logger.error(e)
				}), "prefetch"))
			})
		}), this.observe(), this.barba.hooks.after(this.observe, this))
	}, e.observe = function() {
		var r = this;
		t(function() {
			r.root.querySelectorAll("a").forEach(function(e) {
				var t = e,
					n = r.barba.dom.getHref(t);
				r.barba.cache.has(n) || r.barba.prevent.checkHref(n) || r.barba.prevent.checkLink(t, {}, n) || (r.observer.observe(e), r.toPrefetch.add(n))
			})
		}, {
			timeout: this.timeout
		})
	}, new n;

	function n() {
		this.name = "@barba/prefetch", this.version = "2.1.10", this.toPrefetch = new Set
	}
}),
function(e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).barba = t()
}(this, function() {
	function r(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
		}
	}

	function e(e, t, n) {
		t && r(e.prototype, t), n && r(e, n)
	}

	function f() {
		return (f = Object.assign || function(e) {
			for (var t = 1; t < arguments.length; t++) {
				var n, r = arguments[t];
				for (n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
			}
			return e
		}).apply(this, arguments)
	}

	function t(e, t) {
		e.prototype = Object.create(t.prototype), (e.prototype.constructor = e).__proto__ = t
	}

	function o(e) {
		return (o = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
			return e.__proto__ || Object.getPrototypeOf(e)
		})(e)
	}

	function i(e, t) {
		return (i = Object.setPrototypeOf || function(e, t) {
			return e.__proto__ = t, e
		})(e, t)
	}

	function H(e, t, n) {
		return (H = function() {
			if ("undefined" != typeof Reflect && Reflect.construct && !Reflect.construct.sham) {
				if ("function" == typeof Proxy) return 1;
				try {
					return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 1
				} catch (e) {}
			}
		}() ? Reflect.construct : function(e, t, n) {
			var r = [null],
				t = (r.push.apply(r, t), new(Function.bind.apply(e, r)));
			return n && i(t, n.prototype), t
		}).apply(null, arguments)
	}

	function O(e) {
		var n = "function" == typeof Map ? new Map : void 0;
		return function(e) {
			if (null === e || -1 === Function.toString.call(e).indexOf("[native code]")) return e;
			if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
			if (void 0 !== n) {
				if (n.has(e)) return n.get(e);
				n.set(e, t)
			}

			function t() {
				return H(e, arguments, o(this).constructor)
			}
			return t.prototype = Object.create(e.prototype, {
				constructor: {
					value: t,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), i(t, e)
		}(e)
	}

	function h(e, t) {
		try {
			var n = e()
		} catch (e) {
			return t(e)
		}
		return n && n.then ? n.then(void 0, t) : n
	}
	"undefined" == typeof Symbol || Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")), "undefined" == typeof Symbol || Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"));
	(n = a = a || {})[n.off = 0] = "off", n[n.error = 1] = "error", n[n.warning = 2] = "warning", n[n.info = 3] = "info", n[n.debug = 4] = "debug";
	var a, I = a.off,
		p = (d.getLevel = function() {
			return I
		}, d.setLevel = function(e) {
			return I = a[e]
		}, (n = d.prototype).error = function() {
			for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
			this.i(console.error, a.error, t)
		}, n.warn = function() {
			for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
			this.i(console.warn, a.warning, t)
		}, n.info = function() {
			for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
			this.i(console.info, a.info, t)
		}, n.debug = function() {
			for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
			this.i(console.log, a.debug, t)
		}, n.i = function(e, t, n) {
			t <= d.getLevel() && e.apply(console, ["[" + this.t + "] "].concat(n))
		}, d),
		n = y,
		s = B,
		u = g,
		c = F,
		l = W,
		M = "/",
		_ = new RegExp(["(\\\\.)", "(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"), "g");

	function d(e) {
		this.t = e
	}

	function g(e, t) {
		for (var n = [], r = 0, o = 0, i = "", a = t && t.delimiter || M, s = t && t.whitelist || void 0, u = !1; null !== (l = _.exec(e));) {
			var c, l, f, h, p = l[0],
				d = l[1],
				g = l.index;
			i += e.slice(o, g), o = g + p.length, d ? (i += d[1], u = !0) : (g = "", p = l[2], d = l[3], c = l[4], l = l[5], !u && i.length && (h = i[f = i.length - 1], !s || -1 < s.indexOf(h)) && (g = h, i = i.slice(0, f)), i && (n.push(i), i = "", u = !1), n.push({
				name: p || r++,
				prefix: g,
				delimiter: h = g || a,
				optional: "?" === l || "*" === l,
				repeat: "+" === l || "*" === l,
				pattern: (f = d || c) ? f.replace(/([=!:$/()])/g, "\\$1") : "[^" + v(h === a ? h : h + a) + "]+?"
			}))
		}
		return (i || o < e.length) && n.push(i + e.substr(o)), n
	}

	function B(u, c) {
		return function(e, t) {
			var n = u.exec(e);
			if (!n) return !1;
			for (var r, e = n[0], o = n.index, i = {}, a = t && t.decode || decodeURIComponent, s = 1; s < n.length; s++) void 0 !== n[s] && (i[(r = c[s - 1]).name] = r.repeat ? n[s].split(r.delimiter).map(function(e) {
				return a(e, r)
			}) : a(n[s], r));
			return {
				path: e,
				index: o,
				params: i
			}
		}
	}

	function F(l, e) {
		for (var f = new Array(l.length), t = 0; t < l.length; t++) "object" == typeof l[t] && (f[t] = new RegExp("^(?:" + l[t].pattern + ")$", m(e)));
		return function(e, t) {
			for (var n = "", r = t && t.encode || encodeURIComponent, o = !t || !1 !== t.validate, i = 0; i < l.length; i++) {
				var a = l[i];
				if ("string" != typeof a) {
					var s, u = e ? e[a.name] : void 0;
					if (Array.isArray(u)) {
						if (!a.repeat) throw new TypeError('Expected "' + a.name + '" to not repeat, but got array');
						if (0 === u.length) {
							if (a.optional) continue;
							throw new TypeError('Expected "' + a.name + '" to not be empty')
						}
						for (var c = 0; c < u.length; c++) {
							if (s = r(u[c], a), o && !f[i].test(s)) throw new TypeError('Expected all "' + a.name + '" to match "' + a.pattern + '"');
							n += (0 === c ? a.prefix : a.delimiter) + s
						}
					} else if ("string" != typeof u && "number" != typeof u && "boolean" != typeof u) {
						if (!a.optional) throw new TypeError('Expected "' + a.name + '" to be ' + (a.repeat ? "an array" : "a string"))
					} else {
						if (s = r(String(u), a), o && !f[i].test(s)) throw new TypeError('Expected "' + a.name + '" to match "' + a.pattern + '", but got "' + s + '"');
						n += a.prefix + s
					}
				} else n += a
			}
			return n
		}
	}

	function v(e) {
		return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1")
	}

	function m(e) {
		return e && e.sensitive ? "" : "i"
	}

	function W(e, t, n) {
		for (var r = (n = n || {}).strict, o = !1 !== n.start, i = !1 !== n.end, a = n.delimiter || M, s = [].concat(n.endsWith || []).map(v).concat("$").join("|"), u = o ? "^" : "", c = 0; c < e.length; c++) {
			var l, f = e[c];
			"string" == typeof f ? u += v(f) : (l = f.repeat ? "(?:" + f.pattern + ")(?:" + v(f.delimiter) + "(?:" + f.pattern + "))*" : f.pattern, t && t.push(f), u += f.optional ? f.prefix ? "(?:" + v(f.prefix) + "(" + l + "))?" : "(" + l + ")?" : v(f.prefix) + "(" + l + ")")
		}
		return i ? (r || (u += "(?:" + v(a) + ")?"), u += "$" === s ? "$" : "(?=" + s + ")") : (i = "string" == typeof(o = e[e.length - 1]) ? o[o.length - 1] === a : void 0 === o, r || (u += "(?:" + v(a) + "(?=" + s + "))?"), i || (u += "(?=" + v(a) + "|" + s + ")")), new RegExp(u, m(n))
	}

	function y(e, t, n) {
		if (e instanceof RegExp) {
			var r = e,
				o = t;
			if (o) {
				var i = r.source.match(/\((?!\?)/g);
				if (i)
					for (var a = 0; a < i.length; a++) o.push({
						name: a,
						prefix: null,
						delimiter: null,
						optional: !1,
						repeat: !1,
						pattern: null
					})
			}
			return r
		}
		if (Array.isArray(e)) {
			for (var s = e, u = t, c = n, l = [], f = 0; f < s.length; f++) l.push(y(s[f], u, c).source);
			return new RegExp("(?:" + l.join("|") + ")", m(c))
		}
		return r = t, W(g(e, t = n), r, t)
	}
	n.match = function(e, t) {
		var n = [];
		return B(y(e, n, t), n)
	}, n.regexpToFunction = s, n.parse = u, n.compile = function(e, t) {
		return F(g(e, t), t)
	}, n.tokensToFunction = c, n.tokensToRegExp = l;

	function b(e, r) {
		try {
			var t = function() {
				if (!r.next.html) return Promise.resolve(e).then(function(e) {
					var t, n = r.next;
					e && (t = E.toElement(e), n.namespace = E.getNamespace(t), n.container = E.getContainer(t), n.html = e, U.update({
						ns: n.namespace
					}), t = E.toDocument(e), document.title = t.title)
				})
			}();
			return Promise.resolve(t && t.then ? t.then(function() {}) : void 0)
		} catch (e) {
			return Promise.reject(e)
		}
	}

	function x(e) {
		return void 0 === e && (e = window.location.href), w(e).port
	}

	function w(e) {
		var t;
		null === (r = e.match(/:\d+/)) ? (/^http/.test(e) && (t = 80), /^https/.test(e) && (t = 443)) : (r = r[0].substring(1), t = parseInt(r, 10));
		var n, r = e.replace(V(), ""),
			e = {},
			o = r.indexOf("#");
		return 0 <= o && (n = r.slice(o + 1), r = r.slice(0, o)), 0 <= (o = r.indexOf("?")) && (e = Y(r.slice(o + 1)), r = r.slice(0, o)), {
			hash: n,
			path: r,
			port: t,
			query: e
		}
	}

	function T(e) {
		return (e = void 0 === e ? window.location.href : e).replace(/(\/#.*|\/|#.*)$/, "")
	}
	var C = {
			container: "container",
			history: "history",
			namespace: "namespace",
			prefix: "data-barba",
			prevent: "prevent",
			wrapper: "wrapper"
		},
		E = ((s = Q.prototype).toString = function(e) {
			return e.outerHTML
		}, s.toDocument = function(e) {
			return this.u.parseFromString(e, "text/html")
		}, s.toElement = function(e) {
			var t = document.createElement("div");
			return t.innerHTML = e, t
		}, s.getHtml = function(e) {
			return void 0 === e && (e = document), this.toString(e.documentElement)
		}, s.getWrapper = function(e) {
			return (e = void 0 === e ? document : e).querySelector("[" + this.o.prefix + '="' + this.o.wrapper + '"]')
		}, s.getContainer = function(e) {
			return (e = void 0 === e ? document : e).querySelector("[" + this.o.prefix + '="' + this.o.container + '"]')
		}, s.removeContainer = function(e) {
			document.body.contains(e) && e.parentNode.removeChild(e)
		}, s.addContainer = function(e, t) {
			var n = this.getContainer();
			n ? this.s(e, n) : t.appendChild(e)
		}, s.getNamespace = function(e) {
			e = (e = void 0 === e ? document : e).querySelector("[" + this.o.prefix + "-" + this.o.namespace + "]");
			return e ? e.getAttribute(this.o.prefix + "-" + this.o.namespace) : null
		}, s.getHref = function(e) {
			if (e.tagName && "a" === e.tagName.toLowerCase()) {
				if ("string" == typeof e.href) return e.href;
				e = e.getAttribute("href") || e.getAttribute("xlink:href");
				if (e) return this.resolveUrl(e.baseVal || e)
			}
			return null
		}, s.resolveUrl = function() {
			for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
			var r = t.length;
			if (0 === r) throw new Error("resolveUrl requires at least one argument; got none.");
			var o = document.createElement("base");
			if (o.href = arguments[0], 1 === r) return o.href;
			var i = document.getElementsByTagName("head")[0];
			i.insertBefore(o, i.firstChild);
			for (var a, s = document.createElement("a"), u = 1; u < r; u++) s.href = arguments[u], o.href = a = s.href;
			return i.removeChild(o), a
		}, s.s = function(e, t) {
			t.parentNode.insertBefore(e, t.nextSibling)
		}, new Q),
		U = ((u = k.prototype).init = function(e, t) {
			this.l = "barba";
			t = {
				ns: t,
				scroll: {
					x: window.scrollX,
					y: window.scrollY
				},
				url: e
			}, this.h.push(t), this.v = 0, t = {
				from: this.l,
				index: 0,
				states: [].concat(this.h)
			};
			window.history && window.history.replaceState(t, "", e)
		}, u.change = function(e, t, n) {
			var r;
			return n && n.state ? (r = (n = n.state).index, t = this.m(this.v - r), this.replace(n.states), this.v = r) : this.add(e, t), t
		}, u.add = function(e, t) {
			var n = this.size,
				t = this.p(t),
				r = {
					ns: "tmp",
					scroll: {
						x: window.scrollX,
						y: window.scrollY
					},
					url: e
				},
				o = (this.h.push(r), this.v = n, {
					from: this.l,
					index: n,
					states: [].concat(this.h)
				});
			switch (t) {
				case "push":
					window.history && window.history.pushState(o, "", e);
					break;
				case "replace":
					window.history && window.history.replaceState(o, "", e)
			}
		}, u.update = function(e, t) {
			t = t || this.v, e = f({}, this.get(t), {}, e);
			this.set(t, e)
		}, u.remove = function(e) {
			e ? this.h.splice(e, 1) : this.h.pop(), this.v--
		}, u.clear = function() {
			this.h = [], this.v = -1
		}, u.replace = function(e) {
			this.h = e
		}, u.get = function(e) {
			return this.h[e]
		}, u.set = function(e, t) {
			return this.h[e] = t
		}, u.p = function(e) {
			var t = "push",
				n = C.prefix + "-" + C.history;
			return t = e.hasAttribute && e.hasAttribute(n) ? e.getAttribute(n) : t
		}, u.m = function(e) {
			return 1 < Math.abs(e) ? 0 < e ? "forward" : "back" : 0 === e ? "popstate" : 0 < e ? "back" : "forward"
		}, e(k, [{
			key: "current",
			get: function() {
				return this.h[this.v]
			}
		}, {
			key: "state",
			get: function() {
				return this.h[this.h.length - 1]
			}
		}, {
			key: "previous",
			get: function() {
				return this.v < 1 ? null : this.h[this.v - 1]
			}
		}, {
			key: "size",
			get: function() {
				return this.h.length
			}
		}]), new k),
		z = n,
		X = {
			__proto__: null,
			update: b,
			nextTick: function() {
				return new Promise(function(e) {
					window.requestAnimationFrame(e)
				})
			},
			pathToRegexp: z
		},
		V = function() {
			return window.location.origin
		},
		Y = function(e) {
			return e.split("&").reduce(function(e, t) {
				t = t.split("=");
				return e[t[0]] = t[1], e
			}, {})
		},
		G = {
			__proto__: null,
			getHref: function() {
				return window.location.href
			},
			getOrigin: V,
			getPort: x,
			getPath: function(e) {
				return void 0 === e && (e = window.location.href), w(e).path
			},
			parse: w,
			parseQuery: Y,
			clean: T
		};

	function k() {
		this.h = [], this.v = -1
	}

	function Q() {
		this.o = C, this.u = new DOMParser
	}

	function K(o, i, a) {
		return void 0 === i && (i = 2e3), new Promise(function(t, n) {
			var r = new XMLHttpRequest;
			r.onreadystatechange = function() {
				var e;
				r.readyState === XMLHttpRequest.DONE && (200 === r.status ? t(r.responseText) : r.status && (e = {
					status: r.status,
					statusText: r.statusText
				}, a(o, e), n(e)))
			}, r.ontimeout = function() {
				var e = new Error("Timeout error [" + i + "]");
				a(o, e), n(e)
			}, r.onerror = function() {
				var e = new Error("Fetch error");
				a(o, e), n(e)
			}, r.open("GET", o), r.timeout = i, r.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml"), r.setRequestHeader("x-barba", "yes"), r.send()
		})
	}

	function S(a, s) {
		return void 0 === s && (s = {}),
			function() {
				for (var e = arguments.length, o = new Array(e), t = 0; t < e; t++) o[t] = arguments[t];
				var i = !1;
				return new Promise(function(n, r) {
					s.async = function() {
						return i = !0,
							function(e, t) {
								e ? r(e) : n(t)
							}
					};
					var e, t = a.apply(s, o);
					i || (!(e = t) || "object" != typeof e && "function" != typeof e || "function" != typeof e.then ? n(t) : t.then(n, r))
				})
			}
	}

	function J() {
		return !window.history.pushState
	}

	function Z(e) {
		return !e.el || !e.href
	}

	function ee(e) {
		return 1 < (e = e.event).which || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
	}

	function te(e) {
		return (e = e.el).hasAttribute("target") && "_blank" === e.target
	}

	function ne(e) {
		return void 0 !== (e = e.el).protocol && window.location.protocol !== e.protocol || void 0 !== e.hostname && window.location.hostname !== e.hostname
	}

	function re(e) {
		return void 0 !== (e = e.el).port && x() !== x(e.href)
	}

	function oe(e) {
		return (e = e.el).getAttribute && "string" == typeof e.getAttribute("download")
	}

	function ie(e) {
		return e.el.hasAttribute(C.prefix + "-" + C.prevent)
	}

	function ae(e) {
		return Boolean(e.el.closest("[" + C.prefix + "-" + C.prevent + '="all"]'))
	}

	function se(e) {
		return e = e.href, T(e) === T() && x(e) === x()
	}
	t(L, le = function() {}), (c = L.prototype).init = function() {
		var r = this;
		this.registered.clear(), this.all.forEach(function(n) {
			r[n] || (r[n] = function(e, t) {
				r.registered.has(n) || r.registered.set(n, new Set), r.registered.get(n).add({
					ctx: t || {},
					fn: e
				})
			})
		})
	}, c.do = function(t) {
		for (var n, r = this, e = arguments.length, o = new Array(1 < e ? e - 1 : 0), i = 1; i < e; i++) o[i - 1] = arguments[i];
		return this.registered.has(t) ? (n = Promise.resolve(), this.registered.get(t).forEach(function(e) {
			n = n.then(function() {
				return S(e.fn, e.ctx).apply(void 0, o)
			})
		}), n.catch(function(e) {
			r.logger.debug("Hook error [" + t + "]"), r.logger.error(e)
		})) : Promise.resolve()
	}, c.clear = function() {
		var t = this;
		this.all.forEach(function(e) {
			delete t[e]
		}), this.init()
	}, c.help = function() {
		this.logger.info("Available hooks: " + this.all.join(","));
		var n = [];
		this.registered.forEach(function(e, t) {
			return n.push(t)
		}), this.logger.info("Registered hooks: " + n.join(","))
	};
	var $, ue, ce, le, A = new L,
		l = (ye.prototype.checkHref = function(e) {
			var t;
			return "boolean" == typeof this.g ? this.g : (t = w(e).path, this.P.some(function(e) {
				return null !== e.exec(t)
			}))
		}, ye),
		fe = (t(D, ce = l), (s = D.prototype).set = function(e, t, n) {
			return this.k.set(e, {
				action: n,
				request: t
			}), {
				action: n,
				request: t
			}
		}, s.get = function(e) {
			return this.k.get(e)
		}, s.getRequest = function(e) {
			return this.k.get(e).request
		}, s.getAction = function(e) {
			return this.k.get(e).action
		}, s.has = function(e) {
			return !this.checkHref(e) && this.k.has(e)
		}, s.delete = function(e) {
			return this.k.delete(e)
		}, s.update = function(e, t) {
			t = f({}, this.k.get(e), {}, t);
			return this.k.set(e, t), t
		}, D),
		he = (t(N, ue = l), (u = N.prototype).init = function() {
			this.add("pushState", J), this.add("exists", Z), this.add("newTab", ee), this.add("blank", te), this.add("corsDomain", ne), this.add("corsPort", re), this.add("download", oe), this.add("preventSelf", ie), this.add("preventAll", ae), this.add("sameUrl", se, !1)
		}, u.add = function(e, t, n) {
			void 0 === n && (n = !0), this.tests.set(e, t), n && this.suite.push(e)
		}, u.run = function(e, t, n, r) {
			return this.tests.get(e)({
				el: t,
				event: n,
				href: r
			})
		}, u.checkLink = function(t, n, r) {
			var o = this;
			return this.suite.some(function(e) {
				return o.run(e, t, n, r)
			})
		}, N),
		j = (t(q, $ = O(Error)), q),
		pe = ((n = me.prototype).add = function(e, t) {
			"rule" === e ? this.A.splice(t.position || 0, 0, t.value) : this.all.push(t), this.update()
		}, n.resolve = function(o, e) {
			var t, i = this,
				n = (n = (e = void 0 === e ? {} : e).once ? this.once : this.page).filter(e.self ? function(e) {
					return e.name && "self" === e.name
				} : function(e) {
					return !e.name || "self" !== e.name
				}),
				a = new Map,
				n = n.find(function(t) {
					var n = !0,
						r = {};
					return !(!e.self || "self" !== t.name) || (i.A.reverse().forEach(function(e) {
						n && (n = i.R(t, e, o, r), t.from && t.to && (n = i.R(t, e, o, r, "from") && i.R(t, e, o, r, "to")), t.from && !t.to && (n = i.R(t, e, o, r, "from")), !t.from) && t.to && (n = i.R(t, e, o, r, "to"))
					}), a.set(t, r), n)
				}),
				r = a.get(n),
				s = [];
			return s.push(e.once ? "once" : "page"), e.self && s.push("self"), r ? (t = [n], 0 < Object.keys(r).length && t.push(r), (r = this.logger).info.apply(r, ["Transition found [" + s.join(",") + "]"].concat(t))) : this.logger.info("No transition found [" + s.join(",") + "]"), n
		}, n.update = function() {
			var t = this;
			this.all = this.all.map(function(e) {
				return t.T(e)
			}).sort(function(e, t) {
				return e.priority - t.priority
			}).reverse().map(function(e) {
				return delete e.priority, e
			}), this.page = this.all.filter(function(e) {
				return void 0 !== e.leave || void 0 !== e.enter
			}), this.once = this.all.filter(function(e) {
				return void 0 !== e.once
			})
		}, n.R = function(e, t, n, r, o) {
			var i = !0,
				a = !1,
				s = t.name,
				u = s,
				c = s,
				l = s,
				f = o ? e[o] : e,
				h = "to" === o ? n.next : n.current;
			if ((!o || f) && f[s]) {
				switch (t.type) {
					case "strings":
					default:
						var p = Array.isArray(f[u]) ? f[u] : [f[u]];
						h[u] && -1 !== p.indexOf(h[u]) && (a = !0), -1 === p.indexOf(h[u]) && (i = !1);
						break;
					case "object":
						p = Array.isArray(f[c]) ? f[c] : [f[c]];
						h[c] && (h[c].name && -1 !== p.indexOf(h[c].name) && (a = !0), -1 !== p.indexOf(h[c].name)) || (i = !1);
						break;
					case "function":
						f[l](n) ? a = !0 : i = !1
				}
				a && (o ? (r[o] = r[o] || {}, r[o][s] = e[o][s]) : r[s] = e[s])
			}
			return i
		}, n.O = function(e, t, n) {
			var r = 0;
			return (e[t] || e.from && e.from[t] || e.to && e.to[t]) && (r += Math.pow(10, n), e.from && e.from[t] && (r += 1), e.to) && e.to[t] && (r += 2), r
		}, n.T = function(n) {
			var r = this,
				o = n.priority = 0;
			return this.A.forEach(function(e, t) {
				o += r.O(n, e.name, t + 1)
			}), n.priority = o, n
		}, me),
		de = ((c = P.prototype).get = function(e, t) {
			return this.store.resolve(e, t)
		}, c.doOnce = function(e) {
			var t = e.data,
				n = e.transition;
			try {
				function r() {
					o.S = !1
				}
				var o = this,
					i = n || {},
					a = (o.S = !0, h(function() {
						return Promise.resolve(o.j("beforeOnce", t, i)).then(function() {
							return Promise.resolve(o.once(t, i)).then(function() {
								return Promise.resolve(o.j("afterOnce", t, i)).then(function() {})
							})
						})
					}, function(e) {
						o.S = !1, o.logger.debug("Transition error [before/after/once]"), o.logger.error(e)
					}));
				return Promise.resolve(a && a.then ? a.then(r) : r())
			} catch (e) {
				return Promise.reject(e)
			}
		}, c.doPage = function(e) {
			var i = e.data,
				t = e.transition,
				a = e.page,
				s = e.wrapper;
			try {
				function n(e) {
					u.S = !1
				}
				var u = this,
					c = t || {},
					l = !0 === c.sync || !1,
					r = (u.S = !0, h(function() {
						function e() {
							return Promise.resolve(u.j("before", i, c)).then(function() {
								var t = !1;

								function e(e) {
									return t ? e : Promise.resolve(u.remove(i)).then(function() {
										return Promise.resolve(u.j("after", i, c)).then(function() {})
									})
								}
								var n, r, o = l ? h(function() {
									return Promise.resolve(u.add(i, s)).then(function() {
										return Promise.resolve(u.j("beforeLeave", i, c)).then(function() {
											return Promise.resolve(u.j("beforeEnter", i, c)).then(function() {
												return Promise.resolve(Promise.all([u.leave(i, c), u.enter(i, c)])).then(function() {
													return Promise.resolve(u.j("afterLeave", i, c)).then(function() {
														return Promise.resolve(u.j("afterEnter", i, c)).then(function() {})
													})
												})
											})
										})
									})
								}, function(e) {
									if (u.M(e)) throw new j(e, "Transition error [sync]")
								}) : (n = !(o = function(e) {
									return t ? e : h(function() {
										var e = function() {
											if (!1 !== n) return Promise.resolve(u.add(i, s)).then(function() {
												return Promise.resolve(u.j("beforeEnter", i, c)).then(function() {
													return Promise.resolve(u.enter(i, c, n)).then(function() {
														return Promise.resolve(u.j("afterEnter", i, c)).then(function() {})
													})
												})
											})
										}();
										if (e && e.then) return e.then(function() {})
									}, function(e) {
										if (u.M(e)) throw new j(e, "Transition error [before/after/enter]")
									})
								}), (r = h(function() {
									return Promise.resolve(u.j("beforeLeave", i, c)).then(function() {
										return Promise.resolve(Promise.all([u.leave(i, c), b(a, i)]).then(function(e) {
											return e[0]
										})).then(function(e) {
											return n = e, Promise.resolve(u.j("afterLeave", i, c)).then(function() {})
										})
									})
								}, function(e) {
									if (u.M(e)) throw new j(e, "Transition error [before/after/leave]")
								})) && r.then ? r.then(o) : o(r));
								return o && o.then ? o.then(e) : e(o)
							})
						}
						var t = function() {
							if (l) return Promise.resolve(b(a, i)).then(function() {})
						}();
						return t && t.then ? t.then(e) : e()
					}, function(e) {
						throw (u.S = !1, e.name && "BarbaError" === e.name) ? (u.logger.debug(e.label), u.logger.error(e.error)) : (u.logger.debug("Transition error [page]"), u.logger.error(e)), e
					}));
				return Promise.resolve(r && r.then ? r.then(n) : n())
			} catch (e) {
				return Promise.reject(e)
			}
		}, c.once = function(e, t) {
			try {
				return Promise.resolve(A.do("once", e, t)).then(function() {
					return t.once ? S(t.once, t)(e) : Promise.resolve()
				})
			} catch (e) {
				return Promise.reject(e)
			}
		}, c.leave = function(e, t) {
			try {
				return Promise.resolve(A.do("leave", e, t)).then(function() {
					return t.leave ? S(t.leave, t)(e) : Promise.resolve()
				})
			} catch (e) {
				return Promise.reject(e)
			}
		}, c.enter = function(e, t, n) {
			try {
				return Promise.resolve(A.do("enter", e, t)).then(function() {
					return t.enter ? S(t.enter, t)(e, n) : Promise.resolve()
				})
			} catch (e) {
				return Promise.reject(e)
			}
		}, c.add = function(e, t) {
			try {
				return E.addContainer(e.next.container, t), A.do("nextAdded", e), Promise.resolve()
			} catch (e) {
				return Promise.reject(e)
			}
		}, c.remove = function(e) {
			try {
				return E.removeContainer(e.current.container), A.do("currentRemoved", e), Promise.resolve()
			} catch (e) {
				return Promise.reject(e)
			}
		}, c.M = function(e) {
			return e.message ? !/Timeout error|Fetch error/.test(e.message) : !e.status
		}, c.j = function(e, t, n) {
			try {
				return Promise.resolve(A.do(e, t, n)).then(function() {
					return n[e] ? S(n[e], n)(t) : Promise.resolve()
				})
			} catch (e) {
				return Promise.reject(e)
			}
		}, e(P, [{
			key: "isRunning",
			get: function() {
				return this.S
			},
			set: function(e) {
				this.S = e
			}
		}, {
			key: "hasOnce",
			get: function() {
				return 0 < this.store.once.length
			}
		}, {
			key: "hasSelf",
			get: function() {
				return this.store.all.some(function(e) {
					return "self" === e.name
				})
			}
		}, {
			key: "shouldWait",
			get: function() {
				return this.store.all.some(function(e) {
					return e.to && !e.to.route || e.sync
				})
			}
		}]), P),
		ge = (ve.prototype.L = function(n) {
			var r = this;
			return function(e) {
				var t = n.match(/enter/i) ? e.next : e.current,
					t = r.byNamespace.get(t.namespace);
				return t && t[n] ? S(t[n], t)(e) : Promise.resolve()
			}
		}, ve);

	function ve(e) {
		var t = this;
		this.names = ["beforeLeave", "afterLeave", "beforeEnter", "afterEnter"], this.byNamespace = new Map, 0 !== e.length && (e.forEach(function(e) {
			t.byNamespace.set(e.namespace, e)
		}), this.names.forEach(function(e) {
			A[e](t.L(e))
		}))
	}

	function P(e) {
		void 0 === e && (e = []), this.logger = new p("@barba/core"), this.S = !1, this.store = new pe(e)
	}

	function me(e) {
		void 0 === e && (e = []), this.logger = new p("@barba/core"), this.all = [], this.page = [], this.once = [], this.A = [{
			name: "namespace",
			type: "strings"
		}, {
			name: "custom",
			type: "function"
		}], e && (this.all = this.all.concat(e)), this.update()
	}

	function q(e, t) {
		var n;
		void 0 === t && (t = "Barba error");
		for (var r = arguments.length, o = new Array(2 < r ? r - 2 : 0), i = 2; i < r; i++) o[i - 2] = arguments[i];
		return (n = $.call.apply($, [this].concat(o)) || this).error = e, n.label = t, Error.captureStackTrace && Error.captureStackTrace(function(e) {
			if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return e
		}(n), q), n.name = "BarbaError", n
	}

	function N(e) {
		return (e = ue.call(this, e) || this).suite = [], e.tests = new Map, e.init(), e
	}

	function D(e) {
		return (e = ce.call(this, e) || this).k = new Map, e
	}

	function ye(e) {
		this.P = [], "boolean" == typeof e ? this.g = e : (e = Array.isArray(e) ? e : [e], this.P = e.map(function(e) {
			return z(e)
		}))
	}

	function L() {
		var e;
		return (e = le.call(this) || this).logger = new p("@barba/core"), e.all = ["ready", "page", "reset", "currentAdded", "currentRemoved", "nextAdded", "nextRemoved", "beforeOnce", "once", "afterOnce", "before", "beforeLeave", "leave", "afterLeave", "beforeEnter", "enter", "afterEnter", "after"], e.registered = new Map, e.init(), e
	}
	Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(e) {
		var t = this;
		do {
			if (t.matches(e)) return t
		} while (null !== (t = t.parentElement || t.parentNode) && 1 === t.nodeType);
		return null
	});
	var be = {
		container: null,
		html: "",
		namespace: "",
		url: {
			hash: "",
			href: "",
			path: "",
			port: null,
			query: {}
		}
	};
	return (s = R.prototype).use = function(e, t) {
		var n = this.plugins; - 1 < n.indexOf(e) ? this.logger.warn("Plugin [" + e.name + "] already installed.") : "function" == typeof e.install ? (e.install(this, t), n.push(e)) : this.logger.warn("Plugin [" + e.name + '] has no "install" method.')
	}, s.init = function(e) {
		var e = void 0 === e ? {} : e,
			t = e.transitions,
			t = void 0 === t ? [] : t,
			n = e.views,
			n = void 0 === n ? [] : n,
			r = e.schema,
			o = void 0 === r ? C : r,
			r = e.requestError,
			i = e.timeout,
			i = void 0 === i ? 2e3 : i,
			a = e.cacheIgnore,
			a = void 0 !== a && a,
			s = e.prefetchIgnore,
			s = void 0 !== s && s,
			u = e.preventRunning,
			u = void 0 !== u && u,
			c = e.prevent,
			c = void 0 === c ? null : c,
			l = e.debug,
			e = e.logLevel;
		if (p.setLevel(!0 === (void 0 !== l && l) ? "debug" : void 0 === e ? "off" : e), this.logger.info(this.version), Object.keys(o).forEach(function(e) {
				C[e] && (C[e] = o[e])
			}), this.$ = r, this.timeout = i, this.cacheIgnore = a, this.prefetchIgnore = s, this.preventRunning = u, this._ = this.dom.getWrapper(), !this._) throw new Error("[@barba/core] No Barba wrapper found");
		this._.setAttribute("aria-live", "polite"), this.q();
		l = this.data.current;
		if (!l.container) throw new Error("[@barba/core] No Barba container found");
		if (this.cache = new fe(a), this.prevent = new he(s), this.transitions = new de(t), this.views = new ge(n), null !== c) {
			if ("function" != typeof c) throw new Error("[@barba/core] Prevent should be a function");
			this.prevent.add("preventCustom", c)
		}
		this.history.init(l.url.href, l.namespace), this.B = this.B.bind(this), this.U = this.U.bind(this), this.D = this.D.bind(this), this.F(), this.plugins.forEach(function(e) {
			return e.init()
		});
		e = this.data;
		e.trigger = "barba", e.next = e.current, e.current = f({}, this.schemaPage), this.hooks.do("ready", e), this.once(e), this.q()
	}, s.destroy = function() {
		this.q(), this.H(), this.history.clear(), this.hooks.clear(), this.plugins = []
	}, s.force = function(e) {
		window.location.assign(e)
	}, s.go = function(e, t, n) {
		var r;
		if (void 0 === t && (t = "barba"), this.transitions.isRunning) this.force(e);
		else if (!(r = "popstate" === t ? this.history.current && this.url.getPath(this.history.current.url) === this.url.getPath(e) : this.prevent.run("sameUrl", null, null, e)) || this.transitions.hasSelf) return t = this.history.change(e, t, n), n && (n.stopPropagation(), n.preventDefault()), this.page(e, t, r)
	}, s.once = function(n) {
		try {
			var r = this;
			return Promise.resolve(r.hooks.do("beforeEnter", n)).then(function() {
				function e() {
					return Promise.resolve(r.hooks.do("afterEnter", n)).then(function() {})
				}
				var t = function() {
					var e;
					if (r.transitions.hasOnce) return e = r.transitions.get(n, {
						once: !0
					}), Promise.resolve(r.transitions.doOnce({
						transition: e,
						data: n
					})).then(function() {})
				}();
				return t && t.then ? t.then(e) : e()
			})
		} catch (n) {
			return Promise.reject(n)
		}
	}, s.page = function(e, t, n) {
		try {
			function r() {
				var t = o.data;
				return Promise.resolve(o.hooks.do("page", t)).then(function() {
					var e = h(function() {
						var e = o.transitions.get(t, {
							once: !1,
							self: n
						});
						return Promise.resolve(o.transitions.doPage({
							data: t,
							page: i,
							transition: e,
							wrapper: o._
						})).then(function() {
							o.q()
						})
					}, function() {
						0 === p.getLevel() && o.force(t.current.url.href)
					});
					if (e && e.then) return e.then(function() {})
				})
			}
			var o = this,
				i = (o.data.next.url = f({
					href: e
				}, o.url.parse(e)), o.data.trigger = t, (o.cache.has(e) ? o.cache.update(e, {
					action: "click"
				}) : o.cache.set(e, o.request(e, o.timeout, o.onRequestError.bind(o, t)), "click")).request),
				a = function() {
					if (o.transitions.shouldWait) return Promise.resolve(b(i, o.data)).then(function() {})
				}();
			return Promise.resolve(a && a.then ? a.then(r) : r())
		} catch (e) {
			return Promise.reject(e)
		}
	}, s.onRequestError = function(e) {
		this.transitions.isRunning = !1;
		for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
		var o = n[0],
			i = n[1],
			a = this.cache.getAction(o);
		return this.cache.delete(o), !(this.$ && !1 === this.$(e, a, o, i) || ("click" === a && this.force(o), 1))
	}, s.prefetch = function(e) {
		var t = this;
		this.cache.has(e) || this.cache.set(e, this.request(e, this.timeout, this.onRequestError.bind(this, "barba")).catch(function(e) {
			t.logger.error(e)
		}), "prefetch")
	}, s.F = function() {
		!0 !== this.prefetchIgnore && (document.addEventListener("mouseover", this.B), document.addEventListener("touchstart", this.B)), document.addEventListener("click", this.U), window.addEventListener("popstate", this.D)
	}, s.H = function() {
		!0 !== this.prefetchIgnore && (document.removeEventListener("mouseover", this.B), document.removeEventListener("touchstart", this.B)), document.removeEventListener("click", this.U), window.removeEventListener("popstate", this.D)
	}, s.B = function(e) {
		var t, n = this,
			e = this.I(e);
		e && (t = this.dom.getHref(e), this.prevent.checkHref(t) || this.cache.has(t) || this.cache.set(t, this.request(t, this.timeout, this.onRequestError.bind(this, e)).catch(function(e) {
			n.logger.error(e)
		}), "enter"))
	}, s.U = function(e) {
		var t = this.I(e);
		if (t) return this.transitions.isRunning && this.preventRunning ? (e.preventDefault(), void e.stopPropagation()) : void this.go(this.dom.getHref(t), t, e)
	}, s.D = function(e) {
		this.go(this.url.getHref(), "popstate", e)
	}, s.I = function(e) {
		for (var t = e.target; t && !this.dom.getHref(t);) t = t.parentNode;
		if (t && !this.prevent.checkLink(t, e, this.dom.getHref(t))) return t
	}, s.q = function() {
		var e = this.url.getHref(),
			e = {
				container: this.dom.getContainer(),
				html: this.dom.getHtml(),
				namespace: this.dom.getNamespace(),
				url: f({
					href: e
				}, this.url.parse(e))
			};
		this.C = {
			current: e,
			next: f({}, this.schemaPage),
			trigger: void 0
		}, this.hooks.do("reset", this.data)
	}, e(R, [{
		key: "data",
		get: function() {
			return this.C
		}
	}, {
		key: "wrapper",
		get: function() {
			return this._
		}
	}]), new R;

	function R() {
		this.version = "2.9.7", this.schemaPage = be, this.Logger = p, this.logger = new p("@barba/core"), this.plugins = [], this.hooks = A, this.dom = E, this.helpers = X, this.history = U, this.request = K, this.url = G
	}
}),
function(e, t) {
	"use strict";
	"object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
		if (e.document) return t(e);
		throw new Error("jQuery requires a window with a document")
	} : t(e)
}("undefined" != typeof window ? window : this, function(T, H) {
	"use strict";

	function y(e) {
		return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item
	}

	function g(e) {
		return null != e && e === e.window
	}
	var t = [],
		O = Object.getPrototypeOf,
		s = t.slice,
		I = t.flat ? function(e) {
			return t.flat.call(e)
		} : function(e) {
			return t.concat.apply([], e)
		},
		M = t.push,
		_ = t.indexOf,
		B = {},
		F = B.toString,
		W = B.hasOwnProperty,
		U = W.toString,
		z = U.call(Object),
		v = {},
		C = T.document,
		X = {
			type: !0,
			src: !0,
			nonce: !0,
			noModule: !0
		};

	function V(e, t, n) {
		var r, o, i = (n = n || C).createElement("script");
		if (i.text = e, t)
			for (r in X)(o = t[r] || t.getAttribute && t.getAttribute(r)) && i.setAttribute(r, o);
		n.head.appendChild(i).parentNode.removeChild(i)
	}

	function d(e) {
		return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? B[F.call(e)] || "object" : typeof e
	}
	var E = function(e, t) {
		return new E.fn.init(e, t)
	};

	function Y(e) {
		var t = !!e && "length" in e && e.length,
			n = d(e);
		return !y(e) && !g(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
	}
	E.fn = E.prototype = {
		jquery: "3.6.0",
		constructor: E,
		length: 0,
		toArray: function() {
			return s.call(this)
		},
		get: function(e) {
			return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e]
		},
		pushStack: function(e) {
			e = E.merge(this.constructor(), e);
			return e.prevObject = this, e
		},
		each: function(e) {
			return E.each(this, e)
		},
		map: function(n) {
			return this.pushStack(E.map(this, function(e, t) {
				return n.call(e, t, e)
			}))
		},
		slice: function() {
			return this.pushStack(s.apply(this, arguments))
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		even: function() {
			return this.pushStack(E.grep(this, function(e, t) {
				return (t + 1) % 2
			}))
		},
		odd: function() {
			return this.pushStack(E.grep(this, function(e, t) {
				return t % 2
			}))
		},
		eq: function(e) {
			var t = this.length,
				e = +e + (e < 0 ? t : 0);
			return this.pushStack(0 <= e && e < t ? [this[e]] : [])
		},
		end: function() {
			return this.prevObject || this.constructor()
		},
		push: M,
		sort: t.sort,
		splice: t.splice
	}, E.extend = E.fn.extend = function() {
		var e, t, n, r, o, i = arguments[0] || {},
			a = 1,
			s = arguments.length,
			u = !1;
		for ("boolean" == typeof i && (u = i, i = arguments[a] || {}, a++), "object" == typeof i || y(i) || (i = {}), a === s && (i = this, a--); a < s; a++)
			if (null != (e = arguments[a]))
				for (t in e) n = e[t], "__proto__" !== t && i !== n && (u && n && (E.isPlainObject(n) || (r = Array.isArray(n))) ? (o = i[t], o = r && !Array.isArray(o) ? [] : r || E.isPlainObject(o) ? o : {}, r = !1, i[t] = E.extend(u, o, n)) : void 0 !== n && (i[t] = n));
		return i
	}, E.extend({
		expando: "jQuery" + ("3.6.0" + Math.random()).replace(/\D/g, ""),
		isReady: !0,
		error: function(e) {
			throw new Error(e)
		},
		noop: function() {},
		isPlainObject: function(e) {
			return !(!e || "[object Object]" !== F.call(e) || (e = O(e)) && ("function" != typeof(e = W.call(e, "constructor") && e.constructor) || U.call(e) !== z))
		},
		isEmptyObject: function(e) {
			for (var t in e) return !1;
			return !0
		},
		globalEval: function(e, t, n) {
			V(e, {
				nonce: t && t.nonce
			}, n)
		},
		each: function(e, t) {
			var n, r = 0;
			if (Y(e))
				for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++);
			else
				for (r in e)
					if (!1 === t.call(e[r], r, e[r])) break;
			return e
		},
		makeArray: function(e, t) {
			t = t || [];
			return null != e && (Y(Object(e)) ? E.merge(t, "string" == typeof e ? [e] : e) : M.call(t, e)), t
		},
		inArray: function(e, t, n) {
			return null == t ? -1 : _.call(t, e, n)
		},
		merge: function(e, t) {
			for (var n = +t.length, r = 0, o = e.length; r < n; r++) e[o++] = t[r];
			return e.length = o, e
		},
		grep: function(e, t, n) {
			for (var r = [], o = 0, i = e.length, a = !n; o < i; o++) !t(e[o], o) != a && r.push(e[o]);
			return r
		},
		map: function(e, t, n) {
			var r, o, i = 0,
				a = [];
			if (Y(e))
				for (r = e.length; i < r; i++) null != (o = t(e[i], i, n)) && a.push(o);
			else
				for (i in e) null != (o = t(e[i], i, n)) && a.push(o);
			return I(a)
		},
		guid: 1,
		support: v
	}), "function" == typeof Symbol && (E.fn[Symbol.iterator] = t[Symbol.iterator]), E.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
		B["[object " + t + "]"] = t.toLowerCase()
	});

	function r(e, t, n) {
		for (var r = [], o = void 0 !== n;
			(e = e[t]) && 9 !== e.nodeType;)
			if (1 === e.nodeType) {
				if (o && E(e).is(n)) break;
				r.push(e)
			} return r
	}

	function G(e, t) {
		for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
		return n
	}
	var e = function(H) {
			function f(e, t) {
				return e = "0x" + e.slice(1) - 65536, t || (e < 0 ? String.fromCharCode(65536 + e) : String.fromCharCode(e >> 10 | 55296, 1023 & e | 56320))
			}

			function O(e, t) {
				return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
			}

			function I() {
				T()
			}
			var e, h, x, i, M, p, _, B, w, u, c, T, C, n, E, d, r, o, g, k = "sizzle" + +new Date,
				l = H.document,
				S = 0,
				F = 0,
				W = q(),
				U = q(),
				z = q(),
				v = q(),
				X = function(e, t) {
					return e === t && (c = !0), 0
				},
				V = {}.hasOwnProperty,
				t = [],
				Y = t.pop,
				G = t.push,
				$ = t.push,
				Q = t.slice,
				y = function(e, t) {
					for (var n = 0, r = e.length; n < r; n++)
						if (e[n] === t) return n;
					return -1
				},
				K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
				a = "[\\x20\\t\\r\\n\\f]",
				s = "(?:\\\\[\\da-fA-F]{1,6}" + a + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
				J = "\\[" + a + "*(" + s + ")(?:" + a + "*([*^$|!~]?=)" + a + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + s + "))|)" + a + "*\\]",
				Z = ":(" + s + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + J + ")*)|.*)\\)|)",
				ee = new RegExp(a + "+", "g"),
				m = new RegExp("^" + a + "+|((?:^|[^\\\\])(?:\\\\.)*)" + a + "+$", "g"),
				te = new RegExp("^" + a + "*," + a + "*"),
				ne = new RegExp("^" + a + "*([>+~]|" + a + ")" + a + "*"),
				re = new RegExp(a + "|>"),
				oe = new RegExp(Z),
				ie = new RegExp("^" + s + "$"),
				b = {
					ID: new RegExp("^#(" + s + ")"),
					CLASS: new RegExp("^\\.(" + s + ")"),
					TAG: new RegExp("^(" + s + "|[*])"),
					ATTR: new RegExp("^" + J),
					PSEUDO: new RegExp("^" + Z),
					CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + a + "*(even|odd|(([+-]|)(\\d*)n|)" + a + "*(?:([+-]|)" + a + "*(\\d+)|))" + a + "*\\)|)", "i"),
					bool: new RegExp("^(?:" + K + ")$", "i"),
					needsContext: new RegExp("^" + a + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + a + "*((?:-\\d)?\\d*)" + a + "*\\)|)(?=[^-]|$)", "i")
				},
				ae = /HTML$/i,
				se = /^(?:input|select|textarea|button)$/i,
				ue = /^h\d$/i,
				A = /^[^{]+\{\s*\[native \w/,
				ce = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
				le = /[+~]/,
				j = new RegExp("\\\\[\\da-fA-F]{1,6}" + a + "?|\\\\([^\\r\\n\\f])", "g"),
				fe = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
				he = ye(function(e) {
					return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
				}, {
					dir: "parentNode",
					next: "legend"
				});
			try {
				$.apply(t = Q.call(l.childNodes), l.childNodes), t[l.childNodes.length].nodeType
			} catch (e) {
				$ = {
					apply: t.length ? function(e, t) {
						G.apply(e, Q.call(t))
					} : function(e, t) {
						for (var n = e.length, r = 0; e[n++] = t[r++];);
						e.length = n - 1
					}
				}
			}

			function P(e, t, n, r) {
				var o, i, a, s, u, c, l = t && t.ownerDocument,
					f = t ? t.nodeType : 9;
				if (n = n || [], "string" != typeof e || !e || 1 !== f && 9 !== f && 11 !== f) return n;
				if (!r && (T(t), t = t || C, E)) {
					if (11 !== f && (s = ce.exec(e)))
						if (o = s[1]) {
							if (9 === f) {
								if (!(c = t.getElementById(o))) return n;
								if (c.id === o) return n.push(c), n
							} else if (l && (c = l.getElementById(o)) && g(t, c) && c.id === o) return n.push(c), n
						} else {
							if (s[2]) return $.apply(n, t.getElementsByTagName(e)), n;
							if ((o = s[3]) && h.getElementsByClassName && t.getElementsByClassName) return $.apply(n, t.getElementsByClassName(o)), n
						} if (h.qsa && !v[e + " "] && (!d || !d.test(e)) && (1 !== f || "object" !== t.nodeName.toLowerCase())) {
						if (c = e, l = t, 1 === f && (re.test(e) || ne.test(e))) {
							for ((l = le.test(e) && ve(t.parentNode) || t) === t && h.scope || ((a = t.getAttribute("id")) ? a = a.replace(fe, O) : t.setAttribute("id", a = k)), i = (u = p(e)).length; i--;) u[i] = (a ? "#" + a : ":scope") + " " + R(u[i]);
							c = u.join(",")
						}
						try {
							return $.apply(n, l.querySelectorAll(c)), n
						} catch (t) {
							v(e, !0)
						} finally {
							a === k && t.removeAttribute("id")
						}
					}
				}
				return B(e.replace(m, "$1"), t, n, r)
			}

			function q() {
				var r = [];
				return function e(t, n) {
					return r.push(t + " ") > x.cacheLength && delete e[r.shift()], e[t + " "] = n
				}
			}

			function N(e) {
				return e[k] = !0, e
			}

			function D(e) {
				var t = C.createElement("fieldset");
				try {
					return !!e(t)
				} catch (e) {
					return !1
				} finally {
					t.parentNode && t.parentNode.removeChild(t)
				}
			}

			function pe(e, t) {
				for (var n = e.split("|"), r = n.length; r--;) x.attrHandle[n[r]] = t
			}

			function de(e, t) {
				var n = t && e,
					r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
				if (r) return r;
				if (n)
					for (; n = n.nextSibling;)
						if (n === t) return -1;
				return e ? 1 : -1
			}

			function ge(t) {
				return function(e) {
					return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && he(e) === t : e.disabled === t : "label" in e && e.disabled === t
				}
			}

			function L(a) {
				return N(function(i) {
					return i = +i, N(function(e, t) {
						for (var n, r = a([], e.length, i), o = r.length; o--;) e[n = r[o]] && (e[n] = !(t[n] = e[n]))
					})
				})
			}

			function ve(e) {
				return e && void 0 !== e.getElementsByTagName && e
			}
			for (e in h = P.support = {}, M = P.isXML = function(e) {
					var t = e && e.namespaceURI,
						e = e && (e.ownerDocument || e).documentElement;
					return !ae.test(t || e && e.nodeName || "HTML")
				}, T = P.setDocument = function(e) {
					var e = e ? e.ownerDocument || e : l;
					return e != C && 9 === e.nodeType && e.documentElement && (n = (C = e).documentElement, E = !M(C), l != C && (e = C.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", I, !1) : e.attachEvent && e.attachEvent("onunload", I)), h.scope = D(function(e) {
						return n.appendChild(e).appendChild(C.createElement("div")), void 0 !== e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length
					}), h.attributes = D(function(e) {
						return e.className = "i", !e.getAttribute("className")
					}), h.getElementsByTagName = D(function(e) {
						return e.appendChild(C.createComment("")), !e.getElementsByTagName("*").length
					}), h.getElementsByClassName = A.test(C.getElementsByClassName), h.getById = D(function(e) {
						return n.appendChild(e).id = k, !C.getElementsByName || !C.getElementsByName(k).length
					}), h.getById ? (x.filter.ID = function(e) {
						var t = e.replace(j, f);
						return function(e) {
							return e.getAttribute("id") === t
						}
					}, x.find.ID = function(e, t) {
						if (void 0 !== t.getElementById && E) return (t = t.getElementById(e)) ? [t] : []
					}) : (x.filter.ID = function(e) {
						var t = e.replace(j, f);
						return function(e) {
							e = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
							return e && e.value === t
						}
					}, x.find.ID = function(e, t) {
						if (void 0 !== t.getElementById && E) {
							var n, r, o, i = t.getElementById(e);
							if (i) {
								if ((n = i.getAttributeNode("id")) && n.value === e) return [i];
								for (o = t.getElementsByName(e), r = 0; i = o[r++];)
									if ((n = i.getAttributeNode("id")) && n.value === e) return [i]
							}
							return []
						}
					}), x.find.TAG = h.getElementsByTagName ? function(e, t) {
						return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : h.qsa ? t.querySelectorAll(e) : void 0
					} : function(e, t) {
						var n, r = [],
							o = 0,
							i = t.getElementsByTagName(e);
						if ("*" !== e) return i;
						for (; n = i[o++];) 1 === n.nodeType && r.push(n);
						return r
					}, x.find.CLASS = h.getElementsByClassName && function(e, t) {
						if (void 0 !== t.getElementsByClassName && E) return t.getElementsByClassName(e)
					}, r = [], d = [], (h.qsa = A.test(C.querySelectorAll)) && (D(function(e) {
						var t;
						n.appendChild(e).innerHTML = "<a id='" + k + "'></a><select id='" + k + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && d.push("[*^$]=" + a + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || d.push("\\[" + a + "*(?:value|" + K + ")"), e.querySelectorAll("[id~=" + k + "-]").length || d.push("~="), (t = C.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || d.push("\\[" + a + "*name" + a + "*=" + a + "*(?:''|\"\")"), e.querySelectorAll(":checked").length || d.push(":checked"), e.querySelectorAll("a#" + k + "+*").length || d.push(".#.+[+~]"), e.querySelectorAll("\\\f"), d.push("[\\r\\n\\f]")
					}), D(function(e) {
						e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
						var t = C.createElement("input");
						t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && d.push("name" + a + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && d.push(":enabled", ":disabled"), n.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && d.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), d.push(",.*:")
					})), (h.matchesSelector = A.test(o = n.matches || n.webkitMatchesSelector || n.mozMatchesSelector || n.oMatchesSelector || n.msMatchesSelector)) && D(function(e) {
						h.disconnectedMatch = o.call(e, "*"), o.call(e, "[s!='']:x"), r.push("!=", Z)
					}), d = d.length && new RegExp(d.join("|")), r = r.length && new RegExp(r.join("|")), e = A.test(n.compareDocumentPosition), g = e || A.test(n.contains) ? function(e, t) {
						var n = 9 === e.nodeType ? e.documentElement : e,
							t = t && t.parentNode;
						return e === t || !(!t || 1 !== t.nodeType || !(n.contains ? n.contains(t) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(t)))
					} : function(e, t) {
						if (t)
							for (; t = t.parentNode;)
								if (t === e) return !0;
						return !1
					}, X = e ? function(e, t) {
						var n;
						return e === t ? (c = !0, 0) : !e.compareDocumentPosition - !t.compareDocumentPosition || (1 & (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !h.sortDetached && t.compareDocumentPosition(e) === n ? e == C || e.ownerDocument == l && g(l, e) ? -1 : t == C || t.ownerDocument == l && g(l, t) ? 1 : u ? y(u, e) - y(u, t) : 0 : 4 & n ? -1 : 1)
					} : function(e, t) {
						if (e === t) return c = !0, 0;
						var n, r = 0,
							o = e.parentNode,
							i = t.parentNode,
							a = [e],
							s = [t];
						if (!o || !i) return e == C ? -1 : t == C ? 1 : o ? -1 : i ? 1 : u ? y(u, e) - y(u, t) : 0;
						if (o === i) return de(e, t);
						for (n = e; n = n.parentNode;) a.unshift(n);
						for (n = t; n = n.parentNode;) s.unshift(n);
						for (; a[r] === s[r];) r++;
						return r ? de(a[r], s[r]) : a[r] == l ? -1 : s[r] == l ? 1 : 0
					}), C
				}, P.matches = function(e, t) {
					return P(e, null, null, t)
				}, P.matchesSelector = function(e, t) {
					if (T(e), h.matchesSelector && E && !v[t + " "] && (!r || !r.test(t)) && (!d || !d.test(t))) try {
						var n = o.call(e, t);
						if (n || h.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
					} catch (e) {
						v(t, !0)
					}
					return 0 < P(t, C, null, [e]).length
				}, P.contains = function(e, t) {
					return (e.ownerDocument || e) != C && T(e), g(e, t)
				}, P.attr = function(e, t) {
					(e.ownerDocument || e) != C && T(e);
					var n = x.attrHandle[t.toLowerCase()],
						n = n && V.call(x.attrHandle, t.toLowerCase()) ? n(e, t, !E) : void 0;
					return void 0 !== n ? n : h.attributes || !E ? e.getAttribute(t) : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
				}, P.escape = function(e) {
					return (e + "").replace(fe, O)
				}, P.error = function(e) {
					throw new Error("Syntax error, unrecognized expression: " + e)
				}, P.uniqueSort = function(e) {
					var t, n = [],
						r = 0,
						o = 0;
					if (c = !h.detectDuplicates, u = !h.sortStable && e.slice(0), e.sort(X), c) {
						for (; t = e[o++];) t === e[o] && (r = n.push(o));
						for (; r--;) e.splice(n[r], 1)
					}
					return u = null, e
				}, i = P.getText = function(e) {
					var t, n = "",
						r = 0,
						o = e.nodeType;
					if (o) {
						if (1 === o || 9 === o || 11 === o) {
							if ("string" == typeof e.textContent) return e.textContent;
							for (e = e.firstChild; e; e = e.nextSibling) n += i(e)
						} else if (3 === o || 4 === o) return e.nodeValue
					} else
						for (; t = e[r++];) n += i(t);
					return n
				}, (x = P.selectors = {
					cacheLength: 50,
					createPseudo: N,
					match: b,
					attrHandle: {},
					find: {},
					relative: {
						">": {
							dir: "parentNode",
							first: !0
						},
						" ": {
							dir: "parentNode"
						},
						"+": {
							dir: "previousSibling",
							first: !0
						},
						"~": {
							dir: "previousSibling"
						}
					},
					preFilter: {
						ATTR: function(e) {
							return e[1] = e[1].replace(j, f), e[3] = (e[3] || e[4] || e[5] || "").replace(j, f), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
						},
						CHILD: function(e) {
							return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || P.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && P.error(e[0]), e
						},
						PSEUDO: function(e) {
							var t, n = !e[6] && e[2];
							return b.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && oe.test(n) && (t = (t = p(n, !0)) && n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
						}
					},
					filter: {
						TAG: function(e) {
							var t = e.replace(j, f).toLowerCase();
							return "*" === e ? function() {
								return !0
							} : function(e) {
								return e.nodeName && e.nodeName.toLowerCase() === t
							}
						},
						CLASS: function(e) {
							var t = W[e + " "];
							return t || (t = new RegExp("(^|" + a + ")" + e + "(" + a + "|$)")) && W(e, function(e) {
								return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
							})
						},
						ATTR: function(t, n, r) {
							return function(e) {
								e = P.attr(e, t);
								return null == e ? "!=" === n : !n || (e += "", "=" === n ? e === r : "!=" === n ? e !== r : "^=" === n ? r && 0 === e.indexOf(r) : "*=" === n ? r && -1 < e.indexOf(r) : "$=" === n ? r && e.slice(-r.length) === r : "~=" === n ? -1 < (" " + e.replace(ee, " ") + " ").indexOf(r) : "|=" === n && (e === r || e.slice(0, r.length + 1) === r + "-"))
							}
						},
						CHILD: function(d, e, t, g, v) {
							var m = "nth" !== d.slice(0, 3),
								y = "last" !== d.slice(-4),
								b = "of-type" === e;
							return 1 === g && 0 === v ? function(e) {
								return !!e.parentNode
							} : function(e, t, n) {
								var r, o, i, a, s, u, c = m != y ? "nextSibling" : "previousSibling",
									l = e.parentNode,
									f = b && e.nodeName.toLowerCase(),
									h = !n && !b,
									p = !1;
								if (l) {
									if (m) {
										for (; c;) {
											for (a = e; a = a[c];)
												if (b ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) return !1;
											u = c = "only" === d && !u && "nextSibling"
										}
										return !0
									}
									if (u = [y ? l.firstChild : l.lastChild], y && h) {
										for (p = (s = (r = (o = (i = (a = l)[k] || (a[k] = {}))[a.uniqueID] || (i[a.uniqueID] = {}))[d] || [])[0] === S && r[1]) && r[2], a = s && l.childNodes[s]; a = ++s && a && a[c] || (p = s = 0, u.pop());)
											if (1 === a.nodeType && ++p && a === e) {
												o[d] = [S, s, p];
												break
											}
									} else if (!1 === (p = h ? s = (r = (o = (i = (a = e)[k] || (a[k] = {}))[a.uniqueID] || (i[a.uniqueID] = {}))[d] || [])[0] === S && r[1] : p))
										for (;
											(a = ++s && a && a[c] || (p = s = 0, u.pop())) && ((b ? a.nodeName.toLowerCase() !== f : 1 !== a.nodeType) || !++p || (h && ((o = (i = a[k] || (a[k] = {}))[a.uniqueID] || (i[a.uniqueID] = {}))[d] = [S, p]), a !== e)););
									return (p -= v) === g || p % g == 0 && 0 <= p / g
								}
							}
						},
						PSEUDO: function(e, i) {
							var t, a = x.pseudos[e] || x.setFilters[e.toLowerCase()] || P.error("unsupported pseudo: " + e);
							return a[k] ? a(i) : 1 < a.length ? (t = [e, e, "", i], x.setFilters.hasOwnProperty(e.toLowerCase()) ? N(function(e, t) {
								for (var n, r = a(e, i), o = r.length; o--;) e[n = y(e, r[o])] = !(t[n] = r[o])
							}) : function(e) {
								return a(e, 0, t)
							}) : a
						}
					},
					pseudos: {
						not: N(function(e) {
							var r = [],
								o = [],
								s = _(e.replace(m, "$1"));
							return s[k] ? N(function(e, t, n, r) {
								for (var o, i = s(e, null, r, []), a = e.length; a--;)(o = i[a]) && (e[a] = !(t[a] = o))
							}) : function(e, t, n) {
								return r[0] = e, s(r, null, n, o), r[0] = null, !o.pop()
							}
						}),
						has: N(function(t) {
							return function(e) {
								return 0 < P(t, e).length
							}
						}),
						contains: N(function(t) {
							return t = t.replace(j, f),
								function(e) {
									return -1 < (e.textContent || i(e)).indexOf(t)
								}
						}),
						lang: N(function(n) {
							return ie.test(n || "") || P.error("unsupported lang: " + n), n = n.replace(j, f).toLowerCase(),
								function(e) {
									var t;
									do {
										if (t = E ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
									} while ((e = e.parentNode) && 1 === e.nodeType);
									return !1
								}
						}),
						target: function(e) {
							var t = H.location && H.location.hash;
							return t && t.slice(1) === e.id
						},
						root: function(e) {
							return e === n
						},
						focus: function(e) {
							return e === C.activeElement && (!C.hasFocus || C.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
						},
						enabled: ge(!1),
						disabled: ge(!0),
						checked: function(e) {
							var t = e.nodeName.toLowerCase();
							return "input" === t && !!e.checked || "option" === t && !!e.selected
						},
						selected: function(e) {
							return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
						},
						empty: function(e) {
							for (e = e.firstChild; e; e = e.nextSibling)
								if (e.nodeType < 6) return !1;
							return !0
						},
						parent: function(e) {
							return !x.pseudos.empty(e)
						},
						header: function(e) {
							return ue.test(e.nodeName)
						},
						input: function(e) {
							return se.test(e.nodeName)
						},
						button: function(e) {
							var t = e.nodeName.toLowerCase();
							return "input" === t && "button" === e.type || "button" === t
						},
						text: function(e) {
							return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (e = e.getAttribute("type")) || "text" === e.toLowerCase())
						},
						first: L(function() {
							return [0]
						}),
						last: L(function(e, t) {
							return [t - 1]
						}),
						eq: L(function(e, t, n) {
							return [n < 0 ? n + t : n]
						}),
						even: L(function(e, t) {
							for (var n = 0; n < t; n += 2) e.push(n);
							return e
						}),
						odd: L(function(e, t) {
							for (var n = 1; n < t; n += 2) e.push(n);
							return e
						}),
						lt: L(function(e, t, n) {
							for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r;) e.push(r);
							return e
						}),
						gt: L(function(e, t, n) {
							for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
							return e
						})
					}
				}).pseudos.nth = x.pseudos.eq, {
					radio: !0,
					checkbox: !0,
					file: !0,
					password: !0,
					image: !0
				}) x.pseudos[e] = function(t) {
				return function(e) {
					return "input" === e.nodeName.toLowerCase() && e.type === t
				}
			}(e);
			for (e in {
					submit: !0,
					reset: !0
				}) x.pseudos[e] = function(n) {
				return function(e) {
					var t = e.nodeName.toLowerCase();
					return ("input" === t || "button" === t) && e.type === n
				}
			}(e);

			function me() {}

			function R(e) {
				for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
				return r
			}

			function ye(a, e, t) {
				var s = e.dir,
					u = e.next,
					c = u || s,
					l = t && "parentNode" === c,
					f = F++;
				return e.first ? function(e, t, n) {
					for (; e = e[s];)
						if (1 === e.nodeType || l) return a(e, t, n);
					return !1
				} : function(e, t, n) {
					var r, o, i = [S, f];
					if (n) {
						for (; e = e[s];)
							if ((1 === e.nodeType || l) && a(e, t, n)) return !0
					} else
						for (; e = e[s];)
							if (1 === e.nodeType || l)
								if (o = (o = e[k] || (e[k] = {}))[e.uniqueID] || (o[e.uniqueID] = {}), u && u === e.nodeName.toLowerCase()) e = e[s] || e;
								else {
									if ((r = o[c]) && r[0] === S && r[1] === f) return i[2] = r[2];
									if ((o[c] = i)[2] = a(e, t, n)) return !0
								} return !1
				}
			}

			function be(o) {
				return 1 < o.length ? function(e, t, n) {
					for (var r = o.length; r--;)
						if (!o[r](e, t, n)) return !1;
					return !0
				} : o[0]
			}

			function xe(e, t, n, r, o) {
				for (var i, a = [], s = 0, u = e.length, c = null != t; s < u; s++) !(i = e[s]) || n && !n(i, r, o) || (a.push(i), c && t.push(s));
				return a
			}

			function we(e) {
				for (var r, t, n, o = e.length, i = x.relative[e[0].type], a = i || x.relative[" "], s = i ? 1 : 0, u = ye(function(e) {
						return e === r
					}, a, !0), c = ye(function(e) {
						return -1 < y(r, e)
					}, a, !0), l = [function(e, t, n) {
						e = !i && (n || t !== w) || ((r = t).nodeType ? u : c)(e, t, n);
						return r = null, e
					}]; s < o; s++)
					if (t = x.relative[e[s].type]) l = [ye(be(l), t)];
					else {
						if ((t = x.filter[e[s].type].apply(null, e[s].matches))[k]) {
							for (n = ++s; n < o && !x.relative[e[n].type]; n++);
							return function e(p, d, g, v, m, t) {
								return v && !v[k] && (v = e(v)), m && !m[k] && (m = e(m, t)), N(function(e, t, n, r) {
									var o, i, a, s = [],
										u = [],
										c = t.length,
										l = e || function(e, t, n) {
											for (var r = 0, o = t.length; r < o; r++) P(e, t[r], n);
											return n
										}(d || "*", n.nodeType ? [n] : n, []),
										f = !p || !e && d ? l : xe(l, s, p, n, r),
										h = g ? m || (e ? p : c || v) ? [] : t : f;
									if (g && g(f, h, n, r), v)
										for (o = xe(h, u), v(o, [], n, r), i = o.length; i--;)(a = o[i]) && (h[u[i]] = !(f[u[i]] = a));
									if (e) {
										if (m || p) {
											if (m) {
												for (o = [], i = h.length; i--;)(a = h[i]) && o.push(f[i] = a);
												m(null, h = [], o, r)
											}
											for (i = h.length; i--;)(a = h[i]) && -1 < (o = m ? y(e, a) : s[i]) && (e[o] = !(t[o] = a))
										}
									} else h = xe(h === t ? h.splice(c, h.length) : h), m ? m(null, t, h, r) : $.apply(t, h)
								})
							}(1 < s && be(l), 1 < s && R(e.slice(0, s - 1).concat({
								value: " " === e[s - 2].type ? "*" : ""
							})).replace(m, "$1"), t, s < n && we(e.slice(s, n)), n < o && we(e = e.slice(n)), n < o && R(e))
						}
						l.push(t)
					} return be(l)
			}
			return me.prototype = x.filters = x.pseudos, x.setFilters = new me, p = P.tokenize = function(e, t) {
				var n, r, o, i, a, s, u, c = U[e + " "];
				if (c) return t ? 0 : c.slice(0);
				for (a = e, s = [], u = x.preFilter; a;) {
					for (i in n && !(r = te.exec(a)) || (r && (a = a.slice(r[0].length) || a), s.push(o = [])), n = !1, (r = ne.exec(a)) && (n = r.shift(), o.push({
							value: n,
							type: r[0].replace(m, " ")
						}), a = a.slice(n.length)), x.filter) !(r = b[i].exec(a)) || u[i] && !(r = u[i](r)) || (n = r.shift(), o.push({
						value: n,
						type: i,
						matches: r
					}), a = a.slice(n.length));
					if (!n) break
				}
				return t ? a.length : a ? P.error(e) : U(e, s).slice(0)
			}, _ = P.compile = function(e, t) {
				var n, v, m, y, b, r, o = [],
					i = [],
					a = z[e + " "];
				if (!a) {
					for (n = (t = t || p(e)).length; n--;)((a = we(t[n]))[k] ? o : i).push(a);
					(a = z(e, (y = 0 < (m = o).length, b = 0 < (v = i).length, r = function(e, t, n, r, o) {
						var i, a, s, u = 0,
							c = "0",
							l = e && [],
							f = [],
							h = w,
							p = e || b && x.find.TAG("*", o),
							d = S += null == h ? 1 : Math.random() || .1,
							g = p.length;
						for (o && (w = t == C || t || o); c !== g && null != (i = p[c]); c++) {
							if (b && i) {
								for (a = 0, t || i.ownerDocument == C || (T(i), n = !E); s = v[a++];)
									if (s(i, t || C, n)) {
										r.push(i);
										break
									} o && (S = d)
							}
							y && ((i = !s && i) && u--, e) && l.push(i)
						}
						if (u += c, y && c !== u) {
							for (a = 0; s = m[a++];) s(l, f, t, n);
							if (e) {
								if (0 < u)
									for (; c--;) l[c] || f[c] || (f[c] = Y.call(r));
								f = xe(f)
							}
							$.apply(r, f), o && !e && 0 < f.length && 1 < u + m.length && P.uniqueSort(r)
						}
						return o && (S = d, w = h), l
					}, y ? N(r) : r))).selector = e
				}
				return a
			}, B = P.select = function(e, t, n, r) {
				var o, i, a, s, u, c = "function" == typeof e && e,
					l = !r && p(e = c.selector || e);
				if (n = n || [], 1 === l.length) {
					if (2 < (i = l[0] = l[0].slice(0)).length && "ID" === (a = i[0]).type && 9 === t.nodeType && E && x.relative[i[1].type]) {
						if (!(t = (x.find.ID(a.matches[0].replace(j, f), t) || [])[0])) return n;
						c && (t = t.parentNode), e = e.slice(i.shift().value.length)
					}
					for (o = b.needsContext.test(e) ? 0 : i.length; o-- && (a = i[o], !x.relative[s = a.type]);)
						if ((u = x.find[s]) && (r = u(a.matches[0].replace(j, f), le.test(i[0].type) && ve(t.parentNode) || t))) {
							if (i.splice(o, 1), e = r.length && R(i)) break;
							return $.apply(n, r), n
						}
				}
				return (c || _(e, l))(r, t, !E, n, !t || le.test(e) && ve(t.parentNode) || t), n
			}, h.sortStable = k.split("").sort(X).join("") === k, h.detectDuplicates = !!c, T(), h.sortDetached = D(function(e) {
				return 1 & e.compareDocumentPosition(C.createElement("fieldset"))
			}), D(function(e) {
				return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
			}) || pe("type|href|height|width", function(e, t, n) {
				if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
			}), h.attributes && D(function(e) {
				return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
			}) || pe("value", function(e, t, n) {
				if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
			}), D(function(e) {
				return null == e.getAttribute("disabled")
			}) || pe(K, function(e, t, n) {
				if (!n) return !0 === e[t] ? t.toLowerCase() : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
			}), P
		}(T),
		Q = (E.find = e, E.expr = e.selectors, E.expr[":"] = E.expr.pseudos, E.uniqueSort = E.unique = e.uniqueSort, E.text = e.getText, E.isXMLDoc = e.isXML, E.contains = e.contains, E.escapeSelector = e.escape, E.expr.match.needsContext);

	function u(e, t) {
		return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
	}
	var K = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

	function J(e, n, r) {
		return y(n) ? E.grep(e, function(e, t) {
			return !!n.call(e, t, e) !== r
		}) : n.nodeType ? E.grep(e, function(e) {
			return e === n !== r
		}) : "string" != typeof n ? E.grep(e, function(e) {
			return -1 < _.call(n, e) !== r
		}) : E.filter(n, e, r)
	}
	E.filter = function(e, t, n) {
		var r = t[0];
		return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? E.find.matchesSelector(r, e) ? [r] : [] : E.find.matches(e, E.grep(t, function(e) {
			return 1 === e.nodeType
		}))
	}, E.fn.extend({
		find: function(e) {
			var t, n, r = this.length,
				o = this;
			if ("string" != typeof e) return this.pushStack(E(e).filter(function() {
				for (t = 0; t < r; t++)
					if (E.contains(o[t], this)) return !0
			}));
			for (n = this.pushStack([]), t = 0; t < r; t++) E.find(e, o[t], n);
			return 1 < r ? E.uniqueSort(n) : n
		},
		filter: function(e) {
			return this.pushStack(J(this, e || [], !1))
		},
		not: function(e) {
			return this.pushStack(J(this, e || [], !0))
		},
		is: function(e) {
			return !!J(this, "string" == typeof e && Q.test(e) ? E(e) : e || [], !1).length
		}
	});
	var Z, ee = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
		te = ((E.fn.init = function(e, t, n) {
			if (e) {
				if (n = n || Z, "string" != typeof e) return e.nodeType ? (this[0] = e, this.length = 1, this) : y(e) ? void 0 !== n.ready ? n.ready(e) : e(E) : E.makeArray(e, this);
				if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : ee.exec(e)) || !r[1] && t) return (!t || t.jquery ? t || n : this.constructor(t)).find(e);
				if (r[1]) {
					if (t = t instanceof E ? t[0] : t, E.merge(this, E.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : C, !0)), K.test(r[1]) && E.isPlainObject(t))
						for (var r in t) y(this[r]) ? this[r](t[r]) : this.attr(r, t[r])
				} else(n = C.getElementById(r[2])) && (this[0] = n, this.length = 1)
			}
			return this
		}).prototype = E.fn, Z = E(C), /^(?:parents|prev(?:Until|All))/),
		ne = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};

	function re(e, t) {
		for (;
			(e = e[t]) && 1 !== e.nodeType;);
		return e
	}
	E.fn.extend({
		has: function(e) {
			var t = E(e, this),
				n = t.length;
			return this.filter(function() {
				for (var e = 0; e < n; e++)
					if (E.contains(this, t[e])) return !0
			})
		},
		closest: function(e, t) {
			var n, r = 0,
				o = this.length,
				i = [],
				a = "string" != typeof e && E(e);
			if (!Q.test(e))
				for (; r < o; r++)
					for (n = this[r]; n && n !== t; n = n.parentNode)
						if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && E.find.matchesSelector(n, e))) {
							i.push(n);
							break
						} return this.pushStack(1 < i.length ? E.uniqueSort(i) : i)
		},
		index: function(e) {
			return e ? "string" == typeof e ? _.call(E(e), this[0]) : _.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add: function(e, t) {
			return this.pushStack(E.uniqueSort(E.merge(this.get(), E(e, t))))
		},
		addBack: function(e) {
			return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
		}
	}), E.each({
		parent: function(e) {
			e = e.parentNode;
			return e && 11 !== e.nodeType ? e : null
		},
		parents: function(e) {
			return r(e, "parentNode")
		},
		parentsUntil: function(e, t, n) {
			return r(e, "parentNode", n)
		},
		next: function(e) {
			return re(e, "nextSibling")
		},
		prev: function(e) {
			return re(e, "previousSibling")
		},
		nextAll: function(e) {
			return r(e, "nextSibling")
		},
		prevAll: function(e) {
			return r(e, "previousSibling")
		},
		nextUntil: function(e, t, n) {
			return r(e, "nextSibling", n)
		},
		prevUntil: function(e, t, n) {
			return r(e, "previousSibling", n)
		},
		siblings: function(e) {
			return G((e.parentNode || {}).firstChild, e)
		},
		children: function(e) {
			return G(e.firstChild)
		},
		contents: function(e) {
			return null != e.contentDocument && O(e.contentDocument) ? e.contentDocument : (u(e, "template") && (e = e.content || e), E.merge([], e.childNodes))
		}
	}, function(r, o) {
		E.fn[r] = function(e, t) {
			var n = E.map(this, o, e);
			return (t = "Until" !== r.slice(-5) ? e : t) && "string" == typeof t && (n = E.filter(t, n)), 1 < this.length && (ne[r] || E.uniqueSort(n), te.test(r)) && n.reverse(), this.pushStack(n)
		}
	});
	var k = /[^\x20\t\r\n\f]+/g;

	function l(e) {
		return e
	}

	function oe(e) {
		throw e
	}

	function ie(e, t, n, r) {
		var o;
		try {
			e && y(o = e.promise) ? o.call(e).done(t).fail(n) : e && y(o = e.then) ? o.call(e, t, n) : t.apply(void 0, [e].slice(r))
		} catch (e) {
			n.apply(void 0, [e])
		}
	}
	E.Callbacks = function(r) {
		var e, n;
		r = "string" == typeof r ? (e = r, n = {}, E.each(e.match(k) || [], function(e, t) {
			n[t] = !0
		}), n) : E.extend({}, r);

		function o() {
			for (s = s || r.once, a = i = !0; c.length; l = -1)
				for (t = c.shift(); ++l < u.length;) !1 === u[l].apply(t[0], t[1]) && r.stopOnFalse && (l = u.length, t = !1);
			r.memory || (t = !1), i = !1, s && (u = t ? [] : "")
		}
		var i, t, a, s, u = [],
			c = [],
			l = -1,
			f = {
				add: function() {
					return u && (t && !i && (l = u.length - 1, c.push(t)), function n(e) {
						E.each(e, function(e, t) {
							y(t) ? r.unique && f.has(t) || u.push(t) : t && t.length && "string" !== d(t) && n(t)
						})
					}(arguments), t) && !i && o(), this
				},
				remove: function() {
					return E.each(arguments, function(e, t) {
						for (var n; - 1 < (n = E.inArray(t, u, n));) u.splice(n, 1), n <= l && l--
					}), this
				},
				has: function(e) {
					return e ? -1 < E.inArray(e, u) : 0 < u.length
				},
				empty: function() {
					return u = u && [], this
				},
				disable: function() {
					return s = c = [], u = t = "", this
				},
				disabled: function() {
					return !u
				},
				lock: function() {
					return s = c = [], t || i || (u = t = ""), this
				},
				locked: function() {
					return !!s
				},
				fireWith: function(e, t) {
					return s || (t = [e, (t = t || []).slice ? t.slice() : t], c.push(t), i) || o(), this
				},
				fire: function() {
					return f.fireWith(this, arguments), this
				},
				fired: function() {
					return !!a
				}
			};
		return f
	}, E.extend({
		Deferred: function(e) {
			var i = [
					["notify", "progress", E.Callbacks("memory"), E.Callbacks("memory"), 2],
					["resolve", "done", E.Callbacks("once memory"), E.Callbacks("once memory"), 0, "resolved"],
					["reject", "fail", E.Callbacks("once memory"), E.Callbacks("once memory"), 1, "rejected"]
				],
				o = "pending",
				a = {
					state: function() {
						return o
					},
					always: function() {
						return s.done(arguments).fail(arguments), this
					},
					catch: function(e) {
						return a.then(null, e)
					},
					pipe: function() {
						var o = arguments;
						return E.Deferred(function(r) {
							E.each(i, function(e, t) {
								var n = y(o[t[4]]) && o[t[4]];
								s[t[1]](function() {
									var e = n && n.apply(this, arguments);
									e && y(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments)
								})
							}), o = null
						}).promise()
					},
					then: function(t, n, r) {
						var u = 0;

						function c(o, i, a, s) {
							return function() {
								function e() {
									var e, t;
									if (!(o < u)) {
										if ((e = a.apply(n, r)) === i.promise()) throw new TypeError("Thenable self-resolution");
										t = e && ("object" == typeof e || "function" == typeof e) && e.then, y(t) ? s ? t.call(e, c(u, i, l, s), c(u, i, oe, s)) : (u++, t.call(e, c(u, i, l, s), c(u, i, oe, s), c(u, i, l, i.notifyWith))) : (a !== l && (n = void 0, r = [e]), (s || i.resolveWith)(n, r))
									}
								}
								var n = this,
									r = arguments,
									t = s ? e : function() {
										try {
											e()
										} catch (e) {
											E.Deferred.exceptionHook && E.Deferred.exceptionHook(e, t.stackTrace), u <= o + 1 && (a !== oe && (n = void 0, r = [e]), i.rejectWith(n, r))
										}
									};
								o ? t() : (E.Deferred.getStackHook && (t.stackTrace = E.Deferred.getStackHook()), T.setTimeout(t))
							}
						}
						return E.Deferred(function(e) {
							i[0][3].add(c(0, e, y(r) ? r : l, e.notifyWith)), i[1][3].add(c(0, e, y(t) ? t : l)), i[2][3].add(c(0, e, y(n) ? n : oe))
						}).promise()
					},
					promise: function(e) {
						return null != e ? E.extend(e, a) : a
					}
				},
				s = {};
			return E.each(i, function(e, t) {
				var n = t[2],
					r = t[5];
				a[t[1]] = n.add, r && n.add(function() {
					o = r
				}, i[3 - e][2].disable, i[3 - e][3].disable, i[0][2].lock, i[0][3].lock), n.add(t[3].fire), s[t[0]] = function() {
					return s[t[0] + "With"](this === s ? void 0 : this, arguments), this
				}, s[t[0] + "With"] = n.fireWith
			}), a.promise(s), e && e.call(s, s), s
		},
		when: function(e) {
			function t(t) {
				return function(e) {
					o[t] = this, i[t] = 1 < arguments.length ? s.call(arguments) : e, --n || a.resolveWith(o, i)
				}
			}
			var n = arguments.length,
				r = n,
				o = Array(r),
				i = s.call(arguments),
				a = E.Deferred();
			if (n <= 1 && (ie(e, a.done(t(r)).resolve, a.reject, !n), "pending" === a.state() || y(i[r] && i[r].then))) return a.then();
			for (; r--;) ie(i[r], t(r), a.reject);
			return a.promise()
		}
	});
	var ae = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/,
		se = (E.Deferred.exceptionHook = function(e, t) {
			T.console && T.console.warn && e && ae.test(e.name) && T.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
		}, E.readyException = function(e) {
			T.setTimeout(function() {
				throw e
			})
		}, E.Deferred());

	function ue() {
		C.removeEventListener("DOMContentLoaded", ue), T.removeEventListener("load", ue), E.ready()
	}
	E.fn.ready = function(e) {
		return se.then(e).catch(function(e) {
			E.readyException(e)
		}), this
	}, E.extend({
		isReady: !1,
		readyWait: 1,
		ready: function(e) {
			(!0 === e ? --E.readyWait : E.isReady) || (E.isReady = !0) !== e && 0 < --E.readyWait || se.resolveWith(C, [E])
		}
	}), E.ready.then = se.then, "complete" === C.readyState || "loading" !== C.readyState && !C.documentElement.doScroll ? T.setTimeout(E.ready) : (C.addEventListener("DOMContentLoaded", ue), T.addEventListener("load", ue));

	function f(e, t, n, r, o, i, a) {
		var s = 0,
			u = e.length,
			c = null == n;
		if ("object" === d(n))
			for (s in o = !0, n) f(e, t, s, n[s], !0, i, a);
		else if (void 0 !== r && (o = !0, y(r) || (a = !0), t = c ? a ? (t.call(e, r), null) : (c = t, function(e, t, n) {
				return c.call(E(e), n)
			}) : t))
			for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
		return o ? e : c ? t.call(e) : u ? t(e[0], n) : i
	}
	var ce = /^-ms-/,
		le = /-([a-z])/g;

	function fe(e, t) {
		return t.toUpperCase()
	}

	function b(e) {
		return e.replace(ce, "ms-").replace(le, fe)
	}

	function m(e) {
		return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
	}

	function he() {
		this.expando = E.expando + he.uid++
	}
	he.uid = 1, he.prototype = {
		cache: function(e) {
			var t = e[this.expando];
			return t || (t = {}, m(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
				value: t,
				configurable: !0
			}))), t
		},
		set: function(e, t, n) {
			var r, o = this.cache(e);
			if ("string" == typeof t) o[b(t)] = n;
			else
				for (r in t) o[b(r)] = t[r];
			return o
		},
		get: function(e, t) {
			return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][b(t)]
		},
		access: function(e, t, n) {
			return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
		},
		remove: function(e, t) {
			var n, r = e[this.expando];
			if (void 0 !== r) {
				if (void 0 !== t) {
					n = (t = Array.isArray(t) ? t.map(b) : (t = b(t)) in r ? [t] : t.match(k) || []).length;
					for (; n--;) delete r[t[n]]
				}
				void 0 !== t && !E.isEmptyObject(r) || (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
			}
		},
		hasData: function(e) {
			e = e[this.expando];
			return void 0 !== e && !E.isEmptyObject(e)
		}
	};
	var x = new he,
		c = new he,
		pe = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		de = /[A-Z]/g;

	function ge(e, t, n) {
		var r, o;
		if (void 0 === n && 1 === e.nodeType)
			if (r = "data-" + t.replace(de, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(r))) {
				try {
					n = "true" === (o = n) || "false" !== o && ("null" === o ? null : o === +o + "" ? +o : pe.test(o) ? JSON.parse(o) : o)
				} catch (e) {}
				c.set(e, t, n)
			} else n = void 0;
		return n
	}
	E.extend({
		hasData: function(e) {
			return c.hasData(e) || x.hasData(e)
		},
		data: function(e, t, n) {
			return c.access(e, t, n)
		},
		removeData: function(e, t) {
			c.remove(e, t)
		},
		_data: function(e, t, n) {
			return x.access(e, t, n)
		},
		_removeData: function(e, t) {
			x.remove(e, t)
		}
	}), E.fn.extend({
		data: function(n, e) {
			var t, r, o, i = this[0],
				a = i && i.attributes;
			if (void 0 !== n) return "object" == typeof n ? this.each(function() {
				c.set(this, n)
			}) : f(this, function(e) {
				var t;
				if (i && void 0 === e) return void 0 !== (t = c.get(i, n)) || void 0 !== (t = ge(i, n)) ? t : void 0;
				this.each(function() {
					c.set(this, n, e)
				})
			}, null, e, 1 < arguments.length, null, !0);
			if (this.length && (o = c.get(i), 1 === i.nodeType) && !x.get(i, "hasDataAttrs")) {
				for (t = a.length; t--;) a[t] && 0 === (r = a[t].name).indexOf("data-") && (r = b(r.slice(5)), ge(i, r, o[r]));
				x.set(i, "hasDataAttrs", !0)
			}
			return o
		},
		removeData: function(e) {
			return this.each(function() {
				c.remove(this, e)
			})
		}
	}), E.extend({
		queue: function(e, t, n) {
			var r;
			if (e) return r = x.get(e, t = (t || "fx") + "queue"), n && (!r || Array.isArray(n) ? r = x.access(e, t, E.makeArray(n)) : r.push(n)), r || []
		},
		dequeue: function(e, t) {
			t = t || "fx";
			var n = E.queue(e, t),
				r = n.length,
				o = n.shift(),
				i = E._queueHooks(e, t);
			"inprogress" === o && (o = n.shift(), r--), o && ("fx" === t && n.unshift("inprogress"), delete i.stop, o.call(e, function() {
				E.dequeue(e, t)
			}, i)), !r && i && i.empty.fire()
		},
		_queueHooks: function(e, t) {
			var n = t + "queueHooks";
			return x.get(e, n) || x.access(e, n, {
				empty: E.Callbacks("once memory").add(function() {
					x.remove(e, [t + "queue", n])
				})
			})
		}
	}), E.fn.extend({
		queue: function(t, n) {
			var e = 2;
			return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? E.queue(this[0], t) : void 0 === n ? this : this.each(function() {
				var e = E.queue(this, t, n);
				E._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && E.dequeue(this, t)
			})
		},
		dequeue: function(e) {
			return this.each(function() {
				E.dequeue(this, e)
			})
		},
		clearQueue: function(e) {
			return this.queue(e || "fx", [])
		},
		promise: function(e, t) {
			function n() {
				--o || i.resolveWith(a, [a])
			}
			var r, o = 1,
				i = E.Deferred(),
				a = this,
				s = this.length;
			for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;)(r = x.get(a[s], e + "queueHooks")) && r.empty && (o++, r.empty.add(n));
			return n(), i.promise(t)
		}
	});

	function ve(e, t) {
		return "none" === (e = t || e).style.display || "" === e.style.display && S(e) && "none" === E.css(e, "display")
	}
	var e = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		me = new RegExp("^(?:([+-])=|)(" + e + ")([a-z%]*)$", "i"),
		h = ["Top", "Right", "Bottom", "Left"],
		w = C.documentElement,
		S = function(e) {
			return E.contains(e.ownerDocument, e)
		},
		ye = {
			composed: !0
		};
	w.getRootNode && (S = function(e) {
		return E.contains(e.ownerDocument, e) || e.getRootNode(ye) === e.ownerDocument
	});

	function be(e, t, n, r) {
		var o, i, a = 20,
			s = r ? function() {
				return r.cur()
			} : function() {
				return E.css(e, t, "")
			},
			u = s(),
			c = n && n[3] || (E.cssNumber[t] ? "" : "px"),
			l = e.nodeType && (E.cssNumber[t] || "px" !== c && +u) && me.exec(E.css(e, t));
		if (l && l[3] !== c) {
			for (c = c || l[3], l = +(u /= 2) || 1; a--;) E.style(e, t, l + c), (1 - i) * (1 - (i = s() / u || .5)) <= 0 && (a = 0), l /= i;
			E.style(e, t, (l *= 2) + c), n = n || []
		}
		return n && (l = +l || +u || 0, o = n[1] ? l + (n[1] + 1) * n[2] : +n[2], r) && (r.unit = c, r.start = l, r.end = o), o
	}
	var xe = {};

	function $(e, t) {
		for (var n, r, o, i, a, s, u = [], c = 0, l = e.length; c < l; c++)(r = e[c]).style && (n = r.style.display, t ? ("none" === n && (u[c] = x.get(r, "display") || null, u[c] || (r.style.display = "")), "" === r.style.display && ve(r) && (u[c] = (s = i = o = void 0, i = r.ownerDocument, a = r.nodeName, (s = xe[a]) || (o = i.body.appendChild(i.createElement(a)), s = E.css(o, "display"), o.parentNode.removeChild(o), xe[a] = s = "none" === s ? "block" : s)))) : "none" !== n && (u[c] = "none", x.set(r, "display", n)));
		for (c = 0; c < l; c++) null != u[c] && (e[c].style.display = u[c]);
		return e
	}
	E.fn.extend({
		show: function() {
			return $(this, !0)
		},
		hide: function() {
			return $(this)
		},
		toggle: function(e) {
			return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
				ve(this) ? E(this).show() : E(this).hide()
			})
		}
	});
	var we = /^(?:checkbox|radio)$/i,
		Te = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
		Ce = /^$|^module$|\/(?:java|ecma)script/i,
		n = C.createDocumentFragment().appendChild(C.createElement("div")),
		A = ((N = C.createElement("input")).setAttribute("type", "radio"), N.setAttribute("checked", "checked"), N.setAttribute("name", "t"), n.appendChild(N), v.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked, n.innerHTML = "<textarea>x</textarea>", v.noCloneChecked = !!n.cloneNode(!0).lastChild.defaultValue, n.innerHTML = "<option></option>", v.option = !!n.lastChild, {
			thead: [1, "<table>", "</table>"],
			col: [2, "<table><colgroup>", "</colgroup></table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: [0, "", ""]
		});

	function j(e, t) {
		var n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
		return void 0 === t || t && u(e, t) ? E.merge([e], n) : n
	}

	function Ee(e, t) {
		for (var n = 0, r = e.length; n < r; n++) x.set(e[n], "globalEval", !t || x.get(t[n], "globalEval"))
	}
	A.tbody = A.tfoot = A.colgroup = A.caption = A.thead, A.th = A.td, v.option || (A.optgroup = A.option = [1, "<select multiple='multiple'>", "</select>"]);
	var ke = /<|&#?\w+;/;

	function Se(e, t, n, r, o) {
		for (var i, a, s, u, c, l = t.createDocumentFragment(), f = [], h = 0, p = e.length; h < p; h++)
			if ((i = e[h]) || 0 === i)
				if ("object" === d(i)) E.merge(f, i.nodeType ? [i] : i);
				else if (ke.test(i)) {
			for (a = a || l.appendChild(t.createElement("div")), s = (Te.exec(i) || ["", ""])[1].toLowerCase(), s = A[s] || A._default, a.innerHTML = s[1] + E.htmlPrefilter(i) + s[2], c = s[0]; c--;) a = a.lastChild;
			E.merge(f, a.childNodes), (a = l.firstChild).textContent = ""
		} else f.push(t.createTextNode(i));
		for (l.textContent = "", h = 0; i = f[h++];)
			if (r && -1 < E.inArray(i, r)) o && o.push(i);
			else if (u = S(i), a = j(l.appendChild(i), "script"), u && Ee(a), n)
			for (c = 0; i = a[c++];) Ce.test(i.type || "") && n.push(i);
		return l
	}
	var $e = /^([^.]*)(?:\.(.+)|)/;

	function a() {
		return !0
	}

	function p() {
		return !1
	}

	function Ae(e, t) {
		return e === function() {
			try {
				return C.activeElement
			} catch (e) {}
		}() == ("focus" === t)
	}

	function je(e, t, n, r, o, i) {
		var a, s;
		if ("object" == typeof t) {
			for (s in "string" != typeof n && (r = r || n, n = void 0), t) je(e, s, n, r, t[s], i);
			return e
		}
		if (null == r && null == o ? (o = n, r = n = void 0) : null == o && ("string" == typeof n ? (o = r, r = void 0) : (o = r, r = n, n = void 0)), !1 === o) o = p;
		else if (!o) return e;
		return 1 === i && (a = o, (o = function(e) {
			return E().off(e), a.apply(this, arguments)
		}).guid = a.guid || (a.guid = E.guid++)), e.each(function() {
			E.event.add(this, t, o, r, n)
		})
	}

	function Pe(e, o, i) {
		i ? (x.set(e, o, !1), E.event.add(e, o, {
			namespace: !1,
			handler: function(e) {
				var t, n, r = x.get(this, o);
				if (1 & e.isTrigger && this[o]) {
					if (r.length)(E.event.special[o] || {}).delegateType && e.stopPropagation();
					else if (r = s.call(arguments), x.set(this, o, r), t = i(this, o), this[o](), r !== (n = x.get(this, o)) || t ? x.set(this, o, !1) : n = {}, r !== n) return e.stopImmediatePropagation(), e.preventDefault(), n && n.value
				} else r.length && (x.set(this, o, {
					value: E.event.trigger(E.extend(r[0], E.Event.prototype), r.slice(1), this)
				}), e.stopImmediatePropagation())
			}
		})) : void 0 === x.get(e, o) && E.event.add(e, o, a)
	}
	E.event = {
		global: {},
		add: function(t, e, n, r, o) {
			var i, a, s, u, c, l, f, h, p, d = x.get(t);
			if (m(t))
				for (n.handler && (n = (i = n).handler, o = i.selector), o && E.find.matchesSelector(w, o), n.guid || (n.guid = E.guid++), s = (s = d.events) || (d.events = Object.create(null)), a = (a = d.handle) || (d.handle = function(e) {
						return void 0 !== E && E.event.triggered !== e.type ? E.event.dispatch.apply(t, arguments) : void 0
					}), u = (e = (e || "").match(k) || [""]).length; u--;) f = p = (h = $e.exec(e[u]) || [])[1], h = (h[2] || "").split(".").sort(), f && (c = E.event.special[f] || {}, f = (o ? c.delegateType : c.bindType) || f, c = E.event.special[f] || {}, p = E.extend({
					type: f,
					origType: p,
					data: r,
					handler: n,
					guid: n.guid,
					selector: o,
					needsContext: o && E.expr.match.needsContext.test(o),
					namespace: h.join(".")
				}, i), (l = s[f]) || ((l = s[f] = []).delegateCount = 0, c.setup && !1 !== c.setup.call(t, r, h, a)) || t.addEventListener && t.addEventListener(f, a), c.add && (c.add.call(t, p), p.handler.guid || (p.handler.guid = n.guid)), o ? l.splice(l.delegateCount++, 0, p) : l.push(p), E.event.global[f] = !0)
		},
		remove: function(e, t, n, r, o) {
			var i, a, s, u, c, l, f, h, p, d, g, v = x.hasData(e) && x.get(e);
			if (v && (u = v.events)) {
				for (c = (t = (t || "").match(k) || [""]).length; c--;)
					if (p = g = (s = $e.exec(t[c]) || [])[1], d = (s[2] || "").split(".").sort(), p) {
						for (f = E.event.special[p] || {}, h = u[p = (r ? f.delegateType : f.bindType) || p] || [], s = s[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = i = h.length; i--;) l = h[i], !o && g !== l.origType || n && n.guid !== l.guid || s && !s.test(l.namespace) || r && r !== l.selector && ("**" !== r || !l.selector) || (h.splice(i, 1), l.selector && h.delegateCount--, f.remove && f.remove.call(e, l));
						a && !h.length && (f.teardown && !1 !== f.teardown.call(e, d, v.handle) || E.removeEvent(e, p, v.handle), delete u[p])
					} else
						for (p in u) E.event.remove(e, p + t[c], n, r, !0);
				E.isEmptyObject(u) && x.remove(e, "handle events")
			}
		},
		dispatch: function(e) {
			var t, n, r, o, i, a = new Array(arguments.length),
				s = E.event.fix(e),
				e = (x.get(this, "events") || Object.create(null))[s.type] || [],
				u = E.event.special[s.type] || {};
			for (a[0] = s, t = 1; t < arguments.length; t++) a[t] = arguments[t];
			if (s.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, s)) {
				for (i = E.event.handlers.call(this, s, e), t = 0;
					(r = i[t++]) && !s.isPropagationStopped();)
					for (s.currentTarget = r.elem, n = 0;
						(o = r.handlers[n++]) && !s.isImmediatePropagationStopped();) s.rnamespace && !1 !== o.namespace && !s.rnamespace.test(o.namespace) || (s.handleObj = o, s.data = o.data, void 0 !== (o = ((E.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, a)) && !1 === (s.result = o) && (s.preventDefault(), s.stopPropagation()));
				return u.postDispatch && u.postDispatch.call(this, s), s.result
			}
		},
		handlers: function(e, t) {
			var n, r, o, i, a, s = [],
				u = t.delegateCount,
				c = e.target;
			if (u && c.nodeType && !("click" === e.type && 1 <= e.button))
				for (; c !== this; c = c.parentNode || this)
					if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
						for (i = [], a = {}, n = 0; n < u; n++) void 0 === a[o = (r = t[n]).selector + " "] && (a[o] = r.needsContext ? -1 < E(o, this).index(c) : E.find(o, this, null, [c]).length), a[o] && i.push(r);
						i.length && s.push({
							elem: c,
							handlers: i
						})
					} return c = this, u < t.length && s.push({
				elem: c,
				handlers: t.slice(u)
			}), s
		},
		addProp: function(t, e) {
			Object.defineProperty(E.Event.prototype, t, {
				enumerable: !0,
				configurable: !0,
				get: y(e) ? function() {
					if (this.originalEvent) return e(this.originalEvent)
				} : function() {
					if (this.originalEvent) return this.originalEvent[t]
				},
				set: function(e) {
					Object.defineProperty(this, t, {
						enumerable: !0,
						configurable: !0,
						writable: !0,
						value: e
					})
				}
			})
		},
		fix: function(e) {
			return e[E.expando] ? e : new E.Event(e)
		},
		special: {
			load: {
				noBubble: !0
			},
			click: {
				setup: function(e) {
					e = this || e;
					return we.test(e.type) && e.click && u(e, "input") && Pe(e, "click", a), !1
				},
				trigger: function(e) {
					e = this || e;
					return we.test(e.type) && e.click && u(e, "input") && Pe(e, "click"), !0
				},
				_default: function(e) {
					e = e.target;
					return we.test(e.type) && e.click && u(e, "input") && x.get(e, "click") || u(e, "a")
				}
			},
			beforeunload: {
				postDispatch: function(e) {
					void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
				}
			}
		}
	}, E.removeEvent = function(e, t, n) {
		e.removeEventListener && e.removeEventListener(t, n)
	}, E.Event = function(e, t) {
		if (!(this instanceof E.Event)) return new E.Event(e, t);
		e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? a : p, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && E.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[E.expando] = !0
	}, E.Event.prototype = {
		constructor: E.Event,
		isDefaultPrevented: p,
		isPropagationStopped: p,
		isImmediatePropagationStopped: p,
		isSimulated: !1,
		preventDefault: function() {
			var e = this.originalEvent;
			this.isDefaultPrevented = a, e && !this.isSimulated && e.preventDefault()
		},
		stopPropagation: function() {
			var e = this.originalEvent;
			this.isPropagationStopped = a, e && !this.isSimulated && e.stopPropagation()
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
			this.isImmediatePropagationStopped = a, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
		}
	}, E.each({
		altKey: !0,
		bubbles: !0,
		cancelable: !0,
		changedTouches: !0,
		ctrlKey: !0,
		detail: !0,
		eventPhase: !0,
		metaKey: !0,
		pageX: !0,
		pageY: !0,
		shiftKey: !0,
		view: !0,
		char: !0,
		code: !0,
		charCode: !0,
		key: !0,
		keyCode: !0,
		button: !0,
		buttons: !0,
		clientX: !0,
		clientY: !0,
		offsetX: !0,
		offsetY: !0,
		pointerId: !0,
		pointerType: !0,
		screenX: !0,
		screenY: !0,
		targetTouches: !0,
		toElement: !0,
		touches: !0,
		which: !0
	}, E.event.addProp), E.each({
		focus: "focusin",
		blur: "focusout"
	}, function(e, t) {
		E.event.special[e] = {
			setup: function() {
				return Pe(this, e, Ae), !1
			},
			trigger: function() {
				return Pe(this, e), !0
			},
			_default: function() {
				return !0
			},
			delegateType: t
		}
	}), E.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function(e, o) {
		E.event.special[e] = {
			delegateType: o,
			bindType: o,
			handle: function(e) {
				var t, n = e.relatedTarget,
					r = e.handleObj;
				return n && (n === this || E.contains(this, n)) || (e.type = r.origType, t = r.handler.apply(this, arguments), e.type = o), t
			}
		}
	}), E.fn.extend({
		on: function(e, t, n, r) {
			return je(this, e, t, n, r)
		},
		one: function(e, t, n, r) {
			return je(this, e, t, n, r, 1)
		},
		off: function(e, t, n) {
			var r, o;
			if (e && e.preventDefault && e.handleObj) r = e.handleObj, E(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler);
			else {
				if ("object" != typeof e) return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = p), this.each(function() {
					E.event.remove(this, e, n, t)
				});
				for (o in e) this.off(o, t, e[o])
			}
			return this
		}
	});
	var qe = /<script|<style|<link/i,
		Ne = /checked\s*(?:[^=]|=\s*.checked.)/i,
		De = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	function Le(e, t) {
		return u(e, "table") && u(11 !== t.nodeType ? t : t.firstChild, "tr") && E(e).children("tbody")[0] || e
	}

	function Re(e) {
		return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
	}

	function He(e) {
		return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
	}

	function Oe(e, t) {
		var n, r, o, i;
		if (1 === t.nodeType) {
			if (x.hasData(e) && (i = x.get(e).events))
				for (o in x.remove(t, "handle events"), i)
					for (n = 0, r = i[o].length; n < r; n++) E.event.add(t, o, i[o][n]);
			c.hasData(e) && (e = c.access(e), e = E.extend({}, e), c.set(t, e))
		}
	}

	function P(n, r, o, i) {
		r = I(r);
		var e, t, a, s, u, c, l = 0,
			f = n.length,
			h = f - 1,
			p = r[0],
			d = y(p);
		if (d || 1 < f && "string" == typeof p && !v.checkClone && Ne.test(p)) return n.each(function(e) {
			var t = n.eq(e);
			d && (r[0] = p.call(this, e, t.html())), P(t, r, o, i)
		});
		if (f && (t = (e = Se(r, n[0].ownerDocument, !1, n, i)).firstChild, 1 === e.childNodes.length && (e = t), t || i)) {
			for (s = (a = E.map(j(e, "script"), Re)).length; l < f; l++) u = e, l !== h && (u = E.clone(u, !0, !0), s) && E.merge(a, j(u, "script")), o.call(n[l], u, l);
			if (s)
				for (c = a[a.length - 1].ownerDocument, E.map(a, He), l = 0; l < s; l++) u = a[l], Ce.test(u.type || "") && !x.access(u, "globalEval") && E.contains(c, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? E._evalUrl && !u.noModule && E._evalUrl(u.src, {
					nonce: u.nonce || u.getAttribute("nonce")
				}, c) : V(u.textContent.replace(De, ""), u, c))
		}
		return n
	}

	function Ie(e, t, n) {
		for (var r, o = t ? E.filter(t, e) : e, i = 0; null != (r = o[i]); i++) n || 1 !== r.nodeType || E.cleanData(j(r)), r.parentNode && (n && S(r) && Ee(j(r, "script")), r.parentNode.removeChild(r));
		return e
	}
	E.extend({
		htmlPrefilter: function(e) {
			return e
		},
		clone: function(e, t, n) {
			var r, o, i, a, s, u, c, l = e.cloneNode(!0),
				f = S(e);
			if (!(v.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || E.isXMLDoc(e)))
				for (a = j(l), r = 0, o = (i = j(e)).length; r < o; r++) s = i[r], "input" === (c = (u = a[r]).nodeName.toLowerCase()) && we.test(s.type) ? u.checked = s.checked : "input" !== c && "textarea" !== c || (u.defaultValue = s.defaultValue);
			if (t)
				if (n)
					for (i = i || j(e), a = a || j(l), r = 0, o = i.length; r < o; r++) Oe(i[r], a[r]);
				else Oe(e, l);
			return 0 < (a = j(l, "script")).length && Ee(a, !f && j(e, "script")), l
		},
		cleanData: function(e) {
			for (var t, n, r, o = E.event.special, i = 0; void 0 !== (n = e[i]); i++)
				if (m(n)) {
					if (t = n[x.expando]) {
						if (t.events)
							for (r in t.events) o[r] ? E.event.remove(n, r) : E.removeEvent(n, r, t.handle);
						n[x.expando] = void 0
					}
					n[c.expando] && (n[c.expando] = void 0)
				}
		}
	}), E.fn.extend({
		detach: function(e) {
			return Ie(this, e, !0)
		},
		remove: function(e) {
			return Ie(this, e)
		},
		text: function(e) {
			return f(this, function(e) {
				return void 0 === e ? E.text(this) : this.empty().each(function() {
					1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
				})
			}, null, e, arguments.length)
		},
		append: function() {
			return P(this, arguments, function(e) {
				1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Le(this, e).appendChild(e)
			})
		},
		prepend: function() {
			return P(this, arguments, function(e) {
				var t;
				1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (t = Le(this, e)).insertBefore(e, t.firstChild)
			})
		},
		before: function() {
			return P(this, arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this)
			})
		},
		after: function() {
			return P(this, arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
			})
		},
		empty: function() {
			for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (E.cleanData(j(e, !1)), e.textContent = "");
			return this
		},
		clone: function(e, t) {
			return e = null != e && e, t = null == t ? e : t, this.map(function() {
				return E.clone(this, e, t)
			})
		},
		html: function(e) {
			return f(this, function(e) {
				var t = this[0] || {},
					n = 0,
					r = this.length;
				if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
				if ("string" == typeof e && !qe.test(e) && !A[(Te.exec(e) || ["", ""])[1].toLowerCase()]) {
					e = E.htmlPrefilter(e);
					try {
						for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (E.cleanData(j(t, !1)), t.innerHTML = e);
						t = 0
					} catch (e) {}
				}
				t && this.empty().append(e)
			}, null, e, arguments.length)
		},
		replaceWith: function() {
			var n = [];
			return P(this, arguments, function(e) {
				var t = this.parentNode;
				E.inArray(this, n) < 0 && (E.cleanData(j(this)), t) && t.replaceChild(e, this)
			}, n)
		}
	}), E.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(e, a) {
		E.fn[e] = function(e) {
			for (var t, n = [], r = E(e), o = r.length - 1, i = 0; i <= o; i++) t = i === o ? this : this.clone(!0), E(r[i])[a](t), M.apply(n, t.get());
			return this.pushStack(n)
		}
	});

	function Me(e) {
		var t = e.ownerDocument.defaultView;
		return (t = t && t.opener ? t : T).getComputedStyle(e)
	}

	function _e(e, t, n) {
		var r, o = {};
		for (r in t) o[r] = e.style[r], e.style[r] = t[r];
		for (r in n = n.call(e), t) e.style[r] = o[r];
		return n
	}
	var Be, Fe, We, Ue, ze, Xe, Ve, o, Ye = new RegExp("^(" + e + ")(?!px)[a-z%]+$", "i"),
		Ge = new RegExp(h.join("|"), "i");

	function Qe(e, t, n) {
		var r, o, i = e.style;
		return (n = n || Me(e)) && ("" !== (o = n.getPropertyValue(t) || n[t]) || S(e) || (o = E.style(e, t)), !v.pixelBoxStyles()) && Ye.test(o) && Ge.test(t) && (e = i.width, t = i.minWidth, r = i.maxWidth, i.minWidth = i.maxWidth = i.width = o, o = n.width, i.width = e, i.minWidth = t, i.maxWidth = r), void 0 !== o ? o + "" : o
	}

	function Ke(e, t) {
		return {
			get: function() {
				if (!e()) return (this.get = t).apply(this, arguments);
				delete this.get
			}
		}
	}

	function Je() {
		var e;
		o && (Ve.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", o.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", w.appendChild(Ve).appendChild(o), e = T.getComputedStyle(o), Be = "1%" !== e.top, Xe = 12 === Ze(e.marginLeft), o.style.right = "60%", Ue = 36 === Ze(e.right), Fe = 36 === Ze(e.width), o.style.position = "absolute", We = 12 === Ze(o.offsetWidth / 3), w.removeChild(Ve), o = null)
	}

	function Ze(e) {
		return Math.round(parseFloat(e))
	}
	Ve = C.createElement("div"), (o = C.createElement("div")).style && (o.style.backgroundClip = "content-box", o.cloneNode(!0).style.backgroundClip = "", v.clearCloneStyle = "content-box" === o.style.backgroundClip, E.extend(v, {
		boxSizingReliable: function() {
			return Je(), Fe
		},
		pixelBoxStyles: function() {
			return Je(), Ue
		},
		pixelPosition: function() {
			return Je(), Be
		},
		reliableMarginLeft: function() {
			return Je(), Xe
		},
		scrollboxSize: function() {
			return Je(), We
		},
		reliableTrDimensions: function() {
			var e, t, n;
			return null == ze && (e = C.createElement("table"), t = C.createElement("tr"), n = C.createElement("div"), e.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", t.style.cssText = "border:1px solid", t.style.height = "1px", n.style.height = "9px", n.style.display = "block", w.appendChild(e).appendChild(t).appendChild(n), n = T.getComputedStyle(t), ze = parseInt(n.height, 10) + parseInt(n.borderTopWidth, 10) + parseInt(n.borderBottomWidth, 10) === t.offsetHeight, w.removeChild(e)), ze
		}
	}));
	var et = ["Webkit", "Moz", "ms"],
		tt = C.createElement("div").style,
		nt = {};

	function rt(e) {
		return E.cssProps[e] || nt[e] || (e in tt ? e : nt[e] = function(e) {
			for (var t = e[0].toUpperCase() + e.slice(1), n = et.length; n--;)
				if ((e = et[n] + t) in tt) return e
		}(e) || e)
	}
	var ot = /^(none|table(?!-c[ea]).+)/,
		it = /^--/,
		at = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		st = {
			letterSpacing: "0",
			fontWeight: "400"
		};

	function ut(e, t, n) {
		var r = me.exec(t);
		return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
	}

	function ct(e, t, n, r, o, i) {
		var a = "width" === t ? 1 : 0,
			s = 0,
			u = 0;
		if (n === (r ? "border" : "content")) return 0;
		for (; a < 4; a += 2) "margin" === n && (u += E.css(e, n + h[a], !0, o)), r ? ("content" === n && (u -= E.css(e, "padding" + h[a], !0, o)), "margin" !== n && (u -= E.css(e, "border" + h[a] + "Width", !0, o))) : (u += E.css(e, "padding" + h[a], !0, o), "padding" !== n ? u += E.css(e, "border" + h[a] + "Width", !0, o) : s += E.css(e, "border" + h[a] + "Width", !0, o));
		return !r && 0 <= i && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - i - u - s - .5)) || 0), u
	}

	function lt(e, t, n) {
		var r = Me(e),
			o = (!v.boxSizingReliable() || n) && "border-box" === E.css(e, "boxSizing", !1, r),
			i = o,
			a = Qe(e, t, r),
			s = "offset" + t[0].toUpperCase() + t.slice(1);
		if (Ye.test(a)) {
			if (!n) return a;
			a = "auto"
		}
		return (!v.boxSizingReliable() && o || !v.reliableTrDimensions() && u(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === E.css(e, "display", !1, r)) && e.getClientRects().length && (o = "border-box" === E.css(e, "boxSizing", !1, r), i = s in e) && (a = e[s]), (a = parseFloat(a) || 0) + ct(e, t, n || (o ? "border" : "content"), i, r, a) + "px"
	}

	function i(e, t, n, r, o) {
		return new i.prototype.init(e, t, n, r, o)
	}
	E.extend({
		cssHooks: {
			opacity: {
				get: function(e, t) {
					if (t) return "" === (t = Qe(e, "opacity")) ? "1" : t
				}
			}
		},
		cssNumber: {
			animationIterationCount: !0,
			columnCount: !0,
			fillOpacity: !0,
			flexGrow: !0,
			flexShrink: !0,
			fontWeight: !0,
			gridArea: !0,
			gridColumn: !0,
			gridColumnEnd: !0,
			gridColumnStart: !0,
			gridRow: !0,
			gridRowEnd: !0,
			gridRowStart: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {},
		style: function(e, t, n, r) {
			if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var o, i, a, s = b(t),
					u = it.test(t),
					c = e.style;
				if (u || (t = rt(s)), a = E.cssHooks[t] || E.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (o = a.get(e, !1, r)) ? o : c[t];
				"string" == (i = typeof n) && (o = me.exec(n)) && o[1] && (n = be(e, t, o), i = "number"), null != n && n == n && ("number" !== i || u || (n += o && o[3] || (E.cssNumber[s] ? "" : "px")), v.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? c.setProperty(t, n) : c[t] = n))
			}
		},
		css: function(e, t, n, r) {
			var o, i = b(t);
			return it.test(t) || (t = rt(i)), "normal" === (o = void 0 === (o = (i = E.cssHooks[t] || E.cssHooks[i]) && "get" in i ? i.get(e, !0, n) : o) ? Qe(e, t, r) : o) && t in st && (o = st[t]), ("" === n || n) && (i = parseFloat(o), !0 === n || isFinite(i)) ? i || 0 : o
		}
	}), E.each(["height", "width"], function(e, a) {
		E.cssHooks[a] = {
			get: function(e, t, n) {
				if (t) return !ot.test(E.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? lt(e, a, n) : _e(e, at, function() {
					return lt(e, a, n)
				})
			},
			set: function(e, t, n) {
				var r = Me(e),
					o = !v.scrollboxSize() && "absolute" === r.position,
					i = (o || n) && "border-box" === E.css(e, "boxSizing", !1, r),
					n = n ? ct(e, a, n, i, r) : 0;
				return i && o && (n -= Math.ceil(e["offset" + a[0].toUpperCase() + a.slice(1)] - parseFloat(r[a]) - ct(e, a, "border", !1, r) - .5)), n && (i = me.exec(t)) && "px" !== (i[3] || "px") && (e.style[a] = t, t = E.css(e, a)), ut(0, t, n)
			}
		}
	}), E.cssHooks.marginLeft = Ke(v.reliableMarginLeft, function(e, t) {
		if (t) return (parseFloat(Qe(e, "marginLeft")) || e.getBoundingClientRect().left - _e(e, {
			marginLeft: 0
		}, function() {
			return e.getBoundingClientRect().left
		})) + "px"
	}), E.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(o, i) {
		E.cssHooks[o + i] = {
			expand: function(e) {
				for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) n[o + h[t] + i] = r[t] || r[t - 2] || r[0];
				return n
			}
		}, "margin" !== o && (E.cssHooks[o + i].set = ut)
	}), E.fn.extend({
		css: function(e, t) {
			return f(this, function(e, t, n) {
				var r, o, i = {},
					a = 0;
				if (Array.isArray(t)) {
					for (r = Me(e), o = t.length; a < o; a++) i[t[a]] = E.css(e, t[a], !1, r);
					return i
				}
				return void 0 !== n ? E.style(e, t, n) : E.css(e, t)
			}, e, t, 1 < arguments.length)
		}
	}), ((E.Tween = i).prototype = {
		constructor: i,
		init: function(e, t, n, r, o, i) {
			this.elem = e, this.prop = n, this.easing = o || E.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = i || (E.cssNumber[n] ? "" : "px")
		},
		cur: function() {
			var e = i.propHooks[this.prop];
			return (e && e.get ? e : i.propHooks._default).get(this)
		},
		run: function(e) {
			var t, n = i.propHooks[this.prop];
			return this.options.duration ? this.pos = t = E.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), (n && n.set ? n : i.propHooks._default).set(this), this
		}
	}).init.prototype = i.prototype, (i.propHooks = {
		_default: {
			get: function(e) {
				return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (e = E.css(e.elem, e.prop, "")) && "auto" !== e ? e : 0
			},
			set: function(e) {
				E.fx.step[e.prop] ? E.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !E.cssHooks[e.prop] && null == e.elem.style[rt(e.prop)] ? e.elem[e.prop] = e.now : E.style(e.elem, e.prop, e.now + e.unit)
			}
		}
	}).scrollTop = i.propHooks.scrollLeft = {
		set: function(e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
		}
	}, E.easing = {
		linear: function(e) {
			return e
		},
		swing: function(e) {
			return .5 - Math.cos(e * Math.PI) / 2
		},
		_default: "swing"
	}, E.fx = i.prototype.init, E.fx.step = {};
	var q, ft, N, ht = /^(?:toggle|show|hide)$/,
		pt = /queueHooks$/;

	function dt() {
		ft && (!1 === C.hidden && T.requestAnimationFrame ? T.requestAnimationFrame(dt) : T.setTimeout(dt, E.fx.interval), E.fx.tick())
	}

	function gt() {
		return T.setTimeout(function() {
			q = void 0
		}), q = Date.now()
	}

	function vt(e, t) {
		var n, r = 0,
			o = {
				height: e
			};
		for (t = t ? 1 : 0; r < 4; r += 2 - t) o["margin" + (n = h[r])] = o["padding" + n] = e;
		return t && (o.opacity = o.width = e), o
	}

	function mt(e, t, n) {
		for (var r, o = (D.tweeners[t] || []).concat(D.tweeners["*"]), i = 0, a = o.length; i < a; i++)
			if (r = o[i].call(n, t, e)) return r
	}

	function D(o, e, t) {
		var n, i, r, a, s, u, c, l = 0,
			f = D.prefilters.length,
			h = E.Deferred().always(function() {
				delete p.elem
			}),
			p = function() {
				if (i) return !1;
				for (var e = q || gt(), e = Math.max(0, d.startTime + d.duration - e), t = 1 - (e / d.duration || 0), n = 0, r = d.tweens.length; n < r; n++) d.tweens[n].run(t);
				return h.notifyWith(o, [d, t, e]), t < 1 && r ? e : (r || h.notifyWith(o, [d, 1, 0]), h.resolveWith(o, [d]), !1)
			},
			d = h.promise({
				elem: o,
				props: E.extend({}, e),
				opts: E.extend(!0, {
					specialEasing: {},
					easing: E.easing._default
				}, t),
				originalProperties: e,
				originalOptions: t,
				startTime: q || gt(),
				duration: t.duration,
				tweens: [],
				createTween: function(e, t) {
					t = E.Tween(o, d.opts, e, t, d.opts.specialEasing[e] || d.opts.easing);
					return d.tweens.push(t), t
				},
				stop: function(e) {
					var t = 0,
						n = e ? d.tweens.length : 0;
					if (!i) {
						for (i = !0; t < n; t++) d.tweens[t].run(1);
						e ? (h.notifyWith(o, [d, 1, 0]), h.resolveWith(o, [d, e])) : h.rejectWith(o, [d, e])
					}
					return this
				}
			}),
			g = d.props,
			v = g,
			m = d.opts.specialEasing;
		for (r in v)
			if (s = m[a = b(r)], u = v[r], Array.isArray(u) && (s = u[1], u = v[r] = u[0]), r !== a && (v[a] = u, delete v[r]), (c = E.cssHooks[a]) && "expand" in c)
				for (r in u = c.expand(u), delete v[a], u) r in v || (v[r] = u[r], m[r] = s);
			else m[a] = s;
		for (; l < f; l++)
			if (n = D.prefilters[l].call(d, o, g, d.opts)) return y(n.stop) && (E._queueHooks(d.elem, d.opts.queue).stop = n.stop.bind(n)), n;
		return E.map(g, mt, d), y(d.opts.start) && d.opts.start.call(o, d), d.progress(d.opts.progress).done(d.opts.done, d.opts.complete).fail(d.opts.fail).always(d.opts.always), E.fx.timer(E.extend(p, {
			elem: o,
			anim: d,
			queue: d.opts.queue
		})), d
	}
	E.Animation = E.extend(D, {
		tweeners: {
			"*": [function(e, t) {
				var n = this.createTween(e, t);
				return be(n.elem, e, me.exec(t), n), n
			}]
		},
		tweener: function(e, t) {
			for (var n, r = 0, o = (e = y(e) ? (t = e, ["*"]) : e.match(k)).length; r < o; r++) n = e[r], D.tweeners[n] = D.tweeners[n] || [], D.tweeners[n].unshift(t)
		},
		prefilters: [function(e, t, n) {
			var r, o, i, a, s, u, c, l = "width" in t || "height" in t,
				f = this,
				h = {},
				p = e.style,
				d = e.nodeType && ve(e),
				g = x.get(e, "fxshow");
			for (r in n.queue || (null == (a = E._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function() {
					a.unqueued || s()
				}), a.unqueued++, f.always(function() {
					f.always(function() {
						a.unqueued--, E.queue(e, "fx").length || a.empty.fire()
					})
				})), t)
				if (o = t[r], ht.test(o)) {
					if (delete t[r], i = i || "toggle" === o, o === (d ? "hide" : "show")) {
						if ("show" !== o || !g || void 0 === g[r]) continue;
						d = !0
					}
					h[r] = g && g[r] || E.style(e, r)
				} if ((u = !E.isEmptyObject(t)) || !E.isEmptyObject(h))
				for (r in l && 1 === e.nodeType && (n.overflow = [p.overflow, p.overflowX, p.overflowY], null == (c = g && g.display) && (c = x.get(e, "display")), "none" === (l = E.css(e, "display")) && (c ? l = c : ($([e], !0), c = e.style.display || c, l = E.css(e, "display"), $([e]))), "inline" === l || "inline-block" === l && null != c) && "none" === E.css(e, "float") && (u || (f.done(function() {
						p.display = c
					}), null == c && (l = p.display, c = "none" === l ? "" : l)), p.display = "inline-block"), n.overflow && (p.overflow = "hidden", f.always(function() {
						p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
					})), u = !1, h) u || (g ? "hidden" in g && (d = g.hidden) : g = x.access(e, "fxshow", {
					display: c
				}), i && (g.hidden = !d), d && $([e], !0), f.done(function() {
					for (r in d || $([e]), x.remove(e, "fxshow"), h) E.style(e, r, h[r])
				})), u = mt(d ? g[r] : 0, r, f), r in g || (g[r] = u.start, d && (u.end = u.start, u.start = 0))
		}],
		prefilter: function(e, t) {
			t ? D.prefilters.unshift(e) : D.prefilters.push(e)
		}
	}), E.speed = function(e, t, n) {
		var r = e && "object" == typeof e ? E.extend({}, e) : {
			complete: n || !n && t || y(e) && e,
			duration: e,
			easing: n && t || t && !y(t) && t
		};
		return E.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in E.fx.speeds ? r.duration = E.fx.speeds[r.duration] : r.duration = E.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
			y(r.old) && r.old.call(this), r.queue && E.dequeue(this, r.queue)
		}, r
	}, E.fn.extend({
		fadeTo: function(e, t, n, r) {
			return this.filter(ve).css("opacity", 0).show().end().animate({
				opacity: t
			}, e, n, r)
		},
		animate: function(t, e, n, r) {
			function o() {
				var e = D(this, E.extend({}, t), a);
				(i || x.get(this, "finish")) && e.stop(!0)
			}
			var i = E.isEmptyObject(t),
				a = E.speed(e, n, r);
			return o.finish = o, i || !1 === a.queue ? this.each(o) : this.queue(a.queue, o)
		},
		stop: function(o, e, i) {
			function a(e) {
				var t = e.stop;
				delete e.stop, t(i)
			}
			return "string" != typeof o && (i = e, e = o, o = void 0), e && this.queue(o || "fx", []), this.each(function() {
				var e = !0,
					t = null != o && o + "queueHooks",
					n = E.timers,
					r = x.get(this);
				if (t) r[t] && r[t].stop && a(r[t]);
				else
					for (t in r) r[t] && r[t].stop && pt.test(t) && a(r[t]);
				for (t = n.length; t--;) n[t].elem !== this || null != o && n[t].queue !== o || (n[t].anim.stop(i), e = !1, n.splice(t, 1));
				!e && i || E.dequeue(this, o)
			})
		},
		finish: function(a) {
			return !1 !== a && (a = a || "fx"), this.each(function() {
				var e, t = x.get(this),
					n = t[a + "queue"],
					r = t[a + "queueHooks"],
					o = E.timers,
					i = n ? n.length : 0;
				for (t.finish = !0, E.queue(this, a, []), r && r.stop && r.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === a && (o[e].anim.stop(!0), o.splice(e, 1));
				for (e = 0; e < i; e++) n[e] && n[e].finish && n[e].finish.call(this);
				delete t.finish
			})
		}
	}), E.each(["toggle", "show", "hide"], function(e, r) {
		var o = E.fn[r];
		E.fn[r] = function(e, t, n) {
			return null == e || "boolean" == typeof e ? o.apply(this, arguments) : this.animate(vt(r, !0), e, t, n)
		}
	}), E.each({
		slideDown: vt("show"),
		slideUp: vt("hide"),
		slideToggle: vt("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(e, r) {
		E.fn[e] = function(e, t, n) {
			return this.animate(r, e, t, n)
		}
	}), E.timers = [], E.fx.tick = function() {
		var e, t = 0,
			n = E.timers;
		for (q = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
		n.length || E.fx.stop(), q = void 0
	}, E.fx.timer = function(e) {
		E.timers.push(e), E.fx.start()
	}, E.fx.interval = 13, E.fx.start = function() {
		ft || (ft = !0, dt())
	}, E.fx.stop = function() {
		ft = null
	}, E.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	}, E.fn.delay = function(r, e) {
		return r = E.fx && E.fx.speeds[r] || r, this.queue(e = e || "fx", function(e, t) {
			var n = T.setTimeout(e, r);
			t.stop = function() {
				T.clearTimeout(n)
			}
		})
	}, N = C.createElement("input"), n = C.createElement("select").appendChild(C.createElement("option")), N.type = "checkbox", v.checkOn = "" !== N.value, v.optSelected = n.selected, (N = C.createElement("input")).value = "t", N.type = "radio", v.radioValue = "t" === N.value;
	var yt, bt = E.expr.attrHandle,
		xt = (E.fn.extend({
			attr: function(e, t) {
				return f(this, E.attr, e, t, 1 < arguments.length)
			},
			removeAttr: function(e) {
				return this.each(function() {
					E.removeAttr(this, e)
				})
			}
		}), E.extend({
			attr: function(e, t, n) {
				var r, o, i = e.nodeType;
				if (3 !== i && 8 !== i && 2 !== i) return void 0 === e.getAttribute ? E.prop(e, t, n) : (1 === i && E.isXMLDoc(e) || (o = E.attrHooks[t.toLowerCase()] || (E.expr.match.bool.test(t) ? yt : void 0)), void 0 !== n ? null === n ? void E.removeAttr(e, t) : o && "set" in o && void 0 !== (r = o.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : !(o && "get" in o && null !== (r = o.get(e, t))) && null == (r = E.find.attr(e, t)) ? void 0 : r)
			},
			attrHooks: {
				type: {
					set: function(e, t) {
						var n;
						if (!v.radioValue && "radio" === t && u(e, "input")) return n = e.value, e.setAttribute("type", t), n && (e.value = n), t
					}
				}
			},
			removeAttr: function(e, t) {
				var n, r = 0,
					o = t && t.match(k);
				if (o && 1 === e.nodeType)
					for (; n = o[r++];) e.removeAttribute(n)
			}
		}), yt = {
			set: function(e, t, n) {
				return !1 === t ? E.removeAttr(e, n) : e.setAttribute(n, n), n
			}
		}, E.each(E.expr.match.bool.source.match(/\w+/g), function(e, t) {
			var a = bt[t] || E.find.attr;
			bt[t] = function(e, t, n) {
				var r, o, i = t.toLowerCase();
				return n || (o = bt[i], bt[i] = r, r = null != a(e, t, n) ? i : null, bt[i] = o), r
			}
		}), /^(?:input|select|textarea|button)$/i),
		wt = /^(?:a|area)$/i;

	function L(e) {
		return (e.match(k) || []).join(" ")
	}

	function R(e) {
		return e.getAttribute && e.getAttribute("class") || ""
	}

	function Tt(e) {
		return Array.isArray(e) ? e : "string" == typeof e && e.match(k) || []
	}
	E.fn.extend({
		prop: function(e, t) {
			return f(this, E.prop, e, t, 1 < arguments.length)
		},
		removeProp: function(e) {
			return this.each(function() {
				delete this[E.propFix[e] || e]
			})
		}
	}), E.extend({
		prop: function(e, t, n) {
			var r, o, i = e.nodeType;
			if (3 !== i && 8 !== i && 2 !== i) return 1 === i && E.isXMLDoc(e) || (t = E.propFix[t] || t, o = E.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (r = o.set(e, n, t)) ? r : e[t] = n : o && "get" in o && null !== (r = o.get(e, t)) ? r : e[t]
		},
		propHooks: {
			tabIndex: {
				get: function(e) {
					var t = E.find.attr(e, "tabindex");
					return t ? parseInt(t, 10) : xt.test(e.nodeName) || wt.test(e.nodeName) && e.href ? 0 : -1
				}
			}
		},
		propFix: {
			for: "htmlFor",
			class: "className"
		}
	}), v.optSelected || (E.propHooks.selected = {
		get: function(e) {
			e = e.parentNode;
			return e && e.parentNode && e.parentNode.selectedIndex, null
		},
		set: function(e) {
			e = e.parentNode;
			e && (e.selectedIndex, e.parentNode) && e.parentNode.selectedIndex
		}
	}), E.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
		E.propFix[this.toLowerCase()] = this
	}), E.fn.extend({
		addClass: function(t) {
			var e, n, r, o, i, a, s = 0;
			if (y(t)) return this.each(function(e) {
				E(this).addClass(t.call(this, e, R(this)))
			});
			if ((e = Tt(t)).length)
				for (; n = this[s++];)
					if (a = R(n), r = 1 === n.nodeType && " " + L(a) + " ") {
						for (i = 0; o = e[i++];) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
						a !== (a = L(r)) && n.setAttribute("class", a)
					} return this
		},
		removeClass: function(t) {
			var e, n, r, o, i, a, s = 0;
			if (y(t)) return this.each(function(e) {
				E(this).removeClass(t.call(this, e, R(this)))
			});
			if (!arguments.length) return this.attr("class", "");
			if ((e = Tt(t)).length)
				for (; n = this[s++];)
					if (a = R(n), r = 1 === n.nodeType && " " + L(a) + " ") {
						for (i = 0; o = e[i++];)
							for (; - 1 < r.indexOf(" " + o + " ");) r = r.replace(" " + o + " ", " ");
						a !== (a = L(r)) && n.setAttribute("class", a)
					} return this
		},
		toggleClass: function(o, t) {
			var i = typeof o,
				a = "string" == i || Array.isArray(o);
			return "boolean" == typeof t && a ? t ? this.addClass(o) : this.removeClass(o) : y(o) ? this.each(function(e) {
				E(this).toggleClass(o.call(this, e, R(this), t), t)
			}) : this.each(function() {
				var e, t, n, r;
				if (a)
					for (t = 0, n = E(this), r = Tt(o); e = r[t++];) n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
				else void 0 !== o && "boolean" != i || ((e = R(this)) && x.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", !e && !1 !== o && x.get(this, "__className__") || ""))
			})
		},
		hasClass: function(e) {
			for (var t, n = 0, r = " " + e + " "; t = this[n++];)
				if (1 === t.nodeType && -1 < (" " + L(R(t)) + " ").indexOf(r)) return !0;
			return !1
		}
	});

	function Ct(e) {
		e.stopPropagation()
	}
	var Et = /\r/g,
		kt = (E.fn.extend({
			val: function(t) {
				var n, e, r, o = this[0];
				return arguments.length ? (r = y(t), this.each(function(e) {
					1 === this.nodeType && (null == (e = r ? t.call(this, e, E(this).val()) : t) ? e = "" : "number" == typeof e ? e += "" : Array.isArray(e) && (e = E.map(e, function(e) {
						return null == e ? "" : e + ""
					})), (n = E.valHooks[this.type] || E.valHooks[this.nodeName.toLowerCase()]) && "set" in n && void 0 !== n.set(this, e, "value") || (this.value = e))
				})) : o ? (n = E.valHooks[o.type] || E.valHooks[o.nodeName.toLowerCase()]) && "get" in n && void 0 !== (e = n.get(o, "value")) ? e : "string" == typeof(e = o.value) ? e.replace(Et, "") : null == e ? "" : e : void 0
			}
		}), E.extend({
			valHooks: {
				option: {
					get: function(e) {
						var t = E.find.attr(e, "value");
						return null != t ? t : L(E.text(e))
					}
				},
				select: {
					get: function(e) {
						for (var t, n = e.options, r = e.selectedIndex, o = "select-one" === e.type, i = o ? null : [], a = o ? r + 1 : n.length, s = r < 0 ? a : o ? r : 0; s < a; s++)
							if (((t = n[s]).selected || s === r) && !t.disabled && (!t.parentNode.disabled || !u(t.parentNode, "optgroup"))) {
								if (t = E(t).val(), o) return t;
								i.push(t)
							} return i
					},
					set: function(e, t) {
						for (var n, r, o = e.options, i = E.makeArray(t), a = o.length; a--;)((r = o[a]).selected = -1 < E.inArray(E.valHooks.option.get(r), i)) && (n = !0);
						return n || (e.selectedIndex = -1), i
					}
				}
			}
		}), E.each(["radio", "checkbox"], function() {
			E.valHooks[this] = {
				set: function(e, t) {
					if (Array.isArray(t)) return e.checked = -1 < E.inArray(E(e).val(), t)
				}
			}, v.checkOn || (E.valHooks[this].get = function(e) {
				return null === e.getAttribute("value") ? "on" : e.value
			})
		}), v.focusin = "onfocusin" in T, /^(?:focusinfocus|focusoutblur)$/),
		St = (E.extend(E.event, {
			trigger: function(e, t, n, r) {
				var o, i, a, s, u, c, l, f = [n || C],
					h = W.call(e, "type") ? e.type : e,
					p = W.call(e, "namespace") ? e.namespace.split(".") : [],
					d = l = i = n = n || C;
				if (3 !== n.nodeType && 8 !== n.nodeType && !kt.test(h + E.event.triggered) && (-1 < h.indexOf(".") && (h = (p = h.split(".")).shift(), p.sort()), s = h.indexOf(":") < 0 && "on" + h, (e = e[E.expando] ? e : new E.Event(h, "object" == typeof e && e)).isTrigger = r ? 2 : 3, e.namespace = p.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : E.makeArray(t, [e]), c = E.event.special[h] || {}, r || !c.trigger || !1 !== c.trigger.apply(n, t))) {
					if (!r && !c.noBubble && !g(n)) {
						for (a = c.delegateType || h, kt.test(a + h) || (d = d.parentNode); d; d = d.parentNode) f.push(d), i = d;
						i === (n.ownerDocument || C) && f.push(i.defaultView || i.parentWindow || T)
					}
					for (o = 0;
						(d = f[o++]) && !e.isPropagationStopped();) l = d, e.type = 1 < o ? a : c.bindType || h, (u = (x.get(d, "events") || Object.create(null))[e.type] && x.get(d, "handle")) && u.apply(d, t), (u = s && d[s]) && u.apply && m(d) && (e.result = u.apply(d, t), !1 === e.result) && e.preventDefault();
					return e.type = h, r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(f.pop(), t) || !m(n) || s && y(n[h]) && !g(n) && ((i = n[s]) && (n[s] = null), E.event.triggered = h, e.isPropagationStopped() && l.addEventListener(h, Ct), n[h](), e.isPropagationStopped() && l.removeEventListener(h, Ct), E.event.triggered = void 0, i) && (n[s] = i), e.result
				}
			},
			simulate: function(e, t, n) {
				n = E.extend(new E.Event, n, {
					type: e,
					isSimulated: !0
				});
				E.event.trigger(n, null, t)
			}
		}), E.fn.extend({
			trigger: function(e, t) {
				return this.each(function() {
					E.event.trigger(e, t, this)
				})
			},
			triggerHandler: function(e, t) {
				var n = this[0];
				if (n) return E.event.trigger(e, t, n, !0)
			}
		}), v.focusin || E.each({
			focus: "focusin",
			blur: "focusout"
		}, function(n, r) {
			function o(e) {
				E.event.simulate(r, e.target, E.event.fix(e))
			}
			E.event.special[r] = {
				setup: function() {
					var e = this.ownerDocument || this.document || this,
						t = x.access(e, r);
					t || e.addEventListener(n, o, !0), x.access(e, r, (t || 0) + 1)
				},
				teardown: function() {
					var e = this.ownerDocument || this.document || this,
						t = x.access(e, r) - 1;
					t ? x.access(e, r, t) : (e.removeEventListener(n, o, !0), x.remove(e, r))
				}
			}
		}), T.location),
		$t = {
			guid: Date.now()
		},
		At = /\?/,
		jt = (E.parseXML = function(e) {
			var t, n;
			if (!e || "string" != typeof e) return null;
			try {
				t = (new T.DOMParser).parseFromString(e, "text/xml")
			} catch (e) {}
			return n = t && t.getElementsByTagName("parsererror")[0], t && !n || E.error("Invalid XML: " + (n ? E.map(n.childNodes, function(e) {
				return e.textContent
			}).join("\n") : e)), t
		}, /\[\]$/),
		Pt = /\r?\n/g,
		qt = /^(?:submit|button|image|reset|file)$/i,
		Nt = /^(?:input|select|textarea|keygen)/i;
	E.param = function(e, t) {
		function n(e, t) {
			t = y(t) ? t() : t, o[o.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == t ? "" : t)
		}
		var r, o = [];
		if (null == e) return "";
		if (Array.isArray(e) || e.jquery && !E.isPlainObject(e)) E.each(e, function() {
			n(this.name, this.value)
		});
		else
			for (r in e) ! function n(r, e, o, i) {
				if (Array.isArray(e)) E.each(e, function(e, t) {
					o || jt.test(r) ? i(r, t) : n(r + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, o, i)
				});
				else if (o || "object" !== d(e)) i(r, e);
				else
					for (var t in e) n(r + "[" + t + "]", e[t], o, i)
			}(r, e[r], t, n);
		return o.join("&")
	}, E.fn.extend({
		serialize: function() {
			return E.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				var e = E.prop(this, "elements");
				return e ? E.makeArray(e) : this
			}).filter(function() {
				var e = this.type;
				return this.name && !E(this).is(":disabled") && Nt.test(this.nodeName) && !qt.test(e) && (this.checked || !we.test(e))
			}).map(function(e, t) {
				var n = E(this).val();
				return null == n ? null : Array.isArray(n) ? E.map(n, function(e) {
					return {
						name: t.name,
						value: e.replace(Pt, "\r\n")
					}
				}) : {
					name: t.name,
					value: n.replace(Pt, "\r\n")
				}
			}).get()
		}
	});
	var Dt = /%20/g,
		Lt = /#.*$/,
		Rt = /([?&])_=[^&]*/,
		Ht = /^(.*?):[ \t]*([^\r\n]*)$/gm,
		Ot = /^(?:GET|HEAD)$/,
		It = /^\/\//,
		Mt = {},
		_t = {},
		Bt = "*/".concat("*"),
		Ft = C.createElement("a");

	function Wt(i) {
		return function(e, t) {
			"string" != typeof e && (t = e, e = "*");
			var n, r = 0,
				o = e.toLowerCase().match(k) || [];
			if (y(t))
				for (; n = o[r++];) "+" === n[0] ? (n = n.slice(1) || "*", (i[n] = i[n] || []).unshift(t)) : (i[n] = i[n] || []).push(t)
		}
	}

	function Ut(t, r, o, i) {
		var a = {},
			s = t === _t;

		function u(e) {
			var n;
			return a[e] = !0, E.each(t[e] || [], function(e, t) {
				t = t(r, o, i);
				return "string" != typeof t || s || a[t] ? s ? !(n = t) : void 0 : (r.dataTypes.unshift(t), u(t), !1)
			}), n
		}
		return u(r.dataTypes[0]) || !a["*"] && u("*")
	}

	function zt(e, t) {
		var n, r, o = E.ajaxSettings.flatOptions || {};
		for (n in t) void 0 !== t[n] && ((o[n] ? e : r = r || {})[n] = t[n]);
		return r && E.extend(!0, e, r), e
	}
	Ft.href = St.href, E.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: St.href,
			type: "GET",
			isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(St.protocol),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": Bt,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			converters: {
				"* text": String,
				"text html": !0,
				"text json": JSON.parse,
				"text xml": E.parseXML
			},
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		ajaxSetup: function(e, t) {
			return t ? zt(zt(e, E.ajaxSettings), t) : zt(E.ajaxSettings, e)
		},
		ajaxPrefilter: Wt(Mt),
		ajaxTransport: Wt(_t),
		ajax: function(e, t) {
			"object" == typeof e && (t = e, e = void 0);
			var u, c, l, n, f, h, p, r, o, d = E.ajaxSetup({}, t = t || {}),
				g = d.context || d,
				v = d.context && (g.nodeType || g.jquery) ? E(g) : E.event,
				m = E.Deferred(),
				y = E.Callbacks("once memory"),
				b = d.statusCode || {},
				i = {},
				a = {},
				s = "canceled",
				x = {
					readyState: 0,
					getResponseHeader: function(e) {
						var t;
						if (h) {
							if (!n)
								for (n = {}; t = Ht.exec(l);) n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2]);
							t = n[e.toLowerCase() + " "]
						}
						return null == t ? null : t.join(", ")
					},
					getAllResponseHeaders: function() {
						return h ? l : null
					},
					setRequestHeader: function(e, t) {
						return null == h && (e = a[e.toLowerCase()] = a[e.toLowerCase()] || e, i[e] = t), this
					},
					overrideMimeType: function(e) {
						return null == h && (d.mimeType = e), this
					},
					statusCode: function(e) {
						if (e)
							if (h) x.always(e[x.status]);
							else
								for (var t in e) b[t] = [b[t], e[t]];
						return this
					},
					abort: function(e) {
						e = e || s;
						return u && u.abort(e), w(0, e), this
					}
				};
			if (m.promise(x), d.url = ((e || d.url || St.href) + "").replace(It, St.protocol + "//"), d.type = t.method || t.type || d.method || d.type, d.dataTypes = (d.dataType || "*").toLowerCase().match(k) || [""], null == d.crossDomain) {
				o = C.createElement("a");
				try {
					o.href = d.url, o.href = o.href, d.crossDomain = Ft.protocol + "//" + Ft.host != o.protocol + "//" + o.host
				} catch (e) {
					d.crossDomain = !0
				}
			}
			if (d.data && d.processData && "string" != typeof d.data && (d.data = E.param(d.data, d.traditional)), Ut(Mt, d, t, x), !h) {
				for (r in (p = E.event && d.global) && 0 == E.active++ && E.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !Ot.test(d.type), c = d.url.replace(Lt, ""), d.hasContent ? d.data && d.processData && 0 === (d.contentType || "").indexOf("application/x-www-form-urlencoded") && (d.data = d.data.replace(Dt, "+")) : (o = d.url.slice(c.length), d.data && (d.processData || "string" == typeof d.data) && (c += (At.test(c) ? "&" : "?") + d.data, delete d.data), !1 === d.cache && (c = c.replace(Rt, "$1"), o = (At.test(c) ? "&" : "?") + "_=" + $t.guid++ + o), d.url = c + o), d.ifModified && (E.lastModified[c] && x.setRequestHeader("If-Modified-Since", E.lastModified[c]), E.etag[c]) && x.setRequestHeader("If-None-Match", E.etag[c]), (d.data && d.hasContent && !1 !== d.contentType || t.contentType) && x.setRequestHeader("Content-Type", d.contentType), x.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Bt + "; q=0.01" : "") : d.accepts["*"]), d.headers) x.setRequestHeader(r, d.headers[r]);
				if (d.beforeSend && (!1 === d.beforeSend.call(g, x, d) || h)) return x.abort();
				if (s = "abort", y.add(d.complete), x.done(d.success), x.fail(d.error), u = Ut(_t, d, t, x)) {
					if (x.readyState = 1, p && v.trigger("ajaxSend", [x, d]), h) return x;
					d.async && 0 < d.timeout && (f = T.setTimeout(function() {
						x.abort("timeout")
					}, d.timeout));
					try {
						h = !1, u.send(i, w)
					} catch (e) {
						if (h) throw e;
						w(-1, e)
					}
				} else w(-1, "No Transport")
			}
			return x;

			function w(e, t, n, r) {
				var o, i, a, s = t;
				h || (h = !0, f && T.clearTimeout(f), u = void 0, l = r || "", x.readyState = 0 < e ? 4 : 0, r = 200 <= e && e < 300 || 304 === e, n && (a = function(e, t, n) {
					for (var r, o, i, a, s = e.contents, u = e.dataTypes;
						"*" === u[0];) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
					if (r)
						for (o in s)
							if (s[o] && s[o].test(r)) {
								u.unshift(o);
								break
							} if (u[0] in n) i = u[0];
					else {
						for (o in n) {
							if (!u[0] || e.converters[o + " " + u[0]]) {
								i = o;
								break
							}
							a = a || o
						}
						i = i || a
					}
					if (i) return i !== u[0] && u.unshift(i), n[i]
				}(d, x, n)), !r && -1 < E.inArray("script", d.dataTypes) && E.inArray("json", d.dataTypes) < 0 && (d.converters["text script"] = function() {}), a = function(e, t, n, r) {
					var o, i, a, s, u, c = {},
						l = e.dataTypes.slice();
					if (l[1])
						for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
					for (i = l.shift(); i;)
						if (e.responseFields[i] && (n[e.responseFields[i]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = i, i = l.shift())
							if ("*" === i) i = u;
							else if ("*" !== u && u !== i) {
						if (!(a = c[u + " " + i] || c["* " + i]))
							for (o in c)
								if ((s = o.split(" "))[1] === i && (a = c[u + " " + s[0]] || c["* " + s[0]])) {
									!0 === a ? a = c[o] : !0 !== c[o] && (i = s[0], l.unshift(s[1]));
									break
								} if (!0 !== a)
							if (a && e.throws) t = a(t);
							else try {
								t = a(t)
							} catch (e) {
								return {
									state: "parsererror",
									error: a ? e : "No conversion from " + u + " to " + i
								}
							}
					}
					return {
						state: "success",
						data: t
					}
				}(d, a, x, r), r ? (d.ifModified && ((n = x.getResponseHeader("Last-Modified")) && (E.lastModified[c] = n), n = x.getResponseHeader("etag")) && (E.etag[c] = n), 204 === e || "HEAD" === d.type ? s = "nocontent" : 304 === e ? s = "notmodified" : (s = a.state, o = a.data, r = !(i = a.error))) : (i = s, !e && s || (s = "error", e < 0 && (e = 0))), x.status = e, x.statusText = (t || s) + "", r ? m.resolveWith(g, [o, s, x]) : m.rejectWith(g, [x, s, i]), x.statusCode(b), b = void 0, p && v.trigger(r ? "ajaxSuccess" : "ajaxError", [x, d, r ? o : i]), y.fireWith(g, [x, s]), p && (v.trigger("ajaxComplete", [x, d]), --E.active || E.event.trigger("ajaxStop")))
			}
		},
		getJSON: function(e, t, n) {
			return E.get(e, t, n, "json")
		},
		getScript: function(e, t) {
			return E.get(e, void 0, t, "script")
		}
	}), E.each(["get", "post"], function(e, o) {
		E[o] = function(e, t, n, r) {
			return y(t) && (r = r || n, n = t, t = void 0), E.ajax(E.extend({
				url: e,
				type: o,
				dataType: r,
				data: t,
				success: n
			}, E.isPlainObject(e) && e))
		}
	}), E.ajaxPrefilter(function(e) {
		for (var t in e.headers) "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "")
	}), E._evalUrl = function(e, t, n) {
		return E.ajax({
			url: e,
			type: "GET",
			dataType: "script",
			cache: !0,
			async: !1,
			global: !1,
			converters: {
				"text script": function() {}
			},
			dataFilter: function(e) {
				E.globalEval(e, t, n)
			}
		})
	}, E.fn.extend({
		wrapAll: function(e) {
			return this[0] && (y(e) && (e = e.call(this[0])), e = E(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
				for (var e = this; e.firstElementChild;) e = e.firstElementChild;
				return e
			}).append(this)), this
		},
		wrapInner: function(n) {
			return y(n) ? this.each(function(e) {
				E(this).wrapInner(n.call(this, e))
			}) : this.each(function() {
				var e = E(this),
					t = e.contents();
				t.length ? t.wrapAll(n) : e.append(n)
			})
		},
		wrap: function(t) {
			var n = y(t);
			return this.each(function(e) {
				E(this).wrapAll(n ? t.call(this, e) : t)
			})
		},
		unwrap: function(e) {
			return this.parent(e).not("body").each(function() {
				E(this).replaceWith(this.childNodes)
			}), this
		}
	}), E.expr.pseudos.hidden = function(e) {
		return !E.expr.pseudos.visible(e)
	}, E.expr.pseudos.visible = function(e) {
		return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
	}, E.ajaxSettings.xhr = function() {
		try {
			return new T.XMLHttpRequest
		} catch (e) {}
	};
	var Xt = {
			0: 200,
			1223: 204
		},
		Vt = E.ajaxSettings.xhr();
	v.cors = !!Vt && "withCredentials" in Vt, v.ajax = Vt = !!Vt, E.ajaxTransport(function(o) {
		var i, a;
		if (v.cors || Vt && !o.crossDomain) return {
			send: function(e, t) {
				var n, r = o.xhr();
				if (r.open(o.type, o.url, o.async, o.username, o.password), o.xhrFields)
					for (n in o.xhrFields) r[n] = o.xhrFields[n];
				for (n in o.mimeType && r.overrideMimeType && r.overrideMimeType(o.mimeType), o.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) r.setRequestHeader(n, e[n]);
				i = function(e) {
					return function() {
						i && (i = a = r.onload = r.onerror = r.onabort = r.ontimeout = r.onreadystatechange = null, "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(Xt[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
							binary: r.response
						} : {
							text: r.responseText
						}, r.getAllResponseHeaders()))
					}
				}, r.onload = i(), a = r.onerror = r.ontimeout = i("error"), void 0 !== r.onabort ? r.onabort = a : r.onreadystatechange = function() {
					4 === r.readyState && T.setTimeout(function() {
						i && a()
					})
				}, i = i("abort");
				try {
					r.send(o.hasContent && o.data || null)
				} catch (e) {
					if (i) throw e
				}
			},
			abort: function() {
				i && i()
			}
		}
	}), E.ajaxPrefilter(function(e) {
		e.crossDomain && (e.contents.script = !1)
	}), E.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function(e) {
				return E.globalEval(e), e
			}
		}
	}), E.ajaxPrefilter("script", function(e) {
		void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
	}), E.ajaxTransport("script", function(n) {
		var r, o;
		if (n.crossDomain || n.scriptAttrs) return {
			send: function(e, t) {
				r = E("<script>").attr(n.scriptAttrs || {}).prop({
					charset: n.scriptCharset,
					src: n.url
				}).on("load error", o = function(e) {
					r.remove(), o = null, e && t("error" === e.type ? 404 : 200, e.type)
				}), C.head.appendChild(r[0])
			},
			abort: function() {
				o && o()
			}
		}
	});
	var Yt = [],
		Gt = /(=)\?(?=&|$)|\?\?/,
		Qt = (E.ajaxSetup({
			jsonp: "callback",
			jsonpCallback: function() {
				var e = Yt.pop() || E.expando + "_" + $t.guid++;
				return this[e] = !0, e
			}
		}), E.ajaxPrefilter("json jsonp", function(e, t, n) {
			var r, o, i, a = !1 !== e.jsonp && (Gt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Gt.test(e.data) && "data");
			if (a || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = y(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Gt, "$1" + r) : !1 !== e.jsonp && (e.url += (At.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
				return i || E.error(r + " was not called"), i[0]
			}, e.dataTypes[0] = "json", o = T[r], T[r] = function() {
				i = arguments
			}, n.always(function() {
				void 0 === o ? E(T).removeProp(r) : T[r] = o, e[r] && (e.jsonpCallback = t.jsonpCallback, Yt.push(r)), i && y(o) && o(i[0]), i = o = void 0
			}), "script"
		}), v.createHTMLDocument = ((e = C.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === e.childNodes.length), E.parseHTML = function(e, t, n) {
			return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (v.createHTMLDocument ? ((r = (t = C.implementation.createHTMLDocument("")).createElement("base")).href = C.location.href, t.head.appendChild(r)) : t = C), r = !n && [], (n = K.exec(e)) ? [t.createElement(n[1])] : (n = Se([e], t, r), r && r.length && E(r).remove(), E.merge([], n.childNodes)));
			var r
		}, E.fn.load = function(e, t, n) {
			var r, o, i, a = this,
				s = e.indexOf(" ");
			return -1 < s && (r = L(e.slice(s)), e = e.slice(0, s)), y(t) ? (n = t, t = void 0) : t && "object" == typeof t && (o = "POST"), 0 < a.length && E.ajax({
				url: e,
				type: o || "GET",
				dataType: "html",
				data: t
			}).done(function(e) {
				i = arguments, a.html(r ? E("<div>").append(E.parseHTML(e)).find(r) : e)
			}).always(n && function(e, t) {
				a.each(function() {
					n.apply(this, i || [e.responseText, t, e])
				})
			}), this
		}, E.expr.pseudos.animated = function(t) {
			return E.grep(E.timers, function(e) {
				return t === e.elem
			}).length
		}, E.offset = {
			setOffset: function(e, t, n) {
				var r, o, i, a, s = E.css(e, "position"),
					u = E(e),
					c = {};
				"static" === s && (e.style.position = "relative"), i = u.offset(), r = E.css(e, "top"), a = E.css(e, "left"), s = ("absolute" === s || "fixed" === s) && -1 < (r + a).indexOf("auto") ? (o = (s = u.position()).top, s.left) : (o = parseFloat(r) || 0, parseFloat(a) || 0), null != (t = y(t) ? t.call(e, n, E.extend({}, i)) : t).top && (c.top = t.top - i.top + o), null != t.left && (c.left = t.left - i.left + s), "using" in t ? t.using.call(e, c) : u.css(c)
			}
		}, E.fn.extend({
			offset: function(t) {
				var e, n;
				return arguments.length ? void 0 === t ? this : this.each(function(e) {
					E.offset.setOffset(this, t, e)
				}) : (n = this[0]) ? n.getClientRects().length ? (e = n.getBoundingClientRect(), n = n.ownerDocument.defaultView, {
					top: e.top + n.pageYOffset,
					left: e.left + n.pageXOffset
				}) : {
					top: 0,
					left: 0
				} : void 0
			},
			position: function() {
				if (this[0]) {
					var e, t, n, r = this[0],
						o = {
							top: 0,
							left: 0
						};
					if ("fixed" === E.css(r, "position")) t = r.getBoundingClientRect();
					else {
						for (t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === E.css(e, "position");) e = e.parentNode;
						e && e !== r && 1 === e.nodeType && ((o = E(e).offset()).top += E.css(e, "borderTopWidth", !0), o.left += E.css(e, "borderLeftWidth", !0))
					}
					return {
						top: t.top - o.top - E.css(r, "marginTop", !0),
						left: t.left - o.left - E.css(r, "marginLeft", !0)
					}
				}
			},
			offsetParent: function() {
				return this.map(function() {
					for (var e = this.offsetParent; e && "static" === E.css(e, "position");) e = e.offsetParent;
					return e || w
				})
			}
		}), E.each({
			scrollLeft: "pageXOffset",
			scrollTop: "pageYOffset"
		}, function(t, o) {
			var i = "pageYOffset" === o;
			E.fn[t] = function(e) {
				return f(this, function(e, t, n) {
					var r;
					if (g(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), void 0 === n) return r ? r[o] : e[t];
					r ? r.scrollTo(i ? r.pageXOffset : n, i ? n : r.pageYOffset) : e[t] = n
				}, t, e, arguments.length)
			}
		}), E.each(["top", "left"], function(e, n) {
			E.cssHooks[n] = Ke(v.pixelPosition, function(e, t) {
				if (t) return t = Qe(e, n), Ye.test(t) ? E(e).position()[n] + "px" : t
			})
		}), E.each({
			Height: "height",
			Width: "width"
		}, function(a, s) {
			E.each({
				padding: "inner" + a,
				content: s,
				"": "outer" + a
			}, function(r, i) {
				E.fn[i] = function(e, t) {
					var n = arguments.length && (r || "boolean" != typeof e),
						o = r || (!0 === e || !0 === t ? "margin" : "border");
					return f(this, function(e, t, n) {
						var r;
						return g(e) ? 0 === i.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : void 0 === n ? E.css(e, t, o) : E.style(e, t, n, o)
					}, s, n ? e : void 0, n)
				}
			})
		}), E.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
			E.fn[t] = function(e) {
				return this.on(t, e)
			}
		}), E.fn.extend({
			bind: function(e, t, n) {
				return this.on(e, null, t, n)
			},
			unbind: function(e, t) {
				return this.off(e, null, t)
			},
			delegate: function(e, t, n, r) {
				return this.on(t, e, n, r)
			},
			undelegate: function(e, t, n) {
				return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
			},
			hover: function(e, t) {
				return this.mouseenter(e).mouseleave(t || e)
			}
		}), E.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, n) {
			E.fn[n] = function(e, t) {
				return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
			}
		}), /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g),
		Kt = (E.proxy = function(e, t) {
			var n, r;
			if ("string" == typeof t && (r = e[t], t = e, e = r), y(e)) return n = s.call(arguments, 2), (r = function() {
				return e.apply(t || this, n.concat(s.call(arguments)))
			}).guid = e.guid = e.guid || E.guid++, r
		}, E.holdReady = function(e) {
			e ? E.readyWait++ : E.ready(!0)
		}, E.isArray = Array.isArray, E.parseJSON = JSON.parse, E.nodeName = u, E.isFunction = y, E.isWindow = g, E.camelCase = b, E.type = d, E.now = Date.now, E.isNumeric = function(e) {
			var t = E.type(e);
			return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
		}, E.trim = function(e) {
			return null == e ? "" : (e + "").replace(Qt, "")
		}, "function" == typeof define && define.amd && define("jquery", [], function() {
			return E
		}), T.jQuery),
		Jt = T.$;
	return E.noConflict = function(e) {
		return T.$ === E && (T.$ = Jt), e && T.jQuery === E && (T.jQuery = Kt), E
	}, void 0 === H && (T.jQuery = T.$ = E), E
});
var Animations = function() {
		document.documentElement;
		return {
			init: function() {
				$(".display:not(.no-animation)").not(".text-letters-in").each(function() {
					for (var e = $(this).html().split(" "), t = "", n = (e.length, 0); n < e.length; n++) t += "<span>" + e[n] + "</span> ";
					$(this).addClass("text-letters-in animate").html(t)
				})
			},
			update: function() {
				var r, o;
				r = $(window).height(), o = getTop(), $(".js-shift-left").each(function() {
					var e = $(this).data("current") ? Number.parseFloat($(this).data("current")) : 100,
						t = e = Math.floor(100 * e) / 100,
						n = Math.floor(o / r * 100);
					(e = lerp(e, n = 100 <= (n = (n = Math.floor(100 * n) / 100) <= 0 ? 0 : n) ? 100 : n, .3)) != t && $(this).data("current", e).css("transform", `translateX(${-e}%)`)
				})
			}
		}
	}(),
	Hamburger = function() {
		var t = "nav-open";

		function n() {
			$("html,body").addClass(t)
		}

		function r() {
			$("html,body").removeClass(t)
		}
		return {
			init: function() {
				$("[nav-open]").click(function(e) {
					e.preventDefault(), ($("html,body").hasClass(t) ? r : n)()
				}), $("[nav-close]").click(function(e) {
					e.preventDefault(), r()
				}), $(".main-nav a").click(function(e) {
					r()
				})
			},
			open: n,
			close: r
		}
	}();

function getTop() {
	return window.pageYOffset || 1
}

function lerp(e, t, n) {
	return (1 - n) * e + n * t
}

function pxFromTop(e) {
	return getTop() + e.offset().top
}

function percentageSeen(e, t = !0) {
	var n = $(window).height(),
		r = getTop() + n,
		o = e.offset().top,
		e = e.height();
	if (t) {
		if (r + n < o) return 0;
		if (o + e < r) return 100
	}
	return (r + n - o) / ((n + e) / 100)
}

function inViewport(e) {
	var t = getTop(),
		n = e.offset(),
		e = e.height();
	return n.top + e >= t && n.top <= t + $(window).height()
}

function totalSeen(e) {
	var t = getTop(),
		n = $(window).height(),
		r = t + n,
		o = e.offset().top,
		i = e.height(),
		e = e.offset().top + i;
	return r < o ? 0 : e < t ? 100 : (r - o) / ((n + i) / 100)
}

function percentFromTop(e) {
	var t = getTop(),
		n = $(window).height(),
		r = t + n,
		o = e.offset().top,
		i = e.height(),
		e = e.offset().top + i;
	return r < o ? 0 : e < t ? 100 : (t - o) / ((n + i) / 100)
}
var Nav = {
		init: function() {
			$("nav.secondary-nav a").click(function(e) {
				e.preventDefault();
				var e = $(this).attr("href"),
					t = $(".topbar").height() + $("nav.secondary-nav").height();
				$("html, body").animate({
					scrollTop: $(e).offset().top - t
				}, 650), $("nav.secondary-nav li").removeClass("active"), $(this).addClass("active"), $("nav.secondary-nav").addClass("scrolling"), setTimeout(function() {
					$("nav.secondary-nav").removeClass("scrolling")
				}, 800)
			})
		},
		update: function(e) {
			$(".topbar nav li").removeClass("active").each(function() {
				$(this).find("a").attr("href") === e && $(this).addClass("active")
			})
		},
		refresh: function(e) {
			var t = "";
			const n = 50 + ($(".topbar").height() + $("nav.secondary-nav").height());
			$("section").each(function() {
				e > $(this).offset().top - n && (t = $(this).attr("id"))
			}), $("nav.secondary-nav li").removeClass("active").each(function() {
				$(this).find("a").attr("href") === "#" + t && $(this).addClass("active")
			})
		}
	},
	Page = function() {
		var t = document.documentElement,
			e = !1,
			n = !0,
			r = 0,
			o = "",
			i = "in-viewport",
			n = !0;

		function a() {
			Animations.update(), requestAnimationFrame(a)
		}

		function s(e = !1) {
			!e && barba.transitions.isRunning || ("/" === window.location.pathname && n && (n = !1, $("body").addClass("intro"), setTimeout(function() {
				$("body").removeClass("intro").addClass("intro-after"), setTimeout(s, 1700)
			}, 5500)), Video.scroll(), $(".content, .panel, .animate").each(function() {
				$(this).hasClass(i) || ($(this).hasClass("no-animation") || inViewport($(this))) && $(this).addClass(i)
			}), e = r, r = 0, $(".topbar").length && (r += $(".topbar").outerHeight()), $("nav.secondary-nav").length && (r += $("nav.secondary-nav").outerHeight()), e !== r && t.style.setProperty("--headerHeight", r + "px"), u())
		}

		function u() {
			var e, t = "";
			$("section").each(function(e) {
				getTop() > $(this).offset().top - $(".topbar").height() && (t = $(this).hasClass("bg-dark") ? "is-dark" : $(this).hasClass("theme") ? "is-dim" : "is-light")
			}), o !== t && ($("body").removeClass("is-dark is-dim is-light").addClass(t), "is-light" === t ? $('head meta[name="theme-color"]')[0].content = "#ffffff" : (e = $('head meta[name="theme-color"]'))[0].content = e.attr("data-original")), o = t
		}
		return {
			init: function() {
				e || (a(), $(window).on("resize", s), $(window).on("scroll", s), e = !0), s()
			},
			theme: u,
			refresh: s
		}
	}(),
	Parallax = function() {
		const e = !0;

		function t() {
			e || querySelectorAll(".parallax").forEach(e => {
				e.kill(!0)
			})
		}
		return $(window).on("resize", function() {
			e || (ScrollTrigger.refresh(), window.innerWidth < breakpoints[1] ? t() : e || querySelectorAll(".parallax").forEach(e => {
				e.enable()
			}))
		}), {
			init: function() {
				e || 0 !== $(".parallax").length && gsap.utils.toArray("section").forEach(e => {
					0 !== e.querySelectorAll(".parallax").length && gsap.from(e.querySelectorAll(".parallax"), {
						scrollTrigger: {
							trigger: e,
							scrub: !0
						},
						yPercent: (e, t) => {
							return 20 * (t.dataset.speed || 1)
						},
						ease: "power1.out"
					})
				})
			},
			destroy: t
		}
	}(),
	Sequences = function() {
		var p = {},
			o = {},
			d = total_assets_loaded = loaded = 0;

		function r() {
			$(".anim-seq").each(function(e) {
				var t, n, r = $(this).data().canvas;
				r && (t = $(this).data().seqPrefix, t = p[t][o[t].frame], (n = r.getContext("2d")).clearRect(0, 0, r.width, r.height), n.drawImage(t, 0, 0, r.width, r.height))
			})
		}
		const g = (e, t) => String(e).padStart(t, "0");

		function v() {
			total_assets_loaded++, loaded = Math.ceil(total_assets_loaded / d * 100);
			var e = ($circle = $(".loader .loader-circle")).attr("r"),
				e = Math.PI * (2 * e),
				e = (100 - (loaded = 100 < (loaded = loaded < 0 ? 0 : loaded) ? 100 : loaded)) / 100 * e;
			$circle.css({
				strokeDashoffset: e
			})
		}
		return {
			setup: function(e, t) {
				(n = ($canvas = $("<canvas>"))[0]).width = t.width, n.height = t.height, e.after($canvas).data("canvas", n);
				var t = e.data().seqPrefix,
					n = parseInt(e.data().seqAmount);
				o[t] || (o[t] = {
					frame: 0
				}), gsap.to(o[t], {
					frame: n - 1,
					snap: "frame",
					scrollTrigger: {
						trigger: $(e.data().seqTrigger),
						start: "top center",
						end: "bottom center",
						scrub: .5
					},
					onUpdate: r
				})
			},
			preload: function(e) {
				var l, f, h;
				l = e, (d = total_assets_loaded = f = 0) === (h = $(".anim-seq").length) ? (v(), l()) : ($(".loader").removeClass("ready").show(), d += h, f = 0, $(".anim-seq").each(function(e) {
					($this = $(this)).wrap("<div class='anim-seq-wrapper'></div>");
					for (var t, n, r = $this, o = function(e, t) {
							debug.success("sequence ready: " + e.data().seqPrefix), f++, v(), debug.success(f + "/" + h), f === h && (debug.success("all sequences ready"), l()), e && (Sequences.setup(e, t), e.parent().addClass("ready"))
						}, i = r.data().seqPrefix, a = r.data().seqSuffix, s = parseInt(r.data().seqAmount), u = (d += s, 0), c = 0; c < s; c++) p[i] || (p[i] = []), p[i][c] ? (u++, v(), u === s && o(r, p[i][c])) : (t = i + g(c, 3) + a, n = new Image, (p[i][c] = n).onload = function(e) {
						u++, v(), u === s && o(r, e.target)
					}, n.onerror = function(e) {
						u++, v(), u === s && o(r, e.target), r.removeClass("anim-seq"), debug.error("failed to load: " + e.target.src)
					}, n.src = t)
				}))
			},
			update: function() {},
			scroll: function() {}
		}
	}(),
	Video = function() {
		var o = 0,
			i = 0,
			e = 0;

		function t(t) {
			e = t, $(".cycle-videos video").each(function(e) {
				e === t ? ($(this).addClass("active"), $(this)[0].pause(), $(this)[0].currentTime = 0, $(this)[0].play(), $(this).addClass("active")) : ($(this).removeClass("active"), $(this)[0].pause())
			}), $(".cycle-items li").each(function(e) {
				$(this).removeClass("active"), e === t && $(this).addClass("active")
			})
		}

		function a() {
			++e >= $(".cycle-videos video").length || t(e)
		}
		return {
			init: function(r) {
				o = $("video").length, (i = 0) === o && r(), $(".edges").each(function() {
					$(this).find("video").attr("poster")
				}), $("video").each(function(e) {
					var t;
					t = r, ++i >= o && ($(".cycle-videos video").each(function(e) {
						$(this)[0].addEventListener("ended", a)
					}), t());
					$(this)[0].addEventListener("loadeddata", function() {
						$(this).hasClass("play-on-hover") && ($(this)[0].currentTime = 0)
					});
					var n = setInterval(() => {
						$(this).hasClass("ready") || 3 <= this.readyState && ($(this).hasClass("play-on-hover") && ($(this)[0].currentTime = 0), $(this).addClass("ready"), $(this).parent().addClass("ready"), $(this).attr("autoplay") ? this.play() : this.pause(), clearInterval(n))
					}, 300)
				}), $("video.play-on-hover").on("mouseover", function() {
					window.innerWidth > breakpoints[1] && $(this)[0].play()
				}), $("video.play-on-hover").on("mouseout", function() {
					window.innerWidth > breakpoints[1] && $(this)[0].pause()
				}), $(".cycle-videos video").each(function(e) {
					$(this).removeClass("active"), 0 === e && $(this).addClass("active"), $(this)[0].pause()
				}), $(".cycle-items li").each(function(e) {
					$(this).removeClass("active"), 0 === e && $(this).addClass("active"), $(this).click(function() {
						t(e)
					})
				})
			},
			scroll: function() {
				$("video.play-in-viewport").each(function() {
					$(this).hasClass("playing") || inViewport($(this)) && ($(this)[0].pause(), $(this)[0].currentTime = 0, $(this)[0].play(), $(this).addClass("playing"))
				}), window.innerWidth < breakpoints[1] && $("video.play-on-hover").each(function() {
					$(this).hasClass("playing") || inViewport($(this)) && ($(this)[0].pause(), $(this)[0].currentTime = 0, $(this)[0].play(), $(this).addClass("playing"))
				})
			}
		}
	}();
let root = document.documentElement;
var breakpoints = [720, 920, 1080];

function firstTimeSetup() {
	$("html").removeClass("no-js").addClass("js"), $(".topbar a, footer a").click(function(e) {
		$(this).attr("href") === window.location.pathname ? (e.preventDefault(), $(window).scrollTop(0)) : barba.transitions.isRunning || (e = $(this).attr("data-bg") ? $(this).attr("data-bg") : "", root.style.setProperty("--transition-theme", "var(--" + e + ")"))
	}), Hamburger.init(), Page.init(), setupReset()
}

function setupReset() {
	$(window).scrollTop(0);
	var e, t = $("body span[data-originaltheme]");
	t.length && (e = $('head meta[name="theme-color"]'), t = t.attr("data-originaltheme"), e[0].content = t, e.attr("data-original", t)), Page.theme(), setTimeout(function() {
		Sequences.preload(function() {
			Video.init(function() {}), setTimeout(function() {
				$(".loader").addClass("ready"), $("body").addClass("ready"), setupRun()
			}, 300)
		})
	}, 100)
}

function setupRun() {
	$(window).scrollTop(0), Animations.init(), Nav.init(), Parallax.init(), Page.refresh(!0), $("#content a[data-bg]").click(function() {
		var e;
		barba.transitions.isRunning || (e = $(this).attr("data-bg") ? $(this).attr("data-bg") : "", root.style.setProperty("--transition-theme", "var(--" + e + ")"))
	})
}
gsap.ticker.fps(-1), gsap.registerPlugin(ScrollTrigger), history.scrollRestoration && (history.scrollRestoration = "manual"), barba.init({
	cacheIgnore: !0,
	preventRunning: !0,
	transitions: [{
		name: "slide",
		once() {},
		leave(e) {
			return gsap.fromTo(".transition", {
				x: "-100%",
				opacity: "1",
				rotate: "-5deg",
				display: "block"
			}, {
				rotate: "0deg",
				opacity: "1",
				x: "0",
				display: "block",
				ease: "power1.in",
				duration: .55
			})
		},
		enter(e) {
			return gsap.fromTo(".transition", {
				x: "0%",
				opacity: "1",
				display: "block"
			}, {
				x: "0%",
				opacity: "0",
				display: "none",
				ease: "power1.out",
				duration: .25
			})
		},
		beforeLeave(e) {
			Nav.update(e.next.url.path), Hamburger.close()
		},
		afterLeave(e) {
			Parallax.destroy(), $(window).scrollTop(0), $(e.current.container).remove()
		},
		beforeEnter(e) {
			setupReset()
		},
		afterEnter(e) {}
	}]
}), $(document).ready(firstTimeSetup);
var debug = function() {
	function t(e, t = "") {
		$("#debug").length && ($(`<span class="${t}">${e}</span>`).appendTo("#debug"), $("#debug").scrollTop($("#debug")[0].scrollHeight))
	}
	return {
		log: function(e) {
			t(e)
		},
		error: function(e) {
			t(e, "error")
		},
		success: function(e) {
			t(e, "success")
		},
		clear: function() {
			$("#debug").html("")
		}
	}
}();

  document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");

    const runCounter = (counter) => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target"); // Target number
        const current = +counter.innerText; // Current number
        const increment = target / 200; // Adjust speed (lower divisor = faster)

        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCount, 10); // Delay between increments
        } else {
          counter.innerText = target; // Ensure the final value is accurate
        }
      };

      updateCount();
    };

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            runCounter(counter);
            observer.unobserve(counter); // Stop observing after animation starts
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is in view
      }
    );

    counters.forEach((counter) => {
      observer.observe(counter);
    });
  });


