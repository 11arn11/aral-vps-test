import {Command} from '@oclif/command'
import {IConfig} from '@oclif/config'
import * as shell from 'shelljs'

import {SystemModel} from '../model/system'

export default class Start extends Command {
  static description = 'describe the command here'
  system: SystemModel
  constructor(argv: string[], config: IConfig) {
    super(argv, config)
    this.system = new SystemModel()
  }
  async run() {
    this.log(this.system.env_file)
    shell.exec([
      'export SYSTEM_CONFIG_FOLDER=' + this.system.config_path,
      "export $(egrep -v '^#' " + this.system.env_file + ' | xargs)',
      'docker-compose -f ' + this.system.docker_compose + ' config',
      'docker-compose -f ' + this.system.docker_compose + ' -p aral_vps up -d'
    ].join(' && '))
  }
}
