import {Command} from '@oclif/command'
import {IConfig} from '@oclif/config'
import * as shell from 'shelljs'

import {SystemModel} from '../../model/system'

export default class WorkspaceStartAll extends Command {
  static description = 'describe the command here'
  system: SystemModel
  constructor(argv: string[], config: IConfig) {
    super(argv, config)
    this.system = new SystemModel()
  }
  async run() {
    this.log(this.system.workspace_list_file)
    console.log(this.system.workspace_list_load())

    // shell.exec('chgrp -R 33 ' + this.workspace.folder)

  }
}
