'use strict'

const co = require('co')
const cli = require('heroku-cli-util')
const {Dyno} = require('heroku-run')

function * run (context, heroku) {
  let opts = {
    heroku: heroku,
    app: context.app,
    command: `mkdir vim
    curl https://github.com/devilus/heroku-vim/blob/master/vim-static.tar.gz --location --silent | tar xz -C vim
      export PATH=$PATH:/app/vim/
    bash`,
    env: context.flags.env,
    showStatus: false,
    attach: true
  }
  if (!opts.command) throw new Error('Usage: heroku run COMMAND\n\nExample: heroku run bash')

  let dyno = new Dyno(opts)
  yield dyno.start()
}

const vim = {
  topic: 'vim',
  needsAuth: true,
  needsApp: true,
  run: cli.command(co.wrap(run))
}

exports.commands = [
  vim
]
