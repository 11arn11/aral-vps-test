import {Command} from '@oclif/command'
import execa = require('execa')
import Listr = require('listr')

export default class DestroyAll extends Command {
  static description = 'remove all system container. After this command you will have to set authorized_keys of Webhook container again'
  async run() {
    new Listr([
      {
        title: 'Stop all container',
        task: () => execa.shell('docker stop --time 30 $(docker ps -aq)'),
        skip: () => execa.shellSync('docker ps -aq').stdout === ''
      },
      {
        title: 'Remove all container',
        task: () => execa.shell('docker rm $(docker ps -aq)'),
        skip: () => execa.shellSync('docker ps -aq').stdout === ''
      },
      {
        title: 'Remove all volumes',
        task: () => execa.shell('docker volume prune -f')
      },
      {
        title: 'Remove all network',
        task: () => execa.shell('docker network prune -f')
      }
    ]).run().catch(err => {
      console.error(err)
    })
  }
}
