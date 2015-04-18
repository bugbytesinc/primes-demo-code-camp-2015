/* jshint esnext: true */
import {app} from 'appModule.js';

class AppController {

  constructor($timeout) {

    var digestQueued = false;
    var worker = null;

    var vm = this;
    vm.limit = null;
    vm.primes = [];

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

    function stopWorker() {
      if(worker){
        worker.removeEventListener('message',onWorkerReady);
        worker.removeEventListener('message',onWorkerData);
        worker.removeEventListener('error',onError);
        worker.terminate();
        worker = null;
      }
    }

    function startWorker(){
      worker = new Worker('script/worker.js');
      worker.addEventListener('message',onWorkerReady);
      worker.addEventListener('error',onError);
    }

    function onWorkerReady(){
      worker.removeEventListener('message',onWorkerReady);
      worker.addEventListener('message',onWorkerData);
      worker.postMessage(parseInt(vm.limit,10));
    }

    function onWorkerData(event){
      vm.primes.unshift(event.data);
      if(!digestQueued) {
        digestQueued = true;
        $timeout(triggerDigest,100);
      }
    }

    function triggerDigest() {
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
