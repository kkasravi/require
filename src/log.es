module log {
  class LoggerType {
    constructor() {
      private usingConsole, context;
      @usingConsole = true;
    }
    debug() {
      try {
        for(var i = 0; i < arguments.length; ++i) { 
          if (i === 0 && arguments.length > 1) {
            var obj = '';
            if(arguments[0].constructor && arguments[0].constructor.name) {
              obj = arguments[0].constructor.name;
            }
            if(arguments.callee.caller.name) {
              obj = obj + '.' + arguments.callee.caller.name;
            }
            @context = obj;
            continue;
          }
          this.emit(arguments[i]);
        }
      } catch(e){}
      @context = null;
      return this;
    }
    disable(level) {
      if(this[level]) {
        this[level] = function(){};
      }
    }
    emit(message) {
      var consoleEnabled = @usingConsole;
      function emitArray(obj,arr) {
        arr.forEach(function(arrItem){
          var type = typeof(arrItem);
          if(type === 'string') {
            emitString(this,arrItem);
          } else if(type === 'number'){
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
        var infoMessage = obj.context ? obj.context + ': ' + unescape(str) : unescape(str);
        if (typeof(Titanium) != 'undefined') {             
          Titanium.API.info(infoMessage);
        } else if(consoleEnabled && typeof(console) != 'undefined') {
          console.log(infoMessage);
        } else if(typeof(sys) !== 'undefined') {
          sys.puts(infoMessage);
        } 
      } 
      function emitStackTrace(obj) {
        var caller;
        try {
          caller = arguments.callee.caller.caller.caller;
        } catch(e){}
        var stack = '';
        var contextActive = true;
        while(caller) {
          if (contextActive) {
            stack += @context;
          } else {
            if (callerName) {
              stack += caller.name + '\n';
            }
          }
          contextActive = false;
          if(caller === caller.caller) {
            break;
          }
          caller = caller.caller;
        }
        emitString(obj,stack); 
      }          
      var type = typeof(message);
      if (message instanceof Array) {
        for (var j = 0; j < message.length; ++j) {
          emitArray(this,message[j]);
        }
      }
      switch(type) {
        case "object":
          if(message instanceof Error) {
            emitString(this,message.name + " " + message.message + (message.line ? " line:" + message.line: "") + (message.stack ? message.stack + "\n": "\n"));
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
    }
    error() {
      try {
        for(var i = 0; i < arguments.length; ++i) { 
          if (i === 0 && arguments.length > 1) {
            var obj = '';
            if(arguments[0].constructor && arguments[0].constructor.name) {
              obj = arguments[0].constructor.name;
            }
            if(arguments.callee.caller.name) {
              obj = obj + '.' + arguments.callee.caller.name;
            }
            @context = obj;
            continue;
          }
          this.emit(arguments[i]);
        }
      } catch(e) {}
      @context = null;
      return this;
    }
    warning() {
      try {
        for(var i = 0; i < arguments.length; ++i) { 
          if (i === 0 && arguments.length > 1) {
            var obj = '';
            if(arguments[0].constructor && arguments[0].constructor.name) {
              obj = arguments[0].constructor.name;
            }
            if(arguments.callee.caller.name) {
              obj = obj + '.' + arguments.callee.caller.name;
            }
            @context = obj;
            continue;
          }
          this.emit(arguments[i]);
        }
      } catch(e) {}
      @context = null;
      return this;
    }
  }
  export const Logger = LoggerType();
}
