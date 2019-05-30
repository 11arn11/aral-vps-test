import * as GitUrlParse from 'git-url-parse'
import * as path from 'path'

import {SystemModel} from './system'

export class ProjectModel {
  system: SystemModel
  repository_url: string
  provider: string
  name: string
  client: string
  full_name: string
  folder: string
  constructor(system: SystemModel, repository: string) {
    this.system = system
    this.repository_url = repository
    const gitUrlParse = GitUrlParse(repository)
    const full_name = gitUrlParse.name
    const full_name_array = full_name.split('-')
    this.provider = gitUrlParse.resource
    this.name = full_name_array[1]
    this.client = full_name_array[0]
    this.full_name = path.join(this.provider, this.client, this.name)
    this.folder = path.join(this.system.volumes_path, this.full_name)
  }
}
