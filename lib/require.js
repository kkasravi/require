if (typeof(Object.create) !== 'function') {
  Object.create = function(o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}
if (typeof(Object.adapt) !== 'function') {
  Object.adapt = function() {
    var target = arguments[0];
    var items = Array.prototype.slice.call(arguments, 1);
    for (var i = 0, l = items.length; i < l; i++) {
      for (var j in items[i]) {
        if (items[i].hasOwnProperty(j) && !target.hasOwnProperty(j)) {
          target[j] = items[i][j];
        }
      }
    }
    return target;
  };
}
if (typeof(String.prototype.trim) !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/, '');
  };
}
if (typeof(String.prototype.last) !== 'function') {
  String.prototype.last = function() {
    return this.charAt(this.length - 1);
  };
}
if (typeof(String.prototype.removeWS) !== 'function') {
  String.prototype.removeWS = function() {
    return this.replace(/\t/g, " ").replace(/\s+/g, " ");
  };
}
if (typeof(String.prototype.typeCase) !== 'function') {
  String.prototype.typeCase = function(name) {
    var value = this.toString();
    if (typeof value === 'object') {
      value = String(value);
    }
    return value.replace(/^([a-z])/, function(m, l) {
      return l.substr(0, 1).toUpperCase() + l.substr(1, l.length);
    }).replace(/[\-_\s](.)/g, function(m, l) {
      return l.toUpperCase();
    });
  };
}
if (typeof(String.prototype.camelCase) !== 'function') {
  String.prototype.camelCase = function() {
    var value = this.toString();
    if (typeof value === 'object') {
      value = String(value);
    }
    return value.replace(/^([A-Z])/, function(m, l) {
      return l.substr(0, 1).toLowerCase() + l.substr(1, l.length);
    }).replace(/[\-_\s](.)/g, function(m, l) {
      return l.toUpperCase();
    });
  };
}
if (typeof(String.prototype.escape) !== 'function') {
  String.prototype.escape = function() {
    return this.replace(new RegExp("\n", "g"), " ").replace(new RegExp("\t", "g"), " ").
    replace(new RegExp("\"", "g"), "\\\"").replace(new RegExp("\'", "g"), "\\'").
    replace(new RegExp("<", "g"), "&lt;").replace(new RegExp(">", "g"), "&gt;");
  };
}
if (typeof(String.prototype.namespace) !== 'function') {
  String.prototype.namespace = function(separator, thisp) {
    function namespace(fullNS, separator) {
      var parent = this;
      fullNS.split(separator || '.').forEach(function(ns) {
        parent = parent[ns] = parent[ns] || {};
      });
    }
    sys.puts('namespace=' + this);
    namespace.call((thisp || window), this, separator);
  };
}
if (typeof Array.prototype.isArray != 'function') {
  Array.prototype.isArray = function(obj) {
    if (obj.constructor && obj.constructor.toString().indexOf("Array") === -1) {
      return false;
    } else {
      return true;
    }
  };
}
if (typeof Array.prototype.top != 'function') {
  Array.prototype.top = function() {
    return this.length && this[this.length - 1];
  };
}
if (typeof Array.prototype.forEach != 'function') {
  Array.prototype.forEach = function(fn, thisObj) {
    var scope = thisObj || window;
    for (var i = 0, j = this.length; i < j; ++i) {
      fn.call(scope, this[i], i, this);
    }
  };
}
if (typeof Array.prototype.every != 'function') {
  Array.prototype.every = function(fn, thisObj) {
    var scope = thisObj || window;
    for (var i = 0, j = this.length; i < j; ++i) {
      if (!fn.call(scope, this[i], i, this)) {
        return false;
      }
    }
    return true;
  };
}
if (typeof Array.prototype.some != 'function') {
  Array.prototype.some = function(fn, thisObj) {
    var scope = thisObj || window;
    for (var i = 0, j = this.length; i < j; ++i) {
      if (fn.call(scope, this[i], i, this)) {
        return true;
      }
    }
    return false;
  };
}
if (typeof Array.prototype.map != 'function') {
  Array.prototype.map = function(fn, thisObj) {
    var scope = thisObj || window;
    var a = [];
    for (var i = 0, j = this.length; i < j; ++i) {
      a.push(fn.call(scope, this[i], i, this));
    }
    return a;
  };
}
if (typeof Array.prototype.filter != 'function') {
  Array.prototype.filter = function(fn, thisObj) {
    var scope = thisObj || window;
    var a = [];
    for (var i = 0, j = this.length; i < j; ++i) {
      if (!fn.call(scope, this[i], i, this)) {
        continue;
      }
      a.push(this[i]);
    }
    return a;
  };
}
if (typeof Array.prototype.indexOf != 'function') {
  Array.prototype.indexOf = function(el, start) {
    start = start || 0;
    for (var i = start, j = this.length; i < j; ++i) {
      if (this[i] === el) {
        return i;
      }
    }
    return -1;
  };
}
if (typeof Array.prototype.lastIndexOf != 'function') {
  Array.prototype.lastIndexOf = function(el, start) {
    start = start || this.length;
    if (start >= this.length) {
      start = this.length;
    }
    if (start < 0) {
      start = this.length + start;
    }
    for (var i = start; i >= 0; --i) {
      if (this[i] === el) {
        return i;
      }
    }
    return -1;
  };
}
if (typeof Array.prototype.toHashSet != 'function') {
  Array.prototype.toHashSet = function(key) {
    var lset = {};
    for (var i = 0; i < this.length; ++i) {
      var entry = this[i];
      if (typeof(entry) !== 'function') {
        lset[entry[key]] = entry;
      }
    }
    return lset;
  };
}
if (typeof Array.prototype.toArray != 'function') {
  Array.prototype.toArray = function(object) {
    var array = [];
    if (object instanceof NodeList) {
      for (var i = 0; i < object.length; ++i) {
        array.push(object.item(i));
      }
    }
    return array;
  };
}
if (!Date.prototype.toJSON) {
  Date.prototype.toJSON = function(key) {
    function f(n) {
      // Format integers to have at least two digits.
      return n < 10 ? '0' + n : n;
    }
    return this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z';
  };
}
if (!Date.prototype.fromISO8601) {
  Date.prototype.fromISO8601 = function(formattedString) {
    var regEx = /^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
    var match = regEx.exec(formattedString);
    var result = null;
    if (match) {
      match.shift();
      if (match[1]) {
        match[1]--;
      }
      if (match[6]) {
        match[6] *= 1000;
      }
      result = new Date(match[0] || 1970, match[1] || 0, match[2] || 0, match[3] || 0, match[4] || 0, match[5] || 0, match[6] || 0);
      var offset = 0;
      var zoneSign = match[7] && match[7].charAt(0);
      if (zoneSign != 'Z') {
        offset = ((match[8] || 0) * 60) + (Number(match[9]) || 0);
        if (zoneSign != '-') {
          offset *= -1;
        }
      }
      if (zoneSign) {
        offset -= result.getTimezoneOffset();
      }
      if (offset) {
        result.setTime(result.getTime() + offset * 60000);
      }
    }
    return result;
  };
}
if (!Date.prototype.toISO8601) {
  Date.prototype.toISO8601 = function() {
    var zeropad = function(num) {
      return ((num < 10) ? '0' : '') + num;
    };
    var zeropad2 = function(num) {
      if (num < 10) {
        return ('00' + num);
      }
      if (num < 100) {
        return ('0' + num);
      }
      return '' + num;
    };
    var str = "";
    str += this.getUTCFullYear();
    str += "-" + zeropad(this.getUTCMonth() + 1);
    str += "-" + zeropad(this.getUTCDate());
    str += "T" + zeropad(this.getUTCHours());
    str += ":" + zeropad(this.getUTCMinutes());
    str += ":" + zeropad(this.getUTCSeconds());
    str += "." + zeropad2(this.getUTCMilliseconds());
    str += "Z";
    return str;
  };
}
if (!Date.prototype.format) {
  /*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */
  var dateFormat = function() {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
      timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[\-+]\d{4})?)\b/g,
      timezoneClip = /[^\-+\dA-Z]/g;
    var pad = function(val, len) {
      val = String(val);
      len = len || 2;
      while (val.length < len) {
        val = "0" + val;
      }
      return val;
    };
    // Regexes and supporting functions are cached through closure
    return function(date, mask, utc) {
      var dF = dateFormat;
      // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
      if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
        mask = date;
        date = undefined;
      }
      // Passing date through Date applies Date.parse, if necessary
      date = date ? new Date(date) : new Date();
      if (isNaN(date)) {
        throw SyntaxError("invalid date");
      }
      mask = String(dF.masks[mask] || mask || dF.masks["default"]);
      // Allow setting the utc argument via the mask
      if (mask.slice(0, 4) == "UTC:") {
        mask = mask.slice(4);
        utc = true;
      }
      var _ = utc ? "getUTC" : "get",
      d = date[_ + "Date"](),
      D = date[_ + "Day"](),
      m = date[_ + "Month"](),
      y = date[_ + "FullYear"](),
      H = date[_ + "Hours"](),
      M = date[_ + "Minutes"](),
      s = date[_ + "Seconds"](),
      L = date[_ + "Milliseconds"](),
      o = utc ? 0 : date.getTimezoneOffset(),
      flags = {
        d: d,
        dd: pad(d),
        ddd: dF.i18n.dayNames[D],
        dddd: dF.i18n.dayNames[D + 7],
        m: m + 1,
        mm: pad(m + 1),
        mmm: dF.i18n.monthNames[m],
        mmmm: dF.i18n.monthNames[m + 12],
        yy: String(y).slice(2),
        yyyy: y,
        h: H % 12 || 12,
        hh: pad(H % 12 || 12),
        H: H,
        HH: pad(H),
        M: M,
        MM: pad(M),
        s: s,
        ss: pad(s),
        l: pad(L, 3),
        L: pad(L > 99 ? Math.round(L / 10) : L),
        t: H < 12 ? "a" : "p",
        tt: H < 12 ? "am" : "pm",
        T: H < 12 ? "A" : "P",
        TT: H < 12 ? "AM" : "PM",
        Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
        o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
        S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
      };
      return mask.replace(token, function($0) {
        return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
      });
    };
  }();
  // Some common format strings
  dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
  };
  // Internationalization strings
  dateFormat.i18n = {
    dayNames: [
      "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ],
    monthNames: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
      ]
  };
  // For convenience...
  Date.prototype.format = function(mask, utc) {
    return dateFormat(this, mask, utc);
  };
}
if (!Date.prototype.diff) {
  Date.prototype.diff = function(otime) {
    var delta = this.getTime() - otime;
    var one_day = 1000 * 60 * 60 * 24;
    var one_hour = 1000 * 60 * 60;
    var one_minute = 1000 * 60;
    var days = Math.abs(Math.round(delta / one_day));
    if (days > 0) {
      return days + (days === 1 ? " day ago" : " days ago");
    } else {
      var hours = Math.abs(Math.round(delta / one_hour));
      if (hours > 0) {
        return hours + (hours === 1 ? " hour ago" : " hours ago");
      } else {
        var minutes = Math.abs(Math.round(delta / one_minute));
        return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
      }
    }
  };
}
if (typeof(Function.prototype.bind) !== 'function') {
  Function.prototype.bind = function(context) {
    var fn = this,
      isPartial = arguments.length > 1;
    if (!isPartial) {
      return function() {
        if (arguments.length !== 0) {
          return fn.apply(context, arguments);
        } else {
          return fn.call(context);
        }
      };
    } else {
      var args = Array.prototype.slice.call(arguments, 1);
      return function() {
        return fn.apply(context, arguments.length === 0 ? args : Array.prototype.concat.apply(arguments, args));
      };
    }
  };
}
if (typeof(Function.prototype.curry) !== 'function') {
  Function.prototype.curry = function() {
    var method = this,
      args = Array.prototype.slice.call(arguments);
    return function() {
      return method.apply(this, args.concat(Array.prototype.slice.call(arguments)));
    };
  };
}
if (typeof(Function.prototype.partial) !== 'function') {
  Function.prototype.partial = function() {
    var method = this,
      args = Array.prototype.slice.call(arguments);
    return function() {
      return method.apply(this, args.concat(Array.prototype.slice.call(arguments)));
    };
  };
}
if (typeof(Function.prototype.bindAsEventListener) !== 'function') {
  Function.prototype.bindAsEventListener = function(object) {
    var method = this;
    return function(event) {
      method.call(object, event || window.event);
    };
  };
}
if (typeof(Function.prototype.contents) !== 'function') {
  Function.prototype.contents = function() {
    return this.toString().match(/^[^\{]*{((.*\n*)*)}/m)[1];
  };
}
if (typeof(Function.prototype.params) !== 'function') {
  Function.prototype.params = function() {
    return this.toString().match(/\((.*?)\)/)[1].match(/\w+/g) || [];
  };
}
if (typeof(Math.uuid) !== 'function') {
  Math.uuid = (function() {
    // Private array of chars to use
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    return function uuid(len, radix) {
      var chars = CHARS,
        uuidArray = [],
        rnd = Math.random;
      radix = radix || chars.length;
      var i;
      if (len) {
        // Compact form
        for (i = 0; i < len; i++) {
          uuidArray[i] = chars[0 | rnd() * radix];
        }
      } else {
        // rfc4122, version 4 form
        var ri = 0,
          r;
        // rfc4122 requires these characters
        uuidArray[8] = uuidArray[13] = uuidArray[18] = uuidArray[23] = '-';
        uuidArray[14] = '4';
        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
          if (!uuidArray[i]) {
            r = 0 | rnd() * 16;
            uuidArray[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
          }
        }
      }
      return uuidArray.join('');
    };
  })();
}
if (typeof(Math.isNumber) !== 'function') {
  Math.isNumber = function(x) {
    if (!x) {
      return false;
    }
    if (typeof x == 'number') {
      return true;
    }
    if (typeof x == 'string') {
      for (var i = 0; i < x.length; ++i) {
        var digit = x.charAt(i);
        var tr = /[0-9]/.test(parseInt(digit, 10));
        if (! (digit === '.' || tr)) {
          return false;
        }
      }
    }
    return true;
  };
}
require = null;
(function() {
  require = function(moduleId) {
    var requiredModule = module.getModule(moduleId);
    if (requiredModule) {
      return requiredModule.getExports();
    } else {
      module.Module(moduleId).setLoader(require('loader').Loader({
        http: require.paths.top(),
        modules: [moduleId]
      }));
    }
  };
  require.paths = [];
  var modules = {};
  var module = {};
  var ready;
  require.ready = function(cb) {
    if(cb) {
      ready = cb;
    } else {
      ready && ready();
    }
  };
  module.getModule = function(mid) {
    return modules[mid];
  };
  module.Module = (function() {
    function Module() {
      // private
      function privateData() {
        this.exports = {};
        this.id = null;
        this.loader = null;
        this.requires = [];
      };
      var p_vars = new privateData();
      var exports = p_vars.exports;
      this.getExports = function getExports() {
        return exports;
      };
      this.setExports = function setExports(e) {
        exports = e;
        return this;
      };
      var id = p_vars.id;
      this.getId = function getId() {
        return id;
      };
      this.setId = function setId(i) {
        id = i;
        return this;
      };
      var loader = p_vars.loader;
      this.getLoader = function getLoader() {
        return loader;
      };
      this.setLoader = function setLoader(l) {
        loader = l;
        return this;
      };
      var requires = p_vars.requires;
      this.getRequires = function getRequires() {
        return requires;
      };
      this.setRequires = function setRequires(r) {
        requires = r;
        return this;
      };
      // privileged
      this.addExport = function(name, value) {
        exports[name] = exports[name] || value;
        return this;
      };
      this.addRequire = function(req) {
        requires.push(req);
        return this;
      };
      this.getExport = function(name) {
        return exports[name];
      };
      // constructor
      var args = Array.prototype.slice.call(arguments);
      arguments.callee.ctor = function() {
        try {
          id = arguments[0];
          modules[id] = this;
        } catch(e) {
          log.Logger.error(this, e);
        }
      };
      return arguments.callee.ctor.apply(this, args) || this;
    };
    return function() {
      var args = Array.prototype.slice.call(arguments);
      return Module.apply({},
      args);
    };
  })();
(function() {
  var nm = module.Module('log');
  (function(require, exports, moduleId) {
    var Singleton = (function() {
      function Singleton() {
        function privateData() {
          this.usingConsole = null;
          this.context = null;
        }
        var p_vars = new privateData();
        var usingConsole = p_vars.usingConsole;
        Object.getOwnPropertyDescriptor(this,'usingConsole') || Object.defineProperty(this,'usingConsole', {get: function(){return usingConsole;},set: function(e){usingConsole=e;}});
        var context = p_vars.context;
        Object.getOwnPropertyDescriptor(this,'context') || Object.defineProperty(this,'context', {get: function(){return context;},set: function(e){context=e;}});
        var ctor = function () {
          this.usingConsole=true;
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      Singleton.prototype['debug'] = function() {
        for(var i=0;i < arguments.length;++i) {
          if(i === 0 && arguments.length > 1) {
            var obj='';
            if(arguments[0].constructor && arguments[0].constructor.name) {
              obj=arguments[0].constructor.name;
            }
            if(arguments.callee.caller.name) {
              obj=obj + '.' + arguments.callee.caller.name;
            }
            this.context=obj;
            continue;
          }
          this.emit(arguments[i]);
        }
        this.context=null;
      };
      Singleton.prototype['disable'] = function(level) {
        if(this[level]) {
          this[level]=function () {};
        }
      };
      Singleton.prototype['emit'] = function(message) {
        var consoleEnabled=this.usingConsole;
        function emitArray(obj,arr) {
          arr.forEach(function (arrItem) {
            var type=typeof((arrItem));
            if(type === 'string') {
              emitString(this,arrItem);
            } else {
              if(type === 'number') {
                emitNumber(this,arrItem);
              }
            }
          },obj);
        }
        function emitBoolean(obj,bool) {
          emitString(obj,bool.toString());
        }
        function emitFunction(obj,func) {
          emitString(obj,func.toString());
        }
        function emitNumber(obj,num) {
          emitString(obj,num.toString());
        }
        function emitProperty(obj,prop,value) {
          emitString(obj,prop);
          obj.emit(value);
        }
        function emitString(obj,str) {
          var infoMessage=obj.context?obj.context + ': ' + unescape(str):unescape(str);
          if(typeof((Titanium)) != 'undefined') {
            Titanium.API.info(infoMessage);
          } else {
            if(consoleEnabled && typeof((console)) != 'undefined') {
              console.log(infoMessage);
            } else {
              if(typeof((sys)) !== 'undefined') {
                sys.puts(infoMessage);
              }
            }
          }
        }
        function emitStackTrace(obj) {
          var caller;
          try {
            caller=arguments.callee.caller.caller.caller;
          } catch(e) {
          }
          var stack='';
          var contextActive=true;
          while(caller) {
            if(contextActive) {
              stack+=this.context;
            } else {
              if(callerName) {
                stack+=caller.name + '\n';
              }
            }
            contextActive=false;
            if(caller === caller.caller) {
              break;
            }
            caller=caller.caller;
          }
          emitString(obj,stack);
        }
        var type=typeof((message));
        if(message instanceof Array) {
          for(var j=0;j < message.length;++j) {
            emitArray(this,message[j]);
          }
        }
        switch(type) {
          case "object":
            for(property in message) {
              try {
                if(message[property] && message.hasOwnProperty(property)) {
                  if(message instanceof Error) {
                    emitString(this,message.name + " " + message.message + "\n" + message.stack);
                  }
                  emitProperty(this,property,message[property]);
                }
              } catch(e) {
                this.error(this,e);
              }
            }
            break;
          case "boolean":
            emitBoolean(this,message);
            break;
          case "string":
            emitString(this,message);
            break;
          case "number":
            emitNumber(this,message);
            break;
          case "function":
            emitFunction(this,message);
            break;
        }
      };
      Singleton.prototype['error'] = function() {
        for(var i=0;i < arguments.length;++i) {
          if(i === 0 && arguments.length > 1) {
            var obj='';
            if(arguments[0].constructor && arguments[0].constructor.name) {
              obj=arguments[0].constructor.name;
            }
            if(arguments.callee.caller.name) {
              obj=obj + '.' + arguments.callee.caller.name;
            }
            this.context=obj;
            continue;
          }
          this.emit(arguments[i]);
        }
        this.context=null;
      };
      Singleton.prototype['warning'] = function() {
        for(var i=0;i < arguments.length;++i) {
          if(i === 0 && arguments.length > 1) {
            var obj='';
            if(arguments[0].constructor && arguments[0].constructor.name) {
              obj=arguments[0].constructor.name;
            }
            if(arguments.callee.caller.name) {
              obj=obj + '.' + arguments.callee.caller.name;
            }
            this.context=obj;
            continue;
          }
          this.emit(arguments[i]);
        }
        this.context=null;
      };
      return function __() {
        return new Singleton(arguments);
      };
    })();
    const Logger=Singleton();
    exports.Logger = Logger;
  })(require, nm.getExports(), nm.getId());
})();

(function() {
  var nm = module.Module('events');
  (function(require, exports, moduleId) {
    var log = require('log');
    var Event = (function() {
      function Event() {
        var ctor = function (_properties) {
          var properties = _properties || {};
          try {
            this.altKey=properties.altKey;
            this.bubbles=properties.bubbles?properties.bubbles:this.doesBubble(properties.type);
            this.button=this.getButton(properties.button);
            this.cancelable=properties.cancelable?properties.cancelable:this.isCancelable(properties.type);
            this.clientX=properties.clientX;
            this.clientY=properties.clientY;
            this.ctrlKey=properties.ctrlKey;
            this.currentTarget=null;
            this.defaultPrevented=false;
            this.detail=properties.detail;
            this.e=properties.e;
            this.eventPhase=Event.CAPTURING_PHASE;
            this.keyCode=properties.keyCode;
            this.metaKey=null;
            this.relatedTarget=properties.fromElement;
            this.screenX=properties.screenX;
            this.screenY=properties.screenY;
            this.shiftKey=properties.shiftKey;
            this.target=properties.srcElement;
            this.timeStamp=new Date().getTime();
            this.type=properties.type;
            this.propagationStopped=false;
            this.cancelableMap={
              load:false,
              unload:false,
              abort:false,
              error:false,
              select:false,
              change:false,
              submit:false,
              reset:true,
              focus:false,
              blur:false,
              resize:false,
              scroll:false
            };
            this.bubblesMap={
              load:false,
              unload:false,
              abort:false,
              error:true,
              select:true,
              change:true,
              submit:true,
              reset:true,
              focus:false,
              blur:false,
              resize:true,
              scroll:true
            };
          } catch(e) {
            log.Logger.error(this,e);
          }
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      Event.prototype['doesBubble'] = function(type) {
        return type && this.bubblesMap[type];
      };
      Event.prototype['isCancelable'] = function(type) {
        return type && this.cancelableMap[type];
      };
      Event.prototype['getButton'] = function(i) {
        switch(i) {
          case 1:
            return 0;
          case 4:
            return 1;
        }
      };
      Event.prototype['initEvent'] = function(type,canBubble,cancelable) {
        this.type=type;
        this.bubbles=canBubble;
        this.cancelable=cancelable;
      };
      Event.prototype['stopPropagation'] = function() {
        this.propagationStopped=true;
      };
      Event.prototype['preventDefault'] = function() {
        if(this.cancelable) {
          this.defaultPrevented=true;
          this.returnValue=false;
        }
      };
      Event.prototype['propagate'] = function(chain,useCapture) {
        for(var i=0;i < chain.length;++i) {
          if(chain[i][this.type]) {
            var l=chain[i][this.type].length;
            for(var j=0;j < l;++j) {
              if(chain[i][this.type][j].useCapture === useCapture) {
                this.currentTarget=chain[i];
                chain[i][this.type][j].fnc.call(chain[i],this);
                if(this.propagationStopped) {
                  return false;
                }
              }
            }
          }
        }
        return true;
      };
      Event.CAPTURING_PHASE = 1;
      Event.AT_TARGET = 2;
      Event.BUBBLING_PHASE = 3;
      return function __() {
        __.CAPTURING_PHASE = Event.CAPTURING_PHASE;
        __.AT_TARGET = Event.AT_TARGET;
        __.BUBBLING_PHASE = Event.BUBBLING_PHASE;
        return new Event(arguments);
      };
    })();
    exports.Event = Event;
    var UIEvent = (function() {
      function UIEvent() {
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.initUIEvent(properties.type,properties.canBubble,properties.cancelable,properties.view,properties.detail);
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      UIEvent.prototype = exports.Event();
      UIEvent.prototype.constructor = UIEvent;
      UIEvent.prototype['initUIEvent'] = function(type,canBubble,cancelable,view,detail) {
        Event.call(this,type,canBubble,cancelable,view,detail);
      };
      return function __() {
        return new UIEvent(arguments);
      };
    })();
    exports.UIEvent = UIEvent;
    var TouchEvent = (function() {
      function TouchEvent() {
        var ctor = function (type,canBubble,cancelable,view,detail,screenX,screenY,clientX,clientY,ctrlKey,altKey,shiftKey,metaKey,touches,targetTouches,changedTouches,scale,rotation) {
          this.changedTouches=[];
          this.rotation=null;
          this.scale=null;
          this.touches=[];
          this.targetTouches=[];
          this.cancelableMap={
            touchstart:true,
            touchmove:true,
            touchcancel:true,
            touchend:true
          };
          this.bubblesMap={
            touchstart:true,
            touchmove:true,
            touchcancel:true,
            touchend:true
          };
          this.initTouchEvent(properties);
          this.touches=properties.touches;
          this.targetTouches=properties.targetTouches;
          this.changedTouches=properties.changedTouches;
          this.scale=properties.scale;
          this.rotation=properties.rotation;
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      TouchEvent.prototype = exports.UIEvent();
      TouchEvent.prototype.constructor = TouchEvent;
      TouchEvent.prototype['initTouchEvent'] = function(properties) {
        UIEvent.call(this,properties);
      };
      return function __() {
        return new TouchEvent(arguments);
      };
    })();
    exports.TouchEvent = TouchEvent;
    var MouseEvent = (function() {
      function MouseEvent() {
        var ctor = function (type,canBubble,cancelable,view,detail,screenX,screenY,clientX,clientY,ctrlKey,altKey,shiftKey,metaKey,button,relatedTarget) {
          this.screenX=null;
          this.screenY=null;
          this.cancelableMap={
            click:true,
            mousedown:true,
            mouseup:true,
            mouseover:true,
            mousemove:true,
            mouseout:true
          };
          this.bubblesMap={
            click:true,
            mousedown:true,
            mouseup:true,
            mouseover:true,
            mousemove:true,
            mouseout:true
          };
          Event.call(this,type,canBubble,cancelable,view,detail,screenX,screenY,clientX,clientY,ctrlKey,altKey,shiftKey,metaKey,button,relatedTarget);
          this.initMouseEvent(type,canBubble,cancelable,view,detail,screenX,screenY,clientX,clientY,ctrlKey,altKey,shiftKey,metaKey,button,relatedTarget);
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      MouseEvent.prototype = exports.Event();
      MouseEvent.prototype.constructor = MouseEvent;
      MouseEvent.prototype['initMouseEvent'] = function(type,canBubble,cancelable,view,detail,screenX,screenY,clientX,clientY,ctrlKey,altKey,shiftKey,metaKey,button,relatedTarget) {
        this.type=type;
        this.bubbles=canBubble;
        this.cancelable=cancelable;
        this.view=view;
        this.detail=null;
        this.screenX=screenX;
        this.screenY=screenY;
        this.clientX=clientX;
        this.clientY=clientY;
        this.ctrlKey=ctrlKey;
        this.altKey=altKey;
        this.shiftKey=shiftKey;
        this.metaKey=null;
        this.button=button;
        this.relatedTarget=relatedTarget;
      };
      return function __() {
        return new MouseEvent(arguments);
      };
    })();
    exports.MouseEvent = MouseEvent;
    var CustomEvent = (function() {
      function CustomEvent() {
        var ctor = function (_properties) {
          var properties = _properties || {
            type:'customevent'
          };
          this.initCustomEvent(properties);
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      CustomEvent.prototype = exports.Event();
      CustomEvent.prototype.constructor = CustomEvent;
      CustomEvent.prototype['initCustomEvent'] = function(properties) {
        Event.call(this,properties);
      };
      return function __() {
        return new CustomEvent(arguments);
      };
    })();
    exports.CustomEvent = CustomEvent;
    var MessageEvent = (function() {
      function MessageEvent() {
        var ctor = function (_p) {
          var p = _p || {
            type:'message'
          };
          this.initMessageEvent('message',p.bubbles,p.cancelable,p.data,p.origin,p.lastEventId,p.source,p.ports);
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      MessageEvent.prototype = exports.Event();
      MessageEvent.prototype.constructor = MessageEvent;
      MessageEvent.prototype['initMessageEvent'] = function(type,bubbles,cancelable,data,origin,lastEventId,source,ports) {
        Event.call(this,type,bubbles,cancelable);
        this.data=data;
        if(location) {
          this.origin=location.protocol + '//' + location.host + (location.port?':' + location.port:'');
        } else {
          this.origin=origin;
        }
        this.lastEventId=lastEventId || 0;
        this.ports=ports;
        this.source=source;
      };
      return function __() {
        return new MessageEvent(arguments);
      };
    })();
    exports.MessageEvent = MessageEvent;
    var PutResourceRequest = (function() {
      function PutResourceRequest() {
        var ctor = function (_properties) {
          var properties = _properties || {
            type:'putresourcerequest'
          };
          this.path=properties.path;
          this.cssTypes=properties.cssTypes || [];
          this.imgTypes=properties.imgTypes || [];
          this.jsTypes=properties.jsTypes || [];
          this.txtTypes=properties.txtTypes || [];
          this.xmlTypes=properties.xmlTypes || [];
          this.type=properties.type || 'putresourcerequest';
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      return function __() {
        return new PutResourceRequest(arguments);
      };
    })();
    exports.PutResourceRequest = PutResourceRequest;
    var PutResourceResponse = (function() {
      function PutResourceResponse() {
        var ctor = function (_properties) {
          var properties = _properties || {
            type:'putresourceresponse'
          };
          this.path=properties.path;
          this.cssTypes=properties.cssTypes || [];
          this.imgTypes=properties.imgTypes || [];
          this.jsTypes=properties.jsTypes || [];
          this.txtTypes=properties.txtTypes || [];
          this.xmlTypes=properties.xmlTypes || [];
          this.type=properties.type || 'putresourceresponse';
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      return function __() {
        return new PutResourceResponse(arguments);
      };
    })();
    exports.PutResourceResponse = PutResourceResponse;
    var ResourceRequest = (function() {
      function ResourceRequest() {
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.exclude=properties.exclude;
          this.path=properties.path;
          this.cssTypes=properties.cssTypes || [];
          this.imgTypes=properties.imgTypes || [];
          this.jsTypes=properties.jsTypes || [];
          this.specTypes=properties.specTypes || [];
          this.txtTypes=properties.txtTypes || [];
          this.xmlTypes=properties.xmlTypes || [];
          this.type=properties.type || 'resourcerequest';
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      return function __() {
        return new ResourceRequest(arguments);
      };
    })();
    exports.ResourceRequest = ResourceRequest;
    var ResourceResponse = (function() {
      function ResourceResponse() {
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.exclude=properties.exclude;
          this.path=properties.path;
          this.cssTypes=properties.cssTypes || [];
          this.imgTypes=properties.imgTypes || [];
          this.jsTypes=properties.jsTypes || [];
          this.specTypes=properties.specTypes || [];
          this.txtTypes=properties.txtTypes || [];
          this.xmlTypes=properties.xmlTypes || [];
          this.type=properties.type || 'resourceresponse';
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      return function __() {
        return new ResourceResponse(arguments);
      };
    })();
    exports.ResourceResponse = ResourceResponse;
    var DataItem = (function() {
      function DataItem() {
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.id=Math.uuid(8);
          this.name=properties.name;
          this.module=properties.module;
          this.value=properties.value;
          this.count=properties.count;
          this.range=properties.range;
          this.since=properties.since;
          this.before=properties.before;
          this.sort=properties.sort;
          this.type='dataitem';
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      return function __() {
        return new DataItem(arguments);
      };
    })();
    exports.DataItem = DataItem;
    var DataItem = (function() {
      function DataItem() {
        var ctor = function (_properties) {
          var properties = _properties || {};
          try {
            this.cookie=properties.cookie || ((typeof((document)) !== 'undefined') && document.cookie);
            this.data=properties.data;
            this.ip=properties.ip;
            this.session=properties.session || (this.cookie && this.cookie.split('=')[1]);
            if(typeof(navigator) !== 'undefined') {
              this.userAgent=navigator && navigator.userAgent;
            } else {
              this.userAgent=properties.userAgent;
            }
            this.type='dataitem';
          } catch(e) {
            log.Logger.error(this,e);
          }
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      return function __() {
        return new DataItem(arguments);
      };
    })();
    exports.DataItem = DataItem;
    var DataResponse = (function() {
      function DataResponse() {
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.data=properties.data;
          this.session=properties.session;
          this.type='dataresponse';
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      return function __() {
        return new DataResponse(arguments);
      };
    })();
    exports.DataResponse = DataResponse;
    var ListRequest = (function() {
      function ListRequest() {
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.exclude=properties.exclude;
          this.path=properties.path;
          this.names=properties.names || [];
          this.type='listrequest';
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      return function __() {
        return new ListRequest(arguments);
      };
    })();
    exports.ListRequest = ListRequest;
    var ListResponse = (function() {
      function ListResponse() {
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.names=properties.names || [];
          this.type='listresponse';
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      return function __() {
        return new ListResponse(arguments);
      };
    })();
    exports.ListResponse = ListResponse;
    var InstallRequest = (function() {
      function InstallRequest() {
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.jsHandlers=properties.jsHandlers || [];
          this.type='installrequest';
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      return function __() {
        return new InstallRequest(arguments);
      };
    })();
    exports.InstallRequest = InstallRequest;
    var InstallResponse = (function() {
      function InstallResponse() {
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.jsHandlers=properties.jsHandlers || [];
          this.type='installresponse';
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      return function __() {
        return new InstallResponse(arguments);
      };
    })();
    exports.InstallResponse = InstallResponse;
    var PutDataRequest = (function() {
      function PutDataRequest() {
        var ctor = function (_properties) {
          var properties = _properties || {};
          try {
            this.cookie=properties.cookie || ((typeof((document)) !== 'undefined') && document.cookie);
            this.data=properties.data;
            this.ip=properties.ip;
            this.session=properties.session || (this.cookie && this.cookie.split('=')[1]);
            if(typeof(navigator) !== 'undefined') {
              this.userAgent=navigator && navigator.userAgent;
            } else {
              this.userAgent=properties.userAgent;
            }
            this.type='putdatarequest';
          } catch(e) {
            log.Logger.error(this,e);
          }
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      return function __() {
        return new PutDataRequest(arguments);
      };
    })();
    exports.PutDataRequest = PutDataRequest;
  })(require, nm.getExports(), nm.getId());
})();

(function() {
  var nm = module.Module('event');
  (function(require, exports, moduleId) {
    var log = require('log');
    var events = require('events');
    var EventInfo = (function() {
      function EventInfo() {
        function privateData() {
          this.type = null;
          this.functor = null;
          this.instance = null;
          this.subscribers = null;
        }
        var p_vars = new privateData();
        var type = p_vars.type;
        Object.getOwnPropertyDescriptor(this,'type') || Object.defineProperty(this,'type', {get: function(){return type;},set: function(e){type=e;}});
        var functor = p_vars.functor;
        Object.getOwnPropertyDescriptor(this,'functor') || Object.defineProperty(this,'functor', {get: function(){return functor;},set: function(e){functor=e;}});
        var instance = p_vars.instance;
        Object.getOwnPropertyDescriptor(this,'instance') || Object.defineProperty(this,'instance', {get: function(){return instance;},set: function(e){instance=e;}});
        var subscribers = p_vars.subscribers;
        Object.getOwnPropertyDescriptor(this,'subscribers') || Object.defineProperty(this,'subscribers', {get: function(){return subscribers;},set: function(e){subscribers=e;}});
        var ctor = function (_properties) {
          var properties = _properties || {
            type:null,
            functor:null,
            instance:null,
            subscribers:[]
          };
          try {
            this.type=properties.type;
            this.functor=properties.functor;
            this.instance=properties.instance;
            this.subscribers=properties.subscribers || [];
          } catch(e) {
            log.Logger.error(this,e);
          }
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      return function __() {
        return new EventInfo(arguments);
      };
    })();
    exports.EventInfo = EventInfo;
    var EventType = (function() {
      function EventType() {
        function privateData() {
          this.eventMap = null;
          this.eventNameToEventClassNameMap = null;
        }
        var p_vars = new privateData();
        var eventMap = p_vars.eventMap;
        Object.getOwnPropertyDescriptor(this,'eventMap') || Object.defineProperty(this,'eventMap', {get: function(){return eventMap;},set: function(e){eventMap=e;}});
        var eventNameToEventClassNameMap = p_vars.eventNameToEventClassNameMap;
        Object.getOwnPropertyDescriptor(this,'eventNameToEventClassNameMap') || Object.defineProperty(this,'eventNameToEventClassNameMap', {get: function(){return eventNameToEventClassNameMap;},set: function(e){eventNameToEventClassNameMap=e;}});
        var ctor = function () {
          try {
            this.eventMap={};
            this.eventNameToEventClassNameMap={};
            if(typeof(document) != 'undefined') {
              if(document.all) {
                var l=document.all && document.all.length;
                for(var i=0;i < l;++i) {
                  if(document.all[i].tagName.toLowerCase() == 'style') {
                    continue;
                  }
                  this.addEventListenerMethods(document.all[i]);
                }
                this.addEventListenerMethods(window);
                this.addEventListenerMethods(document);
                if(document.createEventObject) {
                  document.createElement=this.createElement.bind(this);
                  document.createEvent=this.createEvent.bind(this);
                }
              }
            }
            this.rebuild();
          } catch(e) {
            log.Logger.error(this,e);
          }
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      EventType.prototype['addSubscriber'] = function() {
        if(typeof((arguments[0])) === 'string' && arguments[0].charAt(0) === '/') {
          this.addSubscriberToChannel.apply(this,arguments);
        } else {
          this.addSubscriberToEvent.apply(this,arguments);
        }
      };
      EventType.prototype['addSubscriberToEvent'] = function(type,callback,useCapture,element) {
        if(typeof((useCapture)) === 'undefined') {
          useCapture=true;
        }
        (element || window).addEventListener(type,callback,useCapture);
        return true;
      };
      EventType.prototype['addSubscriberToChannel'] = function(type,callback) {
        try {
          var eventInfo=this.eventMap[type];
          if(eventInfo) {
            for(var i=0;i < eventInfo.subscribers.length;++i) {
              var subscriber=eventInfo.subscribers[i];
              if(callback === subscriber) {
                log.Logger.error(this,'Subscriber already registered for ' + type);
                return;
              }
            }
            eventInfo.subscribers.push(callback);
          } else {
            this.addSubscriberToChannel(type,callback);
          }
        } catch(e) {
          log.Logger.error(this,e);
        }
      };
      EventType.prototype['bind'] = function(obj,fnc,ele) {
        var object=obj;
        var method=fnc;
        var element=ele;
        return function (e) {
          if(!!element) {
            method.apply(object,[e,element]);
          } else {
            method.call(object,e);
          }
        };
      };
      EventType.prototype['createEvent'] = function(type) {
        var event=document.createEventObject();
        event.infType=type;
        event.initEvent=events.Event(event).initEvent;
        return event;
      };
      EventType.prototype['createElement'] = function(tagName) {
        var element=create(tagName);
        return tagName.toLowerCase() == 'style'?element:this.addEventListenerMethods(element);
      };
      EventType.prototype['addEventListenerMethods'] = function(element) {
        var eventListenerClosure=function (ele,tagName,name) {
          var element=ele;
          var type=tagName;
          if(!element.listeners) {
            element.listeners={};
          }
          var add=function (type,fnc,useCapture) {
            if(!element.listeners[type]) {
              element.listeners[type]=[];
            }
            element.listeners[type].push({
              element:element,
              fnc:fnc,
              useCapture:useCapture
            });
            var onEvent=function () {
              window.event.cancelBubble=true;
              var lEvent=window.event;
              var lType=lEvent.type;
              var eventConstructor=this.eventNameToEventClassNameMap[lType];
              if(!eventConstructor) {
                this.rebuild();
                eventConstructor=this.eventNameToEventClassNameMap[lType];
              }
              if(!eventConstructor) {
                log.Logger.error(this,'unknown event type ' + lType);
              }
              var e=eventConstructor(window.event);
              var aCap=[];
              var aBub=[];
              var eleS=element.parentNode;
              while(eleS) {
                if(eleS['on' + e.type]) {
                  aCap.push(eleS);
                }
                eleS=eleS.parentNode;
              }
              aCap.reverse();
              if(!e.propagate(aCap,true)) {
                return false;
              }
              e.eventPhase=e.AT_TARGET;
              if(element.listeners[e.type]) {
                var l=element.listeners[e.type].length;
                for(var i=0;i < l;++i) {
                  e.currentTarget=element;
                  var listenersCallback=element.listeners[e.type][i];
                  listenersCallback.fnc(e);
                  if(e.propagationStopped) {
                    return false;
                  }
                  if(!element.listeners[e.type]) {
                    break;
                  } else {
                    if(l > element.listeners[e.type].length) {
                      l=element.listeners[e.type].length;
                      --i;
                    }
                  }
                }
              }
              if(e.bubbles) {
                var eleB=element.parentNode;
                while(eleB) {
                  if(eleB['on' + e.type]) {
                    aBub.push(n);
                  }
                  eleB=eleB.parentNode;
                }
                e.eventPhase=e.BUBBLING_PHASE;
                if(!e.propagate(aBub,false)) {
                  return false;
                }
              }
              return true;
            };
            element['on' + type]=element['on' + type] || onEvent;
          };
          var remove=function (type,fnc,useCapture) {
            if(element.listeners[type]) {
              for(var i=0;i < element.listeners[type].length;++i) {
                var listenerCallback=element.listeners[type][i];
                if(listenerCallback.fnc == fnc && listenerCallback.element == element) {
                  for(var j=i;j < element.listeners[type].length - 1;++j) {
                    element.listeners[type][j]=element.listeners[type][j + 1];
                  }
                }
                --element.listeners[type].length;
                if(!element.listeners[type].length) {
                  element.listeners[type]=null;
                }
                break;
              }
            }
          };
          var dispatch=function (e) {
            element.fireEvent('on' + e.type,e);
            return e.returnValue === false?false:true;
          };
          if(name == 'add') {
            return add;
          } else {
            if(name == 'remove') {
              return remove;
            } else {
              if(name == 'dispatch') {
                return dispatch;
              }
            }
          }
        };
        element.addEventListener=eventListenerClosure(element,element.tagName,'add');
        element.removeEventListener=eventListenerClosure(element,element.tagName,'remove');
        element.dispatchEvent=eventListenerClosure(element,element.tagName,'dispatch');
        return element;
      };
      EventType.prototype['fireEvent'] = function(element,type,name) {
        if(document.createEvent) {
          var event=document.createEvent(type);
          this.initEvent(type,name,event);
          element.dispatchEvent(event);
        } else {
          if(document.createEventObject) {
            element.fireEvent("on" + name);
          }
        }
      };
      EventType.prototype['getEvent'] = function(type) {
        return this.eventMap[type] && this.eventMap[type].functor;
      };
      EventType.prototype['getEvents'] = function() {
        return this.eventNameToEventClassNameMap;
      };
      EventType.prototype['getSubscribers'] = function(type) {
        return this.eventMap[type] && this.eventMap[type].subscribers;
      };
      EventType.prototype['initEvent'] = function(type,name,event) {
        event.type=name;
        if(type == 'Event') {
        } else {
          if(type === 'MouseEvent') {
          } else {
            if(type === 'KeyboardEvent') {
            } else {
              if(type === 'TouchEvent') {
              } else {
                if(type === 'WebKitTransitionEvent') {
                } else {
                  if(type === 'UIEvent') {
                  } else {
                    if(type === 'CustomEvent') {
                    } else {
                      if(type === 'MutationEvent') {
                      } else {
                        if(type === 'MessageEvent') {
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
      EventType.prototype['isCustomEvent'] = function(type) {
        if(typeof((this.eventNameToEventClassNameMap[type])) !== 'undefined') {
          return false;
        }
        return true;
      };
      EventType.prototype['rebuild'] = function() {
        try {
          for(eventName in events) {
            var eventType=events[eventName];
            if(eventName === 'Event') {
              this.eventNameToEventClassNameMap.load=eventType;
              this.eventNameToEventClassNameMap.unload=eventType;
              this.eventNameToEventClassNameMap.abort=eventType;
              this.eventNameToEventClassNameMap.error=eventType;
              this.eventNameToEventClassNameMap.select=eventType;
              this.eventNameToEventClassNameMap.change=eventType;
              this.eventNameToEventClassNameMap.submit=eventType;
              this.eventNameToEventClassNameMap.reset=eventType;
              this.eventNameToEventClassNameMap.focus=eventType;
              this.eventNameToEventClassNameMap.blur=eventType;
              this.eventNameToEventClassNameMap.resize=eventType;
              this.eventNameToEventClassNameMap.scroll=eventType;
            } else {
              if(eventName === 'MouseEvent') {
                this.eventNameToEventClassNameMap.click=eventType;
                this.eventNameToEventClassNameMap.dblclick=eventType;
                this.eventNameToEventClassNameMap.mousedown=eventType;
                this.eventNameToEventClassNameMap.mouseup=eventType;
                this.eventNameToEventClassNameMap.mouseover=eventType;
                this.eventNameToEventClassNameMap.mousemove=eventType;
                this.eventNameToEventClassNameMap.mouseout=eventType;
              } else {
                if(eventName === 'DragEvent') {
                  this.eventNameToEventClassNameMap.dragstart=eventType;
                  this.eventNameToEventClassNameMap.drag=eventType;
                  this.eventNameToEventClassNameMap.dragenter=eventType;
                  this.eventNameToEventClassNameMap.dragleave=eventType;
                  this.eventNameToEventClassNameMap.dragover=eventType;
                  this.eventNameToEventClassNameMap.drop=eventType;
                  this.eventNameToEventClassNameMap.dragend=eventType;
                } else {
                  if(eventName === 'KeyboardEvent') {
                    this.eventNameToEventClassNameMap.keypress=eventType;
                    this.eventNameToEventClassNameMap.keydown=eventType;
                    this.eventNameToEventClassNameMap.keyup=eventType;
                  } else {
                    if(eventName === 'MutationEvent') {
                      this.eventNameToEventClassNameMap.DOMNodeInsertedIntoDocument=eventType;
                      this.eventNameToEventClassNameMap.DOMSubtreeModified=eventType;
                      this.eventNameToEventClassNameMap.DOMNodeInserted=eventType;
                      this.eventNameToEventClassNameMap.DOMNodeRemoved=eventType;
                      this.eventNameToEventClassNameMap.DOMNodeRemovedFromDocument=eventType;
                      this.eventNameToEventClassNameMap.DOMAttrModified=eventType;
                      this.eventNameToEventClassNameMap.DOMCharacterDataModified=eventType;
                    } else {
                      if(eventName === 'UIEvent') {
                        this.eventNameToEventClassNameMap.DOMFocusIn=eventType;
                        this.eventNameToEventClassNameMap.DOMFocusOut=eventType;
                        this.eventNameToEventClassNameMap.DOMActivate=eventType;
                      } else {
                        if(eventName === 'WebKitTransitionEvent') {
                          this.eventNameToEventClassNameMap.webKitTransitionEnd=eventType;
                        } else {
                          if(eventName === 'TouchEvent') {
                            this.eventNameToEventClassNameMap.touchstart=eventType;
                            this.eventNameToEventClassNameMap.touchmove=eventType;
                            this.eventNameToEventClassNameMap.touchend=eventType;
                            this.eventNameToEventClassNameMap.touchcancel=eventType;
                          } else {
                            if(eventName === 'MessageEvent') {
                              this.eventNameToEventClassNameMap.message=eventType;
                            } else {
                              if(eventName === 'ConnectedMessage') {
                                this.eventNameToEventClassNameMap['connected']=eventType;
                                this.register('connected',eventType);
                              } else {
                                if(eventName === 'PutResourceRequest') {
                                  this.eventNameToEventClassNameMap['putresourcerequest']=eventType;
                                  this.register('putresourcerequest',eventType);
                                } else {
                                  if(eventName === 'PutResourceResponse') {
                                    this.eventNameToEventClassNameMap['putresourceresponse']=eventType;
                                    this.register('putresourceresponse',eventType);
                                  } else {
                                    if(eventName === 'DataRequest') {
                                      this.eventNameToEventClassNameMap['datarequest']=eventType;
                                      this.register('datarequest',eventType);
                                    } else {
                                      if(eventName === 'PutDataRequest') {
                                        this.eventNameToEventClassNameMap['putdatarequest']=eventType;
                                        this.register('putdatarequest',eventType);
                                      } else {
                                        if(eventName === 'DataResponse') {
                                          this.eventNameToEventClassNameMap['dataresponse']=eventType;
                                          this.register('dataresponse',eventType);
                                        } else {
                                          if(eventName === 'ResourceRequest') {
                                            this.eventNameToEventClassNameMap['resourcerequest']=eventType;
                                            this.register('resourcerequest',eventType);
                                          } else {
                                            if(eventName === 'ResourceResponse') {
                                              this.eventNameToEventClassNameMap['resourceresponse']=eventType;
                                              this.register('resourceresponse',eventType);
                                            } else {
                                              if(eventName === 'ListRequest') {
                                                this.eventNameToEventClassNameMap['listrequest']=eventType;
                                                this.register('listrequest',eventType);
                                              } else {
                                                if(eventName === 'ListResponse') {
                                                  this.eventNameToEventClassNameMap['listresponse']=eventType;
                                                  this.register('listresponse',eventType);
                                                } else {
                                                  if(eventName === 'InstallRequest') {
                                                    this.eventNameToEventClassNameMap['installrequest']=eventType;
                                                    this.register('installrequest',eventType);
                                                  } else {
                                                    if(eventName === 'InstallResponse') {
                                                      this.eventNameToEventClassNameMap['installresponse']=eventType;
                                                      this.register('installresponse',eventType);
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } catch(e) {
          log.Logger.error(this,e);
        }
      };
      EventType.prototype['register'] = function(type,eventType) {
        try {
          if(!this.eventMap[type]) {
            this.eventMap[type]=EventInfo({
              type:type,
              functor:eventType
            });
          }
        } catch(e) {
          log.Logger.error(this,e);
        }
      };
      EventType.prototype['removeSubscriber'] = function() {
        if(typeof((arguments[0])) == 'string' && arguments[0].charAt(0) == '/') {
          this.removeSubscriberFromChannel.apply(this,arguments);
        } else {
          this.removeSubscriberFromEvent.apply(this,arguments);
        }
      };
      EventType.prototype['removeSubscriberFromEvent'] = function(type,callback,useCapture,element) {
        (element || window).removeEventListener(type,callback,useCapture);
        return true;
      };
      EventType.prototype['removeSubscriberFromChannel'] = function(type,callback) {
        var eventInfo=this.eventMap[type];
        if(eventInfo) {
          var newSubscribers=[];
          var found=false;
          for(var i=0;i < eventInfo.subscribers.length;++i) {
            var subscriber=eventInfo.subscribers[i];
            if(subscriber == callback) {
              found=true;
              continue;
            }
            newSubscribers.push(subscriber);
          }
          if(found) {
            eventInfo.subscribers=newSubscribers;
          } else {
            log.Logger.error(this,'could not unbind');
          }
        }
      };
      EventType.prototype['validate'] = function(message) {
        var instance;
        var eventInfo=this.eventMap[message.type];
        if(!eventInfo) {
          this.rebuild();
          eventInfo=this.eventMap[message.type];
        }
        if(eventInfo && eventInfo.functor) {
          instance=eventInfo.functor(message);
        }
        return instance;
      };
      return function __() {
        return new EventType(arguments);
      };
    })();
    ;//empty
    const Event=EventType();
    exports.Event = Event;
    var Publisher = (function() {
      function Publisher() {
        function privateData() {
          this.pubDepth = null;
          this.cleanupArray = null;
          this.subscriber = null;
        }
        var p_vars = new privateData();
        var pubDepth = p_vars.pubDepth;
        Object.getOwnPropertyDescriptor(this,'pubDepth') || Object.defineProperty(this,'pubDepth', {get: function(){return pubDepth;},set: function(e){pubDepth=e;}});
        var cleanupArray = p_vars.cleanupArray;
        Object.getOwnPropertyDescriptor(this,'cleanupArray') || Object.defineProperty(this,'cleanupArray', {get: function(){return cleanupArray;},set: function(e){cleanupArray=e;}});
        var subscriber = p_vars.subscriber;
        Object.getOwnPropertyDescriptor(this,'subscriber') || Object.defineProperty(this,'subscriber', {get: function(){return subscriber;},set: function(e){subscriber=e;}});
        var ctor = function (_properties) {
          var properties = _properties || {
            ast:null,
            transpiler:null
          };
          this.pubDepth=0;
          this.cleanupArray=[];
          this.subscriber=[];
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      Publisher.prototype['cleanup'] = function(index) {
        return index?this.cleanupArray[index]:this.cleanupArray;
      };
      Publisher.prototype['dispose'] = function() {
        this.cleanupArray=[];
      };
      Publisher.prototype['doPublish'] = function(tree,path,index,name,msg) {
        if(typeof(tree) != "undefined") {
          var node;
          if(index == path.length) {
            node=tree;
          } else {
            this.doPublish(tree.c[path[index]],path,index + 1,name,msg);
            this.doPublish(tree.c["*"],path,index + 1,name,msg);
            node=tree.c["**"];
          }
          if(typeof(node) != "undefined") {
            var callbacks=node.s;
            var max=callbacks.length;
            for(var i=0;i < max;++i) {
              if(callbacks[i].cb) {
                var sc=callbacks[i].scope;
                var cb=callbacks[i].cb;
                var fcb=callbacks[i].fcb;
                var d=callbacks[i].data;
                if(typeof((cb)) == "string") {
                  cb=sc[cb];
                }
                if(typeof((fcb)) == "string") {
                  fcb=sc[fcb];
                }
                if((!fcb) || (fcb.call(sc,msg,d))) {
                  cb.call(sc,msg,d);
                }
              }
            }
          }
        }
      };
      Publisher.prototype['pubDepth'] = function(value) {
        this.pubDepth+=value?value:0;
        return this.pubDepth;
      };
      Publisher.prototype['publish'] = function(name,message) {
        var path=name.split(".");
        this.pubDepth(1);
        this.doPublish(Subscriber.subscriptions,path,0,name,message);
        this.pubDepth(-1);
        if((this.cleanup().length > 0) && (this.pubDepth() === 0)) {
          for(var i=0;i < this.cleanup().length;++i) {
            Subscriber.unsubscribe(this.cleanup(i).hdl);
          }
          this.dispose();
        }
      };
      return function __() {
        return new Publisher(arguments);
      };
    })();
    exports.Publisher = Publisher;
    var SubscriberType = (function() {
      function SubscriberType() {
        function privateData() {
          this.subIndex = null;
          this.subscriptions = null;
        }
        var p_vars = new privateData();
        var subIndex = p_vars.subIndex;
        Object.getOwnPropertyDescriptor(this,'subIndex') || Object.defineProperty(this,'subIndex', {get: function(){return subIndex;},set: function(e){subIndex=e;}});
        var subscriptions = p_vars.subscriptions;
        Object.getOwnPropertyDescriptor(this,'subscriptions') || Object.defineProperty(this,'subscriptions', {get: function(){return subscriptions;},set: function(e){subscriptions=e;}});
        var ctor = function (_properties) {
          var properties = _properties || {
            ast:null,
            transpiler:null
          };
          this.subIndex=0;
          this.subscriptions={
            c:{},
            s:[]
          };
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      SubscriberType.prototype['subscribe'] = function(name,callback,scope,subscriberData,filter) {
        var handle=name + "." + this.subIndex;
        var sub={
          scope:scope,
          cb:callback,
          fcb:filter,
          data:subscriberData,
          sid:++this.subIndex,
          hdl:handle
        };
        var path=name.split(".");
        this.doSubscribe(this.subscriptions,path,0,sub);
        return handle;
      };
      SubscriberType.prototype['unsubscribe'] = function(sub) {
        var path=sub.split(".");
        var sid=path.pop();
        this.doUnsubscribe(this.subscriptions,path,0,sid);
      };
      SubscriberType.prototype['doSubscribe'] = function(tree,path,index,sub) {
        var token=path[index];
        if(index == path.length) {
          tree.s.push(sub);
        } else {
          if(typeof(tree.c) === 'undefined') {
            tree.c={};
          }
          if(typeof(tree.c[token]) === 'undefined') {
            tree.c[token]={
              c:{},
              s:[]
            };
            this.doSubscribe(tree.c[token],path,index + 1,sub);
          } else {
            this.doSubscribe(tree.c[token],path,index + 1,sub);
          }
        }
      };
      SubscriberType.prototype['doUnsubscribe'] = function(tree,path,index,sid) {
        if(typeof(tree) != "undefined") {
          if(index < path.length) {
            var childNode=tree.c[path[index]];
            this.doUnsubscribe(childNode,path,index + 1,sid);
            if(childNode.s.length === 0) {
              for(x in childNode.c) {
                return;
              }
              deletetree.c[path[index]];
            }
            return;
          } else {
            var callbacks=tree.s;
            var max=callbacks.length;
            for(var i=0;i < max;++i) {
              if(sid == callbacks[i].sid) {
                if(this.m_pubDepth > 0) {
                  callbacks[i].cb=null;
                  this.m_cleanup.push(callbacks[i]);
                } else {
                  callbacks.splice(i,1);
                }
                return;
              }
            }
          }
        }
      };
      return function __() {
        return new SubscriberType(arguments);
      };
    })();
    const Subscriber=SubscriberType();
    exports.Subscriber = Subscriber;
  })(require, nm.getExports(), nm.getId());
})();

(function() {
  var nm = module.Module('controller');
  (function(require, exports, moduleId) {
    var log = require('log');
    var event = require('event');
    var events = require('events');
    var ControllerType = (function() {
      function ControllerType() {
        function privateData() {
          this.dispatcher = null;
          this.images = null;
          this.javascripts = null;
          this.lastRequest = null;
          this.reconnect = null;
          this.texts = null;
          this.wsLocation = null;
          this.wsEnabled = null;
          this.xmls = null;
        }
        var p_vars = new privateData();
        var dispatcher = p_vars.dispatcher;
        Object.getOwnPropertyDescriptor(this,'dispatcher') || Object.defineProperty(this,'dispatcher', {get: function(){return dispatcher;},set: function(e){dispatcher=e;}});
        var images = p_vars.images;
        Object.getOwnPropertyDescriptor(this,'images') || Object.defineProperty(this,'images', {get: function(){return images;},set: function(e){images=e;}});
        var javascripts = p_vars.javascripts;
        Object.getOwnPropertyDescriptor(this,'javascripts') || Object.defineProperty(this,'javascripts', {get: function(){return javascripts;},set: function(e){javascripts=e;}});
        var lastRequest = p_vars.lastRequest;
        Object.getOwnPropertyDescriptor(this,'lastRequest') || Object.defineProperty(this,'lastRequest', {get: function(){return lastRequest;},set: function(e){lastRequest=e;}});
        var reconnect = p_vars.reconnect;
        Object.getOwnPropertyDescriptor(this,'reconnect') || Object.defineProperty(this,'reconnect', {get: function(){return reconnect;},set: function(e){reconnect=e;}});
        var texts = p_vars.texts;
        Object.getOwnPropertyDescriptor(this,'texts') || Object.defineProperty(this,'texts', {get: function(){return texts;},set: function(e){texts=e;}});
        var wsLocation = p_vars.wsLocation;
        Object.getOwnPropertyDescriptor(this,'wsLocation') || Object.defineProperty(this,'wsLocation', {get: function(){return wsLocation;},set: function(e){wsLocation=e;}});
        var wsEnabled = p_vars.wsEnabled;
        Object.getOwnPropertyDescriptor(this,'wsEnabled') || Object.defineProperty(this,'wsEnabled', {get: function(){return wsEnabled;},set: function(e){wsEnabled=e;}});
        var xmls = p_vars.xmls;
        Object.getOwnPropertyDescriptor(this,'xmls') || Object.defineProperty(this,'xmls', {get: function(){return xmls;},set: function(e){xmls=e;}});
        var ctor = function () {
          this.images={};
          this.javascripts={};
          this.texts={};
          this.wsEnabled=false;
          this.xmls={};
          try {
            this.subscribe("dataresponse",this.ondataresponse.bind(this));
            this.subscribe("resourceresponse",this.onresourceresponse.bind(this));
            this.subscribe('jsonparseerror',this.onservererror.bind(this));
          } catch(e) {
            log.Logger.error(this,e);
          }
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      ControllerType.prototype['connect'] = function(properties) {
        try {
          this.wsLocation=properties.location;
          this.dispatcher=typeof((MozWebSocket)) != 'undefined'?new MozWebSocket(this.wsLocation):new WebSocket(this.wsLocation);
          this.dispatcher.onopen=this.onopen.bind(this);
          this.dispatcher.onmessage=this.onmessage.bind(this);
          this.dispatcher.onclose=this.onclose.bind(this);
        } catch(e) {
          log.Logger.error(this,e);
        }
        return this;
      };
      ControllerType.prototype['publish'] = function(message) {
        try {
          if(message.constructor === events.CustomEvent.constructor) {
            event.Publisher.publish(message.type,message);
          } else {
            if(message.type) {
              var jsonMessage=JSON.stringify(message);
              (function dispatch() {
                try {
                  if(Controller.dispatcher && Controller.wsEnabled) {
                    Controller.lastRequest=message;
                    Controller.dispatcher.send(jsonMessage);
                  } else {
                    setTimeout(dispatch,100);
                  }
                } catch(e) {
                  log.Logger.error(this,e);
                }
              })();
            } else {
              log.Logger.error(this,'publish failed for  ' + message.type);
            }
          }
        } catch(e) {
          log.Logger.error(this,'publish: caught exception: ' + e.message);
        }
      };
      ControllerType.prototype['receive'] = function(json) {
        try {
          var message=JSON.parse(json);
          var valid=event.Event.validate(message);
          if(typeof((valid)) !== 'undefined') {
            var subscribers=event.Event.getSubscribers(valid.type);
            if(subscribers && subscribers.length > 0) {
              for(var i=0;i < subscribers.length;++i) {
                try {
                  var subscriber=subscribers[i];
                  subscriber(valid);
                } catch(e) {
                  log.Logger.error('receive: caught exception: ' + e.message);
                }
              }
            } else {
              log.Logger.error(this,'No subscriber for ' + message.type);
            }
          } else {
            log.Logger.error(this,'No event registered for ' + message.type);
          }
        } catch(e) {
          log.Logger.error(this,'receive: caught exception: ' + e.message);
        }
      };
      ControllerType.prototype['subscribe'] = function() {
        var type=arguments[0];
        var callback=arguments[1];
        if(event.Event.isCustomEvent(type)) {
          var scope=null;
          var subscriberData=arguments.length > 2?arguments[2]:null;
          var filter;
          if(arguments.length > 3) {
            if(typeof(arguments[3]) == 'function') {
              filter=arguments[3];
            }
          }
          event.Subscriber.subscribe(type,callback,scope,subscriberData,filter);
        } else {
          var useCapture=arguments.length > 2?arguments[2]:null;
          var element=arguments.length > 3?arguments[3]:null;
          if(useCapture || element) {
            event.Event.addSubscriberToEvent(type,callback,useCapture,element);
          } else {
            event.Event.addSubscriberToChannel(type,callback);
          }
        }
        return this;
      };
      ControllerType.prototype['unsubscribe'] = function() {
        var type=arguments[0];
        var callback=arguments[1];
        if(event.Event.isCustomEvent(type)) {
          event.Subscriber.unsubscribe(type);
        } else {
          var useCapture=arguments.length > 2?arguments[2]:null;
          var element=arguments.length > 3?arguments[3]:null;
          event.Event.removeSubscriber(type,callback,useCapture,element);
        }
      };
      ControllerType.prototype['onclose'] = function(event) {
        try {
          log.Logger.error(this,' wasClean=' + event.wasClean);
          this.connect({
            location:this.wsLocation
          });
          reconnect();
        } catch(e) {
          log.Logger.error(this,' caught exception ' + e.message);
        }
        return false;
      };
      ControllerType.prototype['ondataresponse'] = function(message) {
        try {
          message.data.forEach(function (data) {
            var custom=events.CustomEvent({
              type:data.type,
              canBubble:false,
              isCanceleable:true,
              detail:data
            });
            Controller.publish(custom);
          },this);
        } catch(e) {
          log.Logger.error(this,'imgTypes caught exception: ' + e.message);
        }
      };
      ControllerType.prototype['onerror'] = function(ev) {
        try {
          log.Logger.error(this,ev.type);
        } catch(e) {
          log.Logger.error(this,'caught exception ' + e.message);
        }
      };
      ControllerType.prototype['onmessage'] = function(ev) {
        try {
          this.receive(ev.data);
        } catch(e) {
          log.Logger.error(this,'onmessage: caught exception ' + e.message);
        }
      };
      ControllerType.prototype['onopen'] = function(ev) {
        try {
          this.wsEnabled=true;
          if(reconnect) {
            reconnect();
            reconnect=null;
          }
        } catch(e) {
          log.Logger.error(this,'onopen: caught exception ' + e.message);
        }
      };
      ControllerType.prototype['onreconnect'] = function(hook) {
        try {
          reconnect=hook;
        } catch(e) {
          log.Logger.error(this,'onreconnect: caught exception ' + e.message);
        }
      };
      ControllerType.prototype['onresourceresponse'] = function(message) {
        message.imgTypes.forEach(function (imgType) {
          try {
            var namePathParts=imgType.imgName.split('/');
            var fileName=namePathParts[namePathParts.length - 1];
            var fileNameParts=fileName.split('.');
            var imgName=fileNameParts[0];
            var suffix=fileNameParts[1];
            var image=imgType.imgType;
            this.images[imgName]="data:image/" + suffix + ";base64," + image;
          } catch(e) {
            log.Logger.error(this,'imgTypes caught exception: ' + e.message);
          }
        },this);
        message.txtTypes.forEach(function (txtType) {
          try {
            var namePathParts=txtType.txtName.split('/');
            var fileName=namePathParts[namePathParts.length - 1];
            var txtName=fileName.split('.')[0];
            var text=txtType.txtType;
            this.texts[txtName]=text;
          } catch(e) {
            log.Logger.error(this,'txtTypes caught exception: ' + e.message);
          }
        },this);
        message.xmlTypes.forEach(function (xmlType) {
          try {
            var namePathParts=xmlType.xmlName.split('/');
            var fileName=namePathParts[namePathParts.length - 1];
            var xmlName=fileName.split('.')[0];
            var xml=xmlType.xmlType;
            this.xmls[xmlName]=xml;
          } catch(e) {
            log.Logger.error(this,'xmlTypes caught exception: ' + e.message);
          }
        },this);
        message.jsTypes.forEach(function (jsType) {
          var jsName=jsType.jsName.split('.')[0],jsContent;
          try {
            if(!this.javascripts[jsName]) {
              jsContent=unescape(jsType.jsType);
              if(this.javascripts[jsName]) {
                log.Logger.debug(this,jsName + ' already loaded');
              } else {
                this.javascripts[jsName]=jsContent;
                var wrapper=[];
                wrapper.push('(function () {');
                wrapper.push('  var nm = module.Module("' + jsName + '");');
                wrapper.push('  (function (require, exports, moduleId) {');
                wrapper.push(jsContent);
                wrapper.push('  })(require,nm.getExports(),nm.getId());');
                wrapper.push('})();');
                var content=wrapper.join('\n');
                eval(content);
              }
            }
          } catch(e) {
            log.Logger.error(this,'jsTypes caught exception on ' + jsName + ':' + e.message);
          }
        },this);
      };
      ControllerType.prototype['onservererror'] = function(ev) {
        try {
          if(this.lastRequest) {
            this.publish(this.lastRequest);
          }
        } catch(e) {
          log.Logger.error(this,e);
        }
        return false;
      };
      return function __() {
        return new ControllerType(arguments);
      };
    })();
    const Controller=ControllerType();
    exports.Controller = Controller;
  })(require, nm.getExports(), nm.getId());
})();

(function() {
  var nm = module.Module('loader');
  (function(require, exports, moduleId) {
    var log = require('log');
    var events = require('events');
    var controller = require('controller');
    var Loader = (function() {
      function Loader() {
        function privateData() {
          this.callback = null;
          this.http = null;
          this.modules = null;
          this.request = null;
          this.responses = null;
          this.ws = null;
        }
        var p_vars = new privateData();
        var callback = p_vars.callback;
        Object.getOwnPropertyDescriptor(this,'callback') || Object.defineProperty(this,'callback', {get: function(){return callback;},set: function(e){callback=e;}});
        var http = p_vars.http;
        Object.getOwnPropertyDescriptor(this,'http') || Object.defineProperty(this,'http', {get: function(){return http;},set: function(e){http=e;}});
        var modules = p_vars.modules;
        Object.getOwnPropertyDescriptor(this,'modules') || Object.defineProperty(this,'modules', {get: function(){return modules;},set: function(e){modules=e;}});
        var request = p_vars.request;
        Object.getOwnPropertyDescriptor(this,'request') || Object.defineProperty(this,'request', {get: function(){return request;},set: function(e){request=e;}});
        var responses = p_vars.responses;
        Object.getOwnPropertyDescriptor(this,'responses') || Object.defineProperty(this,'responses', {get: function(){return responses;},set: function(e){responses=e;}});
        var ws = p_vars.ws;
        Object.getOwnPropertyDescriptor(this,'ws') || Object.defineProperty(this,'ws', {get: function(){return ws;},set: function(e){ws=e;}});
        var ctor = function (_properties) {
          var properties = _properties || {
            ws:null,
            http:null,
            modules:[]
          };
          try {
            this.ws=properties.ws;
            this.callback=properties.callback;
            this.http=properties.http;
            this.modules=properties.modules;
            this.request=events.ResourceRequest({
              source:'Loader',
              jsTypes:[]
            });
            this.responses=0;
            require.paths.push(ws);
            controller.Controller.connect({
              location:require.paths.top()
            });
            this.modules.forEach(function (module) {
              this.request.jsTypes.push({
                jsType:module
              });
            },this);
            controller.Controller.subscribe("resourceresponse",this.onresourceresponse);
            setTimeout(controller.Controller.publish.partial(this.request),1);
          } catch(e) {
            log.Logger.error(this,e);
          }
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      Loader.prototype['onresourceresponse'] = function(resourceresponse) {
        ++responses;
        (request.jsTypes.length === (responses + 1)) && require.ready && require.ready();
      };
      Loader.modules = {};
      return function __() {
        __.modules = Loader.modules;
        return new Loader(arguments);
      };
    })();
    exports.Loader = Loader;
  })(require, nm.getExports(), nm.getId());
})();

})();
