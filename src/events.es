module events {
  module log from 'log';
  export class Event {
    constructor(properties={}) {
      private altKey, bubbles, button, cancelable, clientX, clientY, ctrlKey, currentTarget, defaultPrevented, detail, e, eventPhase, keyCode, metaKey, relatedTarget, screenX, screenY, shiftKey, target, timeStamp, type, propagationStopped, cancelableMap, bubblesMap;
      try {
        @altKey=properties.altKey;
        @bubbles = properties.bubbles ? properties.bubbles : this.doesBubble(properties.type);
        @button = this.getButton(properties.button);
        @cancelable = properties.cancelable ? properties.cancelable : this.isCancelable(properties.type);
        @clientX = properties.clientX; 
        @clientY = properties.clientY;
        @ctrlKey = properties.ctrlKey;
        @currentTarget = null;
        @defaultPrevented = false;
        @detail = properties.detail;
        @e = properties.e;
        @eventPhase = Event.CAPTURING_PHASE; 
        @keyCode = properties.keyCode; 
        @metaKey = null;
        @relatedTarget = properties.fromElement; 
        @screenX = properties.screenX;
        @screenY = properties.screenY;
        @shiftKey = properties.shiftKey;
        @target = properties.srcElement; 
        @timeStamp = new Date().getTime(); 
        @type = properties.type; 
        @propagationStopped = false;
        @cancelableMap = {
          load: false,
          unload: false,
          abort: false,
          error: false,
          select: false,
          change: false,
          submit: false,
          reset: true,
          focus: false,
          blur: false,
          resize: false,
          scroll: false
        };
        @bubblesMap = {
          load: false,
          unload: false,
          abort: false,
          error: true,
          select: true,
          change: true,
          submit: true,
          reset: true,
          focus: false,
          blur: false,
          resize: true,
          scroll: true
        };
      } catch(e) {
        log.Logger.error(this,e);
      }
    }
    doesBubble(type) {
      return type && @bubblesMap[type];
    }
    isCancelable(type) {
      return type && @cancelableMap[type];
    }
    getButton(i) {
      switch (i) { // Left button
      case 1:
        return 0; // Middle button
      case 4:
        return 1;
      default:
        return i;
      }
    }
    initEvent(type, canBubble, cancelable) {
      @type = type;
      @bubbles = canBubble;
      @cancelable = cancelable;
    }
    stopPropagation() {
      @propagationStopped = true;
    }
    preventDefault() {
      if (@cancelable) {
        @defaultPrevented = true;
        @returnValue = false;
      }
    }
    propagate(chain, useCapture) {
      for (var i = 0; i < chain.length; i++) {
        if (chain[i][@type]) { 
          var l = chain[i][@type].length; 
          for (var j = 0; j < l; j++) {
            if (chain[i][@type][j].useCapture === useCapture) {
              @currentTarget = chain[i];
              chain[i][@type][j].fnc.call(chain[i], this); // Check whether stopPropagation has been called
              if (@propagationStopped) return false;
            }
          }
        }
      }
      return true;
    }
    static CAPTURING_PHASE = 1, AT_TARGET = 2, BUBBLING_PHASE = 3;
  }
  export class UIEvent extends Event {
    constructor(properties={}) {
      this.initUIEvent(properties.type, properties.canBubble, properties.cancelable, properties.view, 
        properties.detail);
    }
    initUIEvent(type, canBubble, cancelable, view, detail) {
      Event.call(this, type, canBubble, cancelable, view, detail);
    }
  }
  export class TouchEvent extends UIEvent {
    constructor(type, canBubble, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, touches, targetTouches, changedTouches, scale, rotation) {
      private changedTouches, rotation, scale, touches, targetTouches;
      @changedTouches = [];
      @rotation = null;
      @scale = null;
      @touches = [];
      @targetTouches = [];
      @cancelableMap = {
        touchstart: true,
        touchmove: true,
        touchcancel: true,
        touchend: true
      };
      @bubblesMap = {
        touchstart: true,
        touchmove: true,
        touchcancel: true,
        touchend: true
      };
      this.initTouchEvent(properties);
      @touches = properties.touches;
      @targetTouches = properties.targetTouches;
      @changedTouches = properties.changedTouches;
      @scale = properties.scale;
      @rotation = properties.rotation;
    }
    initTouchEvent(properties) {
      UIEvent.call(this,properties);
    }
  }
  export class MouseEvent extends Event {
    constructor(type, canBubble, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget) {
      private screenX, screenY;
      @screenX = null;
      @screenY = null;
      @cancelableMap = {
        click: true,
        mousedown: true,
        mouseup: true,
        mouseover: true,
        mousemove: true,
        mouseout: true
      };
      @bubblesMap = {
        click: true,
        mousedown: true,
        mouseup: true,
        mouseover: true,
        mousemove: true,
        mouseout: true
      };
      Event.call(this, type, canBubble, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, 
        altKey, shiftKey, metaKey, button, relatedTarget);
      this.initMouseEvent(type, canBubble, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, 
        altKey, shiftKey, metaKey, button, relatedTarget);
    }
    initMouseEvent(type, canBubble, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, 
      shiftKey, metaKey, button, relatedTarget) {
        @type = type;
        @bubbles = canBubble;
        @cancelable = cancelable;
        @view = view;
        @detail = null;
        @screenX = screenX;
        @screenY = screenY;
        @clientX = clientX;
        @clientY = clientY;
        @ctrlKey = ctrlKey;
        @altKey = altKey;
        @shiftKey = shiftKey;
        @metaKey = null;
        @button = button;
        @relatedTarget = relatedTarget;
    }
  }
  export class CustomEvent extends Event {
    constructor(properties={type:'customevent'}) {
      this.initCustomEvent(properties);
    }
    initCustomEvent(properties) {
      Event.call(this, properties);
    }
  }
  export class MessageEvent extends Event {
    constructor(properties={type:'message'}) {
      private data, origin, lastEventId, source, ports;
      this.initMessageEvent('message',@bubbles,@cancelable,@data,@origin,@lastEventId,@source,@ports);
    }
    initMessageEvent(type, bubbles, cancelable, data, origin, lastEventId, source, ports) {
        Event.call(this, type, bubbles, cancelable);
        @data = data;
        if(location) {
          @origin = location.protocol + '//' + location.host + (location.port ? ':' + location.port :  '');
        } else {
          @origin = origin;
        }
        @lastEventId = lastEventId || 0;
        @ports = ports;        
        @source = source;
    }
  }
  export class PutResourceRequest {
    constructor(properties={type:'putresourcerequest'}) {
      private path, cssTypes, imgTypes, jsTypes, txtTypes, xmlTypes, type;
      @path = properties.path;
      @cssTypes = properties.cssTypes || [];
      @imgTypes = properties.imgTypes || [];
      @jsTypes = properties.jsTypes || [];
      @txtTypes = properties.txtTypes || [];
      @xmlTypes = properties.xmlTypes || [];
      @type = properties.type || 'putresourcerequest';
    }
  }
  export class PutResourceResponse {
    constructor(properties={type:'putresourceresponse'}) {
      private path, cssTypes, imgTypes, jsTypes, txtTypes, xmlTypes, type;
      @path = properties.path;
      @cssTypes = properties.cssTypes || [];
      @imgTypes = properties.imgTypes || [];
      @jsTypes = properties.jsTypes || [];
      @txtTypes = properties.txtTypes || [];
      @xmlTypes = properties.xmlTypes || [];
      @type = properties.type || 'putresourceresponse';
    }
  }
  export class ResourceRequest {
    constructor(properties={}) {
      private exclude, path, cssTypes, imgTypes, jsTypes, specTypes, txtTypes, xmlTypes, type;
      @exclude = properties.exclude;
      @path = properties.path;
      @cssTypes = properties.cssTypes || [];
      @imgTypes = properties.imgTypes || [];
      @jsTypes = properties.jsTypes || [];
      @specTypes = properties.specTypes || [];
      @txtTypes = properties.txtTypes || [];
      @xmlTypes = properties.xmlTypes || [];
      @type = properties.type || 'resourcerequest';
    }
  }
  export class ResourceResponse {
    constructor(properties={}) {
      private exclude, path, cssTypes, imgTypes, jsTypes, specTypes, txtTypes, xmlTypes, type;
      @exclude = properties.exclude;
      @path = properties.path;
      @cssTypes = properties.cssTypes || [];
      @imgTypes = properties.imgTypes || [];
      @jsTypes = properties.jsTypes || [];
      @specTypes = properties.specTypes || [];
      @txtTypes = properties.txtTypes || [];
      @xmlTypes = properties.xmlTypes || [];
      @type = properties.type || 'resourceresponse';
    }
  }
  export class DataItem {
    constructor(properties={}) {
      private id, name, module, value, count, range, since, before, sort, type;
      @id = Math.uuid(8);
      @name = properties.name;
      @module = properties.module;
      @value = properties.value;
      @count = properties.count;
      @range = properties.range;
      @since = properties.since;
      @before = properties.before;
      @sort = properties.sort;
      @type = 'dataitem';
    }
  }
  export class DataItem {
    constructor(properties={}) {
      private cookie, data, ip, userAgent, session, type;
      try {
        @cookie = properties.cookie || ((typeof(document) !== 'undefined') && document.cookie);
        @data = properties.data;
        @ip = properties.ip;
        @session = properties.session || (this.cookie && this.cookie.split('=')[1]);
        if(typeof navigator !== 'undefined') {
          @userAgent = navigator && navigator.userAgent;
        } else {
          @userAgent = properties.userAgent;
        }
        @type = 'dataitem';
      } catch(e) {
        log.Logger.error(this,e);
      }
      return this;
    }
  }
  export class DataResponse {
    constructor(properties={}) {
      private data, session, type;
      @data = properties.data;
      @session = properties.session;
      @type = 'dataresponse';
    }
  }
  export class ListRequest {
    constructor(properties={}) {
      private exclude, path, names, type;
      @exclude = properties.exclude;
      @path = properties.path;
      @names = properties.names || [];
      @type = 'listrequest';
    }
  }
  export class ListResponse {
    constructor(properties={}) {
      private names, type;
      @names = properties.names || [];
      @type = 'listresponse';
    }
  }
  export class InstallRequest {
    constructor(properties={}) {
      private jsHandlers, type;
      @jsHandlers = properties.jsHandlers || [];
      @type = 'installrequest';
    }
  }
  export class InstallResponse {
    constructor(properties={}) {
      private jsHandlers, type;
      @jsHandlers = properties.jsHandlers || [];
      @type = 'installresponse';
    }
  }
  export class PutDataRequest {
    constructor(properties={}) {
      private cookie, data, ip, userAgent, session, type;
      try {
        @cookie = properties.cookie || ((typeof(document) !== 'undefined') && document.cookie);
        @data = properties.data;
        @ip = properties.ip;
        @session = properties.session || (@cookie && @cookie.split('=')[1]);
        if(typeof navigator !== 'undefined') {
          @userAgent = navigator && navigator.userAgent;
        } else {
          @userAgent = properties.userAgent;
        }
        @type = 'putdatarequest';
      } catch(e) {
        log.Logger.error(this,e);
      }
    }
  }
}
