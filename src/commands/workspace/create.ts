import {Command} from '@oclif/command'
import {IConfig} from '@oclif/config'
import * as execa from 'execa'
import * as fse from 'fs-extra'
import * as Listr from 'listr'

import {ProjectModel} from '../../model/project'
import {SystemModel} from '../../model/system'
import {WorkspaceModel} from '../../model/workspace'

export default class WorkspaceCreate extends Command {
  static description = 'describe the command here'
  static args = [
    {name: 'repository'},
    {name: 'branch'},
    {name: 'provider'}
  ]
  system: SystemModel
  repository: string
  project: ProjectModel
  workspace: WorkspaceModel
  constructor(argv: string[], config: IConfig) {
    super(argv, config)
    this.system = new SystemModel(this.config.configDir)
    const {args} = this.parse(WorkspaceCreate)
    this.repository = args.repository
    this.project = new ProjectModel(this.system, args.repository)
    this.workspace = new WorkspaceModel(this.project, args.branch)
  }
  async run() {
    this.log(this.workspace.folder)
    this.log(this.project.repository_url)
    this.log(this.workspace.branch)
    fse.ensureDirSync(this.workspace.folder)
    new Listr([
      {
        title: 'Create folder: ' + this.workspace.folder,
        task: () => { fse.ensureDirSync(this.workspace.folder) }
      },
      {
        title: 'Clone git repository',
        enabled: () => fse.pathExistsSync(this.workspace.git) === false,
        task: () => execa.shell([
          'git',
          'clone',
          this.project.repository_url,
          '--progress',
          '--branch',
          this.workspace.branch,
          '--single-branch',
          this.workspace.folder
        ].join(' '))
      }
    ]).run().catch(err => {
      console.error(err)
    })
  }
}
