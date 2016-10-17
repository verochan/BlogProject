###The Kitty Blog Project
This blog project is based on the project developed on Carlos Azaustre's book "Desarrollo web ágil con AngularJS" but using a more complete project structure, components and any AngularJS 1.5.7 newer and advisable features which will be featured in a similar way in AngularJS 2.

###Installation

* Install Node.js in your development environment
* Install the project dependencies:

```
$ npm install
```

* Execute Gulp start to initialise the environment

```
$ gulp start
```

* Execute Bower install to initialise the Bower dependencies

```
$ bower install
```

* Execute gulp default to run the default task which involves: Injecting CSS and JS, initialising the development server, injecting Bower libraries and the watch tasks

```
$ gulp
You can visit the project on http://localhost:8080
```

* Execute Karma start or the task gulp test to see if the tests are passing

```
$ karma start
OR
$ gulp test
```

* Execute gulp build for creation the dist version of the project

```
$ gulp build
```

* Execute gulp server-dist to initialise the production server

```
$ gulp server-dist 
You can visit the project on http://localhost:8081
```

###Config Files

* package.json (npm init)<br />
* bower.json (bower init)<br />
* .bowerrc<br />
* .editorconfig<br />
* .jshintrc<br />
* Gulpfile.js

###Files structure

```
- app/
  - lib/
  - modules/
    - comments/
      - test/
        - specs.js
      - services.js
    - posts/
      - test/
        - specs.js
      - views/
        - post-create-extra-data.tpl.html
        - post-create.tpl.html
        - post-detail-comments.tpl.html
        - post-detail-user.tpl.html
        - post-detail.tpl.html
        - post-image-preview.tpl.html
        - post-list.tpl.html
        - post-save-image-preview.tpl.html
      - controllers.js
      - module.js
      - services.js  
    - users/
      - test/
          - specs.js
      - views/
        - user-detail.tpl.html
        - users-list.tpl.html
      - controllers.js
      - module.js
      - services.js
  - scripts/
    - app.js
    - templates.js
  - stylesheets/
  - dist/
    - css/
    - js/
      - app.min.js
      - vendor.min.js
    - about-me.html
    - index.html
    - .htaccess
  - node_modules/
  - index.html
  - about-me.html  
```  

###Project modules summary

####Comments module

This module throughout the Comment factory on services.js retrieves the comments of a selected post. On test/specs.js are written the specs which test the response of the API calls.

####Users module

The service.js factory gets a list of users or a single selected user. 
The controller provides the needed functions to the views to retrieve a list of users to display or a single user profile.
The module creates its configuration by preparing the suitable routing to access the different pages related with users and initialising googlemapsapi. Next to the configuration function, it is defined the module's components and the necessary dependencies are injected.
The tests test the service calls and if the controller variables needed for the views are accessible.

####Posts module

On this service.js, apart from the factory which gets a list of posts or a single post, there's a closure function which saves and returns an image set as preview on the new post page.
The controller provides functions to preview text and image changes on the form page view, as well as functions to save the new post, besides functions to retrieve the posts or post complete data.
Due to Angular's component binding not supporting inputs of type file with ng-change, the module counts with a specific directive that provides the same functionality needed to preview the post image the user selects. As in the Users'module, it's also defined the routing configuration and all the needed components to provide the posts list, post details page and new post along its preview page.
The tests test the service calls, if the controller variables needed for the views are accessible and the preview image behaviour.

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

Changed historyApiFallback from this: ```return [ historyApiFallback ]``` to this: ```return [ historyApiFallback() ]``` (on newer versions of connect-history-api-fallback it changed to be called as a function), final code:

```
gulp.task('server', function() {
  connect.server({
    root: './app',
    //hostname: '0.0.0.0',
    //port: 8080,
    livereload: true,
    middleware: function(server, opt) {
      return [ historyApiFallback() ];
    }
  });
});
```
