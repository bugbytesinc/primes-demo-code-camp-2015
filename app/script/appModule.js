/* jshint esnext: true */
/* exported app */

// One really nice thing about ES6 is its module loading.
// So now, we can define our module in one file and then
// reference it through 'import', and we never have to worry
// about script ordering again!
//
// https://github.com/google/traceur-compiler/wiki/LanguageFeatures#modules
export var app = angular.module('app', []);
