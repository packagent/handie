/*!
 * Handie-jquery v1.0.4
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

function isUrl(target) {
  return (/^((http(s)?\:)?\/\/|\/[^\/]+).+/i.test(target)
  );
}

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

function getMoveDigit(a, b) {
  var _a = void 0,
      _b = void 0,
      la = void 0,
      lb = void 0;

  a = a.toString(10);
  b = b.toString(10);

  _a = a.split('.');
  _b = b.split('.');

  la = _a.length === 2 ? _a[1].length : 0;
  lb = _b.length === 2 ? _b[1].length : 0;

  return Math.max(la, lb);
}

function move2Right(num, digit) {
  var str = void 0,
      _num = void 0;

  if (digit === 0) {
    return num;
  }

  num = num.toString(10);
  _num = num.split('.');
  str = _num[1] ? _num[1] : '';
  _num = _num[0];

  for (var i = 0; i < digit; i++) {
    _num += str[i] ? str[i] : '0';
  }

  return _num * 1;
}

function move2Left(num, digit) {
  if (digit === 0) {
    return num;
  }

  var arr = void 0,
      len = void 0;

  num = num.toString();
  arr = num.split('.');

  if (arr.length === 2) {
    digit += arr[1].length;
    num = num.replace('.', '');
  }

  arr = num.split('');
  len = num.length;

  for (var i = 0; i < digit - len; i++) {
    arr.unshift('0');
  }

  arr.splice(arr.length - digit, 0, '.');

  return arr.join('') * 1;
}

function plus(a, b) {
  var d = getMoveDigit(a, b);

  return move2Left(move2Right(a, d) + move2Right(b, d), d);
}

function minus(a, b) {
  var d = getMoveDigit(a, b);

  return move2Left(move2Right(a, d) - move2Right(b, d), d);
}

function multiply(a, b) {
  var d = getMoveDigit(a, b);

  return move2Left(move2Right(a, d) * move2Right(b, d), d * 2);
}

function divided(a, b) {
  var d = getMoveDigit(a, b);

  return move2Right(a, d) / move2Right(b, d);
}



var calc = Object.freeze({
	plus: plus,
	minus: minus,
	multiply: multiply,
	divided: divided
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

var STORAGE_KEY = {
  IMAGE_ITEM_MAX: "handie.imageItemMax"
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

window.handie = {
  setDefaults: setDefaults$1, set: setBizData, get: getBizData,
  http: http$1, socket: socket,
  generate: generate, text: text, calc: calc,
  data: data, url: url,

  ajax: http$1,
  calculate: calc
};

})));
