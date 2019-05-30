import * as path from 'path'

import {ProjectModel} from './project'

export class WorkspaceModel {
  project: ProjectModel
  branch: string
  name: string
  folder: string
  docker_compose: string
  env_file: string
  constructor(project: ProjectModel, branch: string) {
    this.project = project
    this.branch = branch
    this.name = path.join(this.project.client, this.project.name, this.branch).replace(new RegExp(path.sep, 'g'), '_')
    this.folder = path.join(this.project.folder, this.branch)
    this.docker_compose = path.join(this.folder, 'aral.test.yml')
    this.env_file = path.join(this.folder, '.env')
  }
}
