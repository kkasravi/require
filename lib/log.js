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

