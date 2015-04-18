/* jshint esnext: true */
export function* computePrimes(maxInclusive){
  primes: for(var target = 2; target <= maxInclusive; target ++ ) {
    for(var spoiler = 2; spoiler < target; spoiler ++) {
      if(Math.floor(target/spoiler)===target/spoiler) {
        continue primes;
      }
    }
    yield target;
  }
}
