###BlogProject
This blog project is based on the project developed on Carlos Azaustre's book "Desarrollo web ágil con AngularJS" but using a more complete project structure, components and any AngularJS 1.5.7 newer and advisable features which will be featured in a similar way in AngularJS 2.

###Installed Dependencies and Libraries

```
npm install -g gulp (tasks launcher)  
npm install -g bower  
```

####_(Dependencies related with automatize Javascript code correction, minifying CSS, creation of a webserver, realtime browser updates...)_

```
npm install --save-dev gulp  
npm install --save-dev gulp-connect  
npm install --save-dev connect-history-api-fallback  
npm install --save-dev gulp-jshint  
npm install --save-dev gulp-useref  
npm install --save-dev gulp-if  
npm install --save-dev gulp-uglify  
npm install --save-dev gulp-minify-css  
npm install --save-dev gulp-stylus  
npm install --save-dev nib  
npm install --save-dev jshint-stylish  

bower install --save angular-route ($routeProvider)  
bower install --save angular-resource (ajax $resource cleaner way to GET/POST)  
```

####_(Dependencies related with injection of CSS & Javascript files and Bower libraries to the HTML page)_

```
npm install --save-dev gulp-inject  
npm install --save-dev wiredep

bower install --save angular  
bower install --save bootstrap
```

###Config Files

* package.json (npm init)<br />
* bower.json (bower init)<br />
* .bowerrc<br />
* .editorconfig<br />
* .jshintrc<br />
* Gulpfile.js


###Bugs modifications

Added this code to bower.json, due to wiredep not injecting the CSS bootstrap in the HTML file:

```
	"overrides": {  
	  "bootstrap": {  
	    "main": [  
	      "dist/js/bootstrap.js",  
	      "dist/css/bootstrap.css",  
	      "less/bootstrap.less"  
	        ]  
	    }  
	}
```

