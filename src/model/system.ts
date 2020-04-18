import * as fse from 'fs-extra'
import * as os from 'os'
import * as path from 'path'

export class SystemModel {
  root_app_dir: string
  base_config_path: string
  config_path: string
  volumes_path: string
  logs_path: string
  data_path: string
  config_file: string
  env_file: string
  domain: string
  docker_compose_file: string
  traefik_acme_file: string
  traefik_config_file: string
  workspace_list_file: string
  constructor() {
    this.root_app_dir = path.resolve(__dirname, '..', '..')

    this.base_config_path = path.join(os.homedir(), 'aral-vps-test')

    this.config_file = path.join(this.base_config_path, 'config.json')
    this.workspace_list_file = path.join(this.base_config_path, 'workspace.json')

    this.config_path = ''
    this.env_file = ''
    this.docker_compose_file = ''
    this.traefik_acme_file = ''
    this.traefik_config_file = ''
    this.data_path = ''
    this.volumes_path = ''
    this.logs_path = ''
    this.domain = ''

    this.load_config()

  }
  load_config() {
    if (fse.existsSync(this.config_file)) {
      const config = fse.readJSONSync(this.config_file)
      //
      this.domain = config.system_domain
      this.config_path = config.system_config_path
      this.volumes_path = config.system_volumes_path
      this.env_file = path.join(this.config_path, 'aral.env')
      this.docker_compose_file = path.join(this.config_path, 'aral.yml')
      this.traefik_acme_file = path.join(this.config_path, 'traefik', 'acme.json')
      this.traefik_config_file = path.join(this.config_path, 'traefik', 'traefik.toml')
      this.logs_path = path.join(this.config_path, 'logs')
      //
      this.data_path = config.data_path
    }
  }
  workspace_list_add(repository: string, branch: string, provider: string) {
    fse.ensureDirSync(path.dirname(this.workspace_list_file))

    if (!fse.pathExistsSync(this.workspace_list_file)) {
      fse.writeJSONSync(this.workspace_list_file, {})
    }

    const workspace_list = this.workspace_list_load()

    const workspace_entry = [repository, branch, provider].join(' ')

    workspace_list[workspace_entry] = new Date().toISOString()

    fse.writeFileSync(this.workspace_list_file, JSON.stringify(workspace_list, null, 4))
  }
  workspace_list_load() {
    return fse.readJSONSync(this.workspace_list_file)
  }
}
