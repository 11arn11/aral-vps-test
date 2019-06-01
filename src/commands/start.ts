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
      "export HOST_OS_IP=$(ifconfig | grep -E \"([0-9]{1,3}\.){3}[0-9]{1,3}\" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1)",
      "export $(egrep -v '^#' " + this.system.env_file + ' | xargs)',
      'docker-compose -f ' + this.system.docker_compose_file + ' config',
      'docker-compose -f ' + this.system.docker_compose_file + ' -p aral_vps up -d'
    ].join(' && '))
  }
}
