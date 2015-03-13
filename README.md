# Government of Canada Vehicle Recall

## Purpose
This application serves a basic web form interface for querying and displaying recall data from the Government of
Canada API.

## Details
The application is written in TypeScript as an HTML5 application, utilizing Node and Bower for package management
and tsd for TypeScript definitions.

### Getting Started
After cloning the repository, open a terminal / command prompt and invoke:
```shell
npm install && bower install
```

Once this has run it's course, you will have all of the dependencies required to start the server.

### Starting the server
At the terminal / command prompt, invoke the following command:
```shell
node node-app.js
```

This will start the application on port 3000 by default. You can now open a browser to http://localhost:3000 and begin
using the basic form controls to query the recall database.

#### Note on forking
This was developed with JetBrains WebStorm 9.0.3, using the built-in TypeScript file watcher process. To modify the
TypeScript files manually, you'll need to use an IDE that has a similar capability, or configure your build process to
leverage tsc.exe (a la grunt-tsc) to generate .js files that can be served by the browser.