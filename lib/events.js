(function() {
  var nm = module.Module('events');
  (function(require, exports, moduleId) {
    var log = require('log');
    var Event = (function() {
      function Event() {
        function privateData() {
          this.altKey = null;
          this.bubbles = null;
          this.button = null;
          this.cancelable = null;
          this.clientX = null;
          this.clientY = null;
          this.ctrlKey = null;
          this.currentTarget = null;
          this.defaultPrevented = null;
          this.detail = null;
          this.e = null;
          this.eventPhase = null;
          this.keyCode = null;
          this.metaKey = null;
          this.relatedTarget = null;
          this.screenX = null;
          this.screenY = null;
          this.shiftKey = null;
          this.target = null;
          this.timeStamp = null;
          this.type = null;
          this.propagationStopped = null;
          this.cancelableMap = null;
          this.bubblesMap = null;
        }
        var p_vars = new privateData();
        var altKey = p_vars.altKey;
        Object.getOwnPropertyDescriptor(this,'altKey') || Object.defineProperty(this,'altKey', {get: function(){return altKey;},set: function(e){altKey=e;}});
        var bubbles = p_vars.bubbles;
        Object.getOwnPropertyDescriptor(this,'bubbles') || Object.defineProperty(this,'bubbles', {get: function(){return bubbles;},set: function(e){bubbles=e;}});
        var button = p_vars.button;
        Object.getOwnPropertyDescriptor(this,'button') || Object.defineProperty(this,'button', {get: function(){return button;},set: function(e){button=e;}});
        var cancelable = p_vars.cancelable;
        Object.getOwnPropertyDescriptor(this,'cancelable') || Object.defineProperty(this,'cancelable', {get: function(){return cancelable;},set: function(e){cancelable=e;}});
        var clientX = p_vars.clientX;
        Object.getOwnPropertyDescriptor(this,'clientX') || Object.defineProperty(this,'clientX', {get: function(){return clientX;},set: function(e){clientX=e;}});
        var clientY = p_vars.clientY;
        Object.getOwnPropertyDescriptor(this,'clientY') || Object.defineProperty(this,'clientY', {get: function(){return clientY;},set: function(e){clientY=e;}});
        var ctrlKey = p_vars.ctrlKey;
        Object.getOwnPropertyDescriptor(this,'ctrlKey') || Object.defineProperty(this,'ctrlKey', {get: function(){return ctrlKey;},set: function(e){ctrlKey=e;}});
        var currentTarget = p_vars.currentTarget;
        Object.getOwnPropertyDescriptor(this,'currentTarget') || Object.defineProperty(this,'currentTarget', {get: function(){return currentTarget;},set: function(e){currentTarget=e;}});
        var defaultPrevented = p_vars.defaultPrevented;
        Object.getOwnPropertyDescriptor(this,'defaultPrevented') || Object.defineProperty(this,'defaultPrevented', {get: function(){return defaultPrevented;},set: function(e){defaultPrevented=e;}});
        var detail = p_vars.detail;
        Object.getOwnPropertyDescriptor(this,'detail') || Object.defineProperty(this,'detail', {get: function(){return detail;},set: function(e){detail=e;}});
        var e = p_vars.e;
        Object.getOwnPropertyDescriptor(this,'e') || Object.defineProperty(this,'e', {get: function(){return e;},set: function(e){e=e;}});
        var eventPhase = p_vars.eventPhase;
        Object.getOwnPropertyDescriptor(this,'eventPhase') || Object.defineProperty(this,'eventPhase', {get: function(){return eventPhase;},set: function(e){eventPhase=e;}});
        var keyCode = p_vars.keyCode;
        Object.getOwnPropertyDescriptor(this,'keyCode') || Object.defineProperty(this,'keyCode', {get: function(){return keyCode;},set: function(e){keyCode=e;}});
        var metaKey = p_vars.metaKey;
        Object.getOwnPropertyDescriptor(this,'metaKey') || Object.defineProperty(this,'metaKey', {get: function(){return metaKey;},set: function(e){metaKey=e;}});
        var relatedTarget = p_vars.relatedTarget;
        Object.getOwnPropertyDescriptor(this,'relatedTarget') || Object.defineProperty(this,'relatedTarget', {get: function(){return relatedTarget;},set: function(e){relatedTarget=e;}});
        var screenX = p_vars.screenX;
        Object.getOwnPropertyDescriptor(this,'screenX') || Object.defineProperty(this,'screenX', {get: function(){return screenX;},set: function(e){screenX=e;}});
        var screenY = p_vars.screenY;
        Object.getOwnPropertyDescriptor(this,'screenY') || Object.defineProperty(this,'screenY', {get: function(){return screenY;},set: function(e){screenY=e;}});
        var shiftKey = p_vars.shiftKey;
        Object.getOwnPropertyDescriptor(this,'shiftKey') || Object.defineProperty(this,'shiftKey', {get: function(){return shiftKey;},set: function(e){shiftKey=e;}});
        var target = p_vars.target;
        Object.getOwnPropertyDescriptor(this,'target') || Object.defineProperty(this,'target', {get: function(){return target;},set: function(e){target=e;}});
        var timeStamp = p_vars.timeStamp;
        Object.getOwnPropertyDescriptor(this,'timeStamp') || Object.defineProperty(this,'timeStamp', {get: function(){return timeStamp;},set: function(e){timeStamp=e;}});
        var type = p_vars.type;
        Object.getOwnPropertyDescriptor(this,'type') || Object.defineProperty(this,'type', {get: function(){return type;},set: function(e){type=e;}});
        var propagationStopped = p_vars.propagationStopped;
        Object.getOwnPropertyDescriptor(this,'propagationStopped') || Object.defineProperty(this,'propagationStopped', {get: function(){return propagationStopped;},set: function(e){propagationStopped=e;}});
        var cancelableMap = p_vars.cancelableMap;
        Object.getOwnPropertyDescriptor(this,'cancelableMap') || Object.defineProperty(this,'cancelableMap', {get: function(){return cancelableMap;},set: function(e){cancelableMap=e;}});
        var bubblesMap = p_vars.bubblesMap;
        Object.getOwnPropertyDescriptor(this,'bubblesMap') || Object.defineProperty(this,'bubblesMap', {get: function(){return bubblesMap;},set: function(e){bubblesMap=e;}});
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
        function privateData() {
          this.changedTouches = null;
          this.rotation = null;
          this.scale = null;
          this.touches = null;
          this.targetTouches = null;
        }
        var p_vars = new privateData();
        var changedTouches = p_vars.changedTouches;
        Object.getOwnPropertyDescriptor(this,'changedTouches') || Object.defineProperty(this,'changedTouches', {get: function(){return changedTouches;},set: function(e){changedTouches=e;}});
        var rotation = p_vars.rotation;
        Object.getOwnPropertyDescriptor(this,'rotation') || Object.defineProperty(this,'rotation', {get: function(){return rotation;},set: function(e){rotation=e;}});
        var scale = p_vars.scale;
        Object.getOwnPropertyDescriptor(this,'scale') || Object.defineProperty(this,'scale', {get: function(){return scale;},set: function(e){scale=e;}});
        var touches = p_vars.touches;
        Object.getOwnPropertyDescriptor(this,'touches') || Object.defineProperty(this,'touches', {get: function(){return touches;},set: function(e){touches=e;}});
        var targetTouches = p_vars.targetTouches;
        Object.getOwnPropertyDescriptor(this,'targetTouches') || Object.defineProperty(this,'targetTouches', {get: function(){return targetTouches;},set: function(e){targetTouches=e;}});
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
        function privateData() {
          this.screenX = null;
          this.screenY = null;
        }
        var p_vars = new privateData();
        var screenX = p_vars.screenX;
        Object.getOwnPropertyDescriptor(this,'screenX') || Object.defineProperty(this,'screenX', {get: function(){return screenX;},set: function(e){screenX=e;}});
        var screenY = p_vars.screenY;
        Object.getOwnPropertyDescriptor(this,'screenY') || Object.defineProperty(this,'screenY', {get: function(){return screenY;},set: function(e){screenY=e;}});
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
        function privateData() {
          this.data = null;
          this.origin = null;
          this.lastEventId = null;
          this.source = null;
          this.ports = null;
        }
        var p_vars = new privateData();
        var data = p_vars.data;
        Object.getOwnPropertyDescriptor(this,'data') || Object.defineProperty(this,'data', {get: function(){return data;},set: function(e){data=e;}});
        var origin = p_vars.origin;
        Object.getOwnPropertyDescriptor(this,'origin') || Object.defineProperty(this,'origin', {get: function(){return origin;},set: function(e){origin=e;}});
        var lastEventId = p_vars.lastEventId;
        Object.getOwnPropertyDescriptor(this,'lastEventId') || Object.defineProperty(this,'lastEventId', {get: function(){return lastEventId;},set: function(e){lastEventId=e;}});
        var source = p_vars.source;
        Object.getOwnPropertyDescriptor(this,'source') || Object.defineProperty(this,'source', {get: function(){return source;},set: function(e){source=e;}});
        var ports = p_vars.ports;
        Object.getOwnPropertyDescriptor(this,'ports') || Object.defineProperty(this,'ports', {get: function(){return ports;},set: function(e){ports=e;}});
        var ctor = function (_properties) {
          var properties = _properties || {
            type:'message'
          };
          this.initMessageEvent('message',this.bubbles,this.cancelable,this.data,this.origin,this.lastEventId,this.source,this.ports);
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
        }
        this.origin=origin;
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
        function privateData() {
          this.path = null;
          this.cssTypes = null;
          this.imgTypes = null;
          this.jsTypes = null;
          this.txtTypes = null;
          this.xmlTypes = null;
          this.type = null;
        }
        var p_vars = new privateData();
        var path = p_vars.path;
        Object.getOwnPropertyDescriptor(this,'path') || Object.defineProperty(this,'path', {get: function(){return path;},set: function(e){path=e;}});
        var cssTypes = p_vars.cssTypes;
        Object.getOwnPropertyDescriptor(this,'cssTypes') || Object.defineProperty(this,'cssTypes', {get: function(){return cssTypes;},set: function(e){cssTypes=e;}});
        var imgTypes = p_vars.imgTypes;
        Object.getOwnPropertyDescriptor(this,'imgTypes') || Object.defineProperty(this,'imgTypes', {get: function(){return imgTypes;},set: function(e){imgTypes=e;}});
        var jsTypes = p_vars.jsTypes;
        Object.getOwnPropertyDescriptor(this,'jsTypes') || Object.defineProperty(this,'jsTypes', {get: function(){return jsTypes;},set: function(e){jsTypes=e;}});
        var txtTypes = p_vars.txtTypes;
        Object.getOwnPropertyDescriptor(this,'txtTypes') || Object.defineProperty(this,'txtTypes', {get: function(){return txtTypes;},set: function(e){txtTypes=e;}});
        var xmlTypes = p_vars.xmlTypes;
        Object.getOwnPropertyDescriptor(this,'xmlTypes') || Object.defineProperty(this,'xmlTypes', {get: function(){return xmlTypes;},set: function(e){xmlTypes=e;}});
        var type = p_vars.type;
        Object.getOwnPropertyDescriptor(this,'type') || Object.defineProperty(this,'type', {get: function(){return type;},set: function(e){type=e;}});
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
        function privateData() {
          this.path = null;
          this.cssTypes = null;
          this.imgTypes = null;
          this.jsTypes = null;
          this.txtTypes = null;
          this.xmlTypes = null;
          this.type = null;
        }
        var p_vars = new privateData();
        var path = p_vars.path;
        Object.getOwnPropertyDescriptor(this,'path') || Object.defineProperty(this,'path', {get: function(){return path;},set: function(e){path=e;}});
        var cssTypes = p_vars.cssTypes;
        Object.getOwnPropertyDescriptor(this,'cssTypes') || Object.defineProperty(this,'cssTypes', {get: function(){return cssTypes;},set: function(e){cssTypes=e;}});
        var imgTypes = p_vars.imgTypes;
        Object.getOwnPropertyDescriptor(this,'imgTypes') || Object.defineProperty(this,'imgTypes', {get: function(){return imgTypes;},set: function(e){imgTypes=e;}});
        var jsTypes = p_vars.jsTypes;
        Object.getOwnPropertyDescriptor(this,'jsTypes') || Object.defineProperty(this,'jsTypes', {get: function(){return jsTypes;},set: function(e){jsTypes=e;}});
        var txtTypes = p_vars.txtTypes;
        Object.getOwnPropertyDescriptor(this,'txtTypes') || Object.defineProperty(this,'txtTypes', {get: function(){return txtTypes;},set: function(e){txtTypes=e;}});
        var xmlTypes = p_vars.xmlTypes;
        Object.getOwnPropertyDescriptor(this,'xmlTypes') || Object.defineProperty(this,'xmlTypes', {get: function(){return xmlTypes;},set: function(e){xmlTypes=e;}});
        var type = p_vars.type;
        Object.getOwnPropertyDescriptor(this,'type') || Object.defineProperty(this,'type', {get: function(){return type;},set: function(e){type=e;}});
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
        function privateData() {
          this.exclude = null;
          this.path = null;
          this.cssTypes = null;
          this.imgTypes = null;
          this.jsTypes = null;
          this.specTypes = null;
          this.txtTypes = null;
          this.xmlTypes = null;
          this.type = null;
        }
        var p_vars = new privateData();
        var exclude = p_vars.exclude;
        Object.getOwnPropertyDescriptor(this,'exclude') || Object.defineProperty(this,'exclude', {get: function(){return exclude;},set: function(e){exclude=e;}});
        var path = p_vars.path;
        Object.getOwnPropertyDescriptor(this,'path') || Object.defineProperty(this,'path', {get: function(){return path;},set: function(e){path=e;}});
        var cssTypes = p_vars.cssTypes;
        Object.getOwnPropertyDescriptor(this,'cssTypes') || Object.defineProperty(this,'cssTypes', {get: function(){return cssTypes;},set: function(e){cssTypes=e;}});
        var imgTypes = p_vars.imgTypes;
        Object.getOwnPropertyDescriptor(this,'imgTypes') || Object.defineProperty(this,'imgTypes', {get: function(){return imgTypes;},set: function(e){imgTypes=e;}});
        var jsTypes = p_vars.jsTypes;
        Object.getOwnPropertyDescriptor(this,'jsTypes') || Object.defineProperty(this,'jsTypes', {get: function(){return jsTypes;},set: function(e){jsTypes=e;}});
        var specTypes = p_vars.specTypes;
        Object.getOwnPropertyDescriptor(this,'specTypes') || Object.defineProperty(this,'specTypes', {get: function(){return specTypes;},set: function(e){specTypes=e;}});
        var txtTypes = p_vars.txtTypes;
        Object.getOwnPropertyDescriptor(this,'txtTypes') || Object.defineProperty(this,'txtTypes', {get: function(){return txtTypes;},set: function(e){txtTypes=e;}});
        var xmlTypes = p_vars.xmlTypes;
        Object.getOwnPropertyDescriptor(this,'xmlTypes') || Object.defineProperty(this,'xmlTypes', {get: function(){return xmlTypes;},set: function(e){xmlTypes=e;}});
        var type = p_vars.type;
        Object.getOwnPropertyDescriptor(this,'type') || Object.defineProperty(this,'type', {get: function(){return type;},set: function(e){type=e;}});
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
        function privateData() {
          this.exclude = null;
          this.path = null;
          this.cssTypes = null;
          this.imgTypes = null;
          this.jsTypes = null;
          this.specTypes = null;
          this.txtTypes = null;
          this.xmlTypes = null;
          this.type = null;
        }
        var p_vars = new privateData();
        var exclude = p_vars.exclude;
        Object.getOwnPropertyDescriptor(this,'exclude') || Object.defineProperty(this,'exclude', {get: function(){return exclude;},set: function(e){exclude=e;}});
        var path = p_vars.path;
        Object.getOwnPropertyDescriptor(this,'path') || Object.defineProperty(this,'path', {get: function(){return path;},set: function(e){path=e;}});
        var cssTypes = p_vars.cssTypes;
        Object.getOwnPropertyDescriptor(this,'cssTypes') || Object.defineProperty(this,'cssTypes', {get: function(){return cssTypes;},set: function(e){cssTypes=e;}});
        var imgTypes = p_vars.imgTypes;
        Object.getOwnPropertyDescriptor(this,'imgTypes') || Object.defineProperty(this,'imgTypes', {get: function(){return imgTypes;},set: function(e){imgTypes=e;}});
        var jsTypes = p_vars.jsTypes;
        Object.getOwnPropertyDescriptor(this,'jsTypes') || Object.defineProperty(this,'jsTypes', {get: function(){return jsTypes;},set: function(e){jsTypes=e;}});
        var specTypes = p_vars.specTypes;
        Object.getOwnPropertyDescriptor(this,'specTypes') || Object.defineProperty(this,'specTypes', {get: function(){return specTypes;},set: function(e){specTypes=e;}});
        var txtTypes = p_vars.txtTypes;
        Object.getOwnPropertyDescriptor(this,'txtTypes') || Object.defineProperty(this,'txtTypes', {get: function(){return txtTypes;},set: function(e){txtTypes=e;}});
        var xmlTypes = p_vars.xmlTypes;
        Object.getOwnPropertyDescriptor(this,'xmlTypes') || Object.defineProperty(this,'xmlTypes', {get: function(){return xmlTypes;},set: function(e){xmlTypes=e;}});
        var type = p_vars.type;
        Object.getOwnPropertyDescriptor(this,'type') || Object.defineProperty(this,'type', {get: function(){return type;},set: function(e){type=e;}});
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
        function privateData() {
          this.id = null;
          this.name = null;
          this.module = null;
          this.value = null;
          this.count = null;
          this.range = null;
          this.since = null;
          this.before = null;
          this.sort = null;
          this.type = null;
        }
        var p_vars = new privateData();
        var id = p_vars.id;
        Object.getOwnPropertyDescriptor(this,'id') || Object.defineProperty(this,'id', {get: function(){return id;},set: function(e){id=e;}});
        var name = p_vars.name;
        Object.getOwnPropertyDescriptor(this,'name') || Object.defineProperty(this,'name', {get: function(){return name;},set: function(e){name=e;}});
        var module = p_vars.module;
        Object.getOwnPropertyDescriptor(this,'module') || Object.defineProperty(this,'module', {get: function(){return module;},set: function(e){module=e;}});
        var value = p_vars.value;
        Object.getOwnPropertyDescriptor(this,'value') || Object.defineProperty(this,'value', {get: function(){return value;},set: function(e){value=e;}});
        var count = p_vars.count;
        Object.getOwnPropertyDescriptor(this,'count') || Object.defineProperty(this,'count', {get: function(){return count;},set: function(e){count=e;}});
        var range = p_vars.range;
        Object.getOwnPropertyDescriptor(this,'range') || Object.defineProperty(this,'range', {get: function(){return range;},set: function(e){range=e;}});
        var since = p_vars.since;
        Object.getOwnPropertyDescriptor(this,'since') || Object.defineProperty(this,'since', {get: function(){return since;},set: function(e){since=e;}});
        var before = p_vars.before;
        Object.getOwnPropertyDescriptor(this,'before') || Object.defineProperty(this,'before', {get: function(){return before;},set: function(e){before=e;}});
        var sort = p_vars.sort;
        Object.getOwnPropertyDescriptor(this,'sort') || Object.defineProperty(this,'sort', {get: function(){return sort;},set: function(e){sort=e;}});
        var type = p_vars.type;
        Object.getOwnPropertyDescriptor(this,'type') || Object.defineProperty(this,'type', {get: function(){return type;},set: function(e){type=e;}});
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
        function privateData() {
          this.cookie = null;
          this.data = null;
          this.ip = null;
          this.userAgent = null;
          this.session = null;
          this.type = null;
        }
        var p_vars = new privateData();
        var cookie = p_vars.cookie;
        Object.getOwnPropertyDescriptor(this,'cookie') || Object.defineProperty(this,'cookie', {get: function(){return cookie;},set: function(e){cookie=e;}});
        var data = p_vars.data;
        Object.getOwnPropertyDescriptor(this,'data') || Object.defineProperty(this,'data', {get: function(){return data;},set: function(e){data=e;}});
        var ip = p_vars.ip;
        Object.getOwnPropertyDescriptor(this,'ip') || Object.defineProperty(this,'ip', {get: function(){return ip;},set: function(e){ip=e;}});
        var userAgent = p_vars.userAgent;
        Object.getOwnPropertyDescriptor(this,'userAgent') || Object.defineProperty(this,'userAgent', {get: function(){return userAgent;},set: function(e){userAgent=e;}});
        var session = p_vars.session;
        Object.getOwnPropertyDescriptor(this,'session') || Object.defineProperty(this,'session', {get: function(){return session;},set: function(e){session=e;}});
        var type = p_vars.type;
        Object.getOwnPropertyDescriptor(this,'type') || Object.defineProperty(this,'type', {get: function(){return type;},set: function(e){type=e;}});
        var ctor = function (_properties) {
          var properties = _properties || {};
          try {
            this.cookie=properties.cookie || ((typeof((document)) !== 'undefined') && document.cookie);
            this.data=properties.data;
            this.ip=properties.ip;
            this.session=properties.session || (this.cookie && this.cookie.split('=')[1]);
            if(typeof(navigator) !== 'undefined') {
              this.userAgent=navigator && navigator.userAgent;
            }
            this.userAgent=properties.userAgent;
            this.type='dataitem';
          } catch(e) {
            log.Logger.error(this,e);
          }
          return this;
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
        function privateData() {
          this.data = null;
          this.session = null;
          this.type = null;
        }
        var p_vars = new privateData();
        var data = p_vars.data;
        Object.getOwnPropertyDescriptor(this,'data') || Object.defineProperty(this,'data', {get: function(){return data;},set: function(e){data=e;}});
        var session = p_vars.session;
        Object.getOwnPropertyDescriptor(this,'session') || Object.defineProperty(this,'session', {get: function(){return session;},set: function(e){session=e;}});
        var type = p_vars.type;
        Object.getOwnPropertyDescriptor(this,'type') || Object.defineProperty(this,'type', {get: function(){return type;},set: function(e){type=e;}});
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
        function privateData() {
          this.exclude = null;
          this.path = null;
          this.names = null;
          this.type = null;
        }
        var p_vars = new privateData();
        var exclude = p_vars.exclude;
        Object.getOwnPropertyDescriptor(this,'exclude') || Object.defineProperty(this,'exclude', {get: function(){return exclude;},set: function(e){exclude=e;}});
        var path = p_vars.path;
        Object.getOwnPropertyDescriptor(this,'path') || Object.defineProperty(this,'path', {get: function(){return path;},set: function(e){path=e;}});
        var names = p_vars.names;
        Object.getOwnPropertyDescriptor(this,'names') || Object.defineProperty(this,'names', {get: function(){return names;},set: function(e){names=e;}});
        var type = p_vars.type;
        Object.getOwnPropertyDescriptor(this,'type') || Object.defineProperty(this,'type', {get: function(){return type;},set: function(e){type=e;}});
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
        function privateData() {
          this.names = null;
          this.type = null;
        }
        var p_vars = new privateData();
        var names = p_vars.names;
        Object.getOwnPropertyDescriptor(this,'names') || Object.defineProperty(this,'names', {get: function(){return names;},set: function(e){names=e;}});
        var type = p_vars.type;
        Object.getOwnPropertyDescriptor(this,'type') || Object.defineProperty(this,'type', {get: function(){return type;},set: function(e){type=e;}});
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
        function privateData() {
          this.jsHandlers = null;
          this.type = null;
        }
        var p_vars = new privateData();
        var jsHandlers = p_vars.jsHandlers;
        Object.getOwnPropertyDescriptor(this,'jsHandlers') || Object.defineProperty(this,'jsHandlers', {get: function(){return jsHandlers;},set: function(e){jsHandlers=e;}});
        var type = p_vars.type;
        Object.getOwnPropertyDescriptor(this,'type') || Object.defineProperty(this,'type', {get: function(){return type;},set: function(e){type=e;}});
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
        function privateData() {
          this.jsHandlers = null;
          this.type = null;
        }
        var p_vars = new privateData();
        var jsHandlers = p_vars.jsHandlers;
        Object.getOwnPropertyDescriptor(this,'jsHandlers') || Object.defineProperty(this,'jsHandlers', {get: function(){return jsHandlers;},set: function(e){jsHandlers=e;}});
        var type = p_vars.type;
        Object.getOwnPropertyDescriptor(this,'type') || Object.defineProperty(this,'type', {get: function(){return type;},set: function(e){type=e;}});
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
        function privateData() {
          this.cookie = null;
          this.data = null;
          this.ip = null;
          this.userAgent = null;
          this.session = null;
          this.type = null;
        }
        var p_vars = new privateData();
        var cookie = p_vars.cookie;
        Object.getOwnPropertyDescriptor(this,'cookie') || Object.defineProperty(this,'cookie', {get: function(){return cookie;},set: function(e){cookie=e;}});
        var data = p_vars.data;
        Object.getOwnPropertyDescriptor(this,'data') || Object.defineProperty(this,'data', {get: function(){return data;},set: function(e){data=e;}});
        var ip = p_vars.ip;
        Object.getOwnPropertyDescriptor(this,'ip') || Object.defineProperty(this,'ip', {get: function(){return ip;},set: function(e){ip=e;}});
        var userAgent = p_vars.userAgent;
        Object.getOwnPropertyDescriptor(this,'userAgent') || Object.defineProperty(this,'userAgent', {get: function(){return userAgent;},set: function(e){userAgent=e;}});
        var session = p_vars.session;
        Object.getOwnPropertyDescriptor(this,'session') || Object.defineProperty(this,'session', {get: function(){return session;},set: function(e){session=e;}});
        var type = p_vars.type;
        Object.getOwnPropertyDescriptor(this,'type') || Object.defineProperty(this,'type', {get: function(){return type;},set: function(e){type=e;}});
        var ctor = function (_properties) {
          var properties = _properties || {};
          try {
            this.cookie=properties.cookie || ((typeof((document)) !== 'undefined') && document.cookie);
            this.data=properties.data;
            this.ip=properties.ip;
            this.session=properties.session || (this.cookie && this.cookie.split('=')[1]);
            if(typeof(navigator) !== 'undefined') {
              this.userAgent=navigator && navigator.userAgent;
            }
            this.userAgent=properties.userAgent;
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

