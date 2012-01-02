module loader {
  module log from 'log';
  module events from 'events';
  module controller from 'controller';
  export class Loader {
    constructor(properties={ws:null,http:null,modules:[]}) {
      private callback, http, modules, request, responses, ws;
      try {
        @ws = properties.ws;
        @callback = properties.callback;
        @http = properties.http;
        @modules = properties.modules;
        @request = events.ResourceRequest({source:'Loader', jsTypes:[]}); 
        @responses = 0;
        require.paths.push(ws);
        controller.Controller.connect({location: require.paths.top()});
        @modules.forEach(function(module) {
            @request.jsTypes.push({jsType:module});
        },this);
        controller.Controller.subscribe("resourceresponse",this.onresourceresponse.bind(this));
        setTimeout(controller.Controller.publish.partial(@request), 1);
      } catch(e) {
        log.Logger.error(this,e);
      }
    }
    onresourceresponse(resourceresponse) {
      ++@responses;
      @request.jsTypes && @request.jsTypes.length === (@responses+1) && require.ready && require.ready();  
    }
    static modules = {};
  }
}
