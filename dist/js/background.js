/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/charenc/charenc.js":
/*!*****************************************!*\
  !*** ./node_modules/charenc/charenc.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),

/***/ "./node_modules/crypt/crypt.js":
/*!*************************************!*\
  !*** ./node_modules/crypt/crypt.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/lodash.assignin/index.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash.assignin/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * This method is like `_.assign` except that it iterates over own and
 * inherited source properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assign
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assignIn({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
 */
var assignIn = createAssigner(function(object, source) {
  copyObject(source, keysIn(source), object);
});

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = assignIn;


/***/ }),

/***/ "./node_modules/redux-logger/dist/redux-logger.js":
/*!********************************************************!*\
  !*** ./node_modules/redux-logger/dist/redux-logger.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {!function(e,t){ true?t(exports):undefined}(this,function(e){"use strict";function t(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}function r(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:!0}),t&&t.length&&Object.defineProperty(this,"path",{value:t,enumerable:!0})}function n(e,t,r){n.super_.call(this,"E",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0}),Object.defineProperty(this,"rhs",{value:r,enumerable:!0})}function o(e,t){o.super_.call(this,"N",e),Object.defineProperty(this,"rhs",{value:t,enumerable:!0})}function i(e,t){i.super_.call(this,"D",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0})}function a(e,t,r){a.super_.call(this,"A",e),Object.defineProperty(this,"index",{value:t,enumerable:!0}),Object.defineProperty(this,"item",{value:r,enumerable:!0})}function f(e,t,r){var n=e.slice((r||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,n),e}function u(e){var t="undefined"==typeof e?"undefined":N(e);return"object"!==t?t:e===Math?"math":null===e?"null":Array.isArray(e)?"array":"[object Date]"===Object.prototype.toString.call(e)?"date":"function"==typeof e.toString&&/^\/.*\//.test(e.toString())?"regexp":"object"}function l(e,t,r,c,s,d,p){s=s||[],p=p||[];var g=s.slice(0);if("undefined"!=typeof d){if(c){if("function"==typeof c&&c(g,d))return;if("object"===("undefined"==typeof c?"undefined":N(c))){if(c.prefilter&&c.prefilter(g,d))return;if(c.normalize){var h=c.normalize(g,d,e,t);h&&(e=h[0],t=h[1])}}}g.push(d)}"regexp"===u(e)&&"regexp"===u(t)&&(e=e.toString(),t=t.toString());var y="undefined"==typeof e?"undefined":N(e),v="undefined"==typeof t?"undefined":N(t),b="undefined"!==y||p&&p[p.length-1].lhs&&p[p.length-1].lhs.hasOwnProperty(d),m="undefined"!==v||p&&p[p.length-1].rhs&&p[p.length-1].rhs.hasOwnProperty(d);if(!b&&m)r(new o(g,t));else if(!m&&b)r(new i(g,e));else if(u(e)!==u(t))r(new n(g,e,t));else if("date"===u(e)&&e-t!==0)r(new n(g,e,t));else if("object"===y&&null!==e&&null!==t)if(p.filter(function(t){return t.lhs===e}).length)e!==t&&r(new n(g,e,t));else{if(p.push({lhs:e,rhs:t}),Array.isArray(e)){var w;e.length;for(w=0;w<e.length;w++)w>=t.length?r(new a(g,w,new i(void 0,e[w]))):l(e[w],t[w],r,c,g,w,p);for(;w<t.length;)r(new a(g,w,new o(void 0,t[w++])))}else{var x=Object.keys(e),S=Object.keys(t);x.forEach(function(n,o){var i=S.indexOf(n);i>=0?(l(e[n],t[n],r,c,g,n,p),S=f(S,i)):l(e[n],void 0,r,c,g,n,p)}),S.forEach(function(e){l(void 0,t[e],r,c,g,e,p)})}p.length=p.length-1}else e!==t&&("number"===y&&isNaN(e)&&isNaN(t)||r(new n(g,e,t)))}function c(e,t,r,n){return n=n||[],l(e,t,function(e){e&&n.push(e)},r),n.length?n:void 0}function s(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":s(o[r.path[n]],r.index,r.item);break;case"D":delete o[r.path[n]];break;case"E":case"N":o[r.path[n]]=r.rhs}}else switch(r.kind){case"A":s(e[t],r.index,r.item);break;case"D":e=f(e,t);break;case"E":case"N":e[t]=r.rhs}return e}function d(e,t,r){if(e&&t&&r&&r.kind){for(var n=e,o=-1,i=r.path?r.path.length-1:0;++o<i;)"undefined"==typeof n[r.path[o]]&&(n[r.path[o]]="number"==typeof r.path[o]?[]:{}),n=n[r.path[o]];switch(r.kind){case"A":s(r.path?n[r.path[o]]:n,r.index,r.item);break;case"D":delete n[r.path[o]];break;case"E":case"N":n[r.path[o]]=r.rhs}}}function p(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":p(o[r.path[n]],r.index,r.item);break;case"D":o[r.path[n]]=r.lhs;break;case"E":o[r.path[n]]=r.lhs;break;case"N":delete o[r.path[n]]}}else switch(r.kind){case"A":p(e[t],r.index,r.item);break;case"D":e[t]=r.lhs;break;case"E":e[t]=r.lhs;break;case"N":e=f(e,t)}return e}function g(e,t,r){if(e&&t&&r&&r.kind){var n,o,i=e;for(o=r.path.length-1,n=0;n<o;n++)"undefined"==typeof i[r.path[n]]&&(i[r.path[n]]={}),i=i[r.path[n]];switch(r.kind){case"A":p(i[r.path[n]],r.index,r.item);break;case"D":i[r.path[n]]=r.lhs;break;case"E":i[r.path[n]]=r.lhs;break;case"N":delete i[r.path[n]]}}}function h(e,t,r){if(e&&t){var n=function(n){r&&!r(e,t,n)||d(e,t,n)};l(e,t,n)}}function y(e){return"color: "+F[e].color+"; font-weight: bold"}function v(e){var t=e.kind,r=e.path,n=e.lhs,o=e.rhs,i=e.index,a=e.item;switch(t){case"E":return[r.join("."),n,"→",o];case"N":return[r.join("."),o];case"D":return[r.join(".")];case"A":return[r.join(".")+"["+i+"]",a];default:return[]}}function b(e,t,r,n){var o=c(e,t);try{n?r.groupCollapsed("diff"):r.group("diff")}catch(e){r.log("diff")}o?o.forEach(function(e){var t=e.kind,n=v(e);r.log.apply(r,["%c "+F[t].text,y(t)].concat(P(n)))}):r.log("—— no diff ——");try{r.groupEnd()}catch(e){r.log("—— diff end —— ")}}function m(e,t,r,n){switch("undefined"==typeof e?"undefined":N(e)){case"object":return"function"==typeof e[n]?e[n].apply(e,P(r)):e[n];case"function":return e(t);default:return e}}function w(e){var t=e.timestamp,r=e.duration;return function(e,n,o){var i=["action"];return i.push("%c"+String(e.type)),t&&i.push("%c@ "+n),r&&i.push("%c(in "+o.toFixed(2)+" ms)"),i.join(" ")}}function x(e,t){var r=t.logger,n=t.actionTransformer,o=t.titleFormatter,i=void 0===o?w(t):o,a=t.collapsed,f=t.colors,u=t.level,l=t.diff,c="undefined"==typeof t.titleFormatter;e.forEach(function(o,s){var d=o.started,p=o.startedTime,g=o.action,h=o.prevState,y=o.error,v=o.took,w=o.nextState,x=e[s+1];x&&(w=x.prevState,v=x.started-d);var S=n(g),k="function"==typeof a?a(function(){return w},g,o):a,j=D(p),E=f.title?"color: "+f.title(S)+";":"",A=["color: gray; font-weight: lighter;"];A.push(E),t.timestamp&&A.push("color: gray; font-weight: lighter;"),t.duration&&A.push("color: gray; font-weight: lighter;");var O=i(S,j,v);try{k?f.title&&c?r.groupCollapsed.apply(r,["%c "+O].concat(A)):r.groupCollapsed(O):f.title&&c?r.group.apply(r,["%c "+O].concat(A)):r.group(O)}catch(e){r.log(O)}var N=m(u,S,[h],"prevState"),P=m(u,S,[S],"action"),C=m(u,S,[y,h],"error"),F=m(u,S,[w],"nextState");if(N)if(f.prevState){var L="color: "+f.prevState(h)+"; font-weight: bold";r[N]("%c prev state",L,h)}else r[N]("prev state",h);if(P)if(f.action){var T="color: "+f.action(S)+"; font-weight: bold";r[P]("%c action    ",T,S)}else r[P]("action    ",S);if(y&&C)if(f.error){var M="color: "+f.error(y,h)+"; font-weight: bold;";r[C]("%c error     ",M,y)}else r[C]("error     ",y);if(F)if(f.nextState){var _="color: "+f.nextState(w)+"; font-weight: bold";r[F]("%c next state",_,w)}else r[F]("next state",w);l&&b(h,w,r,k);try{r.groupEnd()}catch(e){r.log("—— log end ——")}})}function S(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object.assign({},L,e),r=t.logger,n=t.stateTransformer,o=t.errorTransformer,i=t.predicate,a=t.logErrors,f=t.diffPredicate;if("undefined"==typeof r)return function(){return function(e){return function(t){return e(t)}}};if(e.getState&&e.dispatch)return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"),function(){return function(e){return function(t){return e(t)}}};var u=[];return function(e){var r=e.getState;return function(e){return function(l){if("function"==typeof i&&!i(r,l))return e(l);var c={};u.push(c),c.started=O.now(),c.startedTime=new Date,c.prevState=n(r()),c.action=l;var s=void 0;if(a)try{s=e(l)}catch(e){c.error=o(e)}else s=e(l);c.took=O.now()-c.started,c.nextState=n(r());var d=t.diff&&"function"==typeof f?f(r,l):t.diff;if(x(u,Object.assign({},t,{diff:d})),u.length=0,c.error)throw c.error;return s}}}}var k,j,E=function(e,t){return new Array(t+1).join(e)},A=function(e,t){return E("0",t-e.toString().length)+e},D=function(e){return A(e.getHours(),2)+":"+A(e.getMinutes(),2)+":"+A(e.getSeconds(),2)+"."+A(e.getMilliseconds(),3)},O="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance:Date,N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P=function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)},C=[];k="object"===("undefined"==typeof global?"undefined":N(global))&&global?global:"undefined"!=typeof window?window:{},j=k.DeepDiff,j&&C.push(function(){"undefined"!=typeof j&&k.DeepDiff===c&&(k.DeepDiff=j,j=void 0)}),t(n,r),t(o,r),t(i,r),t(a,r),Object.defineProperties(c,{diff:{value:c,enumerable:!0},observableDiff:{value:l,enumerable:!0},applyDiff:{value:h,enumerable:!0},applyChange:{value:d,enumerable:!0},revertChange:{value:g,enumerable:!0},isConflict:{value:function(){return"undefined"!=typeof j},enumerable:!0},noConflict:{value:function(){return C&&(C.forEach(function(e){e()}),C=null),c},enumerable:!0}});var F={E:{color:"#2196F3",text:"CHANGED:"},N:{color:"#4CAF50",text:"ADDED:"},D:{color:"#F44336",text:"DELETED:"},A:{color:"#2196F3",text:"ARRAY:"}},L={level:"log",logger:console,logErrors:!0,collapsed:void 0,predicate:void 0,duration:!1,timestamp:!0,stateTransformer:function(e){return e},actionTransformer:function(e){return e},errorTransformer:function(e){return e},colors:{title:function(){return"inherit"},prevState:function(){return"#9E9E9E"},action:function(){return"#03A9F4"},nextState:function(){return"#4CAF50"},error:function(){return"#F20404"}},diff:!1,diffPredicate:void 0,transformer:void 0},T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.dispatch,r=e.getState;return"function"==typeof t||"function"==typeof r?S()({dispatch:t,getState:r}):void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n")};e.defaults=L,e.createLogger=S,e.logger=T,e.default=T,Object.defineProperty(e,"__esModule",{value:!0})});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/redux-thunk/es/index.js":
/*!**********************************************!*\
  !*** ./node_modules/redux-thunk/es/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

/* harmony default export */ __webpack_exports__["default"] = (thunk);

/***/ }),

/***/ "./node_modules/redux/es/redux.js":
/*!****************************************!*\
  !*** ./node_modules/redux/es/redux.js ***!
  \****************************************/
/*! exports provided: __DO_NOT_USE__ActionTypes, applyMiddleware, bindActionCreators, combineReducers, compose, createStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__DO_NOT_USE__ActionTypes", function() { return ActionTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return applyMiddleware; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return bindActionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return combineReducers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return compose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return createStore; });
/* harmony import */ var symbol_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! symbol-observable */ "./node_modules/symbol-observable/es/index.js");


/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function.');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[symbol_observable__WEBPACK_IMPORTED_MODULE_0__["default"]] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[symbol_observable__WEBPACK_IMPORTED_MODULE_0__["default"]] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (true) {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if (true) {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (true) {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    keys.push.apply(keys, Object.getOwnPropertySymbols(object));
  }

  if (enumerableOnly) keys = keys.filter(function (sym) {
    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
  });
  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if ( true && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}




/***/ }),

/***/ "./node_modules/sha1/sha1.js":
/*!***********************************!*\
  !*** ./node_modules/sha1/sha1.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {(function() {
  var crypt = __webpack_require__(/*! crypt */ "./node_modules/crypt/crypt.js"),
      utf8 = __webpack_require__(/*! charenc */ "./node_modules/charenc/charenc.js").utf8,
      bin = __webpack_require__(/*! charenc */ "./node_modules/charenc/charenc.js").bin,

  // The core
  sha1 = function (message) {
    // Convert to byte array
    if (message.constructor == String)
      message = utf8.stringToBytes(message);
    else if (typeof Buffer !== 'undefined' && typeof Buffer.isBuffer == 'function' && Buffer.isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();

    // otherwise assume byte array

    var m  = crypt.bytesToWords(message),
        l  = message.length * 8,
        w  = [],
        H0 =  1732584193,
        H1 = -271733879,
        H2 = -1732584194,
        H3 =  271733878,
        H4 = -1009589776;

    // Padding
    m[l >> 5] |= 0x80 << (24 - l % 32);
    m[((l + 64 >>> 9) << 4) + 15] = l;

    for (var i = 0; i < m.length; i += 16) {
      var a = H0,
          b = H1,
          c = H2,
          d = H3,
          e = H4;

      for (var j = 0; j < 80; j++) {

        if (j < 16)
          w[j] = m[i + j];
        else {
          var n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
          w[j] = (n << 1) | (n >>> 31);
        }

        var t = ((H0 << 5) | (H0 >>> 27)) + H4 + (w[j] >>> 0) + (
                j < 20 ? (H1 & H2 | ~H1 & H3) + 1518500249 :
                j < 40 ? (H1 ^ H2 ^ H3) + 1859775393 :
                j < 60 ? (H1 & H2 | H1 & H3 | H2 & H3) - 1894007588 :
                         (H1 ^ H2 ^ H3) - 899497514);

        H4 = H3;
        H3 = H2;
        H2 = (H1 << 30) | (H1 >>> 2);
        H1 = H0;
        H0 = t;
      }

      H0 += a;
      H1 += b;
      H2 += c;
      H3 += d;
      H4 += e;
    }

    return [H0, H1, H2, H3, H4];
  },

  // Public API
  api = function (message, options) {
    var digestbytes = crypt.wordsToBytes(sha1(message));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

  api._blocksize = 16;
  api._digestsize = 20;

  module.exports = api;
})();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/symbol-observable/es/index.js":
/*!****************************************************!*\
  !*** ./node_modules/symbol-observable/es/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var _ponyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ponyfill.js */ "./node_modules/symbol-observable/es/ponyfill.js");
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {}

var result = Object(_ponyfill_js__WEBPACK_IMPORTED_MODULE_0__["default"])(root);
/* harmony default export */ __webpack_exports__["default"] = (result);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./node_modules/symbol-observable/es/ponyfill.js":
/*!*******************************************************!*\
  !*** ./node_modules/symbol-observable/es/ponyfill.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return symbolObservablePonyfill; });
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ }),

/***/ "./node_modules/webext-redux/lib/alias/alias.js":
/*!******************************************************!*\
  !*** ./node_modules/webext-redux/lib/alias/alias.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Simple middleware intercepts actions and replaces with
 * another by calling an alias function with the original action
 * @type {object} aliases an object that maps action types (keys) to alias functions (values) (e.g. { SOME_ACTION: newActionAliasFunc })
 */
var _default = function _default(aliases) {
  return function () {
    return function (next) {
      return function (action) {
        var alias = aliases[action.type];

        if (alias) {
          return next(alias(action));
        }

        return next(action);
      };
    };
  };
};

exports.default = _default;

/***/ }),

/***/ "./node_modules/webext-redux/lib/constants/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/webext-redux/lib/constants/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_PORT_NAME = exports.PATCH_STATE_TYPE = exports.STATE_TYPE = exports.DISPATCH_TYPE = void 0;
// Message type used for dispatch events
// from the Proxy Stores to background
var DISPATCH_TYPE = 'chromex.dispatch'; // Message type for state update events from
// background to Proxy Stores

exports.DISPATCH_TYPE = DISPATCH_TYPE;
var STATE_TYPE = 'chromex.state'; // Message type for state patch events from
// background to Proxy Stores

exports.STATE_TYPE = STATE_TYPE;
var PATCH_STATE_TYPE = 'chromex.patch_state'; // The default name for the port communication via
// react-chrome-redux

exports.PATCH_STATE_TYPE = PATCH_STATE_TYPE;
var DEFAULT_PORT_NAME = "chromex.port_name";
exports.DEFAULT_PORT_NAME = DEFAULT_PORT_NAME;

/***/ }),

/***/ "./node_modules/webext-redux/lib/index.js":
/*!************************************************!*\
  !*** ./node_modules/webext-redux/lib/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Store", {
  enumerable: true,
  get: function get() {
    return _Store.default;
  }
});
Object.defineProperty(exports, "applyMiddleware", {
  enumerable: true,
  get: function get() {
    return _applyMiddleware.default;
  }
});
Object.defineProperty(exports, "wrapStore", {
  enumerable: true,
  get: function get() {
    return _wrapStore.default;
  }
});
Object.defineProperty(exports, "alias", {
  enumerable: true,
  get: function get() {
    return _alias.default;
  }
});

var _Store = _interopRequireDefault(__webpack_require__(/*! ./store/Store */ "./node_modules/webext-redux/lib/store/Store.js"));

var _applyMiddleware = _interopRequireDefault(__webpack_require__(/*! ./store/applyMiddleware */ "./node_modules/webext-redux/lib/store/applyMiddleware.js"));

var _wrapStore = _interopRequireDefault(__webpack_require__(/*! ./wrap-store/wrapStore */ "./node_modules/webext-redux/lib/wrap-store/wrapStore.js"));

var _alias = _interopRequireDefault(__webpack_require__(/*! ./alias/alias */ "./node_modules/webext-redux/lib/alias/alias.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./node_modules/webext-redux/lib/serialization.js":
/*!********************************************************!*\
  !*** ./node_modules/webext-redux/lib/serialization.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withSerializer = exports.withDeserializer = exports.noop = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var noop = function noop(payload) {
  return payload;
};

exports.noop = noop;

var transformPayload = function transformPayload(message) {
  var transformer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  return _objectSpread({}, message, message.payload ? {
    payload: transformer(message.payload)
  } : {});
};

var deserializeListener = function deserializeListener(listener) {
  var deserializer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  var shouldDeserialize = arguments.length > 2 ? arguments[2] : undefined;

  // If a shouldDeserialize function is passed, return a function that uses it
  // to check if any given message payload should be deserialized
  if (shouldDeserialize) {
    return function (message) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (shouldDeserialize.apply(void 0, [message].concat(args))) {
        return listener.apply(void 0, [transformPayload(message, deserializer)].concat(args));
      }

      return listener.apply(void 0, [message].concat(args));
    };
  } // Otherwise, return a function that tries to deserialize on every message


  return function (message) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return listener.apply(void 0, [transformPayload(message, deserializer)].concat(args));
  };
};
/**
 * A function returned from withDeserializer that, when called, wraps addListenerFn with the
 * deserializer passed to withDeserializer.
 * @name AddListenerDeserializer
 * @function
 * @param {Function} addListenerFn The add listener function to wrap.
 * @returns {DeserializedAddListener}
 */

/**
 * A wrapped add listener function that registers the given listener.
 * @name DeserializedAddListener
 * @function
 * @param {Function} listener The listener function to register. It should expect the (optionally)
 * deserialized message as its first argument.
 * @param {Function} [shouldDeserialize] A function that takes the arguments passed to the listener
 * and returns whether the message payload should be deserialized. Not all messages (notably, messages
 * this listener doesn't care about) should be attempted to be deserialized.
 */

/**
 * Given a deserializer, returns an AddListenerDeserializer function that that takes an add listener
 * function and returns a DeserializedAddListener that automatically deserializes message payloads.
 * Each message listener is expected to take the message as its first argument.
 * @param {Function} deserializer A function that deserializes a message payload.
 * @returns {AddListenerDeserializer}
 * Example Usage:
 *   const withJsonDeserializer = withDeserializer(payload => JSON.parse(payload));
 *   const deserializedChromeListener = withJsonDeserializer(chrome.runtime.onMessage.addListener);
 *   const shouldDeserialize = (message) => message.type === 'DESERIALIZE_ME';
 *   deserializedChromeListener(message => console.log("Payload:", message.payload), shouldDeserialize);
 *   chrome.runtime.sendMessage("{'type:'DESERIALIZE_ME','payload':{'prop':4}}");
 *   //Payload: { prop: 4 };
 *   chrome.runtime.sendMessage("{'payload':{'prop':4}}");
 *   //Payload: "{'prop':4}";
 */


var withDeserializer = function withDeserializer() {
  var deserializer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;
  return function (addListenerFn) {
    return function (listener, shouldDeserialize) {
      return addListenerFn(deserializeListener(listener, deserializer, shouldDeserialize));
    };
  };
};
/**
 * Given a serializer, returns a function that takes a message sending
 * function as its sole argument and returns a wrapped message sender that
 * automaticaly serializes message payloads. The message sender
 * is expected to take the message as its first argument, unless messageArgIndex
 * is nonzero, in which case it is expected in the position specified by messageArgIndex.
 * @param {Function} serializer A function that serializes a message payload
 * Example Usage:
 *   const withJsonSerializer = withSerializer(payload => JSON.stringify(payload))
 *   const serializedChromeSender = withJsonSerializer(chrome.runtime.sendMessage)
 *   chrome.runtime.addListener(message => console.log("Payload:", message.payload))
 *   serializedChromeSender({ payload: { prop: 4 }})
 *   //Payload: "{'prop':4}"
 */


exports.withDeserializer = withDeserializer;

var withSerializer = function withSerializer() {
  var serializer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;
  return function (sendMessageFn) {
    var messageArgIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      if (args.length <= messageArgIndex) {
        throw new Error("Message in request could not be serialized. " + "Expected message in position ".concat(messageArgIndex, " but only received ").concat(args.length, " args."));
      }

      args[messageArgIndex] = transformPayload(args[messageArgIndex], serializer);
      return sendMessageFn.apply(void 0, args);
    };
  };
};

exports.withSerializer = withSerializer;

/***/ }),

/***/ "./node_modules/webext-redux/lib/store/Store.js":
/*!******************************************************!*\
  !*** ./node_modules/webext-redux/lib/store/Store.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash.assignin */ "./node_modules/lodash.assignin/index.js"));

var _constants = __webpack_require__(/*! ../constants */ "./node_modules/webext-redux/lib/constants/index.js");

var _serialization = __webpack_require__(/*! ../serialization */ "./node_modules/webext-redux/lib/serialization.js");

var _patch = _interopRequireDefault(__webpack_require__(/*! ../strategies/shallowDiff/patch */ "./node_modules/webext-redux/lib/strategies/shallowDiff/patch.js"));

var _util = __webpack_require__(/*! ../util */ "./node_modules/webext-redux/lib/util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var backgroundErrPrefix = '\nLooks like there is an error in the background page. ' + 'You might want to inspect your background page for more details.\n';
var defaultOpts = {
  portName: _constants.DEFAULT_PORT_NAME,
  state: {},
  extensionId: null,
  serializer: _serialization.noop,
  deserializer: _serialization.noop,
  patchStrategy: _patch.default
};

var Store =
/*#__PURE__*/
function () {
  /**
   * Creates a new Proxy store
   * @param  {object} options An object of form {portName, state, extensionId, serializer, deserializer, diffStrategy}, where `portName` is a required string and defines the name of the port for state transition changes, `state` is the initial state of this store (default `{}`) `extensionId` is the extension id as defined by browserAPI when extension is loaded (default `''`), `serializer` is a function to serialize outgoing message payloads (default is passthrough), `deserializer` is a function to deserialize incoming message payloads (default is passthrough), and patchStrategy is one of the included patching strategies (default is shallow diff) or a custom patching function.
   */
  function Store() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOpts,
        _ref$portName = _ref.portName,
        portName = _ref$portName === void 0 ? defaultOpts.portName : _ref$portName,
        _ref$state = _ref.state,
        state = _ref$state === void 0 ? defaultOpts.state : _ref$state,
        _ref$extensionId = _ref.extensionId,
        extensionId = _ref$extensionId === void 0 ? defaultOpts.extensionId : _ref$extensionId,
        _ref$serializer = _ref.serializer,
        serializer = _ref$serializer === void 0 ? defaultOpts.serializer : _ref$serializer,
        _ref$deserializer = _ref.deserializer,
        deserializer = _ref$deserializer === void 0 ? defaultOpts.deserializer : _ref$deserializer,
        _ref$patchStrategy = _ref.patchStrategy,
        patchStrategy = _ref$patchStrategy === void 0 ? defaultOpts.patchStrategy : _ref$patchStrategy;

    _classCallCheck(this, Store);

    if (!portName) {
      throw new Error('portName is required in options');
    }

    if (typeof serializer !== 'function') {
      throw new Error('serializer must be a function');
    }

    if (typeof deserializer !== 'function') {
      throw new Error('deserializer must be a function');
    }

    if (typeof patchStrategy !== 'function') {
      throw new Error('patchStrategy must be one of the included patching strategies or a custom patching function');
    }

    this.portName = portName;
    this.readyResolved = false;
    this.readyPromise = new Promise(function (resolve) {
      return _this.readyResolve = resolve;
    });
    this.browserAPI = (0, _util.getBrowserAPI)();
    this.extensionId = extensionId; // keep the extensionId as an instance variable

    this.port = this.browserAPI.runtime.connect(this.extensionId, {
      name: portName
    });
    this.safetyHandler = this.safetyHandler.bind(this);
    this.safetyMessage = this.browserAPI.runtime.onMessage.addListener(this.safetyHandler);
    this.serializedPortListener = (0, _serialization.withDeserializer)(deserializer)(function () {
      var _this$port$onMessage;

      return (_this$port$onMessage = _this.port.onMessage).addListener.apply(_this$port$onMessage, arguments);
    });
    this.serializedMessageSender = (0, _serialization.withSerializer)(serializer)(function () {
      var _this$browserAPI$runt;

      return (_this$browserAPI$runt = _this.browserAPI.runtime).sendMessage.apply(_this$browserAPI$runt, arguments);
    }, 1);
    this.listeners = [];
    this.state = state;
    this.patchStrategy = patchStrategy; // Don't use shouldDeserialize here, since no one else should be using this port

    this.serializedPortListener(function (message) {
      switch (message.type) {
        case _constants.STATE_TYPE:
          _this.replaceState(message.payload);

          if (!_this.readyResolved) {
            _this.readyResolved = true;

            _this.readyResolve();
          }

          break;

        case _constants.PATCH_STATE_TYPE:
          _this.patchState(message.payload);

          break;

        default: // do nothing

      }
    });
    this.dispatch = this.dispatch.bind(this); // add this context to dispatch
  }
  /**
  * Returns a promise that resolves when the store is ready. Optionally a callback may be passed in instead.
  * @param [function] callback An optional callback that may be passed in and will fire when the store is ready.
  * @return {object} promise A promise that resolves when the store has established a connection with the background page.
  */


  _createClass(Store, [{
    key: "ready",
    value: function ready() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (cb !== null) {
        return this.readyPromise.then(cb);
      }

      return this.readyPromise;
    }
    /**
     * Subscribes a listener function for all state changes
     * @param  {function} listener A listener function to be called when store state changes
     * @return {function}          An unsubscribe function which can be called to remove the listener from state updates
     */

  }, {
    key: "subscribe",
    value: function subscribe(listener) {
      var _this2 = this;

      this.listeners.push(listener);
      return function () {
        _this2.listeners = _this2.listeners.filter(function (l) {
          return l !== listener;
        });
      };
    }
    /**
     * Replaces the state for only the keys in the updated state. Notifies all listeners of state change.
     * @param {object} state the new (partial) redux state
     */

  }, {
    key: "patchState",
    value: function patchState(difference) {
      this.state = this.patchStrategy(this.state, difference);
      this.listeners.forEach(function (l) {
        return l();
      });
    }
    /**
     * Replace the current state with a new state. Notifies all listeners of state change.
     * @param  {object} state The new state for the store
     */

  }, {
    key: "replaceState",
    value: function replaceState(state) {
      this.state = state;
      this.listeners.forEach(function (l) {
        return l();
      });
    }
    /**
     * Get the current state of the store
     * @return {object} the current store state
     */

  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
    /**
     * Stub function to stay consistent with Redux Store API. No-op.
     */

  }, {
    key: "replaceReducer",
    value: function replaceReducer() {
      return;
    }
    /**
     * Dispatch an action to the background using messaging passing
     * @param  {object} data The action data to dispatch
     * @return {Promise}     Promise that will resolve/reject based on the action response from the background
     */

  }, {
    key: "dispatch",
    value: function dispatch(data) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.serializedMessageSender(_this3.extensionId, {
          type: _constants.DISPATCH_TYPE,
          portName: _this3.portName,
          payload: data
        }, null, function (resp) {
          var error = resp.error,
              value = resp.value;

          if (error) {
            var bgErr = new Error("".concat(backgroundErrPrefix).concat(error));
            reject((0, _lodash.default)(bgErr, error));
          } else {
            resolve(value && value.payload);
          }
        });
      });
    }
  }, {
    key: "safetyHandler",
    value: function safetyHandler(message) {
      if (message.action === 'storeReady') {
        // Remove Saftey Listener
        this.browserAPI.runtime.onMessage.removeListener(this.safetyHandler); // Resolve if readyPromise has not been resolved.

        if (!this.readyResolved) {
          this.readyResolved = true;
          this.readyResolve();
        }
      }
    }
  }]);

  return Store;
}();

var _default = Store;
exports.default = _default;

/***/ }),

/***/ "./node_modules/webext-redux/lib/store/applyMiddleware.js":
/*!****************************************************************!*\
  !*** ./node_modules/webext-redux/lib/store/applyMiddleware.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyMiddleware;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Function taken from redux source
// https://github.com/reactjs/redux/blob/master/src/compose.js
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
} // Based on redux implementation of applyMiddleware to support all standard
// redux middlewares


function applyMiddleware(store) {
  for (var _len2 = arguments.length, middlewares = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    middlewares[_key2 - 1] = arguments[_key2];
  }

  var _dispatch = function dispatch() {
    throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
  };

  var middlewareAPI = {
    getState: store.getState.bind(store),
    dispatch: function dispatch() {
      return _dispatch.apply(void 0, arguments);
    }
  };
  middlewares = (middlewares || []).map(function (middleware) {
    return middleware(middlewareAPI);
  });
  _dispatch = compose.apply(void 0, _toConsumableArray(middlewares))(store.dispatch);
  store.dispatch = _dispatch;
  return store;
}

/***/ }),

/***/ "./node_modules/webext-redux/lib/strategies/constants.js":
/*!***************************************************************!*\
  !*** ./node_modules/webext-redux/lib/strategies/constants.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DIFF_STATUS_ARRAY_UPDATED = exports.DIFF_STATUS_KEYS_UPDATED = exports.DIFF_STATUS_REMOVED = exports.DIFF_STATUS_UPDATED = void 0;
// The `change` value for updated or inserted fields resulting from shallow diff
var DIFF_STATUS_UPDATED = 'updated'; // The `change` value for removed fields resulting from shallow diff

exports.DIFF_STATUS_UPDATED = DIFF_STATUS_UPDATED;
var DIFF_STATUS_REMOVED = 'removed';
exports.DIFF_STATUS_REMOVED = DIFF_STATUS_REMOVED;
var DIFF_STATUS_KEYS_UPDATED = 'updated_keys';
exports.DIFF_STATUS_KEYS_UPDATED = DIFF_STATUS_KEYS_UPDATED;
var DIFF_STATUS_ARRAY_UPDATED = 'updated_array';
exports.DIFF_STATUS_ARRAY_UPDATED = DIFF_STATUS_ARRAY_UPDATED;

/***/ }),

/***/ "./node_modules/webext-redux/lib/strategies/shallowDiff/diff.js":
/*!**********************************************************************!*\
  !*** ./node_modules/webext-redux/lib/strategies/shallowDiff/diff.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shallowDiff;

var _constants = __webpack_require__(/*! ../constants */ "./node_modules/webext-redux/lib/strategies/constants.js");

/**
 * Returns a new Object containing only the fields in `new` that differ from `old`
 *
 * @param {Object} old
 * @param {Object} new
 * @return {Array} An array of changes. The changes have a `key`, `value`, and `change`.
 *   The change is either `updated`, which is if the value has changed or been added,
 *   or `removed`.
 */
function shallowDiff(oldObj, newObj) {
  var difference = [];
  Object.keys(newObj).forEach(function (key) {
    if (oldObj[key] !== newObj[key]) {
      difference.push({
        key: key,
        value: newObj[key],
        change: _constants.DIFF_STATUS_UPDATED
      });
    }
  });
  Object.keys(oldObj).forEach(function (key) {
    if (!newObj.hasOwnProperty(key)) {
      difference.push({
        key: key,
        change: _constants.DIFF_STATUS_REMOVED
      });
    }
  });
  return difference;
}

/***/ }),

/***/ "./node_modules/webext-redux/lib/strategies/shallowDiff/patch.js":
/*!***********************************************************************!*\
  !*** ./node_modules/webext-redux/lib/strategies/shallowDiff/patch.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _constants = __webpack_require__(/*! ../constants */ "./node_modules/webext-redux/lib/strategies/constants.js");

function _default(obj, difference) {
  var newObj = Object.assign({}, obj);
  difference.forEach(function (_ref) {
    var change = _ref.change,
        key = _ref.key,
        value = _ref.value;

    switch (change) {
      case _constants.DIFF_STATUS_UPDATED:
        newObj[key] = value;
        break;

      case _constants.DIFF_STATUS_REMOVED:
        Reflect.deleteProperty(newObj, key);
        break;

      default: // do nothing

    }
  });
  return newObj;
}

/***/ }),

/***/ "./node_modules/webext-redux/lib/util.js":
/*!***********************************************!*\
  !*** ./node_modules/webext-redux/lib/util.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBrowserAPI = getBrowserAPI;

/**
 * Looks for a global browser api, first checking the chrome namespace and then
 * checking the browser namespace. If no appropriate namespace is present, this
 * function will throw an error.
 */
function getBrowserAPI() {
  var api = global.chrome || global.browser || browser;

  if (!api) {
    throw new Error("Browser API is not present");
  }

  return api;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webext-redux/lib/wrap-store/wrapStore.js":
/*!***************************************************************!*\
  !*** ./node_modules/webext-redux/lib/wrap-store/wrapStore.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./node_modules/webext-redux/lib/constants/index.js");

var _serialization = __webpack_require__(/*! ../serialization */ "./node_modules/webext-redux/lib/serialization.js");

var _util = __webpack_require__(/*! ../util */ "./node_modules/webext-redux/lib/util.js");

var _diff = _interopRequireDefault(__webpack_require__(/*! ../strategies/shallowDiff/diff */ "./node_modules/webext-redux/lib/strategies/shallowDiff/diff.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Responder for promisified results
 * @param  {object} dispatchResult The result from `store.dispatch()`
 * @param  {function} send         The function used to respond to original message
 * @return {undefined}
 */
var promiseResponder = function promiseResponder(dispatchResult, send) {
  Promise.resolve(dispatchResult).then(function (res) {
    send({
      error: null,
      value: res
    });
  }).catch(function (err) {
    console.error('error dispatching result:', err);
    send({
      error: err.message,
      value: null
    });
  });
};

var defaultOpts = {
  portName: _constants.DEFAULT_PORT_NAME,
  dispatchResponder: promiseResponder,
  serializer: _serialization.noop,
  deserializer: _serialization.noop,
  diffStrategy: _diff.default
};
/**
 * Wraps a Redux store so that proxy stores can connect to it.
 * @param {Object} store A Redux store
 * @param {Object} options An object of form {portName, dispatchResponder, serializer, deserializer}, where `portName` is a required string and defines the name of the port for state transition changes, `dispatchResponder` is a function that takes the result of a store dispatch and optionally implements custom logic for responding to the original dispatch message,`serializer` is a function to serialize outgoing message payloads (default is passthrough), `deserializer` is a function to deserialize incoming message payloads (default is passthrough), and diffStrategy is one of the included diffing strategies (default is shallow diff) or a custom diffing function.
 */

var _default = function _default(store) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOpts,
      _ref$portName = _ref.portName,
      portName = _ref$portName === void 0 ? defaultOpts.portName : _ref$portName,
      _ref$dispatchResponde = _ref.dispatchResponder,
      dispatchResponder = _ref$dispatchResponde === void 0 ? defaultOpts.dispatchResponder : _ref$dispatchResponde,
      _ref$serializer = _ref.serializer,
      serializer = _ref$serializer === void 0 ? defaultOpts.serializer : _ref$serializer,
      _ref$deserializer = _ref.deserializer,
      deserializer = _ref$deserializer === void 0 ? defaultOpts.deserializer : _ref$deserializer,
      _ref$diffStrategy = _ref.diffStrategy,
      diffStrategy = _ref$diffStrategy === void 0 ? defaultOpts.diffStrategy : _ref$diffStrategy;

  if (!portName) {
    throw new Error('portName is required in options');
  }

  if (typeof serializer !== 'function') {
    throw new Error('serializer must be a function');
  }

  if (typeof deserializer !== 'function') {
    throw new Error('deserializer must be a function');
  }

  if (typeof diffStrategy !== 'function') {
    throw new Error('diffStrategy must be one of the included diffing strategies or a custom diff function');
  }

  var browserAPI = (0, _util.getBrowserAPI)();
  /**
   * Respond to dispatches from UI components
   */

  var dispatchResponse = function dispatchResponse(request, sender, sendResponse) {
    if (request.type === _constants.DISPATCH_TYPE && request.portName === portName) {
      var action = Object.assign({}, request.payload, {
        _sender: sender
      });
      var dispatchResult = null;

      try {
        dispatchResult = store.dispatch(action);
      } catch (e) {
        dispatchResult = Promise.reject(e.message);
        console.error(e);
      }

      dispatchResponder(dispatchResult, sendResponse);
      return true;
    }
  };
  /**
  * Setup for state updates
  */


  var connectState = function connectState(port) {
    if (port.name !== portName) {
      return;
    }

    var serializedMessagePoster = (0, _serialization.withSerializer)(serializer)(function () {
      return port.postMessage.apply(port, arguments);
    });
    var prevState = store.getState();

    var patchState = function patchState() {
      var state = store.getState();
      var diff = diffStrategy(prevState, state);

      if (diff.length) {
        prevState = state;
        serializedMessagePoster({
          type: _constants.PATCH_STATE_TYPE,
          payload: diff
        });
      }
    }; // Send patched state down connected port on every redux store state change


    var unsubscribe = store.subscribe(patchState); // when the port disconnects, unsubscribe the sendState listener

    port.onDisconnect.addListener(unsubscribe); // Send store's initial state through port

    serializedMessagePoster({
      type: _constants.STATE_TYPE,
      payload: prevState
    });
  };

  var withPayloadDeserializer = (0, _serialization.withDeserializer)(deserializer);

  var shouldDeserialize = function shouldDeserialize(request) {
    return request.type === _constants.DISPATCH_TYPE && request.portName === portName;
  };
  /**
   * Setup action handler
   */


  withPayloadDeserializer(function () {
    var _browserAPI$runtime$o;

    return (_browserAPI$runtime$o = browserAPI.runtime.onMessage).addListener.apply(_browserAPI$runtime$o, arguments);
  })(dispatchResponse, shouldDeserialize);
  /**
   * Setup external action handler
   */

  if (browserAPI.runtime.onMessageExternal) {
    withPayloadDeserializer(function () {
      var _browserAPI$runtime$o2;

      return (_browserAPI$runtime$o2 = browserAPI.runtime.onMessageExternal).addListener.apply(_browserAPI$runtime$o2, arguments);
    })(dispatchResponse, shouldDeserialize);
  } else {
    console.warn('runtime.onMessageExternal is not supported');
  }
  /**
   * Setup extended connection
   */


  browserAPI.runtime.onConnect.addListener(connectState);
  /**
   * Setup extended external connection
   */

  if (browserAPI.runtime.onConnectExternal) {
    browserAPI.runtime.onConnectExternal.addListener(connectState);
  } else {
    console.warn('runtime.onConnectExternal is not supported');
  }
  /**
   * Safety message to tabs for content scripts
   */


  browserAPI.tabs.query({}, function (tabs) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = tabs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var tab = _step.value;
        browserAPI.tabs.sendMessage(tab.id, {
          action: 'storeReady'
        }, function () {
          if (chrome.runtime.lastError) {// do nothing - errors can be present
            // if no content script exists on reciever
          }
        });
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }); // For non-tab based
  // TODO: Find use case for this. Ommiting until then.
  // browserAPI.runtime.sendMessage(null, {action: 'storeReady'});
};

exports.default = _default;

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/background/browser.tsx":
/*!************************************!*\
  !*** ./src/background/browser.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions = __webpack_require__(/*! ./redux/actions */ "./src/background/redux/actions.tsx");
var store_1 = __webpack_require__(/*! ./redux/store */ "./src/background/redux/store.tsx");
function updateBadge(enabled) {
    if (enabled) {
        chrome.browserAction.setBadgeText({
            text: "ON"
        });
        chrome.browserAction.setBadgeBackgroundColor({
            color: "#15a341"
        });
    }
    else {
        chrome.browserAction.setBadgeText({
            text: "OFF"
        });
        chrome.browserAction.setBadgeBackgroundColor({
            color: "#7e2013"
        });
    }
}
exports.updateBadge = updateBadge;
function listenTabChange(callback) {
    if (callback === void 0) { callback = null; }
    // Handle the chrome tab change
    chrome.tabs.onActivated.addListener(function () {
        // Get Current Trab
        getCurrentTab();
        // Execute callback
        if (callback) {
            callback();
        }
    });
}
exports.listenTabChange = listenTabChange;
function listenForUXA(callback) {
    if (callback === void 0) { callback = null; }
    var filters = { urls: ["*://t.contentsquare.net/uxa/*.js"] };
    // Handling UXA request. Waiting for onResponseStarted to make sure it'
    chrome.webRequest.onResponseStarted.addListener(function (details) {
        store_1.default.dispatch(actions.setUxaOn(details.tabId, details.url));
        // Execute callback
        if (callback) {
            callback();
        }
    }, filters);
}
exports.listenForUXA = listenForUXA;
function listenApiCall() {
    var filters = { urls: ["*://c.contentsquare.net/*", "*://c.contentsquare.com/*"] };
    chrome.webRequest.onResponseStarted.addListener(function (details) {
        store_1.default.dispatch(actions.addTagApiRequest(details.tabId, details.timeStamp, details.url));
        return {};
    }, filters);
}
exports.listenApiCall = listenApiCall;
/**
 * Get current opened tab in browser and dispatch the proper action to redux
 */
function getCurrentTab() {
    chrome.tabs.getSelected(null, function (tab) {
        store_1.default.dispatch(actions.setCurrentTab(tab.id, tab.url));
    });
}
exports.getCurrentTab = getCurrentTab;
/**
 * Get all cookies for a specific url. Filter them to only get the contentsqaure cookies
 * @param  {string} url
 */
function getCookies(url) {
    chrome.cookies.getAll({ url: url }, function (cookies) {
        var filtered = Array.from(cookies.filter(function (cookie) { return cookie.name.includes("_cs"); }));
        store_1.default.dispatch(actions.setCookies(filtered));
    });
}
exports.getCookies = getCookies;
/**
 * Delete cookie
 * @param  {string} url
 * @param  {ICookie} cookie
 * @param  {function(deleted: boolean)} callback
 */
function deleteCookie(url, cookie, callback) {
    if (callback === void 0) { callback = null; }
    chrome.cookies.remove({
        'url': url,
        'name': cookie.name,
        'storeId': cookie.storeId
    }, function (details) {
        if (callback && (details === undefined || typeof details === "undefined")) {
            callback(false);
        }
        else if (callback) {
            callback(true);
        }
    });
}
exports.deleteCookie = deleteCookie;
/**
 * Update cookie. To update a cookie we delete the previous existing
 * cookie and then set a new one
 *
 * @param  {string} url
 * @param  {ICookie} cookie
 * @param  {function(deleted: boolean)} callback
 */
function updateCookie(url, cookie, callback) {
    if (callback === void 0) { callback = null; }
    // Removing uneeded fields
    delete cookie.hostOnly;
    delete cookie.session;
    deleteCookie(url, cookie, function (success) {
        if (success) {
            chrome.cookies.set(__assign({}, cookie, { url: url }), function (cookie) {
                if (callback && (cookie === undefined || typeof cookie === "undefined")) {
                    callback(false);
                }
                else if (callback) {
                    callback(true);
                }
            });
        }
        else if (callback) {
            // Execute callback with failure
            callback(false);
        }
    });
}
exports.updateCookie = updateCookie;
/**
 * Refresh the page of currentTabId
 *
 * function (){
            if(chrome.runtime.lastError){
                console.error(chrome.runtime.lastError.message);
            }
        }
 */
function refreshPage(tabId) {
    var code = 'window.location.reload();';
    chrome.tabs.executeScript(tabId, { code: code }, captureChromeError);
}
exports.refreshPage = refreshPage;
function captureChromeError() {
    if (chrome.runtime.lastError) {
        var message = chrome.runtime.lastError.message;
        // Clear error
        delete chrome.runtime.lastError;
        console.log(message);
    }
}
exports.captureChromeError = captureChromeError;


/***/ }),

/***/ "./src/background/index.tsx":
/*!**********************************!*\
  !*** ./src/background/index.tsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var browser = __webpack_require__(/*! ./browser */ "./src/background/browser.tsx");
var constants_1 = __webpack_require__(/*! ../shared/constants */ "./src/shared/constants.tsx");
var actions_1 = __webpack_require__(/*! ./redux/actions */ "./src/background/redux/actions.tsx");
var store_1 = __webpack_require__(/*! ./redux/store */ "./src/background/redux/store.tsx");
var webext_redux_1 = __webpack_require__(/*! webext-redux */ "./node_modules/webext-redux/lib/index.js");
// Initialize store
webext_redux_1.wrapStore(store_1.default, {
    portName: constants_1.REDUX_PORT_NAME
});
// Get Active Tab
browser.getCurrentTab();
browser.listenTabChange();
// browser.getActiveTab();
// Set up listeners
browser.listenForUXA(function () {
    store_1.default.dispatch(actions_1.getCookies());
    browser.listenApiCall();
});
//Update badge
browser.updateBadge(false);


/***/ }),

/***/ "./src/background/redux/actions.tsx":
/*!******************************************!*\
  !*** ./src/background/redux/actions.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(/*! ./constants */ "./src/background/redux/constants.tsx");
function attachDebugger() {
    return {
        type: constants_1.BackgroundActionTypes.ATTACH_DEBUGGER
    };
}
exports.attachDebugger = attachDebugger;
;
function setUxaOn(tId, u) {
    return {
        type: constants_1.BackgroundActionTypes.SET_UXA_ON,
        tabId: tId,
        url: u
    };
}
exports.setUxaOn = setUxaOn;
;
function addTagApiRequest(tId, ts, u) {
    return {
        type: constants_1.BackgroundActionTypes.ADD_TAG_API_REQUEST,
        tabId: tId,
        timeStamp: ts,
        url: u
    };
}
exports.addTagApiRequest = addTagApiRequest;
;
function getCookies() {
    return {
        type: constants_1.BackgroundActionTypes.GET_COOKIES
    };
}
exports.getCookies = getCookies;
;
function setCookies(cookies) {
    return {
        type: constants_1.BackgroundActionTypes.SET_COOKIES,
        cookies: cookies
    };
}
exports.setCookies = setCookies;
;
function setCurrentTab(tabId, hostname) {
    return {
        type: constants_1.BackgroundActionTypes.SET_CURRENT_TAB,
        tabId: tabId,
        domain: hostname
    };
}
exports.setCurrentTab = setCurrentTab;
;


/***/ }),

/***/ "./src/background/redux/constants.tsx":
/*!********************************************!*\
  !*** ./src/background/redux/constants.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BackgroundActionTypes;
(function (BackgroundActionTypes) {
    BackgroundActionTypes["SET_CURRENT_TAB"] = "@@Background/SET_CURRENT_TAB";
    // Those 2 actions concern only the debug feature
    BackgroundActionTypes["ATTACH_DEBUGGER"] = "@@Background/ATTACH_DEBUGGER";
    BackgroundActionTypes["RAPLACE_UXA"] = "@@Background/REPLACE_UXA";
    BackgroundActionTypes["SET_UXA_ON"] = "@@Background/SET_UXA_ON";
    BackgroundActionTypes["ADD_TAG_API_REQUEST"] = "@@Background/ADD_TAG_API_REQUEST";
    BackgroundActionTypes["GET_COOKIES"] = "@@Background/GET_COOKIES";
    BackgroundActionTypes["SET_COOKIES"] = "@@Background/SET_COOKIES";
})(BackgroundActionTypes = exports.BackgroundActionTypes || (exports.BackgroundActionTypes = {}));


/***/ }),

/***/ "./src/background/redux/reducers.tsx":
/*!*******************************************!*\
  !*** ./src/background/redux/reducers.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions = __webpack_require__(/*! ./actions */ "./src/background/redux/actions.tsx");
var browser_1 = __webpack_require__(/*! ../browser */ "./src/background/browser.tsx");
var utils_1 = __webpack_require__(/*! ../utils */ "./src/background/utils.tsx");
var constants_1 = __webpack_require__(/*! ./constants */ "./src/background/redux/constants.tsx");
var constants_2 = __webpack_require__(/*! ../../shared/constants */ "./src/shared/constants.tsx");
var store_1 = __webpack_require__(/*! ./store */ "./src/background/redux/store.tsx");
exports.initialState = {
    currentTabId: null,
    currentUrl: null,
    tabs: null
};
exports.backgroundReducer = function (state, action) {
    var _a, _b, _c, _d, _e, _f;
    if (state === void 0) { state = exports.initialState; }
    var tabId = state.currentTabId;
    switch (action.type) {
        case constants_1.BackgroundActionTypes.ATTACH_DEBUGGER:
            break;
        case constants_1.BackgroundActionTypes.SET_UXA_ON:
            state = __assign({}, state, { tabs: __assign({}, state.tabs, (_a = {}, _a[tabId] = __assign({}, state.tabs[tabId], { hasTag: true }), _a)) });
            // TODO: Create Update badge action for redux
            browser_1.updateBadge(true);
            break;
        case constants_1.BackgroundActionTypes.GET_COOKIES:
            if (state.currentUrl) {
                browser_1.getCookies(state.currentUrl);
            }
            break;
        case constants_1.BackgroundActionTypes.SET_COOKIES:
            tabId = state.currentTabId;
            state = __assign({}, state, { tabs: __assign({}, state.tabs, (_b = {}, _b[tabId] = __assign({}, state.tabs[tabId], { cookies: action.cookies }), _b)) });
            break;
        case constants_1.BackgroundActionTypes.SET_CURRENT_TAB:
            tabId = action.tabId;
            state = __assign({}, state, { currentTabId: tabId, currentUrl: action.domain });
            state = state[tabId] ? state : __assign({}, state, { tabs: __assign({}, state.tabs, (_c = {}, _c[tabId] = { hasTag: false, uxaUrl: null, requests: {}, tagConfig: null, cookies: [] }, _c)) });
            // TODO: Create Update badge action for redux
            // Dispatch update badge action
            break;
        case constants_1.BackgroundActionTypes.ADD_TAG_API_REQUEST:
            var uId = utils_1.hashRequest(action.tabId, action.timeStamp, action.url);
            var newRequest = utils_1.parseUrlAndCookies(action.url, action.timeStamp);
            state = __assign({}, state, { tabs: __assign({}, state.tabs, (_d = {}, _d[action.tabId] = __assign({}, state.tabs[action.tabId], { requests: __assign({}, state.tabs[action.tabId].requests, (_e = {}, _e[uId] = newRequest, _e)) }), _d)) });
            break;
        // Handling Shared Actions
        case constants_2.SharedActionTypes.UPDATE_COOKIE:
            if (state.currentUrl) {
                browser_1.updateCookie(state.currentUrl, action.cookie, function (success) {
                    if (success) {
                        store_1.default.dispatch(actions.getCookies());
                    }
                });
            }
            break;
        case constants_2.SharedActionTypes.REMOVE_COOKIE:
            if (state.currentUrl) {
                browser_1.deleteCookie(state.currentUrl, action.cookie, function (success) {
                    if (success) {
                        store_1.default.dispatch(actions.getCookies());
                    }
                });
            }
            break;
        case constants_2.SharedActionTypes.SET_TAG_CONF:
            if (tabId)
                state = __assign({}, state, { tabs: __assign({}, state.tabs, (_f = {}, _f[tabId] = __assign({}, state.tabs[tabId], { tagConfig: action.config, hasTag: true }), _f)) });
            break;
        case constants_2.SharedActionTypes.GET_COOKIES:
            if (state.currentUrl) {
                browser_1.getCookies(state.currentUrl);
            }
            break;
        case constants_2.SharedActionTypes.REFRESH_PAGE:
            browser_1.refreshPage(state.currentTabId);
            break;
    }
    return state;
};


/***/ }),

/***/ "./src/background/redux/store.tsx":
/*!****************************************!*\
  !*** ./src/background/redux/store.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
var reducers_1 = __webpack_require__(/*! ./reducers */ "./src/background/redux/reducers.tsx");
var redux_logger_1 = __webpack_require__(/*! redux-logger */ "./node_modules/redux-logger/dist/redux-logger.js");
var redux_thunk_1 = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
var store = redux_1.createStore(reducers_1.backgroundReducer, redux_1.applyMiddleware(redux_thunk_1.default, redux_logger_1.default));
exports.default = store;


/***/ }),

/***/ "./src/background/utils.tsx":
/*!**********************************!*\
  !*** ./src/background/utils.tsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sha1 = __webpack_require__(/*! sha1 */ "./node_modules/sha1/sha1.js");
function hashRequest(tabId, timeStamp, url) {
    var strToHash = tabId.toString() + timeStamp.toString() + url;
    return sha1(strToHash);
}
exports.hashRequest = hashRequest;
function parseUrlAndCookies(u, timeStamp) {
    var url = new URL(u);
    var params = [];
    url.searchParams.forEach(function (v, k) {
        params.push({ name: k, value: v });
    });
    return {
        type: url.pathname,
        timeStamp: timeStamp,
        url: u,
        params: params
    };
}
exports.parseUrlAndCookies = parseUrlAndCookies;


/***/ }),

/***/ "./src/shared/constants.tsx":
/*!**********************************!*\
  !*** ./src/shared/constants.tsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.REDUX_PORT_NAME = 'REDDUX_CS_TAG_DEBUGGER';
exports.CS_CONFIG = 'CS_CONFIG';
// Redux shared actions types
var SharedActionTypes;
(function (SharedActionTypes) {
    SharedActionTypes["SET_TAG_CONF"] = "@@Shared/SET_TAG_CONF";
    // Cookies actions
    SharedActionTypes["GET_COOKIES"] = "@@Shared/GET_COOKIES";
    SharedActionTypes["UPDATE_COOKIE"] = "@@Shared/UPDATE_COOKIE";
    SharedActionTypes["REMOVE_COOKIE"] = "@@Shared/REMOVE_COOKIE";
    // Refresh page
    SharedActionTypes["REFRESH_PAGE"] = "@@Shared/REFRESH_PAGE";
})(SharedActionTypes = exports.SharedActionTypes || (exports.SharedActionTypes = {}));


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jaGFyZW5jL2NoYXJlbmMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NyeXB0L2NyeXB0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduaW4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4LWxvZ2dlci9kaXN0L3JlZHV4LWxvZ2dlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVkdXgtdGh1bmsvZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL3JlZHV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zaGExL3NoYTEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9lcy9wb255ZmlsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViZXh0LXJlZHV4L2xpYi9hbGlhcy9hbGlhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViZXh0LXJlZHV4L2xpYi9jb25zdGFudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1yZWR1eC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1yZWR1eC9saWIvc2VyaWFsaXphdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViZXh0LXJlZHV4L2xpYi9zdG9yZS9TdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViZXh0LXJlZHV4L2xpYi9zdG9yZS9hcHBseU1pZGRsZXdhcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1yZWR1eC9saWIvc3RyYXRlZ2llcy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1yZWR1eC9saWIvc3RyYXRlZ2llcy9zaGFsbG93RGlmZi9kaWZmLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJleHQtcmVkdXgvbGliL3N0cmF0ZWdpZXMvc2hhbGxvd0RpZmYvcGF0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYmV4dC1yZWR1eC9saWIvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViZXh0LXJlZHV4L2xpYi93cmFwLXN0b3JlL3dyYXBTdG9yZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9oYXJtb255LW1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC9icm93c2VyLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC9pbmRleC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQvcmVkdXgvYWN0aW9ucy50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQvcmVkdXgvY29uc3RhbnRzLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC9yZWR1eC9yZWR1Y2Vycy50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQvcmVkdXgvc3RvcmUudHN4Iiwid2VicGFjazovLy8uL3NyYy9iYWNrZ3JvdW5kL3V0aWxzLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL2NvbnN0YW50cy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGWTs7QUFFWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDLFNBQVM7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBDQUEwQyxVQUFVO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVZOztBQUVaLGFBQWEsbUJBQU8sQ0FBQyxvREFBVztBQUNoQyxjQUFjLG1CQUFPLENBQUMsZ0RBQVM7QUFDL0IsY0FBYyxtQkFBTyxDQUFDLGdEQUFTOztBQUUvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG1EQUFtRDtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFVBQVU7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsaUJBQWlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxFQUFFO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0EscUJBQXFCLGVBQWU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxPQUFPO0FBQzlEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQjtBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsWUFBWTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLFlBQVk7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QUNBLFdBQVcsRUFBRTtBQUNiLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2IsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2IsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBRUYsT0FBTztRQUNMLElBQUksRUFBRSxHQUFHLENBQUMsUUFBUTtRQUNsQixTQUFTLEVBQUUsU0FBUztRQUNwQixHQUFHLEVBQUUsQ0FBQztRQUNOLE1BQU0sRUFBRSxNQUFNO0tBQ2YsQ0FBQztBQUNKLENBQUM7QUFiRCxnREFhQzs7Ozs7Ozs7Ozs7Ozs7O0FDckJZLHVCQUFlLEdBQUcsd0JBQXdCLENBQUM7QUFDM0MsaUJBQVMsR0FBRyxXQUFXLENBQUM7QUFFckMsNkJBQTZCO0FBQzdCLElBQVksaUJBVVg7QUFWRCxXQUFZLGlCQUFpQjtJQUN6QiwyREFBc0M7SUFFdEMsa0JBQWtCO0lBQ2xCLHlEQUFvQztJQUNwQyw2REFBd0M7SUFDeEMsNkRBQXdDO0lBRXhDLGVBQWU7SUFDZiwyREFBc0M7QUFDMUMsQ0FBQyxFQVZXLGlCQUFpQixHQUFqQix5QkFBaUIsS0FBakIseUJBQWlCLFFBVTVCIiwiZmlsZSI6ImJhY2tncm91bmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9iYWNrZ3JvdW5kL2luZGV4LnRzeFwiKTtcbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnRzLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5leHBvcnRzLnRvQnl0ZUFycmF5ID0gdG9CeXRlQXJyYXlcbmV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IGZyb21CeXRlQXJyYXlcblxudmFyIGxvb2t1cCA9IFtdXG52YXIgcmV2TG9va3VwID0gW11cbnZhciBBcnIgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBVaW50OEFycmF5IDogQXJyYXlcblxudmFyIGNvZGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLydcbmZvciAodmFyIGkgPSAwLCBsZW4gPSBjb2RlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gIGxvb2t1cFtpXSA9IGNvZGVbaV1cbiAgcmV2TG9va3VwW2NvZGUuY2hhckNvZGVBdChpKV0gPSBpXG59XG5cbi8vIFN1cHBvcnQgZGVjb2RpbmcgVVJMLXNhZmUgYmFzZTY0IHN0cmluZ3MsIGFzIE5vZGUuanMgZG9lcy5cbi8vIFNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmFzZTY0I1VSTF9hcHBsaWNhdGlvbnNcbnJldkxvb2t1cFsnLScuY2hhckNvZGVBdCgwKV0gPSA2MlxucmV2TG9va3VwWydfJy5jaGFyQ29kZUF0KDApXSA9IDYzXG5cbmZ1bmN0aW9uIGdldExlbnMgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyBUcmltIG9mZiBleHRyYSBieXRlcyBhZnRlciBwbGFjZWhvbGRlciBieXRlcyBhcmUgZm91bmRcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vYmVhdGdhbW1pdC9iYXNlNjQtanMvaXNzdWVzLzQyXG4gIHZhciB2YWxpZExlbiA9IGI2NC5pbmRleE9mKCc9JylcbiAgaWYgKHZhbGlkTGVuID09PSAtMSkgdmFsaWRMZW4gPSBsZW5cblxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gdmFsaWRMZW4gPT09IGxlblxuICAgID8gMFxuICAgIDogNCAtICh2YWxpZExlbiAlIDQpXG5cbiAgcmV0dXJuIFt2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuXVxufVxuXG4vLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKGI2NCkge1xuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiBfYnl0ZUxlbmd0aCAoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSB7XG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiB0b0J5dGVBcnJheSAoYjY0KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuXG4gIHZhciBhcnIgPSBuZXcgQXJyKF9ieXRlTGVuZ3RoKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikpXG5cbiAgdmFyIGN1ckJ5dGUgPSAwXG5cbiAgLy8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuICB2YXIgbGVuID0gcGxhY2VIb2xkZXJzTGVuID4gMFxuICAgID8gdmFsaWRMZW4gLSA0XG4gICAgOiB2YWxpZExlblxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTgpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHxcbiAgICAgIHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMyldXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDE2KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAyKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMSkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxMCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDYgJiAweDNGXSArXG4gICAgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9XG4gICAgICAoKHVpbnQ4W2ldIDw8IDE2KSAmIDB4RkYwMDAwKSArXG4gICAgICAoKHVpbnQ4W2kgKyAxXSA8PCA4KSAmIDB4RkYwMCkgK1xuICAgICAgKHVpbnQ4W2kgKyAyXSAmIDB4RkYpXG4gICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpXG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBmcm9tQnl0ZUFycmF5ICh1aW50OCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW4gPSB1aW50OC5sZW5ndGhcbiAgdmFyIGV4dHJhQnl0ZXMgPSBsZW4gJSAzIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsoXG4gICAgICB1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpXG4gICAgKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDJdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl0gK1xuICAgICAgJz09J1xuICAgIClcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAxMF0gK1xuICAgICAgbG9va3VwWyh0bXAgPj4gNCkgJiAweDNGXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCAyKSAmIDB4M0ZdICtcbiAgICAgICc9J1xuICAgIClcbiAgfVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuIiwiLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuLyoqXG4gKiBJZiBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAobW9zdCBjb21wYXRpYmxlLCBldmVuIElFNilcbiAqXG4gKiBCcm93c2VycyB0aGF0IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssIENocm9tZSA3KywgU2FmYXJpIDUuMSssXG4gKiBPcGVyYSAxMS42KywgaU9TIDQuMisuXG4gKlxuICogRHVlIHRvIHZhcmlvdXMgYnJvd3NlciBidWdzLCBzb21ldGltZXMgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiB3aWxsIGJlIHVzZWQgZXZlblxuICogd2hlbiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0eXBlZCBhcnJheXMuXG4gKlxuICogTm90ZTpcbiAqXG4gKiAgIC0gRmlyZWZveCA0LTI5IGxhY2tzIHN1cHBvcnQgZm9yIGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLFxuICogICAgIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4LlxuICpcbiAqICAgLSBDaHJvbWUgOS0xMCBpcyBtaXNzaW5nIHRoZSBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uLlxuICpcbiAqICAgLSBJRTEwIGhhcyBhIGJyb2tlbiBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYXJyYXlzIG9mXG4gKiAgICAgaW5jb3JyZWN0IGxlbmd0aCBpbiBzb21lIHNpdHVhdGlvbnMuXG5cbiAqIFdlIGRldGVjdCB0aGVzZSBidWdneSBicm93c2VycyBhbmQgc2V0IGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGAgdG8gYGZhbHNlYCBzbyB0aGV5XG4gKiBnZXQgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiwgd2hpY2ggaXMgc2xvd2VyIGJ1dCBiZWhhdmVzIGNvcnJlY3RseS5cbiAqL1xuQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgPSBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVCAhPT0gdW5kZWZpbmVkXG4gID8gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgOiB0eXBlZEFycmF5U3VwcG9ydCgpXG5cbi8qXG4gKiBFeHBvcnQga01heExlbmd0aCBhZnRlciB0eXBlZCBhcnJheSBzdXBwb3J0IGlzIGRldGVybWluZWQuXG4gKi9cbmV4cG9ydHMua01heExlbmd0aCA9IGtNYXhMZW5ndGgoKVxuXG5mdW5jdGlvbiB0eXBlZEFycmF5U3VwcG9ydCAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KDEpXG4gICAgYXJyLl9fcHJvdG9fXyA9IHtfX3Byb3RvX186IFVpbnQ4QXJyYXkucHJvdG90eXBlLCBmb286IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH19XG4gICAgcmV0dXJuIGFyci5mb28oKSA9PT0gNDIgJiYgLy8gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWRcbiAgICAgICAgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJyAmJiAvLyBjaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgICAgICAgYXJyLnN1YmFycmF5KDEsIDEpLmJ5dGVMZW5ndGggPT09IDAgLy8gaWUxMCBoYXMgYnJva2VuIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIGtNYXhMZW5ndGggKCkge1xuICByZXR1cm4gQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgICA/IDB4N2ZmZmZmZmZcbiAgICA6IDB4M2ZmZmZmZmZcbn1cblxuZnVuY3Rpb24gY3JlYXRlQnVmZmVyICh0aGF0LCBsZW5ndGgpIHtcbiAgaWYgKGtNYXhMZW5ndGgoKSA8IGxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHR5cGVkIGFycmF5IGxlbmd0aCcpXG4gIH1cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgaWYgKHRoYXQgPT09IG51bGwpIHtcbiAgICAgIHRoYXQgPSBuZXcgQnVmZmVyKGxlbmd0aClcbiAgICB9XG4gICAgdGhhdC5sZW5ndGggPSBsZW5ndGhcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBoYXZlIHRoZWlyXG4gKiBwcm90b3R5cGUgY2hhbmdlZCB0byBgQnVmZmVyLnByb3RvdHlwZWAuIEZ1cnRoZXJtb3JlLCBgQnVmZmVyYCBpcyBhIHN1YmNsYXNzIG9mXG4gKiBgVWludDhBcnJheWAsIHNvIHRoZSByZXR1cm5lZCBpbnN0YW5jZXMgd2lsbCBoYXZlIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBtZXRob2RzXG4gKiBhbmQgdGhlIGBVaW50OEFycmF5YCBtZXRob2RzLiBTcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdFxuICogcmV0dXJucyBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBUaGUgYFVpbnQ4QXJyYXlgIHByb3RvdHlwZSByZW1haW5zIHVubW9kaWZpZWQuXG4gKi9cblxuZnVuY3Rpb24gQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmICEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdJZiBlbmNvZGluZyBpcyBzcGVjaWZpZWQgdGhlbiB0aGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZydcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIGFsbG9jVW5zYWZlKHRoaXMsIGFyZylcbiAgfVxuICByZXR1cm4gZnJvbSh0aGlzLCBhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnBvb2xTaXplID0gODE5MiAvLyBub3QgdXNlZCBieSB0aGlzIGltcGxlbWVudGF0aW9uXG5cbi8vIFRPRE86IExlZ2FjeSwgbm90IG5lZWRlZCBhbnltb3JlLiBSZW1vdmUgaW4gbmV4dCBtYWpvciB2ZXJzaW9uLlxuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIGZyb20gKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICByZXR1cm4gZnJvbU9iamVjdCh0aGF0LCB2YWx1ZSlcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbShudWxsLCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5pZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgQnVmZmVyLnByb3RvdHlwZS5fX3Byb3RvX18gPSBVaW50OEFycmF5LnByb3RvdHlwZVxuICBCdWZmZXIuX19wcm90b19fID0gVWludDhBcnJheVxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnNwZWNpZXMgJiZcbiAgICAgIEJ1ZmZlcltTeW1ib2wuc3BlY2llc10gPT09IEJ1ZmZlcikge1xuICAgIC8vIEZpeCBzdWJhcnJheSgpIGluIEVTMjAxNi4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzk3XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlciwgU3ltYm9sLnNwZWNpZXMsIHtcbiAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRTaXplIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfSBlbHNlIGlmIChzaXplIDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBuZWdhdGl2ZScpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsb2MgKHRoYXQsIHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbiAgfVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT25seSBwYXkgYXR0ZW50aW9uIHRvIGVuY29kaW5nIGlmIGl0J3MgYSBzdHJpbmcuIFRoaXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsbHkgc2VuZGluZyBpbiBhIG51bWJlciB0aGF0IHdvdWxkXG4gICAgLy8gYmUgaW50ZXJwcmV0dGVkIGFzIGEgc3RhcnQgb2Zmc2V0LlxuICAgIHJldHVybiB0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnXG4gICAgICA/IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgICAgOiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsKVxuICB9XG4gIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiBhbGxvYyhzaXplWywgZmlsbFssIGVuY29kaW5nXV0pXG4gKiovXG5CdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGFsbG9jKG51bGwsIHNpemUsIGZpbGwsIGVuY29kaW5nKVxufVxuXG5mdW5jdGlvbiBhbGxvY1Vuc2FmZSAodGhhdCwgc2l6ZSkge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSA8IDAgPyAwIDogY2hlY2tlZChzaXplKSB8IDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7ICsraSkge1xuICAgICAgdGhhdFtpXSA9IDBcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIEJ1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIFNsb3dCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuXG5mdW5jdGlvbiBmcm9tU3RyaW5nICh0aGF0LCBzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnIHx8IGVuY29kaW5nID09PSAnJykge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gIH1cblxuICBpZiAoIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZW5jb2RpbmdcIiBtdXN0IGJlIGEgdmFsaWQgc3RyaW5nIGVuY29kaW5nJylcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBieXRlTGVuZ3RoKHN0cmluZywgZW5jb2RpbmcpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcblxuICB2YXIgYWN0dWFsID0gdGhhdC53cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuXG4gIGlmIChhY3R1YWwgIT09IGxlbmd0aCkge1xuICAgIC8vIFdyaXRpbmcgYSBoZXggc3RyaW5nLCBmb3IgZXhhbXBsZSwgdGhhdCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgd2lsbFxuICAgIC8vIGNhdXNlIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IGludmFsaWQgY2hhcmFjdGVyIHRvIGJlIGlnbm9yZWQuIChlLmcuXG4gICAgLy8gJ2FieHhjZCcgd2lsbCBiZSB0cmVhdGVkIGFzICdhYicpXG4gICAgdGhhdCA9IHRoYXQuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5TGlrZSAodGhhdCwgYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCA8IDAgPyAwIDogY2hlY2tlZChhcnJheS5sZW5ndGgpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIHRoYXRbaV0gPSBhcnJheVtpXSAmIDI1NVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUJ1ZmZlciAodGhhdCwgYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aCkge1xuICBhcnJheS5ieXRlTGVuZ3RoIC8vIHRoaXMgdGhyb3dzIGlmIGBhcnJheWAgaXMgbm90IGEgdmFsaWQgQXJyYXlCdWZmZXJcblxuICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnb2Zmc2V0XFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0ICsgKGxlbmd0aCB8fCAwKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdsZW5ndGhcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSlcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQpXG4gIH0gZWxzZSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IGFycmF5XG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIHRoYXQgPSBmcm9tQXJyYXlMaWtlKHRoYXQsIGFycmF5KVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKHRoYXQsIG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICB2YXIgbGVuID0gY2hlY2tlZChvYmoubGVuZ3RoKSB8IDBcbiAgICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbilcblxuICAgIGlmICh0aGF0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoYXRcbiAgICB9XG5cbiAgICBvYmouY29weSh0aGF0LCAwLCAwLCBsZW4pXG4gICAgcmV0dXJuIHRoYXRcbiAgfVxuXG4gIGlmIChvYmopIHtcbiAgICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgb2JqLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB8fCAnbGVuZ3RoJyBpbiBvYmopIHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqLmxlbmd0aCAhPT0gJ251bWJlcicgfHwgaXNuYW4ob2JqLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCAwKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqKVxuICAgIH1cblxuICAgIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iai5kYXRhKVxuICAgIH1cbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCBvciBhcnJheS1saWtlIG9iamVjdC4nKVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwga01heExlbmd0aCgpYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IGtNYXhMZW5ndGgoKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBrTWF4TGVuZ3RoKCkudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiAhIShiICE9IG51bGwgJiYgYi5faXNCdWZmZXIpXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihhKSB8fCAhQnVmZmVyLmlzQnVmZmVyKGIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIG11c3QgYmUgQnVmZmVycycpXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICB2YXIgeCA9IGEubGVuZ3RoXG4gIHZhciB5ID0gYi5sZW5ndGhcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFpc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIHZhciBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShsZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGJ1ZiA9IGxpc3RbaV1cbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH1cbiAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICBwb3MgKz0gYnVmLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZmZXJcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN0cmluZykpIHtcbiAgICByZXR1cm4gc3RyaW5nLmxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIChBcnJheUJ1ZmZlci5pc1ZpZXcoc3RyaW5nKSB8fCBzdHJpbmcgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikpIHtcbiAgICByZXR1cm4gc3RyaW5nLmJ5dGVMZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICBzdHJpbmcgPSAnJyArIHN0cmluZ1xuICB9XG5cbiAgdmFyIGxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiBsZW4gKiAyXG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gbGVuID4+PiAxXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGggLy8gYXNzdW1lIHV0ZjhcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2Vyc2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGUgcHJvcGVydHkgaXMgdXNlZCBieSBgQnVmZmVyLmlzQnVmZmVyYCBhbmQgYGlzLWJ1ZmZlcmAgKGluIFNhZmFyaSA1LTcpIHRvIGRldGVjdFxuLy8gQnVmZmVyIGluc3RhbmNlcy5cbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIHZhciBpID0gYltuXVxuICBiW25dID0gYlttXVxuICBiW21dID0gaVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAxNiA9IGZ1bmN0aW9uIHN3YXAxNiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgMiAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMTYtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDEpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMzIgPSBmdW5jdGlvbiBzd2FwMzIgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA4ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA2NC1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA4KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgNylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgNilcbiAgICBzd2FwKHRoaXMsIGkgKyAyLCBpICsgNSlcbiAgICBzd2FwKHRoaXMsIGkgKyAzLCBpICsgNClcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGggfCAwXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIHZhciBzdHIgPSAnJ1xuICB2YXIgbWF4ID0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFU1xuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgc3RyID0gdGhpcy50b1N0cmluZygnaGV4JywgMCwgbWF4KS5tYXRjaCgvLnsyfS9nKS5qb2luKCcgJylcbiAgICBpZiAodGhpcy5sZW5ndGggPiBtYXgpIHN0ciArPSAnIC4uLiAnXG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBzdHIgKyAnPidcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAodGFyZ2V0LCBzdGFydCwgZW5kLCB0aGlzU3RhcnQsIHRoaXNFbmQpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGFyZ2V0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmQgPSB0YXJnZXQgPyB0YXJnZXQubGVuZ3RoIDogMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNTdGFydCA9IDBcbiAgfVxuICBpZiAodGhpc0VuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc0VuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoc3RhcnQgPCAwIHx8IGVuZCA+IHRhcmdldC5sZW5ndGggfHwgdGhpc1N0YXJ0IDwgMCB8fCB0aGlzRW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCAmJiBzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCkge1xuICAgIHJldHVybiAtMVxuICB9XG4gIGlmIChzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgc3RhcnQgPj4+PSAwXG4gIGVuZCA+Pj49IDBcbiAgdGhpc1N0YXJ0ID4+Pj0gMFxuICB0aGlzRW5kID4+Pj0gMFxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQpIHJldHVybiAwXG5cbiAgdmFyIHggPSB0aGlzRW5kIC0gdGhpc1N0YXJ0XG4gIHZhciB5ID0gZW5kIC0gc3RhcnRcbiAgdmFyIGxlbiA9IE1hdGgubWluKHgsIHkpXG5cbiAgdmFyIHRoaXNDb3B5ID0gdGhpcy5zbGljZSh0aGlzU3RhcnQsIHRoaXNFbmQpXG4gIHZhciB0YXJnZXRDb3B5ID0gdGFyZ2V0LnNsaWNlKHN0YXJ0LCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIGlmICh0aGlzQ29weVtpXSAhPT0gdGFyZ2V0Q29weVtpXSkge1xuICAgICAgeCA9IHRoaXNDb3B5W2ldXG4gICAgICB5ID0gdGFyZ2V0Q29weVtpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbi8vIEZpbmRzIGVpdGhlciB0aGUgZmlyc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0ID49IGBieXRlT2Zmc2V0YCxcbi8vIE9SIHRoZSBsYXN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA8PSBgYnl0ZU9mZnNldGAuXG4vL1xuLy8gQXJndW1lbnRzOlxuLy8gLSBidWZmZXIgLSBhIEJ1ZmZlciB0byBzZWFyY2hcbi8vIC0gdmFsIC0gYSBzdHJpbmcsIEJ1ZmZlciwgb3IgbnVtYmVyXG4vLyAtIGJ5dGVPZmZzZXQgLSBhbiBpbmRleCBpbnRvIGBidWZmZXJgOyB3aWxsIGJlIGNsYW1wZWQgdG8gYW4gaW50MzJcbi8vIC0gZW5jb2RpbmcgLSBhbiBvcHRpb25hbCBlbmNvZGluZywgcmVsZXZhbnQgaXMgdmFsIGlzIGEgc3RyaW5nXG4vLyAtIGRpciAtIHRydWUgZm9yIGluZGV4T2YsIGZhbHNlIGZvciBsYXN0SW5kZXhPZlxuZnVuY3Rpb24gYmlkaXJlY3Rpb25hbEluZGV4T2YgKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIC8vIEVtcHR5IGJ1ZmZlciBtZWFucyBubyBtYXRjaFxuICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gMCkgcmV0dXJuIC0xXG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXRcbiAgaWYgKHR5cGVvZiBieXRlT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gYnl0ZU9mZnNldFxuICAgIGJ5dGVPZmZzZXQgPSAwXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA+IDB4N2ZmZmZmZmYpIHtcbiAgICBieXRlT2Zmc2V0ID0gMHg3ZmZmZmZmZlxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAtMHg4MDAwMDAwMCkge1xuICAgIGJ5dGVPZmZzZXQgPSAtMHg4MDAwMDAwMFxuICB9XG4gIGJ5dGVPZmZzZXQgPSArYnl0ZU9mZnNldCAgLy8gQ29lcmNlIHRvIE51bWJlci5cbiAgaWYgKGlzTmFOKGJ5dGVPZmZzZXQpKSB7XG4gICAgLy8gYnl0ZU9mZnNldDogaXQgaXQncyB1bmRlZmluZWQsIG51bGwsIE5hTiwgXCJmb29cIiwgZXRjLCBzZWFyY2ggd2hvbGUgYnVmZmVyXG4gICAgYnl0ZU9mZnNldCA9IGRpciA/IDAgOiAoYnVmZmVyLmxlbmd0aCAtIDEpXG4gIH1cblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldDogbmVnYXRpdmUgb2Zmc2V0cyBzdGFydCBmcm9tIHRoZSBlbmQgb2YgdGhlIGJ1ZmZlclxuICBpZiAoYnl0ZU9mZnNldCA8IDApIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoICsgYnl0ZU9mZnNldFxuICBpZiAoYnl0ZU9mZnNldCA+PSBidWZmZXIubGVuZ3RoKSB7XG4gICAgaWYgKGRpcikgcmV0dXJuIC0xXG4gICAgZWxzZSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCAtIDFcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgMCkge1xuICAgIGlmIChkaXIpIGJ5dGVPZmZzZXQgPSAwXG4gICAgZWxzZSByZXR1cm4gLTFcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSB2YWxcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gQnVmZmVyLmZyb20odmFsLCBlbmNvZGluZylcbiAgfVxuXG4gIC8vIEZpbmFsbHksIHNlYXJjaCBlaXRoZXIgaW5kZXhPZiAoaWYgZGlyIGlzIHRydWUpIG9yIGxhc3RJbmRleE9mXG4gIGlmIChCdWZmZXIuaXNCdWZmZXIodmFsKSkge1xuICAgIC8vIFNwZWNpYWwgY2FzZTogbG9va2luZyBmb3IgZW1wdHkgc3RyaW5nL2J1ZmZlciBhbHdheXMgZmFpbHNcbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAweEZGIC8vIFNlYXJjaCBmb3IgYSBieXRlIHZhbHVlIFswLTI1NV1cbiAgICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiZcbiAgICAgICAgdHlwZW9mIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChkaXIpIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgWyB2YWwgXSwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZhbCBtdXN0IGJlIHN0cmluZywgbnVtYmVyIG9yIEJ1ZmZlcicpXG59XG5cbmZ1bmN0aW9uIGFycmF5SW5kZXhPZiAoYXJyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgdmFyIGluZGV4U2l6ZSA9IDFcbiAgdmFyIGFyckxlbmd0aCA9IGFyci5sZW5ndGhcbiAgdmFyIHZhbExlbmd0aCA9IHZhbC5sZW5ndGhcblxuICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKGVuY29kaW5nID09PSAndWNzMicgfHwgZW5jb2RpbmcgPT09ICd1Y3MtMicgfHxcbiAgICAgICAgZW5jb2RpbmcgPT09ICd1dGYxNmxlJyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi0xNmxlJykge1xuICAgICAgaWYgKGFyci5sZW5ndGggPCAyIHx8IHZhbC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfVxuICAgICAgaW5kZXhTaXplID0gMlxuICAgICAgYXJyTGVuZ3RoIC89IDJcbiAgICAgIHZhbExlbmd0aCAvPSAyXG4gICAgICBieXRlT2Zmc2V0IC89IDJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChidWYsIGkpIHtcbiAgICBpZiAoaW5kZXhTaXplID09PSAxKSB7XG4gICAgICByZXR1cm4gYnVmW2ldXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBidWYucmVhZFVJbnQxNkJFKGkgKiBpbmRleFNpemUpXG4gICAgfVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGRpcikge1xuICAgIHZhciBmb3VuZEluZGV4ID0gLTFcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChyZWFkKGFyciwgaSkgPT09IHJlYWQodmFsLCBmb3VuZEluZGV4ID09PSAtMSA/IDAgOiBpIC0gZm91bmRJbmRleCkpIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSBmb3VuZEluZGV4ID0gaVxuICAgICAgICBpZiAoaSAtIGZvdW5kSW5kZXggKyAxID09PSB2YWxMZW5ndGgpIHJldHVybiBmb3VuZEluZGV4ICogaW5kZXhTaXplXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIGkgLT0gaSAtIGZvdW5kSW5kZXhcbiAgICAgICAgZm91bmRJbmRleCA9IC0xXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChieXRlT2Zmc2V0ICsgdmFsTGVuZ3RoID4gYXJyTGVuZ3RoKSBieXRlT2Zmc2V0ID0gYXJyTGVuZ3RoIC0gdmFsTGVuZ3RoXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBmb3VuZCA9IHRydWVcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdmFsTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHJlYWQoYXJyLCBpICsgaikgIT09IHJlYWQodmFsLCBqKSkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gdGhpcy5pbmRleE9mKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpICE9PSAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCB0cnVlKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBoZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChzdHJMZW4gJSAyICE9PSAwKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGhleCBzdHJpbmcnKVxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChpc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gbGF0aW4xV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGJhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiB1Y3MyV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gd3JpdGUgKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcpXG4gIGlmIChvZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgb2Zmc2V0WywgbGVuZ3RoXVssIGVuY29kaW5nXSlcbiAgfSBlbHNlIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBsZW5ndGggPSBsZW5ndGggfCAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgLy8gbGVnYWN5IHdyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKSAtIHJlbW92ZSBpbiB2MC4xM1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdCdWZmZXIud3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0WywgbGVuZ3RoXSkgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCdcbiAgICApXG4gIH1cblxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIHZhciByZXMgPSBbXVxuXG4gIHZhciBpID0gc3RhcnRcbiAgd2hpbGUgKGkgPCBlbmQpIHtcbiAgICB2YXIgZmlyc3RCeXRlID0gYnVmW2ldXG4gICAgdmFyIGNvZGVQb2ludCA9IG51bGxcbiAgICB2YXIgYnl0ZXNQZXJTZXF1ZW5jZSA9IChmaXJzdEJ5dGUgPiAweEVGKSA/IDRcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4REYpID8gM1xuICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRikgPyAyXG4gICAgICA6IDFcblxuICAgIGlmIChpICsgYnl0ZXNQZXJTZXF1ZW5jZSA8PSBlbmQpIHtcbiAgICAgIHZhciBzZWNvbmRCeXRlLCB0aGlyZEJ5dGUsIGZvdXJ0aEJ5dGUsIHRlbXBDb2RlUG9pbnRcblxuICAgICAgc3dpdGNoIChieXRlc1BlclNlcXVlbmNlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBpZiAoZmlyc3RCeXRlIDwgMHg4MCkge1xuICAgICAgICAgICAgY29kZVBvaW50ID0gZmlyc3RCeXRlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4MUYpIDw8IDB4NiB8IChzZWNvbmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3Rikge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweEMgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4NiB8ICh0aGlyZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGRiAmJiAodGVtcENvZGVQb2ludCA8IDB4RDgwMCB8fCB0ZW1wQ29kZVBvaW50ID4gMHhERkZGKSkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBmb3VydGhCeXRlID0gYnVmW2kgKyAzXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAoZm91cnRoQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHgxMiB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHhDIHwgKHRoaXJkQnl0ZSAmIDB4M0YpIDw8IDB4NiB8IChmb3VydGhCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHhGRkZGICYmIHRlbXBDb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlUG9pbnQgPT09IG51bGwpIHtcbiAgICAgIC8vIHdlIGRpZCBub3QgZ2VuZXJhdGUgYSB2YWxpZCBjb2RlUG9pbnQgc28gaW5zZXJ0IGFcbiAgICAgIC8vIHJlcGxhY2VtZW50IGNoYXIgKFUrRkZGRCkgYW5kIGFkdmFuY2Ugb25seSAxIGJ5dGVcbiAgICAgIGNvZGVQb2ludCA9IDB4RkZGRFxuICAgICAgYnl0ZXNQZXJTZXF1ZW5jZSA9IDFcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA+IDB4RkZGRikge1xuICAgICAgLy8gZW5jb2RlIHRvIHV0ZjE2IChzdXJyb2dhdGUgcGFpciBkYW5jZSlcbiAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICByZXMucHVzaChjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApXG4gICAgICBjb2RlUG9pbnQgPSAweERDMDAgfCBjb2RlUG9pbnQgJiAweDNGRlxuICAgIH1cblxuICAgIHJlcy5wdXNoKGNvZGVQb2ludClcbiAgICBpICs9IGJ5dGVzUGVyU2VxdWVuY2VcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkocmVzKVxufVxuXG4vLyBCYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMjc0NzI3Mi82ODA3NDIsIHRoZSBicm93c2VyIHdpdGhcbi8vIHRoZSBsb3dlc3QgbGltaXQgaXMgQ2hyb21lLCB3aXRoIDB4MTAwMDAgYXJncy5cbi8vIFdlIGdvIDEgbWFnbml0dWRlIGxlc3MsIGZvciBzYWZldHlcbnZhciBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgdmFyIGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoXG4gIGlmIChsZW4gPD0gTUFYX0FSR1VNRU5UU19MRU5HVEgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNvZGVQb2ludHMpIC8vIGF2b2lkIGV4dHJhIHNsaWNlKClcbiAgfVxuXG4gIC8vIERlY29kZSBpbiBjaHVua3MgdG8gYXZvaWQgXCJjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIi5cbiAgdmFyIHJlcyA9ICcnXG4gIHZhciBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFxuICAgICAgU3RyaW5nLFxuICAgICAgY29kZVBvaW50cy5zbGljZShpLCBpICs9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldICYgMHg3RilcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGxhdGluMVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpICsgMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgdmFyIG5ld0J1ZlxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBuZXdCdWYgPSB0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpXG4gICAgbmV3QnVmLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyArK2kpIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRMRSA9IGZ1bmN0aW9uIHJlYWRVSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG4gIH1cblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdXG4gIHZhciBtdWwgPSAxXG4gIHdoaWxlIChieXRlTGVuZ3RoID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiByZWFkVUludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgOCkgfCB0aGlzW29mZnNldCArIDFdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICgodGhpc1tvZmZzZXRdKSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikpICtcbiAgICAgICh0aGlzW29mZnNldCArIDNdICogMHgxMDAwMDAwKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludExFID0gZnVuY3Rpb24gcmVhZEludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludEJFID0gZnVuY3Rpb24gcmVhZEludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoXG4gIHZhciBtdWwgPSAxXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICBpZiAoISh0aGlzW29mZnNldF0gJiAweDgwKSkgcmV0dXJuICh0aGlzW29mZnNldF0pXG4gIHJldHVybiAoKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gcmVhZEludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIDFdIHwgKHRoaXNbb2Zmc2V0XSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiByZWFkSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiByZWFkSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiByZWFkRmxvYXRMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gcmVhZERvdWJsZUJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uIHdyaXRlVUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHhmZiwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCAyKTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSAmICgweGZmIDw8ICg4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpKSkgPj4+XG4gICAgICAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDhcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgNCk7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCkgJiAweGZmXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gMFxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgLSAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50QkUgPSBmdW5jdGlvbiB3cml0ZUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweDdmLCAtMHg4MClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuZnVuY3Rpb24gY2hlY2tJRUVFNzU0IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAob2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gd3JpdGVGbG9hdExFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgOCwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbiAgcmV0dXJuIG9mZnNldCArIDhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiBjb3B5ICh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXRTdGFydCA+PSB0YXJnZXQubGVuZ3RoKSB0YXJnZXRTdGFydCA9IHRhcmdldC5sZW5ndGhcbiAgaWYgKCF0YXJnZXRTdGFydCkgdGFyZ2V0U3RhcnQgPSAwXG4gIGlmIChlbmQgPiAwICYmIGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuIDBcbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgdGhpcy5sZW5ndGggPT09IDApIHJldHVybiAwXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBpZiAodGFyZ2V0U3RhcnQgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICB9XG4gIGlmIChzdGFydCA8IDAgfHwgc3RhcnQgPj0gdGhpcy5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0XG4gIHZhciBpXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCAmJiBzdGFydCA8IHRhcmdldFN0YXJ0ICYmIHRhcmdldFN0YXJ0IDwgZW5kKSB7XG4gICAgLy8gZGVzY2VuZGluZyBjb3B5IGZyb20gZW5kXG4gICAgZm9yIChpID0gbGVuIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2UgaWYgKGxlbiA8IDEwMDAgfHwgIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gYXNjZW5kaW5nIGNvcHkgZnJvbSBzdGFydFxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICB0YXJnZXQsXG4gICAgICB0aGlzLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbiksXG4gICAgICB0YXJnZXRTdGFydFxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsZW5cbn1cblxuLy8gVXNhZ2U6XG4vLyAgICBidWZmZXIuZmlsbChudW1iZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKGJ1ZmZlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoc3RyaW5nWywgb2Zmc2V0WywgZW5kXV1bLCBlbmNvZGluZ10pXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiBmaWxsICh2YWwsIHN0YXJ0LCBlbmQsIGVuY29kaW5nKSB7XG4gIC8vIEhhbmRsZSBzdHJpbmcgY2FzZXM6XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IHN0YXJ0XG4gICAgICBzdGFydCA9IDBcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmRcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfVxuICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICB2YXIgY29kZSA9IHZhbC5jaGFyQ29kZUF0KDApXG4gICAgICBpZiAoY29kZSA8IDI1Nikge1xuICAgICAgICB2YWwgPSBjb2RlXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMjU1XG4gIH1cblxuICAvLyBJbnZhbGlkIHJhbmdlcyBhcmUgbm90IHNldCB0byBhIGRlZmF1bHQsIHNvIGNhbiByYW5nZSBjaGVjayBlYXJseS5cbiAgaWYgKHN0YXJ0IDwgMCB8fCB0aGlzLmxlbmd0aCA8IHN0YXJ0IHx8IHRoaXMubGVuZ3RoIDwgZW5kKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ091dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHN0YXJ0ID0gc3RhcnQgPj4+IDBcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyB0aGlzLmxlbmd0aCA6IGVuZCA+Pj4gMFxuXG4gIGlmICghdmFsKSB2YWwgPSAwXG5cbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IHZhbFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgYnl0ZXMgPSBCdWZmZXIuaXNCdWZmZXIodmFsKVxuICAgICAgPyB2YWxcbiAgICAgIDogdXRmOFRvQnl0ZXMobmV3IEJ1ZmZlcih2YWwsIGVuY29kaW5nKS50b1N0cmluZygpKVxuICAgIHZhciBsZW4gPSBieXRlcy5sZW5ndGhcbiAgICBmb3IgKGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7ICsraSkge1xuICAgICAgdGhpc1tpICsgc3RhcnRdID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbnZhciBJTlZBTElEX0JBU0U2NF9SRSA9IC9bXitcXC8wLTlBLVphLXotX10vZ1xuXG5mdW5jdGlvbiBiYXNlNjRjbGVhbiAoc3RyKSB7XG4gIC8vIE5vZGUgc3RyaXBzIG91dCBpbnZhbGlkIGNoYXJhY3RlcnMgbGlrZSBcXG4gYW5kIFxcdCBmcm9tIHRoZSBzdHJpbmcsIGJhc2U2NC1qcyBkb2VzIG5vdFxuICBzdHIgPSBzdHJpbmd0cmltKHN0cikucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgY29udmVydHMgc3RyaW5ncyB3aXRoIGxlbmd0aCA8IDIgdG8gJydcbiAgaWYgKHN0ci5sZW5ndGggPCAyKSByZXR1cm4gJydcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbSAoc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKClcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIHZhciBjb2RlUG9pbnRcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcbiAgdmFyIGxlYWRTdXJyb2dhdGUgPSBudWxsXG4gIHZhciBieXRlcyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvZGVQb2ludCA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG5cbiAgICAvLyBpcyBzdXJyb2dhdGUgY29tcG9uZW50XG4gICAgaWYgKGNvZGVQb2ludCA+IDB4RDdGRiAmJiBjb2RlUG9pbnQgPCAweEUwMDApIHtcbiAgICAgIC8vIGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoIWxlYWRTdXJyb2dhdGUpIHtcbiAgICAgICAgLy8gbm8gbGVhZCB5ZXRcbiAgICAgICAgaWYgKGNvZGVQb2ludCA+IDB4REJGRikge1xuICAgICAgICAgIC8vIHVuZXhwZWN0ZWQgdHJhaWxcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGkgKyAxID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAvLyB1bnBhaXJlZCBsZWFkXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkIGxlYWRcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIDIgbGVhZHMgaW4gYSByb3dcbiAgICAgIGlmIChjb2RlUG9pbnQgPCAweERDMDApIHtcbiAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gdmFsaWQgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNvZGVQb2ludCA9IChsZWFkU3Vycm9nYXRlIC0gMHhEODAwIDw8IDEwIHwgY29kZVBvaW50IC0gMHhEQzAwKSArIDB4MTAwMDBcbiAgICB9IGVsc2UgaWYgKGxlYWRTdXJyb2dhdGUpIHtcbiAgICAgIC8vIHZhbGlkIGJtcCBjaGFyLCBidXQgbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgIH1cblxuICAgIGxlYWRTdXJyb2dhdGUgPSBudWxsXG5cbiAgICAvLyBlbmNvZGUgdXRmOFxuICAgIGlmIChjb2RlUG9pbnQgPCAweDgwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDEpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goY29kZVBvaW50KVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHg4MDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiB8IDB4QzAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDMpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgfCAweEUwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSA0KSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHgxMiB8IDB4RjAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG5cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShiYXNlNjRjbGVhbihzdHIpKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSkgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBpc25hbiAodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IHZhbCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxufVxuIiwidmFyIGNoYXJlbmMgPSB7XG4gIC8vIFVURi04IGVuY29kaW5nXG4gIHV0Zjg6IHtcbiAgICAvLyBDb252ZXJ0IGEgc3RyaW5nIHRvIGEgYnl0ZSBhcnJheVxuICAgIHN0cmluZ1RvQnl0ZXM6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgcmV0dXJuIGNoYXJlbmMuYmluLnN0cmluZ1RvQnl0ZXModW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpKTtcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJ5dGUgYXJyYXkgdG8gYSBzdHJpbmdcbiAgICBieXRlc1RvU3RyaW5nOiBmdW5jdGlvbihieXRlcykge1xuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoY2hhcmVuYy5iaW4uYnl0ZXNUb1N0cmluZyhieXRlcykpKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gQmluYXJ5IGVuY29kaW5nXG4gIGJpbjoge1xuICAgIC8vIENvbnZlcnQgYSBzdHJpbmcgdG8gYSBieXRlIGFycmF5XG4gICAgc3RyaW5nVG9CeXRlczogZnVuY3Rpb24oc3RyKSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKylcbiAgICAgICAgYnl0ZXMucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIHN0cmluZ1xuICAgIGJ5dGVzVG9TdHJpbmc6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBmb3IgKHZhciBzdHIgPSBbXSwgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkrKylcbiAgICAgICAgc3RyLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSkpO1xuICAgICAgcmV0dXJuIHN0ci5qb2luKCcnKTtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhcmVuYztcbiIsIihmdW5jdGlvbigpIHtcbiAgdmFyIGJhc2U2NG1hcFxuICAgICAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLycsXG5cbiAgY3J5cHQgPSB7XG4gICAgLy8gQml0LXdpc2Ugcm90YXRpb24gbGVmdFxuICAgIHJvdGw6IGZ1bmN0aW9uKG4sIGIpIHtcbiAgICAgIHJldHVybiAobiA8PCBiKSB8IChuID4+PiAoMzIgLSBiKSk7XG4gICAgfSxcblxuICAgIC8vIEJpdC13aXNlIHJvdGF0aW9uIHJpZ2h0XG4gICAgcm90cjogZnVuY3Rpb24obiwgYikge1xuICAgICAgcmV0dXJuIChuIDw8ICgzMiAtIGIpKSB8IChuID4+PiBiKTtcbiAgICB9LFxuXG4gICAgLy8gU3dhcCBiaWctZW5kaWFuIHRvIGxpdHRsZS1lbmRpYW4gYW5kIHZpY2UgdmVyc2FcbiAgICBlbmRpYW46IGZ1bmN0aW9uKG4pIHtcbiAgICAgIC8vIElmIG51bWJlciBnaXZlbiwgc3dhcCBlbmRpYW5cbiAgICAgIGlmIChuLmNvbnN0cnVjdG9yID09IE51bWJlcikge1xuICAgICAgICByZXR1cm4gY3J5cHQucm90bChuLCA4KSAmIDB4MDBGRjAwRkYgfCBjcnlwdC5yb3RsKG4sIDI0KSAmIDB4RkYwMEZGMDA7XG4gICAgICB9XG5cbiAgICAgIC8vIEVsc2UsIGFzc3VtZSBhcnJheSBhbmQgc3dhcCBhbGwgaXRlbXNcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbi5sZW5ndGg7IGkrKylcbiAgICAgICAgbltpXSA9IGNyeXB0LmVuZGlhbihuW2ldKTtcbiAgICAgIHJldHVybiBuO1xuICAgIH0sXG5cbiAgICAvLyBHZW5lcmF0ZSBhbiBhcnJheSBvZiBhbnkgbGVuZ3RoIG9mIHJhbmRvbSBieXRlc1xuICAgIHJhbmRvbUJ5dGVzOiBmdW5jdGlvbihuKSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdOyBuID4gMDsgbi0tKVxuICAgICAgICBieXRlcy5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBiaWctZW5kaWFuIDMyLWJpdCB3b3Jkc1xuICAgIGJ5dGVzVG9Xb3JkczogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGZvciAodmFyIHdvcmRzID0gW10sIGkgPSAwLCBiID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrLCBiICs9IDgpXG4gICAgICAgIHdvcmRzW2IgPj4+IDVdIHw9IGJ5dGVzW2ldIDw8ICgyNCAtIGIgJSAzMik7XG4gICAgICByZXR1cm4gd29yZHM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYmlnLWVuZGlhbiAzMi1iaXQgd29yZHMgdG8gYSBieXRlIGFycmF5XG4gICAgd29yZHNUb0J5dGVzOiBmdW5jdGlvbih3b3Jkcykge1xuICAgICAgZm9yICh2YXIgYnl0ZXMgPSBbXSwgYiA9IDA7IGIgPCB3b3Jkcy5sZW5ndGggKiAzMjsgYiArPSA4KVxuICAgICAgICBieXRlcy5wdXNoKCh3b3Jkc1tiID4+PiA1XSA+Pj4gKDI0IC0gYiAlIDMyKSkgJiAweEZGKTtcbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJ5dGUgYXJyYXkgdG8gYSBoZXggc3RyaW5nXG4gICAgYnl0ZXNUb0hleDogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGZvciAodmFyIGhleCA9IFtdLCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGhleC5wdXNoKChieXRlc1tpXSA+Pj4gNCkudG9TdHJpbmcoMTYpKTtcbiAgICAgICAgaGV4LnB1c2goKGJ5dGVzW2ldICYgMHhGKS50b1N0cmluZygxNikpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhleC5qb2luKCcnKTtcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGhleCBzdHJpbmcgdG8gYSBieXRlIGFycmF5XG4gICAgaGV4VG9CeXRlczogZnVuY3Rpb24oaGV4KSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBjID0gMDsgYyA8IGhleC5sZW5ndGg7IGMgKz0gMilcbiAgICAgICAgYnl0ZXMucHVzaChwYXJzZUludChoZXguc3Vic3RyKGMsIDIpLCAxNikpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIGJhc2UtNjQgc3RyaW5nXG4gICAgYnl0ZXNUb0Jhc2U2NDogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGZvciAodmFyIGJhc2U2NCA9IFtdLCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgICAgIHZhciB0cmlwbGV0ID0gKGJ5dGVzW2ldIDw8IDE2KSB8IChieXRlc1tpICsgMV0gPDwgOCkgfCBieXRlc1tpICsgMl07XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNDsgaisrKVxuICAgICAgICAgIGlmIChpICogOCArIGogKiA2IDw9IGJ5dGVzLmxlbmd0aCAqIDgpXG4gICAgICAgICAgICBiYXNlNjQucHVzaChiYXNlNjRtYXAuY2hhckF0KCh0cmlwbGV0ID4+PiA2ICogKDMgLSBqKSkgJiAweDNGKSk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgYmFzZTY0LnB1c2goJz0nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBiYXNlNjQuam9pbignJyk7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBiYXNlLTY0IHN0cmluZyB0byBhIGJ5dGUgYXJyYXlcbiAgICBiYXNlNjRUb0J5dGVzOiBmdW5jdGlvbihiYXNlNjQpIHtcbiAgICAgIC8vIFJlbW92ZSBub24tYmFzZS02NCBjaGFyYWN0ZXJzXG4gICAgICBiYXNlNjQgPSBiYXNlNjQucmVwbGFjZSgvW15BLVowLTkrXFwvXS9pZywgJycpO1xuXG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBpID0gMCwgaW1vZDQgPSAwOyBpIDwgYmFzZTY0Lmxlbmd0aDtcbiAgICAgICAgICBpbW9kNCA9ICsraSAlIDQpIHtcbiAgICAgICAgaWYgKGltb2Q0ID09IDApIGNvbnRpbnVlO1xuICAgICAgICBieXRlcy5wdXNoKCgoYmFzZTY0bWFwLmluZGV4T2YoYmFzZTY0LmNoYXJBdChpIC0gMSkpXG4gICAgICAgICAgICAmIChNYXRoLnBvdygyLCAtMiAqIGltb2Q0ICsgOCkgLSAxKSkgPDwgKGltb2Q0ICogMikpXG4gICAgICAgICAgICB8IChiYXNlNjRtYXAuaW5kZXhPZihiYXNlNjQuY2hhckF0KGkpKSA+Pj4gKDYgLSBpbW9kNCAqIDIpKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfVxuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzID0gY3J5cHQ7XG59KSgpO1xuIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSAoZSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSAobSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICgodmFsdWUgKiBjKSAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqXG4gKiBBIGZhc3RlciBhbHRlcm5hdGl2ZSB0byBgRnVuY3Rpb24jYXBwbHlgLCB0aGlzIGZ1bmN0aW9uIGludm9rZXMgYGZ1bmNgXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHRoZSBhcmd1bWVudHMgb2YgYGFyZ3NgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBmdW5jYC5cbiAqL1xuZnVuY3Rpb24gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncykge1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcpO1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICB9XG4gIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgLy8gU2FmYXJpIDkgbWFrZXMgYGFyZ3VtZW50cy5sZW5ndGhgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHZhciByZXN1bHQgPSAoaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpKVxuICAgID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKVxuICAgIDogW107XG5cbiAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGgsXG4gICAgICBza2lwSW5kZXhlcyA9ICEhbGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKGtleSA9PSAnbGVuZ3RoJyB8fCBpc0luZGV4KGtleSwgbGVuZ3RoKSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEFzc2lnbnMgYHZhbHVlYCB0byBga2V5YCBvZiBgb2JqZWN0YCBpZiB0aGUgZXhpc3RpbmcgdmFsdWUgaXMgbm90IGVxdWl2YWxlbnRcbiAqIHVzaW5nIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldO1xuICBpZiAoIShoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBlcShvYmpWYWx1ZSwgdmFsdWUpKSB8fFxuICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c0luYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzSW4ob2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzSW4ob2JqZWN0KTtcbiAgfVxuICB2YXIgaXNQcm90byA9IGlzUHJvdG90eXBlKG9iamVjdCksXG4gICAgICByZXN1bHQgPSBbXTtcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKCEoa2V5ID09ICdjb25zdHJ1Y3RvcicgJiYgKGlzUHJvdG8gfHwgIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucmVzdGAgd2hpY2ggZG9lc24ndCB2YWxpZGF0ZSBvciBjb2VyY2UgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VSZXN0KGZ1bmMsIHN0YXJ0KSB7XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHN0YXJ0LCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBpbmRleCA9IC0xO1xuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IGFycmF5O1xuICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzLCBvdGhlckFyZ3MpO1xuICB9O1xufVxuXG4vKipcbiAqIENvcGllcyBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gY29weS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvcGllZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb3B5T2JqZWN0KHNvdXJjZSwgcHJvcHMsIG9iamVjdCwgY3VzdG9taXplcikge1xuICBvYmplY3QgfHwgKG9iamVjdCA9IHt9KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG5cbiAgICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNvdXJjZVtrZXldLCBrZXksIG9iamVjdCwgc291cmNlKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUgPT09IHVuZGVmaW5lZCA/IHNvdXJjZVtrZXldIDogbmV3VmFsdWUpO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIGxpa2UgYF8uYXNzaWduYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIGJhc2VSZXN0KGZ1bmN0aW9uKG9iamVjdCwgc291cmNlcykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBzb3VyY2VzLmxlbmd0aCxcbiAgICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA+IDEgPyBzb3VyY2VzW2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkLFxuICAgICAgICBndWFyZCA9IGxlbmd0aCA+IDIgPyBzb3VyY2VzWzJdIDogdW5kZWZpbmVkO1xuXG4gICAgY3VzdG9taXplciA9IChhc3NpZ25lci5sZW5ndGggPiAzICYmIHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicpXG4gICAgICA/IChsZW5ndGgtLSwgY3VzdG9taXplcilcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGd1YXJkICYmIGlzSXRlcmF0ZWVDYWxsKHNvdXJjZXNbMF0sIHNvdXJjZXNbMV0sIGd1YXJkKSkge1xuICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiBjdXN0b21pemVyO1xuICAgICAgbGVuZ3RoID0gMTtcbiAgICB9XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGluZGV4LCBjdXN0b21pemVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSXRlcmF0ZWVDYWxsKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiBpbmRleDtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcidcbiAgICAgICAgPyAoaXNBcnJheUxpa2Uob2JqZWN0KSAmJiBpc0luZGV4KGluZGV4LCBvYmplY3QubGVuZ3RoKSlcbiAgICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpXG4gICAgICApIHtcbiAgICByZXR1cm4gZXEob2JqZWN0W2luZGV4XSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZVxuICogW2BPYmplY3Qua2V5c2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZXhjZXB0IHRoYXQgaXQgaW5jbHVkZXMgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gbmF0aXZlS2V5c0luKG9iamVjdCkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmIChvYmplY3QgIT0gbnVsbCkge1xuICAgIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHJldHVybiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgKCFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgfHwgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmlzQXJyYXlMaWtlYCBleGNlcHQgdGhhdCBpdCBhbHNvIGNoZWNrcyBpZiBgdmFsdWVgXG4gKiBpcyBhbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5hc3NpZ25gIGV4Y2VwdCB0aGF0IGl0IGl0ZXJhdGVzIG92ZXIgb3duIGFuZFxuICogaW5oZXJpdGVkIHNvdXJjZSBwcm9wZXJ0aWVzLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBtdXRhdGVzIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBhbGlhcyBleHRlbmRcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBzZWUgXy5hc3NpZ25cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIGZ1bmN0aW9uIEJhcigpIHtcbiAqICAgdGhpcy5jID0gMztcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmIgPSAyO1xuICogQmFyLnByb3RvdHlwZS5kID0gNDtcbiAqXG4gKiBfLmFzc2lnbkluKHsgJ2EnOiAwIH0sIG5ldyBGb28sIG5ldyBCYXIpO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiwgJ2MnOiAzLCAnZCc6IDQgfVxuICovXG52YXIgYXNzaWduSW4gPSBjcmVhdGVBc3NpZ25lcihmdW5jdGlvbihvYmplY3QsIHNvdXJjZSkge1xuICBjb3B5T2JqZWN0KHNvdXJjZSwga2V5c0luKHNvdXJjZSksIG9iamVjdCk7XG59KTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCwgdHJ1ZSkgOiBiYXNlS2V5c0luKG9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduSW47XG4iLCIhZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT90KGV4cG9ydHMpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW1wiZXhwb3J0c1wiXSx0KTp0KGUucmVkdXhMb2dnZXI9ZS5yZWR1eExvZ2dlcnx8e30pfSh0aGlzLGZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQoZSx0KXtlLnN1cGVyXz10LGUucHJvdG90eXBlPU9iamVjdC5jcmVhdGUodC5wcm90b3R5cGUse2NvbnN0cnVjdG9yOnt2YWx1ZTplLGVudW1lcmFibGU6ITEsd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfX0pfWZ1bmN0aW9uIHIoZSx0KXtPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcImtpbmRcIix7dmFsdWU6ZSxlbnVtZXJhYmxlOiEwfSksdCYmdC5sZW5ndGgmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwicGF0aFwiLHt2YWx1ZTp0LGVudW1lcmFibGU6ITB9KX1mdW5jdGlvbiBuKGUsdCxyKXtuLnN1cGVyXy5jYWxsKHRoaXMsXCJFXCIsZSksT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJsaHNcIix7dmFsdWU6dCxlbnVtZXJhYmxlOiEwfSksT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJyaHNcIix7dmFsdWU6cixlbnVtZXJhYmxlOiEwfSl9ZnVuY3Rpb24gbyhlLHQpe28uc3VwZXJfLmNhbGwodGhpcyxcIk5cIixlKSxPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcInJoc1wiLHt2YWx1ZTp0LGVudW1lcmFibGU6ITB9KX1mdW5jdGlvbiBpKGUsdCl7aS5zdXBlcl8uY2FsbCh0aGlzLFwiRFwiLGUpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwibGhzXCIse3ZhbHVlOnQsZW51bWVyYWJsZTohMH0pfWZ1bmN0aW9uIGEoZSx0LHIpe2Euc3VwZXJfLmNhbGwodGhpcyxcIkFcIixlKSxPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcImluZGV4XCIse3ZhbHVlOnQsZW51bWVyYWJsZTohMH0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwiaXRlbVwiLHt2YWx1ZTpyLGVudW1lcmFibGU6ITB9KX1mdW5jdGlvbiBmKGUsdCxyKXt2YXIgbj1lLnNsaWNlKChyfHx0KSsxfHxlLmxlbmd0aCk7cmV0dXJuIGUubGVuZ3RoPXQ8MD9lLmxlbmd0aCt0OnQsZS5wdXNoLmFwcGx5KGUsbiksZX1mdW5jdGlvbiB1KGUpe3ZhciB0PVwidW5kZWZpbmVkXCI9PXR5cGVvZiBlP1widW5kZWZpbmVkXCI6TihlKTtyZXR1cm5cIm9iamVjdFwiIT09dD90OmU9PT1NYXRoP1wibWF0aFwiOm51bGw9PT1lP1wibnVsbFwiOkFycmF5LmlzQXJyYXkoZSk/XCJhcnJheVwiOlwiW29iamVjdCBEYXRlXVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpP1wiZGF0ZVwiOlwiZnVuY3Rpb25cIj09dHlwZW9mIGUudG9TdHJpbmcmJi9eXFwvLipcXC8vLnRlc3QoZS50b1N0cmluZygpKT9cInJlZ2V4cFwiOlwib2JqZWN0XCJ9ZnVuY3Rpb24gbChlLHQscixjLHMsZCxwKXtzPXN8fFtdLHA9cHx8W107dmFyIGc9cy5zbGljZSgwKTtpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgZCl7aWYoYyl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgYyYmYyhnLGQpKXJldHVybjtpZihcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBjP1widW5kZWZpbmVkXCI6TihjKSkpe2lmKGMucHJlZmlsdGVyJiZjLnByZWZpbHRlcihnLGQpKXJldHVybjtpZihjLm5vcm1hbGl6ZSl7dmFyIGg9Yy5ub3JtYWxpemUoZyxkLGUsdCk7aCYmKGU9aFswXSx0PWhbMV0pfX19Zy5wdXNoKGQpfVwicmVnZXhwXCI9PT11KGUpJiZcInJlZ2V4cFwiPT09dSh0KSYmKGU9ZS50b1N0cmluZygpLHQ9dC50b1N0cmluZygpKTt2YXIgeT1cInVuZGVmaW5lZFwiPT10eXBlb2YgZT9cInVuZGVmaW5lZFwiOk4oZSksdj1cInVuZGVmaW5lZFwiPT10eXBlb2YgdD9cInVuZGVmaW5lZFwiOk4odCksYj1cInVuZGVmaW5lZFwiIT09eXx8cCYmcFtwLmxlbmd0aC0xXS5saHMmJnBbcC5sZW5ndGgtMV0ubGhzLmhhc093blByb3BlcnR5KGQpLG09XCJ1bmRlZmluZWRcIiE9PXZ8fHAmJnBbcC5sZW5ndGgtMV0ucmhzJiZwW3AubGVuZ3RoLTFdLnJocy5oYXNPd25Qcm9wZXJ0eShkKTtpZighYiYmbSlyKG5ldyBvKGcsdCkpO2Vsc2UgaWYoIW0mJmIpcihuZXcgaShnLGUpKTtlbHNlIGlmKHUoZSkhPT11KHQpKXIobmV3IG4oZyxlLHQpKTtlbHNlIGlmKFwiZGF0ZVwiPT09dShlKSYmZS10IT09MClyKG5ldyBuKGcsZSx0KSk7ZWxzZSBpZihcIm9iamVjdFwiPT09eSYmbnVsbCE9PWUmJm51bGwhPT10KWlmKHAuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiB0Lmxocz09PWV9KS5sZW5ndGgpZSE9PXQmJnIobmV3IG4oZyxlLHQpKTtlbHNle2lmKHAucHVzaCh7bGhzOmUscmhzOnR9KSxBcnJheS5pc0FycmF5KGUpKXt2YXIgdztlLmxlbmd0aDtmb3Iodz0wO3c8ZS5sZW5ndGg7dysrKXc+PXQubGVuZ3RoP3IobmV3IGEoZyx3LG5ldyBpKHZvaWQgMCxlW3ddKSkpOmwoZVt3XSx0W3ddLHIsYyxnLHcscCk7Zm9yKDt3PHQubGVuZ3RoOylyKG5ldyBhKGcsdyxuZXcgbyh2b2lkIDAsdFt3KytdKSkpfWVsc2V7dmFyIHg9T2JqZWN0LmtleXMoZSksUz1PYmplY3Qua2V5cyh0KTt4LmZvckVhY2goZnVuY3Rpb24obixvKXt2YXIgaT1TLmluZGV4T2Yobik7aT49MD8obChlW25dLHRbbl0scixjLGcsbixwKSxTPWYoUyxpKSk6bChlW25dLHZvaWQgMCxyLGMsZyxuLHApfSksUy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2wodm9pZCAwLHRbZV0scixjLGcsZSxwKX0pfXAubGVuZ3RoPXAubGVuZ3RoLTF9ZWxzZSBlIT09dCYmKFwibnVtYmVyXCI9PT15JiZpc05hTihlKSYmaXNOYU4odCl8fHIobmV3IG4oZyxlLHQpKSl9ZnVuY3Rpb24gYyhlLHQscixuKXtyZXR1cm4gbj1ufHxbXSxsKGUsdCxmdW5jdGlvbihlKXtlJiZuLnB1c2goZSl9LHIpLG4ubGVuZ3RoP246dm9pZCAwfWZ1bmN0aW9uIHMoZSx0LHIpe2lmKHIucGF0aCYmci5wYXRoLmxlbmd0aCl7dmFyIG4sbz1lW3RdLGk9ci5wYXRoLmxlbmd0aC0xO2ZvcihuPTA7bjxpO24rKylvPW9bci5wYXRoW25dXTtzd2l0Y2goci5raW5kKXtjYXNlXCJBXCI6cyhvW3IucGF0aFtuXV0sci5pbmRleCxyLml0ZW0pO2JyZWFrO2Nhc2VcIkRcIjpkZWxldGUgb1tyLnBhdGhbbl1dO2JyZWFrO2Nhc2VcIkVcIjpjYXNlXCJOXCI6b1tyLnBhdGhbbl1dPXIucmhzfX1lbHNlIHN3aXRjaChyLmtpbmQpe2Nhc2VcIkFcIjpzKGVbdF0sci5pbmRleCxyLml0ZW0pO2JyZWFrO2Nhc2VcIkRcIjplPWYoZSx0KTticmVhaztjYXNlXCJFXCI6Y2FzZVwiTlwiOmVbdF09ci5yaHN9cmV0dXJuIGV9ZnVuY3Rpb24gZChlLHQscil7aWYoZSYmdCYmciYmci5raW5kKXtmb3IodmFyIG49ZSxvPS0xLGk9ci5wYXRoP3IucGF0aC5sZW5ndGgtMTowOysrbzxpOylcInVuZGVmaW5lZFwiPT10eXBlb2YgbltyLnBhdGhbb11dJiYobltyLnBhdGhbb11dPVwibnVtYmVyXCI9PXR5cGVvZiByLnBhdGhbb10/W106e30pLG49bltyLnBhdGhbb11dO3N3aXRjaChyLmtpbmQpe2Nhc2VcIkFcIjpzKHIucGF0aD9uW3IucGF0aFtvXV06bixyLmluZGV4LHIuaXRlbSk7YnJlYWs7Y2FzZVwiRFwiOmRlbGV0ZSBuW3IucGF0aFtvXV07YnJlYWs7Y2FzZVwiRVwiOmNhc2VcIk5cIjpuW3IucGF0aFtvXV09ci5yaHN9fX1mdW5jdGlvbiBwKGUsdCxyKXtpZihyLnBhdGgmJnIucGF0aC5sZW5ndGgpe3ZhciBuLG89ZVt0XSxpPXIucGF0aC5sZW5ndGgtMTtmb3Iobj0wO248aTtuKyspbz1vW3IucGF0aFtuXV07c3dpdGNoKHIua2luZCl7Y2FzZVwiQVwiOnAob1tyLnBhdGhbbl1dLHIuaW5kZXgsci5pdGVtKTticmVhaztjYXNlXCJEXCI6b1tyLnBhdGhbbl1dPXIubGhzO2JyZWFrO2Nhc2VcIkVcIjpvW3IucGF0aFtuXV09ci5saHM7YnJlYWs7Y2FzZVwiTlwiOmRlbGV0ZSBvW3IucGF0aFtuXV19fWVsc2Ugc3dpdGNoKHIua2luZCl7Y2FzZVwiQVwiOnAoZVt0XSxyLmluZGV4LHIuaXRlbSk7YnJlYWs7Y2FzZVwiRFwiOmVbdF09ci5saHM7YnJlYWs7Y2FzZVwiRVwiOmVbdF09ci5saHM7YnJlYWs7Y2FzZVwiTlwiOmU9ZihlLHQpfXJldHVybiBlfWZ1bmN0aW9uIGcoZSx0LHIpe2lmKGUmJnQmJnImJnIua2luZCl7dmFyIG4sbyxpPWU7Zm9yKG89ci5wYXRoLmxlbmd0aC0xLG49MDtuPG87bisrKVwidW5kZWZpbmVkXCI9PXR5cGVvZiBpW3IucGF0aFtuXV0mJihpW3IucGF0aFtuXV09e30pLGk9aVtyLnBhdGhbbl1dO3N3aXRjaChyLmtpbmQpe2Nhc2VcIkFcIjpwKGlbci5wYXRoW25dXSxyLmluZGV4LHIuaXRlbSk7YnJlYWs7Y2FzZVwiRFwiOmlbci5wYXRoW25dXT1yLmxoczticmVhaztjYXNlXCJFXCI6aVtyLnBhdGhbbl1dPXIubGhzO2JyZWFrO2Nhc2VcIk5cIjpkZWxldGUgaVtyLnBhdGhbbl1dfX19ZnVuY3Rpb24gaChlLHQscil7aWYoZSYmdCl7dmFyIG49ZnVuY3Rpb24obil7ciYmIXIoZSx0LG4pfHxkKGUsdCxuKX07bChlLHQsbil9fWZ1bmN0aW9uIHkoZSl7cmV0dXJuXCJjb2xvcjogXCIrRltlXS5jb2xvcitcIjsgZm9udC13ZWlnaHQ6IGJvbGRcIn1mdW5jdGlvbiB2KGUpe3ZhciB0PWUua2luZCxyPWUucGF0aCxuPWUubGhzLG89ZS5yaHMsaT1lLmluZGV4LGE9ZS5pdGVtO3N3aXRjaCh0KXtjYXNlXCJFXCI6cmV0dXJuW3Iuam9pbihcIi5cIiksbixcIuKGklwiLG9dO2Nhc2VcIk5cIjpyZXR1cm5bci5qb2luKFwiLlwiKSxvXTtjYXNlXCJEXCI6cmV0dXJuW3Iuam9pbihcIi5cIildO2Nhc2VcIkFcIjpyZXR1cm5bci5qb2luKFwiLlwiKStcIltcIitpK1wiXVwiLGFdO2RlZmF1bHQ6cmV0dXJuW119fWZ1bmN0aW9uIGIoZSx0LHIsbil7dmFyIG89YyhlLHQpO3RyeXtuP3IuZ3JvdXBDb2xsYXBzZWQoXCJkaWZmXCIpOnIuZ3JvdXAoXCJkaWZmXCIpfWNhdGNoKGUpe3IubG9nKFwiZGlmZlwiKX1vP28uZm9yRWFjaChmdW5jdGlvbihlKXt2YXIgdD1lLmtpbmQsbj12KGUpO3IubG9nLmFwcGx5KHIsW1wiJWMgXCIrRlt0XS50ZXh0LHkodCldLmNvbmNhdChQKG4pKSl9KTpyLmxvZyhcIuKAlOKAlCBubyBkaWZmIOKAlOKAlFwiKTt0cnl7ci5ncm91cEVuZCgpfWNhdGNoKGUpe3IubG9nKFwi4oCU4oCUIGRpZmYgZW5kIOKAlOKAlCBcIil9fWZ1bmN0aW9uIG0oZSx0LHIsbil7c3dpdGNoKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBlP1widW5kZWZpbmVkXCI6TihlKSl7Y2FzZVwib2JqZWN0XCI6cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgZVtuXT9lW25dLmFwcGx5KGUsUChyKSk6ZVtuXTtjYXNlXCJmdW5jdGlvblwiOnJldHVybiBlKHQpO2RlZmF1bHQ6cmV0dXJuIGV9fWZ1bmN0aW9uIHcoZSl7dmFyIHQ9ZS50aW1lc3RhbXAscj1lLmR1cmF0aW9uO3JldHVybiBmdW5jdGlvbihlLG4sbyl7dmFyIGk9W1wiYWN0aW9uXCJdO3JldHVybiBpLnB1c2goXCIlY1wiK1N0cmluZyhlLnR5cGUpKSx0JiZpLnB1c2goXCIlY0AgXCIrbiksciYmaS5wdXNoKFwiJWMoaW4gXCIrby50b0ZpeGVkKDIpK1wiIG1zKVwiKSxpLmpvaW4oXCIgXCIpfX1mdW5jdGlvbiB4KGUsdCl7dmFyIHI9dC5sb2dnZXIsbj10LmFjdGlvblRyYW5zZm9ybWVyLG89dC50aXRsZUZvcm1hdHRlcixpPXZvaWQgMD09PW8/dyh0KTpvLGE9dC5jb2xsYXBzZWQsZj10LmNvbG9ycyx1PXQubGV2ZWwsbD10LmRpZmYsYz1cInVuZGVmaW5lZFwiPT10eXBlb2YgdC50aXRsZUZvcm1hdHRlcjtlLmZvckVhY2goZnVuY3Rpb24obyxzKXt2YXIgZD1vLnN0YXJ0ZWQscD1vLnN0YXJ0ZWRUaW1lLGc9by5hY3Rpb24saD1vLnByZXZTdGF0ZSx5PW8uZXJyb3Isdj1vLnRvb2ssdz1vLm5leHRTdGF0ZSx4PWVbcysxXTt4JiYodz14LnByZXZTdGF0ZSx2PXguc3RhcnRlZC1kKTt2YXIgUz1uKGcpLGs9XCJmdW5jdGlvblwiPT10eXBlb2YgYT9hKGZ1bmN0aW9uKCl7cmV0dXJuIHd9LGcsbyk6YSxqPUQocCksRT1mLnRpdGxlP1wiY29sb3I6IFwiK2YudGl0bGUoUykrXCI7XCI6XCJcIixBPVtcImNvbG9yOiBncmF5OyBmb250LXdlaWdodDogbGlnaHRlcjtcIl07QS5wdXNoKEUpLHQudGltZXN0YW1wJiZBLnB1c2goXCJjb2xvcjogZ3JheTsgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7XCIpLHQuZHVyYXRpb24mJkEucHVzaChcImNvbG9yOiBncmF5OyBmb250LXdlaWdodDogbGlnaHRlcjtcIik7dmFyIE89aShTLGosdik7dHJ5e2s/Zi50aXRsZSYmYz9yLmdyb3VwQ29sbGFwc2VkLmFwcGx5KHIsW1wiJWMgXCIrT10uY29uY2F0KEEpKTpyLmdyb3VwQ29sbGFwc2VkKE8pOmYudGl0bGUmJmM/ci5ncm91cC5hcHBseShyLFtcIiVjIFwiK09dLmNvbmNhdChBKSk6ci5ncm91cChPKX1jYXRjaChlKXtyLmxvZyhPKX12YXIgTj1tKHUsUyxbaF0sXCJwcmV2U3RhdGVcIiksUD1tKHUsUyxbU10sXCJhY3Rpb25cIiksQz1tKHUsUyxbeSxoXSxcImVycm9yXCIpLEY9bSh1LFMsW3ddLFwibmV4dFN0YXRlXCIpO2lmKE4paWYoZi5wcmV2U3RhdGUpe3ZhciBMPVwiY29sb3I6IFwiK2YucHJldlN0YXRlKGgpK1wiOyBmb250LXdlaWdodDogYm9sZFwiO3JbTl0oXCIlYyBwcmV2IHN0YXRlXCIsTCxoKX1lbHNlIHJbTl0oXCJwcmV2IHN0YXRlXCIsaCk7aWYoUClpZihmLmFjdGlvbil7dmFyIFQ9XCJjb2xvcjogXCIrZi5hY3Rpb24oUykrXCI7IGZvbnQtd2VpZ2h0OiBib2xkXCI7cltQXShcIiVjIGFjdGlvbiAgICBcIixULFMpfWVsc2UgcltQXShcImFjdGlvbiAgICBcIixTKTtpZih5JiZDKWlmKGYuZXJyb3Ipe3ZhciBNPVwiY29sb3I6IFwiK2YuZXJyb3IoeSxoKStcIjsgZm9udC13ZWlnaHQ6IGJvbGQ7XCI7cltDXShcIiVjIGVycm9yICAgICBcIixNLHkpfWVsc2UgcltDXShcImVycm9yICAgICBcIix5KTtpZihGKWlmKGYubmV4dFN0YXRlKXt2YXIgXz1cImNvbG9yOiBcIitmLm5leHRTdGF0ZSh3KStcIjsgZm9udC13ZWlnaHQ6IGJvbGRcIjtyW0ZdKFwiJWMgbmV4dCBzdGF0ZVwiLF8sdyl9ZWxzZSByW0ZdKFwibmV4dCBzdGF0ZVwiLHcpO2wmJmIoaCx3LHIsayk7dHJ5e3IuZ3JvdXBFbmQoKX1jYXRjaChlKXtyLmxvZyhcIuKAlOKAlCBsb2cgZW5kIOKAlOKAlFwiKX19KX1mdW5jdGlvbiBTKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnt9LHQ9T2JqZWN0LmFzc2lnbih7fSxMLGUpLHI9dC5sb2dnZXIsbj10LnN0YXRlVHJhbnNmb3JtZXIsbz10LmVycm9yVHJhbnNmb3JtZXIsaT10LnByZWRpY2F0ZSxhPXQubG9nRXJyb3JzLGY9dC5kaWZmUHJlZGljYXRlO2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiByKXJldHVybiBmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIGUodCl9fX07aWYoZS5nZXRTdGF0ZSYmZS5kaXNwYXRjaClyZXR1cm4gY29uc29sZS5lcnJvcihcIltyZWR1eC1sb2dnZXJdIHJlZHV4LWxvZ2dlciBub3QgaW5zdGFsbGVkLiBNYWtlIHN1cmUgdG8gcGFzcyBsb2dnZXIgaW5zdGFuY2UgYXMgbWlkZGxld2FyZTpcXG4vLyBMb2dnZXIgd2l0aCBkZWZhdWx0IG9wdGlvbnNcXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdyZWR1eC1sb2dnZXInXFxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShcXG4gIHJlZHVjZXIsXFxuICBhcHBseU1pZGRsZXdhcmUobG9nZ2VyKVxcbilcXG4vLyBPciB5b3UgY2FuIGNyZWF0ZSB5b3VyIG93biBsb2dnZXIgd2l0aCBjdXN0b20gb3B0aW9ucyBodHRwOi8vYml0Lmx5L3JlZHV4LWxvZ2dlci1vcHRpb25zXFxuaW1wb3J0IGNyZWF0ZUxvZ2dlciBmcm9tICdyZWR1eC1sb2dnZXInXFxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKHtcXG4gIC8vIC4uLm9wdGlvbnNcXG59KTtcXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFxcbiAgcmVkdWNlcixcXG4gIGFwcGx5TWlkZGxld2FyZShsb2dnZXIpXFxuKVxcblwiKSxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIGUodCl9fX07dmFyIHU9W107cmV0dXJuIGZ1bmN0aW9uKGUpe3ZhciByPWUuZ2V0U3RhdGU7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbihsKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBpJiYhaShyLGwpKXJldHVybiBlKGwpO3ZhciBjPXt9O3UucHVzaChjKSxjLnN0YXJ0ZWQ9Ty5ub3coKSxjLnN0YXJ0ZWRUaW1lPW5ldyBEYXRlLGMucHJldlN0YXRlPW4ocigpKSxjLmFjdGlvbj1sO3ZhciBzPXZvaWQgMDtpZihhKXRyeXtzPWUobCl9Y2F0Y2goZSl7Yy5lcnJvcj1vKGUpfWVsc2Ugcz1lKGwpO2MudG9vaz1PLm5vdygpLWMuc3RhcnRlZCxjLm5leHRTdGF0ZT1uKHIoKSk7dmFyIGQ9dC5kaWZmJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBmP2YocixsKTp0LmRpZmY7aWYoeCh1LE9iamVjdC5hc3NpZ24oe30sdCx7ZGlmZjpkfSkpLHUubGVuZ3RoPTAsYy5lcnJvcil0aHJvdyBjLmVycm9yO3JldHVybiBzfX19fXZhciBrLGosRT1mdW5jdGlvbihlLHQpe3JldHVybiBuZXcgQXJyYXkodCsxKS5qb2luKGUpfSxBPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEUoXCIwXCIsdC1lLnRvU3RyaW5nKCkubGVuZ3RoKStlfSxEPWZ1bmN0aW9uKGUpe3JldHVybiBBKGUuZ2V0SG91cnMoKSwyKStcIjpcIitBKGUuZ2V0TWludXRlcygpLDIpK1wiOlwiK0EoZS5nZXRTZWNvbmRzKCksMikrXCIuXCIrQShlLmdldE1pbGxpc2Vjb25kcygpLDMpfSxPPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBwZXJmb3JtYW5jZSYmbnVsbCE9PXBlcmZvcm1hbmNlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBwZXJmb3JtYW5jZS5ub3c/cGVyZm9ybWFuY2U6RGF0ZSxOPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihlKXtyZXR1cm4gdHlwZW9mIGV9OmZ1bmN0aW9uKGUpe3JldHVybiBlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJmUuY29uc3RydWN0b3I9PT1TeW1ib2wmJmUhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIGV9LFA9ZnVuY3Rpb24oZSl7aWYoQXJyYXkuaXNBcnJheShlKSl7Zm9yKHZhciB0PTAscj1BcnJheShlLmxlbmd0aCk7dDxlLmxlbmd0aDt0Kyspclt0XT1lW3RdO3JldHVybiByfXJldHVybiBBcnJheS5mcm9tKGUpfSxDPVtdO2s9XCJvYmplY3RcIj09PShcInVuZGVmaW5lZFwiPT10eXBlb2YgZ2xvYmFsP1widW5kZWZpbmVkXCI6TihnbG9iYWwpKSYmZ2xvYmFsP2dsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxqPWsuRGVlcERpZmYsaiYmQy5wdXNoKGZ1bmN0aW9uKCl7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGomJmsuRGVlcERpZmY9PT1jJiYoay5EZWVwRGlmZj1qLGo9dm9pZCAwKX0pLHQobixyKSx0KG8sciksdChpLHIpLHQoYSxyKSxPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjLHtkaWZmOnt2YWx1ZTpjLGVudW1lcmFibGU6ITB9LG9ic2VydmFibGVEaWZmOnt2YWx1ZTpsLGVudW1lcmFibGU6ITB9LGFwcGx5RGlmZjp7dmFsdWU6aCxlbnVtZXJhYmxlOiEwfSxhcHBseUNoYW5nZTp7dmFsdWU6ZCxlbnVtZXJhYmxlOiEwfSxyZXZlcnRDaGFuZ2U6e3ZhbHVlOmcsZW51bWVyYWJsZTohMH0saXNDb25mbGljdDp7dmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm5cInVuZGVmaW5lZFwiIT10eXBlb2Ygan0sZW51bWVyYWJsZTohMH0sbm9Db25mbGljdDp7dmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gQyYmKEMuZm9yRWFjaChmdW5jdGlvbihlKXtlKCl9KSxDPW51bGwpLGN9LGVudW1lcmFibGU6ITB9fSk7dmFyIEY9e0U6e2NvbG9yOlwiIzIxOTZGM1wiLHRleHQ6XCJDSEFOR0VEOlwifSxOOntjb2xvcjpcIiM0Q0FGNTBcIix0ZXh0OlwiQURERUQ6XCJ9LEQ6e2NvbG9yOlwiI0Y0NDMzNlwiLHRleHQ6XCJERUxFVEVEOlwifSxBOntjb2xvcjpcIiMyMTk2RjNcIix0ZXh0OlwiQVJSQVk6XCJ9fSxMPXtsZXZlbDpcImxvZ1wiLGxvZ2dlcjpjb25zb2xlLGxvZ0Vycm9yczohMCxjb2xsYXBzZWQ6dm9pZCAwLHByZWRpY2F0ZTp2b2lkIDAsZHVyYXRpb246ITEsdGltZXN0YW1wOiEwLHN0YXRlVHJhbnNmb3JtZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGV9LGFjdGlvblRyYW5zZm9ybWVyOmZ1bmN0aW9uKGUpe3JldHVybiBlfSxlcnJvclRyYW5zZm9ybWVyOmZ1bmN0aW9uKGUpe3JldHVybiBlfSxjb2xvcnM6e3RpdGxlOmZ1bmN0aW9uKCl7cmV0dXJuXCJpbmhlcml0XCJ9LHByZXZTdGF0ZTpmdW5jdGlvbigpe3JldHVyblwiIzlFOUU5RVwifSxhY3Rpb246ZnVuY3Rpb24oKXtyZXR1cm5cIiMwM0E5RjRcIn0sbmV4dFN0YXRlOmZ1bmN0aW9uKCl7cmV0dXJuXCIjNENBRjUwXCJ9LGVycm9yOmZ1bmN0aW9uKCl7cmV0dXJuXCIjRjIwNDA0XCJ9fSxkaWZmOiExLGRpZmZQcmVkaWNhdGU6dm9pZCAwLHRyYW5zZm9ybWVyOnZvaWQgMH0sVD1mdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp7fSx0PWUuZGlzcGF0Y2gscj1lLmdldFN0YXRlO3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIHR8fFwiZnVuY3Rpb25cIj09dHlwZW9mIHI/UygpKHtkaXNwYXRjaDp0LGdldFN0YXRlOnJ9KTp2b2lkIGNvbnNvbGUuZXJyb3IoXCJcXG5bcmVkdXgtbG9nZ2VyIHYzXSBCUkVBS0lORyBDSEFOR0VcXG5bcmVkdXgtbG9nZ2VyIHYzXSBTaW5jZSAzLjAuMCByZWR1eC1sb2dnZXIgZXhwb3J0cyBieSBkZWZhdWx0IGxvZ2dlciB3aXRoIGRlZmF1bHQgc2V0dGluZ3MuXFxuW3JlZHV4LWxvZ2dlciB2M10gQ2hhbmdlXFxuW3JlZHV4LWxvZ2dlciB2M10gaW1wb3J0IGNyZWF0ZUxvZ2dlciBmcm9tICdyZWR1eC1sb2dnZXInXFxuW3JlZHV4LWxvZ2dlciB2M10gdG9cXG5bcmVkdXgtbG9nZ2VyIHYzXSBpbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tICdyZWR1eC1sb2dnZXInXFxuXCIpfTtlLmRlZmF1bHRzPUwsZS5jcmVhdGVMb2dnZXI9UyxlLmxvZ2dlcj1ULGUuZGVmYXVsdD1ULE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pfSk7XG4iLCJmdW5jdGlvbiBjcmVhdGVUaHVua01pZGRsZXdhcmUoZXh0cmFBcmd1bWVudCkge1xuICByZXR1cm4gZnVuY3Rpb24gKF9yZWYpIHtcbiAgICB2YXIgZGlzcGF0Y2ggPSBfcmVmLmRpc3BhdGNoLFxuICAgICAgICBnZXRTdGF0ZSA9IF9yZWYuZ2V0U3RhdGU7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiBhY3Rpb24oZGlzcGF0Y2gsIGdldFN0YXRlLCBleHRyYUFyZ3VtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gICAgICB9O1xuICAgIH07XG4gIH07XG59XG5cbnZhciB0aHVuayA9IGNyZWF0ZVRodW5rTWlkZGxld2FyZSgpO1xudGh1bmsud2l0aEV4dHJhQXJndW1lbnQgPSBjcmVhdGVUaHVua01pZGRsZXdhcmU7XG5cbmV4cG9ydCBkZWZhdWx0IHRodW5rOyIsImltcG9ydCAkJG9ic2VydmFibGUgZnJvbSAnc3ltYm9sLW9ic2VydmFibGUnO1xuXG4vKipcbiAqIFRoZXNlIGFyZSBwcml2YXRlIGFjdGlvbiB0eXBlcyByZXNlcnZlZCBieSBSZWR1eC5cbiAqIEZvciBhbnkgdW5rbm93biBhY3Rpb25zLCB5b3UgbXVzdCByZXR1cm4gdGhlIGN1cnJlbnQgc3RhdGUuXG4gKiBJZiB0aGUgY3VycmVudCBzdGF0ZSBpcyB1bmRlZmluZWQsIHlvdSBtdXN0IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZS5cbiAqIERvIG5vdCByZWZlcmVuY2UgdGhlc2UgYWN0aW9uIHR5cGVzIGRpcmVjdGx5IGluIHlvdXIgY29kZS5cbiAqL1xudmFyIHJhbmRvbVN0cmluZyA9IGZ1bmN0aW9uIHJhbmRvbVN0cmluZygpIHtcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZyg3KS5zcGxpdCgnJykuam9pbignLicpO1xufTtcblxudmFyIEFjdGlvblR5cGVzID0ge1xuICBJTklUOiBcIkBAcmVkdXgvSU5JVFwiICsgcmFuZG9tU3RyaW5nKCksXG4gIFJFUExBQ0U6IFwiQEByZWR1eC9SRVBMQUNFXCIgKyByYW5kb21TdHJpbmcoKSxcbiAgUFJPQkVfVU5LTk9XTl9BQ1RJT046IGZ1bmN0aW9uIFBST0JFX1VOS05PV05fQUNUSU9OKCkge1xuICAgIHJldHVybiBcIkBAcmVkdXgvUFJPQkVfVU5LTk9XTl9BQ1RJT05cIiArIHJhbmRvbVN0cmluZygpO1xuICB9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7YW55fSBvYmogVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIGFyZ3VtZW50IGFwcGVhcnMgdG8gYmUgYSBwbGFpbiBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3Qob2JqKSB7XG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCBvYmogPT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgdmFyIHByb3RvID0gb2JqO1xuXG4gIHdoaWxlIChPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pICE9PSBudWxsKSB7XG4gICAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopID09PSBwcm90bztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgUmVkdXggc3RvcmUgdGhhdCBob2xkcyB0aGUgc3RhdGUgdHJlZS5cbiAqIFRoZSBvbmx5IHdheSB0byBjaGFuZ2UgdGhlIGRhdGEgaW4gdGhlIHN0b3JlIGlzIHRvIGNhbGwgYGRpc3BhdGNoKClgIG9uIGl0LlxuICpcbiAqIFRoZXJlIHNob3VsZCBvbmx5IGJlIGEgc2luZ2xlIHN0b3JlIGluIHlvdXIgYXBwLiBUbyBzcGVjaWZ5IGhvdyBkaWZmZXJlbnRcbiAqIHBhcnRzIG9mIHRoZSBzdGF0ZSB0cmVlIHJlc3BvbmQgdG8gYWN0aW9ucywgeW91IG1heSBjb21iaW5lIHNldmVyYWwgcmVkdWNlcnNcbiAqIGludG8gYSBzaW5nbGUgcmVkdWNlciBmdW5jdGlvbiBieSB1c2luZyBgY29tYmluZVJlZHVjZXJzYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWR1Y2VyIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBuZXh0IHN0YXRlIHRyZWUsIGdpdmVuXG4gKiB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgYWN0aW9uIHRvIGhhbmRsZS5cbiAqXG4gKiBAcGFyYW0ge2FueX0gW3ByZWxvYWRlZFN0YXRlXSBUaGUgaW5pdGlhbCBzdGF0ZS4gWW91IG1heSBvcHRpb25hbGx5IHNwZWNpZnkgaXRcbiAqIHRvIGh5ZHJhdGUgdGhlIHN0YXRlIGZyb20gdGhlIHNlcnZlciBpbiB1bml2ZXJzYWwgYXBwcywgb3IgdG8gcmVzdG9yZSBhXG4gKiBwcmV2aW91c2x5IHNlcmlhbGl6ZWQgdXNlciBzZXNzaW9uLlxuICogSWYgeW91IHVzZSBgY29tYmluZVJlZHVjZXJzYCB0byBwcm9kdWNlIHRoZSByb290IHJlZHVjZXIgZnVuY3Rpb24sIHRoaXMgbXVzdCBiZVxuICogYW4gb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUgYXMgYGNvbWJpbmVSZWR1Y2Vyc2Aga2V5cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZW5oYW5jZXJdIFRoZSBzdG9yZSBlbmhhbmNlci4gWW91IG1heSBvcHRpb25hbGx5IHNwZWNpZnkgaXRcbiAqIHRvIGVuaGFuY2UgdGhlIHN0b3JlIHdpdGggdGhpcmQtcGFydHkgY2FwYWJpbGl0aWVzIHN1Y2ggYXMgbWlkZGxld2FyZSxcbiAqIHRpbWUgdHJhdmVsLCBwZXJzaXN0ZW5jZSwgZXRjLiBUaGUgb25seSBzdG9yZSBlbmhhbmNlciB0aGF0IHNoaXBzIHdpdGggUmVkdXhcbiAqIGlzIGBhcHBseU1pZGRsZXdhcmUoKWAuXG4gKlxuICogQHJldHVybnMge1N0b3JlfSBBIFJlZHV4IHN0b3JlIHRoYXQgbGV0cyB5b3UgcmVhZCB0aGUgc3RhdGUsIGRpc3BhdGNoIGFjdGlvbnNcbiAqIGFuZCBzdWJzY3JpYmUgdG8gY2hhbmdlcy5cbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVTdG9yZShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpIHtcbiAgdmFyIF9yZWYyO1xuXG4gIGlmICh0eXBlb2YgcHJlbG9hZGVkU3RhdGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGVuaGFuY2VyID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbmhhbmNlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgYXJndW1lbnRzWzNdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJdCBsb29rcyBsaWtlIHlvdSBhcmUgcGFzc2luZyBzZXZlcmFsIHN0b3JlIGVuaGFuY2VycyB0byAnICsgJ2NyZWF0ZVN0b3JlKCkuIFRoaXMgaXMgbm90IHN1cHBvcnRlZC4gSW5zdGVhZCwgY29tcG9zZSB0aGVtICcgKyAndG9nZXRoZXIgdG8gYSBzaW5nbGUgZnVuY3Rpb24uJyk7XG4gIH1cblxuICBpZiAodHlwZW9mIHByZWxvYWRlZFN0YXRlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBlbmhhbmNlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlbmhhbmNlciA9IHByZWxvYWRlZFN0YXRlO1xuICAgIHByZWxvYWRlZFN0YXRlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbmhhbmNlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBlbmhhbmNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHJldHVybiBlbmhhbmNlcihjcmVhdGVTdG9yZSkocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiByZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgcmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIGN1cnJlbnRSZWR1Y2VyID0gcmVkdWNlcjtcbiAgdmFyIGN1cnJlbnRTdGF0ZSA9IHByZWxvYWRlZFN0YXRlO1xuICB2YXIgY3VycmVudExpc3RlbmVycyA9IFtdO1xuICB2YXIgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnM7XG4gIHZhciBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG4gIC8qKlxuICAgKiBUaGlzIG1ha2VzIGEgc2hhbGxvdyBjb3B5IG9mIGN1cnJlbnRMaXN0ZW5lcnMgc28gd2UgY2FuIHVzZVxuICAgKiBuZXh0TGlzdGVuZXJzIGFzIGEgdGVtcG9yYXJ5IGxpc3Qgd2hpbGUgZGlzcGF0Y2hpbmcuXG4gICAqXG4gICAqIFRoaXMgcHJldmVudHMgYW55IGJ1Z3MgYXJvdW5kIGNvbnN1bWVycyBjYWxsaW5nXG4gICAqIHN1YnNjcmliZS91bnN1YnNjcmliZSBpbiB0aGUgbWlkZGxlIG9mIGEgZGlzcGF0Y2guXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKG5leHRMaXN0ZW5lcnMgPT09IGN1cnJlbnRMaXN0ZW5lcnMpIHtcbiAgICAgIG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBSZWFkcyB0aGUgc3RhdGUgdHJlZSBtYW5hZ2VkIGJ5IHRoZSBzdG9yZS5cbiAgICpcbiAgICogQHJldHVybnMge2FueX0gVGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBvZiB5b3VyIGFwcGxpY2F0aW9uLlxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtYXkgbm90IGNhbGwgc3RvcmUuZ2V0U3RhdGUoKSB3aGlsZSB0aGUgcmVkdWNlciBpcyBleGVjdXRpbmcuICcgKyAnVGhlIHJlZHVjZXIgaGFzIGFscmVhZHkgcmVjZWl2ZWQgdGhlIHN0YXRlIGFzIGFuIGFyZ3VtZW50LiAnICsgJ1Bhc3MgaXQgZG93biBmcm9tIHRoZSB0b3AgcmVkdWNlciBpbnN0ZWFkIG9mIHJlYWRpbmcgaXQgZnJvbSB0aGUgc3RvcmUuJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnRTdGF0ZTtcbiAgfVxuICAvKipcbiAgICogQWRkcyBhIGNoYW5nZSBsaXN0ZW5lci4gSXQgd2lsbCBiZSBjYWxsZWQgYW55IHRpbWUgYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQsXG4gICAqIGFuZCBzb21lIHBhcnQgb2YgdGhlIHN0YXRlIHRyZWUgbWF5IHBvdGVudGlhbGx5IGhhdmUgY2hhbmdlZC4gWW91IG1heSB0aGVuXG4gICAqIGNhbGwgYGdldFN0YXRlKClgIHRvIHJlYWQgdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBpbnNpZGUgdGhlIGNhbGxiYWNrLlxuICAgKlxuICAgKiBZb3UgbWF5IGNhbGwgYGRpc3BhdGNoKClgIGZyb20gYSBjaGFuZ2UgbGlzdGVuZXIsIHdpdGggdGhlIGZvbGxvd2luZ1xuICAgKiBjYXZlYXRzOlxuICAgKlxuICAgKiAxLiBUaGUgc3Vic2NyaXB0aW9ucyBhcmUgc25hcHNob3R0ZWQganVzdCBiZWZvcmUgZXZlcnkgYGRpc3BhdGNoKClgIGNhbGwuXG4gICAqIElmIHlvdSBzdWJzY3JpYmUgb3IgdW5zdWJzY3JpYmUgd2hpbGUgdGhlIGxpc3RlbmVycyBhcmUgYmVpbmcgaW52b2tlZCwgdGhpc1xuICAgKiB3aWxsIG5vdCBoYXZlIGFueSBlZmZlY3Qgb24gdGhlIGBkaXNwYXRjaCgpYCB0aGF0IGlzIGN1cnJlbnRseSBpbiBwcm9ncmVzcy5cbiAgICogSG93ZXZlciwgdGhlIG5leHQgYGRpc3BhdGNoKClgIGNhbGwsIHdoZXRoZXIgbmVzdGVkIG9yIG5vdCwgd2lsbCB1c2UgYSBtb3JlXG4gICAqIHJlY2VudCBzbmFwc2hvdCBvZiB0aGUgc3Vic2NyaXB0aW9uIGxpc3QuXG4gICAqXG4gICAqIDIuIFRoZSBsaXN0ZW5lciBzaG91bGQgbm90IGV4cGVjdCB0byBzZWUgYWxsIHN0YXRlIGNoYW5nZXMsIGFzIHRoZSBzdGF0ZVxuICAgKiBtaWdodCBoYXZlIGJlZW4gdXBkYXRlZCBtdWx0aXBsZSB0aW1lcyBkdXJpbmcgYSBuZXN0ZWQgYGRpc3BhdGNoKClgIGJlZm9yZVxuICAgKiB0aGUgbGlzdGVuZXIgaXMgY2FsbGVkLiBJdCBpcywgaG93ZXZlciwgZ3VhcmFudGVlZCB0aGF0IGFsbCBzdWJzY3JpYmVyc1xuICAgKiByZWdpc3RlcmVkIGJlZm9yZSB0aGUgYGRpc3BhdGNoKClgIHN0YXJ0ZWQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgbGF0ZXN0XG4gICAqIHN0YXRlIGJ5IHRoZSB0aW1lIGl0IGV4aXRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBBIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgb24gZXZlcnkgZGlzcGF0Y2guXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0byByZW1vdmUgdGhpcyBjaGFuZ2UgbGlzdGVuZXIuXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgbGlzdGVuZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAoaXNEaXNwYXRjaGluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbWF5IG5vdCBjYWxsIHN0b3JlLnN1YnNjcmliZSgpIHdoaWxlIHRoZSByZWR1Y2VyIGlzIGV4ZWN1dGluZy4gJyArICdJZiB5b3Ugd291bGQgbGlrZSB0byBiZSBub3RpZmllZCBhZnRlciB0aGUgc3RvcmUgaGFzIGJlZW4gdXBkYXRlZCwgc3Vic2NyaWJlIGZyb20gYSAnICsgJ2NvbXBvbmVudCBhbmQgaW52b2tlIHN0b3JlLmdldFN0YXRlKCkgaW4gdGhlIGNhbGxiYWNrIHRvIGFjY2VzcyB0aGUgbGF0ZXN0IHN0YXRlLiAnICsgJ1NlZSBodHRwczovL3JlZHV4LmpzLm9yZy9hcGktcmVmZXJlbmNlL3N0b3JlI3N1YnNjcmliZShsaXN0ZW5lcikgZm9yIG1vcmUgZGV0YWlscy4nKTtcbiAgICB9XG5cbiAgICB2YXIgaXNTdWJzY3JpYmVkID0gdHJ1ZTtcbiAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG4gICAgbmV4dExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICBpZiAoIWlzU3Vic2NyaWJlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG1heSBub3QgdW5zdWJzY3JpYmUgZnJvbSBhIHN0b3JlIGxpc3RlbmVyIHdoaWxlIHRoZSByZWR1Y2VyIGlzIGV4ZWN1dGluZy4gJyArICdTZWUgaHR0cHM6Ly9yZWR1eC5qcy5vcmcvYXBpLXJlZmVyZW5jZS9zdG9yZSNzdWJzY3JpYmUobGlzdGVuZXIpIGZvciBtb3JlIGRldGFpbHMuJyk7XG4gICAgICB9XG5cbiAgICAgIGlzU3Vic2NyaWJlZCA9IGZhbHNlO1xuICAgICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgICAgdmFyIGluZGV4ID0gbmV4dExpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICAgIG5leHRMaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiBEaXNwYXRjaGVzIGFuIGFjdGlvbi4gSXQgaXMgdGhlIG9ubHkgd2F5IHRvIHRyaWdnZXIgYSBzdGF0ZSBjaGFuZ2UuXG4gICAqXG4gICAqIFRoZSBgcmVkdWNlcmAgZnVuY3Rpb24sIHVzZWQgdG8gY3JlYXRlIHRoZSBzdG9yZSwgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGVcbiAgICogY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgZ2l2ZW4gYGFjdGlvbmAuIEl0cyByZXR1cm4gdmFsdWUgd2lsbFxuICAgKiBiZSBjb25zaWRlcmVkIHRoZSAqKm5leHQqKiBzdGF0ZSBvZiB0aGUgdHJlZSwgYW5kIHRoZSBjaGFuZ2UgbGlzdGVuZXJzXG4gICAqIHdpbGwgYmUgbm90aWZpZWQuXG4gICAqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9ubHkgc3VwcG9ydHMgcGxhaW4gb2JqZWN0IGFjdGlvbnMuIElmIHlvdSB3YW50IHRvXG4gICAqIGRpc3BhdGNoIGEgUHJvbWlzZSwgYW4gT2JzZXJ2YWJsZSwgYSB0aHVuaywgb3Igc29tZXRoaW5nIGVsc2UsIHlvdSBuZWVkIHRvXG4gICAqIHdyYXAgeW91ciBzdG9yZSBjcmVhdGluZyBmdW5jdGlvbiBpbnRvIHRoZSBjb3JyZXNwb25kaW5nIG1pZGRsZXdhcmUuIEZvclxuICAgKiBleGFtcGxlLCBzZWUgdGhlIGRvY3VtZW50YXRpb24gZm9yIHRoZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UuIEV2ZW4gdGhlXG4gICAqIG1pZGRsZXdhcmUgd2lsbCBldmVudHVhbGx5IGRpc3BhdGNoIHBsYWluIG9iamVjdCBhY3Rpb25zIHVzaW5nIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIEEgcGxhaW4gb2JqZWN0IHJlcHJlc2VudGluZyDigJx3aGF0IGNoYW5nZWTigJ0uIEl0IGlzXG4gICAqIGEgZ29vZCBpZGVhIHRvIGtlZXAgYWN0aW9ucyBzZXJpYWxpemFibGUgc28geW91IGNhbiByZWNvcmQgYW5kIHJlcGxheSB1c2VyXG4gICAqIHNlc3Npb25zLCBvciB1c2UgdGhlIHRpbWUgdHJhdmVsbGluZyBgcmVkdXgtZGV2dG9vbHNgLiBBbiBhY3Rpb24gbXVzdCBoYXZlXG4gICAqIGEgYHR5cGVgIHByb3BlcnR5IHdoaWNoIG1heSBub3QgYmUgYHVuZGVmaW5lZGAuIEl0IGlzIGEgZ29vZCBpZGVhIHRvIHVzZVxuICAgKiBzdHJpbmcgY29uc3RhbnRzIGZvciBhY3Rpb24gdHlwZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEZvciBjb252ZW5pZW5jZSwgdGhlIHNhbWUgYWN0aW9uIG9iamVjdCB5b3UgZGlzcGF0Y2hlZC5cbiAgICpcbiAgICogTm90ZSB0aGF0LCBpZiB5b3UgdXNlIGEgY3VzdG9tIG1pZGRsZXdhcmUsIGl0IG1heSB3cmFwIGBkaXNwYXRjaCgpYCB0b1xuICAgKiByZXR1cm4gc29tZXRoaW5nIGVsc2UgKGZvciBleGFtcGxlLCBhIFByb21pc2UgeW91IGNhbiBhd2FpdCkuXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uKSB7XG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KGFjdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0aW9ucyBtdXN0IGJlIHBsYWluIG9iamVjdHMuICcgKyAnVXNlIGN1c3RvbSBtaWRkbGV3YXJlIGZvciBhc3luYyBhY3Rpb25zLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYWN0aW9uLnR5cGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbWF5IG5vdCBoYXZlIGFuIHVuZGVmaW5lZCBcInR5cGVcIiBwcm9wZXJ0eS4gJyArICdIYXZlIHlvdSBtaXNzcGVsbGVkIGEgY29uc3RhbnQ/Jyk7XG4gICAgfVxuXG4gICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlcnMgbWF5IG5vdCBkaXNwYXRjaCBhY3Rpb25zLicpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBpc0Rpc3BhdGNoaW5nID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IGN1cnJlbnRSZWR1Y2VyKGN1cnJlbnRTdGF0ZSwgYWN0aW9uKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBsaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzID0gbmV4dExpc3RlbmVycztcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgICBsaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHJldHVybiBhY3Rpb247XG4gIH1cbiAgLyoqXG4gICAqIFJlcGxhY2VzIHRoZSByZWR1Y2VyIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBzdG9yZSB0byBjYWxjdWxhdGUgdGhlIHN0YXRlLlxuICAgKlxuICAgKiBZb3UgbWlnaHQgbmVlZCB0aGlzIGlmIHlvdXIgYXBwIGltcGxlbWVudHMgY29kZSBzcGxpdHRpbmcgYW5kIHlvdSB3YW50IHRvXG4gICAqIGxvYWQgc29tZSBvZiB0aGUgcmVkdWNlcnMgZHluYW1pY2FsbHkuIFlvdSBtaWdodCBhbHNvIG5lZWQgdGhpcyBpZiB5b3VcbiAgICogaW1wbGVtZW50IGEgaG90IHJlbG9hZGluZyBtZWNoYW5pc20gZm9yIFJlZHV4LlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXh0UmVkdWNlciBUaGUgcmVkdWNlciBmb3IgdGhlIHN0b3JlIHRvIHVzZSBpbnN0ZWFkLlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG5cblxuICBmdW5jdGlvbiByZXBsYWNlUmVkdWNlcihuZXh0UmVkdWNlcikge1xuICAgIGlmICh0eXBlb2YgbmV4dFJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIG5leHRSZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgY3VycmVudFJlZHVjZXIgPSBuZXh0UmVkdWNlcjsgLy8gVGhpcyBhY3Rpb24gaGFzIGEgc2ltaWxpYXIgZWZmZWN0IHRvIEFjdGlvblR5cGVzLklOSVQuXG4gICAgLy8gQW55IHJlZHVjZXJzIHRoYXQgZXhpc3RlZCBpbiBib3RoIHRoZSBuZXcgYW5kIG9sZCByb290UmVkdWNlclxuICAgIC8vIHdpbGwgcmVjZWl2ZSB0aGUgcHJldmlvdXMgc3RhdGUuIFRoaXMgZWZmZWN0aXZlbHkgcG9wdWxhdGVzXG4gICAgLy8gdGhlIG5ldyBzdGF0ZSB0cmVlIHdpdGggYW55IHJlbGV2YW50IGRhdGEgZnJvbSB0aGUgb2xkIG9uZS5cblxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IEFjdGlvblR5cGVzLlJFUExBQ0VcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICogSW50ZXJvcGVyYWJpbGl0eSBwb2ludCBmb3Igb2JzZXJ2YWJsZS9yZWFjdGl2ZSBsaWJyYXJpZXMuXG4gICAqIEByZXR1cm5zIHtvYnNlcnZhYmxlfSBBIG1pbmltYWwgb2JzZXJ2YWJsZSBvZiBzdGF0ZSBjaGFuZ2VzLlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIHRoZSBvYnNlcnZhYmxlIHByb3Bvc2FsOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYnNlcnZhYmxlXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gb2JzZXJ2YWJsZSgpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHZhciBvdXRlclN1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICByZXR1cm4gX3JlZiA9IHtcbiAgICAgIC8qKlxuICAgICAgICogVGhlIG1pbmltYWwgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb24gbWV0aG9kLlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ic2VydmVyIEFueSBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyBhbiBvYnNlcnZlci5cbiAgICAgICAqIFRoZSBvYnNlcnZlciBvYmplY3Qgc2hvdWxkIGhhdmUgYSBgbmV4dGAgbWV0aG9kLlxuICAgICAgICogQHJldHVybnMge3N1YnNjcmlwdGlvbn0gQW4gb2JqZWN0IHdpdGggYW4gYHVuc3Vic2NyaWJlYCBtZXRob2QgdGhhdCBjYW5cbiAgICAgICAqIGJlIHVzZWQgdG8gdW5zdWJzY3JpYmUgdGhlIG9ic2VydmFibGUgZnJvbSB0aGUgc3RvcmUsIGFuZCBwcmV2ZW50IGZ1cnRoZXJcbiAgICAgICAqIGVtaXNzaW9uIG9mIHZhbHVlcyBmcm9tIHRoZSBvYnNlcnZhYmxlLlxuICAgICAgICovXG4gICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcikge1xuICAgICAgICBpZiAodHlwZW9mIG9ic2VydmVyICE9PSAnb2JqZWN0JyB8fCBvYnNlcnZlciA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBvYnNlcnZlciB0byBiZSBhbiBvYmplY3QuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvYnNlcnZlU3RhdGUoKSB7XG4gICAgICAgICAgaWYgKG9ic2VydmVyLm5leHQpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoZ2V0U3RhdGUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb2JzZXJ2ZVN0YXRlKCk7XG4gICAgICAgIHZhciB1bnN1YnNjcmliZSA9IG91dGVyU3Vic2NyaWJlKG9ic2VydmVTdGF0ZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdW5zdWJzY3JpYmU6IHVuc3Vic2NyaWJlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSwgX3JlZlskJG9ic2VydmFibGVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSwgX3JlZjtcbiAgfSAvLyBXaGVuIGEgc3RvcmUgaXMgY3JlYXRlZCwgYW4gXCJJTklUXCIgYWN0aW9uIGlzIGRpc3BhdGNoZWQgc28gdGhhdCBldmVyeVxuICAvLyByZWR1Y2VyIHJldHVybnMgdGhlaXIgaW5pdGlhbCBzdGF0ZS4gVGhpcyBlZmZlY3RpdmVseSBwb3B1bGF0ZXNcbiAgLy8gdGhlIGluaXRpYWwgc3RhdGUgdHJlZS5cblxuXG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5JTklUXG4gIH0pO1xuICByZXR1cm4gX3JlZjIgPSB7XG4gICAgZGlzcGF0Y2g6IGRpc3BhdGNoLFxuICAgIHN1YnNjcmliZTogc3Vic2NyaWJlLFxuICAgIGdldFN0YXRlOiBnZXRTdGF0ZSxcbiAgICByZXBsYWNlUmVkdWNlcjogcmVwbGFjZVJlZHVjZXJcbiAgfSwgX3JlZjJbJCRvYnNlcnZhYmxlXSA9IG9ic2VydmFibGUsIF9yZWYyO1xufVxuXG4vKipcbiAqIFByaW50cyBhIHdhcm5pbmcgaW4gdGhlIGNvbnNvbGUgaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSB3YXJuaW5nIG1lc3NhZ2UuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG5cblxuICB0cnkge1xuICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgaWYgeW91IGVuYWJsZVxuICAgIC8vIFwiYnJlYWsgb24gYWxsIGV4Y2VwdGlvbnNcIiBpbiB5b3VyIGNvbnNvbGUsXG4gICAgLy8gaXQgd291bGQgcGF1c2UgdGhlIGV4ZWN1dGlvbiBhdCB0aGlzIGxpbmUuXG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICB9IGNhdGNoIChlKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWVtcHR5XG5cbn1cblxuZnVuY3Rpb24gZ2V0VW5kZWZpbmVkU3RhdGVFcnJvck1lc3NhZ2Uoa2V5LCBhY3Rpb24pIHtcbiAgdmFyIGFjdGlvblR5cGUgPSBhY3Rpb24gJiYgYWN0aW9uLnR5cGU7XG4gIHZhciBhY3Rpb25EZXNjcmlwdGlvbiA9IGFjdGlvblR5cGUgJiYgXCJhY3Rpb24gXFxcIlwiICsgU3RyaW5nKGFjdGlvblR5cGUpICsgXCJcXFwiXCIgfHwgJ2FuIGFjdGlvbic7XG4gIHJldHVybiBcIkdpdmVuIFwiICsgYWN0aW9uRGVzY3JpcHRpb24gKyBcIiwgcmVkdWNlciBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgcmV0dXJuZWQgdW5kZWZpbmVkLiBcIiArIFwiVG8gaWdub3JlIGFuIGFjdGlvbiwgeW91IG11c3QgZXhwbGljaXRseSByZXR1cm4gdGhlIHByZXZpb3VzIHN0YXRlLiBcIiArIFwiSWYgeW91IHdhbnQgdGhpcyByZWR1Y2VyIHRvIGhvbGQgbm8gdmFsdWUsIHlvdSBjYW4gcmV0dXJuIG51bGwgaW5zdGVhZCBvZiB1bmRlZmluZWQuXCI7XG59XG5cbmZ1bmN0aW9uIGdldFVuZXhwZWN0ZWRTdGF0ZVNoYXBlV2FybmluZ01lc3NhZ2UoaW5wdXRTdGF0ZSwgcmVkdWNlcnMsIGFjdGlvbiwgdW5leHBlY3RlZEtleUNhY2hlKSB7XG4gIHZhciByZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKHJlZHVjZXJzKTtcbiAgdmFyIGFyZ3VtZW50TmFtZSA9IGFjdGlvbiAmJiBhY3Rpb24udHlwZSA9PT0gQWN0aW9uVHlwZXMuSU5JVCA/ICdwcmVsb2FkZWRTdGF0ZSBhcmd1bWVudCBwYXNzZWQgdG8gY3JlYXRlU3RvcmUnIDogJ3ByZXZpb3VzIHN0YXRlIHJlY2VpdmVkIGJ5IHRoZSByZWR1Y2VyJztcblxuICBpZiAocmVkdWNlcktleXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuICdTdG9yZSBkb2VzIG5vdCBoYXZlIGEgdmFsaWQgcmVkdWNlci4gTWFrZSBzdXJlIHRoZSBhcmd1bWVudCBwYXNzZWQgJyArICd0byBjb21iaW5lUmVkdWNlcnMgaXMgYW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgcmVkdWNlcnMuJztcbiAgfVxuXG4gIGlmICghaXNQbGFpbk9iamVjdChpbnB1dFN0YXRlKSkge1xuICAgIHJldHVybiBcIlRoZSBcIiArIGFyZ3VtZW50TmFtZSArIFwiIGhhcyB1bmV4cGVjdGVkIHR5cGUgb2YgXFxcIlwiICsge30udG9TdHJpbmcuY2FsbChpbnB1dFN0YXRlKS5tYXRjaCgvXFxzKFthLXp8QS1aXSspLylbMV0gKyBcIlxcXCIuIEV4cGVjdGVkIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgXCIgKyAoXCJrZXlzOiBcXFwiXCIgKyByZWR1Y2VyS2V5cy5qb2luKCdcIiwgXCInKSArIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHZhciB1bmV4cGVjdGVkS2V5cyA9IE9iamVjdC5rZXlzKGlucHV0U3RhdGUpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuICFyZWR1Y2Vycy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmICF1bmV4cGVjdGVkS2V5Q2FjaGVba2V5XTtcbiAgfSk7XG4gIHVuZXhwZWN0ZWRLZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHVuZXhwZWN0ZWRLZXlDYWNoZVtrZXldID0gdHJ1ZTtcbiAgfSk7XG4gIGlmIChhY3Rpb24gJiYgYWN0aW9uLnR5cGUgPT09IEFjdGlvblR5cGVzLlJFUExBQ0UpIHJldHVybjtcblxuICBpZiAodW5leHBlY3RlZEtleXMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBcIlVuZXhwZWN0ZWQgXCIgKyAodW5leHBlY3RlZEtleXMubGVuZ3RoID4gMSA/ICdrZXlzJyA6ICdrZXknKSArIFwiIFwiICsgKFwiXFxcIlwiICsgdW5leHBlY3RlZEtleXMuam9pbignXCIsIFwiJykgKyBcIlxcXCIgZm91bmQgaW4gXCIgKyBhcmd1bWVudE5hbWUgKyBcIi4gXCIpICsgXCJFeHBlY3RlZCB0byBmaW5kIG9uZSBvZiB0aGUga25vd24gcmVkdWNlciBrZXlzIGluc3RlYWQ6IFwiICsgKFwiXFxcIlwiICsgcmVkdWNlcktleXMuam9pbignXCIsIFwiJykgKyBcIlxcXCIuIFVuZXhwZWN0ZWQga2V5cyB3aWxsIGJlIGlnbm9yZWQuXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydFJlZHVjZXJTaGFwZShyZWR1Y2Vycykge1xuICBPYmplY3Qua2V5cyhyZWR1Y2VycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIHJlZHVjZXIgPSByZWR1Y2Vyc1trZXldO1xuICAgIHZhciBpbml0aWFsU3RhdGUgPSByZWR1Y2VyKHVuZGVmaW5lZCwge1xuICAgICAgdHlwZTogQWN0aW9uVHlwZXMuSU5JVFxuICAgIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBpbml0aWFsU3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZWR1Y2VyIFxcXCJcIiArIGtleSArIFwiXFxcIiByZXR1cm5lZCB1bmRlZmluZWQgZHVyaW5nIGluaXRpYWxpemF0aW9uLiBcIiArIFwiSWYgdGhlIHN0YXRlIHBhc3NlZCB0byB0aGUgcmVkdWNlciBpcyB1bmRlZmluZWQsIHlvdSBtdXN0IFwiICsgXCJleHBsaWNpdGx5IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZS4gVGhlIGluaXRpYWwgc3RhdGUgbWF5IFwiICsgXCJub3QgYmUgdW5kZWZpbmVkLiBJZiB5b3UgZG9uJ3Qgd2FudCB0byBzZXQgYSB2YWx1ZSBmb3IgdGhpcyByZWR1Y2VyLCBcIiArIFwieW91IGNhbiB1c2UgbnVsbCBpbnN0ZWFkIG9mIHVuZGVmaW5lZC5cIik7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiByZWR1Y2VyKHVuZGVmaW5lZCwge1xuICAgICAgdHlwZTogQWN0aW9uVHlwZXMuUFJPQkVfVU5LTk9XTl9BQ1RJT04oKVxuICAgIH0pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVkdWNlciBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgcmV0dXJuZWQgdW5kZWZpbmVkIHdoZW4gcHJvYmVkIHdpdGggYSByYW5kb20gdHlwZS4gXCIgKyAoXCJEb24ndCB0cnkgdG8gaGFuZGxlIFwiICsgQWN0aW9uVHlwZXMuSU5JVCArIFwiIG9yIG90aGVyIGFjdGlvbnMgaW4gXFxcInJlZHV4LypcXFwiIFwiKSArIFwibmFtZXNwYWNlLiBUaGV5IGFyZSBjb25zaWRlcmVkIHByaXZhdGUuIEluc3RlYWQsIHlvdSBtdXN0IHJldHVybiB0aGUgXCIgKyBcImN1cnJlbnQgc3RhdGUgZm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHVubGVzcyBpdCBpcyB1bmRlZmluZWQsIFwiICsgXCJpbiB3aGljaCBjYXNlIHlvdSBtdXN0IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZSwgcmVnYXJkbGVzcyBvZiB0aGUgXCIgKyBcImFjdGlvbiB0eXBlLiBUaGUgaW5pdGlhbCBzdGF0ZSBtYXkgbm90IGJlIHVuZGVmaW5lZCwgYnV0IGNhbiBiZSBudWxsLlwiKTtcbiAgICB9XG4gIH0pO1xufVxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBkaWZmZXJlbnQgcmVkdWNlciBmdW5jdGlvbnMsIGludG8gYSBzaW5nbGVcbiAqIHJlZHVjZXIgZnVuY3Rpb24uIEl0IHdpbGwgY2FsbCBldmVyeSBjaGlsZCByZWR1Y2VyLCBhbmQgZ2F0aGVyIHRoZWlyIHJlc3VsdHNcbiAqIGludG8gYSBzaW5nbGUgc3RhdGUgb2JqZWN0LCB3aG9zZSBrZXlzIGNvcnJlc3BvbmQgdG8gdGhlIGtleXMgb2YgdGhlIHBhc3NlZFxuICogcmVkdWNlciBmdW5jdGlvbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJlZHVjZXJzIEFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgY29ycmVzcG9uZCB0byBkaWZmZXJlbnRcbiAqIHJlZHVjZXIgZnVuY3Rpb25zIHRoYXQgbmVlZCB0byBiZSBjb21iaW5lZCBpbnRvIG9uZS4gT25lIGhhbmR5IHdheSB0byBvYnRhaW5cbiAqIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzIHJlZHVjZXJzYCBzeW50YXguIFRoZSByZWR1Y2VycyBtYXkgbmV2ZXIgcmV0dXJuXG4gKiB1bmRlZmluZWQgZm9yIGFueSBhY3Rpb24uIEluc3RlYWQsIHRoZXkgc2hvdWxkIHJldHVybiB0aGVpciBpbml0aWFsIHN0YXRlXG4gKiBpZiB0aGUgc3RhdGUgcGFzc2VkIHRvIHRoZW0gd2FzIHVuZGVmaW5lZCwgYW5kIHRoZSBjdXJyZW50IHN0YXRlIGZvciBhbnlcbiAqIHVucmVjb2duaXplZCBhY3Rpb24uXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHJlZHVjZXIgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGV2ZXJ5IHJlZHVjZXIgaW5zaWRlIHRoZVxuICogcGFzc2VkIG9iamVjdCwgYW5kIGJ1aWxkcyBhIHN0YXRlIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlLlxuICovXG5cblxuZnVuY3Rpb24gY29tYmluZVJlZHVjZXJzKHJlZHVjZXJzKSB7XG4gIHZhciByZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKHJlZHVjZXJzKTtcbiAgdmFyIGZpbmFsUmVkdWNlcnMgPSB7fTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZHVjZXJLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IHJlZHVjZXJLZXlzW2ldO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2FybmluZyhcIk5vIHJlZHVjZXIgcHJvdmlkZWQgZm9yIGtleSBcXFwiXCIgKyBrZXkgKyBcIlxcXCJcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiByZWR1Y2Vyc1trZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBmaW5hbFJlZHVjZXJzW2tleV0gPSByZWR1Y2Vyc1trZXldO1xuICAgIH1cbiAgfVxuXG4gIHZhciBmaW5hbFJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMoZmluYWxSZWR1Y2Vycyk7IC8vIFRoaXMgaXMgdXNlZCB0byBtYWtlIHN1cmUgd2UgZG9uJ3Qgd2FybiBhYm91dCB0aGUgc2FtZVxuICAvLyBrZXlzIG11bHRpcGxlIHRpbWVzLlxuXG4gIHZhciB1bmV4cGVjdGVkS2V5Q2FjaGU7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB1bmV4cGVjdGVkS2V5Q2FjaGUgPSB7fTtcbiAgfVxuXG4gIHZhciBzaGFwZUFzc2VydGlvbkVycm9yO1xuXG4gIHRyeSB7XG4gICAgYXNzZXJ0UmVkdWNlclNoYXBlKGZpbmFsUmVkdWNlcnMpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgc2hhcGVBc3NlcnRpb25FcnJvciA9IGU7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gY29tYmluYXRpb24oc3RhdGUsIGFjdGlvbikge1xuICAgIGlmIChzdGF0ZSA9PT0gdm9pZCAwKSB7XG4gICAgICBzdGF0ZSA9IHt9O1xuICAgIH1cblxuICAgIGlmIChzaGFwZUFzc2VydGlvbkVycm9yKSB7XG4gICAgICB0aHJvdyBzaGFwZUFzc2VydGlvbkVycm9yO1xuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgd2FybmluZ01lc3NhZ2UgPSBnZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlKHN0YXRlLCBmaW5hbFJlZHVjZXJzLCBhY3Rpb24sIHVuZXhwZWN0ZWRLZXlDYWNoZSk7XG5cbiAgICAgIGlmICh3YXJuaW5nTWVzc2FnZSkge1xuICAgICAgICB3YXJuaW5nKHdhcm5pbmdNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgaGFzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIHZhciBuZXh0U3RhdGUgPSB7fTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBmaW5hbFJlZHVjZXJLZXlzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9rZXkgPSBmaW5hbFJlZHVjZXJLZXlzW19pXTtcbiAgICAgIHZhciByZWR1Y2VyID0gZmluYWxSZWR1Y2Vyc1tfa2V5XTtcbiAgICAgIHZhciBwcmV2aW91c1N0YXRlRm9yS2V5ID0gc3RhdGVbX2tleV07XG4gICAgICB2YXIgbmV4dFN0YXRlRm9yS2V5ID0gcmVkdWNlcihwcmV2aW91c1N0YXRlRm9yS2V5LCBhY3Rpb24pO1xuXG4gICAgICBpZiAodHlwZW9mIG5leHRTdGF0ZUZvcktleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IGdldFVuZGVmaW5lZFN0YXRlRXJyb3JNZXNzYWdlKF9rZXksIGFjdGlvbik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgfVxuXG4gICAgICBuZXh0U3RhdGVbX2tleV0gPSBuZXh0U3RhdGVGb3JLZXk7XG4gICAgICBoYXNDaGFuZ2VkID0gaGFzQ2hhbmdlZCB8fCBuZXh0U3RhdGVGb3JLZXkgIT09IHByZXZpb3VzU3RhdGVGb3JLZXk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhhc0NoYW5nZWQgPyBuZXh0U3RhdGUgOiBzdGF0ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvciwgZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2goYWN0aW9uQ3JlYXRvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cbi8qKlxuICogVHVybnMgYW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgYWN0aW9uIGNyZWF0b3JzLCBpbnRvIGFuIG9iamVjdCB3aXRoIHRoZVxuICogc2FtZSBrZXlzLCBidXQgd2l0aCBldmVyeSBmdW5jdGlvbiB3cmFwcGVkIGludG8gYSBgZGlzcGF0Y2hgIGNhbGwgc28gdGhleVxuICogbWF5IGJlIGludm9rZWQgZGlyZWN0bHkuIFRoaXMgaXMganVzdCBhIGNvbnZlbmllbmNlIG1ldGhvZCwgYXMgeW91IGNhbiBjYWxsXG4gKiBgc3RvcmUuZGlzcGF0Y2goTXlBY3Rpb25DcmVhdG9ycy5kb1NvbWV0aGluZygpKWAgeW91cnNlbGYganVzdCBmaW5lLlxuICpcbiAqIEZvciBjb252ZW5pZW5jZSwgeW91IGNhbiBhbHNvIHBhc3MgYW4gYWN0aW9uIGNyZWF0b3IgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LFxuICogYW5kIGdldCBhIGRpc3BhdGNoIHdyYXBwZWQgZnVuY3Rpb24gaW4gcmV0dXJuLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fSBhY3Rpb25DcmVhdG9ycyBBbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb25cbiAqIGNyZWF0b3IgZnVuY3Rpb25zLiBPbmUgaGFuZHkgd2F5IHRvIG9idGFpbiBpdCBpcyB0byB1c2UgRVM2IGBpbXBvcnQgKiBhc2BcbiAqIHN5bnRheC4gWW91IG1heSBhbHNvIHBhc3MgYSBzaW5nbGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZGlzcGF0Y2ggVGhlIGBkaXNwYXRjaGAgZnVuY3Rpb24gYXZhaWxhYmxlIG9uIHlvdXIgUmVkdXhcbiAqIHN0b3JlLlxuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbnxPYmplY3R9IFRoZSBvYmplY3QgbWltaWNraW5nIHRoZSBvcmlnaW5hbCBvYmplY3QsIGJ1dCB3aXRoXG4gKiBldmVyeSBhY3Rpb24gY3JlYXRvciB3cmFwcGVkIGludG8gdGhlIGBkaXNwYXRjaGAgY2FsbC4gSWYgeW91IHBhc3NlZCBhXG4gKiBmdW5jdGlvbiBhcyBgYWN0aW9uQ3JlYXRvcnNgLCB0aGUgcmV0dXJuIHZhbHVlIHdpbGwgYWxzbyBiZSBhIHNpbmdsZVxuICogZnVuY3Rpb24uXG4gKi9cblxuXG5mdW5jdGlvbiBiaW5kQWN0aW9uQ3JlYXRvcnMoYWN0aW9uQ3JlYXRvcnMsIGRpc3BhdGNoKSB7XG4gIGlmICh0eXBlb2YgYWN0aW9uQ3JlYXRvcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvcnMsIGRpc3BhdGNoKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYWN0aW9uQ3JlYXRvcnMgIT09ICdvYmplY3QnIHx8IGFjdGlvbkNyZWF0b3JzID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiYmluZEFjdGlvbkNyZWF0b3JzIGV4cGVjdGVkIGFuIG9iamVjdCBvciBhIGZ1bmN0aW9uLCBpbnN0ZWFkIHJlY2VpdmVkIFwiICsgKGFjdGlvbkNyZWF0b3JzID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIGFjdGlvbkNyZWF0b3JzKSArIFwiLiBcIiArIFwiRGlkIHlvdSB3cml0ZSBcXFwiaW1wb3J0IEFjdGlvbkNyZWF0b3JzIGZyb21cXFwiIGluc3RlYWQgb2YgXFxcImltcG9ydCAqIGFzIEFjdGlvbkNyZWF0b3JzIGZyb21cXFwiP1wiKTtcbiAgfVxuXG4gIHZhciBib3VuZEFjdGlvbkNyZWF0b3JzID0ge307XG5cbiAgZm9yICh2YXIga2V5IGluIGFjdGlvbkNyZWF0b3JzKSB7XG4gICAgdmFyIGFjdGlvbkNyZWF0b3IgPSBhY3Rpb25DcmVhdG9yc1trZXldO1xuXG4gICAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBib3VuZEFjdGlvbkNyZWF0b3JzW2tleV0gPSBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9yLCBkaXNwYXRjaCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJvdW5kQWN0aW9uQ3JlYXRvcnM7XG59XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xuXG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAga2V5cy5wdXNoLmFwcGx5KGtleXMsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KSk7XG4gIH1cblxuICBpZiAoZW51bWVyYWJsZU9ubHkpIGtleXMgPSBrZXlzLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7XG4gIH0pO1xuICByZXR1cm4ga2V5cztcbn1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZDIodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307XG5cbiAgICBpZiAoaSAlIDIpIHtcbiAgICAgIG93bktleXMoc291cmNlLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvd25LZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuLyoqXG4gKiBDb21wb3NlcyBzaW5nbGUtYXJndW1lbnQgZnVuY3Rpb25zIGZyb20gcmlnaHQgdG8gbGVmdC4gVGhlIHJpZ2h0bW9zdFxuICogZnVuY3Rpb24gY2FuIHRha2UgbXVsdGlwbGUgYXJndW1lbnRzIGFzIGl0IHByb3ZpZGVzIHRoZSBzaWduYXR1cmUgZm9yXG4gKiB0aGUgcmVzdWx0aW5nIGNvbXBvc2l0ZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBmdW5jcyBUaGUgZnVuY3Rpb25zIHRvIGNvbXBvc2UuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gb2J0YWluZWQgYnkgY29tcG9zaW5nIHRoZSBhcmd1bWVudCBmdW5jdGlvbnNcbiAqIGZyb20gcmlnaHQgdG8gbGVmdC4gRm9yIGV4YW1wbGUsIGNvbXBvc2UoZiwgZywgaCkgaXMgaWRlbnRpY2FsIHRvIGRvaW5nXG4gKiAoLi4uYXJncykgPT4gZihnKGgoLi4uYXJncykpKS5cbiAqL1xuZnVuY3Rpb24gY29tcG9zZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGZ1bmNzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGZ1bmNzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICByZXR1cm4gYXJnO1xuICAgIH07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZ1bmNzWzBdO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmNzLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYShiLmFwcGx5KHZvaWQgMCwgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0b3JlIGVuaGFuY2VyIHRoYXQgYXBwbGllcyBtaWRkbGV3YXJlIHRvIHRoZSBkaXNwYXRjaCBtZXRob2RcbiAqIG9mIHRoZSBSZWR1eCBzdG9yZS4gVGhpcyBpcyBoYW5keSBmb3IgYSB2YXJpZXR5IG9mIHRhc2tzLCBzdWNoIGFzIGV4cHJlc3NpbmdcbiAqIGFzeW5jaHJvbm91cyBhY3Rpb25zIGluIGEgY29uY2lzZSBtYW5uZXIsIG9yIGxvZ2dpbmcgZXZlcnkgYWN0aW9uIHBheWxvYWQuXG4gKlxuICogU2VlIGByZWR1eC10aHVua2AgcGFja2FnZSBhcyBhbiBleGFtcGxlIG9mIHRoZSBSZWR1eCBtaWRkbGV3YXJlLlxuICpcbiAqIEJlY2F1c2UgbWlkZGxld2FyZSBpcyBwb3RlbnRpYWxseSBhc3luY2hyb25vdXMsIHRoaXMgc2hvdWxkIGJlIHRoZSBmaXJzdFxuICogc3RvcmUgZW5oYW5jZXIgaW4gdGhlIGNvbXBvc2l0aW9uIGNoYWluLlxuICpcbiAqIE5vdGUgdGhhdCBlYWNoIG1pZGRsZXdhcmUgd2lsbCBiZSBnaXZlbiB0aGUgYGRpc3BhdGNoYCBhbmQgYGdldFN0YXRlYCBmdW5jdGlvbnNcbiAqIGFzIG5hbWVkIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBtaWRkbGV3YXJlcyBUaGUgbWlkZGxld2FyZSBjaGFpbiB0byBiZSBhcHBsaWVkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHN0b3JlIGVuaGFuY2VyIGFwcGx5aW5nIHRoZSBtaWRkbGV3YXJlLlxuICovXG5cbmZ1bmN0aW9uIGFwcGx5TWlkZGxld2FyZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIG1pZGRsZXdhcmVzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIG1pZGRsZXdhcmVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChjcmVhdGVTdG9yZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3RvcmUgPSBjcmVhdGVTdG9yZS5hcHBseSh2b2lkIDAsIGFyZ3VtZW50cyk7XG5cbiAgICAgIHZhciBfZGlzcGF0Y2ggPSBmdW5jdGlvbiBkaXNwYXRjaCgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEaXNwYXRjaGluZyB3aGlsZSBjb25zdHJ1Y3RpbmcgeW91ciBtaWRkbGV3YXJlIGlzIG5vdCBhbGxvd2VkLiAnICsgJ090aGVyIG1pZGRsZXdhcmUgd291bGQgbm90IGJlIGFwcGxpZWQgdG8gdGhpcyBkaXNwYXRjaC4nKTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBtaWRkbGV3YXJlQVBJID0ge1xuICAgICAgICBnZXRTdGF0ZTogc3RvcmUuZ2V0U3RhdGUsXG4gICAgICAgIGRpc3BhdGNoOiBmdW5jdGlvbiBkaXNwYXRjaCgpIHtcbiAgICAgICAgICByZXR1cm4gX2Rpc3BhdGNoLmFwcGx5KHZvaWQgMCwgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHZhciBjaGFpbiA9IG1pZGRsZXdhcmVzLm1hcChmdW5jdGlvbiAobWlkZGxld2FyZSkge1xuICAgICAgICByZXR1cm4gbWlkZGxld2FyZShtaWRkbGV3YXJlQVBJKTtcbiAgICAgIH0pO1xuICAgICAgX2Rpc3BhdGNoID0gY29tcG9zZS5hcHBseSh2b2lkIDAsIGNoYWluKShzdG9yZS5kaXNwYXRjaCk7XG4gICAgICByZXR1cm4gX29iamVjdFNwcmVhZDIoe30sIHN0b3JlLCB7XG4gICAgICAgIGRpc3BhdGNoOiBfZGlzcGF0Y2hcbiAgICAgIH0pO1xuICAgIH07XG4gIH07XG59XG5cbi8qXG4gKiBUaGlzIGlzIGEgZHVtbXkgZnVuY3Rpb24gdG8gY2hlY2sgaWYgdGhlIGZ1bmN0aW9uIG5hbWUgaGFzIGJlZW4gYWx0ZXJlZCBieSBtaW5pZmljYXRpb24uXG4gKiBJZiB0aGUgZnVuY3Rpb24gaGFzIGJlZW4gbWluaWZpZWQgYW5kIE5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsIHdhcm4gdGhlIHVzZXIuXG4gKi9cblxuZnVuY3Rpb24gaXNDcnVzaGVkKCkge31cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGlzQ3J1c2hlZC5uYW1lID09PSAnc3RyaW5nJyAmJiBpc0NydXNoZWQubmFtZSAhPT0gJ2lzQ3J1c2hlZCcpIHtcbiAgd2FybmluZygnWW91IGFyZSBjdXJyZW50bHkgdXNpbmcgbWluaWZpZWQgY29kZSBvdXRzaWRlIG9mIE5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIi4gJyArICdUaGlzIG1lYW5zIHRoYXQgeW91IGFyZSBydW5uaW5nIGEgc2xvd2VyIGRldmVsb3BtZW50IGJ1aWxkIG9mIFJlZHV4LiAnICsgJ1lvdSBjYW4gdXNlIGxvb3NlLWVudmlmeSAoaHR0cHM6Ly9naXRodWIuY29tL3plcnRvc2gvbG9vc2UtZW52aWZ5KSBmb3IgYnJvd3NlcmlmeSAnICsgJ29yIHNldHRpbmcgbW9kZSB0byBwcm9kdWN0aW9uIGluIHdlYnBhY2sgKGh0dHBzOi8vd2VicGFjay5qcy5vcmcvY29uY2VwdHMvbW9kZS8pICcgKyAndG8gZW5zdXJlIHlvdSBoYXZlIHRoZSBjb3JyZWN0IGNvZGUgZm9yIHlvdXIgcHJvZHVjdGlvbiBidWlsZC4nKTtcbn1cblxuZXhwb3J0IHsgQWN0aW9uVHlwZXMgYXMgX19ET19OT1RfVVNFX19BY3Rpb25UeXBlcywgYXBwbHlNaWRkbGV3YXJlLCBiaW5kQWN0aW9uQ3JlYXRvcnMsIGNvbWJpbmVSZWR1Y2VycywgY29tcG9zZSwgY3JlYXRlU3RvcmUgfTtcbiIsIihmdW5jdGlvbigpIHtcbiAgdmFyIGNyeXB0ID0gcmVxdWlyZSgnY3J5cHQnKSxcbiAgICAgIHV0ZjggPSByZXF1aXJlKCdjaGFyZW5jJykudXRmOCxcbiAgICAgIGJpbiA9IHJlcXVpcmUoJ2NoYXJlbmMnKS5iaW4sXG5cbiAgLy8gVGhlIGNvcmVcbiAgc2hhMSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgLy8gQ29udmVydCB0byBieXRlIGFycmF5XG4gICAgaWYgKG1lc3NhZ2UuY29uc3RydWN0b3IgPT0gU3RyaW5nKVxuICAgICAgbWVzc2FnZSA9IHV0Zjguc3RyaW5nVG9CeXRlcyhtZXNzYWdlKTtcbiAgICBlbHNlIGlmICh0eXBlb2YgQnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgQnVmZmVyLmlzQnVmZmVyID09ICdmdW5jdGlvbicgJiYgQnVmZmVyLmlzQnVmZmVyKG1lc3NhZ2UpKVxuICAgICAgbWVzc2FnZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG1lc3NhZ2UsIDApO1xuICAgIGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KG1lc3NhZ2UpKVxuICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UudG9TdHJpbmcoKTtcblxuICAgIC8vIG90aGVyd2lzZSBhc3N1bWUgYnl0ZSBhcnJheVxuXG4gICAgdmFyIG0gID0gY3J5cHQuYnl0ZXNUb1dvcmRzKG1lc3NhZ2UpLFxuICAgICAgICBsICA9IG1lc3NhZ2UubGVuZ3RoICogOCxcbiAgICAgICAgdyAgPSBbXSxcbiAgICAgICAgSDAgPSAgMTczMjU4NDE5MyxcbiAgICAgICAgSDEgPSAtMjcxNzMzODc5LFxuICAgICAgICBIMiA9IC0xNzMyNTg0MTk0LFxuICAgICAgICBIMyA9ICAyNzE3MzM4NzgsXG4gICAgICAgIEg0ID0gLTEwMDk1ODk3NzY7XG5cbiAgICAvLyBQYWRkaW5nXG4gICAgbVtsID4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbCAlIDMyKTtcbiAgICBtWygobCArIDY0ID4+PiA5KSA8PCA0KSArIDE1XSA9IGw7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0ubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgICB2YXIgYSA9IEgwLFxuICAgICAgICAgIGIgPSBIMSxcbiAgICAgICAgICBjID0gSDIsXG4gICAgICAgICAgZCA9IEgzLFxuICAgICAgICAgIGUgPSBINDtcblxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA4MDsgaisrKSB7XG5cbiAgICAgICAgaWYgKGogPCAxNilcbiAgICAgICAgICB3W2pdID0gbVtpICsgal07XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHZhciBuID0gd1tqIC0gM10gXiB3W2ogLSA4XSBeIHdbaiAtIDE0XSBeIHdbaiAtIDE2XTtcbiAgICAgICAgICB3W2pdID0gKG4gPDwgMSkgfCAobiA+Pj4gMzEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHQgPSAoKEgwIDw8IDUpIHwgKEgwID4+PiAyNykpICsgSDQgKyAod1tqXSA+Pj4gMCkgKyAoXG4gICAgICAgICAgICAgICAgaiA8IDIwID8gKEgxICYgSDIgfCB+SDEgJiBIMykgKyAxNTE4NTAwMjQ5IDpcbiAgICAgICAgICAgICAgICBqIDwgNDAgPyAoSDEgXiBIMiBeIEgzKSArIDE4NTk3NzUzOTMgOlxuICAgICAgICAgICAgICAgIGogPCA2MCA/IChIMSAmIEgyIHwgSDEgJiBIMyB8IEgyICYgSDMpIC0gMTg5NDAwNzU4OCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgKEgxIF4gSDIgXiBIMykgLSA4OTk0OTc1MTQpO1xuXG4gICAgICAgIEg0ID0gSDM7XG4gICAgICAgIEgzID0gSDI7XG4gICAgICAgIEgyID0gKEgxIDw8IDMwKSB8IChIMSA+Pj4gMik7XG4gICAgICAgIEgxID0gSDA7XG4gICAgICAgIEgwID0gdDtcbiAgICAgIH1cblxuICAgICAgSDAgKz0gYTtcbiAgICAgIEgxICs9IGI7XG4gICAgICBIMiArPSBjO1xuICAgICAgSDMgKz0gZDtcbiAgICAgIEg0ICs9IGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtIMCwgSDEsIEgyLCBIMywgSDRdO1xuICB9LFxuXG4gIC8vIFB1YmxpYyBBUElcbiAgYXBpID0gZnVuY3Rpb24gKG1lc3NhZ2UsIG9wdGlvbnMpIHtcbiAgICB2YXIgZGlnZXN0Ynl0ZXMgPSBjcnlwdC53b3Jkc1RvQnl0ZXMoc2hhMShtZXNzYWdlKSk7XG4gICAgcmV0dXJuIG9wdGlvbnMgJiYgb3B0aW9ucy5hc0J5dGVzID8gZGlnZXN0Ynl0ZXMgOlxuICAgICAgICBvcHRpb25zICYmIG9wdGlvbnMuYXNTdHJpbmcgPyBiaW4uYnl0ZXNUb1N0cmluZyhkaWdlc3RieXRlcykgOlxuICAgICAgICBjcnlwdC5ieXRlc1RvSGV4KGRpZ2VzdGJ5dGVzKTtcbiAgfTtcblxuICBhcGkuX2Jsb2Nrc2l6ZSA9IDE2O1xuICBhcGkuX2RpZ2VzdHNpemUgPSAyMDtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGFwaTtcbn0pKCk7XG4iLCIvKiBnbG9iYWwgd2luZG93ICovXG5pbXBvcnQgcG9ueWZpbGwgZnJvbSAnLi9wb255ZmlsbC5qcyc7XG5cbnZhciByb290O1xuXG5pZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBzZWxmO1xufSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gbW9kdWxlO1xufSBlbHNlIHtcbiAgcm9vdCA9IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG59XG5cbnZhciByZXN1bHQgPSBwb255ZmlsbChyb290KTtcbmV4cG9ydCBkZWZhdWx0IHJlc3VsdDtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN5bWJvbE9ic2VydmFibGVQb255ZmlsbChyb290KSB7XG5cdHZhciByZXN1bHQ7XG5cdHZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuXHRpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGlmIChTeW1ib2wub2JzZXJ2YWJsZSkge1xuXHRcdFx0cmVzdWx0ID0gU3ltYm9sLm9ic2VydmFibGU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdCA9IFN5bWJvbCgnb2JzZXJ2YWJsZScpO1xuXHRcdFx0U3ltYm9sLm9ic2VydmFibGUgPSByZXN1bHQ7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHJlc3VsdCA9ICdAQG9ic2VydmFibGUnO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxuLyoqXG4gKiBTaW1wbGUgbWlkZGxld2FyZSBpbnRlcmNlcHRzIGFjdGlvbnMgYW5kIHJlcGxhY2VzIHdpdGhcbiAqIGFub3RoZXIgYnkgY2FsbGluZyBhbiBhbGlhcyBmdW5jdGlvbiB3aXRoIHRoZSBvcmlnaW5hbCBhY3Rpb25cbiAqIEB0eXBlIHtvYmplY3R9IGFsaWFzZXMgYW4gb2JqZWN0IHRoYXQgbWFwcyBhY3Rpb24gdHlwZXMgKGtleXMpIHRvIGFsaWFzIGZ1bmN0aW9ucyAodmFsdWVzKSAoZS5nLiB7IFNPTUVfQUNUSU9OOiBuZXdBY3Rpb25BbGlhc0Z1bmMgfSlcbiAqL1xudmFyIF9kZWZhdWx0ID0gZnVuY3Rpb24gX2RlZmF1bHQoYWxpYXNlcykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgdmFyIGFsaWFzID0gYWxpYXNlc1thY3Rpb24udHlwZV07XG5cbiAgICAgICAgaWYgKGFsaWFzKSB7XG4gICAgICAgICAgcmV0dXJuIG5leHQoYWxpYXMoYWN0aW9uKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dChhY3Rpb24pO1xuICAgICAgfTtcbiAgICB9O1xuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkRFRkFVTFRfUE9SVF9OQU1FID0gZXhwb3J0cy5QQVRDSF9TVEFURV9UWVBFID0gZXhwb3J0cy5TVEFURV9UWVBFID0gZXhwb3J0cy5ESVNQQVRDSF9UWVBFID0gdm9pZCAwO1xuLy8gTWVzc2FnZSB0eXBlIHVzZWQgZm9yIGRpc3BhdGNoIGV2ZW50c1xuLy8gZnJvbSB0aGUgUHJveHkgU3RvcmVzIHRvIGJhY2tncm91bmRcbnZhciBESVNQQVRDSF9UWVBFID0gJ2Nocm9tZXguZGlzcGF0Y2gnOyAvLyBNZXNzYWdlIHR5cGUgZm9yIHN0YXRlIHVwZGF0ZSBldmVudHMgZnJvbVxuLy8gYmFja2dyb3VuZCB0byBQcm94eSBTdG9yZXNcblxuZXhwb3J0cy5ESVNQQVRDSF9UWVBFID0gRElTUEFUQ0hfVFlQRTtcbnZhciBTVEFURV9UWVBFID0gJ2Nocm9tZXguc3RhdGUnOyAvLyBNZXNzYWdlIHR5cGUgZm9yIHN0YXRlIHBhdGNoIGV2ZW50cyBmcm9tXG4vLyBiYWNrZ3JvdW5kIHRvIFByb3h5IFN0b3Jlc1xuXG5leHBvcnRzLlNUQVRFX1RZUEUgPSBTVEFURV9UWVBFO1xudmFyIFBBVENIX1NUQVRFX1RZUEUgPSAnY2hyb21leC5wYXRjaF9zdGF0ZSc7IC8vIFRoZSBkZWZhdWx0IG5hbWUgZm9yIHRoZSBwb3J0IGNvbW11bmljYXRpb24gdmlhXG4vLyByZWFjdC1jaHJvbWUtcmVkdXhcblxuZXhwb3J0cy5QQVRDSF9TVEFURV9UWVBFID0gUEFUQ0hfU1RBVEVfVFlQRTtcbnZhciBERUZBVUxUX1BPUlRfTkFNRSA9IFwiY2hyb21leC5wb3J0X25hbWVcIjtcbmV4cG9ydHMuREVGQVVMVF9QT1JUX05BTUUgPSBERUZBVUxUX1BPUlRfTkFNRTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlN0b3JlXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9TdG9yZS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImFwcGx5TWlkZGxld2FyZVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfYXBwbHlNaWRkbGV3YXJlLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwid3JhcFN0b3JlXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF93cmFwU3RvcmUuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJhbGlhc1wiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfYWxpYXMuZGVmYXVsdDtcbiAgfVxufSk7XG5cbnZhciBfU3RvcmUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3N0b3JlL1N0b3JlXCIpKTtcblxudmFyIF9hcHBseU1pZGRsZXdhcmUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3N0b3JlL2FwcGx5TWlkZGxld2FyZVwiKSk7XG5cbnZhciBfd3JhcFN0b3JlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi93cmFwLXN0b3JlL3dyYXBTdG9yZVwiKSk7XG5cbnZhciBfYWxpYXMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2FsaWFzL2FsaWFzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMud2l0aFNlcmlhbGl6ZXIgPSBleHBvcnRzLndpdGhEZXNlcmlhbGl6ZXIgPSBleHBvcnRzLm5vb3AgPSB2b2lkIDA7XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9OyB2YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7IGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykgeyBvd25LZXlzID0gb3duS2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlOyB9KSk7IH0gb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIG5vb3AgPSBmdW5jdGlvbiBub29wKHBheWxvYWQpIHtcbiAgcmV0dXJuIHBheWxvYWQ7XG59O1xuXG5leHBvcnRzLm5vb3AgPSBub29wO1xuXG52YXIgdHJhbnNmb3JtUGF5bG9hZCA9IGZ1bmN0aW9uIHRyYW5zZm9ybVBheWxvYWQobWVzc2FnZSkge1xuICB2YXIgdHJhbnNmb3JtZXIgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IG5vb3A7XG4gIHJldHVybiBfb2JqZWN0U3ByZWFkKHt9LCBtZXNzYWdlLCBtZXNzYWdlLnBheWxvYWQgPyB7XG4gICAgcGF5bG9hZDogdHJhbnNmb3JtZXIobWVzc2FnZS5wYXlsb2FkKVxuICB9IDoge30pO1xufTtcblxudmFyIGRlc2VyaWFsaXplTGlzdGVuZXIgPSBmdW5jdGlvbiBkZXNlcmlhbGl6ZUxpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIHZhciBkZXNlcmlhbGl6ZXIgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IG5vb3A7XG4gIHZhciBzaG91bGREZXNlcmlhbGl6ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkO1xuXG4gIC8vIElmIGEgc2hvdWxkRGVzZXJpYWxpemUgZnVuY3Rpb24gaXMgcGFzc2VkLCByZXR1cm4gYSBmdW5jdGlvbiB0aGF0IHVzZXMgaXRcbiAgLy8gdG8gY2hlY2sgaWYgYW55IGdpdmVuIG1lc3NhZ2UgcGF5bG9hZCBzaG91bGQgYmUgZGVzZXJpYWxpemVkXG4gIGlmIChzaG91bGREZXNlcmlhbGl6ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNob3VsZERlc2VyaWFsaXplLmFwcGx5KHZvaWQgMCwgW21lc3NhZ2VdLmNvbmNhdChhcmdzKSkpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyLmFwcGx5KHZvaWQgMCwgW3RyYW5zZm9ybVBheWxvYWQobWVzc2FnZSwgZGVzZXJpYWxpemVyKV0uY29uY2F0KGFyZ3MpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxpc3RlbmVyLmFwcGx5KHZvaWQgMCwgW21lc3NhZ2VdLmNvbmNhdChhcmdzKSk7XG4gICAgfTtcbiAgfSAvLyBPdGhlcndpc2UsIHJldHVybiBhIGZ1bmN0aW9uIHRoYXQgdHJpZXMgdG8gZGVzZXJpYWxpemUgb24gZXZlcnkgbWVzc2FnZVxuXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yID4gMSA/IF9sZW4yIC0gMSA6IDApLCBfa2V5MiA9IDE7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgIGFyZ3NbX2tleTIgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpc3RlbmVyLmFwcGx5KHZvaWQgMCwgW3RyYW5zZm9ybVBheWxvYWQobWVzc2FnZSwgZGVzZXJpYWxpemVyKV0uY29uY2F0KGFyZ3MpKTtcbiAgfTtcbn07XG4vKipcbiAqIEEgZnVuY3Rpb24gcmV0dXJuZWQgZnJvbSB3aXRoRGVzZXJpYWxpemVyIHRoYXQsIHdoZW4gY2FsbGVkLCB3cmFwcyBhZGRMaXN0ZW5lckZuIHdpdGggdGhlXG4gKiBkZXNlcmlhbGl6ZXIgcGFzc2VkIHRvIHdpdGhEZXNlcmlhbGl6ZXIuXG4gKiBAbmFtZSBBZGRMaXN0ZW5lckRlc2VyaWFsaXplclxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhZGRMaXN0ZW5lckZuIFRoZSBhZGQgbGlzdGVuZXIgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEByZXR1cm5zIHtEZXNlcmlhbGl6ZWRBZGRMaXN0ZW5lcn1cbiAqL1xuXG4vKipcbiAqIEEgd3JhcHBlZCBhZGQgbGlzdGVuZXIgZnVuY3Rpb24gdGhhdCByZWdpc3RlcnMgdGhlIGdpdmVuIGxpc3RlbmVyLlxuICogQG5hbWUgRGVzZXJpYWxpemVkQWRkTGlzdGVuZXJcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgVGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHRvIHJlZ2lzdGVyLiBJdCBzaG91bGQgZXhwZWN0IHRoZSAob3B0aW9uYWxseSlcbiAqIGRlc2VyaWFsaXplZCBtZXNzYWdlIGFzIGl0cyBmaXJzdCBhcmd1bWVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtzaG91bGREZXNlcmlhbGl6ZV0gQSBmdW5jdGlvbiB0aGF0IHRha2VzIHRoZSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBsaXN0ZW5lclxuICogYW5kIHJldHVybnMgd2hldGhlciB0aGUgbWVzc2FnZSBwYXlsb2FkIHNob3VsZCBiZSBkZXNlcmlhbGl6ZWQuIE5vdCBhbGwgbWVzc2FnZXMgKG5vdGFibHksIG1lc3NhZ2VzXG4gKiB0aGlzIGxpc3RlbmVyIGRvZXNuJ3QgY2FyZSBhYm91dCkgc2hvdWxkIGJlIGF0dGVtcHRlZCB0byBiZSBkZXNlcmlhbGl6ZWQuXG4gKi9cblxuLyoqXG4gKiBHaXZlbiBhIGRlc2VyaWFsaXplciwgcmV0dXJucyBhbiBBZGRMaXN0ZW5lckRlc2VyaWFsaXplciBmdW5jdGlvbiB0aGF0IHRoYXQgdGFrZXMgYW4gYWRkIGxpc3RlbmVyXG4gKiBmdW5jdGlvbiBhbmQgcmV0dXJucyBhIERlc2VyaWFsaXplZEFkZExpc3RlbmVyIHRoYXQgYXV0b21hdGljYWxseSBkZXNlcmlhbGl6ZXMgbWVzc2FnZSBwYXlsb2Fkcy5cbiAqIEVhY2ggbWVzc2FnZSBsaXN0ZW5lciBpcyBleHBlY3RlZCB0byB0YWtlIHRoZSBtZXNzYWdlIGFzIGl0cyBmaXJzdCBhcmd1bWVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGRlc2VyaWFsaXplciBBIGZ1bmN0aW9uIHRoYXQgZGVzZXJpYWxpemVzIGEgbWVzc2FnZSBwYXlsb2FkLlxuICogQHJldHVybnMge0FkZExpc3RlbmVyRGVzZXJpYWxpemVyfVxuICogRXhhbXBsZSBVc2FnZTpcbiAqICAgY29uc3Qgd2l0aEpzb25EZXNlcmlhbGl6ZXIgPSB3aXRoRGVzZXJpYWxpemVyKHBheWxvYWQgPT4gSlNPTi5wYXJzZShwYXlsb2FkKSk7XG4gKiAgIGNvbnN0IGRlc2VyaWFsaXplZENocm9tZUxpc3RlbmVyID0gd2l0aEpzb25EZXNlcmlhbGl6ZXIoY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKTtcbiAqICAgY29uc3Qgc2hvdWxkRGVzZXJpYWxpemUgPSAobWVzc2FnZSkgPT4gbWVzc2FnZS50eXBlID09PSAnREVTRVJJQUxJWkVfTUUnO1xuICogICBkZXNlcmlhbGl6ZWRDaHJvbWVMaXN0ZW5lcihtZXNzYWdlID0+IGNvbnNvbGUubG9nKFwiUGF5bG9hZDpcIiwgbWVzc2FnZS5wYXlsb2FkKSwgc2hvdWxkRGVzZXJpYWxpemUpO1xuICogICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShcInsndHlwZTonREVTRVJJQUxJWkVfTUUnLCdwYXlsb2FkJzp7J3Byb3AnOjR9fVwiKTtcbiAqICAgLy9QYXlsb2FkOiB7IHByb3A6IDQgfTtcbiAqICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoXCJ7J3BheWxvYWQnOnsncHJvcCc6NH19XCIpO1xuICogICAvL1BheWxvYWQ6IFwieydwcm9wJzo0fVwiO1xuICovXG5cblxudmFyIHdpdGhEZXNlcmlhbGl6ZXIgPSBmdW5jdGlvbiB3aXRoRGVzZXJpYWxpemVyKCkge1xuICB2YXIgZGVzZXJpYWxpemVyID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBub29wO1xuICByZXR1cm4gZnVuY3Rpb24gKGFkZExpc3RlbmVyRm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGxpc3RlbmVyLCBzaG91bGREZXNlcmlhbGl6ZSkge1xuICAgICAgcmV0dXJuIGFkZExpc3RlbmVyRm4oZGVzZXJpYWxpemVMaXN0ZW5lcihsaXN0ZW5lciwgZGVzZXJpYWxpemVyLCBzaG91bGREZXNlcmlhbGl6ZSkpO1xuICAgIH07XG4gIH07XG59O1xuLyoqXG4gKiBHaXZlbiBhIHNlcmlhbGl6ZXIsIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgbWVzc2FnZSBzZW5kaW5nXG4gKiBmdW5jdGlvbiBhcyBpdHMgc29sZSBhcmd1bWVudCBhbmQgcmV0dXJucyBhIHdyYXBwZWQgbWVzc2FnZSBzZW5kZXIgdGhhdFxuICogYXV0b21hdGljYWx5IHNlcmlhbGl6ZXMgbWVzc2FnZSBwYXlsb2Fkcy4gVGhlIG1lc3NhZ2Ugc2VuZGVyXG4gKiBpcyBleHBlY3RlZCB0byB0YWtlIHRoZSBtZXNzYWdlIGFzIGl0cyBmaXJzdCBhcmd1bWVudCwgdW5sZXNzIG1lc3NhZ2VBcmdJbmRleFxuICogaXMgbm9uemVybywgaW4gd2hpY2ggY2FzZSBpdCBpcyBleHBlY3RlZCBpbiB0aGUgcG9zaXRpb24gc3BlY2lmaWVkIGJ5IG1lc3NhZ2VBcmdJbmRleC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNlcmlhbGl6ZXIgQSBmdW5jdGlvbiB0aGF0IHNlcmlhbGl6ZXMgYSBtZXNzYWdlIHBheWxvYWRcbiAqIEV4YW1wbGUgVXNhZ2U6XG4gKiAgIGNvbnN0IHdpdGhKc29uU2VyaWFsaXplciA9IHdpdGhTZXJpYWxpemVyKHBheWxvYWQgPT4gSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpXG4gKiAgIGNvbnN0IHNlcmlhbGl6ZWRDaHJvbWVTZW5kZXIgPSB3aXRoSnNvblNlcmlhbGl6ZXIoY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UpXG4gKiAgIGNocm9tZS5ydW50aW1lLmFkZExpc3RlbmVyKG1lc3NhZ2UgPT4gY29uc29sZS5sb2coXCJQYXlsb2FkOlwiLCBtZXNzYWdlLnBheWxvYWQpKVxuICogICBzZXJpYWxpemVkQ2hyb21lU2VuZGVyKHsgcGF5bG9hZDogeyBwcm9wOiA0IH19KVxuICogICAvL1BheWxvYWQ6IFwieydwcm9wJzo0fVwiXG4gKi9cblxuXG5leHBvcnRzLndpdGhEZXNlcmlhbGl6ZXIgPSB3aXRoRGVzZXJpYWxpemVyO1xuXG52YXIgd2l0aFNlcmlhbGl6ZXIgPSBmdW5jdGlvbiB3aXRoU2VyaWFsaXplcigpIHtcbiAgdmFyIHNlcmlhbGl6ZXIgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IG5vb3A7XG4gIHJldHVybiBmdW5jdGlvbiAoc2VuZE1lc3NhZ2VGbikge1xuICAgIHZhciBtZXNzYWdlQXJnSW5kZXggPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMyksIF9rZXkzID0gMDsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgICAgICBhcmdzW19rZXkzXSA9IGFyZ3VtZW50c1tfa2V5M107XG4gICAgICB9XG5cbiAgICAgIGlmIChhcmdzLmxlbmd0aCA8PSBtZXNzYWdlQXJnSW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWVzc2FnZSBpbiByZXF1ZXN0IGNvdWxkIG5vdCBiZSBzZXJpYWxpemVkLiBcIiArIFwiRXhwZWN0ZWQgbWVzc2FnZSBpbiBwb3NpdGlvbiBcIi5jb25jYXQobWVzc2FnZUFyZ0luZGV4LCBcIiBidXQgb25seSByZWNlaXZlZCBcIikuY29uY2F0KGFyZ3MubGVuZ3RoLCBcIiBhcmdzLlwiKSk7XG4gICAgICB9XG5cbiAgICAgIGFyZ3NbbWVzc2FnZUFyZ0luZGV4XSA9IHRyYW5zZm9ybVBheWxvYWQoYXJnc1ttZXNzYWdlQXJnSW5kZXhdLCBzZXJpYWxpemVyKTtcbiAgICAgIHJldHVybiBzZW5kTWVzc2FnZUZuLmFwcGx5KHZvaWQgMCwgYXJncyk7XG4gICAgfTtcbiAgfTtcbn07XG5cbmV4cG9ydHMud2l0aFNlcmlhbGl6ZXIgPSB3aXRoU2VyaWFsaXplcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF9sb2Rhc2ggPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJsb2Rhc2guYXNzaWduaW5cIikpO1xuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XG5cbnZhciBfc2VyaWFsaXphdGlvbiA9IHJlcXVpcmUoXCIuLi9zZXJpYWxpemF0aW9uXCIpO1xuXG52YXIgX3BhdGNoID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vc3RyYXRlZ2llcy9zaGFsbG93RGlmZi9wYXRjaFwiKSk7XG5cbnZhciBfdXRpbCA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbnZhciBiYWNrZ3JvdW5kRXJyUHJlZml4ID0gJ1xcbkxvb2tzIGxpa2UgdGhlcmUgaXMgYW4gZXJyb3IgaW4gdGhlIGJhY2tncm91bmQgcGFnZS4gJyArICdZb3UgbWlnaHQgd2FudCB0byBpbnNwZWN0IHlvdXIgYmFja2dyb3VuZCBwYWdlIGZvciBtb3JlIGRldGFpbHMuXFxuJztcbnZhciBkZWZhdWx0T3B0cyA9IHtcbiAgcG9ydE5hbWU6IF9jb25zdGFudHMuREVGQVVMVF9QT1JUX05BTUUsXG4gIHN0YXRlOiB7fSxcbiAgZXh0ZW5zaW9uSWQ6IG51bGwsXG4gIHNlcmlhbGl6ZXI6IF9zZXJpYWxpemF0aW9uLm5vb3AsXG4gIGRlc2VyaWFsaXplcjogX3NlcmlhbGl6YXRpb24ubm9vcCxcbiAgcGF0Y2hTdHJhdGVneTogX3BhdGNoLmRlZmF1bHRcbn07XG5cbnZhciBTdG9yZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFByb3h5IHN0b3JlXG4gICAqIEBwYXJhbSAge29iamVjdH0gb3B0aW9ucyBBbiBvYmplY3Qgb2YgZm9ybSB7cG9ydE5hbWUsIHN0YXRlLCBleHRlbnNpb25JZCwgc2VyaWFsaXplciwgZGVzZXJpYWxpemVyLCBkaWZmU3RyYXRlZ3l9LCB3aGVyZSBgcG9ydE5hbWVgIGlzIGEgcmVxdWlyZWQgc3RyaW5nIGFuZCBkZWZpbmVzIHRoZSBuYW1lIG9mIHRoZSBwb3J0IGZvciBzdGF0ZSB0cmFuc2l0aW9uIGNoYW5nZXMsIGBzdGF0ZWAgaXMgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhpcyBzdG9yZSAoZGVmYXVsdCBge31gKSBgZXh0ZW5zaW9uSWRgIGlzIHRoZSBleHRlbnNpb24gaWQgYXMgZGVmaW5lZCBieSBicm93c2VyQVBJIHdoZW4gZXh0ZW5zaW9uIGlzIGxvYWRlZCAoZGVmYXVsdCBgJydgKSwgYHNlcmlhbGl6ZXJgIGlzIGEgZnVuY3Rpb24gdG8gc2VyaWFsaXplIG91dGdvaW5nIG1lc3NhZ2UgcGF5bG9hZHMgKGRlZmF1bHQgaXMgcGFzc3Rocm91Z2gpLCBgZGVzZXJpYWxpemVyYCBpcyBhIGZ1bmN0aW9uIHRvIGRlc2VyaWFsaXplIGluY29taW5nIG1lc3NhZ2UgcGF5bG9hZHMgKGRlZmF1bHQgaXMgcGFzc3Rocm91Z2gpLCBhbmQgcGF0Y2hTdHJhdGVneSBpcyBvbmUgb2YgdGhlIGluY2x1ZGVkIHBhdGNoaW5nIHN0cmF0ZWdpZXMgKGRlZmF1bHQgaXMgc2hhbGxvdyBkaWZmKSBvciBhIGN1c3RvbSBwYXRjaGluZyBmdW5jdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIFN0b3JlKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogZGVmYXVsdE9wdHMsXG4gICAgICAgIF9yZWYkcG9ydE5hbWUgPSBfcmVmLnBvcnROYW1lLFxuICAgICAgICBwb3J0TmFtZSA9IF9yZWYkcG9ydE5hbWUgPT09IHZvaWQgMCA/IGRlZmF1bHRPcHRzLnBvcnROYW1lIDogX3JlZiRwb3J0TmFtZSxcbiAgICAgICAgX3JlZiRzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICAgIHN0YXRlID0gX3JlZiRzdGF0ZSA9PT0gdm9pZCAwID8gZGVmYXVsdE9wdHMuc3RhdGUgOiBfcmVmJHN0YXRlLFxuICAgICAgICBfcmVmJGV4dGVuc2lvbklkID0gX3JlZi5leHRlbnNpb25JZCxcbiAgICAgICAgZXh0ZW5zaW9uSWQgPSBfcmVmJGV4dGVuc2lvbklkID09PSB2b2lkIDAgPyBkZWZhdWx0T3B0cy5leHRlbnNpb25JZCA6IF9yZWYkZXh0ZW5zaW9uSWQsXG4gICAgICAgIF9yZWYkc2VyaWFsaXplciA9IF9yZWYuc2VyaWFsaXplcixcbiAgICAgICAgc2VyaWFsaXplciA9IF9yZWYkc2VyaWFsaXplciA9PT0gdm9pZCAwID8gZGVmYXVsdE9wdHMuc2VyaWFsaXplciA6IF9yZWYkc2VyaWFsaXplcixcbiAgICAgICAgX3JlZiRkZXNlcmlhbGl6ZXIgPSBfcmVmLmRlc2VyaWFsaXplcixcbiAgICAgICAgZGVzZXJpYWxpemVyID0gX3JlZiRkZXNlcmlhbGl6ZXIgPT09IHZvaWQgMCA/IGRlZmF1bHRPcHRzLmRlc2VyaWFsaXplciA6IF9yZWYkZGVzZXJpYWxpemVyLFxuICAgICAgICBfcmVmJHBhdGNoU3RyYXRlZ3kgPSBfcmVmLnBhdGNoU3RyYXRlZ3ksXG4gICAgICAgIHBhdGNoU3RyYXRlZ3kgPSBfcmVmJHBhdGNoU3RyYXRlZ3kgPT09IHZvaWQgMCA/IGRlZmF1bHRPcHRzLnBhdGNoU3RyYXRlZ3kgOiBfcmVmJHBhdGNoU3RyYXRlZ3k7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU3RvcmUpO1xuXG4gICAgaWYgKCFwb3J0TmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdwb3J0TmFtZSBpcyByZXF1aXJlZCBpbiBvcHRpb25zJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzZXJpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NlcmlhbGl6ZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkZXNlcmlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZGVzZXJpYWxpemVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcGF0Y2hTdHJhdGVneSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdwYXRjaFN0cmF0ZWd5IG11c3QgYmUgb25lIG9mIHRoZSBpbmNsdWRlZCBwYXRjaGluZyBzdHJhdGVnaWVzIG9yIGEgY3VzdG9tIHBhdGNoaW5nIGZ1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgdGhpcy5wb3J0TmFtZSA9IHBvcnROYW1lO1xuICAgIHRoaXMucmVhZHlSZXNvbHZlZCA9IGZhbHNlO1xuICAgIHRoaXMucmVhZHlQcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZWFkeVJlc29sdmUgPSByZXNvbHZlO1xuICAgIH0pO1xuICAgIHRoaXMuYnJvd3NlckFQSSA9ICgwLCBfdXRpbC5nZXRCcm93c2VyQVBJKSgpO1xuICAgIHRoaXMuZXh0ZW5zaW9uSWQgPSBleHRlbnNpb25JZDsgLy8ga2VlcCB0aGUgZXh0ZW5zaW9uSWQgYXMgYW4gaW5zdGFuY2UgdmFyaWFibGVcblxuICAgIHRoaXMucG9ydCA9IHRoaXMuYnJvd3NlckFQSS5ydW50aW1lLmNvbm5lY3QodGhpcy5leHRlbnNpb25JZCwge1xuICAgICAgbmFtZTogcG9ydE5hbWVcbiAgICB9KTtcbiAgICB0aGlzLnNhZmV0eUhhbmRsZXIgPSB0aGlzLnNhZmV0eUhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNhZmV0eU1lc3NhZ2UgPSB0aGlzLmJyb3dzZXJBUEkucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIodGhpcy5zYWZldHlIYW5kbGVyKTtcbiAgICB0aGlzLnNlcmlhbGl6ZWRQb3J0TGlzdGVuZXIgPSAoMCwgX3NlcmlhbGl6YXRpb24ud2l0aERlc2VyaWFsaXplcikoZGVzZXJpYWxpemVyKShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3RoaXMkcG9ydCRvbk1lc3NhZ2U7XG5cbiAgICAgIHJldHVybiAoX3RoaXMkcG9ydCRvbk1lc3NhZ2UgPSBfdGhpcy5wb3J0Lm9uTWVzc2FnZSkuYWRkTGlzdGVuZXIuYXBwbHkoX3RoaXMkcG9ydCRvbk1lc3NhZ2UsIGFyZ3VtZW50cyk7XG4gICAgfSk7XG4gICAgdGhpcy5zZXJpYWxpemVkTWVzc2FnZVNlbmRlciA9ICgwLCBfc2VyaWFsaXphdGlvbi53aXRoU2VyaWFsaXplcikoc2VyaWFsaXplcikoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF90aGlzJGJyb3dzZXJBUEkkcnVudDtcblxuICAgICAgcmV0dXJuIChfdGhpcyRicm93c2VyQVBJJHJ1bnQgPSBfdGhpcy5icm93c2VyQVBJLnJ1bnRpbWUpLnNlbmRNZXNzYWdlLmFwcGx5KF90aGlzJGJyb3dzZXJBUEkkcnVudCwgYXJndW1lbnRzKTtcbiAgICB9LCAxKTtcbiAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB0aGlzLnBhdGNoU3RyYXRlZ3kgPSBwYXRjaFN0cmF0ZWd5OyAvLyBEb24ndCB1c2Ugc2hvdWxkRGVzZXJpYWxpemUgaGVyZSwgc2luY2Ugbm8gb25lIGVsc2Ugc2hvdWxkIGJlIHVzaW5nIHRoaXMgcG9ydFxuXG4gICAgdGhpcy5zZXJpYWxpemVkUG9ydExpc3RlbmVyKGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICBzd2l0Y2ggKG1lc3NhZ2UudHlwZSkge1xuICAgICAgICBjYXNlIF9jb25zdGFudHMuU1RBVEVfVFlQRTpcbiAgICAgICAgICBfdGhpcy5yZXBsYWNlU3RhdGUobWVzc2FnZS5wYXlsb2FkKTtcblxuICAgICAgICAgIGlmICghX3RoaXMucmVhZHlSZXNvbHZlZCkge1xuICAgICAgICAgICAgX3RoaXMucmVhZHlSZXNvbHZlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIF90aGlzLnJlYWR5UmVzb2x2ZSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgX2NvbnN0YW50cy5QQVRDSF9TVEFURV9UWVBFOlxuICAgICAgICAgIF90aGlzLnBhdGNoU3RhdGUobWVzc2FnZS5wYXlsb2FkKTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6IC8vIGRvIG5vdGhpbmdcblxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZGlzcGF0Y2ggPSB0aGlzLmRpc3BhdGNoLmJpbmQodGhpcyk7IC8vIGFkZCB0aGlzIGNvbnRleHQgdG8gZGlzcGF0Y2hcbiAgfVxuICAvKipcbiAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHN0b3JlIGlzIHJlYWR5LiBPcHRpb25hbGx5IGEgY2FsbGJhY2sgbWF5IGJlIHBhc3NlZCBpbiBpbnN0ZWFkLlxuICAqIEBwYXJhbSBbZnVuY3Rpb25dIGNhbGxiYWNrIEFuIG9wdGlvbmFsIGNhbGxiYWNrIHRoYXQgbWF5IGJlIHBhc3NlZCBpbiBhbmQgd2lsbCBmaXJlIHdoZW4gdGhlIHN0b3JlIGlzIHJlYWR5LlxuICAqIEByZXR1cm4ge29iamVjdH0gcHJvbWlzZSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzdG9yZSBoYXMgZXN0YWJsaXNoZWQgYSBjb25uZWN0aW9uIHdpdGggdGhlIGJhY2tncm91bmQgcGFnZS5cbiAgKi9cblxuXG4gIF9jcmVhdGVDbGFzcyhTdG9yZSwgW3tcbiAgICBrZXk6IFwicmVhZHlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVhZHkoKSB7XG4gICAgICB2YXIgY2IgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IG51bGw7XG5cbiAgICAgIGlmIChjYiAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkeVByb21pc2UudGhlbihjYik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlYWR5UHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlcyBhIGxpc3RlbmVyIGZ1bmN0aW9uIGZvciBhbGwgc3RhdGUgY2hhbmdlc1xuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSBsaXN0ZW5lciBBIGxpc3RlbmVyIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHN0b3JlIHN0YXRlIGNoYW5nZXNcbiAgICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gICAgICAgICAgQW4gdW5zdWJzY3JpYmUgZnVuY3Rpb24gd2hpY2ggY2FuIGJlIGNhbGxlZCB0byByZW1vdmUgdGhlIGxpc3RlbmVyIGZyb20gc3RhdGUgdXBkYXRlc1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwic3Vic2NyaWJlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMyLmxpc3RlbmVycyA9IF90aGlzMi5saXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgICAgcmV0dXJuIGwgIT09IGxpc3RlbmVyO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlcGxhY2VzIHRoZSBzdGF0ZSBmb3Igb25seSB0aGUga2V5cyBpbiB0aGUgdXBkYXRlZCBzdGF0ZS4gTm90aWZpZXMgYWxsIGxpc3RlbmVycyBvZiBzdGF0ZSBjaGFuZ2UuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlIHRoZSBuZXcgKHBhcnRpYWwpIHJlZHV4IHN0YXRlXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJwYXRjaFN0YXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBhdGNoU3RhdGUoZGlmZmVyZW5jZSkge1xuICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMucGF0Y2hTdHJhdGVneSh0aGlzLnN0YXRlLCBkaWZmZXJlbmNlKTtcbiAgICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGwpIHtcbiAgICAgICAgcmV0dXJuIGwoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlIHRoZSBjdXJyZW50IHN0YXRlIHdpdGggYSBuZXcgc3RhdGUuIE5vdGlmaWVzIGFsbCBsaXN0ZW5lcnMgb2Ygc3RhdGUgY2hhbmdlLlxuICAgICAqIEBwYXJhbSAge29iamVjdH0gc3RhdGUgVGhlIG5ldyBzdGF0ZSBmb3IgdGhlIHN0b3JlXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJyZXBsYWNlU3RhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVwbGFjZVN0YXRlKHN0YXRlKSB7XG4gICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgIHJldHVybiBsKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBzdG9yZVxuICAgICAqIEByZXR1cm4ge29iamVjdH0gdGhlIGN1cnJlbnQgc3RvcmUgc3RhdGVcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImdldFN0YXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0dWIgZnVuY3Rpb24gdG8gc3RheSBjb25zaXN0ZW50IHdpdGggUmVkdXggU3RvcmUgQVBJLiBOby1vcC5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInJlcGxhY2VSZWR1Y2VyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlcGxhY2VSZWR1Y2VyKCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwYXRjaCBhbiBhY3Rpb24gdG8gdGhlIGJhY2tncm91bmQgdXNpbmcgbWVzc2FnaW5nIHBhc3NpbmdcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGRhdGEgVGhlIGFjdGlvbiBkYXRhIHRvIGRpc3BhdGNoXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gICAgIFByb21pc2UgdGhhdCB3aWxsIHJlc29sdmUvcmVqZWN0IGJhc2VkIG9uIHRoZSBhY3Rpb24gcmVzcG9uc2UgZnJvbSB0aGUgYmFja2dyb3VuZFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZGlzcGF0Y2hcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzcGF0Y2goZGF0YSkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIF90aGlzMy5zZXJpYWxpemVkTWVzc2FnZVNlbmRlcihfdGhpczMuZXh0ZW5zaW9uSWQsIHtcbiAgICAgICAgICB0eXBlOiBfY29uc3RhbnRzLkRJU1BBVENIX1RZUEUsXG4gICAgICAgICAgcG9ydE5hbWU6IF90aGlzMy5wb3J0TmFtZSxcbiAgICAgICAgICBwYXlsb2FkOiBkYXRhXG4gICAgICAgIH0sIG51bGwsIGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgICAgICAgdmFyIGVycm9yID0gcmVzcC5lcnJvcixcbiAgICAgICAgICAgICAgdmFsdWUgPSByZXNwLnZhbHVlO1xuXG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICB2YXIgYmdFcnIgPSBuZXcgRXJyb3IoXCJcIi5jb25jYXQoYmFja2dyb3VuZEVyclByZWZpeCkuY29uY2F0KGVycm9yKSk7XG4gICAgICAgICAgICByZWplY3QoKDAsIF9sb2Rhc2guZGVmYXVsdCkoYmdFcnIsIGVycm9yKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUodmFsdWUgJiYgdmFsdWUucGF5bG9hZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzYWZldHlIYW5kbGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNhZmV0eUhhbmRsZXIobWVzc2FnZSkge1xuICAgICAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSAnc3RvcmVSZWFkeScpIHtcbiAgICAgICAgLy8gUmVtb3ZlIFNhZnRleSBMaXN0ZW5lclxuICAgICAgICB0aGlzLmJyb3dzZXJBUEkucnVudGltZS5vbk1lc3NhZ2UucmVtb3ZlTGlzdGVuZXIodGhpcy5zYWZldHlIYW5kbGVyKTsgLy8gUmVzb2x2ZSBpZiByZWFkeVByb21pc2UgaGFzIG5vdCBiZWVuIHJlc29sdmVkLlxuXG4gICAgICAgIGlmICghdGhpcy5yZWFkeVJlc29sdmVkKSB7XG4gICAgICAgICAgdGhpcy5yZWFkeVJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnJlYWR5UmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFN0b3JlO1xufSgpO1xuXG52YXIgX2RlZmF1bHQgPSBTdG9yZTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gYXBwbHlNaWRkbGV3YXJlO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IHJldHVybiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5KGFycikgfHwgX25vbkl0ZXJhYmxlU3ByZWFkKCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7IGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGl0ZXIpIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVyKSA9PT0gXCJbb2JqZWN0IEFyZ3VtZW50c11cIikgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gfVxuXG4vLyBGdW5jdGlvbiB0YWtlbiBmcm9tIHJlZHV4IHNvdXJjZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3JlYWN0anMvcmVkdXgvYmxvYi9tYXN0ZXIvc3JjL2NvbXBvc2UuanNcbmZ1bmN0aW9uIGNvbXBvc2UoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBmdW5jcyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBmdW5jc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmIChmdW5jcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGFyZykge1xuICAgICAgcmV0dXJuIGFyZztcbiAgICB9O1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBmdW5jc1swXTtcbiAgfVxuXG4gIHJldHVybiBmdW5jcy5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGEoYi5hcHBseSh2b2lkIDAsIGFyZ3VtZW50cykpO1xuICAgIH07XG4gIH0pO1xufSAvLyBCYXNlZCBvbiByZWR1eCBpbXBsZW1lbnRhdGlvbiBvZiBhcHBseU1pZGRsZXdhcmUgdG8gc3VwcG9ydCBhbGwgc3RhbmRhcmRcbi8vIHJlZHV4IG1pZGRsZXdhcmVzXG5cblxuZnVuY3Rpb24gYXBwbHlNaWRkbGV3YXJlKHN0b3JlKSB7XG4gIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgbWlkZGxld2FyZXMgPSBuZXcgQXJyYXkoX2xlbjIgPiAxID8gX2xlbjIgLSAxIDogMCksIF9rZXkyID0gMTsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgIG1pZGRsZXdhcmVzW19rZXkyIC0gMV0gPSBhcmd1bWVudHNbX2tleTJdO1xuICB9XG5cbiAgdmFyIF9kaXNwYXRjaCA9IGZ1bmN0aW9uIGRpc3BhdGNoKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignRGlzcGF0Y2hpbmcgd2hpbGUgY29uc3RydWN0aW5nIHlvdXIgbWlkZGxld2FyZSBpcyBub3QgYWxsb3dlZC4gJyArICdPdGhlciBtaWRkbGV3YXJlIHdvdWxkIG5vdCBiZSBhcHBsaWVkIHRvIHRoaXMgZGlzcGF0Y2guJyk7XG4gIH07XG5cbiAgdmFyIG1pZGRsZXdhcmVBUEkgPSB7XG4gICAgZ2V0U3RhdGU6IHN0b3JlLmdldFN0YXRlLmJpbmQoc3RvcmUpLFxuICAgIGRpc3BhdGNoOiBmdW5jdGlvbiBkaXNwYXRjaCgpIHtcbiAgICAgIHJldHVybiBfZGlzcGF0Y2guYXBwbHkodm9pZCAwLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfTtcbiAgbWlkZGxld2FyZXMgPSAobWlkZGxld2FyZXMgfHwgW10pLm1hcChmdW5jdGlvbiAobWlkZGxld2FyZSkge1xuICAgIHJldHVybiBtaWRkbGV3YXJlKG1pZGRsZXdhcmVBUEkpO1xuICB9KTtcbiAgX2Rpc3BhdGNoID0gY29tcG9zZS5hcHBseSh2b2lkIDAsIF90b0NvbnN1bWFibGVBcnJheShtaWRkbGV3YXJlcykpKHN0b3JlLmRpc3BhdGNoKTtcbiAgc3RvcmUuZGlzcGF0Y2ggPSBfZGlzcGF0Y2g7XG4gIHJldHVybiBzdG9yZTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuRElGRl9TVEFUVVNfQVJSQVlfVVBEQVRFRCA9IGV4cG9ydHMuRElGRl9TVEFUVVNfS0VZU19VUERBVEVEID0gZXhwb3J0cy5ESUZGX1NUQVRVU19SRU1PVkVEID0gZXhwb3J0cy5ESUZGX1NUQVRVU19VUERBVEVEID0gdm9pZCAwO1xuLy8gVGhlIGBjaGFuZ2VgIHZhbHVlIGZvciB1cGRhdGVkIG9yIGluc2VydGVkIGZpZWxkcyByZXN1bHRpbmcgZnJvbSBzaGFsbG93IGRpZmZcbnZhciBESUZGX1NUQVRVU19VUERBVEVEID0gJ3VwZGF0ZWQnOyAvLyBUaGUgYGNoYW5nZWAgdmFsdWUgZm9yIHJlbW92ZWQgZmllbGRzIHJlc3VsdGluZyBmcm9tIHNoYWxsb3cgZGlmZlxuXG5leHBvcnRzLkRJRkZfU1RBVFVTX1VQREFURUQgPSBESUZGX1NUQVRVU19VUERBVEVEO1xudmFyIERJRkZfU1RBVFVTX1JFTU9WRUQgPSAncmVtb3ZlZCc7XG5leHBvcnRzLkRJRkZfU1RBVFVTX1JFTU9WRUQgPSBESUZGX1NUQVRVU19SRU1PVkVEO1xudmFyIERJRkZfU1RBVFVTX0tFWVNfVVBEQVRFRCA9ICd1cGRhdGVkX2tleXMnO1xuZXhwb3J0cy5ESUZGX1NUQVRVU19LRVlTX1VQREFURUQgPSBESUZGX1NUQVRVU19LRVlTX1VQREFURUQ7XG52YXIgRElGRl9TVEFUVVNfQVJSQVlfVVBEQVRFRCA9ICd1cGRhdGVkX2FycmF5JztcbmV4cG9ydHMuRElGRl9TVEFUVVNfQVJSQVlfVVBEQVRFRCA9IERJRkZfU1RBVFVTX0FSUkFZX1VQREFURUQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBzaGFsbG93RGlmZjtcblxudmFyIF9jb25zdGFudHMgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzXCIpO1xuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgT2JqZWN0IGNvbnRhaW5pbmcgb25seSB0aGUgZmllbGRzIGluIGBuZXdgIHRoYXQgZGlmZmVyIGZyb20gYG9sZGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2xkXG4gKiBAcGFyYW0ge09iamVjdH0gbmV3XG4gKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgb2YgY2hhbmdlcy4gVGhlIGNoYW5nZXMgaGF2ZSBhIGBrZXlgLCBgdmFsdWVgLCBhbmQgYGNoYW5nZWAuXG4gKiAgIFRoZSBjaGFuZ2UgaXMgZWl0aGVyIGB1cGRhdGVkYCwgd2hpY2ggaXMgaWYgdGhlIHZhbHVlIGhhcyBjaGFuZ2VkIG9yIGJlZW4gYWRkZWQsXG4gKiAgIG9yIGByZW1vdmVkYC5cbiAqL1xuZnVuY3Rpb24gc2hhbGxvd0RpZmYob2xkT2JqLCBuZXdPYmopIHtcbiAgdmFyIGRpZmZlcmVuY2UgPSBbXTtcbiAgT2JqZWN0LmtleXMobmV3T2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAob2xkT2JqW2tleV0gIT09IG5ld09ialtrZXldKSB7XG4gICAgICBkaWZmZXJlbmNlLnB1c2goe1xuICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgdmFsdWU6IG5ld09ialtrZXldLFxuICAgICAgICBjaGFuZ2U6IF9jb25zdGFudHMuRElGRl9TVEFUVVNfVVBEQVRFRFxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbiAgT2JqZWN0LmtleXMob2xkT2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoIW5ld09iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBkaWZmZXJlbmNlLnB1c2goe1xuICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgY2hhbmdlOiBfY29uc3RhbnRzLkRJRkZfU1RBVFVTX1JFTU9WRURcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBkaWZmZXJlbmNlO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG5cbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZShcIi4uL2NvbnN0YW50c1wiKTtcblxuZnVuY3Rpb24gX2RlZmF1bHQob2JqLCBkaWZmZXJlbmNlKSB7XG4gIHZhciBuZXdPYmogPSBPYmplY3QuYXNzaWduKHt9LCBvYmopO1xuICBkaWZmZXJlbmNlLmZvckVhY2goZnVuY3Rpb24gKF9yZWYpIHtcbiAgICB2YXIgY2hhbmdlID0gX3JlZi5jaGFuZ2UsXG4gICAgICAgIGtleSA9IF9yZWYua2V5LFxuICAgICAgICB2YWx1ZSA9IF9yZWYudmFsdWU7XG5cbiAgICBzd2l0Y2ggKGNoYW5nZSkge1xuICAgICAgY2FzZSBfY29uc3RhbnRzLkRJRkZfU1RBVFVTX1VQREFURUQ6XG4gICAgICAgIG5ld09ialtrZXldID0gdmFsdWU7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIF9jb25zdGFudHMuRElGRl9TVEFUVVNfUkVNT1ZFRDpcbiAgICAgICAgUmVmbGVjdC5kZWxldGVQcm9wZXJ0eShuZXdPYmosIGtleSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OiAvLyBkbyBub3RoaW5nXG5cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gbmV3T2JqO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5nZXRCcm93c2VyQVBJID0gZ2V0QnJvd3NlckFQSTtcblxuLyoqXG4gKiBMb29rcyBmb3IgYSBnbG9iYWwgYnJvd3NlciBhcGksIGZpcnN0IGNoZWNraW5nIHRoZSBjaHJvbWUgbmFtZXNwYWNlIGFuZCB0aGVuXG4gKiBjaGVja2luZyB0aGUgYnJvd3NlciBuYW1lc3BhY2UuIElmIG5vIGFwcHJvcHJpYXRlIG5hbWVzcGFjZSBpcyBwcmVzZW50LCB0aGlzXG4gKiBmdW5jdGlvbiB3aWxsIHRocm93IGFuIGVycm9yLlxuICovXG5mdW5jdGlvbiBnZXRCcm93c2VyQVBJKCkge1xuICB2YXIgYXBpID0gZ2xvYmFsLmNocm9tZSB8fCBnbG9iYWwuYnJvd3NlciB8fCBicm93c2VyO1xuXG4gIGlmICghYXBpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQnJvd3NlciBBUEkgaXMgbm90IHByZXNlbnRcIik7XG4gIH1cblxuICByZXR1cm4gYXBpO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XG5cbnZhciBfc2VyaWFsaXphdGlvbiA9IHJlcXVpcmUoXCIuLi9zZXJpYWxpemF0aW9uXCIpO1xuXG52YXIgX3V0aWwgPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcblxudmFyIF9kaWZmID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vc3RyYXRlZ2llcy9zaGFsbG93RGlmZi9kaWZmXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBSZXNwb25kZXIgZm9yIHByb21pc2lmaWVkIHJlc3VsdHNcbiAqIEBwYXJhbSAge29iamVjdH0gZGlzcGF0Y2hSZXN1bHQgVGhlIHJlc3VsdCBmcm9tIGBzdG9yZS5kaXNwYXRjaCgpYFxuICogQHBhcmFtICB7ZnVuY3Rpb259IHNlbmQgICAgICAgICBUaGUgZnVuY3Rpb24gdXNlZCB0byByZXNwb25kIHRvIG9yaWdpbmFsIG1lc3NhZ2VcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAqL1xudmFyIHByb21pc2VSZXNwb25kZXIgPSBmdW5jdGlvbiBwcm9taXNlUmVzcG9uZGVyKGRpc3BhdGNoUmVzdWx0LCBzZW5kKSB7XG4gIFByb21pc2UucmVzb2x2ZShkaXNwYXRjaFJlc3VsdCkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgc2VuZCh7XG4gICAgICBlcnJvcjogbnVsbCxcbiAgICAgIHZhbHVlOiByZXNcbiAgICB9KTtcbiAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ2Vycm9yIGRpc3BhdGNoaW5nIHJlc3VsdDonLCBlcnIpO1xuICAgIHNlbmQoe1xuICAgICAgZXJyb3I6IGVyci5tZXNzYWdlLFxuICAgICAgdmFsdWU6IG51bGxcbiAgICB9KTtcbiAgfSk7XG59O1xuXG52YXIgZGVmYXVsdE9wdHMgPSB7XG4gIHBvcnROYW1lOiBfY29uc3RhbnRzLkRFRkFVTFRfUE9SVF9OQU1FLFxuICBkaXNwYXRjaFJlc3BvbmRlcjogcHJvbWlzZVJlc3BvbmRlcixcbiAgc2VyaWFsaXplcjogX3NlcmlhbGl6YXRpb24ubm9vcCxcbiAgZGVzZXJpYWxpemVyOiBfc2VyaWFsaXphdGlvbi5ub29wLFxuICBkaWZmU3RyYXRlZ3k6IF9kaWZmLmRlZmF1bHRcbn07XG4vKipcbiAqIFdyYXBzIGEgUmVkdXggc3RvcmUgc28gdGhhdCBwcm94eSBzdG9yZXMgY2FuIGNvbm5lY3QgdG8gaXQuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RvcmUgQSBSZWR1eCBzdG9yZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgQW4gb2JqZWN0IG9mIGZvcm0ge3BvcnROYW1lLCBkaXNwYXRjaFJlc3BvbmRlciwgc2VyaWFsaXplciwgZGVzZXJpYWxpemVyfSwgd2hlcmUgYHBvcnROYW1lYCBpcyBhIHJlcXVpcmVkIHN0cmluZyBhbmQgZGVmaW5lcyB0aGUgbmFtZSBvZiB0aGUgcG9ydCBmb3Igc3RhdGUgdHJhbnNpdGlvbiBjaGFuZ2VzLCBgZGlzcGF0Y2hSZXNwb25kZXJgIGlzIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyB0aGUgcmVzdWx0IG9mIGEgc3RvcmUgZGlzcGF0Y2ggYW5kIG9wdGlvbmFsbHkgaW1wbGVtZW50cyBjdXN0b20gbG9naWMgZm9yIHJlc3BvbmRpbmcgdG8gdGhlIG9yaWdpbmFsIGRpc3BhdGNoIG1lc3NhZ2UsYHNlcmlhbGl6ZXJgIGlzIGEgZnVuY3Rpb24gdG8gc2VyaWFsaXplIG91dGdvaW5nIG1lc3NhZ2UgcGF5bG9hZHMgKGRlZmF1bHQgaXMgcGFzc3Rocm91Z2gpLCBgZGVzZXJpYWxpemVyYCBpcyBhIGZ1bmN0aW9uIHRvIGRlc2VyaWFsaXplIGluY29taW5nIG1lc3NhZ2UgcGF5bG9hZHMgKGRlZmF1bHQgaXMgcGFzc3Rocm91Z2gpLCBhbmQgZGlmZlN0cmF0ZWd5IGlzIG9uZSBvZiB0aGUgaW5jbHVkZWQgZGlmZmluZyBzdHJhdGVnaWVzIChkZWZhdWx0IGlzIHNoYWxsb3cgZGlmZikgb3IgYSBjdXN0b20gZGlmZmluZyBmdW5jdGlvbi5cbiAqL1xuXG52YXIgX2RlZmF1bHQgPSBmdW5jdGlvbiBfZGVmYXVsdChzdG9yZSkge1xuICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZGVmYXVsdE9wdHMsXG4gICAgICBfcmVmJHBvcnROYW1lID0gX3JlZi5wb3J0TmFtZSxcbiAgICAgIHBvcnROYW1lID0gX3JlZiRwb3J0TmFtZSA9PT0gdm9pZCAwID8gZGVmYXVsdE9wdHMucG9ydE5hbWUgOiBfcmVmJHBvcnROYW1lLFxuICAgICAgX3JlZiRkaXNwYXRjaFJlc3BvbmRlID0gX3JlZi5kaXNwYXRjaFJlc3BvbmRlcixcbiAgICAgIGRpc3BhdGNoUmVzcG9uZGVyID0gX3JlZiRkaXNwYXRjaFJlc3BvbmRlID09PSB2b2lkIDAgPyBkZWZhdWx0T3B0cy5kaXNwYXRjaFJlc3BvbmRlciA6IF9yZWYkZGlzcGF0Y2hSZXNwb25kZSxcbiAgICAgIF9yZWYkc2VyaWFsaXplciA9IF9yZWYuc2VyaWFsaXplcixcbiAgICAgIHNlcmlhbGl6ZXIgPSBfcmVmJHNlcmlhbGl6ZXIgPT09IHZvaWQgMCA/IGRlZmF1bHRPcHRzLnNlcmlhbGl6ZXIgOiBfcmVmJHNlcmlhbGl6ZXIsXG4gICAgICBfcmVmJGRlc2VyaWFsaXplciA9IF9yZWYuZGVzZXJpYWxpemVyLFxuICAgICAgZGVzZXJpYWxpemVyID0gX3JlZiRkZXNlcmlhbGl6ZXIgPT09IHZvaWQgMCA/IGRlZmF1bHRPcHRzLmRlc2VyaWFsaXplciA6IF9yZWYkZGVzZXJpYWxpemVyLFxuICAgICAgX3JlZiRkaWZmU3RyYXRlZ3kgPSBfcmVmLmRpZmZTdHJhdGVneSxcbiAgICAgIGRpZmZTdHJhdGVneSA9IF9yZWYkZGlmZlN0cmF0ZWd5ID09PSB2b2lkIDAgPyBkZWZhdWx0T3B0cy5kaWZmU3RyYXRlZ3kgOiBfcmVmJGRpZmZTdHJhdGVneTtcblxuICBpZiAoIXBvcnROYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwb3J0TmFtZSBpcyByZXF1aXJlZCBpbiBvcHRpb25zJyk7XG4gIH1cblxuICBpZiAodHlwZW9mIHNlcmlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NlcmlhbGl6ZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBpZiAodHlwZW9mIGRlc2VyaWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignZGVzZXJpYWxpemVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBkaWZmU3RyYXRlZ3kgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2RpZmZTdHJhdGVneSBtdXN0IGJlIG9uZSBvZiB0aGUgaW5jbHVkZWQgZGlmZmluZyBzdHJhdGVnaWVzIG9yIGEgY3VzdG9tIGRpZmYgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIHZhciBicm93c2VyQVBJID0gKDAsIF91dGlsLmdldEJyb3dzZXJBUEkpKCk7XG4gIC8qKlxuICAgKiBSZXNwb25kIHRvIGRpc3BhdGNoZXMgZnJvbSBVSSBjb21wb25lbnRzXG4gICAqL1xuXG4gIHZhciBkaXNwYXRjaFJlc3BvbnNlID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXNwb25zZShyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgIGlmIChyZXF1ZXN0LnR5cGUgPT09IF9jb25zdGFudHMuRElTUEFUQ0hfVFlQRSAmJiByZXF1ZXN0LnBvcnROYW1lID09PSBwb3J0TmFtZSkge1xuICAgICAgdmFyIGFjdGlvbiA9IE9iamVjdC5hc3NpZ24oe30sIHJlcXVlc3QucGF5bG9hZCwge1xuICAgICAgICBfc2VuZGVyOiBzZW5kZXJcbiAgICAgIH0pO1xuICAgICAgdmFyIGRpc3BhdGNoUmVzdWx0ID0gbnVsbDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZGlzcGF0Y2hSZXN1bHQgPSBzdG9yZS5kaXNwYXRjaChhY3Rpb24pO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBkaXNwYXRjaFJlc3VsdCA9IFByb21pc2UucmVqZWN0KGUubWVzc2FnZSk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICB9XG5cbiAgICAgIGRpc3BhdGNoUmVzcG9uZGVyKGRpc3BhdGNoUmVzdWx0LCBzZW5kUmVzcG9uc2UpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9O1xuICAvKipcbiAgKiBTZXR1cCBmb3Igc3RhdGUgdXBkYXRlc1xuICAqL1xuXG5cbiAgdmFyIGNvbm5lY3RTdGF0ZSA9IGZ1bmN0aW9uIGNvbm5lY3RTdGF0ZShwb3J0KSB7XG4gICAgaWYgKHBvcnQubmFtZSAhPT0gcG9ydE5hbWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgc2VyaWFsaXplZE1lc3NhZ2VQb3N0ZXIgPSAoMCwgX3NlcmlhbGl6YXRpb24ud2l0aFNlcmlhbGl6ZXIpKHNlcmlhbGl6ZXIpKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBwb3J0LnBvc3RNZXNzYWdlLmFwcGx5KHBvcnQsIGFyZ3VtZW50cyk7XG4gICAgfSk7XG4gICAgdmFyIHByZXZTdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XG5cbiAgICB2YXIgcGF0Y2hTdGF0ZSA9IGZ1bmN0aW9uIHBhdGNoU3RhdGUoKSB7XG4gICAgICB2YXIgc3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgdmFyIGRpZmYgPSBkaWZmU3RyYXRlZ3kocHJldlN0YXRlLCBzdGF0ZSk7XG5cbiAgICAgIGlmIChkaWZmLmxlbmd0aCkge1xuICAgICAgICBwcmV2U3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgc2VyaWFsaXplZE1lc3NhZ2VQb3N0ZXIoe1xuICAgICAgICAgIHR5cGU6IF9jb25zdGFudHMuUEFUQ0hfU1RBVEVfVFlQRSxcbiAgICAgICAgICBwYXlsb2FkOiBkaWZmXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07IC8vIFNlbmQgcGF0Y2hlZCBzdGF0ZSBkb3duIGNvbm5lY3RlZCBwb3J0IG9uIGV2ZXJ5IHJlZHV4IHN0b3JlIHN0YXRlIGNoYW5nZVxuXG5cbiAgICB2YXIgdW5zdWJzY3JpYmUgPSBzdG9yZS5zdWJzY3JpYmUocGF0Y2hTdGF0ZSk7IC8vIHdoZW4gdGhlIHBvcnQgZGlzY29ubmVjdHMsIHVuc3Vic2NyaWJlIHRoZSBzZW5kU3RhdGUgbGlzdGVuZXJcblxuICAgIHBvcnQub25EaXNjb25uZWN0LmFkZExpc3RlbmVyKHVuc3Vic2NyaWJlKTsgLy8gU2VuZCBzdG9yZSdzIGluaXRpYWwgc3RhdGUgdGhyb3VnaCBwb3J0XG5cbiAgICBzZXJpYWxpemVkTWVzc2FnZVBvc3Rlcih7XG4gICAgICB0eXBlOiBfY29uc3RhbnRzLlNUQVRFX1RZUEUsXG4gICAgICBwYXlsb2FkOiBwcmV2U3RhdGVcbiAgICB9KTtcbiAgfTtcblxuICB2YXIgd2l0aFBheWxvYWREZXNlcmlhbGl6ZXIgPSAoMCwgX3NlcmlhbGl6YXRpb24ud2l0aERlc2VyaWFsaXplcikoZGVzZXJpYWxpemVyKTtcblxuICB2YXIgc2hvdWxkRGVzZXJpYWxpemUgPSBmdW5jdGlvbiBzaG91bGREZXNlcmlhbGl6ZShyZXF1ZXN0KSB7XG4gICAgcmV0dXJuIHJlcXVlc3QudHlwZSA9PT0gX2NvbnN0YW50cy5ESVNQQVRDSF9UWVBFICYmIHJlcXVlc3QucG9ydE5hbWUgPT09IHBvcnROYW1lO1xuICB9O1xuICAvKipcbiAgICogU2V0dXAgYWN0aW9uIGhhbmRsZXJcbiAgICovXG5cblxuICB3aXRoUGF5bG9hZERlc2VyaWFsaXplcihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF9icm93c2VyQVBJJHJ1bnRpbWUkbztcblxuICAgIHJldHVybiAoX2Jyb3dzZXJBUEkkcnVudGltZSRvID0gYnJvd3NlckFQSS5ydW50aW1lLm9uTWVzc2FnZSkuYWRkTGlzdGVuZXIuYXBwbHkoX2Jyb3dzZXJBUEkkcnVudGltZSRvLCBhcmd1bWVudHMpO1xuICB9KShkaXNwYXRjaFJlc3BvbnNlLCBzaG91bGREZXNlcmlhbGl6ZSk7XG4gIC8qKlxuICAgKiBTZXR1cCBleHRlcm5hbCBhY3Rpb24gaGFuZGxlclxuICAgKi9cblxuICBpZiAoYnJvd3NlckFQSS5ydW50aW1lLm9uTWVzc2FnZUV4dGVybmFsKSB7XG4gICAgd2l0aFBheWxvYWREZXNlcmlhbGl6ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9icm93c2VyQVBJJHJ1bnRpbWUkbzI7XG5cbiAgICAgIHJldHVybiAoX2Jyb3dzZXJBUEkkcnVudGltZSRvMiA9IGJyb3dzZXJBUEkucnVudGltZS5vbk1lc3NhZ2VFeHRlcm5hbCkuYWRkTGlzdGVuZXIuYXBwbHkoX2Jyb3dzZXJBUEkkcnVudGltZSRvMiwgYXJndW1lbnRzKTtcbiAgICB9KShkaXNwYXRjaFJlc3BvbnNlLCBzaG91bGREZXNlcmlhbGl6ZSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS53YXJuKCdydW50aW1lLm9uTWVzc2FnZUV4dGVybmFsIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgfVxuICAvKipcbiAgICogU2V0dXAgZXh0ZW5kZWQgY29ubmVjdGlvblxuICAgKi9cblxuXG4gIGJyb3dzZXJBUEkucnVudGltZS5vbkNvbm5lY3QuYWRkTGlzdGVuZXIoY29ubmVjdFN0YXRlKTtcbiAgLyoqXG4gICAqIFNldHVwIGV4dGVuZGVkIGV4dGVybmFsIGNvbm5lY3Rpb25cbiAgICovXG5cbiAgaWYgKGJyb3dzZXJBUEkucnVudGltZS5vbkNvbm5lY3RFeHRlcm5hbCkge1xuICAgIGJyb3dzZXJBUEkucnVudGltZS5vbkNvbm5lY3RFeHRlcm5hbC5hZGRMaXN0ZW5lcihjb25uZWN0U3RhdGUpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUud2FybigncnVudGltZS5vbkNvbm5lY3RFeHRlcm5hbCBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gIH1cbiAgLyoqXG4gICAqIFNhZmV0eSBtZXNzYWdlIHRvIHRhYnMgZm9yIGNvbnRlbnQgc2NyaXB0c1xuICAgKi9cblxuXG4gIGJyb3dzZXJBUEkudGFicy5xdWVyeSh7fSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHRhYnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgIHZhciB0YWIgPSBfc3RlcC52YWx1ZTtcbiAgICAgICAgYnJvd3NlckFQSS50YWJzLnNlbmRNZXNzYWdlKHRhYi5pZCwge1xuICAgICAgICAgIGFjdGlvbjogJ3N0b3JlUmVhZHknXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7Ly8gZG8gbm90aGluZyAtIGVycm9ycyBjYW4gYmUgcHJlc2VudFxuICAgICAgICAgICAgLy8gaWYgbm8gY29udGVudCBzY3JpcHQgZXhpc3RzIG9uIHJlY2lldmVyXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybiAhPSBudWxsKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7IC8vIEZvciBub24tdGFiIGJhc2VkXG4gIC8vIFRPRE86IEZpbmQgdXNlIGNhc2UgZm9yIHRoaXMuIE9tbWl0aW5nIHVudGlsIHRoZW4uXG4gIC8vIGJyb3dzZXJBUEkucnVudGltZS5zZW5kTWVzc2FnZShudWxsLCB7YWN0aW9uOiAnc3RvcmVSZWFkeSd9KTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWxNb2R1bGUpIHtcblx0aWYgKCFvcmlnaW5hbE1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHR2YXIgbW9kdWxlID0gT2JqZWN0LmNyZWF0ZShvcmlnaW5hbE1vZHVsZSk7XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiZXhwb3J0c1wiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlXG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJy4vcmVkdXgvYWN0aW9ucyc7XG5cbmltcG9ydCB7IElDb29raWUgfSBmcm9tICcuLi9zaGFyZWQvdHlwZXMnO1xuaW1wb3J0IHN0b3JlIGZyb20gJy4vcmVkdXgvc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQmFkZ2UoZW5hYmxlZCkge1xuICBpZiAoZW5hYmxlZCkge1xuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7XG4gICAgICB0ZXh0OiBcIk9OXCJcbiAgICB9KTtcbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZUJhY2tncm91bmRDb2xvcih7XG4gICAgICBjb2xvcjogXCIjMTVhMzQxXCJcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZVRleHQoe1xuICAgICAgdGV4dDogXCJPRkZcIlxuICAgIH0pO1xuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHtcbiAgICAgIGNvbG9yOiBcIiM3ZTIwMTNcIlxuICAgIH0pO1xuICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGxpc3RlblRhYkNoYW5nZShjYWxsYmFjaz1udWxsKSB7XG4gIC8vIEhhbmRsZSB0aGUgY2hyb21lIHRhYiBjaGFuZ2VcbiAgY2hyb21lLnRhYnMub25BY3RpdmF0ZWQuYWRkTGlzdGVuZXIoKCkgPT4ge1xuICAgIC8vIEdldCBDdXJyZW50IFRyYWJcbiAgICBnZXRDdXJyZW50VGFiKCk7XG5cbiAgICAvLyBFeGVjdXRlIGNhbGxiYWNrXG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGxpc3RlbkZvclVYQShjYWxsYmFjaz1udWxsKSB7XG4gIGNvbnN0IGZpbHRlcnMgPSB7dXJsczogW1wiKjovL3QuY29udGVudHNxdWFyZS5uZXQvdXhhLyouanNcIl19O1xuICAvLyBIYW5kbGluZyBVWEEgcmVxdWVzdC4gV2FpdGluZyBmb3Igb25SZXNwb25zZVN0YXJ0ZWQgdG8gbWFrZSBzdXJlIGl0J1xuICBjaHJvbWUud2ViUmVxdWVzdC5vblJlc3BvbnNlU3RhcnRlZC5hZGRMaXN0ZW5lcihcbiAgICBmdW5jdGlvbihkZXRhaWxzKSB7XG4gICAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnNldFV4YU9uKGRldGFpbHMudGFiSWQsIGRldGFpbHMudXJsKSk7XG4gICAgICAvLyBFeGVjdXRlIGNhbGxiYWNrXG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9LCBcbiAgICBmaWx0ZXJzXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW5BcGlDYWxsKCkge1xuICBjb25zdCBmaWx0ZXJzID0ge3VybHM6IFtcIio6Ly9jLmNvbnRlbnRzcXVhcmUubmV0LypcIiwgXCIqOi8vYy5jb250ZW50c3F1YXJlLmNvbS8qXCJdfTtcbiAgY2hyb21lLndlYlJlcXVlc3Qub25SZXNwb25zZVN0YXJ0ZWQuYWRkTGlzdGVuZXIoXG4gICAgZnVuY3Rpb24oZGV0YWlscykge1xuICAgICAgc3RvcmUuZGlzcGF0Y2goYWN0aW9ucy5hZGRUYWdBcGlSZXF1ZXN0KGRldGFpbHMudGFiSWQsIGRldGFpbHMudGltZVN0YW1wLCBkZXRhaWxzLnVybCkpO1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH0sXG4gICAgZmlsdGVyc1xuICApO1xufVxuXG4vKipcbiAqIEdldCBjdXJyZW50IG9wZW5lZCB0YWIgaW4gYnJvd3NlciBhbmQgZGlzcGF0Y2ggdGhlIHByb3BlciBhY3Rpb24gdG8gcmVkdXhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRUYWIoKSB7XG4gIGNocm9tZS50YWJzLmdldFNlbGVjdGVkKG51bGwsICh0YWIpID0+IHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnNldEN1cnJlbnRUYWIodGFiLmlkLCB0YWIudXJsKSk7XG4gIH0pO1xufVxuLyoqXG4gKiBHZXQgYWxsIGNvb2tpZXMgZm9yIGEgc3BlY2lmaWMgdXJsLiBGaWx0ZXIgdGhlbSB0byBvbmx5IGdldCB0aGUgY29udGVudHNxYXVyZSBjb29raWVzXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHVybFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29va2llcyh1cmw6IHN0cmluZykge1xuICBjaHJvbWUuY29va2llcy5nZXRBbGwoe3VybDogdXJsfSwgZnVuY3Rpb24oY29va2llczogSUNvb2tpZVtdKSB7XG4gICAgY29uc3QgZmlsdGVyZWQgPSBBcnJheS5mcm9tKGNvb2tpZXMuZmlsdGVyKGNvb2tpZSA9PiBjb29raWUubmFtZS5pbmNsdWRlcyhcIl9jc1wiKSkpO1xuICAgIHN0b3JlLmRpc3BhdGNoKGFjdGlvbnMuc2V0Q29va2llcyhmaWx0ZXJlZCkpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBEZWxldGUgY29va2llXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHVybFxuICogQHBhcmFtICB7SUNvb2tpZX0gY29va2llXG4gKiBAcGFyYW0gIHtmdW5jdGlvbihkZWxldGVkOiBib29sZWFuKX0gY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUNvb2tpZSh1cmw6IHN0cmluZywgY29va2llOiBJQ29va2llLCBjYWxsYmFjaz1udWxsKSB7XG4gIGNocm9tZS5jb29raWVzLnJlbW92ZSh7XG4gICAgICAndXJsJzogdXJsLFxuICAgICAgJ25hbWUnOiBjb29raWUubmFtZSxcbiAgICAgICdzdG9yZUlkJzogY29va2llLnN0b3JlSWRcbiAgfSwgKGRldGFpbHMpID0+IHtcbiAgICAgIGlmIChjYWxsYmFjayAmJiAoZGV0YWlscz09PXVuZGVmaW5lZCB8fCB0eXBlb2YgZGV0YWlscz09PVwidW5kZWZpbmVkXCIpKXtcbiAgICAgICAgY2FsbGJhY2soZmFsc2UpO1xuICAgICAgfSBlbHNlIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogVXBkYXRlIGNvb2tpZS4gVG8gdXBkYXRlIGEgY29va2llIHdlIGRlbGV0ZSB0aGUgcHJldmlvdXMgZXhpc3RpbmcgXG4gKiBjb29raWUgYW5kIHRoZW4gc2V0IGEgbmV3IG9uZVxuICogXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHVybFxuICogQHBhcmFtICB7SUNvb2tpZX0gY29va2llXG4gKiBAcGFyYW0gIHtmdW5jdGlvbihkZWxldGVkOiBib29sZWFuKX0gY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUNvb2tpZSh1cmw6IHN0cmluZywgY29va2llOiBJQ29va2llLCBjYWxsYmFjaz1udWxsKSB7XG4gIFxuICAvLyBSZW1vdmluZyB1bmVlZGVkIGZpZWxkc1xuICBkZWxldGUgY29va2llLmhvc3RPbmx5O1xuICBkZWxldGUgY29va2llLnNlc3Npb247XG5cbiAgZGVsZXRlQ29va2llKHVybCwgY29va2llLCAoc3VjY2VzcykgPT4ge1xuICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICBjaHJvbWUuY29va2llcy5zZXQoey4uLmNvb2tpZSwgdXJsOiB1cmx9LCAoY29va2llOiBJQ29va2llKSA9PiB7XG4gICAgICAgIGlmIChjYWxsYmFjayAmJiAoY29va2llPT09dW5kZWZpbmVkIHx8IHR5cGVvZiBjb29raWU9PT1cInVuZGVmaW5lZFwiKSl7XG4gICAgICAgICAgY2FsbGJhY2soZmFsc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgY2FsbGJhY2sodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoY2FsbGJhY2spIHtcbiAgICAgIC8vIEV4ZWN1dGUgY2FsbGJhY2sgd2l0aCBmYWlsdXJlXG4gICAgICBjYWxsYmFjayhmYWxzZSk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBSZWZyZXNoIHRoZSBwYWdlIG9mIGN1cnJlbnRUYWJJZFxuICogXG4gKiBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIGlmKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcil7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihjaHJvbWUucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZnJlc2hQYWdlKHRhYklkOiBudW1iZXIpIHtcbiAgY29uc3QgY29kZSA9ICd3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7JztcbiAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh0YWJJZCwge2NvZGU6IGNvZGV9LCBjYXB0dXJlQ2hyb21lRXJyb3IpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjYXB0dXJlQ2hyb21lRXJyb3IoKSB7XG4gIGlmKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcil7XG4gICAgY29uc3QgbWVzc2FnZSA9IGNocm9tZS5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlO1xuICAgIC8vIENsZWFyIGVycm9yXG4gICAgZGVsZXRlIGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcjtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgfVxufVxuXG5cblxuIiwiaW1wb3J0ICogYXMgYnJvd3NlciBmcm9tICcuL2Jyb3dzZXInO1xuXG5pbXBvcnQgeyBSRURVWF9QT1JUX05BTUUgfSBmcm9tIFwiLi4vc2hhcmVkL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtnZXRDb29raWVzfSBmcm9tICcuL3JlZHV4L2FjdGlvbnMnO1xuaW1wb3J0IHN0b3JlIGZyb20gJy4vcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgd3JhcFN0b3JlIH0gZnJvbSAnd2ViZXh0LXJlZHV4JztcblxuLy8gSW5pdGlhbGl6ZSBzdG9yZVxud3JhcFN0b3JlKHN0b3JlLCB7XG4gIHBvcnROYW1lOiBSRURVWF9QT1JUX05BTUVcbn0pO1xuXG4vLyBHZXQgQWN0aXZlIFRhYlxuYnJvd3Nlci5nZXRDdXJyZW50VGFiKCk7XG5icm93c2VyLmxpc3RlblRhYkNoYW5nZSgpO1xuLy8gYnJvd3Nlci5nZXRBY3RpdmVUYWIoKTtcblxuLy8gU2V0IHVwIGxpc3RlbmVyc1xuYnJvd3Nlci5saXN0ZW5Gb3JVWEEoKCkgPT4ge1xuICBzdG9yZS5kaXNwYXRjaChnZXRDb29raWVzKCkpO1xuICBicm93c2VyLmxpc3RlbkFwaUNhbGwoKTtcbn0pO1xuXG5cbi8vVXBkYXRlIGJhZGdlXG5icm93c2VyLnVwZGF0ZUJhZGdlKGZhbHNlKTtcblxuXG5cbiIsImltcG9ydCB7IEJhY2tncm91bmRBY3Rpb25UeXBlcyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7SUNvb2tpZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3R5cGVzJztcblxuaW50ZXJmYWNlIEF0dGFjaERlYnVnZ2Vye1xuICB0eXBlOiB0eXBlb2YgQmFja2dyb3VuZEFjdGlvblR5cGVzLkFUVEFDSF9ERUJVR0dFUjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaERlYnVnZ2VyKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEJhY2tncm91bmRBY3Rpb25UeXBlcy5BVFRBQ0hfREVCVUdHRVJcbiAgfVxufTtcblxuaW50ZXJmYWNlIFNldFV4YU9uIHtcbiAgdHlwZTogdHlwZW9mIEJhY2tncm91bmRBY3Rpb25UeXBlcy5TRVRfVVhBX09OO1xuICB0YWJJZDogbnVtYmVyO1xuICB1cmw6IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFV4YU9uKHRJZDogbnVtYmVyLCB1OiBzdHJpbmcpIHtcbiAgcmV0dXJuIHtcbiAgIHR5cGU6IEJhY2tncm91bmRBY3Rpb25UeXBlcy5TRVRfVVhBX09OLFxuICAgdGFiSWQ6IHRJZCxcbiAgIHVybDogdVxuICB9XG59O1xuXG5pbnRlcmZhY2UgQWRkVGFnQXBpUmVxdWVzdCB7XG4gIHR5cGU6IHR5cGVvZiBCYWNrZ3JvdW5kQWN0aW9uVHlwZXMuQUREX1RBR19BUElfUkVRVUVTVDtcbiAgdGFiSWQ6IG51bWJlcjtcbiAgdGltZVN0YW1wOiBudW1iZXI7XG4gIHVybDogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVGFnQXBpUmVxdWVzdCh0SWQ6IG51bWJlciwgdHM6IG51bWJlciwgdTogc3RyaW5nKSB7XG4gIHJldHVybiB7XG4gICB0eXBlOiBCYWNrZ3JvdW5kQWN0aW9uVHlwZXMuQUREX1RBR19BUElfUkVRVUVTVCxcbiAgIHRhYklkOiB0SWQsXG5cdCB0aW1lU3RhbXA6IHRzLFxuICAgdXJsOiB1XG4gIH1cbn07XG5cbmludGVyZmFjZSBHZXRDb29raWVze1xuICB0eXBlOiB0eXBlb2YgQmFja2dyb3VuZEFjdGlvblR5cGVzLkdFVF9DT09LSUVTO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29va2llcygpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBCYWNrZ3JvdW5kQWN0aW9uVHlwZXMuR0VUX0NPT0tJRVNcbiAgfVxufTtcblxuaW50ZXJmYWNlIFNldENvb2tpZXN7XG4gIHR5cGU6IHR5cGVvZiBCYWNrZ3JvdW5kQWN0aW9uVHlwZXMuU0VUX0NPT0tJRVM7XG4gIGNvb2tpZXM6IElDb29raWVbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldENvb2tpZXMoY29va2llczogSUNvb2tpZVtdKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQmFja2dyb3VuZEFjdGlvblR5cGVzLlNFVF9DT09LSUVTLFxuICAgIGNvb2tpZXM6IGNvb2tpZXNcbiAgfVxufTtcblxuXG5pbnRlcmZhY2UgU2V0Q3VycmVudFRhYiB7XG4gIHR5cGU6IHR5cGVvZiBCYWNrZ3JvdW5kQWN0aW9uVHlwZXMuU0VUX0NVUlJFTlRfVEFCO1xuICB0YWJJZDogbnVtYmVyO1xuICBkb21haW46IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEN1cnJlbnRUYWIodGFiSWQ6IG51bWJlciwgaG9zdG5hbWU6IHN0cmluZykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEJhY2tncm91bmRBY3Rpb25UeXBlcy5TRVRfQ1VSUkVOVF9UQUIsXG4gICAgdGFiSWQ6IHRhYklkLFxuICAgIGRvbWFpbjogaG9zdG5hbWVcbiAgfVxufTtcblxuXG5cbmV4cG9ydCB0eXBlIEFjdGlvblR5cGUgPSBBdHRhY2hEZWJ1Z2dlciB8IFNldFV4YU9uIHwgU2V0Q3VycmVudFRhYiB8IEdldENvb2tpZXMgfCBTZXRDb29raWVzIHwgQWRkVGFnQXBpUmVxdWVzdDtcbiIsIlxuZXhwb3J0IGVudW0gQmFja2dyb3VuZEFjdGlvblR5cGVzIHtcblxuICAgIFNFVF9DVVJSRU5UX1RBQiA9ICdAQEJhY2tncm91bmQvU0VUX0NVUlJFTlRfVEFCJyxcbiAgICBcbiAgICAvLyBUaG9zZSAyIGFjdGlvbnMgY29uY2VybiBvbmx5IHRoZSBkZWJ1ZyBmZWF0dXJlXG4gICAgQVRUQUNIX0RFQlVHR0VSID0gJ0BAQmFja2dyb3VuZC9BVFRBQ0hfREVCVUdHRVInLFxuICAgIFJBUExBQ0VfVVhBID0gJ0BAQmFja2dyb3VuZC9SRVBMQUNFX1VYQScsXG5cbiAgICBTRVRfVVhBX09OID0gJ0BAQmFja2dyb3VuZC9TRVRfVVhBX09OJyxcbiAgICBcbiAgICBBRERfVEFHX0FQSV9SRVFVRVNUID0gJ0BAQmFja2dyb3VuZC9BRERfVEFHX0FQSV9SRVFVRVNUJyxcbiAgICBcbiAgICBHRVRfQ09PS0lFUz0gJ0BAQmFja2dyb3VuZC9HRVRfQ09PS0lFUycsXG4gICAgU0VUX0NPT0tJRVM9ICdAQEJhY2tncm91bmQvU0VUX0NPT0tJRVMnXG59XG4iLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJy4vYWN0aW9ucyc7XG5cbmltcG9ydCB7IGRlbGV0ZUNvb2tpZSwgZ2V0Q29va2llcywgcmVmcmVzaFBhZ2UsIHVwZGF0ZUJhZGdlLCB1cGRhdGVDb29raWUgfSBmcm9tICcuLi9icm93c2VyJztcbmltcG9ydCB7IGhhc2hSZXF1ZXN0LCBwYXJzZVVybEFuZENvb2tpZXMgfSBmcm9tICcuLi91dGlscyc7XG5cbmltcG9ydCB7IEJhY2tncm91bmRBY3Rpb25UeXBlcyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IElUYWdTdGF0ZSB9IGZyb20gJy4uLy4uL3NoYXJlZC90eXBlcyc7XG5pbXBvcnQgeyBSZWR1Y2VyIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgU2hhcmVkQWN0aW9uVHlwZXMgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29uc3RhbnRzJztcbmltcG9ydCBzdG9yZSBmcm9tICcuL3N0b3JlJztcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZTogSVRhZ1N0YXRlID0ge1xuICBjdXJyZW50VGFiSWQ6IG51bGwsXG4gIGN1cnJlbnRVcmw6IG51bGwsXG4gIHRhYnM6IG51bGxcbn07XG5cbmV4cG9ydCBjb25zdCBiYWNrZ3JvdW5kUmVkdWNlcjogUmVkdWNlcjxJVGFnU3RhdGUsIGFueT4gPSAoc3RhdGU6IElUYWdTdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHZhciB0YWJJZCA9IHN0YXRlLmN1cnJlbnRUYWJJZDtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuXG4gICAgY2FzZSBCYWNrZ3JvdW5kQWN0aW9uVHlwZXMuQVRUQUNIX0RFQlVHR0VSOlxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIEJhY2tncm91bmRBY3Rpb25UeXBlcy5TRVRfVVhBX09OOlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLCB0YWJzOiB7XG4gICAgICAgICAgLi4uc3RhdGUudGFicyxcbiAgICAgICAgICBbdGFiSWRdOiB7IC4uLnN0YXRlLnRhYnNbdGFiSWRdLCBoYXNUYWc6IHRydWUgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyBUT0RPOiBDcmVhdGUgVXBkYXRlIGJhZGdlIGFjdGlvbiBmb3IgcmVkdXhcbiAgICAgIHVwZGF0ZUJhZGdlKHRydWUpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIEJhY2tncm91bmRBY3Rpb25UeXBlcy5HRVRfQ09PS0lFUzpcbiAgICAgIGlmIChzdGF0ZS5jdXJyZW50VXJsKSB7XG4gICAgICAgIGdldENvb2tpZXMoc3RhdGUuY3VycmVudFVybCk7XG4gICAgICB9XG4gICAgICBicmVha1xuXG4gICAgY2FzZSBCYWNrZ3JvdW5kQWN0aW9uVHlwZXMuU0VUX0NPT0tJRVM6XG4gICAgICB0YWJJZCA9IHN0YXRlLmN1cnJlbnRUYWJJZDtcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSwgdGFiczoge1xuICAgICAgICAgIC4uLnN0YXRlLnRhYnMsIFt0YWJJZF06XG4gICAgICAgICAgICB7IC4uLnN0YXRlLnRhYnNbdGFiSWRdLCBjb29raWVzOiBhY3Rpb24uY29va2llcyB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBicmVha1xuXG4gICAgY2FzZSBCYWNrZ3JvdW5kQWN0aW9uVHlwZXMuU0VUX0NVUlJFTlRfVEFCOlxuICAgICAgdGFiSWQgPSBhY3Rpb24udGFiSWQ7XG4gICAgICBzdGF0ZSA9IHsgLi4uc3RhdGUsIGN1cnJlbnRUYWJJZDogdGFiSWQsIGN1cnJlbnRVcmw6IGFjdGlvbi5kb21haW4gfTtcbiAgICAgIHN0YXRlID0gc3RhdGVbdGFiSWRdID8gc3RhdGUgOiB7XG4gICAgICAgIC4uLnN0YXRlLCB0YWJzOiB7XG4gICAgICAgICAgLi4uc3RhdGUudGFicyxcbiAgICAgICAgICBbdGFiSWRdOiB7IGhhc1RhZzogZmFsc2UsIHV4YVVybDogbnVsbCwgcmVxdWVzdHM6IHt9LCB0YWdDb25maWc6IG51bGwsIGNvb2tpZXM6IFtdIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIC8vIFRPRE86IENyZWF0ZSBVcGRhdGUgYmFkZ2UgYWN0aW9uIGZvciByZWR1eFxuICAgICAgLy8gRGlzcGF0Y2ggdXBkYXRlIGJhZGdlIGFjdGlvblxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIEJhY2tncm91bmRBY3Rpb25UeXBlcy5BRERfVEFHX0FQSV9SRVFVRVNUOlxuICAgICAgY29uc3QgdUlkID0gaGFzaFJlcXVlc3QoYWN0aW9uLnRhYklkLCBhY3Rpb24udGltZVN0YW1wLCBhY3Rpb24udXJsKTtcbiAgICAgIGNvbnN0IG5ld1JlcXVlc3QgPSBwYXJzZVVybEFuZENvb2tpZXMoYWN0aW9uLnVybCwgYWN0aW9uLnRpbWVTdGFtcCk7XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsIHRhYnM6IHtcbiAgICAgICAgICAuLi5zdGF0ZS50YWJzLCBbYWN0aW9uLnRhYklkXTpcbiAgICAgICAgICAgIHsgLi4uc3RhdGUudGFic1thY3Rpb24udGFiSWRdLCByZXF1ZXN0czogeyAuLi5zdGF0ZS50YWJzW2FjdGlvbi50YWJJZF0ucmVxdWVzdHMsIFt1SWRdOiBuZXdSZXF1ZXN0IH0gfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgYnJlYWtcblxuICAgIC8vIEhhbmRsaW5nIFNoYXJlZCBBY3Rpb25zXG4gICAgY2FzZSBTaGFyZWRBY3Rpb25UeXBlcy5VUERBVEVfQ09PS0lFOlxuICAgICAgaWYgKHN0YXRlLmN1cnJlbnRVcmwpIHtcbiAgICAgICAgdXBkYXRlQ29va2llKHN0YXRlLmN1cnJlbnRVcmwsIGFjdGlvbi5jb29raWUsIChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFjdGlvbnMuZ2V0Q29va2llcygpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFNoYXJlZEFjdGlvblR5cGVzLlJFTU9WRV9DT09LSUU6XG4gICAgICBpZiAoc3RhdGUuY3VycmVudFVybCkge1xuICAgICAgICBkZWxldGVDb29raWUoc3RhdGUuY3VycmVudFVybCwgYWN0aW9uLmNvb2tpZSwgKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWN0aW9ucy5nZXRDb29raWVzKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgU2hhcmVkQWN0aW9uVHlwZXMuU0VUX1RBR19DT05GOlxuICAgICAgaWYgKHRhYklkKVxuICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5zdGF0ZSwgdGFiczoge1xuICAgICAgICAgICAgLi4uc3RhdGUudGFicywgW3RhYklkXToge1xuICAgICAgICAgICAgICAuLi5zdGF0ZS50YWJzW3RhYklkXSxcbiAgICAgICAgICAgICAgdGFnQ29uZmlnOiBhY3Rpb24uY29uZmlnLCBoYXNUYWc6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgU2hhcmVkQWN0aW9uVHlwZXMuR0VUX0NPT0tJRVM6XG4gICAgICBpZiAoc3RhdGUuY3VycmVudFVybCkge1xuICAgICAgICBnZXRDb29raWVzKHN0YXRlLmN1cnJlbnRVcmwpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFNoYXJlZEFjdGlvblR5cGVzLlJFRlJFU0hfUEFHRTpcbiAgICAgIHJlZnJlc2hQYWdlKHN0YXRlLmN1cnJlbnRUYWJJZCk7XG4gICAgICBicmVha1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlXG59XG4iLCJpbXBvcnQgeyBhcHBseU1pZGRsZXdhcmUsIGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnO1xuXG5pbXBvcnQgeyBJVGFnU3RhdGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvdHlwZXMnO1xuaW1wb3J0IHsgYmFja2dyb3VuZFJlZHVjZXIgfSBmcm9tICcuL3JlZHVjZXJzJztcbmltcG9ydCBsb2dnZXIgZnJvbSAncmVkdXgtbG9nZ2VyJztcbmltcG9ydCB0aHVua01pZGRsZXdhcmUgZnJvbSAncmVkdXgtdGh1bmsnO1xuXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlPElUYWdTdGF0ZSwgYW55LCBhbnksIGFueT4oXG4gIGJhY2tncm91bmRSZWR1Y2VyLFxuICBhcHBseU1pZGRsZXdhcmUodGh1bmtNaWRkbGV3YXJlLCBsb2dnZXIpXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBzdG9yZTtcbiIsImNvbnN0IHNoYTEgPSByZXF1aXJlKCdzaGExJyk7XG5pbXBvcnQgeyBJVGFnUmVxdWVzdCwgSUtleVZhbHVlICB9IGZyb20gJy4uL3NoYXJlZC90eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNoUmVxdWVzdCh0YWJJZDogbnVtYmVyLCB0aW1lU3RhbXA6IG51bWJlciwgdXJsOnN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHN0clRvSGFzaDogc3RyaW5nID0gdGFiSWQudG9TdHJpbmcoKSArIHRpbWVTdGFtcC50b1N0cmluZygpICsgdXJsO1xuICByZXR1cm4gc2hhMShzdHJUb0hhc2gpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VVcmxBbmRDb29raWVzKHU6IHN0cmluZywgdGltZVN0YW1wOiBudW1iZXIpOiBJVGFnUmVxdWVzdCB7XG4gIGNvbnN0IHVybCA9IG5ldyBVUkwodSk7XG4gIGxldCBwYXJhbXM6IElLZXlWYWx1ZVtdID0gW107XG5cdHVybC5zZWFyY2hQYXJhbXMuZm9yRWFjaCgodiwgaykgPT4ge1xuICAgIHBhcmFtcy5wdXNoKHtuYW1lOmssdmFsdWU6dn0pO1xuXHR9KTtcblxuICByZXR1cm4ge1xuICAgIHR5cGU6IHVybC5wYXRobmFtZSxcbiAgICB0aW1lU3RhbXA6IHRpbWVTdGFtcCxcbiAgICB1cmw6IHUsXG4gICAgcGFyYW1zOiBwYXJhbXNcbiAgfTtcbn1cbiIsImV4cG9ydCBjb25zdCBSRURVWF9QT1JUX05BTUUgPSAnUkVERFVYX0NTX1RBR19ERUJVR0dFUic7XG5leHBvcnQgY29uc3QgQ1NfQ09ORklHID0gJ0NTX0NPTkZJRyc7XG5cbi8vIFJlZHV4IHNoYXJlZCBhY3Rpb25zIHR5cGVzXG5leHBvcnQgZW51bSBTaGFyZWRBY3Rpb25UeXBlcyB7XG4gICAgU0VUX1RBR19DT05GID0gJ0BAU2hhcmVkL1NFVF9UQUdfQ09ORicsXG5cbiAgICAvLyBDb29raWVzIGFjdGlvbnNcbiAgICBHRVRfQ09PS0lFUyA9ICdAQFNoYXJlZC9HRVRfQ09PS0lFUycsXG4gICAgVVBEQVRFX0NPT0tJRSA9ICdAQFNoYXJlZC9VUERBVEVfQ09PS0lFJyxcbiAgICBSRU1PVkVfQ09PS0lFID0gJ0BAU2hhcmVkL1JFTU9WRV9DT09LSUUnLFxuXG4gICAgLy8gUmVmcmVzaCBwYWdlXG4gICAgUkVGUkVTSF9QQUdFID0gJ0BAU2hhcmVkL1JFRlJFU0hfUEFHRSdcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=