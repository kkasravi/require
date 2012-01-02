module module {
  module log from 'log';
  module loader from 'loader';
  class Module {
    constructor() {
      private exports, id, loader, dependencies;
      @exports = {};
      @id = null;
      @loader = null;
      @dependencies = [];
      try {
        @id = arguments[0];
        modules[id] = this;
      } catch(e) {
        log.Logger.error(this,e);
      }
    }
    get(mid) {
      return @exports[mid];
    }
    static modules = {};
  }
}
