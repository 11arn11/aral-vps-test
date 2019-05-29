import {ProjectModel} from './project'

export class WorkspaceModel {
  project: ProjectModel
  branch: string

  constructor(project: ProjectModel, branch: string) {
    this.project = project
    this.branch = branch
  }
}
