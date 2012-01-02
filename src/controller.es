module controller {
  module log from 'log';
  module event from 'event';
  module events from 'events';
  class ControllerType {
    constructor() {
      private dispatcher, images, javascripts, lastRequest, reconnect, texts, wsLocation, wsEnabled, xmls;
      @images = {};
      @javascripts = {};
      @texts = {};
      @wsEnabled = false;
      @xmls = {};
      try {
        event.event.rebuild();
        this.subscribe("dataresponse", this.ondataresponse.bind(this));
        this.subscribe("resourceresponse", this.onresourceresponse.bind(this));
        this.subscribe('jsonparseerror', this.onservererror.bind(this));
      } catch(e) {
        log.Logger.error(this,e);
      }
    }
    connect(properties={}) {
      try {
        @wsLocation = properties.location;
        @dispatcher = MozWebSocket ?  new MozWebSocket(@wsLocation): new WebSocket(@wsLocation);
        @dispatcher.onopen = this.onopen.bind(this);
        @dispatcher.onmessage = this.onmessage.bind(this);
        @dispatcher.onclose = this.onclose.bind(this);
      } catch(e) {
        log.Logger.error(this,e);
      }
      return this;
    }
    publish(message){
      try {
        if (message.constructor === events.CustomEvent.constructor) {
          event.Publisher.publish(message.type, message);
        } else if (message.type) {
          var jsonMessage = JSON.stringify(message);
          (function dispatch() {
            try {
              if (Controller.dispatcher && Controller.wsEnabled) {
                Controller.lastRequest = message;
                Controller.dispatcher.send(jsonMessage);
              } else {
                setTimeout(dispatch, 100);
              }
            } catch(e) {
              log.Logger.error(this, e);
            }
          })();
        } else {
          log.Logger.error(this,'publish failed for  '+message.type);
        }
      } catch (e) {
        log.Logger.error(this,'publish: caught exception: '+e.message);
      }
    }
    receive(json){
      try {
        var message = JSON.parse(json);
        var valid = event.Event.validate(message);
        if (typeof(valid) !== 'undefined') {
          var subscribers = event.Event.getSubscribers(valid.type);
          if (subscribers && subscribers.length > 0) {
            for (var i = 0; i < subscribers.length; ++i) {
              try {
                var subscriber = subscribers[i];
                subscriber(valid);
              } catch (e) {
                log.Logger.error('receive: caught exception: '+e.message);
              }
            }
          } else {
            log.Logger.error(this,'No subscriber for '+message.type);
          }
        } else {
          log.Logger.error(this,'No event registered for '+message.type);
        }
      } catch(e) {
        log.Logger.error(this,'receive: caught exception: '+e.message);
      }
    }
    subscribe(){
      var type = arguments[0];
      var callback = arguments[1];
      if (event.Event.isCustomEvent(type)) {
        var scope = null;
        var subscriberData = arguments.length > 2 ? arguments[2] : null;
        var filter;
        if (arguments.length > 3) {
          if (typeof arguments[3] == 'function') {
            filter = arguments[3];
          }
        }
        event.Subscriber.subscribe(type, callback, scope, subscriberData, filter);
      } else {
        var useCapture = arguments.length > 2 ? arguments[2] : null;
        var element = arguments.length > 3 ? arguments[3] : null;
        if(useCapture || element) {
          event.Event.addSubscriberToEvent(type, callback, useCapture, element);
        } else {
          event.Event.addSubscriberToChannel(type, callback);
        }
      }
      return this;
    }
    unsubscribe(){
      var type = arguments[0];
      var callback = arguments[1];
      if (event.Event.isCustomEvent(type)) {
        event.Subscriber.unsubscribe(type);
      } else {
        var useCapture = arguments.length > 2 ? arguments[2] : null;
        var element = arguments.length > 3 ? arguments[3] : null;
        event.Event.removeSubscriber(type, callback, useCapture, element);
      }
    }
    onclose(event){
      try {
        log.Logger.error(this,' wasClean='+event.wasClean);
        this.connect({location: @wsLocation});
        reconnect();
      } catch(e) {
        log.Logger.error(this, ' caught exception ' + e.message);
      }
      return false;
    }
    ondataresponse(message) {
      try {
        message.data.forEach(function(data) {
          var custom = events.CustomEvent({type:data.type,canBubble:false,isCanceleable:true,detail:data});
          Controller.publish(custom);
        }, this);
      } catch(e) {
        log.Logger.error(this, 'imgTypes caught exception: ' + e.message);
      }
    }
    onerror(ev) {
      try {
        log.Logger.error(this,ev.type);
      } catch(e) {
        log.Logger.error(this,'caught exception '+e.message);
      }
    }
    onmessage(ev){
      try {
        this.receive(this.useFlash() ? ev : ev.data);
      } catch(e) {
        log.Logger.error(this,'onmessage: caught exception '+e.message);
      }
    }
    onopen(ev){
      try {
        @wsEnabled = true;
        if(reconnect) {
          reconnect();
          reconnect = null;
        }
      } catch(e) {
        log.Logger.error(this,'onopen: caught exception '+e.message);
      }
    }
    onreconnect(hook) {
      try {
        reconnect = hook;
      } catch(e) {
        log.Logger.error(this,'onreconnect: caught exception '+e.message);
      }
    }
    onresourceresponse(message){
      message.imgTypes.forEach(function(imgType){
        try {
          var namePathParts = imgType.imgName.split('/');
          var fileName = namePathParts[namePathParts.length - 1];
          var fileNameParts = fileName.split('.');
          var imgName = fileNameParts[0];
          var suffix = fileNameParts[1];
          var image = imgType.imgType;
          @images[imgName] = "data:image/" + suffix + ";base64," + image;
        } catch (e) {
          log.Logger.error(this,'imgTypes caught exception: '+e.message);
        }
      }, this);
      message.txtTypes.forEach(function(txtType){
        try {
          var namePathParts = txtType.txtName.split('/');
          var fileName = namePathParts[namePathParts.length - 1];
          var txtName = fileName.split('.')[0];
          var text = txtType.txtType;
          @texts[txtName] = text;
        } catch (e) {
          log.Logger.error(this,'txtTypes caught exception: '+e.message);
        }
      }, this);
      message.xmlTypes.forEach(function(xmlType){
        try {
          var namePathParts = xmlType.xmlName.split('/');
          var fileName = namePathParts[namePathParts.length - 1];
          var xmlName = fileName.split('.')[0];
          var xml = xmlType.xmlType;
          @xmls[xmlName] = xml;
        } catch (e) {
          log.Logger.error(this,'xmlTypes caught exception: '+e.message);
        }
      }, this);
      message.jsTypes.forEach(function(jsType) {
        var jsName = jsType.jsName.split('.')[0], jsContent;
        try {
          if (!@javascripts[jsName]) {
            jsContent = unescape(jsType.jsType);
            if (@javascripts[jsName]) {
              log.Logger.debug(this, jsName + ' already loaded');
            } else {
              @javascripts[jsName] = jsContent;
              var wrapper = [];
              wrapper.push('(function () {');
              wrapper.push('  var nm = module.Module("'+jsName+'");');
              wrapper.push('  (function (require, exports, moduleId) {');
              wrapper.push(jsContent);
              wrapper.push('  })(require,nm.getExports(),nm.getId());');
              wrapper.push('})();');
              var content = wrapper.join('\n');
              eval(content);
            }
          }
        } catch(e) {
          log.Logger.error(this, 'jsTypes caught exception on '+ jsName + ':' + e.message);
        }
      }, this);
    }
    onservererror(ev) {
      try {
        if(@lastRequest) {
          this.publish(@lastRequest);
        }
      } catch(e) {
        log.Logger.error(this,e);
      }
      return false;
    }
  }
  export const Controller = ControllerType();
}
