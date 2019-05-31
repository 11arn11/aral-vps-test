import {Command} from '@oclif/command'
import {IConfig} from '@oclif/config'
import {cli} from 'cli-ux'
import * as execa from 'execa'
import * as fse from 'fs-extra'
import * as path from 'path'

import {SystemModel} from '../model/system'

export default class Init extends Command {
  static description = 'describe the command here'
  system: SystemModel
  constructor(argv: string[], config: IConfig) {
    super(argv, config)
    this.system = new SystemModel(this.config.configDir)
  }
  async run() {
    const system_config_path = await cli.prompt('Dove vuoi conservare la configurazione?', {
      required: true,
      default: this.config.configDir
    })
    const system_volumes_path = await cli.prompt('Dove vuoi conservare i volumi dei container?', {
      required: true,
      default: path.join(this.config.dataDir, 'volumes')
    })
    const system_logs_path = await cli.prompt('Dove vuoi conservare i logs dei container?', {
      required: true,
      default: path.join(this.config.dataDir, 'logs')
    })
    const system_domain = await cli.prompt('Quale dominio vuoi utilizzare?', {
      required: true,
      default: 'localhost'
    })
    fse.ensureDirSync(this.config.configDir)
    await fse.writeJson(this.system.config_file, {
      system_config_path,
      system_volumes_path,
      system_logs_path,
      system_domain
    })
    const default_env_file = path.join('config_default', 'aral.env')
    const default_docker_compose_file = path.join('config_default', 'aral.yml')
    fse.copyFileSync(default_env_file, this.system.env_file)
    fse.copyFileSync(default_docker_compose_file, this.system.docker_compose_file)
  }
}
