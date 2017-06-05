require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = clamp

function clamp(value, min, max) {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value)
}

},{}],2:[function(require,module,exports){
;(function(commonjs){
  // Blacklist common values.
  var BLACKLIST = [
    "00000000000000",
    "11111111111111",
    "22222222222222",
    "33333333333333",
    "44444444444444",
    "55555555555555",
    "66666666666666",
    "77777777777777",
    "88888888888888",
    "99999999999999"
  ];

  var STRICT_STRIP_REGEX = /[-\/.]/g;
  var LOOSE_STRIP_REGEX = /[^\d]/g;

  var verifierDigit = function(numbers) {
    var index = 2;
    var reverse = numbers.split("").reduce(function(buffer, number) {
      return [parseInt(number, 10)].concat(buffer);
    }, []);

    var sum = reverse.reduce(function(buffer, number) {
      buffer += number * index;
      index = (index === 9 ? 2 : index + 1);
      return buffer;
    }, 0);

    var mod = sum % 11;
    return (mod < 2 ? 0 : 11 - mod);
  };

  var CNPJ = {};

  CNPJ.format = function(number) {
    return this.strip(number).replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  };

  CNPJ.strip = function(number, strict) {
    var regex = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
    return (number || "").toString().replace(regex, "");
  };

  CNPJ.isValid = function(number, strict) {
    var stripped = this.strip(number, strict);

    // CNPJ must be defined
    if (!stripped) { return false; }

    // CNPJ must have 14 chars
    if (stripped.length !== 14) { return false; }

    // CNPJ can't be blacklisted
    if (BLACKLIST.indexOf(stripped) >= 0) { return false; }

    var numbers = stripped.substr(0, 12);
    numbers += verifierDigit(numbers);
    numbers += verifierDigit(numbers);

    return numbers.substr(-2) === stripped.substr(-2);
  };

  CNPJ.generate = function(formatted) {
    var numbers = "";

    for (var i = 0; i < 12; i++) {
      numbers += Math.floor(Math.random() * 9);
    }

    numbers += verifierDigit(numbers);
    numbers += verifierDigit(numbers);

    return (formatted ? this.format(numbers) : numbers);
  };

  if (commonjs) {
    module.exports = CNPJ;
  } else {
    window.CNPJ = CNPJ;
  }
})(typeof(exports) !== "undefined");

},{}],3:[function(require,module,exports){
;(function(commonjs){
  // Blacklist common values.
  var BLACKLIST = [
    "00000000000",
    "11111111111",
    "22222222222",
    "33333333333",
    "44444444444",
    "55555555555",
    "66666666666",
    "77777777777",
    "88888888888",
    "99999999999",
    "12345678909"
  ];

  var STRICT_STRIP_REGEX = /[.-]/g;
  var LOOSE_STRIP_REGEX = /[^\d]/g;

  var verifierDigit = function(numbers) {
    numbers = numbers
      .split("")
      .map(function(number){ return parseInt(number, 10); })
    ;

    var modulus = numbers.length + 1;

    var multiplied = numbers.map(function(number, index) {
      return number * (modulus - index);
    });

    var mod = multiplied.reduce(function(buffer, number){
      return buffer + number;
    }) % 11;

    return (mod < 2 ? 0 : 11 - mod);
  };

  var CPF = {};

  CPF.format = function(number) {
    return this.strip(number).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  };

  CPF.strip = function(number, strict) {
    var regex = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
    return (number || "").toString().replace(regex, "");
  };

  CPF.isValid = function(number, strict) {
    var stripped = this.strip(number, strict);

    // CPF must be defined
    if (!stripped) { return false; }

    // CPF must have 11 chars
    if (stripped.length !== 11) { return false; }

    // CPF can't be blacklisted
    if (BLACKLIST.indexOf(stripped) >= 0) { return false; }

    var numbers = stripped.substr(0, 9);
    numbers += verifierDigit(numbers);
    numbers += verifierDigit(numbers);

    return numbers.substr(-2) === stripped.substr(-2);
  };

  CPF.generate = function(formatted) {
    var numbers = "";

    for (var i = 0; i < 9; i++) {
      numbers += Math.floor(Math.random() * 9);
    }

    numbers += verifierDigit(numbers);
    numbers += verifierDigit(numbers);

    return (formatted ? this.format(numbers) : numbers);
  };

  if (commonjs) {
    module.exports = CPF;
  } else {
    window.CPF = CPF;
  }
})(typeof(exports) !== "undefined");

},{}],4:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function () {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var list = [];
  var api = _extends({ on: on, off: off, emit: emit }, obj);

  function on(name, fn) {
    list.push({ name: name, fn: fn });
  }

  function off(name) {
    var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    list.forEach(function (e, i) {
      /* istanbul ignore if */
      if (e.name === name && e.fn === fn) {
        list.splice(i, 1);
      }

      /* istanbul ignore if */
      if (e.name === name && !fn) {
        list.splice(i, 1);
      }
    });
  }

  function emit(name) {
    var _this = this;

    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    list.forEach(function (e) {
      /* istanbul ignore next */
      if (e && e.name === name && typeof e.fn === 'function') {
        e.fn.apply(_this, args);
      }
    });
  }

  return api;
};
},{}],5:[function(require,module,exports){
'use strict';

var isArray    = require('is-array');
var isWindow   = require('is-window');
var isFunction = require('is-function');


module.exports = function (obj) {

  if (!obj) {
    return false;
  }

  if (isArray(obj)) {
    return true;
  }

  if (isFunction(obj) || isWindow(obj)) {
    return false;
  }

  obj = Object(obj);

  var length = 'length' in obj && obj.length;

  if (obj.nodeType === 1 && length) {
    return true;
  }

  return length === 0 ||
    typeof length === 'number' && length > 0 && ( length - 1 ) in obj;
};

},{"is-array":6,"is-function":7,"is-window":11}],6:[function(require,module,exports){

/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = isArray || function (val) {
  return !! val && '[object Array]' == str.call(val);
};

},{}],7:[function(require,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],8:[function(require,module,exports){
'use strict';

module.exports = function (obj) {

  return obj == null;
};

},{}],9:[function(require,module,exports){
"use strict";

module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};

},{}],10:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') { return false; }
		return symStringRegex.test(symToStr.call(value));
	};
	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') { return true; }
		if (toStr.call(value) !== '[object Symbol]') { return false; }
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {
	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false;
	};
}

},{}],11:[function(require,module,exports){
'use strict';

module.exports = function (obj) {

  if (obj == null) {
    return false;
  }

  var o = Object(obj);

  return o === o.window;
};

},{}],12:[function(require,module,exports){
'use strict';

module.exports = 4294967295;

},{}],13:[function(require,module,exports){
'use strict';

module.exports = 9007199254740991;

},{}],14:[function(require,module,exports){
'use strict';

var isArrayLike = require('is-array-like');
var randomIndex = require('random-index');

module.exports = function (arr) {

  if (!arr || !isArrayLike(arr)) {
    return arr;
  }

  var length = arr.length;
  if (!length) {
    return undefined;
  }

  return arr[randomIndex({ max: length - 1 })];
};

},{"is-array-like":5,"random-index":17}],15:[function(require,module,exports){
"use strict";

/* global module */

module.exports = function () {
  var que = [];

  return {
    append: function append(e) {
      return que.push(e);
    },
    prepend: function prepend(e) {
      return que.unshift(e);
    },

    pop: function pop() {
      return que.pop();
    },
    shift: function shift() {
      return que.shift();
    },

    first: function first() {
      return que[0];
    },
    last: function last() {
      return que.slice(-1)[0];
    },

    all: function all() {
      return que;
    },
    length: function length() {
      return que.length;
    }
  };
};
},{}],16:[function(require,module,exports){
'use strict';

var nil = require('is-nil');

module.exports = function (options) {

  if (nil(options) || nil(options.likelihood)) {
    return Math.random() >= 0.5;
  }

  return Math.random() * 100 < options.likelihood;
};

},{"is-nil":8}],17:[function(require,module,exports){
'use strict';

var randomNatural  = require('random-natural');
var MAX_ARR_LENGTH = require('max-array-length');

var fixme = randomNatural.fixme;

module.exports = function (options) {

  if (options) {
    if (!options.inspected) {
      options.min = fixme(options.min, 0, MAX_ARR_LENGTH, true);
      options.max = fixme(options.max, 0, MAX_ARR_LENGTH, false);
    }
  } else {
    options = {
      min: 0,
      max: MAX_ARR_LENGTH
    };
  }

  options.inspected = true;

  return randomNatural(options);
};

},{"max-array-length":12,"random-natural":"random-natural"}],18:[function(require,module,exports){
'use strict';

var clamp        = require('clamp');
var toInteger    = require('to-integer');
var MAX_SAFE_INT = require('max-safe-int');
var MIN_SAFE_INT = -MAX_SAFE_INT;

function fixme(val, min, max, isMin) {

  if (typeof val !== 'number') {
    val = toInteger(val);
  }

  if (isNaN(val) || !isFinite(val)) {
    return isMin ? min : max;
  }

  return clamp(val, min, max);
}

module.exports = function (options) {

  if (options) {
    // for speed up
    if (!options.inspected) {
      options.min = fixme(options.min, MIN_SAFE_INT, MAX_SAFE_INT, true);
      options.max = fixme(options.max, MIN_SAFE_INT, MAX_SAFE_INT, false);
    }
  } else {
    options = {
      min: MIN_SAFE_INT,
      max: MAX_SAFE_INT
    };
  }

  var min = options.min;
  var max = options.max;

  // swap to variables
  // ref: http://stackoverflow.com/a/16201688
  if (min > max) {
    min = min ^ max;
    max = min ^ max;
    min = min ^ max;
  }

  return Math.round(Math.random() * (max - min)) + min;
};

module.exports.fixme = fixme;

},{"clamp":1,"max-safe-int":13,"to-integer":20}],19:[function(require,module,exports){
'use strict';

var _quek = require('quek');

var _quek2 = _interopRequireDefault(_quek);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
  var quek = (0, _quek2.default)();
  var api = {};

  api.then = function (fn) {
    /* istanbul ignore else */
    if (fn && typeof fn === 'function') {
      quek.append({
        fn: fn,
        lock: false
      });
    }

    next(quek.first());

    return api;
  };

  return api;

  function next(el) {
    if (el && !el.lock) {
      el.lock = true;
      el.fn(done);
    }
  }

  /* istanbul ignore next */
  function done() {
    var el = quek.first();

    if (el && el.lock) {
      quek.shift();
      next(quek.first());
    }
  }
}; /* global module */
},{"quek":15}],20:[function(require,module,exports){
'use strict';

var isNil      = require('is-nil');
var isSymbol   = require('is-symbol');
var isObject   = require('is-object');
var isFunction = require('is-function');

var NAN = 0 / 0;

module.exports = function (value) {

  if (isNil(value)) {
    return 0;
  }

  var type = typeof value;

  if (type === 'number') {
    return value;
  } else if (type === 'boolean') {
    return value ? 1 : 0;
  }

  if (isSymbol(value)) {
    return NAN;
  }

  if (isObject(value)) {

    var raw = isFunction(value.valueOf) ? value.valueOf() : value;

    value = isObject(raw) ? (raw + '') : raw;
  }


  type = typeof value;
  if (type !== 'string') {
    return type === 'number' ? value : parseInt(value, 10);
  }


  // trim
  value = value.replace(/^\s+|\s+$/g, '');


  if (/^0b[01]+$/i.test(value)) {
    return parseInt(value.slice(2), 2);
  } else if (/^0o[0-7]+$/i.test(value)) {
    return parseInt(value.slice(2), 8);
  } else if (/^0x[0-9a-f]+$/i.test(value)) {
    return parseInt(value.slice(2), 16);
  }

  if(/^0b/i.test(value)||/^0o/i.test(value)||/^[\+\-]?0x/i.test(value)){
    return NAN;
  }

  return parseInt(value, 10);
};

},{"is-function":7,"is-nil":8,"is-object":9,"is-symbol":10}],21:[function(require,module,exports){

},{}],22:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":23}],23:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],"cpf_cnpj":[function(require,module,exports){
module.exports = {
  CPF: require("./lib/cpf"),
  CNPJ: require("./lib/cnpj")
};

},{"./lib/cnpj":2,"./lib/cpf":3}],"creditcardgenerator":[function(require,module,exports){
'use strict';

module.exports = {
  create: create
};

function create(issuer) {
  issuer = issuer ? issuer : 'visa';
  let number;

  // https://www.nilsonreport.com/upload/Purchase_Transactions_Worldwide_2014.jpg
  if (issuer.match(/^v/i)) {
    issuer = 'Visa';
    number = '4' + randomInt(14);
  } else if (issuer.match(/^master/i)) {
    issuer = 'MasterCard';
    number = '5' + randomInt(1, 1, 5) + randomInt(13);
  } else if (issuer.match(/union/i)) {
    issuer = 'China UnionPay';
    number = '62' + randomInt(13);
  } else if (issuer.match(/^ame/i)) {
    issuer = 'American Express';
    number = '3' + (randomInt(1, 0, 1) === '0' ? '4' : '7') + randomInt(12);
  } else if (issuer.match(/^dine/i)) {
    issuer = 'Diners Club';
    let prefix = [300, 301, 302, 303, 304, 305, 309, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399];
    number = prefix[randomInt(1, 0, 36)] + randomInt(10);
  } else if (issuer.match(/^dis/i)) {
    issuer = 'Discover Card';
    let r = randomInt(1, 0, 3);
    switch (r) {
      case '0':
        number = '6011' + randomInt(11);
        break;
      case '1':
        number = '622' + randomInt(1, 126, 925) + randomInt(9);
        break;
      case '2':
        number = '64' + randomInt(1, 4, 9) + randomInt(12);
        break;
      default:
        number = '65' + randomInt(13);
        break;
    }
  } else if (issuer.match(/^j/i)) {
    issuer = 'JCB';
    number = '35' + randomInt(1, 28, 89) + randomInt(11);
  }

  let number_reverse_list = number.split('').reverse();

  let sum = 0;
  let pos = 0;

  while (pos < number.length) {
    let odd = number_reverse_list[pos] * 2;
    if (odd > 9) {
      odd -= 9;
    }

    sum += odd;

    if (pos != (number.length - 1)) {
      sum += parseInt(number_reverse_list[pos + 1]);
    }

    pos += 2;
  }

  number = number + (((Math.floor(sum / 10) + 1) * 10 - sum) % 10);

  return {
    issuer: issuer,
    number: number
  };
}

function randomInt(count, low, high) {
  if (low === undefined)
    low = 0;

  if (high === undefined)
    high = 9;

  let rtn = '';
  for (let i = 0; i < count; i++) {
    rtn += Math.floor(Math.random() * (high - low + 1) + low).toString();
  }
  return rtn;
}
},{}],"is-visible":[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["isVisible"] = factory();
	else
		root["isVisible"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isVisible = isVisible;
	exports.isVisibleAll = isVisibleAll;
	exports.isVisibleAny = isVisibleAny;

	var _iselement = __webpack_require__(1);

	var _iselement2 = _interopRequireDefault(_iselement);

	var _styleProperties = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// cross-browser way of getting element's style property
	function getStyle(element, property) {
	  if (window.getComputedStyle) {
	    return (0, _styleProperties.getStyleProperty)(element, property).original;
	  } else if (element.currentStyle) {
	    return element.currentStyle[property];
	  }
	  return null;
	}

	function checkVisibility(element) {
	  var is_displayed = getStyle(element, 'display') !== 'none';
	  var is_visible = getStyle(element, 'visibility') !== 'hidden';

	  return is_displayed && is_visible;
	}

	function isVisible(element) {
	  // don't bother with non-element inputs
	  if (!(0, _iselement2.default)(element)) {
	    return false;
	  }

	  // This should prevent problems with ShadowDOMPolyfill. It returns different
	  // object when asking directly via `document.body` (native element) and when
	  // asking via `document.querySelector()` (wrapped element). This would result
	  // in traversing too far in the `while` cycle below.
	  var body_element = document.querySelector('body');
	  var html_element = document.querySelector('html');

	  // elements that are not inserted into the body are never visible
	  if (!body_element || !body_element.contains(element)) {
	    return false;
	  }

	  // test visibility recursively for element and all its parents, until BODY
	  while (element && element !== body_element && element !== html_element) {
	    if (!checkVisibility(element)) {
	      return false;
	    }
	    element = element.parentNode;
	  }

	  return true;
	}

	function isVisibleAll(list) {
	  for (var i = 0; i < list.length; i++) {
	    if (!isVisible(list[i])) {
	      return false;
	    }
	  }
	  return true;
	}

	function isVisibleAny(list) {
	  for (var i = 0; i < list.length; i++) {
	    if (isVisible(list[i])) {
	      return true;
	    }
	  }
	  return false;
	}

	exports.default = isVisible;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = function (input) {
	  return input != null && (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && input.nodeType === 1 && _typeof(input.style) === 'object' && _typeof(input.ownerDocument) === 'object';
	};

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	};

	/**
	 * Returns `true` if provided input is Element.
	 * @name isElement
	 * @param {*} [input]
	 * @returns {boolean}
	 */

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getStyleProperty = getStyleProperty;
	exports.getStyleProperties = getStyleProperties;

	var _changeCase = __webpack_require__(3);

	var _parsePropertyValue = __webpack_require__(4);

	var _parsePropertyValue2 = _interopRequireDefault(_parsePropertyValue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {Object} StyleProperty
	 * @property {string} unit - unit of the property, e.g. px, rgb
	 * @property {string|number} value - value of the property
	 * @property {string} output - valid string representation of value and unit
	 *
	 * @example <caption>Simple property.</caption>
	 * {
	 *   unit: 'px',
	 *   value: 100,
	 *   output: '100px'
	 * }
	 *
	 * @example <caption>Color property.</caption>
	 * {
	 *   unit: 'rgb',
	 *   value: [255, 255, 255],
	 *   output: '#ffffff'
	 * }
	 */

	/**
	 * Attempts to fix the element when using Webcomponents with ShadowDOMPolyfill. It returns either original element or wrapped element, depending on whether the polyfill replaced the original `getComputedStyle` method or not.
	 * This is madness and no sane person should ever do hacks like this. ShadowDOMPolyfill sucks donkey balls!
	 * @param {Object|HTMLElement} element
	 * @returns {Object|HTMLElement}
	 */
	function fixWebcomponentsElement(element) {
	  if (typeof window.ShadowDOMPolyfill !== 'undefined') {

	    var is_native = document.defaultView.getComputedStyle.toString().indexOf('[native code]') !== -1;

	    // Can't check if element is instance of HTMLElement, because the polyfill
	    // hijacks this. Only reliable way of checking if it is wrapped I found
	    // is using this ugly ass property.
	    var is_wrapped = typeof element.__impl4cf1e782hg__ !== 'undefined';

	    if (is_native && is_wrapped) {
	      element = window.ShadowDOMPolyfill.unwrap(element);
	    }

	    if (!is_native && !is_wrapped) {
	      element = window.ShadowDOMPolyfill.wrap(element);
	    }
	  }

	  return element;
	}

	/**
	 * Returns information about unit and value of given property for given element.
	 * @param {HTMLElement} element
	 * @param {string} property - Name of the property. You can use either camelCase (e.g. zIndex) or kebab-case (e.g. z-index).
	 * @returns {StyleProperty}
	 *
	 * @example
	 * var element_width = getStyleProperty(my_element, 'width');
	 * // returns {unit: 'px', value: 100, output: '100px'}
	 */
	function getStyleProperty(element, property) {
	  property = (0, _changeCase.toKebabCase)(property);
	  element = fixWebcomponentsElement(element);
	  var value = document.defaultView.getComputedStyle(element, null).getPropertyValue(property);
	  return (0, _parsePropertyValue2.default)(value);
	}

	/**
	 * Returns information about multiple properties of given element.
	 * @param {HTMLElement} element
	 * @param {Array|string} properties - List of properties. Single property (string) will be converted to an array.
	 * @returns {Object} - Keys of the returned objects are property names, values are objects containing information about given property.
	 *
	 * @example
	 * var element_size = getStyleProperties(my_element, ['width', 'height']);
	 * // returns
	 * // {
	 * //   width: {unit: 'px', value: 100, output: '100px'},
	 * //   height: {unit: 'px', value: 100, output: '100px'}
	 * // }
	 */
	function getStyleProperties(element) {
	  var properties = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	  if (typeof properties === 'string') {
	    properties = [properties];
	  }

	  var result = {};

	  properties.forEach(function (property) {
	    result[property] = getStyleProperty(element, property);
	  });

	  return result;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toCamelCase = toCamelCase;
	exports.toKebabCase = toKebabCase;
	var delimiters = [' ', '-', '_'];

	function toCamelCase() {
	  var input = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	  var characters = input.split('');
	  var result = [];

	  var character = void 0;
	  while (character = characters.shift()) {
	    if (delimiters.indexOf(character) !== -1) {
	      if (character = characters.shift()) {
	        character = character.toUpperCase();
	      }
	    }
	    result.push(character);
	  }

	  return result.join('');
	}

	function toKebabCase() {
	  var input = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	  var characters = input.split('');
	  var result = [];

	  characters.forEach(function (character) {
	    var lowercase_character = character.toLowerCase();
	    if (character !== lowercase_character) {
	      result.push('-', lowercase_character);
	    } else if (delimiters.indexOf(character) !== -1) {
	      result.push('-');
	    } else {
	      result.push(character);
	    }
	  });

	  return result.join('');
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (value) {
	  var result = re_color.test(value) ? parseColorProperty(value) : parseRegularProperty(value);
	  result.original = value;
	  return result;
	};

	var re_color = /^rgb\((\d+),\s?(\d+),\s?(\d+)\)$/;
	var re_prop = /^(-?\d*\.?\d*)(.*)$/;

	// converts number in base 10 to base 16, adds padding zero if needed
	function convertColorComponent(input) {
	  var result = input.toString(16);
	  if (result.length < 2) {
	    result = '0' + result;
	  }
	  return result;
	}

	function parseColorProperty(value) {
	  var matches = value.match(re_color);
	  var result = {};

	  result.unit = 'rgb';

	  result.value = [parseInt(matches[1], 10), parseInt(matches[2], 10), parseInt(matches[3], 10)];

	  result.output = '#' + convertColorComponent(result.value[0]) + convertColorComponent(result.value[1]) + convertColorComponent(result.value[2]);

	  return result;
	}

	function parseRegularProperty(value) {
	  var result = {
	    unit: '',
	    value: null,
	    output: 'auto'
	  };

	  if (value !== 'auto') {
	    var matches = value.match(re_prop);
	    result.value = parseFloat(matches[1]);
	    result.unit = matches[2];
	    result.output = result.value + result.unit;
	  }

	  return result;
	}

/***/ }
/******/ ])
});
;
},{}],"prelodr":[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* global module */

var _seqr = require('seqr');

var _seqr2 = _interopRequireDefault(_seqr);

var _emitus = require('emitus');

var _emitus2 = _interopRequireDefault(_emitus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var defaults = setDefaults(options);

  var emitter = (0, _emitus2.default)({
    show: show,
    hide: hide,
    setText: setText,
    getElement: getElement,
    setPrefixClass: setPrefixClass,
    setDuration: setDuration,
    setZIndex: setZIndex
  });

  var seqr = (0, _seqr2.default)();
  var cls = getClasses();

  var wrapper = el();
  wrapper.className = cls.prefix + ' ' + cls.hide;
  wrapper.innerHTML = '\n    <span>\n      <span>\n        <span class="' + cls.text + '">' + defaults.text + '</span>\n        <span class="' + cls.progressbar + '"></span>\n      </span>\n    </span>\n  ';

  var spanText = find('.' + cls.text);
  var spanProgressbar = find('.' + cls.progressbar);

  defaults.container.appendChild(wrapper);

  if (defaults.auto) {
    show(defaults.text);
  }

  setZIndex(defaults.zIndex);

  return emitter;

  function show(str) {
    /* istanbul ignore next */
    seqr.then(function (done) {
      setText(str);

      wrapper.classList.remove(cls.hide);

      setTimeout(function () {
        spanText.classList.add(cls.in);
        wrapper.classList.add(cls.in);
      }, 10);

      setTimeout(function () {
        emitter.emit('shown');
        done();
      }, defaults.duration);
    });

    return emitter;
  }

  function hide(fn) {
    /* istanbul ignore next */
    seqr.then(function (done) {
      spanText.classList.remove(cls.in);
      wrapper.classList.remove(cls.in);

      setTimeout(function () {
        wrapper.classList.add(cls.hide);

        if (fn) fn(done);else done();

        emitter.emit('hidden');
      }, defaults.duration);
    });

    return emitter;
  }

  function setText(str) {
    /* istanbul ignore next */
    if (!str && defaults.text) {
      str = defaults.text;
    }

    defaults.text = str;
    spanText.innerHTML = str;

    return emitter;
  }

  function getElement() {
    return wrapper;
  }

  function setDuration(duration) {
    defaults.duration = duration;
  }

  function setZIndex(zindex) {
    defaults.zIndex = zindex;
    wrapper.style.zIndex = zindex;
  }

  function setPrefixClass(prefix) {
    defaults.prefixClass = prefix;
    updateClasses();
  }

  function setDefaults() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return _extends({
      container: document.body,
      duration: 750,
      zIndex: 100,
      auto: false,
      text: 'Loading...',
      prefixClass: 'prelodr'
    }, options);
  }

  function updateClasses() {
    var from = cls;

    cls = getClasses();
    replaceClass(wrapper, from.prefix, cls.prefix);
    replaceClass(spanText, from.text, cls.text);
    replaceClass(spanProgressbar, from.progressbar, cls.progressbar);
  }

  function getClasses() {
    return {
      prefix: defaults.prefixClass,
      in: defaults.prefixClass + '-in',
      hide: defaults.prefixClass + '-hide',
      text: defaults.prefixClass + '-text',
      progressbar: defaults.prefixClass + '-progressbar'
    };
  }

  function el() {
    var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'span';

    return document.createElement(tag);
  }

  function find(q) {
    return wrapper.querySelector(q);
  }

  function replaceClass(elem, from, to) {
    elem.classList.remove(from);
    elem.classList.add(to);
  }
};
},{"emitus":4,"seqr":19}],"random-firstname":[function(require,module,exports){
'use strict';

var pickItem   = require('pick-item');
var randomBool = require('random-bool');

var firstNames = {
  male: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Charles', 'Thomas', 'Christopher', 'Daniel', 'Matthew', 'George', 'Donald', 'Anthony', 'Paul', 'Mark', 'Edward', 'Steven', 'Kenneth', 'Andrew', 'Brian', 'Joshua', 'Kevin', 'Ronald', 'Timothy', 'Jason', 'Jeffrey', 'Frank', 'Gary', 'Ryan', 'Nicholas', 'Eric', 'Stephen', 'Jacob', 'Larry', 'Jonathan', 'Scott', 'Raymond', 'Justin', 'Brandon', 'Gregory', 'Samuel', 'Benjamin', 'Patrick', 'Jack', 'Henry', 'Walter', 'Dennis', 'Jerry', 'Alexander', 'Peter', 'Tyler', 'Douglas', 'Harold', 'Aaron', 'Jose', 'Adam', 'Arthur', 'Zachary', 'Carl', 'Nathan', 'Albert', 'Kyle', 'Lawrence', 'Joe', 'Willie', 'Gerald', 'Roger', 'Keith', 'Jeremy', 'Terry', 'Harry', 'Ralph', 'Sean', 'Jesse', 'Roy', 'Louis', 'Billy', 'Austin', 'Bruce', 'Eugene', 'Christian', 'Bryan', 'Wayne', 'Russell', 'Howard', 'Fred', 'Ethan', 'Jordan', 'Philip', 'Alan', 'Juan', 'Randy', 'Vincent', 'Bobby', 'Dylan', 'Johnny', 'Phillip', 'Victor', 'Clarence', 'Ernest', 'Martin', 'Craig', 'Stanley', 'Shawn', 'Travis', 'Bradley', 'Leonard', 'Earl', 'Gabriel', 'Jimmy', 'Francis', 'Todd', 'Noah', 'Danny', 'Dale', 'Cody', 'Carlos', 'Allen', 'Frederick', 'Logan', 'Curtis', 'Alex', 'Joel', 'Luis', 'Norman', 'Marvin', 'Glenn', 'Tony', 'Nathaniel', 'Rodney', 'Melvin', 'Alfred', 'Steve', 'Cameron', 'Chad', 'Edwin', 'Caleb', 'Evan', 'Antonio', 'Lee', 'Herbert', 'Jeffery', 'Isaac', 'Derek', 'Ricky', 'Marcus', 'Theodore', 'Elijah', 'Luke', 'Jesus', 'Eddie', 'Troy', 'Mike', 'Dustin', 'Ray', 'Adrian', 'Bernard', 'Leroy', 'Angel', 'Randall', 'Wesley', 'Ian', 'Jared', 'Mason', 'Hunter', 'Calvin', 'Oscar', 'Clifford', 'Jay', 'Shane', 'Ronnie', 'Barry', 'Lucas', 'Corey', 'Manuel', 'Leo', 'Tommy', 'Warren', 'Jackson', 'Isaiah', 'Connor', 'Don', 'Dean', 'Jon', 'Julian', 'Miguel', 'Bill', 'Lloyd', 'Charlie', 'Mitchell', 'Leon', 'Jerome', 'Darrell', 'Jeremiah', 'Alvin', 'Brett', 'Seth', 'Floyd', 'Jim', 'Blake', 'Micheal', 'Gordon', 'Trevor', 'Lewis', 'Erik', 'Edgar', 'Vernon', 'Devin', 'Gavin', 'Jayden', 'Chris', 'Clyde', 'Tom', 'Derrick', 'Mario', 'Brent', 'Marc', 'Herman', 'Chase', 'Dominic', 'Ricardo', 'Franklin', 'Maurice', 'Max', 'Aiden', 'Owen', 'Lester', 'Gilbert', 'Elmer', 'Gene', 'Francisco', 'Glen', 'Cory', 'Garrett', 'Clayton', 'Sam', 'Jorge', 'Chester', 'Alejandro', 'Jeff', 'Harvey', 'Milton', 'Cole', 'Ivan', 'Andre', 'Duane', 'Landon'],
  female: ['Mary', 'Emma', 'Elizabeth', 'Minnie', 'Margaret', 'Ida', 'Alice', 'Bertha', 'Sarah', 'Annie', 'Clara', 'Ella', 'Florence', 'Cora', 'Martha', 'Laura', 'Nellie', 'Grace', 'Carrie', 'Maude', 'Mabel', 'Bessie', 'Jennie', 'Gertrude', 'Julia', 'Hattie', 'Edith', 'Mattie', 'Rose', 'Catherine', 'Lillian', 'Ada', 'Lillie', 'Helen', 'Jessie', 'Louise', 'Ethel', 'Lula', 'Myrtle', 'Eva', 'Frances', 'Lena', 'Lucy', 'Edna', 'Maggie', 'Pearl', 'Daisy', 'Fannie', 'Josephine', 'Dora', 'Rosa', 'Katherine', 'Agnes', 'Marie', 'Nora', 'May', 'Mamie', 'Blanche', 'Stella', 'Ellen', 'Nancy', 'Effie', 'Sallie', 'Nettie', 'Della', 'Lizzie', 'Flora', 'Susie', 'Maud', 'Mae', 'Etta', 'Harriet', 'Sadie', 'Caroline', 'Katie', 'Lydia', 'Elsie', 'Kate', 'Susan', 'Mollie', 'Alma', 'Addie', 'Georgia', 'Eliza', 'Lulu', 'Nannie', 'Lottie', 'Amanda', 'Belle', 'Charlotte', 'Rebecca', 'Ruth', 'Viola', 'Olive', 'Amelia', 'Hannah', 'Jane', 'Virginia', 'Emily', 'Matilda', 'Irene', 'Kathryn', 'Esther', 'Willie', 'Henrietta', 'Ollie', 'Amy', 'Rachel', 'Sara', 'Estella', 'Theresa', 'Augusta', 'Ora', 'Pauline', 'Josie', 'Lola', 'Sophia', 'Leona', 'Anne', 'Mildred', 'Ann', 'Beulah', 'Callie', 'Lou', 'Delia', 'Eleanor', 'Barbara', 'Iva', 'Louisa', 'Maria', 'Mayme', 'Evelyn', 'Estelle', 'Nina', 'Betty', 'Marion', 'Bettie', 'Dorothy', 'Luella', 'Inez', 'Lela', 'Rosie', 'Allie', 'Millie', 'Janie', 'Cornelia', 'Victoria', 'Ruby', 'Winifred', 'Alta', 'Celia', 'Christine', 'Beatrice', 'Birdie', 'Harriett', 'Mable', 'Myra', 'Sophie', 'Tillie', 'Isabel', 'Sylvia', 'Carolyn', 'Isabelle', 'Leila', 'Sally', 'Ina', 'Essie', 'Bertie', 'Nell', 'Alberta', 'Katharine', 'Lora', 'Rena', 'Mina', 'Rhoda', 'Mathilda', 'Abbie', 'Eula', 'Dollie', 'Hettie', 'Eunice', 'Fanny', 'Ola', 'Lenora', 'Adelaide', 'Christina', 'Lelia', 'Nelle', 'Sue', 'Johanna', 'Lilly', 'Lucinda', 'Minerva', 'Lettie', 'Roxie', 'Cynthia', 'Helena', 'Hilda', 'Hulda', 'Bernice', 'Genevieve', 'Jean', 'Cordelia', 'Marian', 'Francis', 'Jeanette', 'Adeline', 'Gussie', 'Leah', 'Lois', 'Lura', 'Mittie', 'Hallie', 'Isabella', 'Olga', 'Phoebe', 'Teresa', 'Hester', 'Lida', 'Lina', 'Winnie', 'Claudia', 'Marguerite', 'Vera', 'Cecelia', 'Bess', 'Emilie', 'John', 'Rosetta', 'Verna', 'Myrtie', 'Cecilia', 'Elva', 'Olivia', 'Ophelia', 'Georgie', 'Elnora', 'Violet', 'Adele', 'Lily', 'Linnie', 'Loretta', 'Madge', 'Polly', 'Virgie', 'Eugenia', 'Lucile', 'Lucille', 'Mabelle', 'Rosalie'],
};

module.exports = function (options) {

  var gender = options && options.gender;
  var names  = gender && firstNames[gender] || null;

  if (!names) {
    names = randomBool() ? firstNames.male : firstNames.female;
  }

  return pickItem(names);
};

},{"pick-item":14,"random-bool":16}],"random-fullname":[function(require,module,exports){
'use strict';

var randomFirstName = require('random-firstname');
var randomLastName  = require('random-lastname');

module.exports = function (options) {

  var middle = '';

  options = options || {};

  if (options.middleName === true) {
    middle = randomFirstName();
  } else if (typeof options.middleName === 'string') {
    middle = options.middleName;
  }

  if (middle) {
    return randomFirstName(options.gender) + ' ' + middle + ' ' + randomLastName();
  } else {
    return randomFirstName(options.gender) + ' ' + randomLastName();
  }
};

},{"random-firstname":"random-firstname","random-lastname":"random-lastname"}],"random-item":[function(require,module,exports){
'use strict';
module.exports = function (arr) {
	if (!Array.isArray(arr)) {
		throw new TypeError('Expected an array');
	}

	return arr[Math.floor(Math.random() * arr.length)];
};

},{}],"random-lastname":[function(require,module,exports){
'use strict';

var pickItem = require('pick-item');

var lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy', 'Bailey', 'Rivera', 'Cooper', 'Richardson', 'Cox', 'Howard', 'Ward', 'Torres', 'Peterson', 'Gray', 'Ramirez', 'James', 'Watson', 'Brooks', 'Kelly', 'Sanders', 'Price', 'Bennett', 'Wood', 'Barnes', 'Ross', 'Henderson', 'Coleman', 'Jenkins', 'Perry', 'Powell', 'Long', 'Patterson', 'Hughes', 'Flores', 'Washington', 'Butler', 'Simmons', 'Foster', 'Gonzales', 'Bryant', 'Alexander', 'Russell', 'Griffin', 'Diaz', 'Hayes', 'Myers', 'Ford', 'Hamilton', 'Graham', 'Sullivan', 'Wallace', 'Woods', 'Cole', 'West', 'Jordan', 'Owens', 'Reynolds', 'Fisher', 'Ellis', 'Harrison', 'Gibson', 'McDonald', 'Cruz', 'Marshall', 'Ortiz', 'Gomez', 'Murray', 'Freeman', 'Wells', 'Webb', 'Simpson', 'Stevens', 'Tucker', 'Porter', 'Hunter', 'Hicks', 'Crawford', 'Henry', 'Boyd', 'Mason', 'Morales', 'Kennedy', 'Warren', 'Dixon', 'Ramos', 'Reyes', 'Burns', 'Gordon', 'Shaw', 'Holmes', 'Rice', 'Robertson', 'Hunt', 'Black', 'Daniels', 'Palmer', 'Mills', 'Nichols', 'Grant', 'Knight', 'Ferguson', 'Rose', 'Stone', 'Hawkins', 'Dunn', 'Perkins', 'Hudson', 'Spencer', 'Gardner', 'Stephens', 'Payne', 'Pierce', 'Berry', 'Matthews', 'Arnold', 'Wagner', 'Willis', 'Ray', 'Watkins', 'Olson', 'Carroll', 'Duncan', 'Snyder', 'Hart', 'Cunningham', 'Bradley', 'Lane', 'Andrews', 'Ruiz', 'Harper', 'Fox', 'Riley', 'Armstrong', 'Carpenter', 'Weaver', 'Greene', 'Lawrence', 'Elliott', 'Chavez', 'Sims', 'Austin', 'Peters', 'Kelley', 'Franklin', 'Lawson', 'Fields', 'Gutierrez', 'Ryan', 'Schmidt', 'Carr', 'Vasquez', 'Castillo', 'Wheeler', 'Chapman', 'Oliver', 'Montgomery', 'Richards', 'Williamson', 'Johnston', 'Banks', 'Meyer', 'Bishop', 'McCoy', 'Howell', 'Alvarez', 'Morrison', 'Hansen', 'Fernandez', 'Garza', 'Harvey', 'Little', 'Burton', 'Stanley', 'Nguyen', 'George', 'Jacobs', 'Reid', 'Kim', 'Fuller', 'Lynch', 'Dean', 'Gilbert', 'Garrett', 'Romero', 'Welch', 'Larson', 'Frazier', 'Burke', 'Hanson', 'Day', 'Mendoza', 'Moreno', 'Bowman', 'Medina', 'Fowler', 'Brewer', 'Hoffman', 'Carlson', 'Silva', 'Pearson', 'Holland', 'Douglas', 'Fleming', 'Jensen', 'Vargas', 'Byrd', 'Davidson', 'Hopkins', 'May', 'Terry', 'Herrera', 'Wade', 'Soto', 'Walters', 'Curtis', 'Neal', 'Caldwell', 'Lowe', 'Jennings', 'Barnett', 'Graves', 'Jimenez', 'Horton', 'Shelton', 'Barrett', 'Obrien', 'Castro', 'Sutton', 'Gregory', 'McKinney', 'Lucas', 'Miles', 'Craig', 'Rodriquez', 'Chambers', 'Holt', 'Lambert', 'Fletcher', 'Watts', 'Bates', 'Hale', 'Rhodes', 'Pena', 'Beck', 'Newman', 'Haynes', 'McDaniel', 'Mendez', 'Bush', 'Vaughn', 'Parks', 'Dawson', 'Santiago', 'Norris', 'Hardy', 'Love', 'Steele', 'Curry', 'Powers', 'Schultz', 'Barker', 'Guzman', 'Page', 'Munoz', 'Ball', 'Keller', 'Chandler', 'Weber', 'Leonard', 'Walsh', 'Lyons', 'Ramsey', 'Wolfe', 'Schneider', 'Mullins', 'Benson', 'Sharp', 'Bowen', 'Daniel', 'Barber', 'Cummings', 'Hines', 'Baldwin', 'Griffith', 'Valdez', 'Hubbard', 'Salazar', 'Reeves', 'Warner', 'Stevenson', 'Burgess', 'Santos', 'Tate', 'Cross', 'Garner', 'Mann', 'Mack', 'Moss', 'Thornton', 'Dennis', 'McGee', 'Farmer', 'Delgado', 'Aguilar', 'Vega', 'Glover', 'Manning', 'Cohen', 'Harmon', 'Rodgers', 'Robbins', 'Newton', 'Todd', 'Blair', 'Higgins', 'Ingram', 'Reese', 'Cannon', 'Strickland', 'Townsend', 'Potter', 'Goodwin', 'Walton', 'Rowe', 'Hampton', 'Ortega', 'Patton', 'Swanson', 'Joseph', 'Francis', 'Goodman', 'Maldonado', 'Yates', 'Becker', 'Erickson', 'Hodges', 'Rios', 'Conner', 'Adkins', 'Webster', 'Norman', 'Malone', 'Hammond', 'Flowers', 'Cobb', 'Moody', 'Quinn', 'Blake', 'Maxwell', 'Pope', 'Floyd', 'Osborne', 'Paul', 'McCarthy', 'Guerrero', 'Lindsey', 'Estrada', 'Sandoval', 'Gibbs', 'Tyler', 'Gross', 'Fitzgerald', 'Stokes', 'Doyle', 'Sherman', 'Saunders', 'Wise', 'Colon', 'Gill', 'Alvarado', 'Greer', 'Padilla', 'Simon', 'Waters', 'Nunez', 'Ballard', 'Schwartz', 'McBride', 'Houston', 'Christensen', 'Klein', 'Pratt', 'Briggs', 'Parsons', 'McLaughlin', 'Zimmerman', 'French', 'Buchanan', 'Moran', 'Copeland', 'Roy', 'Pittman', 'Brady', 'McCormick', 'Holloway', 'Brock', 'Poole', 'Frank', 'Logan', 'Owen', 'Bass', 'Marsh', 'Drake', 'Wong', 'Jefferson', 'Park', 'Morton', 'Abbott', 'Sparks', 'Patrick', 'Norton', 'Huff', 'Clayton', 'Massey', 'Lloyd', 'Figueroa', 'Carson', 'Bowers', 'Roberson', 'Barton', 'Tran', 'Lamb', 'Harrington', 'Casey', 'Boone', 'Cortez', 'Clarke', 'Mathis', 'Singleton', 'Wilkins', 'Cain', 'Bryan', 'Underwood', 'Hogan', 'McKenzie', 'Collier', 'Luna', 'Phelps', 'McGuire', 'Allison', 'Bridges', 'Wilkerson', 'Nash', 'Summers', 'Atkins'];

module.exports = function () {
  return pickItem(lastNames);
};

},{"pick-item":14}],"random-month":[function(require,module,exports){
'use strict';

var randomNatural = require('random-natural');

var MIN = 1;
var MAX = 12;

var months = [
  { name: 'January', short: 'Jan', number: 1, days: 31 },
  // Not messing with leap years...
  { name: 'February', short: 'Feb', number: 2, days: 28 },
  { name: 'March', short: 'Mar', number: 3, days: 31 },
  { name: 'April', short: 'Apr', number: 4, days: 30 },
  { name: 'May', short: 'May', number: 5, days: 31 },
  { name: 'June', short: 'Jun', number: 6, days: 30 },
  { name: 'July', short: 'Jul', number: 7, days: 31 },
  { name: 'August', short: 'Aug', number: 8, days: 31 },
  { name: 'September', short: 'Sep', number: 9, days: 30 },
  { name: 'October', short: 'Oct', number: 10, days: 31 },
  { name: 'November', short: 'Nov', number: 11, days: 30 },
  { name: 'December', short: 'Dec', number: 12, days: 31 }
];

module.exports = function (options) {

  options = options || {};

  var min = options.min ? randomNatural.fixme(options.min, MIN, MAX, true) : MIN;
  var max = options.max ? randomNatural.fixme(options.max, MIN, MAX, false) : MAX;

  var index = randomNatural({
      min: min,
      max: max,
      inspected: true
    }) - 1;


  var month = months[index];
  return options.raw ? month : month.number;

};

module.exports.months = months;

},{"random-natural":"random-natural"}],"random-natural":[function(require,module,exports){
'use strict';

var randomInt    = require('random-integral');
var MAX_SAFE_INT = require('max-safe-int');

module.exports = function (options) {

  if (options) {
    if (!options.inspected) {
      options.min = randomInt.fixme(options.min, 0, MAX_SAFE_INT, true);
      options.max = randomInt.fixme(options.max, 0, MAX_SAFE_INT, false);
    }
  } else {
    options = {
      min: 0,
      max: MAX_SAFE_INT
    };
  }

  options.inspected = true;

  return randomInt(options);
};

module.exports.fixme = randomInt.fixme;

},{"max-safe-int":13,"random-integral":18}],"random-year":[function(require,module,exports){
'use strict';

var randomNatural = require('random-natural');

module.exports = function (options) {

  if (options && (options.min || options.max)) {

    if (!options.min) {
      options.min = options.max - 100;
    } else if (!options.max) {
      options.max = options.min + 100;
    }

    return randomNatural(options);
  }

  var year = (new Date()).getFullYear();

  return randomNatural({
    max: year,
    min: year - 100,
    inspected: true
  });
};

},{"random-natural":"random-natural"}],"smart-utils":[function(require,module,exports){
var smartUtils = {
    tagrize: Tagrize,
    ensureDirectoryExists: EnsureDirectoryExists,
    listDirectoryContentRecursive: ListDirectoryContentRecursive,
    listDirectoryContent: ListDirectoryContent,
    objectDeepFind: ObjectDeepFind,
    replaceAll: ReplaceAll
};

module.exports = smartUtils;

function Tagrize(word) {

    if (word) {
        var wordTemp = [];

        for (var index = 0; index < word.length; index++) {
            var element = word[index];
            
            // Verifica se o caracter é maiúsculo
            if (/[A-Z]/.test(element)) {
                // Não adiciona - antes do primeiro caracter
                if (index > 0) {
                    wordTemp.push('-');
                }
                wordTemp.push(element.toLowerCase());
            } else {
                wordTemp.push(element);
            }
        }

        return wordTemp.join('');
    }
};

function EnsureDirectoryExists(directoryPath, callback) {
    
    var fs = require("fs");
    
    fs.mkdir(directoryPath, function(err) {
        if (err) {
            /* Se o erro é que a pasta já existe, então ignora */
            if (err.code == 'EEXIST') {
                callback(null);
            } else {
                callback(err); /* Algo de errado não está certo */
            }
        } else {
            callback(null); /* Tudo ok na criação do diretório */
        }
    });
};

// List all files and directories inside a directory recursive, that is asynchronous
function ListDirectoryContentRecursive(directoryPath, callback) {

    var fs = fs || require('fs');
    var path = path || require('path');
    var results = [];

    fs.readdir(directoryPath, function(err, list) {

        if (err) {
            return callback(err);
        }

        var pending = list.length;

        if (!pending) {
            return callback(null, results);
        }

        list.forEach(function(file) {

            file = path.join(directoryPath, file);

            results.push(file);

            fs.stat(file, function(err, stat) {

                if (stat && stat.isDirectory()) {

                    ListDirectoryContentRecursive(file, function(err, res) {

                        results = results.concat(res);
                        
                        if (!--pending) {
                            callback(null, results);
                        }
                    });
                } else {
                    if (!--pending) {
                        callback(null, results);
                    }
                }
            });
        });
    });
};

function ListDirectoryContent(directoryPath,  options, callback) {
 
    /* Estrutura atual do objeto options
        options.recursive = Indica se deve procurar nas subpastas também.
    */
    
    // Se options é uma função e callback não foi setada, quer dizer que não enviou o parâmetro options
    if (typeof options === 'function' && !callback) {
        callback = options
        options = {}
    }
    // Isso não é utilizado aqui, mas servia para verificar se options era uma expressão regular
    // } else if (typeof options === 'function' || options instanceof RegExp) {
    //     options = {filter: options}
    // }
    
    callback = callback || function () {};
    options = options || {};

    //////////////////////////////////////////////////////////

    var fs = fs || require('fs');
    var path = path || require('path');
    var results = [];

    fs.readdir(directoryPath, function(err, list) {

        if (err) {
            return callback(err);
        }

        var pending = list.length;

        if (!pending) {
            return callback(null, results);
        }

        list.forEach(function(fileOrDirectory) {

            fileOrDirectory = path.join(directoryPath, fileOrDirectory);

            results.push(fileOrDirectory);

            fs.stat(fileOrDirectory, function(err, stat) {

                // Se é um diretório e foi enviada a opção dizendo que é recursivo, então vou ler este diretório também
                if (options.recursive && stat && stat.isDirectory()) {

                    ListDirectoryContent(fileOrDirectory, options, function(err, res) {

                        results = results.concat(res);
                        
                        if (!--pending) {
                            callback(null, results);
                        }
                    });
                } else {
                    // Se não era para ser recursivo
                    if (!--pending) {
                        callback(null, results);
                    }
                }
            });
        });
    });
};

// Get the value of an property deep into in a object, or not.  
// Do not ask me the utility of it ;D
function ObjectDeepFind(obj, propertyPath) {
	
    // Divide todas as propriedades pelo .
	var paths = propertyPath.split('.');
	
    // Copia o objeto
	var currentObj = obj;

    // Para cada propriedade vou pegar a próxima até encontrar o valor do path inteiro da propriedade
	for (var i = 0; i < paths.length; ++i) {
		if (currentObj[paths[i]] == undefined) {
			return undefined;
		} else {
			currentObj = currentObj[paths[i]];
		}
	}
	
	return currentObj;
};

function ReplaceAll(text, search, replace) {

    var newText = text;

    while (newText.indexOf(search) > -1) {
        newText = newText.replace(search, replace);
    }

    return newText;
};

},{"fs":21,"path":22}]},{},[]);
