import * as path from 'path'

export class SystemModel {
  config_path: string
  env_file: string
  docker_compose: string
  volumes_path: string
  constructor() {
    this.config_path = '/Users/andrea.nigro/VisualStudioCodeProjects/aral-vps-test/__config'
    this.env_file = path.join(this.config_path, 'aral.env')
    this.docker_compose = path.join(this.config_path, 'aral.yml')
    this.volumes_path = '/Users/andrea.nigro/VisualStudioCodeProjects/aral-vps-test/__volumes'
  }
}
