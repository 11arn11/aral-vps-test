import {Command} from '@oclif/command'
import {IConfig} from '@oclif/config'
import {cli} from 'cli-ux'
import * as fse from 'fs-extra'
import * as path from 'path'

import {SystemModel} from '../model/system'

export default class Init extends Command {
  static description = 'start configuration wizard'
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

    const temp = {
      system_config_path,
      system_volumes_path,
      system_logs_path,
      system_domain
    }
    this.debug(temp)

    this.log('cerco (e nel caso creo) la cartella : ' + this.system.base_config_path)
    fse.ensureDirSync(this.system.base_config_path)

    this.log('creo il file: ' + this.system.config_file)
    await fse.writeJson(this.system.config_file, temp)

    this.system.load_config()

    fse.ensureDirSync(this.system.config_path)
    this.log('system.config_path: ' + this.system.config_path)

    this.log('this.system.root_app_dir: ' + this.system.root_app_dir)
    const default_config_folder = path.join(this.system.root_app_dir, 'config_default')
    this.log('default_config_folder: ' + default_config_folder)
    fse.copySync(default_config_folder, this.system.config_path)

    this.log('creato: ' + this.system.env_file)

    this.log('creato: ' + this.system.docker_compose_file)

    this.log('creato: ' + this.system.traefik_acme_file)
    this.log('ricordati di impostare i permessi di ' + this.system.traefik_acme_file)

    this.log('creato: ' + this.system.traefik_config_file)

  }

}
