## Game Directory Structure 
- `src`: Source directory where the source code of the game is stored.
  - `assets` holds all static files that are used in the game.
  - `scripts` contains all the js files for the game
- `webpack` contains the webpack configuration files. These configurations files `base.js` and `prod.js` control how the webpack processes and bundles the game scripts and assets. 
  - `base.js`: Base config that is used during development
  - `prod.js`: Used when building the production version of the game
- `index.html`: Main HTML file for the game
- `package.json`: handles the game dependecies, listing the libraries and defines scripts that can be run with npm to perform various tasks related to building and running the game.

## Prerequisites
you must have [Node.js and npm](https://nodejs.org/en/download/)  installed on your computer. npm comes bundled with Node.js, so you don't need to install it separately.
check that you've successfuly installed nodejs and npm by running the following commands
- ```node -v``` to check the version of node.js
- ```npm -v``` to check version of npm

## Installation 
Download or clone the repository to your local machine, then install the required dependencies by running the following command in the terminal:
```
npm i
```
This will read the package.json file and install the required dependencies.
## Running the Game in Development
To run the game in development mode, run the following command:

```
npm run start
```
This will start a local development server and automatically opens the game in your default browser. While running in development mode, the game will automatically update and refresh in the browser when you make changes to the code and files
## Building for Production
To build the game for production, first install a live server plugin if you haven't already and then, run the following command:
```
npm run build
```
This will generate a `dist` directory with the production files. To run the game in production, navigate to the `dist` directory and start the live server by running the following command:
```
live-server
```
This will start a server and open your default browser to display the game. By default, it should be available at `http://localhost:8080`.

