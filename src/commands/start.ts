import {Command} from '@oclif/command'
import {IConfig} from '@oclif/config'
import * as shell from 'shelljs'

import {SystemModel} from '../model/system'

export default class Start extends Command {
  static description = 'start the system'
  system: SystemModel
  constructor(argv: string[], config: IConfig) {
    super(argv, config)
    this.system = new SystemModel()
  }
  async run() {
    this.log(this.system.config_path)
    this.log(this.system.logs_path)
    this.log(this.system.domain)
    this.log(this.system.env_file)
    this.log(this.system.docker_compose_file)
    shell.exec([
      'export SYSTEM_CONFIG_FOLDER=' + this.system.config_path,
      'export SYSTEM_VOLUME_FOLDER=' + this.system.volumes_path,
      'export SYSTEM_LOG_FOLDER=' + this.system.logs_path,
      'export SYSTEM_DOMAIN=' + this.system.domain,
      "export $(egrep -v '^#' " + this.system.env_file + ' | xargs)',
      'docker-compose -f ' + this.system.docker_compose_file + ' config',
      'docker-compose -f ' + this.system.docker_compose_file + ' -p aral_vps up -d'
    ].join(' && '))
  }
}
