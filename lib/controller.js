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
          this.reconnecthook = null;
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
        var reconnecthook = p_vars.reconnecthook;
        Object.getOwnPropertyDescriptor(this,'reconnecthook') || Object.defineProperty(this,'reconnecthook', {get: function(){return reconnecthook;},set: function(e){reconnecthook=e;}});
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
                  log.Logger.error(this,'Caught exception: ' + e.message);
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
          this.reconnecthook && this.reconnecthook();
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
          this.reconnecthook && this.reconnecthook();
        } catch(e) {
          log.Logger.error(this,'onopen: caught exception ' + e.message);
        }
      };
      ControllerType.prototype['onreconnect'] = function(hook) {
        try {
          this.reconnecthook=hook;
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

