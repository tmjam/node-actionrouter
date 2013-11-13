var Router = require('../lib/router')
  , MockApplication = require('./mocks/mockapplication');
  

describe('Router#resources', function() {
  
  function handler(controller, action) {
    return function() {
      return { controller: controller, action: action };
    }
  }
  
  describe('resources with nested resource', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      router.assist(function(name, entry) {
        app.helper(name, entry);
      });
      
      router.resources('bands', function() {
        this.resource('bio');
      });
    })
    
    it('should define application routes', function() {
      expect(Object.keys(app.map)).to.have.length(4);
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(7);
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(2);
      expect(app.map['put']).to.be.an('array');
      expect(app.map['put']).to.have.length(2);
      expect(app.map['delete']).to.be.an('array');
      expect(app.map['delete']).to.have.length(2);
    });
    
    it('should create route to nested new action', function() {
      var route = app.map['get'][4];
      expect(route.path).to.equal('/bands/:band_id/bio/new.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bio');
      expect(rv.action).to.equal('new');
    });
    
    it('should create route to nested create action', function() {
      var route = app.map['post'][1];
      expect(route.path).to.equal('/bands/:band_id/bio');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bio');
      expect(rv.action).to.equal('create');
    });
    
    it('should create route to nested show action', function() {
      var route = app.map['get'][5];
      expect(route.path).to.equal('/bands/:band_id/bio.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bio');
      expect(rv.action).to.equal('show');
    });
    
    it('should create route to nested edit action', function() {
      var route = app.map['get'][6];
      expect(route.path).to.equal('/bands/:band_id/bio/edit.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bio');
      expect(rv.action).to.equal('edit');
    });
    
    it('should create route to nested update action', function() {
      var route = app.map['put'][1];
      expect(route.path).to.equal('/bands/:band_id/bio');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bio');
      expect(rv.action).to.equal('update');
    });
    
    it('should create route to nested destroy action', function() {
      var route = app.map['delete'][1];
      expect(route.path).to.equal('/bands/:band_id/bio');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bio');
      expect(rv.action).to.equal('destroy');
    });
    
    it('should define application helpers', function() {
      expect(Object.keys(app.helpers)).to.have.length(7);
    });
    
    it('should register index helper for route', function() {
      var entry = app.helpers['bands'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('index');
    });
    
    it('should register show helper for route', function() {
      var entry = app.helpers['band'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:id.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for route', function() {
      var entry = app.helpers['newBand'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/new.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for route', function() {
      var entry = app.helpers['editBand'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:id/edit.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('edit');
    });
    
    it('should register show helper for nested route', function() {
      var entry = app.helpers['bandBio'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:band_id/bio.:format?');
      expect(entry.controller).to.equal('bio');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for nested route', function() {
      var entry = app.helpers['newBandBio'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:band_id/bio/new.:format?');
      expect(entry.controller).to.equal('bio');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for nested route', function() {
      var entry = app.helpers['editBandBio'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:band_id/bio/edit.:format?');
      expect(entry.controller).to.equal('bio');
      expect(entry.action).to.equal('edit');
    });
  });
  
  describe('resources with nested resource using namespace option', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      router.assist(function(name, entry) {
        app.helper(name, entry);
      });
      
      router.resources('bands', { namespace: true }, function() {
        this.resource('bio');
      });
    })
    
    it('should define application routes', function() {
      expect(Object.keys(app.map)).to.have.length(4);
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(7);
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(2);
      expect(app.map['put']).to.be.an('array');
      expect(app.map['put']).to.have.length(2);
      expect(app.map['delete']).to.be.an('array');
      expect(app.map['delete']).to.have.length(2);
    });
    
    it('should create route to nested new action', function() {
      var route = app.map['get'][4];
      expect(route.path).to.equal('/bands/:band_id/bio/new.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands/bio');
      expect(rv.action).to.equal('new');
    });
    
    it('should create route to nested create action', function() {
      var route = app.map['post'][1];
      expect(route.path).to.equal('/bands/:band_id/bio');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands/bio');
      expect(rv.action).to.equal('create');
    });
    
    it('should create route to nested show action', function() {
      var route = app.map['get'][5];
      expect(route.path).to.equal('/bands/:band_id/bio.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands/bio');
      expect(rv.action).to.equal('show');
    });
    
    it('should create route to nested edit action', function() {
      var route = app.map['get'][6];
      expect(route.path).to.equal('/bands/:band_id/bio/edit.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands/bio');
      expect(rv.action).to.equal('edit');
    });
    
    it('should create route to nested update action', function() {
      var route = app.map['put'][1];
      expect(route.path).to.equal('/bands/:band_id/bio');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands/bio');
      expect(rv.action).to.equal('update');
    });
    
    it('should create route to nested destroy action', function() {
      var route = app.map['delete'][1];
      expect(route.path).to.equal('/bands/:band_id/bio');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('bands/bio');
      expect(rv.action).to.equal('destroy');
    });
    
    it('should define application helpers', function() {
      expect(Object.keys(app.helpers)).to.have.length(7);
    });
    
    it('should register index helper for route', function() {
      var entry = app.helpers['bands'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('index');
    });
    
    it('should register show helper for route', function() {
      var entry = app.helpers['band'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:id.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for route', function() {
      var entry = app.helpers['newBand'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/new.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for route', function() {
      var entry = app.helpers['editBand'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:id/edit.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('edit');
    });
    
    it('should register show helper for nested route', function() {
      var entry = app.helpers['bandBio'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:band_id/bio.:format?');
      expect(entry.controller).to.equal('bands/bio');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for nested route', function() {
      var entry = app.helpers['newBandBio'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:band_id/bio/new.:format?');
      expect(entry.controller).to.equal('bands/bio');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for nested route', function() {
      var entry = app.helpers['editBandBio'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:band_id/bio/edit.:format?');
      expect(entry.controller).to.equal('bands/bio');
      expect(entry.action).to.equal('edit');
    });
  });
  
  describe('resources with nested resources', function() {
    var app, router;
    
    before(function() {
      app = new MockApplication();
      router = new Router(handler);
      router.define(function(method, path, handler) {
        app[method](path, handler);
      });
      router.assist(function(name, entry) {
        app.helper(name, entry);
      });
      
      router.resources('bands', function() {
        this.resources('albums');
      });
    })
    
    it('should define application routes', function() {
      expect(Object.keys(app.map)).to.have.length(4);
      expect(app.map['get']).to.be.an('array');
      expect(app.map['get']).to.have.length(8);
      expect(app.map['post']).to.be.an('array');
      expect(app.map['post']).to.have.length(2);
      expect(app.map['put']).to.be.an('array');
      expect(app.map['put']).to.have.length(2);
      expect(app.map['delete']).to.be.an('array');
      expect(app.map['delete']).to.have.length(2);
    });
    
    it('should create route to nested index action', function() {
      var route = app.map['get'][4];
      expect(route.path).to.equal('/bands/:band_id/albums.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('albums');
      expect(rv.action).to.equal('index');
    });
    
    it('should create route to nested new action', function() {
      var route = app.map['get'][5];
      expect(route.path).to.equal('/bands/:band_id/albums/new.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('albums');
      expect(rv.action).to.equal('new');
    });
    
    it('should create route to nested create action', function() {
      var route = app.map['post'][1];
      expect(route.path).to.equal('/bands/:band_id/albums');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('albums');
      expect(rv.action).to.equal('create');
    });
    
    it('should create route to nested show action', function() {
      var route = app.map['get'][6];
      expect(route.path).to.equal('/bands/:band_id/albums/:id.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('albums');
      expect(rv.action).to.equal('show');
    });
    
    it('should create route to nested edit action', function() {
      var route = app.map['get'][7];
      expect(route.path).to.equal('/bands/:band_id/albums/:id/edit.:format?');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('albums');
      expect(rv.action).to.equal('edit');
    });
    
    it('should create route to nested update action', function() {
      var route = app.map['put'][1];
      expect(route.path).to.equal('/bands/:band_id/albums/:id');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('albums');
      expect(rv.action).to.equal('update');
    });
    
    it('should create route to nested destroy action', function() {
      var route = app.map['delete'][1];
      expect(route.path).to.equal('/bands/:band_id/albums/:id');
      expect(route.handler).to.be.a('function');
      
      var rv = route.handler();
      expect(rv.controller).to.equal('albums');
      expect(rv.action).to.equal('destroy');
    });
    
    it('should define application helpers', function() {
      expect(Object.keys(app.helpers)).to.have.length(8);
    });
    
    it('should register index helper for route', function() {
      var entry = app.helpers['bands'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('index');
    });
    
    it('should register show helper for route', function() {
      var entry = app.helpers['band'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:id.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for route', function() {
      var entry = app.helpers['newBand'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/new.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for route', function() {
      var entry = app.helpers['editBand'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:id/edit.:format?');
      expect(entry.controller).to.equal('bands');
      expect(entry.action).to.equal('edit');
    });
    
    it('should register index helper for nested route', function() {
      var entry = app.helpers['bandAlbums'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:band_id/albums.:format?');
      expect(entry.controller).to.equal('albums');
      expect(entry.action).to.equal('index');
    });
    
    it('should register show helper for nested route', function() {
      var entry = app.helpers['bandAlbum'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:band_id/albums/:id.:format?');
      expect(entry.controller).to.equal('albums');
      expect(entry.action).to.equal('show');
    });
    
    it('should register new helper for nested route', function() {
      var entry = app.helpers['newBandAlbum'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:band_id/albums/new.:format?');
      expect(entry.controller).to.equal('albums');
      expect(entry.action).to.equal('new');
    });
    
    it('should register edit helper for nested route', function() {
      var entry = app.helpers['editBandAlbum'];
      
      expect(entry).to.be.an('object');
      expect(entry.pattern).to.equal('/bands/:band_id/albums/:id/edit.:format?');
      expect(entry.controller).to.equal('albums');
      expect(entry.action).to.equal('edit');
    });
  });
  
});
