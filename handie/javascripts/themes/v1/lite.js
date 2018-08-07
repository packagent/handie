/*!
 * Handie-jquery v1.0.0
 * 为前端开发提供统一的布局、组件和工具方法
 * https://github.com/ourai/handie
 *
 * Copyright 2017, Ourai Lin <ourairyu@gmail.com> (http://ourai.ws/)
 * Released under the MIT license.
 *
 * 00000000000000000000000000000000000000000000000000
 * 000000000000000000000GCft1tf1tLC000000000000000000
 * 00000000000000000LLf1i1i;t1t11i1itL000000000000000
 * 000000000000000Cf111t1;ttf1tt1if11;tfC000000000000
 * 0000000000000Ciiif11;11111iitf1f1ffftitL0000000000
 * 000000000000Ci1ti11i;1i11ti1i1;i1iit1iitG000000000
 * 000000000000t;iii1i1;11tt;1ii;1iiii11ti1G000000000
 * 0000000000Gf1i:;;ii;;;;1;i:1it;11i1tti:f8000000000
 * 00000000008ti;:;ii1tfti;;;1;ii1ii:11iiCG0000000000
 * 00000000000Git;f1f1fif1;i1t:;i;1:i;:;;800000000000
 * 00000000000C:1f;t;tt11;:tfC1:tt1;i::;:G00000000000
 * 000000000008i;i1fti;:ittCfftf:i1;ti;;;180000000000
 * 0000000000008fft1ff1tittttLGL.Li1;;1;ii80000000000
 * 000000000000CfLG800Gft1tffLLLLftt1::i;;C0000000000
 * 000000000000Li00GCCGGGf1LLfCCfi1tt1;11;G0000000000
 * 0000000000000;G80080008t1CfLtt;iff1;1if00000000000
 * 0000000000008i1LLCftG08011ttt1ttfff:ii;00000000000
 * G000000000000CL11ttCtfftfi1i;ifi1;1iL;C00000000000
 * 00G0G000000000000GLtfCG8i;:;1i;1if1fLfC00000000000
 * GGGGGGGG0000000000000G;tt:ii;1ftCLffLt1G0000000000
 * GGGGGGGGGG00000000000i;;i;ittLftLtf1t;;;L000000000
 * GGGGGGGGGGGGGGGGGG00:i;;i11ifLftft;ii1tLif000000G0
 * GGGGGGGGGGGGGGGGGGG0Lt;t;f1tfi;;;:itGCCitt:1C00GGG
 * GGGGGGGGGGGGGGGGGGGGG0i11:1:i:;1tCCCCGiGiCi::f0GGG
 * GGGGGGGGGGGGGGGGGGGGGf;,i1;:tLCffCLCf,tCCi1fi,fGGG
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function toggleStatus($target, selector, callback) {
  var cls = "is-active";

  if ($.type(selector) !== "string") {
    selector = "";
  }

  if ($target.hasClass(cls)) {
    $target.removeClass(cls);
  } else {
    if ($target.siblings(selector + "." + cls).length) {
      $target.siblings(selector + "." + cls).removeClass(cls);
    }

    if ($.isFunction(callback)) {
      callback.call($target.get(0), cls);
    } else {
      $target.addClass(cls);
    }
  }
}

/**
 * 给选中的菜单项添加标记
 */
function resolveActiveStatus() {
  var flag = $("html").attr("data-page");

  if (!flag) {
    return;
  }

  var page = flag.split("-");
  var $grouped = $(".Sidebar-navs > ul.Menu--grouped[data-flag]");

  var $menu = void 0,
      $nav = void 0;

  if ($grouped.length) {
    $menu = $grouped.closest("[data-flag='" + page[0] + "']");

    if ($menu.length === 0) {
      $menu = $(".Sidebar-navs > ul:not(.Menu--grouped)");
    }

    if (page.length > 2) {
      page.shift();
    }
  } else {
    $menu = $(".Sidebar-navs > ul");
  }

  $nav = $menu.find("> li[data-flag=\"" + page[0] + "\"]");

  $nav.add($("[data-flag=\"" + page.pop() + "\"]", $nav)).addClass("is-active");
}

/**
 * 给有子菜单的菜单项添加标记
 */
function resolveChildStatus() {
  $(".Sidebar-navs > ul > li:not(.Menu-label)").each(function () {
    var $item = $(this);

    if ($(".Navs", $item).length === 0) {
      $item.addClass("is-childless");
    } else {
      $item.children("a").append("<span class=\"Menu-switcher\"><i class=\"fa fa-angle-right\"></i></span>");
    }
  });
}

/**
 * 使选中菜单项在可视区域
 */
function scrollSidebar() {
  var $sidebar = $(".Sidebar");
  var $item = $(".Sidebar-navs > .Menu > li.is-active", $sidebar);

  var sidebarOffset = $sidebar.offset();
  var itemOffset = $item.offset();

  if (sidebarOffset && itemOffset && (itemOffset.top < sidebarOffset.top || itemOffset.top > sidebarOffset.top + $sidebar.outerHeight() - $item.outerHeight())) {
    $sidebar.scrollTop($sidebar.scrollTop() + itemOffset.top - sidebarOffset.top);
  }
}

function initNavbar() {
  $(document).on("click", function (e) {
    if ($(".Action.is-active").length) {
      var $at = $(e.target).closest(".Action-trigger");
      var $ac = $(e.target).closest(".Action-content");
      var $aw = $ac.closest(".Action.is-active");

      if (!$.contains($(".Header-operations").get(0), e.target) || !$at.length && !($ac.length && $aw.length)) {
        $(".Action.is-active").removeClass("is-active");
      }
    }
  });

  $(".Header-operations .Action-trigger").on("click", function () {
    var $t = $(this);

    toggleStatus($t.closest(".Action"), ".Action", function (cls) {
      if ($t.siblings(".Action-content").length) {
        $(this).addClass(cls);
      }
    });
  });
}

function initSidebar() {
  resolveActiveStatus();
  resolveChildStatus();
  scrollSidebar();

  $(".Sidebar-navs:not(.Navs--hover) > ul > li > a").on("click", function () {
    if (/^(javascript\:|\#)/.test($(this).attr("href"))) {
      toggleStatus($(this).closest("li"));

      return false;
    }
  });
}

function initResponsiveActions() {
  $(".Header-toggle").on("click", function () {
    $(".Page-sidebar").addClass("is-shown");

    return false;
  });

  $(".Page-sidebar").on("click", function (evt) {
    var $sidebar = $(this);
    var $navs = $(".Sidebar-navs", $sidebar);

    if (!($.contains($navs.get(0), evt.target) || $(evt.target).is($navs))) {
      $sidebar.removeClass("is-shown");
    }
  });
}

$(document).ready(function () {
  initNavbar();
  initSidebar();

  initResponsiveActions();
});

})));
