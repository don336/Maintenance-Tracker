# Maintenance-Tracker

Getting Started

This is an example of how you may give instructions on setting up this project locally on your local machine.

Perequisites
  This is an example on how you can install all dependecies needed for the application to run it's server
  1. npm install
  2. yarn install

Running the application
  in your console, type npm run [scripts]
      "scripts": {
        "start": "nodemon babel-node src/backend/index.js",
        "dev": "env-cmd -f src/backend/config/dev.env nodemon --watch src --exec babel-node src/backend/index.js",
        "test": "env-cmd -f src/backend/config/test.env  jest --forceExit --detectOpenHandles --coverage",
        "lint": "prettier --write ."
    }

[![Node.js CI](https://github.com/don336/Maintenance-Tracker/actions/workflows/node.js.yml/badge.svg)](https://github.com/don336/Maintenance-Tracker/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/don336/Maintenance-Tracker/badge.svg?branch=main)](https://coveralls.io/github/don336/Maintenance-Tracker?branch=main)

