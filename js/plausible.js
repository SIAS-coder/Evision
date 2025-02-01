! function() {
	"use strict";
	var a = window.location,
		o = window.document,
		t = o.currentScript,
		r = t.getAttribute("data-api") || new URL(t.src).origin + "/api/event",
		l = t.getAttribute("data-domain");

	function s(t, e) {
		t && console.warn("Ignoring Event: " + t), e && e.callback && e.callback()
	}

	function e(t, e) {
		if (/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(a.hostname) || "file:" === a.protocol) return s("localhost", e);
		if ((window._phantom || window.__nightmare || window.navigator.webdriver || window.Cypress) && !window.__plausible) return s(null, e);
		try {
			if ("true" === window.localStorage.plausible_ignore) return s("localStorage flag", e)
		} catch (t) {}
		var n = {},
			i = (n.n = t, n.u = a.href, n.d = l, n.r = o.referrer || null, e && e.meta && (n.m = JSON.stringify(e.meta)), e && e.props && (n.p = e.props), new XMLHttpRequest);
		i.open("POST", r, !0), i.setRequestHeader("Content-Type", "text/plain"), i.send(JSON.stringify(n)), i.onreadystatechange = function() {
			4 === i.readyState && e && e.callback && e.callback({
				status: i.status
			})
		}
	}
	var n = window.plausible && window.plausible.q || [];
	window.plausible = e;
	for (var i, p = 0; p < n.length; p++) e.apply(this, n[p]);

	function c() {
		i !== a.pathname && (i = a.pathname, e("pageview"))
	}

	function u() {
		c()
	}
	var w, t = window.history;
	t.pushState && (w = t.pushState, t.pushState = function() {
		w.apply(this, arguments), u()
	}, window.addEventListener("popstate", u)), "prerender" === o.visibilityState ? o.addEventListener("visibilitychange", function() {
		i || "visible" !== o.visibilityState || c()
	}) : c()
}();