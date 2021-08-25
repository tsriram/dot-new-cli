#!/usr/bin/env node

/**
 * dot-new-cli
 * CLI for .new shortcuts
 *
 * @author Sriram Thiagarajan <https://twitter.com/tsriram>
 */

const data = require('./data.json');
const open = require('open');
const meow = require('meow');
const chalk = require('chalk');

const red = chalk.red;
const blue = chalk.blue;

const helpText = `
Usage:
  $ new <shortcut>

Example:
  $ new docs --> Opens ${blue('https://docs.new')}

All shortcuts are listed here - ${blue('https://whats.new/shortcuts')}
`;

const cli = meow(helpText);

(async () => {
  const inputShortcut = cli.input[0];

  if (inputShortcut === undefined) {
    console.log('Invalid usage. Run `new --help` to see usage instructions.');
  }

  const shortcut = data[inputShortcut];
  if (shortcut) {
    await open(shortcut.url);
    console.log(`Opened ${blue(shortcut.url)} in your default browser`);
  } else {
    console.error(red(`Shortcut not found:  ${inputShortcut}`));
    console.log(
      `Found a problem? Please report here --> ${blue(
        'https://github.com/tsriram/dot-new-cli/issues/new'
      )}`
    );
  }
})();
