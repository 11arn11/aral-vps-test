import {Command} from '@oclif/command'
import {IConfig} from '@oclif/config'
import * as shell from 'shelljs'

import {ProjectModel} from '../../model/project'
import {SystemModel} from '../../model/system'
import {WorkspaceModel} from '../../model/workspace'

export default class WorkspaceStart extends Command {
  static description = 'start a branch repository workspace'
  static args = [
    {name: 'repository', required: true},
    {name: 'branch', required: true},
    {name: 'provider'}
  ]
  system: SystemModel
  repository: string
  project: ProjectModel
  workspace: WorkspaceModel

  constructor(argv: string[], config: IConfig) {
    super(argv, config)
    this.system = new SystemModel()
    const {args} = this.parse(WorkspaceStart)
    this.repository = args.repository
    this.project = new ProjectModel(this.system, args.repository)
    this.workspace = new WorkspaceModel(this.project, args.branch)
  }

  async run() {
    this.log(this.system.env_file)
    this.log(this.workspace.env_file)
    this.log(this.workspace.docker_compose)
    this.log(this.workspace.name)

    const workspace_base_url = [
      this.workspace.branch,
      '.',
      this.project.name,
      '.',
      this.system.domain
    ].join('').replace(new RegExp('_|/', 'g'), '-')

    shell.exec('chgrp -R 33 ' + this.workspace.folder)

    shell.exec([
      "export $(egrep -v '^#' " + this.system.env_file + ' | xargs)',
      "export $(egrep -v '^#' " + this.workspace.env_default_file + ' | xargs)',
      "export $(egrep -v '^#' " + this.workspace.env_file + ' | xargs)',
      'export STAGE=' + this.workspace.branch.replace(new RegExp('_|/', 'g'), '-'),
      'export WORKSPACE_NAME=' + this.workspace.name,
      'export WORKSPACE_NAMESPACE=' + this.workspace.namespace,
      'export WORKSPACE_BASE_URL=' + workspace_base_url,
      'export WORKSPACE_RELATIVE_FOLDER=' + this.workspace.relative_folder,
      'export MYSQL_DATABASE=' + this.workspace.name,
      'docker-compose -f ' + this.workspace.docker_compose + ' config',
      'docker-compose -f ' + this.workspace.docker_compose + ' -p ' + this.workspace.name + ' up -d'
    ].join(' && '))
  }
}
