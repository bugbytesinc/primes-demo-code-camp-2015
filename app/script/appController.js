/* jshint esnext: true */
import {app} from 'appModule.js';
import {computePrimes} from 'computePrimes.js';

class AppController {

  constructor() {

    this.limit = null;
    this.primes = [];
  }

  onClear() {
    this.limit = null;
    this.primes = [];
  }

  onCompute() {
    this.primes = [];
    for(var prime of computePrimes(this.limit)) {
      this.primes.unshift(prime);
    }
  }
}

app.controller('AppController', AppController);
