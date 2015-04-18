/* jshint esnext: true */
/* jshint worker: true */
import {computePrimes} from 'computePrimes.js';

activate();

function activate(){
  addEventListener('message',run);
  postMessage({});
}

function run(event){
  removeEventListener('message',run);
  for(var prime of computePrimes(event.data)) {
    postMessage(prime);
  }
  self.close();
}
