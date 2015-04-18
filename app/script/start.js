/* jshint esnext: true */
// One import in our start script is all it takes, this triggers
// a cascade of other imports and builds up our angular implementation.
//
// https://github.com/google/traceur-compiler/wiki/LanguageFeatures#modules
import 'appController.js';

// Once we've gotten here, all our angular components are registered,
// now we can boostrap angular.   
angular.bootstrap(document, ['app']);
