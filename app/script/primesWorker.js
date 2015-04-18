/* jshint esnext: true */
/* jshint worker: true */
import {computePrimes} from 'computePrimes.js';

activate();

// To avoid a race condition where the UI code instantiating this
// worker sends messages before we've attached our listener, we
// perform a hand-shake over the communication channel indicating
// we are ready to receive messages and process.
function activate(){
  addEventListener('message',run);
  // We could send other information back about this worker
  // implementation if we wanted to, but an empty message will
  // suffice for this implementation.
  postMessage({});
}

// This is function that is eventually invoked by the UI code.
// It iterates over the results produced by the computePrimes
// method, raising events as data is available.  Note: the first
// action this method takes is to unregester its listener, this
// implementation is inteded to be one-run-only.  Computing a
// different set of primes spawns a new worker instance.
//
// Also note how convenient it is to write a for-of loop to iterate
// over the list of prime numbers and fire off the message to
// the UI thread.
//
// https://github.com/google/traceur-compiler/wiki/LanguageFeatures#iterators-and-for-of
function run(event){
  removeEventListener('message',run);
  for(var prime of computePrimes(event.data)) {
    postMessage(prime);
  }
  // There is no need to keep the worker alive after we've
  // computed the primes so we terminate the process so the
  // browser can re-claim the underlying thread.
  self.close();
}
