/* jshint worker: true */
(function(global){
  'use strict';
  importScripts('../lib/traceur.js');
  var version =  new global.traceur.runtime.TraceurLoader().version;
  var webLoader = System.get(version+"/src/runtime/webLoader.js").webLoader;
  global.System = new global.traceur.runtime.TraceurLoader(webLoader,global.location.href);
  System.map = System.semverMap(System.version);
  System.import('primesWorker.js').catch(function(ex) {
    console.error('Internal Error ', ex.stack || ex);
  });
})(self);
