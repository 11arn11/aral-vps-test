import {Command} from '@oclif/command'
import {IConfig} from '@oclif/config'
import {cli} from 'cli-ux'
import * as fse from 'fs-extra'
import * as path from 'path'

import {SystemModel} from '../model/system'

export default class Init extends Command {
  static description = 'describe the command here'
  system: SystemModel
  constructor(argv: string[], config: IConfig) {
    super(argv, config)
    this.system = new SystemModel()
  }
  async run() {
    const system_config_path = await cli.prompt('Dove vuoi conservare la configurazione?', {
      required: true,
      default: path.join(this.system.base_config_path, 'config')
    })
    const system_volumes_path = await cli.prompt('Dove vuoi conservare i volumi dei container?', {
      required: true,
      default: path.join(this.system.base_config_path, 'volumes')
    })
    const system_logs_path = await cli.prompt('Dove vuoi conservare i logs dei container?', {
      required: true,
      default: path.join(this.system.base_config_path, 'logs')
    })
    const system_domain = await cli.prompt('Quale dominio vuoi utilizzare?', {
      required: true,
      default: 'localhost'
    })

    fse.ensureDirSync(this.system.base_config_path)
    await fse.writeJson(this.system.config_file, {
      system_config_path,
      system_volumes_path,
      system_logs_path,
      system_domain
    })

    this.system.load_config()

    fse.ensureDirSync(this.system.config_path)
    this.log('config folder: ' + this.system.config_path)

    const default_env_file = path.join(this.system.root_app_dir, 'config_default', 'aral.env')
    fse.copyFileSync(default_env_file, this.system.env_file)
    this.log('creato: ' + this.system.env_file)

    const default_docker_compose_file = path.join(this.system.root_app_dir, 'config_default', 'aral.yml')
    fse.copyFileSync(default_docker_compose_file, this.system.docker_compose_file)
    this.log('creato: ' + this.system.docker_compose_file)

    fse.ensureFileSync(this.system.traefik_acme_file)
    this.log('creato: ' + this.system.traefik_acme_file)
    fse.chmodSync(this.system.traefik_acme_file, 600)
    this.log('permessi 600 per ' + this.system.traefik_acme_file)

    const default_traefik_config_file = path.join(this.system.root_app_dir, 'config_default', 'traefik', 'traefik.toml')
    fse.copyFileSync(default_traefik_config_file, this.system.traefik_config_file)
    this.log('creato: ' + this.system.traefik_config_file)

  }
}
