module event {
  module log from 'log';
  module events from 'events';
  export class EventInfo {
    constructor(properties={type:null,functor:null,instance:null,subscribers:[]}) {
      private type, functor, instance, subscribers;
      try {
        @type = properties.type;
        @functor = properties.functor;
        @instance = properties.instance;
        @subscribers = properties.subscribers || [];
      } catch(e) {
        log.Logger.error(this,e);
      }
    }
  }
  class EventType {
    constructor() {
      private eventMap, eventNameToEventClassNameMap;
      try {
        @eventMap = {};
        @eventNameToEventClassNameMap = {};
        if (typeof document != 'undefined') {
          if (document.all) {
            var l = document.all && document.all.length;
            for (var i = 0; i < l; i++) {
              if(document.all[i].tagName.toLowerCase() == 'style') {
                continue;
              }
              this.addEventListenerMethods(document.all[i]);
            }
            this.addEventListenerMethods(window);
            this.addEventListenerMethods(document);
            if (document.createEventObject) {
              document.createElement = this.createElement.bind(this);
              document.createEvent = this.createEvent.bind(this);
            }
          }
        }
        this.rebuild();
      } catch(e) {
        log.Logger.error(this,e);
      }
    }
    addSubscriber() {
      if (typeof(arguments[0]) === 'string' && arguments[0].charAt(0) === '/') {
        this.addSubscriberToChannel.apply(this, arguments);
      } else {
        this.addSubscriberToEvent.apply(this, arguments);
      }
    }
    addSubscriberToEvent(type, callback, useCapture, element){
      if (typeof(useCapture) === 'undefined') {
        useCapture = true;
      }
      (element || window).addEventListener(type, callback, useCapture);
      return true;
    }
    addSubscriberToChannel(type, callback){
      try {
        var eventInfo = @eventMap[type];
        if (eventInfo) {
          for (var i = 0; i < eventInfo.subscribers.length; ++i) {
            var subscriber = eventInfo.subscribers[i];
            if (callback === subscriber) {
              log.Logger.error(this,'Subscriber already registered for ' + type);
              return;
            }
          }
          eventInfo.subscribers.push(callback);
        } else {
          this.addSubscriberToChannel(type, callback);
        }
      } catch(e) {
        log.Logger.error(this,e);
      }
    }
    bind(obj, fnc, ele) {
      var object = obj;
      var method = fnc;
      var element = ele;
      return function(e){
        if(!!element) {
          method.apply(object, [e, element]);  
        } else {
           method.call(object, e);
        }
      };
    }
    createEvent(type) {
      var event = document.createEventObject();
      event.infType = type;
      event.initEvent = events.Event(event).initEvent;
      return event;
    }
    createElement(tagName) {
      var element = create(tagName);
      return tagName.toLowerCase() == 'style' ? element : this.addEventListenerMethods(element);
    }
    addEventListenerMethods(element){
      var eventListenerClosure = function(ele, tagName, name){
        var element = ele;
        var type = tagName;
        if (!element.listeners) {
          element.listeners = {};
        }
        var add = function(type, fnc, useCapture){
          if (!element.listeners[type]) {
            element.listeners[type] = [];
          }
          element.listeners[type].push({element:element,fnc:fnc,useCapture:useCapture});
          var onEvent = function(){
            window.event.cancelBubble = true;
            var lEvent = window.event;
            var lType = lEvent.type;
            var eventConstructor = @eventNameToEventClassNameMap[lType];
            if (!eventConstructor) {
              this.rebuild();
              eventConstructor = @eventNameToEventClassNameMap[lType];
            }
            if (!eventConstructor) {
              log.Logger.error(this,'unknown event type ' + lType);
            }
            var e = eventConstructor(window.event);
            var aCap = [];
            var aBub = [];
            var eleS = element.parentNode;
            // Add all parent nodes which have an event function for this event type
            while (eleS) {
              if (eleS['on' + e.type]) {
                aCap.push(eleS);
              }
              eleS = eleS.parentNode;
            }
            // Reverse capture array to simulate capture phase
            aCap.reverse();
            // For all elements in capture chain. Return false if propagation was stopped
            if (!e.propagate(aCap, true)) {
              return false;
            }
            // Event phase changes to AT_TARGET
            e.eventPhase = e.AT_TARGET;
            if (element.listeners[e.type]) {
              var l = element.listeners[e.type].length;
              for (var i = 0; i < l; i++) {
                e.currentTarget = element;
                // Execute event handler
                var listenersCallback = element.listeners[e.type][i];
                listenersCallback.fnc(e);
                // Check whether stopPropagation() has been called
                if (e.propagationStopped) {
                  return false;
                }
                if (!element.listeners[e.type]) {
                  break;
                } else 
                  if (l > element.listeners[e.type].length) {
                    l = element.listeners[e.type].length;
                    i--;
                  }
              }
            }
            // Only do bubbling phase if event bubbles
            if (e.bubbles) {
              // We have to iterate again as handlers in the
              // capture or atTarget phases might have removed/added
              // other handlers
              var eleB = element.parentNode;
              while (eleB) {
                if (eleB['on' + e.type]) {
                  aBub.push(n);
                }
                eleB = eleB.parentNode;
              }
              // Event phase changes to BUBBLING_PHASE
              e.eventPhase = e.BUBBLING_PHASE;
              // For all elements in bubbling chain. Return false if propagation was stopped
              if (!e.propagate(aBub, false)) {
                return false;
              }
            }
            return true;
          };
          element['on' + type] = element['on' + type] || onEvent;
        };
        var remove = function(type, fnc, useCapture){
          // If handler exist for this type of event
          if (element.listeners[type]) {
            for (var i = 0; i < element.listeners[type].length; ++i) {
              var listenerCallback = element.listeners[type][i];
              if (listenerCallback.fnc == fnc && listenerCallback.element == element) {
                for (var j = i; j < element.listeners[type].length - 1; j++) {
                  element.listeners[type][j] = element.listeners[type][j + 1];
                }
              }
              element.listeners[type].length--;
              if (!element.listeners[type].length) {
                element.listeners[type] = null;
              }
              break;
            }
          }
        };
        var dispatch = function(e){
          element.fireEvent('on' + e.type, e);
          return e.returnValue === false ? false : true;
        };
        if (name == 'add') {
          return add;
        } else 
          if (name == 'remove') {
            return remove;
          } else 
            if (name == 'dispatch') {
              return dispatch;
            }
      };
      element.addEventListener = eventListenerClosure(element, element.tagName, 'add');
      element.removeEventListener = eventListenerClosure(element, element.tagName, 'remove');
      element.dispatchEvent = eventListenerClosure(element, element.tagName, 'dispatch');
      return element;
    }
    fireEvent(element, type, name){
      if (document.createEvent) {
        var event = document.createEvent(type);
        this.initEvent(type, name, event);
        element.dispatchEvent(event);
      } else if (document.createEventObject) {
        element.fireEvent("on" + name);
      }
    }
    getEvent(type){
      return @eventMap[type] && @eventMap[type].functor;
    }
    getEvents() {
      return @eventNameToEventClassNameMap;
    }
    getSubscribers(type){
      return @eventMap[type] && @eventMap[type].subscribers;
    }
    initEvent(type, name, event){
      event.type = name;
      if (type == 'Event') {
      } else if (type === 'MouseEvent') {
      } else if (type === 'KeyboardEvent') {
      } else if (type === 'TouchEvent') {
      } else if (type === 'WebKitTransitionEvent') {
      } else if (type === 'UIEvent') {
      } else if (type === 'CustomEvent') {
      } else if (type === 'MutationEvent') {
      } else if (type === 'MessageEvent') {
      }
    }
    isCustomEvent(type){
      if(typeof(@eventNameToEventClassNameMap[type]) !== 'undefined') {
        return false;
      }
      return true;
    }
    rebuild() {
      try {
        for(var eventName in events) {
          var eventType = events[eventName];
          if (eventName === 'Event') {
            //load, unload, abort, error, select, change, submit, reset, focus, blur, resize, scroll
            @eventNameToEventClassNameMap.load = eventType;
            @eventNameToEventClassNameMap.unload = eventType;
            @eventNameToEventClassNameMap.abort = eventType;
            @eventNameToEventClassNameMap.error = eventType;
            @eventNameToEventClassNameMap.select = eventType;
            @eventNameToEventClassNameMap.change = eventType;
            @eventNameToEventClassNameMap.submit = eventType;
            @eventNameToEventClassNameMap.reset = eventType;
            @eventNameToEventClassNameMap.focus = eventType;
            @eventNameToEventClassNameMap.blur = eventType;
            @eventNameToEventClassNameMap.resize = eventType;
            @eventNameToEventClassNameMap.scroll = eventType;
          } else if (eventName === 'MouseEvent') {
            //click, dblclick, mousedown, mouseup, mouseover, mousemove, mouseout
            @eventNameToEventClassNameMap.click = eventType;
            @eventNameToEventClassNameMap.dblclick = eventType;
            @eventNameToEventClassNameMap.mousedown = eventType;
            @eventNameToEventClassNameMap.mouseup = eventType;
            @eventNameToEventClassNameMap.mouseover = eventType;
            @eventNameToEventClassNameMap.mousemove = eventType;
            @eventNameToEventClassNameMap.mouseout = eventType;
          } else if (eventName === 'DragEvent') {
            //dragstart, drag, dragenter, dragleave, dragover, drop, dragend
            @eventNameToEventClassNameMap.dragstart = eventType;
            @eventNameToEventClassNameMap.drag = eventType;
            @eventNameToEventClassNameMap.dragenter = eventType;
            @eventNameToEventClassNameMap.dragleave = eventType;
            @eventNameToEventClassNameMap.dragover = eventType;
            @eventNameToEventClassNameMap.drop = eventType;
            @eventNameToEventClassNameMap.dragend = eventType;
          } else if (eventName === 'KeyboardEvent') {
            //keydown, keypress, keyup
            @eventNameToEventClassNameMap.keypress = eventType;
            @eventNameToEventClassNameMap.keydown = eventType;
            @eventNameToEventClassNameMap.keyup = eventType;
          } else if (eventName === 'MutationEvent') {
            //DOMNodeInsertedIntoDocument, DOMSubtreeModified, DOMNodeInserted, DOMNodeRemoved, 
            @eventNameToEventClassNameMap.DOMNodeInsertedIntoDocument = eventType;
            @eventNameToEventClassNameMap.DOMSubtreeModified = eventType;
            @eventNameToEventClassNameMap.DOMNodeInserted = eventType;
            @eventNameToEventClassNameMap.DOMNodeRemoved = eventType;
            @eventNameToEventClassNameMap.DOMNodeRemovedFromDocument = eventType;
            @eventNameToEventClassNameMap.DOMAttrModified = eventType;
            @eventNameToEventClassNameMap.DOMCharacterDataModified = eventType;
          } else if (eventName === 'UIEvent') {
            //DOMFocusIn, DOMFocusOut, DOMActivate
            @eventNameToEventClassNameMap.DOMFocusIn = eventType;
            @eventNameToEventClassNameMap.DOMFocusOut = eventType;
            @eventNameToEventClassNameMap.DOMActivate = eventType;
          } else if (eventName === 'WebKitTransitionEvent') {
            @eventNameToEventClassNameMap.webKitTransitionEnd = eventType;
          } else if (eventName === 'TouchEvent') {
            //touchstart,touchmove,touchend,touchcancel
            @eventNameToEventClassNameMap.touchstart = eventType;
            @eventNameToEventClassNameMap.touchmove = eventType;
            @eventNameToEventClassNameMap.touchend = eventType;
            @eventNameToEventClassNameMap.touchcancel = eventType;
          } else if (eventName === 'MessageEvent') {
            @eventNameToEventClassNameMap.message = eventType;                   
          } else if (eventName === 'ConnectedMessage') {
            @eventNameToEventClassNameMap['connected'] = eventType;
            this.register('connected', eventType);     
          } else if (eventName === 'PutResourceRequest') {
            @eventNameToEventClassNameMap['putresourcerequest'] = eventType;
            this.register('putresourcerequest', eventType);     
          } else if (eventName === 'PutResourceResponse') {
            @eventNameToEventClassNameMap['putresourceresponse'] = eventType;
            this.register('putresourceresponse', eventType);     
          } else if (eventName === 'DataRequest') {
            @eventNameToEventClassNameMap['datarequest'] = eventType;
            this.register('datarequest', eventType);     
          } else if (eventName === 'PutDataRequest') {
            @eventNameToEventClassNameMap['putdatarequest'] = eventType;
            this.register('putdatarequest', eventType);     
          } else if (eventName === 'DataResponse') {
            @eventNameToEventClassNameMap['dataresponse'] = eventType;
            this.register('dataresponse', eventType);     
          } else if (eventName === 'ResourceRequest') {
            @eventNameToEventClassNameMap['resourcerequest'] = eventType;
            this.register('resourcerequest', eventType);     
          } else if (eventName === 'ResourceResponse') {
            @eventNameToEventClassNameMap['resourceresponse'] = eventType;
            this.register('resourceresponse', eventType);     
          } else if (eventName === 'ListRequest') {
            @eventNameToEventClassNameMap['listrequest'] = eventType;
            this.register('listrequest', eventType);     
          } else if (eventName === 'ListResponse') {
            @eventNameToEventClassNameMap['listresponse'] = eventType;
            this.register('listresponse', eventType);     
          } else if (eventName === 'InstallRequest') {
            @eventNameToEventClassNameMap['installrequest'] = eventType;
            this.register('installrequest', eventType);     
          } else if (eventName === 'InstallResponse') {
            @eventNameToEventClassNameMap['installresponse'] = eventType;
            this.register('installresponse', eventType);     
          }
        }
      } catch(e) {
        log.Logger.error(this,e);
      }
    }
    register(type, eventType){
      try {
        if (!@eventMap[type]) {
          @eventMap[type] = EventInfo({type: type, functor: eventType});
        }
      } catch(e) {
        log.Logger.error(this,e);
      }
    }
    removeSubscriber(){
      if (typeof(arguments[0]) == 'string' && arguments[0].charAt(0) == '/') {
        this.removeSubscriberFromChannel.apply(this, arguments);
      } else {
        this.removeSubscriberFromEvent.apply(this, arguments);
      }
    }
    removeSubscriberFromEvent(type, callback, useCapture, element){
      (element || window).removeEventListener(type, callback, useCapture);
      return true;
    }
    removeSubscriberFromChannel(type, callback){
      var eventInfo = @eventMap[type];
      if (eventInfo) {
        var newSubscribers = [];
        var found = false;
        for (var i = 0; i < eventInfo.subscribers.length; ++i) {
          var subscriber = eventInfo.subscribers[i];
          if (subscriber == callback) {
            found = true;
            continue;
          }
          newSubscribers.push(subscriber);
        }
        if (found) {
          eventInfo.subscribers = newSubscribers;
        } else {
          log.Logger.error(this,'could not unbind');
        }
      }
    }
    validate(message){
      var instance;
      var eventInfo = @eventMap[message.type];
      if (!eventInfo) {
        this.rebuild();
        eventInfo = @eventMap[message.type];
      }
      if (eventInfo && eventInfo.functor) {
        instance = eventInfo.functor(message);
      }
      return instance;
    }
  }
  export const Event = EventType();
  class PublisherType {
    constructor() {
      private depth, cleanupArray, subscriber;
      @depth = 0;
      @cleanupArray = [];
      @subscriber = [];
    }
    cleanup(index){
      return index ? @cleanupArray[index] : @cleanupArray;
    }
    dispose(){
      @cleanupArray = [];
    }
    doPublish(tree, path, index, name, msg){
      if (typeof tree != "undefined") {
        var node;
        if (index == path.length) {
          node = tree;
        } else {
          this.doPublish(tree.c[path[index]], path, index + 1, name, msg);
          this.doPublish(tree.c["*"], path, index + 1, name, msg);
          node = tree.c["**"];
        }
        if (typeof node != "undefined") {
          var callbacks = node.s;
          var max = callbacks.length;
          for (var i = 0; i < max; i++) {
            if (callbacks[i].cb) {
              var sc = callbacks[i].scope;
              var cb = callbacks[i].cb;
              var fcb = callbacks[i].fcb;
              var d = callbacks[i].data;
              if (typeof(cb) == "string") {
                cb = sc[cb];
              }
              if (typeof(fcb) == "string") {
                fcb = sc[fcb];
              }
              if ((!fcb) || (fcb.call(sc, msg, d))) {
                cb.call(sc, msg, d);
              }
            }
          }
        }
      }
    }      
    pubDepth(value){
      @depth += value ? value : 0;
      return @depth;
    }
    publish(name, message){
      var path = name.split(".");
      this.pubDepth(1);
      this.doPublish(Subscriber.subscriptions, path, 0, name, message);
      this.pubDepth(-1);
      if ((this.cleanup().length > 0) && (@depth === 0)) {
        for (var i = 0; i < this.cleanup().length; i++) {
          Subscriber.unsubscribe(this.cleanup(i).hdl);
        }
        this.dispose();
      }
    }
  }
  export const Publisher = PublisherType();
  class SubscriberType {
    constructor(properties={ast:null,transpiler:null}) {
      private subIndex, subscriptions;
      @subIndex = 0;
      @subscriptions = { c:{}, s:[] };
    }
    subscribe(name, callback, scope, subscriberData, filter) {
      var handle = name + "." + @subIndex;
      var sub = { scope: scope, cb: callback, fcb: filter, data: subscriberData, sid: @subIndex++, hdl: handle };
      var path = name.split(".");
      this.doSubscribe(@subscriptions, path, 0, sub);
      return handle;
    }
    unsubscribe(sub) {
      var path = sub.split(".");
      var sid = path.pop();
      this.doUnsubscribe(@subscriptions, path, 0, sid);
    }
    doSubscribe(tree, path, index, sub) {
      var token = path[index];
      if(index == path.length) {  
        tree.s.push(sub);
      } else { 
        if(typeof tree.c === 'undefined') {
          tree.c = {};
        }
        if(typeof tree.c[token] === 'undefined') {
          tree.c[token] = { c: {}, s: [] }; 
          this.doSubscribe(tree.c[token], path, index + 1, sub);
        } else {
          this.doSubscribe( tree.c[token], path, index + 1, sub);
        }
      }
    }    
    doUnsubscribe(tree, path, index, sid) {
      if(typeof tree != "undefined") {
        if(index < path.length) {
          var childNode = tree.c[path[index]];
          this.doUnsubscribe(childNode, path, index + 1, sid);
          if(childNode.s.length === 0) {
            for (var x in childNode.c) {
              return;
            }   
            delete tree.c[path[index]]; 
          }
          return;
        } else {
          var callbacks = tree.s;
          var max = callbacks.length;
          for (var i = 0; i < max; i++) {
            if (sid == callbacks[i].sid) {
              if (@depth > 0) {
                callbacks[i].cb = null;
                this.m_cleanup.push(callbacks[i]);
              }
              else {
                callbacks.splice(i, 1);
              }
              return;
            }
          }
        }
      }
    }
  }
  export const Subscriber = SubscriberType();
}
