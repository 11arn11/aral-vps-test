import * as fse from 'fs-extra'
import * as path from 'path'

export class SystemModel {
  config_path: string
  volumes_path: string
  logs_path: string
  data_path: string
  config_file: string
  env_file: string
  docker_compose_file: string
  constructor(base_config_path: string) {
    this.config_file = path.join(base_config_path, 'config.json')
    if (fse.existsSync(this.config_file)) {
      const config = fse.readJSONSync(this.config_file)
      //
      this.config_path = config.system_config_path
      this.env_file = path.join(this.config_path, 'aral.env')
      this.docker_compose_file = path.join(this.config_path, 'aral.yml')
      this.volumes_path = path.join(this.config_path, 'volumes')
      this.logs_path = path.join(this.config_path, 'logs')
      //
      this.data_path = config.data_path
    } else {
      this.config_path = ''
      this.env_file = ''
      this.docker_compose_file = ''
      this.data_path = ''
      this.volumes_path = ''
      this.logs_path = ''
    }

  }
}
