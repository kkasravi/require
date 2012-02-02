(function() {
  var nm = module.Module('events');
  (function(require, exports, moduleId) {
    var log = require('log');
    var Event = (function() {
      function Event() {
        var args = Array.prototype.slice.call(arguments);
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
        return ctor.apply(this,args) || this;
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
          default:
            return i;
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
        var args = Array.prototype.slice.call(arguments);
        __.CAPTURING_PHASE = Event.CAPTURING_PHASE;
        __.AT_TARGET = Event.AT_TARGET;
        __.BUBBLING_PHASE = Event.BUBBLING_PHASE;
        __.constructor = Event;
        return new Event(args && args.length && args[0]);
      };
    })();
    exports.Event = Event;
    var UIEvent = (function() {
      UIEvent.prototype = exports.Event();
      UIEvent.prototype.constructor = UIEvent;
      var Event = exports.Event.constructor;
      function UIEvent() {
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.initUIEvent(properties.type,properties.canBubble,properties.cancelable,properties.view,properties.detail);
        }
        return ctor.apply(this,args) || this;
      }
      UIEvent.prototype['initUIEvent'] = function(type,canBubble,cancelable,view,detail) {
        Event.call(this,type,canBubble,cancelable,view,detail);
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = UIEvent;
        return new UIEvent(args && args.length && args[0]);
      };
    })();
    exports.UIEvent = UIEvent;
    var TouchEvent = (function() {
      TouchEvent.prototype = exports.UIEvent();
      TouchEvent.prototype.constructor = TouchEvent;
      var UIEvent = exports.UIEvent.constructor;
      function TouchEvent() {
        var args = Array.prototype.slice.call(arguments);
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
        return ctor.apply(this,args) || this;
      }
      TouchEvent.prototype['initTouchEvent'] = function(properties) {
        UIEvent.call(this,properties);
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = TouchEvent;
        return new TouchEvent(args && args.length && args[0]);
      };
    })();
    exports.TouchEvent = TouchEvent;
    var MouseEvent = (function() {
      MouseEvent.prototype = exports.Event();
      MouseEvent.prototype.constructor = MouseEvent;
      var Event = exports.Event.constructor;
      function MouseEvent() {
        var args = Array.prototype.slice.call(arguments);
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
        return ctor.apply(this,args) || this;
      }
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
        var args = Array.prototype.slice.call(arguments);
        __.constructor = MouseEvent;
        return new MouseEvent(args && args.length && args[0]);
      };
    })();
    exports.MouseEvent = MouseEvent;
    var CustomEvent = (function() {
      CustomEvent.prototype = exports.Event();
      CustomEvent.prototype.constructor = CustomEvent;
      var Event = exports.Event.constructor;
      function CustomEvent() {
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {
            type:'customevent'
          };
          this.initCustomEvent(properties);
        }
        return ctor.apply(this,args) || this;
      }
      CustomEvent.prototype['initCustomEvent'] = function(properties) {
        Event.call(this,properties);
      };
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = CustomEvent;
        return new CustomEvent(args && args.length && args[0]);
      };
    })();
    exports.CustomEvent = CustomEvent;
    var MessageEvent = (function() {
      MessageEvent.prototype = exports.Event();
      MessageEvent.prototype.constructor = MessageEvent;
      var Event = exports.Event.constructor;
      function MessageEvent() {
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_p) {
          var p = _p || {
            type:'message'
          };
          this.initMessageEvent('message',p.bubbles,p.cancelable,p.data,p.origin,p.lastEventId,p.source,p.ports);
        }
        return ctor.apply(this,args) || this;
      }
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
        var args = Array.prototype.slice.call(arguments);
        __.constructor = MessageEvent;
        return new MessageEvent(args && args.length && args[0]);
      };
    })();
    exports.MessageEvent = MessageEvent;
    var PutResourceRequest = (function() {
      function PutResourceRequest() {
        var args = Array.prototype.slice.call(arguments);
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
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = PutResourceRequest;
        return new PutResourceRequest(args && args.length && args[0]);
      };
    })();
    exports.PutResourceRequest = PutResourceRequest;
    var PutResourceResponse = (function() {
      function PutResourceResponse() {
        var args = Array.prototype.slice.call(arguments);
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
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = PutResourceResponse;
        return new PutResourceResponse(args && args.length && args[0]);
      };
    })();
    exports.PutResourceResponse = PutResourceResponse;
    var ResourceRequest = (function() {
      function ResourceRequest() {
        var args = Array.prototype.slice.call(arguments);
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
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = ResourceRequest;
        return new ResourceRequest(args && args.length && args[0]);
      };
    })();
    exports.ResourceRequest = ResourceRequest;
    var ResourceResponse = (function() {
      function ResourceResponse() {
        var args = Array.prototype.slice.call(arguments);
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
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = ResourceResponse;
        return new ResourceResponse(args && args.length && args[0]);
      };
    })();
    exports.ResourceResponse = ResourceResponse;
    var DataItem = (function() {
      function DataItem() {
        var args = Array.prototype.slice.call(arguments);
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
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = DataItem;
        return new DataItem(args && args.length && args[0]);
      };
    })();
    exports.DataItem = DataItem;
    var DataRequest = (function() {
      function DataRequest() {
        var args = Array.prototype.slice.call(arguments);
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
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = DataRequest;
        return new DataRequest(args && args.length && args[0]);
      };
    })();
    exports.DataRequest = DataRequest;
    var DataResponse = (function() {
      function DataResponse() {
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.data=properties.data;
          this.session=properties.session;
          this.type='dataresponse';
        }
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = DataResponse;
        return new DataResponse(args && args.length && args[0]);
      };
    })();
    exports.DataResponse = DataResponse;
    var ListRequest = (function() {
      function ListRequest() {
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.exclude=properties.exclude;
          this.path=properties.path;
          this.names=properties.names || [];
          this.type='listrequest';
        }
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = ListRequest;
        return new ListRequest(args && args.length && args[0]);
      };
    })();
    exports.ListRequest = ListRequest;
    var ListResponse = (function() {
      function ListResponse() {
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.names=properties.names || [];
          this.type='listresponse';
        }
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = ListResponse;
        return new ListResponse(args && args.length && args[0]);
      };
    })();
    exports.ListResponse = ListResponse;
    var InstallRequest = (function() {
      function InstallRequest() {
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.jsHandlers=properties.jsHandlers || [];
          this.type='installrequest';
        }
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = InstallRequest;
        return new InstallRequest(args && args.length && args[0]);
      };
    })();
    exports.InstallRequest = InstallRequest;
    var InstallResponse = (function() {
      function InstallResponse() {
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.jsHandlers=properties.jsHandlers || [];
          this.type='installresponse';
        }
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = InstallResponse;
        return new InstallResponse(args && args.length && args[0]);
      };
    })();
    exports.InstallResponse = InstallResponse;
    var PutDataRequest = (function() {
      function PutDataRequest() {
        var args = Array.prototype.slice.call(arguments);
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
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = PutDataRequest;
        return new PutDataRequest(args && args.length && args[0]);
      };
    })();
    exports.PutDataRequest = PutDataRequest;
  })(require, nm.getExports(), nm.getId());
})();

