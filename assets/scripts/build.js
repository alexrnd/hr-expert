"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*

 arcticModal — jQuery plugin
 Version: 0.3
 Author: Sergey Predvoditelev (sergey.predvoditelev@gmail.com)
 Company: Arctic Laboratory (http://arcticlab.ru/)

 Docs & Examples: http://arcticlab.ru/arcticmodal/

 */
(function (d) {
  var g = { type: "html", content: "", url: "", ajax: {}, ajax_request: null, closeOnEsc: !0, closeOnOverlayClick: !0, clone: !1, overlay: { block: void 0, tpl: '<div class="arcticmodal-overlay"></div>', css: { backgroundColor: "#000", opacity: 0.6 } }, container: { block: void 0, tpl: '<div class="arcticmodal-container"><table class="arcticmodal-container_i"><tr><td class="arcticmodal-container_i2"></td></tr></table></div>' }, wrap: void 0, body: void 0, errors: { tpl: '<div class="arcticmodal-error arcticmodal-close"></div>', autoclose_delay: 2E3,
      ajax_unsuccessful_load: "Error" }, openEffect: { type: "fade", speed: 400 }, closeEffect: { type: "fade", speed: 400 }, beforeOpen: d.noop, afterOpen: d.noop, beforeClose: d.noop, afterClose: d.noop, afterLoading: d.noop, afterLoadingOnShow: d.noop, errorLoading: d.noop },
      j = 0,
      e = d([]),
      m = { isEventOut: function isEventOut(a, b) {
      var c = !0;d(a).each(function () {
        d(b.target).get(0) == d(this).get(0) && (c = !1);0 == d(b.target).closest("HTML", d(this).get(0)).length && (c = !1);
      });return c;
    } },
      f = { getParentEl: function getParentEl(a) {
      var b = d(a);return b.data("arcticmodal") ? b : (b = d(a).closest(".arcticmodal-container").data("arcticmodalParentEl")) ? b : !1;
    }, transition: function transition(a, b, c, e) {
      e = void 0 == e ? d.noop : e;switch (c.type) {case "fade":
          "show" == b ? a.fadeIn(c.speed, e) : a.fadeOut(c.speed, e);break;case "none":
          "show" == b ? a.show() : a.hide(), e();}
    }, prepare_body: function prepare_body(a, b) {
      d(".arcticmodal-close", a.body).unbind("click.arcticmodal").bind("click.arcticmodal", function () {
        b.arcticmodal("close");return !1;
      });
    }, init_el: function init_el(a, b) {
      var c = a.data("arcticmodal");if (!c) {
        c = b;j++;c.modalID = j;c.overlay.block = d(c.overlay.tpl);c.overlay.block.css(c.overlay.css);c.container.block = d(c.container.tpl);c.body = d(".arcticmodal-container_i2", c.container.block);b.clone ? c.body.html(a.clone(!0)) : (a.before('<div id="arcticmodalReserve' + c.modalID + '" style="display: none" />'), c.body.html(a));f.prepare_body(c, a);c.closeOnOverlayClick && c.overlay.block.add(c.container.block).click(function (b) {
          m.isEventOut(d(">*", c.body), b) && a.arcticmodal("close");
        });c.container.block.data("arcticmodalParentEl", a);a.data("arcticmodal", c);
        e = d.merge(e, a);d.proxy(h.show, a)();if ("html" == c.type) return a;if (void 0 != c.ajax.beforeSend) {
          var k = c.ajax.beforeSend;delete c.ajax.beforeSend;
        }if (void 0 != c.ajax.success) {
          var g = c.ajax.success;delete c.ajax.success;
        }if (void 0 != c.ajax.error) {
          var l = c.ajax.error;delete c.ajax.error;
        }var n = d.extend(!0, { url: c.url, beforeSend: function beforeSend() {
            void 0 == k ? c.body.html('<div class="arcticmodal-loading" />') : k(c, a);
          }, success: function success(b) {
            a.trigger("afterLoading");c.afterLoading(c, a, b);void 0 == g ? c.body.html(b) : g(c, a, b);f.prepare_body(c, a);a.trigger("afterLoadingOnShow");c.afterLoadingOnShow(c, a, b);
          }, error: function error() {
            a.trigger("errorLoading");c.errorLoading(c, a);void 0 == l ? (c.body.html(c.errors.tpl), d(".arcticmodal-error", c.body).html(c.errors.ajax_unsuccessful_load), d(".arcticmodal-close", c.body).click(function () {
              a.arcticmodal("close");return !1;
            }), c.errors.autoclose_delay && setTimeout(function () {
              a.arcticmodal("close");
            }, c.errors.autoclose_delay)) : l(c, a);
          } }, c.ajax);c.ajax_request = d.ajax(n);a.data("arcticmodal", c);
      }
    }, init: function init(a) {
      a = d.extend(!0, {}, g, a);if (d.isFunction(this)) {
        if (void 0 == a) d.error("jquery.arcticmodal: Uncorrect parameters");else if ("" == a.type) d.error('jquery.arcticmodal: Don\'t set parameter "type"');else switch (a.type) {case "html":
            if ("" == a.content) {
              d.error('jquery.arcticmodal: Don\'t set parameter "content"');break;
            }var b = a.content;a.content = "";return f.init_el(d(b), a);case "ajax":
            if ("" == a.url) {
              d.error('jquery.arcticmodal: Don\'t set parameter "url"');break;
            }return f.init_el(d("<div />"), a);}
      } else return this.each(function () {
        f.init_el(d(this), d.extend(!0, {}, a));
      });
    } },
      h = { show: function show() {
      var a = f.getParentEl(this);if (!1 === a) d.error("jquery.arcticmodal: Uncorrect call");else {
        var b = a.data("arcticmodal");b.overlay.block.hide();b.container.block.hide();d("BODY").append(b.overlay.block);d("BODY").append(b.container.block);b.beforeOpen(b, a);a.trigger("beforeOpen");if ("hidden" != b.wrap.css("overflow")) {
          b.wrap.data("arcticmodalOverflow", b.wrap.css("overflow"));var c = b.wrap.outerWidth(!0);b.wrap.css("overflow", "hidden");var g = b.wrap.outerWidth(!0);g != c && b.wrap.css("marginRight", g - c + "px");
        }e.not(a).each(function () {
          d(this).data("arcticmodal").overlay.block.hide();
        });f.transition(b.overlay.block, "show", 1 < e.length ? { type: "none" } : b.openEffect);f.transition(b.container.block, "show", 1 < e.length ? { type: "none" } : b.openEffect, function () {
          b.afterOpen(b, a);a.trigger("afterOpen");
        });return a;
      }
    }, close: function close() {
      if (d.isFunction(this)) e.each(function () {
        d(this).arcticmodal("close");
      });else return this.each(function () {
        var a = f.getParentEl(this);if (!1 === a) d.error("jquery.arcticmodal: Uncorrect call");else {
          var b = a.data("arcticmodal");!1 !== b.beforeClose(b, a) && (a.trigger("beforeClose"), e.not(a).last().each(function () {
            d(this).data("arcticmodal").overlay.block.show();
          }), f.transition(b.overlay.block, "hide", 1 < e.length ? { type: "none" } : b.closeEffect), f.transition(b.container.block, "hide", 1 < e.length ? { type: "none" } : b.closeEffect, function () {
            b.afterClose(b, a);a.trigger("afterClose");b.clone || d("#arcticmodalReserve" + b.modalID).replaceWith(b.body.find(">*"));b.overlay.block.remove();b.container.block.remove();a.data("arcticmodal", null);d(".arcticmodal-container").length || (b.wrap.data("arcticmodalOverflow") && b.wrap.css("overflow", b.wrap.data("arcticmodalOverflow")), b.wrap.css("marginRight", 0));
          }), "ajax" == b.type && b.ajax_request.abort(), e = e.not(a));
        }
      });
    }, setDefault: function setDefault(a) {
      d.extend(!0, g, a);
    } };d(function () {
    g.wrap = d(document.all && !document.querySelector ? "html" : "body");
  });d(document).bind("keyup.arcticmodal", function (a) {
    var b = e.last();b.length && b.data("arcticmodal").closeOnEsc && 27 === a.keyCode && b.arcticmodal("close");
  });d.arcticmodal = d.fn.arcticmodal = function (a) {
    if (h[a]) return h[a].apply(this, Array.prototype.slice.call(arguments, 1));if ("object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) || !a) return f.init.apply(this, arguments);d.error("jquery.arcticmodal: Method " + a + " does not exist");
  };
})(jQuery);
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * jQuery FlexSlider v2.6.3
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */!function ($) {
  var e = !0;$.flexslider = function (t, a) {
    var n = $(t);n.vars = $.extend({}, $.flexslider.defaults, a);var i = n.vars.namespace,
        s = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
        r = ("ontouchstart" in window || s || window.DocumentTouch && document instanceof DocumentTouch) && n.vars.touch,
        o = "click touchend MSPointerUp keyup",
        l = "",
        c,
        d = "vertical" === n.vars.direction,
        u = n.vars.reverse,
        v = n.vars.itemWidth > 0,
        p = "fade" === n.vars.animation,
        m = "" !== n.vars.asNavFor,
        f = {};$.data(t, "flexslider", n), f = { init: function init() {
        n.animating = !1, n.currentSlide = parseInt(n.vars.startAt ? n.vars.startAt : 0, 10), isNaN(n.currentSlide) && (n.currentSlide = 0), n.animatingTo = n.currentSlide, n.atEnd = 0 === n.currentSlide || n.currentSlide === n.last, n.containerSelector = n.vars.selector.substr(0, n.vars.selector.search(" ")), n.slides = $(n.vars.selector, n), n.container = $(n.containerSelector, n), n.count = n.slides.length, n.syncExists = $(n.vars.sync).length > 0, "slide" === n.vars.animation && (n.vars.animation = "swing"), n.prop = d ? "top" : "marginLeft", n.args = {}, n.manualPause = !1, n.stopped = !1, n.started = !1, n.startTimeout = null, n.transitions = !n.vars.video && !p && n.vars.useCSS && function () {
          var e = document.createElement("div"),
              t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];for (var a in t) {
            if (void 0 !== e.style[t[a]]) return n.pfx = t[a].replace("Perspective", "").toLowerCase(), n.prop = "-" + n.pfx + "-transform", !0;
          }return !1;
        }(), n.ensureAnimationEnd = "", "" !== n.vars.controlsContainer && (n.controlsContainer = $(n.vars.controlsContainer).length > 0 && $(n.vars.controlsContainer)), "" !== n.vars.manualControls && (n.manualControls = $(n.vars.manualControls).length > 0 && $(n.vars.manualControls)), "" !== n.vars.customDirectionNav && (n.customDirectionNav = 2 === $(n.vars.customDirectionNav).length && $(n.vars.customDirectionNav)), n.vars.randomize && (n.slides.sort(function () {
          return Math.round(Math.random()) - .5;
        }), n.container.empty().append(n.slides)), n.doMath(), n.setup("init"), n.vars.controlNav && f.controlNav.setup(), n.vars.directionNav && f.directionNav.setup(), n.vars.keyboard && (1 === $(n.containerSelector).length || n.vars.multipleKeyboard) && $(document).bind("keyup", function (e) {
          var t = e.keyCode;if (!n.animating && (39 === t || 37 === t)) {
            var a = 39 === t ? n.getTarget("next") : 37 === t ? n.getTarget("prev") : !1;n.flexAnimate(a, n.vars.pauseOnAction);
          }
        }), n.vars.mousewheel && n.bind("mousewheel", function (e, t, a, i) {
          e.preventDefault();var s = 0 > t ? n.getTarget("next") : n.getTarget("prev");n.flexAnimate(s, n.vars.pauseOnAction);
        }), n.vars.pausePlay && f.pausePlay.setup(), n.vars.slideshow && n.vars.pauseInvisible && f.pauseInvisible.init(), n.vars.slideshow && (n.vars.pauseOnHover && n.hover(function () {
          n.manualPlay || n.manualPause || n.pause();
        }, function () {
          n.manualPause || n.manualPlay || n.stopped || n.play();
        }), n.vars.pauseInvisible && f.pauseInvisible.isHidden() || (n.vars.initDelay > 0 ? n.startTimeout = setTimeout(n.play, n.vars.initDelay) : n.play())), m && f.asNav.setup(), r && n.vars.touch && f.touch(), (!p || p && n.vars.smoothHeight) && $(window).bind("resize orientationchange focus", f.resize), n.find("img").attr("draggable", "false"), setTimeout(function () {
          n.vars.start(n);
        }, 200);
      }, asNav: { setup: function setup() {
          n.asNav = !0, n.animatingTo = Math.floor(n.currentSlide / n.move), n.currentItem = n.currentSlide, n.slides.removeClass(i + "active-slide").eq(n.currentItem).addClass(i + "active-slide"), s ? (t._slider = n, n.slides.each(function () {
            var e = this;e._gesture = new MSGesture(), e._gesture.target = e, e.addEventListener("MSPointerDown", function (e) {
              e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId);
            }, !1), e.addEventListener("MSGestureTap", function (e) {
              e.preventDefault();var t = $(this),
                  a = t.index();$(n.vars.asNavFor).data("flexslider").animating || t.hasClass("active") || (n.direction = n.currentItem < a ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0));
            });
          })) : n.slides.on(o, function (e) {
            e.preventDefault();var t = $(this),
                a = t.index(),
                s = t.offset().left - $(n).scrollLeft();0 >= s && t.hasClass(i + "active-slide") ? n.flexAnimate(n.getTarget("prev"), !0) : $(n.vars.asNavFor).data("flexslider").animating || t.hasClass(i + "active-slide") || (n.direction = n.currentItem < a ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0));
          });
        } }, controlNav: { setup: function setup() {
          n.manualControls ? f.controlNav.setupManual() : f.controlNav.setupPaging();
        }, setupPaging: function setupPaging() {
          var e = "thumbnails" === n.vars.controlNav ? "control-thumbs" : "control-paging",
              t = 1,
              a,
              s;if (n.controlNavScaffold = $('<ol class="' + i + "control-nav " + i + e + '"></ol>'), n.pagingCount > 1) for (var r = 0; r < n.pagingCount; r++) {
            s = n.slides.eq(r), void 0 === s.attr("data-thumb-alt") && s.attr("data-thumb-alt", "");var c = "" !== s.attr("data-thumb-alt") ? c = ' alt="' + s.attr("data-thumb-alt") + '"' : "";if (a = "thumbnails" === n.vars.controlNav ? '<img src="' + s.attr("data-thumb") + '"' + c + "/>" : '<a href="#">' + t + "</a>", "thumbnails" === n.vars.controlNav && !0 === n.vars.thumbCaptions) {
              var d = s.attr("data-thumbcaption");"" !== d && void 0 !== d && (a += '<span class="' + i + 'caption">' + d + "</span>");
            }n.controlNavScaffold.append("<li>" + a + "</li>"), t++;
          }n.controlsContainer ? $(n.controlsContainer).append(n.controlNavScaffold) : n.append(n.controlNavScaffold), f.controlNav.set(), f.controlNav.active(), n.controlNavScaffold.delegate("a, img", o, function (e) {
            if (e.preventDefault(), "" === l || l === e.type) {
              var t = $(this),
                  a = n.controlNav.index(t);t.hasClass(i + "active") || (n.direction = a > n.currentSlide ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction));
            }"" === l && (l = e.type), f.setToClearWatchedEvent();
          });
        }, setupManual: function setupManual() {
          n.controlNav = n.manualControls, f.controlNav.active(), n.controlNav.bind(o, function (e) {
            if (e.preventDefault(), "" === l || l === e.type) {
              var t = $(this),
                  a = n.controlNav.index(t);t.hasClass(i + "active") || (a > n.currentSlide ? n.direction = "next" : n.direction = "prev", n.flexAnimate(a, n.vars.pauseOnAction));
            }"" === l && (l = e.type), f.setToClearWatchedEvent();
          });
        }, set: function set() {
          var e = "thumbnails" === n.vars.controlNav ? "img" : "a";n.controlNav = $("." + i + "control-nav li " + e, n.controlsContainer ? n.controlsContainer : n);
        }, active: function active() {
          n.controlNav.removeClass(i + "active").eq(n.animatingTo).addClass(i + "active");
        }, update: function update(e, t) {
          n.pagingCount > 1 && "add" === e ? n.controlNavScaffold.append($('<li><a href="#">' + n.count + "</a></li>")) : 1 === n.pagingCount ? n.controlNavScaffold.find("li").remove() : n.controlNav.eq(t).closest("li").remove(), f.controlNav.set(), n.pagingCount > 1 && n.pagingCount !== n.controlNav.length ? n.update(t, e) : f.controlNav.active();
        } }, directionNav: { setup: function setup() {
          var e = $('<ul class="' + i + 'direction-nav"><li class="' + i + 'nav-prev"><a class="' + i + 'prev" href="#">' + n.vars.prevText + '</a></li><li class="' + i + 'nav-next"><a class="' + i + 'next" href="#">' + n.vars.nextText + "</a></li></ul>");n.customDirectionNav ? n.directionNav = n.customDirectionNav : n.controlsContainer ? ($(n.controlsContainer).append(e), n.directionNav = $("." + i + "direction-nav li a", n.controlsContainer)) : (n.append(e), n.directionNav = $("." + i + "direction-nav li a", n)), f.directionNav.update(), n.directionNav.bind(o, function (e) {
            e.preventDefault();var t;"" !== l && l !== e.type || (t = $(this).hasClass(i + "next") ? n.getTarget("next") : n.getTarget("prev"), n.flexAnimate(t, n.vars.pauseOnAction)), "" === l && (l = e.type), f.setToClearWatchedEvent();
          });
        }, update: function update() {
          var e = i + "disabled";1 === n.pagingCount ? n.directionNav.addClass(e).attr("tabindex", "-1") : n.vars.animationLoop ? n.directionNav.removeClass(e).removeAttr("tabindex") : 0 === n.animatingTo ? n.directionNav.removeClass(e).filter("." + i + "prev").addClass(e).attr("tabindex", "-1") : n.animatingTo === n.last ? n.directionNav.removeClass(e).filter("." + i + "next").addClass(e).attr("tabindex", "-1") : n.directionNav.removeClass(e).removeAttr("tabindex");
        } }, pausePlay: { setup: function setup() {
          var e = $('<div class="' + i + 'pauseplay"><a href="#"></a></div>');n.controlsContainer ? (n.controlsContainer.append(e), n.pausePlay = $("." + i + "pauseplay a", n.controlsContainer)) : (n.append(e), n.pausePlay = $("." + i + "pauseplay a", n)), f.pausePlay.update(n.vars.slideshow ? i + "pause" : i + "play"), n.pausePlay.bind(o, function (e) {
            e.preventDefault(), "" !== l && l !== e.type || ($(this).hasClass(i + "pause") ? (n.manualPause = !0, n.manualPlay = !1, n.pause()) : (n.manualPause = !1, n.manualPlay = !0, n.play())), "" === l && (l = e.type), f.setToClearWatchedEvent();
          });
        }, update: function update(e) {
          "play" === e ? n.pausePlay.removeClass(i + "pause").addClass(i + "play").html(n.vars.playText) : n.pausePlay.removeClass(i + "play").addClass(i + "pause").html(n.vars.pauseText);
        } }, touch: function touch() {
        function e(e) {
          e.stopPropagation(), n.animating ? e.preventDefault() : (n.pause(), t._gesture.addPointer(e.pointerId), T = 0, c = d ? n.h : n.w, f = Number(new Date()), l = v && u && n.animatingTo === n.last ? 0 : v && u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : v && n.currentSlide === n.last ? n.limit : v ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : u ? (n.last - n.currentSlide + n.cloneOffset) * c : (n.currentSlide + n.cloneOffset) * c);
        }function a(e) {
          e.stopPropagation();var a = e.target._slider;if (a) {
            var n = -e.translationX,
                i = -e.translationY;return T += d ? i : n, m = T, y = d ? Math.abs(T) < Math.abs(-n) : Math.abs(T) < Math.abs(-i), e.detail === e.MSGESTURE_FLAG_INERTIA ? void setImmediate(function () {
              t._gesture.stop();
            }) : void ((!y || Number(new Date()) - f > 500) && (e.preventDefault(), !p && a.transitions && (a.vars.animationLoop || (m = T / (0 === a.currentSlide && 0 > T || a.currentSlide === a.last && T > 0 ? Math.abs(T) / c + 2 : 1)), a.setProps(l + m, "setTouch"))));
          }
        }function i(e) {
          e.stopPropagation();var t = e.target._slider;if (t) {
            if (t.animatingTo === t.currentSlide && !y && null !== m) {
              var a = u ? -m : m,
                  n = a > 0 ? t.getTarget("next") : t.getTarget("prev");t.canAdvance(n) && (Number(new Date()) - f < 550 && Math.abs(a) > 50 || Math.abs(a) > c / 2) ? t.flexAnimate(n, t.vars.pauseOnAction) : p || t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0);
            }r = null, o = null, m = null, l = null, T = 0;
          }
        }var r,
            o,
            l,
            c,
            m,
            f,
            g,
            h,
            _S,
            y = !1,
            x = 0,
            b = 0,
            T = 0;s ? (t.style.msTouchAction = "none", t._gesture = new MSGesture(), t._gesture.target = t, t.addEventListener("MSPointerDown", e, !1), t._slider = n, t.addEventListener("MSGestureChange", a, !1), t.addEventListener("MSGestureEnd", i, !1)) : (g = function g(e) {
          n.animating ? e.preventDefault() : (window.navigator.msPointerEnabled || 1 === e.touches.length) && (n.pause(), c = d ? n.h : n.w, f = Number(new Date()), x = e.touches[0].pageX, b = e.touches[0].pageY, l = v && u && n.animatingTo === n.last ? 0 : v && u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : v && n.currentSlide === n.last ? n.limit : v ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : u ? (n.last - n.currentSlide + n.cloneOffset) * c : (n.currentSlide + n.cloneOffset) * c, r = d ? b : x, o = d ? x : b, t.addEventListener("touchmove", h, !1), t.addEventListener("touchend", _S, !1));
        }, h = function h(e) {
          x = e.touches[0].pageX, b = e.touches[0].pageY, m = d ? r - b : r - x, y = d ? Math.abs(m) < Math.abs(x - o) : Math.abs(m) < Math.abs(b - o);var t = 500;(!y || Number(new Date()) - f > t) && (e.preventDefault(), !p && n.transitions && (n.vars.animationLoop || (m /= 0 === n.currentSlide && 0 > m || n.currentSlide === n.last && m > 0 ? Math.abs(m) / c + 2 : 1), n.setProps(l + m, "setTouch")));
        }, _S = function S(e) {
          if (t.removeEventListener("touchmove", h, !1), n.animatingTo === n.currentSlide && !y && null !== m) {
            var a = u ? -m : m,
                i = a > 0 ? n.getTarget("next") : n.getTarget("prev");n.canAdvance(i) && (Number(new Date()) - f < 550 && Math.abs(a) > 50 || Math.abs(a) > c / 2) ? n.flexAnimate(i, n.vars.pauseOnAction) : p || n.flexAnimate(n.currentSlide, n.vars.pauseOnAction, !0);
          }t.removeEventListener("touchend", _S, !1), r = null, o = null, m = null, l = null;
        }, t.addEventListener("touchstart", g, !1));
      }, resize: function resize() {
        !n.animating && n.is(":visible") && (v || n.doMath(), p ? f.smoothHeight() : v ? (n.slides.width(n.computedW), n.update(n.pagingCount), n.setProps()) : d ? (n.viewport.height(n.h), n.setProps(n.h, "setTotal")) : (n.vars.smoothHeight && f.smoothHeight(), n.newSlides.width(n.computedW), n.setProps(n.computedW, "setTotal")));
      }, smoothHeight: function smoothHeight(e) {
        if (!d || p) {
          var t = p ? n : n.viewport;e ? t.animate({ height: n.slides.eq(n.animatingTo).innerHeight() }, e) : t.innerHeight(n.slides.eq(n.animatingTo).innerHeight());
        }
      }, sync: function sync(e) {
        var t = $(n.vars.sync).data("flexslider"),
            a = n.animatingTo;switch (e) {case "animate":
            t.flexAnimate(a, n.vars.pauseOnAction, !1, !0);break;case "play":
            t.playing || t.asNav || t.play();break;case "pause":
            t.pause();}
      }, uniqueID: function uniqueID(e) {
        return e.filter("[id]").add(e.find("[id]")).each(function () {
          var e = $(this);e.attr("id", e.attr("id") + "_clone");
        }), e;
      }, pauseInvisible: { visProp: null, init: function init() {
          var e = f.pauseInvisible.getHiddenProp();if (e) {
            var t = e.replace(/[H|h]idden/, "") + "visibilitychange";document.addEventListener(t, function () {
              f.pauseInvisible.isHidden() ? n.startTimeout ? clearTimeout(n.startTimeout) : n.pause() : n.started ? n.play() : n.vars.initDelay > 0 ? setTimeout(n.play, n.vars.initDelay) : n.play();
            });
          }
        }, isHidden: function isHidden() {
          var e = f.pauseInvisible.getHiddenProp();return e ? document[e] : !1;
        }, getHiddenProp: function getHiddenProp() {
          var e = ["webkit", "moz", "ms", "o"];if ("hidden" in document) return "hidden";for (var t = 0; t < e.length; t++) {
            if (e[t] + "Hidden" in document) return e[t] + "Hidden";
          }return null;
        } }, setToClearWatchedEvent: function setToClearWatchedEvent() {
        clearTimeout(c), c = setTimeout(function () {
          l = "";
        }, 3e3);
      } }, n.flexAnimate = function (e, t, a, s, o) {
      if (n.vars.animationLoop || e === n.currentSlide || (n.direction = e > n.currentSlide ? "next" : "prev"), m && 1 === n.pagingCount && (n.direction = n.currentItem < e ? "next" : "prev"), !n.animating && (n.canAdvance(e, o) || a) && n.is(":visible")) {
        if (m && s) {
          var l = $(n.vars.asNavFor).data("flexslider");if (n.atEnd = 0 === e || e === n.count - 1, l.flexAnimate(e, !0, !1, !0, o), n.direction = n.currentItem < e ? "next" : "prev", l.direction = n.direction, Math.ceil((e + 1) / n.visible) - 1 === n.currentSlide || 0 === e) return n.currentItem = e, n.slides.removeClass(i + "active-slide").eq(e).addClass(i + "active-slide"), !1;n.currentItem = e, n.slides.removeClass(i + "active-slide").eq(e).addClass(i + "active-slide"), e = Math.floor(e / n.visible);
        }if (n.animating = !0, n.animatingTo = e, t && n.pause(), n.vars.before(n), n.syncExists && !o && f.sync("animate"), n.vars.controlNav && f.controlNav.active(), v || n.slides.removeClass(i + "active-slide").eq(e).addClass(i + "active-slide"), n.atEnd = 0 === e || e === n.last, n.vars.directionNav && f.directionNav.update(), e === n.last && (n.vars.end(n), n.vars.animationLoop || n.pause()), p) r ? (n.slides.eq(n.currentSlide).css({ opacity: 0, zIndex: 1 }), n.slides.eq(e).css({ opacity: 1, zIndex: 2 }), n.wrapup(c)) : (n.slides.eq(n.currentSlide).css({ zIndex: 1 }).animate({ opacity: 0 }, n.vars.animationSpeed, n.vars.easing), n.slides.eq(e).css({ zIndex: 2 }).animate({ opacity: 1 }, n.vars.animationSpeed, n.vars.easing, n.wrapup));else {
          var c = d ? n.slides.filter(":first").height() : n.computedW,
              g,
              h,
              S;v ? (g = n.vars.itemMargin, S = (n.itemW + g) * n.move * n.animatingTo, h = S > n.limit && 1 !== n.visible ? n.limit : S) : h = 0 === n.currentSlide && e === n.count - 1 && n.vars.animationLoop && "next" !== n.direction ? u ? (n.count + n.cloneOffset) * c : 0 : n.currentSlide === n.last && 0 === e && n.vars.animationLoop && "prev" !== n.direction ? u ? 0 : (n.count + 1) * c : u ? (n.count - 1 - e + n.cloneOffset) * c : (e + n.cloneOffset) * c, n.setProps(h, "", n.vars.animationSpeed), n.transitions ? (n.vars.animationLoop && n.atEnd || (n.animating = !1, n.currentSlide = n.animatingTo), n.container.unbind("webkitTransitionEnd transitionend"), n.container.bind("webkitTransitionEnd transitionend", function () {
            clearTimeout(n.ensureAnimationEnd), n.wrapup(c);
          }), clearTimeout(n.ensureAnimationEnd), n.ensureAnimationEnd = setTimeout(function () {
            n.wrapup(c);
          }, n.vars.animationSpeed + 100)) : n.container.animate(n.args, n.vars.animationSpeed, n.vars.easing, function () {
            n.wrapup(c);
          });
        }n.vars.smoothHeight && f.smoothHeight(n.vars.animationSpeed);
      }
    }, n.wrapup = function (e) {
      p || v || (0 === n.currentSlide && n.animatingTo === n.last && n.vars.animationLoop ? n.setProps(e, "jumpEnd") : n.currentSlide === n.last && 0 === n.animatingTo && n.vars.animationLoop && n.setProps(e, "jumpStart")), n.animating = !1, n.currentSlide = n.animatingTo, n.vars.after(n);
    }, n.animateSlides = function () {
      !n.animating && e && n.flexAnimate(n.getTarget("next"));
    }, n.pause = function () {
      clearInterval(n.animatedSlides), n.animatedSlides = null, n.playing = !1, n.vars.pausePlay && f.pausePlay.update("play"), n.syncExists && f.sync("pause");
    }, n.play = function () {
      n.playing && clearInterval(n.animatedSlides), n.animatedSlides = n.animatedSlides || setInterval(n.animateSlides, n.vars.slideshowSpeed), n.started = n.playing = !0, n.vars.pausePlay && f.pausePlay.update("pause"), n.syncExists && f.sync("play");
    }, n.stop = function () {
      n.pause(), n.stopped = !0;
    }, n.canAdvance = function (e, t) {
      var a = m ? n.pagingCount - 1 : n.last;return t ? !0 : m && n.currentItem === n.count - 1 && 0 === e && "prev" === n.direction ? !0 : m && 0 === n.currentItem && e === n.pagingCount - 1 && "next" !== n.direction ? !1 : e !== n.currentSlide || m ? n.vars.animationLoop ? !0 : n.atEnd && 0 === n.currentSlide && e === a && "next" !== n.direction ? !1 : !n.atEnd || n.currentSlide !== a || 0 !== e || "next" !== n.direction : !1;
    }, n.getTarget = function (e) {
      return n.direction = e, "next" === e ? n.currentSlide === n.last ? 0 : n.currentSlide + 1 : 0 === n.currentSlide ? n.last : n.currentSlide - 1;
    }, n.setProps = function (e, t, a) {
      var i = function () {
        var a = e ? e : (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo,
            i = function () {
          if (v) return "setTouch" === t ? e : u && n.animatingTo === n.last ? 0 : u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : n.animatingTo === n.last ? n.limit : a;switch (t) {case "setTotal":
              return u ? (n.count - 1 - n.currentSlide + n.cloneOffset) * e : (n.currentSlide + n.cloneOffset) * e;case "setTouch":
              return u ? e : e;case "jumpEnd":
              return u ? e : n.count * e;case "jumpStart":
              return u ? n.count * e : e;default:
              return e;}
        }();return -1 * i + "px";
      }();n.transitions && (i = d ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)", a = void 0 !== a ? a / 1e3 + "s" : "0s", n.container.css("-" + n.pfx + "-transition-duration", a), n.container.css("transition-duration", a)), n.args[n.prop] = i, (n.transitions || void 0 === a) && n.container.css(n.args), n.container.css("transform", i);
    }, n.setup = function (e) {
      if (p) n.slides.css({ width: "100%", "float": "left", marginRight: "-100%", position: "relative" }), "init" === e && (r ? n.slides.css({ opacity: 0, display: "block", webkitTransition: "opacity " + n.vars.animationSpeed / 1e3 + "s ease", zIndex: 1 }).eq(n.currentSlide).css({ opacity: 1, zIndex: 2 }) : 0 == n.vars.fadeFirstSlide ? n.slides.css({ opacity: 0, display: "block", zIndex: 1 }).eq(n.currentSlide).css({ zIndex: 2 }).css({ opacity: 1 }) : n.slides.css({ opacity: 0, display: "block", zIndex: 1 }).eq(n.currentSlide).css({ zIndex: 2 }).animate({ opacity: 1 }, n.vars.animationSpeed, n.vars.easing)), n.vars.smoothHeight && f.smoothHeight();else {
        var t, a;"init" === e && (n.viewport = $('<div class="' + i + 'viewport"></div>').css({ overflow: "hidden", position: "relative" }).appendTo(n).append(n.container), n.cloneCount = 0, n.cloneOffset = 0, u && (a = $.makeArray(n.slides).reverse(), n.slides = $(a), n.container.empty().append(n.slides))), n.vars.animationLoop && !v && (n.cloneCount = 2, n.cloneOffset = 1, "init" !== e && n.container.find(".clone").remove(), n.container.append(f.uniqueID(n.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(f.uniqueID(n.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), n.newSlides = $(n.vars.selector, n), t = u ? n.count - 1 - n.currentSlide + n.cloneOffset : n.currentSlide + n.cloneOffset, d && !v ? (n.container.height(200 * (n.count + n.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function () {
          n.newSlides.css({ display: "block" }), n.doMath(), n.viewport.height(n.h), n.setProps(t * n.h, "init");
        }, "init" === e ? 100 : 0)) : (n.container.width(200 * (n.count + n.cloneCount) + "%"), n.setProps(t * n.computedW, "init"), setTimeout(function () {
          n.doMath(), n.newSlides.css({ width: n.computedW, marginRight: n.computedM, "float": "left", display: "block" }), n.vars.smoothHeight && f.smoothHeight();
        }, "init" === e ? 100 : 0));
      }v || n.slides.removeClass(i + "active-slide").eq(n.currentSlide).addClass(i + "active-slide"), n.vars.init(n);
    }, n.doMath = function () {
      var e = n.slides.first(),
          t = n.vars.itemMargin,
          a = n.vars.minItems,
          i = n.vars.maxItems;n.w = void 0 === n.viewport ? n.width() : n.viewport.width(), n.h = e.height(), n.boxPadding = e.outerWidth() - e.width(), v ? (n.itemT = n.vars.itemWidth + t, n.itemM = t, n.minW = a ? a * n.itemT : n.w, n.maxW = i ? i * n.itemT - t : n.w, n.itemW = n.minW > n.w ? (n.w - t * (a - 1)) / a : n.maxW < n.w ? (n.w - t * (i - 1)) / i : n.vars.itemWidth > n.w ? n.w : n.vars.itemWidth, n.visible = Math.floor(n.w / n.itemW), n.move = n.vars.move > 0 && n.vars.move < n.visible ? n.vars.move : n.visible, n.pagingCount = Math.ceil((n.count - n.visible) / n.move + 1), n.last = n.pagingCount - 1, n.limit = 1 === n.pagingCount ? 0 : n.vars.itemWidth > n.w ? n.itemW * (n.count - 1) + t * (n.count - 1) : (n.itemW + t) * n.count - n.w - t) : (n.itemW = n.w, n.itemM = t, n.pagingCount = n.count, n.last = n.count - 1), n.computedW = n.itemW - n.boxPadding, n.computedM = n.itemM;
    }, n.update = function (e, t) {
      n.doMath(), v || (e < n.currentSlide ? n.currentSlide += 1 : e <= n.currentSlide && 0 !== e && (n.currentSlide -= 1), n.animatingTo = n.currentSlide), n.vars.controlNav && !n.manualControls && ("add" === t && !v || n.pagingCount > n.controlNav.length ? f.controlNav.update("add") : ("remove" === t && !v || n.pagingCount < n.controlNav.length) && (v && n.currentSlide > n.last && (n.currentSlide -= 1, n.animatingTo -= 1), f.controlNav.update("remove", n.last))), n.vars.directionNav && f.directionNav.update();
    }, n.addSlide = function (e, t) {
      var a = $(e);n.count += 1, n.last = n.count - 1, d && u ? void 0 !== t ? n.slides.eq(n.count - t).after(a) : n.container.prepend(a) : void 0 !== t ? n.slides.eq(t).before(a) : n.container.append(a), n.update(t, "add"), n.slides = $(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.added(n);
    }, n.removeSlide = function (e) {
      var t = isNaN(e) ? n.slides.index($(e)) : e;n.count -= 1, n.last = n.count - 1, isNaN(e) ? $(e, n.slides).remove() : d && u ? n.slides.eq(n.last).remove() : n.slides.eq(e).remove(), n.doMath(), n.update(t, "remove"), n.slides = $(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.removed(n);
    }, f.init();
  }, $(window).blur(function (t) {
    e = !1;
  }).focus(function (t) {
    e = !0;
  }), $.flexslider.defaults = { namespace: "flex-", selector: ".slides > li", animation: "fade", easing: "swing", direction: "horizontal", reverse: !1, animationLoop: !0, smoothHeight: !1, startAt: 0, slideshow: !0, slideshowSpeed: 7e3, animationSpeed: 600, initDelay: 0, randomize: !1, fadeFirstSlide: !0, thumbCaptions: !1, pauseOnAction: !0, pauseOnHover: !1, pauseInvisible: !0, useCSS: !0, touch: !0, video: !1, controlNav: !0, directionNav: !0, prevText: "Previous", nextText: "Next", keyboard: !0, multipleKeyboard: !1, mousewheel: !1, pausePlay: !1, pauseText: "Pause", playText: "Play", controlsContainer: "", manualControls: "", customDirectionNav: "", sync: "", asNavFor: "", itemWidth: 0, itemMargin: 0, minItems: 1, maxItems: 0, move: 0, allowOneSlide: !0, start: function start() {}, before: function before() {}, after: function after() {}, end: function end() {}, added: function added() {}, removed: function removed() {}, init: function init() {} }, $.fn.flexslider = function (e) {
    if (void 0 === e && (e = {}), "object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) return this.each(function () {
      var t = $(this),
          a = e.selector ? e.selector : ".slides > li",
          n = t.find(a);1 === n.length && e.allowOneSlide === !1 || 0 === n.length ? (n.fadeIn(400), e.start && e.start(t)) : void 0 === t.data("flexslider") && new $.flexslider(this, e);
    });var t = $(this).data("flexslider");switch (e) {case "play":
        t.play();break;case "pause":
        t.pause();break;case "stop":
        t.stop();break;case "next":
        t.flexAnimate(t.getTarget("next"), !0);break;case "prev":case "previous":
        t.flexAnimate(t.getTarget("prev"), !0);break;default:
        "number" == typeof e && t.flexAnimate(e, !0);}
  };
}(jQuery);
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* jQuery Form Styler v2.0.0 | (c) Dimox | https://github.com/Dimox/jQueryFormStyler */
!function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = e($ || require("jquery")) : e(jQuery);
}(function (e) {
  "use strict";
  function t(t, s) {
    this.element = t, this.options = e.extend({}, l, s);var i = this.options.locale;void 0 !== this.options.locales[i] && e.extend(this.options, this.options.locales[i]), this.init();
  }function s(t) {
    if (!e(t.target).parents().hasClass("jq-selectbox") && "OPTION" != t.target.nodeName && e("div.jq-selectbox.opened").length) {
      var s = e("div.jq-selectbox.opened"),
          l = e("div.jq-selectbox__search input", s),
          o = e("div.jq-selectbox__dropdown", s);s.find("select").data("_" + i).options.onSelectClosed.call(s), l.length && l.val("").keyup(), o.hide().find("li.sel").addClass("selected"), s.removeClass("focused opened dropup dropdown");
    }
  }var i = "styler",
      l = { idSuffix: "-styler", filePlaceholder: "Файл не выбран", fileBrowse: "Обзор...", fileNumber: "Выбрано файлов: %s", selectPlaceholder: "Выберите...", selectSearch: !1, selectSearchLimit: 10, selectSearchNotFound: "Совпадений не найдено", selectSearchPlaceholder: "Поиск...", selectVisibleOptions: 0, selectSmartPositioning: !0, locale: "ru", locales: { en: { filePlaceholder: "No file selected", fileBrowse: "Browse...", fileNumber: "Selected files: %s", selectPlaceholder: "Select...", selectSearchNotFound: "No matches found", selectSearchPlaceholder: "Search..." } }, onSelectOpened: function onSelectOpened() {}, onSelectClosed: function onSelectClosed() {}, onFormStyled: function onFormStyled() {} };t.prototype = { init: function init() {
      function t() {
        void 0 !== i.attr("id") && "" !== i.attr("id") && (this.id = i.attr("id") + l.idSuffix), this.title = i.attr("title"), this.classes = i.attr("class"), this.data = i.data();
      }var i = e(this.element),
          l = this.options,
          o = !(!navigator.userAgent.match(/(iPad|iPhone|iPod)/i) || navigator.userAgent.match(/(Windows\sPhone)/i)),
          a = !(!navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/(Windows\sPhone)/i));if (i.is(":checkbox")) {
        var d = function d() {
          var s = new t(),
              l = e('<div class="jq-checkbox"><div class="jq-checkbox__div"></div></div>').attr({ id: s.id, title: s.title }).addClass(s.classes).data(s.data);i.after(l).prependTo(l), i.is(":checked") && l.addClass("checked"), i.is(":disabled") && l.addClass("disabled"), l.click(function (e) {
            e.preventDefault(), i.triggerHandler("click"), l.is(".disabled") || (i.is(":checked") ? (i.prop("checked", !1), l.removeClass("checked")) : (i.prop("checked", !0), l.addClass("checked")), i.focus().change());
          }), i.closest("label").add('label[for="' + i.attr("id") + '"]').on("click.styler", function (t) {
            e(t.target).is("a") || e(t.target).closest(l).length || (l.triggerHandler("click"), t.preventDefault());
          }), i.on("change.styler", function () {
            i.is(":checked") ? l.addClass("checked") : l.removeClass("checked");
          }).on("keydown.styler", function (e) {
            32 == e.which && l.click();
          }).on("focus.styler", function () {
            l.is(".disabled") || l.addClass("focused");
          }).on("blur.styler", function () {
            l.removeClass("focused");
          });
        };d(), i.on("refresh", function () {
          i.closest("label").add('label[for="' + i.attr("id") + '"]').off(".styler"), i.off(".styler").parent().before(i).remove(), d();
        });
      } else if (i.is(":radio")) {
        var r = function r() {
          var s = new t(),
              l = e('<div class="jq-radio"><div class="jq-radio__div"></div></div>').attr({ id: s.id, title: s.title }).addClass(s.classes).data(s.data);i.after(l).prependTo(l), i.is(":checked") && l.addClass("checked"), i.is(":disabled") && l.addClass("disabled"), e.fn.commonParents = function () {
            var t = this;return t.first().parents().filter(function () {
              return e(this).find(t).length === t.length;
            });
          }, e.fn.commonParent = function () {
            return e(this).commonParents().first();
          }, l.click(function (t) {
            if (t.preventDefault(), i.triggerHandler("click"), !l.is(".disabled")) {
              var s = e('input[name="' + i.attr("name") + '"]');s.commonParent().find(s).prop("checked", !1).parent().removeClass("checked"), i.prop("checked", !0).parent().addClass("checked"), i.focus().change();
            }
          }), i.closest("label").add('label[for="' + i.attr("id") + '"]').on("click.styler", function (t) {
            e(t.target).is("a") || e(t.target).closest(l).length || (l.triggerHandler("click"), t.preventDefault());
          }), i.on("change.styler", function () {
            i.parent().addClass("checked");
          }).on("focus.styler", function () {
            l.is(".disabled") || l.addClass("focused");
          }).on("blur.styler", function () {
            l.removeClass("focused");
          });
        };r(), i.on("refresh", function () {
          i.closest("label").add('label[for="' + i.attr("id") + '"]').off(".styler"), i.off(".styler").parent().before(i).remove(), r();
        });
      } else if (i.is(":file")) {
        var c = function c() {
          var s = new t(),
              o = i.data("placeholder");void 0 === o && (o = l.filePlaceholder);var a = i.data("browse");void 0 !== a && "" !== a || (a = l.fileBrowse);var d = e('<div class="jq-file"><div class="jq-file__name">' + o + '</div><div class="jq-file__browse">' + a + "</div></div>").attr({ id: s.id, title: s.title }).addClass(s.classes).data(s.data);i.after(d).appendTo(d), i.is(":disabled") && d.addClass("disabled");var r = i.val(),
              c = e("div.jq-file__name", d);r && c.text(r.replace(/.+[\\\/]/, "")), i.on("change.styler", function () {
            var e = i.val();if (i.is("[multiple]")) {
              e = "";var t = i[0].files.length;if (t > 0) {
                var s = i.data("number");void 0 === s && (s = l.fileNumber), s = s.replace("%s", t), e = s;
              }
            }c.text(e.replace(/.+[\\\/]/, "")), "" === e ? (c.text(o), d.removeClass("changed")) : d.addClass("changed");
          }).on("focus.styler", function () {
            d.addClass("focused");
          }).on("blur.styler", function () {
            d.removeClass("focused");
          }).on("click.styler", function () {
            d.removeClass("focused");
          });
        };c(), i.on("refresh", function () {
          i.off(".styler").parent().before(i).remove(), c();
        });
      } else if (i.is('input[type="number"]')) {
        var n = function n() {
          var s = new t(),
              l = e('<div class="jq-number"><div class="jq-number__spin minus"></div><div class="jq-number__spin plus"></div></div>').attr({ id: s.id, title: s.title }).addClass(s.classes).data(s.data);i.after(l).prependTo(l).wrap('<div class="jq-number__field"></div>'), i.is(":disabled") && l.addClass("disabled");var o,
              a,
              d,
              r = null,
              c = null;void 0 !== i.attr("min") && (o = i.attr("min")), void 0 !== i.attr("max") && (a = i.attr("max")), d = void 0 !== i.attr("step") && e.isNumeric(i.attr("step")) ? Number(i.attr("step")) : Number(1);var n = function n(t) {
            var s,
                l = i.val();e.isNumeric(l) || (l = 0, i.val("0")), t.is(".minus") ? s = Number(l) - d : t.is(".plus") && (s = Number(l) + d);var r = (d.toString().split(".")[1] || []).length;if (r > 0) {
              for (var c = "1"; c.length <= r;) {
                c += "0";
              }s = Math.round(s * c) / c;
            }e.isNumeric(o) && e.isNumeric(a) ? s >= o && s <= a && i.val(s) : e.isNumeric(o) && !e.isNumeric(a) ? s >= o && i.val(s) : !e.isNumeric(o) && e.isNumeric(a) ? s <= a && i.val(s) : i.val(s);
          };l.is(".disabled") || (l.on("mousedown", "div.jq-number__spin", function () {
            var t = e(this);n(t), r = setTimeout(function () {
              c = setInterval(function () {
                n(t);
              }, 40);
            }, 350);
          }).on("mouseup mouseout", "div.jq-number__spin", function () {
            clearTimeout(r), clearInterval(c);
          }).on("mouseup", "div.jq-number__spin", function () {
            i.change();
          }), i.on("focus.styler", function () {
            l.addClass("focused");
          }).on("blur.styler", function () {
            l.removeClass("focused");
          }));
        };n(), i.on("refresh", function () {
          i.off(".styler").closest(".jq-number").before(i).remove(), n();
        });
      } else if (i.is("select")) {
        var f = function f() {
          function d(e) {
            var t = e.prop("scrollHeight") - e.outerHeight(),
                s = null,
                i = null;e.off("mousewheel DOMMouseScroll").on("mousewheel DOMMouseScroll", function (l) {
              s = l.originalEvent.detail < 0 || l.originalEvent.wheelDelta > 0 ? 1 : -1, ((i = e.scrollTop()) >= t && s < 0 || i <= 0 && s > 0) && (l.stopPropagation(), l.preventDefault());
            });
          }function r() {
            for (var e = 0; e < c.length; e++) {
              var t = c.eq(e),
                  s = "",
                  i = "",
                  o = "",
                  a = "",
                  d = "",
                  r = "",
                  f = "",
                  h = "",
                  u = "";t.prop("selected") && (i = "selected sel"), t.is(":disabled") && (i = "disabled"), t.is(":selected:disabled") && (i = "selected sel disabled"), void 0 !== t.attr("id") && "" !== t.attr("id") && (a = ' id="' + t.attr("id") + l.idSuffix + '"'), void 0 !== t.attr("title") && "" !== c.attr("title") && (d = ' title="' + t.attr("title") + '"'), void 0 !== t.attr("class") && (f = " " + t.attr("class"), u = ' data-jqfs-class="' + t.attr("class") + '"');var p = t.data();for (var v in p) {
                "" !== p[v] && (r += " data-" + v + '="' + p[v] + '"');
              }i + f !== "" && (o = ' class="' + i + f + '"'), s = "<li" + u + r + o + d + a + ">" + t.html() + "</li>", t.parent().is("optgroup") && (void 0 !== t.parent().attr("class") && (h = " " + t.parent().attr("class")), s = "<li" + u + r + ' class="' + i + f + " option" + h + '"' + d + a + ">" + t.html() + "</li>", t.is(":first-child") && (s = '<li class="optgroup' + h + '">' + t.parent().attr("label") + "</li>" + s)), n += s;
            }
          }var c = e("option", i),
              n = "";if (i.is("[multiple]")) {
            if (a || o) return;!function () {
              var s = new t(),
                  l = e('<div class="jq-select-multiple jqselect"></div>').attr({ id: s.id, title: s.title }).addClass(s.classes).data(s.data);i.after(l), r(), l.append("<ul>" + n + "</ul>");var o = e("ul", l),
                  a = e("li", l),
                  f = i.attr("size"),
                  h = o.outerHeight(),
                  u = a.outerHeight();void 0 !== f && f > 0 ? o.css({ height: u * f }) : o.css({ height: 4 * u }), h > l.height() && (o.css("overflowY", "scroll"), d(o), a.filter(".selected").length && o.scrollTop(o.scrollTop() + a.filter(".selected").position().top)), i.prependTo(l), i.is(":disabled") ? (l.addClass("disabled"), c.each(function () {
                e(this).is(":selected") && a.eq(e(this).index()).addClass("selected");
              })) : (a.filter(":not(.disabled):not(.optgroup)").click(function (t) {
                i.focus();var s = e(this);if (t.ctrlKey || t.metaKey || s.addClass("selected"), t.shiftKey || s.addClass("first"), t.ctrlKey || t.metaKey || t.shiftKey || s.siblings().removeClass("selected first"), (t.ctrlKey || t.metaKey) && (s.is(".selected") ? s.removeClass("selected first") : s.addClass("selected first"), s.siblings().removeClass("first")), t.shiftKey) {
                  var l = !1,
                      o = !1;s.siblings().removeClass("selected").siblings(".first").addClass("selected"), s.prevAll().each(function () {
                    e(this).is(".first") && (l = !0);
                  }), s.nextAll().each(function () {
                    e(this).is(".first") && (o = !0);
                  }), l && s.prevAll().each(function () {
                    if (e(this).is(".selected")) return !1;e(this).not(".disabled, .optgroup").addClass("selected");
                  }), o && s.nextAll().each(function () {
                    if (e(this).is(".selected")) return !1;e(this).not(".disabled, .optgroup").addClass("selected");
                  }), 1 == a.filter(".selected").length && s.addClass("first");
                }c.prop("selected", !1), a.filter(".selected").each(function () {
                  var t = e(this),
                      s = t.index();t.is(".option") && (s -= t.prevAll(".optgroup").length), c.eq(s).prop("selected", !0);
                }), i.change();
              }), c.each(function (t) {
                e(this).data("optionIndex", t);
              }), i.on("change.styler", function () {
                a.removeClass("selected");var t = [];c.filter(":selected").each(function () {
                  t.push(e(this).data("optionIndex"));
                }), a.not(".optgroup").filter(function (s) {
                  return e.inArray(s, t) > -1;
                }).addClass("selected");
              }).on("focus.styler", function () {
                l.addClass("focused");
              }).on("blur.styler", function () {
                l.removeClass("focused");
              }), h > l.height() && i.on("keydown.styler", function (e) {
                38 != e.which && 37 != e.which && 33 != e.which || o.scrollTop(o.scrollTop() + a.filter(".selected").position().top - u), 40 != e.which && 39 != e.which && 34 != e.which || o.scrollTop(o.scrollTop() + a.filter(".selected:last").position().top - o.innerHeight() + 2 * u);
              }));
            }();
          } else !function () {
            var a = new t(),
                f = "",
                h = i.data("placeholder"),
                u = i.data("search"),
                p = i.data("search-limit"),
                v = i.data("search-not-found"),
                m = i.data("search-placeholder"),
                g = i.data("smart-positioning");void 0 === h && (h = l.selectPlaceholder), void 0 !== u && "" !== u || (u = l.selectSearch), void 0 !== p && "" !== p || (p = l.selectSearchLimit), void 0 !== v && "" !== v || (v = l.selectSearchNotFound), void 0 === m && (m = l.selectSearchPlaceholder), void 0 !== g && "" !== g || (g = l.selectSmartPositioning);var b = e('<div class="jq-selectbox jqselect"><div class="jq-selectbox__select"><div class="jq-selectbox__select-text"></div><div class="jq-selectbox__trigger"><div class="jq-selectbox__trigger-arrow"></div></div></div></div>').attr({ id: a.id, title: a.title }).addClass(a.classes).data(a.data);i.after(b).prependTo(b);var C = b.css("z-index");C = C > 0 ? C : 1;var x = e("div.jq-selectbox__select", b),
                y = e("div.jq-selectbox__select-text", b),
                w = c.filter(":selected");r(), u && (f = '<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' + m + '"></div><div class="jq-selectbox__not-found">' + v + "</div>");var q = e('<div class="jq-selectbox__dropdown">' + f + "<ul>" + n + "</ul></div>");b.append(q);var _ = e("ul", q),
                j = e("li", q),
                k = e("input", q),
                S = e("div.jq-selectbox__not-found", q).hide();j.length < p && k.parent().hide(), "" === c.first().text() && c.first().is(":selected") && !1 !== h ? y.text(h).addClass("placeholder") : y.text(w.text());var T = 0,
                N = 0;if (j.css({ display: "inline-block" }), j.each(function () {
              var t = e(this);t.innerWidth() > T && (T = t.innerWidth(), N = t.width());
            }), j.css({ display: "" }), y.is(".placeholder") && y.width() > T) y.width(y.width());else {
              var P = b.clone().appendTo("body").width("auto"),
                  H = P.outerWidth();P.remove(), H == b.outerWidth() && y.width(N);
            }T > b.width() && q.width(T), "" === c.first().text() && "" !== i.data("placeholder") && j.first().hide();var A = b.outerHeight(!0),
                D = k.parent().outerHeight(!0) || 0,
                I = _.css("max-height"),
                K = j.filter(".selected");if (K.length < 1 && j.first().addClass("selected sel"), void 0 === j.data("li-height")) {
              var O = j.outerHeight();!1 !== h && (O = j.eq(1).outerHeight()), j.data("li-height", O);
            }var M = q.css("top");if ("auto" == q.css("left") && q.css({ left: 0 }), "auto" == q.css("top") && (q.css({ top: A }), M = A), q.hide(), K.length && (c.first().text() != w.text() && b.addClass("changed"), b.data("jqfs-class", K.data("jqfs-class")), b.addClass(K.data("jqfs-class"))), i.is(":disabled")) return b.addClass("disabled"), !1;x.click(function () {
              if (e("div.jq-selectbox").filter(".opened").length && l.onSelectClosed.call(e("div.jq-selectbox").filter(".opened")), i.focus(), !o) {
                var t = e(window),
                    s = j.data("li-height"),
                    a = b.offset().top,
                    r = t.height() - A - (a - t.scrollTop()),
                    n = i.data("visible-options");void 0 !== n && "" !== n || (n = l.selectVisibleOptions);var f = 5 * s,
                    h = s * n;n > 0 && n < 6 && (f = h), 0 === n && (h = "auto");var u = function u() {
                  q.height("auto").css({ bottom: "auto", top: M });var e = function e() {
                    _.css("max-height", Math.floor((r - 20 - D) / s) * s);
                  };e(), _.css("max-height", h), "none" != I && _.css("max-height", I), r < q.outerHeight() + 20 && e();
                };!0 === g || 1 === g ? r > f + D + 20 ? (u(), b.removeClass("dropup").addClass("dropdown")) : (function () {
                  q.height("auto").css({ top: "auto", bottom: M });var e = function e() {
                    _.css("max-height", Math.floor((a - t.scrollTop() - 20 - D) / s) * s);
                  };e(), _.css("max-height", h), "none" != I && _.css("max-height", I), a - t.scrollTop() - 20 < q.outerHeight() + 20 && e();
                }(), b.removeClass("dropdown").addClass("dropup")) : !1 === g || 0 === g ? r > f + D + 20 && (u(), b.removeClass("dropup").addClass("dropdown")) : (q.height("auto").css({ bottom: "auto", top: M }), _.css("max-height", h), "none" != I && _.css("max-height", I)), b.offset().left + q.outerWidth() > t.width() && q.css({ left: "auto", right: 0 }), e("div.jqselect").css({ zIndex: C - 1 }).removeClass("opened"), b.css({ zIndex: C }), q.is(":hidden") ? (e("div.jq-selectbox__dropdown:visible").hide(), q.show(), b.addClass("opened focused"), l.onSelectOpened.call(b)) : (q.hide(), b.removeClass("opened dropup dropdown"), e("div.jq-selectbox").filter(".opened").length && l.onSelectClosed.call(b)), k.length && (k.val("").keyup(), S.hide(), k.keyup(function () {
                  var t = e(this).val();j.each(function () {
                    e(this).html().match(new RegExp(".*?" + t + ".*?", "i")) ? e(this).show() : e(this).hide();
                  }), "" === c.first().text() && "" !== i.data("placeholder") && j.first().hide(), j.filter(":visible").length < 1 ? S.show() : S.hide();
                })), j.filter(".selected").length && ("" === i.val() ? _.scrollTop(0) : (_.innerHeight() / s % 2 != 0 && (s /= 2), _.scrollTop(_.scrollTop() + j.filter(".selected").position().top - _.innerHeight() / 2 + s))), d(_);
              }
            }), j.hover(function () {
              e(this).siblings().removeClass("selected");
            });var W = j.filter(".selected").text();j.filter(":not(.disabled):not(.optgroup)").click(function () {
              i.focus();var t = e(this),
                  s = t.text();if (!t.is(".selected")) {
                var o = t.index();o -= t.prevAll(".optgroup").length, t.addClass("selected sel").siblings().removeClass("selected sel"), c.prop("selected", !1).eq(o).prop("selected", !0), W = s, y.text(s), b.data("jqfs-class") && b.removeClass(b.data("jqfs-class")), b.data("jqfs-class", t.data("jqfs-class")), b.addClass(t.data("jqfs-class")), i.change();
              }q.hide(), b.removeClass("opened dropup dropdown"), l.onSelectClosed.call(b);
            }), q.mouseout(function () {
              e("li.sel", q).addClass("selected");
            }), i.on("change.styler", function () {
              y.text(c.filter(":selected").text()).removeClass("placeholder"), j.removeClass("selected sel").not(".optgroup").eq(i[0].selectedIndex).addClass("selected sel"), c.first().text() != j.filter(".selected").text() ? b.addClass("changed") : b.removeClass("changed");
            }).on("focus.styler", function () {
              b.addClass("focused"), e("div.jqselect").not(".focused").removeClass("opened dropup dropdown").find("div.jq-selectbox__dropdown").hide();
            }).on("blur.styler", function () {
              b.removeClass("focused");
            }).on("keydown.styler keyup.styler", function (e) {
              var t = j.data("li-height");"" === i.val() ? y.text(h).addClass("placeholder") : y.text(c.filter(":selected").text()), j.removeClass("selected sel").not(".optgroup").eq(i[0].selectedIndex).addClass("selected sel"), 38 != e.which && 37 != e.which && 33 != e.which && 36 != e.which || ("" === i.val() ? _.scrollTop(0) : _.scrollTop(_.scrollTop() + j.filter(".selected").position().top)), 40 != e.which && 39 != e.which && 34 != e.which && 35 != e.which || _.scrollTop(_.scrollTop() + j.filter(".selected").position().top - _.innerHeight() + t), 13 == e.which && (e.preventDefault(), q.hide(), b.removeClass("opened dropup dropdown"), l.onSelectClosed.call(b));
            }).on("keydown.styler", function (e) {
              32 == e.which && (e.preventDefault(), x.click());
            }), s.registered || (e(document).on("click", s), s.registered = !0);
          }();
        };f(), i.on("refresh", function () {
          i.off(".styler").parent().before(i).remove(), f();
        });
      } else i.is(":reset") && i.on("click", function () {
        setTimeout(function () {
          i.closest("form").find("input, select").trigger("refresh");
        }, 1);
      });
    }, destroy: function destroy() {
      var t = e(this.element);t.is(":checkbox") || t.is(":radio") ? (t.removeData("_" + i).off(".styler refresh").removeAttr("style").parent().before(t).remove(), t.closest("label").add('label[for="' + t.attr("id") + '"]').off(".styler")) : t.is('input[type="number"]') ? t.removeData("_" + i).off(".styler refresh").closest(".jq-number").before(t).remove() : (t.is(":file") || t.is("select")) && t.removeData("_" + i).off(".styler refresh").removeAttr("style").parent().before(t).remove();
    } }, e.fn[i] = function (s) {
    var l = arguments;if (void 0 === s || "object" == (typeof s === "undefined" ? "undefined" : _typeof(s))) return this.each(function () {
      e.data(this, "_" + i) || e.data(this, "_" + i, new t(this, s));
    }).promise().done(function () {
      var t = e(this[0]).data("_" + i);t && t.options.onFormStyled.call();
    }), this;if ("string" == typeof s && "_" !== s[0] && "init" !== s) {
      var o;return this.each(function () {
        var a = e.data(this, "_" + i);a instanceof t && "function" == typeof a[s] && (o = a[s].apply(a, Array.prototype.slice.call(l, 1)));
      }), void 0 !== o ? o : this;
    }
  }, s.registered = !1;
});
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! jQuery Validation Plugin - v1.16.0 - 12/2/2016
 * http://jqueryvalidation.org/
 * Copyright (c) 2016 Jörn Zaefferer; Licensed MIT */
!function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = a(require("jquery")) : a(jQuery);
}(function (a) {
  a.extend(a.fn, { validate: function validate(b) {
      if (!this.length) return void (b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));var c = a.data(this[0], "validator");return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.on("click.validate", ":submit", function (b) {
        c.settings.submitHandler && (c.submitButton = b.target), a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0);
      }), this.on("submit.validate", function (b) {
        function d() {
          var d, e;return !c.settings.submitHandler || (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), e = c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), void 0 !== e && e);
        }return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1);
      })), c);
    }, valid: function valid() {
      var b, c, d;return a(this[0]).is("form") ? b = this.validate().form() : (d = [], b = !0, c = a(this[0].form).validate(), this.each(function () {
        b = c.element(this) && b, b || (d = d.concat(c.errorList));
      }), c.errorList = d), b;
    }, rules: function rules(b, c) {
      var d,
          e,
          f,
          g,
          h,
          i,
          j = this[0];if (null != j && null != j.form) {
        if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {case "add":
            a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));break;case "remove":
            return c ? (i = {}, a.each(c.split(/\s/), function (b, c) {
              i[c] = f[c], delete f[c], "required" === c && a(j).removeAttr("aria-required");
            }), i) : (delete e[j.name], f);}return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({ required: h }, g), a(j).attr("aria-required", "true")), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, { remote: h })), g;
      }
    } }), a.extend(a.expr.pseudos || a.expr[":"], { blank: function blank(b) {
      return !a.trim("" + a(b).val());
    }, filled: function filled(b) {
      var c = a(b).val();return null !== c && !!a.trim("" + c);
    }, unchecked: function unchecked(b) {
      return !a(b).prop("checked");
    } }), a.validator = function (b, c) {
    this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init();
  }, a.validator.format = function (b, c) {
    return 1 === arguments.length ? function () {
      var c = a.makeArray(arguments);return c.unshift(b), a.validator.format.apply(this, c);
    } : void 0 === c ? b : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function (a, c) {
      b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function () {
        return c;
      });
    }), b);
  }, a.extend(a.validator, { defaults: { messages: {}, groups: {}, rules: {}, errorClass: "error", pendingClass: "pending", validClass: "valid", errorElement: "label", focusCleanup: !1, focusInvalid: !0, errorContainer: a([]), errorLabelContainer: a([]), onsubmit: !0, ignore: ":hidden", ignoreTitle: !1, onfocusin: function onfocusin(a) {
        this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a)));
      }, onfocusout: function onfocusout(a) {
        this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a);
      }, onkeyup: function onkeyup(b, c) {
        var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];9 === c.which && "" === this.elementValue(b) || a.inArray(c.keyCode, d) !== -1 || (b.name in this.submitted || b.name in this.invalid) && this.element(b);
      }, onclick: function onclick(a) {
        a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode);
      }, highlight: function highlight(b, c, d) {
        "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d);
      }, unhighlight: function unhighlight(b, c, d) {
        "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d);
      } }, setDefaults: function setDefaults(b) {
      a.extend(a.validator.defaults, b);
    }, messages: { required: "This field is required.", remote: "Please fix this field.", email: "Please enter a valid email address.", url: "Please enter a valid URL.", date: "Please enter a valid date.", dateISO: "Please enter a valid date (ISO).", number: "Please enter a valid number.", digits: "Please enter only digits.", equalTo: "Please enter the same value again.", maxlength: a.validator.format("Please enter no more than {0} characters."), minlength: a.validator.format("Please enter at least {0} characters."), rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."), range: a.validator.format("Please enter a value between {0} and {1}."), max: a.validator.format("Please enter a value less than or equal to {0}."), min: a.validator.format("Please enter a value greater than or equal to {0}."), step: a.validator.format("Please enter a multiple of {0}.") }, autoCreateRanges: !1, prototype: { init: function init() {
        function b(b) {
          !this.form && this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0]);var c = a.data(this.form, "validator"),
              d = "on" + b.type.replace(/^validate/, ""),
              e = c.settings;e[d] && !a(this).is(e.ignore) && e[d].call(c, this, b);
        }this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();var c,
            d = this.groups = {};a.each(this.settings.groups, function (b, c) {
          "string" == typeof c && (c = c.split(/\s/)), a.each(c, function (a, c) {
            d[c] = b;
          });
        }), c = this.settings.rules, a.each(c, function (b, d) {
          c[b] = a.validator.normalizeRule(d);
        }), a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']", b).on("click.validate", "select, option, [type='radio'], [type='checkbox']", b), this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true");
      }, form: function form() {
        return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid();
      }, checkForm: function checkForm() {
        this.prepareForm();for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) {
          this.check(b[a]);
        }return this.valid();
      }, element: function element(b) {
        var c,
            d,
            e = this.clean(b),
            f = this.validationTargetFor(e),
            g = this,
            h = !0;return void 0 === f ? delete this.invalid[e.name] : (this.prepareElement(f), this.currentElements = a(f), d = this.groups[f.name], d && a.each(this.groups, function (a, b) {
          b === d && a !== f.name && (e = g.validationTargetFor(g.clean(g.findByName(a))), e && e.name in g.invalid && (g.currentElements.push(e), h = g.check(e) && h));
        }), c = this.check(f) !== !1, h = h && c, c ? this.invalid[f.name] = !1 : this.invalid[f.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), a(b).attr("aria-invalid", !c)), h;
      }, showErrors: function showErrors(b) {
        if (b) {
          var c = this;a.extend(this.errorMap, b), this.errorList = a.map(this.errorMap, function (a, b) {
            return { message: a, element: c.findByName(b)[0] };
          }), this.successList = a.grep(this.successList, function (a) {
            return !(a.name in b);
          });
        }this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors();
      }, resetForm: function resetForm() {
        a.fn.resetForm && a(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();var b = this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(b);
      }, resetElements: function resetElements(a) {
        var b;if (this.settings.unhighlight) for (b = 0; a[b]; b++) {
          this.settings.unhighlight.call(this, a[b], this.settings.errorClass, ""), this.findByName(a[b].name).removeClass(this.settings.validClass);
        } else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass);
      }, numberOfInvalids: function numberOfInvalids() {
        return this.objectLength(this.invalid);
      }, objectLength: function objectLength(a) {
        var b,
            c = 0;for (b in a) {
          a[b] && c++;
        }return c;
      }, hideErrors: function hideErrors() {
        this.hideThese(this.toHide);
      }, hideThese: function hideThese(a) {
        a.not(this.containers).text(""), this.addWrapper(a).hide();
      }, valid: function valid() {
        return 0 === this.size();
      }, size: function size() {
        return this.errorList.length;
      }, focusInvalid: function focusInvalid() {
        if (this.settings.focusInvalid) try {
          a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin");
        } catch (b) {}
      }, findLastActive: function findLastActive() {
        var b = this.lastActive;return b && 1 === a.grep(this.errorList, function (a) {
          return a.element.name === b.name;
        }).length && b;
      }, elements: function elements() {
        var b = this,
            c = {};return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function () {
          var d = this.name || a(this).attr("name");return !d && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0]), !(d in c || !b.objectLength(a(this).rules())) && (c[d] = !0, !0);
        });
      }, clean: function clean(b) {
        return a(b)[0];
      }, errors: function errors() {
        var b = this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement + "." + b, this.errorContext);
      }, resetInternals: function resetInternals() {
        this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]);
      }, reset: function reset() {
        this.resetInternals(), this.currentElements = a([]);
      }, prepareForm: function prepareForm() {
        this.reset(), this.toHide = this.errors().add(this.containers);
      }, prepareElement: function prepareElement(a) {
        this.reset(), this.toHide = this.errorsFor(a);
      }, elementValue: function elementValue(b) {
        var c,
            d,
            e = a(b),
            f = b.type;return "radio" === f || "checkbox" === f ? this.findByName(b.name).filter(":checked").val() : "number" === f && "undefined" != typeof b.validity ? b.validity.badInput ? "NaN" : e.val() : (c = b.hasAttribute("contenteditable") ? e.text() : e.val(), "file" === f ? "C:\\fakepath\\" === c.substr(0, 12) ? c.substr(12) : (d = c.lastIndexOf("/"), d >= 0 ? c.substr(d + 1) : (d = c.lastIndexOf("\\"), d >= 0 ? c.substr(d + 1) : c)) : "string" == typeof c ? c.replace(/\r/g, "") : c);
      }, check: function check(b) {
        b = this.validationTargetFor(this.clean(b));var c,
            d,
            e,
            f = a(b).rules(),
            g = a.map(f, function (a, b) {
          return b;
        }).length,
            h = !1,
            i = this.elementValue(b);if ("function" == typeof f.normalizer) {
          if (i = f.normalizer.call(b, i), "string" != typeof i) throw new TypeError("The normalizer should return a string value.");delete f.normalizer;
        }for (d in f) {
          e = { method: d, parameters: f[d] };try {
            if (c = a.validator.methods[d].call(this, i, b, e.parameters), "dependency-mismatch" === c && 1 === g) {
              h = !0;continue;
            }if (h = !1, "pending" === c) return void (this.toHide = this.toHide.not(this.errorsFor(b)));if (!c) return this.formatAndAdd(b, e), !1;
          } catch (j) {
            throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j), j instanceof TypeError && (j.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."), j;
          }
        }if (!h) return this.objectLength(f) && this.successList.push(b), !0;
      }, customDataMessage: function customDataMessage(b, c) {
        return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg");
      }, customMessage: function customMessage(a, b) {
        var c = this.settings.messages[a];return c && (c.constructor === String ? c : c[b]);
      }, findDefined: function findDefined() {
        for (var a = 0; a < arguments.length; a++) {
          if (void 0 !== arguments[a]) return arguments[a];
        }
      }, defaultMessage: function defaultMessage(b, c) {
        "string" == typeof c && (c = { method: c });var d = this.findDefined(this.customMessage(b.name, c.method), this.customDataMessage(b, c.method), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c.method], "<strong>Warning: No message defined for " + b.name + "</strong>"),
            e = /\$?\{(\d+)\}/g;return "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), d;
      }, formatAndAdd: function formatAndAdd(a, b) {
        var c = this.defaultMessage(a, b);this.errorList.push({ message: c, element: a, method: b.method }), this.errorMap[a.name] = c, this.submitted[a.name] = c;
      }, addWrapper: function addWrapper(a) {
        return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a;
      }, defaultShowErrors: function defaultShowErrors() {
        var a, b, c;for (a = 0; this.errorList[a]; a++) {
          c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
        }if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success) for (a = 0; this.successList[a]; a++) {
          this.showLabel(this.successList[a]);
        }if (this.settings.unhighlight) for (a = 0, b = this.validElements(); b[a]; a++) {
          this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
        }this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show();
      }, validElements: function validElements() {
        return this.currentElements.not(this.invalidElements());
      }, invalidElements: function invalidElements() {
        return a(this.errorList).map(function () {
          return this.element;
        });
      }, showLabel: function showLabel(b, c) {
        var d,
            e,
            f,
            g,
            h = this.errorsFor(b),
            i = this.idOrName(b),
            j = a(b).attr("aria-describedby");h.length ? (h.removeClass(this.settings.validClass).addClass(this.settings.errorClass), h.html(c)) : (h = a("<" + this.settings.errorElement + ">").attr("id", i + "-error").addClass(this.settings.errorClass).html(c || ""), d = h, this.settings.wrapper && (d = h.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, d, a(b)) : d.insertAfter(b), h.is("label") ? h.attr("for", i) : 0 === h.parents("label[for='" + this.escapeCssMeta(i) + "']").length && (f = h.attr("id"), j ? j.match(new RegExp("\\b" + this.escapeCssMeta(f) + "\\b")) || (j += " " + f) : j = f, a(b).attr("aria-describedby", j), e = this.groups[b.name], e && (g = this, a.each(g.groups, function (b, c) {
          c === e && a("[name='" + g.escapeCssMeta(b) + "']", g.currentForm).attr("aria-describedby", h.attr("id"));
        })))), !c && this.settings.success && (h.text(""), "string" == typeof this.settings.success ? h.addClass(this.settings.success) : this.settings.success(h, b)), this.toShow = this.toShow.add(h);
      }, errorsFor: function errorsFor(b) {
        var c = this.escapeCssMeta(this.idOrName(b)),
            d = a(b).attr("aria-describedby"),
            e = "label[for='" + c + "'], label[for='" + c + "'] *";return d && (e = e + ", #" + this.escapeCssMeta(d).replace(/\s+/g, ", #")), this.errors().filter(e);
      }, escapeCssMeta: function escapeCssMeta(a) {
        return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1");
      }, idOrName: function idOrName(a) {
        return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name);
      }, validationTargetFor: function validationTargetFor(b) {
        return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0];
      }, checkable: function checkable(a) {
        return (/radio|checkbox/i.test(a.type)
        );
      }, findByName: function findByName(b) {
        return a(this.currentForm).find("[name='" + this.escapeCssMeta(b) + "']");
      }, getLength: function getLength(b, c) {
        switch (c.nodeName.toLowerCase()) {case "select":
            return a("option:selected", c).length;case "input":
            if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length;}return b.length;
      }, depend: function depend(a, b) {
        return !this.dependTypes[typeof a === "undefined" ? "undefined" : _typeof(a)] || this.dependTypes[typeof a === "undefined" ? "undefined" : _typeof(a)](a, b);
      }, dependTypes: { "boolean": function boolean(a) {
          return a;
        }, string: function string(b, c) {
          return !!a(b, c.form).length;
        }, "function": function _function(a, b) {
          return a(b);
        } }, optional: function optional(b) {
        var c = this.elementValue(b);return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch";
      }, startRequest: function startRequest(b) {
        this.pending[b.name] || (this.pendingRequest++, a(b).addClass(this.settings.pendingClass), this.pending[b.name] = !0);
      }, stopRequest: function stopRequest(b, c) {
        this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], a(b).removeClass(this.settings.pendingClass), c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1);
      }, previousValue: function previousValue(b, c) {
        return c = "string" == typeof c && c || "remote", a.data(b, "previousValue") || a.data(b, "previousValue", { old: null, valid: !0, message: this.defaultMessage(b, { method: c }) });
      }, destroy: function destroy() {
        this.resetForm(), a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur");
      } }, classRuleSettings: { required: { required: !0 }, email: { email: !0 }, url: { url: !0 }, date: { date: !0 }, dateISO: { dateISO: !0 }, number: { number: !0 }, digits: { digits: !0 }, creditcard: { creditcard: !0 } }, addClassRules: function addClassRules(b, c) {
      b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b);
    }, classRules: function classRules(b) {
      var c = {},
          d = a(b).attr("class");return d && a.each(d.split(" "), function () {
        this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this]);
      }), c;
    }, normalizeAttributeRule: function normalizeAttributeRule(a, b, c, d) {
      /min|max|step/.test(c) && (null === b || /number|range|text/.test(b)) && (d = Number(d), isNaN(d) && (d = void 0)), d || 0 === d ? a[c] = d : b === c && "range" !== b && (a[c] = !0);
    }, attributeRules: function attributeRules(b) {
      var c,
          d,
          e = {},
          f = a(b),
          g = b.getAttribute("type");for (c in a.validator.methods) {
        "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), this.normalizeAttributeRule(e, g, c, d);
      }return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e;
    }, dataRules: function dataRules(b) {
      var c,
          d,
          e = {},
          f = a(b),
          g = b.getAttribute("type");for (c in a.validator.methods) {
        d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), this.normalizeAttributeRule(e, g, c, d);
      }return e;
    }, staticRules: function staticRules(b) {
      var c = {},
          d = a.data(b.form, "validator");return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c;
    }, normalizeRules: function normalizeRules(b, c) {
      return a.each(b, function (d, e) {
        if (e === !1) return void delete b[d];if (e.param || e.depends) {
          var f = !0;switch (_typeof(e.depends)) {case "string":
              f = !!a(e.depends, c.form).length;break;case "function":
              f = e.depends.call(c, c);}f ? b[d] = void 0 === e.param || e.param : (a.data(c.form, "validator").resetElements(a(c)), delete b[d]);
        }
      }), a.each(b, function (d, e) {
        b[d] = a.isFunction(e) && "normalizer" !== d ? e(c) : e;
      }), a.each(["minlength", "maxlength"], function () {
        b[this] && (b[this] = Number(b[this]));
      }), a.each(["rangelength", "range"], function () {
        var c;b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])]));
      }), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b;
    }, normalizeRule: function normalizeRule(b) {
      if ("string" == typeof b) {
        var c = {};a.each(b.split(/\s/), function () {
          c[this] = !0;
        }), b = c;
      }return b;
    }, addMethod: function addMethod(b, c, d) {
      a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b));
    }, methods: { required: function required(b, c, d) {
        if (!this.depend(d, c)) return "dependency-mismatch";if ("select" === c.nodeName.toLowerCase()) {
          var e = a(c).val();return e && e.length > 0;
        }return this.checkable(c) ? this.getLength(b, c) > 0 : b.length > 0;
      }, email: function email(a, b) {
        return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a);
      }, url: function url(a, b) {
        return this.optional(b) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a);
      }, date: function date(a, b) {
        return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString());
      }, dateISO: function dateISO(a, b) {
        return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a);
      }, number: function number(a, b) {
        return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a);
      }, digits: function digits(a, b) {
        return this.optional(b) || /^\d+$/.test(a);
      }, minlength: function minlength(b, c, d) {
        var e = a.isArray(b) ? b.length : this.getLength(b, c);return this.optional(c) || e >= d;
      }, maxlength: function maxlength(b, c, d) {
        var e = a.isArray(b) ? b.length : this.getLength(b, c);return this.optional(c) || e <= d;
      }, rangelength: function rangelength(b, c, d) {
        var e = a.isArray(b) ? b.length : this.getLength(b, c);return this.optional(c) || e >= d[0] && e <= d[1];
      }, min: function min(a, b, c) {
        return this.optional(b) || a >= c;
      }, max: function max(a, b, c) {
        return this.optional(b) || a <= c;
      }, range: function range(a, b, c) {
        return this.optional(b) || a >= c[0] && a <= c[1];
      }, step: function step(b, c, d) {
        var e,
            f = a(c).attr("type"),
            g = "Step attribute on input type " + f + " is not supported.",
            h = ["text", "number", "range"],
            i = new RegExp("\\b" + f + "\\b"),
            j = f && !i.test(h.join()),
            k = function k(a) {
          var b = ("" + a).match(/(?:\.(\d+))?$/);return b && b[1] ? b[1].length : 0;
        },
            l = function l(a) {
          return Math.round(a * Math.pow(10, e));
        },
            m = !0;if (j) throw new Error(g);return e = k(d), (k(b) > e || l(b) % l(d) !== 0) && (m = !1), this.optional(c) || m;
      }, equalTo: function equalTo(b, c, d) {
        var e = a(d);return this.settings.onfocusout && e.not(".validate-equalTo-blur").length && e.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function () {
          a(c).valid();
        }), b === e.val();
      }, remote: function remote(b, c, d, e) {
        if (this.optional(c)) return "dependency-mismatch";e = "string" == typeof e && e || "remote";var f,
            g,
            h,
            i = this.previousValue(c, e);return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), i.originalMessage = i.originalMessage || this.settings.messages[c.name][e], this.settings.messages[c.name][e] = i.message, d = "string" == typeof d && { url: d } || d, h = a.param(a.extend({ data: b }, d.data)), i.old === h ? i.valid : (i.old = h, f = this, this.startRequest(c), g = {}, g[c.name] = b, a.ajax(a.extend(!0, { mode: "abort", port: "validate" + c.name, dataType: "json", data: g, context: f.currentForm, success: function success(a) {
            var d,
                g,
                h,
                j = a === !0 || "true" === a;f.settings.messages[c.name][e] = i.originalMessage, j ? (h = f.formSubmitted, f.resetInternals(), f.toHide = f.errorsFor(c), f.formSubmitted = h, f.successList.push(c), f.invalid[c.name] = !1, f.showErrors()) : (d = {}, g = a || f.defaultMessage(c, { method: e, parameters: b }), d[c.name] = i.message = g, f.invalid[c.name] = !0, f.showErrors(d)), i.valid = j, f.stopRequest(c, j);
          } }, d)), "pending");
      } } });var b,
      c = {};return a.ajaxPrefilter ? a.ajaxPrefilter(function (a, b, d) {
    var e = a.port;"abort" === a.mode && (c[e] && c[e].abort(), c[e] = d);
  }) : (b = a.ajax, a.ajax = function (d) {
    var e = ("mode" in d ? d : a.ajaxSettings).mode,
        f = ("port" in d ? d : a.ajaxSettings).port;return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments);
  }), a;
});
'use strict';

(function ($) {
		function is_mobile() {
				return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
				);
		}

		if (is_mobile()) {} else {
				var gw_width = !/MSIE [6-8]/i.test(navigator.userAgent) ? window.innerWidth : $(window).width() + 17;
				$('body').width(gw_width);
				$('header').width(gw_width);
				$(window).on('resize', function () {
						var gw_width = !/MSIE [6-8]/i.test(navigator.userAgent) ? window.innerWidth : $(window).width() + 17;
						$('body').width(gw_width);
						$('header').width(gw_width);
				});
		}
		$('document').ready(function () {
				$('input[type="checkbox"],select').styler();
				$('input:not([type="checkbox"]):not([type="submit"]):not([type="radio"])').on('focus', function () {
						$(this).addClass('focused');
				});
				$('input:not([type="checkbox"]):not([type="submit"]):not([type="radio"])').on('blur', function () {
						$(this).removeClass('focused');
				});
				$('#login-form').validate({});
		});
})(jQuery);
/*twttr.widgets.createTweet(
  '805716087056666625',
  document.getElementById('twitter-timeline'),
  {
    align: 'center',
    cards: 'hidden',
    linkColor: '#27aae2'
  }
)
.then(function (el) {
    console.log("Tweet displayed.")
});*/
/*new TWTR.Widget({
  version: 2,
  type: 'profile',
  rpp: 4,
  interval: 6000,
  width: 300,
  height: 288,
  theme: {
    shell: {
      background: 'transparent',
      color: '#2c458f'
    },
    tweets: {
      background: 'transparent',
      color: '#525252',
      links: '#ad1111'
    }
  },
  features: {
    scrollbar: false,
    loop: false,
    live: false,
    hashtags: true,
    timestamp: true,
    avatars: true,
    behavior: 'all'
  }
}).render().setUser('HRExpertAUS').start();*/
"use strict";
'use strict';

$('.menu-key').on('click', function () {
  $(this).toggleClass('opened');
  $('.menu--main .menu__list').fadeToggle(300);
});

$('.js-close-panel').on('click', function () {
  var offset = $(this).closest('.top-panel').outerHeight();
  $(this).closest('header').css('transform', 'translateY(-' + offset + 'px)');
  $(this).closest('header').siblings('.global').addClass('top-hide');
});

$(window).scroll(function () {

  if ($(this).scrollTop() > 0) {
    $('.menu--main').removeClass('hide');
  } else {
    $('.menu--main').addClass('hide');
  }
});
'use strict';

$('.js-open-login').on('click', function () {
  $('#login').arcticmodal();
});
"use strict";
"use strict";

$('.testimonals__slider').flexslider({
    animation: "fade",
    directionNav: false
});
"use strict";
"use strict";
"use strict";

$('.top_screen__slider').flexslider({
    animation: "fade",
    directionNav: false
});
//# sourceMappingURL=build.js.map
