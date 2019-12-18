import * as path from 'path'

import {ProjectModel} from './project'

export class WorkspaceModel {
  project: ProjectModel
  branch: string
  name: string
  namespace: string
  relative_folder: string
  folder: string
  git: string
  docker_compose: string
  env_default_file: string
  env_file: string
  constructor(project: ProjectModel, branch: string) {
    this.project = project
    this.branch = branch
    this.name = path.join(this.project.client, this.project.name, this.branch).replace(new RegExp(path.sep, 'g'), '__')
    this.namespace = path.join(this.project.client, this.project.name, this.branch).replace(new RegExp(path.sep, 'g'), '.')
    this.relative_folder = path.join(this.project.client, this.project.name, this.branch)
    this.folder = path.join(this.project.folder, this.branch)
    this.git = path.join(this.folder, '.git')
    this.docker_compose = path.join(this.folder, 'aral.test.yml')
    this.env_default_file = path.join(this.folder, 'aral.env')
    this.env_file = path.join(this.folder, '.env')
  }
}
