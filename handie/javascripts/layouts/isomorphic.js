/*!
 * Handie v0.6.4
 * UI stuffs for the dashboard of a website.
 * https://ourai.github.io/handie/
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

(function() {

"use strict";

function toggleStatus($target, selector, callback) {
  var cls = "is-active";

  if ($.type(selector) !== "string") {
    selector = "";
  }

  if ($target.hasClass(cls)) {
    $target.removeClass(cls);
  } else {
    if ($target.siblings(selector + "." + cls).size()) {
      $target.siblings(selector + "." + cls).removeClass(cls);
    }

    if ($.isFunction(callback)) {
      callback.call($target.get(0), cls);
    } else {
      $target.addClass(cls);
    }
  }
}

function initNavbar() {
  $(document).on("click", function (e) {
    if ($(".Action.is-active").size()) {
      var $at = $(e.target).closest(".Action-trigger");
      var $ac = $(e.target).closest(".Action-content");
      var $aw = $ac.closest(".Action.is-active");

      if (!$.contains($(".Header-operations").get(0), e.target) || !$at.size() && !($ac.size() && $aw.size())) {
        $(".Action.is-active").removeClass("is-active");
      }
    }
  });

  $(".Header-operations .Action-trigger").on("click", function () {
    var $t = $(this);

    toggleStatus($t.closest(".Action"), ".Action", function (cls) {
      if ($t.siblings(".Action-content").size()) {
        $(this).addClass(cls);
      }
    });
  });
}

function changeNavStatus() {
  var flag = $("html").attr("data-page");

  if (!flag) {
    return;
  }

  var page = flag.split("-");
  var $nav = $(".Sidebar-navs > ul > li[data-flag=\"" + page[0] + "\"]");

  $nav.addClass("is-active");
  $("[data-flag=\"" + page[1] + "\"]", $nav).addClass("is-active");
}

function initSidebar() {
  changeNavStatus();

  $(".Sidebar-navs > ul > li").each(function () {
    if ($(".Navs", $(this)).size() === 0) {
      $(this).addClass("is-childless");
    }
  });

  $(".Sidebar-navs:not(.Navs--hover) > ul > li > a").on("click", function () {
    if (/^(javascript\:|\#)/.test($(this).attr("href"))) {
      toggleStatus($(this).closest("li"));

      return false;
    }
  });
}

$(document).ready(function () {
  initNavbar();
  initSidebar();
});

})();