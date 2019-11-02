import {Command} from '@oclif/command'
import {IConfig} from '@oclif/config'
import * as execa from 'execa'
import * as fse from 'fs-extra'
import * as Listr from 'listr'

import {ProjectModel} from '../../model/project'
import {SystemModel} from '../../model/system'
import {WorkspaceModel} from '../../model/workspace'

export default class WorkspaceCreate extends Command {
  static description = 'create a branch repository workspace'
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
    const {args} = this.parse(WorkspaceCreate)
    this.repository = args.repository
    this.project = new ProjectModel(this.system, args.repository)
    this.workspace = new WorkspaceModel(this.project, args.branch)
  }
  async run() {
    const {args} = this.parse(WorkspaceCreate)
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
      },
      {
        title: 'Add to workspace list',
        task: () => {
          this.system.workspace_list_add(args.repository, args.branch, args.provider)
        }
      }
    ]).run().catch(err => {
      console.error(err)
    })

  }
}
