/* jshint worker: true */
(function(global){
  'use strict';
  // First, load the Traceur Compiler library.
  importScripts('../lib/traceur.js');
  // The names of the internal traceur components we need to bootstrap
  // our web worker are prepended with the library version. But there
  // is no default implementation exposing the library's version number.
  // So we instantiate a throw away TraceurLoader to just get the
  // library's version.
  var version =  new global.traceur.runtime.TraceurLoader().version;
  // We need a loader that works in the context of a web worker.  The
  // browser loader (which we used in the UI thread) assumes that there
  // is a window object so we can't use that.  Instead we use the base
  // TraceurLoader itself.  However, it needs loader implementation.
  // So we instantiate what is called the "webLoader", which actually
  // should be called an XHR Loader, for that it the mechanism it uses
  // to obtain files from the server.
  var webLoader = System.get(version+"/src/runtime/webLoader.js").webLoader;
  // Now we can proceed with a configured loader in a maner similar to:
  // http://google.github.io/traceur-compiler/demo/repl.html#
  global.System = new global.traceur.runtime.TraceurLoader(webLoader,global.location.href);
  System.map = System.semverMap(System.version);
  System.import('primesWorker.js').catch(function(ex) {
    console.error('Internal Error ', ex.stack || ex);
  });
})(self);
