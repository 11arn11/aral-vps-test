import {Command} from '@oclif/command'
import {IConfig} from '@oclif/config'
import execa = require('execa')
import Listr = require('listr')

import {SystemModel} from '../../model/system'

export default class WorkspaceStartAll extends Command {
  static description = 'describe the command here'
  system: SystemModel
  constructor(argv: string[], config: IConfig) {
    super(argv, config)
    this.system = new SystemModel()
  }
  async run() {
    this.log('Workspace list file: ' + this.system.workspace_list_file)

    const workspace_list: any = []

    Object.keys(this.system.workspace_list_load()).forEach(workspace => {
      workspace_list.push({
        title: 'aral workspace:start ' + workspace,
        task: () => execa.shell('aral workspace:start ' + workspace),
      })
    })

    // console.dir(workspace_list, {depth: null, colors: true})

    new Listr(workspace_list).run().catch(err => {
      console.error(err)
    })

    // shell.exec('chgrp -R 33 ' + this.workspace.folder)

  }
}
