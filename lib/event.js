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
        var args = Array.prototype.slice.call(arguments);
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
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = EventInfo;
        return new EventInfo(args && args.length && args[0]);
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
        var args = Array.prototype.slice.call(arguments);
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
        return ctor.apply(this,args) || this;
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
        var args = Array.prototype.slice.call(arguments);
        __.constructor = EventType;
        return new EventType(args && args.length && args[0]);
      };
    })();
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
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {
            ast:null,
            transpiler:null
          };
          this.pubDepth=0;
          this.cleanupArray=[];
          this.subscriber=[];
        }
        return ctor.apply(this,args) || this;
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
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Publisher;
        return new Publisher(args && args.length && args[0]);
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
        var args = Array.prototype.slice.call(arguments);
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
        return ctor.apply(this,args) || this;
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
        var args = Array.prototype.slice.call(arguments);
        __.constructor = SubscriberType;
        return new SubscriberType(args && args.length && args[0]);
      };
    })();
    const Subscriber=SubscriberType();
    exports.Subscriber = Subscriber;
  })(require, nm.getExports(), nm.getId());
})();

