'use strict';

const co = require('co')
const cli = require('heroku-cli-util')

function * run (context, heroku) {
}

const vim = {
  topic: 'vim',
  run: cli.command(co.wrap(run))
}

exports.commands = [
  vim
]
