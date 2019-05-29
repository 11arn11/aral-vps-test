import {Command} from '@oclif/command'
import {IConfig} from '@oclif/config'

import {ProjectModel} from '../../model/project'
import {WorkspaceModel} from '../../model/workspace'

export default class WorkspaceStart extends Command {
  static description = 'describe the command here'
  static args = [
    {name: 'repository'},
    {name: 'branch'},
    {name: 'provider'}
  ]

  repository: string
  branch: string

  project: ProjectModel
  workspace: WorkspaceModel

  constructor(argv: string[], config: IConfig) {
    super(argv, config)

    const {args} = this.parse(WorkspaceStart)

    this.repository = args.repository
    this.branch = args.branch
    this.project = new ProjectModel(args.repository)
    this.workspace = new WorkspaceModel(this.project, args.branch)

  }

  async run() {
    const {args, flags} = this.parse(WorkspaceStart)

    this.workspace.branch

    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/andrea.nigro/VisualStudioCodeProjects/aral-vps-test/src/commands/workspace/start.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }

}
