module events {
  module log from 'log';
  export class Event {
    constructor(properties={}) {
      try {
        this.altKey=properties.altKey;
        this.bubbles = properties.bubbles ? properties.bubbles : this.doesBubble(properties.type);
        this.button = this.getButton(properties.button);
        this.cancelable = properties.cancelable ? properties.cancelable : this.isCancelable(properties.type);
        this.clientX = properties.clientX; 
        this.clientY = properties.clientY;
        this.ctrlKey = properties.ctrlKey;
        this.currentTarget = null;
        this.defaultPrevented = false;
        this.detail = properties.detail;
        this.e = properties.e;
        this.eventPhase = Event.CAPTURING_PHASE; 
        this.keyCode = properties.keyCode; 
        this.metaKey = null;
        this.relatedTarget = properties.fromElement; 
        this.screenX = properties.screenX;
        this.screenY = properties.screenY;
        this.shiftKey = properties.shiftKey;
        this.target = properties.srcElement; 
        this.timeStamp = new Date().getTime(); 
        this.type = properties.type; 
        this.propagationStopped = false;
        this.cancelableMap = {
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
        this.bubblesMap = {
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
      return type && this.bubblesMap[type];
    }
    isCancelable(type) {
      return type && this.cancelableMap[type];
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
      this.type = type;
      this.bubbles = canBubble;
      this.cancelable = cancelable;
    }
    stopPropagation() {
      this.propagationStopped = true;
    }
    preventDefault() {
      if (this.cancelable) {
        this.defaultPrevented = true;
        this.returnValue = false;
      }
    }
    propagate(chain, useCapture) {
      for (var i = 0; i < chain.length; i++) {
        if (chain[i][this.type]) { 
          var l = chain[i][this.type].length; 
          for (var j = 0; j < l; j++) {
            if (chain[i][this.type][j].useCapture === useCapture) {
              this.currentTarget = chain[i];
              chain[i][this.type][j].fnc.call(chain[i], this); // Check whether stopPropagation has been called
              if (this.propagationStopped) return false;
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
      this.changedTouches = [];
      this.rotation = null;
      this.scale = null;
      this.touches = [];
      this.targetTouches = [];
      this.cancelableMap = {
        touchstart: true,
        touchmove: true,
        touchcancel: true,
        touchend: true
      };
      this.bubblesMap = {
        touchstart: true,
        touchmove: true,
        touchcancel: true,
        touchend: true
      };
      this.initTouchEvent(properties);
      this.touches = properties.touches;
      this.targetTouches = properties.targetTouches;
      this.changedTouches = properties.changedTouches;
      this.scale = properties.scale;
      this.rotation = properties.rotation;
    }
    initTouchEvent(properties) {
      UIEvent.call(this,properties);
    }
  }
  export class MouseEvent extends Event {
    constructor(type, canBubble, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget) {
      this.screenX = null;
      this.screenY = null;
      this.cancelableMap = {
        click: true,
        mousedown: true,
        mouseup: true,
        mouseover: true,
        mousemove: true,
        mouseout: true
      };
      this.bubblesMap = {
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
        this.type = type;
        this.bubbles = canBubble;
        this.cancelable = cancelable;
        this.view = view;
        this.detail = null;
        this.screenX = screenX;
        this.screenY = screenY;
        this.clientX = clientX;
        this.clientY = clientY;
        this.ctrlKey = ctrlKey;
        this.altKey = altKey;
        this.shiftKey = shiftKey;
        this.metaKey = null;
        this.button = button;
        this.relatedTarget = relatedTarget;
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
    constructor(p={type:'message'}) {
      this.initMessageEvent('message',p.bubbles,p.cancelable,p.data,p.origin,p.lastEventId,p.source,p.ports);
    }
    initMessageEvent(type, bubbles, cancelable, data, origin, lastEventId, source, ports) {
        Event.call(this, type, bubbles, cancelable);
        this.data = data;
        if(location) {
          this.origin = location.protocol + '//' + location.host + (location.port ? ':' + location.port :  '');
        } else {
          this.origin = origin;
        }
        this.lastEventId = lastEventId || 0;
        this.ports = ports;        
        this.source = source;
    }
  }
  export class PutResourceRequest {
    constructor(properties={type:'putresourcerequest'}) {
      this.path = properties.path;
      this.cssTypes = properties.cssTypes || [];
      this.imgTypes = properties.imgTypes || [];
      this.jsTypes = properties.jsTypes || [];
      this.txtTypes = properties.txtTypes || [];
      this.xmlTypes = properties.xmlTypes || [];
      this.type = properties.type || 'putresourcerequest';
    }
  }
  export class PutResourceResponse {
    constructor(properties={type:'putresourceresponse'}) {
      this.path = properties.path;
      this.cssTypes = properties.cssTypes || [];
      this.imgTypes = properties.imgTypes || [];
      this.jsTypes = properties.jsTypes || [];
      this.txtTypes = properties.txtTypes || [];
      this.xmlTypes = properties.xmlTypes || [];
      this.type = properties.type || 'putresourceresponse';
    }
  }
  export class ResourceRequest {
    constructor(properties={}) {
      this.exclude = properties.exclude;
      this.path = properties.path;
      this.cssTypes = properties.cssTypes || [];
      this.imgTypes = properties.imgTypes || [];
      this.jsTypes = properties.jsTypes || [];
      this.specTypes = properties.specTypes || [];
      this.txtTypes = properties.txtTypes || [];
      this.xmlTypes = properties.xmlTypes || [];
      this.type = properties.type || 'resourcerequest';
    }
  }
  export class ResourceResponse {
    constructor(properties={}) {
      this.exclude = properties.exclude;
      this.path = properties.path;
      this.cssTypes = properties.cssTypes || [];
      this.imgTypes = properties.imgTypes || [];
      this.jsTypes = properties.jsTypes || [];
      this.specTypes = properties.specTypes || [];
      this.txtTypes = properties.txtTypes || [];
      this.xmlTypes = properties.xmlTypes || [];
      this.type = properties.type || 'resourceresponse';
    }
  }
  export class DataItem {
    constructor(properties={}) {
      this.id = Math.uuid(8);
      this.name = properties.name;
      this.module = properties.module;
      this.value = properties.value;
      this.count = properties.count;
      this.range = properties.range;
      this.since = properties.since;
      this.before = properties.before;
      this.sort = properties.sort;
      this.type = 'dataitem';
    }
  }
  export class DataRequest {
    constructor(properties={}) {
      try {
        this.cookie = properties.cookie || ((typeof(document) !== 'undefined') && document.cookie);
        this.data = properties.data;
        this.ip = properties.ip;
        this.session = properties.session || (this.cookie && this.cookie.split('=')[1]);
        if(typeof navigator !== 'undefined') {
          this.userAgent = navigator && navigator.userAgent;
        } else {
          this.userAgent = properties.userAgent;
        }
        this.type = 'dataitem';
      } catch(e) {
        log.Logger.error(this,e);
      }
    }
  }
  export class DataResponse {
    constructor(properties={}) {
      this.data = properties.data;
      this.session = properties.session;
      this.type = 'dataresponse';
    }
  }
  export class ListRequest {
    constructor(properties={}) {
      this.exclude = properties.exclude;
      this.path = properties.path;
      this.names = properties.names || [];
      this.type = 'listrequest';
    }
  }
  export class ListResponse {
    constructor(properties={}) {
      this.names = properties.names || [];
      this.type = 'listresponse';
    }
  }
  export class InstallRequest {
    constructor(properties={}) {
      this.jsHandlers = properties.jsHandlers || [];
      this.type = 'installrequest';
    }
  }
  export class InstallResponse {
    constructor(properties={}) {
      this.jsHandlers = properties.jsHandlers || [];
      this.type = 'installresponse';
    }
  }
  export class PutDataRequest {
    constructor(properties={}) {
      try {
        this.cookie = properties.cookie || ((typeof(document) !== 'undefined') && document.cookie);
        this.data = properties.data;
        this.ip = properties.ip;
        this.session = properties.session || (this.cookie && this.cookie.split('=')[1]);
        if(typeof navigator !== 'undefined') {
          this.userAgent = navigator && navigator.userAgent;
        } else {
          this.userAgent = properties.userAgent;
        }
        this.type = 'putdatarequest';
      } catch(e) {
        log.Logger.error(this,e);
      }
    }
  }
}
