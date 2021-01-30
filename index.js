#!/usr/bin/env node

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal');
const fs = require('fs');
//name variable after library, unless it's long like lodash.debounce
//or unliess otherwise specified, like caporal. caproal documentation states program

program
  .version('0.0.1')
  .argument('[filename]', 'Name of a file to execute')
  .action( async ({filename})=>{
    //using filename as an arguement

    const name = filename || 'index.js';

    try {
    await fs.promises.access(name);
//if name file doesn't exist, it creates an error.
    } catch (err) {
      throw new Error(`Could not find the file ${name}`);
    }

    const start = debounce(() => {
      console.log('STARTING USERS PROGRAM');
    }, 100);
    
    chokidar
      .watch('.')
      .on('add', start)
      .on('change', () => start)
      .on('unlink', () => start);
  });

program.parse(process.argv);


