/*!
 * Handie-jquery v1.0.5
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

function toString(target) {
  return Object.prototype.toString.call(target);
}

function hasOwnProp(prop, obj) {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, prop);
}

function capitalize(str) {
  return "" + str.charAt(0).toUpperCase() + str.slice(1);
}

function generateRandomId(prefix) {
  return prefix + "-" + new Date().getTime().toString(32).toUpperCase();
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _typeof$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

function isBoolean(target) {
  return toString(target) === '[object Boolean]';
}

function isNumber(target) {
  return toString(target) === '[object Number]' && !isNaN(target);
}

function isString(target) {
  return toString(target) === '[object String]';
}

function isFunction(target) {
  return toString(target) === '[object Function]';
}

function isArray(target) {
  return toString(target) === '[object Array]';
}





function isObject(target) {
  return toString(target) === '[object Object]';
}

function isLooseObject(target) {
  return (typeof target === 'undefined' ? 'undefined' : _typeof$1(target)) === 'object';
}

function isNumeric(target) {
  var realStringObj = target && target.toString();

  return !isArray(target) && realStringObj - parseFloat(realStringObj) + 1 >= 0;
}

function isGlobal(target) {
  return target && isLooseObject(target) && 'setInterval' in target;
}

function isArrayLike(target) {
  var result = false;

  if (isLooseObject(target) && !isGlobal(target)) {
    var length = target.length;

    if (target.nodeType === 1 && length || !isArray(target) && !isFunction(target) && (length === 0 || isNumber(length) && length > 0 && length - 1 in target)) {
      result = true;
    }
  }

  return result;
}

function isPlainObject(target) {
  if (!target || !isLooseObject(target) || target.nodeType || isGlobal(target)) {
    return false;
  }

  try {
    if (target.constructor && !hasOwnProp('constructor', target) && !hasOwnProp('isPrototypeOf', target.constructor.prototype)) {
      return false;
    }
  } catch (err) {
    return false;
  }

  var key = void 0;

  for (key in target) {
    
  }

  return key === undefined || hasOwnProp(key, target);
}

function treatAsArray(target) {
  return isString(target) || isArray(target) || isArrayLike(target);
}

function eachItem(target, callback) {
  if (treatAsArray(target)) {
    var idx = 0;
    var ele = void 0;

    while (idx < target.length) {
      ele = isString(target) ? target.charAt(idx) : target[idx];

      if (callback.apply(ele, [ele, idx++, target]) === false) {
        break;
      }
    }
  } else if (isObject(target) || isFunction(target)) {
    var name = void 0,
        value = void 0;

    for (name in target) {
      value = target[name];

      if (callback.apply(value, [value, name, target]) === false) {
        break;
      }
    }
  }
}

function extendTarget() {
  var args = arguments;
  var length = args.length;

  var target = args[0] || {};
  var i = 1;
  var deep = false;
  var clone = void 0,
      copy = void 0,
      copyIsArray = void 0,
      name = void 0,
      opts = void 0,
      src = void 0;

  if (isBoolean(target)) {
    deep = target;
    target = args[1] || {};
    i = 2;
  }

  if (!isLooseObject(target) && !isFunction(target)) {
    target = {};
  }

  if (length === 1) {
    target = this;
    i--;
  }

  while (i < length) {
    opts = args[i];

    if (opts != null) {
      for (name in opts) {
        copy = opts[name];
        src = target[name];

        if (copy === target) {
          continue;
        }

        if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && isArray(src) ? src : [];
          } else {
            clone = src && isPlainObject(src) ? src : {};
          }

          target[name] = extendTarget(deep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }

    i++;
  }

  return target;
}

function toArray$1(target) {
  return treatAsArray(target) ? [].slice.call(target, 0) : [];
}

function includes(target, collection) {
  if (isFunction(collection.includes)) {
    return collection.includes(target);
  } else if (isFunction(collection.indexOf)) {
    return collection.indexOf(target) > -1;
  } else {
    try {
      return jQuery.inArray(target, toArray$1(collection)) > -1;
    } catch (err) {
      return false;
    }
  }
}

function map(target, callback) {
  var result = void 0;

  if (treatAsArray(target)) {
    if (isFunction([].map)) {
      result = [].map.call(target, callback);
    } else {
      try {
        result = jQuery.map(toArray$1(target), callback);
      } catch (err) {
        result = [];
      }
    }
  }

  return result || [];
}

function filter(arr, callback) {
  var newArr = [];

  if (isArray(arr)) {
    if (isFunction(arr.filter)) {
      newArr = arr.filter(callback);
    } else if (isFunction(callback)) {
      eachItem(arr, function (idx, val) {
        if (callback.apply(val, [val, idx, [].concat(arr)])) {
          newArr.push(val);
        }
      });
    }
  }

  return newArr || [];
}

function last(target) {
  if (treatAsArray(target)) {
    return target[target.length - 1];
  }
}

function keys(target) {
  if (isFunction(Object.keys)) {
    return Object.keys(target);
  }

  var arr = [];

  if (isPlainObject(target)) {
    eachItem(target, function (key) {
      return arr.push(key);
    });
  }

  return arr;
}

function clone(target) {
  return isArray(target) ? [].concat(target) : isPlainObject(target) ? extendTarget(true, {}, target) : target;
}

var APP_DEFAULTS = {
  theme: {
    color: '#ff8903'
  },
  behavior: 'native',
  flexible: false
};

var PRIVATE_DATA = {};
var BIZ_DATA = {};

function resolveRefKeys(ref) {
  return isString(ref) && new RegExp('^[0-9a-z_]+(\.[0-9a-z_]+)*$', 'i').test(ref) ? ref.split('.') : [];
}

function saveData(storage, ref, val) {
  var merge = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var refKeys = resolveRefKeys(ref);

  if (arguments.length < 3 || refKeys.length === 0) {
    return;
  }

  var lastKey = refKeys.pop();

  var tmp = storage;

  eachItem(refKeys, function (k) {
    if (!hasOwnProp(k, tmp)) {
      tmp[k] = {};
    }

    tmp = tmp[k];
  });

  if (merge === true && isPlainObject(tmp[lastKey]) && isPlainObject(val)) {
    extendTarget(true, tmp[lastKey], val);
  } else {
    tmp[lastKey] = val;
  }

  return val;
}

function retrieveData(storage, ref) {
  var refKeys = resolveRefKeys(ref);
  var keyLength = refKeys.length;

  if (keyLength === 0) {
    return;
  }

  var idx = 0;
  var tmp = clone(storage);
  var val = void 0,
      k = void 0;

  for (; idx < keyLength; idx++) {
    k = refKeys[idx];
    val = tmp[k];

    if (!hasOwnProp(k, tmp)) {
      break;
    }

    tmp = val;
  }

  return val;
}

function setDefaults() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return saveData.apply(undefined, [APP_DEFAULTS].concat(args, [true]));
}

function getDefaults() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return retrieveData.apply(undefined, [APP_DEFAULTS].concat(args));
}



function getPrivate() {
  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  return retrieveData.apply(undefined, [PRIVATE_DATA].concat(args));
}

function setBizData() {
  for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    args[_key5] = arguments[_key5];
  }

  return saveData.apply(undefined, [BIZ_DATA].concat(args));
}

function getBizData() {
  for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }

  return retrieveData.apply(undefined, [BIZ_DATA].concat(args));
}

function supportJquery() {
  return isFunction(jQuery) && isFunction(jQuery.ready) && isPlainObject(jQuery.support) && isPlainObject(jQuery.fn);
}

function supportAxios() {
  return isFunction(axios) && isFunction(axios.get) && isFunction(axios.put) && isFunction(axios.post) && isFunction(axios.delete) && isFunction(axios.options) && isFunction(axios.head) && isFunction(axios.patch) && isFunction(axios.request);
}

function isNativeFlavor(opts) {
  return isBoolean(opts) ? opts : isPlainObject(opts) && isBoolean(opts.native) ? opts.native : getDefaults('behavior') === 'native';
}



function getBridge(flag, ref) {
  return getPrivate('bridge.' + flag + '.' + ref);
}

function resolveBridge(ref, isNativeFirst) {
  if (!isString(ref)) {
    return;
  }

  var handler = void 0;

  if (isNativeFirst) {
    var envs = getPrivate('env');

    eachItem(keys(getPrivate('bridge')), function (k) {
      if (k !== 'fallback' && envs[k] === true) {
        handler = getBridge(k, ref);

        return false;
      }
    });
  }

  if (!isFunction(handler)) {
    handler = getBridge('fallback', ref);
  }

  return handler;
}

function invoke(ref, opts) {
  var handler = resolveBridge(ref, isNativeFlavor(opts));

  if (!isFunction(handler)) {
    return false;
  }

  for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    rest[_key - 2] = arguments[_key];
  }

  return handler.apply(null, [].concat(opts, rest));
}

var HTTP_DEFAULTS = {

  baseURL: '',

  serverErrorText: '服务器开小差啦～',

  ignoreSenderGlobal: true,

  jsonify: function jsonify(params) {
    return params;
  },

  isRestful: function isRestful(res) {
    return !(res !== undefined && hasOwnProp('success', res) && (hasOwnProp('message', res) || hasOwnProp('errorMsg', res)));
  },

  errorHandler: function errorHandler(res) {
    var code = res.status;

    if (code >= 500) {
      invoke('notice.alert', getDefaults('http.serverErrorText'));
    } else if (code >= 400) {
      var resText = res.responseText;
      var resJson = void 0;

      if (hasOwnProp('responseJSON', res)) {
        resJson = res.responseJSON;
      } else {
        try {
          resJson = JSON.parse(resText);
        } catch (err) {
          resJson = null;
        }
      }

      if (isPlainObject(resJson) && (hasOwnProp('message', resJson) || hasOwnProp('errorMsg', resJson))) {
        resText = hasOwnProp('message', resJson) ? resJson.message : resJson.errorMsg;
      }

      invoke('notice.alert', resText);
    }
  },

  responseHandler: function responseHandler(res, callback) {
    var hasCallback = isFunction(callback);

    if (getDefaults('http.isRestful')(res)) {
      if (isString(res) && res !== '') {
        invoke('notice.alert', res);
      } else if (hasCallback) {
        callback.call(null, res);
      }
    }

    else {
        if (!res.success) {
          invoke('notice.alert', hasOwnProp('message', res) ? res.message : res.errorMsg);
        } else if (hasCallback) {
          callback.call(null, res.data);
        }
      }
  },

  completeHandler: function completeHandler() {}
};

setDefaults('http', HTTP_DEFAULTS);

var requestSender = void 0;

function resolveRequestSender() {
  return supportJquery() && jQuery.support.ajax && isFunction(jQuery.ajax) ? 'jquery' : supportAxios() ? 'axios' : null;
}

function resolveResponseResult(res, callback) {
  var handler = getDefaults('http.responseHandler');

  if (!isFunction(handler)) {
    return;
  }

  return handler(res, callback);
}

function sendRequestViaJquery(opts) {
  var httpDefaults = getDefaults('http');
  var params = httpDefaults.jsonify(opts.params);
  var url = opts.url,
      method = opts.method,
      callback = opts.callback;

  var resolved = { url: url, method: method, type: method, global: !httpDefaults.ignoreSenderGlobal };

  if (opts.isJson === true) {
    resolved.data = JSON.stringify(params);
    resolved.contentType = 'application/json; charset=UTF-8';
  } else if (!includes(method, ['get', 'delete'])) {
    resolved.data = params;
  } else if (isPlainObject(params) && keys(params).length) {
    resolved.url += '?' + map(keys(params), function (k) {
      return k + '=' + encodeURIComponent(params[k]);
    }).join('&');
  }

  var req = window.jQuery.ajax(resolved);

  if (opts.global !== false) {
    req.always(function () {
      return httpDefaults.completeHandler();
    }).done(function (res) {
      resolveResponseResult(res, function (result) {
        if (isFunction(callback)) {
          callback.call(null, result, res);
        }
      });
    }).fail(function (jqXHR) {
      return httpDefaults.errorHandler(jqXHR);
    });
  }

  return req;
}

function sendRequestViaAxios(opts) {
  return window.axios(opts);
}

function sendHttpRequest(opts) {
  if (!isFunction(requestSender)) {
    requestSender = resolveRequestSender();
  }

  var resolved = extendTarget({
    url: '',
    method: 'get',
    params: null,
    callback: null,
    isJson: false
  }, opts);

  if (!/^http(s)?\:\/\//.test(resolved.url)) {
    resolved.url = getDefaults('http.baseURL') + resolved.url;
  }

  return requestSender === 'jquery' ? sendRequestViaJquery(resolved) : requestSender === 'axios' ? sendRequestViaAxios(resolved) : null;
}

function generateHttpUtil(method) {
  return function (url, params, callback, isJson) {
    var global = void 0;

    if (isPlainObject(url)) {
      var opts = url;

      url = opts.url;
      params = opts.data;
      callback = opts.callback;
      isJson = opts.isJson;
      global = opts.global;
    }

    else if (isFunction(params)) {
        isJson = callback;
        callback = params;
        params = {};
      }

      else if (isPlainObject(callback)) {
          isJson = callback.isJson;
          callback = callback.callback;
          global = callback.global;
        }

        else if (isPlainObject(isJson)) {
            isJson = isJson.isJson;
            global = isJson.global;
          }

    return sendHttpRequest({ url: url, method: method, params: params, callback: callback, isJson: isJson, global: global });
  };
}

var httpGetUtil = generateHttpUtil('get');
var httpPostUtil = generateHttpUtil('post');
var httpPutUtil = generateHttpUtil('put');
var httpDeleteUtil = generateHttpUtil('delete');



var http = Object.freeze({
	get: httpGetUtil,
	post: httpPostUtil,
	put: httpPutUtil,
	delete: httpDeleteUtil
});

function supportWebSocket() {
  return hasOwnProp('WebSocket', window);
}

function supportWebNotification() {
  return hasOwnProp('Notification', window);
}

function supportLocalStorage() {
  return hasOwnProp('localStorage', window);
}

function isUrl(target) {
  return (/^((http(s)?\:)?\/\/|\/[^\/]+).+/i.test(target)
  );
}

function supportBootstrapModal() {
  return hasOwnProp('modal', $.fn);
}

function supportBootstrapTable() {
  return hasOwnProp('bootstrapTable', $.fn);
}

function supportBootstrapDateTime() {
  return hasOwnProp('datetimepicker', $.fn);
}

function supportSelect2() {
  return hasOwnProp('select2', $.fn);
}

function supportH5fx() {
  return hasOwnProp('H5F', window);
}

function supportMomentJs() {
  return hasOwnProp('moment', window);
}

function initBootstrapTooltip($el, opts) {
  $el.tooltip(extendTarget(true, { placement: 'auto bottom', trigger: 'hover', container: 'body' }, opts));
}

function getDefaultOptions($sel) {
  return filter($("option", $sel).toArray(), function (opt) {
    return opt.defaultSelected === true;
  });
}

function change($sel, val, callback) {
  var opts = void 0;

  if (val == null || val === "") {
    opts = getDefaultOptions($sel);
  } else {
    if (isString(val) && val.split(",")) {
      val = val.split(",");
    }

    opts = isArray(val) ? map(val, function (v) {
      return $("option[value='" + v + "']", $sel);
    }) : $("option[value='" + val + "']", $sel);
  }

  $(":selected", $sel).prop("selected", false);

  eachItem($(opts).toArray(), function (opt) {
    $(opt).prop("selected", true);
  });

  if (isFunction(callback)) {
    callback.call($sel.get(0));
  }

  $sel.trigger("change");

  return $sel;
}

var select = Object.freeze({
	change: change
});

var FORM_DEFAULTS = {
  filter: function filter(data, $field, arr) {
    return true;
  },
  serializer: function serializer(arr) {
    return arr;
  }
};

setDefaults('form', FORM_DEFAULTS);

function isQueryStr(str) {
  return isString(str) && str.split('&').length > 0 && str.split('&')[0].split('=').length > 0;
}

function queryStr2SerializedArr(str) {
  return map(str.split('&'), function (pair) {
    var p = pair.split('=');

    return {
      name: p[0],
      value: decodeURIComponent(p[1])
    };
  });
}

function jsonifyFormData($form, callback) {
  var jsonData = {};

  eachItem(isArray($form) ? $form : isQueryStr($form) ? queryStr2SerializedArr($form) : $($form).serializeArray(), function (p) {
    jsonData[p.name] = hasOwnProp(p.name, jsonData) ? [].concat(jsonData[p.name], p.value) : p.value;
  });

  if (isFunction(callback)) {
    var newJson = callback(jsonData);

    if (isPlainObject(newJson)) {
      jsonData = newJson;
    }
  }

  return jsonData;
}

function resetValidateStatus() {
  var $form = $(this);

  $('.form-group', $form).removeClass('has-success has-error');
  $('.help-block:not(.is-dynamic)', $form).removeClass('u-hidden');
  $('.help-block.is-dynamic, .Error, .ErrorGroup', $form).addClass('u-hidden');
}

function h5f($form) {
  H5F.init($form, { immediate: false });

  $('[name]', $form).on({
    'H5F:valid': function H5FValid(e, f) {
      var $cell = $(e.target).closest('div');

      var $group = $cell.closest('.form-group');
      var errSelector = void 0;

      if ($group.length > 0) {
        errSelector = '.help-block[data-name="' + f.name + '"]';

        $('.help-block:not(.is-dynamic)', $group).addClass('u-hidden');
        $group.removeClass('has-error').addClass('has-success');
      } else {
        errSelector = '.Error[data-name="' + f.name + '"]';
        $group = $('.ErrorGroup', $cell);
      }

      $(errSelector, $cell).addClass('u-hidden');

      if ($group.is('.ErrorGroup') && $('.Error:not(.u-hidden)', $group).length === 0) {
        $group.addClass('u-hidden');
      }
    },
    'H5F:invalid': function H5FInvalid(e, f) {
      var $cell = $(e.target).closest('div');
      var $group = $cell.closest('.form-group');

      var $container = void 0,
          errSelector = void 0,
          errHtml = void 0;

      if ($group.length > 0) {
        errSelector = '.help-block[data-name="' + f.name + '"]';
        errHtml = '<p class="help-block is-dynamic" data-name="' + f.name + '" />';
        $container = $cell;

        $('.help-block:not(.is-dynamic)', $container).addClass('u-hidden');
        $group.removeClass('has-success').addClass('has-error');
      } else {
        errSelector = '.Error[data-name="' + f.name + '"]';
        errHtml = '<p class="Error" data-name="' + f.name + '" />';
        $container = $('.ErrorGroup', $cell);

        if ($container.length > 0) {
          $container.removeClass('u-hidden');
        } else {
          $cell.append("<div class=\"ErrorGroup\" />");
          $container = $('.ErrorGroup', $cell);
        }
      }

      var $err = $(errSelector, $container);

      if ($err.length === 0) {
        $container.append(errHtml);
        $err = $(errSelector, $container);
      }

      $err.text(f.message).removeClass('u-hidden');
    }
  });

  $form.on('reset', resetValidateStatus);
}

function fill($form, data) {
  if (!isPlainObject(data)) {
    return;
  }

  $('[name]', $form).each(function () {
    var $ipt = $(this);
    var tagName = this.tagName.toLowerCase();
    var key = $ipt.attr('name');
    var value = data[key];

    if (includes(tagName, ['input', 'textarea'])) {
      if (includes($ipt.attr('type'), ['radio', 'checkbox'])) {
        $('[name="' + key + '"][value="' + value + '"]', $form).prop('checked', true);
      } else {
        $ipt.val(value);
      }
    } else if (tagName === 'select') {
      change($ipt, value);
    }
  });
}

function reset($form, callback) {
  $('select', $form).each(function () {
    change($(this));
  });

  $('[type="hidden"]', $form).val('');

  if (isFunction(callback)) {
    callback.call($form.get(0));
  }
}

function serialize($form, formFilter) {
  var settings = $form;

  var serializer = void 0;

  if (isPlainObject($form)) {
    $form = settings.$form;
    formFilter = settings.filter;
    serializer = settings.serializer;
  }

  if (!isFunction(formFilter)) {
    formFilter = getDefaults('form.filter');
  }

  if (!isFunction(serializer)) {
    serializer = getDefaults('form.serializer');
  }

  $form = $($form);

  return serializer(filter($form.serializeArray(), function (data, idx, arr) {
    return formFilter(data, $('[name="' + data.name + '"]', $form), arr);
  }));
}



var form = Object.freeze({
	h5f: h5f,
	fill: fill,
	reset: reset,
	serialize: serialize,
	jsonify: jsonifyFormData
});

var HTTP_DEFAULTS$1 = {
  RESTful: true,
  waitingText: '数据保存中，请耐心等待...',
  jsonify: function jsonify$$1(params) {
    return isPlainObject(params) || isArray(params) ? params : jsonifyFormData(params);
  },
  completeHandler: function completeHandler() {
    $('.modal:visible .js-waitForResult:visible').each(function () {
      var $layer = $(this);
      var $modal = $layer.closest('.modal');

      $layer.hide();
      $modal.removeClass('is-waiting');
      $('button', $('.modal-header, .modal-footer', $modal)).prop('disabled', false);
    });
  }
};

setDefaults('http', HTTP_DEFAULTS$1);

function waitingForResponse($target) {
  var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getDefaults('http.waitingText');

  var $dlg = $target.closest('.modal');

  if ($dlg.length) {
    $dlg.addClass('is-waiting');

    if ($('.js-waitForResult', $dlg).length) {
      $('.js-waitForResult', $dlg).show();
    } else {
      $('.modal-content', $dlg).append('<div class="Layer Layer--loading js-waitForResult"><p>' + text + '</p></div>');
    }

    $('button', $('.modal-header, .modal-footer', $dlg)).prop('disabled', true);
  }
}

function generateHttpUtil$1(method) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var opts = last(args);

    if (isPlainObject(opts) && opts.$waiting) {
      waitingForResponse(opts.$waiting, opts.waitingText);
    }

    return http[method].apply(http, args);
  };
}

var httpGetUtil$1 = generateHttpUtil$1('get');
var httpPostUtil$1 = generateHttpUtil$1('post');
var httpPutUtil$1 = generateHttpUtil$1('put');
var httpDeleteUtil$1 = generateHttpUtil$1('delete');

var result = function result() {
  return getDefaults('http.responseHandler').apply(undefined, arguments);
};

var http$1 = Object.freeze({
	get: httpGetUtil$1,
	post: httpPostUtil$1,
	put: httpPutUtil$1,
	delete: httpDeleteUtil$1,
	waiting: waitingForResponse,
	result: result
});

function resolveSocketUrl(url) {
  var isNoProtocol = url.indexOf('//') === 0;

  if (location.hostname === 'localhost') {
    url = isNoProtocol ? 'ws:' + url : url.replace(/^ws(s)?\:\/\//, 'ws\:\/\/');
  }

  else if (isNoProtocol) {
      url = 'wss:' + url;
    }

  return url;
}

function keepSocketAlive(ws, interval) {
  setTimeout(function () {
    ws.send('使 WebSocket 连接保持活跃');
    keepSocketAlive(ws, interval);
  }, interval);
}

function init(opts) {
  if (isString(opts)) {
    opts = { url: opts };
  }

  if (!(supportWebSocket() && isPlainObject(opts) && hasOwnProp('url', opts))) {
    return;
  }

  var ws = new WebSocket(resolveSocketUrl(opts.url));

  if (opts.closeBeforeUnload !== false) {
    window.addEventListener('beforeunload', function () {
      ws.close();
    });
  }

  if (isNumeric(opts.interval) && opts.interval * 1 > 0) {
    ws.addEventListener('open', function () {
      keepSocketAlive(ws, opts.interval);
    });
  }

  eachItem(['open', 'close', 'message', 'error'], function (evtName) {
    var handler = opts['on' + capitalize(evtName)];

    if (isFunction(handler)) {
      ws.addEventListener(evtName, handler);
    }
  });

  return ws;
}



var socket = Object.freeze({
	init: init
});

function alertMessage(message, settings) {
  var type = void 0,
      formatter = void 0;

  if (isString(settings)) {
    type = settings;
  } else if (isPlainObject(settings)) {
    type = settings.type;
    formatter = settings.formatter;
  }

  if (type === "bootstrap") {
    var $m = $(".js-alertSystemMessage");

    if ($m.length === 0) {
      $m = $("\n          <div class=\"modal fade js-alertSystemMessage\">\n            <div class=\"modal-dialog\">\n              <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                  <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span>&times;</span></button>\n                  <h4 class=\"modal-title\">\u7CFB\u7EDF\u63D0\u793A</h4>\n                </div>\n                <div class=\"modal-body\"></div>\n                <div class=\"modal-footer\">\n                  <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\u5173\u95ED</button>\n                </div>\n              </div>\n            </div>\n          </div>\n        ");

      $("body").append($m);
    }

    if (!isFunction(formatter)) {
      formatter = function formatter(message) {
        return "<p class=\"u-textBreak\">" + message + "</p>";
      };
    }

    $(".modal-body", $m).html(formatter.call(null, message) || message);

    $m.modal("show");
  } else {
    window.alert(message);
  }
}

function getDefaultTable() {
  return $(getDefaults('table.selector'));
}

function isOperationColumnSticky(tableOpts) {
  return tableOpts.__operationDefinedByColumns === true || tableOpts.operation && tableOpts.operation.sticky === true;
}

function toggleTableStickyStatus(tableInst, enabled, tableBodyHeight) {
  var $tableContainer = tableInst.$tableContainer,
      $tableHeader = tableInst.$tableHeader,
      $tableBody = tableInst.$tableBody;

  var isColSticky = isOperationColumnSticky(tableInst.options);

  if (enabled !== false) {
    $tableBody.css('height', tableBodyHeight);
    $tableContainer.addClass('is-sticky');
    $tableHeader.show();

    if (isColSticky) {
      $tableBody.css('position', 'relative').find('.Table-container--alternative').css('margin-right', '-' + $tableBody.scrollLeft() + 'px');
    }
  } else {
    $tableBody.css('height', 'auto');
    $tableContainer.removeClass('is-sticky');
    $('> table', $tableHeader.hide()).css('margin-left', 0);

    if (isColSticky) {
      $tableBody.css('position', 'static').find('.Table-container--alternative').css('margin-right', 0);
    }
  }
}

function refreshTable() {
  var $table = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getDefaultTable();
  var resetTop = arguments[1];

  if (isBoolean($table)) {
    resetTop = $table;
    $table = getDefaultTable();
  }

  var opts = void 0;

  if (resetTop === true) {
    opts = { pageNumber: 1 };
  }

  $table.bootstrapTable('refresh', opts);
}

function resolveBoundDialog($table) {
  var $m = $($table.data('bootstrap.table').options.__$dialog);

  if ($m.length === 0 && $table.is(getDefaults('table.selector'))) {
    $m = $(getDefaults('dialog.selector'));
  }

  return $m;
}

function resolveListResponse(res) {
  var rows = [];
  var total = 0;

  if (isArray(res)) {
    rows = res;
    total = res.length;
  } else if (isPlainObject(res)) {

    if (isArray(res.result)) {
      rows = res.result;
      total = res.totalCount;
    }

    else if (isArray(res.data)) {
        rows = res.data;
        total = res.totalCount;
      }

      else if (isPlainObject(res.data) && isArray(res.data.result)) {
          rows = res.data.result;
          total = res.data.totalCount;
        }
  }

  return { rows: rows, total: total };
}

var TABLE_DEFAULTS = {
  selector: '.js-showDataTable',
  showRowNumber: false,
  classes: 'table table-condensed table-hover',
  slim: false,
  rowActions: [],
  keys: {
    sort: 'sortBy',
    order: 'orderBy'
  },
  toolbarActions: {
    basic: {
      fixedWidth: false,
      isCoexisted: true
    },
    create: {
      text: '新增',
      tooltip: '添加新的条目',
      icon: 'plus'
    },
    batch: {
      text: '批量操作',
      tooltip: '对选中条目进行批量操作',
      action: 'batchTable'
    },
    search: {
      label: false,
      width: 'auto',
      filter: {
        selector: '.js-filterTableData',
        mode: 'dropdown',
        button: {
          text: '筛选',
          tooltip: '查看更多筛选条件',
          action: 'showMoreFilters',
          icon: 'filter',
          fixedWidth: true,
          isCoexisted: false
        },
        dialog: {
          title: '筛选数据',
          size: 'lg'
        }
      }
    }
  },
  operationColumn: {
    sticky: false,
    field: 'operation',
    text: '操作',
    events: {
      'click .js-edit': function clickJsEdit(evt, val, row, idx) {
        var $btn = $(this);
        var $m = resolveBoundDialog($btn.closest('table'));

        if ($btn.is('a[href]') || $m.length !== 1) {
          evt.stopPropagation();

          return;
        }

        fill($('form', $m), row);

        $m.modal('show');

        evt.stopPropagation();
      },
      "click .js-delete": function clickJsDelete(evt, val, row, idx) {
        var $btn = $(this);
        var $t = $btn.closest('table');

        var ajaxOpts = last($t.data('bootstrap.table').columns).__handieAjaxOpts || {};

        if (hasOwnProp('delete', ajaxOpts)) {
          ajaxOpts = ajaxOpts.delete;
        }

        if (!hasOwnProp('url', ajaxOpts)) {
          evt.stopPropagation();

          return;
        }

        var callback = function callback() {
          return refreshTable($t);
        };

        var req = getDefaults('ajax.RESTful') === true ? httpDeleteUtil$1 : httpPostUtil$1;
        var args = [row, idx];

        var _ajaxOpts = ajaxOpts,
            url = _ajaxOpts.url,
            params = _ajaxOpts.params,
            extra = _ajaxOpts.extra;

        if (isFunction(url)) {
          url = url.apply(this, args);
        }

        if (isFunction(params)) {
          params = params.apply(this, args);
        }

        if (isFunction(extra)) {
          extra = extra.apply(this, args);
        }

        if (isString(url) && confirm('\u786E\u5B9A\u8981' + ($btn.attr('title') || $btn.attr('data-original-title') || '进行此操作') + '\uFF1F')) {
          if (params) {
            req(url, params, callback, extra);
          } else {
            req(url, callback, extra);
          }
        }

        evt.stopPropagation();
      }
    }
  },
  responseHandler: function responseHandler(res) {
    var resolved = resolveListResponse(res);

    if (getDefaults('http.isRestful')(res)) {
      if (isString(res)) {
        alertMessage(res);
      }
    } else if (!res.success) {
      alertMessage(res.message);
    }

    return this.sidePagination === 'server' ? resolved : resolved.rows;
  }
};

var STORAGE_KEY = {
  IMAGE_ITEM_MAX: "handie.imageItemMax"
};

var builtInActions = {
  edit: {
    text: '编辑',
    icon: 'edit'
  },
  delete: {
    text: '删除',
    action: 'delete',
    icon: 'trash'
  },
  disable: {
    text: '禁用',
    icon: 'pause'
  },
  enable: {
    text: '启用',
    icon: 'play'
  }
};

function resolveDefaultTriggerOptions() {
  return extendTarget(true, {}, builtInActions, getDefaults('generator.actions'));
}

function resolveTriggerOptionsSimply(opts) {
  if (isString(opts) && hasOwnProp(opts, resolveDefaultTriggerOptions())) {
    opts = { action: opts };
  }

  return opts;
}

function resolveTriggerOptions(opts) {
  var defaultActionOpts = resolveDefaultTriggerOptions();
  var action = opts.isDelete === true ? 'delete' : opts.action;

  if (hasOwnProp(action, defaultActionOpts)) {
    var defaultOpts = defaultActionOpts[action];

    eachItem(keys(defaultOpts), function (k) {
      if (!hasOwnProp(k, opts)) {
        opts[k] = defaultOpts[k];
      }
    });
  }

  return opts;
}

function generateMainTrigger(opts) {
  var triggerCls = [].concat(opts.btnCls);
  var attrs = [];

  var tagName = void 0;

  if (isString(opts.action)) {
    triggerCls.push('js-' + opts.action);
  }

  if (isString(opts.url)) {
    tagName = 'a';

    attrs.push('href="' + opts.url + '"');

    if (opts.isExternal === true) {
      attrs.push('target="_blank"');
    }
  } else {
    tagName = 'button';

    attrs.push('type="button"');

    if (opts.disabled === true) {
      attrs.push('disabled');
    }
  }

  if (opts.hasChildren && opts.isSplit !== true) {
    triggerCls.push('dropdown-toggle');
    attrs.push('data-toggle="dropdown"');
  }

  attrs.push('class="' + triggerCls.join(' ') + '"', 'title="' + (opts.tooltip || opts.text) + '"');

  var html = ['<' + tagName + ' ' + attrs.concat(opts.btnAttrs).join(' ') + '>'];

  if (isString(opts.icon)) {
    var iconCls = ['Operation-icon', 'fa', 'fa-' + opts.icon];

    if (opts.fixedWidth !== false) {
      iconCls.push('fa-fw');
    }

    html.push('<i class="' + iconCls.join(" ") + '"></i><span class="' + (opts.isCoexisted === true ? 'Operation-label' : 'sr-only') + '">' + opts.text + '</span>');
  } else {
    html.push(opts.text);
  }

  if (opts.hasChildren && opts.isSplit !== true) {
    html.push('<span class="caret"></span>');
  }

  html.push('</' + tagName + '>');

  return html.join('');
}

function generateSubItem(item) {
  var content = void 0;

  if (isString(item)) {
    content = item;
  } else if (isPlainObject(item)) {
    item = resolveTriggerOptions(item);

    if (hasOwnProp('html', item)) {
      content = item.html;
    } else {
      content = '<a class="js-' + item.action + '" href="' + (isString(item.url) ? item.url : 'javascript:void(0);') + '"' + (item.isExternal === true ? 'target="_blank"' : '') + '>' + item.text + '</a>';
    }
  }

  return '<li>' + (content || '') + '</li>';
}

function generateDropdownMenu(opts) {
  var html = [];

  if (opts.isSplit === true) {
    html.push('<button type="button" class="' + opts.btnCls.concat('dropdown-toggle').join(' ') + '" data-toggle="dropdown"', opts.disabled === true ? ' disabled' : '', '><span class="caret"></span></button>');
  }

  html.push('<ul class="Operation-menu dropdown-menu', opts.align === 'right' ? ' dropdown-menu-right' : '', '">');

  html.push(map(opts.actions, function (child, idx) {
    var isGrouped = isArray(child);

    var items = !isGrouped ? generateSubItem(child) : map(child, function (groupedChild) {
      return generateSubItem(groupedChild);
    }).join('');

    if (idx > 0 && isGrouped) {
      items = '<li class="divider"></li>' + items;
    }

    return items;
  }).join(''));

  html.push('</ul>');

  return html.join('');
}

function constructActionButton(opts, settings) {
  opts = resolveTriggerOptionsSimply(opts);

  if (!isPlainObject(opts)) {
    return '';
  }

  extendTarget(opts, settings);

  var html = [];
  var size = opts.size || 'xs';
  var hasChildren = hasOwnProp('actions', opts) && isArray(opts.actions);

  var btnCls = clone(opts.classes);

  if (isString(btnCls)) {
    btnCls = btnCls.split(' ');
  } else if (!isArray(btnCls)) {
    btnCls = [];
  }

  btnCls = ['Operation', 'btn', 'btn-' + (opts.isPrimary === true ? 'primary' : opts.isDelete === true ? 'danger' : 'default'), 'btn-' + size].concat(btnCls);

  var btnAttrs = clone(opts.attributes);

  if (isPlainObject(btnAttrs)) {
    var attrs = [];

    eachItem(btnAttrs, function (v, k) {
      attrs.push(k + '=' + v);
    });

    btnAttrs = attrs;
  } else if (isString(btnAttrs)) {
    btnAttrs = btnAttrs.split(' ');
  } else if (!isArray(btnAttrs)) {
    btnAttrs = [];
  }

  html.push(generateMainTrigger(extendTarget({}, resolveTriggerOptions(opts), {
    btnCls: btnCls.concat(isString(opts.buttonClass) ? opts.buttonClass : []),
    btnAttrs: btnAttrs,
    hasChildren: hasChildren
  })));

  if (hasChildren) {
    html.unshift('<div class="btn-group btn-group-' + size + '">');
    html.push(generateDropdownMenu(extendTarget({}, opts, { btnCls: btnCls })), '</div>');
  }

  return html.join('');
}

function isImageItemOverflow($btn, limit) {
  return $('.ImageItem:not(.ImageItem--add)', $btn.closest('.ImageList').parent()).length >= limit;
}

function moveImageItemsForward($item) {
  var listCls = 'ImageList';
  var itemCls = 'ImageList-item';
  var hiddenCls = 'u-hidden';

  var $list = $item.closest('.' + listCls);
  var $container = $list.parent();

  $('.' + listCls + ':gt(' + $('.' + listCls, $container).index($list) + ')', $container).each(function () {
    var $r = $(this);

    $r.prev('.' + listCls).append($('.' + itemCls + ':first', $r));

    if ($('.' + itemCls, $r).length === 0) {
      $r.remove();
    }
  });

  $item.closest('.' + itemCls).remove();

  var $btn = $('.ImageItem--add', $container);
  var maxCount = $btn.data(STORAGE_KEY.IMAGE_ITEM_MAX);

  if (maxCount) {
    var $btnCol = $btn.closest('.' + itemCls);

    $('.' + listCls + '.' + hiddenCls, $container).removeClass(hiddenCls);

    if (!isImageItemOverflow($btn, maxCount)) {
      $btnCol.removeClass(hiddenCls);
    } else if ($btnCol.siblings('.' + itemCls).length === 0) {
      $btnCol.closest('.' + listCls).addClass(hiddenCls);
    }
  }
}

var DIALOG_DEFAULTS = {
  backdrop: true,
  closeOnEsc: true,
  selector: ".js-addNewData",
  button: ".js-saveNewData"
};

setDefaults('dialog', DIALOG_DEFAULTS);

var DIALOG_DEFAULT_INDEX = 1050;

var dialogLevel = 0;

function resolveDialogForm($dlg, opts) {
  var $form = $(opts.$form);

  if ($form.length === 0 || !$.contains($dlg.get(0), $form.get(0))) {
    $form = $('form', $dlg);
  }

  return $form.eq(0);
}

function resolveRequestHandler(method, params, ctx) {
  var handler = method;

  if (isFunction(handler)) {
    handler = handler.call(ctx, params);
  }

  if (isString(handler) && includes(handler.toLowerCase(), ['post', 'put'])) {
    handler = handler.toLowerCase() === 'post' ? httpPostUtil$1 : httpPutUtil$1;
  }

  if (!isFunction(handler)) {
    handler = httpPostUtil$1;
  }

  return handler;
}

function resolveSubmitHandler($dlg, opts) {
  if (isFunction(opts.onFormSubmit)) {
    return opts.onFormSubmit;
  }

  var ajaxOpts = clone(opts.ajax) || {};

  if (isString(ajaxOpts)) {
    ajaxOpts = { url: ajaxOpts };
  }

  var rawUrl = ajaxOpts.url;

  if (!includes($.type(rawUrl), ['string', 'function'])) {
    return $.noop;
  }

  var _ajaxOpts = ajaxOpts,
      method = _ajaxOpts.method,
      params = _ajaxOpts.params,
      callback = _ajaxOpts.callback;

  eachItem(['url', 'method', 'params', 'callback'], function (key) {
    delete ajaxOpts[key];
  });

  return function (evt, jsonified, inst, submitEvt) {
    var req = resolveRequestHandler(method, jsonified, this);

    var url = rawUrl;

    if (isFunction(url)) {
      url = url.call(null, jsonified);
    }

    if (isFunction(params)) {
      jsonified = params.call(this, jsonified);
    }

    req(url, jsonified, function () {
      if (isFunction(callback)) {
        callback.call(null);
      }

      refreshTable(opts.$table);
      $dlg.modal('hide');
    }, extendTarget({ isJson: getDefaults('ajax.RESTful') === true, $waiting: $dlg }, ajaxOpts));
  };
}

function init$1($dlg, opts) {
  var defaultSelector = getDefaults('dialog.selector');

  if (isPlainObject($dlg)) {
    opts = $dlg;
    $dlg = $(defaultSelector);
  } else {
    $dlg = $($dlg);

    if (!isPlainObject(opts)) {
      opts = {};
    }
  }

  var $form = resolveDialogForm($dlg, opts);

  if (!$dlg.is('.modal') || $form.length !== 1) {
    return;
  }

  h5f($form);

  if ($dlg.is(defaultSelector)) {
    if (!hasOwnProp('$button', opts) && !hasOwnProp('$btn', opts)) {
      opts.$button = $(getDefaults('dialog.button'));
    }

    if (!hasOwnProp('$table', opts)) {
      opts.$table = getDefaultTable();
    }
  }

  var $btn = $(opts.$button);

  if ($btn.length === 0) {
    $btn = $(opts.$btn);
  }

  if ($btn.length > 0) {
    $btn.on('click', function () {
      $form.trigger('submit');
    });
  }

  var onFormSubmit = resolveSubmitHandler($dlg, opts);

  $form.on({
    'H5F:submit': function H5FSubmit(evt, inst, submitEvt) {
      onFormSubmit.apply(this, [evt, jsonifyFormData($form), inst, submitEvt]);

      submitEvt.preventDefault();

      return false;
    },
    'reset': function reset$$1() {
      if (isFunction(opts.onFormReset)) {
        opts.onFormReset.apply(this, arguments);
      }
    }
  });

  var handler = opts.onDialogClose;

  if (!isFunction(handler)) {
    handler = opts.onModalHide;
  }

  $dlg.on('hidden.bs.modal', function () {
    $form.trigger('reset');
    $dlg.removeClass('is-editing is-viewing');

    if (isFunction(handler)) {
      handler.apply(this, arguments);
    }
  });

  return $dlg;
}

function levelUp($dlg) {
  var $backdrop = $dlg.data('bs.modal').$backdrop;
  var increase = dialogLevel * 2 * 10;

  $dlg.css('z-index', DIALOG_DEFAULT_INDEX + increase);

  if ($backdrop) {
    $backdrop.css('z-index', DIALOG_DEFAULT_INDEX + increase - 10);
  }

  dialogLevel++;
}

function levelDown($dlg) {
  var $backdrop = $dlg.data('bs.modal').$backdrop;

  $dlg.css('z-index', DIALOG_DEFAULT_INDEX);

  if ($backdrop) {
    $backdrop.css('z-index', DIALOG_DEFAULT_INDEX - 10);
  }

  dialogLevel--;
}

function top() {
  return [].sort.call($('.modal:visible'), function (a, b) {
    return $(a).css('z-index') * 1 < $(b).css('z-index') * 1;
  }).first();
}

var dialog = Object.freeze({
	init: init$1,
	levelUp: levelUp,
	levelDown: levelDown,
	top: top
});

function resolveCreateOptions(toolbarOpts) {
  return clone(toolbarOpts.create || toolbarOpts.add || toolbarOpts);
}

$.fn.bootstrapTable.Constructor.prototype.initToolbar = function () {
  var tableInst = this;
  var tableOpts = tableInst.options;

  tableOpts.__$search = $('.Area--query form');

  var toolbarOpts = tableOpts.toolbar;

  if (toolbarOpts === true) {
    toolbarOpts = {};
  }

  if (!isPlainObject(toolbarOpts) && !tableOpts.showColumns) {
    return;
  }

  extendTarget(true, tableOpts, {
    __tableInst: tableInst,
    __toolbar: toolbarOpts,
    __$toolbar: $('<div id="' + generateRandomId("toolbar") + '" class="Table-toolbar u-clearfix" />')
  });

  var $table = tableInst.$el;
  var $toolbar = tableInst.$toolbar;

  tableOpts.toolbar = null;

  $toolbar.prepend(tableOpts.__$toolbar);

  initToolbarLeftGroup(toolbarOpts, tableOpts, $table, $toolbar);
  initToolbarRightGroup(toolbarOpts, tableOpts, $table, $toolbar);

  initBootstrapTooltip($('[title]', tableOpts.__$toolbar));
};

function resolveToolbarActionDefaults(opts) {
  return extendTarget({}, getDefaults('table.toolbarActions.basic'), opts);
}

function constructCreateButton(createOpts, tableOpts) {
  var hasDlgOpts = hasOwnProp('dialog', createOpts);

  if (createOpts === true) {
    createOpts = {};
  }

  if (!(isPlainObject(createOpts) && ($.isEmptyObject(createOpts) || hasOwnProp('button', createOpts) || hasDlgOpts))) {
    return "";
  }

  var btnOpts = extendTarget(true, {}, resolveToolbarActionDefaults(getDefaults('table.toolbarActions.create')), createOpts.button, {
    size: tableOpts.iconSize,
    isPrimary: true
  });

  var classes = ['Table-action--create'];

  if (isString(btnOpts.classes) && btnOpts.classes !== '') {
    classes = classes.concat(btnOpts.classes.split(' '));
  }

  btnOpts.classes = classes;

  var attrs = [];

  if (!isString(btnOpts.url)) {
    var dlgOpts = hasDlgOpts ? createOpts.dialog : {};

    if (isPlainObject(dlgOpts)) {
      var dlgSelector = dlgOpts.selector;

      if (isString(dlgSelector)) {
        delete dlgOpts.selector;
      } else {
        dlgSelector = getDefaults('dialog.selector');
      }

      tableOpts.__$dialog = $(dlgSelector);

      attrs.push('data-toggle="modal"', 'data-target="' + dlgSelector + '"');
    }
  }

  return constructActionButton(extendTarget(btnOpts, { attributes: attrs }));
}

function getSelectedRowData($table) {
  return $table.bootstrapTable('getAllSelections');
}

function isEmptyRowData($table) {
  return getSelectedRowData($table).length === 0;
}

function bindBatchHandle(action, $table, $toolbar) {
  $toolbar.on('click', '.js-' + action.action, function (evt) {
    return action.handler.apply(this, [evt, getSelectedRowData($table), $table]);
  });
}

function initToolbarActionHandlers(actions, bindHandler, $table, $toolbar) {
  eachItem([].concat(actions), function (a) {
    if (isArray(a)) {
      initToolbarActionHandlers(a, bindHandler, $table, $toolbar);
    } else if (isString(a.action) && isFunction(a.handler)) {
      bindHandler(a, $table, $toolbar);
    }
  });
}

function constructBatchButton(batchOpts, tableOpts, $table, $toolbar) {
  var actions = [];
  var isPrimary = false;
  var isSplit = false;

  if (isArray(batchOpts)) {
    actions = batchOpts;
  } else if (isPlainObject(batchOpts) && isArray(batchOpts.actions)) {
    actions = batchOpts.actions;
    isPrimary = batchOpts.isPrimary === true;

    if (isFunction(batchOpts.handler)) {
      isSplit = true;

      bindBatchHandle({ action: getDefaults('table.toolbarActions.batch.action'), handler: batchOpts.handler }, $table, $toolbar);
    } else {
      isSplit = batchOpts.isSplit === true;
    }
  }

  if (actions.length === 0) {
    return '';
  }

  var btnOpts = extendTarget(true, {}, resolveToolbarActionDefaults(getDefaults('table.toolbarActions.batch')), {
    buttonClass: 'Table-action--batch',
    size: tableOpts.iconSize,
    disabled: true,
    isSplit: isSplit
  });

  if (actions.length === 1 && !isArray(actions[0])) {
    extendTarget(true, btnOpts, resolveTriggerOptions(resolveTriggerOptionsSimply(actions[0])));
  } else {
    extendTarget(btnOpts, { actions: actions, isPrimary: isPrimary });
  }

  initToolbarActionHandlers(actions, bindBatchHandle, $table, $toolbar);

  return constructActionButton(btnOpts);
}

function constructOtherButtons(actions, tableOpts, $table, $toolbar) {
  var btnOpts = resolveToolbarActionDefaults({ size: tableOpts.iconSize });

  if (isPlainObject(actions)) {
    actions = [extendTarget({}, btnOpts, actions)];
  } else if (!isArray(actions)) {
    return '';
  }

  var bindHandler = function bindHandler(action, $table, $toolbar) {
    return $toolbar.on('click', '.js-' + action.action, function (evt) {
      return action.handler.apply(this, [evt, $table, $toolbar]);
    });
  };
  var html = [];

  eachItem(actions, function (a) {
    a = resolveTriggerOptionsSimply(a);

    html.push(constructActionButton(extendTarget({}, btnOpts, a)));

    initToolbarActionHandlers(a, bindHandler, $table, $toolbar);

    if (isArray(a.actions)) {
      initToolbarActionHandlers(a.actions, bindHandler, $table, $toolbar);
    }
  });

  return html.join('');
}

function constructToolbarLeftGroup(toolbarOpts, tableOpts, $table, $toolbar) {
  return [constructCreateButton(resolveCreateOptions(toolbarOpts), tableOpts), constructOtherButtons(clone(toolbarOpts.actions), tableOpts, $table, $toolbar), constructBatchButton(clone(toolbarOpts.batch), tableOpts, $table, $toolbar)].join('');
}

function initToolbarLeftGroup(toolbarOpts, tableOpts, $table, $toolbar) {
  if (!isPlainObject(toolbarOpts)) {
    return;
  }

  var $group = $('<div class="OperationGroup u-floatLeft u-hidden" />');

  $group.append(constructToolbarLeftGroup(toolbarOpts, tableOpts, $table, $toolbar));

  if ($group.children().length > 0) {
    $group.removeClass('u-hidden');
  }

  tableOpts.__$toolbar.prepend($group);

  var $batch = $('.Table-action--batch', $group);

  if ($batch.is('.js-' + getDefaults('table.toolbarActions.batch.action'))) {
    $batch = $batch.add($batch.siblings('button'));
  }

  $table.on({
    'check.bs.table \
     uncheck.bs.table \
     check-some.bs.table \
     uncheck-some.bs.table \
     check-all.bs.table \
     uncheck-all.bs.table': function checkBsTableUncheckBsTableCheckSomeBsTableUncheckSomeBsTableCheckAllBsTableUncheckAllBsTable() {
      return $batch.prop('disabled', isEmptyRowData($table));
    },
    'post-body.bs.table': function postBodyBsTable(evt, data) {
      return $batch.prop('disabled', data.length === 0 || isEmptyRowData($table));
    },
    'refresh.bs.table': function refreshBsTable() {
      if (tableOpts.url || tableOpts.ajaxOptions && tableOpts.ajaxOptions.url) {
        $batch.prop('disabled', true);
      }
    },
    'page-change.bs.table': function pageChangeBsTable() {
      return $batch.prop('disabled', tableOpts.sidePagination === 'server' ? true : isEmptyRowData($table));
    }
  });

  if (tableOpts.__$dialog) {
    init$1(tableOpts.__$dialog, extendTarget({ $table: $table }, resolveCreateOptions(toolbarOpts).dialog));
  }

  tableOpts.__$left = $group;
  tableOpts.__$batch = $batch;
}

function initToolbarRightGroup(toolbarOpts, tableOpts, $table, $toolbar) {
  var $group = $('<div class="OperationGroup u-floatRight u-hidden" />');

  tableOpts.__$toolbar.append($group);

  tableOpts.__$right = $group;

  if (isPlainObject(toolbarOpts)) {

    initTableSearch(toolbarOpts.search, tableOpts, $table, $toolbar);
  }

  if (tableOpts.showColumns === true) {
    initTableColumnToggle(tableOpts, $table, $toolbar);
  }

  if ($group.children().length > 0) {
    $group.removeClass('u-hidden');
  }
}

function constructTableFilter(filterOpts, tableOpts) {
  if (!isPlainObject(filterOpts)) {
    filterOpts = { selector: filterOpts };
  }

  filterOpts = extendTarget(true, {}, getDefaults('table.toolbarActions.search.filter'), filterOpts);

  var $filter = $(filterOpts.selector);

  if ($filter.length !== 1 || !includes(filterOpts.mode, ['dropdown', 'dialog'])) {
    return '';
  }

  var filterId = generateRandomId('filter');
  var attrs = [];

  var $container = void 0;

  if (filterOpts.mode === 'dialog') {
    $container = $('<div id="' + filterId + '" class="Table-filter--dialog modal fade">\n        <div class="modal-dialog modal-' + filterOpts.dialog.size + '">\n          <div class="modal-content">\n            <div class="modal-header">\n              <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>\n              <h4 class="modal-title">' + filterOpts.dialog.title + '</h4>\n            </div>\n            <div class="modal-body"></div>\n            <div class="modal-footer">\n              <button type="button" class="btn btn-default" data-dismiss="modal">\u5173\u95ED</button>\n              <button type="button" class="btn btn-default js-resetTableFilters">\u91CD\u7F6E</button>\n              <button type="button" class="btn btn-primary js-executeTableFilters">\u7B5B\u9009</button>\n            </div>\n          </div>\n        </div>\n      </div>');

    $('.modal-body', $container).append($filter);

    $('body').append($container);

    attrs.push('data-toggle="modal"', 'data-target="#' + filterId + '"');
  }

  else {
      $container = $('<div id="' + filterId + '" class="Table-filter--dropdown Card u-clearfix u-hidden">\n        <div class="Card-content"></div>\n        <div class="Card-footer"><button type="button" class="btn btn-primary btn-sm js-executeTableFilters"><i class="fa fa-filter"></i><span>\u7B5B\u9009</span></button><button type="reset" class="btn btn-default btn-sm js-resetTableFilters"><i class="fa fa-refresh"></i><span>\u91CD\u7F6E</span></button></div>\n      </div>');

      $('.Card-content', $container).append($filter);
    }

  $('select', $filter).each(function () {
    $(this).data('select2').$container.css('width', '100%');
  });

  $container.addClass('Table-filter js-showTableFilters');
  $filter.removeClass('u-hidden');

  tableOpts.__$filter = $container;

  return constructActionButton(extendTarget(resolveToolbarActionDefaults(filterOpts.button), { size: tableOpts.iconSize, attributes: attrs }));
}

function constructTableSearch(searchOpts, tableOpts) {
  var fields = clone(searchOpts.field);

  if (isPlainObject(fields)) {
    fields = [fields];
  }

  if (!isArray(fields)) {
    return;
  }

  var selectableFields = [];
  var hiddenFields = [];

  eachItem(fields, function (field) {

    if (field.required === true || field.isHidden === true) {
      hiddenFields.push(field);
    } else {
      selectableFields.push(field);
    }
  });

  if (selectableFields.length === 0) {
    return;
  }

  var defaultField = selectableFields[0];
  var searchId = generateRandomId('search');
  var html = ['<div class="Table-search u-floatLeft">', '<form class="input-group input-group-' + tableOpts.iconSize + '">'];

  searchOpts.__selectable = selectableFields;

  if (selectableFields.length > 1) {
    html.push('<div class="input-group-btn">', '<button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button"><span>' + defaultField.text + '</span><span class="caret"></span></button>', '<ul class="Operation-menu dropdown-menu">', map(selectableFields, function (field) {
      return '<li><a href="javascript:void(0);" data-field="' + field.name + '" data-placeholder="' + field.placeholder + '">' + field.text + '</a></li>';
    }).join(''), '</ul></div>');
  } else if (searchOpts.label === true) {
    html.push('<label class="input-group-addon" for="' + searchId + '">' + defaultField.text + '</label>');
  }

  html.push('<input id="' + searchId + '" class="form-control" type="text" name="' + defaultField.name + '" value="" placeholder="' + (defaultField.placeholder || "") + '">', map(hiddenFields, function (field) {
    return '<input type="hidden" name="' + field.name + '" value="' + (hasOwnProp('value', field) ? field.value : '') + '">';
  }).join(''), '<div class="input-group-btn">', '<button class="btn btn-default js-executeTableSearch" type="submit" title="查询"><i class="fa fa-search fa-fw"></i><span class="sr-only">查询</span></button>', constructTableFilter(clone(searchOpts.filter), tableOpts), '</div>', '</form></div>');

  return html.join('');
}

function calculateTableSearchWidth(searchOpts, $search) {
  var width = parseFloat(searchOpts.width, 10);

  if (isNumeric(width)) {
    return width;
  }

  var defaultSearchWidth = getDefaults('table.toolbarActions.search.width');

  if (defaultSearchWidth !== 'auto') {
    width = parseFloat(defaultSearchWidth, 10);

    if (isNumeric(width)) {
      return width;
    }
  }

  var $ipt = $('[id^="search"]', $search);
  var $dropdown = $('.dropdown-menu', $search);

  var field = clone(searchOpts.__selectable).sort(function (a, b) {
    return a.text.length + a.placeholder.length < b.text.length + b.placeholder.length;
  }).shift();
  var fontSize = parseFloat($ipt.css('font-size'), 10);

  width = parseFloat($ipt.css('border-left-width'), 10) + parseFloat($ipt.css('padding-left'), 10) + parseFloat($ipt.css('padding-right'), 10) + parseFloat($ipt.css('border-right-width'), 10) + field.placeholder.length * fontSize + $('.js-executeTableSearch', $search).parent().width();

  if ($dropdown.length) {
    return width + $dropdown.parent().width() - ($('span', $dropdown.siblings('.dropdown-toggle')).text().length - field.text.length) * fontSize;
  }

  return width + $('label', $search).outerWidth() || 0;
}

function initTableSearch(searchOpts, tableOpts, $table, $toolbar) {
  if (!isPlainObject(searchOpts) || $('.Table-search', $toolbar).length > 0) {
    return;
  }

  var $search = $(constructTableSearch(searchOpts, tableOpts));
  var $searchInput = $('[id^="search"]', $search);
  var $filter = tableOpts.__$filter;

  tableOpts.__$search = $('form', $search);

  tableOpts.__$right.append($search);

  $('form', $search.add($filter)).on('submit', function () {
    refreshTable($table, true);

    return false;
  });

  $('.dropdown-menu a', $search).on('click', function () {
    var $a = $(this);
    var $btn = $('.dropdown-toggle', $search);

    $('span:first', $btn).text($a.text());

    $searchInput.attr({
      name: $a.attr('data-field'),
      placeholder: $a.attr('data-placeholder')
    }).val('');
  });

  if ($filter) {
    var $filterForm = $('form', $filter);
    var $searchForm = $('form', $search);

    if ($filter.hasClass('Table-filter--dropdown')) {
      $toolbar.append($filter);

      $('.js-showMoreFilters', $toolbar).on('click', function () {
        var $btn = $(this);
        var droppedCls = 'is-dropped';
        var hiddenCls = 'u-hidden';
        var $controls = $('.js-executeTableSearch, [id^="search"]', $toolbar).add($('.dropdown-toggle', $searchForm));

        if ($btn.hasClass(droppedCls)) {
          $filter.addClass(hiddenCls);
          $btn.removeClass(droppedCls);

          $controls.prop('disabled', false);
          $filterForm.trigger('reset');

          tableOpts.__$search = $searchForm;
        } else {
          $filter.removeClass(hiddenCls);
          $btn.addClass(droppedCls);

          $controls.prop('disabled', true);
          $searchForm.trigger('reset');

          tableOpts.__$search = $filterForm;
        }

        return false;
      });

      $('.js-executeTableFilters', $filter).on('click', function () {
        $filterForm.trigger('submit');
      });
    } else if ($filter.hasClass('Table-filter--dialog')) {
      $('.js-executeTableFilters', $filter).on('click', function () {
        tableOpts.__$search = $filterForm;

        $searchForm.trigger('reset');
        $filterForm.trigger('submit');

        tableOpts.__$search = $searchForm;

        $filter.modal('hide');
      });
    }

    $('.js-resetTableFilters', $filter).on('click', function () {
      $filterForm.trigger('reset');
    });
  }

  $search.ready(function () {
    return $search.width(calculateTableSearchWidth(searchOpts, $search));
  });
}

function constructColumnToggleButton(tableOpts) {
  var html = ['<div class="Table-columnToggle u-floatLeft keep-open">'];
  var actions = [];

  eachItem(tableOpts.__tableInst.columns, function (col, idx) {
    if (!col.radio && !col.checkbox && !(tableOpts.cardView && !col.cardVisible) && col.switchable && col.field !== getDefaults('table.operationColumn.field')) {
      var attrs = ['type="checkbox"', 'data-field="' + col.field + '"', 'value="' + idx + '"'];

      if (col.visible) {
        attrs.push('checked');
      }

      actions.push('<label><input ' + attrs.join(' ') + '> ' + col.title + '</label>');
    }
  });

  html.push(constructActionButton(resolveToolbarActionDefaults({
    text: '切换列状态',
    size: tableOpts.iconSize,
    icon: tableOpts.icons.columns.replace(/^fa\-/, ''),
    isCoexisted: false,
    align: 'right',
    actions: actions
  })));

  html.push('</div>');

  return html.join('');
}

function initTableColumnToggle(tableOpts, $table, $toolbar) {
  var tableInst = tableOpts.__tableInst;
  var $toggle = $(constructColumnToggleButton(tableOpts));

  tableOpts.__$right.append($toggle);

  var $items = $('.Operation-menu li', $toggle);
  var $checkboxes = $(':checkbox', $toggle);

  if ($items.length <= tableOpts.minimumCountColumns) {
    $checkboxes.prop('disabled', true);
  }

  $items.on('click', function (evt) {
    evt.stopPropagation();
  });

  $checkboxes.on('change', function () {
    var $ipt = $(this);
    var checked = $ipt.prop('checked');

    tableInst.toggleColumn($ipt.val(), checked, false);
    tableInst.trigger('column-switch', $ipt.attr('data-field'), checked);
  });
}

var initBootstrapTableHeader = $.fn.bootstrapTable.Constructor.prototype.initHeader;

function resetTableStickyStatus(tableInst) {
  toggleTableStickyStatus(tableInst, false);

  if (isOperationColumnSticky(tableInst.options)) {
    var $tableBody = tableInst.$tableBody;
    var $alternatives = $('.Table-container--alternative', tableInst.$tableContainer);

    if ($tableBody.width() + $tableBody.scrollLeft() === tableInst.$el.width()) {
      $alternatives.hide();
    } else {
      $alternatives.show();
    }
  }
}

$.fn.bootstrapTable.Constructor.prototype.initHeader = function () {
  var tableInst = this;

  initBootstrapTableHeader.apply(tableInst, toArray$1(arguments));

  var tableOpts = tableInst.options;
  var $table = tableInst.$el;
  var $tableHeader = tableInst.$tableHeader;
  var $header = $('table', $tableHeader);

  if (tableOpts.sticky === true) {
    $header.addClass(tableOpts.classes).append(tableInst.$header.clone(true, true));

    $table.on('post-body.bs.table', function () {
      resetTableStickyStatus(tableInst);

      $header.width($table.width());

      $('th', tableInst.$header).each(function () {
        var $el = $(this);
        var $th = $('[data-field="' + $el.attr('data-field') + '"]', $header);

        $th.width($el.width());
        $th.height($el.height());
      });

      $('.Table-container--alternative th', $tableHeader).width($('[data-field=\'' + getDefaults('table.operationColumn.field') + '\']', $tableHeader).width());
    });
  }
};

function createTemporaryLinkElement(url) {
  var el = document.createElement('a');

  el.setAttribute('href', url);

  return el;
}

function sliceUrlPart(part, url) {
  if (!isString(url) || !isUrl(url) && url.indexOf('URL_PLACEHOLDER') === -1) {
    url = window.location.href;
  }

  var result = createTemporaryLinkElement(url)[part];

  return includes(part, ['hash', 'search']) ? result.slice(1) : result;
}

function resolveFileExtension(url) {
  var segments = sliceUrlPart('pathname', url).split('\/');
  var length = segments.length;

  var fileName = segments[length - 1];

  if (fileName === '') {
    fileName = segments[length - 2];
  }

  var ext = fileName.match(/\.([^\.]+)$/);

  return ext ? ext[1].toUpperCase() : '';
}

function jsonifyQueryString(str) {
  var jsonData = {};

  eachItem(str.split('&'), function (pair) {
    pair = pair.split('=');
    jsonData[pair[0]] = decodeURIComponent(pair[1]);
  });

  return jsonData;
}

var GENERATOR_DEFAULTS = {
  imageColumnCount: 3,
  actions: {}
};

setDefaults('generator', GENERATOR_DEFAULTS);

function generateImageItem(url, alt, removable) {
  var html = [];

  alt = alt || '';

  var ext = void 0;

  if (url && isString(url)) {
    ext = resolveFileExtension(url);
  }

  html.push('<figure class="ImageItem');

  if (url && ext && !includes(ext.toLowerCase(), getDefaults('uploader.extension.image').split(','))) {
    html.push(' is-nongraphic');
  }

  html.push('"><div><a href="' + (url || 'javascript:void(0);') + '" target="_blank" data-file-ext="' + ext + '"><img src="' + (url || '') + '" alt="' + alt + '" title="' + alt + '"></a></div>');

  if (alt) {
    html.push('<figcaption class="u-textTruncate" title="' + alt + '">' + alt + '</figcaption>');
  }

  if (removable === true) {
    html.push('<button type="button" class="ImageItem-button fa fa-close js-removeUploadedImage" title="删除"><span class="sr-only"></span></button>');
  }

  html.push("</figure>");

  return html.join('');
}

function insertImageItem(opts) {
  var $btn = $(opts.$btn);
  var maxCount = opts.max;

  if (!$btn.is('.ImageItem') || maxCount && isImageItemOverflow($btn, maxCount)) {
    return;
  }

  var columnCount = Number(opts.column);

  if (isNaN(columnCount) || columnCount <= 0) {
    columnCount = getDefaults('generator.imageColumnCount');
  }

  var listCls = 'ImageList';
  var itemCls = 'ImageList-item';

  var $btnCol = opts.$btn.closest('.' + itemCls);
  var $newCol = $('<div class="' + itemCls + ' col-sm-' + 12 / columnCount + ' is-dynamic" />');

  $newCol.html(generateImageItem(opts.url, opts.text, opts.removable));
  $btnCol.before($newCol);

  if (isFunction(opts.callback)) {
    opts.callback.call(null, $newCol, $btnCol);
  }

  var imageItemSize = $btnCol.siblings('.' + itemCls).length;

  if (imageItemSize === columnCount) {
    $('.' + listCls + ':last', opts.$el).after('<div class="' + listCls + ' row" />');
    $('.' + listCls + ':last', opts.$el).append($btnCol);
  }

  if (maxCount) {
    var $btnRow = $btnCol.closest('.' + listCls);
    var hiddenCls = 'u-hidden';

    $btn.data(STORAGE_KEY.IMAGE_ITEM_MAX, maxCount);

    $('.' + listCls + '.' + hiddenCls + ', .' + itemCls + '.' + hiddenCls, $btnRow.parent()).removeClass(hiddenCls);

    if (isImageItemOverflow($btnRow, maxCount)) {
      $btnCol.addClass(hiddenCls);

      if (imageItemSize === 0) {
        $btnRow.addClass(hiddenCls);
      }
    }
  }

  return $newCol;
}

function action(actions, wrapped) {
  actions = resolveTriggerOptionsSimply(actions);

  if (isPlainObject(actions)) {
    actions = [actions];
  }

  actions = actions.concat(getDefaults('table.rowActions'));

  if (!isArray(actions)) {
    return false;
  }

  var html = map(actions, function (a) {
    return constructActionButton(a, { align: 'right' });
  });

  if (actions.length > 1 || wrapped === true) {
    html.unshift('<div class="OperationGroup">');
    html.push('</div>');
  }

  return html.join('');
}

function option() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var extra = arguments[2];
  var selected = arguments[3];

  var attrs = ['class="is-dynamic"', 'value="' + value + '"'];

  if (isPlainObject(extra)) {
    eachItem(extra, function (v, k) {
      return attrs.push('data-' + k + '="' + v + '"');
    });
  } else {
    selected = extra;
  }

  if (selected === true) {
    attrs.push('selected');
  }

  return '<option ' + attrs.join(' ') + '>' + text + '</option>';
}



var generate = Object.freeze({
	action: action,
	option: option,
	image: generateImageItem,
	imageItem: insertImageItem
});

function refillImageItem($img, url) {
  var $item = $img.closest('.ImageItem');

  if ($item.length > 0) {
    var ext = void 0;

    if (isString(url)) {
      ext = resolveFileExtension(url);
    }

    var $link = $img.closest('a');

    if (url) {
      $link.attr('href', url);
      $item.removeClass('is-empty');

      if (ext && !includes(ext.toLowerCase(), getDefaults('uploader.extension.image').split(','))) {
        $item.addClass('is-nongraphic');
      } else {
        $item.removeClass('is-nongraphic');
      }
    } else {
      $link.attr('href', 'javascript:void(0);');
      $item.addClass('is-empty');
    }

    $link.attr('data-file-ext', ext);
  }
}

function fill$1($container, data, callback) {
  if (!isPlainObject(data)) {
    return;
  }

  $('[data-field]', $container).each(function () {
    var $f = $(this);
    var val = data[$f.attr('data-field')];

    if ($f.is('img')) {
      $f.attr('src', val || '');

      refillImageItem($f, val);
    } else {
      $f.text(val || '-');
    }

    if (isFunction(callback)) {
      callback.apply(this, [$f.attr('data-field'), val]);
    }
  });
}

function datepicker() {
  var $picker = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $('.js-pickDate');
  var opts = arguments[1];

  $picker.each(function () {
    var _this = this;

    var $p = $(this);
    var $ipt = $('[name="' + $p.attr('data-to') + '"]', $p.closest('form'));

    $p.datepicker(extendTarget({
      language: 'zh-CN',
      autohide: true
    }, $ipt.length ? {
      pick: function pick() {
        return $ipt.val(moment($(_this).datepicker('getDate')).format());
      }
    } : null, opts));

    if ($ipt.length) {
      $p.on('change', function () {
        if ($(this).val() === '') {
          $ipt.val('');
        }
      });
    }
  });
}

function datetimepicker($picker) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (isPlainObject($picker)) {
    opts = $picker;
    $picker = null;
  }

  $picker = $picker == null ? $('.js-pickDateTime') : $($picker);
  opts = clone(opts);

  $picker.each(function () {
    var $p = $(this);

    if ($p.is('.js-pickDatePeriod')) {
      var selector = 'input:not([type="hidden"])';
      var $ipts = $(selector, $p);

      if ($ipts.length === 2) {
        $ipts.each(function (idx) {
          var $ipt = $(this);

          var method = void 0;

          if (idx === 0) {
            method = 'minDate';
          } else {
            method = 'maxDate';

            opts.useCurrent = false;
          }

          $ipt.datetimepicker(opts).on('dp.change', function (evt) {
            var $dt = $(this);
            var date = evt.date;

            $dt.siblings(selector).data('DateTimePicker')[method](date);
            $('input[name=\'' + $dt.attr('data-to') + '\']', $dt.closest('form')).val(moment(date).format());
          });
        });
      }
    }

    else {
        $p.datetimepicker(opts);
      }
  });
}

var field = Object.freeze({
	fill: fill$1,
	datepicker: datepicker,
	datetimepicker: datetimepicker
});

function generateUrlUtil(part) {
  return function (url) {
    return sliceUrlPart(part, url);
  };
}

var urlSearchUtil = generateUrlUtil('search');

var href = generateUrlUtil('href');

var protocol = generateUrlUtil('protocol');

var host = generateUrlUtil('host');

var hostname = generateUrlUtil('hostname');

var port = generateUrlUtil('port');

var pathname = generateUrlUtil('pathname');

var hash = generateUrlUtil('hash');

var username = generateUrlUtil('username');

var password = generateUrlUtil('password');

var origin = generateUrlUtil('origin');

function query(url, key) {
  var defaultUrl = window.location.href;
  var length = arguments.length;

  if (length === 1 && isString(url) && url.indexOf('http') === -1) {
    key = url;
    url = defaultUrl;
  }

  if (!isString(url)) {
    url = defaultUrl;
  }

  var jsonified = jsonifyQueryString(urlSearchUtil(url));

  return key == null ? jsonified : jsonified[key];
}



var url = Object.freeze({
	href: href,
	protocol: protocol,
	host: host,
	hostname: hostname,
	port: port,
	pathname: pathname,
	hash: hash,
	username: username,
	password: password,
	origin: origin,
	query: query,
	search: urlSearchUtil
});

setDefaults('table', TABLE_DEFAULTS);

function constructOperationColumn(col, opts) {
  var actions = opts.actions;
  var events = {};

  var formatter = void 0;

  if (opts.width) {
    col.width = opts.width;
  }

  if (isFunction(opts.formatter)) {
    formatter = opts.formatter;
  } else if (isFunction(actions)) {
    formatter = function formatter(val, row, idx) {
      return action(actions.apply(this, [row, idx]));
    };
  } else if (isArray(actions) && actions.length > 0) {
    var btns = [];

    eachItem(actions, function (btn) {
      btn = resolveTriggerOptionsSimply(btn);

      if (isPlainObject(btn)) {
        btn = resolveTriggerOptions(btn);

        if (isString(btn.action) && isFunction(btn.handler)) {
          var handler = btn.handler;

          events['click .js-' + btn.action] = function (evt, val, row, idx) {
            var returnValue = handler.apply(this, [evt, row, idx]);

            evt.stopPropagation();

            return returnValue;
          };

          delete btn.handler;
        }

        btns.push(btn);
      }
    });

    formatter = function formatter(val, row, idx) {
      var ctx = this;

      return action(map(btns, function (btn) {
        btn = clone(btn);

        if (isFunction(btn.text)) {
          btn.text = btn.text.apply(ctx, [row, idx]);
        }

        return btn;
      }));
    };
  }

  col.__handieAjaxOpts = opts.ajax;
  col.formatter = formatter;
  col.events = extendTarget(true, {}, opts.events, events);

  return col;
}

function resolveOperationColumn(tableOpts) {
  var cols = tableOpts.columns;
  var opts = tableOpts.operation;
  var defaultOpts = clone(getDefaults('table.operationColumn'));
  var newCols = [];

  var hasCheckboxOpt = false;
  var col = void 0;

  if (isArray(cols)) {
    eachItem(cols, function (c) {
      if (hasOwnProp('checkbox', c)) {
        hasCheckboxOpt = true;
      }

      if (c.field === defaultOpts.field) {
        tableOpts.__operationDefinedByColumns = true;

        col = c;
      } else {
        newCols.push(c);
      }
    });
  }

  if (!hasCheckboxOpt && isPlainObject(tableOpts.toolbar) && hasOwnProp('batch', tableOpts.toolbar)) {
    newCols.unshift({ checkbox: true });
  }

  if (col) {
    if (!col.title) {
      col.title = defaultOpts.text;
    }
  } else if (isPlainObject(opts)) {
    col = constructOperationColumn({ title: defaultOpts.text, field: defaultOpts.field }, opts);
  }

  return newCols.concat(col ? extendTarget(true, { events: defaultOpts.events }, col) : []);
}

function resolveTableClass(slim) {
  var classes = getDefaults('table.classes');

  if (slim === true) {
    classes = classes.split(' ').concat('Table--slim').join(' ');
  }

  return classes;
}

function resolveColumnOptions(cols, showRowNumber) {
  var temp = isArray(cols) ? cols.concat([]) : [];

  if (!isBoolean(showRowNumber)) {
    showRowNumber = getDefaults('table.showRowNumber');
  }

  if (showRowNumber === true) {
    temp.unshift({
      field: 'serialNumber',
      title: '序号',
      align: 'center',
      formatter: function formatter(val, row, idx) {
        return ++idx;
      }
    });
  }

  return map(temp, function (col) {
    var viewDetailOpts = col.viewDetail,
        rawFormatter = col.formatter;

    var dateTimeFormatter = col.dateTimeFormatter;

    if (isPlainObject(viewDetailOpts)) {
      col.formatter = function (val) {
        if (isFunction(rawFormatter)) {
          val = rawFormatter.apply(this, toArray$1(arguments));
        }

        return '<a href="javascript:void(0);" class="js-openDetailDialog">' + (val || '-') + '</a>';
      };

      col.events = extendTarget({}, col.events, {
        'click .js-openDetailDialog': function clickJsOpenDetailDialog(evt, val, row) {
          httpGetUtil$1(viewDetailOpts.url, viewDetailOpts.params(val, row), function (result$$1) {
            var $m = $('.js-viewDetail');

            if (isFunction(viewDetailOpts.handler)) {
              viewDetailOpts.handler.apply(null, [val, row, result$$1, $m]);
            } else {
              fill$1($m, result$$1);
            }

            $m.modal('show');
          });

          evt.stopPropagation();
        }
      });
    }

    else if (dateTimeFormatter) {
        col.formatter = function (val) {
          if (dateTimeFormatter === true) {
            dateTimeFormatter = 'YYYY-MM-DD HH:mm:ss';
          }

          return isString(dateTimeFormatter) && moment ? moment(val).format(dateTimeFormatter) : isFunction(dateTimeFormatter) ? dateTimeFormatter.call(this, val) : val;
        };
      }

    return col;
  });
}

function resolveTableOptions(opts) {
  var url = opts.url,
      ajaxOptions = opts.ajaxOptions;

  ajaxOptions = extendTarget(true, {}, $.fn.bootstrapTable.defaults.ajaxOptions, ajaxOptions);
  opts.columns = resolveColumnOptions(resolveOperationColumn(opts), opts.showRowNumber);

  if (!url) {
    url = ajaxOptions.url;

    delete ajaxOptions.url;
  }

  if (isFunction(url)) {
    var beforeSend = ajaxOptions.beforeSend;
    var urlMaker = url;

    url = 'AJAX_URL_PLACEHOLDER';

    ajaxOptions.beforeSend = function (jqXHR, ajaxSettings) {
      ajaxSettings.url = urlMaker(jsonifyQueryString(ajaxSettings.data || urlSearchUtil(ajaxSettings.url)));

      if (isFunction(beforeSend)) {
        return beforeSend.apply(null, [jqXHR, ajaxSettings]);
      }
    };
  }

  opts.slim = hasOwnProp('slim', opts) ? opts.slim === true : getDefaults('table.slim');
  opts.classes = resolveTableClass(opts.slim);

  if (isPlainObject(opts.operation) && !hasOwnProp('sticky', opts.operation)) {
    opts.operation.sticky = opts.slim ? true : getDefaults('table.operationColumn.sticky');
  }

  if (opts.slim) {

    if (!hasOwnProp('sticky', opts)) {
      opts.sticky = true;
    }

    opts.columns = map(opts.columns, function (col) {
      if (hasOwnProp('width', col)) {
        var colWidth = col.width,
            rawFormatter = col.formatter;

        col.formatter = function (val) {
          var width = 'auto';
          var content = val;

          if (isNumeric(colWidth)) {
            width = colWidth + 'px';
          } else if (isString(colWidth) && /^\d+(\.\d+)?(px|em|rem|%)$/.test(colWidth)) {
            width = colWidth;
          }

          if (isFunction(rawFormatter)) {
            content = rawFormatter.apply(this, toArray$1(arguments));
          }

          if (content == null) {
            content = hasOwnProp('undefinedText', opts) ? opts.undefinedText : $.fn.bootstrapTable.defaults.undefinedText;
          }

          return '<div style="width: ' + width + '; white-space: normal; word-break: break-all;">' + content + '</div>';
        };
      }

      return col;
    });
  } else if (opts.operation) {
    opts.operation.sticky = false;
  }

  return extendTarget(true, opts, { url: url, ajaxOptions: ajaxOptions });
}

function resizeTableContainer(evt) {
  var _evt$data = evt.data,
      stickyOpts = _evt$data.stickyOpts,
      tableInst = _evt$data.tableInst;

  var headerHeight = $('.Page-header').outerHeight();

  toggleTableStickyStatus(tableInst, evt.data.$container.offset().top - headerHeight <= stickyOpts.top, document.documentElement.clientHeight - headerHeight - stickyOpts.top - tableInst.$toolbar.outerHeight() - tableInst.$pagination.outerHeight());
}

function scrollFakeTableHeader(evt) {
  var tableInst = evt.data.tableInst;

  var $tableBody = $(this);
  var scrollLeft = $tableBody.scrollLeft();
  var selector = '.Table-container--alternative';

  $('> table', tableInst.$tableHeader).css('margin-left', '-' + scrollLeft + 'px');

  if (isOperationColumnSticky(tableInst.options) && tableInst.$tableContainer.hasClass('is-sticky')) {
    $(selector, tableInst.$tableBody).css('margin-right', tableInst.$tableContainer.hasClass('is-sticky') ? '-' + scrollLeft + 'px' : 0);
  }

  var $alternatives = $(selector, tableInst.$tableContainer);

  if ($tableBody.width() + scrollLeft === tableInst.$el.width()) {
    $alternatives.hide();
  } else {
    $alternatives.show();
  }
}

function initStickyTable($table, stickyOpts) {
  var tableInst = $table.data('bootstrap.table');
  var $container = tableInst.$container;

  if ($container.closest('.modal').length > 0) {
    return;
  }

  var tableId = $container.attr('id');

  $(window).on('resize.' + tableId, { $container: $container, tableInst: tableInst, stickyOpts: stickyOpts }, resizeTableContainer);
  $('.Page-content').on('scroll.' + tableId, { $container: $container, tableInst: tableInst, stickyOpts: stickyOpts }, resizeTableContainer);
}

function constructStickyColumn(evt) {
  var $table = $(this);

  var tableInst = $table.data('bootstrap.table');

  if (!tableInst) {
    return;
  }

  var columnField = getDefaults('table.operationColumn.field');

  var $tableHeader = tableInst.$tableHeader;
  var $tableBody = tableInst.$tableBody;
  var $column = $('[data-field=\'' + columnField + '\']', $table);

  var columnIndex = $('thead th', $table).index($column);
  var cls = 'Table-container--alternative';

  if (tableInst.options.sticky && $('.' + cls, $tableHeader).length === 0) {
    $tableHeader.append('<div class="' + cls + '"><table><thead><tr></tr></thead></table></div>').find('.' + cls + ' tr').append($('[data-field=\'' + columnField + '\']', $tableHeader).clone());
  }

  if ($('.' + cls, $tableBody).length === 0) {
    var classes = filter(tableInst.options.classes.split(' '), function (c) {
      return c !== 'table-hover';
    });

    $tableBody.append('<div class="' + cls + '"><table class="' + classes.join(" ") + '"><thead><tr></tr></thead><tbody></tbody></table></div>');
  }

  var $tableAlternative = $('.' + cls + ' table', $tableBody);
  var $tbodyRowsCopy = tableInst.$body.children().clone(true, true);

  $tbodyRowsCopy.each(function (idx) {
    var $row = $(this);
    var $cell = $('tr:eq(' + idx + ') td:eq(' + columnIndex + ')', tableInst.$body);
    var $cellCopy = $('td:eq(' + columnIndex + ')', $row);

    $cellCopy.width($cell.outerWidth());
    $cellCopy.height($cell.outerHeight());

    $('td:lt(' + columnIndex + ')', $row).remove();
  });

  $('thead tr', $tableAlternative).empty().append($column.clone(true, true));
  $('tbody', $tableAlternative).empty().append($tbodyRowsCopy);

  $tableAlternative.data('bootstrap.table', tableInst);
}

function init$2($table, opts) {
  if (isPlainObject($table)) {
    opts = $table;
    $table = null;
  }

  if (!$table) {
    $table = getDefaultTable();
  }

  opts = resolveTableOptions(opts);

  if (isOperationColumnSticky(opts)) {
    $table.on('post-body.bs.table', constructStickyColumn);
  }

  $table.on({
    'post-body.bs.table': function postBodyBsTable() {
      return initBootstrapTooltip($('[title]', $table));
    },
    'reset-view.bs.table \
      refresh-options.bs.table \
      refresh.bs.table': function resetViewBsTableRefreshOptionsBsTableRefreshBsTable() {
      return $('[title]', $table).tooltip('destroy');
    }
  });

  var _opts = opts,
      lazy = _opts.lazy,
      url = _opts.url,
      sticky = _opts.sticky;

  if (lazy === true) {
    delete opts.lazy;
    delete opts.url;
  }

  $table.bootstrapTable(opts);

  var tableId = generateRandomId('table');
  var tableInst = $table.data('bootstrap.table');

  tableInst.$container.attr('id', tableId);

  if (lazy === true) {
    tableInst.options.url = url;
  }

  if (opts.slim) {
    tableInst.$tableBody.on('scroll.' + tableId, { tableInst: tableInst }, scrollFakeTableHeader);
  }

  if (sticky) {
    var defaultStickyOpts = { top: 15 };

    var stickyOpts = void 0;

    if (sticky === true) {
      stickyOpts = defaultStickyOpts;
    } else if (isPlainObject(sticky)) {
      stickyOpts = extendTarget(true, defaultStickyOpts, sticky);
    }

    if (isPlainObject(stickyOpts)) {
      initStickyTable($table, stickyOpts);
    }
  }
}



var table = Object.freeze({
	init: init$2,
	columns: resolveColumnOptions,
	refresh: refreshTable
});

function unwrapExports(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var build = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, '__esModule', { value: true });

    function strip(num, precision) {
        if (precision === void 0) {
            precision = 12;
        }
        return +parseFloat(num.toPrecision(precision));
    }

    function digitLength(num) {

        var eSplit = num.toString().split(/[eE]/);
        var len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
        return len > 0 ? len : 0;
    }

    function float2Fixed(num) {
        if (num.toString().indexOf('e') === -1) {
            return Number(num.toString().replace('.', ''));
        }
        var dLen = digitLength(num);
        return dLen > 0 ? strip(num * Math.pow(10, dLen)) : num;
    }

    function checkBoundary(num) {
        if (_boundaryCheckingState) {
            if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
                console.warn(num + " is beyond boundary when transfer to integer, the results may not be accurate");
            }
        }
    }

    function times(num1, num2) {
        var others = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            others[_i - 2] = arguments[_i];
        }
        if (others.length > 0) {
            return times.apply(void 0, [times(num1, num2), others[0]].concat(others.slice(1)));
        }
        var num1Changed = float2Fixed(num1);
        var num2Changed = float2Fixed(num2);
        var baseNum = digitLength(num1) + digitLength(num2);
        var leftValue = num1Changed * num2Changed;
        checkBoundary(leftValue);
        return leftValue / Math.pow(10, baseNum);
    }

    function plus(num1, num2) {
        var others = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            others[_i - 2] = arguments[_i];
        }
        if (others.length > 0) {
            return plus.apply(void 0, [plus(num1, num2), others[0]].concat(others.slice(1)));
        }
        var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
        return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
    }

    function minus(num1, num2) {
        var others = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            others[_i - 2] = arguments[_i];
        }
        if (others.length > 0) {
            return minus.apply(void 0, [minus(num1, num2), others[0]].concat(others.slice(1)));
        }
        var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
        return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
    }

    function divide(num1, num2) {
        var others = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            others[_i - 2] = arguments[_i];
        }
        if (others.length > 0) {
            return divide.apply(void 0, [divide(num1, num2), others[0]].concat(others.slice(1)));
        }
        var num1Changed = float2Fixed(num1);
        var num2Changed = float2Fixed(num2);
        checkBoundary(num1Changed);
        checkBoundary(num2Changed);
        return times(num1Changed / num2Changed, Math.pow(10, digitLength(num2) - digitLength(num1)));
    }

    function round(num, ratio) {
        var base = Math.pow(10, ratio);
        return divide(Math.round(times(num, base)), base);
    }
    var _boundaryCheckingState = true;

    function enableBoundaryChecking(flag) {
        if (flag === void 0) {
            flag = true;
        }
        _boundaryCheckingState = flag;
    }
    var index = { strip: strip, plus: plus, minus: minus, times: times, divide: divide, round: round, digitLength: digitLength, float2Fixed: float2Fixed, enableBoundaryChecking: enableBoundaryChecking };

    exports.strip = strip;
    exports.plus = plus;
    exports.minus = minus;
    exports.times = times;
    exports.divide = divide;
    exports.round = round;
    exports.digitLength = digitLength;
    exports.float2Fixed = float2Fixed;
    exports.enableBoundaryChecking = enableBoundaryChecking;
    exports['default'] = index;
});

unwrapExports(build);
var build_1 = build.strip;
var build_2 = build.plus;
var build_3 = build.minus;
var build_4 = build.times;
var build_5 = build.divide;
var build_6 = build.round;
var build_7 = build.digitLength;
var build_8 = build.float2Fixed;
var build_9 = build.enableBoundaryChecking;



var calc = Object.freeze({
	plus: build_2,
	minus: build_3,
	multiply: build_4,
	divided: build_5
});

function filterUnchanged(data, raw, excluded) {
  var filtered = {};

  if (isPlainObject(data)) {
    if (isPlainObject(raw)) {
      if (!isArray(excluded)) {
        excluded = [];
      }

      eachItem(data, function (k, v) {
        if (excluded.length > 0 && includes(k, excluded) || v !== raw[k]) {
          filtered[k] = v;
        }
      });
    } else {
      filtered = data;
    }
  }

  return filtered;
}



var data = Object.freeze({
	changed: filterUnchanged
});

var NOTIFICATION_STORAGE_KEY = 'MUU:NotificationCount';

var noticeTotalCount = 0;

function resolveCounterDom() {
  var $notice = $('.Action--notification');

  if ($notice.length === 0) {
    return;
  }

  var $counter = $('.Notification-counter', $notice);

  if ($counter.length === 0) {
    $counter = $('<span class="Notification-counter"></span>');

    $('.Action-trigger', $notice).append($counter);
  }

  return $counter;
}

function resetNotificationCounter() {
  var $counter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : resolveCounterDom();

  noticeTotalCount = 0;

  if ($counter) {
    $counter.remove();
  }

  if (supportLocalStorage()) {
    localStorage.removeItem(NOTIFICATION_STORAGE_KEY);
  }
}

function countNotification(count) {
  noticeTotalCount += count;

  var $counter = resolveCounterDom();

  if (noticeTotalCount === 0) {
    resetNotificationCounter($counter);
  } else {
    if ($counter) {
      $counter.text(noticeTotalCount > 99 ? '99+' : noticeTotalCount);
    }

    if (supportLocalStorage()) {
      localStorage.setItem(NOTIFICATION_STORAGE_KEY, noticeTotalCount);
    }
  }
}

function initNotificationCounter() {
  if (supportLocalStorage()) {
    var count = localStorage.getItem(NOTIFICATION_STORAGE_KEY);

    if (count && isNumeric(count)) {
      countNotification(count * 1);
    }
  }
}

function getNoticeTotalCount() {
  return noticeTotalCount;
}

var NOTIFICATION_DEFAULTS = {
  layer: {
    align: 'center',
    alignClasses: {
      left: 'u-textLeft',
      center: 'u-textCenter',
      right: 'u-textRight'
    },
    size: 'normal',
    icons: {
      info: 'fa-info-circle',
      success: 'fa-check-circle',
      warning: 'fa-warning',
      danger: 'fa-warning'
    }
  }
};

setDefaults('notification', NOTIFICATION_DEFAULTS);

var noticeLayerTypes = ['info', 'success', 'warning', 'danger'];

function isPermissionGranted(permission) {
  return permission === 'granted';
}

function spawnNotification(opts) {
  var copy = clone(opts);
  var events = ['click', 'error', 'close', 'show'];

  delete opts.title;

  eachItem(events, function (evtName) {
    delete opts['on' + capitalize(evtName)];
  });

  var notification = new Notification(copy.title, opts);

  eachItem(events, function (evtName) {
    var handler = copy['on' + capitalize(evtName)];

    if (isFunction(handler)) {
      notification['on' + evtName] = handler;
    }
  });

  return notification;
}

function showNoticeLayer(text, type, forceOver) {
  var opts = getDefaults('notification.layer');

  var $layer = $('.Page-body > .Layer--notice');
  var cls = [];

  if ($layer.length === 0) {
    cls.push('Layer--notice');

    if (opts.size !== 'normal' && includes(opts.size, ['medium', 'large'])) {
      cls.push('is-' + opts.size);
    }

    $layer = $('<div class="' + cls.join(' ') + '"><i class="fa fa-fw"></i><span></span></div>');

    if (opts.alignClasses[opts.align]) {
      $layer.addClass(opts.alignClasses[opts.align]);
    }

    $('.Page-body').prepend($layer);

    $layer.on('webkitAnimationEnd animationend', function () {
      return $layer.removeClass('is-shown');
    });
  } else {
    $layer.removeClass(map(['bg', 'text'], function (p) {
      return map(noticeLayerTypes, function (t) {
        return p + '-' + t;
      });
    }).concat('is-shown', 'is-over').join(' '));
    $('.fa', $layer).removeClass(map(noticeLayerTypes, function (t) {
      return opts.icons[t];
    }).join(' '));
  }

  if (!includes(type, noticeLayerTypes)) {
    type = 'info';
  }

  $('.fa', $layer).addClass(opts.icons[type]);
  $('span', $layer).html(text);

  cls = ['bg-' + type, 'text-' + type, 'is-shown'];

  if (forceOver === true || $('.modal:visible').length) {
    cls.push('is-over');
  }

  $layer.addClass(cls.join(' '));
}

function generateNoticeUtil(type) {
  return function (text, forceOver) {
    return showNoticeLayer(text, type, forceOver);
  };
}

var info = generateNoticeUtil('info');

var success = generateNoticeUtil('success');

var warning = generateNoticeUtil('warning');

var danger = generateNoticeUtil('danger');

function show(opts) {
  if (isString(opts)) {
    opts = { title: opts };
  }

  if (!(supportWebNotification() && isPlainObject(opts) && hasOwnProp('title', opts))) {
    return;
  }

  var notification = void 0;

  if (isPermissionGranted(Notification.permission)) {
    notification = spawnNotification(opts);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (isPermissionGranted(permission)) {
        spawnNotification(opts);
      }
    });
  }

  return notification;
}

function count(count) {
  var totalCount = getNoticeTotalCount();

  if (isNumeric(count) && (count * 1 > 0 || totalCount !== 0)) {
    countNotification(count * 1);
  }

  return totalCount;
}

function clear() {
  resetNotificationCounter();
}

var notice = Object.freeze({
	info: info,
	success: success,
	warning: warning,
	danger: danger,
	show: show,
	count: count,
	clear: clear
});

function copyText(content) {
  var ipt = document.createElement('input');

  ipt.setAttribute('value', content);
  document.body.appendChild(ipt);
  ipt.select();
  document.execCommand('copy');
  document.body.removeChild(ipt);

  return content;
}

function copy(content, keepSelected) {
  var $el = void 0;

  if (!isString(content)) {
    $el = $(content);

    var el = $el.get(0);

    if (el == null || el.nodeType !== 1) {
      return;
    }

    if (includes(el.tagName.toLowerCase(), ['input', 'textarea'])) {
      content = $el.val();
    } else {
      content = $el.text();
    }
  }

  copyText(content);

  if ($el && keepSelected === true) {
    $el.select();
  }

  return content;
}



var text = Object.freeze({
	copy: copy
});

function setImageItemUrl($item, url) {
  $('a', $item).attr({ 'href': url || 'javascript:void(0);', 'data-file-ext': resolveFileExtension(url) });
  $('img', $item).attr('src', url);
}

var UPLOADER_DEFAULTS = {
  selector: '.js-uploadImage',
  limit: 0,
  draggable: true,
  extension: {
    image: 'jpeg,jpg,png,gif'
  }
};

setDefaults('uploader', UPLOADER_DEFAULTS);

function stashQiniuUploaderEvents(evts) {
  var result = {
    qiniu: {},
    stashed: {}
  };

  if (evts) {
    eachItem(['FilesAdded', 'BeforeUpload', 'FileUploaded'], function (name) {
      if (isFunction(evts[name])) {
        result.stashed[name] = evts[name];

        delete evts[name];
      }
    });
  }

  result.qiniu = evts;

  return result;
}

function resolveUploader(settings, opts) {
  settings = extendTarget(true, { multi_selection: false }, settings);

  var isDynamicUrl = isFunction(settings.url);

  if (isDynamicUrl) {
    settings.url = 'dynamicUrlPlaceholder';
  }

  var uploader = void 0;

  if (settings.uptoken) {
    if (!settings.runtimes) {
      settings.runtimes = 'html5,flash,html4';
    }

    var processed = stashQiniuUploaderEvents(settings.init);

    settings.init = processed.qiniu;

    uploader = Qiniu.uploader(settings);

    uploader.__handie = processed.stashed;

    uploader.bind('FileUploaded', function (up, file, result) {
      return setImageItemUrl($('[data-file-id="' + file.id + '"]'), '' + up.getOption('domain') + JSON.parse(result.response).key);
    });
  } else {
    uploader = new plupload.Uploader(settings);

    uploader.bind('FileUploaded', function (up, file, result) {
      if (isFunction(opts.getImageUrl)) {
        setImageItemUrl($('[data-file-id="' + file.id + '"]'), opts.getImageUrl(JSON.parse(result.response)));
      }
    });

    uploader.init();
  }

  uploader.bind('FilesAdded', function (up, files) {
    if (isDynamicUrl) {
      uploader.setOption('url', settings.url());
    }
  });

  uploader.bind('BeforeUpload', function (up, file) {
    return $('[data-file-id="' + file.id + '"]').addClass('is-uploading');
  });

  uploader.bind('FileUploaded', function (up, file) {
    var $item = $('[data-file-id="' + file.id + '"]');

    $item.removeClass('is-uploading');

    if (/^image\/[^\/]+/gi.test(file.type)) {
      $item.removeClass('is-nongraphic');
    } else {
      $item.addClass('is-nongraphic');
    }
  });

  return uploader;
}

function initSingleImageUploader(settings, opts) {
  var uploader = resolveUploader(settings, opts);

  uploader.bind('FilesAdded', function (up, files) {
    var $item = $(settings.browse_button).siblings('.ImageItem');
    var file = files[0];

    setImageItemUrl($item, '');

    $item.removeClass('is-empty').attr('data-file-id', file.id);
  });

  return uploader;
}

function initMultipleImageUploader(settings, opts) {
  var uploader = resolveUploader(settings, opts);

  uploader.bind('FilesAdded', function (up, files) {
    var $btn = $(settings.browse_button);
    var $el = $btn.closest('.ImageList').parent();

    eachItem(files, function (file) {
      insertImageItem({
        $btn: $btn,
        $el: $el,
        text: file.name,
        column: opts.column,
        max: opts.limit,
        removable: true,
        callback: function callback($newCol, $btnCol) {
          $('.ImageItem', $newCol).attr('data-file-id', file.id);

          if (isFunction(opts.imageItemAdded)) {
            opts.imageItemAdded.call(null, $newCol, $btnCol);
          }
        }
      });
    });
  });

  return uploader;
}

function image($btn, opts) {
  var initializer = void 0,
      uploader = void 0;

  $btn = $($btn);
  opts = extendTarget(true, {
    limit: getDefaults('uploader.limit'),
    draggable: getDefaults('uploader.draggable'),

    settings: null
  }, opts);

  if (isPlainObject(opts.settings)) {
    var defaultSettings = {
      browse_button: $btn.get(0),
      filters: {
        mime_types: [{
          title: '图片文件',
          extensions: getDefaults('uploader.extension.image')
        }]
      }
    };

    if (opts.draggable === true) {
      defaultSettings.drop_element = $btn.get(0);
    }

    if ($btn.siblings('.ImageItem').length > 0) {
      initializer = initSingleImageUploader;
      opts.settings.multi_selection = false;
    } else {
      initializer = initMultipleImageUploader;
    }

    uploader = initializer(extendTarget(true, defaultSettings, opts.settings), opts);

    if (hasOwnProp('__handie', uploader)) {
      eachItem(keys(uploader.__handie), function (name) {
        return uploader.bind(name, uploader.__handie[name]);
      });

      delete uploader.__handie;
    }
  }

  return uploader;
}

var upload = Object.freeze({
	image: image
});

function resolveAlias(key) {
  return key === 'ajax' ? 'http' : key;
}

function setDefaults$1(settings) {
  if (isPlainObject(settings)) {
    eachItem(settings, function (v, k) {
      return setDefaults(resolveAlias(k), v);
    });
  }
}

function initDefaults() {
  eachItem([{
    dependency: supportBootstrapModal,
    initializer: function initializer() {

      extendTarget($.fn.modal.Constructor.DEFAULTS, {
        backdrop: getDefaults('dialog.backdrop'),
        keyboard: getDefaults('dialog.closeOnEsc')
      });
    }
  }, {
    dependency: supportBootstrapTable,
    initializer: function initializer() {

      extendTarget($.fn.bootstrapTable.defaults, {
        classes: getDefaults('table.classes'),
        iconsPrefix: "fa",
        icons: {
          refresh: "fa-refresh",
          toggle: "fa-list-alt",
          columns: "fa-th",
          detailOpen: "fa-plus",
          detailClose: "fa-minus"
        },
        iconSize: "sm",
        sidePagination: "server",
        pagination: true,
        pageSize: 20,

        pageList: [],
        cache: false,
        queryParams: function queryParams(params) {
          return jsonifyFormData(this.__$search.serializeArray().concat({
            name: 'pageSize',
            value: this.pageSize
          }, {
            name: 'pageNo',
            value: this.pageNumber
          }, params.sort == null ? [] : [{
            name: getDefaults('table.keys.sort'),
            value: params.sort
          }, {
            name: getDefaults('table.keys.order'),
            value: params.order
          }]), function (jsonified) {
            eachItem(keys(jsonified), function (k) {
              return jsonified[k] = jsonified[k].toString();
            });

            return jsonified;
          });
        },
        responseHandler: function responseHandler(res) {
          return getDefaults('table.responseHandler').call(this, res);
        },
        onPostBody: function onPostBody(data) {
          $(".detail-icon").closest("td").addClass("u-alignMiddle u-textCenter");
        }
      });

      extendTarget($.fn.bootstrapTable.columnDefaults, { valign: "middle" });
    }
  }, {
    dependency: supportBootstrapDateTime,
    initializer: function initializer() {
      extendTarget(true, $.fn.datetimepicker.defaults, {
        locale: "zh-CN",
        icons: {
          time: "fa fa-clock-o",
          date: "fa fa-calendar",
          up: "fa fa-chevron-up",
          down: "fa fa-chevron-down",
          previous: "fa fa-chevron-left",
          next: "fa fa-chevron-right",
          today: "fa fa-crosshairs",
          clear: "fa fa-trash",
          close: "fa fa-remove"
        },
        showTodayButton: true
      });
    }
  }, {
    dependency: supportSelect2,
    initializer: function initializer() {

      eachItem({
        containerCssClass: "handie-Select2-container",
        dropdownCssClass: "handie-Select2-dropdown",
        minimumResultsForSearch: "Infinity"
      }, function (v, k) {
        $.fn.select2.defaults.set(k, v);
      });
    }
  }, {
    dependency: supportH5fx,
    initializer: function initializer() {

      H5F.rules({
        MOBILE: {
          rule: /^(0|86|17951)?(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$/,
          message: "NOT_A_MOBILE"
        }
      });

      H5F.errors({
        UNKNOWN_INPUT_TYPE: "{{LABEL}}为未知输入框类型",
        COULD_NOT_BE_EMPTY: "{{LABEL}}不能为空",
        LENGTH_SMALLER_THAN_MINIMUM: "{{LABEL}}应为{{MINLENGTH}}～{{MAXLENGTH}}个字符",
        LENGTH_BIGGER_THAN_MAXIMUM: "{{LABEL}}应为{{MINLENGTH}}～{{MAXLENGTH}}个字符",
        INVALID_VALUE: "{{LABEL}}不符合要求的格式",
        NOT_AN_ABSOLUTE_URL: "{{LABEL}}不是一个 URL 地址",
        NOT_AN_EMAIL: "{{LABEL}}不是一个邮箱",
        NOT_A_NUMBER: "{{LABEL}}不是一个数字",
        UNDERFLOW: "{{LABEL}}不能小于{{MIN}}",
        OVERFLOW: "{{LABEL}}不能大于{{MAX}}",
        DIFFERENT_VALUE: "{{LABEL}}所输入的字符要与{{ASSOCIATE_LABEL}}保持一致",
        AT_LEAST_CHOOSE_ONE: "请从{{LABEL}}中选择一项",
        SHOOLD_BE_CHOSEN: "请选中{{UNIT_LABEL}}",
        SHOOLD_CHOOSE_AN_OPTION: "必须选择{{LABEL}}",
        NOT_A_MOBILE: "{{LABEL}}不符合手机号码格式"
      });
    }
  }, {
    dependency: supportMomentJs,
    initializer: function initializer() {

      moment.locale("zh-CN");
    }
  }], function (lib) {
    if (lib.dependency()) {
      lib.initializer();
    }
  });
}

function initDialogs() {
  if (!supportBootstrapModal()) {
    return;
  }

  $(document).on("shown.bs.modal", ".modal", function () {
    var $m = $(this);
    var $dlg = $(".modal-dialog", $m);
    var $cnt = $(".modal-content", $m);

    levelUp($m);

    if ($dlg.height() > $m.height()) {
      $m.addClass("is-scrollable");
      $cnt.css("height", $m.height() - parseFloat($dlg.css("margin-top"), 10) - parseFloat($dlg.css("margin-bottom"), 10) - parseFloat($cnt.css("border-top-width"), 10) - parseFloat($cnt.css("border-bottom-width"), 10));
    }
  });

  $(document).on("hidden.bs.modal", ".modal", function () {
    var $m = $(this);

    levelDown($m);

    if ($m.hasClass("is-scrollable")) {
      $m.removeClass("is-scrollable");
      $(".modal-content", $m).css("height", "auto");
    }
  });
}

function initSelects() {
  if (!supportSelect2()) {
    return;
  }

  $("select").select2();

  $(".modal select").on("select2:open", function () {
    $(this).data("select2").$dropdown.css("z-index", $(this).closest(".modal").css("z-index"));
  });
}

$(document).ready(function () {
  initDefaults();
  initDialogs();
  initSelects();
  initNotificationCounter();

  $("input[type='number']").on("mousewheel", function (e) {
    e.preventDefault();
  });

  $("body").on("click", ".js-removeUploadedImage", function () {
    var $btn = $(this);
    var $item = $btn.closest(".ImageItem");

    $("[data-file-ext]", $item).removeAttr("data-file-ext");
    $item.removeClass("is-nongraphic");

    if ($item.siblings("button.ImageItem--add").length) {
      $item.addClass("is-empty").removeAttr("data-file-id");

      setImageItemUrl($item, "");
    } else {
      moveImageItemsForward($item);
    }
  });
});

window.handie = {
  setDefaults: setDefaults$1, set: setBizData, get: getBizData, alert: alertMessage,
  http: http$1, socket: socket,
  table: table, dialog: dialog, form: form, field: field, select: select,
  generate: generate, text: text, calc: calc,
  data: data, upload: upload, url: url, notice: notice,

  ajax: http$1,
  calculate: calc
};

})));
