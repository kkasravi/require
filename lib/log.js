(function() {
  var nm = module.Module('log');
  (function(require, exports, moduleId) {
    var LoggerType = (function() {
      function LoggerType() {
        function privateData() {
          this.usingConsole = null;
          this.context = null;
        }
        var p_vars = new privateData();
        var usingConsole = p_vars.usingConsole;
        Object.getOwnPropertyDescriptor(this,'usingConsole') || Object.defineProperty(this,'usingConsole', {get: function(){return usingConsole;},set: function(e){usingConsole=e;}});
        var context = p_vars.context;
        Object.getOwnPropertyDescriptor(this,'context') || Object.defineProperty(this,'context', {get: function(){return context;},set: function(e){context=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.usingConsole=true;
        }
        return ctor.apply(this,args) || this;
      }
      LoggerType.prototype['debug'] = function() {
        try {
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
        } catch(e) {
        }
        this.context=null;
        return this;
      };
      LoggerType.prototype['disable'] = function(level) {
        if(this[level]) {
          this[level]=function () {};
        }
      };
      LoggerType.prototype['emit'] = function(message) {
        var consoleEnabled=this.usingConsole;
        function emitArray(obj,arr) {
          arr.forEach(function (arrItem) {
            var type=typeof((arrItem));
            if(type === 'string') {
              emitString(this,arrItem);
            } else if(type === 'number') {
              emitNumber(this,arrItem);
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
          } else if(consoleEnabled && typeof((console)) != 'undefined') {
            console.log(infoMessage);
          } else if(typeof((sys)) !== 'undefined') {
            sys.puts(infoMessage);
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
            if(message instanceof Error) {
              emitString(this,message.name + " " + message.message + "\n" + message.stack);
            } else {
              for(property in message) {
                try {
                  if(message[property] && message.hasOwnProperty(property)) {
                    emitProperty(this,property,message[property]);
                  }
                } catch(e) {
                  this.error(this,e);
                }
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
          default:
            this.error(this,"unknown message type " + type);
            break;
        }
      };
      LoggerType.prototype['error'] = function() {
        try {
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
        } catch(e) {
        }
        this.context=null;
        return this;
      };
      LoggerType.prototype['warning'] = function() {
        try {
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
        } catch(e) {
        }
        this.context=null;
        return this;
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = LoggerType;
        return new LoggerType(args && args.length && args[0]);
      };
    })();
    const Logger=LoggerType();
    exports.Logger = Logger;
  })(require, nm.getExports(), nm.getId());
})();

