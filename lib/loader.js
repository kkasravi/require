(function() {
  var nm = module.Module('loader');
  (function(require, exports, moduleId) {
    var log = require('log');
    var events = require('events');
    var controller = require('controller');
    var Loader = (function() {
      function Loader() {
        function privateData() {
          this.callback = null;
          this.http = null;
          this.modules = null;
          this.request = null;
          this.responses = null;
          this.ws = null;
        }
        var p_vars = new privateData();
        var callback = p_vars.callback;
        Object.getOwnPropertyDescriptor(this,'callback') || Object.defineProperty(this,'callback', {get: function(){return callback;},set: function(e){callback=e;}});
        var http = p_vars.http;
        Object.getOwnPropertyDescriptor(this,'http') || Object.defineProperty(this,'http', {get: function(){return http;},set: function(e){http=e;}});
        var modules = p_vars.modules;
        Object.getOwnPropertyDescriptor(this,'modules') || Object.defineProperty(this,'modules', {get: function(){return modules;},set: function(e){modules=e;}});
        var request = p_vars.request;
        Object.getOwnPropertyDescriptor(this,'request') || Object.defineProperty(this,'request', {get: function(){return request;},set: function(e){request=e;}});
        var responses = p_vars.responses;
        Object.getOwnPropertyDescriptor(this,'responses') || Object.defineProperty(this,'responses', {get: function(){return responses;},set: function(e){responses=e;}});
        var ws = p_vars.ws;
        Object.getOwnPropertyDescriptor(this,'ws') || Object.defineProperty(this,'ws', {get: function(){return ws;},set: function(e){ws=e;}});
        var ctor = function (_properties) {
          var properties = _properties || {
            ws:null,
            http:null,
            modules:[]
          };
          try {
            this.ws=properties.ws;
            this.callback=properties.callback;
            this.http=properties.http;
            this.modules=properties.modules;
            this.request=events.ResourceRequest({
              source:'Loader',
              jsTypes:[]
            });
            this.responses=0;
            require.paths.push(ws);
            controller.Controller.connect({
              location:require.paths.top()
            });
            this.modules.forEach(function (module) {
              this.request.jsTypes.push({
                jsType:module
              });
            },this);
            controller.Controller.subscribe("resourceresponse",this.onresourceresponse.bind(this));
            setTimeout(controller.Controller.publish.partial(this.request),1);
          } catch(e) {
            log.Logger.error(this,e);
          }
        }
        return ctor.apply(this,arguments.length>0?arguments[0]:null) || this;
      }
      Loader.prototype['onresourceresponse'] = function(resourceresponse) {
        ++this.responses;
        this.request.jsTypes && this.request.jsTypes.length === (this.responses + 1) && require.ready && require.ready();
      };
      Loader.modules = {};
      return function __() {
        __.modules = Loader.modules;
        return new Loader(arguments);
      };
    })();
    exports.Loader = Loader;
  })(require, nm.getExports(), nm.getId());
})();

