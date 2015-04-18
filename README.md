# Primes (NoVA Code Camp 2015)

This project is taken from the Nova Code Camp 2015 Demo "Writing your webapp with the help of ES6 today".  It demonstrates how to use traceur to transpile ES6 int ES5 in the browser for use in an angular 1.3 web application that generates a list of prime numbers.  The intent of this demo is to show a developer's first potential steps in integrating these technologies.  For a more elaborate demo, please see [ColumnStudy](https://github.com/bugbytesinc/column-study-js).

  Additionally, Michael Bromley has created an excellent tutorial, [Exploring ES6 Classes In AngularJS 1.x](http://www.michaelbromley.co.uk/blog/350/exploring-es6-classes-in-angularjs-1-x) that has significantly helped me understand how to integrate these technologies.  His blog post has a companion project on github [michaelbromley/angular-es6](https://github.com/michaelbromley/angular-es6).  I highly recommend you also consider studying this blog post and companion demo project.

## Development Environment Setup

**If using visual studio or some other IDE able to serve a website:** you should be able to create a new website at the _app_ directory of this project and host it using the your IDE of choice.

 -- or --

**If using a simple editor:** this project includes a [Node.js](https://nodejs.org/) package.json and associated [Gulp](http://gulpjs.com/) gulpfile.js that can be used to to instantiate a local webserver at http://localhost:8000 .

If not already installed, install [Node.js](https://nodejs.org/).

Next, [Gulp](http://gulpjs.com/) must be installed globally:


```sh
$ npm install -g gulp
```

After that, clone the Column Study Repository and install the npm libaries:

```sh
$ git clone https://github.com/bugbytesinc/code-camp-2015/primes-demo.git primes
$ cd primes
$ npm install
```

If all goes well, you can start a development server within gulp (gulp-connect) with the default gulp task:

```sh
$ gulp
```

The above command starts a local server at http://localhost:8000

Start editing the source files and have fun.  The project also enables gulp-connect/reload, changes in source files should quickly appear in your browser window.
