/* jshint esnext: true */
import {app} from 'appModule.js';

// This class implements the main angular controller for our application.
// Its implementation demonstrates the  use of ES6 classes.  After reviewing
// this code, one may be able to make the argument that a regular old
// factory method might be eaiser to read and understand, I might agree.
//
// https://github.com/google/traceur-compiler/wiki/LanguageFeatures#classes
class AppController {

  // The constructor method is where the angular injection happens,
  // the $inject property has to be below the class since the class
  // needs to be defined first.
  constructor($timeout) {

    // We will still use a closure to hide some implementation details.
    var digestQueued = false;
    var worker = null;

    // We only want to expose 4 properties to the outside world,
    // the prime number limit, the list of primes, and two button
    // click handlers.  There are a number of enclosed methods that
    // reference these properties of 'this' as captured by the vm
    // variable.  Looking at this code...wouldn't just a regular
    // factory method be eaiser to read?  Just because you can use
    // a class for a controller ...
    var vm = this;
    vm.limit = null;
    vm.primes = [];

    // Note, we save a little room using arrow functions...
    //
    // https://github.com/google/traceur-compiler/wiki/LanguageFeatures#arrow-functions
    vm.onClear = () => {
      stopWorker();
      vm.limit = null;
      vm.primes = [];
    };

    vm.onCompute = () => {
      stopWorker();
      vm.primes = [];
      startWorker();
    };

    // If we have a worker that is still generating prime numbers,
    // we want to stop it immediately.
    function stopWorker() {
      if(worker){
        worker.removeEventListener('message',onWorkerReady);
        worker.removeEventListener('message',onWorkerData);
        worker.removeEventListener('error',onError);
        worker.terminate();
        worker = null;
      }
    }

    // This method wires up a new worker and listens for
    // prime numbers being generated by the worker thread.
    // Notice we have a bit of a hand-shake to bootstrap
    // communication betwen the controller and web worker.
    // We need to wait for the worker to be spun up and ready
    // before we send the message (containing the maximum prime
    // number to generate).  If we don't perform this ping/pong
    // message hand-shake, we might send our message before the
    // remote worker has had the chance to setup its listener
    // and nothing will happen.
    function startWorker(){
      worker = new Worker('script/worker.js');
      worker.addEventListener('message',onWorkerReady);
      worker.addEventListener('error',onError);
    }

    // The first message from the worker indicates it is ready
    // to receive messages, so we can now send our message
    function onWorkerReady(){
      worker.removeEventListener('message',onWorkerReady);
      worker.addEventListener('message',onWorkerData);
      worker.postMessage(parseInt(vm.limit,10));
    }

    // The worker messages come in outside of the angular digest
    // loop.  They also come in at a rapid rate, so for performance,
    // we do now want to digest every single update.  This example
    // limits the refresh rate to 10 times a second.  The nice side-
    // affect of using $timeout is that angular invokes a digest loop
    // on our behalf.
    function onWorkerData(event){
      vm.primes.unshift(event.data);
      // There is also a practical limit of how many numbers we
      // ought to display on the screen, for now limit to the
      // 500 largest...
      if(vm.primes.length>500) {
        vm.primes.pop();
      }
      if(!digestQueued) {
        digestQueued = true;
        $timeout(triggerDigest,100);
      }
    }

    function triggerDigest() {
      // By side-affect of running this method, a digest will
      // occur. and any changes to vm.primes will be reflected
      // in the DOM.
      digestQueued = false;
    }

    function onError(error){
      console.log(error.message||error.toString());
      stopWorker();
    }
  }
}

AppController.$inject = ['$timeout'];

app.controller('AppController', AppController);
