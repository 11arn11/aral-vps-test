import {Command} from '@oclif/command'
import {IConfig} from '@oclif/config'

import {SystemModel} from '../../model/system'

export default class WorkspaceList extends Command {
  static description = 'list all created workspace (started or not)'
  system: SystemModel
  constructor(argv: string[], config: IConfig) {
    super(argv, config)
    this.system = new SystemModel()
  }
  async run() {
    this.log('Workspace list file: ' + this.system.workspace_list_file)

    console.dir(this.system.workspace_list_load(), {depth: null, colors: true})

    // shell.exec('chgrp -R 33 ' + this.workspace.folder)

  }
}
