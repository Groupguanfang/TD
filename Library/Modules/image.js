!(function () {
  function o(e) {
    return "IMG" === e.tagName;
  }
  function E(e) {
    return e && 1 === e.nodeType;
  }
  function c(e) {
    return ".svg" === (e.currentSrc || e.src).substr(-4).toLowerCase();
  }
  function m(e) {
    try {
      return Array.isArray(e)
        ? e.filter(o)
        : ((t = e),
          NodeList.prototype.isPrototypeOf(t)
            ? [].slice.call(e).filter(o)
            : E(e)
            ? [e].filter(o)
            : "string" == typeof e
            ? [].slice.call(document.querySelectorAll(e)).filter(o)
            : []);
    } catch (e) {
      throw new TypeError(
        "The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom"
      );
    }
    var t;
  }
  function w(e, t) {
    var o = l({ bubbles: !1, cancelable: !1, detail: void 0 }, t);
    return "function" == typeof window.CustomEvent
      ? new CustomEvent(e, o)
      : ((t = document.createEvent("CustomEvent")).initCustomEvent(
          e,
          o.bubbles,
          o.cancelable,
          o.detail
        ),
        t);
  }
  function a(e, t) {
    function o(e) {
      function u() {
        var e = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          },
          t = void 0,
          o = void 0;
        v.container &&
          (v.container instanceof Object
            ? ((t =
                (e = l({}, e, v.container)).width -
                e.left -
                e.right -
                2 * v.margin),
              (o = e.height - e.top - e.bottom - 2 * v.margin))
            : ((d = (i = (
                E(v.container)
                  ? v.container
                  : document.querySelector(v.container)
              ).getBoundingClientRect()).width),
              (a = i.height),
              (r = i.left),
              (m = i.top),
              (e = l({}, e, { width: d, height: a, left: r, top: m })))),
          (t = t || e.width - 2 * v.margin),
          (o = o || e.height - 2 * v.margin);
        var n = z.zoomedHd || z.original,
          i = (!c(n) && n.naturalWidth) || t,
          d = (!c(n) && n.naturalHeight) || o,
          r = (a = n.getBoundingClientRect()).top,
          m = a.left,
          n = a.width,
          a = a.height,
          i = Math.min(i, t) / n,
          d = Math.min(d, o) / a,
          d =
            "scale(" +
            (d = Math.min(i, d)) +
            ") translate3d(" +
            ((t - n) / 2 - m + v.margin + e.left) / d +
            "px, " +
            ((o - a) / 2 - r + v.margin + e.top) / d +
            "px, 0)";
        (z.zoomed.style.transform = d),
          z.zoomedHd && (z.zoomedHd.style.transform = d);
      }
      var s = (0 < arguments.length && void 0 !== e ? e : {}).target;
      return new i(function (e) {
        if (s && -1 === f.indexOf(s)) e(b);
        else {
          function t() {
            (g = !1),
              z.zoomed.removeEventListener("transitionend", t),
              z.original.dispatchEvent(
                w("medium-zoom:opened", { detail: { zoom: b } })
              ),
              e(b);
          }
          var o, n, i, d, r, m, a, c, l;
          if (z.zoomed) e(b);
          else {
            if (s) z.original = s;
            else {
              if (!(0 < f.length)) return void e(b);
              z.original = f[0];
            }
            z.original.dispatchEvent(
              w("medium-zoom:open", { detail: { zoom: b } })
            ),
              (h =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0),
              (g = !0),
              (z.zoomed =
                ((o = z.original),
                (n = o.getBoundingClientRect()),
                (i = n.top),
                (d = n.left),
                (r = n.width),
                (m = n.height),
                (a = o.cloneNode()),
                (n =
                  window.pageYOffset ||
                  document.documentElement.scrollTop ||
                  document.body.scrollTop ||
                  0),
                (o =
                  window.pageXOffset ||
                  document.documentElement.scrollLeft ||
                  document.body.scrollLeft ||
                  0),
                a.removeAttribute("id"),
                (a.style.position = "absolute"),
                (a.style.top = i + n + "px"),
                (a.style.left = d + o + "px"),
                (a.style.width = r + "px"),
                (a.style.height = m + "px"),
                (a.style.transform = ""),
                a)),
              document.body.appendChild(y),
              v.template &&
                ((a = E(v.template)
                  ? v.template
                  : document.querySelector(v.template)),
                (z.template = document.createElement("div")),
                z.template.appendChild(a.content.cloneNode(!0)),
                document.body.appendChild(z.template)),
              document.body.appendChild(z.zoomed),
              window.requestAnimationFrame(function () {
                document.body.classList.add("medium-zoom--opened");
              }),
              z.original.classList.add("medium-zoom-image--hidden"),
              z.zoomed.classList.add("medium-zoom-image--opened"),
              z.zoomed.addEventListener("click", p),
              z.zoomed.addEventListener("transitionend", t),
              z.original.getAttribute("data-zoom-src")
                ? ((z.zoomedHd = z.zoomed.cloneNode()),
                  z.zoomedHd.removeAttribute("srcset"),
                  z.zoomedHd.removeAttribute("sizes"),
                  (z.zoomedHd.src = z.zoomed.getAttribute("data-zoom-src")),
                  (z.zoomedHd.onerror = function () {
                    clearInterval(c),
                      console.warn(
                        "Unable to reach the zoom image target " +
                          z.zoomedHd.src
                      ),
                      (z.zoomedHd = null),
                      u();
                  }),
                  (c = setInterval(function () {
                    z.zoomedHd.complete &&
                      (clearInterval(c),
                      z.zoomedHd.classList.add("medium-zoom-image--opened"),
                      z.zoomedHd.addEventListener("click", p),
                      document.body.appendChild(z.zoomedHd),
                      u());
                  }, 10)))
                : z.original.hasAttribute("srcset")
                ? ((z.zoomedHd = z.zoomed.cloneNode()),
                  z.zoomedHd.removeAttribute("sizes"),
                  z.zoomedHd.removeAttribute("loading"),
                  (l = z.zoomedHd.addEventListener("load", function () {
                    z.zoomedHd.removeEventListener("load", l),
                      z.zoomedHd.classList.add("medium-zoom-image--opened"),
                      z.zoomedHd.addEventListener("click", p),
                      document.body.appendChild(z.zoomedHd),
                      u();
                  })))
                : u();
          }
        }
      });
    }
    var n = 1 < arguments.length && void 0 !== t ? t : {},
      i =
        window.Promise ||
        function (e) {
          function t() {}
          e(t, t);
        },
      t = function () {
        for (
          var e = arguments, t = arguments.length, o = Array(t), n = 0;
          n < t;
          n++
        )
          o[n] = e[n];
        var i = o.reduce(function (e, t) {
          return [].concat(e, m(t));
        }, []);
        return (
          i
            .filter(function (e) {
              return -1 === f.indexOf(e);
            })
            .forEach(function (e) {
              f.push(e), e.classList.add("medium-zoom-image");
            }),
          r.forEach(function (e) {
            var t = e.type,
              o = e.listener,
              n = e.options;
            i.forEach(function (e) {
              e.addEventListener(t, o, n);
            });
          }),
          b
        );
      },
      p = function () {
        return new i(function (t) {
          var e;
          !g && z.original
            ? ((e = function e() {
                z.original.classList.remove("medium-zoom-image--hidden"),
                  document.body.removeChild(z.zoomed),
                  z.zoomedHd && document.body.removeChild(z.zoomedHd),
                  document.body.removeChild(y),
                  z.zoomed.classList.remove("medium-zoom-image--opened"),
                  z.template && document.body.removeChild(z.template),
                  (g = !1),
                  z.zoomed.removeEventListener("transitionend", e),
                  z.original.dispatchEvent(
                    w("medium-zoom:closed", { detail: { zoom: b } })
                  ),
                  (z.original = null),
                  (z.zoomed = null),
                  (z.zoomedHd = null),
                  (z.template = null),
                  t(b);
              }),
              (g = !0),
              document.body.classList.remove("medium-zoom--opened"),
              (z.zoomed.style.transform = ""),
              z.zoomedHd && (z.zoomedHd.style.transform = ""),
              z.template &&
                ((z.template.style.transition = "opacity 150ms"),
                (z.template.style.opacity = 0)),
              z.original.dispatchEvent(
                w("medium-zoom:close", { detail: { zoom: b } })
              ),
              z.zoomed.addEventListener("transitionend", e))
            : t(b);
        });
      },
      d = function (e) {
        e = (0 < arguments.length && void 0 !== e ? e : {}).target;
        return z.original ? p() : o({ target: e });
      },
      f = [],
      r = [],
      g = !1,
      h = 0,
      v = n,
      z = { original: null, zoomed: null, zoomedHd: null, template: null };
    "[object Object]" === Object.prototype.toString.call(e)
      ? (v = e)
      : (!e && "string" != typeof e) || t(e),
      (v = l(
        {
          margin: 0,
          background: "#fff",
          scrollOffset: 40,
          container: null,
          template: null,
        },
        v
      ));
    var y =
      ((n = v.background),
      (e = document.createElement("div")).classList.add("medium-zoom-overlay"),
      (e.style.background = n),
      e);
    document.addEventListener("click", function (e) {
      e = e.target;
      e !== y ? -1 !== f.indexOf(e) && d({ target: e }) : p();
    }),
      document.addEventListener("keyup", function (e) {
        e = e.key || e.keyCode;
        ("Escape" !== e && "Esc" !== e && 27 !== e) || p();
      }),
      document.addEventListener("scroll", function () {
        var e;
        !g &&
          z.original &&
          ((e =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0),
          Math.abs(h - e) > v.scrollOffset && setTimeout(p, 150));
      }),
      window.addEventListener("resize", p);
    var b = {
      open: o,
      close: p,
      toggle: d,
      update: function (e) {
        var t = 0 < arguments.length && void 0 !== e ? e : {},
          e = t;
        return (
          t.background && (y.style.background = t.background),
          t.container &&
            t.container instanceof Object &&
            (e.container = l({}, v.container, t.container)),
          t.template &&
            ((t = E(t.template)
              ? t.template
              : document.querySelector(t.template)),
            (e.template = t)),
          (v = l({}, v, e)),
          f.forEach(function (e) {
            e.dispatchEvent(w("medium-zoom:update", { detail: { zoom: b } }));
          }),
          b
        );
      },
      clone: function (e) {
        return a(l({}, v, 0 < arguments.length && void 0 !== e ? e : {}));
      },
      attach: t,
      detach: function () {
        for (
          var e = arguments, t = arguments.length, o = Array(t), n = 0;
          n < t;
          n++
        )
          o[n] = e[n];
        z.zoomed && p();
        var i =
          0 < o.length
            ? o.reduce(function (e, t) {
                return [].concat(e, m(t));
              }, [])
            : f;
        return (
          i.forEach(function (e) {
            e.classList.remove("medium-zoom-image"),
              e.dispatchEvent(w("medium-zoom:detach", { detail: { zoom: b } }));
          }),
          (f = f.filter(function (e) {
            return -1 === i.indexOf(e);
          })),
          b
        );
      },
      on: function (t, o, e) {
        var n = 2 < arguments.length && void 0 !== e ? e : {};
        return (
          f.forEach(function (e) {
            e.addEventListener("medium-zoom:" + t, o, n);
          }),
          r.push({ type: "medium-zoom:" + t, listener: o, options: n }),
          b
        );
      },
      off: function (t, o, e) {
        var n = 2 < arguments.length && void 0 !== e ? e : {};
        return (
          f.forEach(function (e) {
            e.removeEventListener("medium-zoom:" + t, o, n);
          }),
          (r = r.filter(function (e) {
            return !(
              e.type === "medium-zoom:" + t &&
              e.listener.toString() === o.toString()
            );
          })),
          b
        );
      },
      getOptions: function () {
        return v;
      },
      getImages: function () {
        return f;
      },
      getZoomedImage: function () {
        return z.original;
      },
    };
    return b;
  }
  var l =
    Object.assign ||
    function (e) {
      for (var t = arguments, o = 1; o < arguments.length; o++) {
        var n,
          i = t[o];
        for (n in i)
          Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
      }
      return e;
    };
  !(function (e, t) {
    void 0 === t && (t = {});
    var o,
      n = t.insertAt;
    e &&
      "undefined" != typeof document &&
      ((o = document.head || document.getElementsByTagName("head")[0]),
      ((t = document.createElement("style")).type = "text/css"),
      "top" === n && o.firstChild
        ? o.insertBefore(t, o.firstChild)
        : o.appendChild(t),
      t.styleSheet
        ? (t.styleSheet.cssText = e)
        : t.appendChild(document.createTextNode(e)));
  })(
    ".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}"
  );
  var n =
    Element.prototype.matches ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.msMatchesSelector;
  $docsify.plugins = [].concat(function (e) {
    var o;
    e.doneEach(function (e) {
      var t = (t = Array.apply(
        null,
        document.querySelectorAll(
          ".markdown-section img:not(.emoji):not([data-no-zoom])"
        )
      )).filter(function (e) {
        return !1 === n.call(e, "a img");
      });
      o && o.detach(), (o = a(t));
    });
  }, $docsify.plugins);
})();
