(function() {
  var nm = module.Module('module');
  (function(require, exports, moduleId) {
    var log = require('log');
    var loader = require('loader');
    var Module = (function() {
      function Module() {
        function privateData() {
          this.exports = null;
          this.id = null;
          this.loader = null;
          this.dependencies = null;
        }
        var p_vars = new privateData();
        var exports = p_vars.exports;
        Object.getOwnPropertyDescriptor(this,'exports') || Object.defineProperty(this,'exports', {get: function(){return exports;},set: function(e){exports=e;}});
        var id = p_vars.id;
        Object.getOwnPropertyDescriptor(this,'id') || Object.defineProperty(this,'id', {get: function(){return id;},set: function(e){id=e;}});
        var loader = p_vars.loader;
        Object.getOwnPropertyDescriptor(this,'loader') || Object.defineProperty(this,'loader', {get: function(){return loader;},set: function(e){loader=e;}});
        var dependencies = p_vars.dependencies;
        Object.getOwnPropertyDescriptor(this,'dependencies') || Object.defineProperty(this,'dependencies', {get: function(){return dependencies;},set: function(e){dependencies=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.exports={};
          this.id=null;
          this.loader=null;
          this.dependencies=[];
          try {
            this.id=arguments[0];
            modules[id]=this;
          } catch(e) {
            log.Logger.error(this,e);
          }
        }
        return ctor.apply(this,args) || this;
      }
      Module.prototype['get'] = function(mid) {
        return this.exports[mid];
      };
      Module.modules = {};
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.modules = Module.modules;
        __.constructor = Module;
        return new Module(args && args.length && args[0]);
      };
    })();
  })(require, nm.getExports(), nm.getId());
})();

